"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField, CompetencyRatings } from "@/components/shared";

const competencyGroups = [
  {
    groupTitle: "Behavioral Competencies",
    items: ["Business Process", "Oral Communication"],
  },
  {
    groupTitle: "Organizational Competencies",
    items: ["Leadership", "Project Management"],
  },
  {
    groupTitle: "Technical Competencies",
    items: ["Allocating Resources"],
  },
];

const mockData = [
  { id: "1", branch: "China", department: "Financials", designation: "Chartered", createdAt: "21-07-2024" },
  { id: "2", branch: "India", department: "Telecommunications", designation: "Chartered", createdAt: "04-09-2024" },
  { id: "3", branch: "Italy", department: "Financials", designation: "Chartered", createdAt: "04-09-2024" },
  { id: "4", branch: "Greece", department: "Telecommunications", designation: "Chartered", createdAt: "21-07-2024" },
  { id: "5", branch: "Malaysia", department: "Telecommunications", designation: "Chartered", createdAt: "31-07-2024" },
  { id: "6", branch: "Greece", department: "Financials", designation: "Chartered", createdAt: "04-09-2024" },
];

export default function IndicatorPage() {
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const headers = [
    { label: "BRANCH" },
    { label: "DEPARTMENT" },
    { label: "DESIGNATION" },
    { label: "CREATED AT" },
    { label: <span className="block">ACTION</span> },
  ];

  const editFields: FormModalField[] = [
    {
      name: "branch", label: "Branch", type: "select", required: true,
      options: [{ label: "China", value: "china" }, { label: "India", value: "india" }, { label: "Greece", value: "greece" }],
    },
    {
      name: "department", label: "Department", type: "select", required: true, placeholder: "Select Department",
      options: [{ label: "Financials", value: "financials" }, { label: "Telecommunications", value: "telecom" }],
    },
    {
      name: "designation", label: "Designation", type: "select", required: true, placeholder: "Select Designation",
      options: [{ label: "Chartered", value: "chartered" }, { label: "Manager", value: "manager" }],
    },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log("Indicator Update:", { ...data, ratings });
    setEditModal({ isOpen: false, data: null });
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Indicator"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Indicator", href: "/hrm/performance/indicator" }]}
        onAdd={() => setEditModal({ isOpen: true, data: {} })}
        showSearch
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockData.length === 0}>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.department}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.designation}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.createdAt}</td>
              <TableActions
                id={row.id}
                showView
                onView={() => setEditModal({ isOpen: true, data: row })}
                showEdit
                onEdit={() => setEditModal({ isOpen: true, data: row })}
                showDelete
              />
            </tr>
          ))}
        </DataTable>
      </div>

      {/* Edit Indicator Modal — uses FormModal with competency ratings as children */}
      <FormModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, data: null })}
        title="Edit Indicator"
        fields={editFields}
        onSubmit={handleSubmit}
        submitText="Update"
        maxWidth="max-w-lg"
      >
        <CompetencyRatings
          groups={competencyGroups}
          ratings={ratings}
          onChange={(key, val) => setRatings(prev => ({ ...prev, [key]: val }))}
        />
      </FormModal>
    </div>
  );
}
