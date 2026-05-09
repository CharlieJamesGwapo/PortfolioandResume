# Portfolio & Resume Builder

AI-generated portfolio site + resume from a short form. Built with Next.js 15 and Claude.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Claude (Opus 4.7)** via `@anthropic-ai/sdk` with structured outputs
- **PayMongo** placeholder (paid tiers later)

## Setup

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open <http://localhost:3000>.

## How it works

1. User fills out a short form (`/builder`).
2. Form posts to `/api/generate`.
3. The route calls Claude with a JSON schema (`output_config.format`) so
   we always get back well-structured portfolio data.
4. Two views render the result:
   - `PortfolioPreview` — full portfolio site layout
   - `ResumePreview` — clean, ATS-friendly, print-ready

Hit "Print / PDF" in the builder to export the resume via the browser's
print dialog.

## Project layout

```
app/
  page.tsx              # landing page
  builder/page.tsx      # form + preview
  api/generate/route.ts # Claude API call
components/
  PortfolioForm.tsx
  PortfolioPreview.tsx
  ResumePreview.tsx
lib/
  types.ts
  schema.ts             # JSON Schema for structured outputs
```

## Adding PayMongo

Currently free / unlimited. To add paid tiers:

1. Get keys from <https://dashboard.paymongo.com>.
2. Add `PAYMONGO_SECRET_KEY` / `PAYMONGO_PUBLIC_KEY` to `.env.local`.
3. Add an `app/api/checkout/route.ts` that creates a PayMongo Checkout
   Session and returns the URL.
4. Gate the `/api/generate` call behind a "has paid / has free credits"
   check. The placeholder is in `app/builder/page.tsx`.

## Deploy

Drop into Vercel, set `ANTHROPIC_API_KEY` in environment variables, deploy.
