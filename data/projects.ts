export type EvidenceStage =
  | "Problem"
  | "Decision"
  | "Implementation"
  | "Verification"
  | "Current status";

export interface Evidence {
  stage: EvidenceStage;
  claim: string;
  detail: string;
  source: string;
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
  outcome: string;
  role: string;
  period: string;
  status: "active beta" | "playable prototype" | "active knowledge system" | "coursework";
  stack: string[];
  accent: string;
  evidence: Evidence[];
  media: Media[];
  links: { label: string; href: string }[];
  constraints: string[];
  decisions: { title: string; detail: string }[];
  limitations: string[];
  featured?: boolean;
  liveDemo?: string;
  demoSteps?: string[];
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

export const projects: Project[] = [
  {
    slug: "birdie-buddy",
    title: "BirdieBuddy",
    summary: "A public mobile-first golf platform that keeps live rounds recoverable, turns completed scores into useful statistics and practice guidance, and stays explicit about sync conflicts.",
    outcome: "A Render-deployed .NET 10 beta with public course browsing, resilient 9/18-hole scoring, statistics, practice workflows, and production-focused security and operations.",
    role: "Independent product engineering",
    period: "2026 — present",
    status: "active beta",
    stack: ["ASP.NET Core 10", "EF Core 10", "PostgreSQL 16", "JavaScript", "Playwright"],
    accent: "#1F5B4B",
    evidence: [
      {
        stage: "Problem",
        claim: "A golf round cannot become disposable when the course connection drops.",
        detail: "Live score entry must survive navigation, account boundaries, intermittent connectivity, and concurrent device/server edits without silently losing input.",
        source: "BirdieBuddy README and live-round modules",
        verificationDate: "2026-09-16",
      },
      {
        stage: "Decision",
        claim: "Keep PostgreSQL authoritative and make browser recovery state explicit.",
        detail: "A user-and-round-scoped outbox preserves revisions locally, ordered sync sends expected server snapshots, and 409 conflicts open a device-versus-server review instead of auto-merging.",
        source: "Architecture guide and recovery implementation",
        verificationDate: "2026-09-16",
      },
      {
        stage: "Implementation",
        claim: "Upgrade the modular monolith to .NET 10 and separate round responsibilities.",
        detail: "ASP.NET Core 10 serves the static client and controller API; EF Core 10 and Npgsql persist data while scoped query, live-round, lifecycle, editing, statistics, practice, and import services keep boundaries traceable.",
        source: "BirdieBuddy.csproj, Program.cs, and architecture guide",
        verificationDate: "2026-09-16",
      },
      {
        stage: "Verification",
        claim: "Exercise business rules, HTTP wiring, PostgreSQL behavior, browser modules, and mobile journeys.",
        detail: "The repository layers xUnit and WebApplicationFactory coverage with guarded PostgreSQL integration suites and Playwright. All 24 browser-module checks passed on 16 September 2026.",
        source: "Repository test suites and local browser-test run",
        verificationDate: "2026-09-16",
      },
      {
        stage: "Current status",
        claim: "Public beta on Render; guest discovery is open while personal golf data stays authenticated.",
        detail: "Visitors can reach the landing page and shared Golf New Zealand course catalogue without an account. Round recording, statistics, practice history, account data, and mutations remain private.",
        source: "Public-access commit, deployment workflow, and architecture guide",
        verificationDate: "2026-09-16",
      },
    ],
    media: [
      {
        src: "/images/birdie-live.png",
        alt: "BirdieBuddy mobile live-round score entry screen",
        width: 375,
        height: 812,
        caption: "Live round entry on the mobile interface.",
      },
      {
        src: "/images/birdie-sync.png",
        alt: "BirdieBuddy mobile round screen showing synchronization state",
        width: 375,
        height: 812,
        caption: "A recovery-aware state from the current beta.",
      },
    ],
    links: [{ label: "View repository", href: "https://github.com/Kouen-Park/BirdieBuddy" }],
    constraints: [
      "A 9- or 18-hole scoring flow must remain understandable on a narrow mobile viewport.",
      "Offline actions must stay scoped to the signed-in user and round and must not silently overwrite newer server state.",
      "Public course discovery must not expose private rounds, statistics, practice history, or account data.",
    ],
    decisions: [
      { title: "Visible recovery", detail: "Pending, syncing, offline, and conflicting work are represented as product states; a failed request never becomes a false saved acknowledgement." },
      { title: "One deployable system", detail: "The .NET 10 modular monolith serves the static client and API together while feature services separate reads, live writes, lifecycle changes, and completed-round editing." },
      { title: "Operate the beta", detail: "Rate limits, CSRF, security headers, health checks, telemetry, migration locking, deployment smoke checks, and backup rehearsal make release readiness inspectable." },
    ],
    limitations: [
      "Physical iPhone Safari and VoiceOver verification remains an explicit release gate.",
      "Native iOS authentication and sync work exists only in the local BirdieBuddy working tree and is not represented as deployed.",
      "The chart below visualizes deterministic repository fixture data, not measured beta-user impact.",
    ],
    featured: true,
    liveDemo: birdieBuddyDemoUrl,
    demoSteps: ["Open the public landing page", "Browse the shared Golf New Zealand course catalogue", "Create an account to try a 9- or 18-hole live round"],
    proof: {
      problem: "Keep live score entry recoverable when connectivity drops or state conflicts.",
      role: "Independent product engineering",
      reliability: ".NET 10 and PostgreSQL as the durable system, with a scoped browser outbox and explicit conflict review.",
      verified: "Layered xUnit, HTTP, PostgreSQL, browser-module, and Playwright coverage; 24 browser checks passed locally.",
      status: "Public Render beta; native iOS work remains unreleased.",
    },
  },
  {
    slug: "the-thirteenth-disciple",
    title: "The Thirteenth Disciple",
    summary: "A six-chapter Godot investigation prototype that turns a researched narrative into explorable spaces, evidence, and choices.",
    outcome: "A playable six-chapter prototype with an epilogue, 39 field investigation actions, journal, pause, and save systems.",
    role: "Game design and development",
    period: "2026",
    status: "playable prototype",
    stack: ["Godot 4.7", "GDScript", "Pixel art", "Narrative systems"],
    accent: "#B36A36",
    evidence: [
      { stage: "Problem", claim: "Make research explorable without presenting invention as history.", detail: "The experience needs both dramatic momentum and a legible boundary between biblical source material and authored fiction.", source: "Game project record", verificationDate: "2026-09-15" },
      { stage: "Decision", claim: "Let evidence gathering carry the narrative.", detail: "Each chapter is built around field investigation actions, journal entries, and choices instead of passive exposition alone.", source: "Chapter design notes", verificationDate: "2026-09-15" },
      { stage: "Implementation", claim: "Build shared chapter infrastructure, then author distinct spaces.", detail: "Reusable chapter direction, world interaction, save, journal, and pause systems support six chapters and an epilogue.", source: "Godot source tree", verificationDate: "2026-09-15" },
      { stage: "Verification", claim: "Check the narrative graph as well as the runtime.", detail: "The project records automated headless suites and coverage of nine choice paths; full human playtesting remains separate work.", source: "Repository tests and project notes", verificationDate: "2026-09-15" },
      { stage: "Current status", claim: "Playable prototype, not a finished release.", detail: "The full structure is navigable, while polish, content tuning, and external playtesting remain open.", source: "Project inventory", verificationDate: "2026-09-15" },
    ],
    media: [
      { src: "/images/disciple-world.png", alt: "Pixel-art investigation environment in The Thirteenth Disciple", width: 1600, height: 900, caption: "An explorable field scene from the playable prototype." },
      { src: "/images/disciple-journal.png", alt: "The Thirteenth Disciple journal interface", width: 1600, height: 900, caption: "The journal keeps collected evidence and narrative context legible." },
      { src: "/images/disciple-cutscene.png", alt: "Pixel-art tomb cutscene in The Thirteenth Disciple", width: 1280, height: 720, caption: "A narrative scene from the six-chapter arc." },
    ],
    links: [{ label: "View repository", href: "https://github.com/Kouen-Park/thethirteenthdisciple" }],
    constraints: ["Keep research provenance distinct from invented narrative connective tissue.", "Support a complete chapter arc without duplicating core scene logic.", "Make keyboard and controller-era interactions readable in a pixel-art presentation."],
    decisions: [
      { title: "Investigation as structure", detail: "Thirty-nine field actions distribute discovery across spaces rather than confining it to dialogue." },
      { title: "Shared chapter spine", detail: "Common direction and world helpers reduce repeated GDScript while leaving room for chapter-specific scenes." },
      { title: "Explicit provenance", detail: "The design records where the source material ends and fictional construction begins." },
    ],
    limitations: ["External playtesting and broader accessibility evaluation are still pending.", "The project is a prototype and is not represented as a shipped commercial game."],
  },
  {
    slug: "secondbrain",
    title: "SecondBrain",
    summary: "A living knowledge system that captures raw material, links it into durable context, and makes verification part of the workflow.",
    outcome: "An active Markdown knowledge system with explicit capture, synthesis, provenance, and maintenance conventions.",
    role: "System design and daily operation",
    period: "2026 — present",
    status: "active knowledge system",
    stack: ["Obsidian", "Markdown", "Wikilinks", "Agent workflows"],
    accent: "#665A8E",
    evidence: [
      { stage: "Problem", claim: "Useful work loses value when its context cannot be found again.", detail: "Project decisions, sources, experiments, and open questions need to survive beyond the session that produced them.", source: "SecondBrain operating notes", verificationDate: "2026-09-15" },
      { stage: "Decision", claim: "Separate capture from synthesis and preserve provenance.", detail: "Raw inputs remain inspectable while wiki notes connect verified claims into reusable context.", source: "Knowledge-base conventions", verificationDate: "2026-09-15" },
      { stage: "Implementation", claim: "Use plain files, stable links, indexes, and agent-readable instructions.", detail: "Markdown, wikilinks, project inventories, templates, and local workflow rules keep the system portable and legible.", source: "SecondBrain workspace", verificationDate: "2026-09-15" },
      { stage: "Verification", claim: "Attach claims to records instead of relying on memory.", detail: "Portfolio facts are cross-checked against project pages, repository state, and dated verification notes.", source: "Project inventory and linked records", verificationDate: "2026-09-15" },
      { stage: "Current status", claim: "Active knowledge system used to build this portfolio.", detail: "The system remains intentionally iterative; consistency and link maintenance are ongoing operational work.", source: "Current workspace", verificationDate: "2026-09-15" },
    ],
    media: [],
    links: [],
    constraints: ["Keep source material recoverable after synthesis.", "Remain useful to both a person and coding agents without a proprietary database.", "Distinguish verified facts from plans and unresolved questions."],
    decisions: [
      { title: "Files over lock-in", detail: "Plain Markdown keeps the knowledge base searchable, portable, and reviewable with ordinary tools." },
      { title: "Links carry context", detail: "Wikilinks connect projects, decisions, sources, and follow-up work without forcing one rigid hierarchy." },
      { title: "Verification is a field", detail: "Dated sources and current status are part of the content model, including this portfolio’s Evidence Rail." },
    ],
    limitations: ["Link quality still depends on consistent maintenance.", "Some verification remains procedural rather than automated."],
  },
];

export const archiveProject: Project = {
  slug: "music-webapp",
  title: "Music Webapp",
  summary: "A Flask team coursework project for authenticated music reviews and favourites.",
  outcome: "A completed coursework codebase with 87 tests recorded as passing on 11 September 2026.",
  role: "Team coursework contributor",
  period: "2026",
  status: "coursework",
  stack: ["Flask", "Python", "HTML", "CSS", "Testing"],
  accent: "#8E4750",
  evidence: [],
  media: [],
  links: [],
  constraints: [],
  decisions: [],
  limitations: ["Individual contribution boundaries are not sufficiently documented to claim sole ownership."],
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
