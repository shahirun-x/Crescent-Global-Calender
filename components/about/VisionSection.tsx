"use client";

import { motion } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const VISION = [
  "To brand Crescent group of education institutions at the global level by creating a unified academic ecosystem through a structured “School-to-Start-up” continuum, Innovation and Leadership.",
  "To establish Crescent as a globally recognized knowledge, innovation and entrepreneurship ecosystem that develops future-ready leaders, entrepreneurs, researchers and institutions, while creating sustainable global impact through education, technology, industry collaboration and international partnerships.",
];

const viewport = { once: true, margin: "-80px" };

export default function VisionSection() {
  const d = useMobileSpeed();

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(40rem 24rem at 20% 10%, rgba(47,87,166,0.08), transparent 60%), radial-gradient(36rem 22rem at 85% 90%, rgba(13,148,136,0.07), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600"
        >
          Vision
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.06 * d, ease: EASE }}
          className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-crescent-800 sm:text-4xl md:text-5xl"
        >
          Where CGOM is taking the Crescent ecosystem
        </motion.h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {VISION.map((v, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 * d, ease: EASE }}
              whileHover={{
                y: -4,
                boxShadow: "0 24px 48px -16px rgba(15,33,64,0.22)",
              }}
              className="relative flex h-full flex-col overflow-hidden rounded-card border border-slate-200 border-l-4 border-l-crescent-600 bg-white p-7 will-change-transform"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-1 select-none font-serif text-8xl leading-none text-crescent-900/10"
              >
                &ldquo;
              </span>
              <p className="relative mt-6 text-base leading-relaxed text-slate-700">
                {v}
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
