import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  route?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo, t } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-slate-500 dark:text-slate-400 overflow-x-auto no-scrollbar py-1">
      <button
        onClick={() => navigateTo('/')}
        className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <Home className="h-3.5 w-3.5" />
        <span>{t.navHome}</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="mx-2 h-3 w-3 shrink-0 text-slate-400" />
            {isLast || !item.route ? (
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => item.route && navigateTo(item.route)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
