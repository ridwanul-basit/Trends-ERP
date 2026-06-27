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

// Recursive component to render sidebar items
function SidebarItem({
  item,
  level,
  pathname,
  collapsed,
  onCloseMobile,
  openItems,
  setOpenItems,
  activeFolderTitle,
}: {
  item: any;
  level: number;
  pathname: string;
  collapsed: boolean;
  onCloseMobile: () => void;
  openItems: Record<string, boolean>;
  setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  activeFolderTitle: string | undefined;
}) {
  const Icon = item.icon;

  // Check if this item or any of its children are active
  const isActiveRecursively = (navItem: any): boolean => {
    if (navItem.href && pathname.startsWith(navItem.href)) return true;
    if (navItem.children) {
      return navItem.children.some(isActiveRecursively);
    }
    return false;
  };

  const isActive = isActiveRecursively(item);
  const isExactActive = Boolean(item.href && pathname === item.href);

  // If level 0 parent is active, we give it a background (the user requested "main parent will take bg").
  // If it's a child (level > 0), we only change the font color if it's active.
  const isParentActive = level === 0 && isActive;
  const isChildActive = level > 0 && isExactActive;

  if (item.children?.length) {
    const isOpen = openItems[item.title] ?? (level === 0 ? activeFolderTitle === item.title : isActive);

    return (
      <div key={item.title}>
        <button
          type="button"
          onClick={() => {
            if (collapsed && level === 0) return;
            setOpenItems((prev) => ({
              ...prev,
              [item.title]: !isOpen,
            }));
          }}
          title={collapsed && level === 0 ? item.title : undefined}
          className={cn(
            "flex items-center gap-3 rounded-[13px] text-left transition-colors cursor-pointer w-full",
            isParentActive
              ? "bg-theme-sidebar-parent-bg font-semibold text-theme-sidebar-parent-text"
              : isChildActive
                ? "text-theme-sidebar-child-text font-semibold"
                : "text-foreground hover:bg-muted",
            collapsed && level === 0
              ? "h-12 w-12 justify-center p-0"
              : level === 0 ? "h-[47px] px-2" : "h-[41px] px-4"
          )}
        >
          {Icon && (
            <span
              className={cn(
                "flex shrink-0 items-center justify-center transition-all",
                level === 0 ? "h-9 w-9 rounded-[13px] shadow-[0_6px_18px_rgba(17,33,51,0.06)]" : "",
                isParentActive && level === 0
                  ? "bg-white text-brand-green"
                  : level === 0 ? "bg-surface text-brand-green" : ""
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
          )}
          {!(collapsed && level === 0) && (
            <>
              <span className="flex-1 truncate">{item.title}</span>
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  isOpen && "rotate-90"
                )}
              />
            </>
          )}
        </button>

        {!(collapsed && level === 0) && isOpen && (
          <div className={cn(
            "space-y-1 border-l border-slate-100",
            level === 0 ? "ml-7 mt-1 pl-3" : "ml-4 mt-1 pl-3"
          )}>
            {item.children.map((child: any) => (
              <SidebarItem
                key={child.title}
                item={child}
                level={level + 1}
                pathname={pathname}
                collapsed={collapsed}
                onCloseMobile={onCloseMobile}
                openItems={openItems}
                setOpenItems={setOpenItems}
                activeFolderTitle={activeFolderTitle}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.href ?? "#"}
      title={collapsed && level === 0 ? item.title : undefined}
      onClick={onCloseMobile}
      className={cn(
        "flex items-center gap-3 rounded-[13px] transition-colors",
        isParentActive
          ? "bg-theme-sidebar-parent-bg font-semibold text-theme-sidebar-parent-text"
          : isChildActive
            ? "text-theme-sidebar-child-text font-semibold"
            : "text-foreground hover:bg-muted",
        collapsed && level === 0
          ? "h-12 w-12 justify-center p-0"
          : level === 0 ? "h-[47px] px-2 w-full" : "h-[41px] px-4 w-full"
      )}
    >
      {Icon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center transition-all",
            level === 0 ? "h-9 w-9 rounded-[13px] shadow-[0_6px_18px_rgba(17,33,51,0.06)]" : "",
            isParentActive && level === 0
              ? "bg-white text-brand-green"
              : level === 0 ? "bg-surface text-brand-green" : ""
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
      {!(collapsed && level === 0) && <span className="flex-1 truncate">{item.title}</span>}
    </Link>
  );
}

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
    <img
      src="/Site_Logo-removebg-preview.png"
      alt="Trends ERP Logo"
      className="h-9 w-9 object-contain"
    />
  ) : (
    <img
      src="/Site_Logo-removebg-preview.png"
      alt="Trends ERP Logo"
      className="h-10 w-auto object-contain"
    />
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
          collapsed ? "px-2 py-4" : "py-3.5 px-4",
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
