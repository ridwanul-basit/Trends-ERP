"use client";

import { useTheme } from "@/components/theme-provider";
import { PageToolbar } from "@/components/shared";
import { Paintbrush, RotateCcw, LayoutTemplate } from "lucide-react";
import toast from "react-hot-toast";

export default function ThemeSettingsPage() {
  const { theme, updateTheme, resetTheme } = useTheme();

  const handleColorChange = (key: keyof typeof theme, value: string) => {
    if (key === "primary") {
      // If primary is changed, cascade the change to sidebar and pagination as well
      // so they act linked by default. The user can still override them individually later.
      updateTheme({
        primary: value,
        sidebarParentBg: value,
        sidebarChildText: value,
        paginationActiveBg: value
      });
    } else {
      updateTheme({ [key]: value });
    }
  };

  const handleReset = () => {
    resetTheme();
    toast.success("Theme reset to defaults");
  };

  return (
    <div className="space-y-4">
      <PageToolbar
        title="Theme Customization"
        description="Personalize the visual appearance of your ERP."
        breadcrumbs={[
          { label: "Settings" },
          { label: "Theme", href: "/settings/theme" },
        ]}
        showSearch={false}
        actionLabel="Reset to Defaults"
        onAction={handleReset}
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Layout Configuration */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden self-start max-w-2xl">
          <div className="border-b border-slate-100 bg-slate-50/50 p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-primary/10 text-theme-primary">
              <LayoutTemplate className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Layout Configuration</h3>
              <p className="text-xs text-slate-500">Choose the placement of the main navigation.</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="layoutPosition"
                  value="left"
                  checked={theme.layoutPosition === "left"}
                  onChange={() => updateTheme({ layoutPosition: "left" })}
                  className="h-4 w-4 text-theme-primary focus:ring-theme-primary border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Left Sidebar</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="layoutPosition"
                  value="right"
                  checked={theme.layoutPosition === "right"}
                  onChange={() => updateTheme({ layoutPosition: "right" })}
                  className="h-4 w-4 text-theme-primary focus:ring-theme-primary border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Right Sidebar</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="layoutPosition"
                  value="top"
                  checked={theme.layoutPosition === "top"}
                  onChange={() => updateTheme({ layoutPosition: "top" })}
                  className="h-4 w-4 text-theme-primary focus:ring-theme-primary border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Top Navigation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="layoutPosition"
                  value="bottom"
                  checked={theme.layoutPosition === "bottom"}
                  onChange={() => updateTheme({ layoutPosition: "bottom" })}
                  className="h-4 w-4 text-theme-primary focus:ring-theme-primary border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Bottom Navigation</span>
              </label>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden max-w-2xl">
          <div className="border-b border-slate-100 bg-slate-50/50 p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-primary/10 text-theme-primary">
              <Paintbrush className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Color Palette</h3>
              <p className="text-xs text-slate-500">Pick colors to apply across the entire project.</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Primary Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Primary Brand Color
                  <span className="font-mono text-slate-400">{theme.primary}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.primary}
                    onChange={(e) => handleColorChange("primary", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Used for sidebar active links, primary text, and accents.</p>
                </div>
              </div>

              {/* Header Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Table Header Color
                  <span className="font-mono text-slate-400">{theme.header}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.header}
                    onChange={(e) => handleColorChange("header", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Background color for data table headers.</p>
                </div>
              </div>

              {/* Border Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Table Border Color
                  <span className="font-mono text-slate-400">{theme.border}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.border}
                    onChange={(e) => handleColorChange("border", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Color of borders around tables and rows.</p>
                </div>
              </div>

              {/* Action Primary */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Action Button (Edit)
                  <span className="font-mono text-slate-400">{theme.actionPrimary}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.actionPrimary}
                    onChange={(e) => handleColorChange("actionPrimary", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Color for 'Edit' or primary actions.</p>
                </div>
              </div>

              {/* Action Danger */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Action Button (Delete)
                  <span className="font-mono text-slate-400">{theme.actionDanger}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.actionDanger}
                    onChange={(e) => handleColorChange("actionDanger", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Background color for destructive actions (e.g. Delete, Reject).</p>
                </div>
              </div>

              {/* Table Header */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Table Header Background
                  <span className="font-mono text-slate-400">{theme.header}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.header}
                    onChange={(e) => handleColorChange("header", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Background color for data table headers.</p>
                </div>
              </div>

              {/* Table Border */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Table Border Color
                  <span className="font-mono text-slate-400">{theme.border}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.border}
                    onChange={(e) => handleColorChange("border", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Color for data table borders and row separators.</p>
                </div>
              </div>

              {/* Section Highlight */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Section Highlight Bar
                  <span className="font-mono text-slate-400">{theme.sectionHighlight}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.sectionHighlight}
                    onChange={(e) => handleColorChange("sectionHighlight", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Color for the vertical highlight bar on section headers.</p>
                </div>
              </div>

              {/* Sidebar Parent BG */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Sidebar Parent Active BG
                  <span className="font-mono text-slate-400">{theme.sidebarParentBg}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.sidebarParentBg}
                    onChange={(e) => handleColorChange("sidebarParentBg", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Background color for active top-level sidebar items.</p>
                </div>
              </div>

              {/* Sidebar Parent Text */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Sidebar Parent Active Text
                  <span className="font-mono text-slate-400">{theme.sidebarParentText}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.sidebarParentText}
                    onChange={(e) => handleColorChange("sidebarParentText", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Text color for active top-level sidebar items.</p>
                </div>
              </div>

              {/* Sidebar Child Text */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Sidebar Child Active Text
                  <span className="font-mono text-slate-400">{theme.sidebarChildText}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.sidebarChildText}
                    onChange={(e) => handleColorChange("sidebarChildText", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Text color for active nested child sidebar items.</p>
                </div>
              </div>

              {/* Pagination Active BG */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Pagination Active BG
                  <span className="font-mono text-slate-400">{theme.paginationActiveBg}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.paginationActiveBg}
                    onChange={(e) => handleColorChange("paginationActiveBg", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Background color for the active page number.</p>
                </div>
              </div>

              {/* Pagination Active Text */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Pagination Active Text
                  <span className="font-mono text-slate-400">{theme.paginationActiveText}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.paginationActiveText}
                    onChange={(e) => handleColorChange("paginationActiveText", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border-0 p-0"
                  />
                  <p className="text-[11px] text-slate-500 flex-1">Text color for the active page number.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Live Preview */}
          <div className="border-t border-slate-100 p-6 bg-slate-50/30">
            <h4 className="text-xs font-bold text-slate-800 mb-4 uppercase tracking-wider">Live Preview</h4>

            <div className="rounded-lg overflow-hidden border border-theme-border">
              <div className="bg-theme-header px-4 py-3 border-b border-theme-border flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">Sample Table Header</span>
                <span className="text-xs font-medium text-theme-primary">Primary Text</span>
              </div>
              <div className="bg-white px-4 py-3 flex justify-between items-center">
                <span className="text-xs text-slate-600">Sample Row Data</span>
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded bg-theme-action-primary/10 flex items-center justify-center border border-theme-action-primary/20">
                    <div className="h-3 w-3 bg-theme-action-primary rounded-sm" />
                  </div>
                  <div className="h-6 w-6 rounded bg-theme-action-danger/10 flex items-center justify-center border border-theme-action-danger/20">
                    <div className="h-3 w-3 bg-theme-action-danger rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
