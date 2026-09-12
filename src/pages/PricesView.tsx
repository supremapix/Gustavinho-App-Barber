import React from "react";
import { Link } from "react-router-dom";
import { Tag, Phone, Calendar, MessageCircle, Clock, MapPin, Check, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { PRODUCTS_DATA } from "../data/products";
import { SUBSCRIPTION_PLANS } from "../data/plans";
import { BUSINESS_INFO } from "../data/business";
import PageHeroHeader from "../components/PageHeroHeader";

export default function PricesView() {
  return (
    <div className="w-full pb-28 sm:pb-20 bg-[#121214] min-h-screen text-[#f4f4f5] overflow-x-hidden">
      {/* Page Hero Header */}
      <PageHeroHeader
        breadcrumbs={[{ label: "Tabela de Preços e Valores" }]}
        badge="Valores Oficiais • CIC Curitiba"
        title="Tabela de Preços — Gustavinho do Corte"
        description="Consulte a lista completa de serviços, produtos para cuidado diário e planos de assinatura da barbearia no CIC Curitiba."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">

        {/* Prominent Agendamento Online Card */}
        <div className="mb-12 bg-[#18181b] border-2 border-[#d4af37] rounded-2xl p-4 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl w-full max-w-full min-w-0">
          <div className="space-y-1 text-left w-full sm:w-auto min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#d4af37] animate-pulse shrink-0"></span>
              <span className="text-xs font-black uppercase tracking-wider text-[#d4af37] break-words">
                Sistema de Agendamento Online
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug break-words">
              Agende seu horário online com confirmação imediata
            </h2>
            <p className="text-sm text-[#a1a1aa] break-words">
              Escolha seu serviço, o barbeiro e o horário sem precisar esperar. Dúvidas? WhatsApp (41) 99838-4885.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0 min-w-0">
            <div className="w-full sm:w-auto">
              <Link
                to="/agendar"
                className="px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all min-h-[48px] w-full"
              >
                <Calendar className="w-4 h-4 text-[#0f0f0f]" />
                <span>Agendar</span>
              </Link>
              <span className="block text-[9px] text-amber-200/70 font-normal tracking-tight mt-1 text-center">
                reserva online com confirmação
              </span>
            </div>

            <div className="w-full sm:w-auto">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-[#25D366] font-bold text-xs flex items-center justify-center gap-1.5 transition-all min-h-[48px] w-full"
                title="Falar no WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
                tirar dúvidas pelo chat
              </span>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
            1. TABELA DE SERVIÇOS
            ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-16 w-full max-w-full min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#27272a]">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37] block">
                Cortes, Barba e Químicas
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                SERVIÇOS — Tabela de Preços
              </h2>
            </div>
            <span className="hidden sm:inline-block text-xs text-[#a1a1aa]">
              Valores individuais por atendimento
            </span>
          </div>

          {/* MOBILE: Transformado em cards responsivos (abaixo de 640px) */}
          <div className="sm:hidden space-y-3 w-full max-w-full">
            {SERVICES_DATA.map((service) => (
              <div
                key={`mobile-svc-${service.id}`}
                className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 w-full min-w-0 max-w-full shadow-md"
              >
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-white break-words leading-snug">
                    {service.title}
                  </h3>
                  <div className="text-xs text-[#a1a1aa] mt-1 flex flex-wrap items-center gap-1.5">
                    <span>{service.duration}</span>
                    <span>•</span>
                    <span className="capitalize">{service.category}</span>
                  </div>
                  {service.shortDesc && (
                    <p className="text-xs text-[#d4d4d8] mt-2 leading-relaxed break-words">
                      {service.shortDesc}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-[#27272a]/80">
                  <span className="text-xl font-black text-[#d4af37] shrink-0">
                    {service.formattedPrice}
                  </span>
                  <Link
                    to={`/agendar?service=${service.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] font-black text-xs active:scale-95 transition-all shadow-sm shrink-0 min-h-[40px]"
                    aria-label={`Agendar ${service.title} online`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#0f0f0f]" />
                    <span>Agendar</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: Estrutura de tabela tradicional preservada (sm: em diante) */}
          <div className="hidden sm:block bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg">
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
                        <Link
                          to={`/agendar?service=${service.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] font-black text-xs active:scale-95 transition-all shadow-sm"
                          aria-label={`Agendar ${service.title} online`}
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#0f0f0f]" />
                          <span>Agendar</span>
                        </Link>
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
        <div className="mb-16 w-full max-w-full min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#27272a]">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37] block">
                Cuidado em Casa
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">PRODUTOS PREMIUM</h2>
            </div>
            <span className="text-xs text-[#d4af37] font-semibold">
              Linha Exclusiva
            </span>
          </div>

          {/* MOBILE: Transformado em cards responsivos (abaixo de 640px) */}
          <div className="sm:hidden space-y-3 w-full max-w-full mb-4">
            {PRODUCTS_DATA.map((product) => (
              <div
                key={`mobile-prod-${product.id}`}
                className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 w-full min-w-0 max-w-full shadow-md"
              >
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-white break-words leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#d4d4d8] mt-1 leading-relaxed break-words">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-[#27272a]/80">
                  <span className="text-xs font-bold text-[#d4af37] bg-[#27272a] px-3 py-1.5 rounded-md shrink-0">
                    {product.priceText}
                  </span>
                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Gostaria%20de%20consultar%20o%20valor%20do%20produto%20${encodeURIComponent(product.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white hover:text-[#d4af37] border border-[#3f3f46] font-bold text-xs transition-all active:scale-95 shrink-0 min-h-[40px]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: Estrutura de tabela tradicional preservada */}
          <div className="hidden sm:block bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg mb-4">
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

          <div className="bg-[#1f1f23] border border-[#27272a] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left w-full min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <ShoppingBag className="w-6 h-6 text-[#d4af37] shrink-0 hidden sm:block" />
              <p className="text-sm text-[#d4d4d8] font-medium break-words">
                Consulte o valor dos produtos no atendimento premium pelo WhatsApp.
              </p>
            </div>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Quero%20consultar%20a%20linha%20de%20produtos%20premium%20da%20barbearia.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#d4af37] hover:underline break-words shrink-0"
            >
              Falar sobre produtos no WhatsApp →
            </a>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
            3. PLANOS MENSAIS
            ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-16 w-full max-w-full min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#27272a]">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4af37] block">
                Assinatura Recorrente
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">PLANOS MENSAIS</h2>
            </div>
            <span className="text-xs text-[#a1a1aa]">
              Sem fidelidade • Cancele quando quiser
            </span>
          </div>

          {/* MOBILE: Transformado em cards responsivos (abaixo de 640px) */}
          <div className="sm:hidden space-y-3 w-full max-w-full mb-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={`mobile-plan-${plan.id}`}
                className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 w-full min-w-0 max-w-full shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1.5 min-w-0">
                  <h3 className="font-bold text-base text-white break-words leading-snug">
                    {plan.name}
                  </h3>
                  {plan.isPopular && (
                    <span className="px-2 py-0.5 rounded bg-[#d4af37] text-[#0f0f0f] text-[10px] font-black uppercase tracking-wide shrink-0">
                      {plan.highlightTag || "Destaque"}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#d4d4d8] leading-relaxed break-words mb-2.5">
                  {plan.shortDesc}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs mb-3.5">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#d4d4d8] bg-[#27272a] px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{plan.days}</span>
                  </span>
                  <span className="inline-flex items-center font-black text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-md">
                    Economiza {plan.economy}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#27272a]/80">
                  <div>
                    <span className="text-xl font-black text-[#d4af37] block leading-none">
                      {plan.formattedPrice}
                    </span>
                    <span className="text-[10px] text-[#a1a1aa] font-medium">por mês</span>
                  </div>

                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Tenho%20interesse%20em%20assinar%20o%20${encodeURIComponent(plan.name)}%20(${plan.formattedPrice}%2Fm%C3%AAs).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0f0f0f] font-extrabold text-xs active:scale-95 transition-all shadow-md shrink-0 min-h-[40px]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#0f0f0f]" />
                    <span>Assinar</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: Estrutura de tabela tradicional preservada */}
          <div className="hidden sm:block bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-lg mb-4">
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
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full min-w-0">
          <div className="flex items-start gap-3 min-w-0">
            <MapPin className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
            <div className="min-w-0">
              <h4 className="font-bold text-base text-white break-words">Endereço no CIC</h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed mt-1 break-words">
                Rua Desembargador Cid Campelo, 5212 — Bairro CIC, Curitiba - PR.
              </p>
              <div>
                <Link to="/localizacao" className="text-xs font-bold text-[#d4af37] hover:underline mt-2 inline-block">
                  Mapa
                </Link>
                <span className="block text-[10px] text-gray-400 font-normal tracking-tight">
                  visualizar rota e endereço
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <Clock className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
            <div className="min-w-0">
              <h4 className="font-bold text-base text-white break-words">Horário de Funcionamento</h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed mt-1 break-words">
                Segunda a Sábado das 09:00 às 19:00 sem fechar para almoço.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <Phone className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
            <div className="min-w-0">
              <h4 className="font-bold text-base text-white break-words">Prefere Ligar?</h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed mt-1 break-words">
                Atendemos por chamada telefônica tradicional no (41) 99838-4885.
              </p>
              <div>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="text-xs font-bold text-[#d4af37] hover:underline mt-2 inline-block"
                >
                  Ligar
                </a>
                <span className="block text-[10px] text-gray-400 font-normal tracking-tight">
                  falar diretamente pelo telefone
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

