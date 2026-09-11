import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { CLIENT_REVIEWS } from "../data/reviews";
import { BUSINESS_INFO } from "../data/business";

export default function ReviewsSection() {
  const reviewsToShow = CLIENT_REVIEWS.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#0f0f0f] border-t border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-left mb-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
            Avaliações
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Quem corta recomenda
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviewsToShow.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#18181b] border border-[#27272a] p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#d4af37] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                <p className="text-[17px] text-[#a1a1aa] leading-relaxed mb-6 font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#27272a] text-xs font-bold text-white">
                {rev.author} <span className="text-[#a1a1aa] font-normal">· {rev.neighborhood}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-left">
          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#e5c158] transition-colors group"
          >
            <span>Ver avaliações no Google Maps</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
