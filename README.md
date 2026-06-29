# Trends ERP - Next.js Project

This project leverages a reusable component architecture to maintain a consistent UI across all pages while minimizing code duplication. This documentation outlines the shared components created for this project and provides a step-by-step guide on how to build new pages (like lists with Create/Edit functionality) using them.

## Shared Component Architecture

We have centralized our core UI building blocks in `src/components/shared/`. These components are designed to work together seamlessly to create consistent Admin/Dashboard pages.

### 1. `PageToolbar`
Provides the page header, breadcrumb navigation, and the primary "Add / Create" button in the top right.

**Usage:**
```tsx
<PageToolbar
  title="Manage Award"
  breadcrumbs={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Award", href: "/hrm/admin/award" }
  ]}
  onAdd={() => setIsCreateOpen(true)} // Triggers your create modal
/>
```

### 2. `DataTable`
A consistent table wrapper that handles styling, responsive overflow, and header formatting.

**Usage:**
It takes a `headers` array and expects actual HTML table rows (`<tr>`) as children. This prevents HTML nesting hydration errors.

```tsx
const HEADERS = ["Employee", "Award Type", "Date", "Action"];

<DataTable headers={HEADERS} colSpan={HEADERS.length}>
  {data.map((item) => (
    <tr key={item.id}>
      <td className="px-5 py-3">{item.employee}</td>
      <td className="px-5 py-3">{item.awardType}</td>
      <td className="px-5 py-3">{item.date}</td>
      {/* Action buttons go here */}
    </tr>
  ))}
</DataTable>
```

### 3. `TableActions`
Standardized "Edit" (blue/teal pencil) and "Delete" (red trash) buttons intended to be the final column inside a `<tr>`.

**Usage:**
```tsx
<TableActions 
  id={item.id} 
  showEdit 
  showDelete 
  onEdit={() => setEditItem(item)} // Triggers your edit modal with the specific item
  onDelete={() => console.log("Delete", item.id)} 
/>
```

### 4. `FormModal`
A powerful, dynamic popup dialog for handling Create and Edit operations. It automatically generates the form layout based on an array of field configurations.

**Field Types Supported:** `text`, `textarea`, `date`, `select`.

**Usage:**
```tsx
const formFields: FormModalField[] = [
  { name: "employee", label: "Employee", type: "select", required: true, options: [{ label: "John Doe", value: "john" }] },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter details..." }
];

// Inside your component:
<FormModal 
  isOpen={isCreateOpen} 
  onClose={() => setIsCreateOpen(false)} 
  title="Create Award" 
  submitText="Create" 
  fields={formFields} 
  gridCols={2} // Renders fields in a 2-column grid
  maxWidth="max-w-2xl" 
  onSubmit={(formData) => handleCreate(formData)} 
/>
```

---

## How to Build a Standard Page

Building a new page with a list, create modal, and edit modal requires just a single file (e.g., `page.tsx`) by reusing the shared components. Here is the standard template:

### Standard Template (`page.tsx`)

```tsx
"use client";

import { useState } from "react";
import { DataTable, PageToolbar, TableActions, FormModal, FormModalField } from "@/components/shared";

// 1. Define Table Headers
const HEADERS = ["Branch", "Title", "Description", "Action"];

// 2. Define Form Fields for the Modals
const sharedFields: FormModalField[] = [
  { name: "branch", label: "Branch", type: "text", required: true, placeholder: "Enter branch" },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
];

export default function StandardPage() {
  // 3. Setup State for Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null); // Holds the item being edited

  // 4. (Optional) Define Dummy Data or Fetch real data
  const data = [
    { id: 1, branch: "China", title: "Business Process", description: "Details..." }
  ];

  return (
    <div className="space-y-4">
      {/* 5. Top Toolbar */}
      <PageToolbar
        title="Manage Policy"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Policy", href: "/policy" }]}
        onAdd={() => setIsCreateOpen(true)}
      />

      {/* 6. Main Data Table */}
      <DataTable headers={HEADERS} colSpan={HEADERS.length}>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-3">{item.branch}</td>
            <td className="px-5 py-3">{item.title}</td>
            <td className="px-5 py-3 text-slate-500">{item.description}</td>
            
            {/* Standard Action Column */}
            <TableActions 
              id={item.id} 
              showEdit 
              showDelete 
              onEdit={() => setEditItem(item)} 
              onDelete={() => console.log("Delete", item.id)} 
            />
          </tr>
        ))}
      </DataTable>

      {/* 7. Create Modal */}
      <FormModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        title="Add Policy" 
        submitText="Add" 
        fields={sharedFields} 
        gridCols={2} 
        maxWidth="max-w-xl" 
        onSubmit={(formData) => { console.log("Created:", formData); setIsCreateOpen(false); }} 
      />

      {/* 8. Edit Modal */}
      <FormModal 
        isOpen={!!editItem} 
        onClose={() => setEditItem(null)} 
        title="Edit Policy" 
        submitText="Update" 
        fields={sharedFields} 
        gridCols={2} 
        maxWidth="max-w-xl" 
        onSubmit={(formData) => { console.log("Updated:", formData); setEditItem(null); }} 
      />
    </div>
  );
}
```

### Key Rules & Best Practices

1. **Hydration Errors:** NEVER wrap `<TableActions />` inside a `<td>`. The `TableActions` component automatically renders its own `<td>`. Wrapping it in another one will cause invalid DOM nesting and Next.js hydration errors.
2. **Reusability:** Try to use the exact same `FormModalField` array for both the "Create" and "Edit" modals whenever possible to ensure consistency and save time.
3. **Responsive Grid:** Use `gridCols={2}` on the `FormModal` if you have 4+ fields to prevent the modal from getting too tall vertically.
4. **Icons:** Import icons from `lucide-react` for standard UI elements when extending buttons inside the table columns.
