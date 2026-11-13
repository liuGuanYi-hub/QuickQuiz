import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Layers3,
  PencilLine,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  SOFTWARE_TESTING_QUESTION_TYPES,
  SOFTWARE_TESTING_SETS,
  SOFTWARE_TESTING_TYPE_LABELS,
} from './softwareTestingQuestions';

const TYPE_ORDER = [
  SOFTWARE_TESTING_QUESTION_TYPES.SINGLE_CHOICE,
  SOFTWARE_TESTING_QUESTION_TYPES.MULTIPLE_CHOICE,
  SOFTWARE_TESTING_QUESTION_TYPES.TRUE_FALSE,
  SOFTWARE_TESTING_QUESTION_TYPES.FILL_BLANK,
  SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE,
];

const totalQuestionCount = SOFTWARE_TESTING_SETS.reduce(
  (sum, set) => sum + set.totalCount,
  0,
);

const SoftwareTestingExamIndex = () => (
  <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
          <BookOpen className="h-4 w-4" />
          软件测试题库
        </div>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              软件测试分套考试
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-medium text-slate-500">套卷</div>
              <div className="mt-1 text-xl font-bold text-slate-950">
                {SOFTWARE_TESTING_SETS.length}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-medium text-slate-500">题量</div>
              <div className="mt-1 text-xl font-bold text-slate-950">
                {totalQuestionCount}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-medium text-slate-500">题型</div>
              <div className="mt-1 text-xl font-bold text-slate-950">
                {TYPE_ORDER.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SOFTWARE_TESTING_SETS.map((set) => (
          <article
            key={set.setId}
            className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 font-black text-teal-700">
                {set.order}
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {set.totalCount} 题
              </span>
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">{set.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <FileText className="h-4 w-4 text-teal-600" />
                {set.totalCount} 道题
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {set.objectiveCount} 客观题
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <Layers3 className="h-4 w-4 text-cyan-600" />
                {Object.values(set.typeCounts).filter(Boolean).length} 类题型
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <PencilLine className="h-4 w-4 text-amber-600" />
                {set.subjectiveCount} 简答题
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {TYPE_ORDER.filter((type) => set.typeCounts[type] > 0).map((type) => (
                <span
                  key={type}
                  className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700"
                >
                  {SOFTWARE_TESTING_TYPE_LABELS[type]} {set.typeCounts[type]}
                </span>
              ))}
            </div>

            <Link
              to={`/software-testing-exam/${set.setId}`}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700"
            >
              进入第 {set.order} 套
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default SoftwareTestingExamIndex;
