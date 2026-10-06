/**
 * ============================================================
 * FUN SOCCER LUMAJANG — OFFICIAL BIO LINK JAVASCRIPT
 * Interactivity: Rolling Admin WA, Modals, Share API & Toast
 * ============================================================
 */

// ⚙️ KONFIGURASI ADMIN & TAUTAN RESMI
const CONFIG = {
  communityName: "Fun Soccer Lumajang",
  groupWhatsAppUrl: "https://chat.whatsapp.com/CIeescYEpwp7qy00xjgdUJ?mode=gi_t",
  websiteUrl: "https://www.funsoccer.my.id/",
  instagramHandle: "lumajangfunsoccer",
  tiktokHandle: "lumajangfunsoccer",
  spreadsheetId: "1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo",
};

// 👥 DAFTAR ADMIN WHATSAPP UMUM (Sistem Random / Acak: Nofal, Tami, Refo)
const ADMINS = [
  { name: "Nofal", phone: "6285156378487" },
  { name: "Tami", phone: "6282331491079" },
  { name: "Refo", phone: "6281259561261" }
];

// 🎯 KONTAK ADMIN KHUSUS DIVISI
const SPECIAL_CONTACTS = {
  sparing: { name: "Iftoni", phone: "6285151799797" },
  sponsor: { name: "Tami", phone: "6282331491079" },
  media: { name: "Tami", phone: "6282331491079" }
};

/**
 * Mengambil admin secara acak (Random Load-Balance tanpa pengulangan beruntun)
 */
function getRandomAdmin() {
  const lastIndex = parseInt(localStorage.getItem("fs_last_admin_idx") || "-1", 10);
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * ADMINS.length);
  } while (ADMINS.length > 1 && newIndex === lastIndex);
  localStorage.setItem("fs_last_admin_idx", newIndex);
  return ADMINS[newIndex];
}

// Kompatibilitas fungsi pemanggilan
const getRollingAdmin = getRandomAdmin;

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const btnShare = document.getElementById("btnShare");
  const toastNotice = document.getElementById("toastNotice");

  // WhatsApp Modal Elements
  const btnOpenWa = document.getElementById("btnOpenWa");
  const btnSocialWa = document.getElementById("btnSocialWa");
  const btnCloseWaModal = document.getElementById("btnCloseWaModal");
  const waModal = document.getElementById("waModal");
  const linkChatAdminRolling = document.getElementById("linkChatAdminRolling");

  // Kolaborasi Modal Elements
  const btnOpenCollab = document.getElementById("btnOpenCollab");
  const btnSponsorCta = document.getElementById("btnSponsorCta");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const collabModal = document.getElementById("collabModal");

  // Jadwal & Foto Modal Elements
  const btnOpenSchedule = document.getElementById("btnOpenSchedule");
  const schedulePhotoModal = document.getElementById("schedulePhotoModal");
  const btnCloseScheduleModal = document.getElementById("btnCloseScheduleModal");
  const tabScheduleBtn = document.getElementById("tabScheduleBtn");
  const tabPhotoBtn = document.getElementById("tabPhotoBtn");
  const panelSchedule = document.getElementById("panelSchedule");
  const panelPhoto = document.getElementById("panelPhoto");
  const scheduleListContainer = document.getElementById("scheduleListContainer");
  const photoListContainer = document.getElementById("photoListContainer");

  let toastTimer = null;
  let isScheduleDataLoaded = false;

  /**
   * 1. Menampilkan Toast Notifikasi
   */
  function showToast(message = "Tautan berhasil disalin!") {
    if (!toastNotice) return;
    const msgElem = toastNotice.querySelector(".toast-message");
    if (msgElem) msgElem.textContent = message;

    toastNotice.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove("show");
    }, 2800);
  }

  /**
   * 2. Fitur Share / Salin Tautan (Web Share API Mobile & Clipboard Fallback)
   */
  if (btnShare) {
    btnShare.addEventListener("click", async () => {
      const shareData = {
        title: "Fun Soccer Lumajang — Official Bio Link",
        text: "Gabung komunitas & mabar Fun Soccer Lumajang! ⚽🔥",
        url: window.location.href,
      };

      if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== "AbortError") {
            copyToClipboard(window.location.href);
          }
        }
      } else {
        copyToClipboard(window.location.href);
      }
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Tautan bio link berhasil disalin!");
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast("Tautan bio link berhasil disalin!");
    } catch (err) {
      showToast("Gagal menyalin tautan.");
    }
    document.body.removeChild(textArea);
  }

  /**
   * 3. WhatsApp Modal Handler & Rotasi Admin Otomatis
   */
  function openWaModal() {
    if (!waModal) return;
    waModal.classList.add("is-active");
    waModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeWaModal() {
    if (!waModal) return;
    waModal.classList.remove("is-active");
    waModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnOpenWa) {
    btnOpenWa.addEventListener("click", (e) => {
      e.preventDefault();
      openWaModal();
    });
  }

  if (btnSocialWa) {
    btnSocialWa.addEventListener("click", (e) => {
      e.preventDefault();
      openWaModal();
    });
  }

  if (btnCloseWaModal) {
    btnCloseWaModal.addEventListener("click", closeWaModal);
  }

  // Rotasi Admin WhatsApp ketika tombol "Tanya Admin" diklik
  if (linkChatAdminRolling) {
    linkChatAdminRolling.addEventListener("click", (e) => {
      const admin = getRollingAdmin();
      const message = encodeURIComponent(
        `Halo Admin ${admin.name} Fun Soccer Lumajang, saya tertarik untuk ikut gabung main bareng. Boleh minta info jadwal dan lokasinya?`
      );
      linkChatAdminRolling.href = `https://wa.me/${admin.phone}?text=${message}`;
    });
  }

  /**
   * 4. Modal Kolaborasi (Buka / Tutup)
   */
  function openCollabModal() {
    if (!collabModal) return;
    collabModal.classList.add("is-active");
    collabModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCollabModal() {
    if (!collabModal) return;
    collabModal.classList.remove("is-active");
    collabModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnOpenCollab) {
    btnOpenCollab.addEventListener("click", (e) => {
      e.preventDefault();
      openCollabModal();
    });
  }

  if (btnSponsorCta) {
    btnSponsorCta.addEventListener("click", (e) => {
      e.preventDefault();
      openCollabModal();
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeCollabModal);
  }

  // Menyesuaikan nomor WA di dalam Modal Kolaborasi dengan kontak divisi masing-masing
  const linkCollabSparing = document.getElementById("linkCollabSparing");
  const linkCollabSponsor = document.getElementById("linkCollabSponsor");
  const linkCollabMedia = document.getElementById("linkCollabMedia");

  if (linkCollabSparing) {
    const msg = encodeURIComponent("Halo Mas Iftoni Fun Soccer Lumajang, tim kami ingin mengajak sparing / fun match. Boleh diskusi ketersediaan jadwal dan lapangannya?");
    linkCollabSparing.href = `https://wa.me/${SPECIAL_CONTACTS.sparing.phone}?text=${msg}`;
  }

  if (linkCollabSponsor) {
    const msg = encodeURIComponent("Halo Admin Tami Fun Soccer Lumajang, saya dari brand/perusahaan ingin berdiskusi mengenai peluang sponsorship atau pasang logo partner.");
    linkCollabSponsor.href = `https://wa.me/${SPECIAL_CONTACTS.sponsor.phone}?text=${msg}`;
  }

  if (linkCollabMedia) {
    const msg = encodeURIComponent("Halo Admin Tami Fun Soccer Lumajang, saya tertarik untuk kolaborasi media partner / peliputan konten match bersama.");
    linkCollabMedia.href = `https://wa.me/${SPECIAL_CONTACTS.media.phone}?text=${msg}`;
  }

  /**
   * 5. Jadwal & Foto Modal Handlers + Integrasi Google Spreadsheet Live
   */
  const FALLBACK_SCHEDULES = [
    {
      tanggal: "Minggu, 12 Oktober 2026",
      waktu: "15.30",
      lokasi: "Stadion Semeru Lumajang",
      keterangan: "Fun Match Rutin Komunitas Fun Soccer Lumajang"
    }
  ];

  const FALLBACK_PHOTOS = [
    {
      nama: "Dokumentasi Match Terakhir",
      link: "https://instagram.com/lumajangfunsoccer"
    }
  ];

  function openScheduleModal() {
    if (!schedulePhotoModal) return;
    schedulePhotoModal.classList.add("is-active");
    schedulePhotoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (!isScheduleDataLoaded) {
      loadScheduleAndPhotos();
    }
  }

  function closeScheduleModal() {
    if (!schedulePhotoModal) return;
    schedulePhotoModal.classList.remove("is-active");
    schedulePhotoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnOpenSchedule) {
    btnOpenSchedule.addEventListener("click", (e) => {
      e.preventDefault();
      openScheduleModal();
    });
  }

  if (btnCloseScheduleModal) {
    btnCloseScheduleModal.addEventListener("click", closeScheduleModal);
  }

  // Tab Switcher Logic
  if (tabScheduleBtn && tabPhotoBtn) {
    tabScheduleBtn.addEventListener("click", () => {
      tabScheduleBtn.classList.add("active");
      tabScheduleBtn.setAttribute("aria-selected", "true");
      tabPhotoBtn.classList.remove("active");
      tabPhotoBtn.setAttribute("aria-selected", "false");

      if (panelSchedule) panelSchedule.classList.add("active");
      if (panelPhoto) panelPhoto.classList.remove("active");
    });

    tabPhotoBtn.addEventListener("click", () => {
      tabPhotoBtn.classList.add("active");
      tabPhotoBtn.setAttribute("aria-selected", "true");
      tabScheduleBtn.classList.remove("active");
      tabScheduleBtn.setAttribute("aria-selected", "false");

      if (panelPhoto) panelPhoto.classList.add("active");
      if (panelSchedule) panelSchedule.classList.remove("active");
    });
  }

  /**
   * Parse GViz response to array of rows
   */
  function parseGvizRows(text) {
    try {
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/);
      if (!match || !match[1]) return [];
      const json = JSON.parse(match[1]);
      if (!json.table || !json.table.rows) return [];
      return json.table.rows.map(row => {
        return (row.c || []).map(cell => cell ? (cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : "") : "");
      });
    } catch (err) {
      console.warn("Gviz parse error:", err);
      return [];
    }
  }

  /**
   * Render Schedule Cards
   */
  function renderScheduleCards(schedules) {
    if (!scheduleListContainer) return;
    if (!schedules || schedules.length === 0) {
      scheduleListContainer.innerHTML = `
        <div class="empty-state">
          <p>Belum ada jadwal mabar yang tercatat.</p>
          <p style="margin-top: 6px; font-size: 0.74rem;">Pantau grup WhatsApp mabar untuk info voting jadwal.</p>
        </div>
      `;
      return;
    }

    scheduleListContainer.innerHTML = schedules.map((item, index) => {
      const admin = getRollingAdmin();
      const timeDisplay = item.waktu ? (item.waktu.includes("WIB") ? item.waktu : `${item.waktu} WIB`) : "15.30 WIB";
      const waMsg = encodeURIComponent(`Halo Admin ${admin.name} Fun Soccer Lumajang, saya ingin ikut main untuk jadwal ${item.tanggal} jam ${item.waktu || '15.30'}. Apakah masih bisa gabung?`);
      const waLink = `https://wa.me/${admin.phone}?text=${waMsg}`;
      const badgeText = item.keterangan || "Fun Match";

      return `
        <div class="schedule-card">
          <div class="schedule-header">
            <span class="schedule-tag">${badgeText}</span>
          </div>
          <div class="schedule-date-row">
            <h3 class="schedule-date">${item.tanggal || "Minggu"}</h3>
            <span class="schedule-time-badge">⏰ ${timeDisplay}</span>
          </div>
          <div class="schedule-detail-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${item.lokasi || "Stadion Semeru Lumajang"}</span>
          </div>
          <div class="schedule-btn-wrap">
            <a href="${waLink}" target="_blank" rel="noopener" class="schedule-wa-btn">
              <span>Konfirmasi Ikut Main</span>
              <span>→</span>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Render Photo Cards
   */
  function renderPhotoCards(photos) {
    if (!photoListContainer) return;
    if (!photos || photos.length === 0) {
      photoListContainer.innerHTML = `
        <div class="empty-state">
          <p>Belum ada tautan foto match yang diunggah.</p>
          <p style="margin-top: 6px; font-size: 0.74rem;">Dokumentasi foto akan segera di-update setelah sesi main selesai.</p>
        </div>
      `;
      return;
    }

    photoListContainer.innerHTML = photos.map(item => {
      const safeLink = item.link || "https://instagram.com/lumajangfunsoccer";
      return `
        <div class="photo-card">
          <div class="photo-info">
            <h3 class="photo-title" title="${item.nama}">${item.nama}</h3>
            <span class="photo-meta">Dokumentasi Match</span>
          </div>
          <div class="photo-actions">
            <a href="${safeLink}" target="_blank" rel="noopener" class="photo-btn-open">
              <span>Buka Foto</span>
              <span>↗</span>
            </a>
            <button type="button" class="photo-btn-copy" data-link="${safeLink}" title="Salin link album">
              <span>Salin</span>
              <span>📋</span>
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Wire copy buttons
    photoListContainer.querySelectorAll(".photo-btn-copy").forEach(btn => {
      btn.addEventListener("click", () => {
        const link = btn.getAttribute("data-link");
        if (link) {
          copyToClipboard(link);
          showToast("Link foto berhasil disalin!");
        }
      });
    });
  }

  /**
   * Universal Google Sheets Data Loader (Works on http, https, and file:// protocol)
   */
  function fetchSheetData(sheetName) {
    if (window.location.protocol === 'file:') {
      return fetchSheetViaJsonp(sheetName);
    }

    const baseGviz = `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=out:json&_t=${Date.now()}`;
    return fetch(baseGviz, { cache: "no-cache" })
      .then(res => res.text())
      .then(text => parseGvizRows(text))
      .catch(err => {
        console.warn(`fetch() failed for ${sheetName}, trying JSONP fallback...`, err);
        return fetchSheetViaJsonp(sheetName);
      });
  }

  function fetchSheetViaJsonp(sheetName) {
    return new Promise((resolve) => {
      const callbackName = 'gvizCb_' + Math.floor(Math.random() * 1000000);
      const script = document.createElement('script');
      
      const timer = setTimeout(() => {
        cleanup();
        resolve([]);
      }, 6000);

      function cleanup() {
        clearTimeout(timer);
        if (script.parentNode) script.parentNode.removeChild(script);
        delete window[callbackName];
      }

      window[callbackName] = function(data) {
        cleanup();
        try {
          if (!data || !data.table || !data.table.rows) {
            resolve([]);
            return;
          }
          const rows = data.table.rows.map(row => {
            return (row.c || []).map(cell => cell ? (cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : "") : "");
          });
          resolve(rows);
        } catch (e) {
          resolve([]);
        }
      };

      script.onerror = function() {
        cleanup();
        resolve([]);
      };

      script.src = `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=responseHandler:${callbackName}&_t=${Date.now()}`;
      document.head.appendChild(script);
    });
  }

  /**
   * Fetch Live Data from Google Spreadsheet (with graceful fallback)
   */
  async function loadScheduleAndPhotos() {
    isScheduleDataLoaded = true;

    // 1. Fetch Tab 'Jadwal'
    try {
      const rawRows = await fetchSheetData("Jadwal");
      const validSchedules = rawRows.filter(r => r[0] && r[0].toLowerCase() !== "tanggal").map(r => ({
        tanggal: r[0],
        waktu: r[1] || "15.30",
        lokasi: r[2] || "Stadion Semeru Lumajang",
        keterangan: r[3] || ""
      }));

      if (validSchedules.length > 0) {
        renderScheduleCards(validSchedules);
      } else {
        renderScheduleCards(FALLBACK_SCHEDULES);
      }
    } catch (e) {
      console.warn("Using fallback schedule data:", e);
      renderScheduleCards(FALLBACK_SCHEDULES);
    }

    // 2. Fetch Tab 'Foto'
    try {
      const rawRows = await fetchSheetData("Foto");
      const validPhotos = rawRows.filter(r => r[0] && r[0].toLowerCase() !== "nama album").map(r => ({
        nama: r[0],
        link: r[1] || ""
      }));

      if (validPhotos.length > 0) {
        renderPhotoCards(validPhotos);
      } else {
        renderPhotoCards(FALLBACK_PHOTOS);
      }
    } catch (e) {
      console.warn("Using fallback photo data:", e);
      renderPhotoCards(FALLBACK_PHOTOS);
    }
  }

  /**
   * 6. Tutup Modal saat Backdrop Diklik & Keyboard Escape
   */
  if (schedulePhotoModal) {
    schedulePhotoModal.addEventListener("click", (e) => {
      if (e.target === schedulePhotoModal) closeScheduleModal();
    });
  }

  if (waModal) {
    waModal.addEventListener("click", (e) => {
      if (e.target === waModal) closeWaModal();
    });
  }

  if (collabModal) {
    collabModal.addEventListener("click", (e) => {
      if (e.target === collabModal) closeCollabModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (schedulePhotoModal && schedulePhotoModal.classList.contains("is-active")) closeScheduleModal();
      if (waModal && waModal.classList.contains("is-active")) closeWaModal();
      if (collabModal && collabModal.classList.contains("is-active")) closeCollabModal();
    }
  });

  /**
   * 6. Haptic / Touch Feedback Ringan pada Tombol
   */
  const interactiveCards = document.querySelectorAll(".link-card, .social-btn, .collab-item");
  interactiveCards.forEach(card => {
    card.addEventListener("touchstart", () => {
      card.style.transform = "scale(0.97)";
    }, { passive: true });

    card.addEventListener("touchend", () => {
      setTimeout(() => {
        card.style.transform = "";
      }, 150);
    }, { passive: true });
  });

  console.log("⚽ Fun Soccer Lumajang Bio Link ready with Rolling Admin WhatsApp!");
});
