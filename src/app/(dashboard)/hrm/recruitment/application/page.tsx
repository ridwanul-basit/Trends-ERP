"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, RotateCcw, MoreVertical } from "lucide-react";
import { PageToolbar, FormField, FormSectionHeader, StarRating, FormModal } from "@/components/shared";

// Mock candidates
const initialCandidates = [
  { id: "1", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "2", name: "Jamalia Deliomn", rating: 4, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=33" },
  { id: "3", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=34" },
  { id: "4", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=35" },
  { id: "5", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=36" },
  { id: "6", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=37" },
  { id: "7", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=38" },
  { id: "8", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "applied", avatar: "https://i.pravatar.cc/150?img=39" },

  { id: "9", name: "Jamalia Deliomn", rating: 4, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "phone_screen", avatar: "https://i.pravatar.cc/150?img=40" },
  { id: "10", name: "Jamalia Deliomn", rating: 4, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "phone_screen", avatar: "https://i.pravatar.cc/150?img=41" },

  { id: "11", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "interview", avatar: "https://i.pravatar.cc/150?img=42" },

  { id: "12", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "rejected", avatar: "https://i.pravatar.cc/150?img=43" },

  { id: "13", name: "Jamalia Deliomn", rating: 3, job: "The Great Versatility of Business Jobs", date: "07-01-2024", status: "hired", avatar: "https://i.pravatar.cc/150?img=44" },
];

const stages = [
  { key: "applied", label: "Applied" },
  { key: "phone_screen", label: "Phone Screen" },
  { key: "interview", label: "Interview" },
  { key: "rejected", label: "Rejected" },
  { key: "hired", label: "Hired" },
];

export default function JobApplicationPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("applied");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [job, setJob] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [candidates, setCandidates] = useState(initialCandidates);

  const handleSearch = () => {
    console.log("Searching with filters:", { filterStatus, startDate, endDate, job });
  };

  const handleReset = () => {
    setFilterStatus("applied");
    setStartDate("");
    setEndDate("");
    setJob("");
  };

  const handleCreateSubmit = (data: Record<string, any>) => {
    console.log("New Applicant:", data);
    const newCand = {
      id: String(candidates.length + 1),
      name: data.name || "Unnamed Candidate",
      rating: 3,
      job: data.job === "se" ? "Software Engineer" : "The Great Versatility of Business Jobs",
      date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
      status: "applied",
      avatar: `https://i.pravatar.cc/150?img=${candidates.length + 20}`,
    };
    setCandidates([newCand, ...candidates]);
    setIsCreateModalOpen(false);
  };

  const createFields: FormModalField[] = [
    {
      name: "job",
      label: "Job",
      type: "select",
      required: true,
      options: [
        { label: "China", value: "china" },
        { label: "The Great Versatility of Business Jobs", value: "business" },
        { label: "Highly Competitive Fashion Jobs", value: "fashion" },
      ],
    },
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter Name" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter Email" },
    { name: "phone", label: "Phone", type: "text", required: true, placeholder: "Enter Phone" },
  ];

  return (
    <div className="space-y-6">
      <PageToolbar
        title="Manage Job Application"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Job Application", href: "/hrm/recruitment/application" },
        ]}
        onAdd={() => setIsCreateModalOpen(true)}
        hideControls={false}
      />

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <FormField
            label="Status"
            type="select"
            name="filterStatus"
            options={[
              { label: "Applied", value: "applied" },
              { label: "Phone Screen", value: "phone_screen" },
              { label: "Interview", value: "interview" },
              { label: "Rejected", value: "rejected" },
              { label: "Hired", value: "hired" },
            ]}
            value={filterStatus}
            onChange={setFilterStatus}
          />
          <FormField
            label="Start Date"
            type="date"
            name="startDate"
            value={startDate}
            onChange={setStartDate}
          />
          <FormField
            label="End Date"
            type="date"
            name="endDate"
            value={endDate}
            onChange={setEndDate}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <FormField
                label="Job"
                type="select"
                name="job"
                options={[
                  { label: "All Jobs", value: "all" },
                  { label: "Business Development Manager", value: "bdm" },
                  { label: "Software Engineer", value: "se" },
                ]}
                placeholder="Select Department"
                value={job}
                onChange={setJob}
              />
            </div>
            <div className="flex items-center gap-1.5 pb-0.5">
              <button
                onClick={handleSearch}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-theme-primary text-white hover:opacity-90 transition cursor-pointer"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={handleReset}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-650 hover:bg-slate-200 transition cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Boards / Stages */}
      <div className="space-y-8">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter((c) => c.status === stage.key);
          return (
            <div key={stage.key} className="space-y-4">
              {/* Header with count */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-white pr-6 rounded-lg overflow-hidden shadow-sm">
                <FormSectionHeader title={stage.label} />
                <span className="text-lg font-bold text-slate-800">{stageCandidates.length}</span>
              </div>

              {/* Candidates Grid */}
              {stageCandidates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stageCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col relative"
                    >
                      {/* Dropdown Options Button */}
                      <button className="absolute top-4 right-4 h-6 w-6 rounded-full bg-amber-450 flex items-center justify-center text-white hover:bg-amber-500 cursor-pointer">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>

                      {/* Header info */}
                      <div
                        onClick={() => router.push(`/hrm/recruitment/application/${candidate.id}`)}
                        className="flex gap-3 items-center cursor-pointer hover:opacity-80"
                      >
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="h-12 w-12 rounded-full object-cover border border-slate-100"
                        />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-theme-primary">{candidate.name}</span>
                          <StarRating value={candidate.rating} readOnly size="sm" />
                        </div>
                      </div>

                      {/* Job details */}
                      <div
                        onClick={() => router.push(`/hrm/recruitment/application/${candidate.id}`)}
                        className="mt-3 flex flex-col gap-1 cursor-pointer hover:opacity-80"
                      >
                        <span className="text-[10px] text-slate-500 font-medium leading-relaxed">
                          {candidate.job}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span className="font-semibold">📅</span>
                          <span>{candidate.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 py-6 text-center text-xs font-semibold text-slate-400 bg-slate-50/50">
                  No applicants in this stage.
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Job Application"
        fields={createFields}
        onSubmit={handleCreateSubmit}
        submitText="Create"
        maxWidth="max-w-lg"
      />
    </div>
  );
}
