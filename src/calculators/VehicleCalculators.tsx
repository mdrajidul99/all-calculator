import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Fuel, Navigation, Users } from 'lucide-react';

export const FuelCostCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'fuel-cost-calculator')!;

  const [distance, setDistance] = useState('250');
  const [mileage, setMileage] = useState('14'); // km per liter
  const [pricePerLiter, setPricePerLiter] = useState('130'); // Taka per liter
  const [passengers, setPassengers] = useState('1');

  const [result, setResult] = useState<{
    totalFuel: number;
    totalCost: number;
    costPerKm: number;
    costPerPerson: number;
  }>({
    totalFuel: 17.86,
    totalCost: 2321.43,
    costPerKm: 9.29,
    costPerPerson: 2321.43,
  });

  const handleCalculate = () => {
    const d = parseFloat(distance);
    const m = parseFloat(mileage);
    const p = parseFloat(pricePerLiter);
    const pass = parseInt(passengers, 10) || 1;

    if (isNaN(d) || isNaN(m) || isNaN(p) || d <= 0 || m <= 0 || p <= 0) return;

    const totalFuel = d / m;
    const totalCost = totalFuel * p;
    const costPerKm = totalCost / d;
    const costPerPerson = totalCost / pass;

    setResult({
      totalFuel: parseFloat(totalFuel.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      costPerKm: parseFloat(costPerKm.toFixed(2)),
      costPerPerson: parseFloat(costPerPerson.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Fuel & Trip Cost Formula', bn: 'জ্বালানি ও ভ্রমণ ব্যয় সূত্র' },
        expression: 'Fuel Needed (L) = Distance / Mileage   |   Total Cost = Fuel Needed × Price/Liter',
        explanation: {
          en: 'Calculates the total fuel consumption and monetary cost for any commute or highway journey.',
          bn: 'মোট দূরত্বকে গাড়ির মাইলেজ দিয়ে ভাগ করে প্রয়োজনীয় তেলের লিটার এবং জ্বালানি দর দিয়ে মোট খরচ নির্ধারণ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ভ্রমণের দূরত্ব (কিমি)' : 'Distance (km)'}
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'গাড়ির মাইলেজ (কিমি/লিটার)' : 'Mileage (km / L)'}
            </label>
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'জ্বালানির মূল্য (প্রতি লিটার)' : 'Fuel Price / Liter'}
            </label>
            <input
              type="number"
              value={pricePerLiter}
              onChange={(e) => setPricePerLiter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'যাত্রী সংখ্যা (Optional)' : 'Passengers'}
            </label>
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
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
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-100 pb-4 dark:border-blue-900/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {language === 'bn' ? 'মোট আনুমানিক জ্বালানি খরচ' : 'Total Fuel Cost'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {result.totalCost.toLocaleString()}{' '}
                  <span className="text-xl font-bold">{language === 'bn' ? 'টাকা' : 'Tk / $'}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase font-semibold">
                  {language === 'bn' ? 'প্রয়োজনীয় জ্বালানি' : 'Fuel Needed'}
                </span>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {result.totalFuel} {language === 'bn' ? 'লিটার' : 'Liters'}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'প্রতি কিলোমিটারে খরচ' : 'Cost per km'}
                </span>
                <div className="mt-0.5 text-lg font-bold text-slate-800 dark:text-slate-100">
                  {result.costPerKm} / km
                </div>
              </div>
              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'জনপ্রতি খরচ' : 'Cost per Passenger'}
                </span>
                <div className="mt-0.5 text-lg font-bold text-slate-800 dark:text-slate-100">
                  {result.costPerPerson}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
