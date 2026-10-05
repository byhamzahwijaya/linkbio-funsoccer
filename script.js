/**
 * ============================================================
 * FUN SOCCER LUMAJANG — OFFICIAL BIO LINK JAVASCRIPT
 * Interactivity: Share API, Modal Sheet, Toast & Touch Feedback
 * ============================================================
 */

// ⚙️ KONFIGURASI MUDAH (Silakan sesuaikan data kontak di sini jika ada perubahan)
const CONFIG = {
  communityName: "Fun Soccer Lumajang",
  adminWhatsAppNumber: "6281234567890", // Ganti dengan nomor WhatsApp admin asli
  websiteUrl: "https://funsoccerlumajang.com", // Ganti jika sudah ada domain aktif
  instagramHandle: "lumajangfunsoccer",
  tiktokHandle: "lumajangfunsoccer",
};

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const btnShare = document.getElementById("btnShare");
  const btnOpenCollab = document.getElementById("btnOpenCollab");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const collabModal = document.getElementById("collabModal");
  const toastNotice = document.getElementById("toastNotice");

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
          // User membatalkan share atau browser fallback
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
   * 3. Modal Kolaborasi (Buka / Tutup / Drag Dismiss)
   */
  function openCollabModal() {
    if (!collabModal) return;
    collabModal.classList.add("is-active");
    collabModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Kunci scroll di layar belakang
  }

  function closeCollabModal() {
    if (!collabModal) return;
    collabModal.classList.remove("is-active");
    collabModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  const btnSponsorCta = document.getElementById("btnSponsorCta");

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

  // Tutup modal jika klik di luar sheet (backdrop)
  if (collabModal) {
    collabModal.addEventListener("click", (e) => {
      if (e.target === collabModal) {
        closeCollabModal();
      }
    });
  }

  // Tutup dengan keyboard Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && collabModal && collabModal.classList.contains("is-active")) {
      closeCollabModal();
    }
  });

  /**
   * 4. Haptic / Touch Feedback Ringan pada Card Link
   */
  const cards = document.querySelectorAll(".link-card, .social-btn, .collab-item");
  cards.forEach(card => {
    card.addEventListener("touchstart", () => {
      card.style.transform = "scale(0.97)";
    }, { passive: true });

    card.addEventListener("touchend", () => {
      setTimeout(() => {
        card.style.transform = "";
      }, 150);
    }, { passive: true });
  });

  console.log("⚽ Fun Soccer Lumajang Bio Link initialized successfully!");
});
