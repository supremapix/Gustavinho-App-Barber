import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { FAQ_DATA } from "../data/faq";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Perguntas Frequentes</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
          Dúvidas Frequentes
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Perguntas & Respostas Frequentes
        </h1>
        <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
          Tudo o que você precisa saber sobre valores, horários, localização, serviços e agendamentos no Gustavinho do Corte no CIC.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-3">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden transition-colors hover:border-[#d4af37]/50"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left font-bold text-white text-base sm:text-lg flex items-center justify-between gap-4 focus:outline-none min-h-[56px]"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#d4af37] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#a1a1aa] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed border-t border-[#27272a]/60 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FinalCtaSection />
    </div>
  );
}
