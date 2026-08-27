"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  // Lightweight parallax — the background image drifts as the page scrolls.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section className="relative overflow-hidden bg-crescent-900 text-white">
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute inset-x-0 -top-24 h-[calc(100%+12rem)]"
      >
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Dim the photo so white text stays readable */}
      <div aria-hidden className="absolute inset-0 bg-crescent-900/80" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(60rem 30rem at 15% -10%, rgba(255,255,255,0.25), transparent), radial-gradient(40rem 24rem at 110% 20%, rgba(215,38,61,0.35), transparent)",
        }}
      />
      <div className="container-page relative z-10 grid gap-10 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
            The Crescent ecosystem, unified
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            One Crescent.
            <br />
            One Community.
            <br />
            <span className="text-crescent-200">One Global Network.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-crescent-100">
            A single portal that connects the schools, colleges, university,
            hospitals and community initiatives of the Crescent family — helping
            channel their collective efforts for the betterment of the alma
            mater.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/institutions"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-crescent-800 transition-colors hover:bg-crescent-50"
            >
              Explore Institutions
            </Link>
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Central Calendar
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4 text-sm">
          {[
            { k: "1967", v: "Founded in Chennai" },
            { k: "15+", v: "Institutions in the network" },
            { k: "5", v: "Ecosystem pillars" },
            { k: "Global", v: "Alumni across continents" },
          ].map((s) => (
            <li
              key={s.v}
              className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold">{s.k}</p>
              <p className="mt-1 text-crescent-100">{s.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
