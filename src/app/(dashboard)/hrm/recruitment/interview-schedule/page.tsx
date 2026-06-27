"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { PageToolbar, FormSectionHeader, FormModal, FormModalField } from "@/components/shared";

// Mock calendar grid data (March 2025)
const calendarDays = [
  { day: 23, isCurrentMonth: false }, { day: 24, isCurrentMonth: false }, { day: 25, isCurrentMonth: false }, { day: 26, isCurrentMonth: false }, { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false }, { day: 1, isCurrentMonth: true, isSpecial: true },
  { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false }, { day: 4, isCurrentMonth: false }, { day: 5, isCurrentMonth: false },
];

const initialEvents = [
  { id: "1", title: "Company Anniversary Celebration", candidate: "Jessie", date: "03-02-2024 18:37" },
  { id: "2", title: "Company Anniversary Celebration", candidate: "Jessie", date: "03-02-2024 18:37" },
  { id: "3", title: "Company Anniversary Celebration", candidate: "Jessie", date: "03-02-2024 18:37" },
  { id: "4", title: "Company Anniversary Celebration", candidate: "Jessie", date: "03-02-2024 18:37" },
];

export default function InterviewSchedulePage() {
  const [events, setEvents] = useState(initialEvents);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const createFields: FormModalField[] = [
    {
      name: "interviewTo",
      label: "Interview To",
      type: "select",
      required: true,
      options: [{ label: "Test job", value: "test" }, { label: "Design Job", value: "design" }],
    },
    {
      name: "interviewer",
      label: "Interviewer",
      type: "select",
      required: true,
      options: [{ label: "Anabel", value: "anabel" }, { label: "Teresa", value: "teresa" }],
    },
    { name: "interviewDate", label: "Interview Date", type: "date", required: true },
    { name: "interviewTime", label: "Interview Time", type: "time", required: true },
    { name: "comment", label: "Comment", type: "textarea", placeholder: "Enter Comment", rows: 3 },
  ];

  const handleCreateSubmit = (data: Record<string, any>) => {
    console.log("Create Interview Schedule:", data);
    const newEvent = {
      id: String(events.length + 1),
      title: data.interviewTo === "test" ? "Test Job Interview" : "Company Anniversary Celebration",
      candidate: "Jessie",
      date: `${data.interviewDate} ${data.interviewTime || ""}`,
    };
    setEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Interview Schedule"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Interview Schedule", href: "/hrm/recruitment/interview-schedule" },
        ]}
        onAdd={() => setIsCreateModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Calendar Grid Card */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <FormSectionHeader title="Calendar" />
          <div className="p-6 space-y-6">
            {/* Header controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex rounded-md overflow-hidden">
                  <button className="flex h-8 w-9 items-center justify-center bg-cyan-500 text-white hover:opacity-90 transition cursor-pointer">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-9 items-center justify-center bg-cyan-500 text-white hover:opacity-90 transition cursor-pointer">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <button className="h-8 rounded bg-cyan-500 px-4 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer">
                  Today
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-800">March 2025</h3>

              <div className="flex rounded-md overflow-hidden">
                <button className="h-8 bg-cyan-500 px-4 text-xs font-semibold text-white hover:opacity-90 transition cursor-pointer">
                  Week
                </button>
                <button className="h-8 bg-cyan-500 px-4 text-xs font-semibold text-white border-l border-cyan-400 hover:opacity-90 transition cursor-pointer">
                  Month
                </button>
                <button className="h-8 bg-cyan-500 px-4 text-xs font-semibold text-white border-l border-cyan-400 hover:opacity-90 transition cursor-pointer">
                  Days
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-slate-50 text-center py-2.5 border-b border-slate-200 text-xs font-bold text-slate-700">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="grid grid-cols-7 text-xs font-bold text-slate-800">
                {calendarDays.map((cell, idx) => (
                  <div
                    key={idx}
                    className={`h-16 p-2 border-r border-b border-slate-200 last:border-r-0 flex flex-col justify-between ${cell.isSpecial ? "bg-cyan-50/50" : ""
                      } ${!cell.isCurrentMonth ? "text-slate-400 font-medium" : ""}`}
                  >
                    <span className="self-end">{cell.day < 10 ? `0${cell.day}` : cell.day}</span>
                    {cell.isSpecial && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 self-center"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Upcoming Events Card */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm h-fit">
          <FormSectionHeader title="Upcoming Events" />
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border border-slate-100 p-4 hover:shadow-md transition bg-white flex flex-col gap-2 relative group"
              >
                {/* Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
                  <button className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500 text-white hover:opacity-90 cursor-pointer">
                    <Edit className="h-3 w-3" />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white hover:opacity-90 cursor-pointer">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>

                <span className="text-xs font-bold text-theme-primary leading-tight pr-14 cursor-pointer hover:underline">
                  {event.title}
                </span>
                <div className="flex flex-col text-[10px] text-slate-500 font-semibold gap-0.5">
                  <span>Candidate: {event.candidate}</span>
                  <span className="text-slate-400">📅 {event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Interview Schedule"
        fields={createFields}
        onSubmit={handleCreateSubmit}
        submitText="Create"
        gridCols={2}
        maxWidth="max-w-2xl"
      />
    </div>
  );
}
