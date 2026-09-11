import { BusinessSettings, Booking, BlockedPeriod, ServiceItem } from "../types/booking";

// Default business settings fallback
export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  timezone: "America/Sao_Paulo",
  slotIntervalMinutes: 30,
  minimumAdvanceMinutes: 30,
  maximumAdvanceDays: 30,
  businessHours: {
    monday: { isOpen: true, slots: [{ start: "09:00", end: "19:00" }] },
    tuesday: { isOpen: true, slots: [{ start: "09:00", end: "19:00" }] },
    wednesday: { isOpen: true, slots: [{ start: "09:00", end: "19:00" }] },
    thursday: { isOpen: true, slots: [{ start: "09:00", end: "19:00" }] },
    friday: { isOpen: true, slots: [{ start: "09:00", end: "19:00" }] },
    saturday: { isOpen: true, slots: [{ start: "09:00", end: "19:00" }] },
    sunday: { isOpen: false, slots: [] }
  }
};

/**
 * Converts "HH:mm" to total minutes from 00:00.
 */
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Converts total minutes from 00:00 to "HH:mm".
 */
export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/**
 * Checks if two time intervals [start1, end1] and [start2, end2] overlap.
 * Intervals overlap if max(start1, start2) < min(end1, end2).
 */
export function isOverlapping(
  start1: number,
  end1: number,
  start2: number,
  end2: number
): boolean {
  return Math.max(start1, start2) < Math.min(end1, end2);
}

/**
 * Returns day name key for BusinessSettings.
 */
export function getDayKey(dateStr: string): keyof BusinessSettings["businessHours"] {
  // Parse dateStr as local YYYY-MM-DD
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayIndex = dateObj.getDay(); // 0 is Sunday, 1 is Monday...

  const dayMap: Record<number, keyof BusinessSettings["businessHours"]> = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday"
  };

  return dayMap[dayIndex];
}

/**
 * Calculates available starting time slots for a specified date and service duration.
 */
export function calculateAvailableSlots(
  dateStr: string, // YYYY-MM-DD
  durationMinutes: number,
  existingBookings: Booking[],
  blockedPeriods: BlockedPeriod[],
  settings: BusinessSettings = DEFAULT_BUSINESS_SETTINGS,
  now: Date = new Date()
): string[] {
  const dayKey = getDayKey(dateStr);
  const dayConfig = settings.businessHours[dayKey];

  if (!dayConfig || !dayConfig.isOpen || dayConfig.slots.length === 0) {
    return [];
  }

  // Check if date is in the past
  const [year, month, day] = dateStr.split("-").map(Number);
  const selectedDateObj = new Date(year, month - 1, day, 23, 59, 59);
  if (selectedDateObj < now) {
    return [];
  }

  // Filter active bookings for this date
  const activeBookingsOnDate = existingBookings.filter(
    (b) => b.date === dateStr && b.status === "confirmed"
  );

  // Filter active blocked periods for this date
  const activeBlockedOnDate = blockedPeriods.filter(
    (bp) => bp.date === dateStr || bp.isFullDay
  );

  const availableSlots: string[] = [];
  const slotInterval = settings.slotIntervalMinutes || 30;

  // Current time in minutes for same-day booking restriction
  const isToday =
    now.getFullYear() === year &&
    now.getMonth() === month - 1 &&
    now.getDate() === day;

  const currentMinutesNow = isToday ? now.getHours() * 60 + now.getMinutes() : 0;
  const minAdvanceLimit = settings.minimumAdvanceMinutes || 30;

  // Iterate over each working shift (e.g. 09:00-19:00)
  for (const shift of dayConfig.slots) {
    const shiftStartMin = timeToMinutes(shift.start);
    const shiftEndMin = timeToMinutes(shift.end);

    for (
      let slotStartMin = shiftStartMin;
      slotStartMin + durationMinutes <= shiftEndMin;
      slotStartMin += slotInterval
    ) {
      const slotEndMin = slotStartMin + durationMinutes;

      // Check same-day past time constraint
      if (isToday && slotStartMin < currentMinutesNow + minAdvanceLimit) {
        continue;
      }

      // Check overlap with existing bookings
      let hasBookingOverlap = false;
      for (const booking of activeBookingsOnDate) {
        const bStart = timeToMinutes(booking.startTime);
        const bEnd = timeToMinutes(booking.endTime);
        if (isOverlapping(slotStartMin, slotEndMin, bStart, bEnd)) {
          hasBookingOverlap = true;
          break;
        }
      }

      if (hasBookingOverlap) continue;

      // Check overlap with blocked periods
      let hasBlockedOverlap = false;
      for (const blocked of activeBlockedOnDate) {
        if (blocked.isFullDay) {
          hasBlockedOverlap = true;
          break;
        }
        if (blocked.startTime && blocked.endTime) {
          const blockStart = timeToMinutes(blocked.startTime);
          const blockEnd = timeToMinutes(blocked.endTime);
          if (isOverlapping(slotStartMin, slotEndMin, blockStart, blockEnd)) {
            hasBlockedOverlap = true;
            break;
          }
        }
      }

      if (hasBlockedOverlap) continue;

      availableSlots.push(minutesToTime(slotStartMin));
    }
  }

  return availableSlots;
}

/**
 * Generates a short human-readable booking code like "#GDC-8F2K".
 */
export function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `#GDC-${randomPart}`;
}

/**
 * Generates a cryptographically strong random token for cancel/reschedule links.
 */
export function generateCancelToken(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(24);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
}

/**
 * Calculates required slot document IDs for deterministic locking in Firestore.
 * E.g., for professional 'gustavinho', date '2026-09-11', start '14:00', duration 60m:
 * Returns ['gustavinho_2026-09-11_1400', 'gustavinho_2026-09-11_1430']
 */
export function calculateRequiredSlotIds(
  professionalId: string,
  dateStr: string,
  startTime: string,
  durationMinutes: number,
  slotIntervalMinutes: number = 30
): string[] {
  const startMin = timeToMinutes(startTime);
  const endMin = startMin + durationMinutes;
  const slotIds: string[] = [];

  for (let m = startMin; m < endMin; m += slotIntervalMinutes) {
    const timeStr = minutesToTime(m).replace(":", "");
    slotIds.push(`${professionalId}_${dateStr}_${timeStr}`);
  }

  return slotIds;
}

/**
 * Generates a Google Calendar add-event link.
 */
export function generateGoogleCalendarUrl(
  serviceName: string,
  dateStr: string,
  startTime: string,
  durationMinutes: number
): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [startHour, startMin] = startTime.split(":").map(Number);

  const startObj = new Date(year, month - 1, day, startHour, startMin);
  const endObj = new Date(startObj.getTime() + durationMinutes * 60 * 1000);

  const formatIso = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d+/g, "");

  const title = encodeURIComponent(`Gustavinho do Corte — ${serviceName}`);
  const details = encodeURIComponent(
    `Agendamento de ${serviceName} na Barbearia Gustavinho do Corte.`
  );
  const location = encodeURIComponent(
    "Rua Desembargador Cid Campelo, 5212 - CIC, Curitiba - PR"
  );
  const dates = `${formatIso(startObj)}/${formatIso(endObj)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
