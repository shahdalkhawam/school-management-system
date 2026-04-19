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
    <tr className="border-t border-white/8 text-right text-xl text-slate-300">
      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-4">
          <div className="text-right">
            <p className="text-2xl font-semibold text-white">
              {user.firstName} {user.lastName}
            </p>
            <span className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-1 text-sm font-semibold text-white">
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

      <td className="px-6 py-5 text-slate-400">
        <div className="flex items-center justify-end gap-3">
          <span>{user.email || 'غير متوفر'}</span>
          <Mail size={20} />
        </div>
      </td>

      <td className="px-6 py-5">{user.phone || 'غير متوفر'}</td>

      <td className="px-6 py-5">
        {role === 'STUDENT' ? (
          user.parentLinked ? (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-900/30 px-4 py-2 font-semibold text-emerald-300">
              <span>{user.parentName || 'ولي أمر مرتبط'}</span>
              <Link size={18} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-amber-900/30 px-4 py-2 font-semibold text-amber-300">
              <span>ربط ولي أمر</span>
              <Link2Off size={18} />
            </span>
          )
        ) : (
          <span className="text-slate-500">-</span>
        )}
      </td>

      <td className="px-6 py-5">
        <span
          className={`inline-flex rounded-2xl px-4 py-2 font-semibold ${
            user.isActive
              ? 'bg-emerald-900/30 text-emerald-300'
              : 'bg-rose-900/30 text-rose-300'
          }`}
        >
          {user.isActive ? 'نشط' : 'غير نشط'}
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-3 text-slate-400">
          <span>{formatDate(user.joinedAt)}</span>
          <Calendar size={20} />
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onEdit(user)}
            className="rounded-2xl bg-indigo-900/40 p-3 text-indigo-300 transition hover:bg-indigo-800/50"
            aria-label="Edit user"
          >
            <Pencil size={20} />
          </button>
          <button
            type="button"
            onClick={() => onToggleArchive(user)}
            className={`rounded-2xl p-3 transition ${
              user.isActive
                ? 'bg-rose-900/40 text-rose-300 hover:bg-rose-800/50'
                : 'bg-emerald-900/40 text-emerald-300 hover:bg-emerald-800/50'
            }`}
            aria-label={user.isActive ? 'Archive user' : 'Restore user'}
          >
            {user.isActive ? <Trash2 size={20} /> : <Download size={20} />}
          </button>
          <button
            type="button"
            className="rounded-2xl bg-emerald-900/30 p-3 text-emerald-300 transition hover:bg-emerald-800/40"
            aria-label="Export user"
          >
            <Download size={20} />
          </button>
          <button
            type="button"
            className="rounded-2xl bg-violet-900/40 p-3 text-violet-300 transition hover:bg-violet-800/50"
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
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#201738]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-white/10 text-right text-xl font-semibold text-slate-400">
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
                  className="px-6 py-16 text-center text-xl text-slate-400"
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
