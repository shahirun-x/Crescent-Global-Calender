import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CalendarExplorer from "@/components/CalendarExplorer";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Central Calendar",
  description:
    "One shared calendar across every Crescent institution — coordinate programmes, avoid event clashes and maximise participation.",
  alternates: { canonical: "/calendar" },
};

// Calendar data is time-sensitive — ISR every 10 minutes.
export const revalidate = 600;

export default async function CalendarPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Coordination Layer"
        title="Central Calendar"
        description="A single view of what's happening across the Crescent family. Institutions publish here so events don't clash and every campus can take part."
      />
      <div className="container-page py-14">
        <CalendarExplorer events={events} />
      </div>
    </>
  );
}
