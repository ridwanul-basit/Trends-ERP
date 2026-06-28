"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Meeting Title", "Meeting Date", "Time", "Location", "Participants", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, meetingTitle: "Sprint Planning", meetingDate: "3.03.2025", time: "10:00 AM", location: "Room A", participants: "Dev Team", description: "Q2 sprint planning session" },
  { id: 2, meetingTitle: "Board Review", meetingDate: "10.03.2025", time: "2:00 PM", location: "Boardroom", participants: "Management", description: "Quarterly board review meeting" },
  { id: 3, meetingTitle: "HR Policy Review", meetingDate: "15.03.2025", time: "11:00 AM", location: "HR Office", participants: "HR Department", description: "Review and update HR policies for 2025" },
  { id: 4, meetingTitle: "Client Onboarding", meetingDate: "20.03.2025", time: "9:00 AM", location: "Conference Room B", participants: "Sales Team", description: "New client onboarding walkthrough" },
];

const sharedFields: FormModalField[] = [
  { name: "meetingTitle", label: "Meeting Title", type: "text", required: true, placeholder: "Enter meeting title" },
  { name: "meetingDate", label: "Meeting Date", type: "date", required: true },
  { name: "time", label: "Time", type: "text", required: true, placeholder: "e.g. 10:00 AM" },
  { name: "location", label: "Location", type: "text", required: true, placeholder: "Enter location" },
  { name: "participants", label: "Participants", type: "text", placeholder: "Enter participants" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter meeting description..." },
];

export default function MeetingPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Meeting"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Meeting", href: "/hrm/meeting" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.meetingTitle}</td>
            <td className="px-5 py-3">{item.meetingDate}</td>
            <td className="px-5 py-3">{item.time}</td>
            <td className="px-5 py-3">{item.location}</td>
            <td className="px-5 py-3">{item.participants}</td>
            <td className="px-5 py-3">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Meeting" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Meeting" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
