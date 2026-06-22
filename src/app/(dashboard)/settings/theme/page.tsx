"use client";

import { useTheme } from "@/components/theme-provider";
import { PageToolbar } from "@/components/shared";
import { Paintbrush, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function ThemeSettingsPage() {
  const { theme, updateTheme, resetTheme } = useTheme();

  const handleColorChange = (key: keyof typeof theme, value: string) => {
    updateTheme({ [key]: value });
  };

  const handleReset = () => {
    resetTheme();
    toast.success("Theme reset to defaults");
  };

  return (
    <div className="space-y-6">
      <PageToolbar
        title="Theme Customization"
        description="Personalize the visual appearance of your ERP."
        showSearch={false}
        actionLabel="Reset to Defaults"
        onAction={handleReset}
      />

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

        <div className="p-6 space-y-6">
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
                <p className="text-[11px] text-slate-500 flex-1">Color for 'Delete' or destructive actions.</p>
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
  );
}
