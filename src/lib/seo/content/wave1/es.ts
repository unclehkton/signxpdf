import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const esBundle: LocaleBundle = buildWave1Bundle('es', {
  htmlLang: 'es',
  ogLocale: 'es_ES',
  nav: {
    home: 'Inicio',
    sign: 'Firmar PDF',
    tools: 'Herramientas PDF',
    privacy: 'Privacidad',
    guides: 'Guías',
    openTool: 'Usar esta herramienta en el navegador',
    relatedTools: 'Páginas relacionadas',
    howTo: 'Cómo usarla',
    whatItDoes: 'Qué hace esta herramienta',
    localProcessing: 'Cómo funciona el procesamiento local',
    limitations: 'Limitaciones',
    faq: 'Preguntas frecuentes',
    enableJs:
      'Activa JavaScript para editar PDF en el navegador de forma local. No hace falta subir el archivo una vez cargados los recursos de la página.',
    published: 'Publicado',
    updated: 'Última actualización',
    verified: 'Última verificación',
    howWeVerified: 'Cómo lo verificamos',
  },
  home: {
    title: 'Herramientas PDF privadas — Firmar, unir y comprimir | Sign X PDF',
    description:
      'Firma, une, comprime, reordena y elimina páginas de PDF en el navegador. El PDF se procesa en tu dispositivo, sin subirlo a los servidores de Sign X PDF.',
    h1: 'Firma y edita PDF en privado desde el navegador',
    answerFirst:
      'Con Sign X PDF puedes añadir una firma visible y realizar operaciones habituales sobre PDF directamente en el navegador. El archivo se procesa en tu dispositivo y no se sube a los servidores de Sign X PDF. No necesitas cuenta. Al terminar, guarda el PDF actualizado en tu equipo.',
    privacyNote:
      'Tu PDF se procesa de forma local en el navegador y no se sube a los servidores de Sign X PDF. Como en cualquier web, los recursos ordinarios del sitio (HTML, scripts, fuentes) sí se descargan de la red.',
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
      }…36589 tokens truncated…каунт не нужен. Сохраните объединённый PDF, когда закончите.',
    privacyNote:
      'PDF обрабатывается локально в браузере и не загружается на серверы Sign X PDF.',
    whatItDoes:
      'Загрузите один или несколько PDF (и поддерживаемые изображения), упорядочьте страницы и экспортируйте один общий PDF.',
    howTo: [
      'Откройте рабочую область инструмента объединения ниже.',
      'Добавьте PDF-файлы, которые нужно объединить.',
      'При необходимости измените порядок страниц.',
      'Сохраните объединённый PDF на устройство.',
    ],
    localProcessing:
      'Объединение выполняется клиентскими PDF-библиотеками в браузере после загрузки ресурсов. Выбранные файлы не отправляются на серверы Sign X PDF для объединения.',
    limitations: [
      'Для очень больших или многочисленных файлов действуют ограничения памяти браузера.',
      'Некоторые зашифрованные PDF требуют пароль перед объединением.',
    ],
    faq: [
      {
        question: 'Можно ли объединить больше двух PDF?',
        answer: 'Да. Добавьте несколько файлов в рабочей области и экспортируйте один общий PDF.',
      },
      {
        question: 'Загружаются ли файлы для объединения?',
        answer: 'Нет. Обработка объединения рассчитана на работу в браузере.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Изменить порядок страниц PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Удалить страницы PDF' },
      { pathSegment: 'compress-pdf', label: 'Сжать PDF' },
      { pathSegment: 'privacy', label: 'Конфиденциальность' },
    ],
  },
  compress: {
    title: 'Сжать PDF в браузере | Sign X PDF',
    description:
      'Уменьшите размер PDF в браузере. Сжатие выполняется локально без загрузки PDF на серверы Sign X PDF.',
    h1: 'Сжать PDF в браузере',
    answerFirst:
      'Сжимайте PDF прямо в браузере с Sign X PDF. Обработка остаётся на устройстве — файл не загружается на серверы Sign X PDF. Аккаунт не нужен. Сохраните уменьшенный PDF, когда закончите.',
    privacyNote:
      'PDF обрабатывается локально в браузере и не загружается на серверы Sign X PDF.',
    whatItDoes:
      'Откройте PDF, при наличии выберите целевой размер, выполните сжатие в браузере и сохраните результат.',
    howTo: [
      'Откройте PDF в рабочей области.',
      'Выберите параметры сжатия.',
      'Запустите сжатие и проверьте итоговый размер.',
      'Сохраните сжатый PDF.',
    ],
    localProcessing:
      'Сжатие выполняется на устройстве после загрузки ресурсов инструмента. PDF не загружается на серверы Sign X PDF для сжатия.',
    limitations: [
      'Насколько можно уменьшить файл, зависит от содержимого (сканы или текст).',
      'Сильное сжатие может снизить визуальное качество изображений внутри PDF.',
    ],
    faq: [
      {
        question: 'Всегда ли сжатие достигает целевого размера?',
        answer:
          'Не всегда. Сканы с большим количеством изображений сжимаются иначе, чем текстовые PDF. Инструмент показывает достигнутый размер.',
      },
      {
        question: 'Загружается ли PDF для сжатия?',
        answer: 'Нет. Сжатие рассчитано на локальную работу в браузере.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Объединить PDF' },
      { pathSegment: 'reorder-pdf', label: 'Изменить порядок страниц' },
      { pathSegment: 'privacy', label: 'Конфиденциальность' },
    ],
  },
  reorder: {
    title: 'Изменить порядок страниц PDF в браузере | Sign X PDF',
    description:
      'Переставьте страницы PDF в браузере. Изменение порядка выполняется локально — файлы не загружаются на серверы Sign X PDF.',
    h1: 'Изменить порядок страниц PDF в браузере',
    answerFirst:
      'Меняйте порядок страниц PDF прямо в браузере с Sign X PDF. Файл обрабатывается локально и не загружается на серверы Sign X PDF. Аккаунт не нужен. Сохраните PDF с новым порядком, когда закончите.',
    privacyNote:
      'PDF обрабатывается локально в браузере и не загружается на серверы Sign X PDF.',
    whatItDoes:
      'Откройте PDF, перетащите или переместите страницы в нужный порядок и экспортируйте обновлённый документ.',
    howTo: [
      'Загрузите PDF в рабочую область.',
      'Перетащите страницы в нужный порядок.',
      'Проверьте последовательность страниц.',
      'Сохраните обновлённый PDF.',
    ],
    localProcessing:
      'Изменение порядка страниц применяется клиентскими PDF-инструментами в браузере после загрузки ресурсов.',
    limitations: [
      'Очень большие документы могут медленнее отображаться в виде миниатюр.',
      'PDF с паролем может потребовать разблокировки заранее.',
    ],
    faq: [
      {
        question: 'Можно ли менять порядок после объединения?',
        answer: 'Да. Сначала объедините или добавьте страницы, затем переставьте их перед сохранением.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Объединить PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Удалить страницы' },
      { pathSegment: 'privacy', label: 'Конфиденциальность' },
    ],
  },
  deletePages: {
    title: 'Удалить страницы PDF локально в браузере — без загрузки | Sign X PDF',
    description:
      'Удалите ненужные страницы PDF в браузере. Удаление выполняется локально без загрузки PDF на серверы Sign X PDF.',
    h1: 'Удалить страницы PDF в браузере',
    answerFirst:
      'Удаляйте страницы из PDF в браузере с Sign X PDF. Обработка остаётся на устройстве — файл не загружается на серверы Sign X PDF. Аккаунт не нужен. Сохраните обновлённый PDF, когда закончите.',
    privacyNote:
      'PDF обрабатывается локально в браузере и не загружается на серверы Sign X PDF.',
    whatItDoes:
      'Откройте PDF, выберите страницы для удаления, проверьте оставшийся набор и экспортируйте новый файл без этих страниц.',
    howTo: [
      'Загрузите PDF в рабочую область.',
      'Выберите страницы для удаления.',
      'Убедитесь, что оставшиеся страницы верны.',
      'Сохраните обновлённый PDF.',
    ],
    localProcessing:
      'Удаление страниц выполняется клиентскими библиотеками в браузере после загрузки инструмента.',
    limitations: [
      'Удалённые страницы нельзя восстановить из экспортированного файла.',
      'Некоторые зашифрованные PDF требуют пароль перед изменением страниц.',
    ],
    faq: [
      {
        question: 'Можно ли удалить несколько страниц сразу?',
        answer: 'Да. Выберите несколько страниц в менеджере страниц и удалите их перед сохранением.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Изменить порядок страниц' },
      { pathSegment: 'merge-pdf', label: 'Объединить PDF' },
      { pathSegment: 'privacy', label: 'Конфиденциальность' },
    ],
  },
  privacy: {
    title: 'Конфиденциальность — локальная обработка PDF | Sign X PDF',
    description:
      'Как Sign X PDF обрабатывает PDF в браузере без загрузки документа для обработки инструментами, как оценивать приватные PDF-инструменты и чего мы не утверждаем.',
    h1: 'Конфиденциальность и локальная обработка PDF',
    answerFirst:
      'Sign X PDF создан так, чтобы выбранный PDF читался и обрабатывался в браузере для подписи и обычных правок. PDF не загружается на серверы Sign X PDF для этой обработки. Обычные ресурсы сайта по-прежнему скачиваются по сети. Для этих браузерных инструментов аккаунт не нужен.',
    privacyNote:
      'PDF обрабатывается локально в браузере и не загружается на серверы Sign X PDF для обработки инструментами.',
    whatItDoes:
      'На этой странице объясняется модель конфиденциальности браузерных инструментов Sign X PDF, чем локальная обработка отличается от онлайн-сервисов с загрузкой файлов, и практический чеклист для оценки любого PDF-редактора, которому вы доверяете конфиденциальные файлы.',
    howTo: [
      'HTML, JavaScript, шрифты и WASM-ресурсы приложения загружаются как на любом сайте.',
      'Вы выбираете PDF через выбор файла в браузере или перетаскивание (браузер сохраняет локальную ссылку File).',
      'Файл читается API браузера и обрабатывается на устройстве клиентскими библиотеками и, где используется, WebAssembly.',
      'Вы сохраняете результат на устройстве; сценарий не рассчитан на хранение серверной копии PDF.',
    ],
    localProcessing:
      'Локальная обработка означает, что конвейер правок выполняется во вкладке браузера клиентским кодом (отрисовка в стиле pdf.js, сборка pdf-lib и QPDF WebAssembly для отдельных операций). Это не значит «сети нет совсем»: скрипты и другие ресурсы всё равно загружаются, а сторонние реклама или аналитика при наличии на странице могут запрашивать обычные веб-ресурсы. Байты документа для инструментального сценария должны оставаться во вкладке, а не отправляться POST на серверы приложений Sign X PDF.',
        storageDisclosure: {
      heading: "Хранилище браузера, которое использует Sign X PDF",
      storageColumn: "Хранилище",
      purposeColumn: "Назначение",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Языковые настройки и короткое окно ограничения бесплатных экспортов. Это first-party данные сайта, а не рекламные cookies.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Сохранённые подписи, которые вы оставляете в этом браузере (включая blob изображений) для повторного использования.",
        },
        {
          storage: "Cookies",
          purpose:
            "Основная обработка PDF не требует first-party рекламных cookies. Сторонние объявления или аналитика, если есть, могут устанавливать свои cookies по своим правилам.",
        },
      ],
      clearNote:
        "Очистка данных этого сайта в браузере удаляет локальные настройки и сохранённые подписи. Рабочий процесс не хранит копию PDF на сервере.",
    },
limitations: [
      'Локальная обработка не защищает скомпрометированное устройство или вредоносные расширения браузера.',
      'Мы не заявляем о «военной» конфиденциальности, полной анонимности, нулевой телеметрии в любой среде браузера или нулевом риске.',
      'Обычные ресурсы сайта всегда загружаются; офлайн-работа не гарантируется, пока вы не проверите «тёплую» загрузку на своём устройстве.',
      'Если в будущем функция потребует сетевой загрузки, это будет явное изменение дизайна и обновлённые формулировки.',
    ],
    faq: [
      {
        question: 'Уходят ли какие-то данные с устройства?',
        answer:
          'Ресурсы сайта загружаются обычным образом. Выбранный PDF должен оставаться в браузере для обработки. Мы не утверждаем, что ни один байт никогда не покидает устройство (например, из‑за ОС или расширений вне приложения).',
      },
      {
        question: 'Храните ли вы мой PDF на сервере?',
        answer:
          'Описанные здесь браузерные инструменты не рассчитаны на загрузку PDF на серверы Sign X PDF для хранения или конвертации.',
      },
      {
        question: "Какое хранилище браузера использует Sign X PDF?",
        answer:
          "localStorage хранит язык и окно лимита экспорта. IndexedDB хранит сохранённые подписи. Основная обработка PDF не требует first-party рекламных cookies. Очистите данные сайта, чтобы удалить эти локальные элементы.",
      },
      {
        question: 'Нужен ли аккаунт?',
        answer: 'Для описанных на сайте браузерных инструментов подписи и PDF аккаунт не требуется.',
      },
      {
        question: 'Как понять, безопасен ли онлайн-редактор PDF?',
        answer:
          'Смотрите модель обработки (загрузка или локально), политику хранения, требование аккаунта, раскрытие телеметрии, вид подписи (видимая метка или сертификат), открытые компоненты для проверки и практические лимиты файлов. Проверяйте заявления инструментами сети браузера на тестовом файле с уникальным именем.',
      },
      {
        question: 'Является ли Sign X PDF автоматически самым безопасным вариантом?',
        answer:
          'Ни один инструмент не безопасен автоматически для любой модели угроз. Sign X PDF стремится к локальной обработке документов и прозрачным ограничениям. Сравнивайте критерии, а не лозунги, и перепроверяйте сетевое поведение для своего сценария.',
      },
      {
        question: 'Можно ли посмотреть компоненты с открытым исходным кодом?',
        answer:
          'Да. Уведомления о лицензиях QPDF, pdf-lib и других библиотек приведены на странице лицензий открытого ПО.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Подписать PDF' },
      { pathSegment: 'merge-pdf', label: 'Объединить PDF' },
      { pathSegment: 'open-source-licences', label: 'Лицензии открытого ПО' },
      { pathSegment: '', label: 'Все инструменты' },
    ],
  },
});
