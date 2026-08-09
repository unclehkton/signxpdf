import type { GuidePageContent, Phase4GuideSlug } from '../types';

const VERIFIED = '2026-08-08';
const VERIFICATION_NOTE =
  '验证范围：我们于 2026-08-08 检查了公开 repository 源代码和开源组件。链接的 GitHub repository 可供任何人查看；这是源代码参考位置，不是独立安全认证。浏览器测试使用的文件留在测试设备，没有上传到 Sign X PDF 应用服务器。这是有范围的证据，不代表可以覆盖被入侵的设备、浏览器扩展、操作系统服务或未来的代码变更。';

export const phase4ZhHansGuides: Record<Phase4GuideSlug, GuidePageContent> = {
  'how-to-check-pdf-upload': {
    slug: 'how-to-check-pdf-upload',
    pathSegment: 'guides/how-to-check-pdf-upload',
    title: '如何检查 PDF 网站是否上传你的文件 | Sign X PDF',
    description: '使用浏览器开发者工具检查 PDF 上传：独特文件名、标记、request body、fetch、XHR、Beacon、WebSocket、Service Worker 和限制。',
    h1: '如何检查 PDF 网站是否上传你的文件',
    answerFirst: '先创建一个带有独特文件名和文字标记的安全测试 PDF，再在打开、编辑和导出期间观察浏览器 Network 面板。检查 fetch／XHR、request body、Beacon、WebSocket 和 Service Worker 流量。干净的结果只支持对已测试流程作出有范围的结论，不能证明被入侵设备或浏览器扩展的行为。',
    sections: [
      { heading: '1. 创建可追踪的测试文档', paragraphs: ['不要一开始使用机密文件。创建一个包含独特标记（例如 PDF-UPLOAD-CHECK-20260808-ALPHA）的小型测试 PDF，并使用独特文件名，例如 private-check-20260808-alpha.pdf。如果 request body 可见，标记有助于找出文件字节。', '测试文件应该可以安全暴露。目的是观察请求路径，而不是冒险使用真实客户文件。'], bullets: ['使用独特文件名和文字标记。', '让 fixture 足够小，方便检查和重复。', '记录浏览器、网址、操作和测试时间。'] },
      { heading: '2. 选择文件前先观察 Network 面板', paragraphs: ['打开开发者工具，选择 Network，启用 Preserve log，并清除已有请求。先用 Fetch/XHR 筛选，再使用 All、WS 等相关筛选重复检查。载入页面并让 HTML、JavaScript、字体、图片和 WebAssembly 资源完成下载，然后再选择测试 PDF。', '普通网站出现资源请求是正常的。真正的问题是：所选 PDF 字节是否发送到了应用上传或转换端点。'], bullets: ['留意选择文件后出现的 POST 或 PUT。', '在 DevTools 可见时检查 payload、form-data 和 multipart 字段。', '检查 request URL，不要只看 response status。', '导出时再次检查，因为有些产品在导出时才上传。'] },
      { heading: '3. 不要只检查 fetch 和 XHR', paragraphs: ['只使用 Fetch/XHR 筛选可能遗漏其他传送路径。如果产品使用 Beacon、WebSocket 或 Service Worker，也要检查相关活动。Service Worker 可能代为处理请求，即使页面代码没有直接调用 fetch。', '看不到请求，是对该浏览器会话和流程的证据；不是证明设备上其他软件不能读取文件。'], bullets: ['Beacon：检查保存、离开页面或导航时的调用。', 'WebSocket：检查 frames 是否包含文件标记或文件名。', 'Service Worker：检查注册状态和 worker 代办的网络活动。', '在可见请求细节中搜索独特文件名和标记。'] },
      { heading: '4. 重复操作并比较记录', paragraphs: ['用同一 fixture 测试相关操作，例如签署、合并、压缩、重排和删除，再用第二个独特标记重复一次。应用延迟加载代码时，一次干净的页面加载并不足够。', '这也是 Sign X PDF 自动化隐私测试采用的原则：安装深层请求 hooks、执行操作，并对可疑文件上传模式失败关闭。记录的测试范围展示了明确检查，而不是要求你只相信口号。'], bullets: ['同时测试打开和导出。', '测试每个对你的威胁模型重要的操作。', '只有在不含机密内容时，才保存已遮蔽的 HAR 或截图。'] },
      { heading: '这项检查不能证明什么', paragraphs: ['浏览器 Network 检查不能审计被入侵的操作系统、恶意软件、恶意扩展、可以读取文件的其他应用，或未来部署。如果服务器端行为不在浏览器记录中，也不能单靠这项检查确认保留政策。', '请把结果视为有范围、可重复的观察。高风险流程仍应检查供应商源代码、隐私政策、保留条款和威胁模型。'] },
    ],
    faq: [
      { question: 'Network 面板正常，就能证明 PDF 网站隐私安全吗？', answer: '不能。它只支持对已测试浏览器会话和流程作出结论，不覆盖恶意软件、扩展、操作系统、服务器保留或未来变更。' },
      { question: '为什么使用独特文件名和标记？', answer: '独特文件名和文字标记让你更容易在 request URL、payload、multipart 数据或 WebSocket frame 中找到文件字节，而不必使用机密文件。' },
      { question: 'Sign X PDF 是否使用这种检查？', answer: '是。公开的 Playwright 隐私测试在声明的范围内执行签署、合并、压缩、重排和删除，并观察 request、Beacon、WebSocket 和 Service Worker 路径。' },
    ],
    related: [
      { pathSegment: 'verification', label: 'Sign X PDF 验证方法' },
      { pathSegment: 'privacy', label: '隐私与本地处理' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
      { pathSegment: 'sign-pdf', label: '签署 PDF 工具' },
    ],
    ogLocale: 'zh_CN',
    disclaimer: '这是实用测试方法，不是安全认证或法律意见。请使用非机密 fixture，并先定义威胁模型。',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      { method: '公开的隐私 e2e 测试', result: '测试在执行五项 PDF 流程前安装 request、Beacon、WebSocket 和 Service Worker hooks。', scope: 'Repository Playwright fixtures 和已配置的应用路径', limits: '不证明其他应用、恶意扩展、恶意软件或未来部署的行为。', source: 'tests/e2e/privacy-no-upload.mjs' },
      { method: '浏览器 Network 检查方法', result: '独特文件名和标记提供可重复信号，方便检查 request URL 和 body。', scope: '本指南描述的手动调查方法', limits: 'DevTools 可见程度取决于浏览器和 Service Worker 行为；看不到请求不是普遍保证。', source: 'https://developer.chrome.com/docs/devtools/network/' },
    ],
  },

  'choose-private-pdf-tool': {
    slug: 'choose-private-pdf-tool',
    pathSegment: 'guides/choose-private-pdf-tool',
    title: '如何选择隐私取向的 PDF 工具：实用清单 | Sign X PDF',
    description: '从处理模式、账户、保留、遥测、签名、限制和证据出发，公平比较 PDF 工具的隐私程度。',
    h1: '如何选择隐私取向的 PDF 工具',
    answerFirst: '比较 PDF 工具时，先问文件字节会发生什么、是否需要账户、文件保留多久、收集什么遥测、生成哪种签名，以及公开了哪些限制。“隐私”标签只有在处理模式和证据清楚时才有意义。',
    sections: [
      { heading: '先了解处理模式', paragraphs: ['先问 PDF 是上传到应用服务器、在浏览器本地处理，还是混合处理。“页面使用 HTTPS”不能回答这个问题：加密传输仍然可以把文件送到服务器。', '如果产品声称浏览器本地处理，请用独特 fixture 在 Network 面板验证。阅读范围和限制，不要把“本地”理解成“完全没有网络”。'] },
      { heading: '实用比较清单', paragraphs: ['下面的问题刻意保持产品中立，让你可以比较免费浏览器工具、托管文件服务和自行托管应用，而不是奖励含糊的隐私形容词。'], bullets: ['PDF 是否上传？这决定文件字节是否离开浏览器进行服务器处理。', '是否需要账户？即使文件很快删除，账户仍可能把文件活动与身份关联。', '文件保留多久？查看删除时间、备份、日志和支持人员访问，不要只看“临时”。', '处理是否在本地？用可重复 Network trace 验证，并在可能时检查源代码。', '有哪些遥测？分清文件 metadata、文件名、使用事件、错误报告、广告和普通资源请求。', '签名是可见还是凭证式？手绘或文字标记不等同于密码学数字签名。', '限制是否公开？文件大小、页数、浏览器内存、密码保护和导出失败都会影响实际工作。'] },
      { heading: '按照威胁模型选择工具', paragraphs: ['低风险表格可能适合本地浏览器工具。对于受监管记录，应考虑是否需要身份验证、审计记录、凭证式签署、保留控制、管理员政策或可审计的自行托管部署。隐私不是适用于所有流程的单一分数。', 'Sign X PDF 的范围有意较窄：在浏览器提供可见签名放置和常见 PDF 操作，不声称支持凭证式签署、任何地方的法律效力或抵御被入侵的设备。'] },
      { heading: '证据比声称重要', paragraphs: ['有用的供应商会说明如何检查声称、公开源代码或方法、标注验证日期，并说明测试不能证明什么。这类证据比一长串隐私形容词更有价值。', 'Sign X PDF 公开验证中心并记录隐私测试范围。测试是对已配置流程的证据，不是对所有浏览器、扩展、操作系统或未来功能的全面保证。'] },
    ],
    faq: [
      { question: '浏览器本地 PDF 工具是否一定最隐私？', answer: '不一定。设备安全、浏览器扩展、缓存、遥测、产品限制和所需合规控制仍然重要。请按你的威胁模型验证实际流程。' },
      { question: '向 PDF 供应商先问什么？', answer: '先问所选 PDF 字节是否上传到应用服务器进行处理或存储，再问供应商如何证明答案。' },
      { question: 'Sign X PDF 是否声称自己是最安全的 PDF 工具？', answer: '不是。它说明浏览器本地处理设计、记录有范围的测试和限制，让用户可以与其他选项比较。' },
    ],
    related: [
      { pathSegment: 'verification', label: '验证方法' },
      { pathSegment: 'privacy', label: '隐私政策与存储披露' },
      { pathSegment: 'guides/how-to-check-pdf-upload', label: '如何检查 PDF 上传' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可见签名与数字签名' },
    ],
    ogLocale: 'zh_CN',
    disclaimer: '这是一般产品选择指引，不是针对特定机构的法律、监管或信息安全意见。',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      { method: '第一方隐私测试范围', result: 'Sign X PDF 列出自动化不上载测试覆盖的五项操作，而不是从单一工具推广到所有功能。', scope: '签署、合并、压缩、重排和删除', limits: '测试不覆盖每项未来功能或测试 harness 之外的环境。', source: '/en/verification/' },
      { method: '签名术语来源', result: '产品将可见签名放置与凭证式数字签署分开描述。', scope: '当前签署工具能力和公开术语指南', limits: '法律效力取决于司法管辖区和交易情境。', source: 'README.md#signature-scope' },
    ],
  },

  'pdf-compression-size-quality': {
    slug: 'pdf-compression-size-quality',
    pathSegment: 'guides/pdf-compression-size-quality',
    title: 'PDF 压缩：文件大小与图像质量 | Sign X PDF',
    description: '用文字、扫描、照片和混合 fixture 评估 PDF 压缩，记录目标大小、实际大小和视觉取舍。',
    h1: 'PDF 压缩：文件大小与图像质量',
    answerFirst: 'PDF 压缩是取舍，不是固定百分比。文字、扫描、照片和混合 PDF 的反应不同。与其承诺每个 PDF 都有相同缩减幅度，不如对固定 fixture 记录原始大小、实际大小、是否达到目标和图像质量。',
    sections: [
      { heading: '为什么单一压缩数字会误导', paragraphs: ['文字 PDF 可能已经使用高效的矢量和字体数据。扫描文档有较大的位图可重新压缩；照片型文档可以明显缩小，但低质量设置可能出现模糊或方块。混合文件会在不同页面同时出现多种情况。', '有意义的结果不是“压缩了 70%”，而是一组附有 fixture 类型、目标设置、实际大小和视觉检查备注的前后测量。'] },
      { heading: '可重复的 fixture 组合', paragraphs: ['创建四个非机密 fixture：文字型、扫描文档、照片型和混合内容。固定源文件，记录字节大小和页数。比较时使用相同浏览器、设备类别、目标设置和日期。'], bullets: ['文字型：可选文字、简单矢量图形和普通字体。', '扫描型：带有真实文档细节的页面图像。', '照片型：多张细节不同的照片。', '混合型：文字、图表、截图和至少一页图像密集内容。'] },
      { heading: 'Sign X PDF 压缩器会报告什么', paragraphs: ['浏览器压缩器会先尝试无损组装；如果目标大小需要，再将页面栅格化并搜索 JPEG 质量设置。结果会报告原始字节、实际字节、是否达到目标以及是否使用无损路径。', '因此 500 KB 之类的目标是请求，不是保证。文件可能仍高于目标，更强的缩减也可能改变图像质量。依赖之前请检查导出文件。'], bullets: ['原始大小和实际大小是主要测量。', '是否达到目标是结果标志，不是承诺。', '无损输出与栅格图像／JPEG 输出有不同质量取舍。', '扫描、照片、签名和小字必须进行视觉检查。'] },
      { heading: '诚实记录结果', paragraphs: ['有用的 benchmark 表格包括 fixture 类型、页数、输入字节、目标字节、输出字节、缩减百分比、耗时和简短视觉效果备注。公开条件，让其他人可以重复。', '不要把一次本地结果变成普遍最大值或最小值。设备 CPU、内存、canvas 支持、PDF 结构和源图像都会影响结果。'] },
      { heading: '2026-08-08 Windows 桌面实测', paragraphs: ['以下测试使用非机密 synthetic PDF，在 Windows 和 Chromium 136.0.7103.25 执行。文字 fixture 使用高于无损大小的 50 KB 目标；图像 fixture 使用约为输入大小 60% 的目标。负缩减代表无损 PDF 组装后略大于源文件，不是把文件错误宣称为缩小。', '视觉备注是首页预览的取样信号，不是自动可读性评分。请保留原始文件，并在依赖导出前检查小字、扫描、照片和签名。'], table: { caption: '可重复 browser runner 的 synthetic fixture 测量', headers: ['Fixture', '页数', '输入', '目标', '输出', '缩减', '耗时', '达标'], rows: [['文字型', '8', '15,788 B', '50 KB', '15,996 B', '-1.32%', '252 ms', '是'], ['扫描型', '5', '3,180,540 B', '1,863 KB', '1,863,750 B', '41.40%', '2,422 ms', '是'], ['照片型', '3', '5,667,651 B', '3,320 KB', '3,235,768 B', '42.91%', '1,971 ms', '是'], ['混合型', '4', '3,782,484 B', '2,216 KB', '2,215,598 B', '41.42%', '2,073 ms', '是']] } },
    ],
    faq: [
      { question: '每个 PDF 都能达到 500 KB 吗？', answer: '不能。工具会报告是否达到目标；内容、页数和浏览器资源决定可以达到的程度。' },
      { question: '文件越小是否一定质量越差？', answer: '不一定，但更强的栅格图像／JPEG 压缩可能减少图像细节。请按实际阅读缩放检查导出文件。' },
      { question: '压缩 PDF 时会上传吗？', answer: 'Sign X PDF 的压缩流程设计为在浏览器本地执行；记录的隐私测试覆盖压缩，并检查文件上传模式。' },
    ],
    related: [
      { pathSegment: 'compress-pdf', label: '压缩 PDF 工具' },
      { pathSegment: 'verification', label: '验证方法' },
      { pathSegment: 'guides/large-pdf-browser-tests', label: '大型 PDF 浏览器测试' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
    ],
    ogLocale: 'zh_CN',
    disclaimer: '压缩测量取决于环境。质量重要时，请检查可读性并保留原始文件。',
    datePublished: VERIFIED,
    dateModified: VERIFIED,
    dateVerified: VERIFIED,
    verificationNote: VERIFICATION_NOTE,
    evidence: [
      { method: '压缩实现检查', result: '当前浏览器实现会记录原始／实际大小、目标状态以及无损和栅格图像输出路径。', scope: '客户端压缩流程', limits: '检查源代码不能替代特定设备的质量 benchmark。', source: 'src/lib/pdf/PdfToolkit.ts' },
      { method: '压缩界面检查', result: '工具提供目标大小控制，并向用户报告实际结果。', scope: '当前 Compress panel', limits: '目标控制不能让每个输入都达到相同输出大小。', source: 'src/lib/components/CompressPanel.svelte' },
      { method: '可重复 browser fixture 测试', result: '四个 synthetic fixture 在记录的 Windows 桌面条件完成压缩和导出，测量行已在上方公开。', scope: '浏览器 UI 流程和下载输出字节', limits: '一次桌面测试不证明手机行为或普遍视觉质量。', source: 'README.md#benchmark-scope' },
    ],
  },

  'large-pdf-browser-tests': {
    slug: 'large-pdf-browser-tests',
    pathSegment: 'guides/large-pdf-browser-tests',
    title: '浏览器 PDF 工具中的大型 PDF：如何测试 10–100 MB | Sign X PDF',
    description: '用可重复的方法在桌面和手机条件测试大型 PDF，不制造任意文件大小保证。',
    h1: '浏览器 PDF 工具中的大型 PDF：如何测试',
    answerFirst: '没有实际条件的测量，不应发布任意“PDF 最大大小”。应该使用约 10 MB、25 MB、50 MB 和 100 MB 固定 fixture，在指定桌面和手机浏览器测试，记录加载、预览、导出、输出大小、内存错误和设备信息。',
    sections: [
      { heading: '文件大小只是一个变量', paragraphs: ['两份 50 MB PDF 的表现可能完全不同。一份可能只有几张大图，另一份可能有数百页、复杂字体、透明度或昂贵的栅格化路径。页数、结构、图像尺寸、可用内存、CPU 和浏览器实现都很重要。', '负责任的结果应该说“在这些条件下通过”，而不是暗示所有 50 MB 文件都能在任何地方运行。'] },
      { heading: '测试矩阵', paragraphs: ['使用约 10 MB、25 MB、50 MB 和 100 MB 的固定 fixture。至少测试一个当前桌面浏览器和一个手机浏览器／设备类别，并在结果中保留源 fixture 和浏览器版本。'], bullets: ['加载：页面有响应，而且可以选择文件。', '预览：页面或缩略图可以渲染，没有不可恢复错误。', '操作：目标流程完成，例如重排或压缩。', '导出：浏览器下载可读的输出文件。', '资源结果：记录耗时、可见错误以及标签页是否无响应。'] },
      { heading: '如何报告结果', paragraphs: ['记录确切字节大小、页数、浏览器及版本、操作系统或设备类别、已知内存、操作、开始／结束时间和输出大小。失败时 fresh load 后可以重试一次，但…30096 tokens truncated…nces open source' },
      { pathSegment: '', label: 'Tous les outils' },
    ],
  },
});
