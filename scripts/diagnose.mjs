import { chromium } from "playwright";

const URL = process.env.SITE_URL ?? "http://localhost:3010";
const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(3000);

await page.locator("#about").scrollIntoViewIfNeeded();
await page.waitForTimeout(4000);

const report = await page.evaluate(() => {
  const section = document.querySelector("#about");
  const scrim = section.querySelector(".scrim");
  const paragraphs = [...section.querySelectorAll("p, blockquote")];

  const scrimStyle = scrim ? getComputedStyle(scrim) : null;

  return {
    scrim: scrimStyle
      ? {
          position: scrimStyle.position,
          zIndex: scrimStyle.zIndex,
          background: scrimStyle.backgroundImage.slice(0, 90),
        }
      : null,
    paragraphs: paragraphs.slice(0, 6).map((p) => {
      const style = getComputedStyle(p);
      return {
        text: (p.textContent ?? "").slice(0, 32),
        opacity: style.opacity,
        color: style.color,
        transform: style.transform,
        // What is actually painted directly behind this text.
        parentOpacity: getComputedStyle(p.parentElement).opacity,
      };
    }),
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
