import React, { useState, useRef } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  Calendar, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { Student, Company } from '../../types';

interface Form3SupervisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  companies: Company[];
  selectedStudentId?: string;
  onSaveEvaluation: (evaluationData: {
    studentId: string;
    score: number;
    grade: string;
    comment: string;
    mentorFeedback: string;
    safetyPassed: boolean;
    visitDate?: string;
  }) => void;
}

export const Form3SupervisionModal: React.FC<Form3SupervisionModalProps> = ({
  isOpen,
  onClose,
  students,
  selectedStudentId,
  onSaveEvaluation,
}) => {
  const [currentStudentId, setCurrentStudentId] = useState(selectedStudentId || students[0]?.id || 'std-1');
  const [score, setScore] = useState(19.5);
  const [grade, setGrade] = useState('ดีเยี่ยม (A)');
  const [safetyPassed, setSafetyPassed] = useState(true);
  const [mentorFeedback, setMentorFeedback] = useState('นักศึกษาปฏิบัติงานตรงต่อเวลา มีความรอบคอบในการทำงานกับระบบไฟฟ้าแรงดันสูง');
  const [comment, setComment] = useState('ตรวจหลักฐานภาพถ่ายครบถ้วน งานต่อสายและขันบัสบาร์ถูกต้องตามหลักวิศวกรรมไฟฟ้า');
  
  // Date and Time with calendar selection
  const [selectedDate, setSelectedDate] = useState('2026-10-21');
  const [selectedTime, setSelectedTime] = useState('13:30');
  const [isSaved, setIsSaved] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore >= 18) setGrade('ดีเยี่ยม (A)');
    else if (newScore >= 15) setGrade('ดีมาก (B+)');
    else if (newScore >= 12) setGrade('ปานกลาง (B)');
    else setGrade('ผ่านเกณฑ์ขั้นต่ำ (C)');
  };

  const getThaiDateFormatted = (dateStr: string, timeStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const beYear = year + 543;
    return `${day} ${thaiMonths[month - 1]} ${beYear} (${timeStr || '00:00'} น.)`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedVisitDateTime = getThaiDateFormatted(selectedDate, selectedTime);
    onSaveEvaluation({
      studentId: currentStudentId,
      score,
      grade,
      comment,
      mentorFeedback,
      safetyPassed,
      visitDate: formattedVisitDateTime,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-sm">
              #3
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">
                  Google Form #3 • แบบฟอร์มตรวจนิเทศก์ สอศ.
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  ภาคเรียนที่ 2/2569
                </span>
              </div>
              <h3 className="text-base font-bold text-white">บันทึกรายงานการนิเทศ & ประเมินสมรรถนะวิชาชีพ</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="p-12 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-800">บันทึกผลการนิเทศและคะแนนสำเร็จ!</h4>
            <p className="text-xs text-slate-500">
              วันและเวลานิเทศก์ ({getThaiDateFormatted(selectedDate, selectedTime)}) และคะแนนได้รับการบันทึกลง Firebase Firestore (internship2-2569) และเล่มรายงาน A4 เรียบร้อยแล้ว
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* Student Selector */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                เลือกนักศึกษาที่ต้องการประเมิน
              </label>
              <select
                value={currentStudentId}
                onChange={(e) => setCurrentStudentId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-sky-500"
              >
                {students.map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.studentCode} - {std.name} ({std.companyName})
                  </option>
                ))}
              </select>
            </div>

            {/* Visit Details & Calendar Date/Time Picker */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500 text-[11px] block">สถานประกอบการที่นิเทศ:</span>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">{currentStudent?.companyName}</p>
                </div>
                <div className="text-[11px] text-slate-500">
                  <span>ผู้รับการนิเทศ: </span>
                  <span className="font-semibold text-slate-700">{currentStudent?.name}</span>
                </div>
              </div>

              {/* วันและเวลานิเทศก์ พร้อมปฏิทิน Calendar */}
              <div className="pt-2.5 border-t border-slate-200/80 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>วันและเวลานิเทศก์:</span>
                  </label>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="text-slate-400">ปุ่มเลือกด่วน:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const now = new Date();
                        const y = now.getFullYear();
                        const m = String(now.getMonth() + 1).padStart(2, '0');
                        const d = String(now.getDate()).padStart(2, '0');
                        const hh = String(now.getHours()).padStart(2, '0');
                        const mm = String(now.getMinutes()).padStart(2, '0');
                        setSelectedDate(`${y}-${m}-${d}`);
                        setSelectedTime(`${hh}:${mm}`);
                      }}
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                    >
                      วันนี้
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDate('2026-10-19');
                        setSelectedTime('09:00');
                      }}
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                    >
                      สัปดาห์ 1 (19 ต.ค.)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  {/* Calendar Date Picker Input */}
                  <div className="sm:col-span-7 relative">
                    <div className="relative flex items-center">
                      <input
                        ref={dateInputRef}
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden cursor-pointer"
                        title="คลิกเพื่อเลือกวันที่จาก Calendar"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            dateInputRef.current?.showPicker();
                          } catch {
                            dateInputRef.current?.focus();
                          }
                        }}
                        className="absolute left-2.5 text-sky-600 hover:text-sky-800 transition cursor-pointer"
                        title="คลิกเพื่อเปิดปฏิทิน Calendar"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Time Picker Input */}
                  <div className="sm:col-span-5 relative">
                    <div className="relative flex items-center">
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden cursor-pointer"
                        required
                      />
                      <Clock className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Formatted Thai Preview Tag */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 border border-sky-100 text-[11px] text-sky-900">
                  <span className="font-semibold text-sky-700">🗓️ วันและเวลานิเทศก์:</span>
                  <span className="font-bold text-slate-900">{getThaiDateFormatted(selectedDate, selectedTime)}</span>
                  <span className="text-[10px] text-slate-500 ml-auto hidden sm:inline">
                    (คลิกที่ช่องวันที่เพื่อเปิดปฏิทิน)
                  </span>
                </div>
              </div>
            </div>

            {/* Safety & Discipline */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>การตรวจสอบด้านความปลอดภัยและวินัยวิชาชีพ</span>
              </div>
              <div className="space-y-1.5 text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyPassed}
                    onChange={(e) => setSafetyPassed(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>สวมใส่อุปกรณ์ PPE ครบถ้วน (หมวกนิรภัย, แว่นตานิรภัย, รองเท้า ESD) ตรงตามมาตรฐาน</span>
                </label>
              </div>
            </div>

            {/* Competency Score (out of 20) */}
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 text-sm">การให้คะแนนสมรรถนะวิชาชีพ</span>
                  <p className="text-[11px] text-slate-500">เกณฑ์มาตรฐาน สอศ. หมวดทักษะวิชาชีพช่างไฟฟ้า</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-sky-600">{score.toFixed(1)} / 20</div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    ระดับ: {grade}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="20"
                step="0.5"
                value={score}
                onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10.0 (พอใช้)</span>
                <span>15.0 (ดีมาก)</span>
                <span>18.0 (ดีเยี่ยม)</span>
                <span>20.0 (เต็ม)</span>
              </div>
            </div>

            {/* Mentor feedback */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                บันทึกการสัมภาษณ์ความคิดเห็นพี่เลี้ยง / วิศวกรควบคุมงาน
              </label>
              <textarea
                rows={2}
                value={mentorFeedback}
                onChange={(e) => setMentorFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-xs"
                placeholder="ระบุข้อเสนอแนะจากพี่เลี้ยงสถานประกอบการ"
                required
              />
            </div>

            {/* Teacher comment */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ความเห็นและคำแนะนำของครูนิเทศก์ (ลงเล่มรายงาน ทว.04)
              </label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-xs"
                placeholder="ข้อสังเกตและคำแนะนำเพื่อพัฒนางานสัปดาห์ถัดไป"
                required
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                ระบบจะลงนามดิจิทัลโดยอัตโนมัติในนาม อ.สุพรรณี ใจดี
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>บันทึกผลการนิเทศ (Google Form #3)</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
