import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  UploadCloud, 
  BrainCircuit, 
  History, 
  Settings, 
  LogOut,
  Target
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('storage'));
    navigate("/login");
  };

  const navItems = [
    { to: "/questions", icon: <BookOpen className="w-5 h-5" />, label: "题库中心" },
    { to: "/import", icon: <UploadCloud className="w-5 h-5" />, label: "智能录入" },
    { to: "/review", icon: <BrainCircuit className="w-5 h-5" />, label: "记忆流复习" },
    { to: "/exam", icon: <Target className="w-5 h-5" />, label: "模拟考场" },
    { to: "/analytics", icon: <History className="w-5 h-5" />, label: "数据分析" },
  ];

  return (
    <div className="w-64 h-screen bg-[#1e293b] text-slate-300 flex flex-col fixed left-0 top-0 overflow-y-auto shrink-0 shadow-xl z-10 transition-transform">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide font-sans">QuickQuiz</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-indigo-600/20 text-indigo-400 font-medium" 
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col transition-all overflow-hidden h-screen overflow-y-auto">
        <header className="h-16 bg-white/50 backdrop-blur-md border-b border-gray-200 shrink-0 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
          <div className="text-gray-500 text-sm font-medium">QuickQuiz Learning Hub</div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">U</div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 w-full bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
