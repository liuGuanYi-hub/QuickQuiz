import React, { useState, useEffect, useCallback } from 'react';
import { Target, RefreshCw, CheckCircle2, ChevronRight, BookX, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ErrorVaultPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [removing, setRemoving] = useState(null);

    const fetchWrongQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get('/wrong-questions');
            setItems(data);
        } catch (e) {
            setError(e.response?.data?.message || e.message || '加载失败');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWrongQuestions();
    }, [fetchWrongQuestions]);

    const handleRemove = async (id) => {
        if (!window.confirm('确定从错题本移除该题？')) return;
        setRemoving(id);
        try {
            await axiosInstance.delete(`/wrong-questions/${id}`);
            await fetchWrongQuestions();
        } catch (e) {
            alert('移除失败');
        } finally {
            setRemoving(null);
        }
    };

    const handlePractice = async (wq) => {
        // 将题目存入 session，跳转到练习页
        sessionStorage.setItem('practiceQuestion', JSON.stringify({
            id: wq.questionId,
            content: wq.content,
            type: wq.questionType,
            options: wq.options,
            answer: wq.correctAnswer,
        }));
        navigate('/exam');
    };

    const typeLabel = (t) => {
        if (t === 'SINGLE_CHOICE') return '单选题';
        if (t === 'MULTIPLE_CHOICE') return '多选题';
        if (t === 'TRUE_FALSE') return '判断题';
        return t;
    };

    const filtered = items.filter(q => {
        if (activeTab === 'high_freq') return q.wrongCount >= 3;
        if (activeTab === 'nearly_mastered') return q.consecutiveCorrect >= 2 && !q.mastered;
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <BookX className="w-8 h-8 text-red-500" />
                        错题本
                    </h1>
                    <p className="text-gray-500 mt-2">
                        共 {items.length} 道错题，连续答对 3 次将自动移出
                    </p>
                </div>
                <button
                    onClick={fetchWrongQuestions}
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition-all font-medium shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    刷新
                </button>
            </div>

            <div className="flex gap-2 border-b border-gray-200 pb-2">
                {[
                    { key: 'all', label: '全部错题' },
                    { key: 'high_freq', label: '高频易错 (≥3次)' },
                    { key: 'nearly_mastered', label: '即将掌握' },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === tab.key
                                ? 'bg-red-100 text-red-700'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">{error}</div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mr-3" />
                    加载中…
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-300" />
                    <p className="text-lg font-medium">太棒了，暂无错题！</p>
                    <p className="text-sm mt-1">保持下去，去题库练习更多吧</p>
                    <button
                        onClick={() => navigate('/exam')}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        开始练习
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((q) => (
                        <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">
                                            做错 {q.wrongCount} 次
                                        </span>
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                                            {typeLabel(q.questionType)}
                                        </span>
                                        {q.mastered && (
                                            <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-bold rounded flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> 已掌握
                                            </span>
                                        )}
                                        {q.lastWrongAt && (
                                            <span className="text-xs text-gray-400">
                                                上次: {new Date(q.lastWrongAt).toLocaleDateString('zh-CN')}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">{q.content}</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        {q.wrongCount > 0 && (
                                            <div className="bg-red-50/50 p-3 rounded-lg border border-red-100 flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="text-red-700 font-medium block mb-1">正确答案</span>
                                                    <span className="text-gray-600">{q.correctAnswer}</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="bg-green-50/50 p-3 rounded-lg border border-green-100 flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="text-green-700 font-medium block mb-1">消灭进度</span>
                                                <span className="text-gray-600">
                                                    连续对 {q.consecutiveCorrect} / {q.targetCorrect} 次
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 选项列表 */}
                                    {q.options?.length > 0 && (
                                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                            {q.options.map((opt, i) => (
                                                <div key={i} className={`p-2 rounded border ${opt === q.correctAnswer ? 'border-green-300 bg-green-50 text-green-700 font-medium' : 'border-gray-200 text-gray-600'}`}>
                                                    {String.fromCharCode(65 + i)}. {opt}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="ml-6 flex flex-col gap-2">
                                    <button
                                        onClick={() => handlePractice(q)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
                                    >
                                        单题练习
                                    </button>
                                    <button
                                        onClick={() => handleRemove(q.id)}
                                        disabled={removing === q.id}
                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        {removing === q.id ? '移除中…' : '移除'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ErrorVaultPage;
