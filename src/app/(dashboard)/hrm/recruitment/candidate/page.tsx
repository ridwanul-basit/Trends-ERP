"use client";

import { Download, ExternalLink } from "lucide-react";
import { DataTable, PageToolbar, TableActions, StarRating } from "@/components/shared";

const mockCandidates = [
  { id: "1", name: "Candice", appliedFor: "Highly Competitive Fashion Jobs", rating: 3.5, appliedAt: "24-07-2024" },
  { id: "2", name: "Candice", appliedFor: "Highly Competitive Fashion Jobs", rating: 3.5, appliedAt: "24-07-2024" },
  { id: "3", name: "Candice", appliedFor: "Highly Competitive Fashion Jobs", rating: 3.5, appliedAt: "24-07-2024" },
  { id: "4", name: "Candice", appliedFor: "Highly Competitive Fashion Jobs", rating: 3.5, appliedAt: "24-07-2024" },
  { id: "5", name: "Candice", appliedFor: "Highly Competitive Fashion Jobs", rating: 3.5, appliedAt: "24-07-2024" },
  { id: "6", name: "Candice", appliedFor: "Highly Competitive Fashion Jobs", rating: 3.5, appliedAt: "24-07-2024" },
];

export default function CandidatePage() {
  const headers = [
    { label: "NAME" },
    { label: "APPLIED FOR" },
    { label: "RATING" },
    { label: "APPLIED AT" },
    { label: "CV / RESUME" },
    { label: <span className="block">ACTION</span> },
  ];

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Archive Application"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Job Candidate", href: "/hrm/recruitment/candidate" },
        ]}
        hideControls
      />

      <div className="rounded-xl  bg-white overflow-hidden shadow-sm">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockCandidates.length === 0}>
          {mockCandidates.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600 font-semibold">{row.name}</td>
              <td className="px-5 py-3 text-slate-600 font-medium max-w-xs truncate">{row.appliedFor}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <div className="flex items-center gap-1">
                  <StarRating value={row.rating} readOnly size="sm" />
                  <span className="text-xs text-slate-500 font-medium">({row.rating})</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.appliedAt}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <div className="flex items-center gap-1.5">
                  <button className="flex h-7 w-7 items-center justify-center rounded bg-green-500 text-white hover:opacity-90 transition cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded bg-cyan-500 text-white hover:opacity-90 transition cursor-pointer">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
              <TableActions
                id={row.id}
                showView
                onView={() => console.log("View candidate details:", row.id)}
                showEdit={false}
                showDelete={false}
              />
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
