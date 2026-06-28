"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Name", "Document", "Roll", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, name: "All User", roll: "All", description: "Follow these step-by-step instructions to start a document in Microsoft Word." },
  { id: 2, name: "Employee Document", roll: "All", description: "Follow these step-by-step instructions to start a document in Microsoft Word." },
  { id: 3, name: "HR Document", roll: "All", description: "Follow these step-by-step instructions to start a document in Microsoft Word." },
];

const sharedFields: FormModalField[] = [
  { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter document name" },
  { name: "roll", label: "Roll", type: "select", required: true, options: [{ label: "All", value: "all" }, { label: "HR", value: "hr" }, { label: "Employee", value: "employee" }] },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter description..." },
];

export default function DocumentPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Document Setup"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Document", href: "/hrm/document" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3 font-medium text-slate-700">{item.name}</td>
            <td className="px-5 py-3">
              <button className="flex h-7 w-7 items-center justify-center rounded bg-red-500 text-white hover:opacity-90 cursor-pointer">
                <Download className="h-3.5 w-3.5" />
              </button>
            </td>
            <td className="px-5 py-3">{item.roll}</td>
            <td className="px-5 py-3 text-slate-500">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <p className="text-xs text-slate-400 px-1">Showing 1 to 3 of 3 entries</p>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add Document" submitText="Add" fields={sharedFields} gridCols={2} maxWidth="max-w-xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Document" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
