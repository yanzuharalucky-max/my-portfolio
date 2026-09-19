/**
 * Lucky Yan Zuhara — Portfolio Core Scripts
 * High-Performance Smooth 60 FPS Rendering System
 * Hardware Accelerated & Throttled Event System
 */

// --- Instant Credential PDF Preview Modal Logic ---
function openPdfModal(pdfUrl, titleText) {
  const overlay = document.getElementById('pdf-preview-overlay');
  const frame = document.getElementById('pdfPreviewFrame');
  const titleEl = document.getElementById('pdfModalTitle');
  const openTabBtn = document.getElementById('pdfOpenNewTabBtn');
  const downloadBtn = document.getElementById('pdfDownloadBtn');
  const footerMeta = document.getElementById('pdfFooterMeta');
  const loader = document.getElementById('pdfLoadingIndicator');

  if (overlay && frame) {
    if (titleEl) titleEl.textContent = titleText || 'Pratinjau Dokumen';
    if (openTabBtn) openTabBtn.href = pdfUrl;
    if (downloadBtn) {
      downloadBtn.href = pdfUrl;
      downloadBtn.setAttribute('download', pdfUrl.split('/').pop());
    }
    if (footerMeta) footerMeta.textContent = pdfUrl;

    if (loader) loader.style.display = 'flex';
    frame.onload = function () {
      if (loader) loader.style.display = 'none';
    };

    frame.src = pdfUrl;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
  }
}

function closePdfModal() {
  const overlay = document.getElementById('pdf-preview-overlay');
  const frame = document.getElementById('pdfPreviewFrame');
  const loader = document.getElementById('pdfLoadingIndicator');

  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (frame) {
    // Reset to about:blank to immediately release PDF engine memory
    frame.src = 'about:blank';
  }
  if (loader) {
    loader.style.display = 'none';
  }
  if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
}

// --- System Architecture Modal Logic ---
function openArchModal() {
  const overlay = document.getElementById('arch-preview-overlay');
  if (overlay) {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
  }
}

function closeArchModal() {
  const overlay = document.getElementById('arch-preview-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
  }
}

// --- Modals Logic (Project Preview & CV Peek & Feedback) ---
function openProjectPreview() {
  const overlay = document.getElementById('project-preview-overlay');
  if (overlay) {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
  }
}

function closeProjectPreview() {
  const overlay = document.getElementById('project-preview-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function openCvPeek() {
  const overlay = document.getElementById('cv-peek-overlay');
  if (overlay) {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
  }
}

function closeCvPeek() {
  const overlay = document.getElementById('cv-peek-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

// --- Feedback & Rating Modal Logic ---
let currentRating = 5;
const ratingLabels = [
  '1 Bintang — Perlu Banyak Peningkatan',
  '2 Bintang — Cukup, Ada Masukan',
  '3 Bintang — Baik & Fungsional',
  '4 Bintang — Sangat Bagus & Menarik!',
  '5 Bintang — Luar Biasa & Mengesankan! ⭐'
];

function openFeedbackModal() {
  const overlay = document.getElementById('feedback-overlay');
  if (overlay) {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
  }
}

function closeFeedbackModal() {
  const overlay = document.getElementById('feedback-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function setRating(val) {
  currentRating = val;
  const stars = document.querySelectorAll('#starRating .star-btn');
  stars.forEach((star, idx) => {
    if (idx < val) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
    star.classList.remove('active-hover');
  });
  const descEl = document.getElementById('ratingDesc');
  if (descEl) descEl.textContent = ratingLabels[val - 1] || `${val} Bintang`;
  if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();
}

function highlightStars(val) {
  const stars = document.querySelectorAll('#starRating .star-btn');
  stars.forEach((star, idx) => {
    if (idx < val) {
      star.classList.add('active-hover');
    } else {
      star.classList.remove('active-hover');
    }
  });
  const descEl = document.getElementById('ratingDesc');
  if (descEl) descEl.textContent = ratingLabels[val - 1] || `${val} Bintang`;
}

function resetStarHighlight() {
  const stars = document.querySelectorAll('#starRating .star-btn');
  stars.forEach((star, idx) => {
    star.classList.remove('active-hover');
    if (idx < currentRating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
  const descEl = document.getElementById('ratingDesc');
  if (descEl) descEl.textContent = ratingLabels[currentRating - 1] || `${currentRating} Bintang`;
}

function handleFeedbackSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('feedbackName');
  const msgInput = document.getElementById('feedbackMessage');
  const formView = document.getElementById('feedbackFormView');
  const successView = document.getElementById('feedbackSuccessView');

  const feedbackText = msgInput ? msgInput.value.trim() : '';
  if (!feedbackText) return;

  const senderName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Anonim';
  const starSymbols = '⭐'.repeat(currentRating);

  // Format rapi pesan WhatsApp dengan identitas, rating, dan masukan
  const waText =
    `*EVALUASI & MASUKAN PORTOFOLIO*
----------------------------------------
⭐ *Rating Pengalaman:* ${currentRating} dari 5 Bintang (${starSymbols})
👤 *Nama / Instansi:* ${senderName}
💬 *Kritik, Saran & Kesan:*
"${feedbackText}"
----------------------------------------
_Dikirim via Formulir Masukan Portofolio Lucky Yan Zuhara_`;

  const waNumber = '6289616054765';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  // Buka tautan WhatsApp di tab baru
  window.open(waUrl, '_blank');

  if (typeof window.playMechanicalClick === 'function') window.playMechanicalClick();

  // Tampilkan status notifikasi sukses di modal
  if (formView) formView.style.display = 'none';
  if (successView) successView.style.display = 'flex';

  // Tampilkan toast notifikasi di halaman
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = 'Terima kasih banyak atas penilaian dan masukannya! 🙏';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Tutup modal secara otomatis setelah 2 detik dan kembalikan formulir ke kondisi awal
  setTimeout(() => {
    closeFeedbackModal();
    setTimeout(() => {
      if (formView) {
        const formEl = document.getElementById('feedbackForm');
        if (formEl) formEl.reset();
        formView.style.display = 'block';
      }
      if (successView) successView.style.display = 'none';
      setRating(5);
    }, 400);
  }, 2000);
}

// Bind escape key for modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectPreview();
    closeCvPeek();
    closeFeedbackModal();
    closePdfModal();
    closeArchModal();
  }
});

// --- Multi-Language i18n Data Dictionary ---
const i18n = {
  id: {
    nav_about: "Tentang",
    nav_skills: "Skills",
    nav_projects: "Proyek",
    nav_experience: "Pengalaman",
    nav_contact: "Kontak",

    hero_greeting: 'Halo! Saya <strong class="name-highlight">Lucky Yan Zuhara</strong>',
    hero_status: "Open to Work / Internship",
    hero_title: 'Membangun <span class="gradient-text-elite">Sistem Web Modern</span> yang Skalabel, Cepat, dan Berpusat pada Pengguna.',
    hero_bio: 'Software Engineer &amp; Frontend Developer dengan spesialisasi rekayasa arsitektur web bersih dan performa tinggi. Berpengalaman memimpin delivery platform lelang digital skala produksi, integrasi API sistem data terpusat, serta didukung fondasi jaringan bersertifikasi Cisco CCNA.',
    hero_btn_projects: 'Lihat Proyek',
    hero_btn_cv: 'Unduh CV',
    hero_bento_loc_label: 'LOKASI',
    hero_bento_loc_val: 'Jakarta Barat',
    hero_bento_focus_label: 'FOKUS',
    hero_bento_focus_val: 'Frontend & UI/UX',
    hero_bento_edu_label: 'PENDIDIKAN',
    hero_bento_edu_val: 'S1 Teknik Informatika',

    about_kicker: 'TENTANG SAYA // ENGINEERING PROFILE',
    about_lead: 'Berfokus pada rekayasa antarmuka modern berperforma tinggi, arsitektur terstruktur, dan sistem web siap produksi.',
    about_desc: 'Mahasiswa S1 Teknik Informatika Universitas Pamulang dengan pengalaman nyata merancang dan memimpin pengembangan platform lelang digital end-to-end yang diliput media nasional TangselXpress. Memadukan keahlian frontend interaktif, integrasi RESTful API, publikasi penelitian ilmiah, serta fondasi infrastruktur jaringan bersertifikasi resmi Cisco CCNA.',
    about_badge1: '🚀 End-to-End Delivery',
    about_badge2: '📜 Cisco CCNA Certified',
    about_badge3: '📰 National Press Validated',
    about_pillar1_label: 'PENDIDIKAN RESMI',
    about_pillar1_val: 'S1 Teknik Informatika',
    about_pillar1_desc: 'Universitas Pamulang (Aktif)',
    about_pillar2_label: 'CORE STACK',
    about_pillar2_val: 'Frontend & Backend API',
    about_pillar2_desc: 'JS (ES6+), PHP, Python, MySQL',
    about_pillar3_label: 'STATUS KARIR',
    about_pillar3_val: 'Open to Work / Internship <span class="status-dot" style="margin-left: 6px;"></span>',
    about_pillar3_desc: 'Siap Magang / Kerja',

    skills_label: 'Skill & Teknologi',
    skills_heading: 'Keahlian teknis dan alat yang dikuasai',
    tools_label: 'DATABASE &amp; DEV TOOLS:',
    tech_cpp_tag: 'Sistem & OOP',
    tech_java_tag: 'Aplikasi Inti & Desktop',
    tech_js_tag: 'Logika Dinamis & Asinkron',
    tech_php_tag: 'Sisi Server & Basis Data',
    tech_laravel_tag: 'Framework MVC & REST API',
    tech_html5_tag: 'Arsitektur Semantik',
    tech_css3_tag: 'Responsif Modern & Glassmorphism',
    skills_cred_status: 'VERIFIED CREDENTIAL // 2026',
    skills_cred_title: 'Sertifikasi Cisco CCNA',
    skills_cred_desc: 'CCNA Switching, Routing & Wireless Foundation',
    skills_cred_cert: 'Sertifikat Materi',
    skills_cred_verify: 'Verifikasi Unpam',

    projects_heading: 'Pengalaman Akademik & Proyek',
    proj1_title: 'Platform Lelang Digital Terintegrasi',
    proj1_media: 'Diliput Media: <strong>TangselXpress</strong>',
    proj1_desc: 'Sistem web lelang berbasis langganan dengan integrasi basis data real-time, validasi transaksi aman, dan antarmuka dashboard responsif.',
    proj2_title: 'Sistem Pakar Diagnosa Medis',
    proj2_desc: 'Aplikasi inferensi berbasis aturan (rule-based reasoning) untuk memetakan gejala klinis pasien dan menghasilkan diagnosa awal akurat.',
    proj3_title: 'Keuangan Saku (Manajemen Finansial)',
    proj3_desc: 'Aplikasi pencatatan dan monitoring arus kas interaktif dengan visualisasi pengeluaran dan tata letak responsif adaptif.',

    exp_heading_label: 'Perjalanan Karir & Pendidikan',
    exp_heading_title: 'Pengalaman & Sertifikasi',
    exp1_date: 'Mei 2026 – Juni 2026',
    exp1_desc: 'Merancang dan membangun arsitektur antarmuka sistem lelang digital berbasis web dengan optimasi performa dan alur data responsif.',
    exp2_role: 'Penulis Pertama &amp; Peneliti Utama — Seleno Lelang Digital',
    exp2_company: 'Indonesian Journal of Innovation Multidisipliner Research (Vol. 4 No. 2, 2026)',
    exp2_desc: 'Implementasi Platform Lelang Digital Berbasis Web Dengan Sistem Berlangganan Pada PT Segara Lentera Teknologi (SELENO). Pengujian Black Box 100% valid pada 8 skenario pengujian utama.',
    exp3_verify: 'Lihat Sertifikat ↗',
    exp3_desc: 'Credential ID: <code class="credential-id">161937ce-1479-4d90-aa8b-110c7b3904f5</code> melalui Cisco Networking Academy & Universitas Pamulang.',

    contact_label: 'KONTAK // GET IN TOUCH',
    contact_headline: 'Siap berkolaborasi membangun produk digital masa depan.',
    contact_subtext: 'Terbuka untuk posisi Frontend Engineer, Software Developer (Full-time / Internship), maupun diskusi rekayasa perangkat lunak.',
    contact_copy_action: 'Salin',
    contact_cv_btn: 'Unduh CV Resmi (PDF)',
    contact_status_val: 'STATUS: READY FOR INTERVIEWS & COLLABORATION',
    toast_copied: 'Tersalin ke clipboard!',
    copy_copied: 'Tersalin!'
  },
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",

    hero_greeting: 'Hi! I\'m <strong class="name-highlight">Lucky Yan Zuhara</strong>',
    hero_status: "Available for Roles / Internship",
    hero_title: 'Crafting <span class="gradient-text-elite">Modern Web Systems</span> with Scalability, Speed, and User-Centric Design.',
    hero_bio: 'Software Engineer &amp; Frontend Specialist focused on clean architecture and high-performance web systems. Proven track record in delivering production-ready digital auction platforms, robust API integrations, backed by Cisco CCNA certified networking fundamentals.',
    hero_btn_projects: 'View Projects',
    hero_btn_cv: 'Download CV',
    hero_bento_loc_label: 'LOCATION',
    hero_bento_loc_val: 'West Jakarta',
    hero_bento_focus_label: 'FOCUS',
    hero_bento_focus_val: 'Frontend & UI/UX',
    hero_bento_edu_label: 'EDUCATION',
    hero_bento_edu_val: 'Bachelor of Computer Science',

    about_kicker: 'ABOUT ME // ENGINEERING PROFILE',
    about_lead: 'Focused on high-performance modern web engineering, structured architecture, and production-ready systems.',
    about_desc: 'Undergraduate Informatics Engineering student at Universitas Pamulang with proven hands-on experience designing and leading the end-to-end development of a digital auction platform covered by national media TangselXpress. Combining interactive frontend engineering, RESTful API integration, scientific research publication, and official Cisco CCNA certified network infrastructure foundations.',
    about_badge1: '🚀 End-to-End Delivery',
    about_badge2: '📜 Cisco CCNA Certified',
    about_badge3: '📰 National Press Validated',
    about_pillar1_label: 'FORMAL EDUCATION',
    about_pillar1_val: 'Bachelor of Computer Science',
    about_pillar1_desc: 'Universitas Pamulang (Active)',
    about_pillar2_label: 'CORE STACK',
    about_pillar2_val: 'Frontend & Backend API',
    about_pillar2_desc: 'JS (ES6+), PHP, Python, MySQL',
    about_pillar3_label: 'CAREER STATUS',
    about_pillar3_val: 'Open to Work / Internship <span class="status-dot" style="margin-left: 6px;"></span>',
    about_pillar3_desc: 'Ready for Internship / Work',

    skills_label: 'Skill & Technologies',
    skills_heading: 'Technical skills and technologies mastered',
    tools_label: 'DATABASE &amp; DEV TOOLS:',
    tech_cpp_tag: 'System & OOP',
    tech_java_tag: 'Core & Desktop App',
    tech_js_tag: 'Dynamic & Async Logic',
    tech_php_tag: 'Server-Side & Database',
    tech_laravel_tag: 'MVC Framework & REST API',
    tech_html5_tag: 'Semantic Architecture',
    tech_css3_tag: 'Modern Responsive & Glassmorphism',
    skills_cred_status: 'VERIFIED CREDENTIAL // 2026',
    skills_cred_title: 'Cisco Certified',
    skills_cred_desc: 'CCNA Switching, Routing & Wireless Foundation',
    skills_cred_cert: 'Course Certificate',
    skills_cred_verify: 'University Verification',

    projects_heading: 'Academic Experience & Featured Projects',
    proj1_title: 'Integrated Digital Auction Platform',
    proj1_media: 'Featured on: <strong>TangselXpress</strong>',
    proj1_desc: 'Subscription-based digital auction web system featuring real-time database integration, secure transaction validation, and responsive dashboard interface.',
    proj2_title: 'Medical Diagnosis Expert System',
    proj2_desc: 'Rule-based reasoning inference app designed to map patient clinical symptoms and produce accurate preliminary diagnoses.',
    proj3_title: 'Keuangan Saku (Financial Management)',
    proj3_desc: 'Interactive cash flow tracking and monitoring application with expenditure visualization and adaptive responsive layout.',

    exp_heading_label: 'Career Path & Education',
    exp_heading_title: 'Experience & Certifications',
    exp1_date: 'May 2026 – June 2026',
    exp1_desc: 'Designed and engineered the web interface architecture for a digital auction system with performance optimization and responsive data flow.',
    exp2_role: 'First Author &amp; Lead Researcher — Seleno Digital Auction',
    exp2_company: 'Indonesian Journal of Innovation Multidisipliner Research (Vol. 4 No. 2, 2026)',
    exp2_desc: 'Implementation of Web-Based Digital Auction Platform with Subscription Model at PT Segara Lentera Teknologi (SELENO). Black Box Testing 100% validated across 8 test scenarios.',
    exp3_verify: 'View Certificate ↗',
    exp3_desc: 'Credential ID: <code class="credential-id">161937ce-1479-4d90-aa8b-110c7b3904f5</code> via Cisco Networking Academy & Universitas Pamulang.',

    contact_label: 'CONTACT // GET IN TOUCH',
    contact_headline: 'Ready to collaborate and build future-ready digital products.',
    contact_subtext: 'Open for Frontend Engineer, Software Developer positions (Full-time / Internship), or software engineering discussions.',
    contact_copy_action: 'Copy',
    contact_cv_btn: 'Download Official Resume (PDF)',
    contact_status_val: 'STATUS: READY FOR INTERVIEWS & COLLABORATION',
    toast_copied: 'Copied to clipboard!',
    copy_copied: 'Copied!'
  }
};

let currentLang = localStorage.getItem('preferred_lang') || 'id';

function setLanguage(lang, playSfx = true) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('preferred_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  if (playSfx && typeof window.playMechanicalClick === 'function') {
    window.playMechanicalClick();
  }

  const langBtns = document.querySelectorAll('#lang-toggle .lang-btn');
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => el.classList.add('lang-changing'));

  setTimeout(() => {
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key] !== undefined) {
        el.innerHTML = i18n[lang][key];
      }
      el.classList.remove('lang-changing');
    });
    if (typeof syncNavIndicatorToActive === 'function') {
      syncNavIndicatorToActive();
    }
  }, 100);
}

// --- Theme Switcher System (Dark / Clean Light Mode) ---
const storedTheme = localStorage.getItem('theme_preference');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
let currentTheme = storedTheme || (systemPrefersLight ? 'light' : 'dark');

function setTheme(theme, playSfx = true) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme_preference', theme);

  if (playSfx && typeof window.playMechanicalClick === 'function') {
    window.playMechanicalClick();
  }
}
document.documentElement.setAttribute('data-theme', currentTheme);

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(targetTheme, true);
    });
  }
  setTheme(currentTheme, false);

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    const langBtns = langToggle.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang && targetLang !== currentLang) {
          setLanguage(targetLang, true);
        }
      });
    });
  }
  setLanguage(currentLang, false);
});

// --- Clipboard Utility ---
function copyToClipboard(e, text) {
  if (e) e.preventDefault();

  if (typeof window.playMechanicalClick === 'function') {
    window.playMechanicalClick();
  }

  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = "📋 Alamat email disalin!";
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
    const copyBtn = document.querySelector('.direct-email .card-action');
    if (copyBtn) {
      const originalText = copyBtn.innerHTML;
      const copiedText = i18n[currentLang] ? i18n[currentLang].copy_copied : 'Tersalin!';
      copyBtn.textContent = copiedText;
      copyBtn.style.color = '#05070a';
      copyBtn.style.borderColor = '#22c55e';
      copyBtn.style.background = '#22c55e';
      copyBtn.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.6)';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
        copyBtn.style.background = '';
        copyBtn.style.boxShadow = '';
      }, 2000);
    }
  });
}

// --- Splash Screen & Initial Scroll Reset ---
if (window.location.hash) {
  window.history.replaceState(null, null, window.location.pathname);
}
window.scrollTo(0, 0);

function initSplash() {
  const splash = document.getElementById('splash');
  const counterEl = document.getElementById('splashCounter');
  const barFill = document.querySelector('.hud-fill');
  const splashContent = document.querySelector('.splash-content');

  if (!splash) {
    document.body.classList.remove('prevent-scroll');
    document.body.classList.add('intro-done');
    return;
  }

  function finishSplash() {
    if (!splash) return;
    if (splashContent) splashContent.classList.add('hide');
    splash.classList.add('shutter-open');
    document.body.classList.remove('prevent-scroll');
    document.body.classList.add('intro-done');
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.classList.add('is-visible', 'is-active');
      const heroItems = homeEl.querySelectorAll('.hero-visual, .hero-kicker-group, .hero-status, .greeting-badge, .status-badge, .hero-title, .hero-desc, .hero-cta, .hero-bento-card');
      heroItems.forEach(item => item.classList.add('is-visible'));
    }
    if (typeof updateActiveSlide === 'function') {
      updateActiveSlide();
    }
    setTimeout(() => {
      splash.style.display = 'none';
      splash.style.pointerEvents = 'none';
      splash.style.visibility = 'hidden';
    }, 950);
  }

  // Safety fallback: guarantees scroll is unlocked and splash is dismissed under any condition
  const fallbackTimer = setTimeout(finishSplash, 2600);

  // Trigger staggered lines animation on mount
  setTimeout(() => {
    const lines = document.querySelectorAll('.stagger-line span');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }, 100);

  let progress = 0;
  const totalDuration = 1900;
  const steps = 100;
  const intervalTime = totalDuration / steps;

  const interval = setInterval(() => {
    progress += 1;
    if (progress >= 100) progress = 100;

    if (counterEl) counterEl.textContent = progress.toString().padStart(2, '0') + '%';
    if (barFill) barFill.style.width = progress + '%';

    if (progress === 100) {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      setTimeout(() => {
        if (splashContent) splashContent.classList.add('hide');
        setTimeout(() => {
          finishSplash();
        }, 250);
      }, 80);
    }
  }, intervalTime);
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initSplash);
} else {
  initSplash();
}

// --- Floating Sliding Pill Indicator for Navigation ---
const navLinksContainer = document.querySelector('.nav-links');
const navIndicator = navLinksContainer ? navLinksContainer.querySelector('.nav-indicator') : null;
const navLinks = navLinksContainer ? navLinksContainer.querySelectorAll('.nav-link') : [];
let isHoveringNav = false;

function moveNavIndicator(targetEl) {
  if (!navIndicator) return;
  if (!targetEl) {
    navIndicator.style.opacity = '0';
    return;
  }
  navIndicator.style.opacity = '1';
  navIndicator.style.transform = `translateX(${targetEl.offsetLeft}px)`;
  navIndicator.style.width = `${targetEl.offsetWidth}px`;
}

function syncNavIndicatorToActive() {
  if (!navLinksContainer || !navIndicator || isHoveringNav) return;
  const activeLink = navLinksContainer.querySelector('.nav-link.is-active');
  if (activeLink) {
    moveNavIndicator(activeLink);
  } else {
    navIndicator.style.opacity = '0';
  }
}

if (navLinksContainer && navIndicator) {
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      isHoveringNav = true;
      moveNavIndicator(link);
    });

    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      moveNavIndicator(link);
    });
  });

  navLinksContainer.addEventListener('mouseleave', () => {
    isHoveringNav = false;
    syncNavIndicatorToActive();
  });

  window.addEventListener('resize', () => {
    syncNavIndicatorToActive();
  }, { passive: true });

  window.addEventListener('load', () => {
    setTimeout(syncNavIndicatorToActive, 350);
  });
}

function setActiveNavBySectionId(sectionId) {
  if (!navLinksContainer) return;
  if (sectionId === 'home') {
    navLinks.forEach(l => l.classList.remove('is-active'));
    syncNavIndicatorToActive();
    return;
  }
  const matched = navLinksContainer.querySelector(`a[href="#${sectionId}"]`);
  if (matched) {
    navLinks.forEach(l => l.classList.remove('is-active'));
    matched.classList.add('is-active');
    syncNavIndicatorToActive();
  }
}

// --- Precision Slide Deck & Pagination Tracker (PAGE | 01 - 06) with rAF Throttling ---
const slides = document.querySelectorAll('.slide');
const slideCounter = document.getElementById('slideCounter');
let slideScrollRafPending = false;

function computeActiveSlide() {
  if (!slides.length) return;
  const vh = window.innerHeight;
  let bestSlide = slides[0];
  let bestIndex = 1;
  let maxVisible = -Infinity;

  if (window.scrollY < 100) {
    bestSlide = slides[0];
    bestIndex = 1;
  } else {
    slides.forEach((slide, idx) => {
      const rect = slide.getBoundingClientRect();
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vh, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      if (visibleHeight > maxVisible) {
        maxVisible = visibleHeight;
        bestSlide = slide;
        bestIndex = idx + 1;
      }
    });
  }

  slides.forEach(s => {
    if (s !== bestSlide) {
      s.classList.remove('is-active');
    }
  });
  bestSlide.classList.add('is-active', 'is-visible');

  const sectionId = bestSlide.getAttribute('id');
  if (sectionId) {
    setActiveNavBySectionId(sectionId);
  }
  if (slideCounter) {
    slideCounter.textContent = `PAGE | ${bestIndex.toString().padStart(2, '0')}`;
  }
}

function updateActiveSlide() {
  if (!slideScrollRafPending) {
    slideScrollRafPending = true;
    requestAnimationFrame(() => {
      computeActiveSlide();
      slideScrollRafPending = false;
    });
  }
}

window.addEventListener('scroll', updateActiveSlide, { passive: true });
window.addEventListener('resize', updateActiveSlide, { passive: true });
computeActiveSlide();

// --- Mobile & Desktop Smooth Scroll Reveal Observer ---
const revealSelector = `
  .section-heading,
  .bento-header,
  .bento-visual,
  .bento-narrative,
  .pillar-card,
  .skill-pillar,
  .credential-card,
  .project-card,
  .timeline-content,
  .bento-card,
  .scroll-reveal
`;

const revealElements = document.querySelectorAll(revealSelector);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      const rect = entry.target.getBoundingClientRect();
      if (rect.top > window.innerHeight + 50 || rect.bottom < -50) {
        entry.target.classList.remove('is-visible');
      }
    }
  });
}, {
  root: null,
  threshold: 0.05,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Smooth Anchor Scroll with Header Offset for Mobile & Desktop
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#' || targetId.length <= 1) return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const headerOffset = window.innerWidth <= 768 ? 68 : 0;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const mobileMenuEl = document.getElementById('mobileMenu');
      if (mobileMenuEl && mobileMenuEl.classList.contains('open')) {
        mobileMenuEl.classList.remove('open');
      }
    }
  });
});

// Ensure hero section items are immediately visible on load
const initialHeroItems = document.querySelectorAll('#home .hero-visual, #home .hero-kicker-group, #home .hero-status, #home .greeting-badge, #home .status-badge, #home .hero-title, #home .hero-desc, #home .hero-cta, #home .hero-bento-card, #home');
initialHeroItems.forEach(item => item.classList.add('is-visible'));

// Keyboard Navigation for Snap Scrolling
window.addEventListener('keydown', (e) => {
  if (typeof window.isCommandPaletteOpen === 'function' && window.isCommandPaletteOpen()) {
    return;
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const activeIndex = Array.from(slides).findIndex(s => s.classList.contains('is-active'));
    let targetIndex = activeIndex;
    if (e.key === 'ArrowDown' && activeIndex < slides.length - 1) {
      targetIndex++;
    } else if (e.key === 'ArrowUp' && activeIndex > 0) {
      targetIndex--;
    }
    if (targetIndex !== activeIndex && targetIndex >= 0) {
      slides[targetIndex].scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// ========================================================================
// 1. Optimized Hover Spotlight Effect on Cards (rAF Throttled)
// ========================================================================
const cards = document.querySelectorAll('.project-card, .profile-card, .pillar-card, .skill-panel, .timeline-item, .info-card, .bento-card, .hero-bento-card, .credential-card, .timeline-content, .hero-photo-card, .experience-card, .contact-card');
for (const card of cards) {
  let cardRafPending = false;
  let lastEvent = null;

  card.addEventListener('mousemove', e => {
    lastEvent = e;
    if (!cardRafPending) {
      cardRafPending = true;
      requestAnimationFrame(() => {
        if (lastEvent) {
          const rect = card.getBoundingClientRect();
          const x = lastEvent.clientX - rect.left;
          const y = lastEvent.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
        cardRafPending = false;
      });
    }
  }, { passive: true });
}

// Dynamic Mouse Spotlight Across All Sections (rAF Throttled)
const allSections = document.querySelectorAll('.section');
allSections.forEach(sec => {
  let secRafPending = false;
  let lastSecEvent = null;

  sec.addEventListener('mousemove', (e) => {
    lastSecEvent = e;
    if (!secRafPending) {
      secRafPending = true;
      requestAnimationFrame(() => {
        if (lastSecEvent) {
          const rect = sec.getBoundingClientRect();
          const x = lastSecEvent.clientX - rect.left;
          const y = lastSecEvent.clientY - rect.top;
          sec.style.setProperty('--mouse-x', `${x}px`);
          sec.style.setProperty('--mouse-y', `${y}px`);
        }
        secRafPending = false;
      });
    }
  }, { passive: true });
});

// Hero Interactive Spotlight (rAF Throttled)
const heroSection = document.getElementById('home') || document.getElementById('hero');
const heroGlow = document.querySelector('.hero-glow');
if (heroSection) {
  let heroRafPending = false;
  let lastHeroEvent = null;

  heroSection.addEventListener('mousemove', (e) => {
    lastHeroEvent = e;
    if (!heroRafPending) {
      heroRafPending = true;
      requestAnimationFrame(() => {
        if (lastHeroEvent) {
          const rect = heroSection.getBoundingClientRect();
          const x = lastHeroEvent.clientX - rect.left;
          const y = lastHeroEvent.clientY - rect.top;
          heroSection.style.setProperty('--mouse-x', `${x}px`);
          heroSection.style.setProperty('--mouse-y', `${y}px`);
          if (heroGlow) {
            heroGlow.style.setProperty('--mouse-x', `${x}px`);
            heroGlow.style.setProperty('--mouse-y', `${y}px`);
          }
        }
        heroRafPending = false;
      });
    }
  }, { passive: true });
}

// Marquee Hover & Interactive Slowdown
const techMarquee = document.querySelector('.tech-marquee');
const marqueeTrack = document.querySelector('.marquee-track');
if (techMarquee && marqueeTrack) {
  techMarquee.addEventListener('mouseenter', () => {
    marqueeTrack.classList.add('slowed');
  });
  techMarquee.addEventListener('mouseleave', () => {
    marqueeTrack.classList.remove('slowed');
  });
}

// --- Network Constellation Canvas ---
(function initNetworkBg() {
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const hero = canvas.closest('.hero') || document.getElementById('home');
  let width = 0;
  let height = 0;

  function resize() {
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const mouse = { x: -1000, y: -1000, radius: 130 };
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });
  }

  const particleCount = 35;
  const particles = [];
  const colors = ['rgba(56, 189, 248, 0.75)', 'rgba(255, 255, 255, 0.65)', 'rgba(14, 165, 233, 0.7)'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 600),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  const maxDistance = 110;
  const maxDistanceSq = maxDistance * maxDistance;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < mouse.radius * mouse.radius && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (mouse.radius - dist) / mouse.radius;
        p.x += (dx / dist) * force * 1.6;
        p.y += (dy / dist) * force * 1.6;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      else if (p.x > width) { p.x = width; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      else if (p.y > height) { p.y = height; p.vy *= -1; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const distX = p.x - p2.x;
        const distY = p.y - p2.y;
        const dSq = distX * distX + distY * distY;
        if (dSq < maxDistanceSq) {
          const alpha = (1 - Math.sqrt(dSq) / maxDistance) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();

// --- Magnetic Button Effect on Action Buttons (rAF Throttled) ---
(function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-primary-elite, .btn-secondary-elite');
  const triggerMargin = 25;
  let magRafPending = false;
  let lastMagEvent = null;

  function updateMagnetic() {
    if (!lastMagEvent) {
      magRafPending = false;
      return;
    }
    const e = lastMagEvent;
    magneticBtns.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const isNear = (
        e.clientX >= rect.left - triggerMargin &&
        e.clientX <= rect.right + triggerMargin &&
        e.clientY >= rect.top - triggerMargin &&
        e.clientY <= rect.bottom + triggerMargin
      );

      if (isNear) {
        const pullX = (e.clientX - btnCenterX) * 0.22;
        const pullY = (e.clientY - btnCenterY) * 0.22;
        btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
        btn.style.transition = 'transform 0.1s ease-out';
      } else if (btn.style.transform && btn.style.transform !== '') {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      }
    });
    magRafPending = false;
  }

  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    lastMagEvent = e;
    if (!magRafPending) {
      magRafPending = true;
      requestAnimationFrame(updateMagnetic);
    }
  }, { passive: true });
})();

// Header Scroll Border Effect (Passive Scroll Listening)
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  let headerScrollRafPending = false;
  const handleHeaderScroll = () => {
    if (!headerScrollRafPending) {
      headerScrollRafPending = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 15 || document.documentElement.scrollTop > 15) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
        headerScrollRafPending = false;
      });
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();
}

// 3D Perspective Tilt & Dynamic Glare on Hero Photo Card (rAF Throttled)
(function initHeroPhotoTilt() {
  const heroVisual = document.querySelector('.hero-visual');
  const profileCard = document.querySelector('.hero-photo-card') || document.querySelector('.profile-card-elite');
  const giantText = document.querySelector('.giant-bg-text');

  if (!profileCard) return;

  let cardGlare = profileCard.querySelector('.card-glare');
  if (!cardGlare) {
    cardGlare = document.createElement('div');
    cardGlare.className = 'card-glare';
    profileCard.appendChild(cardGlare);
  }

  const target = heroVisual || profileCard;
  let tiltRafPending = false;
  let lastTiltEvent = null;

  function updateTilt() {
    if (!lastTiltEvent) {
      tiltRafPending = false;
      return;
    }
    const e = lastTiltEvent;
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxDegree = 9;
    const rotateX = ((y - centerY) / centerY) * -maxDegree;
    const rotateY = ((x - centerX) / centerX) * maxDegree;

    profileCard.style.transform = `perspective(1000px) translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    profileCard.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.2), 0 25px 50px -15px rgba(0, 0, 0, 0.8)';
    profileCard.style.transition = 'transform 0.08s ease-out, box-shadow 0.3s ease';

    const glareX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    cardGlare.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
    cardGlare.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
    cardGlare.style.opacity = '1';

    if (giantText && heroVisual) {
      const vRect = heroVisual.getBoundingClientRect();
      const vX = e.clientX - vRect.left;
      const vY = e.clientY - vRect.top;
      const vCenterX = vRect.width / 2;
      const vCenterY = vRect.height / 2;
      const translateX = ((vX - vCenterX) / vCenterX) * -15;
      const translateY = ((vY - vCenterY) / vCenterY) * -15;
      giantText.style.transform = `translate(calc(-50% + ${translateX.toFixed(1)}px), calc(-50% + ${translateY.toFixed(1)}px))`;
      giantText.style.transition = 'none';
    }

    tiltRafPending = false;
  }

  target.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    lastTiltEvent = e;
    if (!tiltRafPending) {
      tiltRafPending = true;
      requestAnimationFrame(updateTilt);
    }
  }, { passive: true });

  target.addEventListener('mouseleave', () => {
    if (window.innerWidth <= 768) return;
    lastTiltEvent = null;
    profileCard.style.transform = '';
    profileCard.style.boxShadow = '';
    profileCard.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease';

    cardGlare.style.opacity = '0';
    cardGlare.style.transition = 'opacity 0.5s ease';

    if (giantText) {
      giantText.style.transform = 'translate(-50%, -50%)';
      giantText.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  });
})();

// 3D Perspective Tilt on About Bento Visual (rAF Throttled)
const bentoVisual = document.querySelector('.bento-visual');
if (bentoVisual) {
  let bentoRafPending = false;
  let lastBentoEvent = null;

  function updateBentoTilt() {
    if (!lastBentoEvent) {
      bentoRafPending = false;
      return;
    }
    const e = lastBentoEvent;
    const rect = bentoVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    bentoVisual.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    bentoVisual.style.setProperty('--glare-x', `${glareX}%`);
    bentoVisual.style.setProperty('--glare-y', `${glareY}%`);
    bentoRafPending = false;
  }

  bentoVisual.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    lastBentoEvent = e;
    if (!bentoRafPending) {
      bentoRafPending = true;
      requestAnimationFrame(updateBentoTilt);
    }
  }, { passive: true });

  bentoVisual.addEventListener('mouseleave', () => {
    lastBentoEvent = null;
    bentoVisual.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    bentoVisual.style.setProperty('--glare-x', '50%');
    bentoVisual.style.setProperty('--glare-y', '50%');
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  for (const link of mobileMenu.querySelectorAll('a')) {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
}

// ========================================================================
// 2. Custom Cyber Cursor & Magnetic Follower (Desktop Only — rAF Throttled)
// ========================================================================
(function initCustomCursor() {
  if (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let isVisible = false;
  let hasMovedFirstTime = false;
  let cursorRafPending = false;

  dot.style.opacity = '0';
  ring.style.opacity = '0';

  function renderCursor() {
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    cursorRafPending = false;
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasMovedFirstTime = true;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    if (!cursorRafPending) {
      cursorRafPending = true;
      requestAnimationFrame(renderCursor);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (hasMovedFirstTime) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  document.addEventListener('mousedown', () => {
    ring.classList.add('cursor-active');
  });

  document.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-active');
  });

  const hoverTargets = 'a, button, .btn, .nav-link, .card, img, .project-card, .bento-card, .pillar-card, .credential-card, .tech-card, .tool-pill, .impact-pill, .hero-bento-card, .experience-card, .sfx-btn, .cred-btn, .timeline-verify-btn, .direct-email, input, textarea, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('cursor-hover');
    }
  }, { passive: true });
})();

// ========================================================================
// 3. Web Audio Haptic Feedback (Mechanical Click FX via Web Audio API)
// ========================================================================
(function initWebAudioHaptics() {
  let audioCtx = null;
  let sfxEnabled = localStorage.getItem('lz_sfx_enabled') !== 'false';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playMechanicalClick() {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (err) {
      // Fallback silent
    }
  }

  window.playMechanicalClick = playMechanicalClick;

  const sfxBtn = document.getElementById('sfx-toggle');
  function updateSfxButtonUI() {
    if (!sfxBtn) return;
    if (sfxEnabled) {
      sfxBtn.innerHTML = '🔊 SFX';
      sfxBtn.setAttribute('title', 'Sound Effects: ON (Klik untuk mematikan)');
      sfxBtn.classList.remove('muted');
      sfxBtn.classList.add('active');
    } else {
      sfxBtn.innerHTML = '🔇 SFX';
      sfxBtn.setAttribute('title', 'Sound Effects: OFF (Klik untuk mengaktifkan)');
      sfxBtn.classList.remove('active');
      sfxBtn.classList.add('muted');
    }
  }

  if (sfxBtn) {
    updateSfxButtonUI();
    sfxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('lz_sfx_enabled', sfxEnabled ? 'true' : 'false');
      updateSfxButtonUI();
      if (sfxEnabled) {
        playMechanicalClick();
      }
    });
  }

  const interactiveClickables = 'a, button, .btn, .nav-link, .cred-btn, .timeline-verify-btn, .direct-email, .card-action, .link-card, .cv-card, .tech-card, .direct-wa, .project-card a, .cmd-item';
  document.addEventListener('click', (e) => {
    const target = e.target.closest(interactiveClickables);
    if (target && target.id !== 'sfx-toggle') {
      playMechanicalClick();
    }
  }, true);
})();

// ========================================================================
// 4. Micro-Tooltip Manager System (Dark-Glass Minimalist Tooltips — rAF Throttled)
// ========================================================================
(function initMicroTooltips() {
  const tooltipEl = document.getElementById('micro-tooltip');
  if (!tooltipEl) return;

  let activeTarget = null;
  let tooltipRafPending = false;

  function updatePositionDirect(target) {
    if (!target || !tooltipEl.classList.contains('show')) return;
    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    let left = rect.left + rect.width / 2;
    let top = rect.top - 8;

    const padding = 12;
    left = Math.max(tooltipRect.width / 2 + padding, Math.min(window.innerWidth - tooltipRect.width / 2 - padding, left));
    top = Math.max(tooltipRect.height + padding, top);

    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
  }

  function updatePosition(target) {
    if (!tooltipRafPending) {
      tooltipRafPending = true;
      requestAnimationFrame(() => {
        updatePositionDirect(target);
        tooltipRafPending = false;
      });
    }
  }

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-tooltip]');
    if (target) {
      const text = target.getAttribute('data-tooltip');
      if (text) {
        activeTarget = target;
        tooltipEl.textContent = text;
        tooltipEl.classList.add('show');
        updatePosition(target);
      }
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-tooltip]');
    if (target && target === activeTarget) {
      activeTarget = null;
      tooltipEl.classList.remove('show');
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (activeTarget) updatePosition(activeTarget);
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (activeTarget) updatePosition(activeTarget);
  }, { passive: true });
})();

// ========================================================================
// 5. Quick Command Palette System (Ctrl + K / Cmd + K)
// ========================================================================
(function initCommandPalette() {
  const overlay = document.getElementById('cmd-palette-overlay');
  const input = document.getElementById('cmd-search-input');
  const triggerBtn = document.getElementById('cmd-palette-trigger');
  const list = document.getElementById('cmd-list');

  if (!overlay || !list) return;

  let isOpen = false;
  let activeIndex = 0;

  function getVisibleItems() {
    return Array.from(list.querySelectorAll('.cmd-item:not(.hidden)'));
  }

  function updateActiveItem() {
    const items = getVisibleItems();
    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  function openPalette() {
    isOpen = true;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (input) {
      input.value = '';
      filterItems('');
      setTimeout(() => input.focus(), 60);
    }
    activeIndex = 0;
    updateActiveItem();
    if (typeof window.playMechanicalClick === 'function') {
      window.playMechanicalClick();
    }
  }

  function closePalette() {
    isOpen = false;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (input) input.blur();
  }

  window.isCommandPaletteOpen = function () {
    return isOpen;
  };

  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen) closePalette(); else openPalette();
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePalette();
    }
  });

  function filterItems(query) {
    const q = query.toLowerCase().trim();
    const items = list.querySelectorAll('.cmd-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.classList.remove('hidden');
        item.style.display = 'flex';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });
    activeIndex = 0;
    updateActiveItem();
  }

  if (input) {
    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });
  }

  function executeAction(item) {
    if (!item) return;
    const action = item.getAttribute('data-action');
    closePalette();

    setTimeout(() => {
      switch (action) {
        case 'cv':
          window.open('cv-lucky-yan-zuhara.pdf', '_blank');
          break;
        case 'lelang': {
          const projSec = document.getElementById('projects');
          if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
          break;
        }
        case 'ccna':
          window.open('CCNA.pdf', '_blank');
          break;
        case 'email':
          if (typeof copyToClipboard === 'function') {
            copyToClipboard(null, 'yanzuharalucky@gmail.com');
          }
          break;
        case 'theme': {
          const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
          if (typeof setTheme === 'function') setTheme(targetTheme, true);
          break;
        }
      }
    }, 150);
  }

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (item) {
      executeAction(item);
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (isOpen) closePalette(); else openPalette();
      return;
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
      return;
    }

    const items = getVisibleItems();
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeAction(items[activeIndex]);
    }
  });
})();
