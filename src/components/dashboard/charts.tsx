"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/* ═══════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */

/** Monthly revenue & expenses trend */
const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 48000, expenses: 31000 },
  { month: "Mar", revenue: 55000, expenses: 34000 },
  { month: "Apr", revenue: 51000, expenses: 29000 },
  { month: "May", revenue: 63000, expenses: 37000 },
  { month: "Jun", revenue: 72000, expenses: 41000 },
  { month: "Jul", revenue: 68000, expenses: 38000 },
  { month: "Aug", revenue: 78000, expenses: 44000 },
  { month: "Sep", revenue: 85000, expenses: 48000 },
  { month: "Oct", revenue: 92000, expenses: 52000 },
  { month: "Nov", revenue: 98000, expenses: 55000 },
  { month: "Dec", revenue: 110000, expenses: 62000 },
];

/** Department budget allocation */
const departmentData = [
  { name: "HR", value: 185000, color: "#486AB8" },
  { name: "Finance", value: 240000, color: "#3b82f6" },
  { name: "Operations", value: 320000, color: "#10b981" },
  { name: "Sales", value: 275000, color: "#f59e0b" },
  { name: "IT", value: 195000, color: "#8b5cf6" },
  { name: "Marketing", value: 150000, color: "#ec4899" },
];

/** Quarterly performance by department */
const performanceData = [
  { quarter: "Q1", sales: 180, procurement: 95, hr: 42 },
  { quarter: "Q2", sales: 220, procurement: 110, hr: 58 },
  { quarter: "Q3", sales: 195, procurement: 130, hr: 65 },
  { quarter: "Q4", sales: 280, procurement: 145, hr: 72 },
];

/* ═══════════════════════════════════════════════════════════════════════
   CUSTOM TOOLTIP
   ═══════════════════════════════════════════════════════════════════════ */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur-sm">
      <p className="mb-1.5 text-[10px] font-bold text-slate-600">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-[10px]">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-500">{entry.name}:</span>
          <span className="font-bold text-slate-800">
            {typeof entry.value === "number"
              ? entry.value >= 1000
                ? `$${(entry.value / 1000).toFixed(0)}K`
                : entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-xl border border-slate-100 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 text-[10px]">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: data.payload.color }}
        />
        <span className="font-bold text-slate-700">{data.name}</span>
      </div>
      <p className="mt-1 text-[11px] font-bold text-slate-800">
        ${(data.value / 1000).toFixed(0)}K budget
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CUSTOM PIE LABEL
   ═══════════════════════════════════════════════════════════════════════ */

function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.08) return null;
  return (
    <text
      x={x}
      y={y}
      fill="#64748b"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "9px", fontWeight: 600 }}
    >
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHART CARD WRAPPER
   ═══════════════════════════════════════════════════════════════════════ */

function ChartCard({
  title,
  subtitle,
  badge,
  badgeColor = "bg-blue-50 text-blue-600",
  children,
  className = "",
}: {
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          <p className="mt-0.5 text-[10px] text-slate-400">{subtitle}</p>
        </div>
        {badge && (
          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${badgeColor}`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   EXPORTED CHARTS SECTION
   ═══════════════════════════════════════════════════════════════════════ */

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* ─── Revenue & Expense Trend ─────────────────────────────────── */}
      <ChartCard
        title="Revenue & Expenses"
        subtitle="Monthly financial performance over the year."
        badge="↑ 18% YoY"
        badgeColor="bg-emerald-50 text-emerald-600"
        className="lg:col-span-2"
      >
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="gradRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#486AB8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#486AB8" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="gradExpenses"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#486AB8"
                strokeWidth={2.5}
                fill="url(#gradRevenue)"
                animationDuration={1800}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#486AB8",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#gradExpenses)"
                animationDuration={2200}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#ef4444",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* ─── Department Budget Pie Chart ───────────────────────────────── */}
      <ChartCard
        title="Department Budget"
        subtitle="Annual budget allocation across departments."
        badge="6 Departments"
        badgeColor="bg-blue-50 text-blue-600"
      >
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={renderCustomLabel}
                animationDuration={1600}
                animationEasing="ease-out"
                stroke="none"
              >
                {departmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              {/* Center label */}
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  fill: "#1e293b",
                }}
              >
                $1.37M
              </text>
              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  fill: "#94a3b8",
                }}
              >
                Total Budget
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* ─── Quarterly Performance Bar Chart ───────────────────────────── */}
      <ChartCard
        title="Quarterly Performance"
        subtitle="Tasks completed per department by quarter."
        badge="FY 2026"
        badgeColor="bg-amber-50 text-amber-600"
        className="lg:col-span-3"
      >
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "10px", paddingTop: "12px" }}
              />
              <Bar
                dataKey="sales"
                name="Sales"
                stackId="a"
                fill="#486AB8"
                radius={[0, 0, 0, 0]}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="procurement"
                name="Procurement"
                stackId="a"
                fill="#10b981"
                radius={[0, 0, 0, 0]}
                animationDuration={1600}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="hr"
                name="HR"
                stackId="a"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                animationDuration={1800}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
