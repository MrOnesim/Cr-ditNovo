export type LoanKind = 'personnel' | 'professionnel';
export type LoanProfile = 'particuliers' | 'prestige';
export type Civility = 'Mme' | 'M.' | 'Autre' | 'Sra.' | 'Sr.' | 'Otro' | string;
export type EmploymentType = 'cdi' | 'cdd' | 'independant' | 'fonctionnaire' | 'retraite' | 'autre';
export type SeniorityType = string;
export type HousingType = string;

export interface UploadedFileMeta {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
}

export interface FormData {
  // Étape 1 : Votre prêt
  kind: LoanKind;
  profile: LoanProfile;
  purpose: string;
  amount: number;
  months: number;

  // Champs pro additionnels si pro
  companyName?: string;
  siret?: string;

  // Étape 2 : Votre identité
  civility: Civility;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birth: string;
  country: string; // Country code e.g. "FR", "ES", etc.
  city: string;

  // Étape 3 : Votre situation
  employment: EmploymentType;
  seniority: SeniorityType;
  income: string; // keep as string in input to allow typing, parse on calculation
  charges: string;
  housing: HousingType;
  iban: string;
  identityRecto: UploadedFileMeta | null;
  identityVerso: UploadedFileMeta | null;
  incomeFile: UploadedFileMeta | null;

  // Étape 4 : Récapitulatif
  consent: boolean;
  marketing: boolean;
}

export interface CountryInfo {
  code: string;
  name: string;
  phonePrefix: string;
  phoneExample: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  lang: string;
  ibanExample: string;
}

export interface SimulationResult {
  monthlyPayment: number;
  tann: number; // Taux Annuel Net Nominal (%)
  taeg: number; // Taux Annuel Effectif Global (%)
  totalInterest: number;
  totalCost: number; // MTIC (Montant Total Dû)
}

export type ValidationErrors = Partial<Record<keyof FormData | 'general', string>>;

export interface StoredFile {
  id: number;
  kind: string; // 'identityRecto' | 'identityVerso' | 'incomeFile'
  fileName: string;
  mimeType: string;
  path: string; // chemin relatif ex. /api/files/12/abc123
  url?: string; // URL absolue construite côté front
}
