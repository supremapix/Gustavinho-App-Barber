import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../data/plans";

export default function PlansSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] block mb-2">
            PLANOS MENSAIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Vem sempre? O plano mensal pode ser uma boa escolha.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl p-6 sm:p-8 bg-[#18181b] border border-[#27272a] flex flex-col justify-between"
            >
              <div>
                <h3 className="font-extrabold text-xl text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-[#a1a1aa] mb-6 leading-relaxed">
                  {plan.shortDesc}
                </p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#27272a]">
                  <span className="text-3xl font-black text-[#d4af37]">
                    {plan.formattedPrice}
                  </span>
                  <span className="text-xs text-[#a1a1aa] font-medium">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs text-[#a1a1aa]">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/planos"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#27272a] text-white hover:bg-[#d4af37] hover:text-[#0f0f0f] transition-colors text-center"
              >
                Conhecer plano
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-left">
          <Link
            to="/planos"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#e5c158] transition-colors group"
          >
            <span>Ver detalhes de todos os planos</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
