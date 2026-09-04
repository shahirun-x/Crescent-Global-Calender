import Reveal from "./Reveal";

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

export default function MissionGrid() {
  return (
    <ol className="mt-10 grid gap-4 sm:grid-cols-2">
      {POINTS.map((p, i) => (
        <Reveal key={p.lead} as="li" delay={Math.min(i * 0.04, 0.3)}>
          <div className="flex h-full gap-4 rounded-card border border-slate-200 bg-white p-5">
            <span className="text-lg font-bold tabular-nums text-accent-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-sm font-bold leading-snug text-crescent-800">
                {p.lead}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {p.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
