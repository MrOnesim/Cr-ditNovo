import { FormData, SimulationResult, StoredFile } from '../types';

export interface SubmitApplicationPayload {
  reference: string;
  form: FormData;
  simulation: SimulationResult;
  files: Array<{ kind: string; name: string; type: string; dataUrl: string }>;
}

export interface SubmitApplicationResult {
  id: number;
  reference: string;
  files: StoredFile[];
}

export interface AdminFile {
  id: number;
  kind: string;
  fileName: string;
  mimeType: string;
  path: string;
}

export interface AdminApplication {
  id: number;
  reference: string;
  kind: string;
  profile: string;
  purpose: string;
  amount: string;
  months: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  income: string | null;
  employment: string;
  status: string;
  created_at: string;
  files: AdminFile[];
}

const TOKEN_STORAGE_KEY = 'creditnovo-admin-token';

// Slug secret : préfixe de l'API conseiller (/api/<slug>/...)
// Valeur par défaut embarquée au build (VITE_ADMIN_SLUG reste prioritaire).
export const ADMIN_SLUG =
  (import.meta.env.VITE_ADMIN_SLUG || 'u4pmZaJsVCow').replace(/^\/+|\/+$/g, '');

function adminApiPath(path: string): string {
  return `/api/${ADMIN_SLUG}${path}`;
}

export function adminApplicationUrl(id: number): string {
  return toAbsoluteUrl(adminApiPath(`/applications/${id}`));
}

export function getAdminToken(): string {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY) || '';
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
}

export async function submitApplication(
  payload: SubmitApplicationPayload
): Promise<SubmitApplicationResult> {
  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Erreur serveur (${res.status})`);
  }

  return res.json();
}

export async function adminLogin(password: string): Promise<{ token: string; expiresIn: number }> {
  const res = await fetch(adminApiPath('/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error || `Erreur serveur (${res.status})`);
  }
  return body;
}

export async function fetchApplications(token: string): Promise<AdminApplication[]> {
  const res = await fetch(adminApiPath('/applications'), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Erreur serveur (${res.status})`);
  }
  return res.json();
}

// Construit l'URL absolue d'un fichier pour le partage (WhatsApp / email)
export function toAbsoluteUrl(path: string): string {
  return `${window.location.origin}${path}`;
}