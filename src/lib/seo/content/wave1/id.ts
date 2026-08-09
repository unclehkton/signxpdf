import type { LocaleBundle } from '../../types';
import { buildWave1Bundle } from './build';

export const idBundle: LocaleBundle = buildWave1Bundle('id', {
  htmlLang: 'id',
  ogLocale: 'id_ID',
  nav: {
    home: 'Beranda',
    sign: 'Tanda tangani PDF',
    tools: 'Alat PDF',
    privacy: 'Privasi',
    guides: 'Panduan',
    openTool: 'Gunakan alat ini di browser',
    relatedTools: 'Halaman terkait',
    howTo: 'Cara menggunakannya',
    whatItDoes: 'Apa yang dilakukan alat ini',
    localProcessing: 'Cara kerja pemrosesan lokal',
    limitations: 'Batasan',
    faq: 'Pertanyaan umum',
    enableJs:
      'Aktifkan JavaScript untuk mengedit PDF secara lokal di browser. Setelah aset halaman dimuat, unggahan tidak diperlukan.',
    published: 'Dipublikasikan',
    updated: 'Terakhir diperbarui',
    verified: 'Terakhir diverifikasi',
    howWeVerified: 'Cara kami memverifikasi',
  },
  home: {
    title: 'Alat PDF Privat — Tanda Tangan, Gabung & Kompres | Sign X PDF',
    description:
      'Tanda tangani, gabung, kompres, urutkan ulang, dan hapus halaman PDF di browser. PDF diproses di perangkat Anda, bukan diunggah ke server Sign X PDF.',
    h1: 'Tanda tangani dan edit PDF secara privat di browser',
    answerFirst:
      'Sign X PDF memungkinkan Anda menambahkan tanda tangan terlihat dan melakukan operasi PDF umum langsung di browser. PDF diproses di perangkat Anda, bukan diunggah ke server Sign X PDF. Tidak perlu akun. Setelah selesai, simpan file yang sudah diperbarui ke perangkat Anda.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF. Aset situs biasa (HTML, skrip, font) tetap dimuat dari jaringan seperti situs web pada umumnya.',
    whatItDoes:
      'Pilih alat yang sesuai untuk menandatangani, menggabungkan, mengompres, mengurutkan ulang halaman, atau menghapus halaman. Setiap halaman alat menjelaskan alurnya dan memuat editor saat Anda menggunakannya.',
    howTo: [
      'Pilih alat seperti Tanda tangani PDF atau Gabung PDF.',
      'Buka file lewat pemilih file di halaman (atau seret dan lepas jika tersedia).',
      'Selesaikan suntingan di browser.',
      'Simpan hasilnya ke perangkat Anda.',
    ],
    localProcessing:
      'Setelah aset aplikasi dimuat, pembacaan file, rendering, dan ekspor memakai API browser serta pustaka sisi klien. PDF yang dipilih tidak dikirim ke server aplikasi Sign X PDF untuk diproses.',
    limitations: [
      'Browser modern dengan JavaScript diperlukan untuk mengedit.',
      'PDF yang sangat besar bisa lebih lambat di perangkat ber-memori rendah.',
      'Pemrosesan lokal tidak melindungi dari malware di perangkat atau ekstensi browser berbahaya.',
    ],
    faq: [
      {
        question: 'Apakah PDF saya diunggah?',
        answer:
          'Tidak. Sign X PDF dirancang agar PDF yang dipilih diproses secara lokal di browser, bukan diunggah ke server Sign X PDF untuk konversi atau penyimpanan.',
      },
      {
        question: 'Apakah saya perlu akun?',
        answer: 'Tidak perlu akun untuk memakai alat browser.',
      },
      {
        question: 'Apa yang terjadi setelah saya selesai?',
        answer:
          'Anda menyimpan PDF yang diperbarui ke perangkat. Alur ini tidak menyimpan salinan file di sisi server.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Tanda tangani PDF' },
      { pathSegment: 'merge-pdf', label: 'Gabung PDF' },
      { pathSegment: 'compress-pdf', label: 'Kompres PDF' },
      { pathSegment: 'privacy', label: 'Privasi' },
    ],
  },
  sign: {
    title: 'Tanda Tangani PDF di Browser — Tanda Tangan Terlihat | Sign X PDF',
    description:
      'Tambahkan tanda tangan terlihat ke PDF di browser. Gambar, ketik, atau tempatkan gambar tanda tangan secara lokal — tanpa mengunggah PDF ke server Sign X PDF.',
    h1: 'Tanda tangani PDF di browser',
    answerFirst:
      'Sign X PDF memungkinkan Anda menambahkan tanda tangan terlihat ke PDF langsung di browser. PDF diproses secara lokal di perangkat, bukan diunggah ke server Sign X PDF. Tidak perlu akun. Setelah selesai, simpan PDF yang sudah ditandatangani ke perangkat Anda.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF.',
    whatItDoes:
      'Buat tanda tangan dengan menggambar, mengetik, mengunggah gambar, atau memakai kamera jika tersedia, lalu tempatkan di halaman dan ekspor PDF baru.',
    howTo: [
      'Buka PDF atau gambar yang didukung.',
      'Buat atau pilih tanda tangan (gambar, ketik, unggah, atau kamera).',
      'Tempatkan dan sesuaikan ukuran tanda tangan di halaman.',
      'Simpan PDF yang ditandatangani ke perangkat Anda.',
    ],
    localProcessing:
      'Pembuatan tanda tangan dan ekspor PDF dijalankan dengan pustaka sisi klien di browser setelah aset halaman dimuat.',
    limitations: [
      'Ini menambahkan tampilan tanda tangan terlihat, bukan tanda tangan digital kriptografis berbasis sertifikat.',
      'Tidak membuat jejak audit, verifikasi identitas, atau jaminan keabsahan hukum dengan sendirinya.',
      'PDF terenkripsi mungkin memerlukan kata sandi buka sebelum diedit.',
    ],
    faq: [
      {
        question: 'Apakah ini tanda tangan digital berbasis sertifikat?',
        answer:
          'Tidak. Sign X PDF menempatkan tanda tangan terlihat (digambar, diketik, atau gambar). Tidak menerapkan penandatanganan kriptografis berbasis sertifikat, stempel waktu, atau verifikasi tanda tangan.',
      },
      {
        question: 'Apakah PDF diunggah untuk ditandatangani?',
        answer:
          'Tidak. Penandatanganan dirancang berjalan secara lokal di browser. Aset situs biasa tetap diunduh lewat jaringan.',
      },
      {
        question: 'Bisakah saya memakai foto tanda tangan?',
        answer:
          'Ya. Anda bisa mengunggah gambar tanda tangan atau mengambilnya jika browser mengizinkan akses kamera.',
      },
      {
        question: 'Apakah menggambar di PDF sama dengan tanda tangan digital?',
        answer:
          'Tidak. Menggambar menempatkan tanda terlihat. Tanda tangan digital berbasis sertifikat memakai kriptografi dan sertifikat digital. Sign X PDF hanya menempatkan tanda tangan terlihat.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Gabung file PDF' },
      { pathSegment: 'compress-pdf', label: 'Kompres PDF' },
      { pathSegment: 'privacy', label: 'Privasi dan pemrosesan lokal' },
    ],
  },
  merge: {
    title: 'Gabung File PDF Secara Lokal di Browser — Tanpa Unggah | Sign X PDF',
    description:
      'Gabungkan beberapa PDF menjadi satu file di browser. Penggabungan dilakukan secara lokal — file tidak diunggah ke server Sign X PDF.',
    h1: 'Gabung file PDF di browser',
    answerFirst:
      'Gunakan Sign X PDF untuk menggabungkan beberapa PDF menjadi satu dokumen di browser. File diproses secara lokal di perangkat, bukan diunggah ke server Sign X PDF. Tidak perlu akun. Simpan PDF gabungan setelah selesai.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF.',
    whatItDoes:
      'Muat satu atau lebih PDF (dan gambar yang didukung), atur halaman, lalu ekspor satu PDF gabungan.',
    howTo: [
      'Buka ruang kerja alat gabung di bawah.',
      'Tambahkan file PDF yang ingin digabung.',
      'Urutkan ulang halaman jika perlu.',
      'Simpan PDF gabungan ke perangkat Anda.',
    ],
    localProcessing:
      'Penggabungan memakai pustaka PDF sisi klien di browser setelah aset dimuat. File yang dipilih tidak dikirim ke server Sign X PDF untuk diproses.',
    limitations: [
      'Batas memori browser berlaku untuk file yang sangat besar atau sangat banyak.',
      'Beberapa PDF terenkripsi memerlukan kata sandi sebelum digabung.',
    ],
    faq: [
      {
        question: 'Bisakah menggabungkan lebih dari dua PDF?',
        answer: 'Ya. Tambahkan beberapa file di ruang kerja alat, lalu ekspor satu PDF gabungan.',
      },
      {
        question: 'Apakah file diunggah untuk digabung?',
        answer: 'Tidak. Pemrosesan gabung dirancang tetap di browser.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Urutkan ulang halaman PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Hapus halaman PDF' },
      { pathSegment: 'compress-pdf', label: 'Kompres PDF' },
      { pathSegment: 'privacy', label: 'Privasi' },
    ],
  },
  compress: {
    title: 'Kompres PDF di Browser | Sign X PDF',
    description:
      'Kurangi ukuran file PDF di browser. Kompresi berjalan secara lokal tanpa mengunggah PDF ke server Sign X PDF.',
    h1: 'Kompres PDF di browser',
    answerFirst:
      'Kompres PDF langsung di browser dengan Sign X PDF. Pemrosesan tetap di perangkat, bukan mengunggah file ke server Sign X PDF. Tidak perlu akun. Simpan PDF yang lebih kecil setelah selesai.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF.',
    whatItDoes:
      'Muat PDF, pilih ukuran target jika tersedia, jalankan kompresi di browser, lalu simpan hasilnya.',
    howTo: [
      'Buka PDF di ruang kerja.',
      'Pilih pengaturan kompresi.',
      'Jalankan kompresi dan tinjau ukuran hasil.',
      'Simpan PDF yang dikompres.',
    ],
    localProcessing:
      'Kompresi memakai pemrosesan di perangkat setelah aset alat dimuat. PDF tidak diunggah ke server Sign X PDF untuk dikompres.',
    limitations: [
      'Seberapa kecil file bisa jadi bergantung pada konten (pindaian vs teks).',
      'Kompresi berat bisa menurunkan kualitas visual gambar di dalam PDF.',
    ],
    faq: [
      {
        question: 'Apakah kompresi selalu mencapai ukuran target?',
        answer:
          'Tidak selalu. Pindaian kaya gambar dikompres berbeda dari PDF teks. Alat menampilkan ukuran yang dicapai.',
      },
      {
        question: 'Apakah PDF diunggah untuk dikompres?',
        answer: 'Tidak. Kompresi dirancang berjalan secara lokal di browser.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Gabung PDF' },
      { pathSegment: 'reorder-pdf', label: 'Urutkan ulang halaman' },
      { pathSegment: 'privacy', label: 'Privasi' },
    ],
  },
  reorder: {
    title: 'Urutkan Ulang Halaman PDF di Browser | Sign X PDF',
    description:
      'Susun ulang urutan halaman PDF di browser. Pengurutan ulang bersifat lokal — file tidak diunggah ke server Sign X PDF.',
    h1: 'Urutkan ulang halaman PDF di browser',
    answerFirst:
      'Urutkan ulang halaman PDF langsung di browser dengan Sign X PDF. File diproses secara lokal, bukan diunggah ke server Sign X PDF. Tidak perlu akun. Simpan PDF yang sudah diurutkan setelah selesai.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF.',
    whatItDoes:
      'Buka PDF, seret atau pindahkan halaman ke urutan yang diinginkan, lalu ekspor dokumen yang diperbarui.',
    howTo: [
      'Muat PDF di ruang kerja.',
      'Seret halaman ke urutan yang diinginkan.',
      'Tinjau urutan halaman.',
      'Simpan PDF yang diperbarui.',
    ],
    localProcessing:
      'Pengurutan ulang halaman diterapkan dengan alat PDF sisi klien di browser setelah aset dimuat.',
    limitations: [
      'Dokumen sangat besar bisa lebih lambat dirender sebagai thumbnail.',
      'PDF yang dilindungi kata sandi mungkin perlu dibuka dulu.',
    ],
    faq: [
      {
        question: 'Bisakah mengurutkan ulang setelah menggabung file?',
        answer: 'Ya. Gabungkan atau tambahkan halaman dulu, lalu susun ulang sebelum menyimpan.',
      },
    ],
    related: [
      { pathSegment: 'merge-pdf', label: 'Gabung PDF' },
      { pathSegment: 'delete-pdf-pages', label: 'Hapus halaman' },
      { pathSegment: 'privacy', label: 'Privasi' },
    ],
  },
  deletePages: {
    title: 'Hapus Halaman PDF Secara Lokal di Browser — Tanpa Unggah | Sign X PDF',
    description:
      'Buang halaman PDF yang tidak diinginkan di browser. Penghapusan berjalan secara lokal tanpa mengunggah PDF ke server Sign X PDF.',
    h1: 'Hapus halaman PDF di browser',
    answerFirst:
      'Hapus halaman dari PDF di browser dengan Sign X PDF. Pemrosesan tetap di perangkat, bukan mengunggah file ke server Sign X PDF. Tidak perlu akun. Simpan PDF yang diperbarui setelah selesai.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF.',
    whatItDoes:
      'Buka PDF, pilih halaman yang akan dihapus, pastikan set halaman yang tersisa, lalu ekspor file baru tanpa halaman tersebut.',
    howTo: [
      'Muat PDF di ruang kerja.',
      'Pilih halaman yang akan dihapus.',
      'Pastikan halaman yang tersisa sudah benar.',
      'Simpan PDF yang diperbarui.',
    ],
    localProcessing:
      'Penghapusan halaman dilakukan dengan pustaka sisi klien di browser setelah alat dimuat.',
    limitations: [
      'Halaman yang dihapus tidak dapat dipulihkan dari file yang diekspor.',
      'Beberapa PDF terenkripsi memerlukan kata sandi sebelum halaman diubah.',
    ],
    faq: [
      {
        question: 'Bisakah menghapus beberapa halaman sekaligus?',
        answer: 'Ya. Pilih beberapa halaman di pengelola halaman, lalu hapus sebelum menyimpan.',
      },
    ],
    related: [
      { pathSegment: 'reorder-pdf', label: 'Urutkan ulang halaman' },
      { pathSegment: 'merge-pdf', label: 'Gabung PDF' },
      { pathSegment: 'privacy', label: 'Privasi' },
    ],
  },
  privacy: {
    title: 'Privasi — Pemrosesan PDF Lokal | Sign X PDF',
    description:
      'Cara Sign X PDF memproses PDF di browser tanpa mengunggah dokumen untuk pemrosesan alat, cara menilai alat PDF privat, dan klaim yang tidak kami buat.',
    h1: 'Privasi dan pemrosesan PDF lokal',
    answerFirst:
      'Sign X PDF dibangun agar PDF yang Anda pilih dibaca dan diproses di browser untuk penandatanganan dan suntingan PDF umum. PDF tidak diunggah ke server Sign X PDF untuk pemrosesan itu. Aset situs biasa tetap diunduh lewat jaringan. Tidak perlu akun untuk alat browser ini.',
    privacyNote:
      'PDF Anda diproses secara lokal di browser dan tidak diunggah ke server Sign X PDF untuk pemrosesan alat.',
    whatItDoes:
      'Halaman ini menjelaskan model privasi alat browser Sign X PDF, perbedaan pemrosesan lokal dengan situs PDF online berbasis unggahan, dan daftar periksa praktis untuk menilai editor PDF yang Anda percayai dengan file rahasia.',
    howTo: [
      'HTML, JavaScript, font, dan aset WASM aplikasi diunduh seperti situs web biasa.',
      'Anda memilih PDF lewat pemilih file browser atau seret-lepas (browser menyimpan referensi File lokal).',
      'File dibaca dengan API browser dan diproses di perangkat dengan pustaka klien dan, jika dipakai, WebAssembly.',
      'Anda menyimpan file keluaran ke perangkat; alur ini tidak dirancang menyimpan salinan PDF di server.',
    ],
    localProcessing:
      'Pemrosesan lokal berarti pipeline suntingan berjalan di tab browser memakai kode sisi klien (termasuk rendering bergaya pdf.js, perakitan pdf-lib, dan QPDF WebAssembly untuk operasi tertentu). Itu bukan berarti “tanpa jaringan sama sekali”: skrip dan aset lain tetap dimuat, dan iklan atau analitik pihak ketiga bisa tetap meminta sumber web biasa jika ada di halaman. Byte dokumen untuk alur alat dimaksudkan tetap di tab, bukan di-POST ke server aplikasi Sign X PDF.',
        storageDisclosure: {
      heading: "Penyimpanan browser yang digunakan Sign X PDF",
      storageColumn: "Penyimpanan",
      purposeColumn: "Tujuan",
      rows: [
        {
          storage: "localStorage",
          purpose:
            "Preferensi bahasa dan jendela singkat pembatas ekspor gratis. Ini data first-party situs, bukan cookie iklan.",
        },
        {
          storage: "IndexedDB",
          purpose:
            "Tanda tangan tersimpan yang Anda pilih untuk disimpan di browser ini (termasuk blob gambar) agar bisa dipakai lagi.",
        },
        {
          storage: "Cookies",
          purpose:
            "Pemrosesan PDF inti tidak memerlukan cookie iklan first-party. Iklan atau analitik pihak ketiga, jika ada, dapat memasang cookie menurut kebijakan mereka.",
        },
      ],
      clearNote:
        "Menghapus data situs ini di browser menghapus preferensi dan tanda tangan lokal. Alur alat tidak menyimpan salinan PDF di server.",
    },
limitations: [
      'Pemrosesan lokal tidak melindungi perangkat yang terkompromi atau ekstensi browser berbahaya.',
      'Kami tidak mengklaim privasi tingkat militer, anonimitas penuh, telemetri nol di setiap lingkungan browser, atau risiko nol.',
      'Aset situs biasa selalu diunduh; penggunaan offline tidak dijamin sampai Anda memverifikasi muatan hangat di perangkat Anda.',
      'Jika fitur di masa depan memerlukan unggahan jaringan, itu butuh perubahan desain yang eksplisit dan pembaruan teks.',
    ],
    faq: [
      {
        question: 'Apakah ada data yang keluar dari perangkat saya?',
        answer:
          'Aset situs diunduh seperti biasa. PDF yang dipilih dimaksudkan tetap di browser untuk diproses. Kami tidak mengklaim bahwa tidak ada byte yang pernah meninggalkan perangkat dalam keadaan apa pun (misalnya perilaku OS atau ekstensi di luar aplikasi).',
      },
      {
        question: 'Apakah Anda menyimpan PDF saya di server?',
        answer:
          'Alat browser yang dijelaskan di sini tidak dirancang untuk mengunggah PDF ke server Sign X PDF untuk penyimpanan atau konversi.',
      },
      {
        question: "Penyimpanan browser apa yang dipakai Sign X PDF?",
        answer:
          "localStorage menyimpan preferensi bahasa dan jendela batas ekspor. IndexedDB menyimpan tanda tangan yang Anda simpan. Pemrosesan PDF inti tidak memerlukan cookie iklan first-party. Hapus data situs untuk menghapus item lokal itu.",
      },
      {
        question: 'Apakah saya perlu akun?',
        answer: 'Tidak perlu akun untuk memakai alat tanda tangan dan PDF browser yang dijelaskan di situs ini.',
      },
      {
        question: 'Bagaimana cara menilai apakah editor PDF online aman?',
        answer:
          'Utamakan model pemrosesan yang jelas (unggah vs lokal), kebijakan retensi, kebutuhan akun, pengungkapan telemetri, apakah tanda tangan berupa tanda terlihat atau berbasis sertifikat, komponen sumber terbuka yang bisa diperiksa, dan batas file yang realistis. Verifikasi klaim dengan alat Jaringan browser memakai file uji bernama unik.',
      },
      {
        question: 'Apakah Sign X PDF otomatis opsi paling aman?',
        answer:
          'Tidak ada alat yang otomatis paling aman untuk setiap model ancaman. Sign X PDF mengutamakan pemrosesan dokumen lokal dan batasan yang transparan. Bandingkan kriteria—bukan slogan—dan periksa lagi perilaku jaringan untuk kasus Anda.',
      },
      {
        question: 'Bisakah saya memeriksa komponen sumber terbuka?',
        answer:
          'Ya. Pemberitahuan lisensi untuk QPDF, pdf-lib, dan pustaka lain tercantum di halaman lisensi sumber terbuka.',
      },
    ],
    related: [
      { pathSegment: 'sign-pdf', label: 'Tanda tangani PDF' },
      { pathSegment: 'merge-pdf', label: 'Gabung PDF' },
      { pathSegment: 'open-source-licences', label: 'Lisensi sumber terbuka' },
      { pathSegment: '', label: 'Semua alat' },
    ],
  },
});
