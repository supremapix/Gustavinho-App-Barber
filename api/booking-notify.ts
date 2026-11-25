/**
 * POST /api/booking-notify  { "bookingId": "bk-..." }
 *
 * Called by the booking page right after the Firestore transaction commits.
 * It accepts only a booking id: recipient, content and status checks are
 * decided on the server from the database. The response never says whether
 * the id exists, and each booking is e-mailed at most once.
 */
import { waitUntil } from "@vercel/functions";
import { processBooking, sweepPending } from "../server/notify/bookingNotifier.js";
import { getProductionDeps } from "../server/notify/runtime.js";

export const config = { maxDuration: 60 };

const ALLOWED_ORIGINS = new Set(["https://www.barbeiro.curitiba.br", "https://barbeiro.curitiba.br"]);

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin) && !/^https:\/\/gustavinho-app-barber[a-z0-9-]*\.vercel\.app$/.test(origin)) {
    return new Response(null, { status: 403 });
  }

  let bookingId: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 200) return new Response(null, { status: 413 });
    bookingId = JSON.parse(raw)?.bookingId;
  } catch {
    return new Response(null, { status: 400 });
  }
  if (typeof bookingId !== "string") return new Response(null, { status: 400 });

  const work = (async () => {
    const deps = getProductionDeps();
    try {
      // The booking transaction has just committed; give the first attempt
      // a short in-request retry before leaving it to the scheduled sweep.
      let outcome = await processBooking(deps, bookingId);
      if (outcome === "send_failed") {
        await new Promise((r) => setTimeout(r, 3000));
        outcome = await processBooking(deps, bookingId, { ignoreBackoff: true });
      }
      // Opportunistically deliver anything left pending by earlier visitors.
      await sweepPending(deps, { limit: 20, exclude: bookingId });
    } catch (err) {
      console.error(JSON.stringify({ event: "notify_error", bookingId, error: String((err as Error)?.message ?? err).slice(0, 300) }));
    }
  })();

  // Answer immediately; the work keeps running after the response.
  waitUntil(work);
  return new Response(JSON.stringify({ ok: true }), {
    status: 202,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
