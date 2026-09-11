import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function QuickActionGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial Photo Bleed / Frame */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[#27272a]">
              <img
                src={BUSINESS_INFO.images.interior}
                alt="Ambiente da Barbearia Gustavinho do Corte no CIC"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Editorial Copy */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] block mb-3">
              BARBEARIA NO CIC
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Atendimento exclusivo, ambiente moderno e precisão em cada detalhe.
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed mb-8">
              Localizada na Rua Desembargador Cid Campelo, 5212 no CIC. Especialista em visagismo masculino, cortes clássicos e modernos, barbeagem com toalha quente e platinado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#d4af37] transition-colors py-1 group"
              >
                <span>Conheça nossa história</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
