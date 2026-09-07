import { Check } from 'lucide-react';
import { Translations } from '../lib/content';

interface StepperProps {
  currentStep: number;
  maxAccessibleStep: number;
  onSelectStep: (step: number) => void;
  t: Translations;
}

export default function Stepper({
  currentStep,
  maxAccessibleStep,
  onSelectStep,
  t,
}: StepperProps) {
  const steps = [
    { number: 1, title: t.step1Title },
    { number: 2, title: t.step2Title },
    { number: 3, title: t.step3Title },
    { number: 4, title: t.step4Title },
  ];

  return (
    <nav aria-label={t.stepIndicator} className="w-full">
      <ol className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((s) => {
          const isCompleted = s.number < currentStep;
          const isCurrent = s.number === currentStep;
          const isClickable = s.number <= maxAccessibleStep;

          return (
            <li key={s.number} className="relative">
              <button
                type="button"
                onClick={() => {
                  if (isClickable) onSelectStep(s.number);
                }}
                disabled={!isClickable}
                className={`w-full text-left transition-all duration-200 group p-2 sm:p-3 rounded-xl border ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                    : isCompleted
                    ? 'border-emerald-200 bg-white hover:border-emerald-300'
                    : 'border-slate-200 bg-slate-50/60 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 transition-colors ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600 truncate">
                      {t.stepIndicator} {s.number}
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isCurrent ? 'text-emerald-950' : 'text-slate-800'
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
