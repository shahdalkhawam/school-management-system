import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { navigationItems } from '../../config/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedState = window.localStorage.getItem('school-sidebar-collapsed');
    setSidebarCollapsed(savedState === 'true');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'school-sidebar-collapsed',
      String(sidebarCollapsed),
    );
  }, [sidebarCollapsed]);

  const activeItem = useMemo(() => {
    return (
      navigationItems.find((item) => location.pathname.startsWith(item.path)) ??
      navigationItems[0]
    );
  }, [location.pathname]);

  const breadcrumbs = useMemo(() => {
    return ['Admin Workspace', activeItem.label];
  }, [activeItem.label]);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] transition-[background,color] duration-300">
      <div className="flex min-h-screen">
        <Sidebar
          activePath={activeItem.path}
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar
            activeItem={activeItem}
            breadcrumbs={breadcrumbs}
            onOpenSidebar={() => setSidebarOpen(true)}
            onToggleSidebarCollapse={() =>
              setSidebarCollapsed((current) => !current)
            }
            isSidebarCollapsed={sidebarCollapsed}
          />
          <main className="flex-1 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <div key={location.pathname} className="animate-page-enter">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
