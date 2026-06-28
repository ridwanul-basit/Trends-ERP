"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Holiday Name", "Holiday Date", "Day", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, holidayName: "New Year's Day", holidayDate: "1.01.2025", day: "Wednesday", description: "National public holiday" },
  { id: 2, holidayName: "Eid Al-Fitr", holidayDate: "31.03.2025", day: "Monday", description: "National public holiday" },
  { id: 3, holidayName: "Labour Day", holidayDate: "1.05.2025", day: "Thursday", description: "National public holiday" },
  { id: 4, holidayName: "Independence Day", holidayDate: "26.03.2025", day: "Wednesday", description: "National public holiday" },
];

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
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Holidays", href: "/hrm/admin/holidays" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.holidayName}</td>
            <td className="px-5 py-3">{item.holidayDate}</td>
            <td className="px-5 py-3">{item.day}</td>
            <td className="px-5 py-3">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Holiday" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Holiday" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
