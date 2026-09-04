import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import NewsManager from "./NewsManager";

export default async function AdminNewsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell email={admin.email}>
      <NewsManager />
    </AdminShell>
  );
}
