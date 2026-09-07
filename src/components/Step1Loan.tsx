import React from 'react';
import {
  User,
  Briefcase,
  Hammer,
  Car,
  Layers,
  GraduationCap,
  Plane,
  HeartPulse,
  Coins,
  Cpu,
  Store,
  Boxes,
  Users,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';
import { FormData, LoanKind } from '../types';
import { formatCurrency } from '../lib/locale';
import { Translations, getLocalizedPurposes, Lang } from '../lib/content';

interface Step1LoanProps {
  form: FormData;
  onChange: (updates: Partial<FormData>) => void;
  t: Translations;
  lang?: Lang;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Hammer,
  Car,
  Layers,
  GraduationCap,
  Plane,
  HeartPulse,
  Coins,
  Cpu,
  Store,
  Boxes,
  Users,
  TrendingUp,
};

export default function Step1Loan({ form, onChange, t, lang = 'es' }: Step1LoanProps) {
  const isPersonal = form.kind === 'personnel';
  const availablePurposes = getLocalizedPurposes(lang, form.kind);

  const handleKindChange = (newKind: LoanKind) => {
    if (newKind === form.kind) return;
    const defaultPurpose = newKind === 'personnel' ? 'travaux' : 'tresorerie';
    onChange({
      kind: newKind,
      purpose: defaultPurpose,
    });
  };

  const handleAmountChange = (val: number) => {
    // Keep within bounds 1000 - 75000, step 500
    const bounded = Math.min(75000, Math.max(1000, Math.round(val / 500) * 500));
    onChange({ amount: bounded });
  };

  const handleMonthsChange = (val: number) => {
    // Keep within bounds 18 - 84, step 6
    const bounded = Math.min(84, Math.max(18, Math.round(val / 6) * 6));
    onChange({ months: bounded });
  };

  const amountPresets = [5000, 10000, 20000, 35000, 50000];
  const monthsPresets = [24, 36, 48, 60, 72, 84];

  const monthWord = t.monthUnit || (lang === 'es' ? 'meses' : 'mois');
  const yearWord = t.yearUnit || (lang === 'es' ? 'años' : 'ans');

  return (
    <div className="space-y-8">
      {/* Visual Project Banner Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 h-36 sm:h-44">
        <img
          src="/src/assets/images/loan_project_banner_1788795022230.jpg"
          alt="Proyectos y financiación"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex items-end p-4 sm:p-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              {form.kind === 'professionnel' ? t.proLoan : t.personalLoan}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {t.step1BannerTitle || 'Financiación adaptada a sus proyectos personales y profesionales'}
            </h3>
          </div>
        </div>
      </div>

      {/* 1. Type de financement */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-3">
          1. {t.kindLabel}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Personnel */}
          <button
            type="button"
            onClick={() => handleKindChange('personnel')}
            className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-150 ${
              form.kind === 'personnel'
                ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                form.kind === 'personnel'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">{t.personalLoan}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {t.personalLoanDesc}
              </p>
            </div>
          </button>

          {/* Professionnel */}
          <button
            type="button"
            onClick={() => handleKindChange('professionnel')}
            className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-150 ${
              form.kind === 'professionnel'
                ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                form.kind === 'professionnel'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">{t.proLoan}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {t.proLoanDesc}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Objet du financement */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-3">
          2. {t.purposeLabel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {availablePurposes.map((item) => {
            const Icon = ICON_MAP[item.icon] || Hammer;
            const isSelected = form.purpose === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ purpose: item.id })}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all duration-150 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Montant souhaité */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <label htmlFor="amount-slider" className="text-sm font-bold text-slate-900">
              3. {t.amountLabel}
            </label>
            <p className="text-xs text-slate-500">
              {t.amountRangeHint || 'De 1.000 a 75.000 (paso de 500)'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              {formatCurrency(form.amount, form.country)}
            </span>
          </div>
        </div>

        <input
          id="amount-slider"
          type="range"
          min="1000"
          max="75000"
          step="500"
          value={form.amount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-hidden"
        />

        <div className="flex justify-between text-[11px] font-medium text-slate-500 mt-2">
          <span>{t.minAmount}</span>
          <span>{t.maxAmount}</span>
        </div>

        {/* Quick Amount Presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200/60">
          <span className="text-xs font-semibold text-slate-500">
            {t.presetAmounts || 'Importes habituales:'}
          </span>
          {amountPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleAmountChange(preset)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                form.amount === preset
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {formatCurrency(preset, form.country)}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Durée de remboursement */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <label htmlFor="months-slider" className="text-sm font-bold text-slate-900">
              4. {t.monthsLabel}
            </label>
            <p className="text-xs text-slate-500">
              {t.monthsRangeHint || 'De 18 a 84 meses (intervalos de 6 meses)'}
            </p>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              {form.months}
            </span>
            <span className="text-sm font-bold text-slate-600">
              {monthWord} ({Math.floor(form.months / 12)} {yearWord}{' '}
              {form.months % 12 > 0 ? `${form.months % 12}m` : ''})
            </span>
          </div>
        </div>

        <input
          id="months-slider"
          type="range"
          min="18"
          max="84"
          step="6"
          value={form.months}
          onChange={(e) => handleMonthsChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-hidden"
        />

        <div className="flex justify-between text-[11px] font-medium text-slate-500 mt-2">
          <span>{t.minMonths}</span>
          <span>{t.maxMonths}</span>
        </div>

        {/* Quick Duration Presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200/60">
          <span className="text-xs font-semibold text-slate-500">
            {t.presetMonths || 'Plazos habituales:'}
          </span>
          {monthsPresets.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => handleMonthsChange(m)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                form.months === m
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {m} {monthWord} ({m / 12 >= 1 ? `${(m / 12).toFixed(m % 12 === 0 ? 0 : 1)} ${yearWord}` : ''})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
