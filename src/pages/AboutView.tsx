import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Heart, Scissors, Calendar } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function AboutView() {
  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Sobre Nós</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
          História & Conceito
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Sobre o Gustavinho do Corte
        </h1>
        <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl leading-relaxed">
          A barbearia que combina técnica apurada de visagismo com o verdadeiro espírito de comunidade do bairro CIC em Curitiba.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-12">
        {/* Story Block */}
        <div className="bg-[#18181b] border border-[#27272a] p-8 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 relative rounded-xl overflow-hidden min-h-[300px]">
            <img
              src={BUSINESS_INFO.images.interior}
              alt="Ambiente Gustavinho do Corte"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Mais do que um corte: uma experiência de confiança
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Fundada com o propósito de entregar padrão premium sem cobrar preços abusivos, a barbearia Gustavinho do Corte se tornou ponto de referência para homens que valorizam o cuidado pessoal e a pontualidade.
            </p>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Localizada estrategicamente na Rua Desembargador Cid Campelo no CIC, a barbearia conta com estrutura completa, equipamentos de higienização profissional e produtos de tratamento masculino de ponta.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#27272a]">
              <div>
                <span className="text-2xl font-black text-[#d4af37] block">4.9 ★</span>
                <span className="text-xs text-[#a1a1aa]">Nota média no Google</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#d4af37] block">100%</span>
                <span className="text-xs text-[#a1a1aa]">Atendimento com agendamento</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
