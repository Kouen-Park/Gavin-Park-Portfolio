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

test("skip link and keyboard focus are usable", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("reduced motion resolves the evidence rail immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/birdie-buddy");
  await expect(page.locator(".evidence-line path").first()).toHaveCSS("stroke-dashoffset", "0px");
});
