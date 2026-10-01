import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculators';
import { CalculatorCard } from '../components/CalculatorCard';
import { CategoryCard } from '../components/CategoryCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdBanner } from '../components/AdBanner';
import { Search, Layers, ArrowLeft } from 'lucide-react';
import { getCategoryIcon } from '../utils/iconResolver';

interface CategoriesPageProps {
  categoryId?: string;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ categoryId }) => {
  const { language, navigateTo, t } = useApp();
  const [catSearch, setCatSearch] = useState('');

  const selectedCategory = categoryId
    ? CATEGORIES.find((c) => c.id === categoryId)
    : null;

  // Filter calculators if in specific category
  const categoryCalculators = selectedCategory
    ? CALCULATORS.filter((c) => c.categoryId === selectedCategory.id)
    : [];

  const filteredCalculators = categoryCalculators.filter((c) => {
    if (!catSearch.trim()) return true;
    const q = catSearch.toLowerCase();
    return (
      c.name.en.toLowerCase().includes(q) ||
      c.name.bn.toLowerCase().includes(q) ||
      c.description.en.toLowerCase().includes(q) ||
      c.description.bn.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const IconComponent = selectedCategory
    ? getCategoryIcon(selectedCategory.icon)
    : Layers;

  // If viewing a single category
  if (selectedCategory) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t.navCategories, route: '/categories' },
            { label: selectedCategory.name[language] },
          ]}
        />

        {/* Category Header */}
        <div className="mb-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <IconComponent className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
                  {selectedCategory.name[language]}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {selectedCategory.description[language]}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/categories')}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.backToCategory}</span>
            </button>
          </div>

          {/* Search within this category */}
          <div className="mt-6 max-w-md">
            <div className="relative flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={catSearch}
                onChange={(e) => setCatSearch(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'এই ক্যাটাগরিতে ক্যালকুলেটর খুঁজুন...'
                    : 'Search in this category...'
                }
                className="w-full bg-transparent px-2 text-xs text-slate-900 outline-none dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Calculators in Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCalculators.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} showCategory={false} />
          ))}
        </div>

        {filteredCalculators.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            {t.noResults}
          </div>
        )}

        <AdBanner type="banner" className="mt-12" />
      </div>
    );
  }

  // If viewing all categories
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.navCategories }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">
          {t.secCategories}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t.secCategoriesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <AdBanner type="banner" className="mt-12" />
    </div>
  );
};
