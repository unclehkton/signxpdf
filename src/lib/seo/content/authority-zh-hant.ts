import type { AuthorityPageContent, AuthoritySlug } from '../types';

const VERIFIED = '2026-08-08';
const REPO_URL = 'https://github.com/unclehkton/signxpdf';
const PRIVACY_TEST_URL = 'https://github.com/unclehkton/signxpdf/blob/main/tests/e2e/privacy-no-upload.mjs';
const VERIFICATION_NOTE =
  '驗證範圍：我們於 2026-08-08 檢視公開 repository 原始碼及開放原始碼元件。連結的 GitHub repository 可供任何人查看；這是原始碼參考位置，不是獨立安全認證。瀏覽器測試使用的 fixture PDF 留在測試裝置，沒有上傳至 Sign X PDF 應用程式伺服器。這是有範圍的證據，不代表可涵蓋受入侵作業系統、惡意軟件、瀏覽器擴充功能、其他應用程式或日後改動。';

export const zhHantAuthority: Record<AuthoritySlug, AuthorityPageContent> = {
  verification: {
    slug: 'verification',
    pathSegment: 'verification',
    title: 'Sign X PDF 如何驗證本機 PDF 處理 | Sign X PDF',
    description: 'Sign X PDF 本機處理檢查的第一方方法：五項 PDF 流程、請求 hooks、限制及連結的原始碼參考。',
    h1: 'Sign X PDF 如何驗證本機 PDF 處理',
    answerFirst: 'Sign X PDF 以瀏覽器測試檢查本機處理聲稱：執行簽署、合併、壓縮、重排及刪頁，同時觀察 request URL、方法、headers、body、Beacon、WebSocket 及 Service Worker 活動。結果是對已測試 build 及 fixture 條件的證據，不是「完全沒有網絡流量」或沒有裝置風險的聲稱。',
    sections: [
      { heading: '我們測試了甚麼', paragraphs: ['私隱測試套件載入非機密 fixture PDF，執行每項支援的文件流程，並檢查文件位元組或獨特標記有沒有出現在禁止的應用程式上傳路徑。若觀察到可疑文件傳送模式，套件會失敗關閉。', '下表記錄目前流程覆蓋。「通過」表示在已配置測試條件下，當前測試執行沒有觀察到禁止的 PDF 上傳。'] },
      { heading: '測試監察甚麼', paragraphs: ['harness 在選取檔案前安裝觀察 hooks，並在操作及匯出期間保持啟用。這比只在 DevTools 檢查一個 Fetch/XHR 篩選更全面。'], bullets: ['fetch 及 XMLHttpRequest 的 URL、方法、headers 及 body', 'request 詳情中的檔名及獨特 PDF 標記', 'navigator.sendBeacon 呼叫及 payload', 'WebSocket 開啟及傳送訊息', 'Service Worker 註冊及 worker 代辦的網絡請求', '已測試流程的下載及匯出完成狀態'] },
      { heading: '測試不能證明甚麼', paragraphs: ['通過瀏覽器測試不能證明受入侵作業系統、惡意軟件、惡意瀏覽器擴充功能或其他應用程式無法存取同一檔案。它不代表法律合規認證、不代表供應商整體保留政策，也不能預測未測試程式碼的行為。', '一般網站資源仍會下載。本機 PDF 處理是文件處理聲稱，不是零網絡請求、所有環境零遙測或保證離線操作。'] },
      { heading: '來源及可重複性', paragraphs: ['測試原始碼已連結到公開 repository。公開 repository 讓任何人可以查看及重做測試；結果仍然是有範圍的證據，不是獨立安全認證。威脅模型嚴格的使用者可以用獨特、非機密 PDF 重做 Network 檢查，並把實際網站與已發布範圍比較。'] },
    ],
    faq: [
      { question: '「通過」是否代表沒有任何位元組離開我的裝置？', answer: '不是。它表示已配置測試在該流程沒有觀察到禁止的 PDF 上傳。網站資源仍使用網絡，而且測試不能審核作業系統、惡意軟件、擴充功能或其他應用程式。' },
      { question: '哪些 PDF 流程有覆蓋？', answer: '目前套件以非機密 fixture 覆蓋簽署、合併、壓縮、重排及刪頁。' },
      { question: '在哪裏查看測試程式碼？', answer: '連結的 repository 包含 Playwright 私隱測試及周邊應用程式原始碼。任何人都可以查看公開原始碼，但結果仍然是有範圍的證據，不是獨立安全認證。' },
    ],
    related: [
      { pathSegment: 'privacy', label: '私隱與儲存披露' },
      { pathSegment: 'about', label: '關於 Sign X PDF' },
      { pathSegment: 'guides/how-to-check-pdf-upload', label: '如何檢查 PDF 上傳' },
      { pathSegment: 'guides/choose-private-pdf-tool', label: '如何選擇私隱取向的 PDF 工具' },
    ],
    ogLocale: 'zh_HK',
    pageKind: 'article',
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    verificationRows: [
      { workflow: 'sign', workflowLabel: '簽署 PDF', test: '私隱網絡 e2e', result: '通過', verified: VERIFIED },
      { workflow: 'merge', workflowLabel: '合併 PDF', test: '私隱網絡 e2e', result: '通過', verified: VERIFIED },
      { workflow: 'compress', workflowLabel: '壓縮 PDF', test: '私隱網絡 e2e', result: '通過', verified: VERIFIED },
      { workflow: 'reorder', workflowLabel: '重排頁面', test: '私隱網絡 e2e', result: '通過', verified: VERIFIED },
      { workflow: 'delete', workflowLabel: '刪除頁面', test: '私隱網絡 e2e', result: '通過', verified: VERIFIED },
    ],
    verificationTableLabels: { workflow: '流程', test: '測試', result: '結果', verified: '驗證日期' },
    evidence: [
      { method: '私隱網絡 e2e（Playwright）', result: 'request、body、Beacon、WebSocket 及 Service Worker hooks 會貫穿操作及匯出。', scope: '非機密 fixture PDF 及五項已配置流程', limits: '不證明裝置、擴充功能、作業系統、惡意軟件、其他應用程式或日後部署行為。', source: 'tests/e2e/privacy-no-upload.mjs' },
      { method: 'Fact card 管理', result: '本機處理及簽名邊界聲稱均記錄證據層級、驗證日期及禁止聲稱。', scope: '公開 GEO fact cards 及來源 registry', limits: 'Fact card 記錄證據合約，不是獨立認證。', source: 'README.md#verification-scope' },
    ],
    sourceLinks: [
      { label: 'Repository 私隱測試原始碼', href: PRIVACY_TEST_URL, note: 'Playwright 請求觀察及流程覆蓋；任何人都可以查看公開原始碼。' },
      { label: 'Sign X PDF repository', href: REPO_URL, note: '公開的應用程式原始碼及 build 設定；任何人都可以查看公開原始碼。' },
      { label: 'GEO fact cards', href: 'https://github.com/unclehkton/signxpdf/blob/main/README.md#verification-scope', note: '證據層級、日期、限制及禁止聲稱。' },
      { label: 'GEO source registry', href: 'https://github.com/unclehkton/signxpdf/blob/main/README.md#public-source-layout', note: '把事實聲稱連結至 repository 證據。' },
    ],
    sourceHeading: '來源',
  },

  about: {
    slug: 'about',
    pathSegment: 'about',
    title: '關於 Sign X PDF：瀏覽器本機 PDF 工具',
    description: 'Sign X PDF 是甚麼、做甚麼及不聲稱甚麼、為何採用瀏覽器本機處理，以及在哪裏查看原始碼參考。',
    h1: '關於 Sign X PDF',
    answerFirst: 'Sign X PDF 是一套以瀏覽器為基礎的 PDF 工具，用於加入可見簽名及在本機進行常見 PDF 操作。這些瀏覽器流程不需要帳戶，並公開私隱測試方法及產品限制，讓使用者可以評估處理聲稱。',
    sections: [
      { heading: '可以做甚麼', paragraphs: ['Sign X PDF 提供瀏覽器工具，用於加入可見簽名、合併 PDF、壓縮 PDF、重排頁面及刪除頁面。所選文件的設計是在瀏覽器讀取及處理，而不是為該流程上傳到 Sign X PDF 應用程式伺服器。'], bullets: ['手繪、文字及圖像可見簽名', '合併 PDF', '壓縮 PDF', '重排 PDF 頁面', '刪除 PDF 頁面'] },
      { heading: '不作甚麼聲稱', paragraphs: ['可見簽名不是憑證式密碼學數碼簽署。Sign X PDF 不聲稱任何地方的普遍法律效力、身份核實、完整稽核紀錄、零網絡流量、抵禦受入侵裝置或保證離線模式。'] },
      { heading: '為何採用瀏覽器本機處理', paragraphs: ['把文件流程留在瀏覽器，可以減少把文件位元組送到應用程式伺服器的需要。但這不代表頁面沒有網絡活動：HTML、JavaScript、字型、圖片及 WebAssembly 資源仍會如一般網站載入。', '公開驗證頁說明目前私隱測試如何監察五項核心流程，以及證據在哪裏停止。'] },
      { heading: '開放原始碼及聯絡方式', paragraphs: ['repository 及開放原始碼授權聲明已記錄為項目來源。公開 repository 讓任何人可以查看並使用其 issue 或 discussion 渠道。本頁不暗示任何私下支援或客戶數字聲稱。'] },
    ],
    faq: [
      { question: 'Sign X PDF 是否需要帳戶？', answer: '本頁描述的瀏覽器簽署及 PDF 工具流程不需要帳戶。' },
      { question: 'Sign X PDF 會建立憑證式數碼簽署嗎？', answer: '不會。它加入可見簽名圖像，不會套用憑證式密碼學 PDF 簽署。' },
      { question: '在哪裏驗證本機處理聲稱？', answer: '先查看第一方驗證方法及連結的 repository 測試。查看公開原始碼後，可按你的威脅模型以非機密 fixture 重做 Network 檢查。' },
    ],
    related: [
      { pathSegment: 'verification', label: '驗證如何運作' },
      { pathSegment: 'privacy', label: '私隱與本機處理' },
      { pathSegment: 'open-source-licences', label: '開放原始碼授權' },
      { pathSegment: 'sign-pdf', label: '簽署 PDF 工具' },
    ],
    ogLocale: 'zh_HK',
    pageKind: 'profile',
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    sameAs: [REPO_URL],
    sourceLinks: [
      { label: 'GitHub repository', href: REPO_URL, note: '公開的應用程式原始碼及 issue／discussion 入口；公開原始碼可供查看。' },
      { label: '驗證方法', href: '/en/verification/', note: '第一方私隱測試範圍。' },
      { label: '私隱頁', href: '/zh-hant/privacy/', note: '儲存、本機處理用語及限制。' },
      { label: '開放原始碼授權', href: '/open-source-licences/', note: '第三方元件聲明。' },
    ],
  },
};
