import React from "react";
import { Star, ArrowRight, QrCode, ExternalLink, ThumbsUp, ShieldCheck } from "lucide-react";
import { CLIENT_REVIEWS } from "../data/reviews";
import { BUSINESS_INFO } from "../data/business";

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-[#d4af37]/40 text-xs text-[#d4af37] font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
              <span>5.0 no Google Maps • 150+ Avaliações Reais</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Quem corta com o Gustavinho recomenda
            </h2>
            <p className="text-base text-[#a1a1aa] mt-2 max-w-2xl">
              Atendimento de alta precisão no CIC Curitiba. Leia a opinião dos nossos clientes e deixe sua avaliação no Google!
            </p>
          </div>

          {/* High visibility CTA to leave review */}
          <a
            href={BUSINESS_INFO.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-black text-sm hover:bg-[#e5c158] transition-all shadow-lg hover:shadow-[#d4af37]/20 whitespace-nowrap active:scale-95"
          >
            <Star className="w-4 h-4 fill-[#0f0f0f] text-[#0f0f0f]" />
            <span>Avaliar no Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#0f0f0f]" />
          </a>
        </div>

        {/* Main Section Grid: 3 Review Cards + 1 QR Code Banner Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Reviews List Column */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CLIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#18181b] border border-[#27272a] hover:border-[#d4af37]/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#d4af37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded border border-[#25D366]/20">
                      Google Maps
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#d4d4d8] leading-relaxed mb-6 font-normal italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#27272a] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{rev.author}</span>
                    <span className="text-[#a1a1aa]">{rev.neighborhood}</span>
                  </div>
                  <span className="text-[#a1a1aa] font-medium">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Google QR Code Box */}
          <div className="bg-gradient-to-br from-[#18181b] via-[#1c1c20] to-[#27272a] border-2 border-[#d4af37] p-6 sm:p-8 rounded-2xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0f0f0f] text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Escaneie & Avalie
            </div>

            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mb-4">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Avalie no Google
            </h3>
            <p className="text-xs text-[#a1a1aa] mb-6 leading-relaxed">
              Aponte a câmera do seu celular para o QR Code abaixo e deixe sua nota de 5 estrelas no Google Maps!
            </p>

            {/* Prominent QR Code Image */}
            <div className="bg-white p-3 rounded-2xl shadow-xl mb-6 border-2 border-[#d4af37] group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <a href={BUSINESS_INFO.reviewUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={BUSINESS_INFO.qrCodeUrl}
                  alt="QR Code para Avaliação no Google Maps - Gustavinho do Corte"
                  className="w-40 h-40 object-contain rounded-lg"
                  loading="eager"
                />
              </a>
            </div>

            <a
              href={BUSINESS_INFO.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-extrabold text-xs hover:bg-[#e5c158] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Clique aqui para Avaliar</span>
              <ExternalLink className="w-4 h-4 text-[#0f0f0f]" />
            </a>
          </div>

        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#27272a]/60">
          <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Perfil oficial verificado no Google Meu Negócio</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={BUSINESS_INFO.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:underline"
            >
              <span>Abrir Perfil no Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
            </a>

            <a
              href={BUSINESS_INFO.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#d4af37] transition-colors"
            >
              <span>Link Direto de Avaliação</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
