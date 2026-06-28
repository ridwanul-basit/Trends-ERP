"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Employee Name", "Designation", "Promotion Title", "Promotion Date", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, employeeName: "Buffy Walter", designation: "Manager", promotionTitle: "Financials", promotionDate: "1.03.2025", description: "Skills and career development" },
  { id: 2, employeeName: "Sonya Sims", designation: "Manager", promotionTitle: "Health Care", promotionDate: "1.03.2025", description: "Performance improvement" },
  { id: 3, employeeName: "Maia", designation: "Chartered", promotionTitle: "Financials", promotionDate: "1.03.2025", description: "Organizational needs" },
];

const sharedFields: FormModalField[] = [
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "designation", label: "Designation", type: "select", required: true, options: [{ label: "Manager", value: "manager" }, { label: "Chartered", value: "chartered" }] },
  { name: "promotionTitle", label: "Promotion Title", type: "text", required: true, placeholder: "Enter promotion title" },
  { name: "promotionDate", label: "Promotion Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
];

export default function PromotionPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Promotion"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Promotion", href: "/hrm/admin/promotion" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.employeeName}</td>
            <td className="px-5 py-3">{item.designation}</td>
            <td className="px-5 py-3">{item.promotionTitle}</td>
            <td className="px-5 py-3">{item.promotionDate}</td>
            <td className="px-5 py-3">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Promotion" submitText="Create" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Promotion" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
