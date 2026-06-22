"use client";

import { Plus } from "lucide-react";
import { DataTable, TableActions } from "@/components/shared";

type SalarySectionProps = {
  title: string;
  colorClass: string;
  headers: any[];
  data: any[];
};

function SalarySection({ title, colorClass, headers, data }: SalarySectionProps) {
  return (
    <div className="rounded-xl  bg-white overflow-hidden flex flex-col h-full">
      {/* Header Area */}
      <div className="relative flex items-center justify-between px-5 py-4 border-b border-theme-border">
        {/* Left colored bar flush with the edge */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorClass}`} />
        <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
        <button className="flex h-7 w-7 items-center justify-center rounded bg-theme-primary text-white transition hover:opacity-90">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Table Area */}
      <div className="p-0 flex-1">
        <DataTable
          headers={headers}
          colSpan={headers.length}
          isEmpty={data.length === 0}
        >
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.keys(row).filter(k => k !== 'id').map((key) => (
                <td key={key} className="whitespace-nowrap px-5 py-3 text-slate-600">
                  {row[key]}
                </td>
              ))}
              <TableActions
                id={row.id || String(idx)}
                showView={false}
                showEdit={true}
                showDelete={true}
              />
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}

export default function SetSalaryPage() {
  const commonData = [
    { id: "1", name: "Richard Atkinson", type: "Non Taxable", title: "Transportation Allowance", amount: "7.00% (USD 1,050.00)" },
    { id: "2", name: "Richard Atkinson", type: "Non Taxable", title: "Transportation Allowance", amount: "7.00% (USD 1,050.00)" },
    { id: "3", name: "Richard Atkinson", type: "Non Taxable", title: "Transportation Allowance", amount: "7.00% (USD 1,050.00)" },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-xl font-medium text-slate-800">Employee Set Salary</h1>
        <p className="text-xs text-theme-primary mt-1">Dashboard &gt; Employee &gt; Employee Set Salary</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Employee Salary */}
        <SalarySection
          title="Employee Salary"
          colorClass="bg-amber-500"
          headers={[{ label: "PAYSLIP TYPE" }, { label: "SALARY" }, { label: "ACCOUNT" }, { label: <span className="block text-center">ACTION</span> }]}
          data={[
            { id: "1", payslipType: "Hourly Payslip", salary: "15000", account: "ROUND BANK" },
            { id: "2", payslipType: "Hourly Payslip", salary: "15000", account: "ROUND BANK" },
            { id: "3", payslipType: "Hourly Payslip", salary: "15000", account: "ROUND BANK" },
          ]}
        />

        {/* Allowance */}
        <SalarySection
          title="Allowance"
          colorClass="bg-amber-500"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "ALLOWANCE OPTION" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block text-center">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", opt: "Non Taxable", title: "Transportation", type: "Percentage", amount: "7.00% (USD 1,050.00)" },
            { id: "2", emp: "Richard Atkinson", opt: "Non Taxable", title: "Transportation", type: "Percentage", amount: "7.00% (USD 1,050.00)" },
            { id: "3", emp: "Richard Atkinson", opt: "Non Taxable", title: "Transportation", type: "Percentage", amount: "7.00% (USD 1,050.00)" },
          ]}
        />

        {/* Commission */}
        <SalarySection
          title="Commission"
          colorClass="bg-amber-500"
          headers={[{ label: "PAYSLIP TYPE" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block text-center">ACTION</span> }]}
          data={[
            { id: "1", payslip: "Hourly Payslip", title: "Base Salary Plus Commission", type: "Fixed", amount: "USD 3,500.00" },
            { id: "2", payslip: "Hourly Payslip", title: "Base Salary Plus Commission", type: "Fixed", amount: "USD 2,000.00" },
            { id: "3", payslip: "Hourly Payslip", title: "Base Salary Plus Commission", type: "Fixed", amount: "USD 3,500.00" },
          ]}
        />

        {/* Loan */}
        <SalarySection
          title="Loan"
          colorClass="bg-amber-500"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "LOAN OPTIONS" }, { label: "TITLE" }, { label: "TYPE" }, { label: "LOAN AMOUNT" }, { label: <span className="block text-center">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", opt: "Emergency Loan", title: "Emergency Loan", type: "Percentage", amount: "10.00% ($1500)" },
            { id: "2", emp: "Richard Atkinson", opt: "Housing Loan", title: "Housing Loan", type: "Fixed", amount: "USD 2,200.00" },
            { id: "3", emp: "Richard Atkinson", opt: "Emergency Loan", title: "Emergency Loan", type: "Percentage", amount: "USD 5,200.00" },
          ]}
        />

        {/* Saturation Deduction */}
        <SalarySection
          title="Saturation Deduction"
          colorClass="bg-amber-500"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "DEDUCTION OPTION" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block text-center">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", opt: "Social Security", title: "Social Security System", type: "Fixed", amount: "USD 1,000.00" },
            { id: "2", emp: "Richard Atkinson", opt: "Retirement", title: "Retirement Contributions", type: "Percentage", amount: "1.00% ($150)" },
            { id: "3", emp: "Richard Atkinson", opt: "Social Security", title: "Social Security System", type: "Fixed", amount: "USD 1,000.00" },
          ]}
        />

        {/* Other Payment */}
        <SalarySection
          title="Other Payment"
          colorClass="bg-amber-500"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block text-center">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", title: "Other Payment", type: "Fixed", amount: "USD 1,000.00" },
            { id: "2", emp: "Richard Atkinson", title: "Other Payment", type: "Fixed", amount: "USD 1,000.00" },
            { id: "3", emp: "Richard Atkinson", title: "Other Payment", type: "Fixed", amount: "USD 1,000.00" },
          ]}
        />

        {/* Overtime */}
        <div className="xl:col-span-2">
          <SalarySection
            title="Overtime"
            colorClass="bg-amber-500"
            headers={[{ label: "EMPLOYEE NAME" }, { label: "OVERTIME TITLE" }, { label: "NUMBER OF DAYS" }, { label: "HOURS" }, { label: "RATE" }, { label: <span className="block text-center">ACTION</span> }]}
            data={[
              { id: "1", emp: "Richard Atkinson", title: "Increased Workload", days: "5", hours: "2", rate: "USD 3.00" },
              { id: "2", emp: "Richard Atkinson", title: "Unexpected Situations", days: "1", hours: "94", rate: "USD 5.00" },
              { id: "3", emp: "Richard Atkinson", title: "Project Deadlines", days: "501", hours: "62", rate: "USD 75.00" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
