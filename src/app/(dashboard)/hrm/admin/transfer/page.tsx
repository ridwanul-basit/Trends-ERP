"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Branch", "Department", "Transfer Date", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", branch: "China", department: "Financials", transferDate: "1.03.2025", description: "Skills and career development" },
  { id: 2, employeeName: "Sonya Sims", branch: "Italy", department: "Health Care", transferDate: "1.03.2025", description: "Performance improvement" },
  { id: 3, employeeName: "Maia", branch: "Japan", department: "Financials", transferDate: "1.03.2025", description: "Organizational needs" },
  { id: 4, employeeName: "Maia", branch: "Canada", department: "Health Care", transferDate: "1.03.2025", description: "Organizational needs" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "branch", label: "Branch", type: "select", required: true, options: [{ label: "China", value: "china" }, { label: "Italy", value: "italy" }, { label: "Japan", value: "japan" }, { label: "Canada", value: "canada" }] },
  { name: "department", label: "Department", type: "select", required: true, options: [{ label: "Financials", value: "financials" }, { label: "Health Care", value: "health-care" }] },
  { name: "transferDate", label: "Transfer Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function TransferPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.employeeName,
    item.branch,
    item.department,
    item.transferDate,
    item.description,
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
        title="Manage Transfer"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Transfer", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Transfer"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Transfer"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
