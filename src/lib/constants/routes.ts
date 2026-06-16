import {
  Gauge,
  Users,
  BookOpen,
  Trophy,
  Layers,
  ShieldCheck,
  Settings,
} from "lucide-react";
import type React from "react";

export type AdminNavItem = {
  title: string;
  href?: string;
  permission?: string;
  requiredRole?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: Omit<AdminNavItem, "icon" | "children">[];
};

export const adminNavItems: AdminNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    permission: "dashboard:read",
    icon: Gauge,
  },
  {
    title: "Participants",
    href: "/participants",
    permission: "participant:read",
    icon: Users,
  },
  {
    title: "Questions & Quizzes",
    href: "/questions",
    permission: "question:read",
    icon: BookOpen,
  },
  {
    title: "Rounds / Stages",
    href: "/rounds",
    permission: "round:read",
    icon: Layers,
  },
  {
    title: "Scoreboards",
    href: "/scoreboards",
    permission: "scoreboard:read",
    icon: Trophy,
  },
  {
    title: "Access Control",
    icon: ShieldCheck,
    permission: "role:read",
    children: [
      { title: "Users", href: "/users", permission: "user:read" },
      { title: "Roles", href: "/roles", permission: "role:read" },
      { title: "Permissions", href: "/permissions", permission: "permission:read" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/settings" },
      { title: "Seasons", href: "/settings/seasons", permission: "season:read" },
      { title: "Zones", href: "/settings/zones", permission: "zone:read" },
    ],
  },
];

export function filterNavByPermissions(
  items: AdminNavItem[],
  permissions: string[] = [],
  role?: string,
) {
  // If user has wildcard '*' permission or is SUPER_ADMIN, show everything
  const hasWildcard = permissions.includes("*") || role === "SUPER_ADMIN" || role === "super_admin";

  return items
    .map((item) => {
      const children = item.children?.filter(
        (child) =>
          hasWildcard ||
          ((!child.permission || permissions.includes(child.permission)) &&
            (!child.requiredRole || child.requiredRole === role)),
      );

      return { ...item, children };
    })
    .filter((item) => {
      const hasPermission =
        hasWildcard || !item.permission || permissions.includes(item.permission);
      const hasRequiredRole = !item.requiredRole || item.requiredRole === role;

      return (
        hasPermission &&
        hasRequiredRole &&
        (!item.children || item.children.length > 0)
      );
    });
}

type AdminRoutePermission = {
  href: string;
  permission?: string;
  requiredRole?: string;
};

function collectRoutePermissions(items: AdminNavItem[]): AdminRoutePermission[] {
  return items.flatMap((item) => {
    const currentItem = item.href
      ? [
          {
            href: item.href,
            permission: item.permission,
            requiredRole: item.requiredRole,
          },
        ]
      : [];
    const children = item.children
      ? item.children.map((child) => ({
          href: child.href ?? "",
          permission: child.permission ?? item.permission,
          requiredRole: child.requiredRole ?? item.requiredRole,
        }))
      : [];

    return [...currentItem, ...children].filter((route) => route.href);
  });
}

const adminRoutePermissions = collectRoutePermissions(adminNavItems).sort(
  (left, right) => right.href.length - left.href.length,
);

export function getRequiredPermissionForPath(pathname: string) {
  const normalizedPath = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
  return adminRoutePermissions.find((route) => {
    if (route.href === normalizedPath) {
      return true;
    }

    return normalizedPath.startsWith(`${route.href}/`);
  });
}

export function getDefaultAuthorizedRoute(permissions: string[] = [], role?: string) {
  const firstAllowedItem = filterNavByPermissions(
    adminNavItems,
    permissions,
    role,
  ).find((item) => item.href);

  if (firstAllowedItem?.href) {
    return firstAllowedItem.href;
  }

  return "/dashboard";
}
