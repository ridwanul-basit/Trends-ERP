"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Setting Name", "Category", "Value", "Last Updated", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, settingName: "Working Hours", category: "Attendance", value: "9:00 AM - 6:00 PM", lastUpdated: "1.01.2025", description: "Standard office working hours" },
  { id: 2, settingName: "Weekend Days", category: "Attendance", value: "Friday, Saturday", lastUpdated: "1.01.2025", description: "Designated weekend/off days" },
  { id: 3, settingName: "Probation Period", category: "Employment", value: "3 Months", lastUpdated: "1.01.2025", description: "Default probation period for new hires" },
  { id: 4, settingName: "Currency", category: "Payroll", value: "BDT", lastUpdated: "1.01.2025", description: "Default currency for payroll processing" },
];

const sharedFields: FormModalField[] = [
  { name: "settingName", label: "Setting Name", type: "text", required: true, placeholder: "Enter setting name" },
  { name: "category", label: "Category", type: "select", required: true, options: [{ label: "Attendance", value: "attendance" }, { label: "Employment", value: "employment" }, { label: "Payroll", value: "payroll" }, { label: "Leave", value: "leave" }, { label: "General", value: "general" }] },
  { name: "value", label: "Value", type: "text", required: true, placeholder: "Enter setting value" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function SystemPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.settingName,
    item.category,
    item.value,
    item.lastUpdated,
    item.description,
    <TableActions key={item.id} id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="HRM System Setup"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "HRM System Setup", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add Setting" submitText="Add" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Setting" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
