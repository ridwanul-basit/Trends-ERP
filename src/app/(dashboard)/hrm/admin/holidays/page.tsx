"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Holiday Name", "Holiday Date", "Day", "Description", "Action"];

const sharedFields: FormModalField[] = [
  { name: "holidayName", label: "Holiday Name", type: "text", required: true, placeholder: "Enter holiday name" },
  { name: "holidayDate", label: "Holiday Date", type: "date", required: true },
  { name: "day", label: "Day", type: "select", required: true, options: [{ label: "Monday", value: "monday" }, { label: "Tuesday", value: "tuesday" }, { label: "Wednesday", value: "wednesday" }, { label: "Thursday", value: "thursday" }, { label: "Friday", value: "friday" }, { label: "Saturday", value: "saturday" }, { label: "Sunday", value: "sunday" }] },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function HolidaysPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Holidays"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Holidays", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={[]} colSpan={HEADERS.length} isEmpty />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Holiday"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Holiday"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
