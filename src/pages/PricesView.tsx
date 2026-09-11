import React from "react";
import { Link } from "react-router-dom";
import { Tag, Phone, MessageCircle, Clock, MapPin, Check, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { PRODUCTS_DATA } from "../data/products";
import { SUBSCRIPTION_PLANS } from "../data/plans";
import { BUSINESS_INFO } from "../data/business";

export default function PricesView() {
  return (
    <div className="w-full pt-28 pb-20 bg-[#121214] min-h-screen text-[#f4f4f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#a1a1aa] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Tabela de Preços e Valores</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 text-left">
          <span className="inline-block text-xs uppercase font-extrabold tracking-wider text-[#d4af37] bg-[#18181b] border border-[#d4af37]/30 px-3 py-1 rounded-md mb-3">
            Valores Oficiais • CIC Curitiba
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Tabela de Preços — Gustavinho do Corte
          </h1>
          <p className="text-base sm:text-lg text-[#d4d4d8] max-w-2xl leading-relaxed">
            Consulte a lista completa de serviços, produtos para cuidado diário e planos de assinatura da barbearia no CIC Curitiba.
          </p>
        </div>

        {/* Prominent Agendamento Exclusivo Card (Highly Visible for Seniors & Laypeople) */}
        <div className="mb-12 bg-[#18181b] border-2 border-[#25D366] rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-[#25D366]">
                Agendamento Exclusivo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Agende seu horário pelo WhatsApp: (41) 99838-4885
            </h2>
            <p className="text-sm text-[#a1a1aa]">
              Atendimento rápido sem complicação. Segunda a Sábado das 09:00 às 19:00.
            </p>
          </div>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0f0f0f] font-black text-base flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all shrink-0 min-h-[52px]"
          >
            <MessageCircle className="w-5 h-5 text-[#0f0f0f]" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
            1. TABELA DE SERVIÇOS
            ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#27272a]">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37] block">
                Cortes, Barba e Químicas
              </span>
              <h2 className="text-2xl font-black text-white">SERVIÇOS — Tabela de Preços</h2>
            </div>
            <span className="hidden sm:inline-block text-xs text-[#a1a1aa]">
              Valores individuais por atendimento
            </span>
          </div>

          {/* Clean Real Table Structure for maximum clarity */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1f1f23] border-b border-[#27272a] text-xs uppercase tracking-wider text-[#a1a1aa] font-bold">
                    <th scope="col" className="py-4 px-4 sm:px-6">Serviço</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 hidden md:table-cell">Descrição / Duração</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right sm:text-center">Preço</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right">Agendar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-sm">
                  {SERVICES_DATA.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-[#222227] transition-colors group"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-base text-white group-hover:text-[#d4af37] transition-colors">
                          {service.title}
                        </div>
                        <div className="text-xs text-[#a1a1aa] md:hidden mt-0.5">
                          {service.duration} • {service.category}
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-sm text-[#a1a1aa] hidden md:table-cell max-w-sm">
                        <div className="line-clamp-2 text-[#d4d4d8]">{service.shortDesc}</div>
                        <div className="text-xs text-[#a1a1aa] mt-0.5">
                          Duração média: <strong className="text-white">{service.duration}</strong>
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right sm:text-center whitespace-nowrap">
                        <span className="text-lg sm:text-xl font-black text-[#d4af37]">
                          {service.formattedPrice}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <a
                          href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20${encodeURIComponent(service.title)}%20(Gustavinho%20do%20Corte%20CIC).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0f0f0f] font-bold text-xs active:scale-95 transition-all"
                          aria-label={`Agendar ${service.title} pelo WhatsApp`}
                        >
                          <MessageCircle className="w-4 h-4 text-[#0f0f0f]" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
            2. PRODUTOS PREMIUM
            ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#27272a]">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37] block">
                Cuidado em Casa
              </span>
              <h2 className="text-2xl font-black text-white">PRODUTOS PREMIUM</h2>
            </div>
            <span className="text-xs text-[#d4af37] font-semibold">
              Linha Exclusiva
            </span>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1f1f23] border-b border-[#27272a] text-xs uppercase tracking-wider text-[#a1a1aa] font-bold">
                    <th scope="col" className="py-4 px-4 sm:px-6">Produto</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 hidden sm:table-cell">Finalidade</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right sm:text-center">Preço</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right">Consultar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-sm">
                  {PRODUCTS_DATA.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-[#222227] transition-colors group"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-base text-white group-hover:text-[#d4af37] transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-[#a1a1aa] sm:hidden mt-0.5">
                          {product.shortDesc}
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-sm text-[#d4d4d8] hidden sm:table-cell max-w-sm">
                        {product.shortDesc}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right sm:text-center whitespace-nowrap">
                        <span className="text-sm sm:text-base font-bold text-[#d4af37] bg-[#27272a] px-3 py-1 rounded-md">
                          {product.priceText}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <a
                          href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Gostaria%20de%20consultar%20o%20valor%20do%20produto%20${encodeURIComponent(product.name)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white hover:text-[#d4af37] border border-[#3f3f46] font-bold text-xs transition-all"
                        >
                          <MessageCircle className="w-4 h-4 text-[#25D366]" />
                          <span className="hidden sm:inline">Perguntar</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1f1f23] border border-[#27272a] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[#d4af37] shrink-0 hidden sm:block" />
              <p className="text-sm text-[#d4d4d8] font-medium">
                Consulte o valor dos produtos no atendimento premium pelo WhatsApp.
              </p>
            </div>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Quero%20consultar%20a%20linha%20de%20produtos%20premium%20da%20barbearia.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#d4af37] hover:underline whitespace-nowrap"
            >
              Falar sobre produtos no WhatsApp →
            </a>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
            3. PLANOS MENSAIS
            ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#27272a]">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37] block">
                Assinatura Recorrente
              </span>
              <h2 className="text-2xl font-black text-white">PLANOS MENSAIS</h2>
            </div>
            <span className="text-xs text-[#a1a1aa]">
              Sem fidelidade • Cancele quando quiser
            </span>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1f1f23] border-b border-[#27272a] text-xs uppercase tracking-wider text-[#a1a1aa] font-bold">
                    <th scope="col" className="py-4 px-4 sm:px-6">Plano</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Dias Válidos</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-center">Valor/mês</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-center">Economia Estimada</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right">Contratar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-sm">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-[#222227] transition-colors group"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-base text-white group-hover:text-[#d4af37] transition-colors flex items-center gap-2">
                          <span>{plan.name}</span>
                          {plan.isPopular && (
                            <span className="px-2 py-0.5 rounded bg-[#d4af37] text-[#0f0f0f] text-[10px] font-black uppercase">
                              {plan.highlightTag || "Destaque"}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#a1a1aa] mt-0.5">
                          {plan.shortDesc}
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <span className="text-sm font-semibold text-[#d4d4d8]">
                          {plan.days}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                        <span className="text-xl font-black text-[#d4af37]">
                          {plan.formattedPrice}
                        </span>
                        <span className="text-xs text-[#a1a1aa] block">por mês</span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                        <span className="text-sm font-black text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-md">
                          Economiza {plan.economy}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <a
                          href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Tenho%20interesse%20em%20assinar%20o%20${encodeURIComponent(plan.name)}%20(${plan.formattedPrice}%2Fm%C3%AAs).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] font-extrabold text-xs active:scale-95 transition-all shadow-md"
                        >
                          <MessageCircle className="w-4 h-4 text-[#0f0f0f]" />
                          <span>Assinar</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#18181b] border border-[#d4af37]/40 rounded-xl p-4 text-center">
            <p className="text-base font-bold text-white">
              Sem fidelidade • Cancele quando quiser • Atendimento VIP
            </p>
          </div>
        </div>

        {/* Informative Assistance Box for Seniors and Local Residents */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base text-white">Endereço no CIC</h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed mt-1">
                Rua Desembargador Cid Campelo, 5212 — Bairro CIC, Curitiba - PR.
              </p>
              <Link to="/localizacao" className="text-xs font-bold text-[#d4af37] hover:underline mt-2 inline-block">
                Ver Mapa de Rota →
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base text-white">Horário de Funcionamento</h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed mt-1">
                Segunda a Sábado das 09:00 às 19:00 sem fechar para almoço.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base text-white">Prefere Ligar?</h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed mt-1">
                Atendemos por chamada telefônica tradicional no (41) 99838-4885.
              </p>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="text-xs font-bold text-[#d4af37] hover:underline mt-2 inline-block"
              >
                Ligar Agora →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

