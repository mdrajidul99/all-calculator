import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { TrendingUp, DollarSign } from 'lucide-react';

export const ProfitMarginMarkupCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'profit-margin-markup')!;

  const [cost, setCost] = useState('100');
  const [revenue, setRevenue] = useState('140');

  const [result, setResult] = useState<{
    profit: number;
    margin: number;
    markup: number;
  }>({
    profit: 40,
    margin: 28.57,
    markup: 40.0,
  });

  const handleCalculate = () => {
    const c = parseFloat(cost);
    const r = parseFloat(revenue);

    if (isNaN(c) || isNaN(r) || c <= 0 || r <= 0) return;

    const profit = r - c;
    const margin = (profit / r) * 100;
    const markup = (profit / c) * 100;

    setResult({
      profit: parseFloat(profit.toFixed(2)),
      margin: parseFloat(margin.toFixed(2)),
      markup: parseFloat(markup.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Margin vs Markup Formulas', bn: 'প্রফিট মার্জিন বনাম মার্কআপ সূত্র' },
        expression: 'Gross Margin = (Profit / Revenue) × 100   |   Markup = (Profit / Cost) × 100',
        explanation: {
          en: 'Gross Margin is the percentage of revenue that is profit. Markup is the percentage added to the cost price.',
          bn: 'মার্জিন হলো মোট বিক্রির কত শতাংশ মুনাফা। মার্কআপ হলো ক্রয়মূল্যের উপর কত শতাংশ অতিরিক্ত দাম নির্ধারণ করা হয়েছে।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ক্রয়মূল্য / খরচ (Cost)' : 'Cost of Goods (Cost)'}
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'বিক্রয়মূল্য (Selling Price)' : 'Selling Price (Revenue)'}
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {result && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-emerald-50/70 p-4 text-center dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                {language === 'bn' ? 'গ্রস প্রফিট মার্জিন' : 'Profit Margin'}
              </span>
              <div className="mt-1 text-3xl font-black text-emerald-700 dark:text-emerald-400">
                {result.margin}%
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50/70 p-4 text-center dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                {language === 'bn' ? 'মার্কআপ' : 'Markup Percentage'}
              </span>
              <div className="mt-1 text-3xl font-black text-blue-700 dark:text-blue-400">
                {result.markup}%
              </div>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 text-center dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'মোট লাভ' : 'Gross Profit'}
              </span>
              <div className="mt-1 text-3xl font-black text-slate-800 dark:text-slate-200">
                {result.profit.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
