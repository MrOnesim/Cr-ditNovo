import React from 'react';
import {
  CreditCard,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { FormData, SimulationResult, ValidationErrors } from '../types';
import { COUNTRIES, formatCurrency } from '../lib/locale';
import { Translations, Lang, getLocalizedPurposes, getLocalizedEmployment } from '../lib/content';

interface Step4SummaryProps {
  form: FormData;
  simulation: SimulationResult;
  onChange: (updates: Partial<FormData>) => void;
  errors: ValidationErrors;
  t: Translations;
  lang?: Lang;
}

export default function Step4Summary({
  form,
  simulation,
  onChange,
  errors,
  t,
  lang = 'es',
}: Step4SummaryProps) {
  const currentCountry = COUNTRIES[form.country] || COUNTRIES.ES;
  const currencySymbol = currentCountry.currencySymbol;

  // Find human-readable purpose label
  const availablePurposes = getLocalizedPurposes(lang, form.kind);
  const purposeObj = availablePurposes.find((p) => p.id === form.purpose);
  const purposeLabel = purposeObj ? purposeObj.label : form.purpose;

  // Find employment label
  const currentEmployment = getLocalizedEmployment(lang);
  const empObj = currentEmployment.find((e) => e.id === form.employment);
  const employmentLabel = empObj ? empObj.label : form.employment;

  const monthWord = t.monthUnit || (lang === 'es' ? 'meses' : 'mois');

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{t.summaryTitle}</h3>
          <p className="text-xs text-slate-600">
            {t.summarySubtitle || 'Compruebe la exactitud de sus datos antes de obtener su preacuerdo de financiación inmediato.'}
          </p>
        </div>
      </div>

      {/* Dual read-only columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Column 1: Prêt */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.loanDetails}
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.typeLabel || 'Tipo:'}</span>
              <span className="font-bold text-slate-900 capitalize">
                {form.kind === 'professionnel' ? t.proLoan : t.personalLoan}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.purposeLabel}:</span>
              <span className="font-bold text-slate-900">{purposeLabel}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.amountLabel}:</span>
              <span className="font-bold text-emerald-700 text-sm">
                {formatCurrency(form.amount, form.country)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.monthsLabel}:</span>
              <span className="font-bold text-slate-900">{form.months} {monthWord}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.monthlyPayment}:</span>
              <span className="font-black text-slate-900 text-sm">
                {formatCurrency(simulation.monthlyPayment, form.country)} / {monthWord === 'meses' ? 'mes' : 'mois'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.rateLabel || 'Tipo:'}</span>
              <span className="font-bold text-slate-900">
                TIN {simulation.tann}% · TAE {simulation.taeg}%
              </span>
            </div>
            <div className="flex justify-between py-1 bg-white px-2.5 rounded-lg border border-slate-200/80">
              <span className="text-slate-600 font-semibold">{t.totalCost}:</span>
              <span className="font-bold text-slate-900">
                {formatCurrency(simulation.totalCost, form.country)}
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Demandeur */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <User className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.borrowerDetails}
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.applicantLabel || 'Solicitante:'}</span>
              <span className="font-bold text-slate-900">
                {form.civility} {form.firstName} {form.lastName}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.emailLabel}:</span>
              <span className="font-bold text-slate-900 truncate max-w-[180px]">
                {form.email}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.phoneLabel}:</span>
              <span className="font-bold text-slate-900">
                {currentCountry.phonePrefix} {form.phone}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.residenceLabel || 'Residencia:'}</span>
              <span className="font-bold text-slate-900">
                {form.city}, {currentCountry.name}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.employmentLabel}:</span>
              <span className="font-bold text-slate-900">
                {employmentLabel} ({form.seniority})
              </span>
            </div>
            {form.kind === 'professionnel' && form.companyName && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">{t.companyLabel || 'Empresa:'}</span>
                <span className="font-bold text-slate-900 truncate max-w-[180px]">
                  {form.companyName} {form.siret ? `(${form.siret})` : ''}
                </span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.incomeLabel}:</span>
              <span className="font-bold text-emerald-700">
                {form.income} {currencySymbol} / {monthWord === 'meses' ? 'mes' : 'mois'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{t.housingLabel}:</span>
              <span className="font-bold text-slate-900">{form.housing}</span>
            </div>
            {form.iban && (
              <div className="flex justify-between py-1 bg-white px-2.5 rounded-lg border border-slate-200/80">
                <span className="text-slate-500 font-medium">{t.ibanLabel}:</span>
                <span className="font-mono font-bold text-slate-800 text-[11px] truncate max-w-[170px]">
                  {form.iban}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded documents recap if any */}
      {(form.identityRecto || form.identityVerso || form.incomeFile) && (
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            {t.attachedDocs || 'Documentos adjuntos:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {form.identityRecto && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                ID Recto : {form.identityRecto.name}
              </span>
            )}
            {form.identityVerso && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                ID Verso : {form.identityVerso.name}
              </span>
            )}
            {form.incomeFile && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                {t.uploadIncome} : {form.incomeFile.name}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 23. Consentement RGPD (Obligatoire) */}
      <div className="pt-2">
        <label
          htmlFor="consent"
          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
            errors.consent
              ? 'border-rose-400 bg-rose-50/30'
              : form.consent
              ? 'border-emerald-300 bg-emerald-50/30'
              : 'border-slate-200 hover:bg-slate-50'
          }`}
        >
          <input
            id="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => onChange({ consent: e.target.checked })}
            className="mt-1 w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500 accent-emerald-600 shrink-0"
          />
          <span className="text-xs text-slate-700 leading-relaxed select-none">
            <span className="font-bold text-slate-900">{t.rgpdConsentTitle || 'Consentimiento RGPD obligatorio *:'}</span>{' '}
            {t.consentLabel}
          </span>
        </label>
        {errors.consent && (
          <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5 ml-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      {/* 24. Communications marketing (Opt-in actif non pré-coché - Conforme RGPD) */}
      <div>
        <label
          htmlFor="marketing"
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer ${
            form.marketing ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:bg-slate-50'
          }`}
        >
          <input
            id="marketing"
            name="marketing"
            type="checkbox"
            checked={Boolean(form.marketing)}
            onChange={(e) => onChange({ marketing: e.target.checked })}
            className="mt-1 w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500 accent-emerald-600 shrink-0"
          />
          <span className="text-xs text-slate-600 leading-relaxed select-none">
            <span className="font-bold text-slate-800">{t.marketingConsentTitle || t.marketingTitle || 'Comunicaciones y seguimiento (opcional):'}</span>{' '}
            {t.marketingLabel}
          </span>
        </label>
      </div>

      {/* Instant pre-approval guarantee banner */}
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          {t.preApprovalGuarantee || 'Al confirmar, se emitirá de inmediato su preacuerdo de financiación oficial con transmisión directa a nuestro asesor.'}
        </span>
      </div>
    </div>
  );
}
