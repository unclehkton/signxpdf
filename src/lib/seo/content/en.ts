import type { LocaleBundle } from '../types';
import { enGuides } from './guides-en';

export const enBundle: LocaleBundle = {
  locale: 'en',
  htmlLang: 'en',
  nav: {
    home: 'Home',
    sign: 'Sign PDF',
    tools: 'PDF tools',
    privacy: 'Privacy',
    guides: 'Guides',
    openTool: 'Use this tool in your browser',
    relatedTools: 'Related pages',
    howTo: 'How to use it',
    whatItDoes: 'What this tool does',
    localProcessing: 'How local processing works',
    limitations: 'Limitations',
    faq: 'FAQ',
    enableJs: 'Enable JavaScript to edit PDFs locally in your browser. No upload is required once the page assets have loaded.',
    published: 'Published',
    updated: 'Last updated',
    verified: 'Last verified',
    howWeVerified: 'How we verified this',
  },
  home: {
    slug: 'home',
    pathSegment: '',
    title: 'Private PDF Tools — Sign, Merge & Compress | Sign X PDF',
    description:
      'Sign, merge, compress, reorder, and delete PDF pages in your browser. Your PDF is processed on your device rather than uploaded to Sign X PDF servers.',
    h1: 'Sign and edit PDFs privately in your browser',
    answerFirst:
      'Sign X PDF lets you add a visible signature and perform common PDF operations directly in your browser. Your PDF is processed on your device rather than uploaded to Sign X PDF servers. No account is required. When you finish, save the updated file to your device.',
    privacyNote:
      'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers. Ordinary website assets (HTML, scripts, fonts) still load from the network as on any website.',
    whatItDoes:
      'Choose a focused tool for signing, merging, compressing, reordering pages, or deleting pages. Each tool page explains the workflow and loads the editor only when you use it.',
    howTo: [
      'Pick a tool such as Sign PDF or Merge PDF.',
      'Open your file with the on-page file picker (or drag and drop where offered).',
      'Complete the edits in your browser.',
      'Save the result to your device.',
    ],
    localProcessing:
      'After the app assets load, file reading, rendering, and export use browser APIs and client-side libraries. The selected PDF is not posted to Sign X PDF application servers for processing.',
    limitations: [
      'A modern browser with JavaScript is required for editing.',
      'Very large PDFs may be slower on low-memory devices.',
      'Local processing does not protect against malware on your device or malicious browser extensions.',
    ],
    faq: [
      {
        question: 'Is my PDF uploaded?',
        answer:
          'No. Sign X PDF is designed so the selected PDF is processed locally in your browser, not uploaded to Sign X PDF servers for conversion or storage.',
      },
      {
        question: 'Do I need an account?',
        answer: 'No account is required to use the browser tools.',
      },
      {
        question: 'What happens when I finish?',
        answer: 'You save the updated PDF to your device. Sign X PDF does not keep a server-side copy of your file for this workflow.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Sign PDF' },
      { pathSegment: 'merge-pdf', label: 'Merge PDF' },
      { pathSegment: 'compress-pdf', label: 'Compress PDF' },
      { pathSegment: 'privacy', label: 'Privacy' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: 'Visible vs digital signature' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
    ],
    ogLocale: 'en_US',
    toolKind: 'none',
  },
  tools: {
    'sign-pdf': {
      slug: 'sign-pdf',
      pathSegment: 'sign-pdf',
      title: 'Sign PDF in Your Browser — Visible Signature | Sign X PDF',
      description:
        'Add a visible signature to a PDF in your browser. Draw, type, or place an image signature locally — without uploading the PDF to Sign X PDF servers.',
      h1: 'Sign a PDF in your browser',
      answerFirst:
        'Sign X PDF lets you add a visible signature to a PDF directly in your browser. The PDF is processed locally on your device instead of being uploaded to Sign X PDF servers. No account is required. When you finish, save the updated PDF to your device.',
      privacyNote:
        'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers.',
      whatItDoes:
        'Create a signature by drawing, typing, uploading an image, or using the camera where available, then place it on the page and export a new PDF.',
      howTo: [
        'Open a PDF or supported image.',
        'Create or choose a signature (draw, type, upload, or camera).',
        'Place and resize the signature on the page.',
        'Save the signed PDF to your device.',
      ],
      localProcessing:
        'Signature creation and PDF export run with client-side libraries in your browser after the page assets load.',
      limitations: [
        'This adds a visible signature appearance, not a certificate-backed cryptographic digital signature.',
        'It does not create an audit trail, identity verification, or legal-validity guarantee by itself.',
        'Encrypted PDFs may need the open password before editing.',
      ],
      faq: [
        {
          question: 'Is this a certificate-backed digital signature?',
          answer:
            'No. Sign X PDF places a visible signature (drawn, typed, or image). It does not apply certificate-based cryptographic signing, timestamping, or signature verification.',
        },
        {
          question: 'Is the PDF uploaded to sign it?',
          answer:
            'No. Signing is designed to run locally in your browser. Ordinary site assets still download over the network.',
        },
        {
          question: 'Can I use a photo of my signature?',
          answer: 'Yes. You can upload a signature image or capture one where your browser allows camera access.',
        },
        {
          question: 'Is drawing on a PDF the same as a digital signature?',
          answer:
            'No. Drawing places a visible mark. A certificate-backed digital signature uses cryptography and a digital certificate. Sign X PDF only places visible signatures.',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: 'Merge PDF files' },
        { pathSegment: 'compress-pdf', label: 'Compress a PDF' },
        { pathSegment: 'privacy', label: 'Privacy and local processing' },
        { pathSegment: 'guides/visible-vs-digital-signature', label: 'Visible vs digital signature' },
      ],
      ogLocale: 'en_US',
      toolKind: 'sign',
    },
    'merge-pdf': {
      slug: 'merge-pdf',
      pathSegment: 'merge-pdf',
      title: 'Merge PDF Locally in Your Browser — No PDF Upload | Sign X PDF',
      description:
        'Combine multiple PDFs into one file in your browser. Merge happens locally — your files are not uploaded to Sign X PDF servers.',
      h1: 'Merge PDF files in your browser',
      answerFirst:
        'Use Sign X PDF to merge multiple PDFs into a single document in your browser. Files are processed locally on your device rather than uploaded to Sign X PDF servers. No account is required. Save the merged PDF when you finish.',
      privacyNote:
        'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers.',
      whatItDoes:
        'Load one or more PDFs (and supported images), arrange pages, and export a single combined PDF.',
      howTo: [
        'Open the merge tool workspace below.',
        'Add the PDF files you want to combine.',
        'Reorder pages if needed.',
        'Save the merged PDF to your device.',
      ],
      localProcessing:
        'Merging uses client-side PDF libraries in the browser after assets load. The selected files are not sent to Sign X PDF servers for merge processing.',
      limitations: [
        'Browser memory limits apply for very large or numerous files.',
        'Some encrypted PDFs require a password before they can be merged.',
      ],
      faq: [
        {
          question: 'Can I merge more than two PDFs?',
          answer: 'Yes. Add multiple files in the tools workspace, then export one combined PDF.',
        },
        {
          question: 'Are my files uploaded to merge them?',
          answer: 'No. Merge processing is designed to stay in your browser.',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: 'Reorder PDF pages' },
        { pathSegment: 'delete-pdf-pages', label: 'Delete PDF pages' },
        { pathSegment: 'compress-pdf', label: 'Compress PDF' },
        { pathSegment: 'privacy', label: 'Privacy' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
      ],
      ogLocale: 'en_US',
      toolKind: 'tools',
      toolsFocus: 'merge',
    },
    'compress-pdf': {
      slug: 'compress-pdf',
      pathSegment: 'compress-pdf',
      title: 'Compress PDF in Your Browser | Sign X PDF',
      description:
        'Reduce PDF file size in your browser. Compression runs locally without uploading your PDF to Sign X PDF servers.',
      h1: 'Compress a PDF in your browser',
      answerFirst:
        'Compress a PDF directly in your browser with Sign X PDF. Processing stays on your device instead of uploading the file to Sign X PDF servers. No account is required. Save the smaller PDF when you finish.',
      privacyNote:
        'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers.',
      whatItDoes:
        'Load a PDF, choose a target size where available, run compression in the browser, and save the result.',
      howTo: [
        'Open a PDF in the workspace.',
        'Choose compression settings.',
        'Run compress and review the result size.',
        'Save the compressed PDF.',
      ],
      localProcessing:
        'Compression uses on-device processing after the tool assets load. The PDF is not uploaded to Sign X PDF servers for compression.',
      limitations: [
        'How small a file can become depends on content (scans vs text).',
        'Heavy compression can reduce visual quality of images inside the PDF.',
      ],
      faq: [
        {
          question: 'Will compression always reach my target size?',
          answer:
            'Not always. Image-heavy scans compress differently from text PDFs. The tool reports the size it achieved.',
        },
        {
          question: 'Is the PDF uploaded to compress it?',
          answer: 'No. Compression is designed to run locally in your browser.',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: 'Merge PDF' },
        { pathSegment: 'reorder-pdf', label: 'Reorder pages' },
        { pathSegment: 'privacy', label: 'Privacy' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
      ],
      ogLocale: 'en_US',
      toolKind: 'tools',
      toolsFocus: 'compress',
    },
    'reorder-pdf': {
      slug: 'reorder-pdf',
      pathSegment: 'reorder-pdf',
      title: 'Reorder PDF Pages in Your Browser | Sign X PDF',
      description:
        'Rearrange PDF page order in your browser. Reordering is local — files are not uploaded to Sign X PDF servers.',
      h1: 'Reorder PDF pages in your browser',
      answerFirst:
        'Reorder PDF pages directly in your browser with Sign X PDF. Your file is processed locally rather than uploaded to Sign X PDF servers. No account is required. Save the reordered PDF when you finish.',
      privacyNote:
        'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers.',
      whatItDoes:
        'Open a PDF, drag or move pages into the order you need, then export the updated document.',
      howTo: [
        'Load a PDF in the workspace.',
        'Drag pages to the desired order.',
        'Review the page sequence.',
        'Save the updated PDF.',
      ],
      localProcessing:
        'Page reordering is applied with client-side PDF tools in your browser after assets load.',
      limitations: [
        'Very large documents may be slower to render as thumbnails.',
        'Password-protected PDFs may need unlocking first.',
      ],
      faq: [
        {
          question: 'Can I reorder after merging files?',
          answer: 'Yes. Merge or add pages first, then rearrange before you save.',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: 'Merge PDF' },
        { pathSegment: 'delete-pdf-pages', label: 'Delete pages' },
        { pathSegment: 'privacy', label: 'Privacy' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
      ],
      ogLocale: 'en_US',
      toolKind: 'tools',
      toolsFocus: 'reorder',
    },
    'delete-pdf-pages': {
      slug: 'delete-pdf-pages',
      pathSegment: 'delete-pdf-pages',
      title: 'Delete PDF Pages Locally in Your Browser — No PDF Upload | Sign X PDF',
      description:
        'Remove unwanted PDF pages in your browser. Deletion runs locally without uploading your PDF to Sign X PDF servers.',
      h1: 'Delete PDF pages in your browser',
      answerFirst:
        'Remove pages from a PDF in your browser with Sign X PDF. Processing stays on your device instead of uploading the file to Sign X PDF servers. No account is required. Save the updated PDF when you finish.',
      privacyNote:
        'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers.',
      whatItDoes:
        'Open a PDF, select pages to remove, confirm the remaining set, and export a new file without those pages.',
      howTo: [
        'Load a PDF in the workspace.',
        'Select the pages to delete.',
        'Confirm the remaining pages look correct.',
        'Save the updated PDF.',
      ],
      localProcessing:
        'Page deletion is performed with client-side libraries in your browser after the tool loads.',
      limitations: [
        'Deleted pages cannot be recovered from the exported file.',
        'Some encrypted PDFs require a password before pages can be changed.',
      ],
      faq: [
        {
          question: 'Can I delete several pages at once?',
          answer: 'Yes. Select multiple pages in the page manager, then remove them before saving.',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: 'Reorder pages' },
        { pathSegment: 'merge-pdf', label: 'Merge PDF' },
        { pathSegment: 'privacy', label: 'Privacy' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: 'How browser PDF tools work' },
      ],
      ogLocale: 'en_US',
      toolKind: 'tools',
      toolsFocus: 'delete',
    },
  },
  privacy: {
    slug: 'privacy',
    pathSegment: 'privacy',
    title: 'Privacy — Local PDF Processing | Sign X PDF',
    description:
      'How Sign X PDF processes PDFs in your browser without uploading your document for tool processing, how to evaluate private PDF tools, and what we do not claim.',
    h1: 'Privacy and local PDF processing',
    answerFirst:
      'Sign X PDF is built so your selected PDF is read and processed in your browser for signing and common PDF edits. The PDF is not uploaded to Sign X PDF servers for that processing. Normal website assets still download over the network. No account is required for these browser tools.',
    privacyNote:
      'Your PDF is processed locally in your browser and is not uploaded to Sign X PDF servers for tool processing.',
    whatItDoes:
      'This page explains the privacy model for Sign X PDF browser tools, how local processing differs from upload-based online PDF sites, and a practical checklist for evaluating any PDF editor you trust with confidential files.',
    howTo: [
      'Application HTML, JavaScript, fonts, and WASM assets download like any website.',
      'You choose a PDF with the browser file picker or drag-and-drop (the browser keeps a local File reference).',
      'The file is read with browser APIs and processed on-device with client libraries and, where used, WebAssembly.',
      'You save the output file to your device; the workflow is not designed to keep a server-side copy of your PDF.',
    ],
    localProcessing:
      'Local processing means the edit pipeline runs in your browser tab using client-side code (including pdf.js-style rendering, pdf-lib assembly, and QPDF WebAssembly for selected operations). It does not mean “no network at all”: scripts and other assets still load, and third-party ads or analytics may still request ordinary web resources if present on a page. Document bytes for the tool workflow are intended to stay in the tab rather than being POSTed to Sign X PDF application servers.',
    storageDisclosure: {
      heading: 'Browser storage used by Sign X PDF',
      storageColumn: 'Storage',
      purposeColumn: 'Purpose',
      rows: [
        {
          storage: 'localStorage',
          purpose:
            'Language preference and a short export-rate window used to limit repeated free exports. These are first-party site data, not advertising cookies.',
        },
        {
          storage: 'IndexedDB',
          purpose:
            'Saved signature library entries (including signature image blobs) that you choose to keep in this browser for reuse.',
        },
        {
          storage: 'Cookies',
          purpose:
            'Core PDF processing does not require first-party advertising cookies. Ordinary third-party ads or analytics, if present on a page, may set their own cookies under their policies.',
        },
      ],
      clearNote:
        'Clearing this site’s data in your browser removes locally saved preferences and signatures. Your PDF files are not kept as a server-side copy of the tool workflow.',
    },
    limitations: [
      'Local processing does not protect a compromised device or malicious browser extensions.',
      'We do not claim military-grade privacy, complete anonymity, zero telemetry in every browser environment, or zero risk.',
      'Ordinary website assets always download; offline use is not guaranteed until you verify a warm load on your device.',
      'If a future feature ever required a network upload, it would need an explicit design change and updated wording.',
    ],
    faq: [
      {
        question: 'Does any data leave my device?',
        answer:
          'Website assets are downloaded normally. The selected PDF is intended to stay in the browser for processing. We do not claim that no bytes ever leave your device under any circumstance (for example, OS or extension behaviour outside the app).',
      },
      {
        question: 'Do you store my PDF on a server?',
        answer:
          'The browser tools described here are not designed to upload your PDF to Sign X PDF servers for storage or conversion.',
      },
      {
        question: 'What browser storage does Sign X PDF use?',
        answer:
          'localStorage stores language preference and an export-rate window. IndexedDB stores saved signatures you keep for reuse. Core PDF processing does not require first-party advertising cookies. Clear site data to remove those local items.',
      },
      {
        question: 'Do I need an account?',
        answer: 'No account is required to use the browser sign and P…25851 tokens truncated…元組會發生甚麼、是否需要帳戶、檔案保留多久、收集甚麼遙測、產生哪種簽名，以及公開了哪些限制。「私隱」標籤只有在處理模式及證據清楚時才有意義。',
    sections: [
      {
        heading: '先了解處理模式',
        paragraphs: ['先問 PDF 是上傳至應用程式伺服器、在瀏覽器本機處理，還是混合處理。「頁面使用 HTTPS」不能回答這個問題：加密傳輸仍然可以把文件送到伺服器。', '若產品聲稱瀏覽器本機處理，請用獨特 fixture 在 Network 面板驗證。閱讀範圍及限制，不要把「本機」理解成「完全沒有網絡」。'],
      },
      {
        heading: '實用比較清單',
        paragraphs: ['以下問題刻意保持產品中立，讓你可以比較免費瀏覽器工具、託管文件服務及自行託管應用程式，而不是獎勵含糊的私隱形容詞。'],
        bullets: [
          'PDF 會否上傳？這決定文件位元組是否離開瀏覽器作伺服器處理。',
          '是否需要帳戶？即使檔案很快刪除，帳戶仍可把文件活動與身分連結。',
          '檔案保留多久？查看刪除時間、備份、日誌及支援人員存取，不只看「暫存」。',
          '處理是否在本機？有條理地以 Network trace 驗證，並在可行時檢視原始碼。',
          '有甚麼遙測？分清文件 metadata、檔名、使用事件、錯誤報告、廣告及一般資源請求。',
          '簽名是可見還是憑證式？手繪或文字標記不等同密碼學數碼簽署。',
          '限制是否公開？檔案大小、頁數、瀏覽器記憶體、密碼保護及匯出失敗都會影響實際工作。',
        ],
      },
      {
        heading: '按照威脅模型選擇工具',
        paragraphs: ['低風險表格或許適合本機瀏覽器工具。對受規管紀錄，應考慮是否需要身分核實、稽核紀錄、憑證式簽署、保留控制、管理員政策或可審核的自行託管部署。私隱不是適用於所有流程的單一分數。', 'Sign X PDF 的範圍刻意較窄：在瀏覽器提供可見簽名放置及常見 PDF 操作，不聲稱支援憑證式簽署、任何地方的法律效力或抵禦受入侵裝置。'],
      },
      {
        heading: '證據比聲稱重要',
        paragraphs: ['有用的供應商會說明如何檢查聲稱、公開原始碼或方法、標示驗證日期，並說明測試不能證明甚麼。這類證據比一長串私隱形容詞更有價值。', 'Sign X PDF 公開驗證中心並記錄私隱測試範圍。測試是對已配置流程的證據，不是對所有瀏覽器、擴充功能、作業系統或日後功能的全面保證。'],
      },
    ],
    faq: [
      { question: '瀏覽器本機 PDF 工具是否必然最私隱？', answer: '不一定。裝置安全、瀏覽器擴充功能、快取、遙測、產品限制及所需合規控制仍然重要。請按你的威脅模型驗證實際流程。' },
      { question: '向 PDF 供應商先問甚麼？', answer: '先問所選 PDF 位元組是否上傳至應用程式伺服器作處理或儲存，再問供應商如何證明答案。' },
      { question: 'Sign X PDF 是否聲稱自己是最安全的 PDF 工具？', answer: '不是。它說明瀏覽器本機處理設計、記錄有範圍的測試及限制，讓使用者可以與其他選項比較。' },
    ],
    related: [
      { pathSegment: 'verification', label: '驗證方法' },
      { pathSegment: 'privacy', label: '私隱政策與儲存披露' },
      { pathSegment: 'guides/how-to-check-pdf-upload', label: '如何檢查 PDF 上傳' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
    ],
    ogLocale: 'zh_HK',
    disclaimer: '這是一般產品選擇指引，不是針對特定機構的法律、監管或資訊保安意見。',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      { method: '第一方私隱測試範圍', result: 'Sign X PDF 列出自動化不上傳測試涵蓋的五項操作，而不是從單一工具推廣至所有功能。', scope: '簽署、合併、壓縮、重排及刪頁', limits: '測試不涵蓋每項日後功能或測試 harness 以外的環境。', source: '/en/verification/' },
      { method: '簽名用語來源', result: '產品把可見簽名放置與憑證式數碼簽署分開描述。', scope: '目前簽署工具能力及公開用語指南', limits: '法律效力取決於司法管轄區及交易情境。', source: 'README.md#signature-scope' },
    ],
  },

  'pdf-compression-size-quality': {
    slug: 'pdf-compression-size-quality',
    pathSegment: 'guides/pdf-compression-size-quality',
    title: 'PDF 壓縮：檔案大小與圖像質素 | Sign X PDF',
    description: '以文字、掃描、相片及混合 fixture 評估 PDF 壓縮，記錄目標大小、實際大小及視覺取捨。',
    h1: 'PDF 壓縮：檔案大小與圖像質素',
    answerFirst: 'PDF 壓縮是取捨，不是固定百分比。文字、掃描、相片及混合 PDF 的反應不同。與其承諾每份 PDF 都有同樣縮減幅度，不如對固定 fixture 記錄原始大小、實際大小、是否達到目標及圖像質素。',
    sections: [
      {
        heading: '為何單一壓縮數字會誤導',
        paragraphs: ['文字 PDF 可能已經使用有效的向量及字型資料。掃描文件有較大的點陣圖可重新壓縮；相片型文件可以大幅縮小，但低質素設定可能出現模糊或方塊。混合文件則會在不同頁面同時出現多種情況。', '有意義的結果不是「壓縮了 70%」，而是附有 fixture 類型、目標設定、實際大小及視覺檢查備註的一組前後測量。'],
      },
      {
        heading: '可重複的 fixture 組合',
        paragraphs: ['製作四個非機密 fixture：文字型、掃描文件、相片型及混合內容。固定來源檔案，記錄位元組大小及頁數。比較時使用相同瀏覽器、裝置類別、目標設定及日期。'],
        bullets: ['文字型：可選取文字、簡單向量圖形及普通字型。', '掃描型：有真實文件細節的頁面影像。', '相片型：多張細節不同的相片。', '混合型：文字、圖表、截圖及至少一頁影像密集內容。'],
      },
      {
        heading: 'Sign X PDF 壓縮器會回報甚麼',
        paragraphs: ['瀏覽器壓縮器會先嘗試無損組裝；如果目標大小需要，再把頁面點陣化，並搜尋 JPEG 質素設定。結果會回報原始位元組、實際位元組、是否達到目標及是否使用無損路徑。', '因此 500 KB 之類的目標是要求，不是保證。文件可能仍高於目標，較強縮減亦可能改變圖像質素。依賴之前請檢查匯出檔案。'],
        bullets: ['原始大小及實際大小是主要測量。', '是否達到目標是結果旗標，不是承諾。', '無損輸出與點陣圖／JPEG 輸出有不同質素取捨。', '掃描、相片、簽名及細字必須作視覺檢查。'],
      },
      {
        heading: '誠實記錄結果',
        paragraphs: ['有用的 benchmark 表格包括 fixture 類型、頁數、輸入位元組、目標位元組、輸出位元組、縮減百分比、耗時及簡短視覺效果備註。公開條件，讓其他人可以重複。', '不要把一次本機結果轉成普遍最大值或最小值。裝置 CPU、記憶體、canvas 支援、PDF 結構及來源影像都會影響結果。'],
      },
      {
        heading: '2026-08-08 Windows 桌面實測',
        paragraphs: ['以下測試使用非機密 synthetic PDF，在 Windows 及 Chromium 136.0.7103.25 執行。文字 fixture 使用高於無損大小的 50 KB 目標；影像 fixture 使用約為輸入大小 60% 的目標。負縮減代表無損 PDF 組裝後略大於來源，不是把檔案錯誤宣稱為縮小。', '視覺備註是首頁預覽的取樣訊號，不是自動可讀性評分。請保留原始檔案，並在依賴匯出前檢查細字、掃描、相片及簽名。'],
        table: {
          caption: '可重複 browser runner 的 synthetic fixture 測量',
          headers: ['Fixture', '頁數', '輸入', '目標', '輸出', '縮減', '耗時', '達標'],
          rows: [
            ['文字型', '8', '15,788 B', '50 KB', '15,996 B', '-1.32%', '252 ms', '是'],
            ['掃描型', '5', '3,180,540 B', '1,863 KB', '1,863,750 B', '41.40%', '2,422 ms', '是'],
            ['相片型', '3', '5,667,651 B', '3,320 KB', '3,235,768 B', '42.91%', '1,971 ms', '是'],
            ['混合型', '4', '3,782,484 B', '2,216 KB', '2,215,598 B', '41.42%', '2,073 ms', '是'],
          ],
        },
      },
    ],
    faq: [
      { question: '每份 PDF 都能達到 500 KB 嗎？', answer: '不能。工具會回報是否達到目標；內容、頁數及瀏覽器資源會決定可達程度。' },
      { question: '檔案越小是否一定質素越差？', answer: '不一定，但較強的點陣圖／JPEG 壓縮可能減少影像細節。請按實際閱讀縮放檢查匯出檔案。' },
      { question: '壓縮 PDF 時會上傳嗎？', answer: 'Sign X PDF 的壓縮流程設計為在瀏覽器本機執行；記錄的私隱測試涵蓋壓縮，並檢查文件上傳模式。' },
    ],
    related: [
      { pathSegment: 'compress-pdf', label: '壓縮 PDF 工具' },
      { pathSegment: 'verification', label: '驗證方法' },
      { pathSegment: 'guides/large-pdf-browser-tests', label: '大型 PDF 瀏覽器測試' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
    ],
    ogLocale: 'zh_HK',
    disclaimer: '壓縮測量取決於環境。質素重要時，請檢查可讀性並保留原始檔案。',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      { method: '壓縮實作檢視', result: '目前瀏覽器實作會記錄原始／實際大小、目標狀態及無損與點陣圖輸出路徑。', scope: '用戶端壓縮流程', limits: '檢視原始碼不能取代特定裝置的質素 benchmark。', source: 'src/lib/pdf/PdfToolkit.ts' },
      { method: '壓縮介面檢視', result: '工具提供目標大小控制，並向使用者回報實際結果。', scope: '目前 Compress panel', limits: '目標控制不能令每個輸入都達到相同輸出大小。', source: 'src/lib/components/CompressPanel.svelte' },
      { method: '可重複 browser fixture 測試', result: '四個 synthetic fixture 在記錄的 Windows 桌面條件完成壓縮及匯出，測量列已在上方公開。', scope: '瀏覽器 UI 流程及下載輸出位元組', limits: '一次桌面測試不證明手機行為或普遍視覺質素。', source: 'README.md#benchmark-scope' },
    ],
  },

  'large-pdf-browser-tests': {
    slug: 'large-pdf-browser-tests',
    pathSegment: 'guides/large-pdf-browser-tests',
    title: '瀏覽器 PDF 工具中的大型 PDF：如何測試 10–100 MB | Sign X PDF',
    description: '以可重複方法在桌面及手機條件測試大型 PDF，不製造任意檔案大小保證。',
    h1: '瀏覽器 PDF 工具中的大型 PDF：如何測試',
    answerFirst: '沒有實際條件的測量，不應發佈任意「PDF 最大大小」。應以約 10 MB、25 MB、50 MB 及 100 MB 固定 fixture，在指定桌面及手機瀏覽器測試，記錄載入、預覽、匯出、輸出大小、記憶體錯誤及裝置資料。',
    sections: [
      {
        heading: '檔案大小只是其中一個變數',
        paragraphs: ['兩份 50 MB PDF 的表現可以完全不同。一份可能只有幾張大圖，另一份可能有數百頁、複雜字型、透明度或昂貴的點陣化路徑。頁數、結構、影像尺寸、可用記憶體、CPU 及瀏覽器實作都很重要。', '負責任的結果應說「在這些條件下通過」，而不是暗示所有 50 MB 文件都能在任何地方運作。'],
      },
      {
        heading: '測試矩陣',
        paragraphs: ['使用約 10 MB、25 MB、50 MB 及 100 MB 的固定 fixture。至少測試一個當前桌面瀏覽器及一個手機瀏覽器／裝置類別，並在結果中保留來源 fixture 及瀏覽器版本。'],
        bullets: ['載入：頁面有回應，而且可以選取檔案。', '預覽：頁面或縮圖可渲染，沒有不可恢復錯誤。', '操作：目標流程完成，例如重排或壓縮。', '匯出：瀏覽器下載可讀的輸出檔案。', '資源結果：記錄耗時、可見錯誤及分頁是否無回應。'],
      },
      {
        heading: '如何報告結果',
        paragraphs: ['記錄確實位元組大小、頁數、瀏覽器及版本、作業系統或裝置類別、已知記憶體、操作、開始／結束時間及輸出大小。失敗時 fresh load 後可重試一次，但不要隱藏失敗。', '若 100 MB fixture 未能安全或可靠測試，應保留為未驗證。誠實的「未測試」比虛構限制有用。'],
      },
      {
        heading: '2026-08-08 Windows 桌面合併實測',
        paragraphs: ['在 Windows 及 Chromium 136.0.7103.25，透過 /en/merge-pdf/ 載入及匯出 synthetic 影像型 fixture。以下是在一個桌面條件下成功載入、預覽、合併／匯出及產生 PDF 的結果，不代表手機結果或普遍檔案大小上限。', '安全預設流程測試了 10 MB、25 MB 及 50 MB；100 MB 仍明確標記為未測試，只有在記憶體充足的主機以 PHASE4_INCLUDE_100MB=1 重跑才會建立及開啟該 fixture。'],
        table: {
          caption: 'Synthetic 合併／匯出檢查點；輸出位元組包括正常 PDF 組裝開銷',
          headers: ['檢查點', '輸入', '頁數', '輸出', '耗時', '結果'],
          rows: [
            ['10 MB', '11,547,274 B', '6', '11,547,324 B', '5,411 ms', '通過'],
            ['25 MB', '26,942,739 B', '14', '26,942,851 B', '5,753 ms', '通過'],
            ['50 MB', '53,884,754 B', '28', '53,885,298 B', '6,202 ms', '通過'],
            ['100 MB', '未測試', '—', '—', '—', '安全預設未測試'],
          ],
        },
      },
      {
        heading: '本機工具的實際預期',
        paragraphs: ['本機處理避免把文件送往應用程式伺服器，但不能消除裝置記憶體限制。大型文件會令預覽、以點陣圖方式壓縮及匯出變得昂貴。請關閉無關分頁、保留來源檔案，並在實際使用的裝置類別上測試。', 'Sign X PDF 目前公開這套方法，而不是承諾普遍的 100 MB 限制。私隱測試涵蓋文件上傳行為；大型檔案效能需要獨立 fixture 結果。'],
      },
    ],
    faq: [
      { question: 'Sign X PDF 能處理每一份 100 MB PDF 嗎？', answer: '沒有這種普遍聲稱。結果取決於 PDF 結構、操作、瀏覽器、裝置記憶體及 CPU。請測試你的實際條件。' },
      { question: '為何測試 10、25、50 及 100 MB？', answer: '這些檢查點可以顯示檔案增大時的變化，同時保持矩陣易於理解；它們是測試大小，不是產品保證。' },
      { question: '本機處理是否消除大型檔案風險？', answer: '不能。它改變文件處理位置，但瀏覽器記憶體、CPU、渲染及匯出限制仍然存在。' },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: '合併 PDF 工具' },
      { pathSegment: 'compress-pdf', label: '壓縮 PDF 工具' },
      { pathSegment: 'verification', label: '驗證方法' },
      { pathSegment: 'guides/pdf-compression-size-quality', label: '壓縮大小與質素' },
    ],
    ogLocale: 'zh_HK',
    disclaimer: '大型檔案結果只適用於指定條件。不要把 fixture 通過理解成另一份 PDF、裝置、瀏覽器或操作的保證。',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      { method: '瀏覽器限制檢視', result: '產品說明公開裝置記憶體及 CPU 限制，而不是發佈未驗證的普遍上限。', scope: '目前工具頁及私隱頁限制', limits: '原始碼／說明檢視不是 10–100 MB 執行期 benchmark。', source: 'src/lib/seo/content/en.ts' },
      { method: '私隱流程覆蓋', result: '自動化私隱套件在 fixture 條件下執行包括壓縮在內的五項核心操作。', scope: '文件上傳觀察，不是效能容量', limits: '私隱覆蓋不證明每份大型 PDF 都能成功渲染或匯出。', source: 'tests/e2e/privacy-no-upload.mjs' },
      { method: '可重複大型檔案合併測試', result: '10 MB、25 MB 及 50 MB synthetic fixture 在一個 Windows 桌面 Chromium 條件完成載入及匯出；100 MB 及手機仍未測試。', scope: '合併流程容量觀察', limits: 'fixture 通過不是檔案大小上限保證。', source: 'README.md#benchmark-scope' },
    ],
  },
};
