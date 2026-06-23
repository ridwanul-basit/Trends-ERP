"use client";

import { PageToolbar, FormField, FormActions, FormSectionHeader } from "@/components/shared";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateEmployeePage() {
  const [formData, setFormData] = useState({
    // Personal Detail
    gender: "male",
    name: "",
    phone: "",
    dob: "",
    email: "",
    address: "",
    password: "",
    // Company Detail
    employeeId: "#EMP0000021",
    branch: "",
    department: "",
    designation: "",
    joiningDate: "",
    // Bank Account Detail
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    bankIdentifierCode: "",
    branchLocation: "",
    taxPayerId: "",
    // Document
    certificate: "",
    photo: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Submitting:", formData);
    toast.success("Employee created successfully (Mock)!");
  };

  return (
    <div className="flex h-full flex-col">
      <PageToolbar
        title="Create Employee"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employee", href: "/hrm/employee" },
          { label: "Create Employee" },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-4 sidebar-scrollbar-hidden">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* Personal Detail */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100">
                <FormSectionHeader title="Personal Detail" />
              </div>
              <div className="p-5 space-y-4">
                <FormField
                  label="Gender"
                  type="radio"
                  required
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  value={formData.gender}
                  onChange={(v) => handleChange("gender", v)}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Name"
                    required
                    placeholder="Enter employee name"
                    value={formData.name}
                    onChange={(v) => handleChange("name", v)}
                  />
                  <FormField
                    label="Phone"
                    required
                    placeholder="Enter Employee Phone"
                    helperText="Please use with country code. (ex. +91)"
                    value={formData.phone}
                    onChange={(v) => handleChange("phone", v)}
                  />
                  <FormField
                    label="Date of Birth"
                    type="date"
                    required
                    placeholder="dd-mm-yyyy"
                    value={formData.dob}
                    onChange={(v) => handleChange("dob", v)}
                  />
                  <FormField
                    label="Email"
                    type="email"
                    required
                    placeholder="Enter employee email"
                    value={formData.email}
                    onChange={(v) => handleChange("email", v)}
                  />
                  <FormField
                    label="Address"
                    required
                    placeholder="Enter employee address"
                    value={formData.address}
                    onChange={(v) => handleChange("address", v)}
                  />
                  <FormField
                    label="Password"
                    type="password"
                    required
                    placeholder="Enter employee new password"
                    value={formData.password}
                    onChange={(v) => handleChange("password", v)}
                  />
                </div>
              </div>
            </div>

            {/* Company Detail */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100">
                <FormSectionHeader title="Company Detail" />
              </div>
              <div className="p-5 space-y-4">
                <FormField
                  label="Employee ID"
                  required
                  value={formData.employeeId}
                  onChange={(v) => handleChange("employeeId", v)}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Select Branch"
                    type="select"
                    required
                    placeholder="Select Branch"
                    options={[
                      { label: "Head Office", value: "head_office" },
                      { label: "Branch 1", value: "branch_1" },
                    ]}
                    value={formData.branch}
                    onChange={(v) => handleChange("branch", v)}
                  />
                  <FormField
                    label="Select Department"
                    type="select"
                    required
                    placeholder="Select Department"
                    options={[
                      { label: "HR", value: "hr" },
                      { label: "IT", value: "it" },
                    ]}
                    value={formData.department}
                    onChange={(v) => handleChange("department", v)}
                  />
                  <FormField
                    label="Select Designation"
                    type="select"
                    required
                    placeholder="Select any Designation"
                    options={[
                      { label: "Manager", value: "manager" },
                      { label: "Developer", value: "developer" },
                    ]}
                    value={formData.designation}
                    onChange={(v) => handleChange("designation", v)}
                  />
                  <FormField
                    label="Company Date Of Joining"
                    type="date"
                    required
                    placeholder="dd-mm-yyyy"
                    value={formData.joiningDate}
                    onChange={(v) => handleChange("joiningDate", v)}
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Detail */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100">
                <FormSectionHeader title="Bank Account Detail" />
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Account Holder Name"
                    placeholder="Enter account holder name"
                    value={formData.accountHolderName}
                    onChange={(v) => handleChange("accountHolderName", v)}
                  />
                  <FormField
                    label="Account Number"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={(v) => handleChange("accountNumber", v)}
                  />
                  <FormField
                    label="Bank Name"
                    placeholder="Enter bank name"
                    value={formData.bankName}
                    onChange={(v) => handleChange("bankName", v)}
                  />
                  <FormField
                    label="Bank Identifier Code"
                    placeholder="Enter bank identifier code"
                    value={formData.bankIdentifierCode}
                    onChange={(v) => handleChange("bankIdentifierCode", v)}
                  />
                  <FormField
                    label="Branch Location"
                    placeholder="Enter branch location"
                    value={formData.branchLocation}
                    onChange={(v) => handleChange("branchLocation", v)}
                  />
                  <FormField
                    label="Tax Payer Id"
                    placeholder="Enter tax payer id"
                    value={formData.taxPayerId}
                    onChange={(v) => handleChange("taxPayerId", v)}
                  />
                </div>
              </div>
            </div>

            {/* Document */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100">
                <FormSectionHeader title="Document" />
              </div>
              <div className="p-5 space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <FormField
                      label="Certificate"
                      type="file"
                      required
                      placeholder="No file chosen"
                      value={formData.certificate}
                      onChange={(v) => handleChange("certificate", v)}
                    />
                  </div>
                  <div className="w-20 h-20 bg-slate-100 border border-slate-200 rounded overflow-hidden shrink-0 mt-5">
                    <img src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=200&auto=format&fit=crop" alt="Certificate Preview" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <FormField
                      label="Photo"
                      type="file"
                      placeholder="No file chosen"
                      value={formData.photo}
                      onChange={(v) => handleChange("photo", v)}
                    />
                  </div>
                  <div className="w-20 h-20 bg-slate-100 border border-slate-200 rounded overflow-hidden shrink-0 mt-5">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Photo Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2 pb-6">
            <FormActions
              onCancel={() => toast("Cancelled")}
              onSubmit={() => { }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}


import toast from "react-hot-toast";

export default function CreateEmployeePage() {
  const [formData, setFormData] = useState({
    // Personal Detail
    gender: "male",
    name: "",
    phone: "",
    dob: "",
    email: "",
    address: "",
    password: "",
    // Company Detail
    employeeId: "#EMP0000021",
    branch: "",
    department: "",
    designation: "",
    joiningDate: "",
    // Bank Account Detail
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    bankIdentifierCode: "",
    branchLocation: "",
    taxPayerId: "",
    // Document
    certificate: "",
    photo: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Submitting:", formData);
    toast.success("Employee created successfully (Mock)!");
  };

  return (
    <div className="flex h-full flex-col">
      <PageToolbar
        title="Create Employee"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employee", href: "/hrm/employee" },
          { label: "Create Employee" },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-4 sidebar-scrollbar-hidden">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* Personal Detail */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader title="Personal Detail" className="mb-6" />
              <div className="space-y-4">
                <FormField
                  label="Gender"
                  type="radio"
                  required
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  value={formData.gender}
                  onChange={(v) => handleChange("gender", v)}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Name"
                    required
                    placeholder="Enter employee name"
                    value={formData.name}
                    onChange={(v) => handleChange("name", v)}
                  />
                  <FormField
                    label="Phone"
                    required
                    placeholder="Enter Employee Phone"
                    helperText="Please use with country code. (ex. +91)"
                    value={formData.phone}
                    onChange={(v) => handleChange("phone", v)}
                  />
                  <FormField
                    label="Date of Birth"
                    type="date"
                    required
                    placeholder="dd-mm-yyyy"
                    value={formData.dob}
                    onChange={(v) => handleChange("dob", v)}
                  />
                  <FormField
                    label="Email"
                    type="email"
                    required
                    placeholder="Enter employee email"
                    value={formData.email}
                    onChange={(v) => handleChange("email", v)}
                  />
                  <FormField
                    label="Address"
                    required
                    placeholder="Enter employee address"
                    value={formData.address}
                    onChange={(v) => handleChange("address", v)}
                  />
                  <FormField
                    label="Password"
                    type="password"
                    required
                    placeholder="Enter employee new password"
                    value={formData.password}
                    onChange={(v) => handleChange("password", v)}
                  />
                </div>
              </div>
            </div>

            {/* Company Detail */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader title="Company Detail" className="mb-6" />
              <div className="space-y-4">
                <FormField
                  label="Employee ID"
                  required
                  value={formData.employeeId}
                  onChange={(v) => handleChange("employeeId", v)}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Select Branch"
                    type="select"
                    required
                    placeholder="Select Branch"
                    options={[
                      { label: "Head Office", value: "head_office" },
                      { label: "Branch 1", value: "branch_1" },
                    ]}
                    value={formData.branch}
                    onChange={(v) => handleChange("branch", v)}
                  />
                  <FormField
                    label="Select Department"
                    type="select"
                    required
                    placeholder="Select Department"
                    options={[
                      { label: "HR", value: "hr" },
                      { label: "IT", value: "it" },
                    ]}
                    value={formData.department}
                    onChange={(v) => handleChange("department", v)}
                  />
                  <FormField
                    label="Select Designation"
                    type="select"
                    required
                    placeholder="Select any Designation"
                    options={[
                      { label: "Manager", value: "manager" },
                      { label: "Developer", value: "developer" },
                    ]}
                    value={formData.designation}
                    onChange={(v) => handleChange("designation", v)}
                  />
                  <FormField
                    label="Company Date Of Joining"
                    type="date"
                    required
                    placeholder="dd-mm-yyyy"
                    value={formData.joiningDate}
                    onChange={(v) => handleChange("joiningDate", v)}
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Detail */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader title="Bank Account Detail" className="mb-6" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Account Holder Name"
                  placeholder="Enter account holder name"
                  value={formData.accountHolderName}
                  onChange={(v) => handleChange("accountHolderName", v)}
                />
                <FormField
                  label="Account Number"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(v) => handleChange("accountNumber", v)}
                />
                <FormField
                  label="Bank Name"
                  placeholder="Enter bank name"
                  value={formData.bankName}
                  onChange={(v) => handleChange("bankName", v)}
                />
                <FormField
                  label="Bank Identifier Code"
                  placeholder="Enter bank identifier code"
                  value={formData.bankIdentifierCode}
                  onChange={(v) => handleChange("bankIdentifierCode", v)}
                />
                <FormField
                  label="Branch Location"
                  placeholder="Enter branch location"
                  value={formData.branchLocation}
                  onChange={(v) => handleChange("branchLocation", v)}
                />
                <FormField
                  label="Tax Payer Id"
                  placeholder="Enter tax payer id"
                  value={formData.taxPayerId}
                  onChange={(v) => handleChange("taxPayerId", v)}
                />
              </div>
            </div>

            {/* Document */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader title="Document" className="mb-6" />
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <FormField
                      label="Certificate"
                      type="file"
                      required
                      placeholder="No file chosen"
                      value={formData.certificate}
                      onChange={(v) => handleChange("certificate", v)}
                      helperText={formData.certificate && "certificate.png"}
                    />
                  </div>
                  {/* Mock Image Preview */}
                  <div className="w-24 h-16 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-[8px] text-slate-400 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=200&auto=format&fit=crop" alt="Certificate Preview" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <FormField
                      label="Photo"
                      type="file"
                      placeholder="No file chosen"
                      value={formData.photo}
                      onChange={(v) => handleChange("photo", v)}
                      helperText={formData.photo && "employee.png"}
                    />
                  </div>
                  {/* Mock Image Preview */}
                  <div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-[8px] text-slate-400 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Photo Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2 pb-6">
            <FormActions
              onCancel={() => toast("Cancelled")}
              onSubmit={() => { }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
