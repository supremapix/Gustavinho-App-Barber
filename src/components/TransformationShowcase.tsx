import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "../pages/ResultsView";

export default function TransformationShowcase() {
  const [activeTab, setActiveTab] = useState<"todos" | "cabelo" | "barba" | "quimica">("todos");

  const filteredItems = activeTab === "todos"
    ? GALLERY_ITEMS.slice(0, 4)
    : GALLERY_ITEMS.filter(item => item.category === activeTab).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfólio Real</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Galeria de Resultados
            </h2>
          </div>

          {/* Filter Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#a1a1aa]">
            {[
              { id: "todos", label: "Todos" },
              { id: "cabelo", label: "Cabelo" },
              { id: "barba", label: "Barba" },
              { id: "quimica", label: "Química" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`transition-colors py-1 ${
                  activeTab === tab.id
                    ? "text-[#d4af37] font-bold border-b border-[#d4af37]"
                    : "hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden border border-[#27272a] bg-[#18181b] transition-all hover:border-[#d4af37]/60 shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-[#0f0f0f]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  title={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-5 text-left">
                <h3 className="font-bold text-base text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-left">
          <Link
            to="/resultados"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#e5c158] transition-colors group"
          >
            <span>Galeria</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="block text-[10px] text-gray-400 font-normal tracking-tight mt-0.5">
            portfólio com todos os modelos de corte
          </span>
        </div>
      </div>
    </section>
  );
}
