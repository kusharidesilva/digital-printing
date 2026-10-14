import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.PREVIEW_URL || "http://localhost:3000";
// Use an installed browser when available; leave BROWSER_CHANNEL unset for Playwright Chromium.
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || undefined,
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("response", (response) => {
  if (response.status() >= 400 && !response.url().includes("missing-page"))
    errors.push(`${response.status()} ${response.url()}`);
});
await mkdir("artifacts", { recursive: true });
try {
  await page.goto(`${base}/services/`);
  const serviceRoutes = await page
    .locator(".service-card")
    .evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
  assert.equal(serviceRoutes.length, 12);
  assert.equal(new Set(serviceRoutes).size, 12);
  const routes = [
    "/",
    "/services/",
    "/gallery/",
    "/about/",
    "/contact/",
    ...serviceRoutes,
  ];
  const accessibilityViolations = [];
  for (const route of routes) {
    const response = await page.goto(`${base}${route}`);
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator("h1").count(), 1, route);
    assert.ok((await page.title()).includes("Digital Printing"));
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((img) => {
        img.loading = "eager";
      });
      await document.fonts.ready;
    });
    await page.waitForFunction(() =>
      Array.from(document.images).every(
        (image) => image.complete && image.naturalWidth > 0,
      ),
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    if (results.violations.length)
      accessibilityViolations.push({
        route,
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      });
  }
  console.log(`Checked all ${routes.length} pages and loaded every image.`);
  await writeFile(
    "artifacts/accessibility-results.json",
    JSON.stringify(accessibilityViolations, null, 2),
  );
  if (accessibilityViolations.length) {
    const unique = new Map();
    for (const result of accessibilityViolations)
      for (const violation of result.violations)
        for (const node of violation.nodes)
          unique.set(`${violation.id}:${node.target}`, node);
    console.log(JSON.stringify([...unique.values()], null, 2));
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/services/",
      "/gallery/",
      "/about/",
      "/contact/",
      serviceRoutes[0],
    ]) {
      await page.goto(`${base}${route}`);
      const dimensions = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      assert.ok(
        dimensions.page <= dimensions.viewport,
        `Horizontal overflow at ${width}px on ${route}: ${JSON.stringify(dimensions)}`,
      );
    }
    console.log(`Responsive layouts passed at ${width}px.`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  assert.ok(
    await page.getByRole("dialog", { name: "Navigation menu" }).isVisible(),
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.getByRole("dialog", { name: "Navigation menu" }).isVisible(),
    false,
  );
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services" })
    .click();
  await page.waitForURL("**/services/");
  assert.equal(await page.locator(".service-card").count(), 12);
  await page.goto(`${base}/gallery/`);
  await page
    .getByRole("button", { name: "Stickers & Labels", exact: true })
    .click();
  assert.equal(await page.locator(".gallery-item").count(), 1);
  await page
    .getByRole("button", { name: "Business Printing", exact: true })
    .click();
  assert.equal(await page.locator(".gallery-item").count(), 4);
  const galleryTrigger = page.locator(".gallery-item").first();
  await galleryTrigger.click();
  await page.locator(".lightbox").waitFor({ state: "visible" });
  const firstTitle = await page.locator("#lightbox-title").textContent();
  await page.keyboard.press("ArrowRight");
  assert.notEqual(
    await page.locator("#lightbox-title").textContent(),
    firstTitle,
  );
  await page.getByRole("button", { name: "Previous image" }).click();
  assert.equal(await page.locator("#lightbox-title").textContent(), firstTitle);
  // Native modal focus must stay within the lightbox.
  for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
  assert.ok(
    await page.evaluate(() => !!document.activeElement?.closest(".lightbox")),
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".lightbox").count(), 0);
  assert.ok(
    await galleryTrigger.evaluate(
      (element) => element === document.activeElement,
    ),
  );
  await page.getByRole("button", { name: "All", exact: true }).click();
  assert.equal(await page.locator(".gallery-item").count(), 12);
  await page.locator(".gallery-item").first().click();
  await page.locator(".lightbox").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Close image viewer" }).click();
  assert.equal(await page.locator(".lightbox").count(), 0);
  const whatsapp = new URL(
    await page.locator(".floating-whatsapp").getAttribute("href"),
  );
  assert.equal(whatsapp.hostname, "wa.me");
  assert.equal(
    whatsapp.searchParams.get("text"),
    "Hi, I would like to know more about your printing services.",
  );
  await page.goto(`${base}${serviceRoutes[0]}`);
  assert.ok(
    (
      await page
        .getByRole("link", { name: "Discuss your project" })
        .getAttribute("href")
    ).includes("Business%20Card%20Printing"),
  );
  await page.goto(`${base}/contact/`);
  assert.ok(
    (
      await page.getByRole("link", { name: "Send Email" }).getAttribute("href")
    ).startsWith("mailto:"),
  );
  assert.equal(await page.locator("form").count(), 0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  assert.equal(
    await page
      .locator(".hero h1")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });
    await document.fonts.ready;
  });
  await page.waitForFunction(() =>
    Array.from(document.images).every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
  );
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.evaluate(() =>
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    }),
  );
  await page.waitForFunction(() =>
    Array.from(document.images).every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
  );
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.goto(`${base}/gallery/`);
  await page.evaluate(() =>
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    }),
  );
  await page.waitForFunction(() =>
    Array.from(document.images).every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
  );
  await page.screenshot({
    path: "artifacts/gallery-desktop.png",
    fullPage: true,
  });
  assert.equal(errors.length, 0, JSON.stringify(errors.slice(0, 10)));
  page.removeAllListeners("console");
  const missing = await page.goto(`${base}/missing-page/`);
  assert.equal(missing.status(), 404);
  assert.ok(await page.getByRole("heading", { level: 1 }).isVisible());
  assert.equal(
    accessibilityViolations.length,
    0,
    "Fix the WCAG accessibility violations logged above",
  );
  console.log(
    "Passed mobile navigation, filtering, lightbox controls/focus, WhatsApp/email, reduced motion, 404 handling and WCAG checks.",
  );
} finally {
  await browser.close();
}
