"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  getRequiredPermissionForPath,
  getDefaultAuthorizedRoute,
} from "@/lib/constants/routes";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, hydrated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hydrated) return;

    if (!session) {
      // Not logged in: Redirect to login
      router.push("/login");
      setAuthorized(false);
      return;
    }

    // Logged in: Validate permissions for this path
    const required = getRequiredPermissionForPath(pathname);
    if (!required) {
      // Public route or undefined required permission: Allow access
      setAuthorized(true);
      return;
    }

    const userPermissions = session.user.permissions || [];
    const userRole = session.user.role || "";

    const hasWildcard = userPermissions.includes("*") || userRole.toUpperCase() === "SUPER_ADMIN";

    // Check permission
    const hasPermission =
      hasWildcard ||
      !required.permission ||
      userPermissions.includes(required.permission);

    // Check role
    const hasRole = !required.requiredRole || required.requiredRole.toUpperCase() === userRole.toUpperCase();

    if (hasPermission && hasRole) {
      setAuthorized(true);
    } else {
      // Unauthorized: Redirect to default authorized route based on permissions
      const defaultRoute = getDefaultAuthorizedRoute(userPermissions, userRole);

      // Prevent infinite redirect loop
      if (defaultRoute === pathname) {
        setAuthorized(true);
      } else {
        router.push(defaultRoute);
        setAuthorized(false);
      }
    }
  }, [session, hydrated, pathname, router, mounted]);

  if (!mounted || !hydrated || (!session && pathname !== "/login")) {
    // Show premium Loading Spinner to prevent UI layout flash
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-surface gap-3">
        <svg viewBox="0 0 40 40" className="h-12 w-12 shrink-0 animate-spin">
          <circle cx="20" cy="20" r="18" className="fill-none stroke-brand-green stroke-[3px]" />
          <path d="M20,2 A18,18 0 0,1 38,20" className="fill-none stroke-brand-orange stroke-[4px] stroke-linecap-round" />
        </svg>
        <span className="font-sans text-xs font-bold text-slate-400 animate-pulse uppercase tracking-widest">
          Loading portal session...
        </span>
      </div>
    );
  }

  // If unauthorized, render nothing while redirect is in progress
  if (session && !authorized && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}
