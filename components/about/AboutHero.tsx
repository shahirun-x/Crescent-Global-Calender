"use client";

import { motion } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const TAGLINE = [
  "From School to Start-up.",
  "From Learning to Leadership.",
  "From Knowledge to Innovation.",
  "From Crescent to the World.",
];

export default function AboutHero() {
  const d = useMobileSpeed();
  const base = 0.15;

  return (
    <section className="relative overflow-hidden bg-crescent-950 text-white">
      <div aria-hidden className="about-mesh absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-crescent-950/30"
      />

      <div className="container-page relative py-28 md:py-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-crescent-300"
        >
          About · Crescent Global Outreach Mission
        </motion.p>

        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.14] tracking-tight sm:text-5xl md:text-6xl">
          {TAGLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block will-change-transform"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + i * base * d,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 + TAGLINE.length * base * d }}
          className="mt-8 text-lg font-semibold text-crescent-200"
        >
          Crescent Global Outreach Mission (CGOM)
        </motion.p>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-white/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
