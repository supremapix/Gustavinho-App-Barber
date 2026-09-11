import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Calendar, Phone, MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";
import MobileMenuOverlay from "./MobileMenuOverlay";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#27272a] py-3.5 shadow-lg shadow-black/50"
            : "bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Gustavinho do Corte - Página Inicial"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 border border-[#d4af37]/60 group-hover:border-[#d4af37] transition-colors duration-200 shrink-0">
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Gustavinho do Corte"
                className="w-full h-full object-contain rounded-full bg-[#0f0f0f]"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#d4af37] transition-colors duration-200">
                Gustavinho <span className="text-[#d4af37]">do Corte</span>
              </span>
              <span className="text-[11px] text-[#a1a1aa] tracking-wider uppercase font-medium hidden sm:block">
                Barbearia no CIC • Curitiba
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname === "/" ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Início
            </Link>
            <Link
              to="/servicos"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname.startsWith("/servicos") ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Serviços
            </Link>
            <Link
              to="/precos"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname === "/precos" ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Preços
            </Link>
            <Link
              to="/planos"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname === "/planos" ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Planos
            </Link>
            <Link
              to="/resultados"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname === "/resultados" ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Resultados
            </Link>
            <Link
              to="/bairros"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname.startsWith("/bairros") ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Bairros
            </Link>
            <Link
              to="/blog"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname.startsWith("/blog") ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Blog
            </Link>
            <Link
              to="/localizacao"
              className={`transition-colors duration-200 hover:text-[#d4af37] ${
                location.pathname === "/localizacao" ? "text-[#d4af37] font-semibold" : "text-[#f4f4f5]"
              }`}
            >
              Localização
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-3.5 py-2.5 rounded-xl border border-[#27272a] bg-[#18181b] text-[#f4f4f5] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-200 flex items-center gap-2 text-xs font-bold"
              title="Ligar para a barbearia"
              aria-label="Ligar para a barbearia"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>(41) 99838-4885</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[#27272a] bg-[#18181b] text-[#25D366] hover:border-[#25D366] transition-all duration-200"
              title="Falar no WhatsApp"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              to="/agendar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] transition-all duration-200 shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#0f0f0f]" />
              <span>Agendar Horário</span>
            </Link>
          </div>

          {/* Mobile Menu Button - Regra: [ LOGO ] [ MENU ] */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#d4af37] min-h-[44px] focus:outline-none active:opacity-75 transition-opacity"
              aria-label="Abrir Menu de Navegação"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-[#d4af37]">MENU</span>
              <Menu className="w-5 h-5 text-[#d4af37]" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
