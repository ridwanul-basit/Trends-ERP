"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Title", "Announcement Date", "Department", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, title: "Annual Performance Review", announcementDate: "1.03.2025", department: "All", description: "Annual performance reviews will be conducted next month" },
  { id: 2, title: "New Leave Policy", announcementDate: "5.03.2025", department: "All", description: "Updated leave policy effective from April 2025" },
  { id: 3, title: "Team Offsite 2025", announcementDate: "10.03.2025", department: "Financials", description: "Annual team offsite event scheduled for May 2025" },
];

const sharedFields: FormModalField[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter announcement title" },
  { name: "announcementDate", label: "Announcement Date", type: "date", required: true },
  { name: "department", label: "Department", type: "select", required: true, options: [{ label: "All", value: "all" }, { label: "Financials", value: "financials" }, { label: "Health Care", value: "health-care" }, { label: "Engineering", value: "engineering" }] },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter announcement details..." },
];

export default function AnnouncementPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.title,
    item.announcementDate,
    item.department,
    item.description,
    <TableActions key={item.id} id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Announcement"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Announcement", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Announcement" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Announcement" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
