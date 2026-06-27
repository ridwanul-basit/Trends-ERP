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
    title: "HRM",
    icon: Users,
    children: [
      { title: "Employee Setup", href: "/hrm/employee" },
      {
        title: "Payroll Setup",
        children: [
          { title: "Set Salary", href: "/hrm/payroll/set-salary" },
        ],
      },
      {
        title: "Leave Management",
        children: [
          { title: "Manage Leave", href: "/hrm/leave/manage" },
          {
            title: "Attendance",
            children: [
              { title: "Mark Attendance", href: "/hrm/leave/attendance/mark" },
              { title: "Bulk Attendance", href: "/hrm/leave/attendance/bulk" },
            ],
          },
        ],
      },
      {
        title: "Performance Setup",
        children: [
          { title: "Indicator", href: "/hrm/performance/indicator" },
          { title: "Appraisal", href: "/hrm/performance/appraisal" },
          { title: "Goal Tracking", href: "/hrm/performance/goal-tracking" },
        ],
      },
      {
        title: "Training Setup",
        children: [
          { title: "Training List", href: "/hrm/training/list" },
          { title: "Trainer", href: "/hrm/training/trainer" },
        ],
      },
      {
        title: "Recruitment Setup",
        children: [
          { title: "Jobs", href: "/hrm/recruitment/jobs" },
          { title: "Job Create", href: "/hrm/recruitment/jobs/create" },
          { title: "Job Application", href: "/hrm/recruitment/application" },
          { title: "Job Candidate", href: "/hrm/recruitment/candidate" },
          { title: "Job On-boarding", href: "/hrm/recruitment/on-boarding" },
          { title: "Custom Question", href: "/hrm/recruitment/custom-question" },
          { title: "Interview schedule", href: "/hrm/recruitment/interview-schedule" },
          // { title: "Career", href: "/hrm/recruitment/career" },
        ],
      },
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
    children: [
      { title: "General", href: "/settings" },
      { title: "Theme", href: "/settings/theme" },
    ],
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
