import React from 'react';
import { 
  Home, TrendingUp, Users, BarChart2, Calendar, FileText, Settings, HelpCircle,
  Download, Upload, UserPlus, GraduationCap, BookOpen, Shield, 
  Search, Edit, Trash2, MoreVertical, Link, Link2Off, Mail, Calendar as CalendarIcon
} from 'lucide-react';

// استيراد المكونات والبيانات والـ CSS
import './App.css';
import { studentsData } from './data';
import { NavIcon, StatCard, ActionBtn } from './components/DashboardWidgets';

export default function App() {
  return (
    <div className="flex h-screen bg-[#110c22] text-white font-sans overflow-hidden" dir="ltr">
      
      {/* Sidebar */}
      <aside className="w-20 bg-[#16112a] border-r border-[#2a2442] flex flex-col items-center py-6 justify-between flex-shrink-0">
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl mb-6"></div>
          <NavIcon icon={<Home />} />
          <NavIcon icon={<TrendingUp />} />
          <NavIcon icon={<Users />} active />
          <NavIcon icon={<BarChart2 />} />
          <NavIcon icon={<Calendar />} />
          <NavIcon icon={<FileText />} />
        </div>
        <div className="flex flex-col gap-6 w-full items-center">
          <NavIcon icon={<Settings />} />
          <NavIcon icon={<HelpCircle />} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 text-right">
          <div>
            <h1 className="text-2xl font-bold mb-1">إدارة الصلاحيات والمستخدمين</h1>
            <p className="text-[#8e87a8] text-sm">إدارة الأمور، المعلمين، والطلاب مع ميزات الاستيراد والتصدير</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#211a3d] hover:bg-[#2a224d] rounded-lg text-sm transition">
              <span>تصدير</span> <Download size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#211a3d] hover:bg-[#2a224d] rounded-lg text-sm transition">
              <span>استيراد</span> <Upload size={16} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 transition">
              <span>إضافة طالب +</span> <UserPlus size={16} />
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard icon={<GraduationCap />} title="إجمالي الطلاب" value="342" color="bg-purple-500" trend="+12.5%" />
          <StatCard icon={<Users />} title="أولياء الأمور" value="284" color="bg-blue-400" trend="+8.3%" />
          <StatCard icon={<BookOpen />} title="المعلمين" value="12" color="bg-pink-500" trend="+2" />
          <StatCard icon={<Shield />} title="المسؤولين" value="8" color="bg-teal-400" trend="+1" />
        </div>

        {/* Tabs & Table... (تكملة الكود بنفس التنسيق) */}
        <div className="bg-[#1c1535] rounded-xl border border-[#2a2442] overflow-hidden">
            {/* ... الجدول يستخدم الآن studentsData.map ... */}
            <table className="w-full text-sm text-right">
                <tbody className="divide-y divide-[#2a2442]">
                    {studentsData.map((student) => (
                        <tr key={student.id} className="hover:bg-[#211a3d]/50 transition">
                            {/* ... باقي أعمدة الجدول ... */}
                            <td className="py-3 px-6">
                                <div className="flex items-center justify-center gap-2">
                                    <ActionBtn icon={<Edit size={14} />} color="text-blue-400 hover:bg-blue-500/20" />
                                    <ActionBtn icon={<Trash2 size={14} />} color="text-rose-400 hover:bg-rose-500/20" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </main>
    </div>
  );
}