import React from "react";
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";
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
  const activeServices = services.filter((s) => s.active);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          O que você quer fazer?
        </h2>
        <p className="text-xs sm:text-sm text-[#a1a1aa]">
          Selecione o serviço desejado para ver as datas e horários livres.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {activeServices.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? "bg-[#18181b] border-[#d4af37] ring-2 ring-[#d4af37]/30 shadow-xl shadow-[#d4af37]/10"
                  : "bg-[#18181b]/90 border-[#27272a] hover:border-[#d4af37]/60 hover:bg-[#242428]"
              }`}
            >
              <div>
                {/* Optional Service Image */}
                {service.imageUrl && (
                  <div className="relative h-32 rounded-xl overflow-hidden mb-4 bg-[#0f0f0f]">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#0f0f0f]/90 border border-[#d4af37]/50 font-black text-[#d4af37] text-xs">
                      {service.formattedPrice}
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {service.name}
                  </h3>

                  {!service.imageUrl && (
                    <span className="text-lg font-black text-[#d4af37] shrink-0">
                      {service.formattedPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#a1a1aa] mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>aprox. {service.durationMinutes} min</span>
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#27272a]/60 flex items-center justify-between">
                <span className="text-xs font-bold text-[#d4af37]">
                  {isSelected ? "Selecionado" : "Clique para escolher"}
                </span>

                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 min-h-[40px] transition-all ${
                    isSelected
                      ? "bg-[#d4af37] text-[#0f0f0f]"
                      : "bg-[#242428] text-white border border-[#27272a] group-hover:border-[#d4af37] group-hover:text-[#d4af37]"
                  }`}
                >
                  <span>ESCOLHER</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
