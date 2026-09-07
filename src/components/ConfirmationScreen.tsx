import React, { useState } from 'react';
import {
  CheckCircle2,
  Share2,
  Copy,
  Mail,
  Printer,
  ShieldCheck,
  Building,
  UserCheck,
  RotateCcw,
} from 'lucide-react';
import { FormData, SimulationResult } from '../types';
import { COUNTRIES, formatCurrency } from '../lib/locale';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY_PHONE, CONTACT_EMAIL, personalPurposes, proPurposes, employmentOptions } from '../data';
import { Translations } from '../lib/content';

interface ConfirmationScreenProps {
  form: FormData;
  simulation: SimulationResult;
  referenceNumber: string;
  onRestart: () => void;
  t: Translations;
}

export default function ConfirmationScreen({
  form,
  simulation,
  referenceNumber,
  onRestart,
  t,
}: ConfirmationScreenProps) {
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const currentCountry = COUNTRIES[form.country] || COUNTRIES.ES;
  const currencySymbol = currentCountry.currencySymbol;

  const allPurposes = [...personalPurposes, ...proPurposes];
  const purposeObj = allPurposes.find((p) => p.id === form.purpose);
  const purposeLabel = purposeObj ? purposeObj.label : form.purpose;

  const empObj = employmentOptions.find((e) => e.id === form.employment);
  const employmentLabel = empObj ? empObj.label : form.employment;

  const incomeVal = parseFloat(form.income) || 0;
  const chargesVal = parseFloat(form.charges) || 0;
  const totalMonthlyCommitment = simulation.monthlyPayment + chargesVal;
  const debtRatio = incomeVal > 0 ? Math.round((totalMonthlyCommitment / incomeVal) * 100) : 0;

  // Build structured WhatsApp message in language
  const generateWhatsAppMessage = () => {
    const formattedAmount = formatCurrency(form.amount, form.country);
    const formattedMonthly = formatCurrency(simulation.monthlyPayment, form.country);
    const formattedTotalCost = formatCurrency(simulation.totalCost, form.country);

    return `*SOLICITUD DE CRÉDITNOVO — EXPEDIENTE VALIDADO*
📌 *Ref. expediente :* ${referenceNumber}
⚖️ *Estado :* Preacuerdo inmediato concedido

━━━━━━━━━━━━━━━━━━━
💰 *CARACTERÍSTICAS DE LA FINANCIACIÓN*
• Tipo : ${form.kind === 'professionnel' ? 'Préstamo Profesional' : 'Préstamo Personal'}
• Objeto : ${purposeLabel}
• Importe solicitado : ${formattedAmount}
• Plazo : ${form.months} meses
• Cuota mensual estimada : ${formattedMonthly} / mes
• Tipo : TIN ${simulation.tann}% · TAE ${simulation.taeg}%
• Importe total adeudado : ${formattedTotalCost}

👤 *IDENTIDAD DEL SOLICITANTE*
• Tratamiento : ${form.civility}
• Nombre completo : ${form.firstName} ${form.lastName}
• Email : ${form.email}
• Teléfono : ${currentCountry.phonePrefix} ${form.phone}
• Fecha de nacimiento : ${form.birth}
• Residencia : ${form.city}, ${currentCountry.name}

💼 *SITUACIÓN Y RENDIMIENTOS*
• Empleo : ${employmentLabel} (${form.seniority})
${form.kind === 'professionnel' && form.companyName ? `• Empresa : ${form.companyName} (CIF/NIF: ${form.siret || 'En curso'})\n` : ''}• Ingresos netos mensuales : ${form.income} ${currencySymbol} / mes
• Gastos mensuales : ${form.charges ? `${form.charges} ${currencySymbol}` : '0'}
• Vivienda : ${form.housing}
• Ratio de endeudamiento : ${debtRatio}%
${form.iban ? `• IBAN : ${form.iban}\n` : ''}
📄 *DOCUMENTACIÓN ADJUNTA*
• Documento identidad anverso : ${form.identityRecto ? `Aportado (${form.identityRecto.name})` : 'Por transmitir'}
• Documento identidad reverso : ${form.identityVerso ? `Aportado (${form.identityVerso.name})` : 'Por transmitir'}
• Justificante de ingresos : ${form.incomeFile ? `Aportado (${form.incomeFile.name})` : 'Por transmitir'}

Consentimiento RGPD validado.
Ruego me confirmen la recepción y próximos pasos de mi solicitud.`;
  };

  const whatsAppText = generateWhatsAppMessage();
  const whatsAppUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsAppText)}`;

  const emailSubject = encodeURIComponent(`Solicitud de préstamo — Ref: ${referenceNumber}`);
  const emailBody = encodeURIComponent(
    `Hola,\n\nAdjunto los detalles de mi solicitud de préstamo validada.\n\nRef: ${referenceNumber}\n\n${whatsAppText}\n\nAtentamente,\n${form.firstName} ${form.lastName}`
  );
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(whatsAppText);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Success banner card with image */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-3/5 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              {t.statusAgreed}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {t.successTitle}
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              {t.successSubtitle}
            </p>

            {/* Reference pill */}
            <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
                  {t.referenceLabel}
                </p>
                <p className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white">
                  {referenceNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyRef}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? t.copied : t.copyRef}</span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/5 shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-md aspect-4/3">
              <img
                src="/images/loan_approval_success.jpg"
                alt="Acuerdo de financiación"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white/95">
                  Estudio completado · Atención personalizada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action: Direct WhatsApp dispatch */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {form.country === 'ES' ? 'Transmisión prioritaria por WhatsApp' : 'Transmission prioritaire WhatsApp'}
            </h3>
            <p className="text-xs text-slate-600">
              {form.country === 'ES'
                ? 'Su asesor asignado le responde de inmediato en el'
                : 'Votre conseiller dédié vous répond immédiatement au'}{' '}
              <strong className="text-emerald-700 font-bold">{WHATSAPP_DISPLAY_PHONE}</strong>
            </p>
          </div>
        </div>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-150 text-center cursor-pointer"
        >
          <Share2 className="w-5 h-5 shrink-0" />
          <span>{t.whatsappButton}</span>
        </a>

        <p className="text-xs text-slate-700 text-center">
          {t.whatsappHint}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Email backup */}
          <a
            href={mailtoUrl}
            className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-500" />
            <span>{t.emailButton}</span>
          </a>

          {/* Copy full details */}
          <button
            type="button"
            onClick={handleCopyMessage}
            className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4 text-slate-500" />
            <span>
              {copiedMsg
                ? form.country === 'ES' ? '¡Copiado!' : 'Copié !'
                : form.country === 'ES' ? 'Copiar resumen' : 'Copier le récapitulatif'}
            </span>
          </button>

          {/* Print summary */}
          <button
            type="button"
            onClick={() => window.print()}
            className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{form.country === 'ES' ? 'Imprimir expediente' : 'Imprimer le dossier'}</span>
          </button>
        </div>
      </div>

      {/* Recap summary display box */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {form.country === 'ES' ? 'Síntesis del expediente registrado' : 'Synthèse du dossier enregistré'}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-700 font-medium block">{t.amountLabel}</span>
            <span className="text-sm font-black text-slate-900">
              {formatCurrency(form.amount, form.country)}
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-700 font-medium block">{t.monthsLabel}</span>
            <span className="text-sm font-black text-slate-900">
              {form.months} {form.country === 'ES' ? 'meses' : 'mois'}
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-700 font-medium block">{t.monthlyPayment}</span>
            <span className="text-sm font-black text-emerald-700">
              {formatCurrency(simulation.monthlyPayment, form.country)}
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-700 font-medium block">{t.taeg}</span>
            <span className="text-sm font-black text-slate-900">{simulation.taeg}%</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.security1}</span>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-emerald-700 font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{form.country === 'ES' ? 'Nueva simulación' : 'Nouvelle simulation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
