import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { BUSINESS_INFO } from "../data/business";

export default function ServicesShowcase() {
  const priorityServices = SERVICES_DATA.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Photography */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] block mb-2">
                SERVIÇOS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Menu de Serviços <br />& Estilo
              </h2>
            </div>

            <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-md">
              Atendimento personalizado para quem busca precisão no corte, barba alinhada e cuidado completo no bairro CIC.
            </p>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#27272a] hidden lg:block">
              <img
                src={BUSINESS_INFO.images.cutting}
                alt="Corte masculino na Barbearia Gustavinho do Corte"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Menu Format */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {priorityServices.map((service) => (
                <div key={service.id} className="border-b border-[#27272a] pb-6">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                    <div className="flex-1 border-b border-dotted border-[#27272a] mx-2 hidden sm:block" />
                    <span className="text-base sm:text-lg font-extrabold text-[#d4af37] shrink-0">
                      {service.formattedPrice}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-xl">
                    {service.shortDesc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-left">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#e5c158] transition-colors group"
              >
                <span>Ver todos os serviços e preços</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
