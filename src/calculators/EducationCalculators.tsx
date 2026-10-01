import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Plus, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

export const GPACalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'gpa-calculator')!;

  const [scale, setScale] = useState<'4.0' | '5.0'>('4.0');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', gradePoint: 4.0, credits: 3 },
    { id: '2', name: 'Course 2', gradePoint: 3.75, credits: 3 },
    { id: '3', name: 'Course 3', gradePoint: 3.5, credits: 3 },
    { id: '4', name: 'Course 4', gradePoint: 4.0, credits: 1.5 },
  ]);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `Course ${prev.length + 1}`,
        gradePoint: scale === '4.0' ? 4.0 : 5.0,
        credits: 3,
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: 'gradePoint' | 'credits', val: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);
  const totalPoints = courses.reduce((sum, c) => sum + (c.gradePoint || 0) * (c.credits || 0), 0);
  const gpa = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Weighted GPA Formula', bn: 'জিপিএ (GPA) নির্ণয়ের সূত্র' },
        expression: 'GPA = Σ(Course Grade Points × Credit Hours) / Σ(Total Credit Hours)',
        explanation: {
          en: 'Calculates the credit-weighted grade point average across academic subjects.',
          bn: 'প্রতিটি কোর্সের ক্রেডিট আওয়ারকে প্রাপ্ত গ্রেড পয়েন্ট দিয়ে গুণ করে মোট ক্রেডিট আওয়ার দিয়ে ভাগ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'গ্রেডিং স্কেল' : 'Grading Scale'}:
            </label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value as any)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="4.0">4.0 Scale (University / Engineering)</option>
              <option value="5.0">5.0 Scale (HSC / SSC / College)</option>
            </select>
          </div>

          <button
            onClick={addCourse}
            className="flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{language === 'bn' ? 'বিষয় যোগ করুন' : 'Add Subject'}</span>
          </button>
        </div>

        {/* Course rows */}
        <div className="space-y-2.5">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <span className="w-6 text-center text-xs font-bold text-slate-400">{idx + 1}</span>
              <div className="flex-1">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) =>
                    setCourses((prev) =>
                      prev.map((c) => (c.id === course.id ? { ...c, name: e.target.value } : c))
                    )
                  }
                  className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none"
                  placeholder="Subject"
                />
              </div>

              <div className="w-28">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={scale === '4.0' ? 4 : 5}
                  value={course.gradePoint}
                  onChange={(e) => updateCourse(course.id, 'gradePoint', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-900"
                  placeholder="Grade Pt"
                />
              </div>

              <div className="w-24">
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-center text-xs font-bold dark:border-slate-700 dark:bg-slate-900"
                  placeholder="Credits"
                />
              </div>

              <button
                onClick={() => removeCourse(course.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* GPA Result Card */}
        <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {language === 'bn' ? 'অর্জিত সেমিস্টার জিপিএ' : 'Calculated Semester GPA'}
              </span>
              <div className="mt-1 text-3xl sm:text-4xl font-black text-blue-700 dark:text-blue-300">
                {gpa.toFixed(2)}{' '}
                <span className="text-base font-semibold text-slate-500">/ {scale}</span>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500 dark:text-slate-400">
              <div>
                {language === 'bn' ? 'মোট ক্রেডিট:' : 'Total Credits:'}{' '}
                <span className="font-bold text-slate-800 dark:text-slate-200">{totalCredits}</span>
              </div>
              <div className="mt-0.5">
                {language === 'bn' ? 'মোট পয়েন্ট:' : 'Total Points:'}{' '}
                <span className="font-bold text-slate-800 dark:text-slate-200">{totalPoints.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

// Attendance Calculator
export const AttendanceCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'attendance-calculator')!;

  const [attended, setAttended] = useState('32');
  const [totalClasses, setTotalClasses] = useState('40');
  const [targetPct, setTargetPct] = useState('75');

  const [result, setResult] = useState<{
    pct: number;
    classesNeeded: number;
    canBunk: number;
  }>({
    pct: 80.0,
    classesNeeded: 0,
    canBunk: 2,
  });

  const handleCalculate = () => {
    const a = parseInt(attended, 10);
    const tot = parseInt(totalClasses, 10);
    const target = parseFloat(targetPct) || 75;

    if (isNaN(a) || isNaN(tot) || tot <= 0 || a < 0 || a > tot) return;

    const pct = (a / tot) * 100;

    let classesNeeded = 0;
    let canBunk = 0;

    if (pct < target) {
      // Need: (a + x) / (tot + x) >= target/100  =>  x >= (target*tot - 100*a) / (100 - target)
      classesNeeded = Math.ceil((target * tot - 100 * a) / (100 - target));
    } else {
      // Can miss: a / (tot + y) >= target/100  =>  y <= (100*a - target*tot) / target
      canBunk = Math.floor((100 * a - target * tot) / target);
    }

    setResult({
      pct: parseFloat(pct.toFixed(2)),
      classesNeeded: Math.max(0, classesNeeded),
      canBunk: Math.max(0, canBunk),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Attendance Percentage & Target Formula', bn: 'উপস্থিতির হার ও লক্ষ্যমাত্রা সূত্র' },
        expression: 'Attendance % = (Attended Classes / Total Classes) × 100',
        explanation: {
          en: 'Calculates your current attendance status and exactly how many consecutive upcoming classes you must attend to satisfy exam requirements.',
          bn: 'বর্তমানে ক্লাসে উপস্থিতির শতকরা হার এবং পরীক্ষায় বসার যোগ্যতা (যেমন ৭৫%) অর্জনে আরও কত ক্লাস করতে হবে তা নির্ধারণ করে।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'উপস্থিত ক্লাসের সংখ্যা' : 'Attended Classes'}
            </label>
            <input
              type="number"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মোট ক্লাস অনুষ্ঠিত' : 'Total Classes Held'}
            </label>
            <input
              type="number"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'প্রয়োজনীয় লক্ষ্যমাত্রা (%)' : 'Required Target (%)'}
            </label>
            <input
              type="number"
              value={targetPct}
              onChange={(e) => setTargetPct(e.target.value)}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {language === 'bn' ? 'বর্তমান উপস্থিতির হার' : 'Current Attendance'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {result.pct}%
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right">
                {result.pct >= parseFloat(targetPct) ? (
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {language === 'bn' ? 'আপনি নিরাপদ জোনে আছেন!' : 'Target Satisfied!'}
                    </span>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {language === 'bn'
                        ? `আপনি আরও ${result.canBunk} টি ক্লাস ছুটি নিতে পারেন`
                        : `You can miss ${result.canBunk} more classes`}
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      {language === 'bn' ? 'উপস্থিতি ঘাটতি রয়েছে' : 'Attendance Shortage'}
                    </span>
                    <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                      {language === 'bn'
                        ? `${targetPct}% অর্জনে টানা ${result.classesNeeded} টি ক্লাসে উপস্থিত থাকতে হবে`
                        : `Attend next ${result.classesNeeded} classes consecutively`}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
