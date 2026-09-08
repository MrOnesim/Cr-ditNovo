import React, { useRef, useState } from 'react';
import {
  Briefcase,
  Building,
  Home,
  CreditCard,
  UploadCloud,
  FileCheck,
  X,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { FormData, ValidationErrors, UploadedFileMeta, EmploymentType, SimulationResult } from '../types';
import { COUNTRIES } from '../lib/locale';
import { Translations, Lang, getLocalizedEmployment, getLocalizedSeniority, getLocalizedHousing } from '../lib/content';

interface Step3SituationProps {
  form: FormData;
  onChange: (updates: Partial<FormData>) => void;
  simulation: SimulationResult;
  errors: ValidationErrors;
  t: Translations;
  lang?: Lang;
}

export default function Step3Situation({
  form,
  onChange,
  simulation,
  errors,
  t,
  lang = 'es',
}: Step3SituationProps) {
  const currentCountry = COUNTRIES[form.country] || COUNTRIES.ES;
  const currencySymbol = currentCountry.currencySymbol;

  const currentEmploymentOptions = getLocalizedEmployment(lang);
  const currentSeniorityOptions = getLocalizedSeniority(lang);
  const currentHousingOptions = getLocalizedHousing(lang);

  // Calculate debt-to-income ratio (taux d'endettement)
  const incomeVal = parseFloat(form.income) || 0;
  const chargesVal = parseFloat(form.charges) || 0;
  const hasIncome = incomeVal > 0;

  const totalMonthlyCommitment = simulation.monthlyPayment + chargesVal;
  const debtRatio = hasIncome ? Math.round((totalMonthlyCommitment / incomeVal) * 100) : 0;
  const isHighDebt = debtRatio > 40;

  // File upload state / handlers with safeguards (anomaly 8)
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRecto = useRef<HTMLInputElement>(null);
  const fileInputVerso = useRef<HTMLInputElement>(null);
  const fileInputIncome = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    field: 'identityRecto' | 'identityVerso' | 'incomeFile',
    file: File | null
  ) => {
    setUploadError(null);
    if (!file) {
      onChange({ [field]: null });
      return;
    }

    // Safeguard 1: File size limit (3MB) — Vercel plafonne la requête à
    // ~4.5 MB ; les images lourdes sont compressées automatiquement, seul
    // un PDF brut volumineux peut être refusé ici.
    const MAX_SIZE = 3 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError(
        lang === 'es'
          ? `El archivo ${file.name} supera el tamaño máximo permitido (3 MB).`
          : `Le fichier ${file.name} est trop lourd (max 3 Mo).`
      );
      return;
    }

    // Safeguard 2: Allowed MIME types (.jpg, .jpeg, .png, .pdf)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|pdf)$/i)) {
      setUploadError(
        lang === 'es'
          ? `Formato no soportado para ${file.name}. Formatos admitidos: JPG, PNG, PDF.`
          : `Format non supporté pour ${file.name}. Formats autorisés : JPG, PNG, PDF.`
      );
      return;
    }

    const meta: UploadedFileMeta = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    onChange({ [field]: meta });

    // Lecture du contenu réel pour pouvoir l'enregistrer côté serveur et
    // partager un lien vers le document via WhatsApp.
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      // Réduction automatique des images volumineuses : Vercel limite la
      // taille d'une requête à ~4.5 MB, on garde donc chaque image légère.
      if (meta.type.startsWith('image/') && meta.size > 1.2 * 1024 * 1024) {
        compressImage(dataUrl)
          .then((compressed) =>
            onChange({ [field]: { ...meta, type: compressed.type, dataUrl: compressed.dataUrl } })
          )
          .catch(() => onChange({ [field]: { ...meta, dataUrl } }));
      } else {
        onChange({ [field]: { ...meta, dataUrl } });
      }
    };
    reader.onerror = () => setUploadError('Impossible de lire le fichier.');
    reader.readAsDataURL(file);
  };

  const compressImage = (dataUrl: string): Promise<{ dataUrl: string; type: string }> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1600;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          const scale = MAX_DIM / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas indisponible'));
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', 0.82),
          type: 'image/jpeg',
        });
      };
      img.onerror = () => reject(new Error('Image illisible'));
      img.src = dataUrl;
    });

  const handleIbanChange = (val: string) => {
    // Force uppercase and clean whitespace
    const formatted = val.toUpperCase();
    onChange({ iban: formatted });
  };

  return (
    <div className="space-y-8">
      {/* 14. Situation professionnelle */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-3">
          14. {t.employmentLabel} <span className="text-emerald-600">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {currentEmploymentOptions.map((opt) => {
            const isSelected = form.employment === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ employment: opt.id as EmploymentType })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <p className="font-bold text-sm text-slate-900">{opt.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{opt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 15. Ancienneté dans l'emploi */}
      <div className="max-w-md">
        <label htmlFor="seniority" className="block text-sm font-bold text-slate-900 mb-1.5">
          15. {t.seniorityLabel} <span className="text-emerald-600">*</span>
        </label>
        <div className="relative">
          <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            id="seniority"
            value={form.seniority}
            onChange={(e) => onChange({ seniority: e.target.value as FormData['seniority'] })}
            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            {currentSeniorityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Professional loan specific company fields */}
      {form.kind === 'professionnel' && (
        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              {t.companyInfoTitle || 'Información de la empresa'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-bold text-slate-900 mb-1.5">
                {t.proCompanyLabel} <span className="text-emerald-600">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                placeholder={lang === 'es' ? 'Ej. Nova Soluciones SL' : 'Ex. Nova Consulting SARL'}
                value={form.companyName || ''}
                onChange={(e) => onChange({ companyName: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 ${
                  errors.companyName
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                }`}
              />
              {errors.companyName && (
                <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.companyName}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="siret" className="block text-sm font-bold text-slate-900 mb-1.5">
                {t.proSiretLabel}
              </label>
              <input
                id="siret"
                type="text"
                placeholder={lang === 'es' ? 'Ej. B12345678 / CIF' : 'Ex. 849 201 394 00018 / NIF'}
                value={form.siret || ''}
                onChange={(e) => onChange({ siret: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 ${
                  errors.siret
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                }`}
              />
              {errors.siret && (
                <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.siret}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 16 & 17. Revenu net mensuel et Charges mensuelles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Revenu */}
        <div>
          <label htmlFor="income" className="block text-sm font-bold text-slate-900 mb-1.5">
            16. {t.incomeLabel} ({currencySymbol}) <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <span className="text-sm font-bold text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              {currencySymbol}
            </span>
            <input
              id="income"
              type="number"
              min="0"
              placeholder="2400"
              value={form.income}
              onChange={(e) => onChange({ income: e.target.value })}
              className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 ${
                errors.income
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.income ? (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.income}</span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 mt-1">{t.incomeMin || 'Mínimo'} 300 {currencySymbol}</p>
          )}
        </div>

        {/* Charges */}
        <div>
          <label htmlFor="charges" className="block text-sm font-bold text-slate-900 mb-1.5">
            17. {t.chargesLabel} ({currencySymbol})
          </label>
          <div className="relative">
            <span className="text-sm font-bold text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              {currencySymbol}
            </span>
            <input
              id="charges"
              type="number"
              min="0"
              placeholder="850"
              value={form.charges}
              onChange={(e) => onChange({ charges: e.target.value })}
              className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 ${
                errors.charges
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.charges ? (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.charges}</span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 mt-1">{t.chargesHelp || 'Opcional (alquiler o préstamos vigentes)'}</p>
          )}
        </div>
      </div>

      {/* Bloc calculé : Taux d'endettement estimé */}
      {hasIncome && (
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isHighDebt
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              {isHighDebt ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              <h4 className="font-bold text-sm">{t.debtRatioTitle}</h4>
            </div>
            <span
              className={`text-lg font-black px-2.5 py-0.5 rounded-lg ${
                isHighDebt ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
              }`}
            >
              {debtRatio}%
            </span>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            {isHighDebt ? t.debtRatioHigh : t.debtRatioGood}
          </p>
        </div>
      )}

      {/* 18. Situation de logement */}
      <div className="max-w-md">
        <label htmlFor="housing" className="block text-sm font-bold text-slate-900 mb-1.5">
          18. {t.housingLabel} <span className="text-emerald-600">*</span>
        </label>
        <div className="relative">
          <Home className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            id="housing"
            value={form.housing}
            onChange={(e) => onChange({ housing: e.target.value as FormData['housing'] })}
            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            {currentHousingOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 19. IBAN de versement (facultatif) avec Mod-97 */}
      <div>
        <label htmlFor="iban" className="block text-sm font-bold text-slate-900 mb-1.5">
          19. {t.ibanLabel}
        </label>
        <div className="relative">
          <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="iban"
            type="text"
            placeholder={currentCountry.ibanExample}
            value={form.iban}
            onChange={(e) => handleIbanChange(e.target.value)}
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm font-mono tracking-wider text-slate-900 bg-white uppercase transition-colors focus:outline-hidden focus:ring-2 ${
              errors.iban
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
            }`}
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-1">{t.ibanHelp}</p>
        {errors.iban && (
          <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.iban}</span>
          </p>
        )}
      </div>

      {/* 20, 21, 22. Pièces justificatives (facultatives) */}
      <div className="pt-4 border-t border-slate-200/80">
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            {t.docsTitle}
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.docsNote}</p>
        </div>

        {uploadError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Recto */}
          <div className="border border-dashed border-slate-300 rounded-xl p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <span className="block text-xs font-semibold text-slate-800 mb-2 truncate">
              {t.uploadIdRecto}
            </span>
            <input
              type="file"
              ref={fileInputRecto}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload('identityRecto', e.target.files?.[0] || null)}
            />
            {form.identityRecto ? (
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium text-slate-800">
                    {form.identityRecto.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ identityRecto: null })}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title={t.removeFile}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRecto.current?.click()}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.chooseFile}</span>
              </button>
            )}
          </div>

          {/* Verso */}
          <div className="border border-dashed border-slate-300 rounded-xl p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <span className="block text-xs font-semibold text-slate-800 mb-2 truncate">
              {t.uploadIdVerso}
            </span>
            <input
              type="file"
              ref={fileInputVerso}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload('identityVerso', e.target.files?.[0] || null)}
            />
            {form.identityVerso ? (
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium text-slate-800">
                    {form.identityVerso.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ identityVerso: null })}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title={t.removeFile}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputVerso.current?.click()}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.chooseFile}</span>
              </button>
            )}
          </div>

          {/* Justificatif revenus */}
          <div className="border border-dashed border-slate-300 rounded-xl p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <span className="block text-xs font-semibold text-slate-800 mb-2 truncate">
              {t.uploadIncome}
            </span>
            <input
              type="file"
              ref={fileInputIncome}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload('incomeFile', e.target.files?.[0] || null)}
            />
            {form.incomeFile ? (
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium text-slate-800">
                    {form.incomeFile.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ incomeFile: null })}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title={t.removeFile}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputIncome.current?.click()}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.chooseFile}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
