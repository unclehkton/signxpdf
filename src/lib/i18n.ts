import { browser } from "$app/environment";
import { derived, writable, get } from "svelte/store";

export type Locale = "en" | "zh-Hant" | "zh-CN";

type Params = Record<string, string | number>;
type MessageValue = string | ((params: Params) => string);

const messages: Record<Locale, Record<string, MessageValue>> = {
  en: {
    "topbar.tagline":
      "Sign or edit PDFs in your browser. Tool processing is designed to stay on your device.",
    "topbar.remaining": ({ remaining }) => `${remaining}/5 exports left today`,
    "topbar.signPdf": "Sign PDF",
    "topbar.pdfTools": "PDF Tools",
    "locale.english": "English",
    "locale.traditionalChinese": "繁中",
    "locale.simplifiedChinese": "简中",
    "layout.footer": "© Sign X PDF · PDF tool processing is designed to stay in your browser.",
    "layout.privacy": "Privacy",
    "layout.verification": "Verification",
    "layout.about": "About",
    "layout.openSourceLicences": "Open-source licences",
    "layout.offlineReady":
      "Cached assets are ready on this device. Opening and signing local PDFs is designed to stay in the browser rather than upload them to Sign X PDF servers.",
    "layout.offlineSetup":
      "Offline mode is not ready on this device yet. Reconnect once so Sign X PDF can finish caching its PDF tools.",
    "layout.offlineUnsupported":
      "This browser cannot cache Sign X PDF for offline use. Reconnect to open documents here.",
    "password.title": "Password protection",
    "password.signatureWarning":
      "Changing encryption invalidates existing digital signatures on this PDF.",
    "password.unlockHint": "This PDF is encrypted. Enter the open password to unlock it locally.",
    "password.protectHint":
      "Add one password required to open the PDF. Processing stays in your browser.",
    "password.currentPassword": "Current password",
    "password.newPassword": "New password",
    "password.confirmPassword": "Confirm password",
    "password.show": "Show",
    "password.hide": "Hide",
    "password.unlockAction": "Unlock PDF",
    "password.protectAction": "Protect PDF",
    "password.errorEmpty": "Enter a password.",
    "password.errorMismatch": "Password and confirmation do not match.",
    "password.errorIncorrect": "The password is incorrect.",
    "password.errorUnsupported": "This PDF uses unsupported encryption.",
    "password.errorMalformed": "This file is not a valid PDF.",
    "password.errorEngine": "The PDF password engine failed.",
    "password.protectStaged": "Password will be applied when you save the PDF.",
    "password.removeStaged": "Password removal is ready. Save to download the unlocked PDF.",
    "password.unlocked": "PDF unlocked. You can edit pages or save the unlocked file.",
    "password.lockedMeta": "Password required",
    "password.editingUnavailable": "Unlocked for download only",
    "password.editingUnavailableHint":
      "Password was removed successfully. Page editing is unavailable for this file, but you can save the unlocked PDF directly.",
    "licences.pageTitle": "Open-source licences — Sign X PDF",
    "licences.pageDesc":
      "Licence notices for QPDF, pdf-lib, and other libraries used by Sign X PDF.",
    "licences.eyebrow": "Legal",
    "licences.title": "Open-source licences",
    "licences.subtitle":
      "Sign X PDF is built with open-source libraries that run in your browser. Full notices for the pinned revisions used in this release are listed below.",
    "licences.version": "Version / revision:",
    "licences.license": "Licence:",
    "licences.copyright": "Copyright:",
    "licences.source": "Source:",
    "licences.fullNoticesLink": "Download complete third-party notices (full Apache-2.0, NOTICE, IJG, BSD texts)",
    "licences.fullNoticesHeading": "Complete QPDF WebAssembly third-party notices",
    "page.openDocument": "1. Open document",
    "page.openHint": "Open a PDF or image to begin.",
    "page.heroEyebrow": "Sign ·PDF · Safely",
    "page.heroTitle":
      'Sign documents <span class="serif-accent">with quiet</span> confidence.',
    "page.heroLede":
      "Drop in a PDF or image, place your signature, and export. Document bytes are processed in your browser rather than uploaded to Sign X PDF servers for signing.",
    "page.heroTrustDevice": "Browser-local processing",
    "page.heroTrustNoUpload": "No account, no upload",
    "page.heroTrustInput": "PDF & image input",
    "page.proofOfflineTitle": "Offline not guaranteed",
    "page.proofOfflineBody":
      "Offline or airplane-mode use is not guaranteed. Ordinary site assets need a network load; PDF tool processing is designed to stay in the browser tab once the tool has loaded.",
    "page.proofLocalTitle": "Runs in your browser",
    "page.proofLocalBody":
      "PDF tool processing is designed to keep document bytes, signatures, and exports in your browser tab rather than sending them to a Sign X PDF signing server.",
    "page.proofPrivacyTitle": "Privacy-minded by design",
    "page.proofPrivacyBody":
      "No account and no forced document upload for tool processing. It fits contracts, forms, and other sensitive paperwork.",
    "page.seoEyebrow": "Private PDF signing",
    "page.seoTitle":
      "Sign PDF online without upload, straight from your browser",
    "page.seoBody1":
      "Sign X PDF is a browser-based PDF signer for people who want a fast way to add a handwritten signature without sending files to the cloud.",
    "page.seoBody2":
      "Open a PDF or image, create a signature from upload, camera, or drawing, place it on the page, then download the signed PDF locally.",
    "page.seoPointOneTitle": "Works for contracts, forms, and approvals",
    "page.seoPointOneBody":
      "Use it to sign offer letters, consent forms, NDAs, invoices, and other everyday PDFs without leaving the browser.",
    "page.seoPointTwoTitle": "Built for privacy-first workflows",
    "page.seoPointTwoBody":
      "Signature creation, placement, and export are designed to run in the browser, with no account or signing backend required.",
    "page.seoPointThreeTitle": "Offline-ready on returning devices",
    "page.seoPointThreeBody":
      "After the tool has loaded, signing is designed to process the PDF in your browser. Full offline or airplane-mode use is not a promised product mode without a verified offline path.",
    "page.faqEyebrow": "Common questions",
    "page.faqTitle": "FAQ",
    "page.faqUploadQ": "Does Sign X PDF upload my PDF or signature?",
    "page.faqUploadA":
      "Tool processing is designed to handle documents, signatures, and exports locally in your browser rather than sending PDF bytes to a Sign X PDF signing backend. Ordinary site assets still load over the network.",
    "page.faqOfflineQ": "Can I use Sign X PDF in airplane mode?",
    "page.faqOfflineA":
      "Not guaranteed. After the tool loads, PDF processing is designed to stay in the browser, but ordinary site assets may still need the network, and offline use is not a promised product mode.",
    "page.faqInputQ": "What files can I open and sign?",
    "page.faqInputA":
      "You can open PDFs directly, or import browser-supported images and convert them into a one-page PDF before signing.",
    "page.paperTag": "CONTRACT",
    "page.paperSignLabel": "Authorized signature",
    "page.signatures": "2. Signatures",
    "page.addSignature": "+ Add signature",
    "page.signatureLimit":
      "Free plan saves 5 signatures. Delete one to add another.",
    "page.addText": "3. Add text",
    "page.placeTextHint": "Draft text here, then click the page to place it.",
    "page.textContent": "Text",
    "page.textFont": "Font",
    "page.textColor": "Text color",
    "page.textColorPresets": "Text color presets",
    "page.textColorHex": "Text color HEX",
    "page.textColorPreview": "Text color preview",
    "page.textBorder": "Add border",
    "page.borderColor": "Border color",
    "page.borderColorPresets": "Border color presets",
    "page.borderColorHex": "Border color HEX",
    "page.borderColorPreview": "Border color preview",
    "page.borderThickness": "Border thickness",
    "page.hexColorHelp": "Enter a 6-digit HEX color.",
    "page.invalidHexColor": "Enter a 6-digit HEX color like #2563EB.",
    "page.export": "4. Export",
    "page.exporting": "Exporting…",
    "page.saveSignedPdf": "Save signed PDF",
    "page.previousPage": "Previous page",
    "page.nextPage": "Next page",
    "page.pageOf": ({ current, total }) => `Page ${current} of ${total}`,
    "page.zoomLabel": "Preview zoom",
    "page.zoomOut": "Zoom out",
    "page.zoomIn": "Zoom in",
    "page.zoomReset": "Reset zoom",
    "page.closeSignatureDialog": "Close signature dialog",
    "page.uploadUnsupported": "Please upload a PDF or supported image.",
    "page.openDocumentError":
      "This file can't be opened. Try a PDF or a browser-supported image.",
    "page.pickSignatureFirst": "Pick a signature first.",
    "page.placeTextEmpty": "Enter some text before placing it.",
    "page.signatureSizeError":
      "Could not determine this signature size. Try re-saving the signature.",
    "page.dailyLimit": ({ time }) =>
      `Daily limit reached. Try again at ${time}.`,
    "page.saved": "Signed PDF saved.",
    "page.exportFailed": "Export failed. Try a smaller file or fewer pages.",
    "capture.upload": "Upload",
    "capture.camera": "Camera",
    "capture.draw": "Draw",
    "capture.name": "Name",
    "capture.namePlaceholder": "My signature",
    "capture.startOver": "Start over",
    "capture.saveSignature": "Save signature",
    "capture.limitReached": "Free plan saves 5 signatures.",
    "signature.delete": "Delete",
    "signature.empty": "No saved signatures. Add one to get started.",
    "threshold.auto": "Auto threshold",
    "crop.use": "Use this crop",
    "camera.tip":
      "Tip: place your signature on plain white paper in even light.",
    "draw.clear": "Clear",
    "draw.useSignature": "Use signature",
    "overlay.placedSignature": "Placed signature",
    "overlay.resizeSignature": "Resize signature",
    "overlay.rotateSignature": "Rotate signature",
    "overlay.deleteSignature": "Delete signature",
    "overlay.pageNavigation": "PDF page navigation",
    // Tools page
    "tools.pageTitle": "PDF Tools — Sign X PDF",
    "tools.pageDesc":
      "Merge, reorder, delete and compress PDF pages in your browser. No upload required.",
    "tools.eyebrow": "PDF Tools",
    "tools.title":
      "Edit PDFs in your browser. Tool processing is designed to stay on your device.",
    "tools.subtitle": "Merge, reorder, delete and compress — no upload needed.",
    "tools.loadStep": "1 · Load File(s)",
    "tools.chooseFile": "Choose file(s)",
    "tools.chooseHint": "to get started",
    "tools.pageCount": ({ n }) => `${n} pages`,
    "tools.docCount": ({ n }) => `${n} documents loaded`,
    "tools.mergePdf": "+ Merge another file(s)",
    "tools.startOver": "Start over",
    "tools.addText": "2 · Add text",
    "tools.textTargetPage": "Target page",
    "tools.pageOption": ({ n }) => …13436 tokens truncated…of the Modified BSD
        License (see below.)

        **Origin**
        - Clause 2 of the Modified BSD License

3.  You cannot use the name of the IJG or The libjpeg-turbo Project or the
    contributors thereof in advertising, publicity, etc.

    **Origin**
    - IJG License
    - Clause 3 of the Modified BSD License

4.  The IJG and The libjpeg-turbo Project do not warrant libjpeg-turbo to be
    free of defects, nor do we accept any liability for undesirable
    consequences resulting from your use of the software.

    **Origin**
    - IJG License
    - Modified BSD License
    - zlib License


The Modified (3-clause) BSD License
===================================

Copyright (C)2009-2024 D. R. Commander.  All Rights Reserved.<br>
Copyright (C)2015 Viktor Szathmáry.  All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
- Neither the name of the libjpeg-turbo Project nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS",
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.


Why Two Licenses?
=================

The zlib License could have been used instead of the Modified (3-clause) BSD
License, and since the IJG License effectively subsumes the distribution
conditions of the zlib License, this would have effectively placed
libjpeg-turbo binary distributions under the IJG License.  However, the IJG
License specifically refers to the Independent JPEG Group and does not extend
attribution and endorsement protections to other entities.  Thus, it was
desirable to choose a license that granted us the same protections for new code
that were granted to the IJG for code derived from their software.


---- README.ijg (IJG license text) ----
libjpeg-turbo note:  This file has been modified by The libjpeg-turbo Project
to include only information relevant to libjpeg-turbo, to wordsmith certain
sections, and to remove impolitic language that existed in the libjpeg v8
README.  It is included only for reference.  Please see README.md for
information specific to libjpeg-turbo.


The Independent JPEG Group's JPEG software
==========================================

This distribution contains a release of the Independent JPEG Group's free JPEG
software.  You are welcome to redistribute this software and to use it for any
purpose, subject to the conditions under LEGAL ISSUES, below.

This software is the work of Tom Lane, Guido Vollbeding, Philip Gladstone,
Bill Allombert, Jim Boucher, Lee Crocker, Bob Friesenhahn, Ben Jackson,
Julian Minguillon, Luis Ortiz, George Phillips, Davide Rossi, Ge' Weijers,
and other members of the Independent JPEG Group.

IJG is not affiliated with the ISO/IEC JTC1/SC29/WG1 standards committee
(also known as JPEG, together with ITU-T SG16).


DOCUMENTATION ROADMAP
=====================

This file contains the following sections:

OVERVIEW            General description of JPEG and the IJG software.
LEGAL ISSUES        Copyright, lack of warranty, terms of distribution.
REFERENCES          Where to learn more about JPEG.
ARCHIVE LOCATIONS   Where to find newer versions of this software.
FILE FORMAT WARS    Software *not* to get.
TO DO               Plans for future IJG releases.

Other documentation files in the distribution are:

User documentation:
  doc/usage.txt         Usage instructions for cjpeg, djpeg, jpegtran,
                        rdjpgcom, and wrjpgcom.
  doc/*.1               Unix-style man pages for programs (same info as
                        usage.txt).
  doc/wizard.txt        Advanced usage instructions for JPEG wizards only.
  doc/change.log        Version-to-version change highlights.
Programmer and internal documentation:
  doc/libjpeg.txt       How to use the JPEG library in your own programs.
  src/example.c         Sample code for calling the JPEG library.
  doc/structure.txt     Overview of the JPEG library's internal structure.
  doc/coderules.txt     Coding style rules --- please read if you contribute
                        code.

Please read at least usage.txt.  Some information can also be found in the JPEG
FAQ (Frequently Asked Questions) article.  See ARCHIVE LOCATIONS below to find
out where to obtain the FAQ article.

If you want to understand how the JPEG code works, we suggest reading one or
more of the REFERENCES, then looking at the documentation files (in roughly
the order listed) before diving into the code.


OVERVIEW
========

This package contains C software to implement JPEG image encoding, decoding,
and transcoding.  JPEG (pronounced "jay-peg") is a standardized compression
method for full-color and grayscale images.  JPEG's strong suit is compressing
photographic images or other types of images that have smooth color and
brightness transitions between neighboring pixels.  Images with sharp lines or
other abrupt features may not compress well with JPEG, and a higher JPEG
quality may have to be used to avoid visible compression artifacts with such
images.

JPEG is normally lossy, meaning that the output pixels are not necessarily
identical to the input pixels.  However, on photographic content and other
"smooth" images, very good compression ratios can be obtained with no visible
compression artifacts, and extremely high compression ratios are possible if
you are willing to sacrifice image quality (by reducing the "quality" setting
in the compressor.)

This software implements JPEG baseline, extended-sequential, progressive, and
lossless compression processes.  Provision is made for supporting all variants
of these processes, although some uncommon parameter settings aren't
implemented yet.  We have made no provision for supporting the hierarchical
processes defined in the standard.

We provide a set of library routines for reading and writing JPEG image files,
plus two sample applications "cjpeg" and "djpeg", which use the library to
perform conversion between JPEG and some other popular image file formats.
The library is intended to be reused in other applications.

In order to support file conversion and viewing software, we have included
considerable functionality beyond the bare JPEG coding/decoding capability;
for example, the color quantization modules are not strictly part of JPEG
decoding, but they are essential for output to colormapped file formats.  These
extra functions can be compiled out of the library if not required for a
particular application.

We have also included "jpegtran", a utility for lossless transcoding between
different JPEG processes, and "rdjpgcom" and "wrjpgcom", two simple
applications for inserting and extracting textual comments in JFIF files.

The emphasis in designing this software has been on achieving portability and
flexibility, while also making it fast enough to be useful.  In particular,
the software is not intended to be read as a tutorial on JPEG.  (See the
REFERENCES section for introductory material.)  Rather, it is intended to
be reliable, portable, industrial-strength code.  We do not claim to have
achieved that goal in every aspect of the software, but we strive for it.

We welcome the use of this software as a component of commercial products.
No royalty is required, but we do ask for an acknowledgement in product
documentation, as described under LEGAL ISSUES.


LEGAL ISSUES
============

In plain English:

1. We don't promise that this software works.  (But if you find any bugs,
   please let us know!)
2. You can use this software for whatever you want.  You don't have to pay us.
3. You may not pretend that you wrote this software.  If you use it in a
   program, you must acknowledge somewhere in your documentation that
   you've used the IJG code.

In legalese:

The authors make NO WARRANTY or representation, either express or implied,
with respect to this software, its quality, accuracy, merchantability, or
fitness for a particular purpose.  This software is provided "AS IS", and you,
its user, assume the entire risk as to its quality and accuracy.

This software is copyright (C) 1991-2020, Thomas G. Lane, Guido Vollbeding.
All Rights Reserved except as specified below.

Permission is hereby granted to use, copy, modify, and distribute this
software (or portions thereof) for any purpose, without fee, subject to these
conditions:
(1) If any part of the source code for this software is distributed, then this
README file must be included, with this copyright and no-warranty notice
unaltered; and any additions, deletions, or changes to the original files
must be clearly indicated in accompanying documentation.
(2) If only executable code is distributed, then the accompanying
documentation must state that "this software is based in part on the work of
the Independent JPEG Group".
(3) Permission for use of this software is granted only if the user accepts
full responsibility for any undesirable consequences; the authors accept
NO LIABILITY for damages of any kind.

These conditions apply to any software derived from or based on the IJG code,
not just to the unmodified library.  If you use our work, you ought to
acknowledge us.

Permission is NOT granted for the use of any IJG author's name or company name
in advertising or publicity relating to this software or products derived from
it.  This software may be referred to only as "the Independent JPEG Group's
software".

We specifically permit and encourage the use of this software as the basis of
commercial products, provided that all warranty or liability claims are
assumed by the product vendor.


REFERENCES
==========

We recommend reading one or more of these references before trying to
understand the innards of the JPEG software.

The best short technical introduction to the JPEG compression algorithm is
        Wallace, Gregory K.  "The JPEG Still Picture Compression Standard",
        Communications of the ACM, April 1991 (vol. 34 no. 4), pp. 30-44.
(Adjacent articles in that issue discuss MPEG motion picture compression,
applications of JPEG, and related topics.)  If you don't have the CACM issue
handy, a PDF file containing a revised version of Wallace's article is
available at http://www.ijg.org/files/Wallace.JPEG.pdf.  The file (actually
a preprint for an article that appeared in IEEE Trans. Consumer Electronics)
omits the sample images that appeared in CACM, but it includes corrections
and some added material.  Note: the Wallace article is copyright ACM and IEEE,
and it may not be used for commercial purposes.

A somewhat less technical, more leisurely introduction to JPEG can be found in
"The Data Compression Book" by Mark Nelson and Jean-loup Gailly, published by
M&T Books (New York), 2nd ed. 1996, ISBN 1-55851-434-1.  This book provides
good explanations and example C code for a multitude of compression methods
including JPEG.  It is an excellent source if you are comfortable reading C
code but don't know much about data compression in general.  The book's JPEG
sample code is far from industrial-strength, but when you are ready to look
at a full implementation, you've got one here...

The best currently available description of JPEG is the textbook "JPEG Still
Image Data Compression Standard" by William B. Pennebaker and Joan L.
Mitchell, published by Van Nostrand Reinhold, 1993, ISBN 0-442-01272-1.
Price US$59.95, 638 pp.  The book includes the complete text of the ISO JPEG
standards (DIS 10918-1 and draft DIS 10918-2).

The original JPEG standard is divided into two parts, Part 1 being the actual
specification, while Part 2 covers compliance testing methods.  Part 1 is
titled "Digital Compression and Coding of Continuous-tone Still Images,
Part 1: Requirements and guidelines" and has document numbers ISO/IEC IS
10918-1, ITU-T T.81.  Part 2 is titled "Digital Compression and Coding of
Continuous-tone Still Images, Part 2: Compliance testing" and has document
numbers ISO/IEC IS 10918-2, ITU-T T.83.

The JPEG standard does not specify all details of an interchangeable file
format.  For the omitted details, we follow the "JFIF" conventions, revision
1.02.  JFIF version 1 has been adopted as ISO/IEC 10918-5 (05/2013) and
Recommendation ITU-T T.871 (05/2011): Information technology - Digital
compression and coding of continuous-tone still images: JPEG File Interchange
Format (JFIF).  It is available as a free download in PDF file format from
https://www.iso.org/standard/54989.html and http://www.itu.int/rec/T-REC-T.871.
A PDF file of the older JFIF 1.02 specification is available at
http://www.w3.org/Graphics/JPEG/jfif3.pdf.

The TIFF 6.0 file format specification can be obtained from
http://mirrors.ctan.org/graphics/tiff/TIFF6.ps.gz.  The JPEG incorporation
scheme found in the TIFF 6.0 spec of 3-June-92 has a number of serious
problems.  IJG does not recommend use of the TIFF 6.0 design (TIFF Compression
tag 6).  Instead, we recommend the JPEG design proposed by TIFF Technical Note
#2 (Compression tag 7).  Copies of this Note can be obtained from
http://www.ijg.org/files/.  It is expected that the next revision
of the TIFF spec will replace the 6.0 JPEG design with the Note's design.
Although IJG's own code does not support TIFF/JPEG, the free libtiff library
uses our library to implement TIFF/JPEG per the Note.


ARCHIVE LOCATIONS
=================

The "official" archive site for this software is www.ijg.org.
The most recent released version can always be found there in
directory "files".

The JPEG FAQ (Frequently Asked Questions) article is a source of some
general information about JPEG.  It is available at
http://www.faqs.org/faqs/jpeg-faq.


FILE FORMAT COMPATIBILITY
=========================

This software implements ITU T.81 | ISO/IEC 10918 with some extensions from
ITU T.871 | ISO/IEC 10918-5 (JPEG File Interchange Format-- see REFERENCES).
Informally, the term "JPEG image" or "JPEG file" most often refers to JFIF or
a subset thereof, but there are other formats containing the name "JPEG" that
are incompatible with the original JPEG standard or with JFIF (for instance,
JPEG 2000 and JPEG XR).  This software therefore does not support these
formats.  Indeed, one of the original reasons for developing this free software
was to help force convergence on a common, interoperable format standard for
JPEG files.

JFIF is a minimal or "low end" representation.  TIFF/JPEG (TIFF revision 6.0 as
modified by TIFF Technical Note #2) can be used for "high end" applications
that need to record a lot of additional data about an image.


TO DO
=====

Please send bug reports, offers of help, etc. to jpeg-info@jpegclub.org.



================================================================================
4. Emscripten runtime output
================================================================================
Toolchain: Emscripten SDK 3.1.73 (installed outside this repository)
Build flags include -sEMIT_EMSCRIPTEN_LICENSE=1 so the generated qpdf.js glue
carries the Emscripten authors' MIT license header:

/**
 * @license
 * Copyright 2010 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

Emscripten project: https://emscripten.org/
Upstream license reference: https://github.com/emscripten-core/emscripten/blob/main/LICENSE

The Emscripten compiler and system libraries are build-time tools; only the
generated JavaScript/WebAssembly glue and runtime support linked into qpdf.js /
qpdf.wasm ship with the product static assets.
