import {
  ChartColumnBig,
  FileText,
  Mail,
  School,
  Shield,
  Users,
} from 'lucide-react';

export const navigationItems = [
  {
    label: 'User Management',
    path: '/users',
    icon: Users,
    description: 'Manage staff, parents, students, and permissions in one place.',
  },
  {
    label: 'Academic Operations',
    path: '/academics',
    icon: School,
    description: 'Handle classes, schedules, attendance, and academic workflows.',
  },
  {
    label: 'Live Stats',
    path: '/live-stats',
    icon: ChartColumnBig,
    description: 'Monitor KPIs, alerts, and operational activity in real time.',
  },
  {
    label: 'Security and Settings',
    path: '/security',
    icon: Shield,
    description: 'Control access, system rules, and configuration settings.',
  },
  {
    label: 'Communications and Requests',
    path: '/communications',
    icon: Mail,
    description: 'Track announcements, requests, and internal communication flows.',
  },
  {
    label: 'Reports and Financials',
    path: '/reports',
    icon: FileText,
    description: 'Review reports, payments, balances, and exports.',
  },
];
