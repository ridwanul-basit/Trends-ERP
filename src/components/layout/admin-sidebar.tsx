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
        y="33"
        textAnchor="middle"
        className="font-sans text-2xl font-extrabold fill-white"
      >
        ব
      </text>
    </svg>
  ) : (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0">
        <circle cx="20" cy="20" r="18" className="fill-brand-green" />
        <text
          x="20"
          y="27"
          textAnchor="middle"
          className="font-sans text-xl font-black fill-white"
        >
          ব
        </text>
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-sans text-sm font-black tracking-wider text-brand-green leading-none uppercase">
          ISPAHANI
        </span>
        <span className="font-sans text-xs font-bold tracking-widest text-brand-orange leading-normal">
          বাংলাবিদ
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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              Boolean(item.href && pathname.startsWith(item.href)) ||
              Boolean(
                item.children?.some(
                  (child) => child.href && pathname.startsWith(child.href),
                ),
              );

            if (item.children?.length) {
              const isOpen = openItems[item.title] ?? activeFolderTitle === item.title;

              return (
                <div key={item.title}>
                  <button
                    type="button"
                    onClick={() => {
                      if (collapsed) return;
                      // Accordion behavior: close others when opening one
                      setOpenItems({
                        [item.title]: !isOpen,
                      });
                    }}
                    title={collapsed ? item.title : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-[13px] text-left transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary font-semibold text-white"
                        : "text-foreground hover:bg-muted",
                      collapsed
                        ? "h-12 w-12 justify-center p-0"
                        : "h-[47px] w-full px-2",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] shadow-[0_6px_18px_rgba(17,33,51,0.06)] transition-all",
                        isActive
                          ? "bg-white text-brand-green"
                          : "bg-surface text-brand-green",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            isOpen && "rotate-90",
                          )}
                        />
                      </>
                    )}
                  </button>

                  {!collapsed && isOpen && (
                    <div className="ml-7 mt-1 space-y-1 pl-3 border-l border-slate-100">
                      {item.children.map((child) => {
                        const childHasNestedSibling = Boolean(
                          child.href &&
                          item.children?.some(
                            (sibling) =>
                              sibling.href !== child.href &&
                              child.href &&
                              sibling.href?.startsWith(`${child.href}/`),
                          ),
                        );

                        const childActive = Boolean(
                          child.href &&
                          (pathname === child.href ||
                            (!childHasNestedSibling && pathname.startsWith(`${child.href}/`))),
                        );

                        return (
                          <Link
                            key={child.title}
                            href={child.href ?? "#"}
                            onClick={onCloseMobile}
                            className={cn(
                              "flex h-[41px] items-center rounded-[13px] px-4 transition-colors",
                              childActive
                                ? "bg-primary font-semibold text-white"
                                : "text-foreground hover:bg-muted",
                            )}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.href ?? "#"}
                title={collapsed ? item.title : undefined}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 rounded-[13px] transition-colors",
                  isActive
                    ? "bg-primary font-semibold text-white"
                    : "text-foreground hover:bg-muted",
                  collapsed
                    ? "h-12 w-12 justify-center p-0"
                    : "h-[47px] w-full px-2",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] shadow-[0_6px_18px_rgba(17,33,51,0.06)] transition-all",
                    isActive
                      ? "bg-white text-brand-green"
                      : "bg-surface text-brand-green",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
              </Link>
            );
          })}
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
