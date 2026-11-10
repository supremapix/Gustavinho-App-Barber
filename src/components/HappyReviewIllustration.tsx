import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// Decorative illustration only: not a customer testimonial or a real rating.
export default function HappyReviewIllustration() {
  const illustrationRef = useRef<SVGSVGElement>(null);
  const inView = useInView(illustrationRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion !== false || !inView) return;
    // One short sequence, rather than a distracting infinite animation.
    const timers = Array.from({ length: 6 }, (_, index) =>
      window.setTimeout(() => setStep(index + 1), 350 + index * 520),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion, inView]);

  const shownStep = reduceMotion !== false ? 6 : step;
  const complete = shownStep === 6;

  return (
    <svg
      ref={illustrationRef}
      aria-hidden="true"
      focusable="false"
      data-review-illustration="true"
      data-animation-step={shownStep}
      viewBox="0 0 220 150"
      className="pointer-events-none h-[120px] w-[176px] shrink-0 sm:h-[130px] sm:w-[190px]"
      fill="none"
    >
      <ellipse cx="107" cy="137" rx="92" ry="7" fill="#d4af37" opacity=".09" />
      <circle cx="77" cy="71" r="57" fill="#d4af37" opacity=".05" />
      {/* A smiling illustrated client holding a phone. */}
      <path d="M27 132V111c0-20 17-31 38-31s38 11 38 31v21" fill="#26262b" stroke="#d4af37" strokeWidth="2" />
      <path d="m52 82 13 16 13-16" stroke="#e5c158" strokeWidth="2" strokeLinejoin="round" />
      <rect x="56" y="68" width="18" height="20" rx="7" fill="#b9825b" />
      <path d="M41 43c0-17 10-27 25-27s25 10 25 27v11c0 17-11 29-25 29S41 71 41 54Z" fill="#dda77e" />
      <path d="M41 47c-8-27 7-35 23-35 12 0 19 4 25 12l5-2-4 18-9-11c-10 10-23 10-34 9v11Z" fill="#282124" />
      <path d="M51 50q4-4 8 0m14 0q4-4 8 0" stroke="#392b28" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 62q10 13 20 0" fill="#fff5e9" stroke="#925d43" strokeWidth="2" strokeLinejoin="round" />
      <path d="m39 107 20 14 38-12" stroke="#dda77e" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="90" y="79" width="28" height="43" rx="5" transform="rotate(-12 90 79)" fill="#101014" stroke="#e5c158" strokeWidth="2" />
      <path d="m99 91 9-2m-7 8 9-2" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
      <circle cx="111" cy="109" r="2" fill="#e5c158" />
      <path d={complete ? "m94 126 18-9" : "m94 126 17-27"} stroke="#dda77e" strokeWidth="10" strokeLinecap="round" />
      {/* Rating card is deliberately unlabeled: no invented review or score. */}
      <rect x="111" y="22" width="101" height="54" rx="12" fill="#202024" stroke="#d4af37" strokeOpacity=".6" />
      <path d="m127 76-7 10 22-10" fill="#202024" stroke="#d4af37" strokeOpacity=".6" />
      {[0, 1, 2, 3, 4].map((index) => (
        <path
          key={index}
          transform={`translate(${122 + index * 17} 34)`}
          d="m6 0 1.8 3.8 4.2.6-3 3 .7 4.2L6 9.6l-3.7 2 .7-4.2-3-3 4.2-.6Z"
          fill={shownStep > index ? "#e5c158" : "#3f3f46"}
          stroke={shownStep > index ? "#e5c158" : "#71717a"}
          strokeWidth=".7"
        />
      ))}
      <path d="M126 59h49" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
      {complete && (
        <g data-review-complete="true">
          <circle cx="192" cy="60" r="9" fill="#d4af37" />
          <path d="m188 60 3 3 5-6" stroke="#121214" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}
