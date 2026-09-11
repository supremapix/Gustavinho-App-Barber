import React from "react";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function LocationSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Info Side */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between space-y-8">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
                Localização
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-6">
                Fácil de encontrar <br />no CIC
              </h2>

              <div className="space-y-6 text-[17px] text-[#a1a1aa]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[18px]">
                      {BUSINESS_INFO.address.street}
                    </p>
                    <p>CIC · Curitiba - PR</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Segunda a Sábado</p>
                    <p>09:00 às 19:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[#27272a]">
              <a
                href={BUSINESS_INFO.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#e5c158] transition-colors group"
              >
                <span>Abrir perfil no Google Maps</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={BUSINESS_INFO.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#d4af37] transition-colors group"
              >
                <span>★ Avalie no Google Maps (Deixar opinião)</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#27272a] min-h-[300px]">
            <iframe
              title="Mapa Barbearia Gustavinho do Corte CIC Curitiba"
              src={BUSINESS_INFO.googleEmbedUrl}
              className="w-full h-full min-h-[300px] border-0 filter grayscale contrast-125 invert-[0.9]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
