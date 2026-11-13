import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudCheck,
  FileQuestion,
  LayoutList,
  Loader2,
  RotateCcw,
  Save,
  Send,
  Square,
  XCircle,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  PROJECT_MANAGEMENT_CHAPTERS,
  PROJECT_MANAGEMENT_QUESTIONS,
  PROJECT_MANAGEMENT_QUESTION_TYPES,
} from './projectManagementQuestions';
import {
  calculateProjectManagementScore,
  isProjectManagementObjectiveCorrect,
  isProjectManagementQuestionAnswered,
} from './projectManagementExamUtils';

const TYPE_LABELS = {
  [PROJECT_MANAGEMENT_QUESTION_TYPES.SINGLE_CHOICE]: '单选题',
  [PROJECT_MANAGEMENT_QUESTION_TYPES.TRUE_FALSE]: '判断题',
  [PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE]: '填空 / 简答题',
};
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
};

const ProjectManagementChapterExam = ({ chapter }) => {
  const questions = useMemo(
    () => PROJECT_MANAGEMENT_QUESTIONS.filter((question) => question.module === chapter.title),
    [chapter.title],
  );
  const [currentIndex, setCurrentIndex] = useState(() => {
    const practiceQuestionId = sessionStorage.getItem('projectManagementPracticeQuestionId');
    sessionStorage.removeItem('projectManagementPracticeQuestionId');
    const practiceIndex = questions.findIndex((question) => question.id === practiceQuestionId);
    return practiceIndex >= 0 ? practiceIndex : 0;
  });
  const [answers, setAnswers] = useState({});
  const [selfAssessments, setSelfAssessments] = useState({});
  const [viewMode, setViewMode] = useState('single');
  const [submitted, setSubmitted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [savingResult, setSavingResult] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [saveError, setSaveError] = useState('');

  const currentQuestion = questions[currentIndex];

  const answeredCount = useMemo(
    () =>
      questions.filter((question) =>
        isProjectManagementQuestionAnswered(question, answers[question.id]),
      ).length,
    [answers, questions],
  );
  const objectiveCorrectCount = useMemo(
    () =>
      questions.filter(
        (question) =>
          question.type !== PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE
          && isProjectManagementObjectiveCorrect(question, answers[question.id]),
      ).length,
    [answers, questions],
  );
  const subjectiveAssessedCount = useMemo(
    () =>
      questions.filter(
        (question) =>
          question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE
          && question.scored
          && typeof selfAssessments[question.id] === 'boolean',
      ).length,
    [questions, selfAssessments],
  );
  const subjectiveCorrectCount = useMemo(
    () => Object.values(selfAssessments).filter((value) => value === true).length,
    [selfAssessments],
  );
  const score = calculateProjectManagementScore(
    objectiveCorrectCount + subjectiveCorrectCount,
    chapter.scoredCount,
  );
  const unscoredCount = chapter.totalCount - chapter.scoredCount;

  useEffect(() => {
    if (submitted) return undefined;
    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [submitted]);

  const goToQuestion = (index) => {
    const nextIndex = Math.min(questions.length - 1, Math.max(0, index));
    setCurrentIndex(nextIndex);
    if (viewMode === 'preview') {
      window.requestAnimationFrame(() => {
        document.getElementById(`pm-question-${questions[nextIndex].id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const updateAnswer = (question, value) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const handleSubmit = () => {
    if (!window.confirm(
      `本卷已答 ${answeredCount} / ${questions.length} 题，交卷后将进入主观题自评，确定交卷吗？`,
    )) return;
    setSubmitted(true);
  };

  const handleSelfAssessment = (questionId, correct) => {
    setSelfAssessments((current) => ({ ...current, [questionId]: correct }));
    setSaveResult(null);
    setSaveError('');
  };

  const handleRestart = () => {
    if (!window.confirm('确定重新开始本套章节卷吗？当前页面中的作答和自评会被清空。')) return;
    setAnswers({});
    setSelfAssessments({});
    setSubmitted(false);
    setElapsedSeconds(0);
    setCurrentIndex(0);
    setSaveResult(null);
    setSaveError('');
  };

  const handleSaveResult = async () => {
    if (subjectiveAssessedCount !== chapter.subjectiveScoredCount) {
      const firstUnassessedIndex = questions.findIndex(
        (question) =>
          question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE
          && question.scored
          && typeof selfAssessments[question.id] !== 'boolean',
      );
      if (firstUnassessedIndex >= 0) goToQuestion(firstUnassessedIndex);
      alert(`请先完成本卷全部主观题自评：${subjectiveAssessedCount} / ${chapter.subjectiveScoredCount}`);
      return;
    }

    setSavingResult(true);
    setSaveError('');
    try {
      const payload = {
        durationSeconds: elapsedSeconds,
        answers: questions.map((question) => {
          const objective = question.type !== PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE;
          const correct = question.scored && (
            objective
              ? isProjectManagementObjectiveCorrect(question, answers[question.id])
              : selfAssessments[question.id] === true
          );
          return {
            questionId: question.id,
            questionNumber: question.number,
            moduleIndex: chapter.chapter,
            moduleTitle: chapter.title,
            questionType: question.type,
            content: question.stem,
            options: question.options,
            userAnswer: String(answers[question.id] ?? ''),
            correctAnswer: question.answer,
            analysis: question.analysis,
            scored: question.scored,
            correct,
            selfAssessed:
              question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE
              && question.scored
              && typeof selfAssessments[question.id] === 'boolean',
          };
        }),
      };
      const { data } = await axiosInstance.post(
        `/project-management-exam/chapters/${chapter.chapter}/submit`,
        payload,
      );
      setSaveResult(data);
    } catch (error) {
      setSaveError(error.response?.data?.message || error.message || '保存失败，请稍后重试');
    } finally {
      setSavingResult(false);
    }
  };

  const renderAnswerInput = (question) => {
    const answer = answers[question.id] ?? '';
    if (question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE) {
      return (
        <textarea
          value={answer}
          disabled={submitted}
          maxLength={2000}
          onChange={(event) => updateAnswer(question, event.target.value)}
          rows={8}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-100"
          placeholder="在此填写答案"
        />
      );
    }

    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const value =
            question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.TRUE_FALSE
              ? option
              : OPTION_LETTERS[index];
          const selected = answer === value;
          const correctAfterSubmit = submitted && question.answer === value;
          return (
            <button
              type="button"
              key={`${value}-${option}`}
              disabled={submitted}
              onClick={() => updateAnswer(question, value)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition disabled:cursor-default ${
                selected
                  ? 'border-violet-500 bg-violet-50 text-violet-950'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-violet-400 hover:bg-violet-50'
              } ${correctAfterSubmit ? 'border-emerald-500 bg-emerald-50' : ''}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                  selected
                    ? 'border-violet-600 bg-violet-600 text-white'
                    : 'border-slate-300 bg-white text-slate-500'
                } ${correctAfterSubmit ? 'border-emerald-600 bg-emerald-600 text-white' : ''}`}
              >
                {question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.TRUE_FALSE
                  ? (index === 0 ? '对' : '错')
                  : OPTION_LETTERS[index]}
              </span>
              <span className="min-w-0 flex-1 leading-7">{option}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderQuestionResult = (question) => {
    if (!submitted) return null;

    if (question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE) {
      if (!question.scored) {
        return (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <FileQuestion className="h-5 w-5" />
              原题库未提供参考答案，本题保留展示但不计分
            </div>
          </div>
        );
      }

      const assessment = selfAssessments[question.id];
      return (
        <div className="mt-6 space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div>
            <div className="text-sm font-semibold text-amber-950">参考答案</div>
            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-3 text-sm leading-7 text-slate-700">
              {question.answer}
            </p>
          </div>
          {question.analysis && (
            <p className="rounded-lg bg-white p-3 text-sm leading-7 text-slate-600">
              {question.analysis}
            </p>
          )}
          <div>
            <div className="mb-2 text-sm font-semibold text-amber-950">对照参考答案进行自评</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelfAssessment(question.id, true)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-semibold transition ${
                  assessment === true
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
                自评正确
              </button>
              <button
                type="button"
                onClick={() => handleSelfAssessment(question.id, false)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-semibold transition ${
                  assessment === false
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-rose-200 bg-white text-rose-700 hover:bg-rose-50'
                }`}
              >
                <XCircle className="h-5 w-5" />
                自评错误
              </button>
            </div>
          </div>
        </div>
      );
    }

    const answer = answers[question.id] ?? '';
    const correct = isProjectManagementObjectiveCorrect(question, answer);
    return (
      <div className={`mt-6 rounded-lg border p-4 ${
        correct ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
      }`}>
        <div className={`mb-2 flex items-center gap-2 font-semibold ${
          correct ? 'text-emerald-800' : 'text-rose-800'
        }`}>
          {correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {correct ? '回答正确' : '回答错误'}
        </div>
        <p className="text-sm leading-6 text-slate-700">
          正确答案：<span className="font-semibold text-slate-950">{question.answer}</span>
        </p>
        {question.analysis && (
          <p className="mt-2 text-sm leading-7 text-slate-700">{question.analysis}</p>
        )}
      </div>
    );
  };

  const renderQuestionCard = (question, index) => (
    <div
      id={`pm-question-${question.id}`}
      key={question.id}
      className="scroll-mt-20 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-violet-100 px-2.5 py-1 text-sm font-bold text-violet-800">
            {TYPE_LABELS[question.type]}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
            本卷第 {index + 1} 题
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-500">
            原题号 {question.number}
          </span>
          {!question.scored && (
            <span className="rounded-md bg-amber-100 px-2.5 py-1 text-sm font-medium text-amber-800">
              不计分
            </span>
          )}
        </div>
        <h2 className="mt-4 text-lg font-semibold leading-8 text-slate-950 sm:text-xl">
          {index + 1}. {question.stem}
        </h2>
      </div>

      {question.images.length > 0 && (
        <div className="mb-6 grid gap-4">
          {question.images.map((image, imageIndex) => (
            <img
              key={image}
              src={image}
              alt={`原题 ${question.number} 题图 ${imageIndex + 1}`}
              className="max-h-[420px] max-w-full rounded-lg border border-slate-200 bg-white object-contain"
            />
          ))}
        </div>
      )}

      {renderAnswerInput(question)}
      {renderQuestionResult(question)}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <Link
              to="/project-management-exam"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-900"
            >
              <ArrowLeft className="h-4 w-4" />
              返回章节选择
            </Link>
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-violet-700">
              <BookOpen className="h-4 w-4" />
              第 {chapter.chapter} 套 · 软件项目管理与 CMMI
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
              {chapter.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              本卷 {chapter.totalCount} 题，其中 {chapter.scoredCount} 题计分
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">已答</div>
              <div className="mt-1 text-lg font-bold">{answeredCount} / {chapter.totalCount}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">计分题</div>
              <div className="mt-1 text-lg font-bold">{chapter.scoredCount}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                已用时
              </div>
              <div className="mt-1 font-mono text-lg font-bold">{formatElapsedTime(elapsedSeconds)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="min-w-0 space-y-5">
          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-slate-900">答题显示方式</div>
              <p className="mt-0.5 text-xs text-slate-500">整卷预览可在同一页面连续完成本章所有题目。</p>
            </div>
            <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${
                  viewMode === 'single'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Square className="h-4 w-4" />
                单题模式
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${
                  viewMode === 'preview'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutList className="h-4 w-4" />
                整卷预览
              </button>
            </div>
          </div>

          {submitted && (
            <div className="rounded-lg border border-violet-200 bg-violet-50 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-lg font-bold text-violet-950">
                    <Award className="h-5 w-5" />
                    本章成绩
                  </div>
                  <p className="mt-1 text-sm leading-6 text-violet-800">
                    客观题答对 {objectiveCorrectCount} / {chapter.objectiveCount}；
                    主观题自评 {subjectiveAssessedCount} / {chapter.subjectiveScoredCount}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-violet-700">当前分数</div>
                    <div className="text-4xl font-black text-violet-950">{score}</div>
                  </div>
                  {saveResult ? (
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700">
                      <CloudCheck className="h-5 w-5" />
                      已保存 #{saveResult.recordId}
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={savingResult || subjectiveAssessedCount !== chapter.subjectiveScoredCount}
                      onClick={handleSaveResult}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {savingResult ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      保存成绩
                    </button>
                  )}
                </div>
              </div>
              {saveError && (
                <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {saveError}
                </p>
              )}
            </div>
          )}

          {viewMode === 'single' ? (
            <>
              {renderQuestionCard(currentQuestion, currentIndex)}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => goToQuestion(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                  上一题
                </button>
                <button
                  type="button"
                  onClick={() => goToQuestion(currentIndex + 1)}
                  disabled={currentIndex === questions.length - 1}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  下一题
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-5">
              {questions.map((question, index) => renderQuestionCard(question, index))}
            </div>
          )}

          <div className="flex flex-col justify-center gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-5 w-5" />
              重新开始
            </button>
            {!submitted && (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
              >
                <Send className="h-5 w-5" />
                交卷
              </button>
            )}
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:self-start xl:overflow-y-auto xl:pr-1">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckSquare className="h-5 w-5 text-violet-700" />
                本卷答题卡
              </div>
              <span className="text-sm text-slate-500">{answeredCount} / {questions.length}</span>
            </div>
            <div className="grid grid-cols-7 gap-2 sm:grid-cols-10 xl:grid-cols-7">
              {questions.map((question, index) => {
                const active = index === currentIndex;
                const answered = isProjectManagementQuestionAnswered(question, answers[question.id]);
                const objectiveCorrect =
                  submitted
                  && question.type !== PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE
                  && isProjectManagementObjectiveCorrect(question, answers[question.id]);
                const objectiveWrong =
                  submitted
                  && question.type !== PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE
                  && !objectiveCorrect;
                const assessment = selfAssessments[question.id];
                return (
                  <button
                    key={question.id}
                    type="button"
                    title={`本卷第 ${index + 1} 题，原题号 ${question.number}`}
                    onClick={() => goToQuestion(index)}
                    className={`aspect-square rounded-md border text-xs font-bold transition ${
                      active
                        ? 'border-violet-600 bg-violet-600 text-white'
                        : answered
                          ? 'border-violet-200 bg-violet-50 text-violet-800'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-violet-300'
                    } ${objectiveCorrect || assessment === true ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : ''}
                    ${objectiveWrong || assessment === false ? 'border-rose-300 bg-rose-50 text-rose-700' : ''}
                    ${!question.scored && submitted ? 'border-slate-300 bg-slate-100 text-slate-500' : ''}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <div className="mb-1 flex items-center gap-2 font-bold">
              <AlertTriangle className="h-4 w-4" />
              本章评分说明
            </div>
            客观题自动判分；{chapter.subjectiveScoredCount} 道主观题需在交卷后自评；
            {unscoredCount} 道无参考答案题不计分。最终按正确数 ÷ {chapter.scoredCount} × 100 计算。
          </div>
        </aside>
      </div>
    </div>
  );
};

const ProjectManagementExam = () => {
  const { chapter: chapterParam } = useParams();
  const chapterNumber = Number(chapterParam);
  const chapter = PROJECT_MANAGEMENT_CHAPTERS.find((item) => item.chapter === chapterNumber);

  if (!chapter || String(chapterNumber) !== chapterParam) {
    return <Navigate to="/project-management-exam" replace />;
  }

  return <ProjectManagementChapterExam key={chapter.chapter} chapter={chapter} />;
};

export default ProjectManagementExam;
