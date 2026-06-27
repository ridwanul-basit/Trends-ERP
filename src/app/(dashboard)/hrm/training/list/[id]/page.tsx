"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageToolbar, FormField } from "@/components/shared";

// Mock training detail — in real use, fetch by id
const mockDetail = {
  trainingType: "Job Training",
  trainer: "Anabel",
  trainingCost: "USD 5,000.00",
  startDate: "21-07-2024",
  endDate: "21-07-2024",
  date: "21-07-2024",
  description: "Anabel is the sixth Franc or Brain and is in charge of -roan's Battle Tower.",
  employee: {
    name: "Richard Atkinson",
    designation: "Chartered",
    avatar: "https://i.pravatar.cc/48?img=12",
  },
};

const detailRows = [
  { label: "Training Type", value: mockDetail.trainingType },
  { label: "Trainer", value: mockDetail.trainer },
  { label: "Training Cost", value: mockDetail.trainingCost },
  { label: "Start Date", value: mockDetail.startDate },
  { label: "End Date", value: mockDetail.endDate },
  { label: "Date", value: mockDetail.date },
];

const performanceOptions = [
  { label: "Not Concluded", value: "not_concluded" },
  { label: "Satisfactory", value: "satisfactory" },
  { label: "Average", value: "average" },
  { label: "Poor", value: "poor" },
  { label: "Excellent", value: "excellent" },
];

const statusOptions = [
  { label: "Started", value: "started" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

export default function TrainingDetailPage() {
  const router = useRouter();
  const [performance, setPerformance] = useState("not_concluded");
  const [status, setStatus] = useState("started");
  const [remarks, setRemarks] = useState("");

  const handleSave = () => {
    console.log("Save status:", { performance, status, remarks });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Training Details"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Training", href: "/hrm/training/list" },
          { label: "Training Details", href: "#" },
        ]}
        hideControls
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left — Key-Value detail table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden h-fit">
          <div className="flex flex-col divide-y divide-slate-100">
            {detailRows.map((row) => (
              <div key={row.label} className="grid grid-cols-2 px-5 py-3 hover:bg-slate-50/50 transition-colors">
                <span className="text-xs font-semibold text-slate-600">{row.label}</span>
                <span className="text-xs text-slate-700">{row.value}</span>
              </div>
            ))}
          </div>
          {/* Description */}
          {mockDetail.description && (
            <div className="px-5 py-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 italic">{mockDetail.description}</p>
            </div>
          )}
        </div>

        {/* Right — Employee + Update Status */}
        <div className="flex flex-col gap-4">
          {/* Training Employee card */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-theme-primary bg-white">
              <span className="text-sm font-semibold text-slate-800">Training Employee</span>
            </div>
            <div className="px-5 py-4 flex items-center gap-3">
              <img
                src={mockDetail.employee.avatar}
                alt={mockDetail.employee.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">{mockDetail.employee.name}</span>
                <span className="text-xs text-slate-500">{mockDetail.employee.designation}</span>
              </div>
            </div>
          </div>

          {/* Update Status card */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-theme-primary bg-white">
              <span className="text-sm font-semibold text-slate-800">Update Status</span>
            </div>
            <div className="px-5 py-4 space-y-4">
              {/* Performance + Status side by side */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Performance"
                  type="select"
                  name="performance"
                  options={performanceOptions}
                  value={performance}
                  onChange={setPerformance}
                />
                <FormField
                  label="Status"
                  type="select"
                  name="status"
                  options={statusOptions}
                  value={status}
                  onChange={setStatus}
                />
              </div>

              {/* Remarks textarea — reuses FormField type="textarea" */}
              <FormField
                label="Remarks"
                type="textarea"
                name="remarks"
                placeholder="Remarks"
                value={remarks}
                onChange={setRemarks}
                rows={3}
              />

              {/* Save button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-theme-primary px-8 py-2 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
