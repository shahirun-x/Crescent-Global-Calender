import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import EventsManager from "./EventsManager";

export default async function AdminEventsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell email={admin.email}>
      <EventsManager />
    </AdminShell>
  );
}
