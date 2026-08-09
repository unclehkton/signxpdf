import type { Lo…35727 tokens truncated…hant';

export const zhHantBundle: LocaleBundle = {
  locale: 'zh-hant',
  htmlLang: 'zh-Hant',
  nav: {
    home: '主頁',
    sign: '簽署 PDF',
    tools: 'PDF 工具',
    privacy: '私隱',
    guides: '指南',
    openTool: '在瀏覽器使用此工具',
    relatedTools: '相關頁面',
    howTo: '使用方法',
    whatItDoes: '此工具的作用',
    localProcessing: '本機處理方式',
    limitations: '限制',
    faq: '常見問題',
    enableJs: '請啟用 JavaScript，即可在瀏覽器本機處理 PDF，毋須上傳檔案。',
    published: '發布',
    updated: '最近更新',
    verified: '最近驗證',
    howWeVerified: '我們如何驗證',
  },
  home: {
    slug: 'home',
    pathSegment: '',
    title: '私隱 PDF 工具 — 簽署、合併、壓縮 | Sign X PDF',
    description:
      '在瀏覽器直接為 PDF 加入簽名，以及合併、壓縮、重排與刪除頁面。PDF 檔案在你的裝置上處理，毋須上傳至 Sign X PDF 的伺服器。',
    h1: '在瀏覽器直接為 PDF 加入簽名及處理 PDF',
    answerFirst:
      'Sign X PDF 讓你在瀏覽器為 PDF 加入可見簽名，並進行常見 PDF 操作。PDF 檔案在你的裝置上處理，毋須上傳至 Sign X PDF 的伺服器。無需帳戶。完成後可將更新後的檔案儲存到你的裝置。',
    privacyNote:
      'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。與一般網站一樣，頁面仍會下載 HTML、指令碼與字型等資源。',
    whatItDoes:
      '可選擇簽署、合併、壓縮、重新排列頁面或刪除 PDF 頁面等工具。每個工具頁會說明流程，並在你使用時才載入編輯功能。',
    howTo: [
      '選擇工具，例如「簽署 PDF」或「合併 PDF」。',
      '以檔案選擇器開啟檔案（或在支援時拖放）。',
      '在瀏覽器完成編輯。',
      '將結果儲存到你的裝置。',
    ],
    localProcessing:
      '應用程式資源載入後，讀取、顯示與匯出會使用瀏覽器 API 及用戶端程式庫。所選 PDF 不會被傳送到 Sign X PDF 伺服器作處理。',
    limitations: [
      '編輯功能需要支援 JavaScript 的現代瀏覽器。',
      '極大的 PDF 在記憶體較少的裝置上可能較慢。',
      '本機處理無法防範已受感染的裝置或惡意瀏覽器擴充功能。',
    ],
    faq: [
      {
        question: '我的 PDF 會被上傳嗎？',
        answer:
          '不會。Sign X PDF 的設計是在瀏覽器本機處理你所選的 PDF，而不是上傳到 Sign X PDF 伺服器作轉換或儲存。',
      },
      {
        question: '需要帳戶嗎？',
        answer: '使用瀏覽器工具無需帳戶。',
      },
      {
        question: '完成後會怎樣？',
        answer: '你可以將更新後的 PDF 儲存到裝置。此流程不會在伺服器保留你的檔案副本。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '簽署 PDF' },
      { pathSegment: 'merge-pdf', label: '合併 PDF' },
      { pathSegment: 'compress-pdf', label: '壓縮 PDF' },
      { pathSegment: 'privacy', label: '私隱' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
    ],
    ogLocale: 'zh_HK',
    toolKind: 'none',
  },
  tools: {
    'sign-pdf': {
      slug: 'sign-pdf',
      pathSegment: 'sign-pdf',
      title: '在瀏覽器簽署 PDF — 可見簽名 | Sign X PDF',
      description:
        '在瀏覽器為 PDF 加入可見簽名。可手寫、輸入或放置圖片簽名，PDF 在本機處理，毋須上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器簽署 PDF',
      answerFirst:
        'Sign X PDF 讓你在瀏覽器直接為 PDF 加入可見簽名。PDF 在你的裝置上本機處理，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後可儲存更新後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes:
        '可透過繪製、輸入文字、上傳圖片或（在允許時）相機建立簽名，放置到頁面後匯出新的 PDF。',
      howTo: [
        '開啟 PDF 或支援的圖片。',
        '建立或選擇簽名（繪製、輸入、上傳或相機）。',
        '在頁面上放置並調整簽名大小。',
        '將已簽署的 PDF 儲存到裝置。',
      ],
      localProcessing: '簽名建立與 PDF 匯出在頁面資源載入後，於瀏覽器以用戶端程式庫執行。',
      limitations: [
        '此功能加入的是可見簽名外觀，並非以證書為基礎的加密數位簽章。',
        '不會產生審計軌跡、身份核實，亦不保證在任何司法管轄區具法律效力。',
        '加密 PDF 可能需要開啟密碼才能編輯。',
      ],
      faq: [
        {
          question: '這是證書式數位簽章嗎？',
          answer:
            '不是。Sign X PDF 放置可見簽名（手寫、文字或圖片），不會套用證書式加密簽署、時間戳或簽章驗證。',
        },
        {
          question: '簽署時會上傳 PDF 嗎？',
          answer: '不會。簽署流程設計為在瀏覽器本機執行。網站資源仍會經網絡下載。',
        },
        {
          question: '可以使用簽名照片嗎？',
          answer: '可以。你可以上傳簽名圖片，或在瀏覽器允許時使用相機拍攝。',
        },
        {
          question: '在 PDF 上畫簽名等於數碼簽署嗎？',
          answer:
            '不等於。畫簽名是放置可見標記。憑證式數碼簽署使用密碼學與數碼證書。Sign X PDF 只放置可見簽名。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'compress-pdf', label: '壓縮 PDF' },
        { pathSegment: 'privacy', label: '私隱與本機處理' },
        { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'sign',
    },
    'merge-pdf': {
      slug: 'merge-pdf',
      pathSegment: 'merge-pdf',
      title: '在瀏覽器本機合併 PDF — 不需上傳 | Sign X PDF',
      description:
        '在瀏覽器將多個 PDF 合併成一個檔案。合併在本機進行，檔案不會上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器合併 PDF',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器將多個 PDF 合併成一份文件。檔案在你的裝置上本機處理，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存合併後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '載入一個或多個 PDF（及支援的圖片），整理頁面，並匯出單一合併 PDF。',
      howTo: [
        '開啟下方合併工作區。',
        '加入要合併的 PDF。',
        '如有需要，重新排列頁面。',
        '將合併後的 PDF 儲存到裝置。',
      ],
      localProcessing:
        '合併在資源載入後以瀏覽器內的用戶端 PDF 程式庫完成，所選檔案不會送往 Sign X PDF 伺服器作合併。',
      limitations: [
        '檔案數量或體積很大時，會受瀏覽器記憶體限制。',
        '部分加密 PDF 需先輸入密碼。',
      ],
      faq: [
        {
          question: '可以合併超過兩個 PDF 嗎？',
          answer: '可以。在工具工作區加入多個檔案，再匯出一份合併 PDF。',
        },
        {
          question: '合併時會上傳檔案嗎？',
          answer: '不會。合併處理設計為留在你的瀏覽器內。',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: '重新排列頁面' },
        { pathSegment: 'delete-pdf-pages', label: '刪除 PDF 頁面' },
        { pathSegment: 'compress-pdf', label: '壓縮 PDF' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'merge',
    },
    'compress-pdf': {
      slug: 'compress-pdf',
      pathSegment: 'compress-pdf',
      title: '在瀏覽器壓縮 PDF | Sign X PDF',
      description:
        '在瀏覽器縮減 PDF 檔案大小。壓縮在本機執行，毋須將 PDF 上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器壓縮 PDF',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器直接壓縮 PDF。處理留在你的裝置上，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存較小的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '載入 PDF，選擇目標大小（如適用），在瀏覽器執行壓縮，再儲存結果。',
      howTo: [
        '在工作區開啟 PDF。',
        '選擇壓縮設定。',
        '執行壓縮並查看結果大小。',
        '儲存壓縮後的 PDF。',
      ],
      localProcessing: '工具資源載入後，壓縮在裝置上進行，PDF 不會上傳至 Sign X PDF 伺服器作壓縮。',
      limitations: [
        '可縮減的幅度視內容而定（掃描影像與文字 PDF 不同）。',
        '高強度壓縮可能降低 PDF 內圖片的視覺質素。',
      ],
      faq: [
        {
          question: '一定能達到目標大小嗎？',
          answer: '不一定。影像為主的掃描檔與文字 PDF 壓縮效果不同。工具會顯示實際達到的大小。',
        },
        {
          question: '壓縮時會上傳 PDF 嗎？',
          answer: '不會。壓縮設計為在瀏覽器本機執行。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'reorder-pdf', label: '重新排列頁面' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'compress',
    },
    'reorder-pdf': {
      slug: 'reorder-pdf',
      pathSegment: 'reorder-pdf',
      title: '在瀏覽器重新排列 PDF 頁面 | Sign X PDF',
      description:
        '在瀏覽器調整 PDF 頁面次序。重排在本機進行，檔案不會上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器重新排列 PDF 頁面',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器直接重新排列 PDF 頁面。檔案在本機處理，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存更新後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '開啟 PDF，拖曳或移動頁面至所需次序，然後匯出更新後的文件。',
      howTo: [
        '在工作區載入 PDF。',
        '將頁面拖曳至所需次序。',
        '檢查頁面順序。',
        '儲存更新後的 PDF。',
      ],
      localProcessing: '頁面重排在資源載入後，以瀏覽器內的用戶端 PDF 工具完成。',
      limitations: [
        '極多頁的文件產生縮圖時可能較慢。',
        '受密碼保護的 PDF 可能需要先解鎖。',
      ],
      faq: [
        {
          question: '合併檔案後可以再重排嗎？',
          answer: '可以。先合併或加入頁面，儲存前再調整次序。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'delete-pdf-pages', label: '刪除頁面' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'reorder',
    },
    'delete-pdf-pages': {
      slug: 'delete-pdf-pages',
      pathSegment: 'delete-pdf-pages',
      title: '在瀏覽器本機刪除 PDF 頁面 — 不需上傳 | Sign X PDF',
      description:
        '在瀏覽器移除不需要的 PDF 頁面。刪除在本機執行，毋須將 PDF 上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器刪除 PDF 頁面',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器從 PDF 移除頁面。處理留在你的裝置上，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存更新後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '開啟 PDF，選擇要移除的頁面，確認剩餘頁面，再匯出不含那些頁面的新檔案。',
      howTo: [
        '在工作區載入 PDF。',
        '選擇要刪除的頁面。',
        '確認剩餘頁面正確。',
        '儲存更新後的 PDF。',
      ],
      localProcessing: '刪除頁面在工具載入後，以瀏覽器內的用戶端程式庫完成。',
      limitations: [
        '已匯出的檔案無法復原被刪除的頁面。',
        '部分加密 PDF 需先輸入密碼才能更改頁面。',
      ],
      faq: [
        {
          question: '可以一次刪除多頁嗎？',
          answer: '可以。在頁面管理中選取多頁，儲存前移除即可。',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: '重新排列頁面' },
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'delete',
    },
  },
  privacy: {
    slug: 'privacy',
    pathSegment: 'privacy',
    title: '私隱 — 本機 PDF 處理 | Sign X PDF',
    description:
      'Sign X PDF 如何在瀏覽器處理 PDF而不將文件上傳作工具處理、如何評估私隱優先的 PDF 工具，以及我們不會作出的聲稱。',
    h1: '私隱與本機 PDF 處理',
    answerFirst:
      'Sign X PDF 的設計是讓你在瀏覽器讀取並處理所選 PDF，以進行簽署及常見編輯。PDF 不會上傳至 Sign X PDF 伺服器作該等處理。一般網站資源仍會經網絡下載。使用這些瀏覽器工具無需帳戶。',
    privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 伺服器作工具處理。',
    whatItDoes:
      '本頁說明 Sign X PDF 瀏覽器工具的私隱模式、本機處理與上傳式線上 PDF 網站的分別，以及評估任何 PDF 編輯器時可用的實用清單。',
    howTo: [
      '應用程式的 HTML、JavaScript、字型與 WASM 等資源會如一般網站般下載。',
      '你以瀏覽器檔案選擇器或拖放選取 PDF（瀏覽器保留本機 File 參照）。',
      '檔案以瀏覽器 API 讀取，並以用戶端程式庫（及在適用時 WebAssembly）在裝置上處理。',
      '你將輸出檔案儲存到裝置；此流程並非設計成在伺服器保留你的 PDF 副本。',
    ],
    localProcessing:
      '本機處理是指編輯流程在瀏覽器分頁以用戶端程式碼執行（包括 pdf.js 類渲染、pdf-lib 組裝，以及部分操作使用的 QPDF WebAssembly）。這不代表「完全沒有網絡」：指令碼等資源仍會載入；若頁面含廣告或分析，仍可能請求一般網頁資源。工具流程中的文件位元組旨在留在分頁內，而不是 POST 到 Sign X PDF 應用伺服器。',
    storageDisclosure: {
      heading: 'Sign X PDF 使用的瀏覽器儲存',
      storageColumn: '儲存方式',
      purposeColumn: '用途',
      rows: [
        {
          storage: 'localStorage',
          purpose:
            '語言偏好，以及限制免費匯出頻率的短暫時間窗。這些是第一方網站資料，並非廣告 cookies。',
        },
        {
          storage: 'IndexedDB',
          purpose: '你選擇保存在此瀏覽器以便重用的簽名庫項目（包括簽名圖像 Blob）。',
        },
        {
          storage: 'Cookies',
          purpose:
            '核心 PDF 處理不需要第一方廣告 cookies。若頁面含第三方廣告或分析，對方可能按其政策設定 cookies。',
        },
      ],
      clearNote:
        '在瀏覽器清除本站資料會移除本機偏好設定與已儲存簽名。工具流程不會在伺服器保留你的 PDF 副本。',
    },
    limitations: [
      '本機處理無法防範已受感染的裝置或惡意瀏覽器擴充功能。',
      '我們不會聲稱軍事級私隱、完全匿名、在所有瀏覽器環境零遙測，或零風險。',
      '一般網站資源仍會下載；在未於你的裝置驗證暖載入前，不保證離線可用。',
      '若日後功能需要網絡上傳，必須有明確設計變更並更新說明文字。',
    ],
    faq: [
      {
        question: '是否有任何資料會離開我的裝置？',
        answer:
          '網站資源會正常下載。所選 PDF 旨在留在瀏覽器內處理。我們不會聲稱在任何情況下都不會有位元組離開你的裝置（例如作業系統或擴充功能的行為超出本應用程式控制）。',
      },
      {
        question: '你們會在伺服器儲存我的 PDF 嗎？',
        answer: '此處所述的瀏覽器工具並非設計成將 PDF 上傳至 Sign X PDF 伺服器作儲存或轉換。',
      },
      {
        question: 'Sign X PDF 會用哪些瀏覽器儲存？',
        answer:
          'localStorage 會存放語言偏好與匯出頻率時間窗；IndexedDB 會存放你選擇保存的簽名。核心 PDF 處理不需要第一方廣告 cookies。清除網站資料即可移除上述本機項目。',
      },
      {
        question: '需要帳戶嗎？',
        answer: '使用本站所述的瀏覽器簽署與 PDF 工具無需帳戶。',
      },
      {
        question: '應如何判斷線上 PDF 編輯器是否安全？',
        answer:
          '應檢視：處理模式（上傳或本機）、保留政策、是否需帳戶、遙測說明、簽名是可見標記還是憑證式、可否檢視開源元件，以及實際檔案限制。並用獨特檔名的測試檔在瀏覽器網絡面板核實聲稱。',
      },
      {
        question: 'Sign X PDF 是否自動是最安全的選擇？',
        answer:
          '沒有工具能自動成為所有威脅模型下的最安全選項。Sign X PDF 著重本機文件處理與清楚限制。請比較準則而非口號，並就你的用途覆核網絡行為。',
      },
      {
        question: '可以查看開源元件嗎？',
        answer: '可以。QPDF、pdf-lib 等函式庫的授權聲明列於開放原始碼授權頁。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '簽署 PDF' },
      { pathSegment: 'merge-pdf', label: '合併 PDF' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
      { pathSegment: 'open-source-licences', label: '開放原始碼授權' },
      { pathSegment: '', label: '所有工具' },
    ],
    ogLocale: 'zh_HK',
    toolKind: 'none',
  },
  guides: zhHantGuides,
};
