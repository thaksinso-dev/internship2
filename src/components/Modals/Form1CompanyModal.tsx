import React, { useState } from 'react';
import { X, MapPin, Building, Phone, User, CheckCircle2, ShieldAlert, Save } from 'lucide-react';
import { Student } from '../../types';

interface Form1CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onSave: (updatedData: Partial<Student['companyRegistration']>) => void;
}

export const Form1CompanyModal: React.FC<Form1CompanyModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    companyName: student.companyName,
    department: student.companyRegistration.department,
    mentorName: student.companyRegistration.mentorName,
    mentorPhone: student.companyRegistration.mentorPhone,
    emergencyPhone: student.companyRegistration.emergencyPhone,
    gpsCoordinates: student.companyRegistration.gpsCoordinates,
    notes: student.companyRegistration.notes || '',
  });

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      department: formData.department,
      mentorName: formData.mentorName,
      mentorPhone: formData.mentorPhone,
      emergencyPhone: formData.emergencyPhone,
      gpsCoordinates: formData.gpsCoordinates,
      notes: formData.notes,
      registeredAt: new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) + ' (อัปเดตล่าสุด)',
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleGetGPS = () => {
    // Generate slight realistic GPS variation around Khon Kaen
    const lat = (16.4322 + (Math.random() - 0.5) * 0.005).toFixed(4);
    const lng = (102.8236 + (Math.random() - 0.5) * 0.005).toFixed(4);
    setFormData(prev => ({ ...prev, gpsCoordinates: `${lat}, ${lng}` }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header styled like Google Form header */}
        <div className="bg-gradient-to-r from-sky-800 to-indigo-900 text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-sky-600/60 flex items-center justify-center font-bold text-sm">
                #1
              </span>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-sky-200 font-semibold">
                  Google Form #1 • มาตรฐาน สอศ.
                </span>
                <h3 className="text-lg font-bold text-white">บันทึกข้อมูลสถานประกอบการ</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-sky-100 mt-2">
            บันทึกรายละเอียดสถานที่ฝึกงาน ข้อมูลพี่เลี้ยง และพิกัด GPS เพื่อใช้ในแผนการออกนิเทศก์ของครูที่ปรึกษา
          </p>
        </div>

        {isSaved ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-800">บันทึกและซิงค์ข้อมูลสำเร็จ!</h4>
            <p className="text-xs text-slate-500">ข้อมูลได้ถูกส่งเข้าสู่ Google Sheets ID #KK-PWR-2024 เรียบร้อยแล้ว</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Student Info preview */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{student.name} ({student.studentCode})</div>
                <div className="text-slate-500 text-[11px]">{student.level} {student.department} ห้อง {student.room}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                สถานะ: เชื่อมต่อ Sheets
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ชื่อสถานประกอบการฝึกอาชีพ</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">หน่วยงาน / แผนก</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อพี่เลี้ยง / ผู้ควบคุมงาน</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.mentorName}
                    onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">เบอร์ติดต่อพี่เลี้ยง</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.mentorPhone}
                    onChange={(e) => setFormData({ ...formData, mentorPhone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">เบอร์ติดต่อกรณีฉุกเฉิน</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>
            </div>

            {/* GPS Picker */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-slate-700">พิกัด GPS หมุดแผนที่ดาวเทียม</label>
                <button
                  type="button"
                  onClick={handleGetGPS}
                  className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1 text-[11px]"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ดึงพิกัดปัจจุบัน (GPS Pin)</span>
                </button>
              </div>
              <input
                type="text"
                value={formData.gpsCoordinates}
                onChange={(e) => setFormData({ ...formData, gpsCoordinates: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-700 bg-slate-50 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                placeholder="เช่น 16.4322, 102.8236"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">
                พิกัดนี้จะถูกนำไปใช้วางหมุดในระบบ Company Map Tracker เพื่อวางเส้นทางนิเทศก์
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">หมายเหตุเพิ่มเติม / จุดสังเกต</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden text-xs"
                placeholder="เช่น อาคารซ่อมบำรุงด้านหลังสถานีหม้อแปลง ให้ติดต่อป้อม รปภ. ก่อนเข้า"
              />
            </div>

            {/* Submit button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm transition inline-flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>บันทึกส่ง Google Form #1</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
