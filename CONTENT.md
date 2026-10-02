# Content provenance — 2 October 2026

Read SecondBrain first, then cross-check dated records against the local repositories. Source code, documented test results, deployed availability, and release readiness are separate claims.

| Project | Reviewed code baseline | Primary evidence | Delivery boundary |
| --- | --- | --- | --- |
| BirdieBuddy | master, 38b5608 | docs/current-status.md, docs/testing.md, docs/mobile-api.md, docs/ios-release.md; PR #15 CI on 1 Oct | User-confirmed Render web beta; committed SwiftUI client. No current deployed-revision match or TestFlight/device certification. |
| 꼭 / kkok | web main 574af2e; iOS branch 18b341f | docs/implementation-status.md, docs/production-verification.md on 2 Oct, docs/ios-beta.md at 18b341f | HTTPS web MVP; account-based Korean UI. Development-signed iPhone launch and user-confirmed sign-in/card display are recorded, not a TestFlight release. |
| Noye | codex/mvp-end-to-end, a63dfb3; Phase 6 main baseline e8dfa91 | MVP_VALIDATION_2026-09-26.md, NOYE_DEVELOPMENT_PLAN.md, SecondBrain current snapshot | Local Next.js/FastAPI web MVP. No hosted demo or Tauri package. |
| The Thirteenth Disciple | main, 485a712 in SecondBrain's 30 Sept snapshot | docs/RECOVERY_MILESTONE.md and SecondBrain project/source notes | Supporting playable prototype; playtest, audio, and visual approval remain open. |

## Verification boundaries

- BirdieBuddy: 27 native tests (23 behavioral and four layout), four required CI jobs green on 1 Oct. Recorded local web results are 25 browser-unit and five mobile-fixture checks. Native anonymous verification/reset CSRF remains a documented gap.
- 꼭: 85 unit tests, four web E2E flows, 41 two-account production integration checks recorded on 2 Oct. Real web signup/recovery emails are user-confirmed; automated checks sent none. A later same-day iOS commit records iPhone 13 mini development build/install/launch and user-confirmed sign-in/card display; photos, email return, sharing, and restart flows remain unverified. Manual cleanup passed; sustained scheduling is unverified. These repository records supersede SecondBrain's older HTTPS/SMTP/cleanup/device-pending summary.
- Noye: 507 backend passes with intentional unavailable-service skips and 127 frontend passes. Full live run: 524 passes, two embedding timeouts; the exact two passed on isolated rerun after unloading generation. Do not describe this as one green full live run. Printed PDF and visible citation landing remain unverified.
- Music Webapp: 87 passes belong to the 11 Sept historical revision, not a current rerun.

These project tests were read from dated records, not rerun as part of the portfolio refresh. Portfolio unit, lint, build, and browser tests are separate release checks.

Portfolio E2E owns a separate production server on port 3105, avoiding unrelated apps on 3000. Responsive checks assert actual reveal opacity and reduced-motion transforms, not merely DOM presence; a no-JavaScript check protects the core index as well.

## Media and access

- BirdieBuddy's existing images are earlier web-beta captures, not native or latest-release evidence.
- 꼭 images come from docs/screenshots/ios-preview-home.png and navy-home-desktop.jpg. Both use local sample/demo content. They do not establish physical-device behavior or real-user adoption.
- Noye uses an explicitly labelled repository-derived architecture map because no verified current product capture is available.
- Never publish shared login credentials or claim a seeded account exists on either production app.
- Noye's unauthenticated API is local-only; do not recommend exposing it publicly.
- Local uncommitted BirdieBuddy localization/device material is excluded from committed-product claims. 꼭's latest mobile configuration/dependency preparation and device documentation are committed on its iOS branch, not the web main baseline; secrets and generated native build files remain excluded.

SecondBrain is described as a source/decision workflow, not a standalone portfolio product. No private vault contents or local credentials are published.
