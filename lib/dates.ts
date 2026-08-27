import type { CrescentEvent } from "./types";

export type RangeKey = "today" | "week" | "month" | "year";

export const RANGES: { key: RangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "Academic Year" },
];

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Local (not UTC) YYYY-MM-DD — matches the string format used by event rows. */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function addMonths(d: Date, n: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth() + n, 1);
  return x;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Monday of the week containing `d` (weeks are Mon–Sun). */
export function mondayOf(d: Date): Date {
  const x = startOfDay(d);
  const offset = (x.getDay() + 6) % 7; // Mon = 0 … Sun = 6
  return addDays(x, -offset);
}

/** Inclusive [from, to] bounds for a time-range toggle, relative to `now`. */
export function rangeBounds(key: RangeKey, now: Date): [Date, Date] {
  const start = startOfDay(now);
  if (key === "today") {
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    return [start, end];
  }
  if (key === "week") {
    const monday = mondayOf(start);
    const sunday = addDays(monday, 6);
    sunday.setHours(23, 59, 59, 999);
    return [monday, sunday];
  }
  if (key === "month") {
    const first = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    return [first, last];
  }
  // Academic year: 1 June → 31 May
  const y = start.getMonth() >= 5 ? start.getFullYear() : start.getFullYear() - 1;
  return [new Date(y, 5, 1), new Date(y + 1, 4, 31, 23, 59, 59, 999)];
}

/** Does a (possibly multi-day) event cover the given ISO date? */
export function eventOccursOn(e: CrescentEvent, iso: string): boolean {
  const end = e.date_end ?? e.date_start;
  return iso >= e.date_start && iso <= end;
}

/** Does an event overlap an inclusive [from, to] window? */
export function eventInRange(e: CrescentEvent, from: Date, to: Date): boolean {
  const s = parseISODate(e.date_start);
  const en = new Date(`${e.date_end ?? e.date_start}T23:59:59`);
  return s <= to && en >= from;
}

export const byDateAsc = (a: CrescentEvent, b: CrescentEvent) =>
  a.date_start.localeCompare(b.date_start) || a.title.localeCompare(b.title);
