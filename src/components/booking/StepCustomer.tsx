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
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Seus dados para contato
        </h2>
        <p className="text-[17px] text-[#a1a1aa] font-normal">
          Usamos esses dados para confirmar seu agendamento e enviar o lembrete.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl shadow-xl mb-6">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-bold">
            {error}
          </div>
        )}

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#d4af37] mb-2">
            Seu Nome Completo *
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-[#a1a1aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full pl-11 pr-4 py-3.5 bg-[#0f0f0f] border border-[#27272a] rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none min-h-[48px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#d4af37] mb-2">
            WhatsApp para Confirmação *
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-[#a1a1aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={handlePhoneInput}
              placeholder="(41) 99999-9999"
              className="w-full pl-11 pr-4 py-3.5 bg-[#0f0f0f] border border-[#27272a] rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none min-h-[48px]"
            />
          </div>
          <p className="text-[11px] text-[#a1a1aa] mt-1.5">
            Insira o DDD e o número completo do seu WhatsApp.
          </p>
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-2">
            Observações (Opcional)
          </label>
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#a1a1aa] absolute left-3.5 top-3.5" />
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => onChangeNotes(e.target.value)}
              placeholder="Ex: Prefiro tesoura no topo..."
              className="w-full pl-11 pr-4 py-3 bg-[#0f0f0f] border border-[#27272a] rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-sm bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
        >
          <span>Continuar para revisão</span>
          <ChevronRight className="w-4 h-4 text-[#0f0f0f]" />
        </button>
      </form>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBackToTime}
          className="px-5 py-3 rounded-xl bg-[#18181b] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4 text-[#d4af37]" />
          <span>Voltar ao Horário</span>
        </button>
      </div>
    </div>
  );
}
