import React, { useState } from 'react';
import { Filter, Search, ChevronDown, Check } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [activeTags, setActiveTags] = useState([]);

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const tags = ['Java', 'React', 'Network', 'Database', 'Spring Boot', 'System Design'];

  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
      {/* 搜索层 */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="搜索题目内容、选项或解析..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
          <Filter className="w-4 h-4" />
          更多筛选
        </button>
      </div>

      <div className="h-px bg-gray-100 my-2" />

      {/* 标签层 */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 font-medium whitespace-nowrap">难度等级:</span>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(diff => (
              <button 
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  activeDifficulty === diff 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-px h-6 bg-gray-200" />

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-500 font-medium whitespace-nowrap">知识标签:</span>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${
                  activeTags.includes(tag)
                    ? 'bg-blue-500 border-blue-600 text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {activeTags.includes(tag) && <Check className="w-3 h-3" />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
