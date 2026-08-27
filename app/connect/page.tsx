import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EarlyAccessForm from "@/components/EarlyAccessForm";

export const metadata: Metadata = {
  title: "Crescent Connect",
  description:
    "A secure network — coming soon — linking students, alumni, faculty, management, parents, entrepreneurs and well-wishers across the Crescent ecosystem.",
  alternates: { canonical: "/connect" },
};

const groups = [
  { title: "Students", body: "Find mentors, internships and events across every campus." },
  { title: "Alumni", body: "Reconnect, form chapters, mentor students and hire from the network." },
  { title: "Faculty", body: "Collaborate on research, curriculum and shared programmes." },
  { title: "Management", body: "Coordinate strategy and resources across institutions." },
  { title: "Parents", body: "Stay informed and involved in the wider Crescent community." },
  { title: "Entrepreneurs", body: "Partner with CIIC, recruit talent and back student ventures." },
  { title: "Well-wishers", body: "Support scholarships, welfare and outreach initiatives." },
];

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Phase 2 · Coming Soon"
        title="Crescent Connect"
        description="The people layer of the ecosystem — a single, secure network where the whole Crescent family can find and help one another."
      />

      <div className="container-page py-14">
        <div className="rounded-card border border-crescent-200 bg-crescent-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-crescent-800">
            Be the first to know
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Crescent Connect is in design. Register your email and role and
            we&apos;ll invite you when early access opens.
          </p>
          <div className="mt-5">
            <EarlyAccessForm />
          </div>
        </div>

        <h2 className="mt-14 text-xl font-bold text-crescent-800">
          Who it&apos;s for
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <li
              key={g.title}
              className="rounded-card border border-slate-200 bg-white p-5"
            >
              <h3 className="text-base font-semibold text-crescent-800">
                {g.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {g.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-card bg-slate-50 p-6 text-sm leading-relaxed text-slate-600">
          <h2 className="text-base font-semibold text-crescent-800">
            The vision
          </h2>
          <p className="mt-2">
            Every Crescent institution already has its own community. Crescent
            Connect links those communities without replacing them — a directory,
            a mentoring layer and a coordination space, with privacy and consent
            built in from the start. It is being developed under the Crescent
            Global Outreach Mission (CGOM).
          </p>
        </div>
      </div>
    </>
  );
}
