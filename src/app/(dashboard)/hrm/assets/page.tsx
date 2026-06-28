"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Name", "Users", "Purchase Date", "Supported Date", "Amount", "Description", "Action"];

const AVATARS = ["bg-blue-400", "bg-green-400", "bg-purple-400"];

const SAMPLE_DATA = [
  { id: 1, name: "Employee handbook", users: ["B", "S", "M"], purchaseDate: "23-12-2024", supportedDate: "25-12-2024", amount: "USD 10.000,00", description: "Employee handbook" },
  { id: 2, name: "Onboarding and orientation", users: ["B", "S", "M"], purchaseDate: "23-12-2024", supportedDate: "25-12-2024", amount: "USD 15.000,00", description: "Onboarding and orientation" },
  { id: 3, name: "Onboarding and orientation", users: ["B", "S", "M"], purchaseDate: "23-12-2024", supportedDate: "25-12-2024", amount: "USD 15.000,00", description: "Onboarding and orientation" },
];

const sharedFields: FormModalField[] = [
  { name: "name", label: "Asset Name", type: "text", required: true, placeholder: "Enter asset name" },
  { name: "users", label: "Users", type: "text", placeholder: "Enter assigned users" },
  { name: "purchaseDate", label: "Purchase Date", type: "date", required: true },
  { name: "supportedDate", label: "Supported Date", type: "date", required: true },
  { name: "amount", label: "Amount", type: "text", required: true, placeholder: "e.g. USD 10,000" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function AssetsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="mployee Assets Setup"
        breadcrumbs={[{ label: "HRM", href: "" }, { label: "Employee Assets Setup", href: "/hrm/assets" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3 font-medium text-slate-700">{item.name}</td>
            <td className="px-5 py-3">
              <div className="flex -space-x-1.5">
                {item.users.map((u, i) => (
                  <span key={i} className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white ${AVATARS[i % AVATARS.length]}`}>{u}</span>
                ))}
              </div>
            </td>
            <td className="px-5 py-3">{item.purchaseDate}</td>
            <td className="px-5 py-3">{item.supportedDate}</td>
            <td className="px-5 py-3 font-medium">{item.amount}</td>
            <td className="px-5 py-3">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <p className="text-xs text-slate-400 px-1">Showing 1 to 3 of 3 entries</p>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Assign Asset" submitText="Assign" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Asset" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
