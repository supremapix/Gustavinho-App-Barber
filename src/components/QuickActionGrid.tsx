import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function QuickActionGrid() {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0b] border-t border-[#27272a]/80 relative overflow-hidden">
      {/* Subtle Background Glow Decorators */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Unique Frame Design with Gold Accent & Image */}
          <div className="lg:col-span-7 relative group">
            {/* Outer Decorative Gold Border Frame */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#d4af37]/40 via-amber-500/20 to-[#d4af37]/40 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-[#121214] shadow-2xl">
              <img
                src="https://img.supremasite.com.br/gusta/barber.webp"
                alt="Ambiente da Barbearia Gustavinho do Corte no CIC Curitiba"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Soft Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 via-transparent to-black/20" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 bg-black/80 backdrop-blur-md border border-[#d4af37]/40 p-3.5 sm:p-4 rounded-xl flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0 text-[#d4af37]">
                  <MapPin className="w-5 h-5 text-[#e5c158]" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold uppercase text-[#e5c158] tracking-wider">Rua Desembargador Cid Campelo, 5212</p>
                  <p className="text-xs text-gray-300 font-medium">Bairro CIC · Curitiba - PR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Copy */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/50 text-xs font-mono font-bold tracking-widest uppercase text-[#e5c158] mb-5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>BARBEARIA NO CIC</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-brand font-bold text-white tracking-tight leading-[1.15] mb-6">
              Atendimento exclusivo, ambiente moderno e precisão em cada detalhe.
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal mb-8">
              Localizada na Rua Desembargador Cid Campelo, 5212 no CIC. Especialista em visagismo masculino, cortes clássicos e modernos, barbeagem tradicional com toalha quente e platinado.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Ambiente Climatizado</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Cadeira de Couro Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Barboterapia Completa</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Atendimento Pontual VIP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <Link
                  to="/agendar"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-[#e5c158] via-[#d4af37] to-[#b89128] text-[#0f0f0f] shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group w-full"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-4 h-4 text-[#0f0f0f] group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="block text-[10px] text-amber-200/70 font-normal tracking-tight mt-1 text-center">
                  unidade CIC Curitiba
                </span>
              </div>

              <div>
                <Link
                  to="/sobre"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all duration-200 group w-full"
                >
                  <span>História</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="block text-[10px] text-gray-400 font-normal tracking-tight mt-1 text-center">
                  conheça nossa trajetória
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
