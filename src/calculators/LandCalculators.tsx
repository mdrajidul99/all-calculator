import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { MapPin, Copy, Check, Users, ShieldAlert } from 'lucide-react';

// Standard Bangladesh Conversions
// 1 Shotok / Decimal = 435.6 sq ft
// 1 Standard Katha = 720 sq ft (1.6528 decimal)
// 1 Standard Bigha = 20 Katha = 14,400 sq ft (33.0578 decimal)
// 1 Acre = 100 Decimal = 43,560 sq ft
// 1 Hectare = 2.47105 Acre = 107,639 sq ft
// 1 Kani (Standard / Dhaka / Comilla) = 24 Katha = 17,280 sq ft = 39.67 Decimal
// 1 Gonda = 864 sq ft

// 1. Land Area & Measurement Calculator
export const LandAreaCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'land-area-calculator')!;

  const [length1, setLength1] = useState('80');
  const [length2, setLength2] = useState('80');
  const [width1, setWidth1] = useState('50');
  const [width2, setWidth2] = useState('50');
  const [copied, setCopied] = useState(false);

  const [results, setResults] = useState<{
    sqft: number;
    sqm: number;
    decimal: number;
    katha: number;
    bigha: number;
    acre: number;
    kani: number;
    gonda: number;
  }>({
    sqft: 4000,
    sqm: 371.61,
    decimal: 9.18,
    katha: 5.56,
    bigha: 0.28,
    acre: 0.092,
    kani: 0.23,
    gonda: 4.63,
  });

  const handleCalculate = () => {
    const l1 = parseFloat(length1);
    const l2 = parseFloat(length2);
    const w1 = parseFloat(width1);
    const w2 = parseFloat(width2);

    if (isNaN(l1) || isNaN(w1) || l1 <= 0 || w1 <= 0) return;

    // Average length & width method
    const avgLength = (l1 + (isNaN(l2) ? l1 : l2)) / 2;
    const avgWidth = (w1 + (isNaN(w2) ? w1 : w2)) / 2;
    const sqft = avgLength * avgWidth;

    const sqm = sqft * 0.092903;
    const decimal = sqft / 435.6;
    const katha = sqft / 720;
    const bigha = sqft / 14400;
    const acre = sqft / 43560;
    const kani = sqft / 17280;
    const gonda = sqft / 864;

    setResults({
      sqft: parseFloat(sqft.toFixed(2)),
      sqm: parseFloat(sqm.toFixed(2)),
      decimal: parseFloat(decimal.toFixed(3)),
      katha: parseFloat(katha.toFixed(3)),
      bigha: parseFloat(bigha.toFixed(3)),
      acre: parseFloat(acre.toFixed(4)),
      kani: parseFloat(kani.toFixed(3)),
      gonda: parseFloat(gonda.toFixed(2)),
    });
  };

  const handleCopy = () => {
    const text = `${results.decimal} ${language === 'bn' ? 'শতাংশ / শতক' : 'Decimal'} (${results.katha} ${
      language === 'bn' ? 'কাঠা' : 'Katha'
    }, ${results.sqft} ${language === 'bn' ? 'বর্গফুট' : 'Sq Ft'})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Bangladesh Land Area Formulas', bn: 'বাংলাদেশ ভূমি পরিমাপের সূত্র' },
        expression: 'ক্ষেত্রফল (বর্গফুট) = গড় দৈর্ঘ্য (ফুট) × গড় প্রস্থ (ফুট)   |   ১ শতাংশ = ৪৩৫.৬ বর্গফুট   |   ১ কাঠা = ৭২০ বর্গফুট',
        explanation: {
          en: 'Calculates land surface in square feet and converts to national standard units: 1 Decimal/Shotok = 435.6 sq ft; 1 Katha = 720 sq ft (1.65 Decimal); 1 Bigha = 20 Katha (14,400 sq ft); 1 Acre = 100 Decimal (43,560 sq ft).',
          bn: 'দৈর্ঘ্য ও প্রস্থের ফুটের মাপ দিয়ে মোট বর্গফুট বের করে সরকারি স্ট্যান্ডার্ড এককে রূপান্তর করা হয়: ১ শতক = ৪৩৫.৬ বর্গফুট, ১ কাঠা = ৭২০ বর্গফুট, ১ বিঘা = ১৪,৪০০ বর্গফুট (২০ কাঠা), ১ একর = ১০০ শতক।',
        },
      }}
      howToUseSteps={{
        en: [
          'Measure the length of both opposite boundaries in feet (North & South).',
          'Measure the width of both opposite boundaries in feet (East & West).',
          'Enter the values and click Calculate to view results in Decimal, Katha, Bigha, and Acre.',
        ],
        bn: [
          'জমির উত্তর ও দক্ষিণ পাশের দৈর্ঘ্য ফুটে পরিমাপ করুন।',
          'জমির পূর্ব ও পশ্চিম পাশের প্রস্থ ফুটে পরিমাপ করুন।',
          'মানগুলো লিখে "হিসাব করুন" বোতামে চাপ দিন। তাৎক্ষণিকভাবে শতক, কাঠা, বিঘা ও একরের নিখুঁত ফলাফল পাবেন।',
        ],
      }}
      notes={{
        en: 'Regional Measurement Note: Standard government surveys utilize 1 Katha = 720 sq ft and 1 Bigha = 14,400 sq ft (33.06 Decimal). However, in certain districts (such as parts of Sylhet, Rajshahi, or Chittagong with Shahi Kani), local deed measurements may vary. Always verify with official land registrar documents for property registration.',
        bn: 'অঞ্চলভিত্তিক ভিন্নতা দ্রষ্টব্য: বাংলাদেশ সরকারি জরিপে ১ কাঠা = ৭২০ বর্গফুট এবং ১ বিঘা = ২০ কাঠা বা ৩৩.০৬ শতাংশ আদর্শ মান। তবে সিলেট, নোয়াখালী বা চট্টগ্রামে শাহী কানি/স্থানীয় প্রথায় কাঠা ও কানির মাপে আঞ্চলিক ভিন্নতা থাকতে পারে। দলিল বা রেজিস্ট্রেশনের জন্য স্থানীয় ভূমি রেকর্ড যাচাই করুন।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '১ম দৈর্ঘ্য (ফুট)' : 'Length 1 (Feet)'}
            </label>
            <input
              type="number"
              value={length1}
              onChange={(e) => setLength1(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '২য় বিপরীত দৈর্ঘ্য (ফুট)' : 'Length 2 (Opposite Feet)'}
            </label>
            <input
              type="number"
              value={length2}
              onChange={(e) => setLength2(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '১ম প্রস্থ (ফুট)' : 'Width 1 (Feet)'}
            </label>
            <input
              type="number"
              value={width1}
              onChange={(e) => setWidth1(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '২য় বিপরীত প্রস্থ (ফুট)' : 'Width 2 (Opposite Feet)'}
            </label>
            <input
              type="number"
              value={width2}
              onChange={(e) => setWidth2(e.target.value)}
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

        {/* Results */}
        {results && (
          <div className="mt-6 rounded-2xl bg-emerald-50/70 p-6 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-200/80 pb-4 dark:border-emerald-900/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  {language === 'bn' ? 'মোট জমির পরিমাণ (শতক / ডেসিমেল)' : 'Total Land in Decimal / Shotok'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-300">
                  {results.decimal}{' '}
                  <span className="text-xl font-bold">{language === 'bn' ? 'শতক' : 'Decimal'}</span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-700 dark:bg-slate-800 dark:text-emerald-300 transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? t.copied : t.copyResult}</span>
              </button>
            </div>

            {/* Grid of other Land Units */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'কাঠা (Katha)' : 'Katha'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.katha}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'বিঘা (Bigha)' : 'Bigha'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.bigha}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'একর (Acre)' : 'Acre'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.acre}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'বর্গফুট (Sq Ft)' : 'Square Feet'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.sqft.toLocaleString()}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'বর্গমিটার (Sq Meter)' : 'Square Meter'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.sqm.toLocaleString()}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'কানি (Kani)' : 'Kani'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.kani}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {language === 'bn' ? 'গণ্ডা (Gonda)' : 'Gonda'}
                </span>
                <div className="mt-0.5 text-lg font-black text-slate-800 dark:text-slate-100">
                  {results.gonda}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. Bangladesh Land Unit Converter
export const BangladeshLandUnitsConverter: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'bangladesh-land-units')!;

  const [inputVal, setInputVal] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState('shotok');

  const parsed = parseFloat(inputVal) || 0;

  // Conversion reference in Sq Ft
  const UNIT_SQFT: Record<string, number> = {
    shotok: 435.6,
    katha: 720,
    bigha: 14400,
    acre: 43560,
    hectare: 107639,
    kani: 17280,
    gonda: 864,
    sqft: 1,
  };

  const totalSqft = parsed * (UNIT_SQFT[selectedUnit] || 435.6);

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Bangladesh Land Conversions', bn: 'বাংলাদেশ ভূমি রূপান্তর চার্ট' },
        expression: '১ শতক = ৪৩৫.৬ বর্গফুট = ০.৬০৫ কাঠা   |   ১ কাঠা = ৭২০ বর্গফুট = ১.৬৫ শতক   |   ১ বিঘা = ২০ কাঠা = ৩৩.০৬ শতক',
        explanation: {
          en: 'Instant multi-unit conversion mapping between Bangladeshi customary land units and modern metric/imperial measurements.',
          bn: 'শতক, কাঠা, বিঘা, একর ও কানির মধ্যে তাত্ক্ষণিক রূপান্তর।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'জমির পরিমাণ' : 'Land Quantity'}
            </label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'একক নির্বাচন করুন' : 'Select Source Unit'}
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="shotok">{language === 'bn' ? 'শতক / ডেসিমেল (Shotok)' : 'Decimal / Shotok'}</option>
              <option value="katha">{language === 'bn' ? 'কাঠা (Katha)' : 'Katha'}</option>
              <option value="bigha">{language === 'bn' ? 'বিঘা (Bigha)' : 'Bigha'}</option>
              <option value="acre">{language === 'bn' ? 'একর (Acre)' : 'Acre'}</option>
              <option value="kani">{language === 'bn' ? 'কানি (Kani - 24 Katha)' : 'Kani'}</option>
              <option value="gonda">{language === 'bn' ? 'গণ্ডা (Gonda)' : 'Gonda'}</option>
              <option value="hectare">{language === 'bn' ? 'হেক্টর (Hectare)' : 'Hectare'}</option>
              <option value="sqft">{language === 'bn' ? 'বর্গফুট (Sq Ft)' : 'Square Feet'}</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-blue-50/70 p-3.5 text-center dark:bg-blue-950/40">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'শতক / ডেসিমেল' : 'Decimal'}
            </span>
            <div className="mt-1 text-xl font-black text-blue-600 dark:text-blue-400">
              {(totalSqft / 435.6).toFixed(3)}
            </div>
          </div>
          <div className="rounded-xl bg-emerald-50/70 p-3.5 text-center dark:bg-emerald-950/40">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'কাঠা (Katha)' : 'Katha'}
            </span>
            <div className="mt-1 text-xl font-black text-emerald-600 dark:text-emerald-400">
              {(totalSqft / 720).toFixed(3)}
            </div>
          </div>
          <div className="rounded-xl bg-amber-50/70 p-3.5 text-center dark:bg-amber-950/40">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'বিঘা (Bigha)' : 'Bigha'}
            </span>
            <div className="mt-1 text-xl font-black text-amber-600 dark:text-amber-400">
              {(totalSqft / 14400).toFixed(3)}
            </div>
          </div>
          <div className="rounded-xl bg-indigo-50/70 p-3.5 text-center dark:bg-indigo-950/40">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'একর (Acre)' : 'Acre'}
            </span>
            <div className="mt-1 text-xl font-black text-indigo-600 dark:text-indigo-400">
              {(totalSqft / 43560).toFixed(4)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-100 p-3.5 text-center dark:bg-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'বর্গফুট (Sq Ft)' : 'Square Feet'}
            </span>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
              {totalSqft.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            </div>
          </div>
          <div className="rounded-xl bg-slate-100 p-3.5 text-center dark:bg-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'বর্গমিটার (m²)' : 'Square Meter'}
            </span>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
              {(totalSqft * 0.092903).toLocaleString(undefined, { maximumFractionDigits: 1 })}
            </div>
          </div>
          <div className="rounded-xl bg-slate-100 p-3.5 text-center dark:bg-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'কানি (Kani)' : 'Kani'}
            </span>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
              {(totalSqft / 17280).toFixed(3)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-100 p-3.5 text-center dark:bg-slate-800">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              {language === 'bn' ? 'গণ্ডা (Gonda)' : 'Gonda'}
            </span>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
              {(totalSqft / 864).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

// 3. Triangle Land Area (Heron's Formula)
export const TriangleLandArea: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'triangle-land-area')!;

  const [sideA, setSideA] = useState('60');
  const [sideB, setSideB] = useState('80');
  const [sideC, setSideC] = useState('100');

  const [result, setResult] = useState<{
    sqft: number;
    decimal: number;
    katha: number;
  }>({
    sqft: 2400,
    decimal: 5.51,
    katha: 3.33,
  });

  const handleCalculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) return;
    if (a + b <= c || a + c <= b || b + c <= a) return; // Triangle inequality theorem

    const s = (a + b + c) / 2;
    const areaSqft = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    setResult({
      sqft: parseFloat(areaSqft.toFixed(2)),
      decimal: parseFloat((areaSqft / 435.6).toFixed(3)),
      katha: parseFloat((areaSqft / 720).toFixed(3)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: "Heron's Formula for Triangular Land", bn: 'হেরন সূত্র (ত্রিভুজাকার জমির ক্ষেত্রফল)' },
        expression: 's = (a + b + c) / 2   |   ক্ষেত্রফল = √[s(s - a)(s - b)(s - c)]',
        explanation: {
          en: 'Calculates mathematically exact area for triangular plots with three boundary lengths without needing right angles.',
          bn: 'তিন বাহুর পরিমাপ দিয়ে অসমান তিন কোণা জমির নিখুঁত ক্ষেত্রফল বের করার বৈজ্ঞানিক সূত্র।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '১ম বাহু / সীমানা (ফুট)' : 'Side A (Feet)'}
            </label>
            <input
              type="number"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '২য় বাহু / সীমানা (ফুট)' : 'Side B (Feet)'}
            </label>
            <input
              type="number"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? '৩য় বাহু / সীমানা (ফুট)' : 'Side C (Feet)'}
            </label>
            <input
              type="number"
              value={sideC}
              onChange={(e) => setSideC(e.target.value)}
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
          <div className="mt-6 rounded-2xl bg-emerald-50/70 p-5 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              {language === 'bn' ? 'ত্রিভুজ জমির ক্ষেত্রফল' : 'Triangular Plot Area'}
            </span>
            <div className="mt-1 text-3xl font-black text-emerald-700 dark:text-emerald-300">
              {result.decimal} <span className="text-xl font-bold">{language === 'bn' ? 'শতক' : 'Decimal'}</span>
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              = <span className="font-bold">{result.katha}</span> {language === 'bn' ? 'কাঠা' : 'Katha'} (
              {result.sqft.toLocaleString()} {language === 'bn' ? 'বর্গফুট' : 'Sq Ft'})
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
