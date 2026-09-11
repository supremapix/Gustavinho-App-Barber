import {
  Booking,
  ServiceItem,
  BusinessSettings,
  BlockedPeriod,
  BookingStatus
} from "../types/booking";
import { SERVICES_DATA } from "../data/services";
import {
  DEFAULT_BUSINESS_SETTINGS,
  calculateAvailableSlots,
  generateBookingCode,
  generateCancelToken,
  calculateRequiredSlotIds,
  timeToMinutes,
  minutesToTime
} from "../utils/availabilityEngine";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  runTransaction
} from "firebase/firestore";

import { getUserFriendlyErrorMessage } from "../utils/errorMapper";

// Key names for local cache
const STORAGE_KEYS = {
  BOOKINGS: "gdc_bookings_v1",
  SERVICES: "gdc_services_v1",
  SETTINGS: "gdc_settings_v1",
  BLOCKED: "gdc_blocked_v1"
};

// Default initial services converted to ServiceItem
const INITIAL_SERVICES: ServiceItem[] = SERVICES_DATA.map((s, idx) => ({
  id: s.id || `srv-${idx + 1}`,
  name: s.title,
  description: s.shortDesc,
  price: s.price,
  formattedPrice: s.formattedPrice,
  durationMinutes: parseInt(s.duration) || 30,
  active: true,
  sortOrder: idx,
  imageUrl: s.imageUrl,
  category: s.category
}));

// Local storage helper utilities
function getLocalData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocalData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
}

export class BookingStore {
  // 1. Get Services Catalog
  static async getServices(): Promise<ServiceItem[]> {
    try {
      const snap = await getDocs(collection(db, "services"));
      if (!snap.empty) {
        const services: ServiceItem[] = [];
        snap.forEach((doc) => {
          services.push(doc.data() as ServiceItem);
        });
        const sorted = services.sort((a, b) => a.sortOrder - b.sortOrder);
        setLocalData(STORAGE_KEYS.SERVICES, sorted);
        return sorted;
      }
    } catch (error) {
      console.warn("Firestore getServices fallback to local cache:", error);
    }
    const services = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    return services.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // 2. Save Services (Admin Only)
  static async saveServices(services: ServiceItem[]): Promise<void> {
    setLocalData(STORAGE_KEYS.SERVICES, services);
    try {
      for (const s of services) {
        await setDoc(doc(db, "services", s.id), s);
      }
    } catch (error) {
      console.warn("Firestore saveServices failed:", error);
    }
  }

  // 3. Get Business Settings
  static async getBusinessSettings(): Promise<BusinessSettings> {
    try {
      const docRef = doc(db, "businessSettings", "default");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as BusinessSettings;
        setLocalData(STORAGE_KEYS.SETTINGS, data);
        return data;
      }
    } catch (error) {
      console.warn("Firestore getBusinessSettings failed:", error);
    }
    return getLocalData<BusinessSettings>(
      STORAGE_KEYS.SETTINGS,
      DEFAULT_BUSINESS_SETTINGS
    );
  }

  // 4. Save Business Settings (Admin Only)
  static async saveBusinessSettings(settings: BusinessSettings): Promise<void> {
    setLocalData(STORAGE_KEYS.SETTINGS, settings);
    try {
      await setDoc(doc(db, "businessSettings", "default"), settings);
    } catch (error) {
      console.warn("Firestore saveBusinessSettings failed:", error);
    }
  }

  // 5. Get Blocked Periods
  static async getBlockedPeriods(): Promise<BlockedPeriod[]> {
    try {
      const snap = await getDocs(collection(db, "blockedPeriods"));
      if (!snap.empty) {
        const list: BlockedPeriod[] = [];
        snap.forEach((docSnap) => list.push(docSnap.data() as BlockedPeriod));
        setLocalData(STORAGE_KEYS.BLOCKED, list);
        return list;
      }
    } catch (error) {
      console.warn("Firestore getBlockedPeriods failed:", error);
    }
    return getLocalData<BlockedPeriod[]>(STORAGE_KEYS.BLOCKED, []);
  }

  // 6. Save Blocked Period (Admin Only)
  static async addBlockedPeriod(blocked: Omit<BlockedPeriod, "id">): Promise<BlockedPeriod> {
    const newBlocked: BlockedPeriod = {
      ...blocked,
      id: `blk-${Date.now()}`
    };
    const current = await this.getBlockedPeriods();
    current.push(newBlocked);
    setLocalData(STORAGE_KEYS.BLOCKED, current);

    try {
      await setDoc(doc(db, "blockedPeriods", newBlocked.id), newBlocked);
    } catch (error) {
      console.warn("Firestore addBlockedPeriod failed:", error);
    }

    return newBlocked;
  }

  // 7. Delete Blocked Period (Admin Only)
  static async removeBlockedPeriod(id: string): Promise<void> {
    const current = await this.getBlockedPeriods();
    const updated = current.filter((b) => b.id !== id);
    setLocalData(STORAGE_KEYS.BLOCKED, updated);

    try {
      await deleteDoc(doc(db, "blockedPeriods", id));
    } catch (error) {
      console.warn("Firestore removeBlockedPeriod failed:", error);
    }
  }

  // 8. Get Bookings (Admin Authorized Only)
  static async getBookings(dateStr?: string): Promise<Booking[]> {
    try {
      const q = collection(db, "bookings");
      const snap = await getDocs(q);
      if (!snap.empty) {
        const list: Booking[] = [];
        snap.forEach((docSnap) => list.push(docSnap.data() as Booking));
        setLocalData(STORAGE_KEYS.BOOKINGS, list);
        if (dateStr) {
          return list.filter((b) => b.date === dateStr);
        }
        return list;
      }
    } catch (error) {
      console.warn("Firestore getBookings requires Admin Auth or offline fallback:", error);
    }

    const bookings = getLocalData<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    if (dateStr) {
      return bookings.filter((b) => b.date === dateStr);
    }
    return bookings;
  }

  // 9. Get Booking by Public Cancel Token (High Entropy Token Lookup - No PII Leak)
  static async getBookingByToken(token: string): Promise<Booking | null> {
    if (!token || token.trim().length < 10) return null;
    try {
      // Direct lookup in 'bookingTokens' collection by exact token ID
      const tokenRef = doc(db, "bookingTokens", token);
      const tokenSnap = await getDoc(tokenRef);
      if (tokenSnap.exists()) {
        const data = tokenSnap.data();
        return {
          id: data.bookingId || token,
          bookingCode: data.bookingCode,
          cancelToken: token,
          serviceId: data.serviceId,
          serviceName: data.serviceName,
          servicePrice: data.servicePrice,
          serviceDurationMinutes: data.serviceDurationMinutes,
          professionalId: "gustavinho",
          professionalName: "Gustavinho",
          customerName: data.customerName,
          customerPhone: "(**)" + " *".repeat(5), // Masked for public token screen
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as Booking;
      }
    } catch (error) {
      console.warn("Firestore getBookingByToken failed:", error);
    }

    // Local storage fallback for user's own session
    const bookings = getLocalData<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    return bookings.find((b) => b.cancelToken === token) || null;
  }

  // 10. ATOMIC CREATE BOOKING (Firestore runTransaction + Slot Lock + Token Document)
  static async createBooking(params: {
    serviceId: string;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:mm
    customerName: string;
    customerPhone: string;
    notes?: string;
  }): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return {
        success: false,
        error: "Você está sem conexão com a internet. Para evitar conflitos de horários, os agendamentos só podem ser confirmados online."
      };
    }

    try {
      const bookingId = `bk-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const cancelToken = generateCancelToken();
      const bookingCode = generateBookingCode();

      const newBooking = await runTransaction(db, async (transaction) => {
        // A. Fetch official service document snapshot
        const serviceRef = doc(db, "services", params.serviceId);
        const serviceSnap = await transaction.get(serviceRef);

        let serviceName = "";
        let servicePrice = 0;
        let serviceDurationMinutes = 30;

        if (serviceSnap.exists()) {
          const sData = serviceSnap.data() as ServiceItem;
          serviceName = sData.name;
          servicePrice = sData.price;
          serviceDurationMinutes = sData.durationMinutes || 30;
        } else {
          const services = await this.getServices();
          const found = services.find((s) => s.id === params.serviceId || s.name === params.serviceId);
          if (!found) {
            throw new Error("Serviço não encontrado no catálogo oficial.");
          }
          serviceName = found.name;
          servicePrice = found.price;
          serviceDurationMinutes = found.durationMinutes || 30;
        }

        const startMin = timeToMinutes(params.startTime);
        const endMin = startMin + serviceDurationMinutes;
        const endTime = minutesToTime(endMin);

        // B. Calculate required slot IDs (e.g. gustavinho_2026-09-11_1400)
        const slotIds = calculateRequiredSlotIds(
          "gustavinho",
          params.date,
          params.startTime,
          serviceDurationMinutes,
          30
        );

        // C. Check each required slot document in transaction
        for (const slotId of slotIds) {
          const slotRef = doc(db, "bookingSlots", slotId);
          const slotSnap = await transaction.get(slotRef);
          if (slotSnap.exists()) {
            throw new Error("Esse horário acabou de ser reservado. Por favor, escolha outro horário.");
          }
        }

        // D. Construct Booking Document with official price/duration snapshot
        const createdBooking: Booking = {
          id: bookingId,
          bookingCode,
          cancelToken,
          serviceId: params.serviceId,
          serviceName,
          servicePrice,
          serviceDurationMinutes,
          professionalId: "gustavinho",
          professionalName: "Gustavinho",
          customerName: params.customerName.trim(),
          customerPhone: params.customerPhone.trim(),
          date: params.date,
          startTime: params.startTime,
          endTime,
          status: "confirmed",
          notes: params.notes ? params.notes.trim() : undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // E. Save official booking document in 'bookings' (Protected PII)
        const bookingRef = doc(db, "bookings", bookingId);
        transaction.set(bookingRef, createdBooking);

        // F. Save public self-service token document in 'bookingTokens' (No sensitive PII)
        const tokenRef = doc(db, "bookingTokens", cancelToken);
        transaction.set(tokenRef, {
          id: cancelToken,
          bookingId,
          bookingCode,
          customerName: params.customerName.trim(),
          serviceId: params.serviceId,
          serviceName,
          servicePrice,
          serviceDurationMinutes,
          date: params.date,
          startTime: params.startTime,
          endTime,
          status: "confirmed",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // G. Lock slots atomically WITHOUT PII
        for (const slotId of slotIds) {
          const slotRef = doc(db, "bookingSlots", slotId);
          transaction.set(slotRef, {
            date: params.date,
            slotTime: slotId.split("_").pop() || "",
            startTime: params.startTime,
            endTime,
            createdAt: new Date().toISOString()
          });
        }

        return createdBooking;
      });

      // Update local cache
      const currentLocal = getLocalData<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
      currentLocal.push(newBooking);
      setLocalData(STORAGE_KEYS.BOOKINGS, currentLocal);

      return { success: true, booking: newBooking };
    } catch (error: any) {
      console.error("Atomic createBooking error:", error);
      return {
        success: false,
        error: getUserFriendlyErrorMessage(error, "Não foi possível confirmar o agendamento no servidor. Verifique sua conexão e tente novamente.")
      };
    }
  }

  // 11. ATOMIC UPDATE STATUS & RELEASE SLOTS (Cancelled / Completed)
  static async updateBookingStatus(
    bookingId: string,
    status: BookingStatus
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await runTransaction(db, async (transaction) => {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await transaction.get(bookingRef);

        let cancelToken = "";
        let dateStr = "";
        let startTimeStr = "";
        let durationMin = 30;

        if (bookingSnap.exists()) {
          const bData = bookingSnap.data() as Booking;
          cancelToken = bData.cancelToken;
          dateStr = bData.date;
          startTimeStr = bData.startTime;
          durationMin = bData.serviceDurationMinutes || 30;

          // Update main booking
          const nowIso = new Date().toISOString();
          const updateFields: Record<string, any> = {
            status,
            updatedAt: nowIso
          };
          if (status === "cancelled") {
            updateFields.cancelledAt = nowIso;
          }
          transaction.update(bookingRef, updateFields);
        }

        // If status changes to cancelled, release slot locks
        if (status === "cancelled" && dateStr && startTimeStr) {
          const slotIds = calculateRequiredSlotIds(
            "gustavinho",
            dateStr,
            startTimeStr,
            durationMin,
            30
          );
          for (const slotId of slotIds) {
            const slotRef = doc(db, "bookingSlots", slotId);
            transaction.delete(slotRef);
          }
        }

        // Update token document if cancelToken is found
        if (cancelToken) {
          const tokenRef = doc(db, "bookingTokens", cancelToken);
          const tokenSnap = await transaction.get(tokenRef);
          if (tokenSnap.exists()) {
            transaction.update(tokenRef, {
              status,
              updatedAt: new Date().toISOString()
            });
          }
        }
      });

      // Update local cache
      const bookings = getLocalData<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
      const idx = bookings.findIndex((b) => b.id === bookingId);
      if (idx !== -1) {
        bookings[idx].status = status;
        bookings[idx].updatedAt = new Date().toISOString();
        setLocalData(STORAGE_KEYS.BOOKINGS, bookings);
      }

      return { success: true };
    } catch (error: any) {
      console.error("Atomic updateBookingStatus error:", error);
      return {
        success: false,
        error: getUserFriendlyErrorMessage(error, "Não foi possível atualizar o agendamento.")
      };
    }
  }

  // 12. ATOMIC RESCHEDULE BOOKING
  static async rescheduleBooking(
    bookingId: string,
    newDate: string,
    newStartTime: string
  ): Promise<{ success: boolean; error?: string }> {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return {
        success: false,
        error: "Sem conexão com a internet. A remarcação só pode ser realizada online."
      };
    }

    try {
      await runTransaction(db, async (transaction) => {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await transaction.get(bookingRef);

        if (!bookingSnap.exists()) {
          throw new Error("Agendamento não encontrado.");
        }

        const booking = bookingSnap.data() as Booking;
        const duration = booking.serviceDurationMinutes || 30;

        // Old slots to release
        const oldSlotIds = calculateRequiredSlotIds(
          "gustavinho",
          booking.date,
          booking.startTime,
          duration,
          30
        );

        // New slots to acquire
        const newSlotIds = calculateRequiredSlotIds(
          "gustavinho",
          newDate,
          newStartTime,
          duration,
          30
        );

        // Verify new slots availability
        for (const newSlotId of newSlotIds) {
          const newSlotRef = doc(db, "bookingSlots", newSlotId);
          const newSlotSnap = await transaction.get(newSlotRef);
          if (newSlotSnap.exists()) {
            throw new Error("Esse horário acabou de ser reservado. Escolha outro.");
          }
        }

        // Delete old slots
        for (const oldSlotId of oldSlotIds) {
          const oldSlotRef = doc(db, "bookingSlots", oldSlotId);
          transaction.delete(oldSlotRef);
        }

        const startMin = timeToMinutes(newStartTime);
        const endMin = startMin + duration;
        const newEndTime = minutesToTime(endMin);

        // Set new slots
        for (const newSlotId of newSlotIds) {
          const newSlotRef = doc(db, "bookingSlots", newSlotId);
          transaction.set(newSlotRef, {
            date: newDate,
            slotTime: newSlotId.split("_").pop() || "",
            startTime: newStartTime,
            endTime: newEndTime,
            createdAt: new Date().toISOString()
          });
        }

        // Update booking doc
        transaction.update(bookingRef, {
          date: newDate,
          startTime: newStartTime,
          endTime: newEndTime,
          updatedAt: new Date().toISOString()
        });

        // Update bookingToken doc
        if (booking.cancelToken) {
          const tokenRef = doc(db, "bookingTokens", booking.cancelToken);
          const tokenSnap = await transaction.get(tokenRef);
          if (tokenSnap.exists()) {
            transaction.update(tokenRef, {
              date: newDate,
              startTime: newStartTime,
              endTime: newEndTime,
              updatedAt: new Date().toISOString()
            });
          }
        }
      });

      // Update local cache
      const bookings = getLocalData<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
      const idx = bookings.findIndex((b) => b.id === bookingId);
      if (idx !== -1) {
        bookings[idx].date = newDate;
        bookings[idx].startTime = newStartTime;
        const duration = bookings[idx].serviceDurationMinutes || 30;
        bookings[idx].endTime = minutesToTime(timeToMinutes(newStartTime) + duration);
        bookings[idx].updatedAt = new Date().toISOString();
        setLocalData(STORAGE_KEYS.BOOKINGS, bookings);
      }

      return { success: true };
    } catch (error: any) {
      console.error("Atomic rescheduleBooking error:", error);
      return {
        success: false,
        error: getUserFriendlyErrorMessage(error, "Não foi possível remarcar o agendamento.")
      };
    }
  }
}
