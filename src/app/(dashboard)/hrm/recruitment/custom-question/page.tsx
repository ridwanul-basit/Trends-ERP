"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const mockQuestions = [
  { id: "1", question: "What Do You Consider to Be Your Weaknesses?", isRequired: "Yes" },
  { id: "2", question: "Why Do You Want This Job?", isRequired: "Yes" },
  { id: "3", question: "Why Do You Want to Work at This Company?", isRequired: "No" },
  { id: "4", question: "Why Do You Want This Job?", isRequired: "Active" },
  { id: "5", question: "Why Do You Want to Work at This Company?", isRequired: "Active" },
  { id: "6", question: "What Do You Consider to Be Your Weaknesses?", isRequired: "No" },
];

export default function CustomQuestionPage() {
  const [list, setList] = useState(mockQuestions);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const headers = [
    { label: "QUESTION" },
    { label: "IS REQUIRED" },
    { label: <span className="block">ACTION</span> },
  ];

  const createFields: FormModalField[] = [
    { name: "question", label: "Question", type: "text", required: true, placeholder: "Enter Question" },
    {
      name: "isRequired",
      label: "Is Required",
      type: "select",
      required: true,
      options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }],
    },
  ];

  const handleCreateSubmit = (data: Record<string, any>) => {
    console.log("Create Custom Question:", data);
    const newQuestion = {
      id: String(list.length + 1),
      question: data.question || "New Custom Question?",
      isRequired: data.isRequired || "No",
    };
    setList([...list, newQuestion]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Custom Question for interview"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Custom Question", href: "/hrm/recruitment/custom-question" },
        ]}
        onAdd={() => setIsCreateModalOpen(true)}
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={list.length === 0}>
          {list.map((row) => (
            <tr key={row.id}>
              <td className="px-5 py-3 text-slate-600 font-semibold max-w-lg truncate">{row.question}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <span
                  className={`inline-flex rounded px-2.5 py-1 text-xs font-bold text-white shadow-sm ${
                    row.isRequired === "Yes" || row.isRequired === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {row.isRequired === "Active" ? "Active" : row.isRequired}
                </span>
              </td>
              <TableActions
                id={row.id}
                showView={false}
                showEdit
                onEdit={() => console.log("Edit question:", row.id)}
                showDelete
                onDelete={() => console.log("Delete question:", row.id)}
              />
            </tr>
          ))}
        </DataTable>
      </div>

      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Custom Question"
        fields={createFields}
        onSubmit={handleCreateSubmit}
        submitText="Create"
        maxWidth="max-w-lg"
      />
    </div>
  );
}
