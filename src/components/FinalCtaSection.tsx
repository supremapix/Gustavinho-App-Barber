import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#0f0f0f] border-t border-[#27272a]/60 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-left">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-3">
          Atendimento no CIC
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
          Agende seu horário em poucos segundos.
        </h2>

        <p className="text-[17px] text-[#a1a1aa] max-w-xl mb-8 leading-relaxed font-normal">
          Sem fila de espera. Escolha o serviço, a data e confirme seu agendamento online.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div>
            <Link
              to="/agendar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] transition-all duration-200"
            >
              <span>Agendar</span>
              <ArrowRight className="w-4 h-4 text-[#0f0f0f]" />
            </Link>
            <span className="block text-[10px] text-amber-200/70 font-normal tracking-tight mt-1 text-center sm:text-left">
              reserva imediata online
            </span>
          </div>

          <div>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#d4af37] transition-colors py-2 px-1 group"
            >
              <span>WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="block text-[10px] text-gray-400 font-normal tracking-tight mt-0.5">
              tirar dúvidas com a equipe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
