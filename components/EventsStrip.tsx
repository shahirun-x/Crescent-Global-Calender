import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { formatDateRange } from "@/lib/site";
import type { CrescentEvent } from "@/lib/types";

export default function EventsStrip({ events }: { events: CrescentEvent[] }) {
  const upcoming = events
    .filter((e) => new Date((e.date_end ?? e.date_start) + "T23:59:59") >= new Date())
    .slice(0, 6);

  const list = upcoming.length ? upcoming : events.slice(0, 6);

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="What's Happening Across Crescent"
            title="Upcoming across the network"
            description="Pulled live from the Central Calendar — the coordination layer that keeps events from clashing and participation high."
          />
          <Link
            href="/calendar"
            className="rounded-full border border-crescent-300 px-4 py-2 text-sm font-semibold text-crescent-700 transition-colors hover:bg-crescent-50"
          >
            Open Central Calendar →
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e, idx) => (
            <Reveal key={e.id} as="li" delay={idx * 0.05}>
              <article className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-crescent-600">
                  <time dateTime={e.date_start}>
                    {formatDateRange(e.date_start, e.date_end)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{e.category}</span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-crescent-800">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{e.institution_name}</p>
                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {e.description}
                </p>
                <p className="mt-3 text-xs text-slate-400">{e.location}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
