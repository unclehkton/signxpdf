import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const viBundle: LocaleBundle = buildWave1Bundle('vi', {
  htmlLang: 'vi',
  ogLocale: 'vi_VN',
  nav: {
    home: 'Trang chủ',
    sign: 'Ký PDF',
    tools: 'Công cụ PDF',
    privacy: 'Quyền riêng tư',
    guides: 'Hướng dẫn',
    openTool: 'Dùng công cụ này trong trình duyệt',
    relatedTools: 'Trang liên quan',
    howTo: 'Cách sử dụng',
    whatItDoes: 'Công cụ này làm gì',
    localProcessing: 'Cách xử lý cục bộ',
    limitations: 'Hạn chế',
    faq: 'Câu hỏi thường gặp',
    enableJs:
      'Bật JavaScript để chỉnh sửa PDF cục bộ trong trình duyệt. Sau khi tài nguyên trang đã tải, không cần tải tệp lên máy chủ.',
    published: 'Ngày đăng',
    updated: 'Cập nhật lần cuối',
    verified: 'Xác minh lần cuối',
    howWeVerified: 'Cách chúng tôi xác minh',
  },
  home: {
    title: 'Công cụ PDF riêng tư — Ký, Gộp & Nén | Sign X PDF',
    description:
      'Ký, gộp, nén, sắp xếp lại và xóa trang PDF trong trình duyệt. PDF được xử lý trên thiết bị của bạn, không tải lên máy chủ Sign X PDF.',
    h1: 'Ký và chỉnh sửa PDF riêng tư trong trình duyệt',
    answerFirst:
      'Sign X PDF cho phép bạn thêm chữ ký hiển thị và thực hiện các thao tác PDF phổ biến ngay trong trình duyệt. PDF được xử lý trên thiết bị của bạn, không tải lên máy chủ Sign X PDF. Không cần tài khoản. Khi xong, lưu tệp đã cập nhật vào thiết bị.',
    privacyNote:
      'PDF của bạn được xử lý cục bộ trong trình duyệt và không được tải lên máy chủ Sign X PDF. Tài nguyên trang thông thường (HTML, script, phông chữ) vẫn tải từ mạng như mọi trang web khác.',
    whatItDoes:
      'Chọn công cụ phù hợp để ký, gộp, nén, sắp xếp lại trang hoặc xóa trang. Mỗi trang công cụ giải thích quy trình và chỉ tải trình chỉnh sửa khi bạn dùng.',
    howTo: [
      'Chọn công cụ như Ký PDF hoặc Gộp PDF.',
      'Mở tệp bằng bộ chọn tệp trên trang (hoặc kéo thả nếu có).',
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
        question: 'Bạn có lưu PDF của tôi trên máy c…9125 tokens truncated…sing: '刪除頁面在工具載入後，以瀏覽器內的用戶端程式庫完成。',
      limitations: [
        '已匯出的檔案無法復原被刪除的頁面。',
        '部分加密 PDF 需先輸入密碼才能更改頁面。',
      ],
      faq: [
        {
          question: '可以一次刪除多頁嗎？',
          answer: '可以。在頁面管理中選取多頁，儲存前移除即可。',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: '重新排列頁面' },
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'delete',
    },
  },
  privacy: {
    slug: 'privacy',
    pathSegment: 'privacy',
    title: '私隱 — 本機 PDF 處理 | Sign X PDF',
    description:
      'Sign X PDF 如何在瀏覽器處理 PDF而不將文件上傳作工具處理、如何評估私隱優先的 PDF 工具，以及我們不會作出的聲稱。',
    h1: '私隱與本機 PDF 處理',
    answerFirst:
      'Sign X PDF 的設計是讓你在瀏覽器讀取並處理所選 PDF，以進行簽署及常見編輯。PDF 不會上傳至 Sign X PDF 伺服器作該等處理。一般網站資源仍會經網絡下載。使用這些瀏覽器工具無需帳戶。',
    privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 伺服器作工具處理。',
    whatItDoes:
      '本頁說明 Sign X PDF 瀏覽器工具的私隱模式、本機處理與上傳式線上 PDF 網站的分別，以及評估任何 PDF 編輯器時可用的實用清單。',
    howTo: [
      '應用程式的 HTML、JavaScript、字型與 WASM 等資源會如一般網站般下載。',
      '你以瀏覽器檔案選擇器或拖放選取 PDF（瀏覽器保留本機 File 參照）。',
      '檔案以瀏覽器 API 讀取，並以用戶端程式庫（及在適用時 WebAssembly）在裝置上處理。',
      '你將輸出檔案儲存到裝置；此流程並非設計成在伺服器保留你的 PDF 副本。',
    ],
    localProcessing:
      '本機處理是指編輯流程在瀏覽器分頁以用戶端程式碼執行（包括 pdf.js 類渲染、pdf-lib 組裝，以及部分操作使用的 QPDF WebAssembly）。這不代表「完全沒有網絡」：指令碼等資源仍會載入；若頁面含廣告或分析，仍可能請求一般網頁資源。工具流程中的文件位元組旨在留在分頁內，而不是 POST 到 Sign X PDF 應用伺服器。',
    storageDisclosure: {
      heading: 'Sign X PDF 使用的瀏覽器儲存',
      storageColumn: '儲存方式',
      purposeColumn: '用途',
      rows: [
        {
          storage: 'localStorage',
          purpose:
            '語言偏好，以及限制免費匯出頻率的短暫時間窗。這些是第一方網站資料，並非廣告 cookies。',
        },
        {
          storage: 'IndexedDB',
          purpose: '你選擇保存在此瀏覽器以便重用的簽名庫項目（包括簽名圖像 Blob）。',
        },
        {
          storage: 'Cookies',
          purpose:
            '核心 PDF 處理不需要第一方廣告 cookies。若頁面含第三方廣告或分析，對方可能按其政策設定 cookies。',
        },
      ],
      clearNote:
        '在瀏覽器清除本站資料會移除本機偏好設定與已儲存簽名。工具流程不會在伺服器保留你的 PDF 副本。',
    },
    limitations: [
      '本機處理無法防範已受感染的裝置或惡意瀏覽器擴充功能。',
      '我們不會聲稱軍事級私隱、完全匿名、在所有瀏覽器環境零遙測，或零風險。',
      '一般網站資源仍會下載；在未於你的裝置驗證暖載入前，不保證離線可用。',
      '若日後功能需要網絡上傳，必須有明確設計變更並更新說明文字。',
    ],
    faq: [
      {
        question: '是否有任何資料會離開我的裝置？',
        answer:
          '網站資源會正常下載。所選 PDF 旨在留在瀏覽器內處理。我們不會聲稱在任何情況下都不會有位元組離開你的裝置（例如作業系統或擴充功能的行為超出本應用程式控制）。',
      },
      {
        question: '你們會在伺服器儲存我的 PDF 嗎？',
        answer: '此處所述的瀏覽器工具並非設計成將 PDF 上傳至 Sign X PDF 伺服器作儲存或轉換。',
      },
      {
        question: 'Sign X PDF 會用哪些瀏覽器儲存？',
        answer:
          'localStorage 會存放語言偏好與匯出頻率時間窗；IndexedDB 會存放你選擇保存的簽名。核心 PDF 處理不需要第一方廣告 cookies。清除網站資料即可移除上述本機項目。',
      },
      {
        question: '需要帳戶嗎？',
        answer: '使用本站所述的瀏覽器簽署與 PDF 工具無需帳戶。',
      },
      {
        question: '應如何判斷線上 PDF 編輯器是否安全？',
        answer:
          '應檢視：處理模式（上傳或本機）、保留政策、是否需帳戶、遙測說明、簽名是可見標記還是憑證式、可否檢視開源元件，以及實際檔案限制。並用獨特檔名的測試檔在瀏覽器網絡面板核實聲稱。',
      },
      {
        question: 'Sign X PDF 是否自動是最安全的選擇？',
        answer:
          '沒有工具能自動成為所有威脅模型下的最安全選項。Sign X PDF 著重本機文件處理與清楚限制。請比較準則而非口號，並就你的用途覆核網絡行為。',
      },
      {
        question: '可以查看開源元件嗎？',
        answer: '可以。QPDF、pdf-lib 等函式庫的授權聲明列於開放原始碼授權頁。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '簽署 PDF' },
      { pathSegment: 'merge-pdf', label: '合併 PDF' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
      { pathSegment: 'open-source-licences', label: '開放原始碼授權' },
      { pathSegment: '', label: '所有工具' },
    ],
    ogLocale: 'zh_HK',
    toolKind: 'none',
  },
  guides: zhHantGuides,
};
