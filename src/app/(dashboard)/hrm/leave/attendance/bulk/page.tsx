"use client";

import { useState } from "react";
import { DataTable, PageToolbar, FormField } from "@/components/shared";

const branchOptions = [
  { label: "China", value: "china" },
  { label: "USA", value: "usa" },
];
const departmentOptions = [
  { label: "Financials", value: "financials" },
  { label: "HR", value: "hr" },
];

const mockBulkData = [
  { id: "EMP123456", employee: "Sonya Sims", branch: "China", department: "Financials", attendance: false, inTime: "", outTime: "" },
  { id: "EMP123456", employee: "Maia", branch: "China", department: "Financials", attendance: true, inTime: "09:00 AM", outTime: "09:00 AM" },
  { id: "EMP123456", employee: "Tamekah Wolfe", branch: "China", department: "Financials", attendance: true, inTime: "09:00 AM", outTime: "09:00 AM" },
  { id: "EMP123456", employee: "Sonya Sims", branch: "China", department: "Financials", attendance: true, inTime: "09:00 AM", outTime: "09:00 AM" },
  { id: "EMP123456", employee: "Sonya Sims", branch: "China", department: "Financials", attendance: false, inTime: "", outTime: "" },
  { id: "EMP123456", employee: "Sonya Sims", branch: "China", department: "Financials", attendance: false, inTime: "", outTime: "" },
];

export default function BulkAttendancePage() {
  const [filters, setFilters] = useState({ date: "", branch: "", department: "" });
  const [rows, setRows] = useState(mockBulkData.map((r, i) => ({ ...r, _idx: i })));

  const headers = [
    { label: "EMPLOYEE ID" },
    { label: "EMPLOYEE" },
    { label: "BRANCH" },
    { label: "DEPARTMENT" },
    { label: "ATTENDANCE" },
    { label: "IN" },
    { label: "OUT" },
  ];

  const toggleAttendance = (idx: number) => {
    setRows(prev => prev.map(r =>
      r._idx === idx ? { ...r, attendance: !r.attendance, inTime: !r.attendance ? "09:00 AM" : "", outTime: !r.attendance ? "09:00 AM" : "" } : r
    ));
  };

  const updateTime = (idx: number, field: "inTime" | "outTime", value: string) => {
    setRows(prev => prev.map(r => r._idx === idx ? { ...r, [field]: value } : r));
  };

  const handleUpdate = () => {
    console.log("Bulk Update:", rows);
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Bulk Attendance"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Attendance", href: "/hrm/leave/attendance/bulk" },
        ]}
        hideControls
      />

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end justify-end gap-6">
          <FormField
            name="date"
            label="Date"
            type="select"
            options={[{ label: "FEB,2025", value: "feb2025" }]}
            value={filters.date}
            onChange={(v) => setFilters(p => ({ ...p, date: v }))}
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
          <div className="flex items-end pb-0.5">
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-theme-primary text-white hover:opacity-90 transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={rows.length === 0}>
          {rows.map((row) => (
            <tr key={`${row.id}-${row._idx}`}>
              {/* Employee ID badge */}
              <td className="whitespace-nowrap px-5 py-3">
                <span className="rounded border border-theme-primary px-2 py-0.5 text-[10px] font-bold text-theme-primary">
                  #{row.id}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.employee}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.department}</td>

              {/* Attendance toggle checkbox */}
              <td className="whitespace-nowrap px-5 py-3">
                <label className="flex items-center cursor-pointer gap-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={row.attendance}
                      onChange={() => toggleAttendance(row._idx)}
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors ${row.attendance ? "bg-theme-primary" : "bg-slate-200"}`} />
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${row.attendance ? "translate-x-5" : ""}`} />
                  </div>
                  {row.attendance && (
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />
                  )}
                </label>
              </td>

              {/* In Time */}
              <td className="whitespace-nowrap px-5 py-3">
                {row.attendance ? (
                  <input
                    type="time"
                    value={row.inTime ? convertTo24(row.inTime) : "09:00"}
                    onChange={(e) => updateTime(row._idx, "inTime", e.target.value)}
                    className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-theme-primary"
                  />
                ) : (
                  <span className="text-slate-300 text-xs">—</span>
                )}
              </td>

              {/* Out Time */}
              <td className="whitespace-nowrap px-5 py-3">
                {row.attendance ? (
                  <input
                    type="time"
                    value={row.outTime ? convertTo24(row.outTime) : "09:00"}
                    onChange={(e) => updateTime(row._idx, "outTime", e.target.value)}
                    className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-theme-primary"
                  />
                ) : (
                  <span className="text-slate-300 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Update Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="rounded-lg bg-theme-primary px-8 py-2.5 text-sm font-bold text-white hover:opacity-90 transition cursor-pointer"
        >
          Update
        </button>
      </div>
    </div>
  );
}

function convertTo24(timeStr: string): string {
  if (!timeStr || timeStr.includes(":") && !timeStr.includes("AM") && !timeStr.includes("PM")) return timeStr;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "00")}`;
}
