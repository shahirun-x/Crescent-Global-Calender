"use client";

import { motion } from "framer-motion";
import type { TimelineEntry } from "@/lib/types";

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative ml-3 border-l-2 border-crescent-200">
      {entries.map((entry, idx) => (
        <motion.li
          key={entry.year}
          className="ml-6 pb-10 last:pb-0"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.3) }}
        >
          <span className="absolute -left-[0.6rem] mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-crescent-600" />
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">
            {entry.year}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-crescent-800">
            {entry.title}
          </h3>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
            {entry.description}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
