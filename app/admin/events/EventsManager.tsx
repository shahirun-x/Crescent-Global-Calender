"use client";

import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import type { CrescentEvent, EventCategory } from "@/lib/types";

const CATEGORIES: EventCategory[] = [
  "Schools", "Colleges", "University", "Healthcare",
  "Alumni", "Community", "Sports", "Cultural", "Conferences",
];

const EMPTY: Partial<CrescentEvent> = {
  title: "", date_start: "", date_end: "", institution_name: "",
  category: "Community", location: "", description: "", is_featured: false,
};

export default function EventsManager() {
  const { toast } = useToast();
  const [items, setItems] = useState<CrescentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<CrescentEvent> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/events");
    if (res.ok) {
      const { data } = await res.json();
      setItems(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const res = await fetch("/api/admin/events", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) { toast(json.error ?? "Failed", "error"); return; }
    toast(isNew ? "Event created" : "Event updated");
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    const res = await fetch("/api/admin/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) { toast("Event deleted"); load(); }
    else toast("Delete failed", "error");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Events</h1>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="rounded-lg bg-crescent-700 px-4 py-2 text-sm font-medium text-white hover:bg-crescent-800"
        >
          + Add Event
        </button>
      </div>

      {/* Form Modal */}
      {editing && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/30 pt-20">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">
              {editing.id ? "Edit Event" : "New Event"}
            </h2>
            <div className="space-y-3">
              <Field label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Start Date" type="date" value={editing.date_start ?? ""} onChange={(v) => setEditing({ ...editing, date_start: v })} />
                <Field label="End Date" type="date" value={editing.date_end ?? ""} onChange={(v) => setEditing({ ...editing, date_end: v })} />
              </div>
              <Field label="Institution" value={editing.institution_name ?? ""} onChange={(v) => setEditing({ ...editing, institution_name: v })} />
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Category</label>
                <select
                  value={editing.category ?? "Community"}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as EventCategory })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <Field label="Location" value={editing.location ?? ""} onChange={(v) => setEditing({ ...editing, location: v })} />
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Description</label>
                <textarea
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.is_featured ?? false}
                  onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
                />
                Featured event
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="rounded-lg bg-crescent-700 px-4 py-2 text-sm font-medium text-white hover:bg-crescent-800 disabled:opacity-60">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <p className="p-6 text-center text-sm text-slate-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-400">No events yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{ev.title}</td>
                  <td className="px-4 py-3 text-slate-500">{ev.date_start}</td>
                  <td className="px-4 py-3 text-slate-500">{ev.category}</td>
                  <td className="px-4 py-3">{ev.is_featured ? "Yes" : ""}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing({ ...ev })} className="text-crescent-700 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="ml-3 text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
    </div>
  );
}
