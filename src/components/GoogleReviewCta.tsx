import React from "react";
import HappyReviewIllustration from "./HappyReviewIllustration";
import { ExternalLink, Star } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function GoogleReviewCta() {
  return (
    <section
      aria-labelledby="google-review-heading"
      className="border-y border-[#d4af37]/30 bg-[#121214] py-7 sm:py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center lg:flex-row lg:justify-between lg:gap-8 sm:px-6 lg:text-left lg:px-8">
        <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:gap-6 sm:text-left">
          <HappyReviewIllustration />
          <div className="min-w-0">
          <h2 id="google-review-heading" className="text-lg font-bold text-white sm:text-xl">
            Já cortou com o Gustavinho?
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-[#d4d4d8]">
            Conte como foi sua experiência. Sua opinião faz a diferença!
          </p>
          </div>
        </div>
        <a
          href={BUSINESS_INFO.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold text-[#0f0f0f] transition-colors hover:bg-[#e5c158] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e5c158] sm:w-auto"
        >
          <Star aria-hidden="true" className="h-4 w-4 shrink-0" />
          Avaliar no Google
          <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="sr-only"> (abre em uma nova aba)</span>
        </a>
      </div>
    </section>
  );
}
