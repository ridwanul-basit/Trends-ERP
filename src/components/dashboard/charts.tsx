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

/** Weekly registration trend data */
const registrationData = [
  { week: "W1", participants: 1200, questions: 180 },
  { week: "W2", participants: 2800, questions: 320 },
  { week: "W3", participants: 4100, questions: 410 },
  { week: "W4", participants: 69000, questions: 540 },
  { week: "W5", participants: 8200, questions: 620 },
  { week: "W6", participants: 11500, questions: 780 },
  { week: "W7", participants: 15800, questions: 920 },
  { week: "W8", participants: 61400, questions: 1100 },
  { week: "W9", participants: 28700, questions: 1350 },
  { week: "W10", participants: 35200, questions: 1680 },
  { week: "W11", participants: 41000, questions: 2100 },
  { week: "W12", participants: 45820, questions: 3240 },
];

/** Division-wise participant distribution */
const divisionData = [
  { name: "Dhaka", value: 12400, color: "#10b981" },
  { name: "Chattogram", value: 8200, color: "#3b82f6" },
  { name: "Rajshahi", value: 6100, color: "#f59e0b" },
  { name: "Khulna", value: 5400, color: "#ef4444" },
  { name: "Sylhet", value: 4800, color: "#8b5cf6" },
  { name: "Rangpur", value: 3900, color: "#ec4899" },
  { name: "Barishal", value: 2800, color: "#14b8a6" },
  { name: "Mymensingh", value: 2220, color: "#f97316" },
];

/** Score distribution data */
const scoreData = [
  { range: "0-20", selected: 0, waiting: 12, eliminated: 580 },
  { range: "21-40", selected: 0, waiting: 45, eliminated: 1200 },
  { range: "41-60", selected: 20, waiting: 380, eliminated: 2800 },
  { range: "61-80", selected: 450, waiting: 1900, eliminated: 1600 },
  { range: "81-90", selected: 2100, waiting: 1200, eliminated: 400 },
  { range: "91-100", selected: 1800, waiting: 280, eliminated: 50 },
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
              ? entry.value.toLocaleString()
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
        {data.value.toLocaleString()} participants
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
  if (percent < 0.05) return null;
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
  badgeColor = "bg-emerald-50 text-emerald-600",
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
      {/* ─── Spline / Area Chart ─────────────────────────────────── */}
      <ChartCard
        title="Registration Trend"
        subtitle="Weekly participant & question growth over 12 weeks."
        badge="↑ 12% this week"
        badgeColor="bg-emerald-50 text-emerald-600"
        className="lg:col-span-2"
      >
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={registrationData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="gradParticipants"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="gradQuestions"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="participants"
                name="Participants"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#gradParticipants)"
                animationDuration={1800}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="questions"
                name="Questions"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#gradQuestions)"
                animationDuration={2200}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#3b82f6",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* ─── Pie / Donut Chart ───────────────────────────────────── */}
      <ChartCard
        title="Division Distribution"
        subtitle="Participant spread across 8 divisions."
        badge="8 Divisions"
        badgeColor="bg-blue-50 text-blue-600"
      >
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={divisionData}
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
                {divisionData.map((entry, i) => (
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
                45.8K
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
                Total
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* ─── Stacked Bar Chart ───────────────────────────────────── */}
      <ChartCard
        title="Score Distribution"
        subtitle="Participant count by score range and status."
        badge="Selection Phase"
        badgeColor="bg-amber-50 text-amber-600"
        className="lg:col-span-3"
      >
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={scoreData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="range"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "10px", paddingTop: "12px" }}
              />
              <Bar
                dataKey="selected"
                name="Selected"
                stackId="a"
                fill="#10b981"
                radius={[0, 0, 0, 0]}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="waiting"
                name="Waiting"
                stackId="a"
                fill="#f59e0b"
                radius={[0, 0, 0, 0]}
                animationDuration={1600}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="eliminated"
                name="Eliminated"
                stackId="a"
                fill="#ef4444"
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
