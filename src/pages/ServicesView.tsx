import React from "react";
import { Link } from "react-router-dom";
import { Scissors, Clock, CheckCircle2, Calendar, ChevronRight } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function ServicesView() {
  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Serviços</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
          Catálogo Completo
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Serviços de Cabelo, Barba e Estilo
        </h1>
        <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl leading-relaxed">
          Atendimento personalizado com técnica de visagismo, produtos de alta performance e transparência total de preços no CIC Curitiba.
        </p>
      </div>

      {/* Services List Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#0f0f0f]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-[#0f0f0f]/90 border border-[#d4af37]/60 backdrop-blur-md font-black text-[#d4af37]">
                    {service.formattedPrice}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Duração: {service.duration}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-[#f4f4f5]">
                    {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex gap-2">
                <Link
                  to={`/servicos/${service.slug}`}
                  className="flex-1 py-3 px-3 rounded-xl text-xs font-bold bg-[#242428] border border-[#27272a] text-white hover:border-[#d4af37] text-center flex items-center justify-center min-h-[44px]"
                >
                  Detalhes
                </Link>

                <a
                  href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1%2C%20gostaria%20de%20agendar%3A%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-3 rounded-xl text-xs font-black bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] text-center flex items-center justify-center gap-1 active:scale-95 transition-all min-h-[44px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#0f0f0f]" />
                  <span>AGENDAR</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
