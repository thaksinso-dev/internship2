import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ExternalLink, 
  BarChart3, 
  Printer, 
  Search, 
  Download, 
  MoreVertical, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck, 
  Calendar,
  Sparkles,
  PieChart
} from 'lucide-react';
import { Student, Company, WeeklySubmission } from '../types';

interface TeacherViewProps {
  students: Student[];
  companies: Company[];
  submissions: Record<string, WeeklySubmission[]>;
  onOpenForm3: (studentId?: string) => void;
  onNavigateA4: (studentId?: string) => void;
  onOpenSheetsModal: () => void;
  onOpenLookerModal: () => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  students,
  companies,
  submissions,
  onOpenForm3,
  onNavigateA4,
  onOpenSheetsModal,
  onOpenLookerModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredStudents = students.filter((std) => {
    const matchesSearch =
      std.name.includes(searchTerm) ||
      std.studentCode.includes(searchTerm) ||
      std.companyName.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top verified header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-950 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md">
              สจ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">อาจารย์สุพรรณี ใจดี</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-800">
                  ครูนิเทศก์ประจำกลุ่ม ปวส.2
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                  สิทธิ์: ครูนิเทศก์ผู้สอน (Teacher/Supervisor)
                </span>
                <span>•</span>
                <span>supannee.j@kktech.ac.th</span>
                <span>•</span>
                <span>แผนกวิชาช่างไฟฟ้ากำลัง ขอนแก่น</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Data Base:</span> Google Sheets ID #KK-PWR-2024
            </div>
            <button
              onClick={onOpenSheetsModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold shadow-2xs transition"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>เปิดชีตฐานข้อมูลกลาง</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">สถานประกอบการ</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">24</div>
            <div className="text-[11px] text-slate-500 mt-1">แห่งที่ดูแลภาคเรียนนี้</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">นักศึกษาในดูแล</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">42</div>
            <div className="text-[11px] text-slate-500 mt-1">ปวส.2 ช่างไฟฟ้า (2 ห้อง)</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">ตรวจนิเทศแล้ว</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">18 <span className="text-xs text-slate-400 font-normal">/ 24 แห่ง</span></div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">ความคืบหน้ารวม 75%</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">รอลงพื้นที่ตรวจ</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">6</div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">มีนัดสัปดาห์นี้ 3 แห่ง</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action Cards (Card 3 Form #3 & Card 4 Analysis & Print) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Form #3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <span className="text-[11px] font-semibold text-slate-500">แบบฟอร์มการตรวจนิเทศก์</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                Google Form #3
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">บันทึกรายงานการนิเทศประจำสัปดาห์</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                บันทึกข้อมูลการลงพื้นที่ตรวจสถานประกอบการ บันทึกการสัมภาษณ์พี่เลี้ยง ตรวจสอบสมุดบันทึกงาน และประเมินความปลอดภัยทางไฟฟ้า
              </p>
            </div>

            {/* Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="font-semibold text-slate-800 text-[11px]">รายการสำคัญในแบบฟอร์มนิเทศก์:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> วันและเวลานิเทศก์ (เลือกจาก Calendar)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> เลือกระบุรายชื่อนักศึกษาในสังกัด
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ประเมินวินัย & Safety ไฟฟ้า
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> บันทึกความเห็นพี่เลี้ยงโรงงาน
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium col-span-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> แนบภาพถ่ายการตรวจเยี่ยม (บันทึกลง Google Drive)
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>ประวัติการบันทึกล่าสุด: การไฟฟ้าส่วนภูมิภาค ขอนแก่น 2</span>
                <span className="text-slate-400">เมื่อวาน 15:30 น.</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenForm3()}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>เปิดแบบฟอร์มนิเทศการฝึกงาน (Google Form #3)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Right: Print & Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <span className="text-[11px] font-semibold text-slate-500">ระบบวิเคราะห์ & พิมพ์เอกสาร</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
                Sheets + Looker
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">พิมพ์ / สรุปรายงานประจำสัปดาห์</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ดึงข้อมูลสถิติเวลาปฏิบัติงานและสมุดบันทึกรายวันของนักศึกษา วิเคราะห์สมรรถนะช่างไฟฟ้า พร้อมออกเอกสารประเมินผล A4 ตามระเบียบ
              </p>
            </div>

            {/* Radial metric */}
            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">อัตราการส่งบันทึกประจำสัปดาห์</span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">92.4%</div>
                <div className="text-[11px] text-emerald-700 font-medium">สูงกว่าเกณฑ์ขั้นต่ำ 80%</div>
              </div>
              {/* Ring meter */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#0284c7"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={163.3}
                    strokeDashoffset={163.3 * (1 - 0.924)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-bold text-xs text-sky-900 font-mono">W-12</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
              <span className="px-2.5 py-1 rounded-md bg-slate-100">ฟอร์แมต A4 สอศ. มาตรฐาน</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100">อัปเดตอัตโนมัติ Real-time</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigateA4()}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>สรุปผล & รายการตรวจ</span>
            </button>
            <button
              onClick={onOpenLookerModal}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition flex items-center justify-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Looker Studio เต็ม</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Export */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Search className="w-4 h-4 text-sky-600" />
            <span>ตัวกรองข้อมูลนิเทศก์ & รายงานผล</span>
          </div>
          <button
            onClick={onOpenSheetsModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออกคะแนนรวมเป็น Excel / Sheets</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] text-slate-500 mb-1">ระดับชั้น / กลุ่มเรียน</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">ปวส.2 ช่างไฟฟ้ากำลัง (กลุ่ม 1-2)</option>
              <option value="room1">ปวส.2 ห้อง 1</option>
              <option value="room2">ปวส.2 ห้อง 2</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 mb-1">ประเภทสถานประกอบการ</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">ทุกประเภทสถานประกอบการ</option>
              <option value="high-voltage">สถานีไฟฟ้าแรงสูง / PEA / EGAT</option>
              <option value="factory">โรงงานอุตสาหกรรม / MDB / PLC</option>
              <option value="solar">Solar Cell & พลังงานแสงอาทิตย์</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 mb-1">สถานะการตรวจรายงาน</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">ทั้งหมด (รอตรวจ & ตรวจแล้ว)</option>
              <option value="graded">ตรวจแล้ว</option>
              <option value="pending">รอตรวจประเมิน</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 mb-1">ค้นหาชื่อ / รหัสนักศึกษา</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, สกุล หรือสถานประกอบ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Student Assessment List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              รายการบันทึกสมรรถนะการฝึกงานประจำสัปดาห์ (สัปดาห์ที่ 12)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            แสดงข้อมูล {filteredStudents.length} จาก 42 รายชื่อล่าสุด
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 text-slate-600 text-[11px] font-semibold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">รหัสนักศึกษา / ชื่อ-นามสกุล</th>
                <th className="py-3 px-4">สถานประกอบการ</th>
                <th className="py-3 px-3 text-center">สัปดาห์ที่</th>
                <th className="py-3 px-4">สถานะการตรวจ</th>
                <th className="py-3 px-4">คะแนนสมรรถนะ</th>
                <th className="py-3 px-4 text-center">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredStudents.map((std, idx) => {
                const sub = submissions[std.id]?.[0];
                const isGraded = idx !== 1; // demo variance
                const score = idx === 0 ? '19.5' : idx === 2 ? '18.0' : idx === 3 ? '17.5' : '-';
                const gradeLabel = idx === 0 ? 'ระดับดีเยี่ยม (A)' : idx === 2 ? 'ระดับดีมาก (B+)' : idx === 3 ? 'ระดับดีมาก (B)' : 'รอการประเมิน';

                return (
                  <tr key={std.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {std.initials}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{std.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            รหัส {std.studentCode} • {std.level}/{std.room}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900">{std.companyName}</div>
                      <div className="text-[10px] text-sky-700">{std.companyRegistration.department}</div>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-800">
                      W-12
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isGraded ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          ตรวจประเมินแล้ว
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          รอครูนิเทศก์ลงคะแนน
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isGraded ? (
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{score}</span>
                          <span className="text-[10px] text-slate-400">/20</span>
                          <div className="text-[10px] text-sky-700 font-semibold">{gradeLabel}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">- รอการประเมิน -</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onNavigateA4(std.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
                        >
                          <Printer className="w-3 h-3 text-slate-500" />
                          <span>พิมพ์ A4</span>
                        </button>
                        <button
                          onClick={() => onOpenForm3(std.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
                        >
                          <span>บันทึกตรวจ</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching screenshot */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div>แสดงรายการ 1-4 จากทั้งหมด 42 คน (หน้า 1 จาก 11)</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs">
              ย้อนกลับ
            </button>
            <button className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-xs">
              1
            </button>
            <button className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs">
              2
            </button>
            <button className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs">
              11
            </button>
            <button className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs">
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
