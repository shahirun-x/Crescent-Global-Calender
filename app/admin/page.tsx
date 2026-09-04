import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminDashboard() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell email={admin.email}>
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Welcome back. Use the sidebar to manage content.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card href="/admin/events" label="Events" desc="Add, edit, or remove calendar events" />
        <Card href="/admin/news" label="News" desc="Publish and manage news articles" />
        <Card href="/admin/institutions" label="Institutions" desc="Edit institution details" />
        <Card href="/admin/contacts" label="Contact Messages" desc="View and manage contact form submissions" />
        <Card href="/admin/signups" label="Connect Signups" desc="View early-access registrations" />
      </div>
    </AdminShell>
  );
}

function Card({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <a
      href={href}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2 className="font-semibold text-slate-800">{label}</h2>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
    </a>
  );
}
