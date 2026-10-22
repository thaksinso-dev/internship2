import React from 'react';
import { 
  Zap, 
  Home, 
  GraduationCap, 
  UserCheck, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  User,
  Radio,
  Camera
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSheetsModal: () => void;
  onOpenLookerModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenSheetsModal,
  onOpenLookerModal,
}) => {
  const menuItems = [
    { id: 'hub', label: 'หน้าแรก Hub', icon: Home },
    { id: 'student', label: 'ส่วนนักศึกษา', icon: GraduationCap },
    { id: 'weekly-log', label: 'บันทึกปฏิบัติงาน & ภาพถ่าย', icon: Camera },
    { id: 'teacher', label: 'ส่วนครูนิเทศก์', icon: UserCheck },
    { id: 'map', label: 'แผนที่พิกัดสถานประกอบการ', icon: MapPin },
    { id: 'a4', label: 'สรุปรายงานการนิเทศ', icon: FileText },
    { id: 'admin', label: 'ผู้ดูแลระบบ', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-80px)] print:hidden">
      {/* Brand header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white p-0.5 border border-slate-200 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
            <img
              src="/assets/aistudio/unnamed_54baf6fc.jpg"
              alt="KKTECH Electrical Power Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight">KKTECH Power</div>
            <div className="text-[11px] text-slate-500">Internship System</div>
          </div>
        </div>

        {/* Sync pill */}
        <div 
          onClick={onOpenSheetsModal}
          className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs cursor-pointer hover:bg-emerald-100 transition"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-[11px]">Sheets Synced</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-mono">14:20 น.</span>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="p-3 space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-100">
          <div className="px-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            เครื่องมือเชื่อมต่อ
          </div>
          <button
            onClick={onOpenSheetsModal}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Google Sheets Master
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={onOpenLookerModal}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Looker Studio Dash
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </nav>

      {/* Footer teacher profile badge (as in screenshot) */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2.5 p-1.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4 text-slate-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-slate-900 truncate">อาจารย์สมศักดิ์ ว.</div>
            <div className="text-[10px] text-slate-500 truncate">somsak.w@kktech.ac.th</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
