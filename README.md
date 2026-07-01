# 🎯 Aplikasi Tes Potensi Diri & Gaya Belajar

Aplikasi web interaktif terstandarisasi untuk mengevaluasi potensi kecerdasan, tipe kepribadian karir, dan metode belajar optimal seseorang. Dirancang dengan antarmuka modern premium, visualisasi radar chart dinamis, dan integrasi pengumpulan data secara real-time.

---

## 🔗 Tautan Penting

* **Coba Aplikasi (Live Demo)**:  
  👉 [Aplikasi Tes Potensi Diri (Vercel)](https://personality-test-omega-three.vercel.app/)
  
* **Database Hasil Tes (Google Sheets)**:  
  👉 [Spreadsheet Data Hasil Tes](https://docs.google.com/spreadsheets/d/1ZP-tuy-4i-oRai1iWriOF612XWYZR-gz5TDm60a1qLE/edit?gid=0#gid=0)

---

## 🚀 Fitur Utama

Aplikasi ini mencakup tiga instrumen tes psikologi & edukasi terstandarisasi:

1. **Kecerdasan Majemuk (Multiple Intelligences)**
   - Berdasarkan teori Howard Gardner.
   - Terdiri dari **80 pertanyaan** yang mengevaluasi 8 bidang kecerdasan (Linguistik, Logis-Matematis, Spasial, Kinestetik, Musikal, Interpersonal, Intrapersonal, dan Naturalis).

2. **Kepribadian & Karir RIASEC**
   - Berdasarkan teori karir John Holland.
   - Terdiri dari **42 pertanyaan** untuk menganalisis kecenderungan minat karir berdasarkan 6 tipe kepribadian (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).

3. **Gaya Belajar (Visual-Auditori-Kinestetik / VAK)**
   - Terdiri dari **27 pertanyaan** untuk menentukan metode penyerapan informasi terbaik (Visual, Auditori, atau Kinestetik) lengkap dengan rekomendasi jurusan kuliah serta pilihan karir pendukung.

---

## 🎨 Desain & UI/UX Keunggulan

* **Aestetika Premium**: Menggunakan layout grid modern bergaya Bento-Box pada halaman awal dan kombinasi warna HSL harmonis untuk membedakan kategori tes.
* **Visualisasi Chart Dinamis**: Hasil skor masing-masing dimensi divisualisasikan menggunakan Radar Chart (berbentuk segitiga untuk VAK, heksagon untuk RIASEC, dan oktagon untuk Kecerdasan Majemuk) yang digambar secara presisi menggunakan SVG dinamis.
* **Responsive Layout**: Sepenuhnya dioptimalkan untuk perangkat mobile maupun desktop.
* **Timbul & Elevasi Efek**: Kartu pemilihan tes dirancang statis dengan efek *elevated shadow* interaktif ketika di-hover (bergerak sedikit ke atas secara mulus).

---

## 📊 Alur Integrasi Database (Google Sheets)

Setiap pengguna menyelesaikan tes, sistem akan meminta data diri (Nama dan Email) sebelum menampilkan grafik hasil. Data tersebut beserta skor masing-masing dimensi dan hasil dominannya dikirim langsung ke Google Sheets secara real-time melalui integrasi Google Apps Script:

```
[Web Application (Next.js)] 
       │
       ▼ (Fetch API JSON Payload)
[Google Apps Script Web App Connector]
       │
       ▼ (Append Row)
[Google Sheets Database (Tiga Tab Berbeda)]
```

*Setiap kategori tes memiliki tab tersendiri di dalam file Spreadsheet yang sama demi kerapian data.*

---

## ⚙️ Teknologi yang Digunakan

* **Framework**: [Next.js 15+](https://nextjs.org/) (dengan React & TypeScript)
* **Styling**: [TailwindCSS](https://tailwindcss.com/) & Vanilla CSS
* **Icons**: [Lucide React](https://lucide.dev/)
* **Integrasi Data**: [Google Apps Script API](https://developers.google.com/apps-script)
* **Deploy**: [Vercel](https://vercel.com/)
