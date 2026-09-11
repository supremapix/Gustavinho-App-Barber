import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Navigation, ChevronRight, ShieldCheck, Phone, MessageCircle, Calendar } from "lucide-react";
import { LOCALIDADES_LIST, BairroItem } from "../data/bairros";
import { BUSINESS_INFO } from "../data/business";
import LocationSection from "../components/LocationSection";

export default function NeighborhoodIndexView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  useEffect(() => {
    document.title = "Bairros e Localidades Atendidas em Curitiba | Gustavinho do Corte";
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(LOCALIDADES_LIST.map((item) => item.categoria)));
    return ["Todos", ...cats];
  }, []);

  const filteredLocalidades = useMemo(() => {
    return LOCALIDADES_LIST.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.distancia.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === "Todos" || item.categoria === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f] text-[#f4f4f5]">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Bairros Atendidos</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-[#d4af37]/40 text-xs text-[#d4af37] font-bold mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Atendimento Regional no CIC Curitiba</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Bairros e Regiões Atendidas em Curitiba
        </h1>

        <p className="text-lg text-[#d4d4d8] max-w-3xl leading-relaxed mb-8">
          A barbearia <strong>Gustavinho do Corte</strong> está localizada estrategicamente na Cidade Industrial de Curitiba (CIC) e recebe clientes de <strong>126 bairros, vilas e loteamentos</strong> de Curitiba. Escolha sua região abaixo para ver rotas, ônibus e facilidades de acesso.
        </p>

        {/* Search and Category Filter Controls */}
        <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl shadow-xl space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do seu bairro ou vila (ex: Fazendinha, Xaxim, Vila Verde)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0f0f0f] border border-[#27272a] text-white placeholder-[#71717a] focus:outline-none focus:border-[#d4af37] text-base transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-[#0f0f0f] shadow-md"
                    : "bg-[#27272a] text-[#d4d4d8] hover:bg-[#3f3f46] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 126 Localidades */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Mostrando {filteredLocalidades.length} de {LOCALIDADES_LIST.length} localidades
          </h2>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todos");
              }}
              className="text-xs font-bold text-[#d4af37] hover:underline"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLocalidades.map((loc) => (
            <Link
              key={loc.slug}
              to={`/bairros/${loc.slug}`}
              className="group bg-[#18181b] border border-[#27272a] hover:border-[#d4af37]/60 p-5 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                    {loc.categoria}
                  </span>
                  <span className="text-xs font-semibold text-[#a1a1aa] bg-[#27272a] px-2 py-0.5 rounded">
                    ~{loc.distancia}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors mb-1">
                  {loc.name}
                </h3>
                <p className="text-xs text-[#a1a1aa] line-clamp-2">
                  Atendimento de barbearia para moradores do {loc.name} no CIC Curitiba.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-bold text-[#d4af37]">
                <span>Rota</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Location Map Section */}
      <LocationSection />
    </div>
  );
}
