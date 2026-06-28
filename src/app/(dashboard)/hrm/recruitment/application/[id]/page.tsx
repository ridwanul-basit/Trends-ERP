"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { PageToolbar, FormSectionHeader, StarRating, FormField } from "@/components/shared";

export default function JobApplicationDetailsPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Applied");
  const [skillsText, setSkillsText] = useState("");
  const [notesText, setNotesText] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillsText.trim()) {
      setSkills([...skills, skillsText.trim()]);
      setSkillsText("");
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (notesText.trim()) {
      setNotes([...notes, notesText.trim()]);
      setNotesText("");
    }
  };

  return (
    <div className="space-y-6">
      <PageToolbar
        title="Job Application Details"
        breadcrumbs={[
          { label: "HRM", href: "" },
          { label: "Recruitment Setup", href: "" },
          { label: "Job Application", href: "/hrm/recruitment/application" },
          { label: "Job Application Details", href: "#" },
        ]}
        hideControls
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side — Basic Details & Radio Status Selection */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm h-fit">
          <div className="flex justify-between items-center pr-4">
            <FormSectionHeader title="Basic Details" />
            <span className="inline-flex rounded bg-cyan-100 px-2 py-0.5 text-xs font-bold text-cyan-800">
              Active
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Applicant Profile Header */}
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Jamalia Deliomn"
                className="h-16 w-16 rounded-full object-cover border-2 border-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Jamalia Deliomn</span>
                <span className="text-xs text-slate-500">hevyyfeb@mailinator.com</span>
              </div>
            </div>

            {/* Stages Radio selection grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              {["Applied", "Phone Screen", "Interview", "Hired", "Rejected"].map((stage) => (
                <label key={stage} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="applicationStage"
                    value={stage}
                    checked={status === stage}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-4.5 w-4.5 rounded-full border-slate-300 text-theme-primary focus:ring-theme-primary/10 accent-theme-primary"
                  />
                  {stage}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side — Basic Information key-value detail list */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm h-fit">
          <div className="flex justify-between items-center pr-4">
            <FormSectionHeader title="Basic Information" />
            <button
              onClick={() => router.push("/hrm/recruitment/on-boarding")}
              className="rounded bg-theme-primary px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer"
            >
              — Add to Job OnBoard
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">Phone</span>
                <span className="font-semibold text-slate-750">+1 (597) 459-7496</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">Gender</span>
                <span className="font-semibold text-slate-750">Male</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">DOB</span>
                <span className="font-semibold text-slate-750">24-08-1975</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">Country</span>
                <span className="font-semibold text-slate-750">Minim eos vitae vol</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">State</span>
                <span className="font-semibold text-slate-750">Deserunt molestias n</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">Applied For</span>
                <span className="font-semibold text-slate-750">The Great Versatility of Jobs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">City</span>
                <span className="font-semibold text-slate-750">Voluptate et sit ver</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">Applied at</span>
                <span className="font-semibold text-slate-750">07-01-2024</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 items-center">
                <span className="font-bold text-slate-500">CV / Resume</span>
                <button className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-white hover:opacity-90 cursor-pointer">
                  <Download className="h-3 w-3" />
                </button>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-bold text-slate-500">Cover Letter</span>
                <span className="font-semibold text-slate-750">Culpa reprehenderit</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 items-center col-span-2">
                <span className="font-bold text-slate-500">Rating</span>
                <StarRating value={3.5} readOnly size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Block — Additional Details */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="flex justify-between items-center pr-4">
          <FormSectionHeader title="Additional Details" />
          <button
            onClick={() => router.push("/hrm/recruitment/on-boarding")}
            className="rounded bg-theme-primary px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer"
          >
            — Add to Job OnBoard
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Custom QA Section */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-1">
                <span className="text-xs font-bold text-slate-800">What Do You Consider to Be Your Weaknesses?</span>
                <p className="text-xs text-slate-500 font-medium">Temporibus officia a</p>
              </div>
            ))}
          </div>

          {/* Skills and Applicant Notes lists & actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-800">Skills</span>
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type here"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="flex-1 rounded-md border border-slate-250 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-theme-primary"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-theme-primary px-5 py-2 text-xs font-bold text-white hover:opacity-90 cursor-pointer"
                >
                  Add
                </button>
              </form>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span key={index} className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-650">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Applicant Notes */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-800">Applicant Notes</span>
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type here"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="flex-1 rounded-md border border-slate-250 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-theme-primary"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-theme-primary px-5 py-2 text-xs font-bold text-white hover:opacity-90 cursor-pointer"
                >
                  Add
                </button>
              </form>
              <div className="space-y-2">
                {notes.map((note, index) => (
                  <div key={index} className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-650 font-medium">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
