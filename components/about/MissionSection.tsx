"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";

const OPENING =
  "To build an integrated global ecosystem that connects academia, government, industry, investors, entrepreneurs, researchers and international institutions to transform knowledge, talent and innovation into measurable economic, social and institutional impact.";

const POINTS: { lead: string; body: string }[] = [
  {
    lead: "Create a unified academic and innovation ecosystem",
    body: "A single “School-to-Start-up” continuum linking every Crescent institution from classroom to venture.",
  },
  {
    lead: "Develop future-ready human capital",
    body: "Executive education, upskilling and reskilling that keep talent ready for a changing global economy.",
  },
  {
    lead: "Build cross-institutional research and innovation capabilities",
    body: "Shared research strength across schools, colleges and the university — greater than the sum of its parts.",
  },
  {
    lead: "Create Shared Centres of Excellence",
    body: "Common facilities, labs and expertise that any institution in the network can draw on.",
  },
  {
    lead: "Develop a common innovation pipeline",
    body: "One route from idea to incubation to acceleration to commercialization.",
  },
  {
    lead: "Strengthen Industrial–Academic Collaboration",
    body: "Structured partnerships between Crescent and industry for research, training and placement.",
  },
  {
    lead: "Position alumni as a strategic global asset",
    body: "A worldwide alumni network mobilised for mentoring, investment, hiring and partnerships.",
  },
  {
    lead: "Create international pathways and partnerships",
    body: "Global mobility for students and faculty through partner universities and institutions.",
  },
  {
    lead: "Develop sustainable commercial opportunities",
    body: "Intellectual property, spin-offs and services that generate lasting economic value.",
  },
  {
    lead: "Build a globally recognized institutional brand",
    body: "From Learning to Leadership. From Knowledge to Innovation.",
  },
];

const viewport = { once: true, margin: "-80px" };

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 700;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(n).padStart(2, "0")}
    </span>
  );
}

export default function MissionSection() {
  const d = useMobileSpeed();

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24 md:py-32">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600"
        >
          Mission
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.06 * d, ease: EASE }}
          className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-crescent-800 sm:text-4xl md:text-5xl"
        >
          An integrated global ecosystem
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, delay: 0.12 * d, ease: EASE }}
          className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-slate-600"
        >
          {OPENING}
        </motion.p>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.lead}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.06 * d, 0.4),
                ease: EASE,
              }}
              whileHover={{ scale: 1.02 }}
              className={`group flex h-full gap-4 rounded-card border border-slate-200 border-l-4 border-l-transparent p-5 transition-colors duration-200 will-change-transform hover:border-l-crescent-600 ${
                i % 2 ? "bg-slate-50/70" : "bg-white"
              }`}
            >
              <span className="text-3xl font-bold leading-none text-crescent-600">
                <CountUp to={i + 1} />
              </span>
              <div>
                <h3 className="text-sm font-bold leading-snug text-crescent-800">
                  {p.lead}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
