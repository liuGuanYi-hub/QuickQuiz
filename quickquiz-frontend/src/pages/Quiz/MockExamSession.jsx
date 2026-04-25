import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, AlertTriangle, Send, ChevronLeft, ChevronRight, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const EXAM_DURATION_SECONDS = 30 * 60; // 30 minutes

const MockExamSession = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
    const [answers, setAnswers] = useState({}); // questionId -> userAnswer string
    const [selectedOptions, setSelectedOptions] = useState({}); // questionId -> option index(s) for display
    const [submitting, setSubmitting] = useState(false);
    const timerRef = useRef(null);

    // 获取题目
    useEffect(() => {
        // 优先检查是否有单题练习模式
        const practiceQ = sessionStorage.getItem('practiceQuestion');
        let injectQuestion = null;
        if (practiceQ) {
            try { injectQuestion = JSON.parse(practiceQ); } catch {}
            sessionStorage.removeItem('practiceQuestion');
        }

        const count = injectQuestion ? 9 : 10; // 单题练习时只取9道，凑成10道
        axiosInstance.get('/exam/questions', { params: { count } })
            .then(({ data }) => {
                if (injectQuestion) {
                    // 把错题注入到第一题
                    setQuestions([injectQuestion, ...data]);
                } else {
                    setQuestions(data);
                }
                setLoading(false);
                if (data.length === 0 && !injectQuestion) setError('题库中没有题目，请先添加题目。');
            })
            .catch(() => {
                setError('加载题目失败，请检查网络。');
                setLoading(false);
            });
    }, []);

    // 倒计时
    useEffect(() => {
        if (loading) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [loading]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const currentQ = questions[currentQIndex];

    const isMultiChoice = currentQ?.type === 'MULTIPLE_CHOICE';

    const handleOptionClick = (optText, optIdx) => {
        if (!currentQ) return;
        const qId = currentQ.id;
        if (isMultiChoice) {
            // 多选：切换选中状态
            setSelectedOptions(prev => {
                const current = prev[qId] || [];
                const exists = current.includes(optIdx);
                const updated = exists
                    ? current.filter(i => i !== optIdx)
                    : [...current, optIdx];
                const answerStr = updated.map(i => String.fromCharCode(65 + i)).join(',');
                setAnswers(a => ({ ...a, [qId]: answerStr }));
                return { ...prev, [qId]: updated };
            });
        } else {
            // 单选/判断：直接设置
            const answerStr = String.fromCharCode(65 + optIdx);
            setAnswers(a => ({ ...a, [qId]: answerStr }));
            setSelectedOptions(prev => ({ ...prev, [qId]: [optIdx] }));
        }
    };

    const answeredCount = Object.keys(answers).length;

    const handleSubmit = async (auto = false) => {
        if (!auto && answeredCount === 0) {
            alert('请至少回答一道题后再交卷。');
            return;
        }
        if (!auto && !window.confirm(`已答 ${answeredCount} / ${questions.length} 题，确定交卷？`)) return;

        clearInterval(timerRef.current);
        setSubmitting(true);

        const payload = {
            answers: questions.map(q => ({
                questionId: q.id,
                userAnswer: answers[q.id] || '',
            })),
            durationSeconds: EXAM_DURATION_SECONDS - timeLeft,
        };

        try {
            const { data } = await axiosInstance.post('/exam/submit', payload);
            // 把结果存到 sessionStorage，跳转到报告页
            sessionStorage.setItem('examResult', JSON.stringify(data));
            navigate('/exam/report');
        } catch (err) {
            alert('提交失败：' + (err.response?.data?.message || err.message));
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">正在加载题目…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-500">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                    <p>{error}</p>
                    <button onClick={() => navigate('/questions')} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        去题库
                    </button>
                </div>
            </div>
        );
    }

    const currentSelected = selectedOptions[currentQ?.id] || [];

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
            {/* 顶部考场条 */}
            <div className="bg-slate-900 text-slate-200 px-6 py-4 flex justify-between items-center shadow-md z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold tracking-wide">沉浸式模拟考场</span>
                    <span className="text-slate-400 text-sm ml-2">已答 {answeredCount} / {questions.length}</span>
                </div>
                <div className="flex items-center gap-8">
                    <div className="bg-slate-800 px-4 py-1.5 rounded-full flex items-center gap-2 border border-slate-700">
                        <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                        <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-white'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <button
                        onClick={() => handleSubmit(false)}
                        disabled={submitting}
                        className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {submitting ? '提交中…' : '交卷并查看报告'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* 左侧答题卡 */}
                <div className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col justify-start overflow-y-auto">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-indigo-600" /> 答题卡
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {questions.map((q, idx) => {
                            const answered = !!answers[q.id];
                            const isCurrent = idx === currentQIndex;
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQIndex(idx)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium border text-sm transition-all
                                        ${isCurrent ? 'ring-2 ring-indigo-500 border-transparent bg-indigo-50 text-indigo-700' :
                                          answered ? 'bg-green-100 border-green-300 text-green-700' :
                                          'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-6 text-xs text-gray-400 space-y-1">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-green-100 border border-green-300" /> 已答</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-white border border-gray-300" /> 未答</div>
                    </div>
                </div>

                {/* 右侧题目区 */}
                <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center">
                    <div className="max-w-3xl w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[400px]">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-lg uppercase tracking-wide">
                                    {currentQ.type === 'SINGLE_CHOICE' ? '单选题' : currentQ.type === 'MULTIPLE_CHOICE' ? '多选题' : '判断题'}
                                </span>
                                <span className="text-gray-400 font-medium">题目 {currentQIndex + 1} / {questions.length}</span>
                                {isMultiChoice && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">多选</span>}
                            </div>

                            <h2 className="text-xl text-gray-800 leading-relaxed font-medium mb-8">
                                {currentQ.content}
                            </h2>

                            <div className="space-y-4">
                                {currentQ.options.map((opt, i) => {
                                    const isSelected = currentSelected.includes(i);
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleOptionClick(opt, i)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group
                                                ${isSelected
                                                    ? 'border-indigo-400 bg-indigo-50 ring-1 ring-indigo-400'
                                                    : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'}`}
                                        >
                                            <div className={`w-8 h-8 rounded border-2 flex items-center justify-center font-bold text-sm transition-colors
                                                ${isSelected ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-gray-300 text-gray-500 group-hover:border-indigo-500'}`}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className={`font-medium ${isSelected ? 'text-indigo-700' : 'text-gray-700'}`}>{opt}</span>
                                            {isSelected && isMultiChoice && (
                                                <span className="ml-auto text-indigo-500 text-sm font-bold">✓</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQIndex === 0}
                                className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-5 h-5" /> 上一题
                            </button>
                            <button
                                onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                disabled={currentQIndex === questions.length - 1}
                                className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
                            >
                                下一题 <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockExamSession;
