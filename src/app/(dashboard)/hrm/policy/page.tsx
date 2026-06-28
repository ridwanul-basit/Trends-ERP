"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const HEADERS = ["Policy Title", "Department", "Effective Date", "Version", "Description", "Action"];

const SAMPLE_DATA = [
  { id: 1, policyTitle: "Code of Conduct", department: "All", effectiveDate: "1.01.2025", version: "v2.1", description: "Standards of behaviour expected from all employees" },
  { id: 2, policyTitle: "Leave Policy", department: "All", effectiveDate: "1.01.2025", version: "v3.0", description: "Rules and entitlements for employee leave" },
  { id: 3, policyTitle: "Remote Work Policy", department: "Engineering", effectiveDate: "1.03.2025", version: "v1.2", description: "Guidelines for working remotely and hybrid schedules" },
  { id: 4, policyTitle: "Anti-Harassment Policy", department: "All", effectiveDate: "1.01.2025", version: "v1.5", description: "Zero-tolerance policy for harassment in the workplace" },
];

const sharedFields: FormModalField[] = [
  { name: "policyTitle", label: "Policy Title", type: "text", required: true, placeholder: "Enter policy title" },
  { name: "department", label: "Department", type: "select", required: true, options: [{ label: "All", value: "all" }, { label: "HR", value: "hr" }, { label: "Engineering", value: "engineering" }, { label: "Sales", value: "sales" }, { label: "Financials", value: "financials" }] },
  { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
  { name: "version", label: "Version", type: "text", placeholder: "e.g. v1.0" },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter policy description..." },
];

export default function PolicyPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Company Policy"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Company Policy", href: "/hrm/policy" }]}
        onAdd={() => setIsCreateOpen(true)}
      />
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {SAMPLE_DATA.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.policyTitle}</td>
            <td className="px-5 py-3">{item.department}</td>
            <td className="px-5 py-3">{item.effectiveDate}</td>
            <td className="px-5 py-3">{item.version}</td>
            <td className="px-5 py-3">{item.description}</td>
            <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
          </tr>
        ))}
      </DataTable>
      <FormModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add Policy" submitText="Add" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }} />
      <FormModal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Policy" submitText="Update" fields={sharedFields} gridCols={2} maxWidth="max-w-2xl" onSubmit={(data) => { console.log("update", data); setEditItem(null); }} />
    </div>
  );
}
