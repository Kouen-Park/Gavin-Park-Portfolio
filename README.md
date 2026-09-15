# Gavin Park Portfolio

An evidence-led English portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, Motion, Anime.js, Kokonut UI, and Bklit’s line-chart registry component.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

The browser suite runs Chromium, Firefox, and WebKit at the key route widths. In restricted environments where binding a local server is blocked, the static build and unit checks remain runnable without escalation.

## Content rules

Project facts live in `data/projects.ts` and were transcribed from the SecondBrain project inventory and repository records. Claims without verified ownership or product outcome data are intentionally labelled as constraints, fixture data, or open work.

Set `NEXT_PUBLIC_SITE_URL` (or let Vercel provide `VERCEL_PROJECT_PRODUCTION_URL`) before production deployment so canonical URLs, sitemap, robots, and JSON-LD point at the deployed origin.

BirdieBuddy's documented Render deployment is used as the default live-demo URL. Set `NEXT_PUBLIC_BIRDIEBUDDY_DEMO_URL` to override it for a different verified deployment.
