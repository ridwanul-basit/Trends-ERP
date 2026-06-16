"use client";

import {
  Users,
  BookOpen,
  Layers,
  Trophy,
  TrendingUp,
  Award,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/charts";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Participants",
      value: "45,820",
      change: "+12% this week",
      icon: Users,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Question Bank",
      value: "3,240",
      change: "180 added recently",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Active Rounds",
      value: "Selection Round",
      change: "Phase 2 in progress",
      icon: Layers,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "Top Score",
      value: "98.5 / 100",
      change: "Dhaka Division",
      icon: Trophy,
      color: "bg-rose-500/10 text-rose-600",
    },
  ];

  const recentParticipants = [
    { id: "P-8921", name: "Sajid Hasan", school: "Dhaka Residential Model College", score: 98.2, status: "Selected" },
    { id: "P-8922", name: "Afrina Rahman", school: "Viqarunnisa Noon School", score: 96.5, status: "Selected" },
    { id: "P-8923", name: "Tanvir Ahmed", school: "Rajshahi Collegiate School", score: 92.1, status: "Selected" },
    { id: "P-8924", name: "Nusrat Jahan", school: "Chittagong Collegiate School", score: 89.8, status: "Waiting" },
    { id: "P-8925", name: "Rashedul Karim", school: "Sylhet Govt. Pilot High School", score: 85.4, status: "Eliminated" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Welcome to Ispahani Banglabid
        </h1>
        <p className="text-xs text-slate-500">
          Contest overview and participant tracking board.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.title}
                </span>
                <span className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-xl font-bold text-slate-800">
                  {stat.value}
                </span>
                <p className="mt-1 text-[10px] text-slate-400 font-medium">
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Charts Section ──────────────────────────────────────── */}
      <DashboardCharts />

      {/* Dynamic content grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Participants Table Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-slate-100 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Recent Active Participants</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Top scorers in selection phase.</p>
            </div>
            <span className="text-xs font-bold text-brand-green hover:underline cursor-pointer">
              View All
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-table-header text-slate-500 font-semibold border-b border-slate-100">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">School / Institution</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentParticipants.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-500">{p.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-700">{p.name}</td>
                    <td className="px-5 py-3.5 text-slate-500 truncate max-w-[200px]">{p.school}</td>
                    <td className="px-5 py-3.5 text-center font-bold text-brand-green">{p.score}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${p.status === "Selected"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : p.status === "Waiting"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-rose-500/10 text-rose-600"
                          }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Info / Timeline */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Competition Timeline</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Upcoming milestones & schedule.</p>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-700">Online Audition</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Registration closes by July 15, 2026.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-700">Divisional Selections</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">August 1 – September 10, 2026.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-700">Grand Finale Broadcast</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Live airing scheduled for late October.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-50 pt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-brand-orange" />
              Grand Prize: 10 Lakh Taka
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-600">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
