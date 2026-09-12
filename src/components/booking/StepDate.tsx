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
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-base sm:text-lg font-medium text-white tracking-tight mb-1">
          Escolha a data
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Dias sem horários livres ou fechados aparecem desabilitados.
        </p>
      </div>

      {/* Quick Convenient Options: Today & Tomorrow */}
      <div className="flex items-center justify-center gap-2.5 mb-5">
        {todayItem && (
          <div className="text-center">
            <button
              type="button"
              disabled={!todayItem.isAvailable}
              onClick={() => todayItem.isAvailable && onSelectDate(todayStr)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] w-full ${
                selectedDate === todayStr
                  ? "bg-[#d4af37] text-[#0f0f0f]"
                  : todayItem.isAvailable
                  ? "bg-[#18181b] border border-zinc-800 text-white hover:border-[#d4af37]"
                  : "bg-[#18181b]/40 border border-zinc-800/40 text-zinc-600 cursor-not-allowed"
              }`}
            >
              Hoje
            </button>
            <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
              {todayItem.dayNum} {todayItem.monthName} {!todayItem.isAvailable && "(Esgotado)"}
            </span>
          </div>
        )}

        {tomorrowItem && (
          <div className="text-center">
            <button
              type="button"
              disabled={!tomorrowItem.isAvailable}
              onClick={() => tomorrowItem.isAvailable && onSelectDate(tomorrowStr)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] w-full ${
                selectedDate === tomorrowStr
                  ? "bg-[#d4af37] text-[#0f0f0f]"
                  : tomorrowItem.isAvailable
                  ? "bg-[#18181b] border border-zinc-800 text-white hover:border-[#d4af37]"
                  : "bg-[#18181b]/40 border border-zinc-800/40 text-zinc-600 cursor-not-allowed"
              }`}
            >
              Amanhã
            </button>
            <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
              {tomorrowItem.dayNum} {tomorrowItem.monthName} {!tomorrowItem.isAvailable && "(Esgotado)"}
            </span>
          </div>
        )}
      </div>

      {/* Date Horizontal Picker Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
        {availableDatesList.map((item) => {
          const isSelected = selectedDate === item.dateStr;

          return (
            <button
              key={item.dateStr}
              type="button"
              disabled={!item.isAvailable}
              onClick={() => item.isAvailable && onSelectDate(item.dateStr)}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all min-h-[68px] ${
                isSelected
                  ? "bg-[#18181b] border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-md shadow-[#d4af37]/15"
                  : item.isAvailable
                  ? "bg-[#141416] border-zinc-800 hover:border-[#d4af37]/60 hover:bg-[#18181b]"
                  : "bg-[#141416]/40 border-zinc-900 text-zinc-700 cursor-not-allowed opacity-40"
              }`}
            >
              <span
                className={`text-[10px] font-medium tracking-wide mb-0.5 ${
                  isSelected ? "text-[#d4af37]" : item.isAvailable ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {item.dayName}
              </span>
              <span
                className={`text-base font-bold ${
                  isSelected ? "text-[#d4af37]" : item.isAvailable ? "text-white" : "text-zinc-600"
                }`}
              >
                {item.dayNum}
              </span>
              <span
                className={`text-[9px] font-medium ${
                  isSelected ? "text-[#d4af37]" : item.isAvailable ? "text-zinc-500" : "text-zinc-700"
                }`}
              >
                {item.monthName}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-start">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-[#18181b] border border-zinc-800 text-white text-xs font-semibold hover:border-[#d4af37] flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
            <span>Voltar</span>
          </button>
          <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
            trocar o serviço selecionado
          </span>
        </div>
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
