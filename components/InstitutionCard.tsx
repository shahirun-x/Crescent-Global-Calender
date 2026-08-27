import CategoryBadge from "./CategoryBadge";
import { institutionCategoryStyle } from "@/lib/site";
import type { Institution } from "@/lib/types";

export default function InstitutionCard({ inst }: { inst: Institution }) {
  const href =
    inst.external_url ||
    `https://www.google.com/search?q=${encodeURIComponent(inst.name)}`;
  const hasSite = Boolean(inst.external_url);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-crescent-300 hover:shadow-lg hover:shadow-crescent-900/5">
      {/* Category colour bar groups cards by type at a glance */}
      <span
        aria-hidden
        className={`block h-2 ${institutionCategoryStyle[inst.category].bar}`}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <CategoryBadge category={inst.category} />
          {inst.established_year && (
            <span className="text-xs font-medium text-slate-400">
              Est. {inst.established_year}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-crescent-800">
          {inst.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {inst.location}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {inst.description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-crescent-600 transition-colors hover:text-crescent-800"
        >
          {hasSite ? "Visit official website" : "Search online"}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
