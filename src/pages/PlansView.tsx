import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Check, MessageCircle, HelpCircle } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../data/plans";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function PlansView() {
  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">Planos de Assinatura</span>
        </div>

        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
          Clube de Assinatura
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-brand font-bold text-white tracking-tight mb-4">
          Planos Mensais sem Fidelidade Forçada
        </h1>
        <p className="text-[17px] text-[#a1a1aa] max-w-xl leading-relaxed font-normal">
          Economize e mantenha o visual em dia o mês inteiro. Escolha o plano ideal e agende com prioridade no CIC Curitiba.
        </p>
      </div>

      {/* Plans List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 transition-all flex flex-col justify-between border relative shadow-xl ${
                plan.isPopular
                  ? "bg-[#18181b] border-[#d4af37] ring-1 ring-[#d4af37]/50"
                  : "bg-[#18181b] border-[#27272a]"
              }`}
            >
              {plan.highlightTag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#d4af37] text-[#0f0f0f] text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                  {plan.highlightTag}
                </div>
              )}

              <div>
                <h2 className="font-bold text-xl text-white mb-1">{plan.name}</h2>
                <div className="text-xs font-semibold text-[#d4af37] mb-3">
                  {plan.days}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black text-white">
                    {plan.formattedPrice}
                  </span>
                  <span className="text-xs text-[#a1a1aa] font-medium">{plan.period}</span>
                </div>

                <div className="mb-4">
                  <span className="inline-block text-xs font-black text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-md">
                    Economiza {plan.economy}/mês
                  </span>
                </div>

                <p className="text-xs text-[#a1a1aa] mb-5 leading-relaxed">
                  {plan.shortDesc}
                </p>

                <ul className="space-y-3 mb-8 text-xs text-[#d4d4d8]">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#d4af37]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Tenho%20interesse%20em%20assinar%20o%20${encodeURIComponent(plan.name)}%20(${plan.formattedPrice}%2Fm%C3%AAs).`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md ${
                  plan.isPopular
                    ? "bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158]"
                    : "bg-[#27272a] text-white hover:bg-[#3f3f46] hover:text-[#d4af37]"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{plan.ctaText}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Plans FAQ box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[#d4af37]" />
            <h3 className="text-lg font-semibold text-white">Como funciona o plano de assinatura?</h3>
          </div>
          <div className="space-y-3 text-[17px] text-[#a1a1aa] leading-relaxed font-normal">
            <p>1. <strong>Sem carência:</strong> Você assina mensalmente e pode cancelar a qualquer momento diretamente pelo WhatsApp.</p>
            <p>2. <strong>Agendamento Simples:</strong> Os agendamentos continuam sendo feitos com antecedência pelo WhatsApp, mas você recebe prioridade na escolha de horários de pico (ex: sextas e sábados).</p>
            <p>3. <strong>Desconto em Produtos:</strong> Assinantes garantem desconto em produtos de tratamento e finalização capilar ou de barba na própria barbearia.</p>
          </div>
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
