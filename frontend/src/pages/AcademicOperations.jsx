import {
  AlertCircle,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  Clock3,
  GraduationCap,
  TrendingUp,
  UsersRound,
} from 'lucide-react';

const stats = [
  {
    value: '+1200',
    label: 'إجمالي الطلاب',
    color: 'text-blue-400',
  },
  {
    value: '45',
    label: 'عدد المعلمين',
    color: 'text-violet-400',
  },
  {
    value: '+8.3%',
    label: 'معدل التحسن',
    color: 'text-emerald-400',
  },
  {
    value: '+12.5%',
    label: 'معدل النشاطات',
    color: 'text-pink-400',
  },
];

const operationCards = [
  {
    title: 'إدارة الفصول الدراسية',
    description: 'إدارة شاملة لجميع الفصول الدراسية والمراحل التعليمية',
    value: '12',
    unit: 'فصل دراسي',
    icon: UsersRound,
    iconColor: 'text-blue-300',
    iconBorder: 'border-blue-400/90',
    iconGlow: 'shadow-[0_0_30px_rgba(96,165,250,0.18)]',
    valueColor: 'text-sky-400',
    accentBox: 'bg-blue-500/20',
    featured: false,
  },
  {
    title: 'تحديد بداية ونهاية الفصول',
    description: 'تحديد بداية ونهاية الفصل الأول والثاني بدقة',
    value: '2',
    unit: 'فصل دراسي',
    icon: CalendarDays,
    iconColor: 'text-fuchsia-300',
    iconBorder: 'border-fuchsia-400/90',
    iconGlow: 'shadow-[0_0_30px_rgba(232,121,249,0.18)]',
    valueColor: 'text-pink-400',
    accentBox: 'bg-fuchsia-500/20',
    featured: true,
  },
  {
    title: 'نظام الترفيع السنوي',
    description: 'نظام متكامل للترفيع السنوي وإدارة النجاح والرسوب',
    value: '95%',
    unit: 'معدل النجاح',
    icon: TrendingUp,
    iconColor: 'text-emerald-300',
    iconBorder: 'border-emerald-400/90',
    iconGlow: 'shadow-[0_0_30px_rgba(74,222,128,0.18)]',
    valueColor: 'text-emerald-400',
    accentBox: 'bg-emerald-500/20',
    featured: false,
  },
  {
    title: 'تصفير الغيابات والشكاوى',
    description: 'إدارة الغيابات والشكاوى وتصفيرها في المواعيد المحددة',
    value: '45',
    unit: 'حالة نشطة',
    icon: AlertCircle,
    iconColor: 'text-orange-100',
    iconBorder: 'border-orange-500/90',
    iconGlow: 'shadow-[0_0_30px_rgba(249,115,22,0.18)]',
    valueColor: 'text-orange-500',
    accentBox: 'bg-orange-500/20',
    featured: false,
  },
  {
    title: 'ترحيل الطلاب الناجحين',
    description: 'ترحيل الطلاب الناجحين للصف الأعلى نهاية العام',
    value: '320',
    unit: 'طالب',
    icon: GraduationCap,
    iconColor: 'text-indigo-200',
    iconBorder: 'border-indigo-500/90',
    iconGlow: 'shadow-[0_0_30px_rgba(99,102,241,0.18)]',
    valueColor: 'text-indigo-400',
    accentBox: 'bg-indigo-500/20',
    featured: false,
  },
  {
    title: 'إدارة الفعاليات والأنشطة',
    description: 'إضافة وتعديل وحذف الفعاليات والأنشطة المدرسية',
    value: '18',
    unit: 'نشاط',
    icon: ClipboardList,
    iconColor: 'text-amber-100',
    iconBorder: 'border-amber-500/90',
    iconGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.18)]',
    valueColor: 'text-amber-400',
    accentBox: 'bg-amber-500/20',
    featured: false,
  },
  {
    title: 'إدارة الجداول الدراسية',
    description: 'إضافة وتعديل وحذف الجداول الدراسية للمعلمين والطلاب',
    value: '156',
    unit: 'حصة',
    icon: CalendarRange,
    iconColor: 'text-teal-100',
    iconBorder: 'border-emerald-400/90',
    iconGlow: 'shadow-[0_0_30px_rgba(52,211,153,0.18)]',
    valueColor: 'text-emerald-300',
    accentBox: 'bg-emerald-500/20',
    featured: false,
  },
  {
    title: 'كشف تضارب المواعيد',
    description: 'نظام ذكي لكشف تضارب المواعيد في الجداول الدراسية',
    value: '0',
    unit: 'تضارب',
    icon: Clock3,
    iconColor: 'text-pink-100',
    iconBorder: 'border-pink-500/90',
    iconGlow: 'shadow-[0_0_30px_rgba(236,72,153,0.18)]',
    valueColor: 'text-pink-500',
    accentBox: 'bg-pink-500/20',
    featured: false,
  },
];

function StatsCard({ stat }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <p className={`text-center text-4xl font-bold tracking-tight ${stat.color}`}>
        {stat.value}
      </p>
      <p className="mt-3 text-center text-2xl text-slate-300">{stat.label}</p>
    </div>
  );
}

function OperationCard({ item }) {
  const Icon = item.icon;

  return (
    <section
      className={`rounded-[30px] border p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 ${
        item.featured
          ? 'border-violet-400/20 bg-[linear-gradient(180deg,rgba(139,92,246,0.16),rgba(17,24,39,0.9))]'
          : 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]'
      }`}
    >
      <div className="flex justify-end">
        <div
          className={`flex h-[84px] w-[84px] items-center justify-center rounded-[22px] border-4 bg-slate-950/20 ${item.iconBorder} ${item.iconGlow}`}
        >
          <Icon size={34} className={item.iconColor} />
        </div>
      </div>

      <div className="mt-8 text-right">
        <h3
          className={`text-[2.05rem] font-bold leading-tight ${
            item.featured ? 'text-violet-300' : 'text-white'
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-3 min-h-[72px] text-lg leading-8 text-slate-400">
          {item.description}
        </p>
      </div>

      <div className="mt-5 border-t border-white/10 pt-6">
        <div className="flex items-end justify-between gap-4">
          <div className={`h-12 w-12 rounded-[14px] ${item.accentBox}`} />
          <div className="text-right">
            <p className={`text-4xl font-bold tracking-tight ${item.valueColor}`}>
              {item.value}
            </p>
            <p className="mt-1 text-base text-slate-500">{item.unit}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AcademicOperations() {
  return (
    <div className="space-y-8" dir="rtl">
      <section className="overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_25%),linear-gradient(180deg,#0f1327_0%,#0c1120_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
        <div className="border-b border-white/5 px-6 pb-8 pt-10 sm:px-10 lg:px-14 lg:pb-10 lg:pt-14">
          <h1 className="text-center text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
            إدارة العمليات الأكاديمية والمدرسية
          </h1>
          <p className="mx-auto mt-5 max-w-4xl text-center text-lg leading-9 text-sky-200/80 sm:text-2xl">
            نظام متكامل لإدارة جميع العمليات الأكاديمية بكفاءة عالية واحترافية
          </p>
        </div>

        <div className="grid gap-px bg-white/5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#11172a] p-6">
              <StatsCard stat={stat} />
            </div>
          ))}
        </div>

        <div className="grid gap-px border-t border-white/5 bg-white/5 md:grid-cols-2 xl:grid-cols-4">
          {operationCards.slice(0, 4).map((item) => (
            <div key={item.title} className="bg-[#11172a] p-4 sm:p-5">
              <OperationCard item={item} />
            </div>
          ))}
        </div>

        <div className="grid gap-px border-t border-white/5 bg-white/5 md:grid-cols-2 xl:grid-cols-4">
          {operationCards.slice(4).map((item) => (
            <div key={item.title} className="bg-[#11172a] p-4 sm:p-5">
              <OperationCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
