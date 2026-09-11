import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Heart, Scissors, Calendar } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";
import PageHeroHeader from "../components/PageHeroHeader";

export default function AboutView() {
  return (
    <div className="w-full bg-[#0f0f0f] pb-16">
      <PageHeroHeader
        breadcrumbs={[{ label: "Sobre Nós" }]}
        badge="História & Conceito"
        title="Sobre o Gustavinho do Corte"
        description="A barbearia que combina técnica apurada de visagismo com o verdadeiro espírito de comunidade do bairro CIC em Curitiba."
      />

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
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mais do que um corte: uma experiência de confiança
            </h2>
            <p className="text-[17px] text-[#a1a1aa] leading-relaxed font-normal">
              Fundada com o propósito de entregar padrão premium sem cobrar preços abusivos, a barbearia Gustavinho do Corte se tornou ponto de referência para homens que valorizam o cuidado pessoal e a pontualidade.
            </p>
            <p className="text-[17px] text-[#a1a1aa] leading-relaxed font-normal">
              Localizada estrategicamente na Rua Desembargador Cid Campelo no CIC, a barbearia conta com estrutura completa, equipamentos de higienização profissional e produtos de tratamento masculino de ponta.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#27272a]">
              <div>
                <span className="text-2xl font-bold text-[#d4af37] block">4.9 ★</span>
                <span className="text-xs text-[#a1a1aa]">Nota média no Google</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#d4af37] block">100%</span>
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
