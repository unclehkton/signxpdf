import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const deBundle: LocaleBundle = buildWave1Bundle('de', {
  htmlLang: 'de',
  ogLocale: 'de_DE',
  nav: {
    home: 'Startseite',
    sign: 'PDF signieren',
    tools: 'PDF-Tools',
    privacy: 'Datenschutz',
    guides: 'Anleitungen',
    openTool: 'Dieses Tool im Browser nutzen',
    relatedTools: 'Verwandte Seiten',
    howTo: 'So funktioniert’s',
    whatItDoes: 'Was dieses Tool macht',
    localProcessing: 'Wie die lokale Verarbeitung funktioniert',
    limitations: 'Einschränkungen',
    faq: 'Häufige Fragen',
    enableJs:
      'Aktivieren Sie JavaScript, um PDFs lokal im Browser zu bearbeiten. Nach dem Laden der Seitenressourcen ist kein Upload nötig.',
    published: 'Veröffentlicht',
    updated: 'Zuletzt aktualisiert',
    verified: 'Zuletzt geprüft',
    howWeVerified: 'So haben wir es geprüft',
  },
  home: {
    title: 'Private PDF-Tools — Signieren, zusammenfügen & komprimieren | Sign X PDF',
    description:
      'Signieren, zusammenfügen, komprimieren, neu ordnen und PDF-Seiten löschen im Browser. Das PDF wird auf Ihrem Gerät verarbeitet — nicht an Sign-X-PDF-Server hochgeladen.',
    h1: 'PDFs privat im Browser signieren und bearbeiten',
    answerFirst:
      'Mit Sign X PDF fügen Sie eine sichtbare Unterschrift hinzu und erledigen gängige PDF-Operationen direkt im Browser. Die Datei wird auf Ihrem Gerät verarbeitet und nicht an die Server von Sign X PDF hochgeladen. Kein Konto nötig. Anschließend speichern Sie die aktualisierte PDF auf Ihrem Gerät.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF hochgeladen. Wie bei jeder Website laden gewöhnliche Seitenressourcen (HTML, Skripte, Schriftarten) weiterhin über das Netz.',
    whatItDoes:
      'Wählen Sie ein Tool zum Signieren, Zusammenfügen, Komprimieren, Neuordnen oder Löschen von Seiten. Jede Tool-Seite erklärt den Ablauf und lädt den Editor erst, wenn Sie ihn nutzen.',
    howTo: [
      'Wählen Sie ein Tool, z. B. PDF signieren oder PDFs zusammenfügen.',
      'Öffnen Sie die Datei über den Dateiauswahl-Dialog (oder per Drag-and-drop, falls verfügbar).',
      'Schließen Sie die Bearbeitung im Browser ab.',
      'Speichern Sie das Ergebnis auf Ihrem Gerät.',
    ],
    localProcessing:
      'Nach dem Laden der App-Ressourcen laufen Lesen, Darstellung und Export über Browser-APIs und clientseitige Bibliotheken. Das gewählte PDF wird nicht an die Anwendungsserver von Sign X PDF zur Verarbeitung gesendet.',
    limitations: [
      'Zum Bearbeiten ist ein moderner Browser mit JavaScript erforderlich.',
      'Sehr große PDFs können auf speicherarmen Geräten langsamer sein.',
      'Lokale Verarbeitung schützt nicht vor Malware auf dem Gerät oder schädlichen Browser-Erweiterungen.',
    ],
    faq: [
      {
        question: 'Wird meine PDF hochgeladen?',
        answer:
          'Nein. Sign X PDF ist so ausgelegt, dass das gewählte PDF lokal im Browser verarbeitet wird — nicht an Server von Sign X PDF zur Konvertierung oder Speicherung hochgeladen wird.',
      },
      {
        question: 'Brauche ich ein Konto?',
        answer: 'Für die Browser-Tools ist kein Konto erforderlich.',
      },
      {
        question: 'Was passiert, wenn ich fertig bin?',
        answer:
          'Sie speichern die aktualisierte PDF auf Ihrem Gerät. In diesem Ablauf behält Sign X PDF keine serverseitige Kopie Ihrer Datei.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'PDF signieren' },
      { pathSegment: 'merge-pdf', label: 'PDFs zusammenfügen' },
      { pathSegment: 'compress-pdf', label: 'PDF komprimieren' },
      { pathSegment: 'privacy', label: 'Datenschutz' },
    ],
  },
  sign: {
    title: 'PDF im Browser signieren — Sichtbare Unterschrift | Sign X PDF',
    description:
      'Fügen Sie einer PDF im Browser eine sichtbare Unterschrift hinzu. Zeichnen, tippen oder platzieren Sie ein Unterschriftsbild lokal — ohne Upload an Sign-X-PDF-Server.',
    h1: 'Eine PDF im Browser signieren',
    answerFirst:
      'Mit Sign X PDF setzen Sie eine sichtbare Unterschrift direkt im Browser auf eine PDF. Die Datei wird auf Ihrem Gerät verarbeitet, statt an die Server von Sign X PDF hochgeladen zu werden. Kein Konto nötig. Zum Schluss speichern Sie die signierte PDF auf Ihrem Gerät.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF hochgeladen.',
    whatItDoes:
      'Erstellen Sie eine Unterschrift per Zeichnen, Tippen, Bild-Upload oder Kamera (falls verfügbar), platzieren Sie sie auf der Seite und exportieren Sie eine neue PDF.',
    howTo: [
      'Öffnen Sie eine PDF oder ein unterstütztes Bild.',
      'Erstellen oder wählen Sie eine Unterschrift (zeichnen, tippen, Bild oder Kamera).',
      'Platzieren und skalieren Sie die Unterschrift auf der Seite.',
      'Speichern Sie die signierte PDF auf Ihrem Gerät.',
    ],
    localProcessing:
      'Unterschriftenerstellung und PDF-Export laufen nach dem Laden der Seitenressourcen mit clientseitigen Bibliotheken im Browser.',
    limitations: [
      'Es wird eine sichtbare Unterschriftsdarstellung hinzugefügt, keine zertifikatsgestützte kryptografische digitale Signatur.',
      'Es entsteht dadurch allein kein Audit-Trail, keine Identitätsprüfung und keine Rechtsgültigkeitsgarantie.',
      'Verschlüsselte PDFs können vor der Bearbeitung das Öffnungskennwort brauchen.',
    ],
    faq: [
      {
        question: 'Ist das eine zertifikatsgestützte digitale Signatur?',
        answer:
          'Nein. Sign X PDF platziert eine sichtbare Unterschrift (gezeichnet, getippt oder als Bild). Es wendet keine zertifikatsbasierte kryptografische Signatur, kein Zeitstempeln und keine Signaturprüfung an.',
      },
      {
        question: 'Muss die PDF zum Signieren hochgeladen werden?',
        answer:
          'Nein. Das Signieren ist so ausgelegt, dass es lokal im Browser läuft. Gewöhnliche Website-Ressourcen werden weiterhin über das Netz geladen.',
      },
      {
        question: 'Kann ich ein Foto meiner Unterschrift verwenden?',
        answer:
          'Ja. Sie können ein Unterschriftsbild hochladen oder es aufnehmen, wenn der Browser den Kamerazugriff erlaubt.',
      },
      {
        question: 'Ist Zeichnen auf einer PDF dasselbe wie eine digitale Signatur?',
        answer:
          'Nein. Zeichnen setzt eine sichtbare Markierung. Eine zertifikatsgestützte digitale Signatur nutzt Kryptografie und ein digitales Zertifikat. Sign X PDF platziert nur sichtbare Unterschriften.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'PDF-Dateien zusammenfügen' },
      { pathSegment: 'compress-pdf', label: 'PDF komprimieren' },
      { pathSegment: 'reorder-pdf', label: 'Seiten neu ordnen' },
      { pathSegment: 'privacy', label: 'Datenschutz und lokale Verarbeitung' },
    ],
  },
  merge: {
    title: 'PDFs lokal im Browser zusammenfügen — ohne Upload | Sign X PDF',
    description:
      'Mehrere PDFs im Browser zu einer Datei kombinieren. Das Zusammenfügen läuft lokal — Ihre Dateien werden nicht an Sign-X-PDF-Server hochgeladen.',
    h1: 'PDF-Dateien im Browser zusammenfügen',
    answerFirst:
      'Mit Sign X PDF fügen Sie mehrere PDFs im Browser zu einem Dokument zusammen. Die Dateien werden auf Ihrem Gerät verarbeitet, nicht an die Server von Sign X PDF hochgeladen. Kein Konto nötig. Speichern Sie die zusammengefügte PDF, wenn Sie fertig sind.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF hochgeladen.',
    whatItDoes:
      'Laden Sie eine oder mehrere PDFs (und unterstützte Bilder), ordnen Sie Seiten an und exportieren Sie eine kombinierte PDF.',
    howTo: [
      'Öffnen Sie den Bereich zum Zusammenfügen unten.',
      'Fügen Sie die PDF-Dateien hinzu, die Sie kombinieren möchten.',
      'Ordnen Sie Seiten bei Bedarf neu.',
      'Speichern Sie die zusammengefügte PDF auf Ihrem Gerät.',
    ],
    localProcessing:
      'Das Zusammenfügen nutzt clientseitige PDF-Bibliotheken im Browser nach dem Laden der Ressourcen. Die gewählten Dateien werden nicht an Sign-X-PDF-Server zum Zusammenfügen gesendet.',
    limitations: [
      'Browser-Speicherlimits gelten bei sehr großen oder vielen Dateien.',
      'Manche verschlüsselten PDFs benötigen vor dem Zusammenfügen ein Kennwort.',
    ],
    faq: [
      {
        question: 'Kann ich mehr als zwei PDFs zusammenfügen?',
        answer:
          'Ja. Fügen Sie im Arbeitsbereich mehrere Dateien hinzu und exportieren Sie eine kombinierte PDF.',
      },
      {
        question: 'Werden meine Dateien zum Zusammenfügen hochgeladen?',
        answer: 'Nein. Die Zusammenfüge-Verarbeitung ist so ausgelegt, dass sie im Browser bleibt.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'PDF-Seiten neu ordnen' },
      { pathSegment: 'delete-pdf-pages', label: 'PDF-Seiten löschen' },
      { pathSegment: 'compress-pdf', label: 'PDF komprimieren' },
      { pathSegment: 'privacy', label: 'Datenschutz' },
    ],
  },
  compress: {
    title: 'PDF im Browser komprimieren | Sign X PDF',
    description:
      'PDF-Dateigröße im Browser verringern. Die Komprimierung läuft lokal, ohne Upload Ihrer PDF an Sign-X-PDF-Server.',
    h1: 'Eine PDF im Browser komprimieren',
    answerFirst:
      'Komprimieren Sie eine PDF direkt im Browser mit Sign X PDF. Die Verarbeitung bleibt auf Ihrem Gerät, statt die Datei an die Server von Sign X PDF hochzuladen. Kein Konto nötig. Speichern Sie die kleinere PDF, wenn Sie fertig sind.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF hochgeladen.',
    whatItDoes:
      'Laden Sie eine PDF, wählen Sie bei Bedarf eine Zielgröße, führen Sie die Komprimierung im Browser aus und speichern Sie das Ergebnis.',
    howTo: [
      'Öffnen Sie eine PDF im Arbeitsbereich.',
      'Wählen Sie die Komprimierungseinstellungen.',
      'Starten Sie die Komprimierung und prüfen Sie die erreichte Größe.',
      'Speichern Sie die komprimierte PDF.',
    ],
    localProcessing:
      'Die Komprimierung nutzt On-Device-Verarbeitung nach dem Laden der Tool-Ressourcen. Das PDF wird nicht an Sign-X-PDF-Server zur Komprimierung hochgeladen.',
    limitations: [
      'Wie klein eine Datei wird, hängt vom Inhalt ab (Scans versus Text).',
      'Starke Komprimierung kann die Bildqualität in der PDF mindern.',
    ],
    faq: [
      {
        question: 'Erreicht die Komprimierung immer die gewünschte Größe?',
        answer:
          'Nicht immer. Bildreiche Scans komprimieren sich anders als Text-PDFs. Das Tool zeigt die erzielte Größe an.',
      },
      {
        question: 'Wird die PDF zur Komprimierung hochgeladen?',
        answer: 'Nein. Die Komprimierung ist so ausgelegt, dass sie lokal im Browser läuft.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'PDFs zusammenfügen' },
      { pathSegment: 'reorder-pdf', label: 'Seiten neu ordnen' },
      { pathSegment: 'sign-pdf', label: 'PDF signieren' },
      { pathSegment: 'privacy', label: 'Datenschutz' },
    ],
  },
  reorder: {
    title: 'PDF-Seiten im Browser neu ordnen | Sign X PDF',
    description:
      'Reihenfolge der PDF-Seiten im Browser ändern. Das Neuordnen ist lokal — Dateien werden nicht an Sign-X-PDF-Server hochgeladen.',
    h1: 'PDF-Seiten im Browser neu ordnen',
    answerFirst:
      'Ordnen Sie PDF-Seiten direkt im Browser mit Sign X PDF neu. Die Datei wird lokal verarbeitet, nicht an die Server von Sign X PDF hochgeladen. Kein Konto nötig. Speichern Sie die neu geordnete PDF, wenn Sie fertig sind.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF hochgeladen.',
    whatItDoes:
      'Öffnen Sie eine PDF, ziehen oder verschieben Sie Seiten in die gewünschte Reihenfolge und exportieren Sie das aktualisierte Dokument.',
    howTo: [
      'Laden Sie eine PDF im Arbeitsbereich.',
      'Ziehen Sie Seiten in die gewünschte Reihenfolge.',
      'Prüfen Sie die Seitenfolge.',
      'Speichern Sie die aktualisierte PDF.',
    ],
    localProcessing:
      'Das Neuordnen der Seiten erfolgt mit clientseitigen PDF-Tools im Browser nach dem Laden der Ressourcen.',
    limitations: [
      'Sehr große Dokumente können beim Rendern von Vorschaubildern langsamer sein.',
      'Kennwortgeschützte PDFs müssen möglicherweise zuerst entsperrt werden.',
    ],
    faq: [
      {
        question: 'Kann ich nach dem Zusammenfügen neu ordnen?',
        answer:
          'Ja. Fügen Sie zuerst zusammen oder fügen Sie Seiten hinzu, und ordnen Sie vor dem Speichern neu.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'PDFs zusammenfügen' },
      { pathSegment: 'delete-pdf-pages', label: 'Seiten löschen' },
      { pathSegment: 'compress-pdf', label: 'PDF komprimieren' },
      { pathSegment: 'privacy', label: 'Datenschutz' },
    ],
  },
  deletePages: {
    title: 'PDF-Seiten lokal im Browser löschen — ohne Upload | Sign X PDF',
    description:
      'Unerwünschte PDF-Seiten im Browser entfernen. Das Löschen läuft lokal, ohne Upload Ihrer PDF an Sign-X-PDF-Server.',
    h1: 'PDF-Seiten im Browser löschen',
    answerFirst:
      'Entfernen Sie Seiten aus einer PDF im Browser mit Sign X PDF. Die Verarbeitung bleibt auf Ihrem Gerät, statt die Datei an die Server von Sign X PDF hochzuladen. Kein Konto nötig. Speichern Sie die aktualisierte PDF, wenn Sie fertig sind.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF hochgeladen.',
    whatItDoes:
      'Öffnen Sie eine PDF, wählen Sie zu entfernende Seiten, prüfen Sie den Rest und exportieren Sie eine neue Datei ohne diese Seiten.',
    howTo: [
      'Laden Sie eine PDF im Arbeitsbereich.',
      'Wählen Sie die zu löschenden Seiten.',
      'Prüfen Sie, ob die verbleibenden Seiten stimmen.',
      'Speichern Sie die aktualisierte PDF.',
    ],
    localProcessing:
      'Das Löschen von Seiten erfolgt mit clientseitigen Bibliotheken im Browser, nachdem das Tool geladen ist.',
    limitations: [
      'Gelöschte Seiten lassen sich aus der exportierten Datei nicht wiederherstellen.',
      'Manche verschlüsselten PDFs benötigen vor Änderungen an den Seiten ein Kennwort.',
    ],
    faq: [
      {
        question: 'Kann ich mehrere Seiten auf einmal löschen?',
        answer:
          'Ja. Wählen Sie im Seitenmanager mehrere Seiten und entfernen Sie sie vor dem Speichern.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Seiten neu ordnen' },
      { pathSegment: 'merge-pdf', label: 'PDFs zusammenfügen' },
      { pathSegment: 'compress-pdf', label: 'PDF komprimieren' },
      { pathSegment: 'privacy', label: 'Datenschutz' },
    ],
  },
  privacy: {
    title: 'Datenschutz — Lokale PDF-Verarbeitung | Sign X PDF',
    description:
      'Wie Sign X PDF PDFs im Browser verarbeitet, ohne das Dokument für die Tool-Verarbeitung hochzuladen, wie Sie private PDF-Tools bewerten und was wir nicht behaupten.',
    h1: 'Datenschutz und lokale PDF-Verarbeitung',
    answerFirst:
      'Sign X PDF ist so gebaut, dass das gewählte PDF beim Signieren und bei gängigen PDF-Bearbeitungen im Browser gelesen und verarbeitet wird. Diese PDF wird dafür nicht an die Server von Sign X PDF hochgeladen. Normale Website-Ressourcen laden weiterhin über das Netz. Für diese Browser-Tools ist kein Konto erforderlich.',
    privacyNote:
      'Ihr PDF wird lokal im Browser verarbeitet und nicht an die Server von Sign X PDF für die Tool-Verarbeitung hochgeladen.',
    whatItDoes:
      'Diese Seite erklärt das Datenschutzmodell der Sign-X-PDF-Browser-Tools, wie sich lokale Verarbeitung von Upload-basierten Online-PDF-Seiten unterscheidet, und eine praktische Checkliste zur Bewertung jedes PDF-Editors, dem Sie vertrauliche Dateien anvertrauen.',
    howTo: [
      'Anwendungs-HTML, JavaScript, Schriftarten und WASM-Ressourcen laden wie bei jeder Website.',
      'Sie wählen eine PDF über den Browser-Dateidialog oder per Drag-and-drop (der Browser behält eine lokale Dateireferenz).',
      'Die Datei wird mit Browser-APIs gelesen und auf dem Gerät mit Client-Bibliotheken und — wo genutzt — WebAssembly verarbeitet.',
      'Sie speichern die Ausgabedatei auf Ihrem Gerät; der Ablauf ist nicht dafür ausgelegt, eine serverseitige Kopie Ihrer PDF zu behalten.',
    ],
    localProcessing:
      'Lokale Verarbeitung he…29714 tokens truncated…리만으로 기기의 악성코드나 악성 브라우저 확장 프로그램으로부터 보호되지는 않습니다.',
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
      '일반 사이트 리소스는 항상 다운로드됩니다. 사이트와 도구를 기기에서 한 번 불러와 캐시된 상태를 확인하기 전에는 오프라인 사용을 보장하지 않습니다.',
      '향후 네트워크 업로드가 필요한 기능이 있다면 명시적 설계 변경과 문구 업데이트가 필요합니다.',
    ],
    faq: [
      {
        question: '데이터가 기기 밖으로 나가나요?',
        answer:
          '사이트 리소스는 정상적으로 다운로드됩니다. 선택한 PDF는 처리를 위해 브라우저에 남도록 의도되어 있습니다. OS나 확장 프로그램 등 앱 밖의 동작을 포함해 “어떤 경우에도 파일 데이터가 기기를 떠나지 않는다”고 주장하지 않습니다.',
      },
      {
        question: 'PDF를 서버에 저장하나요?',
        answer:
          '여기에 설명된 브라우저 도구는 저장이나 변환을 위해 PDF를 Sign X PDF 서버에 업로드하도록 설계되지 않았습니다.',
      },
      {
        question: "Sign X PDF는 어떤 브라우저 저장소를 사용하나요?",
        answer:
          "localStorage는 언어 설정과 내보내기 제한 창을 저장합니다. IndexedDB는 보관한 서명을 저장합니다. 핵심 PDF 처리에는 광고 목적의 자사 쿠키가 필요하지 않습니다. 사이트 데이터를 지우면 해당 로컬 항목이 제거됩니다.",
      },
      {
        question: '계정이 필요한가요?',
        answer: '이 사이트에 설명된 브라우저 서명 및 PDF 도구를 사용하는 데 계정이 필요하지 않습니다.',
      },
      {
        question: '온라인 PDF 편집기가 안전한지 어떻게 판단하나요?',
        answer:
          '처리 방식(업로드 vs 기기 내), 보관 정책, 계정 필요 여부, 사용 데이터 수집 공개, 서명이 화면에 보이는 표시인지 인증서 기반인지, 확인할 수 있는 오픈소스 구성 요소, 실무적인 파일 크기 제한을 확인하세요. 고유한 이름의 테스트 파일로 브라우저 네트워크 도구를 사용해 주장을 검증하는 것이 좋습니다.',
      },
      {
        question: 'Sign X PDF가 자동으로 가장 안전한 선택인가요?',
        answer:
          '사용 환경과 위험 수준에 따라 가장 안전한 도구는 달라집니다. Sign X PDF는 기기에서 PDF를 처리하고 한계를 분명히 밝히는 것을 목표로 합니다. 광고 문구가 아니라 기준으로 비교하고, 본인 사용 사례에서 네트워크 동작을 다시 확인하세요.',
      },
      {
        question: '오픈소스 구성 요소를 확인할 수 있나요?',
        answer:
          '네. QPDF, pdf-lib 등 라이브러리의 라이선스 고지는 오픈소스 라이선스 페이지에 안내되어 있습니다.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'PDF 서명' },
      { pathSegment: 'merge-pdf', label: 'PDF 병합' },
      { pathSegment: 'open-source-licences', label: '오픈소스 라이선스' },
      { pathSegment: '', label: '모든 도구' },
    ],
  },
});
