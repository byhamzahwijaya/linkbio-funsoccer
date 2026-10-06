# Jadwal Mabar & Link Foto Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menambahkan menu "Jadwal Mabar & Link Foto" di posisi teratas halaman Link Bio yang membuka modal interaktif 2 tab (Jadwal Mabar & Link Foto) dengan data dinamis langsung dari Google Spreadsheet, strictly diuji di lingkungan lokal tanpa push ke GitHub.

**Architecture:** 
- Frontend-only SPA architecture.
- Fetch data langsung dari Google Spreadsheet via Google Visualization API (`/gviz/tq?sheet=...&tqx=out:json`) tanpa backend/serverless proxy.
- State caching di memory JavaScript agar modal cepat dan responsif.
- Fallback data otomatis jika tab sheet belum terisi atau koneksi offline.

**Tech Stack:** Vanilla HTML5, CSS3 (BEM & Athletic Midnight theme), Vanilla JavaScript (ES6+ Fetch, Clipboard API, localStorage).

## Global Constraints
- Strictly update **LOCAL ONLY** — DO NOT run `git push origin` or upload to GitHub.
- Google Spreadsheet ID: `1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo`.
- Tab 1 `Jadwal`: Kolom `Tanggal`, `Waktu` (format ringkas "15.30"), `Lokasi`, `Keterangan` (TANPA SLOT).
- Tab 2 `Foto`: Kolom `Nama Album`, `Link Foto` dengan aksi Buka Foto & Salin Link.
- Tampilan 100% responsif mobile-first, mengikuti tema gelap elegan `#080a0e`.

---

### Task 1: Tambahkan Komponen HTML Menu Button & Modal Dialog

**Files:**
- Modify: `g:\00000_Projectai\linkbiofunsoocer\index.html`

- [ ] **Step 1: Tambahkan tombol menu utama "Jadwal Mabar & Link Foto" di posisi paling atas `.links-section`**
  - Letakkan persis di atas tombol `#btnOpenWa`.
  - Gunakan class `link-card link-schedule` dan id `btnOpenSchedule`.
  - Icon SVG kalender & kamera sporty, judul `Jadwal Mabar & Link Foto`, subteks `Cek jadwal main terbaru & unduh foto match`.

- [ ] **Step 2: Tambahkan dialog modal `#schedulePhotoModal` di bagian bawah `index.html`**
  - Struktur bottom-sheet dengan header kategori `AGENDA & DOKUMENTASI`.
  - Tab Switcher: Tombol `#tabScheduleBtn` (Jadwal Mabar) & `#tabPhotoBtn` (Link Foto Match).
  - Kontainer Konten: `#tabScheduleContent` dan `#tabPhotoContent`.
  - Elemen loading skeleton di dalam masing-masing tab.

---

### Task 2: Implementasi Styling CSS untuk Jadwal & Link Foto

**Files:**
- Modify: `g:\00000_Projectai\linkbiofunsoocer\style.css`

- [ ] **Step 1: Tambahkan style untuk kartu pemicu `.link-schedule`**
  - Aksen warna cyan/emerald athletic (`#06b6d4` / `#00f2fe`) dengan border halus.
  - Hover state elegan konsisten dengan kartu lainnya.

- [ ] **Step 2: Tambahkan style untuk Tab Switcher di dalam modal**
  - Segmented control / tab pills (`.modal-tabs`, `.tab-btn`, `.tab-btn.is-active`).

- [ ] **Step 3: Tambahkan style untuk Kartu Jadwal (`.schedule-card`)**
  - Badge waktu pertandingan ringkas: `15.30 WIB`.
  - Tampilan Tanggal, Lokasi Lapangan (dengan ikon pin), dan Keterangan.
  - Tombol CTA `.schedule-wa-btn` untuk konfirmasi kehadiran langsung ke WhatsApp admin.

- [ ] **Step 4: Tambahkan style untuk Kartu Link Foto (`.photo-card`)**
  - Tampilan Nama Album/Match.
  - Tombol `.photo-btn-open` (Buka Foto) dan `.photo-btn-copy` (Salin Link).

---

### Task 3: Implementasi Fetch Data Google Spreadsheet & Interaktivitas di JavaScript

**Files:**
- Modify: `g:\00000_Projectai\linkbiofunsoocer\script.js`

- [ ] **Step 1: Definisikan konfigurasi URL Google Sheets GViz & data fallback**
  - URL `Jadwal`: `https://docs.google.com/spreadsheets/d/1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo/gviz/tq?sheet=Jadwal&tqx=out:json`
  - URL `Foto`: `https://docs.google.com/spreadsheets/d/1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo/gviz/tq?sheet=Foto&tqx=out:json`
  - Fallback jadwal jika spreadsheet kosong: Hari Minggu, Jam 15.30, Lapangan Stadion Semeru Lumajang.
  - Fallback foto jika spreadsheet kosong: Album foto match terakhir.

- [ ] **Step 2: Buat parser GViz JSON aman (`parseGvizResponse`)**
  - Mengekstrak string JSON dari wrapper `google.visualization.Query.setResponse(...)`.
  - Memetakan baris `c[i].v` menjadi objek yang bersih.

- [ ] **Step 3: Buat fungsi render `renderScheduleList` dan `renderPhotoList`**
  - Render HTML dinamis ke `#tabScheduleContent` dan `#tabPhotoContent`.
  - Pasang event listener pada tombol "Salin Link" untuk copy URL dan memicu `showToast("Link foto berhasil disalin!")`.
  - Pasang link WhatsApp dinamis pada tombol "Konfirmasi Ikut Main" dengan pesan otomatis ke rolling admin.

- [ ] **Step 4: Pasang event listener untuk Tab Switcher & Modal `#schedulePhotoModal`**
  - Buka/tutup modal via klik kartu dan backdrop/ESC.
  - Berpindah tab secara instan saat tab button diklik.

---

### Task 4: Verifikasi Tampilan & Interaktivitas Lokal

- [ ] **Step 1: Buka `http://localhost:8085/` di browser**
- [ ] **Step 2: Uji klik tombol "Jadwal Mabar & Link Foto" dan pastikan modal terbuka**
- [ ] **Step 3: Uji tab Jadwal Mabar (cek tampilan tanggal, waktu 15.30, lokasi, tombol WA)**
- [ ] **Step 4: Uji tab Link Foto Match (cek fungsi tombol Buka Foto dan tombol Salin Link + notifikasi toast)**
- [ ] **Step 5: Verifikasi responsivitas mobile dan pastikan tidak ada horizontal scroll**
