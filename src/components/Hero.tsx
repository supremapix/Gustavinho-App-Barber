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
          className="w-full h-full object-cover object-center opacity-85 sm:opacity-90 scale-105 pointer-events-none transition-opacity duration-1000"
          src="https://img.supremasite.com.br/gusta/video-barber.mp4"
        />
        {/* Soft Luxury Vignette & Light Translucent Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/35 to-[#0a0a0b]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/65 via-[#0a0a0b]/35 to-transparent" />
        
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-left">
          {/* Headline - Standardized Sans Font with Subtle Translucent Refinement */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white/95 tracking-tight leading-snug mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            A Arte do Corte <br />
            <span className="bg-gradient-to-r from-amber-200/95 via-[#d4af37] to-amber-500/95 bg-clip-text text-transparent">
              Sem Igual no CIC
            </span>
          </h1>

          {/* Subtitle with Refined Translucency */}
          <p className="text-base sm:text-xl text-neutral-200/85 font-normal leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Experiência VIP de barbearia com técnica de visagismo sob medida, acabamento de alta precisão e agendamento pontual em Curitiba.
          </p>

          {/* Actions - Refined Translucent Luxury Gold & Frosted Glass Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <div>
              <Link
                to="/agendar"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold bg-[#d4af37]/80 hover:bg-[#d4af37]/95 backdrop-blur-md border border-[#f5d77f]/50 text-[#0a0a0b] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full"
              >
                <span>Agendar</span>
                <ArrowRight className="w-5 h-5 text-[#0a0a0b] group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="block text-[10px] text-amber-200/80 font-normal tracking-tight mt-1 text-center">
                reserva de horário online
              </span>
            </div>

            <div>
              <Link
                to="/servicos"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white/90 hover:text-white bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/25 hover:border-[#d4af37]/60 transition-all duration-200 group shadow-lg w-full"
              >
                <span>Serviços</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="block text-[10px] text-neutral-300/70 font-normal tracking-tight mt-1 text-center">
                catálogo completo e valores
              </span>
            </div>
          </div>

          {/* Floating Glassmorphic Trust Bar */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-8 text-sm text-neutral-200/90 backdrop-blur-md bg-black/30 p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <span className="font-extrabold text-white/95 text-base">4.9</span>
              <span className="text-neutral-300/80 text-xs">(Google Avaliações)</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-white/20" />

            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white/95">Pontualidade & Qualidade</span>
              <span className="text-neutral-300/70 hidden sm:inline">· Seg–Sáb 09h–19h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
