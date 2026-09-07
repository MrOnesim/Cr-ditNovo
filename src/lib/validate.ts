import { FormData, ValidationErrors } from '../types';
import { COUNTRIES } from './locale';
import { Lang } from './content';

export function validateEmail(email: string, lang: Lang = 'es'): string | null {
  if (!email || !email.trim()) {
    return lang === 'es' ? 'Indique su correo electrónico' : lang === 'fr' ? 'Indiquez votre email' : 'Please provide your email';
  }
  const clean = email.trim();
  if (clean.includes('..') || clean.split('@').length !== 2) {
    return lang === 'es' ? 'Dirección de correo electrónico no válida' : lang === 'fr' ? 'Adresse email invalide' : 'Invalid email address';
  }
  const [local, domain] = clean.split('@');
  if (!local || !domain || !domain.includes('.')) {
    return lang === 'es' ? 'Dirección de correo electrónico no válida' : lang === 'fr' ? 'Adresse email invalide' : 'Invalid email address';
  }
  const parts = domain.split('.');
  const tld = parts[parts.length - 1];
  if (!tld || tld.length < 2) {
    return lang === 'es' ? 'Dirección de correo electrónico no válida' : lang === 'fr' ? 'Adresse email invalide' : 'Invalid email address';
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    return lang === 'es' ? 'Dirección de correo electrónico no válida' : lang === 'fr' ? 'Adresse email invalide' : 'Invalid email address';
  }
  return null;
}

export function validatePhone(phone: string, lang: Lang = 'es'): string | null {
  if (!phone || !phone.trim()) {
    return lang === 'es' ? 'Indique su número de teléfono' : lang === 'fr' ? 'Indiquez votre numéro de téléphone' : 'Please provide your phone number';
  }
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 14) {
    return lang === 'es' ? 'Número de teléfono no válido (9-12 dígitos)' : lang === 'fr' ? 'Numéro de téléphone invalide (9-12 chiffres)' : 'Invalid phone number (9-12 digits)';
  }
  return null;
}

export function validateBirth(birth: string, lang: Lang = 'es'): string | null {
  if (!birth || !birth.trim()) {
    return lang === 'es' ? 'Indique su fecha de nacimiento' : lang === 'fr' ? 'Indiquez votre date de naissance' : 'Please provide your date of birth';
  }
  const birthDate = new Date(birth);
  if (isNaN(birthDate.getTime())) {
    return lang === 'es' ? 'Fecha de nacimiento no válida' : lang === 'fr' ? 'Date de naissance invalide' : 'Invalid date of birth';
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    return lang === 'es' ? 'Debe ser mayor de edad (mínimo 18 años)' : lang === 'fr' ? 'Vous devez être majeur (18 ans minimum)' : 'You must be at least 18 years old';
  }
  if (age > 90 || age < 0) {
    return lang === 'es' ? 'Fecha de nacimiento no válida (entre 18 y 90 años)' : lang === 'fr' ? 'Date de naissance invalide' : 'Invalid date of birth';
  }
  return null;
}

export function validateIBAN(rawIban: string, lang: Lang = 'es'): string | null {
  const clean = rawIban.replace(/[\s-]/g, '').toUpperCase();
  if (!clean) return null;

  if (clean.length < 15 || clean.length > 34) {
    return lang === 'es' ? 'IBAN: entre 15 y 34 caracteres' : lang === 'fr' ? 'IBAN : 15 à 34 caractères' : 'IBAN: 15 to 34 characters';
  }

  if (!/^[A-Z]{2}[0-9A-Z]{13,32}$/.test(clean)) {
    return lang === 'es' ? 'El IBAN debe comenzar con el código de país (2 letras)' : lang === 'fr' ? 'IBAN doit commencer par 2 lettres puis des chiffres' : 'IBAN must start with 2 letters country code';
  }

  const rearranged = clean.slice(4) + clean.slice(0, 4);
  let numericString = '';
  for (let i = 0; i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      numericString += (code - 55).toString();
    } else {
      numericString += rearranged[i];
    }
  }

  try {
    const mod = BigInt(numericString) % 97n;
    if (mod !== 1n) {
      return lang === 'es' ? 'IBAN no válido (dígito de control erróneo)' : lang === 'fr' ? 'IBAN invalide (clé de contrôle erronée)' : 'Invalid IBAN (checksum mismatch)';
    }
  } catch {
    return lang === 'es' ? 'IBAN no válido' : lang === 'fr' ? 'IBAN invalide' : 'Invalid IBAN';
  }

  return null;
}

export function validateSIRET(siret: string, lang: Lang = 'es'): string | null {
  if (!siret || !siret.trim()) {
    return lang === 'es' ? 'CIF / NIF o identificador de empresa requerido' : lang === 'fr' ? 'Numéro SIRET / Identifiant d\'entreprise requis' : 'Company tax ID / registration required';
  }
  const clean = siret.replace(/[\s.-]/g, '');
  if (clean.length < 8 || clean.length > 14) {
    return lang === 'es' ? 'Identificador fiscal no válido (8 a 14 caracteres)' : lang === 'fr' ? 'Numéro d\'immatriculation invalide (8 à 14 caractères)' : 'Invalid tax ID (8 to 14 characters)';
  }
  return null;
}

export function validateStep2(form: FormData, lang: Lang = 'es'): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.firstName || form.firstName.trim().length < 2) {
    errors.firstName = lang === 'es' ? 'Indique su nombre' : lang === 'fr' ? 'Indiquez votre prénom' : 'Please provide your first name';
  }

  if (!form.lastName || form.lastName.trim().length < 2) {
    errors.lastName = lang === 'es' ? 'Indique sus apellidos' : lang === 'fr' ? 'Indiquez votre nom' : 'Please provide your last name';
  }

  const emailErr = validateEmail(form.email, lang);
  if (emailErr) {
    errors.email = emailErr;
  }

  const phoneErr = validatePhone(form.phone, lang);
  if (phoneErr) {
    errors.phone = phoneErr;
  }

  const birthErr = validateBirth(form.birth, lang);
  if (birthErr) {
    errors.birth = birthErr;
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = lang === 'es' ? 'Indique su ciudad de residencia' : lang === 'fr' ? 'Indiquez votre ville' : 'Please provide your city';
  }

  return errors;
}

export function validateStep3(form: FormData, lang: Lang = 'es'): ValidationErrors {
  const errors: ValidationErrors = {};
  const country = COUNTRIES[form.country] || COUNTRIES.ES;
  const currencySymbol = country.currencySymbol;

  const incomeNum = parseFloat(form.income);
  if (isNaN(incomeNum) || incomeNum < 300) {
    errors.income = lang === 'es' 
      ? `Ingresos netos mensuales requeridos (mín. 300 ${currencySymbol})` 
      : lang === 'fr' 
      ? `Revenu net mensuel requis (min. 300 ${currencySymbol})` 
      : `Monthly net income required (min. 300 ${currencySymbol})`;
  }

  if (form.charges && form.charges.trim() !== '') {
    const chargesNum = parseFloat(form.charges);
    if (isNaN(chargesNum) || chargesNum < 0) {
      errors.charges = lang === 'es' ? 'Importe no válido' : lang === 'fr' ? 'Montant invalide' : 'Invalid amount';
    }
  }

  if (form.iban && form.iban.trim() !== '') {
    const ibanErr = validateIBAN(form.iban, lang);
    if (ibanErr) {
      errors.iban = ibanErr;
    }
  }

  if (form.kind === 'professionnel') {
    if (!form.companyName || form.companyName.trim().length < 2) {
      errors.companyName = lang === 'es' ? 'Indique la razón social de la empresa' : lang === 'fr' ? 'Indiquez la raison sociale de votre entreprise' : 'Please provide your company name';
    }
    if (form.siret && form.siret.trim() !== '') {
      const siretErr = validateSIRET(form.siret, lang);
      if (siretErr) {
        errors.siret = siretErr;
      }
    }
  }

  return errors;
}

export function validateStep4(form: FormData, lang: Lang = 'es'): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!form.consent) {
    errors.consent = lang === 'es' ? 'Debe aceptar la política de privacidad para continuar' : lang === 'fr' ? 'Vous devez accepter la politique de confidentialité' : 'You must accept the privacy policy to continue';
  }
  return errors;
}
