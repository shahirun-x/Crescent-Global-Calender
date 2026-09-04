import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { getTimeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "About & Our Journey",
  description:
    "The story, vision and mission of Crescent Global — and a note on the Crescent Global Outreach Mission (CGOM).",
  alternates: { canonical: "/about" },
};

export const revalidate = 86400;

export default async function AboutPage() {
  const timeline = await getTimeline();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="One family of institutions, one shared purpose"
        description="Crescent Global is a unified digital portal that supplements — it does not replace — the individual websites of institutions in the Crescent ecosystem."
      />

      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <section className="rounded-card border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-crescent-800">Our vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A connected Crescent — where a student, teacher or alumnus at any
              one institution can draw on the strength of the whole network, and
              where the collective effort of the family is channelled toward the
              betterment of the alma mater.
            </p>
          </section>
          <section className="rounded-card border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-crescent-800">Our mission</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
              <li>• Act as a glossary and guide to every Crescent institution.</li>
              <li>• Run a Central Calendar so events coordinate and don&apos;t clash.</li>
              <li>• Carry a unified news stream from across the network.</li>
              <li>• Build Crescent Connect — the secure people layer.</li>
            </ul>
          </section>
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-crescent-800">Our journey</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            From a single residential school in Chennai in 1968 to a network of
            schools, colleges, a university, hospitals and community initiatives
            across Tamil Nadu — and, through its alumni, around the world.
          </p>
          <div className="mt-8 max-w-3xl">
            <Timeline entries={timeline} />
          </div>
        </section>

        <section className="mt-14 rounded-card bg-crescent-700 p-6 text-white sm:p-8">
          <h2 className="text-lg font-semibold">
            Crescent Global Outreach Mission (CGOM)
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-crescent-100">
            CGOM is the coordinating initiative behind this portal. It brings
            together representatives from across the Crescent ecosystem to align
            calendars, share resources, run joint programmes and steward the
            long-term growth of the network. Crescent Global is CGOM&apos;s public
            front door — a supplement to, not a substitute for, each
            institution&apos;s own website and identity.
          </p>
        </section>
      </div>
    </>
  );
}
