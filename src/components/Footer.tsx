import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Shield, FileText, AlertTriangle, HelpCircle, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  const { language, navigateTo, t } = useApp();
  const currentYear = new Date().getFullYear();
  const logoUrl = 'https://pxdrop.online/raw/dauv31q81qec73f6ofi0';

  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand & Info */}
          <div className="lg:col-span-2">
            <div
              onClick={() => navigateTo('/')}
              className="flex cursor-pointer items-center gap-2.5 transition-transform hover:opacity-90"
            >
              <img
                src={logoUrl}
                alt="All Calculator Logo"
                className="h-10 w-10 rounded-xl object-contain shadow-sm border border-slate-200 dark:border-slate-700 bg-white"
              />
              <span className="text-xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                {language === 'bn' ? 'অল ক্যালকুলেটর' : 'All Calculator'}
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              {t.footerDesc}
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.freeServiceNotice}
            </div>

            {/* Developer Contact Card */}
            <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                {t.developedBy}
              </div>
              <div className="mt-1 font-bold text-slate-800 dark:text-slate-200 text-sm">
                MRS Engineers BD
              </div>
              <a
                href="mailto:mrs.engineers.bd26@gmail.com"
                className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                mrs.engineers.bd26@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {t.quickLinks}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/categories')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t.navCategories}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/popular')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t.navPopular}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/favorites')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t.navFavorites}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/how-to-use')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1"
                >
                  <HelpCircle className="h-3 w-3" />
                  {t.navHowToUse}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {t.secCategories}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo(`/categories/${cat.id}`)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-1 text-left"
                  >
                    {cat.name[language]}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('/categories')}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Layers className="h-3 w-3" />
                  {t.viewAll} ({CATEGORIES.length})
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {t.legal}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/privacy-policy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <Shield className="h-3.5 w-3.5 text-blue-500" />
                  {t.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/terms')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5 text-indigo-500" />
                  {t.termsOfService}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-500" />
                  {t.navContact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/disclaimer')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  {t.disclaimer}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Modern Footer Navigation Row */}
        <div className="mt-12 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              <button
                onClick={() => navigateTo('/about')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition py-0.5"
              >
                {t.navAbout}
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <button
                onClick={() => navigateTo('/privacy-policy')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition py-0.5"
              >
                {t.privacyPolicy}
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <button
                onClick={() => navigateTo('/terms')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition py-0.5"
              >
                {t.termsOfService}
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <button
                onClick={() => navigateTo('/contact')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition py-0.5"
              >
                {t.navContact}
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <button
                onClick={() => navigateTo('/disclaimer')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition py-0.5"
              >
                {t.disclaimer}
              </button>
            </nav>

            <p className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
              Developed by MRS Engineers BD
            </p>
          </div>
        </div>

        {/* Bottom copyright banner */}
        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800/40 text-center sm:text-left text-xs text-slate-400 dark:text-slate-500">
          <p>© {currentYear} All Calculator. {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
