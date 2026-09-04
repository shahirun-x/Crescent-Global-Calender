import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import InstitutionsManager from "./InstitutionsManager";

export default async function AdminInstitutionsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell email={admin.email}>
      <InstitutionsManager />
    </AdminShell>
  );
}
