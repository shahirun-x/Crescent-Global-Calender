"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addDays,
  addMonths,
  mondayOf,
  parseISODate,
  startOfDay,
  toISODate,
} from "@/lib/dates";
import { catDot, eventCategoryColor } from "@/lib/eventCategories";
import type { CrescentEvent } from "@/lib/types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type CalendarView = "month" | "week";

interface CalendarProps {
  /** Events already filtered by the active category. */
  events: CrescentEvent[];
  view: CalendarView;
  onViewChange: (v: CalendarView) => void;
  /** The month (month view) or any day in the week (week view) on display. */
  anchor: Date;
  onAnchorChange: (d: Date) => void;
  selectedDay: string | null;
  onSelectDay: (iso: string | null) => void;
  /** ISO date of "today", passed in so it stays stable across renders. */
  today: string;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
}

export default function Calendar({
  events,
  view,
  onViewChange,
  anchor,
  onAnchorChange,
  selectedDay,
  onSelectDay,
  today,
}: CalendarProps) {
  const isMobile = useIsMobile();
  const [dir, setDir] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  // Map every day (as ISO) to the events that touch it, expanding multi-day spans.
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CrescentEvent[]>();
    for (const e of events) {
      let d = parseISODate(e.date_start);
      const end = parseISODate(e.date_end ?? e.date_start);
      let guard = 0;
      while (d <= end && guard < 90) {
        const key = toISODate(d);
        map.set(key, [...(map.get(key) ?? []), e]);
        d = addDays(d, 1);
        guard += 1;
      }
    }
    return map;
  }, [events]);

  const weekStart = useMemo(() => mondayOf(anchor), [anchor]);
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const monthDays = useMemo(() => {
    const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    const gridStart = mondayOf(monthStart);
    const gridEndExclusive = addDays(mondayOf(monthEnd), 7);
    const count = Math.round(
      (gridEndExclusive.getTime() - gridStart.getTime()) / 86_400_000
    );
    return Array.from({ length: count }, (_, i) => addDays(gridStart, i));
  }, [anchor]);

  function step(delta: number) {
    setDir(delta);
    onAnchorChange(
      view === "month" ? addMonths(anchor, delta) : addDays(anchor, delta * 7)
    );
  }

  function goToday() {
    setDir(0);
    onAnchorChange(startOfDay(new Date()));
  }

  const title =
    view === "month"
      ? anchor.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
      : `${weekStart.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        })} – ${weekDays[6].toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`;

  const bodyKey =
    view === "month"
      ? `m-${anchor.getFullYear()}-${anchor.getMonth()}`
      : `w-${toISODate(weekStart)}`;

  const navBtn =
    "flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-crescent-300 hover:text-crescent-700";

  return (
    <section
      aria-label="Events calendar"
      className="rounded-card border border-slate-200 bg-white p-4 sm:p-5"
    >
      {/* Header: title + view toggle + navigation */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-bold tracking-tight text-crescent-800 sm:text-xl">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex rounded-full bg-slate-100 p-0.5"
            role="group"
            aria-label="Calendar view"
          >
            {(["month", "week"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => onViewChange(v)}
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                  view === v
                    ? "bg-white text-crescent-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={view === "month" ? "Previous month" : "Previous week"}
              onClick={() => step(-1)}
              className={navBtn}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToday}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-crescent-300 hover:text-crescent-700"
            >
              Today
            </button>
            <button
              type="button"
              aria-label={view === "month" ? "Next month" : "Next week"}
              onClick={() => step(1)}
              className={navBtn}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        {/* Weekday header (month + desktop week grid) */}
        {(view === "month" || !isMobile) && (
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/70">
            {WEEKDAYS.map((w) => (
              <div
                key={w}
                className="px-1 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400"
              >
                <span className="hidden sm:inline">{w}</span>
                <span className="sm:hidden">{w[0]}</span>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={bodyKey}
            custom={dir}
            initial={{ opacity: 0, x: dir === 0 ? 0 : dir > 0 ? 44 : -44 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -44 : 44 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) step(1);
              else if (info.offset.x > 60) step(-1);
            }}
          >
            {view === "month" ? (
              <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
                {monthDays.map((d) => {
                  const iso = toISODate(d);
                  const inMonth = d.getMonth() === anchor.getMonth();
                  const dayEvents = eventsByDay.get(iso) ?? [];
                  const isToday = iso === today;
                  const isSelected = iso === selectedDay;
                  const clickable = dayEvents.length > 0;

                  return (
                    <div key={iso} className="relative">
                      <button
                        type="button"
                        disabled={!clickable}
                        onClick={() => onSelectDay(isSelected ? null : iso)}
                        onMouseEnter={() => setHovered(iso)}
                        onMouseLeave={() =>
                          setHovered((h) => (h === iso ? null : h))
                        }
                        aria-pressed={isSelected}
                        aria-label={`${d.toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })} — ${dayEvents.length} event${
                          dayEvents.length === 1 ? "" : "s"
                        }`}
                        className={`flex h-full min-h-[3.5rem] w-full flex-col items-start gap-1 p-1.5 text-left transition-colors md:min-h-[6rem] md:p-2 ${
                          clickable
                            ? "cursor-pointer hover:bg-crescent-50/60"
                            : "cursor-default"
                        } ${!inMonth ? "bg-slate-50/60" : ""}`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold md:h-7 md:w-7 md:text-sm ${
                            isToday
                              ? "bg-crescent-700 text-white"
                              : isSelected
                                ? "bg-accent-500 text-white"
                                : inMonth
                                  ? "text-slate-700"
                                  : "text-slate-300"
                          } ${
                            isSelected && isToday
                              ? "ring-2 ring-accent-500 ring-offset-1"
                              : ""
                          }`}
                        >
                          {d.getDate()}
                        </span>

                        {dayEvents.length > 0 && (
                          <span className="mt-auto flex flex-wrap items-center gap-1">
                            {dayEvents.slice(0, 3).map((e) => (
                              <span
                                key={e.id}
                                className={`h-1.5 w-1.5 rounded-full ${catDot(
                                  e.category
                                )}`}
                              />
                            ))}
                            {dayEvents.length > 3 && (
                              <span className="hidden text-[0.6rem] font-medium text-slate-400 sm:inline">
                                +{dayEvents.length - 3}
                              </span>
                            )}
                          </span>
                        )}
                      </button>

                      {hovered === iso && dayEvents.length > 0 && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 hidden w-52 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-2.5 text-left shadow-lg md:block">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">
                            {d.toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                          <ul className="mt-1 space-y-1">
                            {dayEvents.slice(0, 5).map((e) => (
                              <li
                                key={e.id}
                                className="flex items-start gap-1.5 text-xs text-slate-600"
                              >
                                <span
                                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${catDot(
                                    e.category
                                  )}`}
                                />
                                <span className="line-clamp-1">{e.title}</span>
                              </li>
                            ))}
                          </ul>
                          {dayEvents.length > 5 && (
                            <p className="mt-1 text-[0.7rem] text-slate-400">
                              +{dayEvents.length - 5} more
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                {/* Week — desktop: 7 columns */}
                <div className="hidden gap-2 p-3 md:grid md:grid-cols-7">
                  {weekDays.map((d) => {
                    const iso = toISODate(d);
                    const dayEvents = eventsByDay.get(iso) ?? [];
                    const isToday = iso === today;
                    const isSelected = iso === selectedDay;
                    return (
                      <div
                        key={iso}
                        className="flex min-h-[13rem] flex-col overflow-hidden rounded-xl border border-slate-200"
                      >
                        <button
                          type="button"
                          disabled={dayEvents.length === 0}
                          onClick={() =>
                            onSelectDay(isSelected ? null : iso)
                          }
                          className={`flex items-center justify-between px-2.5 py-2 text-left transition-colors ${
                            isSelected
                              ? "bg-accent-500 text-white"
                              : isToday
                                ? "bg-crescent-700 text-white"
                                : "bg-slate-50 text-slate-600"
                          } ${dayEvents.length ? "cursor-pointer" : "cursor-default"}`}
                        >
                          <span className="text-[0.7rem] font-semibold uppercase tracking-wide">
                            {d.toLocaleDateString("en-IN", { weekday: "short" })}
                          </span>
                          <span className="text-sm font-bold">{d.getDate()}</span>
                        </button>
                        <div className="flex-1 space-y-1.5 overflow-y-auto p-2">
                          {dayEvents.length === 0 && (
                            <p className="pt-3 text-center text-[0.7rem] text-slate-300">
                              —
                            </p>
                          )}
                          {dayEvents.map((e) => (
                            <div
                              key={e.id}
                              className={`rounded-lg p-2 text-[0.7rem] leading-tight ${eventCategoryColor[e.category].soft}`}
                            >
                              <p className="flex items-center gap-1 font-semibold">
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${catDot(
                                    e.category
                                  )}`}
                                />
                                <span className="line-clamp-2">{e.title}</span>
                              </p>
                              <p className="mt-0.5 line-clamp-1 opacity-70">
                                {e.institution_name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Week — mobile: vertical day list */}
                <div className="divide-y divide-slate-100 md:hidden">
                  {weekDays.map((d) => {
                    const iso = toISODate(d);
                    const dayEvents = eventsByDay.get(iso) ?? [];
                    const isToday = iso === today;
                    const isSelected = iso === selectedDay;
                    return (
                      <div key={iso} className="p-3">
                        <button
                          type="button"
                          disabled={dayEvents.length === 0}
                          onClick={() => onSelectDay(isSelected ? null : iso)}
                          className="flex w-full items-center gap-2 text-left"
                        >
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              isSelected
                                ? "bg-accent-500 text-white"
                                : isToday
                                  ? "bg-crescent-700 text-white"
                                  : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {d.getDate()}
                          </span>
                          <span className="text-sm font-semibold text-crescent-800">
                            {d.toLocaleDateString("en-IN", { weekday: "long" })}
                          </span>
                          <span className="text-xs text-slate-400">
                            {d.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </button>
                        {dayEvents.length === 0 ? (
                          <p className="mt-2 pl-9 text-xs text-slate-400">
                            No events
                          </p>
                        ) : (
                          <ul className="mt-2 space-y-1.5 pl-9">
                            {dayEvents.map((e) => (
                              <li
                                key={e.id}
                                className={`rounded-lg p-2 text-xs ${eventCategoryColor[e.category].soft}`}
                              >
                                <p className="flex items-center gap-1.5 font-semibold">
                                  <span
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${catDot(
                                      e.category
                                    )}`}
                                  />
                                  {e.title}
                                </p>
                                <p className="mt-0.5 opacity-70">
                                  {e.institution_name}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-2 text-center text-[0.7rem] text-slate-400 md:hidden">
        Swipe left or right to change {view === "month" ? "month" : "week"}
      </p>
    </section>
  );
}
