"use client";

import { motion } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const viewport = { once: true, margin: "-80px" };

export default function OutcomeSection() {
  const d = useMobileSpeed();
  const hl = "font-bold text-crescent-700";

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600"
        >
          Strategic Outcome
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.06 * d, ease: EASE }}
          className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-crescent-800 sm:text-4xl md:text-5xl"
        >
          The ultimate objective
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.12 * d, ease: EASE }}
          className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-slate-700"
        >
          The ultimate objective is to establish Crescent as a{" "}
          <span className={hl}>globally connected institution</span> and knowledge
          ecosystem, capable of producing talent, creating{" "}
          <span className={hl}>intellectual property</span>, nurturing
          entrepreneurs, developing industry partnerships, attracting{" "}
          <span className={hl}>global opportunities</span> and generating
          sustainable economic and social impact.
        </motion.p>
      </div>
    </section>
  );
}
