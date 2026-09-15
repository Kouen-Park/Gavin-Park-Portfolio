import { expect, test } from "@playwright/test";

const routes = ["/", "/work/birdie-buddy", "/work/the-thirteenth-disciple", "/work/secondbrain"];

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
  expect(titles).toEqual(["BirdieBuddy", "The Thirteenth Disciple", "SecondBrain"]);
});

test("home makes BirdieBuddy the featured project and exposes recruiter actions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Software Engineer building reliable full-stack systems/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /View BirdieBuddy/i })).toHaveAttribute("href", "/work/birdie-buddy");
  await expect(page.locator(".project-card").first()).toContainText("Featured case study");
  await expect(page.locator(".project-card").nth(1)).toContainText("Supporting evidence");
});

test("BirdieBuddy case study exposes the recruiter demo path", async ({ page }) => {
  await page.goto("/work/birdie-buddy");
  await expect(page.getByRole("heading", { name: /See the recovery flow/i })).toBeVisible();
  await expect(page.locator(".demo-guide li")).toHaveCount(3);
  await expect(page.locator(".case-actions .action-note")).toBeVisible();
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
