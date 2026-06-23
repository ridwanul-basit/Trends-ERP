"use client";

import { Plus } from "lucide-react";
import { DataTable, TableActions, SectionHeader, PageToolbar } from "@/components/shared";

type SalarySectionProps = {
  title: string;
  colorClass?: string;
  headers: any[];
  data: any[];
};

function SalarySection({ title, colorClass = "bg-theme-section-highlight", headers, data }: SalarySectionProps) {
  return (
    <div className="rounded-xl  bg-white overflow-hidden flex flex-col h-full ">
      <SectionHeader title={title} colorClass={colorClass} />

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
      <PageToolbar
        title="Set Salary"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "HRM" },
          { label: "Payroll Setup" },
          { label: "Set Salary" },
        ]}
        hideControls
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Employee Salary */}
        <SalarySection
          title="Employee Salary"
          headers={[{ label: "PAYSLIP TYPE" }, { label: "SALARY" }, { label: "ACCOUNT" }, { label: <span className="block ">ACTION</span> }]}
          data={[
            { id: "1", payslipType: "Hourly Payslip", salary: "15000", account: "ROUND BANK" },
            { id: "2", payslipType: "Hourly Payslip", salary: "15000", account: "ROUND BANK" },
            { id: "3", payslipType: "Hourly Payslip", salary: "15000", account: "ROUND BANK" },
          ]}
        />

        {/* Allowance */}
        <SalarySection
          title="Allowance"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "ALLOWANCE OPTION" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block ">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", opt: "Non Taxable", title: "Transportation", type: "Percentage", amount: "7.00% (USD 1,050.00)" },
            { id: "2", emp: "Richard Atkinson", opt: "Non Taxable", title: "Transportation", type: "Percentage", amount: "7.00% (USD 1,050.00)" },
            { id: "3", emp: "Richard Atkinson", opt: "Non Taxable", title: "Transportation", type: "Percentage", amount: "7.00% (USD 1,050.00)" },
          ]}
        />

        {/* Commission */}
        <SalarySection
          title="Commission"
          headers={[{ label: "PAYSLIP TYPE" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block ">ACTION</span> }]}
          data={[
            { id: "1", payslip: "Hourly Payslip", title: "Base Salary Plus Commission", type: "Fixed", amount: "USD 3,500.00" },
            { id: "2", payslip: "Hourly Payslip", title: "Base Salary Plus Commission", type: "Fixed", amount: "USD 2,000.00" },
            { id: "3", payslip: "Hourly Payslip", title: "Base Salary Plus Commission", type: "Fixed", amount: "USD 3,500.00" },
          ]}
        />

        {/* Loan */}
        <SalarySection
          title="Loan"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "LOAN OPTIONS" }, { label: "TITLE" }, { label: "TYPE" }, { label: "LOAN AMOUNT" }, { label: <span className="block ">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", opt: "Emergency Loan", title: "Emergency Loan", type: "Percentage", amount: "10.00% ($1500)" },
            { id: "2", emp: "Richard Atkinson", opt: "Housing Loan", title: "Housing Loan", type: "Fixed", amount: "USD 2,200.00" },
            { id: "3", emp: "Richard Atkinson", opt: "Emergency Loan", title: "Emergency Loan", type: "Percentage", amount: "USD 5,200.00" },
          ]}
        />

        {/* Saturation Deduction */}
        <SalarySection
          title="Saturation Deduction"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "DEDUCTION OPTION" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block ">ACTION</span> }]}
          data={[
            { id: "1", emp: "Richard Atkinson", opt: "Social Security", title: "Social Security System", type: "Fixed", amount: "USD 1,000.00" },
            { id: "2", emp: "Richard Atkinson", opt: "Retirement", title: "Retirement Contributions", type: "Percentage", amount: "1.00% ($150)" },
            { id: "3", emp: "Richard Atkinson", opt: "Social Security", title: "Social Security System", type: "Fixed", amount: "USD 1,000.00" },
          ]}
        />

        {/* Other Payment */}
        <SalarySection
          title="Other Payment"
          headers={[{ label: "EMPLOYEE NAME" }, { label: "TITLE" }, { label: "TYPE" }, { label: "AMOUNT" }, { label: <span className="block ">ACTION</span> }]}
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
            headers={[{ label: "EMPLOYEE NAME" }, { label: "OVERTIME TITLE" }, { label: "NUMBER OF DAYS" }, { label: "HOURS" }, { label: "RATE" }, { label: <span className="block ">ACTION</span> }]}
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
