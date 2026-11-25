/**
 * Scheduled sweep (Vercel Cron). Delivers notices that are missing or
 * pending, e.g. when the customer closed the page right after confirming or
 * the SMTP provider was down. Vercel sends `Authorization: Bearer $CRON_SECRET`.
 */
import { sweepPending } from "../../server/notify/bookingNotifier.js";
import { getProductionDeps } from "../../server/notify/runtime.js";

export const config = { maxDuration: 60 };

export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response(null, { status: 401 });
  }
  try {
    const results = await sweepPending(getProductionDeps());
    const summary: Record<string, number> = {};
    for (const o of Object.values(results)) summary[o] = (summary[o] ?? 0) + 1;
    console.log(JSON.stringify({ event: "notify_sweep", summary }));
    return Response.json({ ok: true, summary });
  } catch (err) {
    console.error(JSON.stringify({ event: "notify_sweep_error", error: String((err as Error)?.message ?? err).slice(0, 300) }));
    return Response.json({ ok: false }, { status: 500 });
  }
}
