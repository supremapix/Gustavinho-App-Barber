import { BUSINESS_INFO } from "../data/business";
import type { Booking } from "../types/booking";

export function bookingWhatsAppUrl(booking: Booking): string {
  const [year, month, day] = booking.date.split("-");
  const url = new URL(BUSINESS_INFO.whatsappUrl);
  url.searchParams.set("text", [
    "Olá! Fiz um agendamento pelo site do Gustavinho do Corte.",
    "",
    "Código: " + booking.bookingCode,
    "Serviço: " + booking.serviceName,
    "Data: " + day + "/" + month + "/" + year,
    "Horário: " + booking.startTime,
  ].join("\n"));
  return url.href;
}

export function prepareWhatsAppTab(): Window | null {
  let tab: Window | null = null;
  try {
    // Called during the click, before awaiting Firestore, so popup blockers
    // do not mistake the subsequent navigation for an unsolicited popup.
    tab = window.open("", "_blank");
    if (!tab) return null;
    tab.opener = null;
    tab.document.title = "Confirmando seu agendamento";
    tab.document.body.textContent = "Aguarde a confirmação do horário para abrir o WhatsApp.";
    return tab;
  } catch {
    closeWhatsAppTab(tab);
    return null;
  }
}

export function closeWhatsAppTab(tab: Window | null): void {
  try {
    if (tab && !tab.closed) tab.close();
  } catch {
    // The confirmation and manual link must remain usable independently.
  }
}

export function openBookingWhatsApp(tab: Window | null, booking: Booking): void {
  try {
    if (tab && !tab.closed) tab.location.replace(bookingWhatsAppUrl(booking));
  } catch {
    closeWhatsAppTab(tab);
  }
}
