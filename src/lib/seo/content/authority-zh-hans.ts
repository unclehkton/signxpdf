import type { AuthorityPageContent, AuthoritySlug } from '../types';

const VERIFIED = '2026-08-08';
const REPO_URL = 'https://github.com/unclehkton/signxpdf';
const PRIVACY_TEST_URL = 'https://github.com/unclehkton/signxpdf/blob/main/tests/e2e/privacy-no-upload.mjs';
const VERIFICATION_NOTE =
  '验证范围：我们于 2026-08-08 检查了公开 repository 源代码和开源组件。链接的 GitHub repository 可供任何人查看；这是源代码参考位置，不是独立安全认证。浏览器测试使用的 fixture PDF 留在测试设备，没有上传到 Sign X PDF 应用服务器。这是有范围的证据，不代表可以覆盖被入侵的操作系统、恶意软件、浏览器扩展、其他应用或未来变更。';

export const zhHansAuthority: Record<AuthoritySlug, AuthorityPageContent> = {
  verification: {
    slug: 'verification',
    pathSegment: 'verification',
    title: 'Sign X PDF 如何验证本地 PDF 处理 | Sign X PDF',
    description: 'Sign X PDF 本地处理检查的第一方方法：五项 PDF 流程、请求 hooks、限制和链接的源代码参考。',
    h1: 'Sign X PDF 如何验证本地 PDF 处理',
    answerFirst: 'Sign X PDF 使用浏览器测试检查本地处理声称：执行签署、合并、压缩、重排和删除，同时观察 request URL、方法、headers、body、Beacon、WebSocket 和 Service Worker 活动。结果是对已测试 build 和 fixture 条件的证据，不是“完全没有网络流量”或没有设备风险的声称。',
    sections: [
      { heading: '我们测试了什么', paragraphs: ['隐私测试套件加载非机密 fixture PDF，执行每项支持的文件流程，并检查文件字节或独特标记是否出现在禁止的应用上传路径。如果观察到可疑文件传送模式，套件会失败关闭。', '下表记录当前流程覆盖。“通过”表示在已配置测试条件下，当前测试执行没有观察到禁止的 PDF 上传。'] },
      { heading: '测试监控什么', paragraphs: ['harness 在选择文件前安装观察 hooks，并在操作和导出期间保持启用。这比只在 DevTools 检查一个 Fetch/XHR 筛选更全面。'], bullets: ['fetch 和 XMLHttpRequest 的 URL、方法、headers 和 body', 'request 详情中的文件名和独特 PDF 标记', 'navigator.sendBeacon 调用和 payload', 'WebSocket 打开和发送消息', 'Service Worker 注册和 worker 代办的网络请求', '已测试流程的下载和导出完成状态'] },
      { heading: '测试不能证明什么', paragraphs: ['通过浏览器测试不能证明被入侵的操作系统、恶意软件、恶意浏览器扩展或其他应用无法访问同一文件。它不代表法律合规认证、不代表供应商整体保留政策，也不能预测未测试代码的行为。', '普通网站资源仍会下载。本地 PDF 处理是文件处理声称，不是零网络请求、所有环境零遥测或保证离线操作。'] },
      { heading: '来源和可重复性', paragraphs: ['测试源代码已链接到公开 repository。公开 repository 让任何人可以查看及重做测试；结果仍然是有范围的证据，不是独立安全认证。威胁模型严格的用户可以使用独特、非机密 PDF 重做 Network 检查，并将实际网站与已发布范围比较。'] },
    ],
    faq: [
      { question: '“通过”是否意味着没有任何字节离开我的设备？', answer: '不是。它表示已配置测试在该流程没有观察到禁止的 PDF 上传。网站资源仍使用网络，而且测试不能审计操作系统、恶意软件、扩展或其他应用。' },
      { question: '哪些 PDF 流程有覆盖？', answer: '当前套件使用非机密 fixture 覆盖签署、合并、压缩、重排和删除。' },
      { question: '在哪里查看测试代码？', answer: '链接的 repository 包含 Playwright 隐私测试及周边应用源代码。任何人都可以查看公开源代码，但结果仍然是有范围的证据，不是独立安全认证。' },
    ],
    related: [
      { pathSegment: 'privacy', label: '隐私与存储披露' },
      { pathSegment: 'about', label: '关于 Sign X PDF' },
      { pathSegment: 'guides/how-to-check-pdf-upload', label: '如何检查 PDF 上传' },
      { pathSegment: 'guides/choose-private-pdf-tool', label: '如何选择隐私取向的 PDF 工具' },
    ],
    ogLocale: 'zh_CN',
    pageKind: 'article',
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    verificationRows: [
      { workflow: 'sign', workflowLabel: '签署 PDF', test: '隐私网络 e2e', result: '通过', verified: VERIFIED },
      { workflow: 'merge', workflowLabel: '合并 PDF', test: '隐私网络 e2e', result: '通过', verified: VERIFIED },
      { workflow: 'compress', workflowLabel: '压缩 PDF', test: '隐私网络 e2e', result: '通过', verified: VERIFIED },
      { workflow: 'reorder', workflowLabel: '重排页面', test: '隐私网络 e2e', result: '通过', verified: VERIFIED },
      { workflow: 'delete', workflowLabel: '删除页面', test: '隐私网络 e2e', result: '通过', verified: VERIFIED },
    ],
    verificationTableLabels: { workflow: '流程', test: '测试', result: '结果', verified: '验证日期' },
    evidence: [
      { method: '隐私网络 e2e（Playwright）', result: 'request、body、Beacon、WebSocket 和 Service Worker hooks 会贯穿操作和导出。', scope: '非机密 fixture PDF 和五项已配置流程', limits: '不证明设备、扩展、操作系统、恶意软件、其他应用或未来部署行为。', source: 'tests/e2e/privacy-no-upload.mjs' },
      { method: 'Fact card 管理', result: '本地处理和签名边界声称都记录证据层级、验证日期和禁止声称。', scope: '公开 GEO fact cards 和来源 registry', limits: 'Fact card 记录证据契约，不是独立认证。', source: 'README.md#verification-scope' },
    ],
    sourceLinks: [
      { label: 'Repository 隐私测试源代码', href: PRIVACY_TEST_URL, note: 'Playwright 请求观察和流程覆盖；任何人都可以查看公开源代码。' },
      { label: 'Sign X PDF repository', href: REPO_URL, note: '公开的应用源代码和 build 配置；任何人都可以查看公开源代码。' },
      { label: 'GEO fact cards', href: 'https://github.com/unclehkton/signxpdf/blob/main/README.md#verification-scope', note: '证据层级、日期、限制和禁止声称。' },
      { label: 'GEO source registry', href: 'https://github.com/unclehkton/signxpdf/blob/main/README.md#public-source-layout', note: '把事实声称链接到 repository 证据。' },
    ],
    sourceHeading: '来源',
  },

  about: {
    slug: 'about',
    pathSegment: 'about',
    title: '关于 Sign X PDF：浏览器本地 PDF 工具',
    description: 'Sign X PDF 是什么、做什么以及不声称什么、为什么使用浏览…13851 tokens truncated… Sign X PDF 应用服务器。这是有范围的证据，不代表涵盖浏览器扩展、操作系统服务或未来改动。',
  },

  'how-browser-pdf-tools-work': {
    slug: 'how-browser-pdf-tools-work',
    pathSegment: 'guides/how-browser-pdf-tools-work',
    title: '基于浏览器的 PDF 工具如何工作 | Sign X PDF',
    description:
      'Sign X PDF 如何在浏览器中处理 PDF：文件 API、pdf.js、pdf-lib、QPDF WebAssembly、Worker，以及仍会从网络加载的资源。',
    h1: '基于浏览器的 PDF 工具如何工作',
    answerFirst:
      '浏览器 PDF 工具可以在不把文档提交到应用服务器的情况下编辑文件。站点脚本与资源加载后，所选 PDF 通过浏览器文件 API 读取，并用客户端库（有时加上 WebAssembly）在标签页内处理。Sign X PDF 的签署、合并、压缩、重排与删页流程即建立在这一模式上。',
    sections: [
      {
        heading: '本地处理 ≠「完全没有网络」',
        paragraphs: [
          '本地文档处理是指：您选择的 PDF 字节不会作为工具流程的一部分，被上传到 Sign X PDF 服务器进行转换或存储。这并不表示浏览器从不使用网络。',
          '与任何网站一样，打开应用时仍会下载 HTML、JavaScript、字体、图片与 WASM 二进制。完成暖加载后，编辑主要依赖这些已获取的资源以及您的本地文件。',
        ],
      },
      {
        heading: '打开 PDF 时会发生什么',
        paragraphs: [
          '您通过浏览器文件选择器或拖放选择文件。页面获得 File（或 Blob）引用，并将其读入内存（例如 ArrayBuffer）。渲染与编辑在页面或 Worker 中对该内存副本进行，而不是对服务器上的文档副本进行。',
        ],
        bullets: [
          '输入：浏览器 File / Blob API',
          '预览：客户端 PDF 渲染（pdf.js 类流程）',
          '编辑：客户端库重写或重组 PDF 结构',
          '输出：将新文件保存到您的设备',
        ],
      },
      {
        heading: 'Sign X PDF 中的库与角色',
        paragraphs: [
          'Sign X PDF 将重型引擎拆分，使爬虫与首次绘制不必加载完整 PDF 运行时。工具页是预渲染的 HTML 外壳；您使用工具时，交互式编辑器才以客户端 island 形式加载。',
        ],
        bullets: [
          'pdf.js — 浏览器内页面渲染 / 预览',
          'pdf-lib — 多项组装与导出操作（JavaScript）',
          'QPDF（WebAssembly）— 部分密码与结构保留操作（经 Worker）',
          '签名板 / 图像工具 — 创建可见签名素材后再放置',
        ],
      },
      {
        heading: 'Worker 与 WebAssembly',
        paragraphs: [
          '部分工作在 Web Worker 中运行，以保持界面线程响应。QPDF 被编译为 WebAssembly 并作为资源加载；下载后在浏览器进程中执行，而不是作为远程 PDF 服务。',
          '因为 WASM 与 worker 脚本是普通静态资源，它们会出现在网络面板中，这是预期行为，与把机密 PDF 上传到 API 端点不同。',
        ],
      },
      {
        heading: '如何自行核查隐私声明',
        paragraphs: [
          '打开浏览器开发者工具，在打开并导出带独特文件名的测试 PDF 时观察网络面板，确认文档没有被提交到 Sign X PDF 应用端点。Sign X PDF 维护自动化隐私检查，对可疑请求模式（包括测试环境中的部分 beacon、WebSocket 与 service worker 流量情形）采取失败即关闭策略。',
          '第三方浏览器扩展、操作系统服务或未来功能仍可能改变本应用控制范围之外的网络行为——若威胁模型严格，请务必自行复核。',
        ],
      },
      {
        heading: '实际限制',
        paragraphs: [
          '客户端处理受设备内存与 CPU 限制。极大的扫描件、同时打开多个文件，或内存较低的手机可能变慢或失败。受密码保护的 PDF 在合并或编辑前可能需要打开密码。压缩质量取决于内容（图像型 PDF 与文字型 PDF 表现不同）。',
        ],
      },
    ],
    faq: [
      {
        question: '浏览器 PDF 工具会上传我的文件吗？',
        answer:
          '有些会。Sign X PDF 的设计是让所选 PDF 在浏览器中处理，而不是上传到 Sign X PDF 服务器进行工具处理。对任何处理机密文档的站点，请用网络工具自行核实其声明。',
      },
      {
        question: '为什么仍会看到网络请求？',
        answer:
          '站点资源（HTML、JS、字体、WASM）会通过网络加载。本地处理指的是您的文档字节，不是网站本身零流量。',
      },
      {
        question: 'WebAssembly 在这里做什么？',
        answer:
          'QPDF 以 WebAssembly 形式分发，使高级 PDF 操作可在二进制下载后在设备上运行。它不是远程转换服务器。',
      },
      {
        question: '这等同于离线模式吗？',
        answer:
          '不会自动等同。离线使用需要浏览器已缓存应用资源，且产品路径在暖加载后经过验证。在您自己的设备上测试之前，请勿假设飞行模式可用。',
      },
    ],
    related: [
      { pathSegment: 'privacy', label: '隐私与本地处理' },
      { pathSegment: 'sign-pdf', label: '签署 PDF' },
      { pathSegment: 'merge-pdf', label: '合并 PDF' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可见签名与数字签名' },
      { pathSegment: 'open-source-licences', label: '开源许可' },
    ],
    ogLocale: 'zh_CN',
    disclaimer:
      '说明反映 Sign X PDF 预期的浏览器架构。功能与网络行为请按您的威胁模型在实际站点上核实。',
    datePublished: '2026-08-08',
    dateModified: '2026-08-08',
    dateVerified: '2026-08-08',
    verificationNote:
      '验证范围：我们于 2026-08-08 检查了公开 repository 源代码与开源许可声明。链接的 GitHub repository 可供任何人查看；这是源代码参考位置，不是独立安全认证。浏览器测试使用的测试 PDF 保留在测试设备上，没有上传到 Sign X PDF 应用服务器。这是有范围的证据，不代表涵盖浏览器扩展、操作系统服务或未来改动。',
    evidence: [
      {
        method: '隐私网络 e2e（Playwright）',
        result: '签署／合并导出测试中，未观察到 PDF 文档字节上传到应用上传端点',
        scope: 'CI／本地浏览器套件中的自动化 fixture PDF',
        limits: '无法证明所有浏览器扩展或操作系统行为；也不单独覆盖第三方广告框架',
        source: 'tests/e2e/privacy-no-upload.mjs',
      },
      {
        method: '架构／客户端 island',
        result: 'PDF 引擎在 SSR 外壳之后以客户端 island 加载；首页不预加载 pdf.worker 或 QPDF WASM',
        scope: '构建时清单与代码分割回归测试',
        limits: '清单度量的是构建产物，不是每一条运行时路径',
        source: 'tests/build/performance-phase2.test.ts',
      },
    ],
  },
};
