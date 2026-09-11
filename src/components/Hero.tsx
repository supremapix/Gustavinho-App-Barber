import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden bg-[#0a0a0b]">
      {/* Background Video Layer - Highly Visible & Vivid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-65 sm:opacity-75 scale-105 pointer-events-none transition-opacity duration-1000"
          src="https://img.supremasite.com.br/gusta/video-barber.mp4"
        />
        {/* Soft Luxury Vignette & Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/50 to-[#0a0a0b]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/90 via-[#0a0a0b]/60 to-transparent" />
        
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-left">
          {/* Headline - High-End Luxury Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-brand font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            A Arte do Corte <br />
            <span className="bg-gradient-to-r from-amber-200 via-[#d4af37] to-amber-500 bg-clip-text text-transparent">
              Sem Igual no CIC
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-200 font-normal leading-relaxed mb-8 max-w-xl drop-shadow-md">
            Experiência VIP de barbearia com técnica de visagismo sob medida, acabamento de alta precisão e agendamento pontual em Curitiba.
          </p>

          {/* Actions - Gold CTA Button & Secondary Glass Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <div>
              <Link
                to="/agendar"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold bg-gradient-to-r from-[#e5c158] via-[#d4af37] to-[#b89128] text-[#0f0f0f] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full"
              >
                <span>Agendar</span>
                <ArrowRight className="w-5 h-5 text-[#0f0f0f] group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="block text-[10px] text-amber-200/70 font-normal tracking-tight mt-1 text-center">
                reserva de horário online
              </span>
            </div>

            <div>
              <Link
                to="/servicos"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#d4af37]/60 hover:text-[#d4af37] transition-all duration-200 group shadow-lg w-full"
              >
                <span>Serviços</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="block text-[10px] text-gray-400 font-normal tracking-tight mt-1 text-center">
                catálogo completo e valores
              </span>
            </div>
          </div>

          {/* Floating Glassmorphic Trust Bar */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-8 text-sm text-gray-200 backdrop-blur-md bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <span className="font-extrabold text-white text-base">4.9</span>
              <span className="text-gray-300 text-xs">(Google Avaliações)</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-white/20" />

            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Pontualidade & Qualidade</span>
              <span className="text-gray-300 hidden sm:inline">· Seg–Sáb 09h–19h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
