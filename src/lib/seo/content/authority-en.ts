import type { AuthorityPageContent, AuthoritySlug } from '../types';

const VERIFIED = '2026-08-08';
const PRIVACY_TEST_URL = 'https://github.com/unclehkton/signxpdf/blob/main/tests/e2e/privacy-no-upload.mjs';
const REPO_URL = 'https://github.com/unclehkton/signxpdf';
const VERIFICATION_NOTE =
  'Verification scope: the public repository source and open-source components were reviewed on 2026-08-08. The public GitHub source is available for anonymous review; it is a source reference, not independent security certification. The fixture PDFs used by the browser suite stayed on the test device and were not uploaded to Sign X PDF application servers. This is scoped evidence, not a guarantee about a compromised OS, malware, browser extensions, other applications, or future changes.';

export const enAuthority: Record<AuthoritySlug, AuthorityPageContent> = {
  verification: {
    slug: 'verification',
    pathSegment: 'verification',
    title: 'How Sign X PDF Verifies Local PDF Processing | Sign X PDF',
    description:
      'The first-party methodology behind Sign X PDF local-processing checks: five PDF workflows, request hooks, limitations, and linked source references.',
    h1: 'How Sign X PDF verifies local PDF processing',
    answerFirst:
      'Sign X PDF checks its local-processing claim with browser tests that exercise sign, merge, compress, reorder, and delete workflows while watching request URLs, methods, headers, bodies, Beacon, WebSocket, and service-worker activity. The result is evidence about the tested build and fixture conditions—not a claim that no network traffic or device risk exists.',
    sections: [
      {
        heading: 'What we tested',
        paragraphs: [
          'The privacy suite loads non-confidential fixture PDFs, exercises each supported document workflow, and checks whether document bytes or unique markers appear on prohibited application upload paths. The suite is designed to fail closed when a suspicious document-transfer pattern is observed.',
          'The table records the current workflow coverage. “Passed” means the current test run completed without a prohibited PDF upload observation under the configured test conditions.',
        ],
      },
      {
        heading: 'What the test monitors',
        paragraphs: [
          'The harness installs observation hooks before the file is selected and keeps them active through the operation and export. This is intentionally broader than checking only one Fetch/XHR filter in DevTools.',
        ],
        bullets: [
          'fetch and XMLHttpRequest URLs, methods, headers, and bodies',
          'filenames and unique PDF markers in request details',
          'navigator.sendBeacon calls and payloads',
          'WebSocket opens and sent messages',
          'Service Worker registration and worker-mediated network requests',
          'download and export completion for the tested workflow',
        ],
      },
      {
        heading: 'What this does not prove',
        paragraphs: [
          'A passing browser test does not prove that a compromised operating system, malware, malicious browser extension, or another application cannot access the same file. It does not certify legal compliance, prove a provider-wide retention policy, or predict the behaviour of code that has not been tested.',
          'Ordinary website assets still download. Local PDF processing is a document-processing claim, not a promise of zero network requests, zero telemetry in every environment, or guaranteed offline operation.',
        ],
      },
      {
        heading: 'Source and repeatability',
        paragraphs: [
          'The test source is linked in this public repository. Anyone can inspect and rerun it with a non-confidential PDF; the result remains scoped evidence rather than independent security certification. Users with a strict threat model can repeat the Network inspection method with a unique, non-confidential PDF and compare the live deployment with the published scope.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does “passed” mean that no bytes leave my device?',
        answer:
          'No. It means the configured test did not observe a prohibited PDF upload for that workflow. Website assets still use the network, and the test cannot audit the operating system, malware, extensions, or other applications.',
      },
      {
        question: 'Which PDF workflows are covered?',
        answer: 'The current suite covers sign, merge, compress, reorder, and delete-page workflows with its non-confidential fixtures.',
      },
      {
        question: 'Where can I inspect the test code?',
        answer: 'The linked repository contains the Playwright privacy test and the surrounding application source. Anyone can inspect the public source, but treat it as scoped evidence rather than an independent security certification.',
      },
    ],
    related: [
      { pathSegment: 'privacy', label: 'Privacy and storage disclosure' },
      { pathSegment: 'about', label: 'About Sign X PDF' },
      { pathSegment: 'guides/how-to-check-pdf-upload', label: 'How to check for PDF uploads' },
      { pathSegment: 'guides/choose-private-pdf-tool', label: 'How to choose a private PDF tool' },
    ],
    ogLocale: 'en_US',
    pageKind: 'article',
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    verificationRows: [
      { workflow: 'sign', workflowLabel: 'Sign PDF', test: 'Privacy network e2e', result: 'Passed', verified: VERIFIED },
      { workflow: 'merge', workflowLabel: 'Merge PDF', test: 'Privacy network e2e', result: 'Passed', verified: VERIFIED },
      { workflow: 'compress', workflowLabel: 'Compress PDF', test: 'Privacy network e2e', result: 'Passed', verified: VERIFIED },
      { workflow: 'reorder', workflowLabel: 'Reorder pages', test: 'Privacy network e2e', result: 'Passed', verified: VERIFIED },
      { workflow: 'delete', workflowLabel: 'Delete pages', test: 'Privacy network e2e', result: 'Passed', verified: VERIFIED },
    ],
    verificationTableLabels: { workflow: 'Workflow', test: 'Test', result: 'Result', verified: 'Verified' },
    evidence: [
      {
        method: 'Privacy network e2e (Playwright)',
        result: 'Request, body, Beacon, WebSocket, and service-worker hooks run through operation and export.',
        scope: 'Non-confidential fixture PDFs and the five configured workflows',
        limits: 'Does not prove device, extension, OS, malware, other-application, or future-deployment behaviour.',
        source: 'tests/e2e/privacy-no-upload.mjs',
      },
      {
        method: 'Fact-card governance',
        result: 'Local-processing and signature-boundary claims are recorded with evidence tier, verification date, and prohibited claims.',
        scope: 'Public GEO fact cards and source registry',
        limits: 'A fact card records the evidence contract; it is not independent certification.',
        source: 'README.md#verification-scope',
      },
    ],
    sourceLinks: [
      { label: 'Repository privacy test source', href: PRIVACY_TEST_URL, note: 'Playwright request-observation and workflow coverage.' },
      { label: 'Sign X PDF repository', href: REPO_URL, note: 'Public application source and build configuration.' },
      { label: 'GEO fact cards', href: 'https://github.com/unclehkton/signxpdf/blob/main/README.md#verification-scope', note: 'Evidence tiers, dates, limits, and prohibited claims.' },
      { label: 'GEO source registry', href: 'https://github.com/unclehkton/signxpdf/blob/main/README.md#public-source-layout', note: 'Links factual claims to repository evidence.' },
    ],
    sourceHeading: 'Sources',
  },

  about: {
    slug: 'about',
    pathSegment: 'about',
    title: 'About Sign X PDF — Browser-Local PDF Tools',
    description:
      'What Sign X PDF is, what it does and does not claim, why it uses browser-local processing, and where its source references are maintained.',
    h1: 'About Sign X PDF',
    answerFirst:
      'Sign X PDF is a browser-based PDF toolkit for adding visible signatures and performing common PDF operations locally. It does not require an account for these browser workflows, and it publishes its privacy-test method and product limitations so the processing claim can be evaluated.',
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'Sign X PDF provides browser tools for adding visible signatures, merging PDFs, compressing PDFs, reordering pages, and deleting pages. The selected document is designed to be read and processed in the browser rather than uploaded to Sign X PDF application servers for that workflow.',
        ],
        bullets: ['Visible draw, type, and image signature placement', 'Merge PDF files', 'Compress PDF files', 'Reorder PDF pages', 'Delete PDF pages'],
      },
      {
        heading: 'What it does not claim',
        paragraphs: [
          'A visible signature is not a certificate-backed cryptographic digital signature. Sign X PDF does not claim universal legal validity, identity verification, a complete audit trail, zero network traffic, protection from a compromised device, or a guaranteed offline mode.',
        ],
      },
      {
        heading: 'Why browser-local processing',
        paragraphs: [
          'Keeping the document workflow in the browser can reduce the need to send document bytes to an application server. It does not mean the page has no network activity: HTML, JavaScript, fonts, images, and WebAssembly assets still load as normal website resources.',
          'The public verification page explains how the current privacy tests watch the five core workflows and where the evidence stops.',
        ],
      },
      {
        heading: 'Open source and contact',
        paragraphs: [
          'The repository and open-source licence notices are recorded as project sources. The public repository contains the source and issue/discussion entry point; review and rerun the relevant tests with a non-confidential fixture when appropriate. No private support or customer-count claim is implied by this page.',
        ],
      },
    ],
    faq: [
      { question: 'Does Sign X PDF require an account?', answer: 'No account is required for the browser sign and PDF-tool workflows described here.' },
      { question: 'Does Sign X PDF create a certificate-backed digital signature?', answer: 'No. It adds visible signature artwork and does not apply certificate-based cryptographic PDF signing.' },
      { question: 'Where can I verify the local-processing claim?', answer: 'Start with the first-party verification methodology and its linked repository test. The public source can be inspected, and you can repeat a Network check with a non-confidential fixture for your own threat model.' },
    ],
    related: [
      { pathSegment: 'verification', label: 'How verification works' },
      { pathSegment: 'privacy', label: 'Privacy and local processing' },
      { pathSegment: 'open-source-licences', label: 'Open-source licences' },
      { pathSegment: 'sign-pdf', label: 'Sign PDF tool' },
    ],
    ogLocale: 'en_US',
    pageKind: 'profile',
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    sameAs: [REPO_URL],
    sourceLinks: [
      { label: 'GitHub repository', href: REPO_URL, note: 'Public application source and issue/discussion entry point.' },
      { label: 'Verification methodology', href: '/en/verification/', note: 'Current first-party privacy-test scope.' },
      { label: 'Privacy page', href: '/en/privacy/', note: 'Storage, local-processing wording, and limitations.' },
      { label: 'Open-source licences', href: '/open-source-licences/', note: 'Third-party component notices.' },
    ],
  },
};
