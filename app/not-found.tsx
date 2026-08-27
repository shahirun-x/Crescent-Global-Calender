import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-crescent-800 sm:text-4xl">
        This page isn&apos;t part of the network
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you&apos;re looking for may have moved. Try the Central Calendar
        or the Institutions directory.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-crescent-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-crescent-800"
        >
          Back home
        </Link>
        <Link
          href="/institutions"
          className="rounded-full border border-crescent-300 px-5 py-2.5 text-sm font-semibold text-crescent-700 hover:bg-crescent-50"
        >
          Browse institutions
        </Link>
      </div>
    </section>
  );
}
