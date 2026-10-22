import React, { useState } from 'react';
import { X, Table, Download, Search, RefreshCw, Filter, CheckCircle2 } from 'lucide-react';
import { Student } from '../../types';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  students,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWeek, setFilterWeek] = useState('all');

  if (!isOpen) return null;

  // Generate simulated sheet rows
  const mockSheetRows = [
    {
      timestamp: '14/06/2024 17:30:15',
      studentCode: '65301040018',
      studentName: 'นายธนากร สุริยะแสง',
      company: 'การไฟฟ้าส่วนภูมิภาค สาขาขอนแก่น (PEA)',
      week: 'สัปดาห์ที่ 8',
      hours: '40',
      task: 'ติดตั้งตู้ MDB & Wiring Control',
      tools: 'ประแจปอนด์, เครื่องเป่าลม, Megger Test',
      groundResistance: '3.84 Ω',
      ppeStatus: 'ผ่าน 100%',
      mentorScore: '5.0',
      teacherScore: '19.5',
      grade: 'A',
      inspector: 'อ.สุพรรณี ใจดี',
      status: 'อนุมัติแล้ว'
    },
    {
      timestamp: '14/06/2024 16:45:20',
      studentCode: '66301040012',
      studentName: 'นายกิตติศักดิ์ เจริญศรี',
      company: 'การไฟฟ้าส่วนภูมิภาค สาขาขอนแก่น (PEA)',
      week: 'สัปดาห์ที่ 8',
      hours: '40',
      task: 'บำรุงรักษาสถานีไฟฟ้า 115 kV',
      tools: 'Earth Tester, Clamp Meter',
      groundResistance: '3.10 Ω',
      ppeStatus: 'ผ่าน 100%',
      mentorScore: '5.0',
      teacherScore: '19.5',
      grade: 'A',
      inspector: 'อ.สุพรรณี ใจดี',
      status: 'อนุมัติแล้ว'
    },
    {
      timestamp: '14/06/2024 18:10:02',
      studentCode: '66301040018',
      studentName: 'นายชนาภัทร สมบูรณ์ผล',
      company: 'บจก. ไทยเพาเวอร์ คอนโทรล ขอนแก่น',
      week: 'สัปดาห์ที่ 8',
      hours: '40',
      task: 'งานประกอบตู้ควบคุม MDB & PLC',
      tools: 'คีมย้ำหางปลา, โน้ตบุ๊กทดสอบ PLC',
      groundResistance: '4.20 Ω',
      ppeStatus: 'ผ่าน 100%',
      mentorScore: '4.8',
      teacherScore: '18.0',
      grade: 'B+',
      inspector: 'อ.สุพรรณี ใจดี',
      status: 'รอประเมิน'
    },
    {
      timestamp: '13/06/2024 15:20:44',
      studentCode: '66301040024',
      studentName: 'นางสาวสุจิตรา วรรณดี',
      company: 'บจก. สยามคูโบต้า คอร์ปอเรชั่น',
      week: 'สัปดาห์ที่ 8',
      hours: '40',
      task: 'ฝ่ายระบบไฟฟ้ายานยนต์และมอเตอร์ขับเคลื่อน',
      tools: 'Multimeter, Battery Tester',
      groundResistance: '2.95 Ω',
      ppeStatus: 'ผ่าน 100%',
      mentorScore: '4.9',
      teacherScore: '18.0',
      grade: 'B+',
      inspector: 'อ.สุพรรณี ใจดี',
      status: 'อนุมัติแล้ว'
    },
    {
      timestamp: '13/06/2024 14:15:10',
      studentCode: '66301040033',
      studentName: 'นายอนุรักษ์ โพธิ์แก้ว',
      company: 'บจก. อีสานโซลาร์เอนเนอร์ยี ขอนแก่น',
      week: 'สัปดาห์ที่ 8',
      hours: '40',
      task: 'ติดตั้งระบบ Solar Rooftop & อินเวอร์เตอร์ 3 เฟส',
      tools: 'PV Clamp, Torque Wrench, MC4 Crimper',
      groundResistance: '3.60 Ω',
      ppeStatus: 'ผ่าน 100%',
      mentorScore: '4.7',
      teacherScore: '17.5',
      grade: 'B',
      inspector: 'อ.สุพรรณี ใจดี',
      status: 'อนุมัติแล้ว'
    },
    {
      timestamp: '07/06/2024 19:15:22',
      studentCode: '65301040018',
      studentName: 'นายธนากร สุริยะแสง',
      company: 'การไฟฟ้าส่วนภูมิภาค สาขาขอนแก่น (PEA)',
      week: 'สัปดาห์ที่ 7',
      hours: '40',
      task: 'ตรวจสอบหม้อแปลงไฟฟ้าจำหน่ายและการทดสอบ Insulation',
      tools: 'Megger 5000V, ประแจปอนด์',
      groundResistance: '3.80 Ω',
      ppeStatus: 'ผ่าน 100%',
      mentorScore: '5.0',
      teacherScore: '19.5',
      grade: 'A',
      inspector: 'อ.สุพรรณี ใจดี',
      status: 'อนุมัติแล้ว'
    }
  ];

  const filteredRows = mockSheetRows.filter((r) => {
    const matchesSearch = 
      r.studentName.includes(searchTerm) ||
      r.studentCode.includes(searchTerm) ||
      r.company.includes(searchTerm) ||
      r.task.includes(searchTerm);
    const matchesWeek = filterWeek === 'all' || r.week.includes(filterWeek);
    return matchesSearch && matchesWeek;
  });

  const handleExportCSV = () => {
    const headers = 'Timestamp,StudentCode,Name,Company,Week,Hours,Task,GroundResistance,PPE,MentorScore,TeacherScore,Grade,Inspector,Status\n';
    const csvContent = filteredRows.map(r => 
      `"${r.timestamp}","${r.studentCode}","${r.studentName}","${r.company}","${r.week}","${r.hours}","${r.task}","${r.groundResistance}","${r.ppeStatus}","${r.mentorScore}","${r.teacherScore}","${r.grade}","${r.inspector}","${r.status}"`
    ).join('\n');
    
    const blob = new Blob(['\uFEFF' + headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'KKTECH_Internship_Master_Data_2567.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-4 px-6 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Table className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Google Sheets Master Data (ID: #KK-PWR-2569)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  2,450 rows • Auto-Sync & Firebase
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                ฐานข้อมูลกลางเชื่อมโยง Google Form #1, #2, #3, Firebase (internship2-2569) และ Looker Studio แบบเรียลไทม์
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, รหัสนักศึกษา, หรือสถานประกอบการ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <select
              value={filterWeek}
              onChange={(e) => setFilterWeek(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
            >
              <option value="all">ทุกสัปดาห์</option>
              <option value="8">สัปดาห์ที่ 8</option>
              <option value="7">สัปดาห์ที่ 7</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px]">แสดง {filteredRows.length} รายการ</span>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลดเป็น CSV / Excel</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 text-[11px] font-semibold sticky top-0 border-b border-slate-200">
              <tr>
                <th className="p-2.5 pl-4">Timestamp</th>
                <th className="p-2.5">รหัสนักศึกษา</th>
                <th className="p-2.5">ชื่อ-นามสกุล</th>
                <th className="p-2.5">สถานประกอบการ</th>
                <th className="p-2.5">งวด/สัปดาห์</th>
                <th className="p-2.5">ชม.</th>
                <th className="p-2.5">หัวข้องาน</th>
                <th className="p-2.5">ค่ากราวด์</th>
                <th className="p-2.5">PPE</th>
                <th className="p-2.5">คะแนน/20</th>
                <th className="p-2.5">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition font-mono text-[11px]">
                  <td className="p-2.5 pl-4 text-slate-500 whitespace-nowrap">{row.timestamp}</td>
                  <td className="p-2.5 font-bold text-slate-900">{row.studentCode}</td>
                  <td className="p-2.5 font-sans font-medium">{row.studentName}</td>
                  <td className="p-2.5 font-sans text-slate-600 max-w-xs truncate">{row.company}</td>
                  <td className="p-2.5 font-sans whitespace-nowrap">{row.week}</td>
                  <td className="p-2.5">{row.hours}</td>
                  <td className="p-2.5 font-sans text-slate-700 max-w-xs truncate">{row.task}</td>
                  <td className="p-2.5 text-sky-700">{row.groundResistance}</td>
                  <td className="p-2.5 text-emerald-700 font-sans">{row.ppeStatus}</td>
                  <td className="p-2.5 font-bold text-sky-700">{row.teacherScore} ({row.grade})</td>
                  <td className="p-2.5 font-sans">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>เชื่อมต่อผ่าน Google Sheets API v4 (Service Account: kktech-service@appspot.gserviceaccount.com)</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
