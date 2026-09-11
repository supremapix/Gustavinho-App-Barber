import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";
import PageHeroHeader from "../components/PageHeroHeader";

export interface GalleryItem {
  id: number;
  title: string;
  category: "cabelo" | "barba" | "quimica" | "combo" | "cuidado";
  desc: string;
  imageUrl: string;
  altText: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Degradê Mid Fade",
    category: "cabelo",
    desc: "Inspiração de degradê mid fade com transição suave.",
    imageUrl: "https://img.supremasite.com.br/gusta/05-galeria-degrade-mid-fade.jpg",
    altText: "Inspiração de degradê mid fade com transição suave."
  },
  {
    id: 2,
    title: "Barba Alinhada",
    category: "barba",
    desc: "Inspiração de barba cheia com contornos definidos.",
    imageUrl: "https://img.supremasite.com.br/gusta/06-galeria-barba-alinhada.jpg",
    altText: "Inspiração de barba cheia com contornos definidos."
  },
  {
    id: 3,
    title: "Platinado / Nevou",
    category: "quimica",
    desc: "Inspiração de cabelo platinado com laterais em degradê.",
    imageUrl: "https://img.supremasite.com.br/gusta/07-galeria-platinado-nevou.jpg",
    altText: "Inspiração de cabelo platinado com laterais em degradê."
  },
  {
    id: 4,
    title: "Corte Texturizado / Taper Fade",
    category: "cabelo",
    desc: "Inspiração de taper fade com cachos texturizados no topo.",
    imageUrl: "https://img.supremasite.com.br/gusta/08-galeria-corte-texturizado.jpg",
    altText: "Inspiração de taper fade com cachos texturizados no topo."
  },
  {
    id: 5,
    title: "Corte Masculino",
    category: "cabelo",
    desc: "Imagem ilustrativa de corte masculino com degradê e topo texturizado.",
    imageUrl: "https://img.supremasite.com.br/gusta/01-servico-corte-masculino.jpg",
    altText: "Imagem ilustrativa de corte masculino com degradê e topo texturizado."
  },
  {
    id: 6,
    title: "Cabelo + Barba",
    category: "combo",
    desc: "Imagem ilustrativa de cabelo com degradê e barba alinhada.",
    imageUrl: "https://img.supremasite.com.br/gusta/02-servico-cabelo-e-barba.jpg",
    altText: "Imagem ilustrativa de cabelo com degradê e barba alinhada."
  },
  {
    id: 7,
    title: "Barba Completa",
    category: "barba",
    desc: "Imagem ilustrativa de barboterapia com toalha e barba bem cuidada.",
    imageUrl: "https://img.supremasite.com.br/gusta/03-servico-barba-completa.jpg",
    altText: "Imagem ilustrativa de barboterapia com toalha e barba bem cuidada."
  },
  {
    id: 8,
    title: "Design de Sobrancelha",
    category: "cuidado",
    desc: "Imagem ilustrativa de sobrancelha masculina com acabamento natural.",
    imageUrl: "https://img.supremasite.com.br/gusta/04-servico-sobrancelha.jpg",
    altText: "Imagem ilustrativa de sobrancelha masculina com acabamento natural."
  }
];

export default function ResultsView() {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredItems = activeCategory === "todos"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(p => p.category === activeCategory);

  return (
    <div className="w-full bg-[#0f0f0f] pb-16">
      <PageHeroHeader
        breadcrumbs={[{ label: "Galeria de Resultados" }]}
        badge="Portfólio Real"
        title="Cortes e Transformações"
        description="Confira a galeria de fotos reais com os cortes masculinos, degradês, barbas, platinados e acabamentos realizados no Gustavinho do Corte no CIC Curitiba."
      />

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-wrap gap-2 justify-center">
        {[
          { id: "todos", label: "Todos" },
          { id: "cabelo", label: "Cabelo" },
          { id: "barba", label: "Barba" },
          { id: "quimica", label: "Química" },
          { id: "combo", label: "Combo" },
          { id: "cuidado", label: "Cuidados" }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-[#0f0f0f]">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    title={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-5">
                  <h2 className="text-base font-bold text-white mb-1.5 group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <a
                  href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1%2C%20vi%20o%20corte%20%22${encodeURIComponent(item.title)}%22%20na%20galeria%20e%20quero%20um%20igual`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#242428] border border-[#27272a] text-white hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center gap-1.5 transition-all min-h-[42px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Agendar</span>
                </a>
                <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
                  solicitar modelo de corte igual
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
