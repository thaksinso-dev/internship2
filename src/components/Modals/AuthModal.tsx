import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  UserCheck, 
  Lock,
  Building2
} from 'lucide-react';
import { AuthUser } from '../../types';
import { 
  PRESET_KKTECH_ACCOUNTS, 
  signInWithKktechEmail, 
  signInWithGoogleWorkspace,
  isKktechEmail 
} from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('teacher');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successUser, setSuccessUser] = useState<AuthUser | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (account: AuthUser) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const user = signInWithKktechEmail(account.email, account.role);
      setSuccessUser(user);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      }, 700);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    let clean = emailInput.trim();
    if (!clean.includes('@')) {
      clean = `${clean}@kktech.ac.th`;
    }

    if (!isKktechEmail(clean)) {
      setErrorMsg('อนุญาตเฉพาะอีเมลองค์กร @kktech.ac.th ของวิทยาลัยเทคนิคขอนแก่นเท่านั้น');
      return;
    }

    setIsLoading(true);
    try {
      const user = signInWithKktechEmail(clean, selectedRole);
      setSuccessUser(user);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      }, 700);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const user = await signInWithGoogleWorkspace();
      setSuccessUser(user);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      }, 700);
    } catch (err: any) {
      setIsLoading(false);
      console.warn('Google sign-in exception:', err);
      if (err.message && err.message.includes('ไม่อนุญาต')) {
        setErrorMsg(err.message);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('หน้าต่างยืนยันตัวตน Google ถูกปิดก่อนเสร็จสิ้น');
      } else {
        // Fallback option
        setErrorMsg('สามารถระบุอีเมล @kktech.ac.th หรือเลือกบัญชีผู้ใช้ด้านล่างเพื่อเข้าใช้งานได้ทันที');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shrink-0">
              <img
                src="/assets/aistudio/unnamed_54baf6fc.jpg"
                alt="KKTECH Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Google Workspace SSO
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  @kktech.ac.th
                </span>
              </div>
              <h3 className="text-base font-bold text-white">เข้าสู่ระบบด้วยอีเมล @kktech.ac.th</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Current Logged-in Banner if exists */}
          {currentUser && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.initials}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-700 font-medium">เข้าใช้งานอยู่: {currentUser.email}</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-800">
                สถานะเชื่อมต่อ
              </span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed font-medium">{errorMsg}</div>
            </div>
          )}

          {/* Success Banner */}
          {successUser && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-sm">เข้าสู่ระบบสำเร็จ!</div>
                <div className="text-[11px] text-slate-600 mt-0.5">ยินดีต้อนรับ {successUser.name} ({successUser.email})</div>
              </div>
            </div>
          )}

          {/* Method 1: Google Sign In Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs shadow-xs transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {/* Google G Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>เข้าสู่ระบบด้วย Google Workspace (@kktech.ac.th)</span>
            </button>
            <p className="text-[10px] text-center text-slate-500">
              เฉพาะบัญชีองค์กรของวิทยาลัยเทคนิคขอนแก่นเท่านั้น
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[10px]">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span>หรือระบุอีเมลองค์กร @kktech.ac.th</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Method 2: Direct Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                อีเมลองค์กร วิทยาลัยเทคนิคขอนแก่น
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="เช่น thaksinso หรือ thanakorn.s"
                  className="w-full pl-9 pr-28 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  required
                />
                <span className="absolute right-3 px-2 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[11px] font-semibold">
                  @kktech.ac.th
                </span>
              </div>
            </div>

            {/* Role selection for custom email */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                บทบาทการเข้าใช้งาน:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-semibold text-[11px] transition cursor-pointer ${
                    selectedRole === 'teacher'
                      ? 'bg-sky-50 text-sky-700 border-sky-400'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ครูนิเทศก์
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-semibold text-[11px] transition cursor-pointer ${
                    selectedRole === 'student'
                      ? 'bg-sky-50 text-sky-700 border-sky-400'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  นักศึกษา
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-semibold text-[11px] transition cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-sky-50 text-sky-700 border-sky-400'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ผู้ดูแลระบบ
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !emailInput.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>ยืนยันเข้าสู่ระบบ (@kktech.ac.th)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Method 3: One-Click Verified Accounts list */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 text-[11px]">
                หรือเลือกบัญชีผู้ใช้ @kktech.ac.th ด่วน:
              </span>
              <span className="text-[10px] text-sky-600 font-medium">คลิกเพื่อสลับทันที</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {PRESET_KKTECH_ACCOUNTS.map((acc) => {
                const isCurrent = currentUser?.email.toLowerCase() === acc.email.toLowerCase();
                const isCurrentUserMatch = acc.email === 'thaksinso@kktech.ac.th';

                return (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectPreset(acc)}
                    className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? 'border-emerald-400 bg-emerald-50/60'
                        : isCurrentUserMatch
                        ? 'border-sky-300 bg-sky-50/40 hover:bg-sky-100/60'
                        : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg text-white font-bold text-[11px] flex items-center justify-center ${
                        acc.role === 'teacher' ? 'bg-indigo-600' : acc.role === 'admin' ? 'bg-slate-800' : 'bg-sky-600'
                      }`}>
                        {acc.initials}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">{acc.name}</span>
                          {isCurrentUserMatch && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-600 text-white">
                              ผู้ใช้นี้
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{acc.email}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        acc.role === 'teacher'
                          ? 'bg-indigo-100 text-indigo-800'
                          : acc.role === 'admin'
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {acc.role === 'teacher' ? 'ครูนิเทศก์' : acc.role === 'admin' ? 'แอดมิน' : 'นักศึกษา'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 p-3 border-t border-slate-200 text-center text-[10px] text-slate-500 flex items-center justify-center gap-2">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>ระบบตรวจรับรองความปลอดภัยเฉพาะอีเมล @kktech.ac.th เท่านั้น</span>
        </div>
      </div>
    </div>
  );
};
