import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Scissors,
  Tag,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Award,
  HelpCircle,
  ChevronRight,
  Sparkles,
  ExternalLink
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
      className="fixed inset-0 z-50 bg-[#121214] flex flex-col overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de Navegação Principal"
    >
      {/* Top Header inside overlay */}
      <div className="sticky top-0 z-20 bg-[#18181b] border-b border-[#27272a] px-4 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={BUSINESS_INFO.logoUrl}
            alt="Gustavinho do Corte"
            className="w-11 h-11 object-contain rounded-full border-2 border-[#d4af37] bg-[#0f0f0f]"
          />
          <div>
            <div className="font-bold text-base text-white leading-tight">
              Gustavinho <span className="text-[#d4af37]">do Corte</span>
            </div>
            <div className="text-xs text-[#a1a1aa]">
              Barbearia no CIC • Curitiba
            </div>
          </div>
        </div>

        {/* Big, easy to tap Close button with text */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#3f3f46] min-h-[48px] font-bold text-sm active:scale-95 transition-all"
          aria-label="Fechar Menu"
        >
          <X className="w-5 h-5 text-white" />
          <span>Fechar</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between max-w-lg mx-auto w-full pb-12">
        {/* Priority 1: Online Booking System */}
        <div className="space-y-3 mb-6">
          <Link
            to="/agendar"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] font-extrabold flex items-center justify-between shadow-xl active:scale-[0.98] transition-all min-h-[64px]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                <Calendar className="w-7 h-7 text-[#0f0f0f]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-black/70">
                  Agendamento Online
                </span>
                <span className="text-lg sm:text-xl font-black leading-tight text-[#0f0f0f]">
                  Agendar Horário
                </span>
                <span className="text-xs font-semibold text-black/80">
                  Escolha serviço, dia e horário no sistema
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#0f0f0f] shrink-0" />
          </Link>

          {/* Priority 2: WhatsApp for direct inquiries & support */}
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-3.5 rounded-2xl bg-[#18181b] hover:bg-[#222227] border border-[#25D366]/40 text-white flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white leading-tight">
                  Dúvidas no WhatsApp
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  (41) 99838-4885 • Fale com nossa equipe
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </a>

          {/* Priority 3: Traditional Phone Call Button for elderly clients */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            onClick={onClose}
            className="w-full p-3.5 rounded-2xl bg-[#18181b] hover:bg-[#222227] border border-[#3f3f46] text-white flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#27272a] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white leading-tight">
                  Ligar por Telefone
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  (41) 99838-4885 • Ligação normal
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </a>
        </div>

        {/* Main Sections Navigation with big buttons */}
        <div className="space-y-2.5 mb-6">
          <span className="text-xs uppercase tracking-wider text-[#a1a1aa] font-bold px-1 block mb-2 text-left">
            Páginas e Valores
          </span>

          <Link
            to="/precos"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <Tag className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Tabela de Preços Completa
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Corte R$ 50 • Barba R$ 50 • Químicas
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/servicos"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <Scissors className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Serviços e Tratamentos
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Detalhes de cada serviço capilar e facial
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/planos"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <Sparkles className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Planos Mensais
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Assinaturas a partir de R$ 90/mês
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/bairros"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <MapPin className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Bairros Atendidos (126 Regiões)
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Localidades, vilas e rotas de acesso
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/blog"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <Sparkles className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Blog & Cuidados Masculinos
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Dicas de barba, químicas e tendências
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/localizacao"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <MapPin className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Endereço e Como Chegar
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Rua Des. Cid Campelo, 5212 — CIC
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/resultados"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <Award className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Fotos e Resultados
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Galeria de cortes realizados
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>

          <Link
            to="/faq"
            onClick={onClose}
            className="w-full p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] flex items-center justify-between min-h-[56px] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <HelpCircle className="w-6 h-6 text-[#d4af37] shrink-0" />
              <div className="text-left">
                <span className="font-bold text-base text-white block">
                  Dúvidas Frequentes
                </span>
                <span className="text-xs text-[#a1a1aa]">
                  Horários, formas de pagamento e localização
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a1a1aa] shrink-0" />
          </Link>
        </div>

        {/* Clear Business Location & Hours Summary */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 text-left space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide block">
                Localização
              </span>
              <p className="text-sm text-[#d4af37] font-semibold">
                Rua Desembargador Cid Campelo, 5212
              </p>
              <p className="text-xs text-[#a1a1aa]">
                Bairro CIC — Curitiba - PR
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-[#27272a]">
            <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide block">
                Horário de Atendimento
              </span>
              <p className="text-sm font-semibold text-white">
                Segunda a Sábado: 09:00 às 19:00
              </p>
              <p className="text-xs text-[#a1a1aa]">
                Domingos e Feriados: Fechado
              </p>
            </div>
          </div>
        </div>

        {/* Big Close Button at Bottom */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[#27272a] text-white font-bold text-base hover:bg-[#3f3f46] active:scale-95 transition-all min-h-[48px]"
        >
          Voltar para o site (Fechar Menu)
        </button>
      </div>
    </div>
  );
}

