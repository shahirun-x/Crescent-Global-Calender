const styles: Record<string, string> = {
  education: "bg-crescent-100 text-crescent-700",
  healthcare: "bg-emerald-100 text-emerald-700",
  community: "bg-amber-100 text-amber-800",
  innovation: "bg-violet-100 text-violet-700",
};

export default function CategoryBadge({ category }: { category: string }) {
  const key = category.toLowerCase();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        styles[key] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {category}
    </span>
  );
}
