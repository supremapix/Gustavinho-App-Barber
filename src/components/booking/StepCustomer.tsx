import React, { useState } from "react";
import { User, Phone, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

interface StepCustomerProps {
  customerName: string;
  customerPhone: string;
  notes: string;
  onChangeName: (val: string) => void;
  onChangePhone: (val: string) => void;
  onChangeNotes: (val: string) => void;
  onNext: () => void;
  onBackToTime: () => void;
}

export default function StepCustomer({
  customerName,
  customerPhone,
  notes,
  onChangeName,
  onChangePhone,
  onChangeNotes,
  onNext,
  onBackToTime
}: StepCustomerProps) {
  const [error, setError] = useState<string | null>(null);

  // Apply Brazilian Phone Mask (XX) XXXXX-XXXX
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);

    let formatted = digits;
    if (digits.length > 2) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length > 7) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    onChangePhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerName.trim().length < 2) {
      setError("Por favor, informe seu nome completo.");
      return;
    }

    const digitsOnly = customerPhone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      setError("Por favor, informe um número de WhatsApp válido com DDD.");
      return;
    }

    setError(null);
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-base sm:text-lg font-medium text-white tracking-tight mb-1">
          Seus dados
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Usamos seu contato para confirmar a reserva e enviar o lembrete.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-[#18181b] border border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-xl mb-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-[#d4af37] mb-1.5">
            Seu Nome Completo *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#0f0f0f] border border-zinc-800 rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#d4af37] mb-1.5">
            WhatsApp para Confirmação *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={handlePhoneInput}
              placeholder="(41) 99999-9999"
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#0f0f0f] border border-zinc-800 rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none min-h-[44px]"
            />
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">
            Insira o DDD e o número completo.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Observações (Opcional)
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => onChangeNotes(e.target.value)}
              placeholder="Ex: Prefiro tesoura no topo..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#0f0f0f] border border-zinc-800 rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-1.5 active:scale-95 transition-all min-h-[44px]"
          >
            <span>Continuar</span>
            <ChevronRight className="w-4 h-4 text-[#0f0f0f]" />
          </button>
          <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-1 text-center">
            revisar detalhes do agendamento
          </span>
        </div>
      </form>

      <div className="flex justify-start">
        <div>
          <button
            type="button"
            onClick={onBackToTime}
            className="px-4 py-2 rounded-xl bg-[#18181b] border border-zinc-800 text-white text-xs font-semibold hover:border-[#d4af37] flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
            <span>Voltar</span>
          </button>
          <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
            escolher outro horário
          </span>
        </div>
      </div>
    </div>
  );
}
