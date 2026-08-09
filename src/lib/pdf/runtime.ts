import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

let pdfLibPromise: Promise<typeof import('pdf-lib')> | null = null;
let pdfJsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

export function getPdfLib() {
  if (!pdfLibPromise) {
    pdfLibPromise = import('pdf-lib');
  }

  return pdfLibPromise;
}

export function getPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import('pdfjs-dist').then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = workerSrc;
      return lib;
    });
  }

  return pdfJsPromise;
}

export async function preloadPdfRuntime() {
  await Promise.all([getPdfLib(), getPdfJs()]);
}
