"use client";

import { motion } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const PHRASES = [
  "One Ecosystem,",
  "Multiple Pathways,",
  "Shared Knowledge,",
  "Collective Innovation,",
  "Global Impact.",
];

const viewport = { once: true, margin: "-80px" };

export default function PhilosophySection() {
  const d = useMobileSpeed();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-crescent-800 to-crescent-950 py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="container-page relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-crescent-300"
        >
          Strategic Philosophy
        </motion.p>

        <motion.p
          className="mt-6 flex max-w-4xl flex-wrap gap-x-3 gap-y-1 text-balance text-3xl font-bold leading-snug md:text-4xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.35 * d } },
          }}
        >
          {PHRASES.map((ph) => (
            <motion.span
              key={ph}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {ph}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{
            duration: 0.6,
            delay: (PHRASES.length * 0.35 + 0.3) * d,
            ease: EASE,
          }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-crescent-100"
        >
          This approach enables Crescent to move beyond a conventional education
          model towards an integrated ecosystem where education, entrepreneurship,
          research, innovation, industry and global engagement reinforce one
          another.
        </motion.p>
      </div>
    </section>
  );
}
