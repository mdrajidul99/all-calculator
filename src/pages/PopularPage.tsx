import React from 'react';
import { useApp } from '../context/AppContext';
import { CALCULATORS } from '../data/calculators';
import { CalculatorCard } from '../components/CalculatorCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdBanner } from '../components/AdBanner';
import { Sparkles, Star } from 'lucide-react';

export const PopularPage: React.FC = () => {
  const { language, t } = useApp();
  const popularCalculators = CALCULATORS.filter((c) => c.isPopular);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.navPopular }]} />

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-amber-500" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {t.secPopular}
          </h1>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t.secPopularSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {popularCalculators.map((calc) => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>

      <AdBanner type="banner" className="mt-12" />
    </div>
  );
};

export const FavoritesPage: React.FC = () => {
  const { language, favorites, navigateTo, t } = useApp();

  const favoriteCalculators = favorites
    .map((id) => CALCULATORS.find((c) => c.id === id))
    .filter(Boolean) as typeof CALCULATORS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.navFavorites }]} />

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-500 fill-amber-400" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {t.secFavorites}
          </h1>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {favoriteCalculators.length}{' '}
          {language === 'bn' ? 'টি সংরক্ষিত ক্যালকুলেটর' : 'saved calculators in this browser'}
        </p>
      </div>

      {favoriteCalculators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteCalculators.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <Star className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            {language === 'bn' ? 'কোনো প্রিয় ক্যালকুলেটর যুক্ত নেই' : 'No favorites yet'}
          </h3>
          <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
            {t.secNoFavorites}
          </p>
          <button
            onClick={() => navigateTo('/popular')}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {language === 'bn' ? 'জনপ্রিয় ক্যালকুলেটর দেখুন' : 'Explore Popular Calculators'}
          </button>
        </div>
      )}

      <AdBanner type="banner" className="mt-12" />
    </div>
  );
};
