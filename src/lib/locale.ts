import { CountryInfo } from '../types';

export const COUNTRIES: Record<string, CountryInfo> = {
  ES: {
    code: 'ES',
    name: 'Espagne',
    phonePrefix: '+34',
    phoneExample: '612 34 56 78',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'es-ES',
    lang: 'es',
    ibanExample: 'ES76 3000 6000 0112 3456 7890',
  },
  FR: {
    code: 'FR',
    name: 'France',
    phonePrefix: '+33',
    phoneExample: '06 12 34 56 78',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'fr-FR',
    lang: 'fr',
    ibanExample: 'FR76 3000 6000 0112 3456 7890 189',
  },
  BE: {
    code: 'BE',
    name: 'Belgique',
    phonePrefix: '+32',
    phoneExample: '04 78 90 12 34',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'fr-BE',
    lang: 'fr',
    ibanExample: 'BE68 5390 0754 7034',
  },
  LU: {
    code: 'LU',
    name: 'Luxembourg',
    phonePrefix: '+352',
    phoneExample: '621 123 456',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'fr-LU',
    lang: 'fr',
    ibanExample: 'LU28 0019 3465 8769 0000',
  },
  IT: {
    code: 'IT',
    name: 'Italie',
    phonePrefix: '+39',
    phoneExample: '345 123 45 67',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'it-IT',
    lang: 'it',
    ibanExample: 'IT60 X054 2811 1010 0000 0123 456',
  },
  PT: {
    code: 'PT',
    name: 'Portugal',
    phonePrefix: '+351',
    phoneExample: '912 345 678',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'pt-PT',
    lang: 'pt',
    ibanExample: 'PT50 0000 0000 0000 0000 0000 0',
  },
  DE: {
    code: 'DE',
    name: 'Allemagne',
    phonePrefix: '+49',
    phoneExample: '0151 12345678',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'de-DE',
    lang: 'de',
    ibanExample: 'DE89 3704 0044 0532 0130 00',
  },
  SV: {
    code: 'SV',
    name: 'Salvador',
    phonePrefix: '+503',
    phoneExample: '7123 4567',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'es-SV',
    lang: 'es',
    ibanExample: 'SV62 CUSC 0000 0000 0000 1234 5678',
  },
  SK: {
    code: 'SK',
    name: 'Slovaquie',
    phonePrefix: '+421',
    phoneExample: '0901 123 456',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'sk-SK',
    lang: 'sk',
    ibanExample: 'SK31 1200 0000 0019 8742 6375',
  },
};

export function detectUserCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Madrid') || tz.includes('Canary')) return 'ES';
    if (tz.includes('Paris')) return 'FR';
    if (tz.includes('Brussels')) return 'BE';
    if (tz.includes('Luxembourg')) return 'LU';
    if (tz.includes('Rome')) return 'IT';
    if (tz.includes('Lisbon')) return 'PT';
    if (tz.includes('Berlin')) return 'DE';
    if (tz.includes('Bratislava')) return 'SK';
    if (tz.includes('El_Salvador')) return 'SV';
  } catch {
    // ignore
  }
  return 'ES'; // Fallback per specification
}

export function formatCurrency(amount: number, countryCode: string = 'ES'): string {
  const country = COUNTRIES[countryCode] || COUNTRIES.ES;
  const isUSD = country.currency === 'USD';
  const formatted = new Intl.NumberFormat(country.locale, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return isUSD ? `$${formatted}` : `${formatted} €`;
}
