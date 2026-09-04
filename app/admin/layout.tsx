import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s · Admin · Crescent Global", default: "Admin · Crescent Global" },
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
