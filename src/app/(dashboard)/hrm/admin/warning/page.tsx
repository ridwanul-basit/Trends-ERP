"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Warning Date", "Subject", "Warning Type", "Description", "Action"];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Select Employee", value: "" }] },
  { name: "warningDate", label: "Warning Date", type: "date", required: true },
  { name: "subject", label: "Subject", type: "text", required: true, placeholder: "Enter subject" },
  { name: "warningType", label: "Warning Type", type: "select", required: true, options: [{ label: "Verbal", value: "verbal" }, { label: "Written", value: "written" }, { label: "Final", value: "final" }] },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function WarningPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Warning"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Warning", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={[]} colSpan={HEADERS.length} isEmpty />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Warning"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Warning"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
