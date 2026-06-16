"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen((current) => !current);
      return;
    }

    setCollapsed((current) => !current);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface">
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30">
          <AdminTopbar onToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="dashboard-content-scroll min-w-0 flex-1 overflow-x-clip p-4">
          {children}
        </div>
        <footer className="bg-white px-6 py-3.5 shadow-[0_-4px_18px_rgba(39,59,82,0.02)] border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-[11px] text-slate-500 text-center sm:text-left">
              © 2026 <span className="text-brand-green font-semibold">Trends ERP</span>. All Rights Reserved.
            </div>

            <div className="text-[11px] text-slate-400 text-center sm:text-right">
              Developed by{" "}
              <a
                href="https://trendsbird.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="House 14 (Level 4), Road 13, Sector 03, Uttara Model Town, Dhaka – 1230"
                className="font-semibold text-brand-orange hover:underline transition-all"
              >
                Trends Bird Limited
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
