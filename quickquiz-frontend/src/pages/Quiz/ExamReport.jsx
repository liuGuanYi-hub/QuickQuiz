import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Award, Target, Clock, AlertCircle } from 'lucide-react';

const ExamReport = () => {
  const radarData = [
    { subject: '基础概念', A: 90, fullMark: 100 },
    { subject: '性能优化', A: 45, fullMark: 100 },
    { subject: '网络原理', A: 75, fullMark: 100 },
    { subject: '算法逻辑', A: 60, fullMark: 100 },
    { subject: '系统设计', A: 85, fullMark: 100 },
  ];

  const pieData = [
    { name: '答对', value: 34, color: '#10b981' },
    { name: '答错', value: 16, color: '#ef4444' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4 pt-10 pb-6 border-b border-gray-200">
        <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-50 shadow-inner">
          <Award className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800">考试已结束！</h1>
        <p className="text-lg text-gray-500 font-medium">根据您的本次表现，我们生成了以下能力图谱。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 核心分数卡片 */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-10 -mt-20 blur-2xl"></div>
          
          <h2 className="text-blue-100 text-lg font-medium mb-2 tracking-wide">本次考评得分</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-black tabular-nums">85</span>
            <span className="text-2xl text-blue-200 font-medium">/ 100</span>
          </div>
          
          <div className="mt-8 flex w-full divide-x divide-indigo-400/30 border-t border-indigo-400/30 pt-6">
            <div className="flex-1 flex flex-col items-center">
              <span className="text-blue-200 text-sm mb-1">超越了</span>
              <span className="font-bold text-xl">76%</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-blue-200 text-sm mb-1">平均用时</span>
              <span className="font-bold text-xl">45s/题</span>
            </div>
          </div>
        </div>

        {/* 雷达图：能力分布图谱 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 md:col-span-2 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Radar name="本次得分" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full md:w-1/2 space-y-5">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-500" /> 能力短板分析
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              您的优势主要集中在<strong className="text-indigo-600">基础概念</strong>和<strong className="text-indigo-600">系统设计</strong>，表现优异。但雷达图显示，在<strong className="text-red-500">性能优化</strong>模块存在明显短板（得分率仅 45%）。
            </p>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                系统已自动将本次做错的题目加入 <strong>【错题本】</strong> 和 <strong>【艾宾浩斯记忆流】</strong>，建议明日进行复习。
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamReport;
