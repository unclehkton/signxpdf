/**
 * Chinese script QA for SEO locale bundles (zh-hans / zh-hant).
 *
 * Methodology
 * -----------
 * 1. Flatten all string fields from the SEO catalog bundles (tools, privacy, guides, nav).
 * 2. Scan with a *curated* list of high-signal Traditional-only markers (for zh-hans)
 *    and Simplified-only markers (for zh-hant / HK Traditional).
 * 3. Fail when any marker appears — these are distinctive script forms, not shared
 *    characters such as 的/是/在/了/中/和/你/我 which exist in both scripts.
 * 4. Allowlist brand / technical Latin tokens (Sign X PDF, PDF, QPDF, WASM, PKCS, …)
 *    by stripping Latin/digits/punctuation before scanning CJK markers.
 * 5. This is a regression net, not a full OpenCC conversion. Human review remains
 *    for nuance; the lists catch common cross-script copy-paste leakage.
 */
import { describe, expect, it } from 'vitest';
import { getBundle } from '../../src/lib/seo/catalog';
import type { GuidePageContent, LocaleBundle, ToolPageContent } from '../../src/lib/seo/types';

/** Traditional-only forms that should not appear in zh-hans (Simplified) SEO copy. */
const TRADITIONAL_ONLY_MARKERS = [
  // High-frequency verb/adjective forms
  '讓',
  '讀',
  '寫',
  '說',
  '這',
  '個',
  '為',
  '與',
  '會',
  '時',
  '無',
  '將',
  '經',
  '對',
  '開',
  '關',
  '問',
  '來',
  '從',
  '後',
  '現',
  '發',
  '顯',
  '頁',
  '較',
  '極',
  '惡',
  '啟',
  '傳',
  '調',
  '礎',
  '審',
  '攝',
  '視',
  '覺',
  '強',
  '達',
  '復',
  '參',
  '輸',
  '組',
  '廣',
  '軍',
  '遙',
  '測',
  '離',
  '斷',
  '動',
  '應',
  '網',
  '絡',
  '檔',
  '裝',
  '瀏',
  '隱',
  '載',
  '選',
  '擇',
  '匯',
  '帳',
  '憶',
  '擴',
  '證',
  '數',
  '簽',
  '繪',
  '貼',
  '賴',
  '書',
  '跡',
  '欄',
  '結',
  '構',
  '義',
  '鑰',
  '綁',
  '遺',
  '錄',
  '適',
  '規',
  '屬',
  '詞',
  '資',
  '決',
  '雙',
  '麼',
  '們',
  '機',
  '條',
  '題',
  '過',
  '進',
  '運',
  '遠',
  '還',
  '邊',
  '處',
  '裡',
  '點',
  '樣',
  '實',
  '際',
  '業',
  '學',
  '國',
  '長',
  '門',
  '務',
  '碼',
  '圖',
  '刪',
  '併',
  '縮',
  '覽',
  // Distinctive multi-char Traditional product words (HK-oriented SEO)
  '私隱',
  '本機',
  '伺服器',
  '檔案',
  '裝置',
  '瀏覽器',
  '應用程式',
  '用戶端',
  '毋須',
  '甚么',
] as const;

/** Simplified-only forms that should not appear in zh-hant (HK Traditional) SEO copy. */
const SIMPLIFIED_ONLY_MARKERS = [
  '让',
  '读',
  '写',
  '说',
  '这',
  '个',
  '为',
  '与',
  '会',
  '时',
  '无',
  '将',
  '经',
  '对',
  '开',
  '关',
  '问',
  '来',
  '从',
  '后',
  '现',
  '发',
  '显',
  '页',
  '较',
  '极',
  '恶',
  '启',
  '传',
  '调',
  '础',
  '审',
  '摄',
  '视',
  '觉',
  '强',
  '达',
  '复',
  '参',
  '输',
  '组',
  '广',
  '军',
  '遥',
  '测',
  '离',
  '断',
  '动',
  '应',
  '网',
  '络',
  '档',
  '装',
  '浏',
  '隐',
  '载',
  '选',
  '择',
  '汇',
  '账',
  '忆',
  '扩',
  '证',
  '数',
  '签',
  '绘',
  '贴',
  '赖',
  '书',
  '栏',
  '结',
  '构',
  '义',
  '钥',
  '绑',
  '遗',
  '录',
  '适',
  '规',
  '属',
  '词',
  '资',
  '决',
  '双',
  '么',
  '们',
  '机',
  '条',
  '题',
  '过',
  '进',
  '运',
  '远',
  '还',
  '边',
  '处',
  '里',
  '点',
  '样',
  '实',
  '际',
  '业',
  '学',
  '国',
  '长',
  '门',
  '务',
  '码',
  '图',
  '删',
  '并',
  '缩',
  '览',
  // Distinctive multi-char Simplified product words
  '隐私',
  '浏览器',
  '设备',
  '服务器',
  '账户',
  '扩展',
  '网络',
  '选择',
  '程序',
  '应用',
  '读取',
  '上传',
  '下载',
  '处理',
  '压缩',
  '删除',
  '合并',
  '签署',
  '签名',
  '本地',
  '页面',
  '无需',
  '设计',
  '转换',
  '证书',
] as const;

/** Latin/technical tokens stripped before CJK scan (not script markers). */
const ALLOWLIST_LATIN =
  /\b(?:Sign\s*X\s*PDF|PDF|QPDF|WASM|WebAssembly|Worker|File|Blob|ArrayBuffer|PKCS#?7|CMS|PAdES|eIDAS|ESIGN|KYC|HTML|JavaScript|JS|API|POST|CI|SSR|OG|JSON-LD|Web\s*Worker)\b/gi;

function flattenStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) flattenStrings(item, out);
    return out;
  }
  if (value && typeof value === 'object') {
    for (const v of Object.values(value as Record<string, unknown>)) {
      flattenStrings(v, out);
    }
  }
  return out;
}

function bundleCorpus(bundle: LocaleBundle): string {
  const pages: (ToolPageContent | GuidePageContent | LocaleBundle['nav'] | string)[] = [
    bundle.nav,
    bundle.home,
    bundle.privacy,
    ...Object.values(bundle.tools),
    ...Object.values(bundle.guides ?? {}),
  ];
  const raw = flattenStrings(pages).join('\n');
  // Strip brand/tech Latin so markers never false-positive on mixed labels.
  return raw.replace(ALLOWLIST_LATIN, ' ').replace(/[A-Za-z0-9#./_\-]+/g, ' ');
}

function findMarkers(text: string, markers: readonly string[]): string[] {
  const hits: string[] = [];
  for (const m of markers) {
    if (text.includes(m)) hits.push(m);
  }
  // de-dupe while preserving order
  return [...new Set(hits)];
}

describe('Chinese script QA (SEO bundles)', () => {
  it('zh-hans SEO copy has no substantial Traditional-only markers', () => {
    const corpus = bundleCorpus(getBundle('zh-hans'));
    const hits = findMarkers(corpus, TRADITIONAL_ONLY_MARKERS);
    expect(hits, `Traditional leakage in zh-hans: ${hits.join(', ')}`).toEqual([]);
  });

  it('zh-hant SEO copy has no substantial Simplified-only markers', () => {
    const corpus = bundleCorpus(getBundle('zh-hant'));
    const hits = findMarkers(corpus, SIMPLIFIED_ONLY_MARKERS);
    expect(hits, `Simplified leakage in zh-hant: ${hits.join(', ')}`).toEqual([]);
  });
});
