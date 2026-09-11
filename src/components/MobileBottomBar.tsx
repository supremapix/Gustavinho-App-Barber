import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Tag, MessageCircle, Phone, MapPin } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function MobileBottomBar() {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121214] border-t border-[#27272a] h-[68px] shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Barra de Navegação Rápida"
    >
      <div className="grid grid-cols-5 items-center h-full max-w-lg mx-auto px-1">
        {/* INÍCIO */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors h-full min-h-[48px] ${
            location.pathname === "/"
              ? "text-[#d4af37] font-bold"
              : "text-[#a1a1aa] hover:text-white"
          }`}
          aria-label="Ir para a página inicial"
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-medium leading-none">Início</span>
        </Link>

        {/* PREÇOS */}
        <Link
          to="/precos"
          className={`flex flex-col items-center justify-center py-1 transition-colors h-full min-h-[48px] ${
            location.pathname === "/precos"
              ? "text-[#d4af37] font-bold"
              : "text-[#a1a1aa] hover:text-white"
          }`}
          aria-label="Ver tabela de preços completa"
        >
          <Tag className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-medium leading-none">Preços</span>
        </Link>

        {/* WHATSAPP AGENDAMENTO - HIGHLIGHT */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0f0f0f] font-black my-1 h-[52px] shadow-md active:scale-95 transition-all"
          aria-label="Agendamento exclusivo pelo WhatsApp (41) 99838-4885"
        >
          <MessageCircle className="w-5 h-5 text-[#0f0f0f] mb-0.5" />
          <span className="text-[10px] uppercase font-black tracking-tight text-[#0f0f0f] leading-none">
            WhatsApp
          </span>
        </a>

        {/* LIGAR TELEFONE - ESSENCIAL PARA IDOSOS */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 text-[#a1a1aa] hover:text-[#d4af37] transition-colors h-full min-h-[48px]"
          aria-label="Ligar por telefone para (41) 99838-4885"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-medium leading-none">Ligar</span>
        </a>

        {/* ROTA / LOCALIZAÇÃO */}
        <Link
          to="/localizacao"
          className={`flex flex-col items-center justify-center py-1 transition-colors h-full min-h-[48px] ${
            location.pathname === "/localizacao"
              ? "text-[#d4af37] font-bold"
              : "text-[#a1a1aa] hover:text-white"
          }`}
          aria-label="Ver endereço e como chegar no CIC"
        >
          <MapPin className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-medium leading-none">Local</span>
        </Link>
      </div>
    </nav>
  );
}

