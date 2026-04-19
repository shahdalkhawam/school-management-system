import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';
import AppShell from './components/layout/AppShell';
import AcademicOperations from './pages/AcademicOperations';
import Auth from './pages/Auth';
import CommunicationsRequests from './pages/CommunicationsRequests';
import LiveStats from './pages/LiveStats';
import ReportsFinancials from './pages/ReportsFinancials';
import SecuritySettings from './pages/SecuritySettings';
import UserManagement from './pages/UserManagement';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/auth" element={<Auth />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="academics" element={<AcademicOperations />} />
          <Route path="live-stats" element={<LiveStats />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="communications" element={<CommunicationsRequests />} />
          <Route path="reports" element={<ReportsFinancials />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  );
}
