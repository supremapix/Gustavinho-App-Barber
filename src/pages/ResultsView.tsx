import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, Scissors, Calendar, ChevronRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function ResultsView() {
  const [activeCategory, setActiveCategory] = useState("todos");

  const portfolio = [
    {
      id: 1,
      title: "Mid Fade com Pezinho Navalhado",
      category: "cabelo",
      desc: "Degradê suave na meia altura das têmporas, transição perfeita sem marcas e alinhamento do contorno.",
      imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Barboterapia & Desenhado",
      category: "barba",
      desc: "Rosto tratado com óleo essencial e toalha quente, seguido de navalha afiada para traços retos.",
      imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Platinado Nevou em Cabelo Curto",
      category: "quimica",
      desc: "Processo rápido de descoloração e matização para tom loiro cinza/branco.",
      imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Taper Fade & Texture Pompadour",
      category: "cabelo",
      desc: "Degradê marcado somente nas têmporas e nuca com textura solta no topo.",
      imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Corte Social Moderno com Tesoura",
      category: "cabelo",
      desc: "Acabamento elegante na tesoura para profissionais e eventos.",
      imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Combo Degradê + Barba Modelada",
      category: "combo",
      desc: "Visual unificado combinando fade lateral com barba alinhada no mesmo tom.",
      imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredItems = activeCategory === "todos"
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Galeria de Resultados</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
          Portfólio Real
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Cortes e Transformações
        </h1>
        <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl leading-relaxed">
          Confira o padrão de qualidade dos cortes, degradês, barbas e químicas realizados diariamente no Gustavinho do Corte no CIC Curitiba.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-wrap gap-2 justify-center">
        {[
          { id: "todos", label: "Todos os Trabalhos" },
          { id: "cabelo", label: "Cabelo & Degradê" },
          { id: "barba", label: "Barboterapia" },
          { id: "quimica", label: "Platinado / Nevou" },
          { id: "combo", label: "Combo Completo" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
              activeCategory === tab.id
                ? "bg-[#d4af37] text-[#0f0f0f] shadow-md shadow-[#d4af37]/20"
                : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#0f0f0f]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <a
                  href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1%2C%20vi%20o%20corte%20%22${encodeURIComponent(item.title)}%22%20na%20galeria%20e%20quero%20um%20igual`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#242428] border border-[#27272a] text-white hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center gap-1.5 transition-all min-h-[44px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Quero um visual assim</span>
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
