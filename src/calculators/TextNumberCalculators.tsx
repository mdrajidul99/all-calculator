import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Copy, Check, RotateCcw, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

// Letter to Number Conversion Logic
export const convertLettersToNumbers = (text: string): string => {
  if (!text) return '';
  // Preserve spaces, newlines, and convert each contiguous word of letters
  return text.replace(/[a-zA-Z]+/g, (word) => {
    return word
      .split('')
      .map((ch) => {
        const code = ch.toUpperCase().charCodeAt(0) - 64;
        return code >= 1 && code <= 26 ? code.toString() : ch;
      })
      .join('-');
  });
};

// Number to Letter Conversion Result
interface NumberConversionResult {
  success: boolean;
  result: string;
  error?: string;
  breakdown?: Array<{ num: number; letter: string }>;
}

// Number to Letter Conversion Logic
export const convertNumbersToLetters = (
  input: string,
  isBangla: boolean
): NumberConversionResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      result: '',
      error: isBangla
        ? 'ভুল ইনপুট: অনুগ্রহ করে সংখ্যা লিখুন'
        : 'Invalid input: Please enter numbers',
    };
  }

  // Normalize Bengali numerals (০-৯) to Western numerals (0-9)
  const normalized = trimmed.replace(/[০-৯]/g, (d) =>
    (d.charCodeAt(0) - 2534).toString()
  );

  // Determine word boundaries:
  // 1. If explicit slash or pipe exists (e.g. "8-5-12-12-15 / 23-15-18-12-4"), split by slash
  // 2. If multiple spaces exist (e.g. "1 12 12   23 15 18 12 4"), split by double+ space
  // 3. If hyphen or comma separates letters and single space separates words ("8-5-12-12-15 23-15-18-12-4")
  let rawWords: string[] = [];

  if (/[\/|]/.test(normalized)) {
    rawWords = normalized.split(/\s*[\/|]\s*/);
  } else if (/[-]\d+/.test(normalized)) {
    // Contains hyphens linking numbers: words are separated by whitespace or comma between groups
    rawWords = normalized.split(/\s+/);
  } else if (/,\s*\d+/.test(normalized) && /\s{2,}/.test(normalized)) {
    // Comma separated with multi-space word delimiters
    rawWords = normalized.split(/\s{2,}/);
  } else if (/\s{2,}/.test(normalized)) {
    rawWords = normalized.split(/\s{2,}/);
  } else {
    // Single word or single group
    rawWords = [normalized];
  }

  const convertedWords: string[] = [];
  const breakdown: Array<{ num: number; letter: string }> = [];

  for (const wordStr of rawWords) {
    const cleanWord = wordStr.trim();
    if (!cleanWord) continue;

    // Tokens inside word can be separated by hyphens, commas, or spaces
    const tokens = cleanWord
      .split(/[-,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (tokens.length === 0) continue;

    let wordResult = '';
    for (const token of tokens) {
      // Must be an integer
      if (!/^\d+$/.test(token)) {
        return {
          success: false,
          result: '',
          error: isBangla
            ? `ভুল ইনপুট: "${token}" একটি সঠিক সংখ্যা নয়। ১ থেকে ২৬ এর মধ্যবর্তী সংখ্যা দিন।`
            : `Invalid input: "${token}" is not a valid number. Please enter numbers between 1 and 26.`,
        };
      }

      const num = parseInt(token, 10);
      if (num < 1 || num > 26) {
        return {
          success: false,
          result: '',
          error: isBangla
            ? `ভুল ইনপুট: "${token}" একটি অবৈধ সংখ্যা। সংখ্যা অবশ্যই ১ থেকে ২৬ এর মধ্যে হতে হবে (A=১, Z=২৬)।`
            : `Invalid input: "${token}" is outside the valid 1–26 range. Numbers must be between 1 and 26 (A=1, Z=26).`,
        };
      }

      const letter = String.fromCharCode(64 + num);
      wordResult += letter;
      breakdown.push({ num, letter });
    }

    convertedWords.push(wordResult);
  }

  return {
    success: true,
    result: convertedWords.join(' '),
    breakdown,
  };
};

// 1. Letter to Number Calculator
export const LetterToNumberCalculator: React.FC = () => {
  const { language, t } = useApp();
  const isBangla = language === 'bn';
  const meta = CALCULATORS.find((c) => c.id === 'letter-to-number')!;

  const [input, setInput] = useState('HELLO WORLD');
  const [result, setResult] = useState<string>(() => convertLettersToNumbers('HELLO WORLD'));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setError(isBangla ? 'ভুল ইনপুট: অনুগ্রহ করে লেখা লিখুন' : 'Invalid input: Please enter text');
      setResult('');
      return;
    }
    setError(null);
    const converted = convertLettersToNumbers(input);
    setResult(converted);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setExample = (sample: string) => {
    setInput(sample);
    setError(null);
    setResult(convertLettersToNumbers(sample));
  };

  // Generate breakdown for preview
  const lettersOnly = input.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const uniqueBreakdown = Array.from(new Set(lettersOnly)).slice(0, 16);

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: {
          en: 'Letter to Number Standard Mapping',
          bn: 'অক্ষর থেকে সংখ্যা রূপান্তরের মান',
        },
        expression: 'A=1, B=2, C=3, D=4 ... X=24, Y=25, Z=26',
        explanation: {
          en: 'Each English alphabet letter maps to its sequential number from 1 to 26. Letters inside a word are joined by hyphens (-), and spaces between words are preserved.',
          bn: 'প্রতিটি ইংরেজি বর্ণ তার অবস্থানক্রম অনুযায়ী ১ থেকে ২৬ এ রূপান্তরিত হয়। শব্দের অন্তর্গত বর্ণগুলো হাইফেন (-) দিয়ে এবং পৃথক শব্দগুলো স্পেসের মাধ্যমে আলাদা থাকে।',
        },
      }}
      howToUseSteps={{
        en: [
          'Type or paste any English word, sentence, or text in the input box.',
          'Click the "Convert" button to generate the number sequence.',
          'Uppercase and lowercase letters are treated equally (e.g. ALL, all, All all equal 1-12-12).',
          'Use the "Copy" button to instantly copy the converted numbers.',
        ],
        bn: [
          'ইনপুট বক্সে যেকোনো ইংরেজি শব্দ, বাক্য বা লেখা টাইপ বা পেস্ট করুন।',
          '"রূপান্তর করুন" বাটনে ক্লিক করে সংখ্যার রূপান্তর দেখুন।',
          'বড় বা ছোট হাতের অক্ষর একইভাবে কাজ করে (যেমন: ALL, all, All সবই 1-12-12)।',
          '"কপি" বাটনে চাপ দিয়ে ফলাফলটি কপি করুন।',
        ],
      }}
      notes={{
        en: 'Spaces and punctuation are preserved so your full sentences remain readable and accurately structured.',
        bn: 'শব্দের মধ্যবর্তী স্পেস এবং যতিচিহ্ন অক্ষুণ্ণ থাকে, ফলে পূর্ণ বাক্যের গঠন বজায় থাকে।',
      }}
    >
      <div className="space-y-6">
        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-xs font-black">
                A
              </span>
              {isBangla ? 'লেখা লিখুন' : 'Enter text'}
            </h3>

            {/* Quick Examples */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400">
                {isBangla ? 'উদাহরণ:' : 'Examples:'}
              </span>
              {['ALL', 'HELLO WORLD', 'CAT', 'CALCULATOR'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setExample(sample)}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Input Textarea */}
          <div className="space-y-2">
            <textarea
              rows={3}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder={
                isBangla
                  ? 'লেখা লিখুন (যেমন: HELLO WORLD)...'
                  : 'Enter text (e.g., HELLO WORLD)...'
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none transition resize-y"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConvert}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {isBangla ? 'রূপান্তর করুন' : 'Convert'}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {isBangla ? 'পরিষ্কার' : 'Clear'}
              </button>
            </div>

            {result && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {isBangla ? 'কপি হয়েছে' : 'Copied'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{isBangla ? 'কপি' : 'Copy'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Result Area */}
          {result && (
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5 dark:border-blue-900/40 dark:bg-blue-950/20">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2">
                <span>{isBangla ? 'ফলাফল' : 'Result'}</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {input.trim().length} {isBangla ? 'অক্ষর' : 'chars'}
                </span>
              </div>
              <div className="break-all sm:break-words font-mono font-bold text-base sm:text-xl text-blue-700 dark:text-blue-300 select-all p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-200/60 dark:border-blue-800/40">
                {result}
              </div>

              {/* Letter breakdown chips */}
              {uniqueBreakdown.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-blue-900/40">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {isBangla ? 'অক্ষরের মান:' : 'Letter values:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {uniqueBreakdown.map((ch) => {
                      const val = ch.charCodeAt(0) - 64;
                      return (
                        <span
                          key={ch}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-mono font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <span className="text-blue-600 dark:text-blue-400">{ch}</span>
                          <span className="text-slate-400">=</span>
                          <span>{val}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

// 2. Number to Letter Calculator
export const NumberToLetterCalculator: React.FC = () => {
  const { language } = useApp();
  const isBangla = language === 'bn';
  const meta = CALCULATORS.find((c) => c.id === 'number-to-letter')!;

  const [input, setInput] = useState('8-5-12-12-15 23-15-18-12-4');
  const [result, setResult] = useState<string>(() => {
    const res = convertNumbersToLetters('8-5-12-12-15 23-15-18-12-4', false);
    return res.result;
  });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [breakdown, setBreakdown] = useState<Array<{ num: number; letter: string }>>([]);

  const handleConvert = () => {
    if (!input.trim()) {
      setError(isBangla ? 'ভুল ইনপুট: অনুগ্রহ করে সংখ্যা লিখুন' : 'Invalid input: Please enter numbers');
      setResult('');
      setBreakdown([]);
      return;
    }

    const conversion = convertNumbersToLetters(input, isBangla);
    if (!conversion.success) {
      setError(conversion.error || (isBangla ? 'ভুল ইনপুট' : 'Invalid input'));
      setResult('');
      setBreakdown([]);
    } else {
      setError(null);
      setResult(conversion.result);
      setBreakdown(conversion.breakdown || []);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setError(null);
    setBreakdown([]);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setExample = (sample: string) => {
    setInput(sample);
    setError(null);
    const conv = convertNumbersToLetters(sample, isBangla);
    if (conv.success) {
      setResult(conv.result);
      setBreakdown(conv.breakdown || []);
    }
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: {
          en: 'Number to Letter Reverse Mapping',
          bn: 'সংখ্যা থেকে অক্ষর রূপান্তরের মান',
        },
        expression: '1=A, 2=B, 3=C ... 24=X, 25=Y, 26=Z',
        explanation: {
          en: 'Converts sequential numbers (1–26) back into English letters. Numbers are separated by hyphens (-), commas (,), or spaces. Words are separated by spaces.',
          bn: '১ থেকে ২৬ পর্যন্ত সংখ্যাকে পুনরায় ইংরেজি বর্ণে রূপান্তর করে। সংখ্যাগুলো হাইফেন (-), কমা (,) অথবা স্পেস দিয়ে এবং শব্দগুলো স্পেসের মাধ্যমে আলাদা করা যায়।',
        },
      }}
      howToUseSteps={{
        en: [
          'Enter numbers between 1 and 26 separated by hyphens (e.g. 1-12-12), commas (1,12,12), or spaces (1 12 12).',
          'To separate words, use spaces (e.g. 8-5-12-12-15 23-15-18-12-4).',
          'Click "Convert" to decode the numbers into English words.',
          'Numbers outside 1–26 (like 0, 27, 100) are flagged with an invalid input error.',
        ],
        bn: [
          '১ থেকে ২৬ পর্যন্ত সংখ্যা হাইফেন (যেমন: 1-12-12), কমা (1,12,12) বা স্পেস (1 12 12) দিয়ে লিখুন।',
          'শব্দ আলাদা করতে মাঝে স্পেস দিন (যেমন: 8-5-12-12-15 23-15-18-12-4)।',
          '"রূপান্তর করুন" বাটনে ক্লিক করে সংখ্যা থেকে শব্দ তৈরি করুন।',
          '১–২৬ এর বাইরে কোনো সংখ্যা দিলে (যেমন: ০, ২৭, ১০০) সতর্কবার্তা দেখানো হবে।',
        ],
      }}
      notes={{
        en: 'Common separators such as 1-12-12, 1 12 12, and 1,12,12 all produce the correct output word.',
        bn: 'বিভিন্ন সাধারণ বিভাজক যেমন ১-১২-১২, ১ ১২ ১২ অথবা ১,১২,১২ একইভাবে সঠিক ফলাফল দেয়।',
      }}
    >
      <div className="space-y-6">
        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 text-xs font-black">
                1
              </span>
              {isBangla ? 'সংখ্যা লিখুন' : 'Enter numbers'}
            </h3>

            {/* Quick Examples */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400">
                {isBangla ? 'উদাহরণ:' : 'Examples:'}
              </span>
              {[
                { label: '1-12-12 (ALL)', val: '1-12-12' },
                { label: 'HELLO WORLD', val: '8-5-12-12-15 23-15-18-12-4' },
                { label: '3-1-20 (CAT)', val: '3-1-20' },
              ].map((ex) => (
                <button
                  key={ex.val}
                  type="button"
                  onClick={() => setExample(ex.val)}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition font-mono"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Textarea */}
          <div className="space-y-2">
            <textarea
              rows={3}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder={
                isBangla
                  ? 'সংখ্যা লিখুন (যেমন: 8-5-12-12-15 23-15-18-12-4)...'
                  : 'Enter numbers (e.g., 8-5-12-12-15 23-15-18-12-4)...'
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none transition resize-y font-mono"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isBangla
                ? 'অনুমোদিত ফরম্যাট: 1-12-12, 1 12 12, বা 1,12,12 (১ থেকে ২৬ এর মধ্যে সংখ্যা)'
                : 'Supported formats: 1-12-12, 1 12 12, or 1,12,12 (numbers 1 to 26)'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConvert}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {isBangla ? 'রূপান্তর করুন' : 'Convert'}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {isBangla ? 'পরিষ্কার' : 'Clear'}
              </button>
            </div>

            {result && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {isBangla ? 'কপি হয়েছে' : 'Copied'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{isBangla ? 'কপি' : 'Copy'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Result Area */}
          {result && (
            <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 dark:border-indigo-900/40 dark:bg-indigo-950/20">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-2">
                <span>{isBangla ? 'ফলাফল' : 'Result'}</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {result.length} {isBangla ? 'বর্ণ' : 'letters'}
                </span>
              </div>
              <div className="break-all sm:break-words font-mono font-black text-lg sm:text-2xl text-indigo-700 dark:text-indigo-300 select-all p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-200/60 dark:border-indigo-800/40 tracking-wider">
                {result}
              </div>

              {/* Number to letter breakdown */}
              {breakdown.length > 0 && (
                <div className="mt-4 pt-4 border-t border-indigo-200/50 dark:border-indigo-900/40">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {isBangla ? 'রূপান্তরিত মানসমূহ:' : 'Decoded mappings:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {breakdown.slice(0, 24).map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-mono font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <span className="text-indigo-600 dark:text-indigo-400">{item.num}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{item.letter}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};
