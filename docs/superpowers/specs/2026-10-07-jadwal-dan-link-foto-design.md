# Design Specification: Menu Jadwal Mabar & Link Foto Dokumentasi

**Date:** 2026-10-07  
**Status:** Approved by User  
**Target Project:** Link Bio Fun Soccer Lumajang (`index.html`, `style.css`, `script.js`)  
**Data Source:** Google Spreadsheet (`https://docs.google.com/spreadsheets/d/1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo/edit?usp=sharing`)

---

## 1. Executive Summary & Goals
Komunitas **Fun Soccer Lumajang** membutuhkan akses cepat bagi pengunjung Instagram/TikTok untuk:
1. Mengetahui **Jadwal Mabar** mingguan terbaru tanpa perlu selalu bertanya manual ke admin.
2. Mengakses dan mengunduh **Link Foto Dokumentasi** setelah pertandingan selesai.
3. Memastikan pengelolaan data jadwal & foto sangat mudah bagi admin (cukup update di Google Spreadsheet dari smartphone atau laptop, data di Link Bio otomatis sinkron secara live).
4. Menjaga tampilan mobile-first tetap sporty, elegan, simpel, dan tidak berantakan (tidak ada kuota/slot yang rumit; waktu cukup simpel seperti "15.30").

---

## 2. Arsitektur Data Google Spreadsheet

Spreadsheet ID: `1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo`  
Endpoint Public Query: `https://docs.google.com/spreadsheets/d/1uiHVjtYVmp-K1Jyi8Y_lJXE1Tp_rrINPnKfif6tdZfo/gviz/tq?sheet={SHEET_NAME}&tqx=out:json`

### Tab 1: `Jadwal`
| Kolom A | Kolom B | Kolom C | Kolom D |
| :--- | :--- | :--- | :--- |
| **Tanggal** | **Waktu** | **Lokasi** | **Keterangan** |
| *Minggu, 12 Okt 2026* | *15.30* | *Stadion Semeru Lumajang* | *Fun Match Rutin* |

*Catatan:*
- Tidak ada kolom slot/kuota (sesuai instruksi user).
- Format waktu ringkas (contoh: "15.30").
- Web akan membaca baris data yang terisi. Jika terdapat lebih dari satu jadwal, ditampilkan secara berurutan; jadwal paling atas ditandai sebagai jadwal terdekat.

### Tab 2: `Foto`
| Kolom A | Kolom B |
| :--- | :--- |
| **Nama Album** | **Link Foto** |
| *Dokumentasi Match 5 Okt 2026* | *https://drive.google.com/...* |
| *Fun Match vs Komunitas X* | *https://drive.google.com/...* |

*Catatan:*
- Admin hanya mengisi 2 kolom sederhana: Nama Album dan Link URL (Google Drive / Photos).

---

## 3. Desain Komponen & Antarmuka (UI/UX)

### A. Tombol Menu Utama (Header Menu Link)
- **Posisi**: Diletakkan di urutan paling atas di bagian tautan (`.links-section`), tepat sebelum kartu `Join Grup & Chat Admin`.
- **Elemen**: `<button type="button" class="link-card link-schedule" id="btnOpenSchedule">`
- **Ikon**: Ikon Sporty Calendar / Event SVG bernuansa atletik cyan/emerald.
- **Judul**: `Jadwal Mabar & Link Foto`
- **Sub-teks**: `Cek jadwal main terbaru & unduh foto match`
- **Aksi**: Membuka modal popup dialog `#schedulePhotoModal`.

### B. Modal Dialog Interaktif (`#schedulePhotoModal`)
Modal mengusung gaya bottom-sheet mobile responsif yang konsisten dengan modal WhatsApp & Kolaborasi yang sudah ada:
1. **Header Modal**:
   - Badge kategori: `AGENDA & DOKUMENTASI`
   - Judul modal: `Jadwal & Link Foto`
   - Tombol Tutup (`✕`)
2. **Tab Switcher (Pengalih Tab Cepat)**:
   - Tombol Tab 1: `📅 Jadwal Mabar` (Active secara default)
   - Tombol Tab 2: `📸 Link Foto Match`
3. **Konten Tab 1 (Jadwal Mabar)**:
   - State saat memuat: Skeleton loader halus.
   - Kartu Jadwal:
     - Badge: `MATCH TERDEKAT`
     - Hari & Tanggal (contoh: *Minggu, 12 Oktober 2026*)
     - Jam (contoh: *15.30 WIB*)
     - Lokasi Lapangan (contoh: *📍 Stadion Semeru Lumajang*)
     - Keterangan (contoh: *Fun Match Internal*)
     - Tombol Aksi: `Konfirmasi Ikut Main (WhatsApp)` yang menghubungkan user ke rolling admin WhatsApp (Abi / Nofal / Tami).
   - Empty/Fallback state: Jika spreadsheet kosong/belum diisi, tampil kartu contoh ramah dengan ajakan gabung grup WhatsApp.
4. **Konten Tab 2 (Link Foto Dokumentasi)**:
   - Daftar Album Foto:
     - Nama Match / Album (contoh: *Dokumentasi Match 5 Okt 2026*)
     - Dua tombol aksi per album:
       - `Buka Foto ↗`: Membuka link Google Drive/Photos di tab baru (`target="_blank"`).
       - `Salin Link 📋`: Menyalin URL album ke clipboard dan menampilkan notifikasi toast *"Link foto berhasil disalin!"*.
   - Empty/Fallback state: Pesan informatif jika belum ada album yang diunggah.

---

## 4. Logika JavaScript & Fetching Data

1. **Google Sheets Parsing via GViz API**:
   - Mengambil data dari endpoint GViz JSON (`/gviz/tq?sheet=Jadwal&tqx=out:json` dan `sheet=Foto`).
   - Parsing struktur JSON respon GViz (`google.visualization.Query.setResponse(...)`) menggunakan regex/substr yang aman.
2. **In-Memory Cache & Performance**:
   - Data jadwal & foto di-cache sementara di sesi halaman agar tidak melakukan request berulang saat modal dibuka-tutup.
   - Panggilan fetch dilakukan asinkron saat halaman dimuat atau saat modal pertama kali dibuka.
3. **Clipboard Copy Handler**:
   - Mengintegrasikan fungsi salin link dengan toast notifikasi `#toastNotice` yang sudah ada di proyek.
4. **Fallback Handler**:
   - Jika terjadi kendala jaringan saat menghubungi Google Sheets, sistem otomatis menampilkan data jadwal & foto fallback sehingga UI tidak rusak dan pengunjung tetap mendapatkan informasi yang berguna.

---

## 5. Rencana Pengujian & Kriteria Keberhasilan
- [ ] Tombol baru muncul di posisi teratas menu.
- [ ] Klik tombol membuka modal dengan 2 tab: "Jadwal Mabar" dan "Link Foto Match".
- [ ] Pengalihan antar tab berlangsung instan dan mulus.
- [ ] Jadwal menampilkan Tanggal, Jam (15.30), Lokasi, dan Keterangan tanpa kolom kuota/slot.
- [ ] Link foto dapat dibuka di tab baru dan dapat disalin ke clipboard dengan feedback toast.
- [ ] Tampilan 100% responsif pada layar mobile (viewport 360px - 430px) tanpa overflow horizontal.
