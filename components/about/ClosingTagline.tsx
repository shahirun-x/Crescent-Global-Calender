"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const LINES = [
  { text: "From School to Start-up.", className: "text-white" },
  { text: "From Learning to Leadership.", className: "text-crescent-200" },
  { text: "From Knowledge to Innovation.", className: "text-cyan-300" },
  { text: "From Crescent to the World.", className: "text-amber-300" },
];

export default function ClosingTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const d = useMobileSpeed();
  const lastDelay = 0.15 * (LINES.length - 1) * d + 0.5;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-crescent-950 py-28 text-center text-white md:py-36"
    >
      <div aria-hidden className="about-mesh absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-crescent-950/40"
      />

      <div className="container-page relative">
        <p className="mx-auto flex max-w-3xl flex-col gap-2 text-2xl font-extrabold leading-[1.3] sm:text-3xl lg:text-4xl">
          {LINES.map((line, i) => (
            <motion.span
              key={line.text}
              className={`block ${line.className}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i * d, ease: EASE }}
            >
              {line.text}
            </motion.span>
          ))}
        </p>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50rem 20rem at 50% 50%, rgba(255,255,255,0.18), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.9, 0] } : {}}
        transition={{ duration: 1.4, delay: lastDelay, ease: "easeInOut" }}
      />
    </section>
  );
}
