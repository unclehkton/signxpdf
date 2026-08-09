import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const koBundle: LocaleBundle = buildWave1Bundle('ko', {
  htmlLang: 'ko',
  ogLocale: 'ko_KR',
  nav: {
    home: '홈',
    sign: 'PDF 서명',
    tools: 'PDF 도구',
    privacy: '개인정보',
    guides: '가이드',
    openTool: '브라우저에서 이 도구 사용',
    relatedTools: '관련 페이지',
    howTo: '사용 방법',
    whatItDoes: '이 도구의 기능',
    localProcessing: '로컬 처리 방식',
    limitations: '제한 사항',
    faq: '자주 묻는 질문',
    enableJs:
      'JavaScript를 사용하도록 설정하면 브라우저에서 PDF를 로컬로 편집할 수 있습니다. 페이지 리소스가 로드된 뒤에는 업로드가 필요하지 않습니다.',
    published: '게시일',
    updated: '최종 업데이트',
    verified: '최종 확인',
    howWeVerified: '확인 방법',
  },
  home: {
    title: '프라이버시 중심 PDF 도구 — 서명·병합·압축 | Sign X PDF',
    description:
      '브라우저에서 PDF 서명, 병합, 압축, 페이지 순서 변경 및 삭제를 수행하세요. PDF는 기기에서 처리되며 Sign X PDF 서버로 업로드되지 않습니다.',
    h1: '브라우저에서 안전하게 PDF 서명·편집하기',
    answerFirst:
      'Sign X PDF로 브라우저에서 보이는 서명을 추가하고 일반적인 PDF 작업을 할 수 있습니다. PDF는 기기에서 처리되며 Sign X PDF 서버로 업로드되지 않습니다. 계정이 필요하지 않습니다. 작업을 마치면 업데이트된 파일을 기기에 저장하세요.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다. 일반 웹사이트와 같이 HTML, 스크립트, 글꼴 등 사이트 리소스는 네트워크에서 로드됩니다.',
    whatItDoes:
      '서명, 병합, 압축, 페이지 순서 변경, 페이지 삭제 등 목적에 맞는 도구를 선택하세요. 각 도구 페이지에서 흐름을 안내하며, 사용할 때 편집기를 로드합니다.',
    howTo: [
      'PDF 서명 또는 PDF 병합 등 도구를 선택합니다.',
      '페이지의 파일 선택기(또는 지원 시 끌어다 놓기)로 파일을 엽니다.',
      '브라우저에서 편집을 완료합니다.',
      '결과를 기기에 저장합니다.',
    ],
    localProcessing:
      '앱 리소스가 로드된 뒤 파일 읽기, 렌더링, 내보내기는 브라우저 API와 클라이언트 측 라이브러리를 사용합니다. 선택한 PDF는 처리를 위해 Sign X PDF 애플리케이션 서버로 전송되지 않습니다.',
    limitations: [
      '편집에는 JavaScript를 지원하는 최신 브라우저가 필요합니다.',
      '매우 큰 PDF는 메모리가 적은 기기에서 더 느릴 수 있습니다.',
      '로컬 처리만으로 기기의 악성코드나 악성 브라우저 확장 프로그램으로부터 보호되지는 않습니다.',
    ],
    faq: [
      {
        question: 'PDF가 업로드되나요?',
        answer:
          '아니요. Sign X PDF는 선택한 PDF를 브라우저에서 로컬로 처리하도록 설계되어 있으며, 변환이나 저장을 위해 Sign X PDF 서버로 업로드하지 않습니다.',
      },
      {
        question: '계정이 필요한가요?',
        answer: '브라우저 도구를 사용하는 데 계정이 필요하지 않습니다.',
      },
      {
        question: '작업을 마치면 어떻게 되나요?',
        answer:
          '업데이트된 PDF를 기기에 저장합니다. 이 워크플로에서는 서버에 파일 사본을 보관하지 않습니다.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'PDF 서명' },
      { pathSegment: 'merge-pdf', label: 'PDF 병합' },
      { pathSegment: 'compress-pdf', label: 'PDF 압축' },
      { pathSegment: 'privacy', label: '개인정보' },
    ],
  },
  sign: {
    title: '브라우저에서 PDF 서명 — 보이는 서명 | Sign X PDF',
    description:
      '브라우저에서 PDF에 보이는 서명을 추가하세요. 그리기, 입력 또는 이미지 서명을 로컬로 배치하며 PDF를 Sign X PDF 서버에 업로드하지 않습니다.',
    h1: '브라우저에서 PDF에 서명하기',
    answerFirst:
      'Sign X PDF로 브라우저에서 PDF에 보이는 서명을 바로 추가할 수 있습니다. PDF는 기기에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다. 계정이 필요하지 않습니다. 작업을 마치면 서명된 PDF를 기기에 저장하세요.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다.',
    whatItDoes:
      '그리기, 텍스트 입력, 이미지 업로드 또는(가능한 경우) 카메라로 서명을 만든 뒤 페이지에 배치하고 새 PDF로 내보냅니다.',
    howTo: [
      'PDF 또는 지원되는 이미지를 엽니다.',
      '서명을 만들거나 선택합니다(그리기, 입력, 업로드, 카메라).',
      '페이지에 서명을 놓고 크기를 조정합니다.',
      '서명된 PDF를 기기에 저장합니다.',
    ],
    localProcessing:
      '서명 생성과 PDF 내보내기는 페이지 리소스가 로드된 뒤 브라우저의 클라이언트 측 라이브러리로 실행됩니다.',
    limitations: [
      '보이는 서명 외관을 추가하는 것이며, 인증서 기반 암호학적 전자서명이 아닙니다.',
      '감사 추적, 신원 확인, 법적 유효성 보장을 자체적으로 제공하지 않습니다.',
      '암호화된 PDF는 편집 전에 열기 비밀번호가 필요할 수 있습니다.',
    ],
    faq: [
      {
        question: '인증서 기반 전자서명인가요?',
        answer:
          '아니요. Sign X PDF는 보이는 서명(그리기, 입력 또는 이미지)을 배치합니다. 인증서 기반 암호 서명, 타임스탬프, 서명 검증은 적용하지 않습니다.',
      },
      {
        question: '서명하려고 PDF를 업로드하나요?',
        answer:
          '아니요. 서명은 브라우저에서 로컬로 실행되도록 설계되어 있습니다. 일반 사이트 리소스는 네트워크로 다운로드됩니다.',
      },
      {
        question: '서명 사진을 사용할 수 있나요?',
        answer:
          '네. 서명 이미지를 업로드하거나 브라우저가 카메라를 허용하는 경우 촬영할 수 있습니다.',
      },
      {
        question: 'PDF에 그리는 것이 전자서명과 같나요?',
        answer:
          '아니요. 그리기는 보이는 표시를 넣는 것입니다. 인증서 기반 전자서명은 암호와 디지털 인증서를 사용합니다. Sign X PDF는 보이는 서명만 배치합니다.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'PDF 파일 병합' },
      { pathSegment: 'compress-pdf', label: 'PDF 압축' },
      { pathSegment: 'privacy', label: '개인정보 및 로컬 처리' },
    ],
  },
  merge: {
    title: '브라우저에서 PDF 파일을 로컬로 병합 — 업로드 없이 | Sign X PDF',
    description:
      '브라우저에서 여러 PDF를 하나의 파일로 합치세요. 병합은 로컬에서 이루어지며 파일은 Sign X PDF 서버로 업로드되지 않습니다.',
    h1: '브라우저에서 PDF 파일 병합하기',
    answerFirst:
      'Sign X PDF로 브라우저에서 여러 PDF를 하나의 문서로 병합할 수 있습니다. 파일은 기기에서 처리되며 Sign X PDF 서버로 업로드되지 않습니다. 계정이 필요하지 않습니다. 작업을 마치면 병합된 PDF를 저장하세요.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다.',
    whatItDoes:
      '하나 이상의 PDF(및 지원되는 이미지)를 불러와 페이지를 정리한 뒤 하나의 결합 PDF로 내보냅니다.',
    howTo: [
      '아래 병합 도구 작업 공간을 엽니다.',
      '합칠 PDF 파일을 추가합니다.',
      '필요하면 페이지 순서를 바꿉니다.',
      '병합된 PDF를 기기에 저장합니다.',
    ],
    localProcessing:
      '병합은 리소스가 로드된 뒤 브라우저의 클라이언트 측 PDF 라이브러리로 수행됩니다. 선택한 파일은 병합 처리를 위해 Sign X PDF 서버로 전송되지 않습니다.',
    limitations: [
      '매우 크거나 많은 파일에는 브라우저 메모리 제한이 적용됩니다.',
      '일부 암호화된 PDF는 병합 전에 비밀번호가 필요합니다.',
    ],
    faq: [
      {
        question: '두 개보다 많은 PDF를 병합할 수 있나요?',
        answer: '네. 도구 작업 공간에 여러 파일을 추가한 뒤 하나의 결합 PDF로 내보내면 됩니다.',
      },
      {
        question: '병합하려고 파일을 업로드하나요?',
        answer: '아니요. 병합 처리는 브라우저에서 이루어지도록 설계되어 있습니다.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'PDF 페이지 순서 변경' },
      { pathSegment: 'delete-pdf-pages', label: 'PDF 페이지 삭제' },
      { pathSegment: 'compress-pdf', label: 'PDF 압축' },
      { pathSegment: 'privacy', label: '개인정보' },
    ],
  },
  compress: {
    title: '브라우저에서 PDF 압축 | Sign X PDF',
    description:
      '브라우저에서 PDF 파일 크기를 줄이세요. 압축은 로컬에서 실행되며 PDF를 Sign X PDF 서버에 업로드하지 않습니다.',
    h1: '브라우저에서 PDF 압축하기',
    answerFirst:
      'Sign X PDF로 브라우저에서 PDF를 바로 압축할 수 있습니다. 처리는 기기에서 이루어지며 파일을 Sign X PDF 서버에 업로드하지 않습니다. 계정이 필요하지 않습니다. 작업을 마치면 작아진 PDF를 저장하세요.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다.',
    whatItDoes:
      'PDF를 불러와 가능한 경우 목표 크기를 선택한 뒤 브라우저에서 압축을 실행하고 결과를 저장합니다.',
    howTo: [
      '작업 공간에서 PDF를 엽니다.',
      '압축 설정을 선택합니다.',
      '압축을 실행하고 결과 크기를 확인합니다.',
      '압축된 PDF를 저장합니다.',
    ],
    localProcessing:
      '압축은 도구 리소스가 로드된 뒤 기기에서 처리됩니다. 압축을 위해 PDF가 Sign X PDF 서버로 업로드되지 않습니다.',
    limitations: [
      '얼마나 작아질 수 있는지는 내용(스캔 이미지 vs 텍스트)에 따라 다릅니다.',
      '강한 압축은 PDF 안 이미지의 시각 품질을 낮출 수 있습니다.',
    ],
    faq: [
      {
        question: '항상 목표 크기까지 압축되나요?',
        answer:
          '항상 그렇지는 않습니다. 이미지가 많은 스캔과 텍스트 PDF는 압축 방식이 다릅니다. 도구는 달성한 크기를 표시합니다.',
      },
      {
        question: '압축하려고 PDF를 업로드하나요?',
        answer: '아니요. 압축은 브라우저에서 로컬로 실행되도록 설계되어 있습니다.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'PDF 병합' },
      { pathSegment: 'reorder-pdf', label: '페이지 순서 변경' },
      { pathSegment: 'privacy', label: '개인정보' },
    ],
  },
  reorder: {
    title: '브라우저에서 PDF 페이지 순서 변경 | Sign X PDF',
    description:
      '브라우저에서 PDF 페이지 순서를 다시 정렬하세요. 순서 변경은 로컬에서 이루어지며 파일은 Sign X PDF 서버로 업로드되지 않습니다.',
    h1: '브라우저에서 PDF 페이지 순서 변경하기',
    answerFirst:
      'Sign X PDF로 브라우저에서 PDF 페이지 순서를 바꿀 수 있습니다. 파일은 기기에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다. 계정이 필요하지 않습니다. 작업을 마치면 순서가 바뀐 PDF를 저장하세요.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다.',
    whatItDoes:
      'PDF를 열고 페이지를 드래그하거나 이동해 원하는 순서로 만든 뒤 업데이트된 문서를 내보냅니다.',
    howTo: [
      '작업 공간에서 PDF를 불러옵니다.',
      '페이지를 원하는 순서로 드래그합니다.',
      '페이지 순서를 확인합니다.',
      '업데이트된 PDF를 저장합니다.',
    ],
    localProcessing:
      '페이지 순서 변경은 리소스가 로드된 뒤 브라우저의 클라이언트 측 PDF 도구로 적용됩니다.',
    limitations: [
      '매우 큰 문서는 썸네일 렌더링이 더 느릴 수 있습니다.',
      '비밀번호로 보호된 PDF는 먼저 잠금 해제가 필요할 수 있습니다.',
    ],
    faq: [
      {
        question: '병합한 뒤에 순서를 바꿀 수 있나요?',
        answer: '네. 먼저 병합하거나 페이지를 추가한 뒤 저장 전에 다시 정렬할 수 있습니다.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'PDF 병합' },
      { pathSegment: 'delete-pdf-pages', label: '페이지 삭제' },
      { pathSegment: 'privacy', label: '개인정보' },
    ],
  },
  deletePages: {
    title: '브라우저에서 PDF 페이지를 로컬로 삭제 — 업로드 없이 | Sign X PDF',
    description:
      '브라우저에서 원하지 않는 PDF 페이지를 제거하세요. 삭제는 로컬에서 실행되며 PDF를 Sign X PDF 서버에 업로드하지 않습니다.',
    h1: '브라우저에서 PDF 페이지 삭제하기',
    answerFirst:
      'Sign X PDF로 브라우저에서 PDF 페이지를 제거할 수 있습니다. 처리는 기기에서 이루어지며 파일을 Sign X PDF 서버에 업로드하지 않습니다. 계정이 필요하지 않습니다. 작업을 마치면 업데이트된 PDF를 저장하세요.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 Sign X PDF 서버로 업로드되지 않습니다.',
    whatItDoes:
      'PDF를 열고 삭제할 페이지를 선택한 뒤 남은 페이지를 확인하고, 해당 페이지가 없는 새 파일을 내보냅니다.',
    howTo: [
      '작업 공간에서 PDF를 불러옵니다.',
      '삭제할 페이지를 선택합니다.',
      '남은 페이지가 올바른지 확인합니다.',
      '업데이트된 PDF를 저장합니다.',
    ],
    localProcessing:
      '페이지 삭제는 도구가 로드된 뒤 브라우저의 클라이언트 측 라이브러리로 수행됩니다.',
    limitations: [
      '삭제된 페이지는 내보낸 파일에서 복구할 수 없습니다.',
      '일부 암호화된 PDF는 페이지를 변경하기 전에 비밀번호가 필요합니다.',
    ],
    faq: [
      {
        question: '여러 페이지를 한 번에 삭제할 수 있나요?',
        answer: '네. 페이지 관리에서 여러 페이지를 선택한 뒤 저장 전에 제거하면 됩니다.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: '페이지 순서 변경' },
      { pathSegment: 'merge-pdf', label: 'PDF 병합' },
      { pathSegment: 'privacy', label: '개인정보' },
    ],
  },
  privacy: {
    title: '개인정보 — 로컬 PDF 처리 | Sign X PDF',
    description:
      'Sign X PDF가 도구 처리를 위해 문서를 업로드하지 않고 브라우저에서 PDF를 처리하는 방식, 프라이버시 중심 PDF 도구를 평가하는 방법, 주장하지 않는 내용에 대해 설명합니다.',
    h1: '개인정보와 로컬 PDF 처리',
    answerFirst:
      'Sign X PDF는 서명 및 일반적인 PDF 편집을 위해 선택한 PDF를 브라우저에서 읽고 처리하도록 구축되었습니다. 해당 처리를 위해 PDF는 Sign X PDF 서버로 업로드되지 않습니다. 일반 사이트 리소스는 네트워크로 다운로드됩니다. 이 브라우저 도구에는 계정이 필요하지 않습니다.',
    privacyNote:
      'PDF는 브라우저에서 로컬로 처리되며 도구 처리를 위해 Sign X PDF 서버로 업로드되지 않습니다.',
    whatItDoes:
      '이 페이지에서는 Sign X PDF 브라우저 도구의 개인정보 모델, 업로드 기반 온라인 PDF 사이트와의 차이, 기밀 파일을 맡길 PDF 편집기를 평가하기 위한 실무 체크리스트를 설명합니다.',
    howTo: [
      '사이트 HTML, JavaScript, 글꼴, WebAssembly 등 리소스는 일반 웹사이트처럼 다운로드됩니다.',
      '브라우저 파일 선택기 또는 끌어다 놓기로 PDF를 선택합니다(브라우저는 기기의 파일을 가리키는 참조를 유지합니다).',
      '파일은 브라우저 기능으로 읽고, 기기에서 실행되는 프로그램으로 처리됩니다(일부 작업은 WebAssembly 사용).',
      '결과 파일을 기기에 저장합니다. 이 흐름은 서버에 PDF 사본을 보관하도록 설계되지 않았습니다.',
    ],
    localProcessing:
      '로컬 처리란 PDF 편집이 브라우저 탭 안의 프로그램(화면 표시, 문서 조합, 일부 작업의 WebAssembly 등)으로 실행된다는 뜻입니다. “인터넷이 전혀 필요 없다”는 의미가 아닙니다. 페이지 스크립트 등 사이트 파일은 여전히 불러오며, 광고나 분석이 있으면 일반 웹 요청이 발생할 수 있습니다. 편집에 쓰는 선택한 PDF 파일은 Sign X PDF 서버로 보내지 않고 브라우저 탭에 남도록 설계되어 있습니다.',
        storageDisclosure: {
      heading: "Sign X PDF가 사용하는 브라우저 저장소",
      storageColumn: "저장소",
      purposeColumn: "용도",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "언어 환경설정과 무료 내보내기 횟수를 짧게 제한하는 시간 창. 광고 쿠키가 아닌 이 사이트 자체의 데이터입니다.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "이 브라우저에 다시 쓰려고 저장한 서명(서명 이미지 데이터 포함).",
        },
        {
          storage: "Cookies",
          purpose:
            "핵심 PDF 처리에는 광고 목적의 자사 쿠키가 필요하지 않습니다. 서드파티 광고·분석이 있으면 해당 정책에 따라 쿠키가 설정될 수 있습니다.",
        },
      ],
      clearNote:
        "브라우저에서 이 사이트 데이터를 지우면 로컬에 저장된 환경설정과 서명이 제거됩니다. 도구 흐름은 서버에 PDF 사본을 보관하지 않습니다.",
    },
limitations: [
      '로컬 처리만으로 침해된 기기나 악성 브라우저 확장 프로그램으로부터 보호되지는 않습니다.',
      '군사급 개인정보 보호, 완전한 익명성, 모든 브라우저 환경에서의 제로 텔레메트리, 제로 리스크를 주장하지 않습니다.',
      '일반 사이트 리소스는 항상 다운로드됩니다. 사이트와 도구를 기기에서 한 번 불러와 캐시된 상태를 확인하기 전에는 오프라인 사용을 보장하지 …25261 tokens truncated…會被上傳嗎？',
        answer:
          '不會。Sign X PDF 的設計是在瀏覽器本機處理你所選的 PDF，而不是上傳到 Sign X PDF 伺服器作轉換或儲存。',
      },
      {
        question: '需要帳戶嗎？',
        answer: '使用瀏覽器工具無需帳戶。',
      },
      {
        question: '完成後會怎樣？',
        answer: '你可以將更新後的 PDF 儲存到裝置。此流程不會在伺服器保留你的檔案副本。',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: '簽署 PDF' },
      { pathSegment: 'merge-pdf', label: '合併 PDF' },
      { pathSegment: 'compress-pdf', label: '壓縮 PDF' },
      { pathSegment: 'privacy', label: '私隱' },
      { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
      { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
    ],
    ogLocale: 'zh_HK',
    toolKind: 'none',
  },
  tools: {
    'sign-pdf': {
      slug: 'sign-pdf',
      pathSegment: 'sign-pdf',
      title: '在瀏覽器簽署 PDF — 可見簽名 | Sign X PDF',
      description:
        '在瀏覽器為 PDF 加入可見簽名。可手寫、輸入或放置圖片簽名，PDF 在本機處理，毋須上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器簽署 PDF',
      answerFirst:
        'Sign X PDF 讓你在瀏覽器直接為 PDF 加入可見簽名。PDF 在你的裝置上本機處理，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後可儲存更新後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes:
        '可透過繪製、輸入文字、上傳圖片或（在允許時）相機建立簽名，放置到頁面後匯出新的 PDF。',
      howTo: [
        '開啟 PDF 或支援的圖片。',
        '建立或選擇簽名（繪製、輸入、上傳或相機）。',
        '在頁面上放置並調整簽名大小。',
        '將已簽署的 PDF 儲存到裝置。',
      ],
      localProcessing: '簽名建立與 PDF 匯出在頁面資源載入後，於瀏覽器以用戶端程式庫執行。',
      limitations: [
        '此功能加入的是可見簽名外觀，並非以證書為基礎的加密數位簽章。',
        '不會產生審計軌跡、身份核實，亦不保證在任何司法管轄區具法律效力。',
        '加密 PDF 可能需要開啟密碼才能編輯。',
      ],
      faq: [
        {
          question: '這是證書式數位簽章嗎？',
          answer:
            '不是。Sign X PDF 放置可見簽名（手寫、文字或圖片），不會套用證書式加密簽署、時間戳或簽章驗證。',
        },
        {
          question: '簽署時會上傳 PDF 嗎？',
          answer: '不會。簽署流程設計為在瀏覽器本機執行。網站資源仍會經網絡下載。',
        },
        {
          question: '可以使用簽名照片嗎？',
          answer: '可以。你可以上傳簽名圖片，或在瀏覽器允許時使用相機拍攝。',
        },
        {
          question: '在 PDF 上畫簽名等於數碼簽署嗎？',
          answer:
            '不等於。畫簽名是放置可見標記。憑證式數碼簽署使用密碼學與數碼證書。Sign X PDF 只放置可見簽名。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'compress-pdf', label: '壓縮 PDF' },
        { pathSegment: 'privacy', label: '私隱與本機處理' },
        { pathSegment: 'guides/visible-vs-digital-signature', label: '可見簽名與數碼簽署' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'sign',
    },
    'merge-pdf': {
      slug: 'merge-pdf',
      pathSegment: 'merge-pdf',
      title: '在瀏覽器本機合併 PDF — 不需上傳 | Sign X PDF',
      description:
        '在瀏覽器將多個 PDF 合併成一個檔案。合併在本機進行，檔案不會上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器合併 PDF',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器將多個 PDF 合併成一份文件。檔案在你的裝置上本機處理，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存合併後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '載入一個或多個 PDF（及支援的圖片），整理頁面，並匯出單一合併 PDF。',
      howTo: [
        '開啟下方合併工作區。',
        '加入要合併的 PDF。',
        '如有需要，重新排列頁面。',
        '將合併後的 PDF 儲存到裝置。',
      ],
      localProcessing:
        '合併在資源載入後以瀏覽器內的用戶端 PDF 程式庫完成，所選檔案不會送往 Sign X PDF 伺服器作合併。',
      limitations: [
        '檔案數量或體積很大時，會受瀏覽器記憶體限制。',
        '部分加密 PDF 需先輸入密碼。',
      ],
      faq: [
        {
          question: '可以合併超過兩個 PDF 嗎？',
          answer: '可以。在工具工作區加入多個檔案，再匯出一份合併 PDF。',
        },
        {
          question: '合併時會上傳檔案嗎？',
          answer: '不會。合併處理設計為留在你的瀏覽器內。',
        },
      ],
      related: [
        { pathSegment: 'reorder-pdf', label: '重新排列頁面' },
        { pathSegment: 'delete-pdf-pages', label: '刪除 PDF 頁面' },
        { pathSegment: 'compress-pdf', label: '壓縮 PDF' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'merge',
    },
    'compress-pdf': {
      slug: 'compress-pdf',
      pathSegment: 'compress-pdf',
      title: '在瀏覽器壓縮 PDF | Sign X PDF',
      description:
        '在瀏覽器縮減 PDF 檔案大小。壓縮在本機執行，毋須將 PDF 上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器壓縮 PDF',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器直接壓縮 PDF。處理留在你的裝置上，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存較小的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '載入 PDF，選擇目標大小（如適用），在瀏覽器執行壓縮，再儲存結果。',
      howTo: [
        '在工作區開啟 PDF。',
        '選擇壓縮設定。',
        '執行壓縮並查看結果大小。',
        '儲存壓縮後的 PDF。',
      ],
      localProcessing: '工具資源載入後，壓縮在裝置上進行，PDF 不會上傳至 Sign X PDF 伺服器作壓縮。',
      limitations: [
        '可縮減的幅度視內容而定（掃描影像與文字 PDF 不同）。',
        '高強度壓縮可能降低 PDF 內圖片的視覺質素。',
      ],
      faq: [
        {
          question: '一定能達到目標大小嗎？',
          answer: '不一定。影像為主的掃描檔與文字 PDF 壓縮效果不同。工具會顯示實際達到的大小。',
        },
        {
          question: '壓縮時會上傳 PDF 嗎？',
          answer: '不會。壓縮設計為在瀏覽器本機執行。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'reorder-pdf', label: '重新排列頁面' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'compress',
    },
    'reorder-pdf': {
      slug: 'reorder-pdf',
      pathSegment: 'reorder-pdf',
      title: '在瀏覽器重新排列 PDF 頁面 | Sign X PDF',
      description:
        '在瀏覽器調整 PDF 頁面次序。重排在本機進行，檔案不會上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器重新排列 PDF 頁面',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器直接重新排列 PDF 頁面。檔案在本機處理，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存更新後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '開啟 PDF，拖曳或移動頁面至所需次序，然後匯出更新後的文件。',
      howTo: [
        '在工作區載入 PDF。',
        '將頁面拖曳至所需次序。',
        '檢查頁面順序。',
        '儲存更新後的 PDF。',
      ],
      localProcessing: '頁面重排在資源載入後，以瀏覽器內的用戶端 PDF 工具完成。',
      limitations: [
        '極多頁的文件產生縮圖時可能較慢。',
        '受密碼保護的 PDF 可能需要先解鎖。',
      ],
      faq: [
        {
          question: '合併檔案後可以再重排嗎？',
          answer: '可以。先合併或加入頁面，儲存前再調整次序。',
        },
      ],
      related: [
        { pathSegment: 'merge-pdf', label: '合併 PDF' },
        { pathSegment: 'delete-pdf-pages', label: '刪除頁面' },
        { pathSegment: 'privacy', label: '私隱' },
        { pathSegment: 'guides/how-browser-pdf-tools-work', label: '瀏覽器 PDF 工具如何運作' },
      ],
      ogLocale: 'zh_HK',
      toolKind: 'tools',
      toolsFocus: 'reorder',
    },
    'delete-pdf-pages': {
      slug: 'delete-pdf-pages',
      pathSegment: 'delete-pdf-pages',
      title: '在瀏覽器本機刪除 PDF 頁面 — 不需上傳 | Sign X PDF',
      description:
        '在瀏覽器移除不需要的 PDF 頁面。刪除在本機執行，毋須將 PDF 上傳至 Sign X PDF 伺服器。',
      h1: '在瀏覽器刪除 PDF 頁面',
      answerFirst:
        '使用 Sign X PDF 在瀏覽器從 PDF 移除頁面。處理留在你的裝置上，而不是上傳到 Sign X PDF 伺服器。無需帳戶。完成後儲存更新後的 PDF。',
      privacyNote: 'PDF 檔案在你的瀏覽器本機處理，不會上傳至 Sign X PDF 的伺服器。',
      whatItDoes: '開啟 PDF，選擇要移除的頁面，確認剩餘頁面，再匯出不含那些頁面的新檔案。',
      howTo: [
        '在工作區載入 PDF。',
        '選擇要刪除的頁面。',
        '確認剩餘頁面正確。',
        '儲存更新後的 PDF。',
      ],
      localProcessing: '刪除頁面在工具載入後，以瀏覽器內的用戶端程式庫完成。',
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
