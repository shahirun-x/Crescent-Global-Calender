import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import SignupsViewer from "./SignupsViewer";

export default async function AdminSignupsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell email={admin.email}>
      <SignupsViewer />
    </AdminShell>
  );
}
