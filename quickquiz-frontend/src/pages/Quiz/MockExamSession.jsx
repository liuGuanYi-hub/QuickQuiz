import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Send, ChevronLeft, ChevronRight, CheckSquare } from 'lucide-react';

const MockExamSession = () => {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45分钟倒计时
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Mock
  const mockExam = [
    { id: 101, type: '单选题', content: 'HTTP 的默认端口是什么？', options: ['80', '443', '8080', '21'] },
    { id: 102, type: '多选题', content: '以下哪些是前端框架？', options: ['React', 'Vue', 'Spring', 'Angular'] },
    { id: 103, type: '判断题', content: 'Java 是一种强类型编程语言。', options: ['对', '错'] },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentQ = mockExam[currentQIndex];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      {/* 顶部防静电考场条 */}
      <div className="bg-slate-900 text-slate-200 px-6 py-4 flex justify-between items-center shadow-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="font-semibold tracking-wide">沉浸式模拟考场正在进行...</span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="bg-slate-800 px-4 py-1.5 rounded-full flex items-center gap-2 border border-slate-700">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
            <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <button className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors">
            <Send className="w-4 h-4" /> 交卷并查看报告
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
            {mockExam.map((q, idx) => (
              <button 
                key={q.id}
                onClick={() => setCurrentQIndex(idx)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium border text-sm transition-all
                  ${currentQIndex === idx ? 'ring-2 ring-indigo-500 border-transparent bg-indigo-50 text-indigo-700' : 
                   'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 右侧题目区 */}
        <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[400px]">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-lg uppercase tracking-wide">
                  {currentQ.type}
                </span>
                <span className="text-gray-400 font-medium">题目 {currentQIndex + 1} / {mockExam.length}</span>
              </div>
              
              <h2 className="text-xl text-gray-800 leading-relaxed font-medium mb-8">
                {currentQ.content}
              </h2>

              <div className="space-y-4">
                {currentQ.options.map((opt, i) => (
                  <button key={i} className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center font-bold text-gray-500 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-gray-700 font-medium">{opt}</span>
                  </button>
                ))}
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
                onClick={() => setCurrentQIndex(prev => Math.min(mockExam.length - 1, prev + 1))}
                disabled={currentQIndex === mockExam.length - 1}
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
