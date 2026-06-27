"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const mockData = [
  { id: "1", branch: "China", fullName: "Teresa McRae", contact: "78787878", email: "t1@example.com" },
  { id: "2", branch: "India", fullName: "Anabel Lio", contact: "4578965895", email: "anabel@example.com" },
  { id: "3", branch: "China", fullName: "Bianca Lion", contact: "78787878", email: "Bianca@example.com" },
  { id: "4", branch: "Greece", fullName: "Dahlia Dwan", contact: "4578965895", email: "Dahlia@sdofs.com" },
  { id: "5", branch: "India", fullName: "Teresa McRae", contact: "4578965895", email: "t1@example.com" },
  { id: "6", branch: "China", fullName: "Teresa McRae", contact: "78787878", email: "t1@example.com" },
];

const trainerFields: FormModalField[] = [
  { name: "branch", label: "Branch", type: "select", required: true, options: [{ label: "China", value: "china" }, { label: "India", value: "india" }, { label: "Greece", value: "greece" }] },
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Enter full name" },
  { name: "contact", label: "Contact", type: "text", required: true, placeholder: "Enter contact number" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter email address" },
];

export default function TrainerPage() {
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });

  const headers = [
    { label: "BRANCH" },
    { label: "FULL NAME" },
    { label: "CONTACT" },
    { label: "EMAIL" },
    { label: <span className="block">ACTION</span> },
  ];

  const handleCreate = (data: Record<string, any>) => {
    console.log("Create Trainer:", data);
    setCreateModal(false);
  };

  const handleEdit = (data: Record<string, any>) => {
    console.log("Update Trainer:", data);
    setEditModal({ isOpen: false, data: null });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Trainer"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Training Setup", href: "" },
          { label: "Trainer", href: "/hrm/training/trainer" },
        ]}
        onAdd={() => setCreateModal(true)}
        showSearch
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockData.length === 0}>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.fullName}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.contact}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.email}</td>
              <TableActions
                id={row.id}
                showEdit
                onEdit={() => setEditModal({ isOpen: true, data: row })}
                showDelete
              />
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Create Trainer Modal */}
      <FormModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create Trainer"
        fields={trainerFields}
        onSubmit={handleCreate}
        submitText="Create"
        maxWidth="max-w-lg"
      />

      {/* Edit Trainer Modal — same fields, different title */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, data: null })}
        title="Edit Trainer"
        fields={trainerFields}
        onSubmit={handleEdit}
        submitText="Update"
        maxWidth="max-w-lg"
      />
    </div>
  );
}
