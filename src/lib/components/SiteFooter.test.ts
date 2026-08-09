import { render, cleanup } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SiteFooter from "./SiteFooter.svelte";

type PageSnapshot = {
  url: URL;
  params: Record<string, string>;
  route: { id: string | null };
  status: number;
  error: null;
  data: Record<string, unknown>;
  form: null;
  state: Record<string, unknown>;
};

function makePage(pathname: string): PageSnapshot {
  return {
    url: new URL(`https://www.signxpdf.com${pathname}`),
    params: {},
    route: { id: null },
    status: 200,
    error: null,
    data: {},
    form: null,
    state: {},
  };
}

/** Minimal store so vitest hoisting does not need svelte/store inside vi.hoisted. */
const pageStore = vi.hoisted(() => {
  let value: PageSnapshot = {
    url: new URL("https://www.signxpdf.com/en/"),
    params: {},
    route: { id: null },
    status: 200,
    error: null,
    data: {},
    form: null,
    state: {},
  };
  const subscribers = new Set<(v: PageSnapshot) => void>();
  return {
    subscribe(run: (v: PageSnapshot) => void) {
      subscribers.add(run);
      run(value);
      return () => subscribers.delete(run);
    },
    set(next: PageSnapshot) {
      value = next;
      for (const run of subscribers) run(value);
    },
  };
});

vi.mock("$app/stores", () => ({
  page: {
    subscribe: pageStore.subscribe,
  },
}));

describe("SiteFooter", () => {
  beforeEach(() => {
    pageStore.set(makePage("/en/"));
  });

  afterEach(() => {
    cleanup();
  });

  it("links to the open-source licences page", () => {
    const { getByRole } = render(SiteFooter);
    const link = getByRole("link", { name: /open-source|開放原始碼|开源/i });
    expect(link.getAttribute("href")).toBe("/open-source-licences/");
  });

  it("links to the privacy page for en", () => {
    pageStore.set(makePage("/en/sign-pdf/"));
    const { getByRole } = render(SiteFooter);
    const link = getByRole("link", { name: /privacy|私隱|隐私/i });
    expect(link.getAttribute("href")).toBe("/en/privacy/");
  });

  it("links to the privacy page for zh-hant", () => {
    pageStore.set(makePage("/zh-hant/"));
    const { getByRole } = render(SiteFooter);
    const link = getByRole("link", { name: /privacy|私隱|隐私/i });
    expect(link.getAttribute("href")).toBe("/zh-hant/privacy/");
  });

  it("links to the privacy page for zh-hans (not en fallback)", () => {
    pageStore.set(makePage("/zh-hans/merge-pdf/"));
    const { getByRole } = render(SiteFooter);
    const link = getByRole("link", { name: /privacy|私隱|隐私/i });
    expect(link.getAttribute("href")).toBe("/zh-hans/privacy/");
  });
});
