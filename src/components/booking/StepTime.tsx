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
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-1">
          {formattedDate}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Escolha um horário
        </h2>
        <p className="text-xs sm:text-sm text-[#a1a1aa]">
          Selecione o horário desejado. Todos os horários listados abaixo estão totalmente livres.
        </p>
      </div>

      {availableSlots.length === 0 ? (
        <div className="bg-[#18181b] border border-[#27272a] p-8 rounded-2xl text-center my-6">
          <CalendarX className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h3 className="text-lg font-extrabold text-white mb-2">
            Não temos mais horários disponíveis neste dia.
          </h3>
          <p className="text-xs sm:text-sm text-[#a1a1aa] mb-6">
            Por favor, escolha outra data para visualizar novos horários livres.
          </p>
          <button
            type="button"
            onClick={onBackToDate}
            className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] text-xs font-black hover:bg-[#e5c158] transition-colors"
          >
            ESCOLHER OUTRO DIA
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {availableSlots.map((timeStr) => {
            const isSelected = selectedTime === timeStr;

            return (
              <button
                key={timeStr}
                type="button"
                onClick={() => onSelectTime(timeStr)}
                className={`p-4 rounded-xl text-center border font-extrabold text-base transition-all min-h-[56px] flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-[#d4af37] text-[#0f0f0f] border-[#d4af37] font-extrabold shadow-lg"
                    : "bg-[#18181b] border-[#27272a] text-white hover:border-[#d4af37] hover:bg-[#242428]"
                }`}
              >
                <Clock className={`w-4 h-4 ${isSelected ? "text-[#0f0f0f]" : "text-[#d4af37]"}`} />
                <span>{timeStr}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex justify-start pt-4 border-t border-[#27272a]">
        <button
          type="button"
          onClick={onBackToDate}
          className="px-5 py-3 rounded-xl bg-[#18181b] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
          <span>Voltar para escolha do dia</span>
        </button>
      </div>
    </div>
  );
}
