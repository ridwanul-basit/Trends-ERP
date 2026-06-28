"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Termination Date", "Last Working Date", "Notice Period", "Reason", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", terminationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "30 days", reason: "Misconduct" },
  { id: 2, employeeName: "Sonya Sims", terminationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "30 days", reason: "Redundancy" },
  { id: 3, employeeName: "Maia", terminationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "15 days", reason: "Performance" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "terminationDate", label: "Termination Date", type: "date", required: true },
  { name: "lastWorkingDate", label: "Last Working Date", type: "date", required: true },
  { name: "noticePeriod", label: "Notice Period (days)", type: "text", placeholder: "e.g. 30" },
  { name: "reason", label: "Reason", type: "textarea", required: true, placeholder: "Enter reason for termination..." },
];

export default function TerminationPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.employeeName,
    item.terminationDate,
    item.lastWorkingDate,
    item.noticePeriod,
    item.reason,
    <TableActions key={item.id} id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Termination"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Termination", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Termination" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Termination" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
