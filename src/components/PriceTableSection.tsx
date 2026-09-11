import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Tag, Phone } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { BUSINESS_INFO } from "../data/business";

export default function PriceTableSection() {
  // Show key primary services on home page
  const highlightPrices = SERVICES_DATA.slice(0, 7);

  return (
    <section className="py-16 sm:py-20 bg-[#121214] border-t-2 border-[#27272a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#d4af37] block mb-1">
            Barbearia no CIC Curitiba
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Tabela de Preços e Serviços
          </h2>
          <p className="text-base text-[#d4d4d8]">
            Agendamento exclusivo pelo WhatsApp: <strong className="text-white">(41) 99838-4885</strong>
          </p>
        </div>

        {/* Highlight Alert for Easy Booking */}
        <div className="bg-[#18181b] border border-[#25D366]/40 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white">
              Quer garantir seu corte sem esperar?
            </div>
            <div className="text-xs text-[#a1a1aa]">
              Envie uma mensagem no WhatsApp com o dia e horário que você prefere.
            </div>
          </div>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0f0f0f] font-black text-xs active:scale-95 transition-all shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#0f0f0f]" />
            <span>Agendar no WhatsApp</span>
          </a>
        </div>

        {/* Clear Table Format */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl divide-y divide-[#27272a] overflow-hidden mb-8 shadow-lg">
          {highlightPrices.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:px-6 sm:py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-[#222227] transition-colors group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </span>
                  {item.isPopular && (
                    <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#a1a1aa] mt-0.5">
                  {item.shortDesc} • {item.duration}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 mt-1 sm:mt-0">
                <span className="text-lg sm:text-xl font-black text-[#d4af37] shrink-0">
                  {item.formattedPrice}
                </span>

                <a
                  href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Quero%20agendar%20um%20${encodeURIComponent(item.title)}%20no%20Gustavinho%20do%20Corte.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0f0f0f] font-bold text-xs transition-colors"
                >
                  Agendar
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Links to Full Tables */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link
            to="/precos"
            className="inline-flex items-center gap-2 text-base font-bold text-[#d4af37] hover:underline group"
          >
            <span>Ver tabela completa (todos os 13 serviços, produtos e planos)</span>
            <ArrowRight className="w-5 h-5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>Ligar no telefone: (41) 99838-4885</span>
          </a>
        </div>

      </div>
    </section>
  );
}

