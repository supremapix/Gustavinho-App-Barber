import React from "react";
import { Scissors, Calendar, Clock, DollarSign, User, Phone, CheckCircle, AlertTriangle, Edit3, Loader2 } from "lucide-react";
import { ServiceItem } from "../../types/booking";

interface StepReviewProps {
  service: ServiceItem;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:mm
  customerName: string;
  customerPhone: string;
  notes?: string;
  isSubmitting: boolean;
  submitError?: string | null;
  onConfirm: () => void;
  onEditStep: (step: number) => void;
}

export default function StepReview({
  service,
  dateStr,
  timeStr,
  customerName,
  customerPhone,
  notes,
  isSubmitting,
  submitError,
  onConfirm,
  onEditStep
}: StepReviewProps) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Confira seu agendamento
        </h2>
        <p className="text-[17px] text-[#a1a1aa] font-normal">
          Revise os detalhes abaixo antes de confirmar seu horário.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs sm:text-sm font-bold flex items-start gap-3 shadow-lg">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="mb-2">{submitError}</p>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="px-3 py-1.5 rounded-lg bg-red-900/80 text-white text-xs font-bold hover:bg-red-800"
            >
              Escolher Outro Horário
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl mb-8">
        {/* Service Item */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f0f0f] border border-[#27272a] flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] block">
                Serviço
              </span>
              <h3 className="font-semibold text-base text-white">{service.name}</h3>
              <p className="text-xs text-[#a1a1aa]">Duração: {service.durationMinutes} min</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[18px] font-bold text-[#d4af37]">{service.formattedPrice}</span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[11px] text-[#a1a1aa] hover:text-[#d4af37] block mt-1"
            >
              Alterar
            </button>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f0f0f] border border-[#27272a] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] block">
                Data & Horário
              </span>
              <h4 className="font-semibold text-sm text-white capitalize">{formattedDate}</h4>
              <p className="text-[18px] font-bold text-[#d4af37]">Horário: {timeStr}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-[11px] text-[#a1a1aa] hover:text-[#d4af37]"
          >
            Alterar
          </button>
        </div>

        {/* Customer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f0f0f] border border-[#27272a] flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] block">
                Cliente
              </span>
              <h4 className="font-semibold text-sm text-white">{customerName}</h4>
              <p className="text-xs text-[#a1a1aa]">{customerPhone}</p>
              {notes && <p className="text-xs text-[#a1a1aa] italic mt-1">Obs: {notes}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-[11px] text-[#a1a1aa] hover:text-[#d4af37]"
          >
            Alterar
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onConfirm}
          className="w-full py-4 rounded-xl font-bold text-base bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[52px] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#0f0f0f]" />
              <span>Confirmando seu horário...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-[#0f0f0f]" />
              <span>Confirmar agendamento</span>
            </>
          )}
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onEditStep(1)}
          className="w-full py-3 rounded-xl bg-[#18181b] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center justify-center gap-1.5"
        >
          <Edit3 className="w-4 h-4 text-[#d4af37]" />
          <span>Alterar dados</span>
        </button>
      </div>
    </div>
  );
}
