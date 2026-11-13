import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Image,
  Layers3,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECT_MANAGEMENT_CHAPTERS } from './projectManagementQuestions';

const ProjectManagementExamIndex = () => (
  <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-700 to-indigo-700 p-6 text-white shadow-lg sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-100">
          <BookOpen className="h-4 w-4" />
          软件项目管理与 CMMI
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">项目管理章节考试</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100 sm:text-base">
          题库按知识模块拆分为八套试卷。每套独立计时、评分并保存成绩，主观题在交卷后对照参考答案自评。
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1.5">8 套章节卷</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5">共 391 题</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5">385 题计分</span>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PROJECT_MANAGEMENT_CHAPTERS.map((chapter) => (
          <article
            key={chapter.chapter}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 font-black text-violet-700">
                {chapter.chapter}
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                原题 {chapter.startQuestionNumber}-{chapter.endQuestionNumber}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-950">{chapter.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <FileText className="h-4 w-4 text-violet-600" />
                {chapter.totalCount} 题
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {chapter.scoredCount} 题计分
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <Layers3 className="h-4 w-4 text-cyan-600" />
                {chapter.objectiveCount} 道客观题
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <BookOpen className="h-4 w-4 text-amber-600" />
                {chapter.subjectiveCount} 道主观题
              </div>
            </div>
            {chapter.imageCount > 0 && (
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Image className="h-4 w-4" />
                含 {chapter.imageCount} 张题图
              </div>
            )}
            <Link
              to={`/project-management-exam/${chapter.chapter}`}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              进入第 {chapter.chapter} 套
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectManagementExamIndex;
