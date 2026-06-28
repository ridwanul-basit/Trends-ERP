"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Asset Name", "Asset Type", "Assign Date", "Return Date", "Status", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", assetName: "MacBook Pro 14\"", assetType: "Laptop", assignDate: "1.01.2025", returnDate: "-", status: "Assigned" },
  { id: 2, employeeName: "Sonya Sims", assetName: "iPhone 15", assetType: "Mobile", assignDate: "1.01.2025", returnDate: "-", status: "Assigned" },
  { id: 3, employeeName: "Maia", assetName: "Dell Monitor 27\"", assetType: "Monitor", assignDate: "5.02.2025", returnDate: "-", status: "Assigned" },
  { id: 4, employeeName: "Maia", assetName: "Logitech MX Keys", assetType: "Keyboard", assignDate: "5.02.2025", returnDate: "1.03.2025", status: "Returned" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "assetName", label: "Asset Name", type: "text", required: true, placeholder: "Enter asset name" },
  { name: "assetType", label: "Asset Type", type: "select", required: true, options: [{ label: "Laptop", value: "laptop" }, { label: "Mobile", value: "mobile" }, { label: "Monitor", value: "monitor" }, { label: "Keyboard", value: "keyboard" }, { label: "Other", value: "other" }] },
  { name: "assignDate", label: "Assign Date", type: "date", required: true },
  { name: "returnDate", label: "Return Date", type: "date" },
  { name: "status", label: "Status", type: "select", required: true, options: [{ label: "Assigned", value: "assigned" }, { label: "Returned", value: "returned" }, { label: "Lost", value: "lost" }] },
];

export default function AssetsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Employee Asset Setup"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Employee Asset Setup", href: "/hrm/assets" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.employeeName}</td>
            <td className="px-5 py-3">{item.assetName}</td>
            <td className="px-5 py-3">{item.assetType}</td>
            <td className="px-5 py-3">{item.assignDate}</td>
            <td className="px-5 py-3">{item.returnDate}</td>
            <td className="px-5 py-3">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "Assigned" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                {item.status}
              </span>
            </td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Assign Asset" submitText="Assign" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Asset" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
