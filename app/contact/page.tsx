import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Crescent Global Outreach Mission — for coordination, partnerships, alumni chapters and portal feedback.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Crescent Global"
        description="For coordination between institutions, partnerships, alumni chapters or feedback on this portal."
      />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-card border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-crescent-800">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            We usually reply within a few working days.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6 text-sm">
          <div className="rounded-card bg-slate-50 p-6">
            <h2 className="text-base font-semibold text-crescent-800">
              Crescent Global Outreach Mission
            </h2>
            <p className="mt-2 leading-relaxed text-slate-600">
              Crescent Campus, GST Road, Vandalur,
              <br />
              Chennai 600048, Tamil Nadu, India
            </p>
          </div>
          <div className="rounded-card bg-slate-50 p-6">
            <h2 className="text-base font-semibold text-crescent-800">Email</h2>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-2 inline-block font-medium text-crescent-600 hover:text-crescent-800"
            >
              {site.contactEmail}
            </a>
          </div>
          <div className="rounded-card bg-slate-50 p-6">
            <h2 className="text-base font-semibold text-crescent-800">
              Looking for a specific institution?
            </h2>
            <p className="mt-2 leading-relaxed text-slate-600">
              Each institution runs its own admissions and enquiries. Find direct
              links on the{" "}
              <a href="/institutions" className="font-medium text-crescent-600 hover:text-crescent-800">
                Institutions
              </a>{" "}
              page.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
