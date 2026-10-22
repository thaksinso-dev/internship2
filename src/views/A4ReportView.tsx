import React, { useState } from 'react';
import { 
  Printer, 
  ExternalLink, 
  FileSpreadsheet, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Award, 
  Building, 
  ShieldCheck, 
  Zap, 
  FileCheck
} from 'lucide-react';
import { Student, WeeklySubmission } from '../types';
import { WEEKS_1_TO_15, getDefaultDailyLogsForWeek } from '../data/weeksData';

interface A4ReportViewProps {
  students: Student[];
  submissions: Record<string, WeeklySubmission[]>;
  initialStudentId?: string;
  onOpenSheetsModal: () => void;
  onOpenLookerModal: () => void;
}

export const A4ReportView: React.FC<A4ReportViewProps> = ({
  students,
  submissions,
  initialStudentId,
  onOpenSheetsModal,
  onOpenLookerModal,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId || students[0]?.id || 'std-1');
  const [selectedWeek, setSelectedWeek] = useState('8');

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const studentSubs = submissions[selectedStudentId] || [];
  const currentWeekMeta = WEEKS_1_TO_15.find(w => w.weekNumber === parseInt(selectedWeek)) || WEEKS_1_TO_15[7];
  const foundSub = studentSubs.find(s => s.weekNumber === parseInt(selectedWeek));
  const currentSub: WeeklySubmission = foundSub || {
    id: `sub-w${selectedWeek}`,
    studentId: currentStudent.id,
    weekNumber: parseInt(selectedWeek),
    dateRange: currentWeekMeta.dateRange,
    submittedAt: `${currentWeekMeta.dateRange.split('-')[1]?.trim() || '14 มิ.ย. 2569'} 17:30 น.`,
    status: 'graded',
    taskTitle: currentWeekMeta.defaultTask,
    totalHours: 40.0,
    mentorRating: 5.0,
    mentorComment: 'นักศึกษาตั้งใจปฏิบัติงาน สวมใส่อุปกรณ์คุ้มครองความปลอดภัย (PPE) ครบถ้วน มีความละเอียดรอบคอบในการขันบัสบาร์',
    mentorName: currentStudent.companyRegistration?.mentorName || 'นายชาญชัย มงคลศรี',
    mentorPosition: 'วิศวกรไฟฟ้า / พี่เลี้ยงประจำสถานประกอบการ',
    teacherScore: 19.5,
    teacherGrade: 'ดีเยี่ยม (A)',
    teacherComment: 'บันทึกข้อมูลเรียบร้อย ภาพหลักฐานชัดเจน มีการคำนวณและระบุค่าทดสอบความต้านทานดินตรงตามเกณฑ์มาตรฐาน วสท.',
    teacherName: currentStudent.supervisorTeacher || 'อ.สุพรรณี ใจดี',
    studentSignature: currentStudent.name.replace(/^(นาย|นางสาว)\s*/, ''),
    mentorSignature: 'ชาญชัย มงคลศรี',
    teacherSignature: 'สุพรรณี ใจดี',
    verifiedHash: `7B8C${currentStudent.studentCode}-KKTECH-2569-W${selectedWeek.padStart(2, '0')}-OK`,
    safetyChecklist: {
      hardHat: true,
      highVoltageGloves: true,
      safetyShoes: true,
      lotoProcedure: true
    },
    photos: currentWeekMeta.samplePhotos,
    dailyLogs: getDefaultDailyLogsForWeek(parseInt(selectedWeek))
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controller Bar (Hidden when printing) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-base font-bold text-slate-900">
                ระบบพิมพ์รายงานสัปดาห์ทางการ (A4 Formatter) • <span className="text-emerald-600 font-semibold">Live Synced</span>
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ดึงฐานข้อมูลฝึกงานระดับ ปวส. จาก Google Sheets บัญชีกลางอัตโนมัติ สัดส่วนมาตราฐานกระดาษราชการ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] bg-slate-100 text-slate-700 font-mono">
              Google Sheets ID: #KKTECH-PW-2024 (10 นาทีที่แล้ว)
            </span>
            <button
              onClick={onOpenSheetsModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>เปิด Sheets ดิบ</span>
            </button>
            <button
              onClick={onOpenLookerModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs"
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Looker Studio</span>
            </button>
          </div>
        </div>

        {/* Selector Filters & Print CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end text-xs">
          <div className="md:col-span-5">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              เลือกรหัสนักศึกษาและชื่อ-สกุล
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium text-slate-900 focus:ring-2 focus:ring-sky-500"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.studentCode} - {s.name} ({s.level} {s.department})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              สัปดาห์การฝึกงาน (ประจำงวดประเมิน)
            </label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium text-slate-900 focus:ring-2 focus:ring-sky-500 text-xs"
            >
              {WEEKS_1_TO_15.map((w) => (
                <option key={w.weekNumber} value={w.weekNumber.toString()}>
                  สัปดาห์ที่ {w.weekNumber} ({w.dateRange})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              <span>พิมพ์รายงาน A4 (Print PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards (Hidden when printing) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>ชั่วโมงสะสมสัปดาห์นี้</span>
            <Clock className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {currentSub.totalHours.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ 40 ชม.</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>สถานประกอบการ</span>
            <Building className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">
            {currentStudent.companyName}
          </div>
          <div className="text-[10px] text-emerald-700 font-medium">ได้รับการรับรอง MOU</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>การประเมินจากพี่เลี้ยง</span>
            <Award className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            ดีเยี่ยม <span className="text-xs font-normal text-slate-500">({currentSub.mentorRating.toFixed(1)}/5.0)</span>
          </div>
          <div className="text-[10px] text-slate-500">บันทึกครบถ้วน 5 วันทำการ</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>สถานะการอนุมัติ</span>
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ลงนามดิจิทัลครบ
            </span>
          </div>
          <div className="text-[10px] text-slate-500">พร้อมส่งฝ่ายวิชาการ ปวส.</div>
        </div>
      </div>

      {/* A4 Printable Sheet Container */}
      <div className="flex justify-center">
        <div
          id="a4-printable-document"
          className="bg-white w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 text-slate-900 font-sarabun text-[13px] leading-relaxed relative flex flex-col justify-between"
          style={{ boxSizing: 'border-box' }}
        >
          <div className="space-y-4">
            {/* College Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-3">
                {/* Official College Emblem */}
                <div className="w-16 h-16 rounded-full p-0.5 flex items-center justify-center bg-white shrink-0 overflow-hidden">
                  <img
                    src="/assets/aistudio/LogoKKTech_f25116a9.jpg"
                    alt="ตราสัญลักษณ์ทางการ วิทยาลัยเทคนิคขอนแก่น สำนักงานคณะกรรมการการอาชีวศึกษา"
                    className="w-full h-full object-contain drop-shadow-xs"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-950 font-sarabun leading-tight">
                    วิทยาลัยเทคนิคขอนแก่น
                  </h1>
                  <p className="text-xs text-slate-700 font-semibold font-sarabun">
                    แผนกวิชาช่างไฟฟ้ากำลัง • สำนักงานคณะกรรมการการอาชีวศึกษา
                  </p>
                  <p className="text-xs text-slate-800 font-bold font-sarabun mt-0.5">
                    แบบบันทึกและประเมินผลการฝึกประสบการณ์สมรรถนะวิชาชีพ (ทวิภาคี / ทว.04)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded bg-slate-900 text-white font-bold text-xs font-sans">
                  สัปดาห์ที่ {currentSub.weekNumber}
                </span>
                <div className="text-[11px] text-slate-500 mt-1">ประจำปีการศึกษา 2/2569</div>
                <div className="text-[10px] text-slate-400 font-mono">Google Form Sync ID: 40018-W08</div>
              </div>
            </div>

            {/* Student & Company Information Box */}
            <div className="border border-slate-800 p-3 rounded text-xs space-y-1.5 bg-slate-50/40">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div>
                  <span className="font-bold">ชื่อ-สกุล นักศึกษา:</span> {currentStudent.name}
                </div>
                <div>
                  <span className="font-bold">รหัสนักศึกษา:</span> <span className="font-mono">{currentStudent.studentCode}</span>
                </div>
                <div>
                  <span className="font-bold">ระดับชั้น / กลุ่ม:</span> {currentStudent.level} สาขางานติดตั้งระบบและความคุมไฟฟ้า (ก.1)
                </div>
                <div>
                  <span className="font-bold">ช่วงวันที่บันทึก:</span> {currentSub.dateRange}
                </div>
                <div>
                  <span className="font-bold">สถานประกอบการ:</span> {currentStudent.companyName}
                </div>
                <div>
                  <span className="font-bold">ครูฝึก/พี่เลี้ยง:</span> {currentSub.mentorName} ({currentSub.mentorPosition})
                </div>
                <div className="col-span-2">
                  <span className="font-bold">ครูนิเทศก์/ครูประจำวิชา:</span> {currentSub.teacherName} (แผนกวิชาช่างไฟฟ้ากำลัง วท.ขอนแก่น)
                </div>
              </div>
            </div>

            {/* Daily Electrical Work Log Table */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>ตารางบันทึกการปฏิบัติงานวิชาชีพรายวัน (Daily Electrical Work Log)</span>
                <span className="text-[11px] font-normal text-slate-600">กำหนดเวลา: จันทร์ - ศุกร์ (08:30 - 16:30 น.)</span>
              </div>

              <table className="w-full text-left border-collapse border border-slate-800 text-[11px]">
                <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-800">
                  <tr>
                    <th className="border border-slate-800 p-1.5 text-center w-20">วัน / วันที่</th>
                    <th className="border border-slate-800 p-1.5">รายละเอียดงานและสมรรถนะวิชาชีพที่ปฏิบัติจริง</th>
                    <th className="border border-slate-800 p-1.5 w-36">เครื่องมือ / อุปกรณ์</th>
                    <th className="border border-slate-800 p-1.5 text-center w-14">จำนวน ชม.</th>
                    <th className="border border-slate-800 p-1.5 text-center w-20">ผลประเมิน</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSub.dailyLogs.map((log) => (
                    <tr key={log.id} className="border-b border-slate-400">
                      <td className="border border-slate-800 p-1.5 text-center font-bold">
                        <div>{log.day}</div>
                        <div className="text-[10px] text-slate-600 font-normal">{log.date}</div>
                      </td>
                      <td className="border border-slate-800 p-1.5 leading-tight">
                        {log.taskDescription}
                      </td>
                      <td className="border border-slate-800 p-1.5 text-slate-700">
                        {log.toolsUsed}
                      </td>
                      <td className="border border-slate-800 p-1.5 text-center font-bold font-mono">
                        {log.hours.toFixed(1)}
                      </td>
                      <td className="border border-slate-800 p-1.5 text-center">
                        <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1 rounded">
                          {log.evaluation}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-slate-50 font-bold text-slate-950 border-t-2 border-slate-800">
                    <td colSpan={3} className="border border-slate-800 p-1.5 text-right font-bold">
                      รวมเวลาปฏิบัติงานทั้งสิ้นประจำสัปดาห์:
                    </td>
                    <td className="border border-slate-800 p-1.5 text-center font-mono text-sm text-sky-800">
                      40.0
                    </td>
                    <td className="border border-slate-800 p-1.5 text-center text-emerald-800 text-[10px]">
                      สมบูรณ์ 100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* On-site Photographic Evidence Section */}
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>รูปภาพประกอบการปฏิบัติงานจริง (On-site Photographic Evidence)</span>
                <span className="text-[10px] text-slate-500">บันทึกผ่านกล้องอุปกรณ์มือถือ Google Form</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {currentSub.photos.map((photo) => (
                  <div key={photo.id} className="border border-slate-800 rounded p-1 bg-white space-y-1">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-24 object-cover rounded-xs border border-slate-200"
                    />
                    <div className="text-[10px] font-bold text-slate-900 leading-tight">
                      {photo.title}
                    </div>
                    <div className="text-[9px] text-slate-600 leading-tight">
                      {photo.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures & Certification Box */}
            <div className="border border-slate-800 rounded p-3 text-xs grid grid-cols-3 gap-3 text-center bg-slate-50/20 mt-2">
              {/* Student Signature */}
              <div className="space-y-1 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-slate-700">ลงชื่อนักศึกษาผู้ฝึกงาน</span>
                <div className="h-10 flex items-end justify-center">
                  <span className="font-sarabun text-base font-bold italic text-sky-950 border-b border-dotted border-slate-800 px-3">
                    {currentSub.studentSignature}
                  </span>
                </div>
                <div className="text-[10px] text-slate-600">({currentStudent.name})</div>
                <div className="text-[9px] text-slate-400">วันที่ 14 มิ.ย. 2567</div>
              </div>

              {/* Mentor Signature */}
              <div className="space-y-1 border-x border-slate-300 px-2 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-slate-700">ความเห็นครูฝึกสถานประกอบการ</span>
                <div className="h-10 flex items-end justify-center">
                  <span className="font-sarabun text-base font-bold italic text-sky-950 border-b border-dotted border-slate-800 px-3">
                    {currentSub.mentorSignature}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.5 rounded">
                  [รับรองการปฏิบัติงาน 40 ชม. ครบถ้วน]
                </span>
                <div className="text-[10px] text-slate-600">({currentSub.mentorName})</div>
                <div className="text-[9px] text-slate-400">วิศวกรไฟฟ้า / พี่เลี้ยงประจำสัปดาห์</div>
              </div>

              {/* Teacher Signature */}
              <div className="space-y-1 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-slate-700">ผลการตรวจของครูนิเทศก์</span>
                <div className="h-10 flex items-end justify-center">
                  <span className="font-sarabun text-base font-bold italic text-sky-950 border-b border-dotted border-slate-800 px-3">
                    {currentSub.teacherSignature}
                  </span>
                </div>
                <span className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-1 py-0.5 rounded">
                  [ผ่านเกณฑ์สมรรถนะวิชาชีพ]
                </span>
                <div className="text-[10px] text-slate-600">({currentSub.teacherName})</div>
                <div className="text-[9px] text-slate-400">แผนกวิชาช่างไฟฟ้ากำลัง วท.ขอนแก่น</div>
              </div>
            </div>
          </div>

          {/* Security & Verification Footer */}
          <div className="pt-3 border-t border-slate-300 flex flex-wrap items-center justify-between text-[9px] text-slate-500 font-mono mt-4">
            <span>เอกสารฉบับนี้พิมพ์ผ่านระบบบันทึกผลการฝึกงานอิเล็กทรอนิกส์ KKTECH Electrical Power Vocational System</span>
            <span className="font-bold text-slate-700">VERIFIED HASH: SHA256 : {currentSub.verifiedHash}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
