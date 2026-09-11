import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Navigation, Phone, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";
import PageHeroHeader from "../components/PageHeroHeader";

export default function LocationView() {
  return (
    <div className="w-full bg-[#0f0f0f] pb-16">
      <PageHeroHeader
        breadcrumbs={[{ label: "Localização" }]}
        badge="Endereço & Rotas"
        title="Como Chegar na Barbearia no CIC"
        description="Localização privilegiada na Rua Desembargador Cid Campelo, 5212 no bairro CIC em Curitiba - PR."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#d4af37] block mb-2">
                  Endereço Completo
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
                  <div>
                    <h2 className="font-semibold text-lg text-white mb-1">
                      {BUSINESS_INFO.address.street}
                    </h2>
                    <p className="text-[18px] text-[#a1a1aa]">
                      Bairro {BUSINESS_INFO.address.neighborhood} • {BUSINESS_INFO.address.city} - {BUSINESS_INFO.address.state}
                    </p>
                    <p className="text-xs text-[#a1a1aa]/80 mt-1">
                      CEP: {BUSINESS_INFO.address.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#27272a] pt-6">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#d4af37] block mb-2">
                  Horário de Funcionamento
                </span>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-base text-white">Segunda a Sábado</h3>
                    <p className="text-[18px] text-[#d4af37] font-semibold">09:00 às 19:00</p>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-[#27272a]">
              <div>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px] w-full"
                >
                  <Navigation className="w-4 h-4 text-[#0f0f0f]" />
                  <span>Rotas</span>
                </a>
                <span className="block text-[9px] text-[#0f0f0f]/80 font-normal tracking-tight mt-1 text-center">
                  abrir GPS no Google Maps
                </span>
              </div>

              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#242428] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
              >
                <ExternalLink className="w-4 h-4 text-[#d4af37]" />
                <span>Maps</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#242428] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-[#d4af37]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="p-3.5 rounded-xl bg-[#242428] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>Ligar</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden min-h-[400px] relative">
            <iframe
              title="Mapa Gustavinho do Corte no CIC"
              src={BUSINESS_INFO.googleEmbedUrl}
              className="w-full h-full min-h-[400px] border-0 filter grayscale contrast-125 invert-[0.9]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
