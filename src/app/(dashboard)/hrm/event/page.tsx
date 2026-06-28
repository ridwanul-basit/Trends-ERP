"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Event Name", "Event Date", "Location", "Department", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, eventName: "Annual Company Gala", eventDate: "15.03.2025", location: "Grand Ballroom, Dhaka", department: "All", description: "Annual celebration of company achievements" },
  { id: 2, eventName: "Q1 Town Hall", eventDate: "5.04.2025", location: "Conference Room A", department: "All", description: "Quarterly business update for all employees" },
  { id: 3, eventName: "HR Workshop", eventDate: "20.04.2025", location: "Training Room 2", department: "HR", description: "Workshop on updated HR policies and procedures" },
  { id: 4, eventName: "Sales Kickoff 2025", eventDate: "1.05.2025", location: "Auditorium", department: "Sales", description: "Annual sales strategy and target setting event" },
];

const sharedFields: FormModalField[] = [
  { name: "eventName", label: "Event Name", type: "text", required: true, placeholder: "Enter event name" },
  { name: "eventDate", label: "Event Date", type: "date", required: true },
  { name: "location", label: "Location", type: "text", required: true, placeholder: "Enter event location" },
  { name: "department", label: "Department", type: "select", required: true, options: [{ label: "All", value: "all" }, { label: "HR", value: "hr" }, { label: "Sales", value: "sales" }, { label: "Financials", value: "financials" }, { label: "Engineering", value: "engineering" }] },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter event description..." },
];

export default function EventPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Event"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Event Setup", href: "/hrm/event" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.eventName}</td>
            <td className="px-5 py-3">{item.eventDate}</td>
            <td className="px-5 py-3">{item.location}</td>
            <td className="px-5 py-3">{item.department}</td>
            <td className="px-5 py-3">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Event" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Event" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
