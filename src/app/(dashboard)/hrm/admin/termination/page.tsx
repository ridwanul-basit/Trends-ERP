"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Termination Date", "Last Working Date", "Reason", "Notice Period", "Action"];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Select Employee", value: "" }] },
  { name: "terminationDate", label: "Termination Date", type: "date", required: true },
  { name: "lastWorkingDate", label: "Last Working Date", type: "date", required: true },
  { name: "noticePeriod", label: "Notice Period (days)", type: "text", placeholder: "e.g. 30" },
  { name: "reason", label: "Reason", type: "textarea", required: true, placeholder: "Enter reason for termination..." },
];

export default function TerminationPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Termination"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Termination", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={[]} colSpan={HEADERS.length} isEmpty />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Termination"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Termination"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
