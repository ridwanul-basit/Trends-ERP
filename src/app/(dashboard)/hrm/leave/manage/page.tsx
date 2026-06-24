"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField, ActionModal } from "@/components/shared";

const mockLeaveData = [
  { id: "1", employee: "Sonya Sims", leaveType: "Casual Leave", appliedOn: "21-04-2025", startDate: "05-05-2025", endDate: "07-05-2025", totalDays: "3", reason: "Emergency medical procedure", status: "APPROVED" },
  { id: "2", employee: "Sonya Sims", leaveType: "Medical Leave", appliedOn: "21-04-2025", startDate: "05-05-2025", endDate: "07-05-2025", totalDays: "2", reason: "feeling not well", status: "APPROVED" },
  { id: "3", employee: "Sonya Sims", leaveType: "Casual Leave", appliedOn: "21-04-2025", startDate: "05-05-2025", endDate: "07-05-2025", totalDays: "4", reason: "My College Exam", status: "APPROVED" },
  { id: "4", employee: "Sonya Sims", leaveType: "Casual Leave", appliedOn: "21-04-2025", startDate: "05-05-2025", endDate: "07-05-2025", totalDays: "1", reason: "My Helth is not well", status: "REJECT" },
  { id: "5", employee: "Sonya Sims", leaveType: "Casual Leave", appliedOn: "21-04-2025", startDate: "05-05-2025", endDate: "07-05-2025", totalDays: "2", reason: "Officia quia autem s", status: "PENDING" },
  { id: "6", employee: "Sonya Sims", leaveType: "Casual Leave", appliedOn: "21-04-2025", startDate: "05-05-2025", endDate: "07-05-2025", totalDays: "5", reason: "Emergency medical procedure", status: "APPROVED" },
];

export default function ManageLeavePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionModalData, setActionModalData] = useState<{ isOpen: boolean; data: any }>({ isOpen: false, data: null });

  const headers = [
    { label: "EMPLOYEE" },
    { label: "LEAVE TYPE" },
    { label: "APPLIED ON" },
    { label: "START DATE" },
    { label: "END DATE" },
    { label: "TOTAL DAYS" },
    { label: "LEAVE REASON" },
    { label: "STATUS" },
    { label: <span className="block">ACTION</span> },
  ];

  const createFields: FormModalField[] = [
    { name: "employee", label: "Employee", type: "select", options: [{ label: "Sonya Sims", value: "sonya" }], required: true },
    { name: "leaveType", label: "Leave Type", type: "select", options: [{ label: "Casual Leave", value: "casual" }, { label: "Medical Leave", value: "medical" }], required: true },
    { name: "startDate", label: "Start Date", type: "date", required: true },
    { name: "endDate", label: "End Date", type: "date", required: true },
    { name: "reason", label: "Leave Reason", type: "textarea", placeholder: "Leave Reason", required: true },
    { name: "remark", label: "Remark", type: "textarea", placeholder: "Leave Reason", required: true },
  ];

  const handleCreateSubmit = (data: Record<string, any>) => {
    console.log("Create Leave:", data);
    setIsCreateModalOpen(false);
  };

  const handleActionClick = (row: any) => {
    setActionModalData({ isOpen: true, data: row });
  };

  const handleApprove = () => {
    console.log("Approved Leave ID:", actionModalData.data?.id);
    setActionModalData({ isOpen: false, data: null });
  };

  const handleReject = () => {
    console.log("Rejected Leave ID:", actionModalData.data?.id);
    setActionModalData({ isOpen: false, data: null });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-[#6FD943] text-white";
      case "REJECT":
        return "bg-[#FF3A6E] text-white";
      case "PENDING":
        return "bg-[#FFA21D] text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Manage Leave"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Manage Leave", href: "/hrm/leave/manage" },
        ]}
        onAdd={() => setIsCreateModalOpen(true)}
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <DataTable headers={headers} colSpan={headers.length} isEmpty={mockLeaveData.length === 0}>
          {mockLeaveData.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.employee}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.leaveType}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.appliedOn}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.startDate}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.endDate}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.totalDays}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">{row.reason}</td>
              <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusClass(row.status)}`}>
                  {row.status}
                </span>
              </td>
              <TableActions
                id={row.id}
                showPlay={true}
                onPlay={() => handleActionClick(row)}
                showEdit={true}
                showDelete={true}
              />
            </tr>
          ))}
        </DataTable>
      </div>

      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Leave"
        fields={createFields}
        onSubmit={handleCreateSubmit}
      />

      {actionModalData.data && (
        <ActionModal
          isOpen={actionModalData.isOpen}
          onClose={() => setActionModalData({ isOpen: false, data: null })}
          title="Leave Action"
          data={[
            { label: "Employee", value: actionModalData.data.employee },
            { label: "Leave Type", value: actionModalData.data.leaveType },
            { label: "Applied On", value: actionModalData.data.appliedOn },
            { label: "Start Date", value: actionModalData.data.startDate },
            { label: "End Date", value: actionModalData.data.endDate },
            { label: "Leave Reason", value: actionModalData.data.reason },
            { label: "Status", value: actionModalData.data.status },
          ]}
          actions={[
            { label: "Approval", onClick: handleApprove, colorClass: "bg-[#6FD943]" },
            { label: "Reject", onClick: handleReject, colorClass: "bg-[#FF3A6E]" },
          ]}
        />
      )}
    </div>
  );
}
