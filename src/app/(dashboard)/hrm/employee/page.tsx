"use client";

import { useState, useMemo } from "react";
import { Users } from "lucide-react";
import { DataTable, PageToolbar, TableActions, Pagination } from "@/components/shared";

const MOCK_EMPLOYEES = Array.from({ length: 12 }).map((_, i) => ({
  id: `EMP${123456 + i}`,
  name: "Richard Atkinson",
  email: "keanu2006@gmail.com",
  branch: "India",
  department: "Telecommunications",
  designation: "Chartered",
  lineManager: "Chris Evans",
  supervisor: "Harry Brook"
}));

export default function EmployeeSetupPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    if (!search.trim()) return MOCK_EMPLOYEES;
    const q = search.toLowerCase();
    return MOCK_EMPLOYEES.filter(
      (e) => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
    );
  }, [search]);

  const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, lastPage);

  const paged = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, safePage, perPage]);

  const headers = [
    { label: "EMPLOYEE ID" },
    { label: "NAME" },
    { label: "EMAIL" },
    { label: "BRANCH" },
    { label: "DEPARTMENT" },
    { label: "DESIGNATION" },
    { label: "LINE MANAGER" },
    { label: "SUPERVISOR" },
    { label: <span className="block ">ACTION</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h1 className="text-xl font-medium text-slate-800">Manage-Employee</h1>
        <p className="text-xs text-theme-primary mt-1">Dashboard &gt; Employee</p>
      </div>

      <PageToolbar
        title=""
        description=""
        searchValue={search}
        searchPlaceholder="Search..."
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        perPage={perPage}
        onPerPageChange={(v) => {
          setPerPage(v);
          setCurrentPage(1);
        }}
      />

      <DataTable
        headers={headers}
        colSpan={9}
        isLoading={false}
        isEmpty={paged.length === 0}
        emptyIcon={Users}
        emptyMessage="No employees found"
      >
        {paged.map((emp) => (
          <tr key={emp.id}>
            <td className="whitespace-nowrap px-5 py-3">
              <span className="inline-flex rounded-md border border-theme-primary px-2 py-1 text-[10px] font-bold text-theme-primary">
                #{emp.id}
              </span>
            </td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.name}</td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.email}</td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.branch}</td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.department}</td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.designation}</td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.lineManager}</td>
            <td className="whitespace-nowrap px-5 py-3 text-slate-600">{emp.supervisor}</td>
            <TableActions
              id={emp.id}
              name={emp.name}
              showView={false}
              showEdit={true}
              showDelete={true}
            />
          </tr>
        ))}
      </DataTable>

      <Pagination
        currentPage={safePage}
        lastPage={lastPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
