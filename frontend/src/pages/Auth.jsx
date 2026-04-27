import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--app-bg)] px-4 text-[var(--app-text)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,var(--app-primary-soft),transparent_40%,rgba(103,183,255,0.08))]" />

      <div className="relative grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-[var(--app-border)] bg-[var(--app-panel)] p-8 backdrop-blur xl:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--app-primary)]">
            School Management
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--app-text)] xl:text-6xl">
            Secure access for your school operations workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--app-text-muted)]">
            Sign in with your backend account to unlock live users, role-aware
            dashboards, and the connected admin workflow.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-5">
              <p className="text-sm text-[var(--app-primary)]">Auth API</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--app-text)]">/auth/login</p>
            </div>
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-5">
              <p className="text-sm text-[var(--app-primary)]">Profile bootstrap</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--app-text)]">/auth/me</p>
            </div>
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-5">
              <p className="text-sm text-[var(--app-primary)]">Route protection</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--app-text)]">Enabled</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--app-border)] bg-[var(--app-panel-strong)] p-8 shadow-[var(--app-shadow)] backdrop-blur xl:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--app-primary)]">
              Authentication
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--app-text)]">
              تسجيل الدخول
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--app-text-muted)]">
              استخدم بيانات الدخول الخاصة بك للوصول إلى النظام وربط الواجهة
              الأمامية مباشرة بواجهات الـ API.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} dir="rtl">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--app-text-muted)]">
                البريد الإلكتروني
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-4">
                <Mail size={18} className="text-[var(--app-text-soft)]" />
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="w-full bg-transparent text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
                  placeholder="admin@school.com"
                  autoComplete="email"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--app-text-muted)]">
                كلمة المرور
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-4">
                <LockKeyhole size={18} className="text-[var(--app-text-soft)]" />
                <input
                  type="password"
                  value={formState.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  className="w-full bg-transparent text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
                  placeholder="password123"
                  autoComplete="current-password"
                />
              </span>
            </label>

            {localError ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/12 px-4 py-3 text-sm text-amber-400">
                {localError}
              </div>
            ) : null}

            {authError ? (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/12 px-4 py-3 text-sm text-rose-400">
                {authError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isAuthLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-700)] px-5 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ArrowRight size={18} />
              <span>{isAuthLoading ? 'جارٍ تسجيل الدخول...' : 'دخول إلى النظام'}</span>
            </button>
          </form>

          <div className="mt-8 rounded-[24px] border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-5">
            <p className="text-sm font-medium text-[var(--app-text)]">What happens next</p>
            <p className="mt-2 text-sm leading-7 text-[var(--app-text-soft)]">
              بعد نجاح تسجيل الدخول سيتم حفظ JWT token محلياً، ثم تحميل
              `/auth/me`، وبعدها فتح صفحات النظام المحمية تلقائياً.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
