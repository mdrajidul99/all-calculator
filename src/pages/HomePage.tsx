import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculators';
import { CalculatorCard } from '../components/CalculatorCard';
import { CategoryCard } from '../components/CategoryCard';
import { AdBanner } from '../components/AdBanner';
import {
  Search,
  Sparkles,
  Layers,
  History,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe2,
  ArrowRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, navigateTo, recentlyUsed, searchQuery, setSearchQuery, t } = useApp();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const logoUrl = 'https://pxdrop.online/raw/dauv31q81qec73f6ofi0';

  // Popular calculators
  const popularCalculators = CALCULATORS.filter((c) => c.isPopular);

  // Recently used calculators
  const recentCalcs = recentlyUsed
    .map((id) => CALCULATORS.find((c) => c.id === id))
    .filter(Boolean) as typeof CALCULATORS;

  // Search filter
  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching
    ? CALCULATORS.filter((c) => {
        const q = searchQuery.toLowerCase();
        return (
          c.name.en.toLowerCase().includes(q) ||
          c.name.bn.toLowerCase().includes(q) ||
          c.description.en.toLowerCase().includes(q) ||
          c.description.bn.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-linear-to-b from-blue-50/50 via-white to-white px-4 pt-12 pb-14 text-center dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 sm:px-6 lg:px-8 transition-colors">
        <div className="mx-auto max-w-4xl">
          {/* Main Logo & Badge */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-2 shadow-md border border-slate-200 dark:border-slate-700 dark:bg-slate-900">
              <img
                src={logoUrl}
                alt="All Calculator Official Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{language === 'bn' ? '১০০% ফ্রি অনলাইন ক্যালকুলেটর প্ল্যাটফর্ম' : '100% Free Online Calculator Hub'}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {t.tagline}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.heroDescription}
          </p>

          {/* Prominent Search Box */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative flex items-center rounded-2xl border-2 border-blue-500/30 bg-white p-2 shadow-lg transition-all focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:ring-blue-950">
              <Search className="ml-3 h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-2 rounded-lg px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular quick searches */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-400">
                {language === 'bn' ? 'উদাহরণ:' : 'Quick search:'}
              </span>
              {['Age', 'EMI', 'Land', 'USDT', 'BMI', 'Percentage', 'Fuel', 'Concrete'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/40"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Search Results Display (if active) */}
        {isSearching && (
          <section className="rounded-3xl border border-blue-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {language === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'} ({searchResults.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn'
                    ? `"${searchQuery}" এর জন্য পাওয়া ফলাফল`
                    : `Showing calculators matching "${searchQuery}"`}
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {language === 'bn' ? 'অনুসন্ধান বন্ধ করুন' : 'Clear Search'}
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                <p className="text-base font-semibold">{t.noResults}</p>
                <p className="text-xs mt-1 text-slate-400">{t.tryDifferentSearch}</p>
              </div>
            )}
          </section>
        )}

        {/* Recently Used Section (Only shown if user has used calculators) */}
        {!isSearching && recentCalcs.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {t.secRecentlyUsed}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentCalcs.slice(0, 4).map((calc) => (
                <CalculatorCard key={calc.id} calculator={calc} />
              ))}
            </div>
          </section>
        )}

        {/* Popular Calculators Section */}
        {!isSearching && (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                    {t.secPopular}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.secPopularSubtitle}
                </p>
              </div>

              <button
                onClick={() => navigateTo('/popular')}
                className="mt-2 sm:mt-0 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <span>{t.viewAll}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularCalculators.slice(0, 9).map((calc) => (
                <CalculatorCard key={calc.id} calculator={calc} />
              ))}
            </div>
          </section>
        )}

        {/* Advertisement 1: Responsive Banner Ad */}
        <AdBanner type="banner" />

        {/* Categories Section */}
        {!isSearching && (
          <section id="categories">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                    {t.secCategories}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.secCategoriesSubtitle}
                </p>
              </div>

              <span className="mt-2 sm:mt-0 text-xs font-semibold text-slate-400">
                18 {language === 'bn' ? 'টি ক্যাটাগরি' : 'Categories'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Feature Highlights Grid */}
        <section className="rounded-3xl border border-slate-200/90 bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 p-6 sm:p-8 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {language === 'bn' ? '১০০% ফ্রি' : '100% Free'}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'কোনো সাবস্ক্রিপশন বা চার্জ নেই' : 'No subscription or hidden fees'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {language === 'bn' ? 'অ্যাকাউন্ট প্রয়োজন নেই' : 'No Login Required'}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'ওয়েবসাইটে ঢুকেই সরাসরি ব্যবহার করুন' : 'Instant access without registering'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {language === 'bn' ? 'দ্বিভাষিক (EN & বাংলা)' : 'Bilingual Support'}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'ইংরেজি ও বাংলা উভয় ভাষায় সম্পূর্ণ' : 'Full English and Bangla experience'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {language === 'bn' ? 'সঠিক ও বিদ্যুৎগতি' : 'Accurate & Fast'}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'প্রমাণিত গাণিতিক সূত্রে কাজ করে' : 'Calculates instantly in your browser'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
