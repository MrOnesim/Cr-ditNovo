import { Shield, Lock, PhoneCall, Globe, CheckCircle2 } from 'lucide-react';
import { Lang } from '../lib/content';
import { WHATSAPP_DISPLAY_PHONE } from '../data';

interface NavbarProps {
  currentLang: Lang;
  onSelectLang: (lang: Lang) => void;
}

const LANGUAGES: Array<{ code: Lang; label: string; flag: string }> = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

export default function Navbar({ currentLang, onSelectLang }: NavbarProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-2 ring-emerald-500/20 bg-emerald-700 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/images/creditnovo_logo_1788796480997.jpg"
                alt="CréditNovo Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                Crédit<span className="text-emerald-600">Novo</span>
              </span>
            </div>
          </div>

          {/* Right actions: Phone, Language switcher */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Phone & WhatsApp contact */}
            <a
              href={`https://wa.me/34672072061`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-200 transition-colors"
              title="WhatsApp"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {currentLang === 'es'
                  ? 'Asesor directo'
                  : currentLang === 'en'
                  ? 'Direct advisor'
                  : currentLang === 'de'
                  ? 'Berater'
                  : currentLang === 'it'
                  ? 'Consulente'
                  : currentLang === 'pt'
                  ? 'Gestor direto'
                  : 'Conseiller direct'} : {WHATSAPP_DISPLAY_PHONE}
              </span>
            </a>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-700">
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <select
                  value={currentLang}
                  onChange={(e) => onSelectLang(e.target.value as Lang)}
                  aria-label="Sélectionner la langue"
                  className="bg-transparent border-none text-xs font-medium text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  {LANGUAGES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.code.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
