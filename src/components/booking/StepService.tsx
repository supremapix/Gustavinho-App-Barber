import React, { useState, useMemo } from "react";
import { Clock, ChevronRight, Scissors } from "lucide-react";
import { ServiceItem } from "../../types/booking";

interface StepServiceProps {
  services: ServiceItem[];
  selectedServiceId?: string;
  onSelectService: (service: ServiceItem) => void;
}

export default function StepService({
  services,
  selectedServiceId,
  onSelectService
}: StepServiceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const activeServices = useMemo(() => {
    return services.filter((s) => s.active);
  }, [services]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    activeServices.forEach((s) => {
      if (s.category) set.add(s.category.toLowerCase());
    });
    return ["all", ...Array.from(set)];
  }, [activeServices]);

  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") return activeServices;
    return activeServices.filter(
      (s) => s.category?.toLowerCase() === selectedCategory
    );
  }, [activeServices, selectedCategory]);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "all":
        return "Todos";
      case "cabelo":
        return "Cabelo";
      case "barba":
        return "Barba";
      case "combo":
        return "Combos";
      case "quimica":
        return "Química";
      case "cuidado":
        return "Cuidados";
      default:
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Subtle & Compact Header */}
      <div className="text-center mb-5">
        <h2 className="text-base sm:text-lg font-medium text-white tracking-tight mb-1">
          Escolha o serviço
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Toque no serviço desejado para visualizar a agenda de horários livres.
        </p>
      </div>

      {/* Category Filter Pills (if more than 1 category) */}
      {categories.length > 2 && (
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#d4af37] text-[#0f0f0f] shadow-sm font-semibold"
                    : "bg-[#18181b] text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            );
          })}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredServices.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? "bg-[#18181b] border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-lg shadow-[#d4af37]/10"
                  : "bg-[#141416] border-zinc-800/90 hover:border-[#d4af37]/50 hover:bg-[#18181b]"
              }`}
            >
              <div>
                {/* Optional Service Compact Image */}
                {service.imageUrl && (
                  <div className="relative h-28 rounded-lg overflow-hidden mb-3 bg-[#0a0a0c]">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-[#d4af37]/40 font-semibold text-[#d4af37] text-xs">
                      {service.formattedPrice}
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                    {service.name}
                  </h3>

                  {!service.imageUrl && (
                    <span className="text-sm sm:text-base font-semibold text-[#d4af37] shrink-0">
                      {service.formattedPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-2">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  <span>aprox. {service.durationMinutes} min</span>
                </div>

                {service.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                    {service.description}
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                <span className="text-[11px] font-medium text-zinc-400 group-hover:text-[#d4af37] transition-colors flex items-center gap-1">
                  <Scissors className="w-3 h-3 text-[#d4af37]" />
                  <span>{isSelected ? "Selecionado" : "Disponível"}</span>
                </span>

                <div className="text-right">
                  <button
                    type="button"
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      isSelected
                        ? "bg-[#d4af37] text-[#0f0f0f]"
                        : "bg-zinc-800/90 text-white border border-zinc-700/60 group-hover:border-[#d4af37]/60 group-hover:text-[#d4af37]"
                    }`}
                  >
                    <span>Escolher</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5">
                    ver horários
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
