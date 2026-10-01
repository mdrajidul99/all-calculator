import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Zap, Paintbrush, Grid } from 'lucide-react';

export const ElectricityBillCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'electricity-bill-calc')!;

  const [units, setUnits] = useState('240');
  const [demandCharge, setDemandCharge] = useState('42');
  const [vatPercent, setVatPercent] = useState('5');
  const [customRate, setCustomRate] = useState('');
  const [useCustomRate, setUseCustomRate] = useState(false);

  const [bill, setBill] = useState<{
    energyCharge: number;
    demand: number;
    vat: number;
    totalBill: number;
  }>({
    energyCharge: 1735.65,
    demand: 42,
    vat: 88.88,
    totalBill: 1866.53,
  });

  const handleCalculate = () => {
    const u = parseFloat(units);
    const d = parseFloat(demandCharge) || 0;
    const v = parseFloat(vatPercent) || 0;

    if (isNaN(u) || u < 0) return;

    let energyCharge = 0;

    if (useCustomRate && customRate) {
      const rate = parseFloat(customRate) || 0;
      energyCharge = u * rate;
    } else {
      // Standard Bangladesh residential tiered slab tariff
      let remaining = u;

      // Slab 1: 0 - 75 units @ 4.85
      const s1 = Math.min(remaining, 75);
      energyCharge += s1 * 4.85;
      remaining -= s1;

      // Slab 2: 76 - 200 units (125 units) @ 6.63
      if (remaining > 0) {
        const s2 = Math.min(remaining, 125);
        energyCharge += s2 * 6.63;
        remaining -= s2;
      }

      // Slab 3: 201 - 300 units (100 units) @ 6.95
      if (remaining > 0) {
        const s3 = Math.min(remaining, 100);
        energyCharge += s3 * 6.95;
        remaining -= s3;
      }

      // Slab 4: 301 - 400 units (100 units) @ 7.34
      if (remaining > 0) {
        const s4 = Math.min(remaining, 100);
        energyCharge += s4 * 7.34;
        remaining -= s4;
      }

      // Slab 5: 401 - 600 units (200 units) @ 11.51
      if (remaining > 0) {
        const s5 = Math.min(remaining, 200);
        energyCharge += s5 * 11.51;
        remaining -= s5;
      }

      // Slab 6: Above 600 units @ 13.26
      if (remaining > 0) {
        energyCharge += remaining * 13.26;
      }
    }

    const subtotal = energyCharge + d;
    const vat = (subtotal * v) / 100;
    const totalBill = subtotal + vat;

    setBill({
      energyCharge: parseFloat(energyCharge.toFixed(2)),
      demand: d,
      vat: parseFloat(vat.toFixed(2)),
      totalBill: parseFloat(totalBill.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Tiered Slab Tariff Structure', bn: 'ধাপভিত্তিক বিদ্যুৎ ট্যারিফ কাঠামো' },
        expression: 'মোট বিল = ধাপভিত্তিক বিদ্যুৎ চার্জ + ডিমান্ড চার্জ + ভ্যাট (৫%)',
        explanation: {
          en: 'Calculates electric bill using progressive residential slab slabs: 1-75 kWh, 76-200 kWh, 201-300 kWh, 301-400 kWh, 401-600 kWh, and 600+ kWh.',
          bn: 'বাংলাদেশে বিদ্যুৎ উন্নয়ন বোর্ড ও ডেসকোর আবাসিক গ্রাহকদের জন্য ধাপভিত্তিক স্ল্যাব রেট অনুযায়ী বিদ্যুৎ চার্জ হিসাব করা হয়।',
        },
      }}
      notes={{
        en: 'Tariff rates correspond to current benchmark residential consumer categories in Bangladesh. Meter rent or local municipal surcharges may slightly adjust final monthly invoice.',
        bn: 'বাংলাদেশের আবাসিক গ্রাহক শ্রেণির প্রচলিত স্ল্যাব ট্যারিফ অনুসরণ করা হয়েছে। মিটার ভাড়া বা স্থানীয় ট্যাক্সের কারণে মূল বিলে সামান্য পরিবর্তন হতে পারে।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ব্যবহৃত ইউনিট (kWh)' : 'Consumed Units (kWh)'}
            </label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ডিমান্ড চার্জ (টাকা)' : 'Demand Charge'}
            </label>
            <input
              type="number"
              value={demandCharge}
              onChange={(e) => setDemandCharge(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ভ্যাট / ট্যাক্স (%)' : 'VAT / Tax (%)'}
            </label>
            <input
              type="number"
              value={vatPercent}
              onChange={(e) => setVatPercent(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={useCustomRate}
              onChange={(e) => setUseCustomRate(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>
              {language === 'bn'
                ? 'কাস্টম ফ্ল্যাট রেট ব্যবহার করুন (ঐচ্ছিক)'
                : 'Use custom flat rate per unit (Optional)'}
            </span>
          </label>
          {useCustomRate && (
            <div className="mt-2 max-w-xs">
              <input
                type="number"
                placeholder="Rate per kWh"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          )}
        </div>

        <div className="mt-5">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {bill && (
          <div className="mt-6 rounded-2xl bg-amber-50/70 p-5 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-200/80 pb-4 dark:border-amber-900/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  {language === 'bn' ? 'মোট আনুমানিক বিদ্যুৎ বিল' : 'Total Electricity Bill'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-amber-900 dark:text-amber-200">
                  {bill.totalBill.toLocaleString()}{' '}
                  <span className="text-xl font-bold">{language === 'bn' ? 'টাকা' : 'Tk / $'}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>
                  {language === 'bn' ? 'বিদ্যুৎ চার্জ:' : 'Energy Charge:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">{bill.energyCharge}</span>
                </div>
                <div>
                  {language === 'bn' ? 'ডিমান্ড চার্জ:' : 'Demand Charge:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">{bill.demand}</span>
                </div>
                <div>
                  {language === 'bn' ? 'ভ্যাট (৫%):' : 'VAT (5%):'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">{bill.vat}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
