import type { GuidePageContent, Phase4GuideSlug } from '../types';

const VERIFIED = '2026-08-08';
const VERIFICATION_NOTE =
  'Verification scope: the public repository source and open-source components were reviewed on 2026-08-08. The public GitHub source is available for anonymous review; it is a source reference, not independent security certification. The test files used for browser checks stayed on the test device and were not uploaded to Sign X PDF application servers. This is scoped evidence, not a guarantee about a compromised device, browser extensions, OS services, or future code changes.';

export const phase4EnGuides: Record<Phase4GuideSlug, GuidePageContent> = {
  'how-to-check-pdf-upload': {
    slug: 'how-to-check-pdf-upload',
    pathSegment: 'guides/how-to-check-pdf-upload',
    title: 'How to Check Whether a PDF Website Uploads Your File | Sign X PDF',
    description:
      'A practical browser DevTools method for checking PDF uploads: unique markers, request bodies, fetch, XHR, Beacon, WebSockets, service workers, and limits.',
    h1: 'How to check whether a PDF website uploads your file',
    answerFirst:
      'Use a harmless PDF with a unique filename and marker, then watch the browser Network panel while opening, editing, and exporting it. Inspect fetch/XHR requests, request bodies, Beacon calls, WebSockets, and service-worker traffic. A clean check supports a scoped conclusion about the tested workflow; it does not prove what a compromised device or browser extension might do.',
    sections: [
      {
        heading: '1. Create a traceable test document',
        paragraphs: [
          'Do not begin with a confidential document. Make a small test PDF containing a unique marker such as PDF-UPLOAD-CHECK-20260808-ALPHA, and give it a unique filename such as private-check-20260808-alpha.pdf. The marker makes it easier to spot document bytes if a request body is visible.',
          'Use a file that is safe to expose during testing. The goal is to observe the request path, not to prove safety by risking a real customer document.',
        ],
        bullets: [
          'Use a unique filename and a unique text marker.',
          'Keep the fixture small enough to inspect and repeat.',
          'Record the browser, URL, operation, and test time.',
        ],
      },
      {
        heading: '2. Watch the Network panel before opening the file',
        paragraphs: [
          'Open DevTools, select Network, enable Preserve log, and clear existing requests. Filter by Fetch/XHR first, then repeat with All, WS, and other relevant filters. Load the page and let ordinary HTML, JavaScript, fonts, images, and WebAssembly assets finish downloading before selecting the test PDF.',
          'Asset requests are expected on a normal website. The question is whether the selected PDF bytes are sent to an application upload or conversion endpoint.',
        ],
        bullets: [
          'Look for POST or PUT requests that begin after file selection.',
          'Inspect request payload, form-data, and multipart fields where DevTools exposes them.',
          'Check request URLs, not only response status codes.',
          'Repeat the check while exporting, because upload behaviour can be delayed until export.',
        ],
      },
      {
        heading: '3. Check more than fetch and XHR',
        paragraphs: [
          'A narrow Fetch/XHR filter can miss other browser delivery paths. Check Beacon requests, WebSocket frames, and service-worker activity where the product uses them. A service worker can mediate a request even when the page code does not make a direct fetch call.',
          'The absence of a visible request is evidence for the observed browser session and workflow. It is not a proof that no other software on the device can read the file.',
        ],
        bullets: [
          'Beacon: inspect calls made during save, navigation, or page exit.',
          'WebSockets: inspect frames for document markers or file names.',
          'Service workers: inspect registrations and worker-mediated network activity.',
          'Search visible request details for the unique filename and marker.',
        ],
      },
      {
        heading: '4. Repeat the operation and compare the trace',
        paragraphs: [
          'Run the same fixture through each relevant operation, such as sign, merge, compress, reorder, and delete. Repeat once with a second unique marker. Consistent traces are more useful than a single clean page load, especially when an application loads code lazily.',
          'This is the same principle used by Sign X PDF’s automated privacy test: install deep request hooks, exercise the operation, and fail on suspicious document-upload patterns. The documented test scope shows the exact checks rather than asking you to trust a slogan.',
        ],
        bullets: [
          'Test both opening and exporting.',
          'Test every operation whose privacy model matters to you.',
          'Save a redacted HAR or screenshots only if they do not contain confidential content.',
        ],
      },
      {
        heading: 'What this check cannot prove',
        paragraphs: [
          'Browser Network inspection does not audit a compromised operating system, malware, a malicious extension, another application with file access, or a future deployment. It also cannot establish legal compliance or a provider’s retention policy when the provider’s server-side behaviour is outside the browser trace.',
          'Treat the result as a scoped, repeatable observation. For a high-risk workflow, review the provider’s source, privacy policy, retention terms, and threat model as well.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does a green Network panel prove a PDF website is private?',
        answer:
          'No. It supports a conclusion about the tested browser session and workflow. It does not cover malware, browser extensions, the operating system, server retention, or future changes.',
      },
      {
        question: 'Why use a unique filename and marker?',
        answer:
          'A unique filename and text marker make it easier to identify document bytes in request URLs, payloads, multipart data, or WebSocket frames without using a confidential document.',
      },
      {
        question: 'Does Sign X PDF use this kind of check?',
        answer:
          'Yes. Its public Playwright privacy test exercises sign, merge, compress, reorder, and delete workflows and watches request, Beacon, WebSocket, and service-worker paths within the stated test scope.',
      },
    ],
    related: [
      { pathSegment: 'verification', label: 'Sign X PDF verification methodology' },
      { pathSegment: 'privacy', label: 'Privacy and local processing' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
      { pathSegment: 'sign-pdf', label: 'Sign PDF tool' },
    ],
    ogLocale: 'en_US',
    disclaimer:
      'This is a practical testing method, not a security certification or legal opinion. Use a non-confidential fixture and define the threat model before relying on a result.',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      {
        method: 'Public privacy e2e test',
        result: 'The test installs request, Beacon, WebSocket, and service-worker hooks before exercising five PDF workflows.',
        scope: 'Repository Playwright fixtures and the configured application routes',
        limits: 'It does not prove behaviour of other applications, malicious extensions, malware, or future deployments.',
        source: 'tests/e2e/privacy-no-upload.mjs',
      },
      {
        method: 'Browser Network inspection method',
        result: 'Unique filenames and markers provide repeatable signals for checking request URLs and bodies.',
        scope: 'Manual investigation method described in this guide',
        limits: 'DevTools visibility depends on browser and service-worker behaviour; absence of a request is not a universal guarantee.',
        source: 'https://developer.chrome.com/docs/devtools/network/',
      },
    ],
  },

  'choose-private-pdf-tool': {
    slug: 'choose-private-pdf-tool',
    pathSegment: 'guides/choose-private-pdf-tool',
    title: 'How to Choose a Private PDF Tool: A Practical Checklist | Sign X PDF',
    description:
      'A neutral checklist for comparing PDF privacy: upload model, accounts, retention, telemetry, signatures, limits, and evidence.',
    h1: 'How to choose a private PDF tool',
    answerFirst:
      'Compare a PDF tool by asking what happens to document bytes, whether an account is required, how long files are retained, what telemetry is collected, what kind of signature it creates, and which limits are disclosed. A “private” label is only useful when the processing model and evidence are clear.',
    sections: [
      {
        heading: 'Start with the processing model',
        paragraphs: [
          'First ask whether the PDF is uploaded to an application server, processed locally in the browser, or handled by a hybrid workflow. “The page uses HTTPS” does not answer that question: encrypted transport can still carry a document to a server.',
          'If a product claims browser-local processing, test it with a unique fixture in the Network panel. Read the scope and limitations rather than treating “local” as “no network at all”.',
        ],
      },
      {
        heading: 'Use this comparison checklist',
        paragraphs: [
          'The questions below are intentionally product-neutral. They help you compare a free browser tool, a hosted document service, and a self-hosted application without rewarding vague privacy slogans.',
        ],
        bullets: [
          'Does the PDF upload? This determines whether document bytes leave the browser for server processing.',
          'Is an account required? An account can link document activity to an identity even when the file is deleted quickly.',
          'How long are files retained? Look for deletion timing, backups, logs, and support access—not only the word “temporary”.',
          'Does processing run locally? Confirm the claim with a repeatable Network trace and inspect the source when available.',
          'What telemetry exists? Distinguish document metadata, filenames, usage events, error reports, ads, and ordinary asset requests.',
          'Is the signature visible or certificate-backed? A drawn or typed mark is not the same as a cryptographic digital signature.',
          'Are limits disclosed? File size, page count, browser memory, password protection, and export failures matter for real work.',
        ],
      },
      {
        heading: 'Match the tool to your threat model',
        paragraphs: [
          'For a low-risk form, a local browser tool may be convenient. For regulated records, consider whether you need identity verification, audit trails, certificate-backed signatures, retention controls, administrator policies, or a reviewable self-hosted deployment. Privacy is not one score that applies to every workflow.',
          'Sign X PDF is deliberately narrower: it provides visible signature placement and common PDF operations in the browser, without claiming certificate-backed signing, universal legal validity, or protection from a compromised device.',
        ],
      },
      {
        heading: 'Prefer evidence over claims',
        paragraphs: [
          'A useful provider explains how its claim was checked, publishes source code or a method, dates its verification, and names what the test does not prove. That evidence is more valuable than a long list of privacy adjectives.',
          'Sign X PDF publishes a verification hub and documents its privacy test scope. The test is evidence about the configured workflows—not a blanket guarantee for every browser, extension, operating system, or future feature.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is a browser-local PDF tool always the most private option?',
        answer:
          'Not automatically. Device security, browser extensions, caching, telemetry, product limits, and your required compliance controls still matter. Verify the actual workflow and threat model.',
      },
      {
        question: 'What is the first question to ask a PDF provider?',
        answer: 'Ask whether the selected PDF bytes are uploaded to an application server for processing or storage, then ask how the provider proves the answer.',
      },
      {
        question: 'Does Sign X PDF claim to be the safest PDF tool?',
        answer:
          'No. It describes a browser-local processing design, publishes scoped tests, and discloses limitations so users can compare it with alternatives.',
      },
    ],
    related: [
      { pathSegment: 'verification', label: 'Verification methodology' },
      { pathSegment: 'privacy', label: 'Privacy policy and storage disclosure' },
      { pathSegment: 'guides/how-to-check-pdf-upload', label: 'How to check for PDF uploads' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: 'Visible vs digital signature' },
    ],
    ogLocale: 'en_US',
    disclaimer:
      'This checklist is general product guidance, not legal, regulatory, or information-security advice for a particular organisation.',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      {
        method: 'First-party privacy test scope',
        result: 'Sign X PDF documents the five operations covered by its automated no-upload test instead of generalising from one tool.',
        scope: 'Sign, merge, compress, reorder, and delete workflows',
        limits: 'The test does not cover every future feature or every environment outside the test harness.',
        source: '/en/verification/',
      },
      {
        method: 'Signature terminology source',
        result: 'The product distinguishes visible signature placement from certificate-backed digital signing.',
        scope: 'Current sign tool capability and public terminology guide',
        limits: 'Legal effect depends on jurisdiction and transaction context.',
        source: 'README.md#signature-scope',
      },
    ],
  },

  'pdf-compression-size-quality': {
    slug: 'pdf-compression-size-quality',
    pathSegment: 'guides/pdf-compression-size-quality',
    title: 'PDF Compression: File Size vs Image Quality | Sign X PDF',
    description:
      'How to evaluate PDF compression with text, scanned, photo-heavy, and mixed fixtures, including target size, achieved size, and visual trade-offs.',
    h1: 'PDF compression: file size vs image quality',
    answerFirst:
      'PDF compression is a trade-off, not a universal percentage. Text-heavy, scanned, photo-heavy, and mixed PDFs respond differently. Measure the original size, achieved size, target result, and visible quality for a fixed fixture set instead of promising that every PDF will shrink by the same amount.',
    sections: [
      {
        heading: 'Why one compression number is misleading',
        paragraphs: [
          'A text-heavy PDF may already contain efficient vector and font data. A scan may contain large raster images that can be recompressed. A photo-heavy document may shrink substantially but show softness or blocking at lower quality. A mixed file can contain all three behaviours on different pages.',
          'The meaningful result is not “compression is 70%”. It is a measured before/after pair with the fixture type, target setting, achieved size, and a visual inspection note.',
        ],
      },
      {
        heading: 'A reproducible fixture set',
        paragraphs: [
          'Create four non-confidential fixtures: text-heavy, scanned-document, photo-heavy, and mixed-content. Keep the source files fixed and record their byte sizes and page counts. Use the same browser, device class, target setting, and date when comparing runs.',
        ],
        bullets: [
          'Text-heavy: selectable text, simple vector shapes, and normal fonts.',
          'Scanned: raster page images with realistic document detail.',
          'Photo-heavy: several photographic images with varied detail.',
          'Mixed: text, diagrams, screenshots, and at least one image-heavy page.',
        ],
      },
      {
        heading: 'What Sign X PDF’s compressor reports',
        paragraphs: [
          'The browser compressor first tries lossless assembly, then can rasterize pages and search JPEG quality settings when a target size requires it. The result reports original bytes, achieved bytes, whether the target was reached, and whether the lossless path was used.',
          'That means a target such as 500 KB is a request, not a guarantee. A document may remain above the target, and stronger reduction can change image quality. Review the exported file before relying on it.',
        ],
        bullets: [
          'Original size and achieved size are the primary measurements.',
          'Target reached is a result flag, not a promise.',
          'Lossless output and raster/JPEG output have different quality implications.',
          'Visual inspection is required for scans, photos, signatures, and small text.',
        ],
      },
      {
        heading: 'Record the result honestly',
        paragraphs: [
          'A useful benchmark table contains fixture type, page count, input bytes, target bytes, output bytes, reduction percentage, elapsed time, and a short visual-effect note. Publish the raw conditions with the result so another person can repeat it.',
          'Do not convert one local run into a universal maximum or minimum. Browser memory, CPU, canvas support, PDF structure, and source image content all affect the result.',
        ],
      },
      {
        heading: 'Measured Windows desktop run — 2026-08-08',
        paragraphs: [
          'The following run used synthetic, non-confidential PDFs on Windows with Chromium 136.0.7103.25. The text fixture intentionally used a 50 KB target above its lossless size; the image fixtures used a target of approximately 60% of the input size. A negative reduction means the lossless PDF assembly was slightly larger than the generated source, not that the file was silently claimed to be smaller.',
          'Visual notes are first-page preview signals. They identify when the output was rasterised or changed dimensions, but they are not an automated readability score. Keep the original and inspect text, scans, photos, and signatures before relying on the export.',
        ],
        table: {
          caption: 'Synthetic fixture measurements from the repeatable browser runner',
          headers: ['Fixture', 'Pages', 'Input', 'Target', 'Output', 'Reduction', 'Elapsed', 'Reached'],
          rows: [
            ['Text-heavy', '8', '15,788 B', '50 KB', '15,996 B', '-1.32%', '252 ms', 'Yes'],
            ['Scanned', '5', '3,180,540 B', '1,863 KB', '1,863,750 B', '41.40%', '2,422 ms', 'Yes'],
            ['Photo-heavy', '3', '5,667,651 B', '3,320 KB', '3,235,768 B', '42.91%', '1,971 ms', 'Yes'],
            ['Mixed', '4', '3,782,484 B', '2,216 KB', '2,215,598 B', '41.42%', '2,073 ms', 'Yes'],
          ],
        },
      },
    ],
    faq: [
      {
        question: 'Will every PDF reach a 500 KB target?',
        answer: 'No. The tool r…32578 tokens truncated…on. Sign X PDF est conçu pour traiter le PDF sélectionné localement dans le navigateur, et non pour l’envoyer aux serveurs de Sign X PDF pour conversion ou stockage.',
      },
      {
        question: 'Faut-il un compte ?',
        answer: 'Aucun compte n’est requis pour utiliser les outils dans le navigateur.',
      },
      {
        question: 'Que se passe-t-il quand j’ai fini ?',
        answer:
          'Vous enregistrez le PDF mis à jour sur votre appareil. Dans ce flux, Sign X PDF ne conserve pas de copie serveur de votre fichier.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Signer un PDF' },
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  sign: {
    title: 'Signer un PDF dans le navigateur — Signature visible | Sign X PDF',
    description:
      'Ajoutez une signature visible à un PDF dans le navigateur. Dessinez, saisissez ou placez une image de signature en local, sans envoyer le PDF aux serveurs de Sign X PDF.',
    h1: 'Signer un PDF dans le navigateur',
    answerFirst:
      'Sign X PDF permet d’ajouter une signature visible à un PDF directement dans le navigateur. Le document est traité sur votre appareil plutôt qu’envoyé aux serveurs de Sign X PDF. Aucun compte n’est requis. À la fin, enregistrez le PDF signé sur votre appareil.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Créez une signature en dessinant, en tapant, en important une image ou via la caméra si disponible, placez-la sur la page, puis exportez un nouveau PDF.',
    howTo: [
      'Ouvrez un PDF ou une image prise en charge.',
      'Créez ou choisissez une signature (dessin, texte, image ou caméra).',
      'Placez et redimensionnez la signature sur la page.',
      'Enregistrez le PDF signé sur votre appareil.',
    ],
    localProcessing:
      'La création de la signature et l’export du PDF s’exécutent avec des bibliothèques côté client dans le navigateur, une fois les ressources de la page chargées.',
    limitations: [
      'Cela ajoute une apparence de signature visible, pas une signature numérique cryptographique adossée à un certificat.',
      'Cela ne crée pas à lui seul une piste d’audit, une vérification d’identité ni une garantie de validité juridique.',
      'Les PDF chiffrés peuvent nécessiter le mot de passe d’ouverture avant modification.',
    ],
    faq: [
      {
        question: 'S’agit-il d’une signature numérique avec certificat ?',
        answer:
          'Non. Sign X PDF place une signature visible (dessinée, saisie ou image). Elle n’applique pas de signature cryptographique par certificat, d’horodatage ni de vérification de signature.',
      },
      {
        question: 'Faut-il envoyer le PDF pour le signer ?',
        answer:
          'Non. La signature est conçue pour s’exécuter localement dans le navigateur. Les ressources ordinaires du site se téléchargent toujours sur le réseau.',
      },
      {
        question: 'Puis-je utiliser une photo de ma signature ?',
        answer:
          'Oui. Vous pouvez importer une image de signature ou la capturer si le navigateur autorise l’accès à la caméra.',
      },
      {
        question: 'Dessiner sur un PDF, c’est la même chose qu’une signature numérique ?',
        answer:
          'Non. Dessiner place une marque visible. Une signature numérique adossée à un certificat repose sur la cryptographie et un certificat numérique. Sign X PDF ne place que des signatures visibles.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Fusionner des fichiers PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages' },
      { pathSegment: 'privacy', label: 'Confidentialité et traitement local' },
    ],
  },
  merge: {
    title: 'Fusionner des PDF localement dans le navigateur — sans envoyer vos fichiers | Sign X PDF',
    description:
      'Combinez plusieurs PDF en un seul fichier dans le navigateur. La fusion se fait en local — vos fichiers ne sont pas envoyés aux serveurs de Sign X PDF.',
    h1: 'Fusionner des fichiers PDF dans le navigateur',
    answerFirst:
      'Utilisez Sign X PDF pour fusionner plusieurs PDF en un seul document dans le navigateur. Les fichiers sont traités sur votre appareil, sans envoi aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF fusionné une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Chargez un ou plusieurs PDF (et images prises en charge), arrangez les pages et exportez un PDF combiné unique.',
    howTo: [
      'Ouvrez l’espace de travail de fusion ci-dessous.',
      'Ajoutez les fichiers PDF à combiner.',
      'Réordonnez les pages si besoin.',
      'Enregistrez le PDF fusionné sur votre appareil.',
    ],
    localProcessing:
      'La fusion s’appuie sur des bibliothèques PDF côté client dans le navigateur après le chargement des ressources. Les fichiers sélectionnés ne sont pas envoyés aux serveurs de Sign X PDF pour la fusion.',
    limitations: [
      'Les limites de mémoire du navigateur s’appliquent aux très gros fichiers ou à un grand nombre de fichiers.',
      'Certains PDF chiffrés exigent un mot de passe avant de pouvoir être fusionnés.',
    ],
    faq: [
      {
        question: 'Puis-je fusionner plus de deux PDF ?',
        answer:
          'Oui. Ajoutez plusieurs fichiers dans l’espace de travail, puis exportez un seul PDF combiné.',
      },
      {
        question: 'Mes fichiers sont-ils envoyés pour être fusionnés ?',
        answer: 'Non. Le traitement de fusion est conçu pour rester dans le navigateur.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Supprimer des pages PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  compress: {
    title: 'Compresser un PDF dans le navigateur | Sign X PDF',
    description:
      'Réduisez la taille d’un PDF dans le navigateur. La compression s’exécute en local, sans envoyer le fichier aux serveurs de Sign X PDF.',
    h1: 'Compresser un PDF dans le navigateur',
    answerFirst:
      'Compressez un PDF directement dans le navigateur avec Sign X PDF. Le traitement reste sur votre appareil plutôt que d’envoyer le fichier aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF allégé une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Chargez un PDF, choisissez une taille cible si disponible, lancez la compression dans le navigateur et enregistrez le résultat.',
    howTo: [
      'Ouvrez un PDF dans l’espace de travail.',
      'Choisissez les réglages de compression.',
      'Lancez la compression et vérifiez la taille obtenue.',
      'Enregistrez le PDF compressé.',
    ],
    localProcessing:
      'La compression utilise un traitement sur l’appareil après le chargement des ressources de l’outil. Le PDF n’est pas envoyé aux serveurs de Sign X PDF pour compression.',
    limitations: [
      'La réduction possible dépend du contenu (scans par rapport au texte).',
      'Une compression forte peut dégrader la qualité visuelle des images dans le PDF.',
    ],
    faq: [
      {
        question: 'La compression atteint-elle toujours la taille souhaitée ?',
        answer:
          'Pas toujours. Les scans riches en images se compressent autrement qu’un PDF texte. L’outil indique la taille obtenue.',
      },
      {
        question: 'Le PDF est-il envoyé pour être compressé ?',
        answer: 'Non. La compression est conçue pour s’exécuter localement dans le navigateur.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages' },
      { pathSegment: 'sign-pdf', label: 'Signer un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  reorder: {
    title: 'Réordonner les pages d’un PDF dans le navigateur | Sign X PDF',
    description:
      'Modifiez l’ordre des pages d’un PDF dans le navigateur. Le réordonnancement est local — les fichiers ne sont pas envoyés aux serveurs de Sign X PDF.',
    h1: 'Réordonner les pages d’un PDF dans le navigateur',
    answerFirst:
      'Réordonnez les pages d’un PDF directement dans le navigateur avec Sign X PDF. Le fichier est traité localement, sans envoi aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF réordonné une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Ouvrez un PDF, glissez ou déplacez les pages dans l’ordre souhaité, puis exportez le document mis à jour.',
    howTo: [
      'Chargez un PDF dans l’espace de travail.',
      'Glissez les pages dans l’ordre souhaité.',
      'Vérifiez la séquence des pages.',
      'Enregistrez le PDF mis à jour.',
    ],
    localProcessing:
      'Le réordonnancement des pages s’applique avec des outils PDF côté client dans le navigateur, après le chargement des ressources.',
    limitations: [
      'Les très gros documents peuvent être plus lents à afficher en miniatures.',
      'Les PDF protégés par mot de passe peuvent devoir être déverrouillés d’abord.',
    ],
    faq: [
      {
        question: 'Puis-je réordonner après une fusion ?',
        answer: 'Oui. Fusionnez ou ajoutez des pages d’abord, puis réorganisez avant d’enregistrer.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Supprimer des pages' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  deletePages: {
    title: 'Supprimer des pages PDF localement dans le navigateur — sans envoyer vos fichiers | Sign X PDF',
    description:
      'Retirez les pages indésirables d’un PDF dans le navigateur. La suppression s’exécute en local, sans envoyer le PDF aux serveurs de Sign X PDF.',
    h1: 'Supprimer des pages d’un PDF dans le navigateur',
    answerFirst:
      'Supprimez des pages d’un PDF dans le navigateur avec Sign X PDF. Le traitement reste sur votre appareil plutôt que d’envoyer le fichier aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF mis à jour une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Ouvrez un PDF, sélectionnez les pages à retirer, vérifiez le reste, puis exportez un nouveau fichier sans ces pages.',
    howTo: [
      'Chargez un PDF dans l’espace de travail.',
      'Sélectionnez les pages à supprimer.',
      'Vérifiez que les pages restantes sont correctes.',
      'Enregistrez le PDF mis à jour.',
    ],
    localProcessing:
      'La suppression de pages s’effectue avec des bibliothèques côté client dans le navigateur, une fois l’outil chargé.',
    limitations: [
      'Les pages supprimées ne peuvent pas être récupérées dans le fichier exporté.',
      'Certains PDF chiffrés exigent un mot de passe avant de pouvoir modifier les pages.',
    ],
    faq: [
      {
        question: 'Puis-je supprimer plusieurs pages d’un coup ?',
        answer:
          'Oui. Sélectionnez plusieurs pages dans le gestionnaire de pages, puis retirez-les avant d’enregistrer.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages' },
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  privacy: {
    title: 'Confidentialité — Traitement local des PDF | Sign X PDF',
    description:
      'Comment Sign X PDF traite les PDF dans le navigateur sans envoyer le document pour le traitement des outils, comment évaluer les éditeurs privés, et ce que nous ne prétendons pas.',
    h1: 'Confidentialité et traitement local des PDF',
    answerFirst:
      'Sign X PDF est conçu pour que le PDF sélectionné soit lu et traité dans le navigateur pour la signature et les modifications courantes. Ce PDF n’est pas envoyé aux serveurs de Sign X PDF pour ce traitement. Les ressources normales du site se téléchargent toujours sur le réseau. Aucun compte n’est requis pour ces outils navigateur.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF pour le traitement des outils.',
    whatItDoes:
      'Cette page explique le modèle de confidentialité des outils navigateur Sign X PDF, en quoi le traitement local diffère des sites qui demandent un envoi de fichier, et une liste pratique pour évaluer tout éditeur PDF auquel vous confiez des documents sensibles.',
    howTo: [
      'Le HTML, le JavaScript, les polices et les ressources WASM de l’application se téléchargent comme sur tout site.',
      'Vous choisissez un PDF via le sélecteur du navigateur ou par glisser-déposer (le navigateur conserve une référence locale au fichier).',
      'Le fichier est lu avec les API du navigateur et traité sur l’appareil avec des bibliothèques côté client et, le cas échéant, WebAssembly.',
      'Vous enregistrez le résultat sur votre appareil ; le flux n’est pas conçu pour conserver une copie serveur de votre PDF.',
    ],
    localProcessing:
      'Traitement local signifie que le pipeline d’édition s’exécute dans l’onglet du navigateur avec du code côté client (y compris un rendu de type pdf.js, l’assemblage pdf-lib et QPDF WebAssembly pour certaines opérations). Cela ne signifie pas « aucun réseau du tout » : les scripts et autres ressources se chargent encore, et la publicité ou l’analytique tierce peut encore demander des ressources web ordinaires si présentes. Les octets du document dans le flux de l’outil sont destinés à rester dans l’onglet plutôt qu’à être envoyés en POST vers les serveurs d’application de Sign X PDF.',
        storageDisclosure: {
      heading: "Stockage navigateur utilisé par Sign X PDF",
      storageColumn: "Stockage",
      purposeColumn: "Finalité",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Préférence de langue et une courte fenêtre de limitation des exports gratuits. Ce sont des données first-party du site, pas des cookies publicitaires.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Signatures enregistrées que vous choisissez de conserver dans ce navigateur (y compris les blobs d’image) pour les réutiliser.",
        },
        {
          storage: "Cookies",
          purpose:
            "Le traitement PDF principal n’exige pas de cookies publicitaires first-party. Des publicités ou analyses tierces, si présentes, peuvent déposer leurs propres cookies selon leur politique.",
        },
      ],
      clearNote:
        "Effacer les données de ce site dans le navigateur supprime les préférences et signatures enregistrées localement. Le flux de l’outil ne conserve pas de copie PDF côté serveur.",
    },
limitations: [
      'Le traitement local ne protège pas un appareil compromis ni des extensions de navigateur malveillantes.',
      'Nous ne prétendons pas à une confidentialité militaire, à un anonymat total, à une télémétrie nulle dans tous les environnements de navigateur, ni à un risque zéro.',
      'Les ressources ordinaires du site se téléchargent toujours ; l’usage hors ligne n’est pas garanti tant que vous n’avez pas vérifié un chargement à chaud sur votre appareil.',
      'Si une fonctionnalité future exigeait un envoi réseau, un changement de conception explicite et une formulation mise à jour seraient nécessaires.',
    ],
    faq: [
      {
        question: 'Des données quittent-elles mon appareil ?',
        answer:
          'Les ressources du site se téléchargent normalement. Le PDF sélectionné est destiné à rester dans le navigateur pendant le traitement. Nous n’affirmons pas qu’aucun octet ne quitte jamais l’appareil dans toutes les circonstances (par exemple le comportement du système ou d’extensions hors de l’application).',
      },
      {
        question: 'Stockez-vous mon PDF sur un serveur ?',
        answer:
          'Les outils navigateur décrits ici ne sont pas conçus pour envoyer votre PDF aux serveurs de Sign X PDF pour stockage ou conversion.',
      },
      {
        question: "Quel stockage navigateur Sign X PDF utilise-t-il ?",
        answer:
          "localStorage stocke la préférence de langue et une fenêtre de limite d’export. IndexedDB stocke les signatures que vous conservez. Le traitement PDF principal n’exige pas de cookies publicitaires first-party. Effacez les données du site pour retirer ces éléments locaux.",
      },
      {
        question: 'Faut-il un compte ?',
        answer:
          'Aucun compte n’est requis pour utiliser les outils de signature et PDF du navigateur décrits sur ce site.',
      },
      {
        question: 'Comment juger si un éditeur PDF en ligne est sûr ?',
        answer:
          'Préférez un modèle de traitement clair (envoi versus local), une politique de conservation, l’exigence de compte, la transparence sur la télémétrie, si les signatures sont des marques visibles ou adossées à un certificat, des composants open source inspectables et des limites pratiques de fichiers. Vérifiez les affirmations avec les outils Réseau du navigateur en utilisant un fichier de test au nom unique.',
      },
      {
        question: 'Sign X PDF est-il automatiquement l’option la plus sûre ?',
        answer:
          'Aucun outil n’est automatiquement le plus sûr pour tous les modèles de menace. Sign X PDF vise un traitement local du document et des limites transparentes. Comparez des critères — pas des slogans — et revérifiez le comportement réseau pour votre cas d’usage.',
      },
      {
        question: 'Puis-je inspecter les composants open source ?',
        answer:
          'Oui. Les mentions de licence pour QPDF, pdf-lib et d’autres bibliothèques figurent sur la page des licences open source.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Signer un PDF' },
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'open-source-licences', label: 'Licences open source' },
      { pathSegment: '', label: 'Tous les outils' },
    ],
  },
});
