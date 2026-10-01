import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Copy, Check, DollarSign, Calendar, TrendingUp, Users } from 'lucide-react';

// 1. EMI Calculator
export const EMICalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'emi-calculator')!;

  const [principal, setPrincipal] = useState('500000');
  const [annualRate, setAnnualRate] = useState('9.5');
  const [tenureYears, setTenureYears] = useState('5');
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    principalPct: number;
    interestPct: number;
  }>({
    emi: 10501,
    totalInterest: 130060,
    totalPayment: 630060,
    principalPct: 79.4,
    interestPct: 20.6,
  });

  const handleCalculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(annualRate) / 12 / 100;
    const N = parseFloat(tenureYears) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) return;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const principalPct = parseFloat(((P / totalPayment) * 100).toFixed(1));
    const interestPct = parseFloat(((totalInterest / totalPayment) * 100).toFixed(1));

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
    });
  };

  const handleCopy = () => {
    const text = `${language === 'bn' ? 'মাসিক কিস্তি (EMI)' : 'Monthly EMI'}: ${result.emi.toLocaleString()} | ${language === 'bn' ? 'মোট সুদ' : 'Total Interest'}: ${result.totalInterest.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Standard Reducing Balance EMI Formula', bn: 'মাসিক কিস্তি (EMI) সূত্র' },
        expression: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]',
        explanation: {
          en: 'Where P is the loan principal, r is the monthly interest rate (annual rate / 12 / 100), and n is the loan tenure in months.',
          bn: 'এখানে P হলো ঋণের মূলধন, r হলো মাসিক সুদের হার (বাৎসরিক হার ÷ ১২ ÷ ১০০), এবং n হলো কিস্তির মোট সংখ্যা (মাস)।',
        },
      }}
      howToUseSteps={{
        en: [
          'Enter the total loan amount you wish to borrow.',
          'Enter the annual interest rate offered by the bank or lender.',
          'Enter the tenure duration in years.',
          'Click Calculate to see the monthly installment and interest distribution.',
        ],
        bn: [
          'আপনার প্রয়োজনীয় ঋণের মূল টাকা লিখুন।',
          'ব্যাংক বা প্রতিষ্ঠানের বার্ষিক সুদের হার লিখুন।',
          'ঋণ পরিশোধের মেয়াদ (বছর) নির্ধারণ করুন।',
          'হিসাব করুন বোতামে চাপ দিন এবং মাসিক কিস্তির পরিমাণ দেখুন।',
        ],
      }}
      disclaimer={{
        en: 'Results are financial estimates based on standard monthly reducing balance. Actual bank charges, processing fees, and government levies may vary.',
        bn: 'ফলাফলটি প্রচলিত মাসিক হ্রাসমান সুদ পদ্ধতির আনুমানিক হিসাব। ব্যাংকের প্রক্রিয়াকরণ ফি ও সরকারি শুল্কের কারণে কিছুটা পার্থক্য হতে পারে।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ঋণের পরিমাণ (টাকা / $)' : 'Loan Amount'}
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'সুদের হার (% বাৎসরিক)' : 'Interest Rate (% p.a.)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মেয়াদ (বছর)' : 'Tenure (Years)'}
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
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

        {/* Results Card */}
        {result && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200/80 pb-4 dark:border-slate-700 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'bn' ? 'মাসিক কিস্তির পরিমাণ (Monthly EMI)' : 'Monthly Installment (EMI)'}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 mt-1">
                  {result.emi.toLocaleString()}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? t.copied : t.copyResult}</span>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center sm:text-left">
              <div className="rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'মোট সুদ (Total Interest)' : 'Total Interest'}
                </span>
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  {result.totalInterest.toLocaleString()}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'মোট পরিশোধযোগ্য টাকা' : 'Total Amount Payable'}
                </span>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {result.totalPayment.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>{language === 'bn' ? 'আসল:' : 'Principal:'} {result.principalPct}%</span>
                <span>{language === 'bn' ? 'সুদ:' : 'Interest:'} {result.interestPct}%</span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-700">
                <div style={{ width: `${result.principalPct}%` }} className="bg-blue-600 h-full" />
                <div style={{ width: `${result.interestPct}%` }} className="bg-amber-500 h-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. Simple & Compound Interest Calculator
export const InterestCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'simple-compound-interest')!;

  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('3');
  const [compoundFreq, setCompoundFreq] = useState('12'); // 12=monthly, 1=yearly, 4=quarterly

  const [result, setResult] = useState<{
    simpleInterest: number;
    simpleTotal: number;
    compoundInterest: number;
    compoundTotal: number;
  }>({
    simpleInterest: 24000,
    simpleTotal: 124000,
    compoundInterest: 27024,
    compoundTotal: 127024,
  });

  const handleCalculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(years);
    const N = parseFloat(compoundFreq);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0) return;

    // Simple Interest: I = P * R * T
    const simpleI = P * R * T;
    const simpleTot = P + simpleI;

    // Compound Interest: A = P * (1 + R/N)^(N*T)
    const compoundTot = P * Math.pow(1 + R / N, N * T);
    const compoundI = compoundTot - P;

    setResult({
      simpleInterest: Math.round(simpleI),
      simpleTotal: Math.round(simpleTot),
      compoundInterest: Math.round(compoundI),
      compoundTotal: Math.round(compoundTot),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Interest Formulas', bn: 'সুদ হিসাবের সূত্র' },
        expression: 'Simple: I = P × r × t   |   Compound: A = P × (1 + r/n)^(nt)',
        explanation: {
          en: 'Simple interest is based on the principal only. Compound interest compounds interest onto previously accumulated interest.',
          bn: 'সরল সুদ কেবল মূলধনের উপর অর্জিত হয়। চক্রবৃদ্ধি সুদে পূর্ববর্তী সুদও মূলধনের সাথে যুক্ত হয়ে ক্রমাগত মুনাফা বৃদ্ধি করে।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মূলধন (Principal)' : 'Principal Amount'}
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'সুদের হার (% বাৎসরিক)' : 'Annual Rate (%)'}
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'সময় (বছর)' : 'Time (Years)'}
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'চক্রবৃদ্ধি ব্যবধান' : 'Compounding'}
            </label>
            <select
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="1">{language === 'bn' ? 'বার্ষিক (Yearly)' : 'Annually'}</option>
              <option value="2">{language === 'bn' ? 'ষাণ্মাসিক (Half-Yearly)' : 'Semi-Annually'}</option>
              <option value="4">{language === 'bn' ? 'ত্রৈমাসিক (Quarterly)' : 'Quarterly'}</option>
              <option value="12">{language === 'bn' ? 'মাসিক (Monthly)' : 'Monthly'}</option>
              <option value="365">{language === 'bn' ? 'দৈনিক (Daily)' : 'Daily'}</option>
            </select>
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
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'bn' ? 'সরল সুদ (Simple Interest)' : 'Simple Interest'}
              </span>
              <div className="mt-2 text-2xl font-black text-slate-800 dark:text-slate-100">
                {result.simpleInterest.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {language === 'bn' ? 'সুদাসল:' : 'Total Amount:'}{' '}
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {result.simpleTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {language === 'bn' ? 'চক্রবৃদ্ধি সুদ (Compound Interest)' : 'Compound Interest'}
              </span>
              <div className="mt-2 text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {result.compoundInterest.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                {language === 'bn' ? 'সুদাসল:' : 'Total Amount:'}{' '}
                <span className="font-bold">
                  {result.compoundTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 3. Investment & SIP Calculator
export const SIPCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'investment-sip')!;

  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [years, setYears] = useState('10');

  const [result, setResult] = useState<{
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
  }>({
    investedAmount: 600000,
    estimatedReturns: 561695,
    totalValue: 1161695,
  });

  const handleCalculate = () => {
    const P = parseFloat(monthlyInvestment);
    const i = parseFloat(expectedReturn) / 12 / 100;
    const n = parseFloat(years) * 12;

    if (isNaN(P) || isNaN(i) || isNaN(n) || P <= 0) return;

    // Future Value of SIP: M = P * [ (1 + i)^n - 1 ] * (1 + i) / i
    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = P * n;
    const estimatedReturns = totalValue - investedAmount;

    setResult({
      investedAmount: Math.round(investedAmount),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'SIP Compounding Formula', bn: 'এসআইপি চক্রবৃদ্ধি সূত্র' },
        expression: 'M = P × [((1 + i)^n - 1) / i] × (1 + i)',
        explanation: {
          en: 'Where P is the monthly deposit amount, i is periodic monthly rate, and n is total months invested.',
          bn: 'যেখানে P হলো প্রতি মাসের কিস্তি, i হলো মাসিক সুদের হার, এবং n হলো মোট বিনিয়োগের মাস।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মাসিক বিনিয়োগ (টাকা / $)' : 'Monthly Investment'}
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'প্রত্যাশিত বার্ষিক রিটার্ন (%)' : 'Expected Annual Return (%)'}
            </label>
            <input
              type="number"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'সময়সীমা (বছর)' : 'Time Period (Years)'}
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
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
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {language === 'bn' ? 'ভবিষ্যৎ মোট প্রাপ্তি (Total Maturity Value)' : 'Expected Maturity Value'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {result.totalValue.toLocaleString()}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'আপনার মোট জমা' : 'Invested Amount'}
                </span>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {result.investedAmount.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'আনুমানিক মুনাফা' : 'Estimated Return'}
                </span>
                <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  +{result.estimatedReturns.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 4. Profit & Loss Calculator
export const ProfitLossCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'profit-loss')!;

  const [costPrice, setCostPrice] = useState('800');
  const [sellingPrice, setSellingPrice] = useState('1000');

  const [result, setResult] = useState<{
    diff: number;
    percent: number;
    margin: number;
    isProfit: boolean;
  }>({
    diff: 200,
    percent: 25,
    margin: 20,
    isProfit: true,
  });

  const handleCalculate = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    if (isNaN(cp) || isNaN(sp) || cp <= 0) return;

    const diff = sp - cp;
    const isProfit = diff >= 0;
    const percent = (Math.abs(diff) / cp) * 100;
    const margin = (diff / sp) * 100;

    setResult({
      diff: parseFloat(Math.abs(diff).toFixed(2)),
      percent: parseFloat(percent.toFixed(2)),
      margin: parseFloat(margin.toFixed(2)),
      isProfit,
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Profit and Loss Formulas', bn: 'লাভ ও ক্ষতির সূত্র' },
        expression: 'Profit = Selling Price - Cost Price   |   Profit% = (Profit / Cost Price) × 100',
        explanation: {
          en: 'Calculates the net financial gain or loss and the gross profit margin percentage.',
          bn: 'বিক্রয়মূল্য থেকে ক্রয়মূল্য বিয়োগ করে নিট লাভ বা ক্ষতি এবং লাভের শতকরা হার নির্ণয় করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ক্রয়মূল্য / খরচ (Cost Price)' : 'Cost Price (CP)'}
            </label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'বিক্রয়মূল্য (Selling Price)' : 'Selling Price (SP)'}
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
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
          <div
            className={`mt-6 rounded-2xl p-5 border ${
              result.isProfit
                ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/60'
                : 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {result.isProfit
                    ? language === 'bn'
                      ? 'নিট লাভ (Profit)'
                      : 'Net Profit'
                    : language === 'bn'
                    ? 'নিট ক্ষতি (Loss)'
                    : 'Net Loss'}
                </span>
                <div
                  className={`mt-1 text-3xl font-black ${
                    result.isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {result.isProfit ? '+' : '-'}
                  {result.diff.toLocaleString()}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase font-semibold">
                  {language === 'bn' ? 'শতকরা হার' : 'Percentage'}
                </span>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {result.percent}%
                </div>
                <div className="text-xs text-slate-500">
                  Margin: {result.margin}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 5. Salary & Wage Calculator
export const SalaryCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'salary-calculator')!;

  const [amount, setAmount] = useState('50000');
  const [period, setPeriod] = useState<'monthly' | 'yearly' | 'hourly'>('monthly');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');

  const [breakdown, setBreakdown] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  }>({
    hourly: 288.46,
    daily: 2307.69,
    weekly: 11538.46,
    monthly: 50000,
    yearly: 600000,
  });

  const handleCalculate = () => {
    const val = parseFloat(amount);
    const hpw = parseFloat(hoursPerWeek) || 40;
    if (isNaN(val) || val <= 0) return;

    let yearly = 0;
    if (period === 'yearly') yearly = val;
    else if (period === 'monthly') yearly = val * 12;
    else if (period === 'hourly') yearly = val * hpw * 52;

    const monthly = yearly / 12;
    const weekly = yearly / 52;
    const daily = weekly / 5;
    const hourly = yearly / (52 * hpw);

    setBreakdown({
      hourly: parseFloat(hourly.toFixed(2)),
      daily: parseFloat(daily.toFixed(2)),
      weekly: parseFloat(weekly.toFixed(2)),
      monthly: parseFloat(monthly.toFixed(2)),
      yearly: parseFloat(yearly.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Wage Conversion Standards', bn: 'বেতন রূপান্তর নিয়ম' },
        expression: 'Yearly = Monthly × 12 = Weekly × 52 = Hourly × Hours/Week × 52',
        explanation: {
          en: 'Converts base salaries assuming standard 52 weeks per work year and 5 working days per week.',
          bn: 'বছরে ৫২ সপ্তাহ এবং সপ্তাহে ৫ কার্যদিবস ধরে বাৎসরিক ও ঘণ্টার মজুরি গণনা করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'বেতনের পরিমাণ' : 'Pay Amount'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'সময়কাল' : 'Pay Period'}
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="monthly">{language === 'bn' ? 'মাসিক (Monthly)' : 'Monthly'}</option>
              <option value="yearly">{language === 'bn' ? 'বাৎসরিক (Yearly)' : 'Yearly'}</option>
              <option value="hourly">{language === 'bn' ? 'ঘণ্টাপ্রতি (Hourly)' : 'Hourly'}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'সাপ্তাহিক কর্মঘণ্টা' : 'Hours / Week'}
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
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

        {breakdown && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="rounded-xl bg-blue-50/70 p-3 text-center dark:bg-blue-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'বাৎসরিক' : 'Yearly'}
              </span>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">
                {breakdown.yearly.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl bg-indigo-50/70 p-3 text-center dark:bg-indigo-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'মাসিক' : 'Monthly'}
              </span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                {breakdown.monthly.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50/70 p-3 text-center dark:bg-emerald-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'সাপ্তাহিক' : 'Weekly'}
              </span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {breakdown.weekly.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl bg-amber-50/70 p-3 text-center dark:bg-amber-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'দৈনিক' : 'Daily'}
              </span>
              <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {breakdown.daily.toLocaleString()}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl bg-purple-50/70 p-3 text-center dark:bg-purple-950/40">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {language === 'bn' ? 'ঘণ্টাপ্রতি' : 'Hourly'}
              </span>
              <div className="text-lg font-black text-purple-600 dark:text-purple-400 mt-0.5">
                {breakdown.hourly.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
