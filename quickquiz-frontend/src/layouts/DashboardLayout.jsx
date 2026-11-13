import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  UploadCloud,
  BrainCircuit,
  History,
  LogOut,
  Target,
  CheckSquare,
  ClipboardCheck,
  FileCheck2,
  Menu,
  X,
} from 'lucide-react';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const navItems = [
    { to: '/questions', icon: <BookOpen className="h-5 w-5" />, label: '题库中心' },
    { to: '/import', icon: <UploadCloud className="h-5 w-5" />, label: '智能录入' },
    { to: '/review', icon: <BrainCircuit className="h-5 w-5" />, label: '记忆流复习' },
    { to: '/exam', icon: <Target className="h-5 w-5" />, label: '模拟考场' },
    { to: '/web-exam', icon: <CheckSquare className="h-5 w-5" />, label: 'Web前端考试' },
    { to: '/project-management-exam', icon: <ClipboardCheck className="h-5 w-5" />, label: '项目管理考试' },
    { to: '/software-testing-exam', icon: <FileCheck2 className="h-5 w-5" />, label: '软件测试考试' },
    { to: '/analytics', icon: <History className="h-5 w-5" />, label: '数据分析' },
  ];

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="关闭导航遮罩"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}
      <aside
        data-testid="sidebar"
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-[#1e293b] text-slate-300 shadow-xl transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 p-6">
          <div className="rounded-lg bg-cyan-600 p-2">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white">QuickQuiz</h1>
          <button
            type="button"
            data-action="close-sidebar"
            aria-label="关闭导航"
            title="关闭导航"
            onClick={onClose}
            className="ml-auto rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-nav-path={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/15 font-medium text-cyan-300'
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-700/50 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            退出登录
          </button>
        </div>
      </aside>
    </>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-y-auto transition-all lg:ml-64">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 px-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-action="open-sidebar"
              aria-label="打开导航"
              title="打开导航"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="text-sm font-medium text-gray-500">QuickQuiz Learning Hub</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">U</div>
          </div>
        </header>

        <main className="w-full flex-1 bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
