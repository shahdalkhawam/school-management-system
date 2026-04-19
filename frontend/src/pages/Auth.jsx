import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authError, clearAuthError, isAuthLoading } = useAuth();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [localError, setLocalError] = useState('');

  const redirectPath = location.state?.from?.pathname ?? '/users';

  function updateField(field, value) {
    clearAuthError();
    setLocalError('');
    setFormState((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formState.email || !formState.password) {
      setLocalError('أدخل البريد الإلكتروني وكلمة المرور قبل تسجيل الدخول.');
      return;
    }

    try {
      await login(formState);
      navigate(redirectPath, { replace: true });
    } catch {
      // The auth context already stores the API error for display.
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#26164a_0%,_#120c24_45%,_#08050f_100%)] px-4 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(168,85,247,0.12),transparent_40%,rgba(34,211,238,0.08))]" />

      <div className="relative grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur xl:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            School Management
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white xl:text-6xl">
            Secure access for your school operations workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Sign in with your backend account to unlock live users, role-aware
            dashboards, and the connected admin workflow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-[#1b1234] p-5">
              <p className="text-sm text-cyan-300">Auth API</p>
              <p className="mt-2 text-2xl font-semibold">/auth/login</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#1b1234] p-5">
              <p className="text-sm text-cyan-300">Profile bootstrap</p>
              <p className="mt-2 text-2xl font-semibold">/auth/me</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#1b1234] p-5">
              <p className="text-sm text-cyan-300">Route protection</p>
              <p className="mt-2 text-2xl font-semibold">Enabled</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[#120d24]/90 p-8 shadow-2xl shadow-black/30 backdrop-blur xl:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Authentication
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              تسجيل الدخول
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-300">
              استخدم بيانات الدخول الخاصة بك للوصول إلى النظام وربط الواجهة
              الأمامية مباشرة بواجهات الـ API.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} dir="rtl">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                البريد الإلكتروني
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                  placeholder="admin@school.com"
                  autoComplete="email"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                كلمة المرور
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <LockKeyhole size={18} className="text-slate-400" />
                <input
                  type="password"
                  value={formState.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                  placeholder="password123"
                  autoComplete="current-password"
                />
              </span>
            </label>

            {localError ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-900/20 px-4 py-3 text-sm text-amber-200">
                {localError}
              </div>
            ) : null}

            {authError ? (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-900/20 px-4 py-3 text-sm text-rose-200">
                {authError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isAuthLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ArrowRight size={18} />
              <span>{isAuthLoading ? 'جارٍ تسجيل الدخول...' : 'دخول إلى النظام'}</span>
            </button>
          </form>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">What happens next</p>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              بعد نجاح تسجيل الدخول سيتم حفظ JWT token محلياً، ثم تحميل
              `/auth/me`، وبعدها فتح صفحات النظام المحمية تلقائياً.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
