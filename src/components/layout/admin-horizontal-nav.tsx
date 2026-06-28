"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { adminNavItems, filterNavByPermissions } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/store/hooks";

// Recursive component for horizontal nav items
function HorizontalNavItem({
  item,
  level,
  pathname,
  isBottom,
}: {
  item: any;
  level: number;
  pathname: string;
  isBottom?: boolean;
}) {
  const Icon = item.icon;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close when pathname changes (user navigated)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActiveRecursively = (navItem: any): boolean => {
    if (navItem.href && pathname.startsWith(navItem.href)) return true;
    if (navItem.children) {
      return navItem.children.some(isActiveRecursively);
    }
    return false;
  };

  const isActive = isActiveRecursively(item);
  const isExactActive = Boolean(item.href && pathname === item.href);

  // Parent active logic
  const isParentActive = level === 0 && isActive;
  const isChildActive = level > 0 && isExactActive;

  if (item.children?.length) {
    return (
      <div ref={menuRef} className={cn("relative", level === 0 ? "h-full" : "")}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 rounded-md transition-colors cursor-pointer w-full whitespace-nowrap",
            level === 0
              ? "h-full px-4 border-b-2"
              : "px-4 py-2 hover:bg-slate-50",
            level === 0 && isParentActive
              ? "border-theme-primary text-theme-primary font-semibold"
              : level === 0
              ? "border-transparent text-slate-600 hover:text-slate-900"
              : isChildActive
              ? "text-theme-primary font-semibold bg-theme-primary/5"
              : "text-slate-600"
          )}
        >
          {Icon && level === 0 && <Icon className="h-4 w-4" />}
          <span className="truncate">{item.title}</span>
          {level === 0 ? (
            <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 ml-1 transition-transform", isOpen && "rotate-180")} />
          ) : (
            <ChevronRight className={cn("h-3.5 w-3.5 opacity-50 ml-auto transition-transform", isOpen && "rotate-90")} />
          )}
        </button>

        {/* Dropdown Menu */}
        <div
          className={cn(
            "absolute z-50 min-w-[200px] rounded-md border border-slate-100 bg-white p-1.5 shadow-lg",
            isOpen ? "block" : "hidden",
            level === 0
              ? (isBottom ? "left-0 bottom-full mb-1" : "left-0 top-full mt-1")
              : (isBottom ? "left-full bottom-0 ml-1" : "left-full top-0 ml-1")
          )}
        >
          {item.children.map((child: any) => (
            <HorizontalNavItem
              key={child.title}
              item={child}
              level={level + 1}
              pathname={pathname}
              isBottom={isBottom}
            />
          ))}
        </div>
      </div>
    );
  }

  // No children -> Link
  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center gap-2 rounded-md transition-colors cursor-pointer w-full whitespace-nowrap",
        level === 0
          ? "h-full px-4 border-b-2"
          : "px-4 py-2 hover:bg-slate-50",
        level === 0 && isParentActive
          ? "border-theme-primary text-theme-primary font-semibold"
          : level === 0
          ? "border-transparent text-slate-600 hover:text-slate-900"
          : isChildActive
          ? "text-theme-primary font-semibold bg-theme-primary/5"
          : "text-slate-600"
      )}
    >
      {Icon && level === 0 && <Icon className="h-4 w-4" />}
      <span className="truncate">{item.title}</span>
    </Link>
  );
}

export function AdminHorizontalNav({ isBottom }: { isBottom?: boolean }) {
  const pathname = usePathname();
  const currentRole = useAppSelector((state) => state.auth.session?.user?.role) || "ADMIN";
  const currentPermission = useAppSelector((state) => state.auth.session?.user?.permissions) || [];

  const allowedNavItems = useMemo(() => {
    return filterNavByPermissions(adminNavItems, currentPermission, currentRole);
  }, [currentPermission, currentRole]);

  return (
    <div className={cn("h-12 w-full bg-white border-slate-200 flex items-center px-4 shadow-sm z-20 sticky overflow-x-auto sidebar-scrollbar-hidden", isBottom ? "bottom-0 border-t" : "top-[60px] border-b")}>
      <div className="flex h-full items-center gap-1 min-w-max lg:mx-auto">
        {allowedNavItems.map((item) => (
          <HorizontalNavItem
            key={item.title}
            item={item}
            level={0}
            pathname={pathname}
            isBottom={isBottom}
          />
        ))}
      </div>
    </div>
  );
}
