/**
 * Server-side e-mail notice for confirmed bookings.
 *
 * Trust model: the browser only ever tells us *which* booking to look at.
 * Everything else (recipient, content, status) comes from this module and
 * from the Firestore documents written by the booking transaction.
 *
 * Delivery state lives in `bookingNotifications/{bookingId}` (denied to all
 * clients by the default rule in firestore.rules; the server reaches it
 * through IAM, not through security rules).
 */
import type { Firestore, Transaction } from "@google-cloud/firestore";
import { randomUUID } from "node:crypto";

export const NOTIFICATIONS_COLLECTION = "bookingNotifications";
export const RECIPIENT = "contato@barbeiro.curitiba.br";
export const SENDER = "contato@barbeiro.curitiba.br";

const BOOKING_ID_RE = /^bk-\d{13}-\d{1,4}$/;
const LEASE_MS = 90_000; // a send in progress blocks concurrent attempts for this long
const MAX_ATTEMPTS = 12;
const SWEEP_WINDOW_HOURS = 12; // never-reported bookings; the cron runs every 10 min
const SWEEP_LIMIT = 60;

export type NotificationState = "sending" | "pending" | "sent" | "skipped" | "failed";

export interface MailMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  messageId: string;
}

export interface NotifierDeps {
  db: Firestore;
  sendMail: (msg: MailMessage) => Promise<{ messageId?: string }>;
  /** Bookings whose Firestore document was created before this instant are never notified. */
  notifySince: Date;
  now?: () => Date;
  log?: (event: string, data: Record<string, unknown>) => void;
}

export type ProcessOutcome =
  | "invalid_id"
  | "not_found"
  | "before_cutoff"
  | "already_sent"
  | "in_progress"
  | "backoff"
  | "skipped"
  | "gave_up"
  | "sent"
  | "send_failed";

interface BookingDoc {
  id?: string;
  bookingCode?: unknown;
  serviceName?: unknown;
  serviceDurationMinutes?: unknown;
  date?: unknown;
  startTime?: unknown;
  status?: unknown;
  createdAt?: unknown;
}

function backoffMs(attempt: number): number {
  // 1 min, 2, 4, 8 … capped at 6 h
  return Math.min(60_000 * 2 ** Math.max(0, attempt - 1), 6 * 60 * 60_000);
}

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\r\n\t\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
}

/** Mirrors calculateRequiredSlotIds() in src/utils/availabilityEngine.ts */
export function requiredSlotIds(date: string, startTime: string, durationMinutes: number): string[] {
  const start = timeToMinutes(startTime);
  const ids: string[] = [];
  for (let m = start; m < start + durationMinutes; m += 30) {
    const hh = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    ids.push(`gustavinho_${date}_${hh}${mm}`);
  }
  return ids;
}

export function buildMessage(bookingId: string, b: BookingDoc): MailMessage {
  const code = clean(b.bookingCode, 20);
  const service = clean(b.serviceName, 80);
  const [y, m, d] = clean(b.date, 10).split("-");
  const date = `${d}/${m}/${y}`;
  const time = clean(b.startTime, 5);

  const subject = `Novo agendamento ${code}: ${date} às ${time}`;
  const lines = [
    "Novo agendamento confirmado pelo site.",
    "",
    `Código: ${code}`,
    `Serviço: ${service}`,
    `Data: ${date}`,
    `Horário: ${time}`,
    "",
    "Os dados do cliente estão no painel: https://www.barbeiro.curitiba.br/admin",
  ];
  const html =
    `<p>Novo agendamento confirmado pelo site.</p><table cellpadding="4">` +
    [
      ["Código", code],
      ["Serviço", service],
      ["Data", date],
      ["Horário", time],
    ]
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
      .join("") +
    `</table><p>Os dados do cliente estão no <a href="https://www.barbeiro.curitiba.br/admin">painel</a>.</p>`;

  return {
    from: `Agenda Gustavinho do Corte <${SENDER}>`,
    to: RECIPIENT,
    subject,
    text: lines.join("\n"),
    html,
    // Stable per booking, so a rare duplicate after a lost acknowledgement threads together.
    messageId: `<booking-${bookingId}@barbeiro.curitiba.br>`,
  };
}

function isValidBooking(b: BookingDoc): boolean {
  return (
    typeof b.bookingCode === "string" &&
    typeof b.serviceName === "string" &&
    typeof b.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(b.date) &&
    typeof b.startTime === "string" &&
    /^\d{2}:\d{2}$/.test(b.startTime)
  );
}

function shortError(err: unknown): string {
  const e = err as { code?: string; responseCode?: number; message?: string };
  return clean([e?.code, e?.responseCode, e?.message].filter(Boolean).join(" "), 300);
}

/**
 * Claims, sends and records the notice for one booking. Safe to call any
 * number of times, concurrently, from any trigger.
 */
export async function processBooking(
  deps: NotifierDeps,
  bookingId: string,
  opts: { ignoreBackoff?: boolean } = {}
): Promise<ProcessOutcome> {
  const now = deps.now ?? (() => new Date());
  const log = deps.log ?? (() => {});
  if (typeof bookingId !== "string" || !BOOKING_ID_RE.test(bookingId)) return "invalid_id";

  const { db } = deps;
  const bookingRef = db.collection("bookings").doc(bookingId);
  const notifRef = db.collection(NOTIFICATIONS_COLLECTION).doc(bookingId);
  const leaseId = randomUUID();

  type Claim =
    | { outcome: Exclude<ProcessOutcome, "sent" | "send_failed"> }
    | { outcome: "claimed"; booking: BookingDoc; attempt: number };

  const claim: Claim = await db.runTransaction(async (tx: Transaction) => {
    const [bookingSnap, notifSnap] = await tx.getAll(bookingRef, notifRef);
    if (!bookingSnap.exists) return { outcome: "not_found" as const };

    // createTime is set by Firestore itself, unlike the client-supplied createdAt.
    const createdAt = bookingSnap.createTime?.toDate();
    if (!createdAt || createdAt < deps.notifySince) return { outcome: "before_cutoff" as const };

    const booking = bookingSnap.data() as BookingDoc;
    const n = notifSnap.exists ? (notifSnap.data() as Record<string, any>) : null;
    const t = now();

    if (n?.state === "sent") return { outcome: "already_sent" as const };
    if (n?.state === "skipped") return { outcome: "skipped" as const };
    if (n?.state === "failed") return { outcome: "gave_up" as const };
    if (n?.state === "sending" && n.leaseUntil && n.leaseUntil.toMillis() > t.getTime()) {
      return { outcome: "in_progress" as const };
    }
    if (!opts.ignoreBackoff && n?.nextAttemptAt && n.nextAttemptAt.toMillis() > t.getTime()) {
      return { outcome: "backoff" as const };
    }

    const base = { bookingId, updatedAt: t, createdAt: n?.createdAt ?? t };

    let skipReason: string | null = null;
    if (booking.status !== "confirmed") skipReason = `status_${clean(booking.status, 20)}`;
    else if (!isValidBooking(booking)) skipReason = "invalid_booking_data";

    if (!skipReason) {
      // Only bookings that went through the slot-locking transaction count.
      const duration = Number(booking.serviceDurationMinutes) || 30;
      const slotRefs = requiredSlotIds(booking.date as string, booking.startTime as string, duration).map((id) =>
        db.collection("bookingSlots").doc(id)
      );
      const slots = slotRefs.length ? await tx.getAll(...slotRefs) : [];
      if (!slots.length || slots.some((s) => !s.exists)) skipReason = "slot_lock_missing";
    }

    if (skipReason) {
      tx.set(notifRef, { ...base, state: "skipped", skipReason, leaseId: null, leaseUntil: null }, { merge: true });
      return { outcome: "skipped" as const };
    }

    const attempt = (Number(n?.attempts) || 0) + 1;
    if (attempt > MAX_ATTEMPTS) {
      tx.set(notifRef, { ...base, state: "failed", leaseId: null, leaseUntil: null }, { merge: true });
      return { outcome: "gave_up" as const };
    }

    tx.set(
      notifRef,
      {
        ...base,
        state: "sending",
        attempts: attempt,
        leaseId,
        leaseUntil: new Date(t.getTime() + LEASE_MS),
        lastAttemptAt: t,
        recipient: RECIPIENT,
      },
      { merge: true }
    );
    return { outcome: "claimed" as const, booking, attempt };
  });

  if (claim.outcome !== "claimed") {
    log("notify_skip", { bookingId, outcome: claim.outcome });
    return claim.outcome;
  }

  let result: { ok: boolean; messageId?: string; error?: string };
  try {
    const info = await deps.sendMail(buildMessage(bookingId, claim.booking));
    result = { ok: true, messageId: info.messageId };
  } catch (err) {
    result = { ok: false, error: shortError(err) };
  }

  // Record the result only if our lease is still the current one.
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(notifRef);
    const n = snap.data();
    if (!n || n.leaseId !== leaseId) return;
    const t = now();
    if (result.ok) {
      tx.set(
        notifRef,
        { state: "sent", sentAt: t, updatedAt: t, smtpMessageId: result.messageId ?? null, leaseId: null, leaseUntil: null, lastError: null, nextAttemptAt: null },
        { merge: true }
      );
    } else {
      tx.set(
        notifRef,
        {
          state: "pending",
          updatedAt: t,
          lastError: result.error,
          nextAttemptAt: new Date(t.getTime() + backoffMs(claim.attempt)),
          leaseId: null,
          leaseUntil: null,
        },
        { merge: true }
      );
    }
  });

  if (result.ok) {
    log("notify_sent", { bookingId, attempt: claim.attempt });
    return "sent";
  }
  log("notify_send_failed", { bookingId, attempt: claim.attempt, error: result.error });
  return "send_failed";
}

/**
 * Finds confirmed bookings whose notice is missing (recent bookings the
 * browser never reported, e.g. the customer closed the page at once) or
 * still pending (SMTP outage) and processes them. Kept cheap on reads
 * because it runs on a short schedule.
 */
export async function sweepPending(
  deps: NotifierDeps,
  opts: { limit?: number; exclude?: string } = {}
): Promise<Record<string, ProcessOutcome>> {
  const now = deps.now ?? (() => new Date());
  const limit = opts.limit ?? SWEEP_LIMIT;
  const windowStart = new Date(Math.max(deps.notifySince.getTime(), now().getTime() - SWEEP_WINDOW_HOURS * 3_600_000));
  // createdAt is the client's clock; widen by a day. processBooking re-checks Firestore's createTime.
  const loose = new Date(windowStart.getTime() - 86_400_000).toISOString();

  const [recent, pending] = await Promise.all([
    deps.db.collection("bookings").where("createdAt", ">=", loose).orderBy("createdAt", "desc").limit(limit).get(),
    deps.db.collection(NOTIFICATIONS_COLLECTION).where("state", "in", ["pending", "sending"]).limit(limit).get(),
  ]);

  const ids = new Set<string>(pending.docs.map((d) => d.id));
  const fresh = recent.docs.filter(
    (d) => d.get("status") === "confirmed" && (d.createTime?.toDate() ?? new Date(0)) >= windowStart
  );
  if (fresh.length) {
    const notifs = await deps.db.getAll(...fresh.map((d) => deps.db.collection(NOTIFICATIONS_COLLECTION).doc(d.id)));
    fresh.forEach((d, i) => {
      if (!notifs[i].exists) ids.add(d.id);
    });
  }
  if (opts.exclude) ids.delete(opts.exclude);

  const results: Record<string, ProcessOutcome> = {};
  for (const id of ids) results[id] = await processBooking(deps, id);
  return results;
}
