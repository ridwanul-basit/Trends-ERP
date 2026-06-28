"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";
import { cn } from "@/lib/utils/cn";

const TABS = [
  "Branch", "Department", "Designation", "Leave Type", "Document Type",
  "Payslip Type", "Allowance Option", "Loan Option", "Deduction",
  "Goal Type", "Training Type", "Award Type", "Termination"
];

const DUMMY_DATA: Record<string, any[]> = {
  "Branch": [{ id: 1, name: "China" }, { id: 2, name: "India" }, { id: 3, name: "China" }, { id: 4, name: "India" }, { id: 5, name: "China" }, { id: 6, name: "India" }],
  "Department": [{ id: 1, name: "HR" }, { id: 2, name: "IT" }, { id: 3, name: "Sales" }, { id: 4, name: "Marketing" }],
  "Designation": [{ id: 1, name: "Manager" }, { id: 2, name: "Developer" }, { id: 3, name: "Designer" }, { id: 4, name: "Analyst" }],
  "Leave Type": [{ id: 1, name: "Casual Leave" }, { id: 2, name: "Medical Leave" }, { id: 3, name: "Annual Leave" }],
};

export default function SystemPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const currentData = DUMMY_DATA[activeTab] || [
    { id: 1, name: `Sample ${activeTab} 1` },
    { id: 2, name: `Sample ${activeTab} 2` },
    { id: 3, name: `Sample ${activeTab} 3` },
  ];

  const headers = [activeTab, "Action"];

  const fields: FormModalField[] = [
    { name: "name", label: `${activeTab} Name`, type: "text", required: true, placeholder: `Enter ${activeTab.toLowerCase()} name` }
  ];

  return (
    <div className="space-y-4">
      <PageToolbar
        title={`Manage ${activeTab}`}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: activeTab, href: "/hrm/system" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      {/* Tabs */}
      <div className="flex overflow-x-auto rounded-lg bg-white shadow-sm sidebar-scrollbar-hidden border border-slate-200">
        {TABS.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 text-[13px] font-medium transition-colors border-r border-slate-200 last:border-r-0",
              activeTab === tab
                ? "bg-[#1ccab8] text-white"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length}>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td className="px-5 py-3 font-medium text-slate-700">{item.name}</td>
              <TableActions id={item.id} showEdit showDelete onEdit={() => setEditItem(item)} onDelete={() => console.log("delete", item.id)} />
            </tr>
          ))}
        </DataTable>
        <div className="px-5 pb-4">
          <p className="text-xs text-slate-400">Showing 1 to {currentData.length} of {currentData.length} entries</p>
        </div>
      </div>

      {/* Modals */}
      <FormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={`Create ${activeTab}`}
        submitText="Create"
        fields={fields}
        gridCols={1}
        maxWidth="max-w-md"
        onSubmit={(data) => { console.log("create", data); setIsCreateOpen(false); }}
      />
      <FormModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title={`Edit ${activeTab}`}
        submitText="Update"
        fields={fields}
        gridCols={1}
        maxWidth="max-w-md"
        onSubmit={(data) => { console.log("update", data); setEditItem(null); }}
      />
    </div>
  );
}
