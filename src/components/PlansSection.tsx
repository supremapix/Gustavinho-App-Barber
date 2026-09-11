import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../data/plans";
import { BUSINESS_INFO } from "../data/business";

export default function PlansSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#121214] border-t-2 border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#d4af37] block mb-1">
            Clube de Assinatura
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Planos Mensais
          </h2>
          <p className="text-base text-[#d4d4d8]">
            Sem fidelidade • Cancele quando quiser • Atendimento VIP no CIC Curitiba.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 bg-[#18181b] border flex flex-col justify-between relative shadow-lg ${
                plan.isPopular
                  ? "border-[#d4af37] ring-1 ring-[#d4af37]/50"
                  : "border-[#27272a]"
              }`}
            >
              {plan.highlightTag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#d4af37] text-[#0f0f0f] text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                  {plan.highlightTag}
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg text-white mb-1">{plan.name}</h3>
                <span className="inline-block text-xs font-semibold text-[#d4af37] mb-3">
                  {plan.days}
                </span>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-black text-white">
                    {plan.formattedPrice}
                  </span>
                  <span className="text-xs text-[#a1a1aa] font-medium">{plan.period}</span>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded">
                    Economia: {plan.economy}/mês
                  </span>
                </div>

                <p className="text-xs text-[#a1a1aa] mb-5 leading-relaxed">
                  {plan.shortDesc}
                </p>

                <ul className="space-y-2.5 mb-6 text-xs text-[#d4d4d8]">
                  {plan.features.slice(0, 4).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1!%20Quero%20assinar%20o%20${encodeURIComponent(plan.name)}%20(${plan.formattedPrice}%2Fm%C3%AAs).`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 active:scale-95 transition-all ${
                  plan.isPopular
                    ? "bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158]"
                    : "bg-[#27272a] text-white hover:bg-[#3f3f46] hover:text-[#d4af37]"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Assinar no WhatsApp</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272a]">
          <Link
            to="/planos"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:underline group"
          >
            <span>Ver comparação completa de todos os planos</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>

          <span className="text-xs text-[#a1a1aa]">
            Agendamento exclusivo pelo WhatsApp (41) 99838-4885
          </span>
        </div>
      </div>
    </section>
  );
}

