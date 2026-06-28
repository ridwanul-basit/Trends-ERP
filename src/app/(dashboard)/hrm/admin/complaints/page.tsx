"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Complaint From", "Complaint Against", "Title", "Complaint Date", "Description", "Action"];


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

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Complaints"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Complaints", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={[]} colSpan={HEADERS.length} isEmpty />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Complaint"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Complaint"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
