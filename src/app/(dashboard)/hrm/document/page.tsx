"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Document Name", "Employee Name", "Document Type", "Issue Date", "Expiry Date", "Status", "Action"];

const SAMPLE_DATA = [
  { id: 1, documentName: "Employment Contract", employeeName: "Buffy Walter", documentType: "Contract", issueDate: "1.01.2024", expiryDate: "31.12.2025", status: "Active" },
  { id: 2, documentName: "NDA Agreement", employeeName: "Sonya Sims", documentType: "Legal", issueDate: "1.01.2024", expiryDate: "31.12.2026", status: "Active" },
  { id: 3, documentName: "Work Permit", employeeName: "Maia", documentType: "Permit", issueDate: "15.02.2024", expiryDate: "14.02.2025", status: "Expired" },
  { id: 4, documentName: "Confidentiality Agreement", employeeName: "Maia", documentType: "Legal", issueDate: "1.03.2024", expiryDate: "28.02.2027", status: "Active" },
];

const sharedFields: FormModalField[] = [
  { name: "documentName", label: "Document Name", type: "text", required: true, placeholder: "Enter document name" },
  { name: "employeeName", label: "Employee Name", type: "select", required: true, options: [{ label: "Buffy Walter", value: "buffy" }, { label: "Sonya Sims", value: "sonya" }, { label: "Maia", value: "maia" }] },
  { name: "documentType", label: "Document Type", type: "select", required: true, options: [{ label: "Contract", value: "contract" }, { label: "Legal", value: "legal" }, { label: "Permit", value: "permit" }, { label: "Certificate", value: "certificate" }, { label: "Other", value: "other" }] },
  { name: "issueDate", label: "Issue Date", type: "date", required: true },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "status", label: "Status", type: "select", required: true, options: [{ label: "Active", value: "active" }, { label: "Expired", value: "expired" }, { label: "Pending", value: "pending" }] },
];

export default function DocumentPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const rows = SAMPLE_DATA.map((item) => [
    item.documentName,
    item.employeeName,
    item.documentType,
    item.issueDate,
    item.expiryDate,
    <span key={`status-${item.id}`} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{item.status}</span>,
    <TableActions key={item.id} id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />,
  ]);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Document Setup"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Document Setup", href: "#" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} rows={rows} colSpan={HEADERS.length} />
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add Document" submitText="Add" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Document" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
