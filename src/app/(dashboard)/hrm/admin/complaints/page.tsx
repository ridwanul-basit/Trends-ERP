"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Complaint From", "Complaint Against", "Title", "Complaint Date", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, complaintFrom: "Buffy Walter", complaintAgainst: "Sonya Sims", title: "Work Reason", complaintDate: "1.03.2025", description: "Workload and stress" },
  { id: 2, complaintFrom: "Sonya Sims", complaintAgainst: "Buffy Walter", title: "Unprofessional conduct", complaintDate: "1.03.2025", description: "Lack of career growth or development opportunities" },
  { id: 3, complaintFrom: "Buffy Walter", complaintAgainst: "Maia", title: "Work Reason", complaintDate: "1.03.2025", description: "An employee's poor performance" },
  { id: 4, complaintFrom: "Maia", complaintAgainst: "Chartered", title: "Discipline", complaintDate: "1.03.2025", description: "An employee's poor performance" },
  { id: 5, complaintFrom: "Maia", complaintAgainst: "Chartered", title: "Discipline", complaintDate: "1.03.2025", description: "An employee's poor performance" },
];

const sharedFields: FormModalField[] = [
  { name: "complaintFrom", label: "Complaint From", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "complaintAgainst", label: "Complaint Against", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }, { label: "Chartered", value: "chartered" }] },
  { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter complaint title" },
  { name: "complaintDate", label: "Complaint Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function ComplaintsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.complaintFrom,
    item.complaintAgainst,
    item.title,
    item.complaintDate,
    item.description,
    <TableActions key={item.id} id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Complaints"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Complaints", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Complaint" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Complaint" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
