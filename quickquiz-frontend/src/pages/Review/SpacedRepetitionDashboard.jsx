import React from 'react';
import { Brain, Clock, PlusCircle, ArrowUpRight, CheckCircle } from 'lucide-react';

const SpacedRepetitionDashboard = () => {
  // Mock 数据：今日待复习卡片
  const reviewTasks = [
    { id: 1, title: '计算机网络 - TCP/IP详解', due: '今天 14:00', type: '单选题', count: 15, level: '急需巩固' },
    { id: 2, title: '深入理解 Java 虚拟机', due: '今天 16:30', type: '多选题', count: 8, level: '建议复习' },
    { id: 3, title: 'Spring Boot 原理初探', due: '明天', type: '判断题', count: 20, level: '记忆良好' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 顶部数据看板 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 mb-1">今日复习任务</p>
              <h2 className="text-4xl font-bold">23 <span className="text-lg font-normal">题</span></h2>
            </div>
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-6 flex items-center text-sm text-blue-100 bg-white/10 w-fit px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 mr-1" /> 已完成 5 题
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-500 mb-2 font-medium">连续打卡</p>
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-bold text-gray-800">12</h2>
            <span className="text-gray-500 mb-1">天</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-gray-500 mb-2 font-medium">掌握度提升</p>
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-bold text-green-600">+14%</h2>
            <ArrowUpRight className="w-5 h-5 text-green-500 mb-1" />
          </div>
        </div>
      </div>

      {/* 艾宾浩斯复习流列表 */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-500" />
            智能复习流
          </h2>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
            查看完整曲线趋势 &rarr;
          </button>
        </div>

        <div className="grid gap-4">
          {reviewTasks.map((task) => (
            <div key={task.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${task.level === '急需巩固' ? 'bg-red-500' : task.level === '建议复习' ? 'bg-amber-500' : 'bg-green-500'}`} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2.5 py-0.5 rounded-full">{task.type}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 到期: {task.due}</span>
                    <span>共 {task.count} 题</span>
                  </div>
                </div>
              </div>
              <button className="px-5 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                开始复习
              </button>
            </div>
          ))}

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:bg-gray-50 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors flex flex-col items-center">
            <PlusCircle className="w-8 h-8 mb-2 opacity-50" />
            <p className="font-medium">新建复习计划</p>
            <p className="text-sm opacity-80 mt-1">从题库或错题本中挑选</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacedRepetitionDashboard;
