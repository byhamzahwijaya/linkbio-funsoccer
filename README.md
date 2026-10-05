# ⚽ Fun Soccer Lumajang — Official Bio Link

Landing page **Link in Bio** modern, ultra-ringan, dan *mobile-first* khusus untuk komunitas **Fun Soccer Lumajang**. Dirancang dengan tema visual **Crimson Athletic Dark** sesuai logo resmi (Kuda Merah & Semeru).

---

## 📱 Fitur Utama

1. **Mobile-First & In-App Browser Optimized:**
   - Kecepatan load instan (< 1 detik) tanpa framework berat.
   - Ramah sentuhan jempol (*thumb-friendly* target) di smartphone.
2. **Menu Navigasi Utama:**
   - 🟢 **Hubungi WA Admin:** Call to action utama (respon cepat) untuk info jadwal & slot mabar.
   - 🌐 **Kunjungi Website Resmi:** Akses langsung ke website profil komunitas.
   - 🤝 **Kolaborasi & Sparing Tim:** Membuka *bottom sheet popup* interaktif dengan 3 opsi (Ajak Sparing, Sponsorship/Branding, dan Media/Content Creator).
3. **Identitas & Jadwal Komunitas:**
   - Avatar resmi dengan rotating crimson border & status aktif hijau (*live indicator*).
   - Banner jadwal mabar rutin mingguan.
   - Tagline & badge verified komunitas.
4. **Media Sosial & Interaktivitas:**
   - Tombol cepat ke Instagram (`@lumajangfunsoccer`) dan TikTok (`@lumajangfunsoccer`).
   - Tombol **Share & Salin Tautan** dengan Web Share API native di HP dan toast notification otomatis.

---

## 📁 Struktur Berkas

```
linkbiofunsoocer/
├── assets/
│   └── logo.png       # Logo resmi Fun Soccer Lumajang
├── index.html         # Struktur halaman HTML5 semantik & mobile-ready
├── style.css          # Desain sistem Crimson Athletic Dark & micro-animations
├── script.js          # Logika interaksi (Share, Popup Modal, Toast, Haptics)
└── README.md          # Dokumentasi petunjuk penggunaan
```

---

## 🛠️ Cara Mengubah Data Kontak & Link

Anda dapat mengubah data dengan membuka file **`index.html`** atau **`script.js`**:

### 1. Mengubah Nomor WhatsApp Admin
Buka `index.html` dan ganti nomor `6281234567890` pada baris tautan WhatsApp:
```html
<a href="https://wa.me/6281234567890?text=Halo%20Admin..." ...>
```
*Pastikan diawali dengan kode negara tanpa tanda `+` (contoh: `6281234567890`).*

### 2. Mengubah Alamat Website Resmi
Buka `index.html` pada bagian kartu kedua:
```html
<a href="https://funsoccerlumajang.com" ...>
```

### 3. Mengubah Akun Instagram & TikTok
Buka `index.html` pada bagian `<section class="socials-section">`:
```html
<a href="https://instagram.com/lumajangfunsoccer" ...>
<a href="https://tiktok.com/@lumajangfunsoccer" ...>
```

### 4. Menambahkan Gambar Logo Sponsor
Buka `index.html` pada bagian `<div class="sponsors-track">`, Anda cukup mengganti elemen `.sponsor-pill` dengan tag gambar logo sponsor Anda:
```html
<div class="sponsor-item">
  <img src="assets/sponsor1.png" alt="Logo Sponsor">
</div>
```
*Atau gunakan format teks badge seperti bawaannya jika belum ada file logo sponsor.*

---

## 🚀 Cara Menjalankan & Publish ke Internet

### A. Tes di Komputer Lokal
Jalankan perintah berikut di terminal:
```bash
python -m http.server 8085
```
Lalu buka browser di `http://localhost:8085`.

### B. Publish Gratis ke Internet (Bisa Dipakai di Bio IG/TikTok)
1. **GitHub Pages:**
   - Buat repository baru di GitHub (misal: `linkbio-funsoccer`).
   - Upload file `index.html`, `style.css`, `script.js`, dan folder `assets/`.
   - Buka menu **Settings > Pages > Branch `main` > Save**.
   - Dalam 1 menit, link Anda akan aktif di `https://username.github.io/linkbio-funsoccer`.
2. **Vercel / Netlify:**
   - Cukup *drag and drop* folder ini ke dashboard Vercel/Netlify untuk langsung mendapatkan URL gratis.
