import { useEffect, useState, type FormEvent } from 'react';
import {
  Lock,
  LogOut,
  ArrowLeft,
  FileText,
  Eye,
  RefreshCw,
  ShieldCheck,
  Building2,
  User,
  Inbox,
} from 'lucide-react';
import {
  AdminApplication,
  adminApplicationUrl,
  adminLogin,
  clearAdminToken,
  fetchApplications,
  getAdminToken,
  setAdminToken,
  toAbsoluteUrl,
} from '../lib/api';
import { COUNTRIES, formatCurrency } from '../lib/locale';
import { personalPurposes, proPurposes, employmentOptions } from '../data';

const FILE_KIND_LABEL: Record<string, string> = {
  identityRecto: 'ID recto',
  identityVerso: 'ID verso',
  incomeFile: 'Justificatif revenus',
};

function purposeLabel(id: string, kind: string) {
  const pool = kind === 'professionnel' ? proPurposes : personalPurposes;
  return pool.find((p) => p.id === id)?.label || id;
}

function employmentLabel(id: string) {
  return employmentOptions.find((e) => e.id === id)?.label || id;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string>(() => getAdminToken());
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<AdminApplication[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      setApplications(await fetchApplications(t));
    } catch (err) {
      if (String(err).includes('401')) {
        setToken('');
        clearAdminToken();
        setApplications(null);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) void load(token);
  }, [token]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const { token: newToken } = await adminLogin(password);
      setAdminToken(newToken);
      setToken(newToken);
      setPassword('');
    } catch (err) {
      setLoginError(String(err));
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setToken('');
    setApplications(null);
  };

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-2 ring-emerald-500/20 bg-emerald-700 flex items-center justify-center shrink-0">
                <img src="/images/logo.jpg" alt="CréditNovo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-slate-900">
                  Crédit<span className="text-emerald-600">Novo</span>{' '}
                  <span className="text-sm font-semibold text-slate-500">· Espace conseiller</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {token && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Déconnexion
                </button>
              )}
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Retour au formulaire
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* ── Non connecté : formulaire de connexion ── */}
        {!token ? (
          <div className="max-w-md mx-auto mt-10">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-black text-slate-900 mb-1">Espace conseiller</h1>
              <p className="text-sm text-slate-600 mb-6">
                Connectez-vous pour consulter les dossiers de demande et leurs documents.
              </p>

              {loginError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-bold text-slate-900 mb-1.5">
                    Mot de passe
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loggingIn || !password}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  {loggingIn ? 'Connexion…' : 'Se connecter'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ── Connecté : liste des demandes ── */
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Demandes de prêt <span className="text-emerald-600">({applications?.length ?? 0})</span>
                </h1>
                <p className="text-sm text-slate-600">
                  {applications && applications.length > 0
                    ? `${applications.length} dossier(s) enregistré(s). Cliquez sur un document pour l'ouvrir.`
                    : 'Aucun dossier enregistré pour le moment.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => token && load(token)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm text-rose-700">
                {error}
              </div>
            )}

            {applications !== null && applications.length === 0 && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-sm">
                <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">
                  Aucune demande pour le moment. Elles apparaîtront ici après validation du formulaire.
                </p>
              </div>
            )}

            {applications?.map((app) => {
              const country = COUNTRIES[app.country] || COUNTRIES.ES;
              return (
                <div key={app.id} className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1">
                        {app.reference}
                      </span>
                      <span className="text-xs text-slate-500">{formatDate(app.created_at)}</span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 rounded-full px-2.5 py-1">
                        {app.kind === 'professionnel' ? <Building2 className="w-3 h-3 inline mr-1" /> : <User className="w-3 h-3 inline mr-1" />}
                        {app.kind === 'professionnel' ? 'Professionnel' : 'Personnel'}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 capitalize">
                        {app.status}
                      </span>
                    </div>
                    <a
                      href={adminApplicationUrl(app.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Détail
                    </a>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-4 text-sm">
                    <div>
                      <span className="block text-[11px] text-slate-500 font-semibold">Demandeur</span>
                      <span className="font-bold text-slate-900">{app.first_name} {app.last_name}</span>
                      <span className="block text-xs text-slate-600">{app.email}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 font-semibold">Résidence</span>
                      <span className="font-bold text-slate-900">{app.city}</span>
                      <span className="block text-xs text-slate-600">{country.name}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 font-semibold">Montant</span>
                      <span className="font-black text-emerald-700">{formatCurrency(Number(app.amount), app.country)}</span>
                      <span className="block text-xs text-slate-600">{app.months} mois</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 font-semibold">Objet</span>
                      <span className="font-bold text-slate-900">{purposeLabel(app.purpose, app.kind)}</span>
                      <span className="block text-xs text-slate-600">{employmentLabel(app.employment)}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 font-semibold">Revenus</span>
                      <span className="font-bold text-slate-900">{app.income ? `${app.income} ${country.currencySymbol}` : '—'}</span>
                    </div>
                  </div>

                  {app.files && app.files.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-3">Documents</p>
                      <div className="flex flex-wrap gap-4">
                        {app.files.map((file) => {
                          const url = toAbsoluteUrl(file.path);
                          const isImage = file.mimeType.startsWith('image/');
                          return (
                            <a
                              key={file.id}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 border border-slate-200 rounded-2xl p-2.5 pr-4 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors"
                              title={`Ouvrir ${file.fileName}`}
                            >
                              {isImage ? (
                                <img
                                  src={url}
                                  alt={file.fileName}
                                  className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-slate-100"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                                  <FileText className="w-6 h-6" />
                                </div>
                              )}
                              <div>
                                <span className="block text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                                  {FILE_KIND_LABEL[file.kind] || file.kind}
                                </span>
                                <span className="block text-[11px] text-slate-500 truncate max-w-40">
                                  {file.fileName}
                                </span>
                                <span className="block text-[11px] font-semibold text-emerald-600">
                                  Ouvrir ↗
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Espace sécurisé réservé aux conseillers CréditNovo.
          </p>
        </div>
      </footer>
    </div>
  );
}