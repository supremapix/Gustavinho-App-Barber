export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  durationMinutes: number;
  active: boolean;
  sortOrder: number;
  imageUrl?: string;
  category?: string;
}

export interface WorkingDayHours {
  isOpen: boolean;
  slots: Array<{ start: string; end: string }>; // e.g. [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "19:00" }]
}

export interface BusinessSettings {
  timezone: string; // "America/Sao_Paulo"
  slotIntervalMinutes: number; // 30
  minimumAdvanceMinutes: number; // 30
  maximumAdvanceDays: number; // 30
  businessHours: {
    monday: WorkingDayHours;
    tuesday: WorkingDayHours;
    wednesday: WorkingDayHours;
    thursday: WorkingDayHours;
    friday: WorkingDayHours;
    saturday: WorkingDayHours;
    sunday: WorkingDayHours;
  };
}

export type BookingStatus = "confirmed" | "completed" | "cancelled" | "no_show";

export interface Booking {
  id: string;
  bookingCode: string; // e.g. "#GDC-8F2K"
  cancelToken: string; // secure random string
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDurationMinutes: number;
  professionalId: string;
  professionalName: string;
  customerName: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: BookingStatus;
  notes?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface BlockedPeriod {
  id: string;
  professionalId: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  isFullDay: boolean;
  reason: string;
}

export interface Professional {
  id: string;
  name: string;
  active: boolean;
  serviceIds: string[];
}
