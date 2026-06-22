import {
  Gauge,
  Users,
  Wallet,
  Package,
  HeartHandshake,
  ShoppingCart,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type React from "react";

export type AdminNavItem = {
  title: string;
  href?: string;
  permission?: string;
  requiredRole?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: AdminNavItem[];
};

export const adminNavItems: AdminNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    // permission: "",
    icon: Gauge,
  },
  {
    title: "HRM system",
    icon: Users,
    children: [
      { title: "Employee Setup", href: "/hrm/employee" },
      {
        title: "Payroll Setup",
        children: [
          { title: "Set Salary", href: "/hrm/payroll/set-salary" },
        ],
      },
      { title: "Leave Management", href: "/hrm/leave" },
      { title: "Performance Setup", href: "/hrm/performance" },
      { title: "Training Setup", href: "/hrm/training" },
      { title: "Recruitment Setup", href: "/hrm/recruitment" },
      { title: "HR Admin Setup", href: "/hrm/admin" },
      { title: "Event Setup", href: "/hrm/event" },
      { title: "Meeting", href: "/hrm/meeting" },
      { title: "Employee Asset Setup", href: "/hrm/assets" },
      { title: "Document Setup", href: "/hrm/document" },
      { title: "Company Policy", href: "/hrm/policy" },
      { title: "HRM System Setup", href: "/hrm/system" },
    ]
  },
  {
    title: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "CRM",
    href: "/crm",
    icon: HeartHandshake,
  },
  {
    title: "Procurement",
    href: "/procurement",
    icon: ShoppingCart,
  },
  {
    title: "Access Control",
    icon: ShieldCheck,
    // permission: "role:read",
    children: [
      { title: "Users", href: "/users" },
      { title: "Roles", href: "/roles" },
      { title: "Permissions", href: "/permissions" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export function filterNavByPermissions(
  items: AdminNavItem[],
  permissions: string[] = [],
  role?: string,
): AdminNavItem[] {
  const hasWildcard = permissions.includes("*") || role === "SUPER_ADMIN" || role === "super_admin";

  return items
    .map((item) => {
      let children = item.children;
      if (children) {
        children = filterNavByPermissions(children, permissions, role);
      }

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

function collectRoutePermissions(items: AdminNavItem[], parentPermission?: string, parentRole?: string): AdminRoutePermission[] {
  return items.flatMap((item) => {
    const currentPermission = item.permission ?? parentPermission;
    const currentRole = item.requiredRole ?? parentRole;

    const currentItem = item.href
      ? [
        {
          href: item.href,
          permission: currentPermission,
          requiredRole: currentRole,
        },
      ]
      : [];
      
    const children = item.children
      ? collectRoutePermissions(item.children, currentPermission, currentRole)
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
