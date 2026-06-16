"use client";

import {
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/charts";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$284,500",
      change: "+18% this month",
      icon: DollarSign,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Active Employees",
      value: "1,248",
      change: "32 new this quarter",
      icon: Users,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Inventory Items",
      value: "8,640",
      change: "124 low stock alerts",
      icon: Package,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "Pending Orders",
      value: "342",
      change: "28 urgent deliveries",
      icon: ShoppingCart,
      color: "bg-rose-500/10 text-rose-600",
    },
  ];

  const recentOrders = [
    { id: "ORD-4821", client: "Acme Corporation", department: "Procurement", amount: "$12,400", status: "Completed" },
    { id: "ORD-4822", client: "GlobalTech Ltd.", department: "Sales", amount: "$8,750", status: "Processing" },
    { id: "ORD-4823", client: "Metro Industries", department: "Procurement", amount: "$24,100", status: "Completed" },
    { id: "ORD-4824", client: "Sunrise Retail", department: "Sales", amount: "$5,200", status: "Pending" },
    { id: "ORD-4825", client: "Delta Logistics", department: "Operations", amount: "$15,800", status: "Processing" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Welcome to Trends ERP
        </h1>
        <p className="text-xs text-slate-500">
          Business overview and operational metrics dashboard.
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

      {/* Charts Section */}
      <DashboardCharts />

      {/* Dynamic content grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-slate-100 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Recent Orders</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Latest purchase orders and transactions.</p>
            </div>
            <span className="text-xs font-bold text-brand-green hover:underline cursor-pointer">
              View All
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-table-header text-slate-500 font-semibold border-b border-slate-100">
                  <th className="px-5 py-3">Order ID</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3 text-center">Amount</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-500">{o.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-700">{o.client}</td>
                    <td className="px-5 py-3.5 text-slate-500 truncate max-w-[200px]">{o.department}</td>
                    <td className="px-5 py-3.5 text-center font-bold text-brand-green">{o.amount}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${o.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : o.status === "Processing"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-blue-500/10 text-blue-600"
                          }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Info / Milestones */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Business Milestones</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Upcoming targets & goals.</p>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-700">Q3 Revenue Target</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">$500K target by September 30, 2026.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-700">New CRM Onboarding</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">500 client migration by August 2026.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-700">Warehouse Expansion</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">New facility launch planned for November.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-50 pt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-brand-orange" />
              Annual Target: $2M
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-600">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              On Track
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
