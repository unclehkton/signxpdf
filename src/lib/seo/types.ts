export type CoreSeoLocale = 'en' | 'zh-hant' | 'zh-hans';

/** Wave 1 indexable commercial locales (URL path segments, lowercase). */
export type Wave1SeoLocale =
  | 'es'
  | 'pt-br'
  | 'fr'
  | 'de'
  | 'ja'
  | 'ko'
  | 'ru'
  | 'id'
  | 'vi'
  | 'fil';

/**
 * Wave 2 candidates — architecture prepared, not indexable until quality gate.
 * Arabic/Urdu require dir=rtl + full QA before shipping.
 */
export type Wave2SeoLocale = 'th' | 'ar' | 'hi' | 'bn' | 'ur' | 'ta';

export type SeoLocale = CoreSeoLocale | Wave1SeoLocale;

export type ToolSlug =
  | 'sign-pdf'
  | 'merge-pdf'
  | 'compress-pdf'
  | 'reorder-pdf'
  | 'delete-pdf-pages'
  | 'privacy'
  | 'home';

/** Phase 3 and Phase 4 guide slugs under /[locale]/guides/[guide]/. */
export type Phase4GuideSlug =
  | 'how-to-check-pdf-upload'
  | 'choose-private-pdf-tool'
  | 'pdf-compression-size-quality'
  | 'large-pdf-browser-tests';

export type GuideSlug =
  | 'visible-vs-digital-signature'
  | 'how-browser-pdf-tools-work'
  | Phase4GuideSlug;

export type AuthoritySlug = 'verification' | 'about';

export type AuthorityVerificationWorkflow = 'sign' | 'merge' | 'compress' | 'reorder' | 'delete';

export type FaqItem = { question: string; answer: string };

/** Related link: path after locale (e.g. `sign-pdf`, `privacy`, `guides/…`, or empty for home). */
export type RelatedLink = {
  pathSegment: string;
  label: string;
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: GuideTable;
};

export type GuideTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type GuideEvidenceItem = {
  /** Short method label, e.g. "Privacy network e2e". */
  method: string;
  result: string;
  scope?: string;
  limits?: string;
  /** Repo-relative path or public URL. */
  source?: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/** Optional browser-storage disclosure (privacy pages). */
export type StorageDisclosure = {
  heading: string;
  storageColumn: string;
  purposeColumn: string;
  rows: Array<{ storage: string; purpose: string }>;
  clearNote: string;
};

export type ToolPageContent = {
  slug: ToolSlug;
  pathSegment: string;
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
  privacyNote: string;
  whatItDoes: string;
  howTo: string[];
  localProcessing: string;
  limitations: string[];
  faq: FaqItem[];
  related: RelatedLink[];
  ogLocale: string;
  toolKind: 'sign' | 'tools' | 'none';
  /** Highlight section id inside tools workspace */
  toolsFocus?: 'merge' | 'compress' | 'reorder' | 'delete' | 'general';
  /** Browser storage transparency (localStorage / IndexedDB). Privacy pages. */
  storageDisclosure?: StorageDisclosure;
};

export type GuidePageContent = {
  slug: GuideSlug;
  pathSegment: string;
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
  sections: GuideSection[];
  faq: FaqItem[];
  related: RelatedLink[];
  ogLocale: string;
  /** Optional trust/disclaimer note (not legal advice, offline caveats, etc.). */
  disclaimer?: string;
  /**
   * Optional ISO date (YYYY-MM-DD) when the guide was first published.
   * Only set when factual — never invent for freshness.
   */
  datePublished?: string;
  /** Optional ISO date of last meaningful content update. */
  dateModified?: string;
  /** Optional ISO date of last technical verification of claims. */
  dateVerified?: string;
  /** Evidence-scoped explanation of what the last verification covered. */
  verificationNote?: string;
  /** Visible evidence rows for technical/privacy claims. */
  evidence?: GuideEvidenceItem[];
};

export type AuthorityVerificationRow = {
  /** Stable workflow identifier for tests and future measurement exports. */
  workflow: AuthorityVerificationWorkflow;
  workflowLabel: string;
  test: string;
  result: string;
  verified: string;
};

export type AuthoritySourceLink = {
  label: string;
  href: string;
  note?: string;
};

export type AuthorityPageContent = {
  slug: AuthoritySlug;
  pathSegment: string;
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
  sections: GuideSection[];
  faq: FaqItem[];
  related: RelatedLink[];
  ogLocale: string;
  pageKind: Extract<SeoPageKind, 'article' | 'profile'>;
  dateVerified: string;
  verificationNote: string;
  verificationRows?: AuthorityVerificationRow[];
  verificationTableLabels?: {
    workflow: string;
    test: string;
    result: string;
    verified: string;
  };
  evidence?: GuideEvidenceItem[];
  sourceHeading?: string;
  sourceLinks: AuthoritySourceLink[];
  /** Factual entity links used by About JSON-LD; keep access and identity claims scoped. */
  sameAs?: string[];
};

export type LocaleNav = {
  home: string;
  sign: string;
  tools: string;
  privacy: string;
  guides: string;
  openTool: string;
  relatedTools: string;
  howTo: string;
  whatItDoes: string;
  localProcessing: string;
  limitations: string;
  faq: string;
  enableJs: string;
  published?: string;
  updated?: string;
  verified?: string;
  howWeVerified?: string;
  breadcrumbs?: string;
};

export type LocaleBundle = {
  locale: SeoLocale;
  htmlLang: string;
  home: ToolPageContent;
  tools: Record<Exclude<ToolSlug, 'home' | 'privacy'>, ToolPageContent>;
  privacy: ToolPageContent;
  /**
   * Long guides only for core locales (en / zh-hant / zh-hans).
   * Wave 1 ships commercial pages first; guides stay off until natural quality is ready.
   */
  guides?: Record<GuideSlug, GuidePageContent>;
  nav: LocaleNav;
};

export type SeoPageKind = 'website' | 'article' | 'profile';

export type SeoHeadModel = {
  title: string;
  description: string;
  canonicalPath: string;
  locale: SeoLocale;
  ogLocale: string;
  pathSegment: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
  pageKind?: SeoPageKind;
  datePublished?: string;
  dateModified?: string;
  multiLocale?: boolean;
  /** When false, omit hreflang x-default (standalone legal pages). */
  emitXDefault?: boolean;
};
