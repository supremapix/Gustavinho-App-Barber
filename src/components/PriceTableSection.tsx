import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "../data/services";

export default function PriceTableSection() {
  const highlightPrices = SERVICES_DATA.slice(0, 5);

  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-left mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] block mb-2">
            PREÇOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Valores Principais
          </h2>
        </div>

        {/* Editorial Menu Format */}
        <div className="space-y-6 mb-10">
          {highlightPrices.map((item) => (
            <div key={item.id} className="border-b border-[#27272a] pb-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base sm:text-lg font-bold text-white">
                  {item.title}
                </span>
                <div className="flex-1 border-b border-dotted border-[#27272a] mx-2 hidden sm:block" />
                <span className="text-base sm:text-lg font-extrabold text-[#d4af37] shrink-0">
                  {item.formattedPrice}
                </span>
              </div>
              <p className="text-xs text-[#a1a1aa] mt-1">
                {item.shortDesc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-left">
          <Link
            to="/precos"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#e5c158] transition-colors group"
          >
            <span>Ver tabela de preços completa</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
