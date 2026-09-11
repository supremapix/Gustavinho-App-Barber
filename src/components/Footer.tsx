import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function Footer() {
  return (
    <footer className="relative bg-[#0f0f0f] text-[#f4f4f5] border-t border-[#27272a] overflow-hidden pt-16 pb-24 lg:pb-16">
      {/* Top Gold Geometric Line Graphic */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-80" />

      {/* Radial Gold Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#d4af37]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#27272a]">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Gustavinho do Corte Logo Official"
                className="w-16 h-16 object-contain rounded-full border border-[#d4af37] p-0.5 bg-[#0f0f0f] shadow-lg shadow-[#d4af37]/10"
              />
              <div>
                <span className="font-semibold text-xl tracking-tight text-white block">
                  Gustavinho <span className="text-[#d4af37]">do Corte</span>
                </span>
                <span className="text-[11px] text-[#a1a1aa] font-medium tracking-wider uppercase">
                  Barbearia no CIC • Curitiba
                </span>
              </div>
            </Link>

            <p className="text-[17px] text-[#a1a1aa] leading-relaxed max-w-md font-normal">
              A experiência premium de barbearia na palma da sua mão. Corte masculino, barboterapia, química e planos mensais com facilidade de agendamento no CIC.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#d4af37] font-semibold bg-[#18181b] border border-[#27272a] px-3.5 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>★ 4.9 no Google (+180 avaliações de clientes reais)</span>
            </div>
          </div>

          {/* Coluna 1: NAVEGAÇÃO */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase font-medium tracking-wider text-[#d4af37]">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-[#a1a1aa]">
              <li>
                <Link to="/servicos" className="hover:text-white transition-colors duration-150 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Serviços
                </Link>
              </li>
              <li>
                <Link to="/precos" className="hover:text-white transition-colors duration-150 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Preços
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-white transition-colors duration-150 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Planos Mensais
                </Link>
              </li>
              <li>
                <Link to="/resultados" className="hover:text-white transition-colors duration-150 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Resultados / Galeria
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors duration-150 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Sobre o Gustavinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: VISITE & HORÁRIO */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase font-medium tracking-wider text-[#d4af37]">
              Visite
            </h3>
            <div className="space-y-3 text-sm text-[#a1a1aa]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {BUSINESS_INFO.address.street}<br />
                  {BUSINESS_INFO.address.neighborhood} • {BUSINESS_INFO.address.city} - {BUSINESS_INFO.address.state}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Segunda a Sábado</span>
                  <span className="text-xs">09:00 às 19:00</span>
                </div>
              </div>

              <Link
                to="/localizacao"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#d4af37] hover:underline"
              >
                Como Chegar →
              </Link>
            </div>
          </div>

          {/* Coluna 3: CONTATO & CONTEÚDO */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] uppercase font-medium tracking-wider text-[#d4af37]">
              Contato & Conteúdo
            </h3>
            <ul className="space-y-2.5 text-sm text-[#a1a1aa]">
              <li>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-white font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-[#d4af37]" /> WhatsApp Direct
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#d4af37]" /> {BUSINESS_INFO.phone}
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Blog de Estilo
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/barbearia-no-cic" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Bairros Atendidos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights & Entity NAP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a1a1aa]">
          <div>
            © {new Date().getFullYear()} Gustavinho do Corte. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>CIC • Curitiba - PR</span>
            <span>•</span>
            <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37]">
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
