import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#0f0f0f]">
      {/* Background Video with Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-35 scale-105 pointer-events-none"
          src="https://img.supremasite.com.br/gusta/video-barber.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-left">
          {/* Brand Identification Eyebrow */}
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] mb-3 block">
            Gustavinho do Corte
          </span>

          {/* H1 Headline - Signature Serif */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif-brand font-bold text-white tracking-tight leading-[1.15] mb-4">
            Barbearia no CIC <br className="hidden sm:inline" />
            <span className="text-[#d4af37]">em Curitiba</span>
          </h1>

          {/* Short Subtitle */}
          <p className="text-[17px] text-[#a1a1aa] font-normal leading-relaxed mb-8 max-w-xl">
            Corte, barba e estilo no CIC. Agende seu horário online.
          </p>

          {/* Actions - Single Dominant CTA + Secondary Text Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
            <Link
              to="/agendar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] transition-all duration-200"
            >
              <span>Agendar horário</span>
              <ArrowRight className="w-4 h-4 text-[#0f0f0f]" />
            </Link>

            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#d4af37] transition-colors py-2 px-1 group"
            >
              <span>Ver serviços e preços</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Discrete Social Proof & Info */}
          <div className="pt-6 border-t border-[#27272a]/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#a1a1aa]">
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <span className="font-bold text-white">4,9 no Google</span>
            </div>

            <span className="hidden sm:inline text-[#3f3f46]">·</span>

            <span>Aberto seg–sáb · 09h–19h</span>
          </div>
        </div>
      </div>
    </section>
  );
}
