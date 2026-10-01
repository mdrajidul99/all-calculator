import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Delete, RotateCcw, Copy, Check } from 'lucide-react';

export const BasicScientificCalc: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'basic-calculator')!;

  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [isRad, setIsRad] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleDigit = (digit: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev + digit));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleOperator = (op: string) => {
    setEquation(`${display} ${op} `);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    if (display === 'Error' || display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    if (display === '0' || display === 'Error') return;
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  };

  const handleScientific = (type: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    try {
      switch (type) {
        case 'sin':
          res = Math.sin(isRad ? val : (val * Math.PI) / 180);
          break;
        case 'cos':
          res = Math.cos(isRad ? val : (val * Math.PI) / 180);
          break;
        case 'tan':
          res = Math.tan(isRad ? val : (val * Math.PI) / 180);
          break;
        case 'sqrt':
          if (val < 0) throw new Error('Invalid');
          res = Math.sqrt(val);
          break;
        case 'cbrt':
          res = Math.cbrt(val);
          break;
        case 'square':
          res = Math.pow(val, 2);
          break;
        case 'cube':
          res = Math.pow(val, 3);
          break;
        case 'log':
          if (val <= 0) throw new Error('Invalid');
          res = Math.log10(val);
          break;
        case 'ln':
          if (val <= 0) throw new Error('Invalid');
          res = Math.log(val);
          break;
        case 'reciprocal':
          if (val === 0) throw new Error('Zero');
          res = 1 / val;
          break;
        case 'exp':
          res = Math.exp(val);
          break;
        case 'pi':
          res = Math.PI;
          break;
        case 'e':
          res = Math.E;
          break;
        default:
          return;
      }
      setDisplay(parseFloat(res.toFixed(10)).toString());
      setEquation(`${type}(${val})`);
    } catch {
      setDisplay('Error');
    }
  };

  const handleCalculate = () => {
    if (!equation) return;
    try {
      const fullExpr = `${equation}${display}`;
      // Clean and safe mathematical expression evaluation
      const sanitized = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');

      // Check for division by zero
      if (sanitized.includes('/ 0') || sanitized.includes('/0')) {
        setDisplay('Error');
        setEquation('');
        return;
      }

      // Safe numeric evaluation
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${sanitized})`)();
      const formatted = parseFloat(Number(result).toFixed(10)).toString();
      setDisplay(formatted);
      setEquation(`${fullExpr} =`);
    } catch {
      setDisplay('Error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Standard Arithmetic & Trig', bn: 'পাটিগণিত ও ত্রিকোণমিতি' },
        expression: 'PEMDAS / BODMAS Order of Operations',
        explanation: {
          en: 'Evaluates expressions according to mathematical precedence: Parentheses, Exponents, Multiplication & Division, Addition & Subtraction.',
          bn: 'গণিতের প্রচলিত নিয়ম ব্র্যাকেট, ঘাত, গুণ, ভাগ, যোগ এবং বিয়োগ ক্রমানুসারে ফলাফল নির্ধারণ করে।',
        },
      }}
      howToUseSteps={{
        en: [
          'Press numbers or use your keyboard to input values.',
          'Use arithmetic operators (+, −, ×, ÷) to combine numbers.',
          'Use scientific functions (sin, cos, tan, sqrt, log) on the current display.',
          'Toggle between Radians (RAD) and Degrees (DEG) for trigonometric angles.',
          'Press = to get the final result, and Copy to copy the value.',
        ],
        bn: [
          'স্ক্রিনের বাটন চেপে সংখ্যা টাইপ করুন।',
          'যোগ (+), বিয়োগ (−), গুণ (×), ভাগ (÷) বাটন দিয়ে সমীকরণ সাজান।',
          'বর্গমূল, সাইন, কস, লগ ইত্যাদি বৈজ্ঞানিক বোতাম সরাসরি ব্যবহার করুন।',
          'কোণের জন্য রেডিয়ান (RAD) ও ডিগ্রি (DEG) মুড পরিবর্তন করতে পারেন।',
          'সমান (=) বাটনে চাপ দিয়ে চূড়ান্ত মান জানুন এবং কপি বাটনে ফলাফল কপি করুন।',
        ],
      }}
    >
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 transition-colors">
        {/* LCD Screen */}
        <div className="relative mb-5 rounded-2xl bg-slate-950 p-4 text-right text-white shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRad(!isRad)}
                className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 text-blue-400 hover:bg-slate-700"
              >
                {isRad ? 'RAD' : 'DEG'}
              </button>
              {memory !== 0 && (
                <span className="rounded bg-emerald-900/60 text-emerald-300 px-1 text-[10px] font-mono">
                  M: {memory}
                </span>
              )}
            </div>
            <span className="font-mono text-slate-400 truncate max-w-[200px]">
              {equation || '0'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-white transition"
              title="Copy"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white select-all">
              {display}
            </span>
          </div>
        </div>

        {/* Memory Bar */}
        <div className="mb-3 grid grid-cols-4 gap-2 text-xs font-semibold">
          <button
            onClick={() => setMemory(0)}
            className="rounded-lg bg-slate-100 py-1.5 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            MC
          </button>
          <button
            onClick={() => setDisplay(memory.toString())}
            className="rounded-lg bg-slate-100 py-1.5 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            MR
          </button>
          <button
            onClick={() => setMemory((m) => m + (parseFloat(display) || 0))}
            className="rounded-lg bg-slate-100 py-1.5 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            M+
          </button>
          <button
            onClick={() => setMemory((m) => m - (parseFloat(display) || 0))}
            className="rounded-lg bg-slate-100 py-1.5 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            M−
          </button>
        </div>

        {/* Scientific row */}
        <div className="mb-3 grid grid-cols-5 gap-2 text-xs font-semibold">
          <button
            onClick={() => handleScientific('sin')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            sin
          </button>
          <button
            onClick={() => handleScientific('cos')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            cos
          </button>
          <button
            onClick={() => handleScientific('tan')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            tan
          </button>
          <button
            onClick={() => handleScientific('sqrt')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            √x
          </button>
          <button
            onClick={() => handleScientific('square')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            x²
          </button>

          <button
            onClick={() => handleScientific('log')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            log
          </button>
          <button
            onClick={() => handleScientific('ln')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            ln
          </button>
          <button
            onClick={() => handleScientific('reciprocal')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            1/x
          </button>
          <button
            onClick={() => handleScientific('pi')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            π
          </button>
          <button
            onClick={() => handleScientific('e')}
            className="rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            e
          </button>
        </div>

        {/* Primary Keypad */}
        <div className="grid grid-cols-4 gap-2.5">
          <button
            onClick={handleClear}
            className="rounded-2xl bg-rose-100 py-3 text-sm font-bold text-rose-700 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-300 transition"
          >
            C
          </button>
          <button
            onClick={handleBackspace}
            className="flex items-center justify-center rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition"
          >
            <Delete className="h-5 w-5" />
          </button>
          <button
            onClick={handleToggleSign}
            className="rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition"
          >
            ±
          </button>
          <button
            onClick={() => handleOperator('÷')}
            className="rounded-2xl bg-amber-500 py-3 text-base font-bold text-white hover:bg-amber-600 transition"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleDigit('7')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            7
          </button>
          <button
            onClick={() => handleDigit('8')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            8
          </button>
          <button
            onClick={() => handleDigit('9')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            9
          </button>
          <button
            onClick={() => handleOperator('×')}
            className="rounded-2xl bg-amber-500 py-3 text-base font-bold text-white hover:bg-amber-600 transition"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleDigit('4')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            4
          </button>
          <button
            onClick={() => handleDigit('5')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            5
          </button>
          <button
            onClick={() => handleDigit('6')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            6
          </button>
          <button
            onClick={() => handleOperator('−')}
            className="rounded-2xl bg-amber-500 py-3 text-base font-bold text-white hover:bg-amber-600 transition"
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleDigit('1')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            1
          </button>
          <button
            onClick={() => handleDigit('2')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            2
          </button>
          <button
            onClick={() => handleDigit('3')}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            3
          </button>
          <button
            onClick={() => handleOperator('+')}
            className="rounded-2xl bg-amber-500 py-3 text-base font-bold text-white hover:bg-amber-600 transition"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="rounded-2xl bg-slate-50 py-3 text-lg font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 transition"
          >
            .
          </button>
          <button
            onClick={handleCalculate}
            className="rounded-2xl bg-blue-600 py-3 text-lg font-bold text-white hover:bg-blue-700 shadow-md transition"
          >
            =
          </button>
        </div>
      </div>
    </CalculatorLayout>
  );
};
