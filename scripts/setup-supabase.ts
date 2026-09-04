#!/usr/bin/env tsx
/**
 * Supabase setup helper for Crescent Global.
 *
 * Run:  npx tsx scripts/setup-supabase.ts
 *
 * Checks that required environment variables are set and prints instructions
 * for running the SQL files in the Supabase SQL editor.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const REQUIRED_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const OPTIONAL_VARS = [
  "REVALIDATION_SECRET",
  "RESEND_API_KEY",
];

console.log("\n╔══════════════════════════════════════════════════════╗");
console.log("║     Crescent Global — Supabase Setup Helper         ║");
console.log("╚══════════════════════════════════════════════════════╝\n");

// ── Check env vars ──────────────────────────────────────────────
console.log("1. Environment Variables\n");

let allSet = true;
for (const v of REQUIRED_VARS) {
  const val = process.env[v];
  if (val && val.trim()) {
    console.log(`   ✓ ${v} is set`);
  } else {
    console.log(`   ✗ ${v} is MISSING — add it to .env.local`);
    allSet = false;
  }
}

console.log();
for (const v of OPTIONAL_VARS) {
  const val = process.env[v];
  if (val && val.trim()) {
    console.log(`   ✓ ${v} is set (optional)`);
  } else {
    console.log(`   ○ ${v} is not set (optional — feature disabled)`);
  }
}

if (!allSet) {
  console.log(
    "\n   ⚠  Create a .env.local file in the project root with the missing vars."
  );
  console.log("   You can find these values in your Supabase project dashboard:");
  console.log("   → Settings → API → Project URL / anon key / service_role key\n");
}

// ── SQL files ───────────────────────────────────────────────────
console.log("\n2. Database Setup\n");

const sqlFiles = [
  { path: "supabase/schema.sql", desc: "Core schema (tables, indexes, RLS)" },
  { path: "supabase/seed.sql", desc: "Seed data (institutions, events, news)" },
  { path: "supabase/migration-admin.sql", desc: "Admin columns, triggers, admin RLS policies" },
];

for (const { path, desc } of sqlFiles) {
  const full = resolve(process.cwd(), path);
  if (existsSync(full)) {
    const content = readFileSync(full, "utf-8");
    const lines = content.split("\n").length;
    console.log(`   📄 ${path} (${lines} lines)`);
    console.log(`      ${desc}`);
  } else {
    console.log(`   ✗ ${path} — FILE NOT FOUND`);
  }
}

console.log("\n   Run these files in order in your Supabase SQL Editor:");
console.log("   → https://supabase.com/dashboard → your project → SQL Editor\n");
console.log("   Paste each file's content and click 'Run'.\n");

// ── Admin user ──────────────────────────────────────────────────
console.log("3. Create Admin User\n");
console.log("   Go to Supabase Dashboard → Authentication → Users → Add User");
console.log("   Create a user with email + password.");
console.log("   This user can log in at /admin/login.\n");

// ── Vercel env vars ─────────────────────────────────────────────
console.log("4. Vercel Deployment\n");
console.log("   Set these environment variables in Vercel project settings:");
for (const v of [...REQUIRED_VARS, ...OPTIONAL_VARS]) {
  console.log(`   → ${v}`);
}
console.log(
  "\n   Also set REVALIDATION_SECRET to a random string for on-demand revalidation.\n"
);

console.log("Done! The site works without Supabase (seed data fallback),");
console.log("but forms and the admin dashboard require it.\n");
