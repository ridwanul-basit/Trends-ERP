"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField, FormField } from "@/components/shared";

const mockData = [
  { id: "1", employee: "Anne George", date: "02-02-2025", status: "Present", clockIn: "09:00", clockOut: "18:00", late: "00:00:00", earlyLeaving: "00:00:00", overtime: "00:00:00" },
  { id: "2", employee: "Tamekah Wolfe", date: "05-02-2025", status: "Leave", clockIn: "10:00", clockOut: "00:00", late: "00:00:00", earlyLeaving: "00:00:00", overtime: "00:00:00" },
  { id: "3", employee: "Sonya Sims", date: "17-02-2025", status: "Present", clockIn: "00:00", clockOut: "19:00", late: "00:00:00", earlyLeaving: "00:00:00", overtime: "00:00:00" },
  { id: "4", employee: "Maia", date: "22-02-2025", status: "Leave", clockIn: "00:00", clockOut: "00:00", late: "00:00:00", earlyLeaving: "00:00:00", overtime: "00:00:00" },
  { id: "5", employee: "Sonya Sims", date: "22-02-2025", status: "Present", clockIn: "10:00", clockOut: "19:00", late: "00:00:00", earlyLeaving: "00:00:00", overtime: "00:00:00" },
  { id: "6", employee: "Sonya Sims", date: "22-02-2025", status: "Leave", clockIn: "00:00", clockOut: "19:00", late: "00:00:00", earlyLeaving: "00:00:00", overtime: "00:00:00" },
];

const branchOptions = [
  { label: "China", value: "china" },
  { label: "USA", value: "usa" },
];
const departmentOptions = [
  { label: "Financials", value: "financials" },
  { label: "HR", value: "hr" },
];

export default function MarkAttendancePage() {
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });
  const [filters, setFilters] = useState({ type: "monthly", month: "", branch: "", department: "" });

  const headers = [
    { label: "EMPLOYEE" },
    { label: "DATE" },
    { label: "STATUS" },
    { label: "CLOCK IN" },
    { label: "CLOCK OUT" },
    { label: "LATE" },
    { label: "EARLY LEAVING" },
    { label: "OVERTIME" },
    { label: <span className="block">ACTION</span> },
  ];

  const editFields: FormModalField[] = [
    {
      name: "employee", label: "Employee", type: "select", required: true,
      options: [
        { label: "Sonya Sims", value: "sonya" },
        { label: "Anne George", value: "anne" },
        { label: "Tamekah Wolfe", value: "tamekah" },
      ]
    },
    { name: "date", label: "Date", type: "date", required: false },
    { name: "clockIn", label: "Clock In", type: "time", required: false },
    { name: "clockOut", label: "Clock Out", type: "time", required: false },
  ];

  const handleEditSubmit = (data: Record<string, any>) => {
    console.log("Update Attendance:", data);
    setEditModal({ isOpen: false, data: null });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Attendance List"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Attendance", href: "/hrm/leave/attendance/mark" },
        ]}
        onAdd={() => {}}
        showSearch
        searchPlaceholder="Search..."
      />

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          {/* Type toggle */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700">Type</span>
            <div className="flex items-center gap-4 h-9">
              {["monthly", "daily"].map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attendanceType"
                    value={t}
                    checked={filters.type === t}
                    onChange={() => setFilters(p => ({ ...p, type: t }))}
                    className="h-3.5 w-3.5 cursor-pointer accent-theme-primary"
                  />
                  <span className="text-xs font-bold text-slate-700 capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Month */}
          <FormField
            name="month"
            label={filters.type === "daily" ? "Date" : "Month"}
            type="select"
            options={[{ label: "FEB,2025", value: "feb2025" }, { label: "MAR,2025", value: "mar2025" }]}
            value={filters.month}
            onChange={(v) => setFilters(p => ({ ...p, month: v }))}
            className="w-44"
          />
          <FormField
            name="branch"
            label="Branch"
            type="select"
            placeholder="Select Branch"
            options={branchOptions}
            value={filters.branch}
            onChange={(v) => setFilters(p => ({ ...p, branch: v }))}
            className="w-44"
          />
          <FormField
            name="department"
            label="Department"
            type="select"
            placeholder="Select Department"
            options={departmentOptions}
            value={filters.department}
            onChange={(v) => setFilters(p => ({ ...p, department: v }))}
            className="w-44"
          />

          {/* Utility icons */}
          <div className="flex items-end gap-1.5 pb-0.5">
            {["🔄", "⬇️", "🖨️"].map((icon, i) => (
              <button key={i} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition text-base">
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockData.length === 0}>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.employee}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.date}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <span className={`text-xs font-semibold ${row.status === "Present" ? "text-green-600" : "text-amber-500"}`}>
                  {row.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.clockIn}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.clockOut}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.late}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.earlyLeaving}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.overtime}</td>
              <TableActions
                id={row.id}
                showEdit
                showDelete
                onEdit={() => setEditModal({ isOpen: true, data: row })}
              />
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Edit Attendance Modal – reuses FormModal with time type */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, data: null })}
        title="Edit Attendance"
        fields={editFields}
        onSubmit={handleEditSubmit}
        submitText="Update"
      />
    </div>
  );
}
