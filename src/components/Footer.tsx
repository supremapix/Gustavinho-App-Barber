import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
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
              Agendamento Exclusivo pelo WhatsApp
            </h3>
            <p className="text-base text-[#d4d4d8] max-w-xl leading-relaxed">
              Tire dúvidas, consulte produtos e garanta seu horário de corte e barba com rapidez.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0f0f0f] text-base font-extrabold shadow-md active:scale-95 transition-all min-h-[52px]"
            >
              <MessageCircle className="w-5 h-5 text-[#0f0f0f]" />
              <span>(41) 99838-4885</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#3f3f46] hover:border-[#d4af37] text-base font-bold active:scale-95 transition-all min-h-[52px]"
            >
              <Phone className="w-5 h-5 text-[#d4af37]" />
              <span>Ligar no Telefone</span>
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

            <div className="flex items-center gap-2 text-sm text-[#d4af37] font-bold bg-[#18181b] border border-[#27272a] px-4 py-2.5 rounded-xl w-fit">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <span>★ 4.9 no Google (+180 avaliações de clientes reais)</span>
            </div>
          </div>

          {/* Coluna 1: SERVIÇOS & VALORES */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37]">
              Serviços & Valores
            </h3>
            <ul className="space-y-3 text-base text-[#d4d4d8]">
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
      </div>
    </footer>
  );
}

