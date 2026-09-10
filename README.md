# 🎯 Aplikasi Tes Potensi Diri & Gaya Belajar

Aplikasi web interaktif terstandarisasi untuk mengevaluasi potensi kecerdasan, tipe kepribadian karir, dan metode belajar optimal seseorang. Dirancang dengan antarmuka modern premium, visualisasi radar chart dinamis, arsitektur modular clean code, dan integrasi pengumpulan data secara real-time.

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

* **Estetika Premium**: Menggunakan layout grid modern bergaya Bento-Box pada panduan tes dan palet warna terkurasi untuk membedakan setiap kategori tes.
* **Visualisasi Chart Dinamis**: Hasil skor masing-masing dimensi divisualisasikan menggunakan Radar Chart (segitiga untuk VAK, heksagon untuk RIASEC, dan oktagon untuk Kecerdasan Majemuk) yang digambar secara presisi menggunakan SVG dinamis.
* **Responsive Layout**: Dioptimalkan sepenuhnya untuk kenyamanan pengguna mobile maupun desktop.
* **Mikro-Interaksi Taktil**: Efek tekan nyata (`active:scale-[0.98]`), rotasi interaktif, elevasi bayangan halus, dan animasi GSAP dengan siklus pembersihan memori (*lifecycle cleanup*).

---

## 🛠️ Arsitektur & Standar Clean Code (Hasil Refactoring)

Proyek telah direfaktor secara menyeluruh dengan menerapkan standar ketat **Senior Clean Code & Anti-Monolith Protocol**:

### 1. Dekomposisi Monolith & Batas Baris Keras (SRP)
Semua file kode UI/komponen/service dipecah sehingga **100% berada di bawah 200 baris** (orchestrator halaman utama < 250 baris):
* **`QuizResult.tsx`** (sebelumnya 671 baris) dipecah menjadi:
  * `resultThemes.ts` (97 baris) – Helper warna, tema, dan format tipe.
  * `RadarChart.tsx` (139 baris) – Rendering visualisasi radar chart SVG.
  * `ResultHero.tsx` (93 baris) – Kartu header hasil dominan.
  * `ResultDetailCard.tsx` (138 baris) – Detail analisis, rekomendasi jurusan, dan karir.
* **`QuizIntro.tsx`** (sebelumnya 508 baris) dipecah menjadi:
  * `AspectCard.tsx` (86 baris) – Kartu preview aspek/dimensi.
  * `ClassroomModal.tsx` (118 baris) – Dialog modal detail kelas aspek.
  * `AspectDeck.tsx` (60 baris) – Komponen swipe carousel dek kartu.
  * `useAspectCarousel.ts` (48 baris) – Custom hook penanganan swipe & drag gesture.
* **`MagicBento.tsx`** (sebelumnya 696 baris) dipecah menjadi:
  * `bentoConstants.ts` (50 baris) – Konstanta partikel & spotlight.
  * `ParticleCard.tsx` (182 baris) – Kartu bento interaktif dengan partikel GSAP & 3D tilt.
  * `GlobalSpotlight.tsx` (119 baris) – Efek sorotan spotlight kursor.
  * `MagicBento.tsx` (104 baris) – Container grid bento bersih.
* **`page.tsx`** (sebelumnya 330 baris) disederhanakan menjadi **107 baris**:
  * Logika state, jawaban, dan navigasi dialihkan ke custom hook **`useQuizFlow.ts`** (125 baris).
  * Kartu pilihan tes diekstrak ke **`TestSelector.tsx`** (120 baris).

### 2. Type Safety & Zero-Masking
* **0 Tipe `any`** di seluruh codebase aplikasi.
* **0 `@ts-ignore` / `@ts-nocheck` / `eslint-disable`**.
* Mematuhi aturan *React 19 Compiler* & hooks dependency rules.

### 3. Defensive Programming di API Route
* Endpoint `POST /api/submit-to-sheet` diamankan dengan validasi skema **Zod** (`submitSchema`).
* Sanitasi input ketat: validasi format email, pencegahan string kosong, dan penanganan default object skor guna mencegah crash runtime `undefined`.
* Format respon JSON terstandarisasi dengan penanganan HTTP status code yang tepat.

### 4. Normalisasi Token Tailwind CSS v4 & Isolasi Style
* Menghapus dan menormalkan puluhan kelas CSS non-standar (seperti shade `-150`, `-450`, `-650`, `-655`, `-750`, `-850`) ke token resmi Tailwind CSS v4 (seperti `-600`, `-700`, `-800`).
* Mengisolasi class CSS `DecayCard.css` dengan namespace `.decay-card-content` untuk mencegah tabrakan style secara global.

### 5. Pencegahan Race Condition & Peningkatan Aksesibilitas (a11y)
* Auto-advance soal pada `QuizCard.tsx` dilengkapi `timerRef` dengan auto-cleanup saat unmount untuk mencegah lompatan ganda pertanyaan saat diklik cepat.
* Menambahkan atribut `aria-label` pada modal close button dan tombol skala Likert, serta dukungan keyboard shortcut `Escape` untuk menutup modal.

### 6. Pembersihan Dead Code (Zero Zombie Code)
* Menghapus file dan komponen yang tidak terpakai: `DualProgressBar`, `SchoolGate.tsx`, `OrbitImages.tsx`, `OrbitImages.css`, dan file JSON duplikat.
* Menghilangkan seluruh sisa `console.log` debugging dan komentar kode mati.

---

## 📊 Alur Integrasi Database (Google Sheets)

Setiap pengguna menyelesaikan tes, sistem akan meminta data diri (Nama dan Email) sebelum menampilkan grafik hasil. Data tersebut beserta skor masing-masing dimensi dan hasil dominannya dikirim langsung ke Google Sheets secara real-time melalui integrasi Google Apps Script:

```
[Web Application (Next.js 16 App Router)] 
       │
       ▼ (Zod Validated JSON Payload)
[Next.js API Route: /api/submit-to-sheet]
       │
       ▼ (HTTP POST)
[Google Apps Script Web App Connector]
       │
       ▼ (Append Row)
[Google Sheets Database (Tab Terpisah per Tes)]
```

*Setiap kategori tes memiliki tab tersendiri di dalam file Spreadsheet yang sama demi kerapian data.*

---

## ⚙️ Teknologi yang Digunakan

* **Core & Framework**: [Next.js 16](https://nextjs.org/) (React 19 & TypeScript 5)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Scoped Vanilla CSS
* **Animasi & Interaksi**: [GSAP](https://greensock.com/gsap/) & [Motion (Framer Motion)](https://motion.dev/)
* **Validasi Skema**: [Zod](https://zod.dev/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Integrasi Database**: [Google Apps Script API](https://developers.google.com/apps-script)
* **Build & Dev Tool**: Turbopack
* **Deploy**: [Vercel](https://vercel.com/)

---

## 🧪 Status Kualitas Kode (Verifikasi Terminal)

```bash
npm run lint          # 0 errors, 0 warnings (clean)
npx tsc --noEmit      # 0 type errors
npm run build         # Next.js Turbopack build sukses
```
