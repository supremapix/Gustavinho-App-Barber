import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { FAQ_DATA } from "../data/faq";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";
import PageHeroHeader from "../components/PageHeroHeader";

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#0f0f0f] pb-16">
      <PageHeroHeader
        breadcrumbs={[{ label: "Perguntas Frequentes" }]}
        badge="Dúvidas Frequentes"
        title="Perguntas & Respostas Frequentes"
        description="Tudo o que você precisa saber sobre valores, horários, localização, serviços e agendamentos no Gustavinho do Corte no CIC."
      />

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
                className="w-full p-5 text-left font-semibold text-white text-base flex items-center justify-between gap-4 focus:outline-none min-h-[56px]"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#d4af37] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#a1a1aa] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-[17px] text-[#a1a1aa] leading-relaxed border-t border-[#27272a]/60 pt-3 font-normal">
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
