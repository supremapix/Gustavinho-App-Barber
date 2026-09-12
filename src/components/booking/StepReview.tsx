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
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-base sm:text-lg font-medium text-white tracking-tight mb-1">
          Revisão do agendamento
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Confira os detalhes abaixo antes de confirmar seu horário.
        </p>
      </div>

      {submitError && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs font-medium flex items-start gap-2.5 shadow-lg">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="mb-1.5">{submitError}</p>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="px-2.5 py-1 rounded-lg bg-red-900/80 text-white text-[11px] font-semibold hover:bg-red-800"
            >
              Horários
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl mb-5">
        {/* Service Item */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f0f0f] border border-zinc-800 flex items-center justify-center shrink-0">
              <Scissors className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">
                Serviço
              </span>
              <h3 className="font-semibold text-sm text-white">{service.name}</h3>
              <p className="text-[11px] text-zinc-400">Duração: {service.durationMinutes} min</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-base font-bold text-[#d4af37]">{service.formattedPrice}</span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[11px] text-zinc-400 hover:text-[#d4af37] block mt-0.5"
            >
              Alterar
            </button>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f0f0f] border border-zinc-800 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">
                Data & Horário
              </span>
              <h4 className="font-semibold text-xs text-white capitalize">{formattedDate}</h4>
              <p className="text-sm font-bold text-[#d4af37]">Às {timeStr}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-[11px] text-zinc-400 hover:text-[#d4af37]"
          >
            Alterar
          </button>
        </div>

        {/* Customer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f0f0f] border border-zinc-800 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">
                Cliente
              </span>
              <h4 className="font-semibold text-xs text-white">{customerName}</h4>
              <p className="text-[11px] text-zinc-400">{customerPhone}</p>
              {notes && <p className="text-[11px] text-zinc-500 italic mt-0.5">Obs: {notes}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-[11px] text-zinc-400 hover:text-[#d4af37]"
          >
            Alterar
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        <div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-1.5 active:scale-95 transition-all min-h-[46px] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0f0f0f]" />
                <span>Confirmando...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-[#0f0f0f]" />
                <span>Confirmar</span>
              </>
            )}
          </button>
          <span className="block text-[9px] text-amber-200/70 font-normal tracking-tight mt-1 text-center">
            reserva imediata no sistema
          </span>
        </div>

        <div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onEditStep(1)}
            className="w-full py-2.5 rounded-xl bg-[#18181b] border border-zinc-800 text-white text-xs font-semibold hover:border-[#d4af37] flex items-center justify-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Alterar</span>
          </button>
          <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5 text-center">
            trocar serviço, data ou telefone
          </span>
        </div>
      </div>
    </div>
  );
}
