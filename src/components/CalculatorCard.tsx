import React from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorMeta } from '../types';
import { CATEGORIES } from '../data/categories';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { getCategoryIcon } from '../utils/iconResolver';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  showCategory?: boolean;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, showCategory = true }) => {
  const { language, navigateTo, toggleFavorite, isFavorite, addRecentlyUsed, t } = useApp();
  const category = CATEGORIES.find((c) => c.id === calculator.categoryId);

  const IconComponent = category ? getCategoryIcon(category.icon) : getCategoryIcon('Calculator');


  const favorite = isFavorite(calculator.id);

  const handleOpen = () => {
    addRecentlyUsed(calculator.id);
    navigateTo(`/calculators/${calculator.id}`);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500">
      <div>
        {/* Header row: category tag, popular badge & favorite button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <IconComponent className="h-5 w-5" />
            </div>
            {calculator.isPopular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60">
                <Sparkles className="h-2.5 w-2.5" />
                {t.popularBadge}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(calculator.id);
            }}
            title={favorite ? t.removeFromFavorites : t.addToFavorites}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-amber-500 dark:hover:bg-slate-800 transition"
          >
            <Star
              className={`h-4 w-4 ${favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
            />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={handleOpen}
          className="cursor-pointer text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 transition-colors"
        >
          {calculator.name[language]}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 dark:text-slate-400 leading-relaxed">
          {calculator.description[language]}
        </p>

        {showCategory && category && (
          <div className="mt-3">
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigateTo(`/categories/${category.id}`);
              }}
              className="cursor-pointer inline-block text-[11px] font-medium text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
            >
              • {category.name[language]}
            </span>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleOpen}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 px-3 text-xs font-semibold text-slate-700 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all"
        >
          <span>{t.openCalculator}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
