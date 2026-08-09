import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const frBundle: LocaleBundle = buildWave1Bundle('fr', {
  htmlLang: 'fr',
  ogLocale: 'fr_FR',
  nav: {
    home: 'Accueil',
    sign: 'Signer un PDF',
    tools: 'Outils PDF',
    privacy: 'Confidentialité',
    guides: 'Guides',
    openTool: 'Utiliser cet outil dans le navigateur',
    relatedTools: 'Pages associées',
    howTo: 'Comment l’utiliser',
    whatItDoes: 'Ce que fait cet outil',
    localProcessing: 'Comment fonctionne le traitement local',
    limitations: 'Limites',
    faq: 'FAQ',
    enableJs:
      'Activez JavaScript pour modifier des PDF localement dans le navigateur. Aucun envoi de fichier n’est requis une fois les ressources de la page chargées.',
    published: 'Publié',
    updated: 'Dernière mise à jour',
    verified: 'Dernière vérification',
    howWeVerified: 'Comment nous l’avons vérifié',
  },
  home: {
    title: 'Outils PDF privés — Signer, fusionner et compresser | Sign X PDF',
    description:
      'Signez, fusionnez, compressez, réordonnez et supprimez des pages PDF dans le navigateur. Le PDF est traité sur votre appareil, sans envoi aux serveurs de Sign X PDF.',
    h1: 'Signez et modifiez des PDF en privé dans le navigateur',
    answerFirst:
      'Sign X PDF vous permet d’ajouter une signature visible et d’effectuer des opérations PDF courantes directement dans le navigateur. Le fichier est traité sur votre appareil et n’est pas envoyé aux serveurs de Sign X PDF. Aucun compte n’est requis. Une fois terminé, enregistrez le PDF mis à jour sur votre appareil.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF. Comme sur tout site, les ressources ordinaires (HTML, scripts, polices) se téléchargent toujours depuis le réseau.',
    whatItDoes:
      'Choisissez un outil pour signer, fusionner, compresser, réordonner ou supprimer des pages. Chaque page explique le flux et charge l’éditeur uniquement lorsque vous l’utilisez.',
    howTo: [
      'Choisissez un outil, par exemple Signer un PDF ou Fusionner des PDF.',
      'Ouvrez le fichier avec le sélecteur de la page (ou glissez-déposez si proposé).',
      'Terminez les modifications dans le navigateur.',
      'Enregistrez le résultat sur votre appareil.',
    ],
    localProcessing:
      'Après le chargement des ressources de l’application, la lecture, le rendu et l’export s’appuient sur les API du navigateur et des bibliothèques côté client. Le PDF sélectionné n’est pas envoyé aux serveurs de Sign X PDF pour traitement.',
    limitations: [
      'Un navigateur moderne avec JavaScript est requis pour modifier des fichiers.',
      'Les très gros PDF peuvent être plus lents sur des appareils à mémoire limitée.',
      'Le traitement local ne protège pas contre les malwares sur votre appareil ni les extensions de navigateur malveillantes.',
    ],
    faq: [
      {
        question: 'Mon PDF est-il envoyé en ligne ?',
        answer:
          'Non. Sign X PDF est conçu pour traiter le PDF sélectionné localement dans le navigateur, et non pour l’envoyer aux serveurs de Sign X PDF pour conversion ou stockage.',
      },
      {
        question: 'Faut-il un compte ?',
        answer: 'Aucun compte n’est requis pour utiliser les outils dans le navigateur.',
      },
      {
        question: 'Que se passe-t-il quand j’ai fini ?',
        answer:
          'Vous enregistrez le PDF mis à jour sur votre appareil. Dans ce flux, Sign X PDF ne conserve pas de copie serveur de votre fichier.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Signer un PDF' },
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  sign: {
    title: 'Signer un PDF dans le navigateur — Signature visible | Sign X PDF',
    description:
      'Ajoutez une signature visible à un PDF dans le navigateur. Dessinez, saisissez ou placez une image de signature en local, sans envoyer le PDF aux serveurs de Sign X PDF.',
    h1: 'Signer un PDF dans le navigateur',
    answerFirst:
      'Sign X PDF permet d’ajouter une signature visible à un PDF directement dans le navigateur. Le document est traité sur votre appareil plutôt qu’envoyé aux serveurs de Sign X PDF. Aucun compte n’est requis. À la fin, enregistrez le PDF signé sur votre appareil.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Créez une signature en dessinant, en tapant, en important une image ou via la caméra si disponible, placez-la sur la page, puis exportez un nouveau PDF.',
    howTo: [
      'Ouvrez un PDF ou une image prise en charge.',
      'Créez ou choisissez une signature (dessin, texte, image ou caméra).',
      'Placez et redimensionnez la signature sur la page.',
      'Enregistrez le PDF signé sur votre appareil.',
    ],
    localProcessing:
      'La création de la signature et l’export du PDF s’exécutent avec des bibliothèques côté client dans le navigateur, une fois les ressources de la page chargées.',
    limitations: [
      'Cela ajoute une apparence de signature visible, pas une signature numérique cryptographique adossée à un certificat.',
      'Cela ne crée pas à lui seul une piste d’audit, une vérification d’identité ni une garantie de validité juridique.',
      'Les PDF chiffrés peuvent nécessiter le mot de passe d’ouverture avant modification.',
    ],
    faq: [
      {
        question: 'S’agit-il d’une signature numérique avec certificat ?',
        answer:
          'Non. Sign X PDF place une signature visible (dessinée, saisie ou image). Elle n’applique pas de signature cryptographique par certificat, d’horodatage ni de vérification de signature.',
      },
      {
        question: 'Faut-il envoyer le PDF pour le signer ?',
        answer:
          'Non. La signature est conçue pour s’exécuter localement dans le navigateur. Les ressources ordinaires du site se téléchargent toujours sur le réseau.',
      },
      {
        question: 'Puis-je utiliser une photo de ma signature ?',
        answer:
          'Oui. Vous pouvez importer une image de signature ou la capturer si le navigateur autorise l’accès à la caméra.',
      },
      {
        question: 'Dessiner sur un PDF, c’est la même chose qu’une signature numérique ?',
        answer:
          'Non. Dessiner place une marque visible. Une signature numérique adossée à un certificat repose sur la cryptographie et un certificat numérique. Sign X PDF ne place que des signatures visibles.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Fusionner des fichiers PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages' },
      { pathSegment: 'privacy', label: 'Confidentialité et traitement local' },
    ],
  },
  merge: {
    title: 'Fusionner des PDF localement dans le navigateur — sans envoyer vos fichiers | Sign X PDF',
    description:
      'Combinez plusieurs PDF en un seul fichier dans le navigateur. La fusion se fait en local — vos fichiers ne sont pas envoyés aux serveurs de Sign X PDF.',
    h1: 'Fusionner des fichiers PDF dans le navigateur',
    answerFirst:
      'Utilisez Sign X PDF pour fusionner plusieurs PDF en un seul document dans le navigateur. Les fichiers sont traités sur votre appareil, sans envoi aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF fusionné une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Chargez un ou plusieurs PDF (et images prises en charge), arrangez les pages et exportez un PDF combiné unique.',
    howTo: [
      'Ouvrez l’espace de travail de fusion ci-dessous.',
      'Ajoutez les fichiers PDF à combiner.',
      'Réordonnez les pages si besoin.',
      'Enregistrez le PDF fusionné sur votre appareil.',
    ],
    localProcessing:
      'La fusion s’appuie sur des bibliothèques PDF côté client dans le navigateur après le chargement des ressources. Les fichiers sélectionnés ne sont pas envoyés aux serveurs de Sign X PDF pour la fusion.',
    limitations: [
      'Les limites de mémoire du navigateur s’appliquent aux très gros fichiers ou à un grand nombre de fichiers.',
      'Certains PDF chiffrés exigent un mot de passe avant de pouvoir être fusionnés.',
    ],
    faq: [
      {
        question: 'Puis-je fusionner plus de deux PDF ?',
        answer:
          'Oui. Ajoutez plusieurs fichiers dans l’espace de travail, puis exportez un seul PDF combiné.',
      },
      {
        question: 'Mes fichiers sont-ils envoyés pour être fusionnés ?',
        answer: 'Non. Le traitement de fusion est conçu pour rester dans le navigateur.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Supprimer des pages PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  compress: {
    title: 'Compresser un PDF dans le navigateur | Sign X PDF',
    description:
      'Réduisez la taille d’un PDF dans le navigateur. La compression s’exécute en local, sans envoyer le fichier aux serveurs de Sign X PDF.',
    h1: 'Compresser un PDF dans le navigateur',
    answerFirst:
      'Compressez un PDF directement dans le navigateur avec Sign X PDF. Le traitement reste sur votre appareil plutôt que d’envoyer le fichier aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF allégé une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Chargez un PDF, choisissez une taille cible si disponible, lancez la compression dans le navigateur et enregistrez le résultat.',
    howTo: [
      'Ouvrez un PDF dans l’espace de travail.',
      'Choisissez les réglages de compression.',
      'Lancez la compression et vérifiez la taille obtenue.',
      'Enregistrez le PDF compressé.',
    ],
    localProcessing:
      'La compression utilise un traitement sur l’appareil après le chargement des ressources de l’outil. Le PDF n’est pas envoyé aux serveurs de Sign X PDF pour compression.',
    limitations: [
      'La réduction possible dépend du contenu (scans par rapport au texte).',
      'Une compression forte peut dégrader la qualité visuelle des images dans le PDF.',
    ],
    faq: [
      {
        question: 'La compression atteint-elle toujours la taille souhaitée ?',
        answer:
          'Pas toujours. Les scans riches en images se compressent autrement qu’un PDF texte. L’outil indique la taille obtenue.',
      },
      {
        question: 'Le PDF est-il envoyé pour être compressé ?',
        answer: 'Non. La compression est conçue pour s’exécuter localement dans le navigateur.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages' },
      { pathSegment: 'sign-pdf', label: 'Signer un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  reorder: {
    title: 'Réordonner les pages d’un PDF dans le navigateur | Sign X PDF',
    description:
      'Modifiez l’ordre des pages d’un PDF dans le navigateur. Le réordonnancement est local — les fichiers ne sont pas envoyés aux serveurs de Sign X PDF.',
    h1: 'Réordonner les pages d’un PDF dans le navigateur',
    answerFirst:
      'Réordonnez les pages d’un PDF directement dans le navigateur avec Sign X PDF. Le fichier est traité localement, sans envoi aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF réordonné une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Ouvrez un PDF, glissez ou déplacez les pages dans l’ordre souhaité, puis exportez le document mis à jour.',
    howTo: [
      'Chargez un PDF dans l’espace de travail.',
      'Glissez les pages dans l’ordre souhaité.',
      'Vérifiez la séquence des pages.',
      'Enregistrez le PDF mis à jour.',
    ],
    localProcessing:
      'Le réordonnancement des pages s’applique avec des outils PDF côté client dans le navigateur, après le chargement des ressources.',
    limitations: [
      'Les très gros documents peuvent être plus lents à afficher en miniatures.',
      'Les PDF protégés par mot de passe peuvent devoir être déverrouillés d’abord.',
    ],
    faq: [
      {
        question: 'Puis-je réordonner après une fusion ?',
        answer: 'Oui. Fusionnez ou ajoutez des pages d’abord, puis réorganisez avant d’enregistrer.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Supprimer des pages' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  deletePages: {
    title: 'Supprimer des pages PDF localement dans le navigateur — sans envoyer vos fichiers | Sign X PDF',
    description:
      'Retirez les pages indésirables d’un PDF dans le navigateur. La suppression s’exécute en local, sans envoyer le PDF aux serveurs de Sign X PDF.',
    h1: 'Supprimer des pages d’un PDF dans le navigateur',
    answerFirst:
      'Supprimez des pages d’un PDF dans le navigateur avec Sign X PDF. Le traitement reste sur votre appareil plutôt que d’envoyer le fichier aux serveurs de Sign X PDF. Aucun compte n’est requis. Enregistrez le PDF mis à jour une fois terminé.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF.',
    whatItDoes:
      'Ouvrez un PDF, sélectionnez les pages à retirer, vérifiez le reste, puis exportez un nouveau fichier sans ces pages.',
    howTo: [
      'Chargez un PDF dans l’espace de travail.',
      'Sélectionnez les pages à supprimer.',
      'Vérifiez que les pages restantes sont correctes.',
      'Enregistrez le PDF mis à jour.',
    ],
    localProcessing:
      'La suppression de pages s’effectue avec des bibliothèques côté client dans le navigateur, une fois l’outil chargé.',
    limitations: [
      'Les pages supprimées ne peuvent pas être récupérées dans le fichier exporté.',
      'Certains PDF chiffrés exigent un mot de passe avant de pouvoir modifier les pages.',
    ],
    faq: [
      {
        question: 'Puis-je supprimer plusieurs pages d’un coup ?',
        answer:
          'Oui. Sélectionnez plusieurs pages dans le gestionnaire de pages, puis retirez-les avant d’enregistrer.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Réordonner les pages' },
      { pathSegment: 'merge-pdf', label: 'Fusionner des PDF' },
      { pathSegment: 'compress-pdf', label: 'Compresser un PDF' },
      { pathSegment: 'privacy', label: 'Confidentialité' },
    ],
  },
  privacy: {
    title: 'Confidentialité — Traitement local des PDF | Sign X PDF',
    description:
      'Comment Sign X PDF traite les PDF dans le navigateur sans envoyer le document pour le traitement des outils, comment évaluer les éditeurs privés, et ce que nous ne prétendons pas.',
    h1: 'Confidentialité et traitement local des PDF',
    answerFirst:
      'Sign X PDF est conçu pour que le PDF sélectionné soit lu et traité dans le navigateur pour la signature et les modifications courantes. Ce PDF n’est pas envoyé aux serveurs de Sign X PDF pour ce traitement. Les ressources normales du site se téléchargent toujours sur le réseau. Aucun compte n’est requis pour ces outils navigateur.',
    privacyNote:
      'Votre PDF est traité localement dans le navigateur et n’est pas envoyé aux serveurs de Sign X PDF pour le traitement des outils.',
    whatItDoes:
      'Cette page explique le modèle de confidentialité des outils navigateur Sign X PDF, en quoi le traitement local diffère des sites qui demandent un envoi de fichier, et une liste pratique pour évaluer tout éditeur PDF auquel vous confiez des documents sensibles.',
    howTo: [
      'Le HTML, le JavaScript, les polices et les ressources WASM de l’application se téléchargent comme sur tout site.',
      'Vous choisissez un PDF via le sélecteur du navigateur ou par glisser-déposer (le navigateur conserve une référence locale au fichier).',
      'Le fichier est lu avec les API du navigateur et traité sur l’appareil avec des bibliothèques côté client et, le cas échéant, WebAssembly.',
      'Vous enregistrez le résultat sur votre appareil ; le flux n’est pas conçu pour conserver une copie serveur de votre PDF.',
    ],
    localProcessing:
      'Traitement local signifie que le pipeline d’édition s’exécute dans l’onglet du navigateur avec du code côté client (y compris un rendu de type pdf.js, l’assemblage pdf-lib et QPDF WebAssembly pour certaines opérations). Cela ne signifie pas « aucun réseau du tout » : les scripts et autres ressources se chargent encore, et la publicité ou l’analytique tierce peut encore demander des ressources web ordinaires si présentes. Les octets du document dans le flux de l’outil sont destinés à rester dans l’onglet plutôt qu’à être envoyés en POST vers les serveurs d’application de Sign X PDF.',
        storageDisclosure: {
      heading: "Stockage navigateur utilisé par Sign X PDF",
      storageColumn: "Stockage",
      purposeColumn: "Finalité",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Préférence de langue et une courte fenêtre de limitation des exports gratuits. Ce sont des données first-party du site, pas des cookies publicitaires.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Signatures enregistrées que vous choisissez de conserver dans ce navigateur (y compris les blobs d’image) pour les réutiliser.",
        },
        {
          storage: "Cookies",
          purpose:
            "Le traitement PDF principal n’exige pas de cookies publicitaires first-party. Des publicités ou analyses tierces, si présentes, peuvent déposer leurs propres cookies selon leur politique.",
        },
      ],
      clearNote:
        "Effacer les données de ce site dans le navigateur supprime les préférences et signatures enregistrées localement. Le flux de l’outil ne conserve pas de copie PDF côté serveur.",
    },
limitations: [
      'Le traitement local ne protège pas un appareil compromis ni des extensions de navigateur malveillantes.',
      'Nous ne prétendons pas à une confidentialité militaire, à un anonymat total, à une télémétrie nulle dans tous les environnements de na…36503 tokens truncated…whatItDoes: '此工具的作用',
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
