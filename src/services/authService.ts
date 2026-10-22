import { GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthUser } from '../types';

export const KKTECH_DOMAIN = '@kktech.ac.th';

export const PRESET_KKTECH_ACCOUNTS: AuthUser[] = [
  {
    email: 'thaksinso@kktech.ac.th',
    name: 'ว่าที่ร้อยตรี ทักษิณ โสภา',
    role: 'teacher',
    initials: 'ทส',
    department: 'แผนกวิชาช่างไฟฟ้ากำลัง วท.ขอนแก่น',
    provider: 'google'
  },
  {
    email: 'supannee.j@kktech.ac.th',
    name: 'อาจารย์สุพรรณี ใจดี',
    role: 'teacher',
    initials: 'สจ',
    department: 'แผนกวิชาช่างไฟฟ้ากำลัง วท.ขอนแก่น',
    provider: 'google'
  },
  {
    email: 'thanakorn.s@kktech.ac.th',
    name: 'นายธนากร สุริยะแสง',
    role: 'student',
    initials: 'ธส',
    department: 'ปวส.2/1 แผนกช่างไฟฟ้ากำลัง',
    studentId: 'std-1',
    provider: 'google'
  },
  {
    email: 'anurak.p@kktech.ac.th',
    name: 'นายอนุรักษ์ โพธิ์แก้ว',
    role: 'student',
    initials: 'อร',
    department: 'ปวส.2/2 แผนกช่างไฟฟ้ากำลัง',
    studentId: 'std-5',
    provider: 'google'
  },
  {
    email: 'somchai.k@kktech.ac.th',
    name: 'นายสมชาย ก้องเกียรติ',
    role: 'admin',
    initials: 'สม',
    department: 'งานทวิภาคีและหลักสูตรวิชาการ วท.ขอนแก่น',
    provider: 'google'
  }
];

const STORAGE_KEY = 'kktech_auth_current_user';

export function isKktechEmail(email: string): boolean {
  if (!email) return false;
  return email.trim().toLowerCase().endsWith('@kktech.ac.th');
}

export function getStoredAuthUser(): AuthUser {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthUser;
      if (isKktechEmail(parsed.email)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read stored auth user:', e);
  }
  // Default to thaksinso@kktech.ac.th (as identified in user session)
  return PRESET_KKTECH_ACCOUNTS[0];
}

export function saveAuthUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Could not save auth user to localStorage:', e);
  }
}

/**
 * Sign in using Firebase Google Auth with hosted domain constraint: hd = 'kktech.ac.th'
 */
export async function signInWithGoogleWorkspace(): Promise<AuthUser> {
  const provider = new GoogleAuthProvider();
  // Force Google OAuth consent screen to prompt for kktech.ac.th accounts
  provider.setCustomParameters({
    hd: 'kktech.ac.th',
    prompt: 'select_account'
  });

  try {
    const res = await signInWithPopup(auth, provider);
    const email = res.user.email || '';

    if (!isKktechEmail(email)) {
      await fbSignOut(auth);
      throw new Error(`ไม่อนุญาตให้อีเมล ${email} เข้าใช้งาน! กรุณาใช้อีเมลโดเมน @kktech.ac.th เท่านั้น`);
    }

    // Check if preset profile matches
    const preset = PRESET_KKTECH_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase());
    const authUser: AuthUser = preset || {
      email,
      name: res.user.displayName || email.split('@')[0],
      role: email.startsWith('66') || email.startsWith('65') ? 'student' : 'teacher',
      initials: (res.user.displayName || email.slice(0, 2)).slice(0, 2).toUpperCase(),
      department: 'แผนกวิชาช่างไฟฟ้ากำลัง วท.ขอนแก่น',
      provider: 'google'
    };

    saveAuthUser(authUser);
    return authUser;
  } catch (err: any) {
    // If popup blocked or cancelled or provider not configured, throw with clear message
    throw err;
  }
}

/**
 * Direct sign in with verified @kktech.ac.th email address
 */
export function signInWithKktechEmail(inputEmail: string, role?: 'student' | 'teacher' | 'admin'): AuthUser {
  const cleanEmail = inputEmail.trim().toLowerCase();
  
  if (!isKktechEmail(cleanEmail)) {
    throw new Error('ไม่อนุญาต! บัญชีต้องลงท้ายด้วย @kktech.ac.th ของวิทยาลัยเทคนิคขอนแก่นเท่านั้น');
  }

  const preset = PRESET_KKTECH_ACCOUNTS.find(a => a.email.toLowerCase() === cleanEmail);
  if (preset) {
    saveAuthUser(preset);
    return preset;
  }

  // Generate appropriate profile for other @kktech.ac.th users
  const prefix = cleanEmail.split('@')[0];
  const isStudentCode = /^\d+$/.test(prefix);
  const detectedRole = role || (isStudentCode ? 'student' : 'teacher');

  const newUser: AuthUser = {
    email: cleanEmail,
    name: prefix.replace('.', ' ').toUpperCase(),
    role: detectedRole,
    initials: prefix.slice(0, 2).toUpperCase(),
    department: 'แผนกวิชาช่างไฟฟ้ากำลัง วท.ขอนแก่น',
    provider: 'sso'
  };

  saveAuthUser(newUser);
  return newUser;
}

export function signOutKktechUser(): void {
  saveAuthUser(null);
  fbSignOut(auth).catch(() => {});
}
