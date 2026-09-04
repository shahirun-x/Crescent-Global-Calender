import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import MissionGrid from "@/components/MissionGrid";
import StrategicStreams from "@/components/StrategicStreams";
import Timeline from "@/components/Timeline";
import { getTimeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "About CGOM",
  description:
    "The Crescent Global Outreach Mission (CGOM) — vision, mission, three strategic streams and the School-to-Start-up continuum that unifies the Crescent ecosystem.",
  alternates: { canonical: "/about" },
};

export const revalidate = 86400;

const TAGLINE = [
  "From School to Start-up.",
  "From Learning to Leadership.",
  "From Knowledge to Innovation.",
  "From Crescent to the World.",
];

const VISION = [
  "To brand Crescent group of education institutions at the global level by creating a unified academic ecosystem through a structured “School-to-Start-up” continuum, Innovation and Leadership.",
  "To establish Crescent as a globally recognized knowledge, innovation and entrepreneurship ecosystem that develops future-ready leaders, entrepreneurs, researchers and institutions, while creating sustainable global impact through education, technology, industry collaboration and international partnerships.",
];

export default async function AboutPage() {
  const timeline = await getTimeline();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-crescent-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(50rem 26rem at 12% -10%, rgba(255,255,255,0.22), transparent), radial-gradient(38rem 22rem at 108% 20%, rgba(215,38,61,0.35), transparent)",
          }}
        />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crescent-300">
            About · Crescent Global Outreach Mission
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
            {TAGLINE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-lg font-semibold text-crescent-200">
            Crescent Global Outreach Mission (CGOM)
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Vision"
          title="Where CGOM is taking the Crescent ecosystem"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {VISION.map((v, i) => (
            <Reveal key={i} as="article" delay={i * 0.08}>
              <blockquote className="flex h-full flex-col rounded-card border border-slate-200 bg-gradient-to-br from-crescent-50 to-white p-6">
                <span className="text-3xl font-bold leading-none text-crescent-300">
                  “
                </span>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {v}
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Mission"
            title="An integrated global ecosystem"
            description="To build an integrated global ecosystem that connects academia, government, industry, investors, entrepreneurs, researchers and international institutions to transform knowledge, talent and innovation into measurable economic, social and institutional impact."
          />
          <MissionGrid />
        </div>
      </section>

      {/* Three Strategic Streams */}
      <section id="strategic-streams" className="container-page scroll-mt-24 py-20">
        <SectionHeading
          eyebrow="Three Strategic Streams"
          title="How the ecosystem delivers"
          description="Three coordinated streams turn the vision into structures, programmes and partnerships — anchored by the School-to-Start-up pipeline."
        />
        <div className="mt-10">
          <StrategicStreams />
        </div>
      </section>

      {/* Strategic Philosophy */}
      <section className="bg-gradient-to-br from-crescent-700 to-crescent-900 py-20 text-white">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crescent-300">
            Strategic Philosophy
          </p>
          <p className="mt-4 max-w-3xl text-balance text-2xl font-bold leading-snug sm:text-3xl">
            One Ecosystem, Multiple Pathways, Shared Knowledge, Collective
            Innovation, Global Impact.
          </p>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-crescent-100">
            This approach enables Crescent to move beyond a conventional education
            model towards an integrated ecosystem where education,
            entrepreneurship, research, innovation, industry and global
            engagement reinforce one another.
          </p>
        </div>
      </section>

      {/* Strategic Outcome */}
      <section className="container-page py-20">
        <SectionHeading eyebrow="Strategic Outcome" title="The ultimate objective" />
        <Reveal>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-slate-700">
            The ultimate objective is to establish Crescent as a globally
            connected institution and knowledge ecosystem, capable of producing
            talent, creating intellectual property, nurturing entrepreneurs,
            developing industry partnerships, attracting global opportunities and
            generating sustainable economic and social impact.
          </p>
        </Reveal>
      </section>

      {/* Closing tagline */}
      <section className="bg-crescent-950 py-24 text-center text-white">
        <div className="container-page">
          <p className="mx-auto max-w-2xl text-balance text-2xl font-extrabold leading-[1.35] sm:text-3xl lg:text-4xl">
            {TAGLINE.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="border-t border-slate-200 bg-slate-50 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Journey"
            title="From one school in 1968 to a global network"
            description="Five decades of steady growth across Tamil Nadu — and, through its alumni, around the world."
          />
          <div className="mt-10 max-w-3xl">
            <Timeline entries={timeline} />
          </div>
        </div>
      </section>
    </>
  );
}
