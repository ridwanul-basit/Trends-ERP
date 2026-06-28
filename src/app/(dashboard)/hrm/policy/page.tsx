"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Branch", "Title", "Description", "Attachment", "Action"];

const SAMPLE_DATA = [
  { id: 1, branch: "China", title: "Business Process", description: "Behavioural Competencies" },
  { id: 2, branch: "India", title: "Leadership", description: "Organizational Competencies" },
  { id: 3, branch: "Greece", title: "Leadership", description: "Organizational Competencies" },
];

const sharedFields: FormModalField[] = [
  { name: "branch", label: "Branch", type: "select", required: true, options: [{ label: "China", value: "china" }, { label: "India", value: "india" }, { label: "Greece", value: "greece" }, { label: "Japan", value: "japan" }] },
  { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter policy title" },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter description..." },
];

export default function PolicyPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Document"
        breadcrumbs={[{ label: "HRM", href: "" }, { label: "Document", href: "/hrm/policy" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3 font-medium text-slate-700">{item.branch}</td>
            <td className="px-5 py-3">{item.title}</td>
            <td className="px-5 py-3 text-slate-500">{item.description}</td>
            <td className="px-5 py-3">
              <div className="flex items-center gap-1">
                <button className="flex h-7 w-7 items-center justify-center rounded bg-green-500 text-white hover:opacity-90 cursor-pointer">
                  <Download className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded bg-blue-500 text-white hover:opacity-90 cursor-pointer">
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <p className="text-xs text-slate-400 px-1">Showing 1 to 2 of 2 entries</p>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add Policy" submitText="Add" fields={sharedFields} gridCols={2} maxWidth="max-w-xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Policy" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
