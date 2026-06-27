"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Bold, Italic, Underline, Strikethrough, List, AlignLeft, Link, RotateCcw, RotateCw } from "lucide-react";
import { PageToolbar, FormSectionHeader, FormField, FormModal, FormModalField } from "@/components/shared";

export default function JobCreatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-500">Loading...</div>}>
      <JobCreateInner />
    </Suspense>
  );
}

function JobCreateInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("all");
  const [skill, setSkill] = useState("Sales, Management, Marketing");
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("");
  const [positions, setPositions] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");

  // Need to ask checkboxes
  const [askGender, setAskGender] = useState(true);
  const [askDob, setAskDob] = useState(false);
  const [askCountry, setAskCountry] = useState(false);

  // Need to show options checkboxes
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showResume, setShowResume] = useState(true);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showTnc, setShowTnc] = useState(false);

  // Custom questions checkboxes
  const [qWeakness, setQWeakness] = useState(true);
  const [qWhyJob, setQWhyJob] = useState(false);
  const [qWhyCompany, setQWhyCompany] = useState(false);

  // AI Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setTitle("The Great Versatility of Business Jobs");
      setBranch("india");
      setSkill("Sales, Management, Marketing");
      setStatus("active");
      setCategory("management");
      setPositions("5");
      setStartDate("2024-02-28");
      setEndDate("2025-01-28");
      setDescription("Standard job description detailing business growth and management.");
      setRequirement("At least 3 years experience in management and sales.");
    }
  }, [isEdit]);

  const handleSave = () => {
    console.log("Saving job:", {
      title, branch, skill, status, category, positions, startDate, endDate, description, requirement,
      questions: { askGender, askDob, askCountry },
      options: { showProfileImage, showResume, showCoverLetter, showTnc },
      customQuestions: { qWeakness, qWhyJob, qWhyCompany }
    });
    router.push("/hrm/recruitment/jobs");
  };

  const handleAiModalSubmit = (data: Record<string, any>) => {
    console.log("AI Generation options:", data);
    setDescription("Generated Description based on input parameters. Perfect for sales role requiring management skill.");
    setRequirement("Generated Requirement based on input parameters. Expected to lead a team of professionals.");
    setIsAiModalOpen(false);
  };

  const aiFields: FormModalField[] = [
    {
      name: "forWhat",
      label: "For what",
      type: "select",
      required: true,
      options: [
        { label: "Title", value: "title" },
        { label: "Description", value: "description" },
        { label: "Requirement", value: "requirement" },
      ],
    },
    {
      name: "language",
      label: "Language",
      type: "select",
      required: true,
      options: [{ label: "EN", value: "en" }],
    },
    {
      name: "creativity",
      label: "AI Creativity",
      type: "select",
      required: true,
      options: [{ label: "High", value: "high" }, { label: "Medium", value: "medium" }],
    },
    {
      name: "numResults",
      label: "Number of Result",
      type: "select",
      required: true,
      options: [{ label: "10", value: "10" }, { label: "5", value: "5" }],
    },
    {
      name: "maxLength",
      label: "Maximum Result Length",
      type: "select",
      required: true,
      options: [{ label: "10", value: "10" }, { label: "20", value: "20" }],
    },
    { name: "workplace", label: "Work Place", type: "text", placeholder: "e.g. IT Company, Hospital" },
    { name: "field", label: "Field", type: "text", placeholder: "e.g. Backend" },
    { name: "positions", label: "Positions", type: "text", placeholder: "e.g. Developer, Tester" },
  ];

  return (
    <div className="space-y-6">
      <PageToolbar
        title={isEdit ? "Edit Job" : "Create Job"}
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Jobs", href: "/hrm/recruitment/jobs" },
          { label: isEdit ? "Job Edit" : "Job Create", href: "#" },
        ]}
        hideControls
      />

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="flex justify-between items-center bg-slate-50/50 pr-4">
          <FormSectionHeader title="Job Details" />
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-theme-primary px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Generate with AI
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField label="Job Title" type="text" name="title" placeholder="Enter Job Title" required value={title} onChange={setTitle} />
            <FormField label="Branch" type="select" name="branch" options={[{ label: "All", value: "all" }, { label: "India", value: "india" }, { label: "Greece", value: "greece" }]} value={branch} onChange={setBranch} />
            <FormField label="Skill" type="text" name="skill" placeholder="e.g. Sales, Marketing" required value={skill} onChange={setSkill} />
            <FormField label="Status" type="select" name="status" options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }]} value={status} onChange={setStatus} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField label="Job Category" type="select" name="category" options={[{ label: "Manager", value: "management" }, { label: "Technical", value: "tech" }, { label: "Sales", value: "sales" }]} placeholder="Select Category" required value={category} onChange={setCategory} />
            <FormField label="Positions" type="text" name="positions" placeholder="Enter Positions" required value={positions} onChange={setPositions} />
            <FormField label="Start Date" type="date" name="startDate" required value={startDate} onChange={setStartDate} />
            <FormField label="End Date" type="date" name="endDate" required value={endDate} onChange={setEndDate} />
          </div>

          {/* Rich Text Editor Simulated Fields Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700">Job Description</label>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-1 bg-slate-50 border-b border-slate-200 px-3 py-1.5 text-slate-500">
                  <Bold className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Italic className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Underline className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Strikethrough className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <List className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <AlignLeft className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Link className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <RotateCcw className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <RotateCw className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                </div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write here..." rows={6} className="w-full bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none resize-none" />
              </div>
            </div>

            {/* Job Requirement */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Job Requirement<span className="text-red-500">*</span></label>
                <button onClick={() => setIsAiModalOpen(true)} className="flex items-center gap-1 text-[10px] font-bold text-theme-primary hover:underline">
                  <Sparkles className="h-3 w-3" /> Grammar check with AI
                </button>
              </div>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-1 bg-slate-50 border-b border-slate-200 px-3 py-1.5 text-slate-500">
                  <Bold className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Italic className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Underline className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Strikethrough className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <List className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <AlignLeft className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <Link className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <RotateCcw className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                  <RotateCw className="h-3.5 w-3.5 cursor-pointer hover:text-slate-800" />
                </div>
                <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="Write here..." rows={6} className="w-full bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none resize-none" />
              </div>
            </div>
          </div>

          {/* Bottom Checkbox Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800">Need to ask ?</h4>
              <div className="space-y-2">
                {[{ label: "Gender", state: askGender, set: setAskGender }, { label: "Date Of Birth", state: askDob, set: setAskDob }, { label: "Country", state: askCountry, set: setAskCountry }].map(({ label, state, set }) => (
                  <label key={label} className="flex items-center gap-2 text-xs font-medium text-slate-650 cursor-pointer">
                    <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-theme-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800">Need to show option ?</h4>
              <div className="space-y-2">
                {[{ label: "Profile Image", state: showProfileImage, set: setShowProfileImage }, { label: "Resume", state: showResume, set: setShowResume }, { label: "Cover Letter", state: showCoverLetter, set: setShowCoverLetter }, { label: "Terms And Conditions", state: showTnc, set: setShowTnc }].map(({ label, state, set }) => (
                  <label key={label} className="flex items-center gap-2 text-xs font-medium text-slate-650 cursor-pointer">
                    <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-theme-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800">Custom Question</h4>
              <div className="space-y-2">
                {[{ label: "What Do You Consider to Be Your Weaknesses?", state: qWeakness, set: setQWeakness }, { label: "Why Do You Want This Job?", state: qWhyJob, set: setQWhyJob }, { label: "Why Do You Want to Work at This Company?", state: qWhyCompany, set: setQWhyCompany }].map(({ label, state, set }) => (
                  <label key={label} className="flex items-start gap-2 text-xs font-medium text-slate-650 cursor-pointer">
                    <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 mt-0.5 accent-theme-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button onClick={() => router.push("/hrm/recruitment/jobs")} className="rounded-lg bg-amber-500 px-6 py-2 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} className="rounded-lg bg-theme-primary px-6 py-2 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer">
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>

      {/* AI Content Generation Helper Modal */}
      <FormModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="Generate with AI"
        submitText="Generate"
        onSubmit={handleAiModalSubmit}
        gridCols={2}
        maxWidth="max-w-2xl"
        fields={aiFields}
      />
    </div>
  );
}

