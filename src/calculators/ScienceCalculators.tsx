import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Atom, Gauge } from 'lucide-react';

export const PhysicsMotionCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'physics-motion-force')!;

  const [distance, setDistance] = useState('100'); // meters
  const [time, setTime] = useState('9.58'); // seconds (Usain Bolt world record!)
  const [mass, setMass] = useState('75'); // kg

  const [physics, setPhysics] = useState<{
    speedMps: number;
    speedKmph: number;
    kineticEnergy: number;
  }>({
    speedMps: 10.44,
    speedKmph: 37.58,
    kineticEnergy: 4087.26,
  });

  const handleCalculate = () => {
    const d = parseFloat(distance);
    const tm = parseFloat(time);
    const m = parseFloat(mass) || 1;

    if (isNaN(d) || isNaN(tm) || d <= 0 || tm <= 0) return;

    // Speed v = d / t (m/s)
    const v = d / tm;
    const kmph = v * 3.6;
    // Kinetic Energy E_k = 0.5 * m * v^2 (Joules)
    const ke = 0.5 * m * (v * v);

    setPhysics({
      speedMps: parseFloat(v.toFixed(2)),
      speedKmph: parseFloat(kmph.toFixed(2)),
      kineticEnergy: parseFloat(ke.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Classical Mechanics Equations', bn: 'গতি ও গতিশক্তি সূত্র' },
        expression: 'v = d / t   |   km/h = v × 3.6   |   Eₖ = ½ m v²',
        explanation: {
          en: 'Calculates linear speed in meters per second and kilometers per hour, plus kinetic energy in Joules.',
          bn: 'দূরত্বকে সময় দিয়ে ভাগ করে দ্রুতি (বেগ) এবং বস্তুটির ভর সাপেক্ষে গতিশক্তি (জুল) নির্ণয় করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'দূরত্ব (মিটার - m)' : 'Distance (Meters)'}
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
              {language === 'bn' ? 'সময় (সেকেন্ড - s)' : 'Time (Seconds)'}
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ভর (কেজি - kg)' : 'Mass (kg)'}
            </label>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
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

        {physics && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-cyan-50/70 p-4 text-center dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/60">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                {language === 'bn' ? 'গতিবেগ (কিমি/ঘণ্টা)' : 'Speed (km/h)'}
              </span>
              <div className="mt-1 text-3xl font-black text-cyan-700 dark:text-cyan-300">
                {physics.speedKmph} <span className="text-sm font-semibold">km/h</span>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50/70 p-4 text-center dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                {language === 'bn' ? 'গতিবেগ (মিটার/সেকেন্ড)' : 'Speed (m/s)'}
              </span>
              <div className="mt-1 text-3xl font-black text-blue-700 dark:text-blue-400">
                {physics.speedMps} <span className="text-sm font-semibold">m/s</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 text-center dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'গতিশক্তি (Kinetic Energy)' : 'Kinetic Energy'}
              </span>
              <div className="mt-1 text-3xl font-black text-slate-800 dark:text-slate-200">
                {physics.kineticEnergy.toLocaleString()} <span className="text-sm font-semibold">J</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
