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

const birdieBuddyDemoUrl = process.env.NEXT_PUBLIC_BIRDIEBUDDY_DEMO_URL;

export const projects: Project[] = [
  {
    slug: "birdie-buddy",
    title: "BirdieBuddy",
    summary: "A mobile-first golf companion designed to keep a live round usable and recoverable when connectivity is unreliable.",
    outcome: "An active beta with explicit offline recovery, conflict handling, and test coverage around scoring flows.",
    role: "Independent product engineering",
    period: "2026",
    status: "active beta",
    stack: ["ASP.NET Core 8", "EF Core 8", "PostgreSQL", "JavaScript", "Playwright"],
    accent: "#1F5B4B",
    evidence: [
      {
        stage: "Problem",
        claim: "A round cannot become disposable when the network drops.",
        detail: "Live score entry needs to remain usable and recoverable through intermittent mobile connectivity.",
        source: "BirdieBuddy project record and repository",
        verificationDate: "2026-09-15",
      },
      {
        stage: "Decision",
        claim: "Treat PostgreSQL as truth and the browser queue as a recoverable outbox.",
        detail: "Offline actions are retained locally, retried deliberately, and surfaced for review when server state conflicts.",
        source: "Architecture and recovery notes",
        verificationDate: "2026-09-15",
      },
      {
        stage: "Implementation",
        claim: "Separate round UI, local recovery, and typed server outcomes.",
        detail: "ASP.NET Core and EF Core own persisted scoring while a service worker and browser storage protect in-progress work.",
        source: "BirdieBuddy source tree",
        verificationDate: "2026-09-15",
      },
      {
        stage: "Verification",
        claim: "Exercise scoring at HTTP, database, and browser boundaries.",
        detail: "The repository documents integration coverage and browser tests for the live-round and recovery paths.",
        source: "Repository test suites",
        verificationDate: "2026-09-15",
      },
      {
        stage: "Current status",
        claim: "Active beta; physical iPhone Safari verification remains open.",
        detail: "The core workflow is implemented. Device-specific field testing is deliberately listed as unfinished work.",
        source: "Project inventory",
        verificationDate: "2026-09-15",
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
      "A scoring flow must remain understandable on a narrow mobile viewport.",
      "Offline actions must not silently overwrite newer server state.",
      "The product must make unfinished device verification visible rather than imply completion.",
    ],
    decisions: [
      { title: "Visible recovery", detail: "Pending and conflicting work is represented as product state, not hidden implementation detail." },
      { title: "Thin client boundaries", detail: "The browser owns resilient interaction; the server owns durable golf data and validation." },
      { title: "Test the seams", detail: "Verification concentrates on the transitions where browser, HTTP, and PostgreSQL behavior meet." },
    ],
    limitations: ["Physical iPhone Safari verification is still pending.", "The chart below visualizes repository fixture data, not measured product impact."],
    featured: true,
    liveDemo: birdieBuddyDemoUrl,
    demoSteps: ["Open the deployed app", "Start or open a sample round", "Try score entry and recovery/sync state"],
    proof: {
      problem: "Keep live score entry usable when connectivity drops.",
      role: "Independent product engineering",
      reliability: "PostgreSQL as source of truth with a recoverable browser outbox.",
      verified: "HTTP, database, and browser coverage around scoring and recovery.",
      status: "Active beta; physical iPhone Safari verification remains open.",
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
