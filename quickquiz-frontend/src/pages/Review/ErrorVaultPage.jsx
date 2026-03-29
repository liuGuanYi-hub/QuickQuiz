import React, { useState } from 'react';
import { Target, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, BookX } from 'lucide-react';

const ErrorVaultPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const errorQuestions = [
    {
      id: 1,
      content: 'HTTP 状态码 502 代表什么？',
      wrongAnswer: '网关超时 (504)',
      correctAnswer: '错误网关 (Bad Gateway)',
      errorCount: 3,
      consecutiveCorrect: 0,
      targetCorrect: 3,
      lastErrorDate: '2026-03-29',
    },
    {
      id: 2,
      content: 'Java 中的 HashMap 是线程安全的吗？',
      wrongAnswer: '是，由底层 synchronized 保证',
      correctAnswer: '否，需使用 ConcurrentHashMap',
      errorCount: 1,
      consecutiveCorrect: 2,
      targetCorrect: 3,
      lastErrorDate: '2026-03-25',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BookX className="w-8 h-8 text-red-500" />
            错题本 (Error Vault)
          </h1>
          <p className="text-gray-500 mt-2">系统自动收集错题，连续答对 $n$ 次后将自动移出。</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition-all font-medium shadow-sm">
          <RefreshCw className="w-4 h-4" />
          开启错题闯关
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {['all', 'high_freq', 'nearly_mastered'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'bg-red-100 text-red-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab === 'all' && '全部错题'}
            {tab === 'high_freq' && '高频易错 (≥3次)'}
            {tab === 'nearly_mastered' && '即将掌握'}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {errorQuestions.map((q) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">
                    做错 {q.errorCount} 次
                  </span>
                  <span className="text-xs text-gray-400">上次做错: {q.lastErrorDate}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">{q.content}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-red-50/50 p-3 rounded-lg border border-red-100 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-red-700 font-medium block mb-1">你的历史错误答案</span>
                      <span className="text-gray-600">{q.wrongAnswer}</span>
                    </div>
                  </div>
                  <div className="bg-green-50/50 p-3 rounded-lg border border-green-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-green-700 font-medium block mb-1">正确解析</span>
                      <span className="text-gray-600">{q.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ml-6 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 min-w-[120px]">
                <Target className="w-6 h-6 text-indigo-400 mb-2" />
                <div className="text-sm text-gray-500 text-center mb-1">消灭进度</div>
                <div className="font-bold text-lg text-indigo-600">
                  {q.consecutiveCorrect} <span className="text-gray-400 text-sm font-normal">/ {q.targetCorrect}</span>
                </div>
                <button className="mt-3 text-xs flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                  单题重练 <ChevronRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorVaultPage;
