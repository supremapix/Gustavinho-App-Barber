import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Scissors,
  Tag,
  Calendar,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Award,
  HelpCircle,
  BookOpen,
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0f0f0f]/98 backdrop-blur-xl flex flex-col overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de Navegação Principal"
    >
      {/* Top Header inside overlay */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f] border-b border-[#27272a] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={BUSINESS_INFO.logoUrl}
            alt="Gustavinho do Corte Logo"
            className="w-10 h-10 object-contain rounded-full border border-[#d4af37]"
          />
          <div>
            <div className="font-extrabold text-base text-white">GUSTAVINHO DO CORTE</div>
            <div className="text-[11px] text-[#d4af37] font-medium">Barbearia no CIC • Curitiba</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#d4af37] min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-all"
          aria-label="Fechar Menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between max-w-lg mx-auto w-full pb-10">
        {/* Greeting */}
        <div className="mb-6 pt-2">
          <span className="inline-block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
            Navegação Direta
          </span>
          <h2 className="text-2xl font-black text-white">Olá. O que você procura?</h2>
        </div>

        {/* Primary Priority Actions Grid (2 Touches Access) */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="col-span-2 p-4 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-bold text-base flex items-center justify-between active:scale-[0.98] transition-all min-h-[56px]"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#0f0f0f]" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs uppercase tracking-wider opacity-80">Prioridade</span>
                <span className="text-base font-extrabold">AGENDAR HORÁRIO</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#0f0f0f]" />
          </a>

          <Link
            to="/servicos"
            onClick={onClose}
            className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] text-white flex flex-col gap-2 justify-between min-h-[72px] active:scale-95 transition-all"
          >
            <Scissors className="w-6 h-6 text-[#d4af37]" />
            <span className="font-bold text-sm text-white">Serviços</span>
          </Link>

          <Link
            to="/precos"
            onClick={onClose}
            className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] text-white flex flex-col gap-2 justify-between min-h-[72px] active:scale-95 transition-all"
          >
            <Tag className="w-6 h-6 text-[#d4af37]" />
            <span className="font-bold text-sm text-white">Preços</span>
          </Link>

          <Link
            to="/localizacao"
            onClick={onClose}
            className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] text-white flex flex-col gap-2 justify-between min-h-[72px] active:scale-95 transition-all"
          >
            <MapPin className="w-6 h-6 text-[#d4af37]" />
            <span className="font-bold text-sm text-white">Como Chegar</span>
          </Link>

          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            onClick={onClose}
            className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] text-white flex flex-col gap-2 justify-between min-h-[72px] active:scale-95 transition-all"
          >
            <Phone className="w-6 h-6 text-[#d4af37]" />
            <span className="font-bold text-sm text-white">Ligar Agora</span>
          </a>
        </div>

        {/* Quick Info Badge */}
        <div className="p-3.5 rounded-xl bg-[#18181b]/70 border border-[#27272a] mb-8 flex items-center justify-between text-xs text-[#a1a1aa]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <span>Seg a Sáb • 09h às 19h</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] font-semibold text-[10px]">
            ABERTO
          </span>
        </div>

        {/* Secondary Navigation Links */}
        <div className="space-y-1 border-t border-[#27272a] pt-6 mb-8">
          <span className="text-[11px] uppercase tracking-widest text-[#a1a1aa] font-semibold px-2 mb-2 block">
            Todas as Seções
          </span>

          <Link
            to="/planos"
            onClick={onClose}
            className="w-full px-3 py-3 rounded-lg text-white font-medium hover:bg-[#18181b] hover:text-[#d4af37] flex items-center justify-between min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span>Planos de Assinatura</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a1a1aa]" />
          </Link>

          <Link
            to="/resultados"
            onClick={onClose}
            className="w-full px-3 py-3 rounded-lg text-white font-medium hover:bg-[#18181b] hover:text-[#d4af37] flex items-center justify-between min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#d4af37]" />
              <span>Galeria & Resultados</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a1a1aa]" />
          </Link>

          <Link
            to="/sobre"
            onClick={onClose}
            className="w-full px-3 py-3 rounded-lg text-white font-medium hover:bg-[#18181b] hover:text-[#d4af37] flex items-center justify-between min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#d4af37]" />
              <span>Sobre o Gustavinho</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a1a1aa]" />
          </Link>

          <Link
            to="/faq"
            onClick={onClose}
            className="w-full px-3 py-3 rounded-lg text-white font-medium hover:bg-[#18181b] hover:text-[#d4af37] flex items-center justify-between min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#d4af37]" />
              <span>Perguntas Frequentes</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a1a1aa]" />
          </Link>

          <Link
            to="/blog"
            onClick={onClose}
            className="w-full px-3 py-3 rounded-lg text-white font-medium hover:bg-[#18181b] hover:text-[#d4af37] flex items-center justify-between min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#d4af37]" />
              <span>Blog de Estilo Masculino</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a1a1aa]" />
          </Link>
        </div>

        {/* Footer Contact Direct Button */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-[#18181b] border border-[#d4af37]/40 text-[#f4f4f5] flex items-center gap-3 justify-center text-sm font-semibold hover:bg-[#d4af37] hover:text-[#0f0f0f] transition-all min-h-[48px]"
        >
          <MessageCircle className="w-5 h-5 text-[#d4af37] group-hover:text-[#0f0f0f]" />
          <span>Falar com Barbeiro no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
