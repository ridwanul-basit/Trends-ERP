"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

const mockOnboardings = [
  { id: "1", name: "Jessie", job: "Highly Competitive Fashion Jobs", branch: "China", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
  { id: "2", name: "Candice", job: "The Great Versatility of Business Jobs", branch: "-", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
  { id: "3", name: "kjh", job: "Highly Competitive Fashion Jobs", branch: "China", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Pending" },
  { id: "4", name: "Jessie", job: "Highly Competitive Fashion Jobs", branch: "-", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
  { id: "5", name: "Jessie", job: "The Great Versatility of Business Jobs", branch: "-", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Cancel" },
  { id: "6", name: "Jessie", job: "Highly Competitive Fashion Jobs", branch: "China", appliedAt: "21-07-2021", joinedAt: "21-07-2024", status: "Confirm" },
];

export default function OnBoardingPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [list, setList] = useState(mockOnboardings);

  const headers = [
    { label: "NAME" },
    { label: "JOB" },
    { label: "BRANCH" },
    { label: "APPLIED AT" },
    { label: "JOINED AT" },
    { label: "STATUS" },
    { label: <span className="block">ACTION</span> },
  ];

  const handleCreateSubmit = (data: Record<string, any>) => {
    console.log("Create Job OnBoard:", data);
    const newOnboard = {
      id: String(list.length + 1),
      name: "Jessie",
      job: "The Great Versatility of Business Jobs",
      branch: "China",
      appliedAt: "21-07-2021",
      joinedAt: data.joiningDate || "21-07-2024",
      status: "Pending",
    };
    setList([newOnboard, ...list]);
    setIsCreateModalOpen(false);
  };

  const createFields: FormModalField[] = [
    {
      name: "interviewer",
      label: "Interviewer",
      type: "select",
      required: true,
      options: [{ label: "Teresa", value: "teresa" }, { label: "Anabel", value: "anabel" }],
    },
    { name: "joiningDate", label: "Joining Date", type: "date", required: true },
    { name: "daysOfWeek", label: "Days Of Week", type: "text", required: true, placeholder: "Days Of Week" },
    { name: "salary", label: "Salary", type: "text", required: true, placeholder: "Salary" },
    {
      name: "salaryType",
      label: "Salary Type",
      type: "select",
      required: true,
      options: [{ label: "Hourly Payslip", value: "hourly" }, { label: "Monthly Payslip", value: "monthly" }],
    },
    {
      name: "salaryDuration",
      label: "Salary Duration",
      type: "select",
      required: true,
      options: [{ label: "Monthly", value: "monthly" }, { label: "Weekly", value: "weekly" }],
    },
    {
      name: "jobType",
      label: "Job Type",
      type: "select",
      required: true,
      options: [{ label: "Full Time", value: "full" }, { label: "Part Time", value: "part" }],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }],
    },
  ];

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Job On-boarding"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Job On-boarding", href: "/hrm/recruitment/on-boarding" },
        ]}
        onAdd={() => setIsCreateModalOpen(true)}
        showSearch
      />

      <div className="rounded-xl  bg-white overflow-hidden ">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={list.length === 0}>
          {list.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600 font-semibold">{row.name}</td>
              <td className="px-5 py-3 text-slate-600 font-medium max-w-xs truncate">{row.job}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.branch}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.appliedAt}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.joinedAt}</td>
              <td className="whitespace-nowrap px-5 py-3">
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-xs font-bold text-white shadow-sm ${row.status === "Confirm"
                      ? "bg-green-500"
                      : row.status === "Pending"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                >
                  {row.status}
                </span>
              </td>
              <TableActions
                id={row.id}
                showView={false}
                showEdit
                onEdit={() => console.log("Edit onboarding:", row.id)}
                showDelete
                onDelete={() => console.log("Delete onboarding:", row.id)}
              >
                {row.status !== "Pending" && row.status !== "Cancel" && (
                  <>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-white hover:opacity-90 transition cursor-pointer"
                      title="View Details"
                    >
                      <Download className="h-3.5 w-3.5 rotate-180" />
                    </button>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded bg-green-500 text-white hover:opacity-90 transition cursor-pointer"
                      title="Download Offer Letter"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded bg-green-600 text-white hover:opacity-90 transition cursor-pointer"
                      title="View Document"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </TableActions>
            </tr>
          ))}
        </DataTable>
      </div>

      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Job OnBoard"
        fields={createFields}
        onSubmit={handleCreateSubmit}
        submitText="Create"
        gridCols={2}
        maxWidth="max-w-2xl"
      />
    </div>
  );
}
