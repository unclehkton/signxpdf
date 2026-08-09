import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  buildFaqPageJsonLd,
  buildGuideJsonLd,
  buildWebAppJsonLd,
  buildWebSiteJsonLd,
  getGuideContent,
} from "$lib/seo/catalog";

describe("document structured data", () => {
  it("uses route-level JSON-LD helpers instead of a single app.html block", () => {
    const appHtml = readFileSync("src/app.html", "utf8");
    expect(appHtml).not.toMatch(/application\/ld\+json/);
    expect(appHtml).toContain("%lang%");
    expect(appHtml).toContain("%sveltekit.head%");

    const site = buildWebSiteJsonLd();
    expect(site).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sign X PDF",
    });

    const app = buildWebAppJsonLd("en", {
      slug: "sign-pdf",
      pathSegment: "sign-pdf",
      title: "t",
      description: "d",
      h1: "h",
      answerFirst: "a",
      privacyNote: "p",
      whatItDoes: "w",
      howTo: [],
      localProcessing: "l",
      limitations: [],
      faq: [],
      related: [],
      ogLocale: "en_US",
      toolKind: "sign",
    });
    expect(app).toMatchObject({
      "@type": "WebApplication",
      name: "Sign X PDF",
      isAccessibleForFree: true,
    });
    expect(app).not.toHaveProperty("aggregateRating");
  });

  it("builds FAQPage JSON-LD from FAQ items", () => {
    const faq = buildFaqPageJsonLd([
      { question: "Is the PDF uploaded?", answer: "No for tool processing." },
    ]);
    expect(faq).toMatchObject({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the PDF uploaded?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No for tool processing.",
          },
        },
      ],
    });
    expect(buildFaqPageJsonLd([])).toBeNull();
  });

  it("builds guide Article + FAQ JSON-LD for terminology page", () => {
    const page = getGuideContent("en", "visible-vs-digital-signature");
    const blocks = buildGuideJsonLd("en", page);
    expect(blocks.some((b) => b["@type"] === "Article")).toBe(true);
    expect(blocks.some((b) => b["@type"] === "FAQPage")).toBe(true);
    expect(page.disclaimer?.toLowerCase()).toMatch(/not legal advice/);
  });
});
