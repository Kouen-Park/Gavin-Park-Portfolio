export type EvidenceStage = "Problem" | "Decision" | "Implementation" | "Verification" | "Current status";

export interface Evidence {
  stage: EvidenceStage;
  claim: string;
  detail: string;
  source: string;
  sourceUrl?: string;
  verificationDate: string;
}

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  cardSummary?: string;
  outcome: string;
  role: string;
  period: string;
  status: "active beta" | "web MVP · iOS in development" | "local web MVP" | "playable prototype" | "coursework";
  stack: string[];
  accent: string;
  evidence: Evidence[];
  media: Media[];
  links: { label: string; href: string }[];
  constraints: string[];
  decisions: { title: string; detail: string }[];
  limitations: string[];
  featured?: boolean;
  reviewedAt?: string;
  sourceRevision?: string;
  liveDemo?: string;
  demoSteps?: string[];
  demoGuideTitle?: string;
  accessNote?: string;
  systemFlow?: { title: string; detail: string }[];
  proof?: {
    problem: string;
    role: string;
    reliability: string;
    verified: string;
    status: string;
  };
}

const birdieBuddyDemoUrl = process.env.NEXT_PUBLIC_BIRDIEBUDDY_DEMO_URL
  ?? "https://birdiebuddy.onrender.com";
const birdieRepo = "https://github.com/Kouen-Park/BirdieBuddy";
const kkokRepo = "https://github.com/Kouen-Park/kkok";
const noyeRepo = "https://github.com/Kouen-Park/Noye";

// Selection order is intentional. Supporting work stays out of the main index.
export const projects: Project[] = [
  {
    slug: "birdie-buddy",
    title: "BirdieBuddy",
    cardSummary: "A web and iOS golf app for live scoring, round history, and practice insights — built to recover saved scores when connections drop.",
    summary: "A golf platform built around recoverable scoring: a mobile-first web beta and a native SwiftUI client with durable local writes and explicit conflict review.",
    outcome: "A public Render web beta and a committed iOS client. Four CI jobs passed, including 27 native tests; physical-device and TestFlight release gates remain open.",
    role: "Independent full-stack and iOS product engineering",
    period: "2026 — present",
    status: "active beta",
    stack: ["ASP.NET Core 10", "SwiftUI · SwiftData", "PostgreSQL", "EF Core 10", "JavaScript", "XCTest · Playwright"],
    accent: "#1F5B4B",
    featured: true,
    reviewedAt: "2026-10-02",
    sourceRevision: "master · 38b5608",
    evidence: [
      { stage: "Problem", claim: "Keep a live round recoverable when connectivity drops.", detail: "Score entry must survive navigation, app relaunch, account boundaries, and competing server edits without silently losing saved input.", source: "Current app status and architecture guide", sourceUrl: birdieRepo + "/blob/master/docs/current-status.md", verificationDate: "2026-10-01" },
      { stage: "Decision", claim: "Durable local writes; explicit server conflicts.", detail: "PostgreSQL remains authoritative. The browser uses a scoped outbox; iOS persists saved hole revisions and conflicts in SwiftData. Ordered synchronization uses expected snapshots and asks the user to resolve 409 conflicts rather than silently merging.", source: "Architecture and native sync contract", sourceUrl: birdieRepo + "/blob/master/docs/architecture.md", verificationDate: "2026-10-01" },
      { stage: "Implementation", claim: ".NET 10 backend, browser client, native SwiftUI app.", detail: "Feature services separate round queries, live writes, lifecycle, editing, statistics, and practice. Browser cookie/CSRF authentication stays separate from rotating native bearer sessions stored in Keychain; lifecycle events trigger account-scoped synchronization.", source: "Current status and mobile API guide", sourceUrl: birdieRepo + "/blob/master/docs/mobile-api.md", verificationDate: "2026-10-01" },
      { stage: "Verification", claim: "Four CI jobs green, including 27 native tests.", detail: "PR #15 records passing .NET/build, PostgreSQL integration, browser E2E, and iOS jobs on 1 October. Native coverage includes 23 model/session/outbox/journey tests and four Dynamic Type layout tests. The dated status record also reports 25 browser-unit and five mobile-fixture checks. These are engineering checks, not user outcomes.", source: "PR #15 CI and dated current-status record", sourceUrl: birdieRepo + "/actions/runs/36714842015", verificationDate: "2026-10-01" },
      { stage: "Current status", claim: "Web beta available; native release is still gated.", detail: "The reviewed repository is master at 38b5608. Render availability is user-confirmed, but its deployed revision has not been matched to this source baseline. The SwiftUI client is committed and CI-tested, not TestFlight/App Store released.", source: "Repository baseline, SecondBrain, and release guide", sourceUrl: birdieRepo + "/blob/master/docs/ios-release.md", verificationDate: "2026-10-02" },
    ],
    media: [
      { src: "/images/birdie-live.png", alt: "BirdieBuddy browser live-round score entry at a mobile viewport", width: 375, height: 812, caption: "Earlier web-beta repository capture: mobile score entry, not a native iPhone screenshot." },
      { src: "/images/birdie-sync.png", alt: "BirdieBuddy browser round screen with synchronization state", width: 375, height: 812, caption: "Earlier web-beta recovery capture; it does not certify the latest native interface or deployment." },
    ],
    links: [{ label: "View repository", href: birdieRepo }],
    constraints: [
      "Saved hole writes and conflicts must remain isolated by account and round.",
      "Offline reopening requires a previously cached draft and restored account; neither client promises a first launch or a new round fully offline.",
      "Public course discovery must not expose private rounds, practice history, statistics, or account data.",
    ],
    decisions: [
      { title: "A saved write is durable", detail: "Native Save hole, Next hole, and Finish round enqueue input before synchronization. Merely changing a control is not a force-quit recovery guarantee; unresolved local state blocks completion." },
      { title: "Two authentication boundaries", detail: "Browser cookies retain CSRF protection. Native sessions use short-lived opaque access tokens and single-use rotating refresh tokens, with Keychain storage and credential-change invalidation." },
      { title: "Test the real boundaries", detail: "Fast service/HTTP tests do not stand in for PostgreSQL constraints. Separate relational, browser, and native suites cover transactions, recovery, conflicts, account isolation, and large-text layout." },
    ],
    limitations: [
      "Physical iPhone, VoiceOver, current-screen review, TestFlight, and App Store release are not complete.",
      "Native verification/reset requests currently omit server-required CSRF state; this documented contract gap must be resolved before release readiness is claimed.",
      "Native draft abandonment, completed-hole editing, guided practice, and practice-result entry are not yet exposed in the UI.",
      "Production API/email, monitoring, and backup-restore checks remain release work. Green CI does not establish the deployed revision or measured beta-user impact.",
      "The chart below uses deterministic repository fixtures, not observed user performance.",
    ],
    liveDemo: birdieBuddyDemoUrl,
    demoGuideTitle: "Try the public beta in three steps.",
    demoSteps: ["Open the public landing page", "Browse the shared Golf New Zealand course catalogue", "Create an account to try a 9- or 18-hole live round"],
    accessNote: "Course browsing is public. Scoring requires your own account; no shared demo credentials are published. The live web app is separate from the unreleased native client.",
    proof: {
      problem: "Save a round without losing input to offline or conflicting state.",
      role: "Full-stack backend, web, and native iOS engineering",
      reliability: "PostgreSQL authority, scoped browser/SwiftData outboxes, and explicit conflict review.",
      verified: "Four CI jobs passed on 1 Oct; 27 native tests, including four layout checks.",
      status: "Public web beta; committed iOS client, not TestFlight released.",
    },
  },
  {
    slug: "kkok",
    title: "Kkok",
    cardSummary: "A private app for shared goal cards, completion stamps, and photo memories with friends.",
    summary: "An invite-only shared goal-card app: turn little promises into completion stamps and photo memories, while enforcing membership beyond the interface.",
    outcome: "A deployed web MVP with 41 recorded two-account production checks. An iPhone development build now has recorded launch and sign-in evidence; full native journeys and TestFlight remain open.",
    role: "Independent web and mobile product engineering",
    period: "2026 — present",
    status: "web MVP · iOS in development",
    stack: ["Next.js 16 · TypeScript", "Supabase · PostgreSQL", "Expo · React Native", "Private Storage", "Playwright"],
    accent: "#344866",
    reviewedAt: "2026-10-02",
    sourceRevision: "web main · 574af2e; iOS branch · 18b341f",
    evidence: [
      { stage: "Problem", claim: "Shared memories need a genuinely private boundary.", detail: "Small groups need shared cards, invitations, completions, optional photos, and exports. Hiding a card in the UI is not sufficient to protect another group's data.", source: "README and implementation status", sourceUrl: kkokRepo + "/blob/main/README.en.md", verificationDate: "2026-10-02" },
      { stage: "Decision", claim: "Enforce membership in the database and file layer.", detail: "RLS restricts reads; authorized transactional RPCs check membership and ownership for writes. Photos use private Storage and short-lived signed URLs. Row locks and a unique goal-completion constraint protect concurrent actions.", source: "Data/permissions contract and migration tests", sourceUrl: kkokRepo + "/blob/main/README.en.md#data-and-permissions", verificationDate: "2026-10-02" },
      { stage: "Implementation", claim: "Cards, invitations, photos, and share exports.", detail: "The web MVP supports 1–12 goals per card, up to 20 members, completion participants, three optional photos, Canvas PNG export, ownership transfer, and account deletion. Expo shares pure domain rules while keeping native dependencies and session storage separate.", source: "Implementation status and iOS guide", sourceUrl: kkokRepo + "/blob/main/docs/implementation-status.md", verificationDate: "2026-10-02" },
      { stage: "Verification", claim: "41 production checks with disposable accounts.", detail: "The 2 October production record reports invitation, completion, private-photo, PNG, authorization, deletion, and cleanup checks with two temporary accounts. It also records 85 unit tests and four web E2E flows. Real signup/recovery emails were separately confirmed by the user, not sent by automation.", source: "Production verification — 2 October 2026", sourceUrl: kkokRepo + "/blob/main/docs/production-verification.md", verificationDate: "2026-10-02" },
      { stage: "Current status", claim: "Web deployed; iPhone launch/login recorded, not TestFlight.", detail: "The web main baseline is 574af2e. The newer iOS branch at 18b341f records a development-signed build installed and launched on an iPhone 13 mini, with user-confirmed existing-account sign-in and card display. Email callbacks, photos, sharing, restart journeys, release signing, and TestFlight remain separate gates.", source: "Dated physical-device record and iOS release boundary", sourceUrl: kkokRepo + "/blob/18b341f/docs/ios-beta.md", verificationDate: "2026-10-02" },
    ],
    media: [
      { src: "/images/kkok-mobile.png", alt: "Kkok mobile local-demo preview with shared goal cards and sample memories", width: 390, height: 844, caption: "Repository mobile preview with local sample data; not a physical-iPhone or TestFlight capture." },
      { src: "/images/kkok-web.jpg", alt: "Kkok desktop web demo with a shared stamp card, completed goals, and photo memories", width: 1280, height: 1456, caption: "Web MVP repository capture in local-demo mode. Sample cards and photos are not real user activity." },
    ],
    links: [{ label: "View repository", href: kkokRepo }],
    constraints: [
      "Only invited members can read cards and private photos; server/database controls must enforce that rule.",
      "Concurrent completion, photo retries, member removal, and account deletion must preserve ownership and cleanup state.",
      "A failed photo upload must not discard a completed record; offline notices and temporary drafts are not a full offline-sync promise.",
    ],
    decisions: [
      { title: "Permissions below the UI", detail: "Membership comes from database records, not client-editable JWT metadata. RPCs check roles; short-lived photo links acknowledge that already issued URLs cannot be instantly revoked." },
      { title: "Treat photos as a lifecycle", detail: "Validate and re-encode JPEGs, strip metadata, reserve uploads, and retry without duplicates. Deletion uses a grace-period queue cleared only after Storage deletion succeeds." },
      { title: "Verify with two accounts", detail: "Production checks use isolated fixtures for invites, mixed/forged authentication rejection, removed-member access, sharing, and deletion. Manual cleanup execution is separate from long-term scheduled operation." },
    ],
    limitations: [
      "The production UI is Korean and requires a personal account. Local sample mode is not a shared-account production demo.",
      "Development-signed iPhone launch/login is recorded, but photo/HEIC selection, email deep links, sharing, relaunch, release signing, and TestFlight remain unverified.",
      "The first automatic cleanup execution, ongoing monitoring, and alert receipt need separate operational verification.",
      "Kkok is a working title. Pricing, realtime collaboration, and full offline sync remain deferred; no retention or group-adoption metric is claimed.",
      "The iPhone observation applies to a development build on the iOS branch, not a TestFlight release or certification of every native flow.",
    ],
    liveDemo: "https://www.kkokhaja.today",
    demoGuideTitle: "Explore the deployed web MVP.",
    demoSteps: ["Open the Korean-language web app", "Sign up with your own account and confirm your email", "Create a goal card, record a completion, and preview its share image"],
    accessNote: "This is the real account-based web app, not a seeded recruiter sandbox. Local sample mode is available from the repository; native TestFlight access is not available yet.",
    proof: {
      problem: "Make shared goal cards and photo memories private by membership.",
      role: "Product design, full-stack web, and Expo mobile implementation",
      reliability: "RLS, transactional membership checks, private photos, retry-safe uploads, and queued cleanup.",
      verified: "41 two-account production checks recorded on 2 Oct; 85 unit tests and four web E2E flows.",
      status: "Web deployed; iPhone launch/login recorded, full native flows and TestFlight pending.",
    },
  },
  {
    slug: "noye",
    title: "Noye",
    cardSummary: "A local-first AI workspace for searching personal files, asking source-linked questions, and turning answers into reusable documents.",
    summary: "A local-first AI knowledge workspace that turns personal files into searchable passages, source-linked answers, and editable documents without a required cloud AI API.",
    outcome: "A local web MVP with ingestion, semantic search, cited chat, and Markdown documents. Reliability work adds source hashing, atomic migrations, deep index checks, and non-destructive rebuilds.",
    role: "Independent full-stack and retrieval-system engineering",
    period: "2026 — present",
    status: "local web MVP",
    stack: ["Next.js · TypeScript", "FastAPI · Python", "SQLite · Qdrant", "Ollama", "PyMuPDF"],
    accent: "#665A8E",
    reviewedAt: "2026-10-02",
    sourceRevision: "codex/mvp-end-to-end · a63dfb3",
    evidence: [
      { stage: "Problem", claim: "Useful AI answers must lead back to their sources.", detail: "Personal PDFs, Markdown, and text need semantic retrieval and reusable output without losing file/page provenance or requiring uploads to a cloud AI provider.", source: "Development plan and SecondBrain record", sourceUrl: noyeRepo + "/blob/main/NOYE_DEVELOPMENT_PLAN.md", verificationDate: "2026-09-30" },
      { stage: "Decision", claim: "Authoritative originals; rebuildable indexes.", detail: "SQLite stores metadata, Qdrant derived vectors, and Ollama runs local embeddings/generation. File, page, and chunk identities stay attached to passages. Citations map from retrieval records rather than invented model output.", source: "Architecture and provenance contract", sourceUrl: noyeRepo + "/blob/main/README.md#architecture", verificationDate: "2026-09-30" },
      { stage: "Implementation", claim: "Complete the file → answer → document workflow.", detail: "Merged Phases 0–5 deliver ingestion, search, persistent chat, editing, and exports. Phase 6 adds atomic SQLite migrations, SHA-256 integrity, dimension safeguards, deep point checks, and rebuilds that retain the existing collection when compatible.", source: "Phase 6 record and current branch", sourceUrl: noyeRepo + "/blob/main/NOYE_DEVELOPMENT_PLAN.md", verificationDate: "2026-09-30" },
      { stage: "Verification", claim: "Real retrieval tested; live-run timeouts disclosed.", detail: "The 26 September report records 507 backend passes with unavailable-service skips and 127 frontend passes. The full live run had 524 passes and two embedding timeouts; those two passed after unloading the generation model. Isolated citation/document and 20 live-index checks passed, but this is not one fully green live-suite run.", source: "MVP validation — 26 September 2026", sourceUrl: noyeRepo + "/blob/a63dfb3/MVP_VALIDATION_2026-09-26.md", verificationDate: "2026-09-26" },
      { stage: "Current status", claim: "Local web product, not hosted or desktop-packaged.", detail: "The clean reviewed branch is a63dfb3. Phase 6 reliability merged to main at e8dfa91; later verification/startup/navigation fixes are on the current branch. The API is intentionally local and unauthenticated. Tauri packaging is planned.", source: "Repository and dated verification report", sourceUrl: noyeRepo + "/blob/a63dfb3/MVP_VALIDATION_2026-09-26.md", verificationDate: "2026-10-02" },
    ],
    media: [],
    systemFlow: [
      { title: "Original files", detail: "PDF · Markdown · TXT, preserved locally as the source of truth." },
      { title: "Local knowledge engine", detail: "FastAPI extracts passages; SQLite holds metadata; Qdrant stores vectors; Ollama embeds locally." },
      { title: "Source-linked answers", detail: "Retrieved passages ground local generation and retain file/page citations." },
      { title: "Reusable documents", detail: "Generate, edit, save, and export Markdown. Inspect or rebuild the index when it drifts." },
    ],
    links: [{ label: "View repository", href: noyeRepo }, { label: "Local setup guide", href: noyeRepo + "#development" }],
    accessNote: "Run locally with Qdrant and Ollama using the repository setup guide. There is no public hosted demo; do not expose the unauthenticated API on a network interface.",
    constraints: [
      "Original files stay local and authoritative; metadata and vectors must be recoverable derived state.",
      "File/page provenance must survive retrieval, conversation persistence, and generated-document editing.",
      "Unavailable models, changed sources, missing vectors, and dimension changes must be visible instead of silently reported healthy.",
    ],
    decisions: [
      { title: "Provenance is a contract", detail: "Passage records preserve file identity, page numbers, and chunk indexes. Stored citation labels survived synthetic-source deletion in the recorded check, without pretending the deleted original could still be opened." },
      { title: "Repair, not discard", detail: "Compatible rebuilds avoid dropping the collection upfront. Hashes/model metadata expose stale sources; deep checks distinguish missing points from an unreachable index." },
      { title: "Initialize before serving", detail: "A fresh-database WAL/schema race caused concurrent library requests to fail. Lifespan initialization and a startup regression fix the observed single-process case, not every possible multi-process contention." },
    ],
    limitations: [
      "The full live suite is not green in one run under sustained dual-model load; isolated reruns do not erase the recorded timeouts.",
      "Printed PDF output, visible PDF citation landing, and browser-native file chooser behavior need direct verification.",
      "Follow-up rewriting, retrieval-threshold calibration, and chunking measurements remain Phase 6 work. Source links do not prove every answer is correct.",
      "There is no hosted demo or Tauri desktop release, and no complete accessibility or visual-regression audit is claimed.",
    ],
    proof: {
      problem: "Turn local files into reusable knowledge without losing provenance.",
      role: "Frontend, FastAPI ingestion/retrieval, and local data integrity",
      reliability: "Authoritative originals, SHA-256 integrity, atomic migrations, and rebuildable vectors.",
      verified: "Dated live citation/index checks and 127 frontend tests; full live-run timeouts remain disclosed.",
      status: "Local web MVP; reliability refinement ongoing, desktop packaging planned.",
    },
  },
];

export const supportingProjects: Project[] = [
  {
    slug: "the-thirteenth-disciple",
    title: "The Thirteenth Disciple",
    summary: "A six-chapter Godot investigation prototype: reusable chapter systems, save-aware narrative choices, and a boundary between research and authored fiction.",
    outcome: "A playable six-chapter prototype and epilogue with 39 field actions. The recovery/art-validation milestone is committed and pushed; human playtest, audio, and visual sign-off remain open.",
    role: "Game design and development",
    period: "2026",
    status: "playable prototype",
    stack: ["Godot 4.7", "GDScript", "Pixel art", "Narrative systems"],
    accent: "#B36A36",
    reviewedAt: "2026-10-02",
    sourceRevision: "main · 485a712",
    evidence: [
      { stage: "Problem", claim: "Make research explorable without calling fiction history.", detail: "Investigation needs dramatic momentum and a visible boundary between biblical sources and invented connective material.", source: "SecondBrain record and biblical revision", verificationDate: "2026-09-30" },
      { stage: "Decision", claim: "Build a reusable chapter spine.", detail: "Shared chapter definitions, direction, interactions, saves, journal, and pause systems support distinct spaces without repeating core runtime logic.", source: "Godot runtime and recovery record", verificationDate: "2026-09-30" },
      { stage: "Implementation", claim: "Six chapters, 39 field actions, a save-aware epilogue.", detail: "Physical investigations and choices connect the chapter arc; provenance distinguishes researched events from invented characters and interactions.", source: "README and chapter records", verificationDate: "2026-09-30" },
      { stage: "Verification", claim: "Story, save, traversal, and asset checks.", detail: "The recovery milestone reports headless/preflight checks, chapter playthroughs, and nine late-chapter choice paths. These were not rerun in this refresh and do not replace first-time-player testing.", source: "Recovery milestone", sourceUrl: "https://github.com/Kouen-Park/thethirteenthdisciple/blob/main/docs/RECOVERY_MILESTONE.md", verificationDate: "2026-09-30" },
      { stage: "Current status", claim: "Supporting prototype, not a finished release.", detail: "PR #1 merged the recovery/art-validation work into main at 485a712. First-time-player, headphone/speaker, and visual approval gates remain open.", source: "SecondBrain current project snapshot", verificationDate: "2026-09-30" },
    ],
    media: [
      { src: "/images/disciple-world.png", alt: "Pixel-art investigation environment in The Thirteenth Disciple", width: 1600, height: 900, caption: "Earlier prototype capture of an explorable field scene." },
      { src: "/images/disciple-journal.png", alt: "The Thirteenth Disciple journal interface", width: 1600, height: 900, caption: "The journal preserves observations and narrative context." },
      { src: "/images/disciple-cutscene.png", alt: "Pixel-art tomb cutscene in The Thirteenth Disciple", width: 1280, height: 720, caption: "A scene from the six-chapter arc; final visual sign-off remains open." },
    ],
    links: [{ label: "View repository", href: "https://github.com/Kouen-Park/thethirteenthdisciple" }],
    constraints: ["Separate source provenance from invented connective fiction.", "Support the chapter arc with reusable runtime systems.", "Keep investigation, saves, and keyboard navigation understandable."],
    decisions: [
      { title: "Investigation as structure", detail: "Thirty-nine field actions distribute discoveries across spaces rather than placing the entire story in dialogue." },
      { title: "Shared chapter runtime", detail: "Common direction, interaction, persistence, and journal helpers enable chapter-specific scenes without repeating infrastructure." },
      { title: "Human gates stay human", detail: "Automated path and asset checks cannot establish enjoyment, no-hint clarity, audio balance, or final art quality." },
    ],
    limitations: ["First-time-player playtests, headphone/speaker checks, and visual approval remain open.", "This is a supporting prototype, not a shipped commercial game."],
  },
];

export const allProjects = [...projects, ...supportingProjects];

export const archiveProject: Project = {
  slug: "music-webapp",
  title: "Music Webapp",
  summary: "A Flask team coursework project for authenticated music reviews and favourites.",
  outcome: "Completed coursework, with 87 passing tests recorded on 11 September 2026 against an earlier revision, not a current rerun.",
  role: "Team coursework contributor",
  period: "2026",
  status: "coursework",
  stack: ["Flask", "Python", "HTML", "CSS", "Testing"],
  accent: "#8E4750",
  evidence: [], media: [], links: [], constraints: [], decisions: [],
  limitations: ["Individual contribution boundaries are not sufficiently documented to claim sole ownership."],
};

export function getProject(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}
