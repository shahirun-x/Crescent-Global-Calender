"use client";

import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import type { NewsItem } from "@/lib/types";

const EMPTY: Partial<NewsItem> = {
  title: "", summary: "", content: "", institution_name: "",
  published_at: new Date().toISOString().split("T")[0], image_url: "",
};

export default function NewsManager() {
  const { toast } = useToast();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/news");
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
    const res = await fetch("/api/admin/news", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) { toast(json.error ?? "Failed", "error"); return; }
    toast(isNew ? "Article created" : "Article updated");
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    const res = await fetch("/api/admin/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) { toast("Article deleted"); load(); }
    else toast("Delete failed", "error");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">News</h1>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="rounded-lg bg-crescent-700 px-4 py-2 text-sm font-medium text-white hover:bg-crescent-800"
        >
          + Add Article
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/30 pt-20">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">
              {editing.id ? "Edit Article" : "New Article"}
            </h2>
            <div className="space-y-3">
              <Field label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Institution" value={editing.institution_name ?? ""} onChange={(v) => setEditing({ ...editing, institution_name: v })} />
              <Field label="Published Date" type="date" value={editing.published_at ?? ""} onChange={(v) => setEditing({ ...editing, published_at: v })} />
              <Field label="Image URL" value={editing.image_url ?? ""} onChange={(v) => setEditing({ ...editing, image_url: v })} />
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Summary</label>
                <textarea
                  value={editing.summary ?? ""}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Content</label>
                <textarea
                  value={editing.content ?? ""}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
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

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <p className="p-6 text-center text-sm text-slate-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-400">No articles yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Institution</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{n.title}</td>
                  <td className="px-4 py-3 text-slate-500">{n.institution_name}</td>
                  <td className="px-4 py-3 text-slate-500">{n.published_at}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing({ ...n })} className="text-crescent-700 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(n.id)} className="ml-3 text-red-600 hover:underline">
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
