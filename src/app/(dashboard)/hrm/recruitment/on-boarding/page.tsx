"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { DataTable, PageToolbar, TableActions } from "@/components/shared";

const mockOnboardings = [
  { id: "1", name: "Jessie", job: "Highly Competitive Fashion Jobs", branch: "China", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
  { id: "2", name: "Candice", job: "The Great Versatility of Business Jobs", branch: "-", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
  { id: "3", name: "kjh", job: "Highly Competitive Fashion Jobs", branch: "China", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Pending" },
  { id: "4", name: "Jessie", job: "Highly Competitive Fashion Jobs", branch: "-", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
  { id: "5", name: "Jessie", job: "The Great Versatility of Business Jobs", branch: "-", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Cancel" },
  { id: "6", name: "Jessie", job: "Highly Competitive Fashion Jobs", branch: "China", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
];

export default function OnBoardingPage() {
  const headers = [
    { label: "NAME" },
    { label: "JOB" },
    { label: "BRANCH" },
    { label: "APPLIED AT" },
    { label: "JOINED AT" },
    { label: "STATUS" },
    { label: <span className="block">ACTION</span> },
  ];

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Job On-boarding"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Job On-boarding", href: "/hrm/recruitment/on-boarding" },
        ]}
        onAdd={() => console.log("Add on-boarding click")}
        showSearch
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockOnboardings.length === 0}>
          {mockOnboardings.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600 font-semibold">{row.name}</td>
              <td className="px-5 py-3 text-slate-600 font-medium max-w-xs truncate">{row.job}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.appliedAt}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.joinedAt}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-xs font-bold text-white shadow-sm ${
                    row.status === "Confirm"
                      ? "bg-green-500"
                      : row.status === "Pending"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-5 py-2">
                <div className="flex items-center gap-1.5">
                  {row.status !== "Pending" && row.status !== "Cancel" && (
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-white hover:opacity-90 transition cursor-pointer"
                      title="View Details"
                    >
                      <Download className="h-3.5 w-3.5 rotate-180" /> {/* Eye/View representation */}
                    </button>
                  )}
                  <TableActions
                    id={row.id}
                    showView={false}
                    showEdit
                    onEdit={() => console.log("Edit onboarding:", row.id)}
                    showDelete
                    onDelete={() => console.log("Delete onboarding:", row.id)}
                  />
                  {row.status !== "Pending" && row.status !== "Cancel" && (
                    <>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded bg-green-500 text-white hover:opacity-90 transition cursor-pointer"
                        title="Download Offer Letter"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded bg-green-600 text-white hover:opacity-90 transition cursor-pointer"
                        title="View Document"
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
