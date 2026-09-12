import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Calendar, Clock, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function Footer() {
  return (
    <footer className="relative bg-[#121214] text-[#f4f4f5] border-t-2 border-[#27272a] pt-14 pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Senior-Friendly Direct Agendamento Banner */}
        <div className="mb-12 bg-[#18181b] border-2 border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-[#d4af37]">
              Atendimento no CIC Curitiba
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Agendamento Online ou por Telefone
            </h3>
            <p className="text-base text-[#d4d4d8] max-w-xl leading-relaxed">
              Agende pelo sistema online em poucos cliques ou tire dúvidas direto no WhatsApp e ligação.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/agendar"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] text-base font-black shadow-md active:scale-95 transition-all min-h-[52px]"
            >
              <Calendar className="w-5 h-5 text-[#0f0f0f]" />
              <span>Agendar no Sistema</span>
            </Link>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0f0f0f] text-base font-extrabold shadow-md active:scale-95 transition-all min-h-[52px]"
            >
              <MessageCircle className="w-5 h-5 text-[#0f0f0f]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#3f3f46] hover:border-[#d4af37] text-base font-bold active:scale-95 transition-all min-h-[52px]"
            >
              <Phone className="w-5 h-5 text-[#d4af37]" />
              <span>Ligar</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#27272a]">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3.5 group w-fit">
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Gustavinho do Corte Logo Oficial"
                className="w-14 h-14 object-contain rounded-full border-2 border-[#d4af37] p-0.5 bg-[#0f0f0f]"
              />
              <div>
                <span className="font-bold text-xl sm:text-2xl tracking-tight text-white block">
                  Gustavinho <span className="text-[#d4af37]">do Corte</span>
                </span>
                <span className="text-xs text-[#a1a1aa] font-medium tracking-wide uppercase">
                  Barbearia no CIC • Curitiba
                </span>
              </div>
            </Link>

            <p className="text-base text-[#d4d4d8] leading-relaxed max-w-md">
              Corte masculino, barba na navalha com toalha quente, selagem, platinado e planos mensais no coração do CIC. Agendamento ágil e direto pelo WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#18181b] border border-[#d4af37]/40 p-4 rounded-xl w-fit">
              <a
                href={BUSINESS_INFO.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <img
                  src={BUSINESS_INFO.qrCodeUrl}
                  alt="QR Code Avaliação Google"
                  className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-[#d4af37] group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block">Avalie no Google Maps</span>
                  <span className="text-sm font-extrabold text-white group-hover:text-[#d4af37] transition-colors">
                    ★ 5.0 no Google (+150 avaliações)
                  </span>
                  <span className="text-xs text-[#a1a1aa] block">Clique ou escaneie o QR Code</span>
                </div>
              </a>
            </div>
          </div>

          {/* Coluna 1: SERVIÇOS & VALORES */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37]">
              Serviços & Agendamento
            </h3>
            <ul className="space-y-3 text-base text-[#d4d4d8]">
              <li>
                <Link to="/agendar" className="text-[#d4af37] hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> Agendar Horário
                </Link>
              </li>
              <li>
                <Link to="/precos" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Tabela de Preços
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Todos os Serviços
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Planos Mensais
                </Link>
              </li>
              <li>
                <Link to="/resultados" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Galeria de Cortes
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: LOCALIZAÇÃO & HORÁRIO */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37]">
              Endereço no CIC
            </h3>
            <div className="space-y-3.5 text-base text-[#d4d4d8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-white block font-semibold">Gustavinho do Corte</strong>
                  {BUSINESS_INFO.address.street}<br />
                  CIC, Curitiba — PR
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Segunda a Sábado</span>
                  <span className="text-sm text-[#a1a1aa]">09:00 às 19:00</span>
                </div>
              </div>

              <Link
                to="/localizacao"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#d4af37] hover:underline pt-1"
              >
                <span>Ver Mapa e Como Chegar</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </Link>
            </div>
          </div>

          {/* Coluna 3: CONTATO DIRETO */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37]">
              Falar Conosco
            </h3>
            <ul className="space-y-3.5 text-base text-[#d4d4d8]">
              <li>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-white font-semibold"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>WhatsApp: (41) 99838-4885</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-5 h-5 text-[#d4af37]" />
                  <span>Ligar: {BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Sobre o Gustavinho
                </Link>
              </li>
              <li>
                <Link to="/barbearia-no-cic" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" /> Atendimento CIC Curitiba
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#a1a1aa]">
          <div>
            © {new Date().getFullYear()} Gustavinho do Corte • Barbearia no CIC Curitiba
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Rua Desembargador Cid Campelo, 5212 — CIC</span>
            <span>•</span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] font-semibold hover:underline"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>

        {/* Suprema Credit */}
        <SupremaCredit />
      </div>
    </footer>
  );
}

export function SupremaCredit() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-5 border-t border-[#C9A227]/20">
      <div className="flex justify-center">
        <a
          id="developer-suprema-link"
          href="https://supremasite.com.br"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Site desenvolvido pela Suprema Sites Express"
          className="
            group
            inline-flex items-center justify-center gap-3
            rounded-full
            border border-[#C9A227]/35
            bg-black/40
            px-5 py-2.5
            text-xs sm:text-sm
            text-neutral-400
            backdrop-blur-sm
            transition-all duration-300
            hover:border-[#D4AF37]/70
            hover:bg-[#D4AF37]/5
            hover:text-neutral-200
            hover:shadow-[0_0_20px_rgba(212,175,55,0.10)]
          "
        >
          <span className="font-medium tracking-wide">
            Site desenvolvido por
          </span>

          <span className="h-4 w-px bg-[#D4AF37]/30" />

          <span className="font-semibold tracking-wide text-[#D4AF37] group-hover:text-[#E5C45B] transition-colors">
            Suprema Sites Express
          </span>

          <img
            src="https://img.supremamidia.com/suprema-img.png"
            alt="Suprema Sites Express"
            className="
              h-[17px] w-auto
              object-contain
              opacity-90
              transition-all duration-300
              group-hover:opacity-100
              group-hover:scale-105
            "
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
    </div>
  );
}

