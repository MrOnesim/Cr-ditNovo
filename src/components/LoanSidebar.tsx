import { ShieldCheck, Clock, Building2, UserCheck, Lock, Tag, CheckCircle2 } from 'lucide-react';
import { FormData, SimulationResult } from '../types';
import { formatCurrency } from '../lib/locale';
import { Translations } from '../lib/content';

interface LoanSidebarProps {
  form: FormData;
  simulation: SimulationResult;
  t: Translations;
}

export default function LoanSidebar({ form, simulation, t }: LoanSidebarProps) {
  const formattedAmount = formatCurrency(form.amount, form.country);
  const formattedMonthly = formatCurrency(simulation.monthlyPayment, form.country);
  const formattedTotalCost = formatCurrency(simulation.totalCost, form.country);
  const formattedInterest = formatCurrency(simulation.totalInterest, form.country);
  const monthUnit =
    form.country === 'ES'
      ? 'mes'
      : form.country === 'PT'
      ? 'mês'
      : form.country === 'DE'
      ? 'Monat'
      : form.country === 'IT'
      ? 'mese'
      : form.country === 'GB'
      ? 'month'
      : 'mois';

  return (
    <aside className="space-y-4">
      {/* Simulation card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        {/* Promotional Tag */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-4">
          <Tag className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.promoBadge}</span>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
          {t.realtimeSimulation}
        </h3>

        {/* Monthly payment display */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-100 rounded-xl p-4 mb-5">
          <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            {t.monthlyPayment}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {formattedMonthly}
            </span>
            <span className="text-xs font-bold text-slate-600">/ {monthUnit}</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 font-medium mt-1">
            {t.tann} : <span className="font-bold">{simulation.tann}%</span> · {t.taeg} :{' '}
            <span className="font-bold">{simulation.taeg}%</span>
          </p>
        </div>

        {/* Loan breakdown metrics */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">{t.amountLabel}</span>
            <span className="font-bold text-slate-900">{formattedAmount}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">{t.monthsLabel}</span>
            <span className="font-bold text-slate-900">
              {form.months} {t.monthUnit || (form.country === 'ES' ? 'meses' : 'mois')}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-600 font-medium">{t.totalInterest}</span>
            <span className="font-bold text-slate-900">{formattedInterest}</span>
          </div>
          <div className="flex justify-between py-1.5 bg-slate-50 px-2 rounded-lg font-semibold">
            <span className="text-slate-700">{t.totalCost}</span>
            <span className="font-bold text-slate-900">{formattedTotalCost}</span>
          </div>
        </div>

        {/* Advisor card */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex items-start gap-3">
          <div className="relative shrink-0">
            <img
              src="/images/advisor_sarah.jpg"
              alt={t.yourAdvisor}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/25 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"
              title="Conseillère en ligne"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900">{t.yourAdvisor}</p>
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">{t.advisorStatus}</p>
            <p className="text-[11px] text-slate-600 mt-1 italic leading-relaxed">
              {t.advisorQuote}
            </p>
          </div>
        </div>
      </div>

      {/* Security & compliance card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 text-xs text-slate-600 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Lock className="w-4 h-4 text-emerald-700" />
          <span>{t.securityTitle}</span>
        </div>
        <ul className="space-y-2 text-[11px]">
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.security1}</span>
          </li>
          <li className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.security2}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.security3}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.security4}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
