# Sign X PDF

Browser-based PDF tools for visible signatures and common page operations.

- Live application: [signxpdf.com](https://www.signxpdf.com/)
- Public source: [github.com/unclehkton/signxpdf](https://github.com/unclehkton/signxpdf)

This repository is a public, redacted source snapshot for Sign X PDF. It is intended to make the application structure and the tested privacy boundary inspectable without publishing private operational material.

## Features

- Add visible draw, type, or image signatures to PDFs
- Merge PDF files
- Compress PDF files
- Reorder pages
- Delete pages
- Run the document workflows in the browser
- Use the core workflows without an account

## Quick start

Requirements: a current Node.js release and npm.

```sh
npm install
npm run check
npm test
npm run build
```

For the browser privacy suite, install or allow the local Playwright browser and run:

```sh
npm run test:privacy
```

The development server is available with `npm run dev`. Deployment-specific settings are intentionally omitted; configure your own hosting environment.

## Verification scope

The browser test runner is [tests/e2e/privacy-no-upload.mjs](tests/e2e/privacy-no-upload.mjs). It uses non-confidential fixture PDFs and observes the tested workflows while monitoring:

- Fetch and XMLHttpRequest URLs, methods, headers, and bodies
- Filenames and unique PDF markers in request details
- Beacon calls and payloads
- WebSocket opens and messages
- Service Worker registration and worker-mediated network activity
- Download and export completion

A passing run is scoped evidence for the tested source, build, browser, fixtures, and date. It is not independent security certification. It does not prove that a compromised operating system, malware, browser extension, or another application cannot access a file. Ordinary website assets still use the network, so the test is not a promise of zero network requests or guaranteed offline operation.

## Signature scope

Sign X PDF adds visible signature artwork. It does not apply certificate-backed cryptographic PDF signatures, verify identity, promise universal legal validity, or provide a complete audit trail. Keep the distinction between a visible electronic signature and a certificate-backed digital signature explicit when evaluating the tool.

## Benchmark scope

Performance and file-size observations should be reproduced under stated browser, device, fixture, and build conditions. This public snapshot intentionally does not include private benchmark logs or deployment reports. Do not treat an unreported file-size or browser limit as a product guarantee.

## Public source layout

The public source keeps the application, third-party notices, privacy test harness, fixtures, and ordinary unit/build tests. 
The source is available for review and for rerunning relevant tests with non-confidential fixtures. It is a reference implementation, not a promise that every future deployment is identical to this snapshot.

## Privacy-minded contribution

Please do not add document contents, filenames, hashes, signature data, credentials, analytics identifiers, or other private material to issues or pull requests. When reporting a behavior, use a synthetic PDF and describe the browser and build conditions.

## License

This public snapshot is released under the [MIT License](LICENSE). Copyright (c) 2026 unclehkton. Third-party components remain subject to their own notices in [public/open-source-notices.txt](public/open-source-notices.txt).

