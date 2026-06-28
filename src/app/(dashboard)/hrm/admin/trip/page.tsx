"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Start Date", "End Date", "Purpose Of Trip", "Country", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", startDate: "1.03.2025", endDate: "1.04.2025", purposeOfTrip: "1.03.2025", country: "India", description: "Career advancement" },
  { id: 2, employeeName: "Sonya Sims", startDate: "1.03.2025", endDate: "1.04.2025", purposeOfTrip: "1.03.2025", country: "China", description: "Career advancement" },
  { id: 3, employeeName: "Maia", startDate: "1.03.2025", endDate: "1.04.2025", purposeOfTrip: "1.03.2025", country: "Dubai", description: "Relocation" },
  { id: 4, employeeName: "Maia", startDate: "1.03.2025", endDate: "1.04.2025", purposeOfTrip: "1.03.2025", country: "Japan", description: "Relocation" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date", required: true },
  { name: "purposeOfTrip", label: "Purpose Of Trip", type: "text", required: true, placeholder: "Enter trip purpose" },
  { name: "country", label: "Country", type: "select", required: true, options: [{ label: "India", value: "india" }, { label: "China", value: "china" }, { label: "Dubai", value: "dubai" }, { label: "Japan", value: "japan" }] },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function TripPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.employeeName,
    item.startDate,
    item.endDate,
    item.purposeOfTrip,
    item.country,
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
        title="Manage Trip"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Trip", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />

      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Trip"
        submitText="Create"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />

      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Trip"
        submitText="Update"
        fields={sharedFields}
        gridCols={2}
        maxWidth="max-w-2xl"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
