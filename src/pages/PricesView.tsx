import React from "react";
import { Link } from "react-router-dom";
import { Tag, Calendar, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { BUSINESS_INFO } from "../data/business";
import PlansSection from "../components/PlansSection";
import FinalCtaSection from "../components/FinalCtaSection";

export default function PricesView() {
  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Tabela de Preços</span>
        </div>

        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
          Transparência e Respeito
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-brand font-bold text-white tracking-tight mb-4">
          Tabela de Preços Atualizada
        </h1>
        <p className="text-[17px] text-[#a1a1aa] max-w-xl leading-relaxed font-normal">
          Confira os valores de todos os serviços de corte, barba, químicos e tratamentos da barbearia Gustavinho do Corte no CIC Curitiba.
        </p>
      </div>

      {/* Main Prices Table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 sm:p-8 shadow-2xl">
          <div className="divide-y divide-[#27272a]">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#242428] px-4 rounded-xl transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-base text-white group-hover:text-[#d4af37] transition-colors">
                      {service.title}
                    </h2>
                    {service.isPopular && (
                      <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold">
                        Mais Pedido
                      </span>
                    )}
                  </div>
                  <p className="text-[17px] text-[#a1a1aa] leading-relaxed max-w-lg font-normal">
                    {service.shortDesc} • Duração aproximada: {service.duration}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-xl sm:text-2xl font-bold text-[#d4af37]">
                    {service.formattedPrice}
                  </span>

                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1%2C%20quero%20agendar%20um%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] text-xs font-bold active:scale-95 transition-all min-h-[40px] flex items-center"
                  >
                    Agendar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PlansSection />
      <FinalCtaSection />
    </div>
  );
}
