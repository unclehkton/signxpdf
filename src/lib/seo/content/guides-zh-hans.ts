import type { GuidePageContent, GuideSlug } from '../types';
import { phase4ZhHansGuides } from './phase4-guides-zh-hans';

export const zhHansGuides: Record<GuideSlug, GuidePageContent> = {
  ...phase4ZhHansGuides,
  'visible-vs-digital-signature': {
    slug: 'visible-vs-digital-signature',
    pathSegment: 'guides/visible-vs-digital-signature',
    title: 'PDF 可见签名与数字签名有何不同 | Sign X PDF',
    description:
      '手写或文字形式的 PDF 签名是什么、它与基于证书的数字签名有何区别，以及 Sign X PDF 实际提供什么功能。',
    h1: 'PDF 上的可见签名与数字签名',
    answerFirst:
      '很多人说「签署 PDF」时，其实是指在页面上放上手写样式的标记。那是可见（外观式电子）签名。基于证书的数字签名是另一套技术：它使用密码学与数字证书，而不只是图像或笔迹。Sign X PDF 仅提供可见签名的放置。',
    sections: [
      {
        heading: '日常语境里「签署 PDF」通常指什么',
        paragraphs: [
          '在日常用语中，签署 PDF 通常是指添加看起来像签名的标记：用指针或触控笔绘制、用签名样式输入姓名，或把亲笔签名照片放到页面上，然后保存为新的 PDF。',
          '在对方主要需要看到可见签批的非正式流程中，这种标记可能已经够用。它并不等同于可在 PDF 阅读器中用数学方式验证的密码学数字签名字段。',
        ],
      },
      {
        heading: '可见 / 外观式电子签名',
        paragraphs: [
          '可见签名是绘制在页面上或叠放在页面上的内容。阅读者看到的是类似墨迹的笔画、输入的文字或图片。PDF 仍作为普通文档打开；根据工具如何写入文件，该标记会成为页面外观的一部分（或类似注释的视觉层）。',
        ],
        bullets: [
          '在签名板上手写绘制',
          '以签名样式输入姓名',
          '上传或用摄像头拍摄的签名图片',
          '本身不包含证书、身份核验或密码学封印',
        ],
      },
      {
        heading: '基于证书的数字签名',
        paragraphs: [
          '密码学意义上的数字签名使用公钥技术。签署者的证书与文档字节绑定，之后若内容被改动，签名可能失效；兼容的阅读器可以报告签名是否完整，以及证书声称对应的身份。',
          '该流程通常涉及证书签发、私钥，以及实现 PKCS#7/CMS 类 PDF 签名标准的工具（讨论中常与 PAdES 配置一并出现）。Sign X PDF 不实现这条路径。',
        ],
      },
      {
        heading: 'Sign X PDF 实际做什么',
        paragraphs: [
          'Sign X PDF 的浏览器签署工具用于放置可见签名：在浏览器中绘制、输入文字或放置图片签名。处理旨在于您的设备上完成，而不是把 PDF 上传到 Sign X PDF 服务器进行签署。',
          '下列限制是产品边界，不是文案上的临时遗漏。',
        ],
        bullets: [
          '支持：绘制、文字与图片形式的可见签名',
          '不支持：基于证书的密码学签署',
          '不支持：身份核验、KYC 或完整审计轨迹套件',
          '不支持：声称该标记「在任何地方都具有法律约束力」，或本身符合 eIDAS／ESIGN 认证',
        ],
      },
      {
        heading: '如何选择合适的签名方式',
        paragraphs: [
          '如果您只需要非正式流程中的可见标记（例如对方接受以扫描湿墨签名替代的表单），浏览器可见签名工具可能已经够用。',
          '如果您需要密码学完整性、证书身份、长期验证，或受监管的电子签名流程，请使用明确实现数字／证书签署的产品，并遵循所在机构的政策。本页是产品说明，不是法律意见。',
        ],
      },
    ],
    faq: [
      {
        question: '在 PDF 上画签名算数字签名吗？',
        answer:
          '在密码学意义上不算。画签名是放置可见标记。数字签名使用证书与密码学，使阅读器可以验证完整性与证书声明。',
      },
      {
        question: 'Sign X PDF 会创建基于证书的签名吗？',
        answer:
          '不会。Sign X PDF 放置可见签名（绘制、文字或图片），不会应用基于证书的密码学 PDF 签名或验证。',
      },
      {
        question: '可见签名具有法律效力吗？',
        answer:
          '法律效力取决于司法辖区、双方约定与交易性质。Sign X PDF 不提供法律意见，也不声称可见标记在任何地方都自动有效。',
      },
      {
        question: '电子签名与数字签名——Sign X PDF 用哪个说法？',
        answer:
          '我们更倾向用「可见签名」或「添加签名」描述产品。若「数字签名」会让人联想到密码学，我们会避免把产品标记称为数字签名。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '签署 PDF 工具' },
      { pathSegment: 'privacy', label: '隐私与本地处理' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
    ],
    ogLocale: 'zh_CN',
    disclaimer:
      '本页说明 Sign X PDF 的产品用语，不是法律意见。电子或数字签名的要求因司法辖区与用途而异。',
    datePublished: '2026-08-08',
    dateModified: '2026-08-08',
    dateVerified: '2026-08-08',
    verificationNote:
      '验证范围：我们于 2026-08-08 检查了公开 repository 源代码与开源许可声明。链接的 GitHub repository 可供任何人查看；这是源代码参考位置，不是独立安全认证。浏览器测试使用的测试 PDF 保留在测试设备上，没有上传到 Sign X PDF 应用服务器。这是有范围的证据，不代表涵盖浏览器扩展、操作系统服务或未来改动。',
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
