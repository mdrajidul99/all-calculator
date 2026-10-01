import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Copy, Check, RotateCcw } from 'lucide-react';

// 1. Percentage Calculator
export const PercentageCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'percentage-calculator')!;

  // Mode 1: What is X% of Y?
  const [p1, setP1] = useState('15');
  const [total1, setTotal1] = useState('200');
  const [result1, setResult1] = useState<number | null>(30);

  // Mode 2: X is what % of Y?
  const [val2, setVal2] = useState('25');
  const [total2, setTotal2] = useState('100');
  const [result2, setResult2] = useState<number | null>(25);

  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const calcMode1 = () => {
    const p = parseFloat(p1);
    const tot = parseFloat(total1);
    if (isNaN(p) || isNaN(tot)) return;
    setResult1(parseFloat(((p / 100) * tot).toFixed(4)));
  };

  const calcMode2 = () => {
    const val = parseFloat(val2);
    const tot = parseFloat(total2);
    if (isNaN(val) || isNaN(tot) || tot === 0) return;
    setResult2(parseFloat(((val / tot) * 100).toFixed(4)));
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Percentage Formulas', bn: 'শতকরার সূত্র' },
        expression: 'P% of Y = (P / 100) × Y   |   X is of Y% = (X / Y) × 100',
        explanation: {
          en: 'A percentage is a number or ratio expressed as a fraction of 100.',
          bn: 'শতকরা হলো প্রতি ১০০ এর মধ্যে কত অংশ বা ভাগ।',
        },
      }}
      howToUseSteps={{
        en: [
          'Choose whether you want to find a percentage of a number, or what percentage one number is of another.',
          'Type the values in the input boxes.',
          'Click Calculate to see the result immediately.',
        ],
        bn: [
          'কোনো সংখ্যার শতকরা কত তা জানতে ১ম অংশে মান লিখুন।',
          'একটি সংখ্যা অন্যটির কত শতাংশ তা বের করতে ২য় অংশে মান দিন।',
          'হিসাব করুন বাটনে চাপ দিন।',
        ],
      }}
    >
      <div className="space-y-6">
        {/* Mode 1: What is X% of Y? */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">
            {language === 'bn' ? '১. সংখ্যার শতকরা মান নির্ণয়' : '1. What is X% of Y?'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'শতকরা হার (%)' : 'Percentage (%)'}
              </label>
              <input
                type="number"
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'মূল সংখ্যা' : 'Of Number'}
              </label>
              <input
                type="number"
                value={total1}
                onChange={(e) => setTotal1(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={calcMode1}
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              {t.calculate}
            </button>
            {result1 !== null && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{language === 'bn' ? 'ফলাফল:' : 'Result:'}</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{result1}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result1.toString());
                    setCopied1(true);
                    setTimeout(() => setCopied1(false), 2000);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {copied1 ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mode 2: X is what % of Y? */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">
            {language === 'bn' ? '২. একটি সংখ্যা অন্যটির কত শতাংশ?' : '2. X is what percent of Y?'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'সংখ্যা (X)' : 'Value (X)'}
              </label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'মোট সংখ্যা (Y)' : 'Total (Y)'}
              </label>
              <input
                type="number"
                value={total2}
                onChange={(e) => setTotal2(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={calcMode2}
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              {t.calculate}
            </button>
            {result2 !== null && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{language === 'bn' ? 'ফলাফল:' : 'Result:'}</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{result2}%</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${result2}%`);
                    setCopied2(true);
                    setTimeout(() => setCopied2(false), 2000);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {copied2 ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

// 2. Percentage Change (Increase/Decrease)
export const PercentageChangeCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'percentage-change')!;

  const [initialVal, setInitialVal] = useState('100');
  const [finalVal, setFinalVal] = useState('125');
  const [result, setResult] = useState<{ diff: number; percent: number; isIncrease: boolean } | null>({
    diff: 25,
    percent: 25,
    isIncrease: true,
  });

  const handleCalculate = () => {
    const v1 = parseFloat(initialVal);
    const v2 = parseFloat(finalVal);
    if (isNaN(v1) || isNaN(v2) || v1 === 0) return;

    const diff = v2 - v1;
    const percent = (diff / Math.abs(v1)) * 100;
    setResult({
      diff: parseFloat(diff.toFixed(4)),
      percent: parseFloat(Math.abs(percent).toFixed(4)),
      isIncrease: diff >= 0,
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Percentage Change Formula', bn: 'শতকরা পরিবর্তনের সূত্র' },
        expression: 'Percentage Change = ((New Value - Old Value) / |Old Value|) × 100',
        explanation: {
          en: 'Calculates the proportional increase or decrease between original and final values.',
          bn: 'পূর্ববর্তী মান এবং পরবর্তী মানের পার্থক্যকে পূর্ববর্তী মান দিয়ে ভাগ করে ১০০ দিয়ে গুণ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {language === 'bn' ? 'আগের মান (Initial Value)' : 'Initial Value'}
            </label>
            <input
              type="number"
              value={initialVal}
              onChange={(e) => setInitialVal(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {language === 'bn' ? 'পরের মান (Final Value)' : 'Final Value'}
            </label>
            <input
              type="number"
              value={finalVal}
              onChange={(e) => setFinalVal(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl bg-blue-50/60 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {result.isIncrease
                ? language === 'bn'
                  ? 'শতকরা বৃদ্ধি'
                  : 'Percentage Increase'
                : language === 'bn'
                ? 'শতকরা হ্রাস'
                : 'Percentage Decrease'}
            </div>
            <div className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
              {result.isIncrease ? '+' : '-'}
              {result.percent}%
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              {language === 'bn' ? 'পরম পার্থক্য:' : 'Absolute Difference:'}{' '}
              <span className="font-semibold">{result.diff}</span>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 3. Fraction Calculator
export const FractionCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'fraction-calculator')!;

  const [n1, setN1] = useState('1');
  const [d1, setD1] = useState('2');
  const [op, setOp] = useState('+');
  const [n2, setN2] = useState('1');
  const [d2, setD2] = useState('4');
  const [result, setResult] = useState<{ num: number; den: number; decimal: number } | null>({
    num: 3,
    den: 4,
    decimal: 0.75,
  });

  const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

  const handleCalculate = () => {
    const num1 = parseInt(n1, 10);
    const den1 = parseInt(d1, 10);
    const num2 = parseInt(n2, 10);
    const den2 = parseInt(d2, 10);

    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) {
      return;
    }

    let resNum = 0;
    let resDen = 1;

    switch (op) {
      case '+':
        resNum = num1 * den2 + num2 * den1;
        resDen = den1 * den2;
        break;
      case '-':
        resNum = num1 * den2 - num2 * den1;
        resDen = den1 * den2;
        break;
      case '×':
        resNum = num1 * num2;
        resDen = den1 * den2;
        break;
      case '÷':
        if (num2 === 0) return;
        resNum = num1 * den2;
        resDen = den1 * num2;
        break;
    }

    const divisor = gcd(resNum, resDen);
    const finalNum = resNum / divisor;
    const finalDen = resDen / divisor;

    setResult({
      num: finalNum,
      den: finalDen,
      decimal: parseFloat((finalNum / finalDen).toFixed(4)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Fraction Arithmetic', bn: 'ভগ্নাংশের গাণিতিক সূত্র' },
        expression: 'a/b ± c/d = (ad ± bc) / bd   |   (a/b) × (c/d) = ac / bd   |   (a/b) ÷ (c/d) = ad / bc',
        explanation: {
          en: 'Calculates fraction operations with automatic common denominators and GCD simplification.',
          bn: 'লসাগু ও সমহর প্রক্রিয়ার মাধ্যমে ভগ্নাংশের যোগ, বিয়োগ, গুণ ও ভাগ সম্পন্ন করে লঘিষ্ঠ রূপ দেয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Fraction 1 */}
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              value={n1}
              onChange={(e) => setN1(e.target.value)}
              className="w-16 rounded-lg border border-slate-200 p-2 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
              placeholder="Num"
            />
            <div className="h-0.5 w-16 bg-slate-400 dark:bg-slate-600" />
            <input
              type="number"
              value={d1}
              onChange={(e) => setD1(e.target.value)}
              className="w-16 rounded-lg border border-slate-200 p-2 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
              placeholder="Den"
            />
          </div>

          {/* Operator */}
          <select
            value={op}
            onChange={(e) => setOp(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-base font-bold dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="×">×</option>
            <option value="÷">÷</option>
          </select>

          {/* Fraction 2 */}
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              value={n2}
              onChange={(e) => setN2(e.target.value)}
              className="w-16 rounded-lg border border-slate-200 p-2 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
              placeholder="Num"
            />
            <div className="h-0.5 w-16 bg-slate-400 dark:bg-slate-600" />
            <input
              type="number"
              value={d2}
              onChange={(e) => setD2(e.target.value)}
              className="w-16 rounded-lg border border-slate-200 p-2 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
              placeholder="Den"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 text-center dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="text-xs font-semibold text-slate-500">{t.resultsHeading}</div>
            <div className="mt-2 flex items-center justify-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.num}</span>
                <span className="h-0.5 w-12 bg-blue-600 dark:bg-blue-400" />
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.den}</span>
              </div>
              <span className="text-xl text-slate-400">=</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{result.decimal}</span>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 4. Average, Mean, Median & Mode Calculator
export const AverageCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'average-calculator')!;

  const [inputStr, setInputStr] = useState('10, 20, 25, 30, 25, 40, 50');
  const [stats, setStats] = useState<{
    count: number;
    sum: number;
    mean: number;
    median: number;
    mode: string;
    range: number;
    min: number;
    max: number;
  } | null>({
    count: 7,
    sum: 200,
    mean: 28.5714,
    median: 25,
    mode: '25',
    range: 40,
    min: 10,
    max: 50,
  });

  const handleCalculate = () => {
    const nums = inputStr
      .split(/[,;\s]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    if (nums.length === 0) return;

    const count = nums.length;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    // Median
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    nums.forEach((n) => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const modes = Object.keys(freq)
      .filter((k) => freq[Number(k)] === maxFreq && maxFreq > 1)
      .map(Number);

    const modeStr = modes.length > 0 ? modes.join(', ') : language === 'bn' ? 'নেই' : 'No mode';
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    setStats({
      count,
      sum: parseFloat(sum.toFixed(4)),
      mean: parseFloat(mean.toFixed(4)),
      median: parseFloat(median.toFixed(4)),
      mode: modeStr,
      range: parseFloat((max - min).toFixed(4)),
      min,
      max,
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Statistical Metrics', bn: 'পরিসংখ্যান সূত্র' },
        expression: 'Mean = Σx / n   |   Range = Max - Min   |   Median = Middle value of sorted set',
        explanation: {
          en: 'Calculates the center of mass, median midpoint, most frequent value, and span of values.',
          bn: 'গড় হলো সকল পদের সমষ্টি ভাগ পদসংখ্যা। মধ্যক হলো ক্রমিক মধ্যমান। প্রচুরক হলো সর্বাধিক পুনরাবৃত্ত পদ।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {language === 'bn'
            ? 'কমা (,) দিয়ে আলাদা করা সংখ্যাগুলো লিখুন'
            : 'Enter comma-separated numbers'}
        </label>
        <textarea
          rows={3}
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          placeholder="e.g. 12, 15, 20, 25, 30"
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {stats && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-blue-50/70 p-3 text-center dark:bg-blue-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'গড় (Mean)' : 'Mean / Average'}
              </span>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">{stats.mean}</div>
            </div>
            <div className="rounded-xl bg-indigo-50/70 p-3 text-center dark:bg-indigo-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'মধ্যক (Median)' : 'Median'}
              </span>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">{stats.median}</div>
            </div>
            <div className="rounded-xl bg-emerald-50/70 p-3 text-center dark:bg-emerald-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'প্রচুরক (Mode)' : 'Mode'}
              </span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{stats.mode}</div>
            </div>
            <div className="rounded-xl bg-amber-50/70 p-3 text-center dark:bg-amber-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'মোট যোগফল (Sum)' : 'Sum (Σx)'}
              </span>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400">{stats.sum}</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'মোট সংখ্যা (n)' : 'Count (n)'}
              </span>
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{stats.count}</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'পরিসর (Range)' : 'Range'}
              </span>
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{stats.range}</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Min</span>
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{stats.min}</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Max</span>
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{stats.max}</div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 5. Quadratic Equation Solver
export const QuadraticEquationSolver: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'quadratic-equation')!;

  const [a, setA] = useState('1');
  const [b, setB] = useState('-5');
  const [c, setC] = useState('6');
  const [roots, setRoots] = useState<{
    discriminant: number;
    type: 'real-distinct' | 'real-equal' | 'complex';
    x1: string;
    x2: string;
    vertex: { x: number; y: number };
  } | null>({
    discriminant: 1,
    type: 'real-distinct',
    x1: '3',
    x2: '2',
    vertex: { x: 2.5, y: -0.25 },
  });

  const handleCalculate = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);

    if (isNaN(valA) || isNaN(valB) || isNaN(valC) || valA === 0) return;

    const disc = valB * valB - 4 * valA * valC;
    const vertexX = -valB / (2 * valA);
    const vertexY = valA * vertexX * vertexX + valB * vertexX + valC;

    if (disc > 0) {
      const root1 = (-valB + Math.sqrt(disc)) / (2 * valA);
      const root2 = (-valB - Math.sqrt(disc)) / (2 * valA);
      setRoots({
        discriminant: disc,
        type: 'real-distinct',
        x1: parseFloat(root1.toFixed(4)).toString(),
        x2: parseFloat(root2.toFixed(4)).toString(),
        vertex: { x: parseFloat(vertexX.toFixed(4)), y: parseFloat(vertexY.toFixed(4)) },
      });
    } else if (disc === 0) {
      const root = -valB / (2 * valA);
      setRoots({
        discriminant: 0,
        type: 'real-equal',
        x1: parseFloat(root.toFixed(4)).toString(),
        x2: parseFloat(root.toFixed(4)).toString(),
        vertex: { x: parseFloat(vertexX.toFixed(4)), y: parseFloat(vertexY.toFixed(4)) },
      });
    } else {
      const realPart = (-valB / (2 * valA)).toFixed(4);
      const imagPart = (Math.sqrt(-disc) / (2 * valA)).toFixed(4);
      setRoots({
        discriminant: disc,
        type: 'complex',
        x1: `${realPart} + ${imagPart}i`,
        x2: `${realPart} - ${imagPart}i`,
        vertex: { x: parseFloat(vertexX.toFixed(4)), y: parseFloat(vertexY.toFixed(4)) },
      });
    }
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Quadratic Formula', bn: 'দ্বিঘাত সমীকরণের সূত্র' },
        expression: 'x = (-b ± √(b² - 4ac)) / (2a)   |   Δ = b² - 4ac',
        explanation: {
          en: 'Where Δ is the discriminant. If Δ > 0: two distinct real roots. If Δ = 0: one repeated root. If Δ < 0: two complex conjugate roots.',
          bn: 'নিশ্চায়ক Δ = b² - 4ac। Δ > 0 হলে মূলদ্বয় বাস্তব ও অসমান; Δ = 0 হলে মূলদ্বয় বাস্তব ও সমান; Δ < 0 হলে মূলদ্বয় জটিল।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center font-mono text-base font-bold text-slate-700 dark:text-slate-300 mb-4">
          ax² + bx + c = 0
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Coefficient a</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Coefficient b</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Constant c</label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {roots && (
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  {language === 'bn' ? 'মূল বা সমাধান (Roots):' : 'Roots (Solutions):'}
                </div>
                <div className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
                  x₁ = {roots.x1}, x₂ = {roots.x2}
                </div>
              </div>
              <div className="text-right text-xs text-slate-500 space-y-1">
                <div>
                  {language === 'bn' ? 'নিশ্চায়ক (Discriminant):' : 'Discriminant (Δ):'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">{roots.discriminant}</span>
                </div>
                <div>
                  {language === 'bn' ? 'শীর্ষবিন্দু (Vertex):' : 'Parabola Vertex:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ({roots.vertex.x}, {roots.vertex.y})
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
