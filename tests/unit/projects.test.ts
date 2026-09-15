import { describe, expect, it } from "vitest";
import { archiveProject, projects } from "../../data/projects";

describe("portfolio project data", () => {
  it("uses unique slugs and the planned featured order", () => {
    expect(projects.map(({ slug }) => slug)).toEqual(["birdie-buddy", "the-thirteenth-disciple", "secondbrain"]);
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length);
  });

  it("contains all evidence stages in order", () => {
    const stages = ["Problem", "Decision", "Implementation", "Verification", "Current status"];
    for (const project of projects) expect(project.evidence.map(({ stage }) => stage)).toEqual(stages);
  });

  it("requires sources, dates, alt text, and valid external links", () => {
    for (const project of projects) {
      for (const evidence of project.evidence) {
        expect(evidence.source.trim().length).toBeGreaterThan(0);
        expect(evidence.verificationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
      for (const media of project.media) {
        expect(media.alt.trim().length).toBeGreaterThan(0);
        expect(media.width).toBeGreaterThan(0);
        expect(media.height).toBeGreaterThan(0);
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
    expect(birdieBuddy.liveDemo).toBe("https://birdiebuddy.onrender.com");
    expect(birdieBuddy.limitations.join(" ")).toMatch(/iOS.+not represented as deployed/i);
  });
});
