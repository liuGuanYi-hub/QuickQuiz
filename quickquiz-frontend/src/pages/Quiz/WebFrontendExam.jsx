import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudCheck,
  Loader2,
  RotateCcw,
  Save,
  Send,
  XCircle,
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { QUESTION_TYPES, TYPE_META, WEB_EXAM_QUESTIONS } from './webExamQuestions';

const TYPE_ORDER = [
  QUESTION_TYPES.SINGLE_CHOICE,
  QUESTION_TYPES.MULTIPLE_CHOICE,
  QUESTION_TYPES.TRUE_FALSE,
  QUESTION_TYPES.FILL_BLANK,
  QUESTION_TYPES.OPERATION,
];

const TOTAL_SCORE = 100;
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const formatElapsedTime = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

const arraysEqual = (left = [], right = []) => {
  if (left.length !== right.length) return false;
  return [...left].sort().every((item, index) => item === [...right].sort()[index]);
};

const isAnswered = (question, answer) => {
  if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
    return Array.isArray(answer) && answer.length > 0;
  }
  return String(answer ?? '').trim().length > 0;
};

const isCorrect = (question, answer) => {
  if (question.type === QUESTION_TYPES.OPERATION) return false;
  if (!isAnswered(question, answer)) return false;

  if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
    return arraysEqual(answer, question.answer);
  }

  if (question.type === QUESTION_TYPES.FILL_BLANK) {
    return normalizeText(answer) === normalizeText(question.answer);
  }

  return answer === question.answer;
};

const getAutoScore = (questions, answers) =>
  questions.reduce((sum, question) => {
    if (question.type === QUESTION_TYPES.OPERATION) return sum;
    return sum + (isCorrect(question, answers[question.id]) ? question.score : 0);
  }, 0);

const getQuestionScore = (question, answers, operationScore) => {
  if (question.type === QUESTION_TYPES.OPERATION) return operationScore;
  return isCorrect(question, answers[question.id]) ? question.score : 0;
};

const clampOperationScore = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.min(20, Math.max(0, numeric));
};

const WebFrontendExam = () => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const practiceQuestionId = sessionStorage.getItem('webExamPracticeQuestionId');
    sessionStorage.removeItem('webExamPracticeQuestionId');
    const practiceIndex = WEB_EXAM_QUESTIONS.findIndex((question) => question.id === practiceQuestionId);
    return practiceIndex >= 0 ? practiceIndex : 0;
  });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [operationSelfScore, setOperationSelfScore] = useState('');
  const [savingResult, setSavingResult] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [saveError, setSaveError] = useState('');

  const currentQuestion = WEB_EXAM_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const answeredCount = WEB_EXAM_QUESTIONS.filter((question) => isAnswered(question, answers[question.id])).length;
  const autoScore = useMemo(() => getAutoScore(WEB_EXAM_QUESTIONS, answers), [answers]);
  const operationScore = submitted ? clampOperationScore(operationSelfScore) : 0;
  const totalScore = autoScore + operationScore;

  const typeStats = useMemo(
    () =>
      TYPE_ORDER.map((type) => {
        const questions = WEB_EXAM_QUESTIONS.filter((question) => question.type === type);
        return {
          type,
          label: TYPE_META[type].label,
          count: questions.length,
          totalScore: questions.reduce((sum, question) => sum + question.score, 0),
          answered: questions.filter((question) => isAnswered(question, answers[question.id])).length,
        };
      }),
    [answers],
  );

  const chapterStats = useMemo(() => {
    const map = new Map();
    WEB_EXAM_QUESTIONS.forEach((question) => {
      const key = question.chapter;
      const entry = map.get(key) ?? {
        chapter: question.chapter,
        chapterTitle: question.chapterTitle,
        count: 0,
        answered: 0,
      };
      entry.count += 1;
      if (isAnswered(question, answers[question.id])) entry.answered += 1;
      map.set(key, entry);
    });
    return [...map.values()].sort((a, b) => a.chapter - b.chapter);
  }, [answers]);

  const reviewQuestions = useMemo(
    () =>
      WEB_EXAM_QUESTIONS.filter(
        (question) =>
          question.type !== QUESTION_TYPES.OPERATION && isAnswered(question, answers[question.id]) && !isCorrect(question, answers[question.id]),
      ),
    [answers],
  );

  useEffect(() => {
    if (submitted) return undefined;
    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [submitted]);

  const updateAnswer = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleChoice = (question, letter) => {
    if (submitted) return;

    if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
      const selected = answers[question.id] ?? [];
      const next = selected.includes(letter)
        ? selected.filter((item) => item !== letter)
        : [...selected, letter].sort();
      updateAnswer(question, next);
      return;
    }

    updateAnswer(question, letter);
  };

  const handleTextAnswer = (question, value) => {
    if (submitted) return;
    updateAnswer(question, value);
  };

  const goToQuestion = (index) => {
    setCurrentIndex(Math.min(WEB_EXAM_QUESTIONS.length - 1, Math.max(0, index)));
  };

  const handleSubmit = () => {
    if (!window.confirm(`已答 ${answeredCount} / ${WEB_EXAM_QUESTIONS.length} 题，确定交卷吗？`)) return;
    setSubmitted(true);
  };

  const handleRestart = () => {
    if (!window.confirm('确定重新开始本套试卷吗？当前页面中的作答会被清空。')) return;
    setAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setOperationSelfScore('');
    setSaveResult(null);
    setSaveError('');
  };

  const serializeAnswer = (value) => {
    if (Array.isArray(value)) return value.join(',');
    return String(value ?? '');
  };

  const handleSaveResult = async () => {
    if (operationSelfScore === '') {
      alert('请先填写操作题自评分，最低可填写 0 分。');
      return;
    }

    setSavingResult(true);
    setSaveError('');
    try {
      const payload = {
        durationSeconds: elapsedSeconds,
        operationScore,
        answers: WEB_EXAM_QUESTIONS.map((question) => {
          const objectiveCorrect = question.type !== QUESTION_TYPES.OPERATION
            && isCorrect(question, answers[question.id]);
          return {
            questionId: question.id,
            chapter: question.chapter,
            chapterTitle: question.chapterTitle,
            questionType: question.type,
            content: question.stem,
            options: question.options,
            userAnswer: serializeAnswer(answers[question.id]),
            correctAnswer: serializeAnswer(question.answer),
            analysis: question.analysis,
            correct: objectiveCorrect,
            earnedScore: objectiveCorrect ? question.score : 0,
          };
        }),
      };
      const { data } = await axiosInstance.post('/web-exam/submit', payload);
      setSaveResult(data);
    } catch (error) {
      setSaveError(error.response?.data?.message || error.message || '保存失败，请稍后重试');
    } finally {
      setSavingResult(false);
    }
  };

  const renderAnswerInput = (question) => {
    if (question.type === QUESTION_TYPES.FILL_BLANK) {
      return (
        <input
          value={currentAnswer ?? ''}
          disabled={submitted}
          onChange={(event) => handleTextAnswer(question, event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:bg-slate-100"
          placeholder="填写答案"
        />
      );
    }

    if (question.type === QUESTION_TYPES.OPERATION) {
      return (
        <textarea
          value={currentAnswer ?? ''}
          disabled={submitted}
          onChange={(event) => handleTextAnswer(question, event.target.value)}
          rows={12}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:bg-slate-100"
          placeholder="在此输入 HTML / CSS / JavaScript 代码"
        />
      );
    }

    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const letter = OPTION_LETTERS[index];
          const selected =
            question.type === QUESTION_TYPES.MULTIPLE_CHOICE
              ? (currentAnswer ?? []).includes(letter)
              : currentAnswer === letter || currentAnswer === option;
          const correctAfterSubmit =
            submitted &&
            (question.type === QUESTION_TYPES.MULTIPLE_CHOICE ? question.answer.includes(letter) : question.answer === letter || question.answer === option);

          return (
            <button
              type="button"
              key={letter}
              data-option-letter={letter}
              disabled={submitted}
              onClick={() => handleChoice(question, question.type === QUESTION_TYPES.TRUE_FALSE ? option : letter)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition disabled:cursor-default ${
                selected
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-950'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:bg-cyan-50'
              } ${correctAfterSubmit ? 'border-emerald-500 bg-emerald-50' : ''}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                  selected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300 bg-white text-slate-500'
                } ${correctAfterSubmit ? 'border-emerald-600 bg-emerald-600 text-white' : ''}`}
              >
                {question.type === QUESTION_TYPES.TRUE_FALSE ? (index === 0 ? '对' : '错') : letter}
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

    if (question.type === QUESTION_TYPES.OPERATION) {
      return (
        <div className="mt-6 space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 font-semibold text-amber-900">
            <Award className="h-5 w-5" />
            操作题自评
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_160px] sm:items-end">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-amber-950">自评分</span>
              <input
                type="number"
                data-operation-score
                min="0"
                max="20"
                step="1"
                value={operationSelfScore}
                onChange={(event) => {
                  setOperationSelfScore(event.target.value);
                  setSaveResult(null);
                  setSaveError('');
                }}
                className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>
            <div className="rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-amber-900">
              当前计入 {operationScore} / 20 分
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {question.scoringGuide.map((item) => (
              <div key={item.label} className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                {item.label}
                <span className="ml-2 font-semibold text-amber-700">{item.score} 分</span>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-amber-950">参考答案</div>
            <pre
              data-testid="reference-answer"
              className="max-h-72 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-5 text-slate-100"
            >
              {question.referenceAnswer}
            </pre>
          </div>
          <div className="border-t border-amber-200 pt-4">
            {saveResult ? (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                <CloudCheck className="h-5 w-5" />
                成绩与错题本已保存，记录编号 #{saveResult.recordId}
              </div>
            ) : (
              <button
                type="button"
                data-action="save-web-exam"
                disabled={savingResult || operationSelfScore === ''}
                onClick={handleSaveResult}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
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
        </div>
      );
    }

    const correct = isCorrect(question, answers[question.id]);
    return (
      <div className={`mt-6 rounded-lg border p-4 ${correct ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
        <div className={`mb-2 flex items-center gap-2 font-semibold ${correct ? 'text-emerald-800' : 'text-rose-800'}`}>
          {correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {correct ? '回答正确' : '回答错误'}
        </div>
        <p className="text-sm leading-6 text-slate-700">
          正确答案：
          <span className="font-semibold text-slate-950">
            {Array.isArray(question.answer) ? question.answer.join('、') : question.answer}
          </span>
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-700">{question.analysis}</p>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-cyan-700">
              <BookOpen className="h-4 w-4" />
              Web 前端开发 · 第 1-14 章
            </div>
            <h1 data-testid="exam-title" className="mt-2 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
              Web 前端考试窗口
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div data-summary="question-count" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">题量</div>
              <div className="mt-1 text-lg font-bold sm:text-xl">{WEB_EXAM_QUESTIONS.length} 题</div>
            </div>
            <div data-summary="total-score" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">总分</div>
              <div className="mt-1 text-lg font-bold sm:text-xl">{TOTAL_SCORE} 分</div>
            </div>
            <div data-summary="elapsed-time" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                已用时
              </div>
              <div className="mt-1 font-mono text-base font-bold sm:text-xl">{formatElapsedTime(elapsedSeconds)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <section className="min-w-0 space-y-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {typeStats.map((item) => (
              <div key={item.type} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-xl font-bold">{item.count}</span>
                  <span className="text-xs text-slate-500">{item.totalScore} 分</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-cyan-500"
                    style={{ width: `${item.count ? (item.answered / item.count) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {submitted && (
            <div
              data-testid="score-report"
              data-auto-score={autoScore}
              data-operation-score={operationScore}
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-lg font-bold text-emerald-900">
                    <Award className="h-5 w-5" />
                    成绩报告
                  </div>
                  <p className="mt-1 text-sm text-emerald-800">
                    自动评分 {autoScore} / 80 分，操作题自评 {operationScore} / 20 分
                  </p>
                </div>
                <div data-testid="final-score" className="text-4xl font-black text-emerald-900">{totalScore}</div>
              </div>
              {reviewQuestions.length > 0 && (
                <div className="mt-4 rounded-lg bg-white p-3">
                  <div className="mb-2 text-sm font-semibold text-slate-700">错题回顾</div>
                  <div className="flex flex-wrap gap-2">
                    {reviewQuestions.map((question) => (
                      <button
                        key={question.id}
                        type="button"
                        onClick={() => goToQuestion(WEB_EXAM_QUESTIONS.findIndex((item) => item.id === question.id))}
                        className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm font-medium text-rose-700 hover:bg-rose-100"
                      >
                        第 {WEB_EXAM_QUESTIONS.findIndex((item) => item.id === question.id) + 1} 题
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-cyan-100 px-2.5 py-1 text-sm font-bold text-cyan-800">
                    {TYPE_META[currentQuestion.type].label}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
                    第 {currentQuestion.chapter} 章 · {currentQuestion.chapterTitle}
                  </span>
                  <span className="rounded-md bg-amber-100 px-2.5 py-1 text-sm font-medium text-amber-800">
                    {currentQuestion.score} 分
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-8 text-slate-950 sm:text-xl">
                  {currentIndex + 1}. {currentQuestion.stem}
                </h2>
              </div>
              {submitted && currentQuestion.type !== QUESTION_TYPES.OPERATION && (
                <div className="shrink-0 rounded-lg bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  本题得分 {getQuestionScore(currentQuestion, answers, operationScore)} / {currentQuestion.score}
                </div>
              )}
            </div>

            {renderAnswerInput(currentQuestion)}
            {renderQuestionResult(currentQuestion)}
          </div>

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
            <div className="flex flex-col gap-3 sm:flex-row">
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
                  data-action="submit-exam"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
                >
                  <Send className="h-5 w-5" />
                  交卷
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => goToQuestion(currentIndex + 1)}
              disabled={currentIndex === WEB_EXAM_QUESTIONS.length - 1}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              下一题
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckSquare className="h-5 w-5 text-cyan-700" />
                答题卡
              </div>
              <span className="text-sm text-slate-500">
                {answeredCount} / {WEB_EXAM_QUESTIONS.length}
              </span>
            </div>
            <div className="grid grid-cols-7 gap-2 sm:grid-cols-10 lg:grid-cols-5">
              {WEB_EXAM_QUESTIONS.map((question, index) => {
                const answered = isAnswered(question, answers[question.id]);
                const active = index === currentIndex;
                const correct = submitted && question.type !== QUESTION_TYPES.OPERATION && isCorrect(question, answers[question.id]);
                const wrong = submitted && question.type !== QUESTION_TYPES.OPERATION && answered && !correct;

                return (
                  <button
                    key={question.id}
                    type="button"
                    data-question-index={index}
                    onClick={() => goToQuestion(index)}
                    className={`aspect-square rounded-lg border text-sm font-bold transition ${
                      active
                        ? 'border-cyan-600 bg-cyan-600 text-white shadow-sm'
                        : answered
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-cyan-300'
                    } ${wrong ? 'border-rose-300 bg-rose-50 text-rose-700' : ''} ${correct ? 'border-emerald-400 bg-emerald-100' : ''}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              章节覆盖
            </div>
            <div className="space-y-2">
              {chapterStats.map((item) => (
                <div key={item.chapter}>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                    <span>
                      第 {item.chapter} 章 · {item.chapterTitle}
                    </span>
                    <span>
                      {item.answered}/{item.count}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${item.count ? (item.answered / item.count) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default WebFrontendExam;
