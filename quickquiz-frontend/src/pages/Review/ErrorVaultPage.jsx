import { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  BookOpenCheck,
  BookX,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { SOFTWARE_TESTING_QUESTIONS } from '../Quiz/softwareTestingQuestions';

const TYPE_LABELS = {
  SINGLE_CHOICE: '单选题',
  MULTIPLE_CHOICE: '多选题',
  TRUE_FALSE: '判断题',
  FILL_BLANK: '填空题',
  OPERATION: '操作题',
  SUBJECTIVE: '填空 / 简答题',
};

const ErrorVaultPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [removing, setRemoving] = useState(null);

  const fetchWrongQuestions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.get('/wrong-questions');
      setItems(data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || '错题加载失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWrongQuestions();
  }, [fetchWrongQuestions]);

  const handleRemove = async (id) => {
    if (!window.confirm('确定从错题本移除这道题吗？')) return;
    setRemoving(id);
    try {
      await axiosInstance.delete(`/wrong-questions/${id}`);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (requestError) {
      alert(requestError.response?.data?.message || '移除失败');
    } finally {
      setRemoving(null);
    }
  };

  const handlePractice = (wrongQuestion) => {
    if (wrongQuestion.source === 'PROJECT_MANAGEMENT_EXAM') {
      sessionStorage.setItem('projectManagementPracticeQuestionId', wrongQuestion.staticQuestionId);
      navigate(`/project-management-exam/${wrongQuestion.chapter}`);
      return;
    }

    if (wrongQuestion.source === 'WEB_EXAM') {
      sessionStorage.setItem('webExamPracticeQuestionId', wrongQuestion.staticQuestionId);
      navigate('/web-exam');
      return;
    }

    if (wrongQuestion.source === 'SOFTWARE_TESTING_EXAM') {
      const targetQuestion = SOFTWARE_TESTING_QUESTIONS.find(
        (question) => question.id === wrongQuestion.staticQuestionId,
      );
      sessionStorage.setItem('softwareTestingPracticeQuestionId', wrongQuestion.staticQuestionId);
      navigate(`/software-testing-exam/${targetQuestion?.setId || 'practice-1'}`);
      return;
    }

    sessionStorage.setItem('practiceQuestion', JSON.stringify({
      id: wrongQuestion.questionId,
      content: wrongQuestion.content,
      type: wrongQuestion.questionType,
      options: wrongQuestion.options,
      answer: wrongQuestion.correctAnswer,
    }));
    navigate('/exam');
  };

  const filtered = items.filter((question) => {
    if (activeTab === 'high_freq') return question.wrongCount >= 3;
    if (activeTab === 'nearly_mastered') {
      return question.consecutiveCorrect >= 2 && !question.mastered;
    }
    return true;
  });

  const isCorrectOption = (question, index) => {
    const correctAnswers = String(question.correctAnswer ?? '')
      .split(',')
      .map((answer) => answer.trim().toUpperCase());
    const optionText = String(question.options?.[index] ?? '').trim().toUpperCase();
    return correctAnswers.includes(String.fromCharCode(65 + index))
      || correctAnswers.includes(optionText);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <BookX className="h-8 w-8 text-rose-500" />
            错题本
          </h1>
          <p className="mt-2 text-slate-500">
            共 {items.length} 道错题，连续答对 3 次后标记为已掌握
          </p>
        </div>
        <button
          type="button"
          onClick={fetchWrongQuestions}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-5 py-2.5 font-medium text-rose-700 transition hover:bg-rose-100"
        >
          <RefreshCw className="h-4 w-4" />
          刷新
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'all', label: '全部错题' },
          { key: 'high_freq', label: '高频易错（至少3次）' },
          { key: 'nearly_mastered', label: '即将掌握' },
        ].map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-rose-100 text-rose-700'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="mr-3 h-8 w-8 animate-spin" />
          正在加载错题
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-300" />
          <p className="text-lg font-medium">当前分类暂无错题</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/web-exam')}
              className="rounded-lg bg-cyan-600 px-5 py-2.5 font-medium text-white hover:bg-cyan-700"
            >
              开始 Web 前端考试
            </button>
            <button
              type="button"
              onClick={() => navigate('/project-management-exam')}
              className="rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white hover:bg-violet-700"
            >
              开始项目管理考试
            </button>
            <button
              type="button"
              onClick={() => navigate('/software-testing-exam')}
              className="rounded-lg bg-teal-600 px-5 py-2.5 font-medium text-white hover:bg-teal-700"
            >
              开始软件测试考试
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((question) => (
            <article
              key={`${question.source}-${question.id}`}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
                      做错 {question.wrongCount} 次
                    </span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {TYPE_LABELS[question.questionType] || question.questionType}
                    </span>
                    <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                      question.source === 'WEB_EXAM'
                        ? 'bg-cyan-50 text-cyan-700'
                        : question.source === 'PROJECT_MANAGEMENT_EXAM'
                          ? 'bg-violet-50 text-violet-700'
                          : question.source === 'SOFTWARE_TESTING_EXAM'
                            ? 'bg-teal-50 text-teal-700'
                            : 'bg-indigo-50 text-indigo-700'
                    }`}>
                      {question.source === 'WEB_EXAM'
                        ? 'Web固定卷'
                        : question.source === 'PROJECT_MANAGEMENT_EXAM'
                          ? '项目管理固定卷'
                          : question.source === 'SOFTWARE_TESTING_EXAM'
                            ? '软件测试固定卷'
                            : '题库'}
                    </span>
                    {question.chapter && (
                      <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                        {question.chapterTitle || `第 ${question.chapter} 章`}
                      </span>
                    )}
                    {question.mastered && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        已掌握
                      </span>
                    )}
                    {question.lastWrongAt && (
                      <span className="text-xs text-slate-400">
                        上次做错：{new Date(question.lastWrongAt).toLocaleDateString('zh-CN')}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold leading-7 text-slate-900">{question.content}</h2>

                  {question.options?.length > 0 && (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, index) => (
                        <div
                          key={`${question.id}-${index}`}
                          className={`rounded-lg border p-2.5 text-sm ${
                            isCorrectOption(question, index)
                              ? 'border-emerald-300 bg-emerald-50 font-medium text-emerald-800'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50/70 p-3 text-sm">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <div>
                        <div className="font-semibold text-rose-700">正确答案</div>
                        <div className="mt-1 text-slate-700">{question.correctAnswer || '请查看参考解析'}</div>
                        {question.lastWrongAnswer && (
                          <div className="mt-1 text-slate-500">上次作答：{question.lastWrongAnswer}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 p-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <div>
                        <div className="font-semibold text-emerald-700">消除进度</div>
                        <div className="mt-1 text-slate-700">
                          连续答对 {question.consecutiveCorrect} / {question.targetCorrect} 次
                        </div>
                      </div>
                    </div>
                  </div>

                  {question.analysis && (
                    <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600">
                      {question.analysis}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2 lg:w-36 lg:flex-col">
                  <button
                    type="button"
                    onClick={() => handlePractice(question)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                  >
                    <BookOpenCheck className="h-4 w-4" />
                    练习
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(question.id)}
                    disabled={removing === question.id}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    {removing === question.id
                      ? <Loader2 className="h-4 w-4 animate-spin" />
                      : <Trash2 className="h-4 w-4" />}
                    移除
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ErrorVaultPage;
