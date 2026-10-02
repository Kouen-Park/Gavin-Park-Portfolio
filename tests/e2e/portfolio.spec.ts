import { expect, test } from "@playwright/test";

const routes = ["/", "/work/birdie-buddy", "/work/kkok", "/work/noye", "/work/the-thirteenth-disciple"];

for (const route of routes) {
  test(`${route} has navigation, one h1, and no horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
}

test("home exposes projects in the intended order", async ({ page }) => {
  await page.goto("/");
  const titles = await page.locator(".project-copy h2").allTextContents();
  expect(titles).toEqual(["BirdieBuddy", "Kkok", "Noye"]);
  await expect(page.locator("#work .project-card")).toHaveCount(3);
  await expect(page.locator("#work .project-copy dl")).toHaveCount(0);
  await expect(page.locator("#work .project-copy time")).toHaveCount(0);
  await expect(page.locator("#supporting-work")).toContainText("The Thirteenth Disciple");
  await expect(page.locator("#supporting-work")).toContainText("Supporting project");
  await expect(page.getByRole("link", { name: "SecondBrain", exact: true })).toHaveCount(0);
  await expect(page.locator("#method")).toContainText("SecondBrain supports that loop");
});

test("home makes BirdieBuddy the featured project and exposes recruiter actions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Software Engineer building reliable full-stack systems/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /View BirdieBuddy/i })).toHaveAttribute("href", "/work/birdie-buddy");
  await expect(page.locator(".project-card").first()).toContainText("Featured case study");
  await expect(page.locator(".project-card").nth(1)).toContainText("Core case study");
  await expect(page.locator(".project-card").nth(2)).toContainText("Core case study");
  await page.getByRole("link", { name: /View BirdieBuddy/i }).click();
  await expect(page).toHaveURL(/\/work\/birdie-buddy$/);
});

test("Kkok provides deployed web access without implying TestFlight availability", async ({ page }) => {
  await page.goto("/work/kkok");
  await expect(page.getByRole("heading", { level: 1, name: "Kkok", exact: true })).toBeVisible();
  await expect(page).toHaveTitle("Kkok — Gavin Park");
  await expect(page.locator(".case-hero")).toContainText("Core case study");
  await expect(page.getByRole("heading", { name: "Explore the deployed web MVP." })).toBeVisible();
  await expect(page.locator(".demo-guide li")).toHaveCount(3);
  for (const area of [".case-actions", ".case-end"]) {
    await expect(page.locator(area).getByRole("link", { name: /Open live demo/ })).toHaveAttribute("href", "https://www.kkokhaja.today");
    await expect(page.locator(area).getByRole("link", { name: /View repository/ })).toHaveAttribute("href", "https://github.com/Kouen-Park/kkok");
  }
  await expect(page.locator(".case-access-note")).toContainText("native TestFlight access is not available yet");
});

test("Noye exposes local setup and honest verification limits instead of a fake demo", async ({ page }) => {
  await page.goto("/work/noye");
  await expect(page.locator(".case-actions").getByRole("link", { name: /Local setup guide/ })).toHaveAttribute("href", "https://github.com/Kouen-Park/Noye#development");
  await expect(page.getByRole("link", { name: /Open live demo/ })).toHaveCount(0);
  await expect(page.getByRole("list", { name: "Noye knowledge flow" })).toBeVisible();
  await expect(page.locator(".case-access-note")).toContainText("no public hosted demo");
  await expect(page.locator(".limits-section")).toContainText("not green in one run");
});

test("old SecondBrain links resolve to working method and sitemap reflects the new selection", async ({ page, request }) => {
  await page.goto("/work/secondbrain");
  await expect(page).toHaveURL(/\/#method$/);
  await expect(page.getByRole("heading", { name: /Progress is a loop/ })).toBeVisible();
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const slug of ["birdie-buddy", "kkok", "noye", "the-thirteenth-disciple"]) expect(xml).toContain(`/work/${slug}`);
  expect(xml).not.toContain("/work/secondbrain");
});

for (const width of [375, 768, 1024, 1440]) {
  test(`core work and case studies remain readable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow, route).toBe(false);
      for (const reveal of await page.locator(".reveal").all()) {
        await expect(reveal).toHaveCSS("opacity", "1");
        await expect(reveal).toHaveCSS("transform", "none");
      }
      if (route === "/") {
        for (const card of await page.locator("#work .project-card").all()) {
          await expect(card.locator(".project-summary")).toBeVisible();
          await expect(card.locator(".project-copy dl")).toHaveCount(0);
          await expect(card.locator(".project-copy .tag-list")).toBeVisible();
          await expect(card.getByRole("link", { name: /Read the case study/ })).toBeVisible();
          if (width === 1440) {
            await expect(card.locator(".project-proof-rail")).toBeVisible();
            await expect(card.locator(".project-proof-rail .eyebrow")).toHaveText(["Problem", "Decision", "Implementation", "Verification", "Current status"]);
          }
        }
      }
      for (const link of await page.locator(".hero-actions a, .case-actions a, .case-end a").all()) {
        const bounds = await link.boundingBox();
        expect(bounds).not.toBeNull();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      }
      if (testInfo.project.name === "chromium") {
        await page.screenshot({ path: testInfo.outputPath(`${route === "/" ? "home" : route.split("/").pop()}-${width}.png`), fullPage: true });
        if (route === "/") {
          for (const [index, card] of (await page.locator("#work .project-card").all()).entries()) {
            await card.screenshot({ path: testInfo.outputPath(`core-${index + 1}-${width}.png`) });
          }
        }
      }
    }
  });
}

test("core case-study links can be activated with the keyboard", async ({ page }) => {
  for (const slug of ["birdie-buddy", "kkok", "noye"]) {
    await page.goto("/");
    const link = page.locator(`#work .project-copy h2 a[href="/work/${slug}"]`);
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
  }
});

test("BirdieBuddy case study exposes the recruiter demo path", async ({ page }) => {
  await page.goto("/work/birdie-buddy");
  await expect(page.getByRole("heading", { name: /Try the public beta/i })).toBeVisible();
  await expect(page.locator(".demo-guide li")).toHaveCount(3);
  await expect(page.locator(".case-actions").getByRole("link", { name: /Open live demo/i })).toHaveAttribute("href", "https://birdiebuddy.onrender.com");
  await expect(page.locator(".case-actions").getByRole("link", { name: /View repository/i })).toBeVisible();
});

test("skip link and keyboard focus are usable", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("reduced motion resolves the evidence rail immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/birdie-buddy");
  await expect(page.locator(".evidence-line path").first()).toHaveCSS("stroke-dashoffset", "0px");
});

test("core work remains readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    for (const card of await page.locator("#work .project-card").all()) {
      await expect(card).toHaveCSS("opacity", "1");
      await expect(card.getByRole("link", { name: /Read the case study/ })).toBeVisible();
    }
  } finally {
    await context.close();
  }
});
