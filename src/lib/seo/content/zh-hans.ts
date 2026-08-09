import type { LocaleBundle } from '../types';
import { zhHansGuides } from './guides-zh-hans';

export const zhHansBundle: LocaleBundle = {
  locale: 'zh-hans',
  htmlLang: 'zh-Hans',
  nav: {
    home: '首页',
    sign: '签署 PDF',
    tools: 'PDF 工具',
    privacy: '隐私',
    guides: '指南',
    openTool: '在浏览器中使用此工具',
    relatedTools: '相关页面',
    howTo: '使用方法',
    whatItDoes: '此工具的作用',
    localProcessing: '本地处理说明',
    limitations: '限制',
    faq: '常见问题',
    enableJs: '请启用 JavaScript，以便在浏览器中本地处理 PDF。页面资源加载完成后无需上传文件。',
    published: '发布日期',
    updated: '最近更新',
    verified: '最近验证',
    howWeVerified: '我们如何验证',
  },
  home: {
    slug: 'home',
    pathSegment: '',
    title: '注重隐私的 PDF 工具 — 签署、合并、压缩 | Sign X PDF',
    description:
      '在浏览器中为 PDF 添加签名，并可合并、压缩、重排与删除页面。PDF 在您的设备上处理，而不是上传到 Sign X PDF 服务器。',
    h1: '在浏览器中私密签署并处理 PDF',
    answerFirst:
      'Sign X PDF 可让您在浏览器中为 PDF 添加可见签名，并完成常见 PDF 操作。PDF 在您的设备上处理，而不是上传到 Sign X PDF 服务器。无需账户。完成后可将更新后的文件保存到本机。',
    privacyNote:
      '您选择的 PDF 在浏览器中本地处理，不会上传到 Sign X PDF 服务器。与一般网站一样，页面仍会从网络加载 HTML、脚本、字体等资源。',
    whatItDoes:
      '可选择签署、合并、压缩、重新排列页面或删除 PDF 页面等工具。各工具页会说明流程，并在您实际使用时再加载编辑功能。',
    howTo: [
      '选择工具，例如「签署 PDF」或「合并 PDF」。',
      '通过页面上的文件选择器打开文件（支持时也可拖放）。',
      '在浏览器中完成编辑。',
      '将结果保存到您的设备。',
    ],
    localProcessing:
      '应用资源加载完成后，读取、渲染与导出使用浏览器 API 和客户端库完成。所选 PDF 不会被提交到 Sign X PDF 应用服务器进行处理。',
    limitations: [
      '编辑功能需要支持 JavaScript 的现代浏览器。',
      '体积很大的 PDF 在内存较小的设备上可能较慢。',
      '本地处理无法防范设备本身已被入侵，或恶意浏览器扩展带来的风险。',
    ],
    faq: [
      {
        question: '我的 PDF 会被上传吗？',
        answer:
          '不会。Sign X PDF 的设计是在浏览器中本地处理您选择的 PDF，而不是上传到 Sign X PDF 服务器进行转换或存储。',
      },
      {
        question: '需要账户吗？',
        answer: '使用浏览器工具无需账户。',
      },
      {
        question: '完成后会怎样？',
        answer: '您可以将更新后的 PDF 保存到设备。此流程不会在服务器上保留您的文件副本。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '签署 PDF' },
      { pathSegment: 'merge-pdf', label: '合并 PDF' },
      { pathSegment: 'compress-pdf', label: '压缩 PDF' },
      { pathSegment: 'privacy', label: '隐私' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可见签名与数字签名' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
    ],
    ogLocale: 'zh_CN',
    toolKind: 'none',
  },
  tools: {
    'sign-pdf': {
      slug: 'sign-pdf',
      pathSegment: 'sign-pdf',
      title: '在浏览器中签署 PDF — 可见签名 | Sign X PDF',
      description:
        '在浏览器中为 PDF 添加可见签名。可手写、输入文字或放置图片签名；PDF 在本地处理，无需上传到 Sign X PDF 服务器。',
      h1: '在浏览器中签署 PDF',
      answerFirst:
        'Sign X PDF 可让您直接在浏览器中为 PDF 添加可见签名。PDF 在您的设备上本地处理，而不是上传到 Sign X PDF 服务器。无需账户。完成后可保存更新后的 PDF。',
      privacyNote: '您选择的 PDF 在浏览器中本地处理，不会上传到 Sign X PDF 服务器。',
      whatItDoes:
        '可通过绘制、输入文字、上传图片，或在浏览器允许时使用摄像头创建签名，放置到页面后导出新的 PDF。',
      howTo: [
        '打开 PDF 或支持的图片。',
        '创建或选择签名（绘制、输入、上传或摄像头）。',
        '在页面上放置并调整签名大小。',
        '将已签署的 PDF 保存到设备。',
      ],
      localProcessing: '页面资源加载后，签名创建与 PDF 导出在浏览器中通过客户端库完成。',
      limitations: [
        '此功能添加的是可见签名外观，不是基于证书的密码学数字签名。',
        '不会生成审计轨迹、身份核验，也不保证在任何司法辖区具有法律效力。',
        '加密 PDF 可能需要打开密码后才能编辑。',
      ],
      faq: [
        {
          question: '这是基于证书的数字签名吗？',
          answer:
            '不是。Sign X PDF 放置的是可见签名（手写、文字或图片），不会应用基于证书的密码学签署、时间戳或签名验证。',
        },
        {
          question: '签署时会上传 PDF 吗？',
          answer: '不会。签署流程设计为在浏览器中本地完成。网站资源仍会通过网络下载。',
        },
        {
          question: '可以使用签名照片吗？',
          answer: '可以。您可以上传签名图片，或在浏览器允许时用摄像头拍摄。',
        },
        {
          question: '在 PDF 上画签名等于数字签名吗？',
          answer:
            '不等于。画签名是放置可见标记。基于证书的数字签名依赖密码学与数字证书。Sign X PDF 只放置可见签名。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合并 PDF' },
        { pathSegment: 'compress-pdf', label: '压缩 PDF' },
        { pathSegment: 'privacy', label: '隐私与本地处理' },
        { pathSegment: 'guides/visible-vs-digital-signature', label: '可见签名与数字签名' },
      ],
      ogLocale: 'zh_CN',
      toolKind: 'sign',
    },
    'merge-pdf': {
      slug: 'merge-pdf',
      pathSegment: 'merge-pdf',
      title: '在浏览器中本地合并 PDF — 无需上传 | Sign X PDF',
      description:
        '在浏览器中将多个 PDF 合并为一个文件。合并在本地完成，文件不会上传到 Sign X PDF 服务器。',
      h1: '在浏览器中合并 PDF',
      answerFirst:
        '使用 Sign X PDF 在浏览器中将多个 PDF 合并为一份文档。文件在您的设备上本地处理，而不是上传到 Sign X PDF 服务器。无需账户。完成后保存合并后的 PDF。',
      privacyNote: '您选择的 PDF 在浏览器中本地处理，不会上传到 Sign X PDF 服务器。',
      whatItDoes: '加载一个或多个 PDF（及支持的图片），整理页面，并导出单一合并 PDF。',
      howTo: [
        '打开下方的合并工作区。',
        '添加要合并的 PDF。',
        '如有需要，重新排列页面。',
        '将合并后的 PDF 保存到设备。',
      ],
      localProcessing:
        '资源加载后，合并在浏览器内通过客户端 PDF 库完成；所选文件不会被发送到 Sign X PDF 服务器做合并处理。',
      limitations: [
        '文件数量很多或体积很大时，会受浏览器内存限制。',
        '部分加密 PDF 需先输入密码。',
      ],
      faq: [
        {
          question: '可以合并两个以上的 PDF 吗？',
          answer: '可以。在工具工作区添加多个文件，再导出一份合并后的 PDF。',
        },
        {
          question: '合并时会上传文件吗？',
          answer: '不会。合并处理设计为留在您的浏览器内完成。',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: '重新排列页面' },
        { pathSegment: 'delete-pdf-pages', label: '删除 PDF 页面' },
        { pathSegment: 'compress-pdf', label: '压缩 PDF' },
        { pathSegment: 'privacy', label: '隐私' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
      ],
      ogLocale: 'zh_CN',
      toolKind: 'tools',
      toolsFocus: 'merge',
    },
    'compress-pdf': {
      slug: 'compress-pdf',
      pathSegment: 'compress-pdf',
      title: '在浏览器中压缩 PDF | Sign X PDF',
      description:
        '在浏览器中减小 PDF 文件体积。压缩在本地执行，无需将 PDF 上传到 Sign X PDF 服务器。',
      h1: '在浏览器中压缩 PDF',
      answerFirst:
        '使用 Sign X PDF 直接在浏览器中压缩 PDF。处理留在您的设备上，而不是上传到 Sign X PDF 服务器。无需账户。完成后保存体积更小的 PDF。',
      privacyNote: '您选择的 PDF 在浏览器中本地处理，不会上传到 Sign X PDF 服务器。',
      whatItDoes: '加载 PDF，选择目标大小（如可用），在浏览器中执行压缩，再保存结果。',
      howTo: [
        '在工作区打开 PDF。',
        '选择压缩设置。',
        '执行压缩并查看结果大小。',
        '保存压缩后的 PDF。',
      ],
      localProcessing: '工具资源加载后，压缩在设备上完成；PDF 不会上传到 Sign X PDF 服务器进行压缩。',
      limitations: [
        '可压缩的幅度取决于内容（扫描图像与文字型 PDF 不同）。',
        '高强度压缩可能降低 PDF 内图片的视觉质量。',
      ],
      faq: [
        {
          question: '一定能压到目标大小吗？',
          answer: '不一定。以图像为主的扫描件与文字 PDF 压缩效果不同。工具会显示实际达到的大小。',
        },
        {
          question: '压缩时会上传 PDF 吗？',
          answer: '不会。压缩设计为在浏览器中本地执行。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合并 PDF' },
        { pathSegment: 'reorder-pdf', label: '重新排列页面' },
        { pathSegment: 'privacy', label: '隐私' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
      ],
      ogLocale: 'zh_CN',
      toolKind: 'tools',
      toolsFocus: 'compress',
    },
    'reorder-pdf': {
      slug: 'reorder-pdf',
      pathSegment: 'reorder-pdf',
      title: '在浏览器中重新排列 PDF 页面 | Sign X PDF',
      description:
        '在浏览器中调整 PDF 页面顺序。重排在本地完成，文件不会上传到 Sign X PDF 服务器。',
      h1: '在浏览器中重新排列 PDF 页面',
      answerFirst:
        '使用 Sign X PDF 直接在浏览器中重新排列 PDF 页面。文件在本地处理，而不是上传到 Sign X PDF 服务器。无需账户。完成后保存更新后的 PDF。',
      privacyNote: '您选择的 PDF 在浏览器中本地处理，不会上传到 Sign X PDF 服务器。',
      whatItDoes: '打开 PDF，拖动或移动页面到所需顺序，然后导出更新后的文档。',
      howTo: [
        '在工作区加载 PDF。',
        '将页面拖到所需顺序。',
        '检查页面顺序。',
        '保存更新后的 PDF。',
      ],
      localProcessing: '资源加载后，页面重排在浏览器内通过客户端 PDF 工具完成。',
      limitations: [
        '页数极多的文档生成缩略图时可能较慢。',
        '受密码保护的 PDF 可能需要先解锁。',
      ],
      faq: [
        {
          question: '合并文件后还能再重排吗？',
          answer: '可以。先合并或添加页面，保存前再调整顺序。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合并 PDF' },
        { pathSegment: 'delete-pdf-pages', label: '删除页面' },
        { pathSegment: 'privacy', label: '隐私' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
      ],
      ogLocale: 'zh_CN',
      toolKind: 'tools',
      toolsFocus: 'reorder',
    },
    'delete-pdf-pages': {
      slug: 'delete-pdf-pages',
      pathSegment: 'delete-pdf-pages',
      title: '在浏览器中本地删除 PDF 页面 — 无需上传 | Sign X PDF',
      description:
        '在浏览器中移除不需要的 PDF 页面。删除在本地执行，无需将 PDF 上传到 Sign X PDF 服务器。',
      h1: '在浏览器中删除 PDF 页面',
      answerFirst:
        '使用 Sign X PDF 在浏览器中从 PDF 移除页面。处理留在您的设备上，而不是上传到 Sign X PDF 服务器。无需账户。完成后保存更新后的 PDF。',
      privacyNote: '您选择的 PDF 在浏览器中本地处理，不会上传到 Sign X PDF 服务器。',
      whatItDoes: '打开 PDF，选择要移除的页面，确认剩余页面，再导出不含这些页面的新文件。',
      howTo: [
        '在工作区加载 PDF。',
        '选择要删除的页面。',
        '确认剩余页面正确。',
        '保存更新后的 PDF。',
      ],
      localProcessing: '工具加载后，删除页面在浏览器内通过客户端库完成。',
      limitations: [
        '已导出的文件无法恢复被删除的页面。',
        '部分加密 PDF 需先输入密码才能更改页面。',
      ],
      faq: [
        {
          question: '可以一次删除多页吗？',
          answer: '可以。在页面管理中选中多页，保存前移除即可。',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: '重新排列页面' },
        { pathSegment: 'merge-pdf', label: '合并 PDF' },
        { pathSegment: 'privacy', label: '隐私' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
      ],
      ogLocale: 'zh_CN',
      toolKind: 'tools',
      toolsFocus: 'delete',
    },
  },
  privacy: {
    slug: 'privacy',
    pathSegment: 'privacy',
    title: '隐私 — 本地 PDF 处理 | Sign X PDF',
    description:
      'Sign X PDF 如何在浏览器中处理 PDF、不为工具处理上传您的文档，如何评估注重隐私的 PDF 工具，以及我们不会作出的声明。',
    h1: '隐私与本地 PDF 处理',
    answerFirst:
      'Sign X PDF 的设计是：您选择的 PDF 在浏览器中读取并处理，用于签署与常见编辑。该处理不会把 PDF 上传到 Sign X PDF 服务器。普通网站资源仍会通过网络下载。使用这些浏览器工具无需账户。',
    privacyNote:
      '您选择的 PDF 在浏览器中本地处理，不会为工具处理而上传到 Sign X PDF 服务器。',
    whatItDoes:
      '本页说明 Sign X PDF 浏览器工具的隐私模型、本地处理与上传式在线 PDF 网站的区别，以及评估任何 PDF 编辑器时可用的实用清单。',
    howTo: [
      '应用的 HTML、JavaScript、字体与 WASM 等资源会像一般网站一样下载。',
      '您通过浏览器文件选择器或拖放选择 PDF（浏览器保留本地 File 引用）。',
      '文件通过浏览器 API 读取，并用客户端库（适用时还有 WebAssembly）在设备上处理。',
      '您将输出文件保存到设备；此流程并非设计为在服务器上保留您的 PDF 副本。',
    ],
    localProcessing:
      '本地处理是指编辑流程在浏览器标签页内以客户端代码执行（包括类 pdf.js 的渲染、pdf-lib 组装，以及部分操作使用的 QPDF WebAssembly）。这并不表示「完全没有网络」：脚本等资源仍会加载；若页面含广告或分析组件，仍可能请求普通网页资源。工具流程中的文档字节旨在留在标签页内，而不是通过 POST 提交到 Sign X PDF 应用服务器。',
    storageDisclosure: {
      heading: 'Sign X PDF 使用的浏览器存储',
      storageColumn: '存储方式',
      purposeColumn: '用途',
      rows: [
        {
          storage: 'localStorage',
          purpose:
            '语言偏好，以及限制免费导出频率的短暂时间窗。这些是第一方网站数据，并非广告 cookies。',
        },
        {
          storage: 'IndexedDB',
          purpose: '您选择保存在此浏览器以便重用的签名库条目（包括签名图像 Blob）。',
        },
        {
          storage: 'Cookies',
          purpose:
            '核心 PDF 处理不需要第一方广告 cookies。若页面含第三方广告或分析，对方可能按其政策设置 cookies。',
        },
      ],
      clearNote:
        '在浏览器中清除本站数据会移除本地偏好设置与已保存签名。工具流程不会在服务器保留您的 PDF 副本。',
    },
    limitations: [
      '本地处理无法防范已被入侵的设备或恶意浏览器扩展。',
      '我们不会声称军用级隐私、完全匿名、在所有浏览器环境零遥测，或零风险。',
      '普通网站资源仍会下载；在未于您的设备上验证暖加载前，不保证可离线使用。',
      '若日后功能需要网络上传，必须有明确的设计变更并更新说明文字。',
    ],
    faq: [
      {
        question: '是否有任何数据会离开我的设备？',
        answer:
          '网站资源会正常下载。所选 PDF 旨在留在浏览器内处理。我们不会声称在任何情况下都不会有字节离开您的设备（例如操作系统或扩展程序的行为超出本应用控制范围）。',
      },
      {
        question: '你们会在服务器上保存我的 PDF 吗？',
        answer:
          '此处所述的浏览器工具并非设计为将 PDF 上传到 Sign X PDF 服务器进行存储或转换。',
      },
      {
        question: 'Sign X PDF 会用哪些浏览器存储？',
        answer:
          'localStorage 存放语言偏好与导出频率时间窗；IndexedDB 存放您选择保存的签名。核心 PDF 处理不需要第一方广告 cookies。清除网站数据即可移除上述本地项目。',
      },
      {
        question: '需要账户吗？',
        answer: '使用本站所述的浏览器签署与 PDF 工具无需账户。',
      },
      {
        question: '应如何判断在线 PDF 编辑器是否安全？',
        answer:
          '建议关注：处理模式（上传还是本地）、保留策略、是否需要账户、遥测说明、签名是可见标记还是基于证书、能否查看开源组件，以及实际文件限制。并用带独特文件名的测试文件，在浏览器网络面板中核实相关声明。',
      },
      {
        question: 'Sign X PDF 是否自动就是最安全的选择？',
        answer:
          '没有任何工具能在所有威胁模型下自动成为最安全选项。Sign X PDF 侧重本地文档处理与清晰边界。请比较具体标准而非口号，并针对您的用途复核网络行为。',
      },
      {
        question: '可以查看开源组件吗？',
        answer: '可以。QPDF、pdf-lib 等库的许可声明列在开源许可页面。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '签署 PDF' },
      { pathSegment: 'merge-pdf', label: '合并 PDF' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '浏览器 PDF 工具如何工作' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可见签名与数字签名' },
      { pathSegment: 'open-source-licences', label: '开源许可' },
      { pathSegment: '', label: '所有工具' },
    ],
    ogLocale: 'zh_CN',
    toolKind: 'none',
  },
  guides: zhHansGuides,
};
