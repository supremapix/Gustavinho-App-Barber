import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { MapPin, Navigation, Clock, Calendar, Scissors, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { BAIRROS_DATA } from "../data/bairros";
import { BUSINESS_INFO } from "../data/business";
import { SERVICES_DATA } from "../data/services";
import PriceTableSection from "../components/PriceTableSection";
import LocationSection from "../components/LocationSection";
import FinalCtaSection from "../components/FinalCtaSection";

export default function CityLocalSeoView() {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  // Determine current bairro from slug or location.pathname
  const pathSlug = slug || location.pathname.replace(/^\//, "").toLowerCase();
  const bairroInfo = BAIRROS_DATA[pathSlug] || BAIRROS_DATA["barbearia-no-cic"];

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      {/* Hero Header for Neighborhood Page */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">{bairroInfo.name}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-[#d4af37]/40 text-xs text-[#d4af37] font-bold mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Atendimento Regional no CIC</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          {bairroInfo.heroTitle}
        </h1>

        {/* Clear transparent notice about location */}
        <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-6">
          <strong className="text-white">Nota Transparente de Localização:</strong> O <span className="text-[#d4af37] font-semibold">Gustavinho do Corte</span> está sediado no bairro <strong>CIC em Curitiba</strong> (Rua Desembargador Cid Campelo, 5212) e atende diariamente clientes vindos de {bairroInfo.name} com fácil acesso de carro, aplicativo ou transporte coletivo.
        </div>

        {/* Distance & Transport Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#f4f4f5]">
          <div className="p-4 rounded-xl bg-[#18181b]/80 border border-[#27272a]">
            <span className="text-xs font-bold uppercase text-[#d4af37] block mb-1">Tempo Estimado</span>
            <p>{bairroInfo.estimatedDriveTime}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#18181b]/80 border border-[#27272a]">
            <span className="text-xs font-bold uppercase text-[#d4af37] block mb-1">Linhas de Ônibus</span>
            <p>{bairroInfo.busRoutes}</p>
          </div>
        </div>
      </div>

      {/* Main Neighborhood Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Por que escolher a Barbearia Gustavinho do Corte para quem mora em {bairroInfo.name}?
          </h2>
          <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-6">
            {bairroInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#27272a]">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl text-xs font-black bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#0f0f0f]" />
              <span>AGENDAR HORÁRIO DO {bairroInfo.name.toUpperCase()}</span>
            </a>

            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl text-xs font-bold bg-[#242428] border border-[#27272a] text-white flex items-center justify-center gap-2 hover:border-[#d4af37]"
            >
              <Navigation className="w-4 h-4 text-[#d4af37]" />
              <span>VER ROTA NO MAPS</span>
            </a>
          </div>
        </div>
      </div>

      <PriceTableSection />
      <LocationSection />
      <FinalCtaSection />
    </div>
  );
}
