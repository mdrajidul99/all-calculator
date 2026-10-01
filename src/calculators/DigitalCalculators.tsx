import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Download, Monitor } from 'lucide-react';

export const DownloadTimeCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'download-upload-time')!;

  const [fileSize, setFileSize] = useState('5');
  const [fileUnit, setFileUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speedMbps, setSpeedMbps] = useState('50'); // 50 Mbps

  const [result, setResult] = useState<{
    seconds: number;
    formatted: string;
  }>({
    seconds: 819.2,
    formatted: '13 mins 39 secs',
  });

  const handleCalculate = () => {
    const size = parseFloat(fileSize);
    const speed = parseFloat(speedMbps);

    if (isNaN(size) || isNaN(speed) || size <= 0 || speed <= 0) return;

    // Convert size to Megabits (Mb)
    // 1 Byte = 8 bits
    let sizeInMegabytes = size;
    if (fileUnit === 'GB') sizeInMegabytes = size * 1024;
    if (fileUnit === 'TB') sizeInMegabytes = size * 1024 * 1024;

    const sizeInMegabits = sizeInMegabytes * 8;
    const totalSeconds = sizeInMegabits / speed;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.round(totalSeconds % 60);

    let formatted = '';
    if (hrs > 0) formatted += `${hrs} hrs `;
    if (mins > 0 || hrs > 0) formatted += `${mins} mins `;
    formatted += `${secs} secs`;

    setResult({
      seconds: parseFloat(totalSeconds.toFixed(1)),
      formatted: formatted.trim(),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Data Transfer Speed Equation', bn: 'ডাটা ট্রান্সফার ও ডাউনলোড সময় সূত্র' },
        expression: 'সময় (সেকেন্ড) = (ফাইল সাইজ মেগাবাইটে × ৮) ÷ ইন্টারনেট স্পিড (Mbps)',
        explanation: {
          en: 'Converts file size into Megabits (1 Byte = 8 bits) and divides by bandwidth throughput speed.',
          bn: 'ফাইলের বাইটকে বিটে রূপান্তর করে (১ বাইট = ৮ বিট) আপনার ইন্টারনেট ব্যান্ডউইথ দিয়ে ভাগ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ফাইলের আকার (File Size)' : 'File Size'}
            </label>
            <input
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'একক (Unit)' : 'Unit'}
            </label>
            <select
              value={fileUnit}
              onChange={(e) => setFileUnit(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="MB">MB (Megabytes)</option>
              <option value="GB">GB (Gigabytes)</option>
              <option value="TB">TB (Terabytes)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ইন্টারনেট স্পিড (Mbps)' : 'Internet Speed (Mbps)'}
            </label>
            <input
              type="number"
              value={speedMbps}
              onChange={(e) => setSpeedMbps(e.target.value)}
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {language === 'bn' ? 'আনুমানিক ট্রান্সফার সময়' : 'Estimated Transfer Time'}
            </span>
            <div className="mt-1 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {result.formatted}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Total: {result.seconds} seconds
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
