import type { GuidePageContent, GuideSlug } from '../types';
import { phase4ZhHantGuides } from './phase4-guides-zh-hant';

export const zhHantGuides: Record<GuideSlug, GuidePageContent> = {
  ...phase4ZhHantGuides,
  'visible-vs-digital-signature': {
    slug: 'visible-vs-digital-signature',
    pathSegment: 'guides/visible-vs-digital-signature',
    title: 'PDF 可見簽名與數碼簽署有何不同 | Sign X PDF',
    description:
      '手繪或文字簽名與憑證式數碼簽署有何分別，以及 Sign X PDF 實際提供甚麼功能。',
    h1: 'PDF 可見簽名與數碼簽署有何不同',
    answerFirst:
      '日常所說的「簽署 PDF」，往往是指在頁面加上看似簽名的標記：手繪、打字或貼上簽名圖片。那是可見（外觀式）簽名。憑證式數碼簽署是另一套技術，依賴密碼學與數碼證書，而不只是圖像或筆跡。Sign X PDF 只提供可見簽名放置。',
    sections: [
      {
        heading: '日常語言中的「簽署 PDF」',
        paragraphs: [
          '一般使用情境下，簽署 PDF 代表在文件上加上簽名外觀：用滑鼠或觸控筆書寫、以文字樣式輸入姓名，或上載手寫簽名圖片，然後另存新 PDF。',
          '若對方主要需要看到可見的簽署痕跡，這種方式可能已足夠。它並不等同於可在閱讀器中以密碼學方式驗證的數碼簽署欄位。',
        ],
      },
      {
        heading: '可見／外觀式電子簽名',
        paragraphs: [
          '可見簽名是頁面上的外觀內容：筆跡、字型化姓名或圖像。讀者看到的是簽名樣子；工具如何寫入 PDF 結構可能不同，但重點是外觀標記，而不是憑證驗證。',
        ],
        bullets: [
          '簽名板手繪',
          '以文字建立簽名',
          '上載或相機拍攝簽名圖像',
          '本身不包含憑證、身份核實或密碼學封印',
        ],
      },
      {
        heading: '憑證式數碼簽署',
        paragraphs: [
          '密碼學意義上的數碼簽署使用公鑰技術，把簽署者憑證與文件內容綁定，文件被改動後簽署可能失效，相容閱讀器亦可顯示驗證結果與憑證聲稱的身分。',
          '此流程通常涉及憑證簽發、私鑰，以及實作 PKCS#7/CMS 等 PDF 簽署標準的工具（討論中常與 PAdES 一併出現）。Sign X PDF 並不實作此路徑。',
        ],
      },
      {
        heading: 'Sign X PDF 實際做甚麼',
        paragraphs: [
          'Sign X PDF 的瀏覽器簽署工具用於放置可見簽名：在瀏覽器中手繪、打字或放置簽名圖像。處理旨在於你的裝置上完成，而不是把 PDF 上傳至 Sign X PDF 伺服器簽署。',
          '下列限制是產品邊界，不是行銷遺漏。',
        ],
        bullets: [
          '支援：手繪、文字與圖像可見簽名',
          '不支援：憑證式密碼學簽署',
          '不支援：身份核實、KYC 或完整稽核紀錄套件',
          '不支援：聲稱簽署「在任何司法管轄區必然具法律效力」或本身符合 eIDAS／ESIGN 認證',
        ],
      },
      {
        heading: '如何選擇合適的簽署方式',
        paragraphs: [
          '若只需要非正式流程中的可見簽署痕跡，瀏覽器可見簽名工具可能已足夠。',
          '若需要密碼學完整性、憑證身分、長期驗證或受規管的電子簽署流程，請使用明確支援憑證式簽署的產品，並遵循所屬機構政策。本頁為產品說明，並非法律意見。',
        ],
      },
    ],
    faq: [
      {
        question: '在 PDF 上畫簽名算是數碼簽署嗎？',
        answer:
          '以密碼學定義而言不算。畫簽名是放置可見標記。數碼簽署使用憑證與密碼學，讓閱讀器可驗證完整性與憑證資訊。',
      },
      {
        question: 'Sign X PDF 會建立憑證式簽署嗎？',
        answer:
          '不會。Sign X PDF 放置可見簽名（手繪、文字或圖像），不會套用憑證式 PDF 簽署或驗證。',
      },
      {
        question: '可見簽名是否具法律效力？',
        answer:
          '法律效力取決於司法管轄區、雙方協議與交易性質。Sign X PDF 不提供法律意見，亦不聲稱可見標記在任何地方都自動有效。',
      },
      {
        question: '電子簽名與數碼簽署——Sign X PDF 用哪個詞？',
        answer:
          '我們傾向使用「可見簽名」或「加入簽名」描述產品。若「數碼簽署」會令人聯想到密碼學，我們會避免把產品標記稱為數碼簽署。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '簽署 PDF 工具' },
      { pathSegment: 'privacy', label: '私隱與本機處理' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
    ],
    ogLocale: 'zh_HK',
    disclaimer:
      '本頁說明 Sign X PDF 的產品用語，並非法律意見。電子或數碼簽署的要求因司法管轄區與用途而異。',
    datePublished: '2026-08-08',
    dateModified: '2026-08-08',
    dateVerified: '2026-08-08',
    verificationNote:
      '驗證範圍：我們於 2026-08-08 檢視公開 repository 原始碼及開放原始碼授權聲明。連結的 GitHub repository 可供任何人查看；這是原始碼參考位置，不是獨立安全認證。瀏覽器測試使用的測試 PDF 留在測試裝置，沒有上傳至 Sign X PDF 應用程式伺服器。這是有範圍的證據，不代表可涵蓋瀏覽器擴充功能、作業系統服務或日後改動。',
  },

  'how-browser-pdf-tools-work': {
    slug: 'how-browser-pdf-tools-work',
    pathSegment: 'guides/how-browser-pdf-tools-work',
    title: '瀏覽器 PDF 工具如何運作 | Sign X PDF',
    description:
      'Sign X PDF 如何在瀏覽器處理 PDF：檔案 API、pdf.js、pdf-lib、QPDF WebAssembly、Worker，以及仍會經網絡載入的資源。',
    h1: '瀏覽器 PDF 工具如何運作',
    answerFirst:
      '瀏覽器 PDF 工具可以在不把文件送到應用伺服器的情況下編輯檔案。網站指令碼與資源載入後，所選 PDF 以瀏覽器檔案 AP…27905 tokens truncated…DF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF. Como en cualquier web, los recursos ordinarios del sitio (HTML, scripts, fuentes) sí se descargan de la red.',
    whatItDoes:
      'Elige una herramienta para firmar, unir, comprimir, reordenar páginas o eliminar páginas. Cada página explica el flujo y carga el editor solo cuando lo usas.',
    howTo: [
      'Elige una herramienta, por ejemplo Firmar PDF o Unir PDF.',
      'Abre el archivo con el selector de la página (o arrástralo si está disponible).',
      'Completa los cambios en el navegador.',
      'Guarda el resultado en tu dispositivo.',
    ],
    localProcessing:
      'Tras cargar los recursos de la aplicación, la lectura, el renderizado y la exportación usan APIs del navegador y bibliotecas del cliente. El PDF seleccionado no se envía a los servidores de Sign X PDF para su procesamiento.',
    limitations: [
      'Se necesita un navegador moderno con JavaScript para editar.',
      'Los PDF muy grandes pueden ir más lentos en dispositivos con poca memoria.',
      'El procesamiento local no protege frente a malware en tu dispositivo ni a extensiones maliciosas del navegador.',
    ],
    faq: [
      {
        question: '¿Se sube mi PDF?',
        answer:
          'No. Sign X PDF está pensado para procesar el PDF seleccionado en tu navegador, no para subirlo a los servidores de Sign X PDF para conversión o almacenamiento.',
      },
      {
        question: '¿Necesito una cuenta?',
        answer: 'No hace falta cuenta para usar las herramientas del navegador.',
      },
      {
        question: '¿Qué ocurre cuando termino?',
        answer:
          'Guardas el PDF actualizado en tu dispositivo. En este flujo, Sign X PDF no guarda una copia del archivo en el servidor.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Firmar PDF' },
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidad' },
    ],
  },
  sign: {
    title: 'Firmar PDF en el navegador — Firma visible | Sign X PDF',
    description:
      'Añade una firma visible a un PDF en el navegador. Dibuja, escribe o coloca una imagen de firma en local, sin subir el PDF a los servidores de Sign X PDF.',
    h1: 'Firmar un PDF en el navegador',
    answerFirst:
      'Sign X PDF te permite añadir una firma visible a un PDF directamente en el navegador. El documento se procesa en tu dispositivo en lugar de subirse a los servidores de Sign X PDF. No necesitas cuenta. Al acabar, guardas el PDF firmado en tu equipo.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF.',
    whatItDoes:
      'Crea una firma dibujando, escribiendo, subiendo una imagen o usando la cámara cuando esté disponible; colócala en la página y exporta un PDF nuevo.',
    howTo: [
      'Abre un PDF o una imagen compatible.',
      'Crea o elige una firma (dibujar, escribir, imagen o cámara).',
      'Coloca y redimensiona la firma en la página.',
      'Guarda el PDF firmado en tu dispositivo.',
    ],
    localProcessing:
      'La creación de la firma y la exportación del PDF se ejecutan con bibliotecas del cliente en el navegador, una vez cargados los recursos de la página.',
    limitations: [
      'Añade una apariencia de firma visible, no una firma digital criptográfica respaldada por certificado.',
      'Por sí sola no genera un registro de auditoría, no verifica identidad ni garantiza validez legal.',
      'Los PDF cifrados pueden requerir la contraseña de apertura antes de editarlos.',
    ],
    faq: [
      {
        question: '¿Es una firma digital con certificado?',
        answer:
          'No. Sign X PDF coloca una firma visible (dibujada, escrita o con imagen). No aplica firma criptográfica con certificado, sello de tiempo ni verificación de firma.',
      },
      {
        question: '¿Hay que subir el PDF para firmarlo?',
        answer:
          'No. La firma está diseñada para ejecutarse en el navegador. Los recursos normales del sitio sí se descargan por la red.',
      },
      {
        question: '¿Puedo usar una foto de mi firma?',
        answer:
          'Sí. Puedes cargar una imagen de la firma o capturarla si el navegador permite el acceso a la cámara.',
      },
      {
        question: '¿Dibujar sobre un PDF es lo mismo que una firma digital?',
        answer:
          'No. Dibujar coloca una marca visible. Una firma digital con certificado usa criptografía y un certificado digital. Sign X PDF solo coloca firmas visibles.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Unir archivos PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir un PDF' },
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas' },
      { pathSegment: 'privacy', label: 'Privacidad y procesamiento local' },
    ],
  },
  merge: {
    title: 'Unir PDF localmente en el navegador — sin subir archivos | Sign X PDF',
    description:
      'Combina varios PDF en un solo archivo desde el navegador. La unión se hace en local: tus archivos no se suben a los servidores de Sign X PDF.',
    h1: 'Unir archivos PDF en el navegador',
    answerFirst:
      'Usa Sign X PDF para unir varios PDF en un único documento desde el navegador. Los archivos se procesan en tu dispositivo, no se suben a los servidores de Sign X PDF. No hace falta cuenta. Guarda el PDF combinado cuando termines.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF.',
    whatItDoes:
      'Carga uno o varios PDF (e imágenes compatibles), ordena las páginas y exporta un único PDF combinado.',
    howTo: [
      'Abre el espacio de trabajo de unir PDF más abajo.',
      'Añade los archivos PDF que quieras combinar.',
      'Reordena las páginas si lo necesitas.',
      'Guarda el PDF unido en tu dispositivo.',
    ],
    localProcessing:
      'La unión usa bibliotecas PDF del cliente en el navegador tras cargar los recursos. Los archivos seleccionados no se envían a los servidores de Sign X PDF para unirlos.',
    limitations: [
      'Los límites de memoria del navegador afectan a archivos muy grandes o a muchos ficheros a la vez.',
      'Algunos PDF cifrados requieren contraseña antes de poder unirlos.',
    ],
    faq: [
      {
        question: '¿Puedo unir más de dos PDF?',
        answer: 'Sí. Añade varios archivos en el espacio de trabajo y exporta un solo PDF combinado.',
      },
      {
        question: '¿Se suben mis archivos para unirlos?',
        answer: 'No. El procesamiento de unión está pensado para permanecer en el navegador.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Eliminar páginas PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidad' },
    ],
  },
  compress: {
    title: 'Comprimir PDF en el navegador | Sign X PDF',
    description:
      'Reduce el tamaño de un PDF en el navegador. La compresión se ejecuta en local, sin subir el archivo a los servidores de Sign X PDF.',
    h1: 'Comprimir un PDF en el navegador',
    answerFirst:
      'Comprime un PDF directamente en el navegador con Sign X PDF. El proceso se queda en tu dispositivo en lugar de subir el archivo a los servidores de Sign X PDF. No necesitas cuenta. Guarda el PDF más ligero al terminar.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF.',
    whatItDoes:
      'Abre un PDF, elige un tamaño objetivo si está disponible, ejecuta la compresión en el navegador y guarda el resultado.',
    howTo: [
      'Abre un PDF en el espacio de trabajo.',
      'Elige los ajustes de compresión.',
      'Ejecuta la compresión y revisa el tamaño obtenido.',
      'Guarda el PDF comprimido.',
    ],
    localProcessing:
      'La compresión usa procesamiento en el dispositivo tras cargar los recursos de la herramienta. El PDF no se sube a los servidores de Sign X PDF para comprimirlo.',
    limitations: [
      'Cuánto se puede reducir el archivo depende del contenido (escaneos frente a texto).',
      'Una compresión agresiva puede bajar la calidad visual de las imágenes del PDF.',
    ],
    faq: [
      {
        question: '¿La compresión alcanza siempre el tamaño deseado?',
        answer:
          'No siempre. Los escaneos con muchas imágenes se comprimen de otra forma que un PDF de texto. La herramienta indica el tamaño conseguido.',
      },
      {
        question: '¿Se sube el PDF para comprimirlo?',
        answer: 'No. La compresión está diseñada para ejecutarse de forma local en el navegador.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas' },
      { pathSegment: 'sign-pdf', label: 'Firmar PDF' },
      { pathSegment: 'privacy', label: 'Privacidad' },
    ],
  },
  reorder: {
    title: 'Reordenar páginas de un PDF en el navegador | Sign X PDF',
    description:
      'Cambia el orden de las páginas de un PDF en el navegador. El reordenamiento es local: los archivos no se suben a los servidores de Sign X PDF.',
    h1: 'Reordenar páginas de un PDF en el navegador',
    answerFirst:
      'Reordena las páginas de un PDF directamente en el navegador con Sign X PDF. El archivo se procesa en local, sin subirlo a los servidores de Sign X PDF. No hace falta cuenta. Guarda el PDF reordenado cuando termines.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF.',
    whatItDoes:
      'Abre un PDF, arrastra o mueve las páginas al orden que necesites y exporta el documento actualizado.',
    howTo: [
      'Carga un PDF en el espacio de trabajo.',
      'Arrastra las páginas al orden deseado.',
      'Revisa la secuencia de páginas.',
      'Guarda el PDF actualizado.',
    ],
    localProcessing:
      'El reordenamiento de páginas se aplica con herramientas PDF del cliente en el navegador, tras cargar los recursos.',
    limitations: [
      'Los documentos muy grandes pueden tardar más en mostrar miniaturas.',
      'Los PDF protegidos con contraseña pueden necesitar desbloquearse primero.',
    ],
    faq: [
      {
        question: '¿Puedo reordenar después de unir archivos?',
        answer: 'Sí. Une o añade páginas primero y reorganiza antes de guardar.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Eliminar páginas' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidad' },
    ],
  },
  deletePages: {
    title: 'Eliminar páginas de un PDF localmente en el navegador — sin subir archivos | Sign X PDF',
    description:
      'Quita páginas no deseadas de un PDF en el navegador. El borrado se hace en local, sin subir el PDF a los servidores de Sign X PDF.',
    h1: 'Eliminar páginas de un PDF en el navegador',
    answerFirst:
      'Elimina páginas de un PDF en el navegador con Sign X PDF. El proceso se queda en tu dispositivo en lugar de subir el archivo a los servidores de Sign X PDF. No necesitas cuenta. Guarda el PDF actualizado al terminar.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF.',
    whatItDoes:
      'Abre un PDF, selecciona las páginas a quitar, confirma el resto y exporta un archivo nuevo sin esas páginas.',
    howTo: [
      'Carga un PDF en el espacio de trabajo.',
      'Selecciona las páginas que quieres eliminar.',
      'Comprueba que las páginas restantes son correctas.',
      'Guarda el PDF actualizado.',
    ],
    localProcessing:
      'La eliminación de páginas se realiza con bibliotecas del cliente en el navegador, una vez cargada la herramienta.',
    limitations: [
      'Las páginas eliminadas no se pueden recuperar del archivo exportado.',
      'Algunos PDF cifrados requieren contraseña antes de poder modificar las páginas.',
    ],
    faq: [
      {
        question: '¿Puedo eliminar varias páginas a la vez?',
        answer:
          'Sí. Selecciona varias páginas en el gestor de páginas y quítalas antes de guardar.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Reordenar páginas' },
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'privacy', label: 'Privacidad' },
    ],
  },
  privacy: {
    title: 'Privacidad — Procesamiento local de PDF | Sign X PDF',
    description:
      'Cómo Sign X PDF procesa PDF en el navegador sin subir el documento para el procesamiento de las herramientas, cómo valorar editores privados y qué no afirmamos.',
    h1: 'Privacidad y procesamiento local de PDF',
    answerFirst:
      'Sign X PDF está pensado para que el PDF que eliges se lea y procese en el navegador al firmar y editar. Ese PDF no se sube a los servidores de Sign X PDF para ese procesamiento. Los recursos normales del sitio sí se descargan por la red. No hace falta cuenta para estas herramientas del navegador.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF para el procesamiento de las herramientas.',
    whatItDoes:
      'Esta página explica el modelo de privacidad de las herramientas del navegador de Sign X PDF, en qué se diferencia el procesamiento local de los sitios que piden subir el archivo, y una lista práctica para evaluar cualquier editor de PDF al que confíes documentos confidenciales.',
    howTo: [
      'El HTML, JavaScript, fuentes y recursos WASM de la aplicación se descargan como en cualquier web.',
      'Eliges un PDF con el selector del navegador o arrastrándolo (el navegador mantiene una referencia local al archivo).',
      'El archivo se lee con APIs del navegador y se procesa en el dispositivo con bibliotecas del cliente y, cuando se usa, WebAssembly.',
      'Guardas el resultado en tu dispositivo; el flujo no está pensado para guardar una copia del PDF en el servidor.',
    ],
    localProcessing:
      'Procesamiento local significa que la edición se ejecuta en la pestaña del navegador con código del cliente (incluido el renderizado al estilo pdf.js, el ensamblado con pdf-lib y QPDF WebAssembly en algunas operaciones). No significa «sin red en absoluto»: los scripts y otros recursos siguen cargándose, y la publicidad o analítica de terceros pueden solicitar recursos web habituales si están presentes. Los bytes del documento en el flujo de la herramienta están pensados para permanecer en la pestaña, no para enviarse por POST a los servidores de aplicación de Sign X PDF.',
        storageDisclosure: {
      heading: "Almacenamiento del navegador que usa Sign X PDF",
      storageColumn: "Almacenamiento",
      purposeColumn: "Finalidad",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Preferencia de idioma y una ventana breve de límite de exportaciones gratuitas. Son datos propios del sitio, no cookies publicitarias.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Firmas guardadas que eliges conservar en este navegador (incluidos blobs de imagen de firma) para reutilizarlas.",
        },
        {
          storage: "Cookies",
          purpose:
            "El procesamiento PDF principal no requiere cookies publicitarias de primera parte. Si hay anuncios o analítica de terceros, pueden establecer sus propias cookies según su política.",
        },
      ],
      clearNote:
        "Borrar los datos de este sitio en el navegador elimina preferencias y firmas guardadas localmente. El flujo de la herramienta no conserva una copia del PDF en el servidor.",
    },
limitations: [
      'El procesamiento local no protege un dispositivo comprometido ni extensiones maliciosas del navegador.',
      'No afirmamos privacidad de grado militar, anonimato total, telemetría cero en todos los entornos ni riesgo cero.',
      'Los recursos ordinarios del sitio siempre se descargan; el uso sin conexión no está garantizado hasta que lo compruebes con una carga en caliente en tu dispositivo.',
      'Si en el futuro alguna función exigiera subir un archivo por red, haría falta un cambio de diseño explícito y un texto actualizado.',
    ],
    faq: [
      {
        question: '¿Sale algún dato de mi dispositivo?',
        answer:
          'Los recursos del sitio se descargan con normalidad. El PDF seleccionado está pensado para permanecer en el navegador durante el procesamiento. No afirmamos que ningún byte salga del dispositivo en cualquier circunstancia (por ejemplo, comportamiento del sistema o de extensiones ajenas a la aplicación).',
      },
      {
        question: '¿Guardáis mi PDF en un servidor?',
        answer:
          'Las herramientas del navegador descritas aquí no están diseñadas para subir tu PDF a los servidores de Sign X PDF para almacenamiento o conversión.',
      },
      {
        question: "¿Qué almacenamiento del navegador usa Sign X PDF?",
        answer:
          "localStorage guarda la preferencia de idioma y una ventana de límite de exportación. IndexedDB guarda firmas que decides conservar. El procesamiento PDF principal no requiere cookies publicitarias de primera parte. Borra los datos del sitio para eliminar esos elementos locales.",
      },
      {
        question: '¿Necesito una cuenta?',
        answer:
          'No hace falta cuenta para usar las herramientas de firma y PDF del navegador descritas en este sitio.',
      },
      {
        question: '¿Cómo valorar si un editor PDF online es seguro?',
        answer:
          'Prefiere un modelo de procesamiento claro (subida frente a local), política de retención, si exige cuenta, divulgación de telemetría, si las firmas son marcas visibles o con certificado, componentes de código abierto que puedas revisar y límites prácticos de archivo. Comprueba las afirmaciones con las herramientas de red del navegador usando un archivo de prueba con un nombre único.',
      },
      {
        question: '¿Es Sign X PDF automáticamente la opción más segura?',
        answer:
          'Ninguna herramienta es automáticamente la más segura para todos los modelos de amenaza. Sign X PDF busca procesamiento local del documento y límites transparentes. Compara criterios —no eslóganes— y vuelve a comprobar el comportamiento de red en tu caso de uso.',
      },
      {
        question: '¿Puedo revisar los componentes de código abierto?',
        answer:
          'Sí. Los avisos de licencia de QPDF, pdf-lib y otras bibliotecas están en la página de licencias de código abierto.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Firmar PDF' },
      { pathSegment: 'merge-pdf', label: 'Unir PDF' },
      { pathSegment: 'compress-pdf', label: 'Comprimir PDF' },
      { pathSegment: 'open-source-licences', label: 'Licencias de código abierto' },
      { pathSegment: '', label: 'Todas las herramientas' },
    ],
  },
});
