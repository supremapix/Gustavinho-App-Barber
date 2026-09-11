import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Tag, Calendar, MessageCircle, Phone } from "lucide-react";
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

        {/* AGENDAMENTO ONLINE - DESTAQUE CENTRAL NO SISTEMA */}
        <Link
          to="/agendar"
          className={`flex flex-col items-center justify-center py-1 rounded-xl font-black my-1 h-[52px] shadow-lg active:scale-95 transition-all ${
            location.pathname === "/agendar"
              ? "bg-[#e5c158] text-[#0f0f0f] ring-2 ring-white"
              : "bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f]"
          }`}
          aria-label="Agendar horário online pelo sistema"
        >
          <Calendar className="w-5 h-5 text-[#0f0f0f] mb-0.5" />
          <span className="text-[10px] uppercase font-black tracking-tight text-[#0f0f0f] leading-none">
            Agendar
          </span>
        </Link>

        {/* WHATSAPP */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#25D366] hover:text-[#20bd5a] transition-colors h-full min-h-[48px]"
          aria-label="Falar no WhatsApp (41) 99838-4885"
        >
          <MessageCircle className="w-5 h-5 mb-1 text-[#25D366]" />
          <span className="text-[11px] font-medium leading-none text-[#25D366]">WhatsApp</span>
        </a>

        {/* LIGAR TELEFONE */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 text-[#a1a1aa] hover:text-[#d4af37] transition-colors h-full min-h-[48px]"
          aria-label="Ligar por telefone para (41) 99838-4885"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-medium leading-none">Ligar</span>
        </a>
      </div>
    </nav>
  );
}

