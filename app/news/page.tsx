import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NewsList from "@/components/NewsList";
import { getNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "A unified news stream from across the Crescent ecosystem — announcements, achievements and updates from every institution.",
  alternates: { canonical: "/news" },
};

export const revalidate = 600;

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <PageHeader
        eyebrow="Across the Network"
        title="News & Events"
        description="One place for updates from every Crescent institution. For event dates and coordination, see the Central Calendar."
      />
      <div className="container-page py-14">
        <NewsList items={news} />
      </div>
    </>
  );
}
