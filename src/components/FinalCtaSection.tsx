import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#0f0f0f] border-t border-[#27272a]/60 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-left">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] block mb-3">
          ATENDIMENTO NO CIC
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Agende seu horário em poucos segundos.
        </h2>

        <p className="text-base sm:text-lg text-[#a1a1aa] max-w-xl mb-8 leading-relaxed">
          Sem fila de espera. Escolha o serviço, a data e confirme seu agendamento online.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Link
            to="/agendar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] transition-all duration-200"
          >
            <span>AGENDAR HORÁRIO</span>
            <ArrowRight className="w-4 h-4 text-[#0f0f0f]" />
          </Link>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#d4af37] transition-colors py-2 px-1 group"
          >
            <span>Dúvidas? Fale no WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
