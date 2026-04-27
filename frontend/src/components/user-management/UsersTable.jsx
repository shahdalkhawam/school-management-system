import {
  Calendar,
  Download,
  EllipsisVertical,
  Link,
  Link2Off,
  Mail,
  Pencil,
  Trash2,
} from 'lucide-react';
import UserPagination from './UserPagination';

function getUserInitials(user) {
  return `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim();
}

function getRoleLabel(role) {
  if (role === 'TEACHER') {
    return 'معلم';
  }

  if (role === 'PARENT') {
    return 'ولي أمر';
  }

  return 'طالب';
}

function formatDate(value) {
  if (!value) {
    return 'غير محدد';
  }

  return new Date(value).toISOString().slice(0, 10);
}

function UserRow({ user, onEdit, onToggleArchive }) {
  const role = user.roles?.[0] ?? 'STUDENT';

  return (
    <tr className="border-t border-[var(--app-border)] text-right text-xl text-[var(--app-text-muted)]">
      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-4">
          <div className="text-right">
            <p className="text-2xl font-semibold text-[var(--app-text)]">
              {user.firstName} {user.lastName}
            </p>
            <span className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-700)] px-4 py-1 text-sm font-semibold text-white">
              {getRoleLabel(role)}
            </span>
          </div>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${user.avatarColor} text-xl font-semibold text-white`}
          >
            {getUserInitials(user)}
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-[var(--app-text-muted)]">
        <div className="flex items-center justify-end gap-3">
          <span>{user.email || 'غير متوفر'}</span>
          <Mail size={20} />
        </div>
      </td>

      <td className="px-6 py-5">{user.phone || 'غير متوفر'}</td>

      <td className="px-6 py-5">
        {role === 'STUDENT' ? (
          user.parentLinked ? (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/12 px-4 py-2 font-semibold text-emerald-400">
              <span>{user.parentName || 'ولي أمر مرتبط'}</span>
              <Link size={18} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/12 px-4 py-2 font-semibold text-amber-400">
              <span>ربط ولي أمر</span>
              <Link2Off size={18} />
            </span>
          )
        ) : (
          <span className="text-[var(--app-text-soft)]">-</span>
        )}
      </td>

      <td className="px-6 py-5">
        <span
          className={`inline-flex rounded-2xl px-4 py-2 font-semibold ${
            user.isActive
              ? 'bg-emerald-500/12 text-emerald-400'
              : 'bg-rose-500/12 text-rose-400'
          }`}
        >
          {user.isActive ? 'نشط' : 'غير نشط'}
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-3 text-[var(--app-text-muted)]">
          <span>{formatDate(user.joinedAt)}</span>
          <Calendar size={20} />
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onEdit(user)}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-3 text-[var(--app-primary-strong)] transition hover:bg-[var(--app-link-active)]"
            aria-label="Edit user"
          >
            <Pencil size={20} />
          </button>
          <button
            type="button"
            onClick={() => onToggleArchive(user)}
            className={`rounded-2xl p-3 transition ${
              user.isActive
                ? 'bg-rose-500/12 text-rose-400 hover:bg-rose-500/18'
                : 'bg-emerald-500/12 text-emerald-400 hover:bg-emerald-500/18'
            }`}
            aria-label={user.isActive ? 'Archive user' : 'Restore user'}
          >
            {user.isActive ? <Trash2 size={20} /> : <Download size={20} />}
          </button>
          <button
            type="button"
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/12 p-3 text-emerald-400 transition hover:bg-emerald-500/18"
            aria-label="Export user"
          >
            <Download size={20} />
          </button>
          <button
            type="button"
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-3 text-[var(--app-primary)] transition hover:bg-[var(--app-link-hover)]"
            aria-label="More actions"
          >
            <EllipsisVertical size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function UsersTable({
  users,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onEdit,
  onToggleArchive,
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-[var(--app-border)] bg-[var(--app-panel)] shadow-[var(--app-shadow)]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-[var(--app-border)] text-right text-xl font-semibold text-[var(--app-text-soft)]">
            <tr>
              <th className="px-6 py-6">الاسم</th>
              <th className="px-6 py-6">البريد الإلكتروني</th>
              <th className="px-6 py-6">رقم الهاتف</th>
              <th className="px-6 py-6">ربط ولي الأمر</th>
              <th className="px-6 py-6">الحالة</th>
              <th className="px-6 py-6">تاريخ الانضمام</th>
              <th className="px-6 py-6">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={onEdit}
                  onToggleArchive={onToggleArchive}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-xl text-[var(--app-text-soft)]"
                >
                  لا توجد بيانات مطابقة للبحث الحالي.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </div>
  );
}
