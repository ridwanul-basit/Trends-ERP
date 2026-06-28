"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Resignation Date", "Last Working Date", "Notice Period", "Reason", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "30 days", reason: "Career advancement" },
  { id: 2, employeeName: "Sonya Sims", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "30 days", reason: "Career advancement" },
  { id: 3, employeeName: "Maia", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "15 days", reason: "Relocation" },
  { id: 4, employeeName: "Maia", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", noticePeriod: "15 days", reason: "Relocation" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "resignationDate", label: "Resignation Date", type: "date", required: true },
  { name: "lastWorkingDate", label: "Last Working Date", type: "date", required: true },
  { name: "noticePeriod", label: "Notice Period (days)", type: "text", placeholder: "e.g. 30" },
  { name: "reason", label: "Reason", type: "textarea", required: true, placeholder: "Enter reason for resignation..." },
];

export default function RegistrationPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Resignation"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Registration", href: "/hrm/admin/registration" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.employeeName}</td>
            <td className="px-5 py-3">{item.resignationDate}</td>
            <td className="px-5 py-3">{item.lastWorkingDate}</td>
            <td className="px-5 py-3">{item.noticePeriod}</td>
            <td className="px-5 py-3">{item.reason}</td>
            <td className="px-5 py-3">
              <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
            </td>
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Resignation" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Resignation" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
