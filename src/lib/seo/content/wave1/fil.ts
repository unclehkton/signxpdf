import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const filBundle: LocaleBundle = buildWave1Bundle('fil', {
  htmlLang: 'fil',
  ogLocale: 'fil_PH',
  nav: {
    home: 'Home',
    sign: 'Pirmahan ang PDF',
    tools: 'Mga tool sa PDF',
    privacy: 'Privacy',
    guides: 'Mga gabay',
    openTool: 'Gamitin ang tool na ito sa browser',
    relatedTools: 'Mga kaugnay na pahina',
    howTo: 'Paano gamitin',
    whatItDoes: 'Ano ang ginagawa ng tool na ito',
    localProcessing: 'Paano gumagana ang lokal na pagproseso',
    limitations: 'Mga limitasyon',
    faq: 'Mga madalas itanong',
    enableJs:
      'I-enable ang JavaScript para ma-edit ang PDF nang lokal sa browser. Kapag na-load na ang mga file ng page, hindi na kailangan mag-upload.',
    published: 'Nailathala',
    updated: 'Huling na-update',
    verified: 'Huling na-verify',
    howWeVerified: 'Paano namin ito na-verify',
  },
  home: {
    title: 'Pribadong PDF Tools — Pirma, Pagsamahin at I-compress | Sign X PDF',
    description:
      'Pirmahan, pagsamahin, i-compress, i-reorder, at magtanggal ng mga pahina ng PDF sa browser. Pinoproseso ang PDF sa device mo—hindi ina-upload sa mga server ng Sign X PDF.',
    h1: 'Pirmahan at i-edit ang PDF nang pribado sa browser',
    answerFirst:
      'Sa Sign X PDF, makakapagdagdag ka ng nakikitang pirma at makakagawa ng karaniwang operasyon sa PDF direkta sa browser. Pinoproseso ang PDF sa device mo, hindi ina-upload sa mga server ng Sign X PDF. Walang kailangang account. Kapag tapos ka na, i-save ang updated na file sa device mo.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF. Tulad ng ordinaryong website, naglo-load pa rin ang HTML, scripts, at fonts mula sa network.',
    whatItDoes:
      'Pumili ng tool para sa pagpirma, pagsasama, pag-compress, muling pag-ayos ng pahina, o pagtanggal ng pahina. Ipinaliliwanag ng bawat tool page ang hakbang-hakbang at niloload ang editor kapag ginamit mo ito.',
    howTo: [
      'Pumili ng tool tulad ng Pirmahan ang PDF o Pagsamahin ang PDF.',
      'Buksan ang file gamit ang file picker sa page (o i-drag at i-drop kung available).',
      'Tapusin ang mga pag-edit sa browser.',
      'I-save ang resulta sa device mo.',
    ],
    localProcessing:
      'Pagkatapos mag-load ang mga resource ng site, ang pagbasa ng file, pagpapakita, at pag-export ay gumagamit ng kakayahan ng browser at mga library sa browser. Hindi ipinapadala ang napiling PDF sa application servers ng Sign X PDF para sa pagproseso.',
    limitations: [
      'Kailangan ng modernong browser na may JavaScript para makapag-edit.',
      'Maaaring mas mabagal ang napakalaking PDF sa device na may kaunting memory.',
      'Hindi sapat ang lokal na pagproseso laban sa malware sa device o mapaminsalang browser extension.',
    ],
    faq: [
      {
        question: 'Na-a-upload ba ang PDF ko?',
        answer:
          'Hindi. Dinisenyo ang Sign X PDF para maproseso nang lokal sa browser ang napiling PDF—hindi ina-upload sa mga server ng Sign X PDF para sa conversion o storage.',
      },
      {
        question: 'Kailangan ko ba ng account?',
        answer: 'Hindi kailangan ng account para gamitin ang browser tools.',
      },
      {
        question: 'Ano ang nangyayari kapag tapos na ako?',
        answer:
          'Ise-save mo ang updated na PDF sa device mo. Sa workflow na ito, hindi nagtatago ang Sign X PDF ng server-side copy ng file mo.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Pirmahan ang PDF' },
      { pathSegment: 'merge-pdf', label: 'Pagsamahin ang PDF' },
      { pathSegment: 'compress-pdf', label: 'I-compress ang PDF' },
      { pathSegment: 'privacy', label: 'Privacy' },
    ],
  },
  sign: {
    title: 'Pirmahan ang PDF sa Browser — Visible Signature | Sign X PDF',
    description:
      'Magdagdag ng nakikitang pirma sa PDF sa browser. Gumuhit, mag-type, o maglagay ng image signature nang lokal—nang hindi ina-upload ang PDF sa mga server ng Sign X PDF.',
    h1: 'Pirmahan ang PDF sa browser',
    answerFirst:
      'Sa Sign X PDF, makakapagdagdag ka ng nakikitang pirma sa PDF direkta sa browser. Pinoproseso ang PDF nang lokal sa device mo, hindi ina-upload sa mga server ng Sign X PDF. Walang kailangang account. Kapag tapos ka na, i-save ang signed PDF sa device mo.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF.',
    whatItDoes:
      'Gumawa ng pirma sa pamamagitan ng pagguhit, pag-type, pag-upload ng larawan, o camera kung available, ilagay sa pahina, at mag-export ng bagong PDF.',
    howTo: [
      'Magbukas ng PDF o suportadong larawan.',
      'Gumawa o pumili ng pirma (guhit, type, upload, o camera).',
      'Ilagay at i-resize ang pirma sa pahina.',
      'I-save ang pinirmahang PDF sa device mo.',
    ],
    localProcessing:
      'Tumatakbo ang paggawa ng pirma at PDF export gamit ang mga library sa browser pagkatapos mag-load ang mga file ng page.',
    limitations: [
      'Nagdadagdag ito ng nakikitang hitsura ng pirma, hindi certificate-backed na cryptographic digital signature.',
      'Hindi ito gumagawa ng audit trail, pag-verify ng pagkakakilanlan, o legal-validity guarantee sa sarili nito.',
      'Maaaring kailanganin ang open password ng naka-encrypt na PDF bago i-edit.',
    ],
    faq: [
      {
        question: 'Certificate-backed digital signature ba ito?',
        answer:
          'Hindi. Naglalagay ang Sign X PDF ng nakikitang pirma (guhit, type, o image). Hindi ito nag-a-apply ng certificate-based cryptographic signing, timestamping, o signature verification.',
      },
      {
        question: 'Na-a-upload ba ang PDF para mapirmahan?',
        answer:
          'Hindi. Dinisenyo ang pagpirma para tumakbo nang lokal sa browser. Nagdo-download pa rin ang mga ordinaryong resource ng site sa network.',
      },
      {
        question: 'Puwede ba akong gumamit ng larawan ng pirma ko?',
        answer:
          'Oo. Maaari kang mag-upload ng signature image o kumuha nito kung pinapayagan ng browser ang camera.',
      },
      {
        question: 'Pareho ba ang pagguhit sa PDF sa digital signature?',
        answer:
          'Hindi. Ang pagguhit ay naglalagay ng visible na marka. Gumagamit ang certificate-backed digital signature ng cryptography at digital certificate. Visible signatures lang ang inilalagay ng Sign X PDF.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Pagsamahin ang mga PDF file' },
      { pathSegment: 'compress-pdf', label: 'I-compress ang PDF' },
      { pathSegment: 'privacy', label: 'Privacy at lokal na pagproseso' },
    ],
  },
  merge: {
    title: 'Pagsamahin ang mga PDF File Lokal sa Browser — Walang Pag-upload | Sign X PDF',
    description:
      'Pagsamahin ang ilang PDF sa isang file sa browser. Lokal ang pagsasama—hindi ina-upload ang mga file sa mga server ng Sign X PDF.',
    h1: 'Pagsamahin ang mga PDF file sa browser',
    answerFirst:
      'Gamitin ang Sign X PDF para pagsamahin ang ilang PDF sa isang dokumento sa browser. Pinoproseso ang mga file nang lokal sa device, hindi ina-upload sa mga server ng Sign X PDF. Walang kailangang account. I-save ang pinagsamang PDF kapag tapos ka na.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF.',
    whatItDoes:
      'Mag-load ng isa o higit pang PDF (at suportadong larawan), ayusin ang mga pahina, at mag-export ng isang pinagsamang PDF.',
    howTo: [
      'Buksan ang merge tool workspace sa ibaba.',
      'Idagdag ang mga PDF file na gusto mong pagsamahin.',
      'I-ayos muli ang mga pahina kung kailangan.',
      'I-save ang pinagsamang PDF sa device mo.',
    ],
    localProcessing:
      'Gumagamit ang pagsasama ng PDF libraries sa browser pagkatapos mag-load ang mga resource. Hindi ipinapadala ang mga napiling file sa mga server ng Sign X PDF para sa pagsasama ng PDF.',
    limitations: [
      'May limitasyon ang memory ng browser para sa napakalaki o napakaraming file.',
      'Ang ilang naka-encrypt na PDF ay nangangailangan ng password bago pagsamahin.',
    ],
    faq: [
      {
        question: 'Puwede bang magsama ng higit sa dalawang PDF?',
        answer: 'Oo. Magdagdag ng maraming file sa tools workspace, pagkatapos mag-export ng isang pinagsamang PDF.',
      },
      {
        question: 'Na-a-upload ba ang mga file para pagsamahin?',
        answer: 'Hindi. Dinisenyo ang pagsasama ng PDF para manatili sa browser.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'I-reorder ang mga pahina ng PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Tanggalin ang mga pahina ng PDF' },
      { pathSegment: 'compress-pdf', label: 'I-compress ang PDF' },
      { pathSegment: 'privacy', label: 'Privacy' },
    ],
  },
  compress: {
    title: 'I-compress ang PDF sa Browser | Sign X PDF',
    description:
      'Bawasan ang file size ng PDF sa browser. Lokal ang compression—hindi ina-upload ang PDF sa mga server ng Sign X PDF.',
    h1: 'I-compress ang PDF sa browser',
    answerFirst:
      'I-compress ang PDF direkta sa browser gamit ang Sign X PDF. Mananatili ang pagproseso sa device mo; hindi ina-upload ang file sa mga server ng Sign X PDF. Walang kailangang account. I-save ang mas maliit na PDF kapag tapos ka na.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF.',
    whatItDoes:
      'Mag-load ng PDF, pumili ng target size kung available, patakbuhin ang compression sa browser, at i-save ang resulta.',
    howTo: [
      'Buksan ang PDF sa workspace.',
      'Pumili ng compression settings.',
      'Patakbuhin ang compress at tingnan ang resultang size.',
      'I-save ang naka-compress na PDF.',
    ],
    localProcessing:
      'Isinasagawa ang compression sa device pagkatapos mag-load ang mga resource ng tool. Hindi ina-upload ang PDF sa mga server ng Sign X PDF para i-compress.',
    limitations: [
      'Depende sa nilalaman kung gaano kaliit magiging file (scanned image vs text).',
      'Maaaring bumaba ang visual quality ng mga larawan sa loob ng PDF kapag mabigat ang compression.',
    ],
    faq: [
      {
        question: 'Laging naaabot ba ng compression ang target size ko?',
        answer:
          'Hindi palagi. Iba ang compress ng image-heavy scans kumpara sa text PDFs. Ipinapakita ng tool ang nakuha nitong size.',
      },
      {
        question: 'Na-a-upload ba ang PDF para i-compress?',
        answer: 'Hindi. Dinisenyo ang compression para tumakbo nang lokal sa browser.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Pagsamahin ang PDF' },
      { pathSegment: 'reorder-pdf', label: 'I-reorder ang mga pahina' },
      { pathSegment: 'privacy', label: 'Privacy' },
    ],
  },
  reorder: {
    title: 'I-reorder ang mga Pahina ng PDF sa Browser | Sign X PDF',
    description:
      'Ayusin muli ang pagkakasunod-sunod ng mga pahina ng PDF sa browser. Lokal ang pag-reorder—hindi ina-upload ang mga file sa mga server ng Sign X PDF.',
    h1: 'I-reorder ang mga pahina ng PDF sa browser',
    answerFirst:
      'I-reorder ang mga pahina ng PDF direkta sa browser gamit ang Sign X PDF. Pinoproseso ang file nang lokal, hindi ina-upload sa mga server ng Sign X PDF. Walang kailangang account. I-save ang naayos muli na PDF kapag tapos ka na.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF.',
    whatItDoes:
      'Buksan ang PDF, i-drag o ilipat ang mga pahina sa kailangan mong pagkakasunod-sunod, pagkatapos i-export ang na-update na dokumento.',
    howTo: [
      'I-load ang PDF sa workspace.',
      'I-drag ang mga pahina sa nais na order.',
      'Suriin ang pagkakasunod-sunod ng pahina.',
      'I-save ang na-update na PDF.',
    ],
    localProcessing:
      'Ina-apply ang muling pag-ayos ng pahina gamit ang PDF tools sa browser pagkatapos mag-load ang mga resource.',
    limitations: [
      'Maaaring mas mabagal magpakita bilang thumbnail ang napakalaking dokumento.',
      'Maaaring kailanganin munang i-unlock ang PDF na protektado ng password.',
    ],
    faq: [
      {
        question: 'Puwede bang mag-reorder pagkatapos mag-merge?',
        answer: 'Oo. Mag-merge o magdagdag muna ng mga pahina, pagkatapos ayusin muli bago mag-save.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Pagsamahin ang PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Tanggalin ang mga pahina' },
      { pathSegment: 'privacy', label: 'Privacy' },
    ],
  },
  deletePages: {
    title: 'Tanggalin ang mga Pahina ng PDF Lokal sa Browser — Walang Pag-upload | Sign X PDF',
    description:
      'Alisin ang hindi kailangang pahina ng PDF sa browser. Lokal ang pagtanggal—hindi ina-upload ang PDF sa mga server ng Sign X PDF.',
    h1: 'Tanggalin ang mga pahina ng PDF sa browser',
    answerFirst:
      'Magtanggal ng mga pahina mula sa PDF sa browser gamit ang Sign X PDF. Mananatili ang pagproseso sa device mo; hindi ina-upload ang file sa mga server ng Sign X PDF. Walang kailangang account. I-save ang na-update na PDF kapag tapos ka na.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF.',
    whatItDoes:
      'Buksan ang PDF, piliin ang mga pahinang tatanggalin, kumpirmahin ang natitira, at mag-export ng bagong file na wala ang mga pahinang iyon.',
    howTo: [
      'I-load ang PDF sa workspace.',
      'Piliin ang mga pahinang tatanggalin.',
      'Kumpirmahin na tama ang natitirang pahina.',
      'I-save ang na-update na PDF.',
    ],
    localProcessing:
      'Ginagawa ang pagtanggal ng pahina gamit ang mga library sa browser pagkatapos mag-load ang tool.',
    limitations: [
      'Hindi na maibabalik ang tinanggal na pahina mula sa na-export na file.',
      'Ang ilang naka-encrypt na PDF ay nangangailangan ng password bago baguhin ang mga pahina.',
    ],
    faq: [
      {
        question: 'Puwede bang magtanggal ng maraming pahina nang sabay?',
        answer: 'Oo. Pumili ng maraming pahina sa page manager, pagkatapos alisin bago mag-save.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'I-reorder ang mga pahina' },
      { pathSegment: 'merge-pdf', label: 'Pagsamahin ang PDF' },
      { pathSegment: 'privacy', label: 'Privacy' },
    ],
  },
  privacy: {
    title: 'Privacy — Lokal na PDF Processing | Sign X PDF',
    description:
      'Paano pinoproseso ng Sign X PDF ang PDF sa browser nang hindi ina-upload ang dokumento para sa tool work, paano suriin ang pribadong PDF tools, at kung ano ang hindi namin inaangkin.',
    h1: 'Privacy at lokal na pagproseso ng PDF',
    answerFirst:
      'Binuo ang Sign X PDF para basahin at iproseso sa browser ang napili mong PDF para sa pagpirma at karaniwang pag-edit. Hindi ina-upload ang PDF sa mga server ng Sign X PDF para sa gawaing iyon. Nagdo-download pa rin ang mga ordinaryong resource ng site sa network. Walang kailangang account para sa browser tools na ito.',
    privacyNote:
      'Pinoproseso ang PDF mo nang lokal sa browser at hindi ina-upload sa mga server ng Sign X PDF para sa tool work.',
    whatItDoes:
      'Ipinapaliwanag ng page na ito ang privacy model ng browser tools ng Sign X PDF, paano naiiba ang lokal na pagproseso sa upload-based online PDF sites, at practical checklist para suriin ang anumang PDF editor na pinagkakatiwalaan mo sa confidential files.',
    howTo: [
      'Nagdo-download ang application HTML, JavaScript, fonts, at WebAssembly resources tulad ng ordinaryong website.',
      'Pinipili mo ang PDF gamit ang browser file picker o drag-and-drop (pinapanatili ng browser ang lokal na file reference).',
      'Binabasa ang file gamit ang kakayahan ng browser at pinoproseso sa device gamit ang client libraries at, kung ginagamit, WebAssembly.',
      'Ise-save mo ang output file sa device; hindi dinisenyo ang workflow para magtago ng kopya ng PDF mo sa server.',
    ],
    localProcessing:
      'Ang lokal na pagproseso ay nangangahulugang tumatakbo ang pag-edit sa browser tab gamit ang code sa browser (kabilang ang pdf.js-style display, pdf-lib assembly, at QPDF WebAssembly para sa ilang gawain). Hindi ito nangangahulugang “walang network”: naglo-load pa rin ang scripts at iba pang resource, at maaaring humiling pa rin ang third-party ads o analytics ng ordinaryong web resources kung nasa page. Ang napiling PDF file para sa tool work ay inilalaan na manatili sa tab—hindi ipinapadala sa application servers ng Sign X PDF.',
        storageDisclosure: {
      heading: "Browser storage na ginagamit ng Sign X PDF",
      storageColumn: "Storage",
      purposeColumn: "Layunin",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Language preference at maikling export-rate window para sa free exports. First-party site data ito, hindi advertising cookies.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Mga naka-save na pirma na pinipili mong panatilihin sa browser na ito (kasama ang signature image data) para magamit muli.",
        },
        {
          storage: "Cookies",
          purpose:
            "Hindi kailangan ng core PDF processing ang first-party advertising cookies. Maaaring mag-set ang third-party ads/analytics ng sarili nilang cookies ayon sa policy nila.",
        },
      ],
      clearNote:
        "Kapag dinelete ang data ng site na ito sa browser, mawawala ang local preferences at naka-save na pirma. Hindi nagtatago ang tool workflow ng kopya ng PDF sa server.",
    },
limitations: [
      'Hindi protektahan ng lokal na pagproseso ang compromised device o mapaminsalang browser extension.',
      'Hindi namin inaangkin ang military-grade privacy, kumpletong anonymity, zero telemetry sa lahat ng browser environment, o zero risk.',
      'Palaging nagdo-download ang mga ordinaryong resource ng site; hindi garantisado ang offline use hangga’t hindi mo pa na-verify na nai-load na ang site at tool sa device mo.',
      'Kung may future feature na mangangailangan ng network upload, kailangan iyon ng explicit design change at updated na wording.',
    ],
    faq: [
      {
        question: 'May data bang umaalis sa device ko?',
        answer:
          'Normal na nagdo-download ang mga resource ng site. Inilalaan na manatili sa browser ang napiling PDF para sa pagproseso. Hindi namin inaangkin na walang file data kailanman umaalis sa device sa anumang sitwasyon (halimbawa, gawi ng OS o extension sa labas ng app).',
      },
      {
        question: 'Sine-save ba ninyo ang PDF ko sa server?',
        answer:
          'Ang browser tools na inilarawan dito ay hindi dinisenyo para mag-upload ng PDF mo sa mga server ng Sign X PDF para sa storage o conversion.',
      },
      {
        question: "Anong browser storage ang ginagamit ng Sign X PDF?",
        answer:
          "Nagtatago ang localStorage ng language preference at export-rate window. Nagtatago ang IndexedDB ng mga pirma na pinanatili mo. Hindi kailangan ng core PDF processing ang first-party advertising cookies. I-clear ang site data para alisin ang mga local item na iyon.",
      },
      {
        question: 'Kailangan ko ba…36754 tokens truncated…n tệp trên trang (hoặc kéo thả nếu có).',
      'Hoàn tất chỉnh sửa trong trình duyệt.',
      'Lưu kết quả vào thiết bị của bạn.',
    ],
    localProcessing:
      'Sau khi tài nguyên ứng dụng tải xong, việc đọc tệp, hiển thị và xuất dùng API trình duyệt cùng thư viện phía máy khách. PDF đã chọn không được gửi tới máy chủ ứng dụng Sign X PDF để xử lý.',
    limitations: [
      'Cần trình duyệt hiện đại có JavaScript để chỉnh sửa.',
      'PDF rất lớn có thể chậm hơn trên thiết bị ít bộ nhớ.',
      'Xử lý cục bộ không bảo vệ khỏi phần mềm độc hại trên thiết bị hoặc tiện ích trình duyệt độc hại.',
    ],
    faq: [
      {
        question: 'PDF của tôi có bị tải lên không?',
        answer:
          'Không. Sign X PDF được thiết kế để xử lý PDF đã chọn cục bộ trong trình duyệt, không tải lên máy chủ Sign X PDF để chuyển đổi hoặc lưu trữ.',
      },
      {
        question: 'Tôi có cần tài khoản không?',
        answer: 'Không cần tài khoản để dùng các công cụ trên trình duyệt.',
      },
      {
        question: 'Sau khi xong thì sao?',
        answer:
          'Bạn lưu PDF đã cập nhật vào thiết bị. Quy trình này không giữ bản sao tệp phía máy chủ.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Ký PDF' },
      { pathSegment: 'merge-pdf', label: 'Gộp PDF' },
      { pathSegment: 'compress-pdf', label: 'Nén PDF' },
      { pathSegment: 'privacy', label: 'Quyền riêng tư' },
    ],
  },
  sign: {
    title: 'Ký PDF trong trình duyệt — Chữ ký hiển thị | Sign X PDF',
    description:
      'Thêm chữ ký hiển thị vào PDF trong trình duyệt. Vẽ, gõ hoặc đặt ảnh chữ ký cục bộ — không tải PDF lên máy chủ Sign X PDF.',
    h1: 'Ký PDF trong trình duyệt',
    answerFirst:
      'Sign X PDF cho phép bạn thêm chữ ký hiển thị vào PDF ngay trong trình duyệt. PDF được xử lý cục bộ trên thiết bị, không tải lên máy chủ Sign X PDF. Không cần tài khoản. Khi xong, lưu PDF đã ký vào thiết bị.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF.',
    whatItDoes:
      'Tạo chữ ký bằng cách vẽ, gõ chữ, tải ảnh lên hoặc dùng camera khi có, đặt lên trang rồi xuất PDF mới.',
    howTo: [
      'Mở PDF hoặc ảnh được hỗ trợ.',
      'Tạo hoặc chọn chữ ký (vẽ, gõ, tải lên hoặc camera).',
      'Đặt và chỉnh kích thước chữ ký trên trang.',
      'Lưu PDF đã ký vào thiết bị.',
    ],
    localProcessing:
      'Tạo chữ ký và xuất PDF chạy bằng thư viện phía máy khách trong trình duyệt sau khi tài nguyên trang tải xong.',
    limitations: [
      'Đây là chữ ký hiển thị trên trang, không phải chữ ký số mật mã dựa trên chứng chỉ.',
      'Tự nó không tạo nhật ký kiểm toán, xác minh danh tính hay bảo đảm hiệu lực pháp lý.',
      'PDF được mã hóa có thể cần mật khẩu mở trước khi chỉnh sửa.',
    ],
    faq: [
      {
        question: 'Đây có phải chữ ký số dựa trên chứng chỉ không?',
        answer:
          'Không. Sign X PDF đặt chữ ký hiển thị (vẽ, gõ hoặc ảnh). Không áp dụng ký mật mã theo chứng chỉ, đóng dấu thời gian hay xác minh chữ ký.',
      },
      {
        question: 'PDF có bị tải lên để ký không?',
        answer:
          'Không. Việc ký được thiết kế chạy cục bộ trong trình duyệt. Tài nguyên trang thông thường vẫn tải qua mạng.',
      },
      {
        question: 'Tôi có thể dùng ảnh chữ ký không?',
        answer:
          'Có. Bạn có thể tải ảnh chữ ký lên hoặc chụp khi trình duyệt cho phép truy cập camera.',
      },
      {
        question: 'Vẽ trên PDF có giống chữ ký số không?',
        answer:
          'Không. Vẽ chỉ đặt dấu hiển thị. Chữ ký số dựa trên chứng chỉ dùng mật mã và chứng chỉ số. Sign X PDF chỉ đặt chữ ký hiển thị.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Gộp tệp PDF' },
      { pathSegment: 'compress-pdf', label: 'Nén PDF' },
      { pathSegment: 'privacy', label: 'Quyền riêng tư và xử lý cục bộ' },
    ],
  },
  merge: {
    title: 'Gộp tệp PDF cục bộ trong trình duyệt — không tải lên | Sign X PDF',
    description:
      'Gộp nhiều PDF thành một tệp trong trình duyệt. Việc gộp diễn ra cục bộ — tệp không được tải lên máy chủ Sign X PDF.',
    h1: 'Gộp tệp PDF trong trình duyệt',
    answerFirst:
      'Dùng Sign X PDF để gộp nhiều PDF thành một tài liệu trong trình duyệt. Tệp được xử lý cục bộ trên thiết bị, không tải lên máy chủ Sign X PDF. Không cần tài khoản. Lưu PDF đã gộp khi xong.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF.',
    whatItDoes:
      'Tải một hoặc nhiều PDF (và ảnh được hỗ trợ), sắp xếp trang, rồi xuất một PDF gộp.',
    howTo: [
      'Mở không gian làm việc công cụ gộp bên dưới.',
      'Thêm các tệp PDF cần gộp.',
      'Sắp xếp lại trang nếu cần.',
      'Lưu PDF đã gộp về thiết bị.',
    ],
    localProcessing:
      'Việc gộp dùng thư viện PDF phía máy khách trong trình duyệt sau khi tài nguyên tải xong. Tệp đã chọn không được gửi tới máy chủ Sign X PDF để gộp.',
    limitations: [
      'Giới hạn bộ nhớ trình duyệt áp dụng với tệp rất lớn hoặc rất nhiều.',
      'Một số PDF mã hóa cần mật khẩu trước khi gộp.',
    ],
    faq: [
      {
        question: 'Tôi có thể gộp hơn hai PDF không?',
        answer: 'Có. Thêm nhiều tệp trong không gian công cụ, rồi xuất một PDF gộp.',
      },
      {
        question: 'Tệp có bị tải lên để gộp không?',
        answer: 'Không. Xử lý gộp được thiết kế giữ trong trình duyệt.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Sắp xếp lại trang PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Xóa trang PDF' },
      { pathSegment: 'compress-pdf', label: 'Nén PDF' },
      { pathSegment: 'privacy', label: 'Quyền riêng tư' },
    ],
  },
  compress: {
    title: 'Nén PDF trong trình duyệt | Sign X PDF',
    description:
      'Giảm dung lượng PDF trong trình duyệt. Nén chạy cục bộ, không tải PDF lên máy chủ Sign X PDF.',
    h1: 'Nén PDF trong trình duyệt',
    answerFirst:
      'Nén PDF ngay trong trình duyệt với Sign X PDF. Xử lý ở trên thiết bị, không tải tệp lên máy chủ Sign X PDF. Không cần tài khoản. Lưu PDF nhỏ hơn khi xong.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF.',
    whatItDoes:
      'Tải PDF, chọn kích thước mục tiêu nếu có, chạy nén trong trình duyệt và lưu kết quả.',
    howTo: [
      'Mở PDF trong không gian làm việc.',
      'Chọn cài đặt nén.',
      'Chạy nén và xem kích thước kết quả.',
      'Lưu PDF đã nén.',
    ],
    localProcessing:
      'Nén dùng xử lý trên thiết bị sau khi tài nguyên công cụ tải xong. PDF không được tải lên máy chủ Sign X PDF để nén.',
    limitations: [
      'Mức nhỏ được phụ thuộc nội dung (bản quét so với văn bản).',
      'Nén mạnh có thể làm giảm chất lượng hình ảnh trong PDF.',
    ],
    faq: [
      {
        question: 'Nén có luôn đạt kích thước mục tiêu không?',
        answer:
          'Không phải lúc nào. Bản quét nhiều ảnh nén khác với PDF văn bản. Công cụ báo kích thước đạt được.',
      },
      {
        question: 'PDF có bị tải lên để nén không?',
        answer: 'Không. Nén được thiết kế chạy cục bộ trong trình duyệt.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Gộp PDF' },
      { pathSegment: 'reorder-pdf', label: 'Sắp xếp lại trang' },
      { pathSegment: 'privacy', label: 'Quyền riêng tư' },
    ],
  },
  reorder: {
    title: 'Sắp xếp lại trang PDF trong trình duyệt | Sign X PDF',
    description:
      'Đổi thứ tự trang PDF trong trình duyệt. Sắp xếp lại diễn ra cục bộ — tệp không được tải lên máy chủ Sign X PDF.',
    h1: 'Sắp xếp lại trang PDF trong trình duyệt',
    answerFirst:
      'Sắp xếp lại trang PDF ngay trong trình duyệt với Sign X PDF. Tệp được xử lý cục bộ, không tải lên máy chủ Sign X PDF. Không cần tài khoản. Lưu PDF đã sắp xếp khi xong.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF.',
    whatItDoes:
      'Mở PDF, kéo hoặc di chuyển trang theo thứ tự cần thiết, rồi xuất tài liệu đã cập nhật.',
    howTo: [
      'Tải PDF vào không gian làm việc.',
      'Kéo trang theo thứ tự mong muốn.',
      'Kiểm tra thứ tự trang.',
      'Lưu PDF đã cập nhật.',
    ],
    localProcessing:
      'Sắp xếp lại trang được áp dụng bằng công cụ PDF phía máy khách trong trình duyệt sau khi tài nguyên tải xong.',
    limitations: [
      'Tài liệu rất lớn có thể hiển thị thumbnail chậm hơn.',
      'PDF có mật khẩu có thể cần mở khóa trước.',
    ],
    faq: [
      {
        question: 'Tôi có thể sắp xếp lại sau khi gộp không?',
        answer: 'Có. Gộp hoặc thêm trang trước, rồi sắp xếp lại trước khi lưu.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Gộp PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Xóa trang' },
      { pathSegment: 'privacy', label: 'Quyền riêng tư' },
    ],
  },
  deletePages: {
    title: 'Xóa trang PDF cục bộ trong trình duyệt — không tải lên | Sign X PDF',
    description:
      'Gỡ các trang PDF không cần trong trình duyệt. Xóa chạy cục bộ, không tải PDF lên máy chủ Sign X PDF.',
    h1: 'Xóa trang PDF trong trình duyệt',
    answerFirst:
      'Xóa trang khỏi PDF trong trình duyệt với Sign X PDF. Xử lý ở trên thiết bị, không tải tệp lên máy chủ Sign X PDF. Không cần tài khoản. Lưu PDF đã cập nhật khi xong.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF.',
    whatItDoes:
      'Mở PDF, chọn trang cần xóa, xác nhận các trang còn lại, rồi xuất tệp mới không còn những trang đó.',
    howTo: [
      'Tải PDF vào không gian làm việc.',
      'Chọn các trang cần xóa.',
      'Xác nhận các trang còn lại đúng.',
      'Lưu PDF đã cập nhật.',
    ],
    localProcessing:
      'Xóa trang được thực hiện bằng thư viện phía máy khách trong trình duyệt sau khi công cụ tải xong.',
    limitations: [
      'Không thể khôi phục các trang đã xóa từ tệp đã xuất.',
      'Một số PDF mã hóa cần mật khẩu trước khi đổi trang.',
    ],
    faq: [
      {
        question: 'Tôi có thể xóa nhiều trang cùng lúc không?',
        answer: 'Có. Chọn nhiều trang trong trình quản lý trang, rồi xóa trước khi lưu.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Sắp xếp lại trang' },
      { pathSegment: 'merge-pdf', label: 'Gộp PDF' },
      { pathSegment: 'privacy', label: 'Quyền riêng tư' },
    ],
  },
  privacy: {
    title: 'Quyền riêng tư — Xử lý PDF cục bộ | Sign X PDF',
    description:
      'Cách Sign X PDF xử lý PDF trong trình duyệt mà không tải tài liệu lên để xử lý công cụ, cách đánh giá công cụ PDF riêng tư, và những gì chúng tôi không tuyên bố.',
    h1: 'Quyền riêng tư và xử lý PDF cục bộ',
    answerFirst:
      'Sign X PDF được xây dựng để PDF bạn chọn được đọc và xử lý trong trình duyệt cho việc ký và chỉnh sửa PDF thông thường. PDF không được tải lên máy chủ Sign X PDF cho xử lý đó. Tài nguyên trang thông thường vẫn tải qua mạng. Không cần tài khoản cho các công cụ trình duyệt này.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF để xử lý công cụ.',
    whatItDoes:
      'Trang này giải thích mô hình quyền riêng tư của công cụ trình duyệt Sign X PDF, sự khác biệt giữa xử lý cục bộ và trang PDF trực tuyến dựa trên tải lên, cùng danh sách kiểm tra thực tế khi đánh giá trình chỉnh sửa PDF bạn tin tưởng với tệp mật.',
    howTo: [
      'HTML, JavaScript, phông chữ và tài nguyên WASM của ứng dụng tải xuống như mọi trang web.',
      'Bạn chọn PDF bằng bộ chọn tệp trình duyệt hoặc kéo thả (trình duyệt giữ tham chiếu File cục bộ).',
      'Tệp được đọc bằng API trình duyệt và xử lý trên thiết bị bằng thư viện máy khách và, khi dùng, WebAssembly.',
      'Bạn lưu tệp đầu ra vào thiết bị; quy trình không được thiết kế để giữ bản sao PDF phía máy chủ.',
    ],
    localProcessing:
      'Xử lý cục bộ nghĩa là chuỗi chỉnh sửa chạy trong thẻ trình duyệt bằng mã phía máy khách (gồm hiển thị kiểu pdf.js, lắp ráp pdf-lib và QPDF WebAssembly cho một số thao tác). Không có nghĩa là “hoàn toàn không có mạng”: script và tài nguyên khác vẫn tải, và quảng cáo hoặc phân tích bên thứ ba có thể vẫn yêu cầu tài nguyên web thông thường nếu có trên trang. Byte tài liệu cho quy trình công cụ được dự định ở lại trong thẻ, không POST tới máy chủ ứng dụng Sign X PDF.',
        storageDisclosure: {
      heading: "Bộ nhớ trình duyệt mà Sign X PDF sử dụng",
      storageColumn: "Bộ nhớ",
      purposeColumn: "Mục đích",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Tùy chọn ngôn ngữ và cửa sổ ngắn giới hạn xuất miễn phí. Đây là dữ liệu first-party của trang, không phải cookie quảng cáo.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Chữ ký đã lưu mà bạn chọn giữ trong trình duyệt này (gồm blob ảnh chữ ký) để dùng lại.",
        },
        {
          storage: "Cookies",
          purpose:
            "Xử lý PDF cốt lõi không cần cookie quảng cáo first-party. Quảng cáo/phân tích bên thứ ba (nếu có) có thể đặt cookie theo chính sách của họ.",
        },
      ],
      clearNote:
        "Xóa dữ liệu trang web này trong trình duyệt sẽ gỡ tùy chọn và chữ ký lưu cục bộ. Luồng công cụ không giữ bản sao PDF trên máy chủ.",
    },
limitations: [
      'Xử lý cục bộ không bảo vệ thiết bị bị xâm nhập hoặc tiện ích trình duyệt độc hại.',
      'Chúng tôi không tuyên bố quyền riêng tư cấp quân sự, ẩn danh hoàn toàn, không telemetry trong mọi môi trường trình duyệt, hay rủi ro bằng không.',
      'Tài nguyên trang thông thường luôn tải; dùng ngoại tuyến không được đảm bảo cho đến khi bạn xác minh tải ấm trên thiết bị.',
      'Nếu tính năng sau này cần tải lên qua mạng, sẽ cần thay đổi thiết kế rõ ràng và cập nhật nội dung.',
    ],
    faq: [
      {
        question: 'Có dữ liệu nào rời thiết bị không?',
        answer:
          'Tài nguyên trang được tải xuống bình thường. PDF đã chọn được dự định ở lại trong trình duyệt để xử lý. Chúng tôi không tuyên bố rằng không có byte nào rời thiết bị trong mọi trường hợp (ví dụ hành vi hệ điều hành hoặc tiện ích ngoài ứng dụng).',
      },
      {
        question: 'Bạn có lưu PDF của tôi trên máy chủ không?',
        answer:
          'Các công cụ trình duyệt mô tả ở đây không được thiết kế để tải PDF lên máy chủ Sign X PDF nhằm lưu trữ hoặc chuyển đổi.',
      },
      {
        question: "Sign X PDF dùng những bộ nhớ trình duyệt nào?",
        answer:
          "localStorage lưu tùy chọn ngôn ngữ và cửa sổ giới hạn xuất. IndexedDB lưu chữ ký bạn giữ lại. Xử lý PDF cốt lõi không cần cookie quảng cáo first-party. Xóa dữ liệu trang để gỡ các mục cục bộ đó.",
      },
      {
        question: 'Tôi có cần tài khoản không?',
        answer: 'Không cần tài khoản để dùng công cụ ký và PDF trên trình duyệt được mô tả trên trang này.',
      },
      {
        question: 'Làm sao đánh giá trình chỉnh sửa PDF trực tuyến có an toàn không?',
        answer:
          'Ưu tiên mô hình xử lý rõ ràng (tải lên so với cục bộ), chính sách lưu giữ, yêu cầu tài khoản, công bố telemetry, chữ ký là dấu hiển thị hay dựa trên chứng chỉ, thành phần mã nguồn mở có thể kiểm tra, và giới hạn tệp thực tế. Xác minh tuyên bố bằng công cụ Mạng trình duyệt với tệp thử tên duy nhất.',
      },
      {
        question: 'Sign X PDF có tự động là lựa chọn an toàn nhất không?',
        answer:
          'Không có công cụ nào tự động an toàn nhất cho mọi mô hình đe dọa. Sign X PDF hướng tới xử lý tài liệu cục bộ và giới hạn minh bạch. So sánh tiêu chí—không phải khẩu hiệu—và kiểm tra lại hành vi mạng cho trường hợp của bạn.',
      },
      {
        question: 'Tôi có thể xem các thành phần mã nguồn mở không?',
        answer:
          'Có. Thông báo giấy phép cho QPDF, pdf-lib và các thư viện khác được liệt kê trên trang giấy phép mã nguồn mở.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Ký PDF' },
      { pathSegment: 'merge-pdf', label: 'Gộp PDF' },
      { pathSegment: 'open-source-licences', label: 'Giấy phép mã nguồn mở' },
      { pathSegment: '', label: 'Tất cả công cụ' },
    ],
  },
});
