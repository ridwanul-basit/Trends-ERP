"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Resignation Date", "Last Working Date", "Purpose Of Trip", "Reason", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", purposeOfTrip: "1.03.2025", reason: "Career advancement" },
  { id: 2, employeeName: "Sonya Sims", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", purposeOfTrip: "1.03.2025", reason: "Career advancement" },
  { id: 3, employeeName: "Maia", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", purposeOfTrip: "1.03.2025", reason: "Relocation" },
  { id: 4, employeeName: "Maia", resignationDate: "1.03.2025", lastWorkingDate: "1.04.2025", purposeOfTrip: "1.03.2025", reason: "Relocation" },
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

  const rows = SAMPLE_DATA.map((item) => [
    item.employeeName,
    item.resignationDate,
    item.lastWorkingDate,
    item.purposeOfTrip,
    item.reason,
    <TableActions
      key={item.id}
      id={item.id}
      showEdit
      showDelete
      onEdit={() => setEditItem(item)}
      onDelete={() => console.log("delete", item.id)}
    />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Resignation"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Registration", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Resignation"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Resignation"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
