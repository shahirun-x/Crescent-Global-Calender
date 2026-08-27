"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateRange } from "@/lib/site";
import type { CrescentEvent, EventCategory } from "@/lib/types";

type RangeKey = "today" | "week" | "month" | "year";

const ranges: { key: RangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "Academic Year" },
];

const categoryFilters: (EventCategory | "All")[] = [
  "All",
  "Schools",
  "Colleges",
  "University",
  "Healthcare",
  "Alumni",
  "Community",
  "Sports",
  "Cultural",
  "Conferences",
];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function rangeBounds(key: RangeKey, now: Date): [Date, Date] {
  const start = startOfDay(now);
  if (key === "today") {
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    return [start, end];
  }
  if (key === "week") {
    const day = start.getDay(); // 0 = Sun
    const monday = new Date(start);
    monday.setDate(start.getDate() - ((day + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return [monday, sunday];
  }
  if (key === "month") {
    const first = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(start.getFullYear(), start.getMonth() + 1, 0, 23, 59, 59, 999);
    return [first, last];
  }
  // Academic year: 1 June → 31 May
  const y = start.getMonth() >= 5 ? start.getFullYear() : start.getFullYear() - 1;
  return [new Date(y, 5, 1), new Date(y + 1, 4, 31, 23, 59, 59, 999)];
}

export default function CalendarExplorer({ events }: { events: CrescentEvent[] }) {
  const now = useMemo(() => new Date(), []);
  const [range, setRange] = useState<RangeKey>("year");
  const [category, setCategory] = useState<(EventCategory | "All")>("All");

  const filtered = useMemo(() => {
    const [from, to] = rangeBounds(range, now);
    return events
      .filter((e) => {
        const s = new Date(e.date_start + "T00:00:00");
        const en = new Date((e.date_end ?? e.date_start) + "T23:59:59");
        const overlaps = s <= to && en >= from;
        const matchesCat = category === "All" || e.category === category;
        return overlaps && matchesCat;
      })
      .sort((a, b) => a.date_start.localeCompare(b.date_start));
  }, [events, range, category, now]);

  const groups = useMemo(() => {
    const map = new Map<string, CrescentEvent[]>();
    for (const e of filtered) {
      const key = new Date(e.date_start + "T00:00:00").toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-card border border-slate-200 bg-white p-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Time range
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Time range">
            {ranges.map((r) => (
              <button
                key={r.key}
                type="button"
                aria-pressed={range === r.key}
                onClick={() => setRange(r.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  range === r.key
                    ? "bg-crescent-700 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-crescent-300 hover:text-crescent-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Filter
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categoryFilters.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-accent-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-accent-500 hover:text-accent-600"
                }`}
              >
                {c === "All" ? "All Institutions" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500" aria-live="polite">
        {filtered.length} event{filtered.length === 1 ? "" : "s"} in view
      </p>

      <div className="mt-6 space-y-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${range}-${category}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {groups.length === 0 && (
              <p className="rounded-card border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
                No events in this range. Try widening the time range or clearing
                the filter.
              </p>
            )}

            {groups.map(([month, items]) => (
              <section key={month} className="mb-10">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-crescent-600">
                  {month}
                </h2>
                <ul className="space-y-3">
                  {items.map((e) => (
                    <li
                      key={e.id}
                      className="grid gap-3 rounded-card border border-slate-200 bg-white p-5 sm:grid-cols-[8.5rem_1fr]"
                    >
                      <div className="text-sm font-semibold text-crescent-700">
                        <time dateTime={e.date_start}>
                          {formatDateRange(e.date_start, e.date_end)}
                        </time>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-crescent-800">
                            {e.title}
                          </h3>
                          <span className="rounded-full bg-crescent-50 px-2 py-0.5 text-xs font-semibold text-crescent-700">
                            {e.category}
                          </span>
                          {e.is_featured && (
                            <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-xs font-semibold text-accent-600">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          {e.institution_name} · {e.location}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {e.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
