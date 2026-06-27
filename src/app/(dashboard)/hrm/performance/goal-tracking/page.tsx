"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField, StarRating } from "@/components/shared";

const mockData = [
  { id: "1", goalType: "Invoice Goal", subject: "Hic quod sapiente ni", branch: "Greece", targetAchievement: 10000, startDate: "01-10-2024", endDate: "01-10-2024", rating: 3.5, progress: 44 },
  { id: "2", goalType: "Invoice Goal", subject: "Hic quod sapiente ni", branch: "Greece", targetAchievement: 10000, startDate: "01-10-2024", endDate: "01-10-2024", rating: 3.5, progress: 44 },
  { id: "3", goalType: "Invoice Goal", subject: "Hic quod sapiente ni", branch: "Greece", targetAchievement: 10000, startDate: "01-10-2024", endDate: "01-10-2024", rating: 3.5, progress: 44 },
  { id: "4", goalType: "Invoice Goal", subject: "Hic quod sapiente ni", branch: "Greece", targetAchievement: 10000, startDate: "01-10-2024", endDate: "01-10-2024", rating: 3.5, progress: 44 },
  { id: "5", goalType: "Invoice Goal", subject: "Hic quod sapiente ni", branch: "Greece", targetAchievement: 10000, startDate: "01-10-2024", endDate: "01-10-2024", rating: 3.5, progress: 44 },
  { id: "6", goalType: "Invoice Goal", subject: "Hic quod sapiente ni", branch: "Greece", targetAchievement: 10000, startDate: "01-10-2024", endDate: "01-10-2024", rating: 3.5, progress: 44 },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-20 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-theme-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-theme-primary">{value}%</span>
    </div>
  );
}

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">({rating})</span>
    </div>
  );
}

export default function GoalTrackingPage() {
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });
  const [starRating, setStarRating] = useState(0);
  const [progress, setProgress] = useState(44);

  const headers = [
    { label: "GOAL TYPE" },
    { label: "SUBJECT" },
    { label: "BRANCH" },
    { label: "TARGET ACHIEVEMENT" },
    { label: "START DATE" },
    { label: "END DATE" },
    { label: "RATING" },
    { label: "PROGRESS" },
    { label: <span className="block">ACTION</span> },
  ];

  // Top 2-col fields: Branch, Goal Types, Start Date, End Date
  const topFields: FormModalField[] = [
    {
      name: "branch", label: "Branch", type: "select", required: true,
      options: [{ label: "Greece", value: "greece" }, { label: "China", value: "china" }],
    },
    {
      name: "goalType", label: "Goal Types", type: "select", required: true, placeholder: "Select Goal Type",
      options: [{ label: "Invoice Goal", value: "invoice" }, { label: "Sales Goal", value: "sales" }],
    },
    { name: "startDate", label: "Start Date", type: "date", required: true },
    { name: "endDate", label: "End Date", type: "date", required: true },
    { name: "subject", label: "Subject", type: "text", required: true, placeholder: "Enter Subject" },
    { name: "targetAchievement", label: "Target Achievement", type: "text", required: true, placeholder: "Enter Target Achievement" },
  ];

  const bottomFields: FormModalField[] = [
    { name: "description", label: "Description", type: "textarea", placeholder: "Leave Reason", rows: 3 },
    {
      name: "status", label: "Status", type: "select",
      options: [{ label: "Not Started", value: "not_started" }, { label: "In Progress", value: "in_progress" }, { label: "Completed", value: "completed" }],
    },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log("Goal Tracking Update:", { ...data, starRating, progress });
    setEditModal({ isOpen: false, data: null });
  };

  const openEdit = (row: any) => {
    setStarRating(Math.round(row.rating));
    setProgress(row.progress);
    setEditModal({ isOpen: true, data: row });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Goal Tracking"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Goal Tracking", href: "/hrm/performance/goal-tracking" }]}
        onAdd={() => { setStarRating(0); setProgress(0); setEditModal({ isOpen: true, data: {} }); }}
        showSearch
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockData.length === 0}>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.goalType}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600 max-w-[180px] truncate">{row.subject}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.targetAchievement}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.startDate}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.endDate}</td>
              <td className="whitespace-nowrap px-5 py-3"><RatingDisplay rating={row.rating} /></td>
              <td className="whitespace-nowrap px-5 py-3"><ProgressBar value={row.progress} /></td>
              <TableActions
                id={row.id}
                showEdit
                onEdit={() => openEdit(row)}
                showDelete
              />
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Edit Goal Tracking Modal — FormModal with star rating + progress slider as children */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, data: null })}
        title="Edit Goal Tracking"
        fields={topFields}
        onSubmit={handleSubmit}
        submitText="Update"
        gridCols={2}
        maxWidth="max-w-2xl"
      >
        {/* Additional full-width fields below the grid */}
        <div className="space-y-4 mt-2">
          {bottomFields.map((f) => (
            <div key={f.name}>
              {f.type === "textarea" ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">{f.label}</label>
                  <textarea
                    placeholder={f.placeholder}
                    rows={f.rows || 3}
                    className="w-full rounded-md border border-theme-border bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/10 resize-y"
                  />
                </div>
              ) : f.type === "select" ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">{f.label}</label>
                  <select className="w-full rounded-md border border-theme-border bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/10">
                    {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              ) : null}
            </div>
          ))}

          {/* Star Rating */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Rating</label>
            <StarRating value={starRating} onChange={setStarRating} />
          </div>

          {/* Progress Slider */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Progress — <span className="text-theme-primary font-bold">{progress}%</span></label>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 rounded-full accent-theme-primary cursor-pointer"
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
