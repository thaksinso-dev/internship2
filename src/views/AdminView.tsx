import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  BarChart3, 
  ExternalLink, 
  Download, 
  Upload, 
  Users, 
  Key, 
  Settings, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
  Lock,
  Layers
} from 'lucide-react';
import { Student, Company } from '../types';

interface AdminViewProps {
  students: Student[];
  companies: Company[];
  onOpenSheetsModal: () => void;
  onOpenLookerModal: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  students,
  companies,
  onOpenSheetsModal,
  onOpenLookerModal,
}) => {
  const [syncStatus, setSyncStatus] = useState('ปกติ (Real-time)');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('ซิงค์ข้อมูลล่าสุดเมื่อ ' + new Date().toLocaleTimeString('th-TH'));
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 flex items-center justify-center text-rose-400 font-bold shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">แผงควบคุมระบบ & หัวหน้าแผนกวิชาช่างไฟฟ้า</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">
                  Admin Console
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                จัดการฐานข้อมูล Google Sheets, มอบหมายครูนิเทศก์, จัดการสิทธิ์ความปลอดภัย และวิเคราะห์สถิติภาพรวม
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-600' : 'text-slate-500'}`} />
              <span>{isSyncing ? 'กำลังดึงข้อมูล Sheets...' : 'รีเฟรชข้อมูลคลาวด์'}</span>
            </button>
            <button
              onClick={onOpenSheetsModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>เปิด Google Sheet หลัก</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cloud Systems Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Firebase Firestore Cloud Card */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/5 rounded-full pointer-events-none"></div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              Firebase Firestore
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              Synced Live
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 truncate">internship2-2569</div>
          <p className="text-[11px] text-slate-500">
            Collections: students, companies, submissions
          </p>
          <div className="pt-2">
            <span className="text-amber-700 text-xs font-semibold flex items-center gap-1">
              <span>Data Field พร้อมบันทึกคลาวด์</span>
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-600" /> Google Sheets API v4
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
              Connected
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">2,450 เรคคอร์ด</div>
          <p className="text-[11px] text-slate-500">ID: #KK-PWR-2569 (Master Sheet ทวิภาคี)</p>
          <div className="pt-2">
            <button
              onClick={onOpenSheetsModal}
              className="text-emerald-700 hover:text-emerald-800 font-semibold text-xs flex items-center gap-1"
            >
              <span>ตรวจสอบโครงสร้างคอลัมน์</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-sky-600" /> Looker Analytics Service
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
              Live Engine
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">อัตราผ่าน 92.4%</div>
          <p className="text-[11px] text-slate-500">ซิงค์สถิติคะแนนสมรรถนะแบบอัตโนมัติ</p>
          <div className="pt-2">
            <button
              onClick={onOpenLookerModal}
              className="text-sky-700 hover:text-sky-800 font-semibold text-xs flex items-center gap-1"
            >
              <span>เปิด Dashboard แบบผู้บริหาร</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-indigo-600" /> Google SSO Domain Guard
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
              Active
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">@kktech.ac.th</div>
          <p className="text-[11px] text-slate-500">จำกัดสิทธิ์เฉพาะอาจารย์และนักศึกษาในสังกัด</p>
          <div className="pt-2 text-xs text-slate-500">
            ระบบตรวจสอบสิทธิ์ระดับ 2-Factor Authentication
          </div>
        </div>
      </div>

      {/* Roster & Operations Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Teachers and Groups Assignment */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">การมอบหมายครูนิเทศก์ประจำกลุ่ม (ปีการศึกษา 2569)</h3>
            <span className="text-xs text-sky-600 font-medium">เพิ่มกลุ่ม</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">อาจารย์สุพรรณี ใจดี</div>
                <div className="text-[11px] text-slate-500">กลุ่ม ปวส.2 ช่างไฟฟ้ากำลัง (ห้อง 1 และ 2)</div>
                <div className="text-[10px] text-sky-700 font-medium mt-0.5">ดูแล 42 คน • 24 สถานประกอบการ</div>
              </div>
              <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                ตรวจแล้ว 75%
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">อาจารย์ประสิทธิ์ วงศ์วิริยะ</div>
                <div className="text-[11px] text-slate-500">กลุ่ม ปวช.3 ช่างไฟฟ้ากำลัง (กลุ่มทวิภาคี)</div>
                <div className="text-[10px] text-sky-700 font-medium mt-0.5">ดูแล 28 คน • 14 สถานประกอบการ</div>
              </div>
              <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-sky-100 text-sky-800">
                ตรวจแล้ว 80%
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">อาจารย์สมศักดิ์ ว. (หัวหน้าแผนก)</div>
                <div className="text-[11px] text-slate-500">ตรวจสอบคุณภาพและมาตรฐานการประเมินผลกลาง</div>
                <div className="text-[10px] text-slate-500 mt-0.5">รับรองผลคะแนนเพื่อส่งงานทะเบียนวิทยาลัย</div>
              </div>
              <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-200 text-slate-700">
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Right: Terms & Submission Period Settings */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">การตั้งค่ารอบงวดการประเมิน (Current Term)</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              สถานะ: เปิดรับรายงาน
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 text-[11px] mb-1">ภาคเรียนปัจจุบัน</label>
                <input
                  type="text"
                  defaultValue="ภาคเรียนที่ 2 / 2569"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-[11px] mb-1">งวดสัปดาห์ปัจจุบัน</label>
                <input
                  type="text"
                  defaultValue="สัปดาห์ที่ 8 จาก 18 สัปดาห์"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 text-[11px] mb-1">กำหนดเวลาปิดระบบ Google Form ประจำสัปดาห์</label>
              <input
                type="text"
                defaultValue="ทุกวันอาทิตย์ เวลา 23:59 น."
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-50 font-medium"
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>การส่งออกคะแนนสุดท้ายเพื่อตัดเกรด</span>
              </div>
              <p>
                เมื่อสิ้นสุดสัปดาห์ที่ 18 ระบบจะรวมคะแนนจากครูฝึกสถานประกอบการ (50%) + ครูนิเทศก์ (30%) + เล่มรายงาน (20%) เพื่อส่งออกเป็นไฟล์ Excel มาตรฐานงานวัดผล วท.ขอนแก่น
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={onOpenSheetsModal}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition"
              >
                บันทึกการตั้งค่า
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
