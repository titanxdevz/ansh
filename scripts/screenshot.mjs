/**
 * Visual check for the 3D portfolio.
 *
 * Loads the page in headless Chromium, waits for the WebGL scene to settle,
 * then captures a screenshot at each chapter along with any console errors.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const URL = process.env.SITE_URL ?? "http://localhost:3000";
const OUT = "screenshots";

const chapters = [
  { name: "01-hero", selector: "#top" },
  { name: "02-about", selector: "#about" },
  { name: "03-work", selector: "#work" },
  { name: "03b-architecture", selector: "#architecture" },
  { name: "04-archive", selector: "#archive" },
  { name: "05-stack", selector: "#stack" },
  { name: "06-services", selector: "#services" },
  { name: "07-contact", selector: "#contact" },
];

const errors = [];

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
});
page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));

await mkdir(OUT, { recursive: true });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(4500);

for (const chapter of chapters) {
  const element = page.locator(chapter.selector).first();
  await element.scrollIntoViewIfNeeded();
  // Give the camera rig time to ease into the new station.
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}/${chapter.name}.png` });
  console.log(`captured ${chapter.name}`);
}

// Mobile pass, hero only.
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(4000);
await page.screenshot({ path: `${OUT}/08-mobile-hero.png` });
console.log("captured 08-mobile-hero");

// Daylight theme pass.
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(3500);
await page.getByRole("button", { name: /daytime lighting/i }).click();
await page.waitForTimeout(3500);
await page.screenshot({ path: `${OUT}/09-day-theme.png` });
console.log("captured 09-day-theme");

console.log("\n=== CONSOLE ERRORS ===");
console.log(errors.length ? errors.join("\n") : "none");

await browser.close();
