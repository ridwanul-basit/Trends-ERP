"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Title", "Announcement Date", "Department", "Description", "Action"];

const sharedFields: FormModalField[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter announcement title" },
  { name: "announcementDate", label: "Announcement Date", type: "date", required: true },
  { name: "department", label: "Department", type: "select", required: true, options: [{ label: "All", value: "all" }, { label: "Financials", value: "financials" }, { label: "Health Care", value: "health-care" }, { label: "Engineering", value: "engineering" }] },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter announcement details..." },
];

export default function AnnouncementPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Announcement"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Announcement", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={[]} colSpan={HEADERS.length} isEmpty />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Announcement"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Announcement"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
