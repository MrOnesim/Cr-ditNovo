import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Globe, AlertCircle } from 'lucide-react';
import { FormData, ValidationErrors, Civility } from '../types';
import { COUNTRIES } from '../lib/locale';
import { Translations } from '../lib/content';

interface Step2IdentityProps {
  form: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: ValidationErrors;
  t: Translations;
}

export default function Step2Identity({
  form,
  onChange,
  errors,
  t,
}: Step2IdentityProps) {
  const currentCountry = COUNTRIES[form.country] || COUNTRIES.ES;

  const handleCountryChange = (newCountryCode: string) => {
    onChange({
      country: newCountryCode,
    });
  };

  const civilityOptions = [
    { value: 'Mme' as Civility, label: t.civilityMrs || 'Sra.' },
    { value: 'M.' as Civility, label: t.civilityMr || 'Sr.' },
    { value: 'Autre' as Civility, label: t.civilityOther || 'Otro' },
  ];

  return (
    <div className="space-y-6">
      {/* 6. Civilité */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2.5">
          {t.civilityLabel} <span className="text-emerald-600">*</span>
        </label>
        <div className="flex gap-3 max-w-sm">
          {civilityOptions.map((civ) => (
            <button
              key={civ.value}
              type="button"
              onClick={() => onChange({ civility: civ.value })}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all ${
                form.civility === civ.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {civ.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7 & 8. Prénom et Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-bold text-slate-900 mb-1.5">
            {t.firstNameLabel} <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="firstName"
              type="text"
              placeholder={form.country === 'ES' ? 'Carlos' : 'Camille'}
              value={form.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
                errors.firstName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.firstName && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.firstName}</span>
            </p>
          )}
        </div>

        {/* Nom */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-bold text-slate-900 mb-1.5">
            {t.lastNameLabel} <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="lastName"
              type="text"
              placeholder={form.country === 'ES' ? 'García' : 'Rousseau'}
              value={form.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
                errors.lastName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.lastName && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.lastName}</span>
            </p>
          )}
        </div>
      </div>

      {/* 9 & 10. Email et Téléphone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-1.5">
            {t.emailLabel} <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              placeholder="camille@email.com"
              value={form.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
                errors.email
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-1.5">
            {t.phoneLabel} <span className="text-emerald-600">*</span>
          </label>
          <div className="relative flex rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
            <span className="inline-flex items-center gap-1 px-3 bg-slate-50 text-xs font-bold text-slate-700 border-r border-slate-200 rounded-l-xl">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {currentCountry.phonePrefix}
            </span>
            <input
              id="phone"
              type="tel"
              placeholder={`ex. ${currentCountry.phoneExample}`}
              value={form.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className={`w-full px-3 py-2.5 text-sm text-slate-900 bg-transparent rounded-r-xl focus:outline-hidden ${
                errors.phone ? 'bg-rose-50/20' : ''
              }`}
            />
          </div>
          {errors.phone && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* 11. Date de naissance */}
      <div>
        <label htmlFor="birth" className="block text-sm font-bold text-slate-900 mb-1.5">
          {t.birthLabel} <span className="text-emerald-600">*</span>
        </label>
        <div className="relative max-w-sm">
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="birth"
            type="date"
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 90)).toISOString().split('T')[0]}
            value={form.birth}
            onChange={(e) => onChange({ birth: e.target.value })}
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
              errors.birth
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
            }`}
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-1">{t.birthHint || 'Debe tener entre 18 y 90 años.'}</p>
        {errors.birth && (
          <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.birth}</span>
          </p>
        )}
      </div>

      {/* 12 & 13. Pays de résidence et Ville */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pays */}
        <div>
          <label htmlFor="country" className="block text-sm font-bold text-slate-900 mb-1.5">
            {t.countryLabel} <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="country"
              value={form.country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              {Object.values(COUNTRIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.phonePrefix} · {c.currencySymbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ville */}
        <div>
          <label htmlFor="city" className="block text-sm font-bold text-slate-900 mb-1.5">
            {t.cityLabel} <span className="text-emerald-600">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="city"
              type="text"
              placeholder={form.country === 'ES' ? 'Zaragoza' : form.country === 'FR' ? 'Paris' : 'Bruxelles'}
              value={form.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
                errors.city
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.city && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
