import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function TransformationShowcase() {
  const [activeTab, setActiveTab] = useState<"todos" | "degrade" | "barba" | "platinado">("todos");

  const galleryItems = [
    {
      id: "gal-1",
      title: "Degradê Mid Fade Navalhado",
      category: "degrade",
      tag: "Degradê Perfeito",
      desc: "Discarte uniforme com pezinho definido e acabamento impecável.",
      imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "gal-2",
      title: "Barboterapia & Alinhamento",
      category: "barba",
      tag: "Barba Modelada",
      desc: "Toalha quente aromática, contornos nítidos na navalha e hidratação.",
      imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "gal-3",
      title: "Platinado / Nevou Profissional",
      category: "platinado",
      tag: "Nevou",
      desc: "Descoloração técnica com preservação da saúde dos fios.",
      imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "gal-4",
      title: "Corte Texturizado Moderno",
      category: "degrade",
      tag: "Corte Moderno",
      desc: "Taper fade com textura no topo para facilitar a estilização diária.",
      imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredItems = activeTab === "todos"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
              Portfólio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Resultados Reais
            </h2>
          </div>

          {/* Filter Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#a1a1aa]">
            {[
              { id: "todos", label: "Todos" },
              { id: "degrade", label: "Degradê" },
              { id: "barba", label: "Barba" },
              { id: "platinado", label: "Nevou" }
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
              className="group rounded-2xl overflow-hidden border border-[#27272a] bg-[#18181b] transition-colors hover:border-[#d4af37]/60"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#0f0f0f]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5 text-left">
                <h3 className="font-bold text-base text-white mb-1">
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
            <span>Ver galeria completa de cortes</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
