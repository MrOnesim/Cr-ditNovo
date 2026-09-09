import { EmploymentType, FormData, HousingType, SeniorityType, SimulationResult } from './types';
import { detectUserCountry } from './lib/locale';

export const personalPurposes = [
  { id: 'travaux', label: 'Obras y reformas', icon: 'Hammer' },
  { id: 'auto', label: 'Coche / moto', icon: 'Car' },
  { id: 'regroupement', label: 'Reunificación de deudas', icon: 'Layers' },
  { id: 'etudes', label: 'Estudios y formación', icon: 'GraduationCap' },
  { id: 'voyage', label: 'Viajes y ocio', icon: 'Plane' },
  { id: 'sante', label: 'Salud e imprevistos', icon: 'HeartPulse' },
] as const;

export const proPurposes = [
  { id: 'tresorerie', label: 'Tesorería y liquidez', icon: 'Coins' },
  { id: 'equipement', label: 'Equipamiento y maquinaria', icon: 'Cpu' },
  { id: 'local', label: 'Local comercial u oficina', icon: 'Store' },
  { id: 'stock', label: 'Compra de existencias', icon: 'Boxes' },
  { id: 'recrutement', label: 'Contratación de personal', icon: 'Users' },
  { id: 'croissance', label: 'Crecimiento y expansión', icon: 'TrendingUp' },
] as const;

export const employmentOptions: Array<{ id: EmploymentType; label: string; desc: string }> = [
  { id: 'cdi', label: 'Indefinido', desc: 'Contrato indefinido' },
  { id: 'cdd', label: 'Temporal / Obra', desc: 'Contrato temporal o interinidad' },
  { id: 'independant', label: 'Autónomo', desc: 'Profesional por cuenta propia' },
  { id: 'fonctionnaire', label: 'Funcionario', desc: 'Empleado público con plaza' },
  { id: 'retraite', label: 'Jubilado', desc: 'Pensión contributiva' },
  { id: 'autre', label: 'Otra situación', desc: 'Estudiante, sin actividad, etc.' },
];

export const seniorityOptions: SeniorityType[] = [
  'Menos de 1 año',
  '1 a 3 años',
  '3 a 5 años',
  'Más de 5 años',
];

export const housingOptions: HousingType[] = [
  'Inquilino / Alquiler',
  'Propietario',
  'Con familiares / Alojado',
  'Vivienda de empresa',
];

export const INITIAL_FORM_STATE: FormData = {
  kind: 'personnel',
  profile: 'particuliers',
  purpose: 'travaux',
  amount: 10000,
  months: 36,
  companyName: '',
  siret: '',
  civility: 'Sra.',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birth: '',
  country: detectUserCountry(),
  city: '',
  employment: 'cdi',
  seniority: '1 a 3 años',
  income: '',
  charges: '',
  housing: 'Inquilino / Alquiler',
  iban: '',
  identityRecto: null,
  identityVerso: null,
  incomeFile: null,
  consent: false,
  marketing: false,
};

export function getInitialFormData(): FormData {
  try {
    const raw = sessionStorage.getItem('creditnovo-prefill') || sessionStorage.getItem('pretnova-prefill');
    if (raw) {
      sessionStorage.removeItem('creditnovo-prefill');
      sessionStorage.removeItem('pretnova-prefill');
      const parsed = JSON.parse(raw);
      return {
        ...INITIAL_FORM_STATE,
        ...parsed,
        kind: parsed.kind || INITIAL_FORM_STATE.kind,
        purpose: parsed.purpose || (parsed.kind === 'professionnel' ? 'tresorerie' : 'travaux'),
        amount: Number(parsed.amount) || INITIAL_FORM_STATE.amount,
        months: Number(parsed.months) || INITIAL_FORM_STATE.months,
        profile: parsed.profile || INITIAL_FORM_STATE.profile,
        marketing: false, // Opt-in actif RGPD : non pré-cochée par défaut
      };
    }
  } catch {
    // Ignore storage issues
  }
  return { ...INITIAL_FORM_STATE, marketing: false };
}

export function calculateLoan(amount: number, months: number, profile: 'particuliers' | 'prestige' = 'particuliers'): SimulationResult {
  // Competitive European fixed APR scale: 2.80% - 4.10%
  let tann = 3.20;
  if (profile === 'prestige') {
    tann = 2.80;
  } else if (amount >= 30000) {
    tann = 2.95;
  } else if (amount >= 15000) {
    tann = 3.10;
  } else if (months > 60) {
    tann = 3.65;
  }

  const taeg = +(tann + 0.30).toFixed(2);
  const monthlyRate = (tann / 100) / 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = amount / months;
  } else {
    monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  }

  const roundedMonthly = Math.round(monthlyPayment * 100) / 100;
  const totalCost = Math.round(roundedMonthly * months * 100) / 100;
  const totalInterest = Math.round((totalCost - amount) * 100) / 100;

  return {
    monthlyPayment: roundedMonthly,
    tann,
    taeg,
    totalInterest,
    totalCost,
  };
}

export const WHATSAPP_PHONE = '34742084822'; // +34 742 08 48 22 requested by user
export const WHATSAPP_DISPLAY_PHONE = '+34 742 08 48 22';
export const CONTACT_EMAIL = 'contacto@creditnovo.com';
