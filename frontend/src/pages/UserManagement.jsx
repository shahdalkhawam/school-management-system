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

function EditUserModal({ user, role, saving, onClose, onSubmit }) {
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
      <div className="w-full max-w-3xl rounded-[30px] border border-white/10 bg-[#140f25] p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-right">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
              User Form
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              {user ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-white/10 px-4 py-2 text-slate-300 transition hover:bg-white/15 hover:text-white"
          >
            إغلاق
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-right">
            <span className="mb-2 block text-sm text-slate-400">الاسم الأول</span>
            <input
              value={formState.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-slate-400">الاسم الأخير</span>
            <input
              value={formState.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-slate-400">البريد الإلكتروني</span>
            <input
              type="email"
              value={formState.email}
              onChange={(event) => updateField('email', event.target.value)}
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-slate-400">رقم الهاتف</span>
            <input
              value={formState.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="text-right">
            <span className="mb-2 block text-sm text-slate-400">
              {user ? 'كلمة المرور الجديدة' : 'كلمة المرور'}
            </span>
            <input
              type="password"
              value={formState.password}
              onChange={(event) => updateField('password', event.target.value)}
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
          </label>

          {role === 'STUDENT' ? (
            <label className="text-right">
              <span className="mb-2 block text-sm text-slate-400">معرف الصف</span>
              <input
                value={formState.classId}
                onChange={(event) => updateField('classId', event.target.value)}
                className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="uuid-of-class"
              />
            </label>
          ) : null}

          {role === 'STUDENT' || role === 'PARENT' ? (
            <label className="md:col-span-2 text-right">
              <span className="mb-2 block text-sm text-slate-400">
                {role === 'STUDENT'
                  ? 'معرفات أولياء الأمور المرتبطين'
                  : 'معرفات الأبناء المرتبطين'}
              </span>
              <input
                value={formState.relatedIds}
                onChange={(event) => updateField('relatedIds', event.target.value)}
                className="w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="uuid-1, uuid-2"
              />
            </label>
          ) : null}

          <div className="md:col-span-2 mt-2 flex justify-start gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'جارٍ الحفظ...' : user ? 'حفظ التعديلات' : 'إنشاء المستخدم'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-white/10 px-6 py-3 text-lg font-semibold text-slate-300 transition hover:bg-white/15"
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
  const [activeRole, setActiveRole] = useState('STUDENT');
  const [usersByRole, setUsersByRole] = useState(buildMockUsers());
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsingMockData, setIsUsingMockData] = useState(!hasAuthToken());
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

    try {
      setIsSaving(true);
      setErrorMessage('');

      if (editingUser && hasAuthToken()) {
        const payload = {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          ...(formState.password ? { password: formState.password } : {}),
          ...(role === 'STUDENT' && formState.classId ? { classId: formState.classId } : {}),
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
          email: formState.email,
          password: formState.password || 'password123',
          firstName: formState.firstName,
          lastName: formState.lastName,
          roles: [role],
          ...(role === 'STUDENT' && formState.classId ? { classId: formState.classId } : {}),
        };

        await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      const normalizedUser = normalizeUser(
        {
          id: editingUser?.id ?? `${role.toLowerCase()}-${Date.now()}`,
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          phone: formState.phone,
          roles: [role],
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
              className="flex items-center gap-3 rounded-3xl bg-white/10 px-5 py-4 text-lg font-semibold text-slate-200 transition hover:bg-white/15"
            >
              <Download size={20} />
              <span>تصدير</span>
            </button>
            <button
              type="button"
              onClick={handleImport}
              className="flex items-center gap-3 rounded-3xl bg-white/10 px-5 py-4 text-lg font-semibold text-slate-200 transition hover:bg-white/15"
            >
              <Upload size={20} />
              <span>استيراد</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-3 rounded-3xl bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-4 text-lg font-semibold text-white transition hover:opacity-90"
            >
              <UserPlus size={20} />
              <span>إضافة مستخدم</span>
            </button>
          </>
        }
      />

      {statusMessage ? (
        <div
          className={`rounded-3xl border px-5 py-4 text-lg ${
            isUsingMockData
              ? 'border-amber-500/30 bg-amber-900/20 text-amber-200'
              : 'border-emerald-500/30 bg-emerald-900/20 text-emerald-200'
          }`}
        >
          {statusMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-3xl border border-rose-500/30 bg-rose-900/20 px-5 py-4 text-lg text-rose-200">
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
        <div className="rounded-[30px] border border-white/10 bg-[#201738] px-6 py-20 text-center text-2xl text-slate-300">
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
