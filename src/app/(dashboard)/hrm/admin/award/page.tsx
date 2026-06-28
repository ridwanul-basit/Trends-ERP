"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Award Name", "Award Date", "Description", "Action"];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Select Employee", value: "" }] },
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
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Award", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={[]} colSpan={HEADERS.length} isEmpty />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Award"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Award"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
