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
  websiteUrl: "https://funsoccerlumajang.com",
  instagramHandle: "lumajangfunsoccer",
  tiktokHandle: "lumajangfunsoccer",
};

// 👥 DAFTAR ADMIN WHATSAPP (Sistem Rolling / Rotasi Otomatis)
const ADMINS = [
  { name: "Abi", phone: "62895364300631" },
  { name: "Nofal", phone: "6285156378487" },
  { name: "Tami", phone: "6282331491079" }
];

/**
 * Mengambil admin giliran berikutnya (Rotasi Berkelanjutan)
 */
function getRollingAdmin() {
  let currentIndex = parseInt(localStorage.getItem("fs_rolling_admin_idx") || "0", 10);
  if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= ADMINS.length) {
    currentIndex = 0;
  }
  const selectedAdmin = ADMINS[currentIndex];
  // Simpan giliran admin berikutnya untuk klik/pengunjung selanjutnya
  localStorage.setItem("fs_rolling_admin_idx", (currentIndex + 1) % ADMINS.length);
  return selectedAdmin;
}

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

  let toastTimer = null;

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

  // Menyesuaikan nomor WA di dalam Modal Kolaborasi dengan rolling admin juga
  const collabItems = document.querySelectorAll("#collabModal .collab-item");
  collabItems.forEach(item => {
    item.addEventListener("click", () => {
      const admin = getRollingAdmin();
      const currentHref = item.getAttribute("href") || "";
      if (currentHref.includes("wa.me/")) {
        // Ganti nomor admin dengan giliran admin saat ini
        const updatedHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${admin.phone}`);
        item.setAttribute("href", updatedHref);
      }
    });
  });

  /**
   * 5. Tutup Modal saat Backdrop Diklik & Keyboard Escape
   */
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
