"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField, StarRating, CompetencyRatings } from "@/components/shared";

const competencyGroups = [
  {
    groupTitle: "Behavioral Competencies",
    items: ["Business Process", "Oral Communication"],
  },
  {
    groupTitle: "Organizational Competencies",
    items: ["Leadership", "Project Management"],
  },
  {
    groupTitle: "Technical Competencies",
    items: ["Allocating Resources"],
  },
];

const mockData = [
  { id: "1", branch: "China", department: "Financials", designation: "Chartered", employee: "Sonya Sims", targetRating: 3.5, overallRating: 3.5, appraisalDate: "21-07-2024" },
  { id: "2", branch: "India", department: "Telecommunications", designation: "Chartered", employee: "Sonya Sims", targetRating: 3.5, overallRating: 3.5, appraisalDate: "21-07-2024" },
  { id: "3", branch: "China", department: "Financials", designation: "Chartered", employee: "Abel Callahan", targetRating: 3.5, overallRating: 3.5, appraisalDate: "21-07-2024" },
  { id: "4", branch: "China", department: "Telecommunications", designation: "Chartered", employee: "Sonya Sims", targetRating: 3.5, overallRating: 3.5, appraisalDate: "21-07-2024" },
  { id: "5", branch: "China", department: "Financials", designation: "Chartered", employee: "Abel Callahan", targetRating: 3.5, overallRating: 3.5, appraisalDate: "21-07-2024" },
];

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-slate-500">({rating})</span>
    </div>
  );
}

export default function AppraisalPage() {
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });
  const [indicatorRatings, setIndicatorRatings] = useState<Record<string, number>>({});
  const [appraisalRatings, setAppraisalRatings] = useState<Record<string, number>>({});

  const headers = [
    { label: "BRANCH" },
    { label: "DEPARTMENT" },
    { label: "DESIGNATION" },
    { label: "EMPLOYEE" },
    { label: "TARGET RATING" },
    { label: "OVERALL RATING" },
    { label: "APPRAISAL DATE" },
    { label: <span className="block">ACTION</span> },
  ];

  const editFields: FormModalField[] = [
    {
      name: "branch", label: "Branch", type: "select", required: true,
      options: [{ label: "China", value: "china" }, { label: "India", value: "india" }],
    },
    {
      name: "employee", label: "Employee", type: "select", required: true, placeholder: "Select Employee",
      options: [{ label: "Sonya Sims", value: "sonya" }, { label: "Abel Callahan", value: "abel" }],
    },
    {
      name: "month", label: "Select Month", type: "date", required: true,
    },
    {
      name: "remark", label: "Remark", type: "textarea", required: true, placeholder: "Enter Remark", rows: 3,
    },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log("Appraisal Update:", { ...data, indicatorRatings, appraisalRatings });
    setEditModal({ isOpen: false, data: null });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Appraisal"
        breadcrumbs={[{ label: "HRM", href: "" }, { label: "Performance Setup", href: "" }, { label: "Appraisal", href: "/hrm/performance/appraisal" }]}
        onAdd={() => setEditModal({ isOpen: true, data: {} })}
        showSearch
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockData.length === 0}>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.department}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.designation}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.employee}</td>
              <td className="whitespace-nowrap px-5 py-3"><RatingDisplay rating={row.targetRating} /></td>
              <td className="whitespace-nowrap px-5 py-3"><RatingDisplay rating={row.overallRating} /></td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.appraisalDate}</td>
              <TableActions
                id={row.id}
                showView
                onView={() => setEditModal({ isOpen: true, data: row })}
                showEdit
                onEdit={() => setEditModal({ isOpen: true, data: row })}
                showDelete
              />
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Edit Appraisal Modal — FormModal with dual-column competency ratings as children */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, data: null })}
        title="Edit Appraisal"
        fields={editFields}
        onSubmit={handleSubmit}
        submitText="Update"
        maxWidth="max-w-2xl"
      >
        {/* Dual-column ratings: Indicator | Appraisal */}
        <CompetencyRatings
          groups={competencyGroups}
          ratings={indicatorRatings}
          onChange={(key, val) => setIndicatorRatings(prev => ({ ...prev, [key]: val }))}
          columns={2}
          columnLabels={["Indicator", "Appraisal"]}
          secondaryRatings={appraisalRatings}
          onSecondaryChange={(key, val) => setAppraisalRatings(prev => ({ ...prev, [key]: val }))}
        />
      </FormModal>
    </div>
  );
}
