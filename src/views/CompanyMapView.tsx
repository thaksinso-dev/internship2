import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  ExternalLink, 
  Download, 
  Plus, 
  Phone, 
  Users, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Zap, 
  Radio, 
  ChevronRight, 
  Route, 
  Compass, 
  Eye,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Company, Student } from '../types';

interface CompanyMapViewProps {
  companies: Company[];
  students: Student[];
  onOpenForm1: () => void;
  onOpenForm3: (studentId?: string) => void;
}

export const CompanyMapView: React.FC<CompanyMapViewProps> = ({
  companies,
  students,
  onOpenForm1,
  onOpenForm3,
}) => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCompanyId, setActiveCompanyId] = useState<string>('comp-1');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isNavigating, setIsNavigating] = useState(false);

  // Filter companies
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.includes(searchTerm) ||
      c.address.includes(searchTerm) ||
      c.contactPerson.includes(searchTerm);
    const matchesZone = selectedZone === 'all' || c.zone === selectedZone;
    const matchesSector = selectedSector === 'all' || c.sector === selectedSector;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

    return matchesSearch && matchesZone && matchesSector && matchesStatus;
  });

  const activeCompany = companies.find((c) => c.id === activeCompanyId) || companies[0];

  const handleStartRoute = () => {
    setIsNavigating(true);
    // opens google maps navigation route in new tab
    const url = `https://www.google.com/maps/dir/Khon+Kaen+Technical+College/PEA+Khon+Kaen/Thai+Power+Control+Khon+Kaen`;
    window.open(url, '_blank');
  };

  const handleExportKML = () => {
    const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>KKTECH Electrical Internship Companies 2567</name>
    ${filteredCompanies.map(c => `
    <Placemark>
      <name>${c.name}</name>
      <description>${c.address} | โทร: ${c.phone}</description>
      <Point>
        <coordinates>${c.lng},${c.lat},0</coordinates>
      </Point>
    </Placemark>`).join('')}
  </Document>
</kml>`;

    const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'KKTECH_Company_Pins.kml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Subtitle matching Screenshot 7 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-700">WGS84 GPS Real-time Sync</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">อัปเดตเมื่อ 8 นาทีที่แล้ว (Google Sheets API v4)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              แผนที่พิกัดรวมสถานประกอบการฝึกงาน (Company Map Tracker)
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              ระบบติดตามจุดฝึกงานนักศึกษา แผนกวิชาช่างไฟฟ้ากำลัง วิทยาลัยเทคนิคขอนแก่น ประจำปีการศึกษา 2567
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportKML}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium shadow-2xs transition"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>ส่งออกพิกัด (KML/Excel)</span>
            </button>
            <a
              href="https://maps.google.com/?q=Khon+Kaen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium shadow-2xs transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>เปิด Google Maps ใหญ่</span>
            </a>
            <button
              onClick={onOpenForm1}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>เพิ่มสถานประกอบการ (Form #1)</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">สถานประกอบการทั้งหมด</span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">24 <span className="text-xs font-normal text-slate-500">แห่ง (4 โซน)</span></div>
              <div className="text-[10px] text-slate-500 mt-0.5">ครอบคลุม จ.ขอนแก่น & ปริมณฑล</div>
            </div>
            <Building2 className="w-7 h-7 text-sky-600/70" />
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">นิเทศเสร็จสิ้นแล้ว</span>
              <div className="text-2xl font-bold text-emerald-600 mt-0.5">18 <span className="text-xs font-normal text-slate-500">แห่ง (75%)</span></div>
              <div className="text-[10px] text-emerald-700 font-medium mt-0.5">ตามเกณฑ์รอบแรก</div>
            </div>
            <CheckCircle2 className="w-7 h-7 text-emerald-600/70" />
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">รอลงพื้นที่สัปดาห์นี้</span>
              <div className="text-2xl font-bold text-amber-600 mt-0.5">6 <span className="text-xs font-normal text-slate-500">แห่งเร่งด่วน</span></div>
              <div className="text-[10px] text-amber-700 font-medium mt-0.5">นัดหมายแล้ววันนี้ 2 แห่ง</div>
            </div>
            <Clock className="w-7 h-7 text-amber-600/70" />
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">นักศึกษาฝึกงานในระบบ</span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">42 <span className="text-xs font-normal text-slate-500">คน (ครบ 100%)</span></div>
              <div className="text-[10px] text-slate-500 mt-0.5">ปวส.2: 28  ปวช.3: 14</div>
            </div>
            <Users className="w-7 h-7 text-indigo-600/70" />
          </div>
        </div>

        {/* Filters & Zone Pills */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="ค้นหาชื่อสถานประกอบการ, รหัส/ชื่อนักศึกษา, พี่เลี้ยง หรือโซน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Zone Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-400 font-medium mr-1">โซน:</span>
              {[
                { id: 'all', label: 'ทั้งหมด (24)' },
                { id: 'อ.เมือง', label: 'อ.เมือง (14)' },
                { id: 'อ.น้ำพอง', label: 'อ.น้ำพอง (4)' },
                { id: 'อ.บ้านไผ่', label: 'อ.บ้านไผ่ (3)' },
                { id: 'อ.ชุมแพ', label: 'อ.ชุมแพ (3)' },
              ].map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    selectedZone === zone.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {zone.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">สายงานไฟฟ้า:</span>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-2 py-1 border border-slate-300 rounded text-xs bg-white"
              >
                <option value="all">ทุกสายงาน</option>
                <option value="high-voltage">สถานีไฟฟ้าแรงสูง/PEA/EGAT</option>
                <option value="factory">โรงงานอุตสาหกรรม/MDB/PLC</option>
                <option value="solar">Solar Cell & พลังงานทดแทน</option>
                <option value="building">ติดตั้งไฟฟ้าอาคาร</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">สถานะ:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1 border border-slate-300 rounded text-xs bg-white"
              >
                <option value="all">ทั้งหมด (24)</option>
                <option value="scheduled_today">รอตรวจวันนี้</option>
                <option value="completed">นิเทศเสร็จแล้ว</option>
                <option value="scheduled_soon">นัดหมายเร็วๆ นี้</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map & Company List Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Container (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm relative overflow-hidden flex flex-col">
          {/* Map canvas wrapper */}
          <div className="relative w-full h-[520px] bg-[#dbeafe] rounded-xl overflow-hidden border border-slate-200 shadow-inner select-none">
            {/* SVG Interactive Map of Khon Kaen */}
            <svg
              viewBox="0 0 800 650"
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Background terrain */}
              <rect width="800" height="650" fill="#e8f3ea" />

              {/* Water bodies: Bueng Kaen Nakhon & Bueng Thung Sang */}
              <ellipse cx="460" cy="380" rx="45" ry="32" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="2" />
              <text x="430" y="385" fontSize="10" fill="#0284c7" fontWeight="bold">บึงแก่นนคร</text>

              <ellipse cx="490" cy="240" rx="35" ry="25" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="2" />
              <text x="465" y="245" fontSize="9" fill="#0284c7" fontWeight="bold">บึงทุ่งสร้าง</text>

              {/* District boundaries & labels */}
              <text x="390" y="320" fontSize="18" fill="#94a3b8" fontWeight="bold" letterSpacing="4">
                KHON KAEN
              </text>
              <text x="410" y="340" fontSize="12" fill="#64748b" fontWeight="600">
                ตำบลในเมือง (NAI MUEANG)
              </text>
              <text x="280" y="300" fontSize="11" fill="#64748b" fontWeight="500">
                BAN PED SUB-DISTRICT (บ้านเป็ด)
              </text>
              <text x="390" y="160" fontSize="12" fill="#64748b" fontWeight="600">
                ต.ศิลา (SILA)
              </text>
              <text x="390" y="520" fontSize="12" fill="#64748b" fontWeight="600">
                ต.ท่าพระ (THA PHRA)
              </text>

              {/* Main Highway Networks (Mittraphap Highway 2, Maliwan 12, Prachasamosorn) */}
              {/* Highway 2 (Mittraphap - North to South) */}
              <line x1="430" y1="20" x2="430" y2="630" stroke="#fcd34d" strokeWidth="9" />
              <line x1="430" y1="20" x2="430" y2="630" stroke="#f59e0b" strokeWidth="5" />
              <circle cx="430" cy="80" r="12" fill="#dc2626" />
              <text x="426" y="84" fontSize="10" fill="white" fontWeight="bold">2</text>
              <circle cx="430" cy="580" r="12" fill="#dc2626" />
              <text x="426" y="584" fontSize="10" fill="white" fontWeight="bold">2</text>

              {/* Highway 12 (Maliwan - West to East) */}
              <line x1="20" y1="320" x2="780" y2="320" stroke="#fcd34d" strokeWidth="7" />
              <line x1="20" y1="320" x2="780" y2="320" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="100" cy="320" r="10" fill="#dc2626" />
              <text x="94" y="324" fontSize="9" fill="white" fontWeight="bold">12</text>

              {/* Prachasamosorn Road */}
              <line x1="430" y1="280" x2="680" y2="280" stroke="#ffffff" strokeWidth="6" strokeDasharray="6,4" />
              <text x="480" y="275" fontSize="9" fill="#475569" fontWeight="bold">ถ.ประชาสโมสร</text>

              {/* Outer Ring Road (230) */}
              <ellipse cx="430" cy="330" rx="280" ry="240" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeDasharray="10,5" />
              <text x="560" y="115" fontSize="10" fill="#64748b" fontWeight="bold">ถนนเลี่ยงเมือง (230)</text>

              {/* Recommended Cluster Loop Route Highlight */}
              <path
                d="M 400 310 L 480 280 L 445 190"
                fill="none"
                stroke="#0284c7"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="8,6"
                className="animate-pulse"
              />

              {/* Origin Marker: Khon Kaen Technical College (วท.ขอนแก่น) */}
              <g transform="translate(400, 310)">
                <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
                <path d="M-6 2 L0 -10 L6 2 Z" fill="#38bdf8" />
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                <text x="-40" y="28" fontSize="11" fill="#0f172a" fontWeight="bold">
                  วท.ขอนแก่น (ศูนย์กลาง)
                </text>
              </g>

              {/* Interactive Company Pins */}
              {/* Pin 1: PEA Khon Kaen */}
              <g
                transform="translate(480, 280)"
                className="cursor-pointer group"
                onClick={() => setActiveCompanyId('comp-1')}
              >
                <circle cx="0" cy="0" r="20" fill="#eab308" opacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="18" fill="#eab308" stroke="#ffffff" strokeWidth="3" className="drop-shadow-sm" />
                <path d="M-2 -8 L4 -8 L-1 1 L3 1 L-3 9 L-1 2 L-4 2 Z" fill="#ffffff" />
                <text x="18" y="5" fontSize="11" fill="#0f172a" fontWeight="bold">
                  กฟภ. ขอนแก่น (PEA)
                </text>
              </g>

              {/* Pin 2: Thai Power Control */}
              <g
                transform="translate(445, 190)"
                className="cursor-pointer group"
                onClick={() => setActiveCompanyId('comp-2')}
              >
                <circle cx="0" cy="0" r="16" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                <path d="M-2 -6 L3 -6 L-1 1 L2 1 L-2 7 L-1 2 L-3 2 Z" fill="#ffffff" />
                <text x="18" y="5" fontSize="10" fill="#0f172a" fontWeight="bold">
                  ไทยเพาเวอร์ คอนโทรล
                </text>
              </g>

              {/* Pin 3: Siam Kubota */}
              <g
                transform="translate(435, 120)"
                className="cursor-pointer group"
                onClick={() => setActiveCompanyId('comp-3')}
              >
                <circle cx="0" cy="0" r="15" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="5" fill="#ffffff" />
                <text x="16" y="4" fontSize="10" fill="#0f172a" fontWeight="semibold">
                  บจก. สยามคูโบต้า
                </text>
              </g>

              {/* Pin 4: Isan Solar Energy (Nam Phong - north) */}
              <g
                transform="translate(450, 45)"
                className="cursor-pointer group"
                onClick={() => setActiveCompanyId('comp-4')}
              >
                <circle cx="0" cy="0" r="15" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="5" fill="#ffffff" />
                <text x="16" y="4" fontSize="10" fill="#0f172a" fontWeight="semibold">
                  อีสานโซลาร์ (อ.น้ำพอง)
                </text>
              </g>

              {/* Pin 5: EGAT High Voltage Substation 2 (Tha Phra - south) */}
              <g
                transform="translate(425, 520)"
                className="cursor-pointer group"
                onClick={() => setActiveCompanyId('comp-5')}
              >
                <circle cx="0" cy="0" r="15" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
                <path d="M-2 -6 L3 -6 L-1 1 L2 1 L-2 7 L-1 2 L-3 2 Z" fill="#ffffff" />
                <text x="16" y="4" fontSize="10" fill="#0f172a" fontWeight="semibold">
                  กฟผ. ท่าพระ 230kV
                </text>
              </g>
            </svg>

            {/* Top Left GPS indicator badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs">
              <div className="font-bold text-slate-800">ขอนแก่น</div>
              <div className="text-[10px] text-slate-500 font-mono">16.4397° N, 102.8236° E</div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-slate-200 shadow-sm">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
                className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
                title="ขยาย"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
                className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
                title="ย่อ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
                title="รีเซ็ตตำแหน่ง"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Selected Company Overlay Popup (matching screenshot 7) */}
            {activeCompany && (
              <div className="absolute bottom-12 left-3 right-3 sm:right-auto sm:w-96 bg-white/95 backdrop-blur-xs rounded-xl border border-slate-300 shadow-xl p-4 text-xs space-y-2 animate-in fade-in duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-amber-100 text-amber-700">
                      <Zap className="w-4 h-4 fill-amber-600" />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{activeCompany.name}</h4>
                      <div className="text-[11px] text-slate-500">{activeCompany.address}</div>
                    </div>
                  </div>
                </div>

                {/* Assigned Students */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-semibold text-slate-800 text-[11px]">
                    นักศึกษาฝึกงาน ({activeCompany.assignedStudents?.length || 2} คน):
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    {activeCompany.assignedStudents?.length ? (
                      activeCompany.assignedStudents.map((st, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span>{i + 1}. {st.studentName} ({st.level})</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">{st.latestWeekStatus}</span>
                        </div>
                      ))
                    ) : (
                      <div>1. นายธนากร สุริยะแสง • 2. นายกิตติศักดิ์ เจริญศรี</div>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">ลักษณะงาน:</span> {activeCompany.jobScope}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                  <span>พี่เลี้ยง: {activeCompany.contactPerson}</span>
                  <span className="font-mono text-sky-700">{activeCompany.phone}</span>
                </div>

                {/* Popup Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={`https://maps.google.com/?q=${activeCompany.lat},${activeCompany.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>นำทาง GPS</span>
                  </a>
                  <button
                    onClick={() => onOpenForm3(activeCompany.assignedStudents?.[0]?.studentId)}
                    className="py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>บันทึกนิเทศ</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Map Legend */}
            <div className="absolute bottom-2 left-3 right-3 flex flex-wrap items-center justify-between text-[10px] text-slate-600 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> นิเทศเสร็จแล้ว (18)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> รอตรวจสัปดาห์นี้ (6)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span> กฟภ. / กฟผ.
                </span>
              </div>
              <span className="font-mono text-slate-400">มาตราส่วน 10 km</span>
            </div>
          </div>

          {/* Cluster Loop Route Recommendation Box (Bottom of Map) */}
          <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Route className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-xs">เส้นทางแนะนำนิเทศต่อเนื่องวันนี้ (Cluster Loop)</div>
                <div className="text-[11px] text-slate-300">
                  วท.ขอนแก่น → PEA ถ.ประชาสโมสร (13:30) → บจก.ไทยเพาเวอร์ (15:30) | รวม 12.7 กม.
                </div>
              </div>
            </div>
            <button
              onClick={handleStartRoute}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>เริ่มเดินทาง</span>
            </button>
          </div>
        </div>

        {/* Company List Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span>รายการทั้งหมด ({filteredCompanies.length})</span>
            </div>
            <span className="text-[11px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              จัดเส้นทางวันนี้ (2 แห่ง)
            </span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1 text-xs">
            {filteredCompanies.map((c) => {
              const isSelected = c.id === activeCompanyId;
              const isToday = c.status === 'scheduled_today';

              return (
                <div
                  key={c.id}
                  onClick={() => setActiveCompanyId(c.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isToday
                          ? 'bg-amber-100 text-amber-800'
                          : c.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.statusText}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {c.distanceKm} กม. จากวิทยาลัย
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{c.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.address}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>นักศึกษา ({c.studentsCount} คน)</span>
                    </span>
                    <span className="text-slate-400 text-[10px]">{c.sectorLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 Bottom Feature Cards matching Screenshot 7 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
            <MapPin className="w-4 h-4" />
            <span>พิกัด GPS อัตโนมัติจาก Form #1</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            นักศึกษาต้องกดปุ่ม "แชร์พิกัดปัจจุบัน" ใน Google Form #1 ณ ที่ตั้งจริงของสถานประกอบการ เพื่อความถูกต้องของแผนที่ดาวเทียม
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>มาตรฐานความปลอดภัยระบบไฟฟ้า</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            หมุดสีส้มที่รอตรวจจะได้รับการจัดลำดับความสำคัญตามระดับความเสี่ยงของสายงาน (แรงสูง 22kV / ควบคุมเครื่องจักร)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
            <Navigation className="w-4 h-4" />
            <span>เชื่อมต่อ Google Maps Navigation</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            อาจารย์ผู้เทศสามารถกดปุ่ม "นำทาง" เพื่อเปิดแอปพลิเคชัน Google Maps บนมือถือหรือในรถยนต์ได้ทันทีโดยไม่ต้องพิมพ์พิกัดซ้ำ
          </p>
        </div>
      </div>
    </div>
  );
};
