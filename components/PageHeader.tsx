import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="container-page py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-crescent-800 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
