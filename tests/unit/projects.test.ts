import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { allProjects, archiveProject, getProject, projects, supportingProjects } from "../../data/projects";

describe("portfolio project data", () => {
  it("uses unique slugs and the planned featured order", () => {
    expect(projects.map(({ slug }) => slug)).toEqual(["birdie-buddy", "kkok", "noye"]);
    expect(new Set(allProjects.map(({ slug }) => slug)).size).toBe(allProjects.length);
    expect(projects.filter(({ featured }) => featured).map(({ slug }) => slug)).toEqual(["birdie-buddy"]);
  });

  it("keeps supporting work routable without listing SecondBrain as a product", () => {
    expect(supportingProjects.map(({ slug }) => slug)).toEqual(["the-thirteenth-disciple"]);
    expect(getProject("the-thirteenth-disciple")).toBe(supportingProjects[0]);
    expect(getProject("secondbrain")).toBeUndefined();
    expect(getProject("missing")).toBeUndefined();
  });

  it("contains all evidence stages in order", () => {
    const stages = ["Problem", "Decision", "Implementation", "Verification", "Current status"];
    for (const project of allProjects) expect(project.evidence.map(({ stage }) => stage)).toEqual(stages);
  });

  it("requires sources, dates, alt text, and valid external links", () => {
    for (const project of allProjects) {
      expect(project.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(project.sourceRevision?.trim().length).toBeGreaterThan(0);
      for (const evidence of project.evidence) {
        expect(evidence.source.trim().length).toBeGreaterThan(0);
        expect(evidence.verificationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(evidence.verificationDate <= project.reviewedAt!).toBe(true);
        if (evidence.sourceUrl) expect(new URL(evidence.sourceUrl).protocol).toBe("https:");
      }
      for (const media of project.media) {
        expect(media.alt.trim().length).toBeGreaterThan(0);
        expect(media.width).toBeGreaterThan(0);
        expect(media.height).toBeGreaterThan(0);
        expect(existsSync(`public${media.src}`)).toBe(true);
      }
      for (const link of project.links) expect(() => new URL(link.href)).not.toThrow();
    }
  });

  it("does not overstate the archived team project", () => {
    expect(archiveProject.role).toBe("Team coursework contributor");
    expect(archiveProject.status).toBe("coursework");
  });

  it("keeps the featured BirdieBuddy case aligned with its verified platform", () => {
    const birdieBuddy = projects[0];
    expect(birdieBuddy.featured).toBe(true);
    expect(birdieBuddy.stack).toContain("ASP.NET Core 10");
    expect(birdieBuddy.stack).toContain("EF Core 10");
    expect(birdieBuddy.stack).toContain("SwiftUI · SwiftData");
    expect(birdieBuddy.liveDemo).toBe("https://birdiebuddy.onrender.com");
    expect(birdieBuddy.proof?.verified).toContain("27 native tests");
    expect(birdieBuddy.limitations.join(" ")).toContain("server-required CSRF");
    expect(birdieBuddy.proof?.status).toContain("not TestFlight released");
  });

  it("provides real web access and distinguishes local-only Noye", () => {
    expect(getProject("kkok")?.liveDemo).toBe("https://www.kkokhaja.today");
    expect(getProject("kkok")?.proof?.verified).toContain("41 two-account production checks");
    expect(getProject("kkok")?.sourceRevision).toContain("18b341f");
    expect(getProject("kkok")?.proof?.status).toContain("iPhone launch/login recorded");
    const noye = getProject("noye")!;
    expect(noye.liveDemo).toBeUndefined();
    expect(noye.systemFlow).toHaveLength(4);
    expect(noye.evidence.find(({ stage }) => stage === "Verification")?.detail).toContain("two embedding timeouts");
    expect(noye.limitations.join(" ")).toContain("not green in one run");
    for (const project of projects) {
      expect(project.proof).toBeDefined();
      expect(project.accessNote?.length).toBeGreaterThan(0);
    }
  });
});
