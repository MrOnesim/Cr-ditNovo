import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Translations } from '../lib/content';

interface AnalysisModalProps {
  onComplete: () => void;
  t: Translations;
}

export default function AnalysisModal({ onComplete, t }: AnalysisModalProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = t.analysisSteps || [
    'Comprobación de criterios de idoneidad y perfil...',
    'Consulta de condiciones bancarias preferentes...',
    'Emisión de su preacuerdo de financiación certificado...',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 800);
    const timer2 = setTimeout(() => setStepIndex(2), 1700);
    const timerComplete = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-6">
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-pulse" />
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {t.analysisTitle || 'Análisis de su solicitud en curso'}
          </h3>
          <p className="text-xs text-slate-500">{t.loadingText}</p>
        </div>

        {/* Dynamic progress steps */}
        <div className="space-y-3 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          {steps.map((text, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div key={text} className="flex items-center gap-3 text-xs">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span
                  className={`font-medium ${
                    isDone
                      ? 'text-slate-500 line-through'
                      : isCurrent
                      ? 'text-emerald-900 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.analysisSecurity || 'Procesamiento seguro y cifrado con estándares bancarios'}</span>
        </div>
      </div>
    </div>
  );
}
