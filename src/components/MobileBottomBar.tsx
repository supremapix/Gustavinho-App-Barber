import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Tag, Calendar, MapPin } from "lucide-react";

export default function MobileBottomBar() {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-t border-[#27272a] h-[64px]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Barra de Navegação Mobile"
    >
      <div className="grid grid-cols-4 items-center h-full max-w-md mx-auto px-2">
        {/* INÍCIO */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors h-full ${
            location.pathname === "/"
              ? "text-[#d4af37] font-bold"
              : "text-[#a1a1aa] hover:text-white"
          }`}
        >
          <Home className="w-4 h-4 mb-1" />
          <span className="text-[10px] tracking-tight">Início</span>
        </Link>

        {/* PREÇOS */}
        <Link
          to="/precos"
          className={`flex flex-col items-center justify-center py-1 transition-colors h-full ${
            location.pathname === "/precos"
              ? "text-[#d4af37] font-bold"
              : "text-[#a1a1aa] hover:text-white"
          }`}
        >
          <Tag className="w-4 h-4 mb-1" />
          <span className="text-[10px] tracking-tight">Preços</span>
        </Link>

        {/* AGENDAR */}
        <Link
          to="/agendar"
          className="flex flex-col items-center justify-center py-1 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-extrabold my-1.5 h-[44px] transition-opacity hover:opacity-90 active:opacity-80"
          aria-label="Agendar Horário Online"
        >
          <Calendar className="w-4 h-4 text-[#0f0f0f] mb-0.5" />
          <span className="text-[10px] uppercase font-black tracking-wider text-[#0f0f0f]">
            AGENDAR
          </span>
        </Link>

        {/* ROTA */}
        <Link
          to="/localizacao"
          className={`flex flex-col items-center justify-center py-1 transition-colors h-full ${
            location.pathname === "/localizacao"
              ? "text-[#d4af37] font-bold"
              : "text-[#a1a1aa] hover:text-white"
          }`}
        >
          <MapPin className="w-4 h-4 mb-1" />
          <span className="text-[10px] tracking-tight">Rota</span>
        </Link>
      </div>
    </nav>
  );
}
