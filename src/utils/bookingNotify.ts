/**
 * Asks the server to e-mail the barbershop about a booking that was just
 * confirmed. Only the booking id is sent; the server reads everything else
 * from the database and fixes the recipient. `keepalive` lets the request
 * finish even if the customer closes the tab or switches to WhatsApp, and a
 * scheduled server sweep covers the case where it never leaves the browser.
 * Never throws and never blocks the confirmation flow.
 */
export function requestBookingEmailNotice(bookingId: string): void {
  try {
    void fetch("/api/booking-notify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ bookingId }),
      keepalive: true,
      credentials: "omit",
    }).catch(() => {});
  } catch {
    // Notification is best-effort on the client; the server sweep retries.
  }
}
