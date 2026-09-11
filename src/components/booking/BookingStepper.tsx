import React from "react";
import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: number; // 1 to 5
  onStepClick: (step: number) => void;
}

const STEPS = [
  { step: 1, label: "Serviço" },
  { step: 2, label: "Data" },
  { step: 3, label: "Horário" },
  { step: 4, label: "Seus dados" },
  { step: 5, label: "Confirmar" }
];

export default function BookingStepper({ currentStep, onStepClick }: BookingStepperProps) {
  return (
    <div className="w-full mb-8">
      {/* Desktop & Tablet Stepper */}
      <div className="hidden sm:flex items-center justify-between relative max-w-2xl mx-auto">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#27272a] -translate-y-1/2 z-0" />

        {STEPS.map((s) => {
          const isCompleted = s.step < currentStep;
          const isCurrent = s.step === currentStep;
          const isClickable = s.step < currentStep;

          return (
            <div
              key={s.step}
              className="relative z-10 flex flex-col items-center group"
            >
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(s.step)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCompleted
                    ? "bg-[#d4af37] text-[#0f0f0f] cursor-pointer hover:scale-110"
                    : isCurrent
                    ? "bg-gradient-to-br from-[#e5c158] to-[#b8860b] text-[#0f0f0f] ring-4 ring-[#d4af37]/20 font-black shadow-lg shadow-[#d4af37]/20 scale-105"
                    : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa]"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-[#0f0f0f]" /> : s.step}
              </button>
              <span
                className={`text-[11px] font-bold mt-2 transition-colors ${
                  isCurrent ? "text-[#d4af37]" : isCompleted ? "text-white" : "text-[#a1a1aa]"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Condensed Stepper */}
      <div className="flex sm:hidden flex-col items-center justify-center bg-[#18181b] border border-[#27272a] p-3 rounded-xl max-w-xs mx-auto">
        <div className="flex items-center gap-1.5 mb-2">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className={`h-1.5 rounded-full transition-all ${
                s.step === currentStep
                  ? "w-8 bg-[#d4af37]"
                  : s.step < currentStep
                  ? "w-3 bg-[#d4af37]/60"
                  : "w-3 bg-[#27272a]"
              }`}
            />
          ))}
        </div>
        <div className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5">
          <span className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">Passo {currentStep} de 5:</span>
          <span>{STEPS[currentStep - 1]?.label}</span>
        </div>
      </div>
    </div>
  );
}
