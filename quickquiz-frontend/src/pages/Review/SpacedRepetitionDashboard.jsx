import React, { useState, useEffect, useCallback } from 'react';
import {
    Brain, Clock, ArrowUpRight, CheckCircle, Target, TrendingUp,
    BarChart3, Loader2, RefreshCw, BookOpen, Flame, Zap, Calendar,
    ChevronRight, AlertCircle
} from 'lucide-react';
import {
    ResponsiveContainer, LineChart, Line, BarChart, Bar,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import axiosInstance from '../../utils/axiosInstance';

const StatCard = ({ icon: Icon, label, value, sub, color, gradient }) => (
    <div className={`rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col ${gradient || 'bg-white'}`}>
        {gradient ? (
            <div className="flex justify-between items-start mb-3">
                <div className="p-2.5 bg-white/20 rounded-lg">
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-gray-500 font-medium">{label}</span>
            </div>
        )}
        <div className="flex items-end gap-1.5">
            <span className={`text-3xl font-black ${gradient ? 'text-white' : 'text-gray-800'}`}>{value}</span>
            {sub && <span className={`text-sm mb-1 ${gradient ? 'text-white/70' : 'text-gray-400'}`}>{sub}</span>}
        </div>
        {gradient && <p className="text-white/70 text-sm mt-1">{label}</p>}
    </div>
);

const SpacedRepetitionDashboard = () => {
    const [stats, setStats] = useState(null);
    const [dailyStats, setDailyStats] = useState([]);
    const [typeStats, setTypeStats] = useState([]);
    const [records, setRecords] = useState([]);
    const [recordsPage, setRecordsPage] = useState(0);
    const [recordsTotalPages, setRecordsTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        try {
            const [statsRes, dailyRes, typeRes, recordsRes] = await Promise.all([
                axiosInstance.get('/users/me/stats'),
                axiosInstance.get('/users/me/stats/daily', { params: { days: 7 } }),
                axiosInstance.get('/users/me/stats/types'),
                axiosInstance.get('/users/me/records', { params: { page: 0, size: 5 } }),
            ]);
            setStats(statsRes.data);
            setDailyStats(dailyRes.data || []);
            setTypeStats(typeRes.data || []);
            setRecords(recordsRes.data.content || []);
            setRecordsTotalPages(recordsRes.data.totalPages || 0);
        } catch (e) {
            setError('加载数据失败');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchStats(); }, [fetchStats]);

    const formatDuration = (s) => {
        if (!s) return '0秒';
        if (s < 60) return `${s}秒`;
        if (s < 3600) return `${Math.floor(s / 60)}分${s % 60}秒`;
        return `${Math.floor(s / 3600)}时${Math.floor((s % 3600) / 60)}分`;
    };

    const formatDate = (d) => {
        if (!d) return '';
        const date = new Date(d);
        const now = new Date();
        const diffDays = Math.floor((now - date) / 86400000);
        if (diffDays === 0) return '今天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        if (diffDays === 1) return '昨天';
        if (diffDays < 7) return `${diffDays}天前`;
        return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    };

    const chartColors = {
        primary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mr-3" />
                加载学习数据…
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500 gap-3">
                <AlertCircle className="w-10 h-10" />
                <p>{error || '加载失败'}</p>
                <button onClick={fetchStats} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">重试</button>
            </div>
        );
    }

    const accuracyColor = (p) => {
        if (p >= 80) return 'text-green-600';
        if (p >= 60) return 'text-amber-500';
        return 'text-red-500';
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">

            {/* ===== 顶部统计卡片 ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 今日 */}
                <StatCard
                    icon={Zap}
                    label="今日学习"
                    value={`${stats.todayQuestions || 0}题`}
                    sub=""
                    color="bg-amber-50 text-amber-600"
                />
                {/* 正确率 */}
                <StatCard
                    icon={Target}
                    label="今日正确率"
                    value={`${stats.todayAccuracy || 0}%`}
                    sub=""
                    color={`${accuracyColor(Number(stats.todayAccuracy))} bg-opacity-10`}
                />
                {/* 连续打卡 */}
                <StatCard
                    icon={Flame}
                    label="连续打卡"
                    value={stats.currentStreak || 0}
                    sub="天"
                    color="bg-orange-50 text-orange-600"
                />
                {/* 累计做题 */}
                <StatCard
                    icon={BookOpen}
                    label="累计做题"
                    value={stats.totalQuestions || 0}
                    sub="题"
                    color="bg-blue-50 text-blue-600"
                />
            </div>

            {/* ===== 核心数据 + 正确率趋势 ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 正确率折线图 */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-500" />
                            近7天正确率趋势
                        </h2>
                        <button onClick={fetchStats} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                    {dailyStats.length === 0 ? (
                        <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                            暂无数据，开始练习后即可查看趋势
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={dailyStats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                                    tickFormatter={(v) => {
                                        const d = new Date(v);
                                        return `${d.getMonth() + 1}/${d.getDate()}`;
                                    }}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                                    tickFormatter={(v) => `${v}%`}
                                    width={40}
                                />
                                <Tooltip
                                    formatter={(v) => [`${v}%`, '正确率']}
                                    labelFormatter={(l) => `日期：${l}`}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="accuracy"
                                    stroke={chartColors.primary}
                                    strokeWidth={2.5}
                                    dot={{ r: 4, fill: chartColors.primary }}
                                    activeDot={{ r: 6 }}
                                    name="正确率"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* 右侧汇总数据 */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="text-indigo-200 text-sm font-medium mb-4">学习概览</h3>
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-200 text-sm">累计练习</span>
                            <span className="font-bold text-lg">{stats.totalExercises || 0} 次</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-200 text-sm">累计正确</span>
                            <span className="font-bold text-lg">{stats.totalCorrect || 0} 题</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-200 text-sm">总正确率</span>
                            <span className="font-bold text-lg">{stats.overallAccuracy || 0}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-200 text-sm">累计用时</span>
                            <span className="font-bold text-lg">{formatDuration(stats.totalTimeSeconds)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-200 text-sm">已掌握</span>
                            <span className="font-bold text-lg text-green-300">{stats.masteredCount || 0} 题</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-200 text-sm">错题本</span>
                            <span className="font-bold text-lg text-red-300">{stats.wrongCount || 0} 题</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== 做题量柱状图 + 题型雷达图 ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 每日做题量 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        近7天做题量
                    </h2>
                    {dailyStats.length === 0 ? (
                        <div className="h-48 flex items-center justify-center text-gray-400 text-sm">暂无数据</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={dailyStats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                                    tickFormatter={(v) => {
                                        const d = new Date(v);
                                        return `${d.getMonth() + 1}/${d.getDate()}`;
                                    }}
                                />
                                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} width={30} />
                                <Tooltip
                                    formatter={(v, name) => [v, name === 'questionsCount' ? '做题数' : '正确数']}
                                    labelFormatter={(l) => `日期：${l}`}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="questionsCount" fill={chartColors.primary} name="做题数" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="correctCount" fill={chartColors.success} name="正确数" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* 题型正确率雷达图 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
                        <Brain className="w-5 h-5 text-purple-500" />
                        各题型正确率
                    </h2>
                    {typeStats.length === 0 ? (
                        <div className="h-48 flex items-center justify-center text-gray-400 text-sm">暂无数据</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={220}>
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={typeStats}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="label" tick={{ fill: '#4b5563', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Tooltip
                                    formatter={(v) => [`${v}%`, '正确率']}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Radar
                                    name="正确率"
                                    dataKey="accuracy"
                                    stroke={chartColors.primary}
                                    fill={chartColors.primary}
                                    fillOpacity={0.35}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    )}
                    {/* 题型列表 */}
                    {typeStats.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {typeStats.map((t) => (
                                <div key={t.type} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{t.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-500 rounded-full"
                                                style={{ width: `${t.accuracy}%` }}
                                            />
                                        </div>
                                        <span className="text-gray-500 w-12 text-right">{t.accuracy}%</span>
                                        <span className="text-gray-400 text-xs">({t.correct}/{t.total})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== 练习历史 ===== */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        练习记录
                    </h2>
                </div>

                {records.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">还没有练习记录</p>
                        <p className="text-sm mt-1">开始练习后来这里查看历史</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {records.map((r) => (
                            <div key={r.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${Number(r.score) >= 80 ? 'bg-green-100' : Number(r.score) >= 60 ? 'bg-amber-100' : 'bg-red-100'}`}>
                                        <span className={`font-black text-sm ${Number(r.score) >= 80 ? 'text-green-600' : Number(r.score) >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {Math.round(Number(r.score))}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">
                                            {r.questionCount} 题 · {r.correctCount} 对 · {formatDuration(r.durationSeconds)}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-0.5">
                                            {formatDate(r.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right mr-2">
                                        <div className={`text-lg font-bold ${accuracyColor(Number(r.score))}`}>{r.score}%</div>
                                        <div className="text-xs text-gray-400">正确率</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {recordsTotalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: Math.min(recordsTotalPages, 5) }, (_, i) => (
                            <button key={i}
                                onClick={() => setRecordsPage(i)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${recordsPage === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default SpacedRepetitionDashboard;
