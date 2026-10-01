import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { ArrowLeftRight, RefreshCw, AlertCircle, Clock, Copy, Check } from 'lucide-react';

interface CurrencyItem {
  code: string;
  name: { en: string; bn: string };
  symbol: string;
}

const SUPPORTED_CURRENCIES: CurrencyItem[] = [
  { code: 'BDT', name: { en: 'Bangladeshi Taka', bn: 'বাংলাদেশি টাকা' }, symbol: '৳' },
  { code: 'USD', name: { en: 'US Dollar', bn: 'মার্কিন ডলার' }, symbol: '$' },
  { code: 'USDT', name: { en: 'Tether USDT', bn: 'টিথার ইউএসডিটি' }, symbol: '₮' },
  { code: 'EUR', name: { en: 'Euro', bn: 'ইউরো' }, symbol: '€' },
  { code: 'GBP', name: { en: 'British Pound', bn: 'ব্রিটিশ পাউন্ড' }, symbol: '£' },
  { code: 'SAR', name: { en: 'Saudi Riyal', bn: 'সৌদি রিয়াল' }, symbol: 'SR' },
  { code: 'AED', name: { en: 'UAE Dirham', bn: 'ইউএই দিরহাম' }, symbol: 'AED' },
  { code: 'INR', name: { en: 'Indian Rupee', bn: 'ভারতীয় রুপি' }, symbol: '₹' },
  { code: 'MYR', name: { en: 'Malaysian Ringgit', bn: 'মালয়েশিয়ান রিঙ্গিত' }, symbol: 'RM' },
  { code: 'QAR', name: { en: 'Qatari Riyal', bn: 'কাতারি রিয়াল' }, symbol: 'QR' },
  { code: 'SGD', name: { en: 'Singapore Dollar', bn: 'সিঙ্গাপুর ডলার' }, symbol: 'S$' },
  { code: 'CAD', name: { en: 'Canadian Dollar', bn: 'কানাডিয়ান ডলার' }, symbol: 'CA$' },
  { code: 'AUD', name: { en: 'Australian Dollar', bn: 'অস্ট্রেলিয়ান ডলার' }, symbol: 'AU$' },
  { code: 'JPY', name: { en: 'Japanese Yen', bn: 'জাপানিজ ইয়েন' }, symbol: '¥' },
  { code: 'CNY', name: { en: 'Chinese Yuan', bn: 'চীনা ইউয়ান' }, symbol: '¥' },
  { code: 'KRW', name: { en: 'South Korean Won', bn: 'দক্ষিণ কোরিয়ান ওন' }, symbol: '₩' },
  { code: 'CHF', name: { en: 'Swiss Franc', bn: 'সুইস ফ্রাঁ' }, symbol: 'CHF' },
  { code: 'RUB', name: { en: 'Russian Ruble', bn: 'রাশিয়ান রুবল' }, symbol: '₽' },
  { code: 'TRY', name: { en: 'Turkish Lira', bn: 'তুর্কি লিরা' }, symbol: '₺' },
];

export const UniversalCurrencyConverter: React.FC<{ isUsdtSpecific?: boolean }> = ({
  isUsdtSpecific = false,
}) => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find(
    (c) => c.id === (isUsdtSpecific ? 'usdt-to-bdt' : 'currency-converter')
  )!;

  const [fromCurrency, setFromCurrency] = useState(isUsdtSpecific ? 'USDT' : 'USD');
  const [toCurrency, setToCurrency] = useState('BDT');
  const [amount, setAmount] = useState('100');

  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customRate, setCustomRate] = useState<string>('');
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch live exchange rates from public API
  const fetchLiveRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) {
        throw new Error('Failed to fetch currency rates');
      }
      const data = await response.json();
      if (data && data.rates) {
        // USDT is pegged 1:1 to USD in base currency
        const updatedRates = {
          ...data.rates,
          USDT: 1.0,
        };
        setRates(updatedRates);
        setLastUpdated(data.time_last_update_utc || new Date().toUTCString());
      } else {
        throw new Error('Invalid rate format');
      }
    } catch (err) {
      console.warn('Currency API error, providing fallback state:', err);
      setError(t.rateFetchError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveRates();
  }, []);

  // Compute conversion
  const computeConverted = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return 0;

    if (useCustomRate && customRate) {
      const cr = parseFloat(customRate);
      if (!isNaN(cr) && cr > 0) return amt * cr;
    }

    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

    // Standard cross rate: USD to X
    // rate(From -> To) = rates[To] / rates[From]
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    const unitRate = rateTo / rateFrom;

    return amt * unitRate;
  };

  const getEffectiveRate = () => {
    if (useCustomRate && customRate) {
      return parseFloat(customRate) || 0;
    }
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;
    return rates[toCurrency] / rates[fromCurrency];
  };

  const convertedValue = computeConverted();
  const effectiveRate = getEffectiveRate();

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCopy = () => {
    const text = `${amount} ${fromCurrency} = ${convertedValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })} ${toCurrency}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Cross Exchange Rate Formula', bn: 'মুদ্রা রূপান্তর সূত্র' },
        expression: 'Target Amount = Base Amount × (Rate[Target] / Rate[Base])',
        explanation: {
          en: 'Calculates the real-time cross-currency conversion based on global market exchange pairs against USD base reference.',
          bn: 'ডলার ভিত্তিমূল্য সাপেক্ষে আন্তর্জাতিক মুদ্রা বাজারের বর্তমান বিনিময় হারের ভিত্তিতে সরাসরি রূপান্তর হিসাব করা হয়।',
        },
      }}
      howToUseSteps={{
        en: [
          'Choose the currency you are converting FROM and the currency you are converting TO.',
          'Enter the amount you wish to convert.',
          'Check the live exchange rate and last update timestamp.',
          'Optionally toggle Custom Rate if you are trading via P2P or specific bank rates.',
        ],
        bn: [
          'যে মুদ্রা থেকে রূপান্তর করতে চান এবং যে মুদ্রায় নিতে চান তা নির্বাচন করুন।',
          'টাকার বা মুদ্রার পরিমাণ লিখুন।',
          'লাইভ এক্সচেঞ্জ রেট এবং সর্বশেষ আপডেটের সময় দেখে নিন।',
          'প্রয়োজনে পিটুপি (P2P) বা নির্দিষ্ট ব্যাংকের রেট ম্যানুয়ালি বসাতে পারেন।',
        ],
      }}
      notes={{
        en: 'Live exchange rates are updated periodically from international financial market feeds. For actual cash transactions or foreign remittance, official bank service charges and spread margins will apply.',
        bn: 'আন্তর্জাতিক মুদ্রা বাজার থেকে লাইভ বিনিময় হার নিয়মিত আপডেট করা হয়। তবে ব্যাংক বা মানি এক্সচেঞ্জে নগদ ক্রয়-বিক্রয়ে সংশ্লিষ্ট প্রতিষ্ঠানের ফি ও স্প্রেডের কারণে সামান্য তারতম্য হতে পারে।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {/* Status / Last Updated bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-3.5 py-2 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            <span>
              {t.lastUpdated}: {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Syncing...'}
            </span>
          </div>
          <button
            onClick={fetchLiveRates}
            disabled={loading}
            className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            <span>{t.refreshRates}</span>
          </button>
        </div>

        {/* Error notification if API failed */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span>{error}</span>
              <button
                onClick={() => setUseCustomRate(true)}
                className="ml-2 font-bold underline cursor-pointer"
              >
                {language === 'bn' ? 'কাস্টম রেট লিখুন' : 'Enter Custom Rate'}
              </button>
            </div>
          </div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Amount */}
          <div className="sm:col-span-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'পরিমাণ (Amount)' : 'Amount'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-base font-bold dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* From Currency */}
          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'কোন মুদ্রা থেকে (From)' : 'From Currency'}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="sm:col-span-2 flex justify-center">
            <button
              onClick={handleSwap}
              className="w-full sm:w-auto flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
              title={t.swapCurrencies}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* To Currency */}
          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'কোন মুদ্রায় (To)' : 'To Currency'}
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Rate Toggle */}
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
                ? 'কাস্টম বিনিময় হার (Manual / P2P Rate) ব্যবহার করুন'
                : 'Use custom exchange rate (e.g. P2P or specific bank rate)'}
            </span>
          </label>

          {useCustomRate && (
            <div className="mt-2 max-w-xs">
              <input
                type="number"
                step="0.0001"
                placeholder={`1 ${fromCurrency} = ? ${toCurrency}`}
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          )}
        </div>

        {/* Result Display Card */}
        <div className="mt-6 rounded-2xl bg-blue-50/70 p-6 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {amount} {fromCurrency} =
              </span>
              <div className="mt-1 text-3xl sm:text-4xl font-black text-blue-700 dark:text-blue-300">
                {convertedValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}{' '}
                <span className="text-2xl font-bold">{toCurrency}</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                1 {fromCurrency} = {effectiveRate.toFixed(4)} {toCurrency}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 transition shadow-xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? t.copied : t.copyResult}</span>
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};
