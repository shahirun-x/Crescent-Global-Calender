"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, useMobileSpeed } from "./motion";
import PipelineFlow from "./PipelineFlow";

const viewport = { once: true, margin: "-80px" };

function ChipRow({
  label,
  items,
  pulse = false,
}: {
  label?: string;
  items: string[];
  pulse?: boolean;
}) {
  const d = useMobileSpeed();
  return (
    <div>
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.25, delay: i * 0.05 * d, ease: EASE }}
            className={`relative inline-flex items-center rounded-full px-3 py-1 text-xs ${
              pulse
                ? "bg-accent-500/10 font-semibold text-accent-600"
                : "bg-crescent-50 font-medium text-crescent-700"
            }`}
          >
            {pulse && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(215,38,61,0)",
                    "0 0 0 6px rgba(215,38,61,0.16)",
                    "0 0 0 0 rgba(215,38,61,0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            )}
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function StreamPanel({
  index,
  title,
  accent,
  children,
}: {
  index: number;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  const d = useMobileSpeed();
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`overflow-hidden rounded-card border border-slate-200 border-t-4 bg-white will-change-transform ${accent}`}
    >
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1 * d, ease: EASE }}
        className="flex items-start gap-4 border-b border-slate-100 bg-gradient-to-br from-crescent-50 to-white p-6"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-crescent-700 text-sm font-bold text-white">
          {index}
        </span>
        <h3 className="text-lg font-bold leading-snug text-crescent-800 sm:text-xl">
          {title}
        </h3>
      </motion.header>
      <div className="space-y-6 p-6">{children}</div>
    </motion.article>
  );
}

const STREAM3 = [
  { label: "Mobility", icon: "🚗" },
  { label: "MedTech", icon: "🏥" },
  { label: "HealthTech", icon: "💊" },
  { label: "Biotechnology", icon: "🧬" },
  { label: "Life Sciences", icon: "🔬" },
  { label: "Advanced Engineering & Mobility Technologies", icon: "⚙️" },
];

export default function StrategicStreamsSection() {
  const d = useMobileSpeed();

  return (
    <section
      id="strategic-streams"
      className="scroll-mt-24 bg-white py-24 md:py-32"
    >
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600"
        >
          Three Strategic Streams
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.06 * d, ease: EASE }}
          className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-crescent-800 sm:text-4xl md:text-5xl"
        >
          How the ecosystem delivers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, delay: 0.12 * d, ease: EASE }}
          className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-slate-600"
        >
          Three coordinated streams turn the vision into structures, programmes
          and partnerships — anchored by the School-to-Start-up pipeline.
        </motion.p>

        <div className="mt-12 space-y-6">
          <StreamPanel
            index={1}
            accent="border-t-blue-600"
            title="Global Centre of Excellence — Entrepreneurship, Innovation & Acceleration"
          >
            <ChipRow
              label="Focus areas"
              items={[
                "Entrepreneurial Development",
                "Innovation & Incubation",
                "Global Acceleration",
                "Executive & Leadership Development",
                "Built Environment",
                "Applied R&D",
                "Industry–Academia Collaboration",
                "Global Technology & Investment Partnerships",
              ]}
            />
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7">
              <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
                The School-to-Start-up pipeline
              </p>
              <PipelineFlow />
            </div>
          </StreamPanel>

          <StreamPanel
            index={2}
            accent="border-t-teal-500"
            title="Human Resource Development & Management"
          >
            <ChipRow
              label="Human Resource Development (HRD)"
              items={[
                "Executive Education",
                "Professional Training",
                "Skill Enrichment",
                "Upskilling & Reskilling",
                "Leadership Development",
                "Industry-oriented Certification",
                "Global Workforce Development",
              ]}
            />
            <ChipRow
              label="Priority technology areas"
              pulse
              items={[
                "AI",
                "Cybersecurity",
                "Blockchain",
                "ML & Deep Learning",
                "Data & Digital Technologies",
                "Emerging Technologies",
              ]}
            />
            <ChipRow
              label="Human Resource Management System (HRMS)"
              items={[
                "Talent Acquisition",
                "Workforce Planning",
                "Learning & Development",
                "Performance Management",
                "Leadership Development",
                "HR Analytics",
                "Organizational Development",
                "Employee Engagement",
                "HR Technology & Digital Transformation",
                "International Talent Mobility",
              ]}
            />
          </StreamPanel>

          <StreamPanel
            index={3}
            accent="border-t-violet-500"
            title="Mobility, Advanced Technology & Life Sciences"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {STREAM3.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 * d, ease: EASE }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-white p-4 text-sm font-semibold text-crescent-800 transition-colors duration-200 will-change-transform hover:from-violet-50 hover:to-white"
                >
                  <span aria-hidden className="text-xl">
                    {v.icon}
                  </span>
                  {v.label}
                </motion.div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Establishing partnerships among universities, technology companies,
              governments, investors and research institutions to accelerate
              innovation and commercialization in emerging sectors.
            </p>
          </StreamPanel>
        </div>
      </div>
    </section>
  );
}
