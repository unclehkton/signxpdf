import type { GuidePageContent, GuideSlug } from '../types';
import { phase4EnGuides } from './phase4-guides-en';

const VERIFICATION_NOTE =
  'Verification scope: the public repository source and open-source licence notices were reviewed on 2026-08-08. The public GitHub source is available for anonymous review; it is a source reference, not independent security certification. The sample PDF used for browser checks stayed on the test device and was not uploaded to Sign X PDF application servers. This is scoped evidence, not a guarantee about browser extensions, OS services, or future changes.';

export const enGuides: Record<GuideSlug, GuidePageContent> = {
  ...phase4EnGuides,
  'visible-vs-digital-signature': {
    slug: 'visible-vs-digital-signature',
    pathSegment: 'guides/visible-vs-digital-signature',
    title: 'Visible Signature vs Digital Signature on a PDF | Sign X PDF',
    description:
      'What a drawn or typed PDF signature is, how it differs from a certificate-backed digital signature, and what Sign X PDF actually does.',
    h1: 'Visible signature vs digital signature on a PDF',
    answerFirst:
      'Many people say “sign a PDF” when they mean placing a handwritten-style mark on a page. That is a visible (electronic appearance) signature. A certificate-backed digital signature is a different technology: it uses cryptography and a digital certificate, not just an image or ink stroke. Sign X PDF provides visible signature placement only.',
    sections: [
      {
        heading: 'What “sign PDF” often means in everyday use',
        paragraphs: [
          'In common language, signing a PDF usually means adding a mark that looks like a signature: draw with a pointer or stylus, type a name in a signature style, or place a photo of a handwritten signature on a page, then save a new PDF.',
          'That mark can be enough for informal approval workflows where the other party mainly needs a visible sign-off on the document. It is not the same thing as a cryptographic digital signature field that a PDF reader can mathematically verify.',
        ],
      },
      {
        heading: 'Visible / electronic appearance signatures',
        paragraphs: [
          'A visible signature is content drawn onto or overlaid on the page. Readers see ink-like strokes, typed text, or an image. The PDF still opens as a normal document; the mark is part of the page appearance (or an annotation-like visual), depending on how the tool writes the file.',
        ],
        bullets: [
          'Drawn signature from a signature pad',
          'Typed name styled as a signature',
          'Uploaded or camera-captured signature image',
          'No certificate, identity proofing, or cryptographic seal by itself',
        ],
      },
      {
        heading: 'Certificate-backed digital signatures',
        paragraphs: [
          'A digital signature in the cryptographic sense uses public-key technology. The signer’s certificate is bound to the document bytes so that later changes can invalidate the signature, and compatible viewers can report whether the signature is intact and who the certificate claims to identify.',
          'That workflow typically involves certificate issuance, private keys, and tools that implement standards such as PKCS#7/CMS-style PDF signatures (often discussed alongside PAdES profiles). Sign X PDF does not implement this path.',
        ],
      },
      {
        heading: 'What Sign X PDF does',
        paragraphs: [
          'Sign X PDF’s browser sign tool is designed for visible signature placement: draw, type, or place an image signature on a PDF in your browser. Processing is intended to stay on your device rather than uploading the PDF to Sign X PDF servers for signing.',
          'Limitations are intentional product boundaries, not temporary omissions in the marketing copy.',
        ],
        bullets: [
          'Supported: draw, type, and image-based visible signatures',
          'Not supported: certificate-backed cryptographic signing',
          'Not supported: identity verification, KYC, or audit-trail packages',
          'Not supported: claiming the mark is “legally binding everywhere” or eIDAS/ESIGN-certified by itself',
        ],
      },
      {
        heading: 'How to choose the right kind of signature',
        paragraphs: [
          'If you only need a visible mark for an informal process (for example, a form your counterpart accepts as a scanned wet-ink substitute), a browser visible-signature tool may be enough.',
          'If you need cryptographic integrity, certificate identity, long-term validation, or regulated e-signature workflows, use a product that explicitly implements digital/certificate signing—and follow your organisation’s policy. This page is product documentation, not legal advice.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is drawing a signature on a PDF a digital signature?',
        answer:
          'Not in the cryptographic sense. Drawing places a visible mark. A digital signature uses certificates and cryptography so viewers can verify integrity and certificate claims.',
      },
      {
        question: 'Does Sign X PDF create certificate-backed signatures?',
        answer:
          'No. Sign X PDF places visible signatures (draw, type, or image). It does not apply certificate-based cryptographic PDF signatures or verification.',
      },
      {
        question: 'Is a visible signature legally binding?',
        answer:
          'Legal effect depends on jurisdiction, the parties’ agreement, and the transaction. Sign X PDF does not give legal advice and does not claim that a visible mark is automatically valid everywhere.',
      },
      {
        question: 'Electronic signature vs digital signature — which phrase does Sign X PDF use?',
        answer:
          'We prefer “visible signature” or “add a signature” for our product. We avoid calling our marks “digital signatures” when that would imply cryptography.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Sign PDF tool' },
      { pathSegment: 'privacy', label: 'Privacy and local processing' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
    ],
    ogLocale: 'en_US',
    disclaimer:
      'This page explains product terminology for Sign X PDF. It is not legal advice. Requirements for electronic or digital signatures vary by jurisdiction and use case.',
    datePublished: '2026-08-08',
    dateModified: '2026-08-08',
    dateVerified: '2026-08-08',
    verificationNote: VERIFICATION_NOTE,
  },

  'how-browser-pdf-tools-work': {
    slug: 'how-browser-pdf-tools-work',
    pathSegment: 'guides/how-browser-pdf-tools-work',
    title: 'How Browser-Based PDF Tools Work | Sign X PDF',
    description:
      'How Sign X PDF processes PDFs in the browser: file APIs, pdf.js, pdf-lib, QPDF WebAssembly, workers, and what still loads from the network.',
    h1: 'How browser-based PDF tools work',
    answerFirst:
      'Browser PDF tools can edit files without posting your document to an application server. After the site’s scripts and assets load, the selected PDF is read with browser file APIs and processed with client-side libraries (and sometimes WebAssembly) inside your tab. Sign X PDF is built on that model for sign, merge, compress, reorder, and delete-page workflows.',
    sections: [
      {
        heading: 'Local processing vs “no network at all”',
        paragraphs: [
          'Local document processing means the PDF bytes you choose are not uploaded to Sign X PDF servers for conversion or storage as part of the tool workflow. It does not mean the browser never uses the network.',
          'Like any website, HTML, JavaScript, fonts, images, and WASM binaries still download when you open the app. After a warm load, editing runs from those already-fetched assets plus your local file.',
        ],
      },
      {
        heading: 'What happens when you open a PDF',
        paragraphs: [
          'You pick a file with the browser file picker or drag-and-drop. The page receives a File (or Blob) reference and reads it into memory (for example as an ArrayBuffer). Rendering and edits operate on that in-memory copy in the page or a worker—not on a server-side copy of your document.',
        ],
        bullets: [
          'Input: browser File / Blob APIs',
          'Preview: PDF rendering in the client (pdf.js-style pipeline)',
          'Edits: client libraries rewrite or reassemble PDF structure',
          'Output: save a new file to your device',
        ],
      },
      {
        heading: 'Libraries and roles in Sign X PDF',
        paragraphs: [
          'Sign X PDF splits heavy engines so crawlers and first paint do not need the full PDF runtime. Tool pages are prerendered HTML shells; the interactive editor loads as a client island when you use the tool.',
        ],
        bullets: [
          'pdf.js — page rendering / preview in the browser',
          'pdf-lib — many assemble and export operations in JavaScript',
          'QPDF (WebAssembly) — selected password and structure-preserving operations via a worker',
          'Signature pad / image tools — create visible signature artwork before placement',
        ],
      },
      {
        heading: 'Workers and WebAssembly',
        paragraphs: [
          'Some work runs in Web Workers so the UI thread stays responsive. QPDF is compiled to WebAssembly and loaded as an asset; it executes in the browser process after download, not as a remote PDF service.',
          'Because WASM and worker scripts are ordinary static assets, they appear in Network panels as site resources. That is expected and different from uploading your confidential PDF to an API endpoint.',
        ],
      },
      {
        heading: 'How you can check the privacy claim',
        paragraphs: [
          'Open browser developer tools, watch the Network panel while you open and export a uniquely named test PDF, and confirm the document is not posted to Sign X PDF application endpoints. Sign X PDF maintains automated privacy checks that fail closed on suspicious request patterns (including certain beacon, WebSocket, and service-worker traffic cases in test harnesses).',
          'Third-party browser extensions, OS services, or future features could still change network behaviour outside this app’s control—always re-check if your threat model is strict.',
        ],
      },
      {
        heading: 'Practical limits',
        paragraphs: [
          'Client-side processing is bounded by device memory and CPU. Very large scans, many simultaneous files, or low-memory phones may be slow or fail. Password-protected PDFs may need the open password before merge or edit. Compression quality depends on content (image-heavy PDFs behave differently from text PDFs).',
        ],
      },
    ],
    faq: [
      {
        question: 'Do browser PDF tools upload my file?',
        answer:
          'Some do. Sign X PDF is designed so selected PDFs are processed in the browser and not uploaded to Sign X PDF servers for tool processing. Always verify claims in Network tools for any site you use with confidential documents.',
      },
      {
        question: 'Why do I still see network requests?',
        answer:
          'Site assets (HTML, JS, fonts, WASM) load over the network. Local processing refers to your document bytes, not to zero network traffic for the website itself.',
      },
      {
        question: 'What is WebAssembly doing here?',
        answer:
          'QPDF is shipped as WebAssembly so advanced PDF operations can run on-device after the binary downloads. It is not a remote conversion server.',
      },
      {
        question: 'Is this the same as offline mode?',
        answer:
          'Not automatically. Offline use requires the browser to already have the app assets cached and a product path that has been verified after a warm load. Do not assume airplane mode works until you have tested it on your device.',
      },
    ],
    related: [
      { pathSegment: 'privacy', label: 'Privacy and local processing' },
      { pathSegment: 'sign-pdf', label: 'Sign PDF' },
      { pathSegment: 'merge-pdf', label: 'Merge PDF' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: 'Visible vs digital signature' },
      { pathSegment: 'open-source-licences', label: 'Open-source licences' },
    ],
    ogLocale: 'en_US',
    disclaimer:
      'Descriptions reflect Sign X PDF’s intended browser architecture. Features and network behaviour should be verified on the live site for your threat model.',
    datePublished: '2026-08-08',
    dateModified: '2026-08-08',
    dateVerified: '2026-08-08',
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      {
        method: 'Privacy network e2e (Playwright)',
        result: 'No PDF document bytes observed on application upload endpoints during sign/merge export fixtures',
        scope: 'Automated fixture PDFs in CI/local browser suite',
        limits: 'Does not prove every browser extension or OS behaviour; does not cover third-party ad frames in isolation',
        source: 'tests/e2e/privacy-no-upload.mjs',
      },
      {
        method: 'Architecture / client islands',
        result: 'PDF engines load as client islands after SSR shells; homepage does not preload pdf.worker or QPDF WASM',
        scope: 'Build-time inventory and code-splitting regression tests',
        limits: 'Inventory measures build artefacts, not every runtime path',
        source: 'tests/build/performance-phase2.test.ts',
      },
    ],
  },
};
