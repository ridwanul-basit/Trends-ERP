"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { adminNavItems, filterNavByPermissions } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/store/hooks";

type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const session = useAppSelector((state) => state.auth.session);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const navItems = useMemo(
    () =>
      filterNavByPermissions(
        adminNavItems,
        session?.user.permissions ?? [],
        session?.user.role,
      ),
    [session?.user.permissions, session?.user.role],
  );

  const activeFolderTitle = useMemo(
    () =>
      navItems.find((item) =>
        item.children?.some(
          (child) => child.href && pathname.startsWith(child.href),
        ),
      )?.title,
    [navItems, pathname],
  );

  const logoSVG = collapsed ? (
    <svg viewBox="0 0 50 50" className="h-9 w-9">
      <circle cx="25" cy="25" r="22" className="fill-brand-green" />
      <text
        x="25"
        y="32"
        textAnchor="middle"
        className="font-sans text-2xl font-extrabold fill-white"
      >
        T
      </text>
    </svg>
  ) : (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0">
        <circle cx="20" cy="20" r="18" className="fill-brand-green" />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          className="font-sans text-xl font-black fill-white"
        >
          T
        </text>
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-sans text-sm font-black tracking-wider text-brand-green leading-none uppercase">
          TRENDS
        </span>
        <span className="font-sans text-xs font-bold tracking-widest text-brand-orange leading-normal">
          ERP
        </span>
      </div>
    </div>
  );

  const sidebar = (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-white shadow-[8px_0_24px_rgba(39,59,82,0.06)] transition-all duration-200 md:sticky md:translate-x-0",
        collapsed ? "w-16" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center border-b border-slate-100",
          collapsed ? "h-16 px-2 py-2" : "py-3.5 px-4",
        )}
      >
        <Link href="/dashboard" className="flex w-full items-center justify-center">
          {logoSVG}
        </Link>
      </div>

      <nav
        className={cn(
          "sidebar-scrollbar-hidden flex-1 overflow-y-auto py-4",
          collapsed ? "px-2" : "px-3",
        )}
      >
        <div className={cn(collapsed ? "space-y-2" : "space-y-1")}>
          {navItems.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
              level={0}
              pathname={pathname}
              collapsed={collapsed}
              onCloseMobile={onCloseMobile}
              openItems={openItems}
              setOpenItems={setOpenItems}
              activeFolderTitle={activeFolderTitle}
            />
          ))}
        </div>
      </nav>

      <div className="h-3 shrink-0" />
    </aside>
  );

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
          onClick={onCloseMobile}
        />
      )}
      {sidebar}
    </>
  );
}
