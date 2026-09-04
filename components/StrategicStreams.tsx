import Reveal from "./Reveal";
import Pipeline from "./Pipeline";

function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={
        tone === "accent"
          ? "inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600"
          : "inline-flex items-center rounded-full bg-crescent-50 px-3 py-1 text-xs font-medium text-crescent-700"
      }
    >
      {children}
    </span>
  );
}

function ChipRow({
  label,
  items,
  tone,
}: {
  label?: string;
  items: string[];
  tone?: "default" | "accent";
}) {
  return (
    <div>
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <Chip key={i} tone={tone}>
            {i}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function StreamPanel({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="scroll-mt-24">
      <article className="overflow-hidden rounded-card border border-slate-200 bg-white">
        <header className="flex items-start gap-4 border-b border-slate-100 bg-gradient-to-br from-crescent-50 to-white p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-crescent-700 text-sm font-bold text-white">
            {index}
          </span>
          <h3 className="text-lg font-bold leading-snug text-crescent-800 sm:text-xl">
            {title}
          </h3>
        </header>
        <div className="space-y-6 p-6">{children}</div>
      </article>
    </Reveal>
  );
}

export default function StrategicStreams() {
  return (
    <div className="space-y-6">
      <StreamPanel
        index={1}
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
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            The pipeline
          </p>
          <Pipeline />
        </div>
      </StreamPanel>

      <StreamPanel index={2} title="Human Resource Development & Management">
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
          tone="accent"
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
        title="Mobility, Advanced Technology & Life Sciences"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Mobility",
            "MedTech",
            "HealthTech",
            "Biotechnology",
            "Life Sciences",
            "Advanced Engineering & Mobility Technologies",
          ].map((v) => (
            <div
              key={v}
              className="rounded-xl border border-slate-200 bg-gradient-to-br from-crescent-50/70 to-white p-4 text-sm font-semibold text-crescent-800"
            >
              {v}
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Establishing partnerships among universities, technology companies,
          governments, investors and research institutions to accelerate
          innovation and commercialization in emerging sectors.
        </p>
      </StreamPanel>
    </div>
  );
}
