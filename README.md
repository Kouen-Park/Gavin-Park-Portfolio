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

The browser suite runs Chromium, Firefox, and WebKit across the home page and all four case studies, including 375, 768, 1024, and 1440px checks. Chromium captures are written to ignored `test-results/` for visual review. In restricted environments, local server/browser execution may require approval.

E2E builds and starts its own production server on port 3105; it never reuses a server from another project. Set `PORTFOLIO_E2E_PORT` to use another free port. Normal `npm run dev` still defaults to port 3000.

## Content rules

Project facts live in `data/projects.ts` and were transcribed from the SecondBrain project inventory and repository records. Claims without verified ownership or product outcome data are intentionally labelled as constraints, fixture data, or open work.

The core index is BirdieBuddy → 꼭 (kkok) → Noye. The Thirteenth Disciple remains a supporting case study; Music Webapp remains coursework. SecondBrain is working-method context, and its old case-study URL redirects to `/#method`.

See [CONTENT.md](CONTENT.md) for the 2 October 2026 source baselines, test-result boundaries, and demo-access limitations. A source-review date does not mean project tests were rerun or a deployment contains that revision.

Set `NEXT_PUBLIC_SITE_URL` (or let Vercel provide `VERCEL_PROJECT_PRODUCTION_URL`) before production deployment so canonical URLs, sitemap, robots, and JSON-LD point at the deployed origin.

BirdieBuddy's documented Render deployment is used as the default live-demo URL. Set `NEXT_PUBLIC_BIRDIEBUDDY_DEMO_URL` to override it for a different verified deployment.
