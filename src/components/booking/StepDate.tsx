import React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  calculateAvailableSlots,
  getDayKey
} from "../../utils/availabilityEngine";
import { Booking, BlockedPeriod, BusinessSettings } from "../../types/booking";

interface StepDateProps {
  serviceDuration: number;
  existingBookings: Booking[];
  blockedPeriods: BlockedPeriod[];
  settings: BusinessSettings;
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
  onBack: () => void;
}

export default function StepDate({
  serviceDuration,
  existingBookings,
  blockedPeriods,
  settings,
  selectedDate,
  onSelectDate,
  onBack
}: StepDateProps) {
  const today = new Date();
  const todayStr = formatDateIso(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = formatDateIso(tomorrow);

  // Generate date options for the next 30 days
  const availableDatesList: Array<{
    dateStr: string;
    dayNum: number;
    dayName: string;
    monthName: string;
    isAvailable: boolean;
    isToday: boolean;
    isTomorrow: boolean;
  }> = [];

  const maxDays = settings.maximumAdvanceDays || 30;

  for (let i = 0; i < maxDays; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dStr = formatDateIso(d);

    // Calculate slots count for this date
    const slots = calculateAvailableSlots(
      dStr,
      serviceDuration,
      existingBookings,
      blockedPeriods,
      settings,
      today
    );

    const dayName = d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
    const monthName = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");

    availableDatesList.push({
      dateStr: dStr,
      dayNum: d.getDate(),
      dayName: dayName.toUpperCase(),
      monthName: monthName.toUpperCase(),
      isAvailable: slots.length > 0,
      isToday: dStr === todayStr,
      isTomorrow: dStr === tomorrowStr
    });
  }

  // Quick choices
  const todayItem = availableDatesList.find((d) => d.isToday);
  const tomorrowItem = availableDatesList.find((d) => d.isTomorrow);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Qual dia fica melhor para você?
        </h2>
        <p className="text-xs sm:text-sm text-[#a1a1aa]">
          Dias sem horários disponíveis ou fechados ficam desabilitados.
        </p>
      </div>

      {/* Quick Convenient Options: Today & Tomorrow */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {todayItem && (
          <button
            type="button"
            disabled={!todayItem.isAvailable}
            onClick={() => todayItem.isAvailable && onSelectDate(todayStr)}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all min-h-[48px] ${
              selectedDate === todayStr
                ? "bg-[#d4af37] text-[#0f0f0f]"
                : todayItem.isAvailable
                ? "bg-[#18181b] border border-[#27272a] text-white hover:border-[#d4af37]"
                : "bg-[#18181b]/40 border border-[#27272a]/40 text-[#a1a1aa]/40 cursor-not-allowed"
            }`}
          >
            Hoje ({todayItem.dayNum} {todayItem.monthName})
            {!todayItem.isAvailable && " (Esgotado)"}
          </button>
        )}

        {tomorrowItem && (
          <button
            type="button"
            disabled={!tomorrowItem.isAvailable}
            onClick={() => tomorrowItem.isAvailable && onSelectDate(tomorrowStr)}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all min-h-[48px] ${
              selectedDate === tomorrowStr
                ? "bg-[#d4af37] text-[#0f0f0f]"
                : tomorrowItem.isAvailable
                ? "bg-[#18181b] border border-[#27272a] text-white hover:border-[#d4af37]"
                : "bg-[#18181b]/40 border border-[#27272a]/40 text-[#a1a1aa]/40 cursor-not-allowed"
            }`}
          >
            Amanhã ({tomorrowItem.dayNum} {tomorrowItem.monthName})
            {!tomorrowItem.isAvailable && " (Esgotado)"}
          </button>
        )}
      </div>

      {/* Date Horizontal Picker Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2.5 mb-8">
        {availableDatesList.map((item) => {
          const isSelected = selectedDate === item.dateStr;

          return (
            <button
              key={item.dateStr}
              type="button"
              disabled={!item.isAvailable}
              onClick={() => item.isAvailable && onSelectDate(item.dateStr)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all min-h-[80px] ${
                isSelected
                  ? "bg-gradient-to-br from-[#18181b] to-[#242428] border-[#d4af37] ring-2 ring-[#d4af37]/40 shadow-xl shadow-[#d4af37]/15"
                  : item.isAvailable
                  ? "bg-[#18181b] border-[#27272a] hover:border-[#d4af37]/60 hover:bg-[#242428]"
                  : "bg-[#18181b]/30 border-[#27272a]/30 text-[#a1a1aa]/30 cursor-not-allowed opacity-50"
              }`}
            >
              <span
                className={`text-[10px] font-bold tracking-wider mb-1 ${
                  isSelected ? "text-[#d4af37]" : item.isAvailable ? "text-[#a1a1aa]" : "text-[#a1a1aa]/40"
                }`}
              >
                {item.dayName}
              </span>
              <span
                className={`text-xl font-black ${
                  isSelected ? "text-[#d4af37]" : item.isAvailable ? "text-white" : "text-[#a1a1aa]/40"
                }`}
              >
                {item.dayNum}
              </span>
              <span
                className={`text-[9px] font-medium ${
                  isSelected ? "text-[#d4af37]" : item.isAvailable ? "text-[#a1a1aa]" : "text-[#a1a1aa]/40"
                }`}
              >
                {item.monthName}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl bg-[#18181b] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
          <span>Voltar aos Serviços</span>
        </button>
      </div>
    </div>
  );
}

function formatDateIso(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
