"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

const STEPS = [
  "Learning",
  "Ideas",
  "Innovation",
  "Incubation",
  "Acceleration",
  "Commercialization",
  "Global Impact",
];

/**
 * The CGOM "School-to-Start-up" pipeline. Horizontal on desktop, vertical on
 * mobile; nodes light up in sequence as the flow scrolls into view.
 */
export default function Pipeline({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ol className="flex flex-col md:flex-row md:items-start">
        {STEPS.map((step, i) => (
          <Fragment key={step}>
            <motion.li
              className="flex items-center gap-3 md:w-auto md:flex-none md:flex-col md:gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-crescent-700 text-sm font-bold text-white ring-4 ring-crescent-100">
                {i + 1}
              </span>
              <span className="text-xs font-semibold text-crescent-800 md:max-w-[6.5rem] md:text-center">
                {step}
              </span>
            </motion.li>

            {i < STEPS.length - 1 && (
              <motion.span
                aria-hidden
                className="ml-[1.35rem] h-6 w-px shrink-0 origin-top bg-crescent-200 md:ml-0 md:mt-[1.35rem] md:h-px md:w-auto md:flex-1 md:origin-left"
                initial={{ scaleX: 0, scaleY: 0 }}
                whileInView={{ scaleX: 1, scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, delay: i * 0.12 + 0.14 }}
              />
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
