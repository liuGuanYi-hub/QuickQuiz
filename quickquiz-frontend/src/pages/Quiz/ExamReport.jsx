import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { Award, Target, Clock, AlertCircle, CheckCircle2, XCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamReport = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('examResult');
        if (stored) {
            setResult(JSON.parse(stored));
        }
    }, []);

    if (!result) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center pt-20 text-gray-500">
                <p>没有找到考试记录，请先完成考试。</p>
                <Link to="/exam" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg">去考试</Link>
            </div>
        );
    }

    const { score, correctCount, questionCount, durationSeconds, results } = result;
    const wrongCount = questionCount - correctCount;
    const percentage = score;

    // 正确率雷达图（按题型）
    const typeMap = {};
    results.forEach(r => {
        const label = r.questionType === 'SINGLE_CHOICE' ? '单选题' : r.questionType === 'MULTIPLE_CHOICE' ? '多选题' : '判断题';
        if (!typeMap[label]) typeMap[label] = { total: 0, correct: 0 };
        typeMap[label].total++;
        if (r.isCorrect) typeMap[label].correct++;
    });
    const radarData = Object.entries(typeMap).map(([subject, d]) => ({
        subject,
        A: d.total > 0 ? Math.round(d.correct / d.total * 100) : 0,
        fullMark: 100,
    }));

    const formatDuration = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}分${sec}秒`;
    };

    const getScoreColor = (p) => {
        if (p >= 80) return 'from-green-600 to-emerald-700';
        if (p >= 60) return 'from-amber-500 to-orange-600';
        return 'from-red-600 to-rose-700';
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4 pt-6 pb-6 border-b border-gray-200">
                <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-50 shadow-inner">
                    <Award className="w-10 h-10 text-indigo-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-800">考试已结束！</h1>
                <p className="text-lg text-gray-500 font-medium">你的本次练习已完成，报告如下。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 核心分数卡片 */}
                <div className={`bg-gradient-to-br ${getScoreColor(percentage)} rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center items-center relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-10 -mt-20 blur-2xl" />
                    <h2 className="text-blue-100 text-lg font-medium mb-2 tracking-wide">本次得分</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-black tabular-nums">{Math.round(percentage)}</span>
                        <span className="text-2xl text-blue-200 font-medium">/ 100</span>
                    </div>
                    <div className="mt-8 flex w-full divide-x divide-indigo-400/30 pt-6">
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-blue-200 text-sm mb-1">正确</span>
                            <span className="font-bold text-xl flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />{correctCount}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-blue-200 text-sm mb-1">错误</span>
                            <span className="font-bold text-xl flex items-center gap-1"><XCircle className="w-4 h-4" />{wrongCount}</span>
                        </div>
                    </div>
                    <div className="mt-4 w-full border-t border-indigo-400/30 pt-4 text-center">
                        <span className="text-blue-200 text-sm">用时 {formatDuration(durationSeconds)}</span>
                    </div>
                </div>

                {/* 题型正确率雷达图 */}
                {radarData.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 md:col-span-2 flex flex-col items-center gap-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 self-start">
                            <Target className="w-6 h-6 text-blue-500" /> 各题型正确率
                        </h3>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Tooltip />
                                    <Radar name="正确率" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        {wrongCount > 0 && (
                            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-3 self-stretch">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    系统已将本次 <strong>{wrongCount} 道错题</strong>自动加入
                                    <Link to="/error-vault" className="font-bold mx-1 text-amber-900 hover:underline">【错题本】</Link>
                                    ，建议及时复习巩固。
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 逐题结果 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-5">答题详情</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {results.map((r, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border ${r.isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
                            <div className="flex items-start gap-3">
                                {r.isCorrect
                                    ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                }
                                <div className="flex-1">
                                    <div className="font-medium text-gray-800 mb-1">
                                        <span className="text-gray-400 text-sm mr-2">{idx + 1}.</span>
                                        {r.content}
                                    </div>
                                    {!r.isCorrect && (
                                        <div className="ml-6 mt-2 text-sm space-y-1">
                                            <div className="text-red-600">✗ 你的答案：{r.userAnswer || '(未作答)'}</div>
                                            <div className="text-green-600">✓ 正确答案：{r.correctAnswer}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4 pb-6">
                <Link to="/exam" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition">
                    再练一次
                </Link>
                <Link to="/error-vault" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition">
                    查看错题本
                </Link>
                <Link to="/questions" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center gap-2">
                    <Home className="w-4 h-4" /> 返回主页
                </Link>
            </div>
        </div>
    );
};

export default ExamReport;
