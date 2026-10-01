import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Utensils, Scale } from 'lucide-react';

export const RecipeScalingCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'recipe-scaling')!;

  const [origServings, setOrigServings] = useState('4');
  const [desiredServings, setDesiredServings] = useState('10');
  const [ingredientQty, setIngredientQty] = useState('250');
  const [unit, setUnit] = useState('grams');

  const [scaledQty, setScaledQty] = useState<number>(625);
  const [scaleFactor, setScaleFactor] = useState<number>(2.5);

  const handleCalculate = () => {
    const o = parseFloat(origServings);
    const d = parseFloat(desiredServings);
    const q = parseFloat(ingredientQty);

    if (isNaN(o) || isNaN(d) || isNaN(q) || o <= 0 || d <= 0) return;

    const factor = d / o;
    const scaled = q * factor;

    setScaleFactor(parseFloat(factor.toFixed(2)));
    setScaledQty(parseFloat(scaled.toFixed(2)));
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Culinary Scaling Factor', bn: 'রেসিপি গুণক সূত্র' },
        expression: 'Scale Multiplier = Desired Servings / Original Servings   |   New Qty = Original Qty × Multiplier',
        explanation: {
          en: 'Linearly scales cooking and baking ingredients up or down for different party sizes.',
          bn: 'পরিবেশন সংখ্যা অনুযায়ী রান্নার উপাদানের সঠিক পরিমাণ আনুপাতিক হারে নির্ধারণ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'আসল পরিবেশন (Original Servings)' : 'Original Servings'}
            </label>
            <input
              type="number"
              value={origServings}
              onChange={(e) => setOrigServings(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'কাঙ্ক্ষিত পরিবেশন (Target Servings)' : 'Target Servings'}
            </label>
            <input
              type="number"
              value={desiredServings}
              onChange={(e) => setDesiredServings(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'উপাদানের পরিমাণ' : 'Ingredient Qty'}
            </label>
            <input
              type="number"
              value={ingredientQty}
              onChange={(e) => setIngredientQty(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'পরিমাপক একক' : 'Unit'}
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
              placeholder="e.g. grams, cups, tsp"
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

        {scaledQty && (
          <div className="mt-6 rounded-2xl bg-rose-50/70 p-5 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              {language === 'bn' ? 'সংশোধিত প্রয়োজনীয় পরিমাণ' : 'Adjusted Ingredient Quantity'}
            </span>
            <div className="mt-1 text-3xl sm:text-4xl font-black text-rose-700 dark:text-rose-300">
              {scaledQty} <span className="text-xl font-bold">{unit}</span>
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Scale Multiplier: <span className="font-bold">{scaleFactor}×</span>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
