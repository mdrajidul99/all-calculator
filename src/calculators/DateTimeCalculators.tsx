import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Calendar, Clock, Gift, Sparkles, Copy, Check } from 'lucide-react';

// 1. Exact Age Calculator
export const AgeCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'age-calculator')!;

  const todayStr = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState('2000-01-15');
  const [targetDate, setTargetDate] = useState(todayStr);
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    dayOfWeek: string;
    nextBirthdayDays: number;
  }>({
    years: 26,
    months: 8,
    days: 15,
    totalDays: 9755,
    totalWeeks: 1393,
    totalMonths: 320,
    totalHours: 234120,
    dayOfWeek: 'Saturday',
    nextBirthdayDays: 107,
  });

  const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DAYS_BN = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

  const handleCalculate = () => {
    if (!birthDate) return;
    const bDate = new Date(birthDate);
    const tDate = targetDate ? new Date(targetDate) : new Date();

    if (bDate > tDate) return;

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = tDate.getTime() - bDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Day born
    const dayOfWeek = DAYS_EN[bDate.getDay()];

    // Next birthday calculation
    const currentYear = tDate.getFullYear();
    let nextBday = new Date(currentYear, bDate.getMonth(), bDate.getDate());
    if (nextBday < tDate) {
      nextBday = new Date(currentYear + 1, bDate.getMonth(), bDate.getDate());
    }
    const nextBdayMs = nextBday.getTime() - tDate.getTime();
    const nextBirthdayDays = Math.ceil(nextBdayMs / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      dayOfWeek,
      nextBirthdayDays,
    });
  };

  const handleCopy = () => {
    const text = `${result.years} ${language === 'bn' ? 'বছর' : 'years'}, ${result.months} ${
      language === 'bn' ? 'মাস' : 'months'
    }, ${result.days} ${language === 'bn' ? 'দিন' : 'days'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Gregorian Calendar Elapsed Time', bn: 'বয়স ও সময় পরিমাপের সূত্র' },
        expression: 'Age = Target Date - Date of Birth (Accounting for leap years & varying month lengths)',
        explanation: {
          en: 'Calculates chronological age by taking into account leap years, 28/29/30/31-day months, and precise day rollover.',
          bn: 'অধিবর্ষ (লিপ ইয়ার) এবং বিভিন্ন মাসের ২৮, ২৯, ৩০ ও ৩১ দিনের পার্থক্য নিখুঁতভাবে সমন্বয় করে বয়স নির্ধারণ করা হয়।',
        },
      }}
      howToUseSteps={{
        en: [
          'Select your Date of Birth.',
          'Optionally change the "Age as of" date (defaults to today).',
          'Click Calculate to see your exact years, months, days, and next birthday countdown.',
        ],
        bn: [
          'আপনার জন্মতারিখ নির্বাচন করুন।',
          'যে তারিখ পর্যন্ত বয়স দেখতে চান তা নির্ধারণ করুন (স্বয়ংক্রিয়ভাবে আজকের তারিখ থাকে)।',
          'হিসাব করুন বাটনে চাপ দিয়ে সঠিক বয়স ও পরবর্তী জন্মদিনের দিন গণনা দেখুন।',
        ],
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'জন্মতারিখ (Date of Birth)' : 'Date of Birth'}
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'যে তারিখ পর্যন্ত হিসাব করবেন' : 'Age at the Date of'}
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
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
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-6 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-100 pb-4 dark:border-blue-900/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {language === 'bn' ? 'আপনার বর্তমান বয়স' : 'Your Exact Age'}
                </span>
                <div className="mt-1 flex flex-wrap items-baseline gap-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  <span>
                    {result.years} <span className="text-sm font-semibold text-slate-500">{language === 'bn' ? 'বছর' : 'Years'}</span>
                  </span>
                  <span>
                    {result.months} <span className="text-sm font-semibold text-slate-500">{language === 'bn' ? 'মাস' : 'Months'}</span>
                  </span>
                  <span>
                    {result.days} <span className="text-sm font-semibold text-slate-500">{language === 'bn' ? 'দিন' : 'Days'}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? t.copied : t.copyResult}</span>
              </button>
            </div>

            {/* Next Birthday & Day Born */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-blue-50 dark:border-slate-800">
                <Gift className="h-8 w-8 text-pink-500 shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold uppercase text-slate-400">
                    {language === 'bn' ? 'পরবর্তী জন্মদিন বাকি' : 'Next Birthday in'}
                  </span>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {result.nextBirthdayDays} {language === 'bn' ? 'দিন' : 'days'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-blue-50 dark:border-slate-800">
                <Calendar className="h-8 w-8 text-indigo-500 shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold uppercase text-slate-400">
                    {language === 'bn' ? 'জন্মের দিন' : 'Born on a'}
                  </span>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {language === 'bn'
                      ? DAYS_BN[DAYS_EN.indexOf(result.dayOfWeek)]
                      : result.dayOfWeek}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Life Stats */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  {language === 'bn' ? 'মোট দিন' : 'Total Days'}
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {result.totalDays.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  {language === 'bn' ? 'মোট সপ্তাহ' : 'Total Weeks'}
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {result.totalWeeks.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  {language === 'bn' ? 'মোট মাস' : 'Total Months'}
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {result.totalMonths.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  {language === 'bn' ? 'মোট ঘণ্টা' : 'Total Hours'}
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {result.totalHours.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. Date Difference Calculator
export const DateDifferenceCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'date-difference')!;

  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');

  const [diff, setDiff] = useState<{
    days: number;
    weeks: number;
    remainingDays: number;
  }>({
    days: 364,
    weeks: 52,
    remainingDays: 0,
  });

  const handleCalculate = () => {
    if (!startDate || !endDate) return;
    const s = new Date(startDate);
    const e = new Date(endDate);

    const diffTime = Math.abs(e.getTime() - s.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    setDiff({
      days: totalDays,
      weeks,
      remainingDays,
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Date Interval Calculation', bn: 'তারিখ ব্যবধান সূত্র' },
        expression: 'Days = |Date 2 - Date 1| in Milliseconds / (1000 × 60 × 60 × 24)',
        explanation: {
          en: 'Calculates absolute duration between two calendar dates in days, weeks, and fractional periods.',
          bn: 'দুটি ক্যালেন্ডার তারিখের মধ্যকার মিলি-সেকেন্ড পার্থক্যকে দিনে রূপান্তর করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'শুরুর তারিখ (Start Date)' : 'Start Date'}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'শেষ তারিখ (End Date)' : 'End Date'}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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

        {diff && (
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {language === 'bn' ? 'দুই তারিখের ব্যবধান' : 'Difference'}
            </span>
            <div className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
              {diff.days.toLocaleString()} {language === 'bn' ? 'দিন' : 'Days'}
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              {diff.weeks} {language === 'bn' ? 'সপ্তাহ' : 'weeks'}{' '}
              {diff.remainingDays > 0 &&
                `+ ${diff.remainingDays} ${language === 'bn' ? 'দিন' : 'days'}`}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
