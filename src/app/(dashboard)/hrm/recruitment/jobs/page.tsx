"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, CheckCircle2, XCircle } from "lucide-react";
import { DataTable, PageToolbar, TableActions, StatsCard } from "@/components/shared";

const mockJobs = [
  { id: "1", branch: "India", title: "The Great Versatility of Business Jobs", startDate: "28-02-2024", endDate: "28-01-2025", status: "Active", createdAt: "21-07-2023" },
  { id: "2", branch: "India", title: "Highly Competitive Fashion Jobs", startDate: "28-02-2024", endDate: "28-01-2025", status: "Active", createdAt: "21-07-2023" },
  { id: "3", branch: "India", title: "Voluptatibus similiq", startDate: "28-02-2024", endDate: "28-01-2025", status: "Active", createdAt: "21-07-2023" },
  { id: "4", branch: "India", title: "Pariatur Accusamus", startDate: "28-02-2024", endDate: "28-01-2025", status: "Active", createdAt: "21-07-2023" },
  { id: "5", branch: "India", title: "The Great Versatility of Business Jobs", startDate: "28-02-2024", endDate: "28-01-2025", status: "Active", createdAt: "21-07-2023" },
  { id: "6", branch: "India", title: "The Great Versatility of Business Jobs", startDate: "28-02-2024", endDate: "28-01-2025", status: "Active", createdAt: "21-07-2023" },
];

export default function JobsPage() {
  const router = useRouter();

  const headers = [
    { label: "BRANCH" },
    { label: "TITLE" },
    { label: "START DATE" },
    { label: "END DATE" },
    { label: "STATUS" },
    { label: "CREATE AT" },
    { label: <span className="block">ACTION</span> },
  ];

  return (
    <div className="space-y-6">
      <PageToolbar
        title="Manage Job"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Jobs", href: "/hrm/recruitment/jobs" },
        ]}
        onAdd={() => router.push("/hrm/recruitment/jobs/create")}
        showSearch
      />

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Jobs"
          value={10}
          icon={Briefcase}
          iconColorClass="text-amber-500"
          iconBgClass="bg-amber-500/10"
        />
        <StatsCard
          title="Active Jobs"
          value={10}
          icon={CheckCircle2}
          iconColorClass="text-green-500"
          iconBgClass="bg-green-500/10"
        />
        <StatsCard
          title="Inactive Jobs"
          value={10}
          icon={XCircle}
          iconColorClass="text-red-500"
          iconBgClass="bg-red-500/10"
        />
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockJobs.length === 0}>
          {mockJobs.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="px-5 py-3 text-slate-600 font-medium max-w-xs truncate">{row.title}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.startDate}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.endDate}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                  {row.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.createdAt}</td>
              <TableActions
                id={row.id}
                showLink
                onLink={() => console.log("Copy link for job:", row.id)}
                showView
                onView={() => console.log("View job details:", row.id)}
                showEdit
                onEdit={() => router.push(`/hrm/recruitment/jobs/create?edit=${row.id}`)}
                showDelete
                onDelete={() => console.log("Delete job:", row.id)}
              />
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
