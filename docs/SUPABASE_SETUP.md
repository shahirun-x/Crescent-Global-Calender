# Supabase Production Setup

Step-by-step guide to connect Crescent Global to a live Supabase backend.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New Project**.
3. Choose your organization, give the project a name (e.g. `crescent-global`), set a strong database password, and pick the region closest to your users.
4. Wait for the project to finish provisioning (~2 minutes).

## 2. Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open `supabase/schema.sql` from this repo, copy its entire contents, paste into the editor, and click **Run**.
   - This creates the five core tables (`institutions`, `events`, `news`, `contacts`, `connect_signups`) with Row Level Security policies that allow public read access.

## 3. Seed the Database

1. Still in the SQL Editor, create another new query.
2. Open `supabase/seed.sql` from this repo, copy its entire contents, paste into the editor, and click **Run**.
   - This populates 16 institutions, 10 events, 6 news items, and timeline entries so the site has content immediately.

## 4. Run the Admin Migration

1. Create another new query in the SQL Editor.
2. Open `supabase/migration-admin.sql` from this repo, copy its entire contents, paste into the editor, and click **Run**.
   - This adds `is_read` to the contacts table, `name` and `updated_at` columns to connect_signups, `updated_at` triggers on all tables, and RLS policies that allow authenticated admin users to insert, update, and delete content.

## 5. Create an Admin User

1. In the Supabase dashboard, go to **Authentication** (left sidebar).
2. Click the **Users** tab.
3. Click **Add user** → **Create new user**.
4. Enter the admin email and a strong password. Check **Auto Confirm User**.
5. Click **Create user**.

> There is no public signup — admin users can only be created manually through the Supabase dashboard.

## 6. Set Environment Variables in Vercel

In your [Vercel dashboard](https://vercel.com), go to your project → **Settings** → **Environment Variables** and add:

| Variable | Where to Find It | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → **Project URL** | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → **anon / public** key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → **service_role** key (secret — never expose client-side) | Yes |
| `REVALIDATION_SECRET` | Generate any random string (e.g. `openssl rand -hex 32`) — used to authenticate ISR cache-busting requests | Yes |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) if you want email notifications on contact form submissions | No |

> **Security note:** `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. It is only used in server-side code (API routes and middleware) and must never be prefixed with `NEXT_PUBLIC_`.

## 7. Redeploy

Trigger a new deployment in Vercel so the app picks up the new environment variables:

1. Go to your project in the Vercel dashboard.
2. Click **Deployments** → find the latest deployment → click the three-dot menu → **Redeploy**.

Alternatively, push any commit to trigger an automatic deploy.

## 8. Verify

1. Visit `https://your-domain.com/admin/login`.
2. Sign in with the admin email and password you created in step 5.
3. You should see the admin dashboard with links to Events, News, Institutions, Contacts, and Signups.
4. Try creating a test event — it should appear on the public calendar after the page revalidates.
5. Visit the public site and confirm it now loads data from Supabase instead of showing seed-data fallback warnings in the server logs.

---

## Troubleshooting

**"DB not configured" errors in admin pages**
The `SUPABASE_SERVICE_ROLE_KEY` environment variable is missing or incorrect. Double-check it in Vercel settings and redeploy.

**Redirect loop on /admin/login**
The middleware can't verify the access token. Make sure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are both set correctly.

**Data still showing seed fallback**
The `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` variables are missing. These are used by the public data layer. Add them and redeploy.

**Contact form not sending email notifications**
The `RESEND_API_KEY` variable is optional. If set, contact form submissions will trigger an email to `connect@crescentglobal.org`. Make sure the sending domain (`crescentglobal.org`) is verified in your Resend account.
