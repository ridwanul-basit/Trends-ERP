"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { PageToolbar, FormModal, FormModalField } from "@/components/shared";

const UPCOMING_EVENTS = [
  { id: 1, title: "Company Anniversary Celebration", startDate: "20-02-2024", endDate: "21-02-2024" },
  { id: 2, title: "Company Anniversary Celebration", startDate: "20-02-2024", endDate: "21-02-2024" },
  { id: 3, title: "Company Anniversary Celebration", startDate: "20-02-2024", endDate: "21-02-2024" },
];

const sharedFields: FormModalField[] = [
  { name: "eventName", label: "Event Name", type: "text", required: true, placeholder: "Enter event name" },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date", required: true },
  { name: "location", label: "Location", type: "text", placeholder: "Enter location" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter event description..." },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MiniCalendar() {
  const [current, setCurrent] = useState(new Date(2025, 2, 1)); // March 2025

  const year = current.getFullYear();
  const month = current.getMonth();
  const monthName = current.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push(-(daysInPrev - i));
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));
  const today = () => setCurrent(new Date());

  return (
    <div className="flex-1">
      {/* Calendar header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="mr-1 text-sm font-semibold text-slate-600">Calendar</span>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={prev} className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-100 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={next} className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-100 cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button onClick={today} className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer ml-1">
            Today
          </button>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {["Month", "Week", "Days"].map((v) => (
            <button key={v} className={`rounded px-3 py-1 text-xs cursor-pointer ${v === "Month" ? "bg-theme-primary text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Month + year */}
      <div className="mb-2 text-center text-lg font-bold text-slate-700">
        {monthName} {year}
      </div>

      {/* Grid */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <div className="grid grid-cols-7 bg-slate-50">
          {DAYS.map((d) => (
            <div key={d} className="py-2 text-center text-[11px] font-semibold text-slate-400">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {cells.map((cell, i) => {
            const isCurrentMonth = cell !== null && cell > 0;
            const isToday = isCurrentMonth && cell === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const displayNum = cell === null ? "" : cell < 0 ? daysInPrev + cell + 1 : cell;
            return (
              <div key={i} className={`min-h-[56px] p-1.5 text-right text-xs ${!isCurrentMonth ? "bg-slate-50/60 text-slate-300" : "text-slate-600 hover:bg-slate-50 cursor-pointer"}`}>
                <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-medium ${isToday ? "bg-theme-primary text-white" : ""}`}>
                  {displayNum}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EventPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Event"
        breadcrumbs={[{ label: "HRM", href: "/dashboard" }, { label: "Event", href: "/hrm/event" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <div className="flex gap-4">
        {/* Calendar */}
        <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <MiniCalendar />
        </div>

        {/* Upcoming Events */}
        <div className="w-72 flex-none space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-700">Upcoming Events</h2>
          <div className="space-y-3">
            {UPCOMING_EVENTS.map((ev) => (
              <div key={ev.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <p className="mb-1 text-xs font-semibold text-theme-primary">{ev.title}</p>
                <p className="text-[11px] text-slate-500">Start Date : {ev.startDate}</p>
                <p className="text-[11px] text-slate-500">End Date : {ev.endDate}</p>
                <div className="mt-2 flex gap-1">
                  <button onClick={() => setEditItem(ev)} className="flex h-6 w-6 items-center justify-center rounded bg-amber-400 text-white hover:opacity-90 cursor-pointer">
                    <Edit className="h-3 w-3" />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white hover:opacity-90 cursor-pointer">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Event" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Event" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
