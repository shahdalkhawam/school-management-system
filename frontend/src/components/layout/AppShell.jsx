import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { navigationItems } from '../../config/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const activeItem = useMemo(() => {
    return (
      navigationItems.find((item) => location.pathname.startsWith(item.path)) ??
      navigationItems[0]
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f1740_0%,_#110c22_45%,_#090612_100%)] text-white">
      <div className="flex min-h-screen">
        <Sidebar
          activePath={activeItem.path}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar
            activeItem={activeItem}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          <main className="flex-1 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
