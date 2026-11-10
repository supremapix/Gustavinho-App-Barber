import React, { useRef } from "react";
import { useInView } from "motion/react";
import HappyReviewIllustration from "./HappyReviewIllustration";
import { ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function GoogleReviewCta() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const buttonInView = useInView(buttonRef, { once: true, amount: 0.7 });

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
          ref={buttonRef}
          data-review-attention={buttonInView ? "visible" : "waiting"}
          href={BUSINESS_INFO.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="google-review-button inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl sm:w-auto"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-google-logo="true"
            className="h-6 w-6 shrink-0"
            viewBox="0 0 24 24"
          >
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38c-.23 1.25-.94 2.31-2.01 3.02v2.51h3.25c1.9-1.75 2.98-4.33 2.98-7.36Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.25-2.51c-.9.6-2.04.96-3.36.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59C4.7 19.77 8.09 22 12 22Z" />
            <path fill="#FBBC05" d="M6.41 13.92c-.2-.6-.31-1.24-.31-1.92s.11-1.32.31-1.92V7.49H3.06C2.38 8.85 2 10.38 2 12s.38 3.15 1.06 4.51l3.35-2.59Z" />
            <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.82 1.49l2.86-2.86C16.95 2.98 14.7 2 12 2 8.09 2 4.7 4.23 3.06 7.49l3.35 2.59C7.2 7.72 9.4 5.96 12 5.96Z" />
          </svg>
          <span className="flex flex-col items-center gap-1">
            <span className="google-review-button-label">Avaliar no Google</span>
            <span aria-hidden="true" className="google-review-button-hint">Clique e conte sua experiência</span>
          </span>
          <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="sr-only"> (abre em uma nova aba)</span>
        </a>
      </div>
    </section>
  );
}
