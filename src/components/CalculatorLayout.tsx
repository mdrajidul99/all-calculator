import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorMeta } from '../types';
import { CATEGORIES } from '../data/categories';
import { Breadcrumbs } from './Breadcrumbs';
import { Star, Share2, Check, Info, BookOpen, AlertCircle, Copy } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface CalculatorLayoutProps {
  calculator: CalculatorMeta;
  children: React.ReactNode;
  formula?: {
    title: { en: string; bn: string };
    expression: string;
    explanation: { en: string; bn: string };
  };
  howToUseSteps?: { en: string[]; bn: string[] };
  notes?: { en: string; bn: string };
  disclaimer?: { en: string; bn: string };
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  calculator,
  children,
  formula,
  howToUseSteps,
  notes,
  disclaimer,
}) => {
  const { language, isFavorite, toggleFavorite, t } = useApp();
  const [copiedShare, setCopiedShare] = useState(false);

  const category = CATEGORIES.find((c) => c.id === calculator.categoryId);
  const favorite = isFavorite(calculator.id);

  const handleShare = async () => {
    const url = window.location.href;
    const title = calculator.name[language];
    const text = calculator.description[language];

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb navigation */}
      <Breadcrumbs
        items={[
          ...(category
            ? [
                {
                  label: category.name[language],
                  route: `/categories/${category.id}`,
                },
              ]
            : []),
          {
            label: calculator.name[language],
          },
        ]}
      />

      {/* Calculator Header Card */}
      <div className="mb-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {category && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {category.name[language]}
              </span>
            )}
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {calculator.name[language]}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {calculator.description[language]}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => toggleFavorite(calculator.id)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                favorite
                  ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Star className={`h-4 w-4 ${favorite ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">
                {favorite ? t.removeFromFavorites : t.addToFavorites}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              title="Share or Copy Link"
            >
              {copiedShare ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">{t.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.share}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Calculator Form & Results */}
      <div className="mb-8">{children}</div>

      {/* Non-intrusive Ad Banner */}
      <AdBanner type="banner" className="my-6" />

      {/* Supplementary Guides: Formula, How to Use, Notes & Disclaimers */}
      <div className="space-y-6">
        {/* Formula Section */}
        {formula && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-4 w-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                {t.formulaHeading}: {formula.title[language]}
              </h2>
            </div>
            <div className="rounded-xl bg-slate-50 p-3.5 font-mono text-sm font-semibold text-blue-700 dark:bg-slate-950 dark:text-blue-300 border border-slate-200 dark:border-slate-800 overflow-x-auto">
              {formula.expression}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {formula.explanation[language]}
            </p>
          </div>
        )}

        {/* How to use */}
        {howToUseSteps && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
              <Info className="h-4 w-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                {t.howToUseHeading}
              </h2>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {howToUseSteps[language].map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Important Notes & Regional Variance */}
        {notes && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/30 transition-colors">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  {t.notesHeading}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                  {notes[language]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        {disclaimer && (
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-4 text-[11px] leading-relaxed text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {t.disclaimerHeading}:{' '}
            </span>
            {disclaimer[language]}
          </div>
        )}
      </div>
    </div>
  );
};
