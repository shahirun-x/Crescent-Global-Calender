import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import ContactsViewer from "./ContactsViewer";

export default async function AdminContactsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell email={admin.email}>
      <ContactsViewer />
    </AdminShell>
  );
}
