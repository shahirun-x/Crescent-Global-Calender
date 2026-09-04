"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";
import type { TimelineEntry } from "@/lib/types";

const viewport = { once: true, margin: "-80px" };

export default function TimelineScroll({
  entries,
}: {
  entries: TimelineEntry[];
}) {
  const d = useMobileSpeed();
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-24 md:py-32">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600"
        >
          Our Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.06 * d, ease: EASE }}
          className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-crescent-800 sm:text-4xl md:text-5xl"
        >
          From one school in 1968 to a global network
        </motion.h2>

        <ol ref={railRef} className="relative mt-12 max-w-3xl pl-8">
          <span
            aria-hidden
            className="absolute left-[0.30rem] top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-slate-200"
          />
          <motion.span
            aria-hidden
            className="absolute left-[0.30rem] top-1 h-[calc(100%-0.5rem)] w-[3px] origin-top rounded-full bg-gradient-to-b from-crescent-600 via-teal-500 to-teal-400"
            style={{ scaleY }}
          />

          {entries.map((entry, i) => (
            <motion.li
              key={entry.year}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.04 * i * d, ease: EASE }}
            >
              <motion.span
                aria-hidden
                className="absolute -left-[1.85rem] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-crescent-600 shadow"
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.4, 1] }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE }}
              />
              <p className="text-lg font-extrabold uppercase tracking-wide text-accent-600">
                {entry.year}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-crescent-800">
                {entry.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {entry.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
