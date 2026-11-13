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
  SOFTWARE_TESTING_QUESTIONS,
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
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
};

const normalizeAnswer = (value) => String(value ?? '').trim();

const arraysEqual = (left = [], right = []) => {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((item, index) => item === sortedRight[index]);
};

const getBlankAnswers = (answer, expectedCount) =>
  Array.from({ length: expectedCount }, (_, index) => answer?.[index] ?? '');

const isQuestionAnswered = (question, answer) => {
  if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.MULTIPLE_CHOICE) {
    return Array.isArray(answer) && answer.length > 0;
  }

  if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.FILL_BLANK) {
    return getBlankAnswers(answer, question.answer.length)
      .every((item) => normalizeAnswer(item).length > 0);
  }

  return normalizeAnswer(answer).length > 0;
};

const isObjectiveCorrect = (question, answer) => {
  if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE) return false;
  if (!isQuestionAnswered(question, answer)) return false;

  if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.MULTIPLE_CHOICE) {
    return arraysEqual(answer, question.answer);
  }

  if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.FILL_BLANK) {
    const userAnswers = getBlankAnswers(answer, question.answer.length);
    return question.answer.every(
      (correctAnswer, index) =>
        normalizeAnswer(userAnswers[index]) === normalizeAnswer(correctAnswer),
    );
  }

  return normalizeAnswer(answer) === normalizeAnswer(question.answer);
};

const formatCorrectAnswer = (question) => {
  if (Array.isArray(question.answer)) return question.answer.join('、');
  return question.answer || '题库未提供参考答案';
};

const serializeAnswer = (value) => {
  if (Array.isArray(value)) return value.map((item) => normalizeAnswer(item)).join(',');
  return String(value ?? '');
};

const calculateScore = (correctCount, totalCount) => {
  if (!totalCount) return 0;
  return Number(((correctCount / totalCount) * 100).toFixed(2));
};

const SoftwareTestingSetExam = ({ set }) => {
  const questions = useMemo(
    () => SOFTWARE_TESTING_QUESTIONS.filter((question) => question.setId === set.setId),
    [set.setId],
  );
  const [currentIndex, setCurrentIndex] = useState(() => {
    const practiceQuestionId = sessionStorage.getItem('softwareTestingPracticeQuestionId');
    sessionStorage.removeItem('softwareTestingPracticeQuestionId');
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
    () => questions.filter((question) => isQuestionAnswered(question, answers[question.id])).length,
    [answers, questions],
  );

  const objectiveCorrectCount = useMemo(
    () =>
      questions.filter(
        (question) =>
          question.type !== SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE
          && isObjectiveCorrect(question, answers[question.id]),
      ).length,
    [answers, questions],
  );

  const subjectiveQuestions = useMemo(
    () =>
      questions.filter(
        (question) => question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE,
      ),
    [questions],
  );
  const subjectiveAssessedCount = subjectiveQuestions.filter(
    (question) => typeof selfAssessments[question.id] === 'boolean',
  ).length;
  const subjectiveCorrectCount = subjectiveQuestions.filter(
    (question) => selfAssessments[question.id] === true,
  ).length;
  const correctCount = objectiveCorrectCount + subjectiveCorrectCount;
  const score = calculateScore(correctCount, questions.length);

  const typeStats = useMemo(
    () =>
      TYPE_ORDER.filter((type) => set.typeCounts[type] > 0).map((type) => {
        const typeQuestions = questions.filter((question) => question.type === type);
        return {
          type,
          label: SOFTWARE_TESTING_TYPE_LABELS[type],
          count: typeQuestions.length,
          answered: typeQuestions.filter((question) =>
            isQuestionAnswered(question, answers[question.id]),
          ).length,
        };
      }),
    [answers, questions, set.typeCounts],
  );

  const reviewQuestions = useMemo(
    () =>
      submitted
        ? questions.filter((question) => {
          if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE) {
            return selfAssessments[question.id] === false;
          }
          return isQuestionAnswered(question, answers[question.id])
            && !isObjectiveCorrect(question, answers[question.id]);
        })
        : [],
    [answers, questions, selfAssessments, submitted],
  );

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
        document.getElementById(`software-testing-question-${questions[nextIndex].id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const updateAnswer = (question, value) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const handleChoice = (question, letter) => {
    if (submitted) return;

    if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.MULTIPLE_CHOICE) {
      const selected = answers[question.id] ?? [];
      const next = selected.includes(letter)
        ? selected.filter((item) => item !== letter)
        : [...selected, letter].sort();
      updateAnswer(question, next);
      return;
    }

    updateAnswer(question, letter);
  };

  const handleBlankAnswer = (question, blankIndex, value) => {
    const current = getBlankAnswers(answers[question.id], question.answer.length);
    current[blankIndex] = value;
    updateAnswer(question, current);
  };

  const handleSubmit = () => {
    if (!window.confirm(`本卷已答 ${answeredCount} / ${questions.length} 题，确定交卷吗？`)) return;
    setSubmitted(true);
  };

  const handleSelfAssessment = (questionId, correct) => {
    setSelfAssessments((current) => ({ ...current, [questionId]: correct }));
    setSaveResult(null);
    setSaveError('');
  };

  const handleRestart = () => {
    if (!window.confirm('确定重新开始本套练习吗？当前页面中的作答和自评会被清空。')) return;
    setAnswers({});
    setSelfAssessments({});
    setSubmitted(false);
    setElapsedSeconds(0);
    setCurrentIndex(0);
    setSaveResult(null);
    setSaveError('');
  };

  const handleSaveResult = async () => {
    if (subjectiveAssessedCount !== subjectiveQuestions.length) {
      const firstUnassessedIndex = questions.findIndex(
        (question) =>
          question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE
          && typeof selfAssessments[question.id] !== 'boolean',
      );
      if (firstUnassessedIndex >= 0) goToQuestion(firstUnassessedIndex);
      alert(`请先完成本套全部简答题自评：${subjectiveAssessedCount} / ${subjectiveQuestions.length}`);
      return;
    }

    setSavingResult(true);
    setSaveError('');
    try {
      const payload = {
        durationSeconds: elapsedSeconds,
        answers: questions.map((question) => {
          const subjective = question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE;
          const correct = subjective
            ? selfAssessments[question.id] === true
            : isObjectiveCorrect(question, answers[question.id]);
          return {
            questionId: question.id,
            questionNumber: question.globalNumber,
            setId: set.setId,
            setOrder: set.order,
            setTitle: set.title,
            questionType: question.type,
            content: question.stem,
            options: question.options,
            userAnswer: serializeAnswer(answers[question.id]),
            correctAnswer: serializeAnswer(question.answer),
            analysis: question.analysis,
            correct,
            selfAssessed: subjective && typeof selfAssessments[question.id] === 'boolean',
          };
        }),
      };
      const { data } = await axiosInstance.post(
        `/software-testing-exam/sets/${set.setId}/submit`,
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
    const answer = answers[question.id];

    if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.FILL_BLANK) {
      const blankAnswers = getBlankAnswers(answer, question.answer.length);
      return (
        <div className="space-y-3">
          {question.answer.map((_, index) => (
            <label key={`${question.id}-blank-${index}`} className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">
                {question.answer.length > 1 ? `第 ${index + 1} 空` : '答案'}
              </span>
              <input
                value={blankAnswers[index]}
                disabled={submitted}
                onChange={(event) => handleBlankAnswer(question, index, event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100"
                placeholder="填写答案"
              />
            </label>
          ))}
        </div>
      );
    }

    if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE) {
      return (
        <textarea
          value={answer ?? ''}
          disabled={submitted}
          maxLength={2000}
          onChange={(event) => updateAnswer(question, event.target.value)}
          rows={8}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100"
          placeholder="在此填写答案"
        />
      );
    }

    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const letter =
            question.type === SOFTWARE_TESTING_QUESTION_TYPES.TRUE_FALSE
              ? option
              : OPTION_LETTERS[index];
          const selected =
            question.type === SOFTWARE_TESTING_QUESTION_TYPES.MULTIPLE_CHOICE
              ? (answer ?? []).includes(letter)
              : answer === letter;
          const correctAfterSubmit =
            submitted
            && (question.type === SOFTWARE_TESTING_QUESTION_TYPES.MULTIPLE_CHOICE
              ? question.answer.includes(letter)
              : question.answer === letter);

          return (
            <button
              type="button"
              key={`${question.id}-${letter}`}
              disabled={submitted}
              onClick={() => handleChoice(question, letter)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition disabled:cursor-default ${
                selected
                  ? 'border-teal-500 bg-teal-50 text-teal-950'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-teal-400 hover:bg-teal-50'
              } ${correctAfterSubmit ? 'border-emerald-500 bg-emerald-50' : ''}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                  selected
                    ? 'border-teal-600 bg-teal-600 text-white'
                    : 'border-slate-300 bg-white text-slate-500'
                } ${correctAfterSubmit ? 'border-emerald-600 bg-emerald-600 text-white' : ''}`}
              >
                {question.type === SOFTWARE_TESTING_QUESTION_TYPES.TRUE_FALSE
                  ? option
                  : OPTION_LETTERS[index]}
              </span>
              <span className="min-w-0 flex-1 whitespace-pre-wrap leading-7">{option}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderQuestionResult = (question) => {
    if (!submitted) return null;

    if (question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE) {
      const assessment = selfAssessments[question.id];
      return (
        <div className="mt-6 space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-950">
              <FileQuestion className="h-4 w-4" />
              参考答案
            </div>
            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-3 text-sm leading-7 text-slate-700">
              {formatCorrectAnswer(question)}
            </p>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-amber-950">自评结果</div>
            <div className="grid gap-3 sm:grid-cols-2">
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

    const correct = isObjectiveCorrect(question, answers[question.id]);
    return (
      <div className={`mt-6 rounded-lg border p-4 ${
        correct ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
      }`}
      >
        <div className={`mb-2 flex items-center gap-2 font-semibold ${
          correct ? 'text-emerald-800' : 'text-rose-800'
        }`}
        >
          {correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {correct ? '回答正确' : '回答错误'}
        </div>
        <p className="text-sm leading-6 text-slate-700">
          正确答案：
          <span className="font-semibold text-slate-950">{formatCorrectAnswer(question)}</span>
        </p>
        {question.analysis && (
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {question.analysis}
          </p>
        )}
      </div>
    );
  };

  const renderQuestionCard = (question, index) => (
    <div
      id={`software-testing-question-${question.id}`}
      key={question.id}
      className="scroll-mt-20 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-teal-100 px-2.5 py-1 text-sm font-bold text-teal-800">
            {SOFTWARE_TESTING_TYPE_LABELS[question.type]}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
            本卷第 {index + 1} 题
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-500">
            原题号 {question.numberInSet}
          </span>
        </div>
        <h2 className="mt-4 whitespace-pre-wrap text-lg font-semibold leading-8 text-slate-950 sm:text-xl">
          {index + 1}. {question.stem}
        </h2>
      </div>

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
              to="/software-testing-exam"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-900"
            >
              <ArrowLeft className="h-4 w-4" />
              返回套卷选择
            </Link>
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-teal-700">
              <BookOpen className="h-4 w-4" />
              第 {set.order} 套 · 软件测试
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
              {set.title}
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">已答</div>
              <div className="mt-1 text-lg font-bold">
                {answeredCount} / {questions.length}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">正确</div>
              <div className="mt-1 text-lg font-bold">{submitted ? correctCount : '-'}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                已用时
              </div>
              <div className="mt-1 font-mono text-lg font-bold">
                {formatElapsedTime(elapsedSeconds)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="min-w-0 space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {typeStats.map((item) => (
              <div key={item.type} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-xl font-bold">{item.count}</span>
                  <span className="text-xs text-slate-500">{item.answered}/{item.count}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal-500"
                    style={{ width: `${item.count ? (item.answered / item.count) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="font-semibold text-slate-900">答题显示方式</div>
            <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${
                  viewMode === 'single'
                    ? 'bg-white text-teal-700 shadow-sm'
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
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutList className="h-4 w-4" />
                整卷预览
              </button>
            </div>
          </div>

          {submitted && (
            <div
              data-testid="software-testing-score-report"
              className="rounded-lg border border-teal-200 bg-teal-50 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-lg font-bold text-teal-950">
                    <Award className="h-5 w-5" />
                    本卷成绩
                  </div>
                  <p className="mt-1 text-sm leading-6 text-teal-800">
                    客观题答对 {objectiveCorrectCount} 题；简答题自评 {subjectiveAssessedCount} / {subjectiveQuestions.length}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-teal-700">当前分数</div>
                  <div data-testid="software-testing-final-score" className="text-4xl font-black text-teal-950">
                    {score}
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-teal-200 pt-4">
                {saveResult ? (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700">
                    <CloudCheck className="h-5 w-5" />
                    成绩与错题本已保存，记录编号 #{saveResult.recordId}，本次保存错题 {saveResult.wrongQuestionsSaved} 道
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={savingResult || subjectiveAssessedCount !== subjectiveQuestions.length}
                    onClick={handleSaveResult}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {savingResult ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                    {savingResult ? '保存中' : '保存成绩与错题本'}
                  </button>
                )}
                {saveError && (
                  <p className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {saveError}
                  </p>
                )}
              </div>
              {reviewQuestions.length > 0 && (
                <div className="mt-4 rounded-lg bg-white p-3">
                  <div className="mb-2 text-sm font-semibold text-slate-700">错题回顾</div>
                  <div className="flex flex-wrap gap-2">
                    {reviewQuestions.map((question) => {
                      const index = questions.findIndex((item) => item.id === question.id);
                      return (
                        <button
                          key={question.id}
                          type="button"
                          onClick={() => goToQuestion(index)}
                          className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm font-medium text-rose-700 hover:bg-rose-100"
                        >
                          第 {index + 1} 题
                        </button>
                      );
                    })}
                  </div>
                </div>
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
                data-action="submit-software-testing-exam"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
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
                <CheckSquare className="h-5 w-5 text-teal-700" />
                本卷答题卡
              </div>
              <span className="text-sm text-slate-500">{answeredCount} / {questions.length}</span>
            </div>
            <div className="grid grid-cols-7 gap-2 sm:grid-cols-10 xl:grid-cols-7">
              {questions.map((question, index) => {
                const active = index === currentIndex;
                const answered = isQuestionAnswered(question, answers[question.id]);
                const objectiveCorrect =
                  submitted
                  && question.type !== SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE
                  && isObjectiveCorrect(question, answers[question.id]);
                const objectiveWrong =
                  submitted
                  && question.type !== SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE
                  && answered
                  && !objectiveCorrect;
                const assessment = selfAssessments[question.id];
                return (
                  <button
                    key={question.id}
                    type="button"
                    title={`本卷第 ${index + 1} 题，原题号 ${question.numberInSet}`}
                    onClick={() => goToQuestion(index)}
                    className={`aspect-square rounded-md border text-xs font-bold transition ${
                      active
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : answered
                          ? 'border-teal-200 bg-teal-50 text-teal-800'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-teal-300'
                    } ${objectiveCorrect || assessment === true ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : ''}
                    ${objectiveWrong || assessment === false ? 'border-rose-300 bg-rose-50 text-rose-700' : ''}`}
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
              评分说明
            </div>
            客观题自动判分；简答题交卷后自评；最终按正确题数 ÷ {questions.length} × 100 计算。
          </div>
        </aside>
      </div>
    </div>
  );
};

const SoftwareTestingExam = () => {
  const { setId } = useParams();
  const set = SOFTWARE_TESTING_SETS.find((item) => item.setId === setId);

  if (!set) {
    return <Navigate to="/software-testing-exam" replace />;
  }

  return <SoftwareTestingSetExam key={set.setId} set={set} />;
};

export default SoftwareTestingExam;
