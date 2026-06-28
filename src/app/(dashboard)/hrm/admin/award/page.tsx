"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Award Name", "Award Date", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", awardName: "Employee of the Month", awardDate: "1.03.2025", description: "Outstanding performance and dedication" },
  { id: 2, employeeName: "Sonya Sims", awardName: "Best Team Player", awardDate: "1.03.2025", description: "Excellent collaboration and teamwork" },
  { id: 3, employeeName: "Maia", awardName: "Innovation Award", awardDate: "1.03.2025", description: "Creative solutions to complex problems" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "awardName", label: "Award Name", type: "text", required: true, placeholder: "Enter award name" },
  { name: "awardDate", label: "Award Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function AwardPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Award"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Award", href: "/hrm/admin/award" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.employeeName}</td>
            <td className="px-5 py-3">{item.awardName}</td>
            <td className="px-5 py-3">{item.awardDate}</td>
            <td className="px-5 py-3">{item.description}</td>
            <td className="px-5 py-3">
              <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
            </td>
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Award" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Award" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
