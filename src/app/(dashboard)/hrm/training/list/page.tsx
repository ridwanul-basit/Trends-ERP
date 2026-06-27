"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const mockData = [
  { id: "1", branch: "India", trainingType: "Job Training", trainer: "Teresa", date: "21-07-2024", cost: "USD 5,000.00" },
  { id: "2", branch: "Canada", trainingType: "Management Training", trainer: "Anabel", date: "21-07-2024", cost: "USD 20,000.00" },
  { id: "3", branch: "Malaysia", trainingType: "Job Training", trainer: "Bianca", date: "21-07-2024", cost: "USD 5,000.00" },
  { id: "4", branch: "India", trainingType: "Job Training", trainer: "Teresa", date: "21-07-2024", cost: "USD 5,000.00" },
  { id: "5", branch: "India", trainingType: "Management Training", trainer: "Anabel", date: "21-07-2024", cost: "USD 5,000.00" },
  { id: "6", branch: "India", trainingType: "Management Training", trainer: "Bianca", date: "21-07-2024", cost: "USD 20,000.00" },
];

const sharedFields: FormModalField[] = [
  { name: "employee", label: "Employee", type: "select", required: true, placeholder: "Select Employee", options: [{ label: "Richard Atkinson", value: "richard" }, { label: "Sonya Sims", value: "sonya" }] },
  { name: "branch", label: "Branch", type: "select", required: true, placeholder: "Select Branch", options: [{ label: "India", value: "india" }, { label: "Canada", value: "canada" }, { label: "Malaysia", value: "malaysia" }] },
  { name: "trainerOption", label: "Trainer Option", type: "select", required: true, options: [{ label: "Internal", value: "internal" }, { label: "External", value: "external" }] },
  { name: "trainer", label: "Trainer", type: "select", required: true, options: [{ label: "Teresa", value: "teresa" }, { label: "Anabel", value: "anabel" }, { label: "Bianca", value: "bianca" }] },
  { name: "trainingType", label: "Training Types", type: "select", required: true, placeholder: "Select Goal Type", options: [{ label: "Job Training", value: "job" }, { label: "Management Training", value: "management" }] },
  { name: "trainingCost", label: "Training Cost", type: "text", required: true, placeholder: "Training Cost" },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Leave Reason", rows: 3 },
];

export default function TrainingListPage() {
  const router = useRouter();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });

  const headers = [
    { label: "BRANCH" },
    { label: "TRAINING TYPE" },
    { label: "TRAINER" },
    { label: "DATE" },
    { label: "COST" },
    { label: <span className="block">ACTION</span> },
  ];

  const handleCreate = (data: Record<string, any>) => {
    console.log("Create Training:", data);
    setCreateModal(false);
  };

  const handleEdit = (data: Record<string, any>) => {
    console.log("Update Training:", data);
    setEditModal({ isOpen: false, data: null });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Training"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Training Setup", href: "" },
          { label: "Training List", href: "/hrm/training/list" },
        ]}
        onAdd={() => setCreateModal(true)}
        showSearch
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockData.length === 0}>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.trainingType}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.trainer}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.date}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.cost}</td>
              <TableActions
                id={row.id}
                showView
                onView={() => router.push(`/hrm/training/list/${row.id}`)}
                showEdit
                onEdit={() => setEditModal({ isOpen: true, data: row })}
                showDelete
              />
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Create Training Modal */}
      <FormModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New Training"
        fields={sharedFields}
        onSubmit={handleCreate}
        submitText="Create"
        gridCols={2}
        maxWidth="max-w-2xl"
      />

      {/* Edit Training Modal — same fields, different title + submit text */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, data: null })}
        title="Edit Training"
        fields={sharedFields}
        onSubmit={handleEdit}
        submitText="Update"
        gridCols={2}
        maxWidth="max-w-2xl"
      />
    </div>
  );
}
