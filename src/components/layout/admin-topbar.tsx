"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  User,
} from "lucide-react";
import { adminNavItems, filterNavByPermissions } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSession } from "@/store/slices/auth-slice";
import { authService } from "@/services/authService";

type AdminTopbarProps = {
  onToggleSidebar: () => void;
  hideSidebarToggle?: boolean;
};

function initials(name?: string) {
  if (!name) return "BB";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminTopbar({ onToggleSidebar, hideSidebarToggle }: AdminTopbarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.session);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchableMenus = useMemo(() => {
    const items = filterNavByPermissions(
      adminNavItems,
      session?.user.permissions ?? [],
      session?.user.role,
    );

    return items.flatMap((item) => {
      if (item.children?.length) {
        return item.children.map((child) => ({
          title: `${item.title} > ${child.title}`,
          href: child.href ?? "#",
        }));
      }

      return [{ title: item.title, href: item.href ?? "#" }];
    });
  }, [session?.user.permissions, session?.user.role]);

  const handleLogout = async () => {
    // 1. Tell the backend to invalidate session & send Set-Cookie expiry headers
    try {
      await authService.logout();
    } catch (err) {
      console.warn("Logout request failed on backend. Clearing local session.", err);
    }

    // 2. Clear all client-side cookies (portal_session, csrf_token, access_token, refresh_token)
    dispatch(clearSession());

    // 3. Small delay so the browser processes Set-Cookie expiry headers from the proxy response
    await new Promise((r) => setTimeout(r, 100));

    // 4. Full page reload to /?logout=true — ensures middleware clears cookies safely
    window.location.replace("/?logout=true");
  };

  return (
    <header className="bg-white px-4 py-3 shadow-[0_4px_18px_rgba(39,59,82,0.04)] border-b border-slate-100">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-slate-500 hover:bg-muted cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative" ref={searchRef}>
            <button
              type="button"
              onClick={() => setSearchOpen((current) => !current)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] bg-muted text-slate-400 shadow-[inset_0_0_0_1px_rgba(10,124,63,0.05)] sm:w-[240px] sm:justify-between sm:px-3 md:w-[320px]"
            >
              <span className="hidden text-sm text-slate-400 sm:inline">Search...</span>
              <Search className="h-4 w-4" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-11 z-50 w-[calc(100vw-32px)] overflow-hidden rounded-[10px] bg-white shadow-xl sm:w-[320px] border border-slate-100">
                <div className="bg-muted px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick navigation
                </div>
                <div className="max-h-80 overflow-y-auto p-1">
                  {searchableMenus.map((item) => (
                    <Link
                      key={`${item.title}-${item.href}`}
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className={cn(
                        "block rounded-[8px] px-3 py-2 text-xs hover:bg-muted transition-colors",
                        pathname === item.href && "bg-muted font-semibold text-brand-green",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] bg-muted text-slate-500 transition hover:bg-slate-200"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              className="flex h-9 min-w-[78px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-muted px-2 text-xs shadow-[inset_0_0_0_1px_rgba(10,124,63,0.05)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green/10 font-bold text-brand-green">
                {initials(session?.user.name)}
              </span>
              <span className="px-0.5 text-xs font-semibold text-slate-700">
                {initials(session?.user.name)}
              </span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 text-foreground/45 transition-transform",
                  profileOpen && "rotate-180",
                )}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-[10px] bg-white shadow-lg border border-slate-100">
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex cursor-pointer items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex cursor-pointer w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs text-red-600 hover:bg-muted transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-400" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
