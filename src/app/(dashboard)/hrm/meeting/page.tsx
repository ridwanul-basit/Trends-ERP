"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Meeting Title", "Meeting Date", "Meeting Time", "Action"];

const SAMPLE_DATA = [
  { id: 1, meetingTitle: "Event Related", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 2, meetingTitle: "New Technology", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 3, meetingTitle: "Meeting: Weekly Team Meeting", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 4, meetingTitle: "Sales Strategy Planning", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 5, meetingTitle: "Client Presentation", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 6, meetingTitle: "Marketing Campaign Review", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 7, meetingTitle: "Budget Planning", meetingDate: "21-01-2024", meetingTime: "00:00" },
  { id: 8, meetingTitle: "Weekly meeting", meetingDate: "21-01-2024", meetingTime: "00:00" },
];

const sharedFields: FormModalField[] = [
  { name: "meetingTitle", label: "Meeting Title", type: "text", required: true, placeholder: "Enter meeting title" },
  { name: "meetingDate", label: "Meeting Date", type: "date", required: true },
  { name: "meetingTime", label: "Meeting Time", type: "text", required: true, placeholder: "e.g. 10:00 AM" },
];

export default function MeetingPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Meeting"
        breadcrumbs={[{ label: "HRM", href: "" }, { label: "Meeting", href: "/hrm/meeting" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.meetingTitle}</td>
            <td className="px-5 py-3">{item.meetingDate}</td>
            <td className="px-5 py-3">{item.meetingTime}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <p className="text-xs text-slate-400 px-1">Showing 6 to 8 of 8 entries</p>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Meeting" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Meeting" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
