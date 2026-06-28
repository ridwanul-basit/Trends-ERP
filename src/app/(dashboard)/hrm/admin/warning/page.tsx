"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Warning Date", "Subject", "Warning Type", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", warningDate: "1.03.2025", subject: "Late Arrival", warningType: "Verbal", description: "Repeated late arrivals without prior notice" },
  { id: 2, employeeName: "Sonya Sims", warningDate: "1.03.2025", subject: "Policy Violation", warningType: "Written", description: "Violation of company communication policy" },
  { id: 3, employeeName: "Maia", warningDate: "1.03.2025", subject: "Performance", warningType: "Written", description: "Consistent underperformance on assigned tasks" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "warningDate", label: "Warning Date", type: "date", required: true },
  { name: "subject", label: "Subject", type: "text", required: true, placeholder: "Enter subject" },
  { name: "warningType", label: "Warning Type", type: "select", required: true, options: [{ label: "Verbal", value: "verbal" }, { label: "Written", value: "written" }, { label: "Final", value: "final" }] },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function WarningPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.employeeName,
    item.warningDate,
    item.subject,
    item.warningType,
    item.description,
    <TableActions key={item.id} id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Warning"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Warning", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Warning" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Warning" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
