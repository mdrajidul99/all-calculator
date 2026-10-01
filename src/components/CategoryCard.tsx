import React from 'react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';
import { CALCULATORS } from '../data/calculators';
import { ChevronRight } from 'lucide-react';
import { getCategoryIcon } from '../utils/iconResolver';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { language, navigateTo } = useApp();
  
  const IconComponent = getCategoryIcon(category.icon);
  const count = CALCULATORS.filter((c) => c.categoryId === category.id).length;

  return (
    <div
      onClick={() => navigateTo(`/categories/${category.id}`)}
      className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {count} {language === 'bn' ? 'টি' : 'tools'}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 transition-colors">
          {category.name[language]}
        </h3>

        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description[language]}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
        <span>{language === 'bn' ? 'ক্যালকুলেটরসমূহ দেখুন' : 'Explore Category'}</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
};
