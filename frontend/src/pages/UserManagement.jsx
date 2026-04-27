import { useDeferredValue, useEffect, useState } from 'react';
import {
  BookOpen,
  Download,
  GraduationCap,
  Shield,
  Upload,
  UserPlus,
  Users,
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import UserStats from '../components/user-management/UserStats';
import UserTabs from '../components/user-management/UserTabs';
import UserToolbar from '../components/user-management/UserToolbar';
import UsersTable from '../components/user-management/UsersTable';
import { useAuth } from '../contexts/useAuth';
import { userManagementSeed } from '../data';
import { apiRequest, hasAuthToken } from '../lib/api';

const roleTabs = [
  { role: 'STUDENT', label: 'الطلاب', icon: GraduationCap },
  { role: 'TEACHER', label: 'المعلمين', icon: BookOpen },
  { role: 'PARENT', label: 'أولياء الأمور', icon: Users },
];

const pageSize = 4;

function getFullName(user) {
  return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
}

function resolveActiveState(rawUser) {
  if (typeof rawUser.isActive === 'boolean') {
    return rawUser.isActive;
  }

  if (typeof rawUser.active === 'boolean') {
    return rawUser.active;
  }

  if (typeof rawUser.status === 'string') {
    return rawUser.status.toLowerCase() === 'active';
  }

  return !rawUser.deletedAt;
}

function normalizeUser(rawUser, role) {
  const parents = rawUser.parents ?? rawUser.parentIds ?? [];
  const children = rawUser.children ?? rawUser.childrenIds ?? [];
  const firstName = rawUser.firstName ?? rawUser.name?.split(' ')?.[0] ?? '';
  const lastName =
    rawUser.lastName ??
    rawUser.name?.split(' ')?.slice(1).join(' ') ??
    '';
  const parentLabel =
    rawUser.parentName ??
    rawUser.parent?.name ??
    rawUser.parent?.fullName ??
    parents?.[0]?.name ??
    parents?.[0]?.fullName ??
    '';

  return {
    id: rawUser.id ?? rawUser._id ?? crypto.randomUUID(),
    firstName,
    lastName,
    email: rawUser.email ?? '',
    phone:
      rawUser.phone ??
      rawUser.phoneNumber ??
      rawUser.profile?.phone ??
      '',
    roles: rawUser.roles?.length ? rawUser.roles : [role],
    parentName: parentLabel,
    parentLinked:
      role === 'STUDENT'
        ? Boolean(parentLabel || parents?.length || rawUser.parentLinked)
        : Boolean(children?.length),
    isActive: resolveActiveState(rawUser),
    joinedAt:
      rawUser.joinedAt ??
      rawUser.createdAt ??
      rawUser.date ??
      new Date().toISOString(),
    classId: rawUser.classId ?? rawUser.class?.id ?? '',
    avatarColor:
      rawUser.avatarColor ??
      (role === 'TEACHER'
        ? 'from-sky-500 to-cyan-500'
        : role === 'PARENT'
          ? 'from-emerald-500 to-teal-500'
          : 'from-violet-500 to-pink-500'),
    childrenIds: children.map((value) =>
      typeof value === 'string' ? value : value?.id,
    ),
    parentIds: parents.map((value) =>
      typeof value === 'string' ? value : value?.id,
    ),
  };
}

function buildMockUsers() {
  return {
    STUDENT: userManagementSeed.STUDENT.map((user) => normalizeUser(user, 'STUDENT')),
    TEACHER: userManagementSeed.TEACHER.map((user) => normalizeUser(user, 'TEACHER')),
    PARENT: userManagementSeed.PARENT.map((user) => normalizeUser(user, 'PARENT')),
  };
}

function normalizeClass(rawClass) {
  return {
    id: rawClass.id ?? rawClass._id ?? '',
    name: rawClass.name ?? rawClass.title ?? rawClass.code ?? 'Unnamed Class',
    description: rawClass.description ?? '',
  };
}

async function fetchClasses() {
  const response = await apiRequest('/classes', {
    headers: {
      'x-active-role': 'ADMIN',
    },
  });

  if (Array.isArray(response)) {
    return response.map(normalizeClass);
  }

  if (Array.isArray(response?.data)) {
    return response.data.map(normalizeClass);
  }

  if (Array.isArray(response?.classes)) {
    return response.classes.map(normalizeClass);
  }

  return [];
}

async function fetchUsersByRole(role) {
  const response = await apiRequest(`/users?role=${role}`);

  if (Array.isArray(response)) {
    return response.map((user) => normalizeUser(user, role));
  }

  if (Array.isArray(response?.data)) {
    return response.data.map((user) => normalizeUser(user, role));
  }

  if (Array.isArray(response?.users)) {
    return response.users.map((user) => normalizeUser(user, role));
  }

  return [];
}

function buildStats(usersByRole) {
  return [
    {
      label: 'إجمالي الطلاب',
      value: usersByRole.STUDENT.length,
      trend: '+12.5%',
      icon: GraduationCap,
      gradient: 'from-violet-500 to-pink-500',
    },
    {
      label: 'أولياء الأمور',
      value: usersByRole.PARENT.length,
      trend: '+8.3%',
      icon: Users,
      gradient: 'from-sky-500 to-cyan-500',
    },
    {
      label: 'المعلمين',
      value: usersByRole.TEACHER.length,
      trend: '+2',
      icon: BookOpen,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      label: 'المسؤولين',
      value: 1,
      trend: '+1',
      icon: Shield,
      gradient: 'from-cyan-400 to-teal-400',
    },
  ];
}

function downloadJsonFile(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function EditUserModal({ user, role, saving, classes, classesLoading, onClose, onSubmit }) {
  const [formState, setFormState] = useState(() => ({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    password: '',
    classId: user?.classId ?? '',
    relatedIds:
      role === 'STUDENT'
        ? user?.parentIds?.join(', ') ?? ''
        : role === 'PARENT'
          ? user?.childrenIds?.join(', ') ?? ''
          : '',
  }));

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formState);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4">
      <div className="w-full max-w-3xl rounded-[30px] border border-[var(--app-border)] bg-[var(--app-panel-strong)] p-6 shadow-[var(--app-shadow)]">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-right">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--app-primary)]">
              User Form
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--app-text)]">
              {user ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-4 py-2 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]"
          >
            إغلاق
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-right">
            <span className="mb-2 block text-sm text-[var(--app-text-soft)]">الاسم الأول</span>
            <input
              value={formState.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-[var(--app-text-soft)]">الاسم الأخير</span>
            <input
              value={formState.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-[var(--app-text-soft)]">البريد الإلكتروني</span>
            <input
              type="email"
              value={formState.email}
              onChange={(event) => updateField('email', event.target.value)}
              className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-[var(--app-text-soft)]">رقم الهاتف</span>
            <input
              value={formState.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-[var(--app-text-soft)]">
              {user ? 'كلمة المرور الجديدة' : 'كلمة المرور'}
            </span>
            <input
              type="password"
              value={formState.password}
              onChange={(event) => updateField('password', event.target.value)}
              className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
            />
          </label>

          {role === 'STUDENT' ? (
            <label className="text-right">
              <span className="mb-2 block text-sm text-[var(--app-text-soft)]">معرف الصف</span>
              <select
                value={formState.classId}
                onChange={(event) => updateField('classId', event.target.value)}
                className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none"
                disabled={classesLoading}
              >
                <option value="" className="bg-[var(--app-panel-strong)] text-[var(--app-text-soft)]">
                  {classesLoading ? 'Loading classes...' : 'Select a class'}
                </option>
                {classes.map((schoolClass) => (
                  <option
                    key={schoolClass.id}
                    value={schoolClass.id}
                    className="bg-[var(--app-panel-strong)] text-[var(--app-text)]"
                  >
                    {schoolClass.name}
                    {schoolClass.description ? ` - ${schoolClass.description}` : ''}
                  </option>
                ))}
              </select>
              <span className="mt-2 block text-xs text-amber-300">
                `classId` is required when creating a student through the API.
              </span>
            </label>
          ) : null}

          {role === 'STUDENT' || role === 'PARENT' ? (
            <label className="md:col-span-2 text-right">
              <span className="mb-2 block text-sm text-[var(--app-text-soft)]">
                {role === 'STUDENT'
                  ? 'معرفات أولياء الأمور المرتبطين'
                  : 'معرفات الأبناء المرتبطين'}
              </span>
              <input
                value={formState.relatedIds}
                onChange={(event) => updateField('relatedIds', event.target.value)}
                className="w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
                placeholder="uuid-1, uuid-2"
              />
            </label>
          ) : null}

          <div className="md:col-span-2 mt-2 flex justify-start gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-700)] px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'جارٍ الحفظ...' : user ? 'حفظ التعديلات' : 'إنشاء المستخدم'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-6 py-3 text-lg font-semibold text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.roles?.includes('ADMIN');
  const [activeRole, setActiveRole] = useState('STUDENT');
  const [usersByRole, setUsersByRole] = useState(buildMockUsers());
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsingMockData, setIsUsingMockData] = useState(!hasAuthToken());
  const [classes, setClasses] = useState([]);
  const [isClassesLoading, setIsClassesLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deferredSearchValue = useDeferredValue(searchValue);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      if (!hasAuthToken()) {
        setUsersByRole(buildMockUsers());
        setIsUsingMockData(true);
        setStatusMessage('يتم عرض بيانات تجريبية حالياً. أضف JWT token في localStorage لتفعيل الربط المباشر.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage('');

        const [students, teachers, parents] = await Promise.all([
          fetchUsersByRole('STUDENT'),
          fetchUsersByRole('TEACHER'),
          fetchUsersByRole('PARENT'),
        ]);

        if (!isMounted) {
          return;
        }

        setUsersByRole({
          STUDENT: students,
          TEACHER: teachers,
          PARENT: parents,
        });
        setIsUsingMockData(false);
        setStatusMessage('تم تحميل بيانات المستخدمين من الواجهة الخلفية بنجاح.');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setUsersByRole(buildMockUsers());
        setIsUsingMockData(true);
        setErrorMessage(error.message);
        setStatusMessage('تعذر الوصول إلى البيانات الحية، لذلك تم الرجوع إلى بيانات تجريبية مؤقتاً.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadClasses() {
      if (!hasAuthToken() || !isAdmin) {
        setClasses([]);
        setIsClassesLoading(false);
        return;
      }

      try {
        setIsClassesLoading(true);
        const classList = await fetchClasses();

        if (!isMounted) {
          return;
        }

        setClasses(classList);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setClasses([]);
        setErrorMessage((current) => current || error.message);
      } finally {
        if (isMounted) {
          setIsClassesLoading(false);
        }
      }
    }

    loadClasses();

    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeRole, deferredSearchValue]);

  const activeUsers = usersByRole[activeRole] ?? [];
  const filteredUsers = activeUsers.filter((user) => {
    const query = deferredSearchValue.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return [
      getFullName(user),
      user.email,
      user.phone,
      user.parentName,
      user.isActive ? 'نشط' : 'غير نشط',
    ]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );
  const stats = buildStats(usersByRole);

  function updateRoleCollection(role, updater) {
    setUsersByRole((current) => ({
      ...current,
      [role]: updater(current[role] ?? []),
    }));
  }

  async function handleSaveUser(formState) {
    const relatedIds = formState.relatedIds
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const role = activeRole;
    const firstName = formState.firstName.trim();
    const lastName = formState.lastName.trim();
    const email = formState.email.trim();
    const password = formState.password.trim();
    const classId = formState.classId.trim();

    try {
      if (!isAdmin) {
        setErrorMessage('Only admins can create or update users through this endpoint.');
        return;
      }

      if (!firstName || !lastName || !email) {
        setErrorMessage('First name, last name, and email are required.');
        return;
      }

      if (!editingUser && password.length < 6) {
        setErrorMessage('A new user password must be at least 6 characters long.');
        return;
      }

      if (editingUser && password && password.length < 6) {
        setErrorMessage('The new password must be at least 6 characters long.');
        return;
      }

      if (role === 'STUDENT' && !classId) {
        setErrorMessage('Student creation requires a valid classId.');
        return;
      }

      setIsSaving(true);
      setErrorMessage('');

      if (editingUser && hasAuthToken()) {
        const payload = {
          firstName,
          lastName,
          email,
          ...(password ? { password } : {}),
          ...(role === 'STUDENT' && classId ? { classId } : {}),
          ...(role === 'STUDENT' ? { parentIds: relatedIds } : {}),
          ...(role === 'PARENT' ? { childrenIds: relatedIds } : {}),
        };

        await apiRequest(`/users/${editingUser.id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      }

      if (!editingUser && hasAuthToken()) {
        const payload = {
          email,
          password,
          firstName,
          lastName,
          roles: [role],
          ...(role === 'STUDENT' ? { classId } : {}),
        };

        await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      const normalizedUser = normalizeUser(
        {
          id: editingUser?.id ?? `${role.toLowerCase()}-${Date.now()}`,
          firstName,
          lastName,
          email,
          phone: formState.phone,
          roles: [role],
          classId,
          parentIds: role === 'STUDENT' ? relatedIds : [],
          childrenIds: role === 'PARENT' ? relatedIds : [],
          isActive: true,
          joinedAt: editingUser?.joinedAt ?? new Date().toISOString(),
        },
        role,
      );

      updateRoleCollection(role, (items) => {
        if (editingUser) {
          return items.map((item) =>
            item.id === editingUser.id ? { ...item, ...normalizedUser } : item,
          );
        }

        return [normalizedUser, ...items];
      });

      setStatusMessage(
        editingUser
          ? 'تم تحديث بيانات المستخدم بنجاح.'
          : 'تمت إضافة المستخدم بنجاح.',
      );
      setEditingUser(null);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggleArchive(user) {
    const role = activeRole;

    try {
      setErrorMessage('');

      if (hasAuthToken()) {
        await apiRequest(
          user.isActive ? `/users/${user.id}` : `/users/${user.id}/restore`,
          {
            method: user.isActive ? 'DELETE' : 'PATCH',
          },
        );
      }

      updateRoleCollection(role, (items) =>
        items.map((item) =>
          item.id === user.id ? { ...item, isActive: !item.isActive } : item,
        ),
      );

      setStatusMessage(
        user.isActive
          ? 'تم تعطيل المستخدم المحدد.'
          : 'تمت استعادة المستخدم المحدد.',
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleExport() {
    downloadJsonFile(
      `${activeRole.toLowerCase()}-users.json`,
      filteredUsers.map((user) => ({
        id: user.id,
        name: getFullName(user),
        email: user.email,
        phone: user.phone,
        status: user.isActive ? 'ACTIVE' : 'INACTIVE',
      })),
    );
    setStatusMessage('تم تجهيز ملف JSON للتصدير من الجدول الحالي.');
  }

  function handleImport() {
    setStatusMessage(
      'تم تجهيز زر الاستيراد للربط لاحقاً برفع ملفات Excel أو CSV عند إضافة المعالجة الخلفية.',
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        eyebrow="User Management"
        title="إدارة الصلاحيات والمستخدمين"
        description="إدارة الطلاب والمعلمين وأولياء الأمور مع ربط حي بواجهات المستخدمين في النظام، مع بقاء الصفحة قابلة للعمل ببيانات تجريبية حتى يتوفر رمز JWT."
        actions={
          <>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-3 rounded-3xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-5 py-4 text-lg font-semibold text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]"
            >
              <Download size={20} />
              <span>تصدير</span>
            </button>
            <button
              type="button"
              onClick={handleImport}
              className="flex items-center gap-3 rounded-3xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-5 py-4 text-lg font-semibold text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]"
            >
              <Upload size={20} />
              <span>استيراد</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setErrorMessage('');
                setStatusMessage('');
                setEditingUser(null);
                setIsModalOpen(true);
              }}
              disabled={!isAdmin}
              className="flex items-center gap-3 rounded-3xl bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-700)] px-5 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <UserPlus size={20} />
              <span>إضافة مستخدم</span>
            </button>
          </>
        }
      />

      {!isAdmin ? (
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/12 px-5 py-4 text-lg text-amber-400">
          The current account does not include the `ADMIN` role, so create and update requests will be rejected by the backend.
        </div>
      ) : null}

      {statusMessage ? (
        <div
          className={`rounded-3xl border px-5 py-4 text-lg ${
            isUsingMockData
              ? 'border-amber-500/30 bg-amber-500/12 text-amber-400'
              : 'border-emerald-500/30 bg-emerald-500/12 text-emerald-400'
          }`}
        >
          {statusMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-3xl border border-rose-500/30 bg-rose-500/12 px-5 py-4 text-lg text-rose-400">
          {errorMessage}
        </div>
      ) : null}

      <UserStats items={stats} />

      <UserTabs
        tabs={roleTabs}
        activeRole={activeRole}
        onChange={setActiveRole}
      />

      <UserToolbar
        value={searchValue}
        onChange={setSearchValue}
        onImport={handleImport}
        onExport={handleExport}
        isBusy={isLoading || isSaving}
      />

      {isLoading ? (
        <div className="rounded-[30px] border border-[var(--app-border)] bg-[var(--app-panel)] px-6 py-20 text-center text-2xl text-[var(--app-text-muted)]">
          جارٍ تحميل بيانات المستخدمين...
        </div>
      ) : (
        <UsersTable
          users={paginatedUsers}
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onEdit={(user) => {
            setErrorMessage('');
            setStatusMessage('');
            setEditingUser(user);
            setIsModalOpen(true);
          }}
          onToggleArchive={handleToggleArchive}
        />
      )}

      {isModalOpen ? (
        <EditUserModal
          user={editingUser}
          role={activeRole}
          saving={isSaving}
          classes={classes}
          classesLoading={isClassesLoading}
          onClose={() => {
            setEditingUser(null);
            setIsModalOpen(false);
          }}
          onSubmit={handleSaveUser}
        />
      ) : null}
    </div>
  );
}
