import React from "react";
import { Clock, ChevronLeft, CalendarX } from "lucide-react";
import { calculateAvailableSlots } from "../../utils/availabilityEngine";
import { Booking, BlockedPeriod, BusinessSettings } from "../../types/booking";

interface StepTimeProps {
  selectedDate: string; // YYYY-MM-DD
  serviceDuration: number;
  existingBookings: Booking[];
  blockedPeriods: BlockedPeriod[];
  settings: BusinessSettings;
  selectedTime?: string; // HH:mm
  onSelectTime: (timeStr: string) => void;
  onBackToDate: () => void;
}

export default function StepTime({
  selectedDate,
  serviceDuration,
  existingBookings,
  blockedPeriods,
  settings,
  selectedTime,
  onSelectTime,
  onBackToDate
}: StepTimeProps) {
  const availableSlots = calculateAvailableSlots(
    selectedDate,
    serviceDuration,
    existingBookings,
    blockedPeriods,
    settings
  );

  // Format date for display (e.g., "Sábado, 12 de Setembro")
  const [year, month, day] = selectedDate.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-5">
        <span className="text-[11px] font-medium text-[#d4af37] block mb-0.5 capitalize">
          {formattedDate}
        </span>
        <h2 className="text-base sm:text-lg font-medium text-white tracking-tight mb-1">
          Escolha o horário
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Todos os horários listados abaixo estão disponíveis para atendimento.
        </p>
      </div>

      {availableSlots.length === 0 ? (
        <div className="bg-[#18181b] border border-zinc-800 p-6 rounded-2xl text-center my-4">
          <CalendarX className="w-10 h-10 text-[#d4af37] mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white mb-1">
            Sem horários disponíveis nesta data
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Por favor, selecione outro dia para visualizar os horários livres.
          </p>
          <div>
            <button
              type="button"
              onClick={onBackToDate}
              className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0f0f0f] text-xs font-semibold hover:bg-[#e5c158] transition-colors"
            >
              Voltar
            </button>
            <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
              escolher outra data no calendário
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
          {availableSlots.map((timeStr) => {
            const isSelected = selectedTime === timeStr;

            return (
              <button
                key={timeStr}
                type="button"
                onClick={() => onSelectTime(timeStr)}
                className={`py-2.5 px-3 rounded-xl text-center border font-semibold text-sm transition-all min-h-[44px] flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-[#d4af37] text-[#0f0f0f] border-[#d4af37] shadow-md"
                    : "bg-[#141416] border-zinc-800 text-white hover:border-[#d4af37] hover:bg-[#18181b]"
                }`}
              >
                <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-[#0f0f0f]" : "text-[#d4af37]"}`} />
                <span>{timeStr}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex justify-start pt-3 border-t border-zinc-800/80">
        <div>
          <button
            type="button"
            onClick={onBackToDate}
            className="px-4 py-2 rounded-xl bg-[#18181b] border border-zinc-800 text-white text-xs font-semibold hover:border-[#d4af37] flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
            <span>Voltar</span>
          </button>
          <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
            escolher outra data no calendário
          </span>
        </div>
      </div>
    </div>
  );
}
