import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ink-50 dark:bg-ink-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl animate-fadeIn">
            <Outlet />
          </div>
        </main>
        <footer className="border-t border-ink-100 px-6 py-4 text-center text-xs text-ink-400 dark:border-ink-800">
          Flow — Project Management Platform
        </footer>
      </div>
    </div>
  );
}
