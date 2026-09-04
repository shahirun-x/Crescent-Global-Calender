"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const STEPS = [
  "Learning",
  "Ideas",
  "Innovation",
  "Incubation",
  "Acceleration",
  "Commercialization",
  "Global Impact",
];

// Blue → teal → green across the seven nodes.
const NODE_COLORS = [
  "#1a3a6b",
  "#234488",
  "#2f57a6",
  "#0e7490",
  "#0d9488",
  "#0f9d6b",
  "#16a34a",
];

export default function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const d = useMobileSpeed();
  const stepDelay = (i: number) => 0.35 + i * 0.3 * d;

  return (
    <div ref={ref} className="relative">
      {/* Gradient connector line that draws itself */}
      <motion.div
        aria-hidden
        className="absolute left-6 top-6 h-[calc(100%-3rem)] w-[3px] origin-top rounded-full bg-gradient-to-b from-crescent-600 via-teal-500 to-emerald-500 md:hidden"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-8 right-8 top-8 hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-crescent-600 via-teal-500 to-emerald-500 md:block"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      <ol className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-3">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className="relative z-10 flex items-center gap-4 md:flex-1 md:flex-col md:gap-3"
          >
            <div className="relative grid place-items-center">
              <motion.span
                aria-hidden
                className="pointer-events-none absolute h-16 w-16 rounded-full md:h-20 md:w-20"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.7, 0.25] } : { opacity: 0 }}
                transition={{ duration: 0.7, delay: stepDelay(i) }}
                style={{
                  background: `radial-gradient(closest-side, ${NODE_COLORS[i]}88, transparent)`,
                }}
              />
              <motion.span
                className="relative grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-white shadow-md will-change-transform md:h-16 md:w-16 md:text-base"
                style={{ backgroundColor: NODE_COLORS[i] }}
                initial={{ scale: 0.8, opacity: 0.4 }}
                animate={
                  inView ? { scale: [0.8, 1.15, 1], opacity: 1 } : { opacity: 0.4 }
                }
                transition={{ duration: 0.5, delay: stepDelay(i), ease: EASE }}
              >
                {i + 1}
              </motion.span>
            </div>

            <motion.span
              className="text-sm font-semibold text-crescent-800 md:max-w-[7rem] md:text-center"
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.35, delay: stepDelay(i) + 0.25 }}
            >
              {step}
            </motion.span>
          </li>
        ))}
      </ol>
    </div>
  );
}
