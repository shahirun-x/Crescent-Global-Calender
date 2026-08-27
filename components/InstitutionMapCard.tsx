"use client";

import dynamic from "next/dynamic";
import type { Institution } from "@/lib/types";

// Leaflet touches window/document — load it only in the browser.
const InstitutionMap = dynamic(() => import("./InstitutionMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
  ),
});

export default function InstitutionMapCard({
  institutions,
  className = "h-[350px] md:h-[450px]",
}: {
  institutions: Institution[];
  className?: string;
}) {
  return (
    <div className={className}>
      <InstitutionMap institutions={institutions} className="h-full" />
    </div>
  );
}
