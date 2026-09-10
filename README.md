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

## 📊 Perbandingan Sebelum & Sesudah Refactoring (Lead Dev Standard)

Berikut adalah ringkasan metriks komparasi sebelum dan setelah proses refaktorisasi menyeluruh dilakukan pada codebase ini:

| Metriks / Aspek | Sebelum Refactoring | Sesudah Refactoring | Dampak Kualitas |
|---|---|---|---|
| **File Monolitik Terbesar** | `MagicBento.tsx` (696 baris)<br>`QuizResult.tsx` (671 baris)<br>`QuizIntro.tsx` (508 baris) | 100% file komponen **< 200 baris**<br>(Rata-rata 60–140 baris) | Mematuhi Single Responsibility Principle (SRP), mudah di-maintain dan di-test. |
| **Page Orchestrator (`page.tsx`)** | 330 baris (mencampur state, fetch, & UI) | **107 baris** | Bersih; state & logic diekstrak ke `useQuizFlow.ts`. |
| **Type Safety (`any` count)** | Banyak tipe `any` pada animasi & segmenter | **0 `any`** (100% strictly typed) | Menghilangkan blindspot type-checker dan runtime error. |
| **Compiler & Lint Status** | React 19 ref warning & cascading render warnings | **0 Errors, 0 Warnings** | Bebas siklus re-render tidak perlu. |
| **API Boundary Protection** | Raw unvalidated payload (raw JSON dereference) | **Validasi Skema Zod** (`submitSchema`) | Kebal payload rusak, invalid email ditolak dengan HTTP 400. |
| **Kalkulasi Skor Engine** | Hardcoded magic numbers (`35 : 45 : 50`) | **Kalkulasi Adaptif Dinamis** | Tahan terhadap perubahan jumlah pertanyaan di masa depan. |
| **Dead / Zombie Code** | File usang (`OrbitImages`, `SchoolGate`, duplikat JSON) | **100% Bersih** (dihapus via git) | Memangkas ukuran bundle dan menghilangkan kebingungan developer. |
| **Konsistensi CSS** | Puluhan kelas typo/non-standar (`-655`, `-650`, `-150`) | **100% Token Resmi Tailwind v4** | Tidak ada styling visual yang gagal diaplikasikan di browser. |
| **CSS Scoping** | Selector global generik (`.content`, `.svg`) | **Namespaced (`.decay-card-content`)** | Tidak ada risiko CSS collision dengan layout lain. |
| **Race Condition** | `setTimeout` auto-advance tanpa cleanup timer | **Timer Ref + Auto-cleanup** | Bebas bug lompatan pertanyaan saat diklik beruntun. |
| **Aksesibilitas (a11y)** | Tombol icon tanpa nama, dialog tanpa label | **Lengkap `aria-label` & ESC key handler** | Ramah screen reader dan pengguna keyboard. |

---

## 📁 Struktur Arsitektur Modular Proyek

```text
src/
├── app/
│   ├── api/
│   │   └── submit-to-sheet/
│   │       └── route.ts             # 89 baris - Endpoint API dengan validasi Zod
│   ├── globals.css                  # Tailwind v4 import & keyframe animations
│   ├── layout.tsx                   # 20 baris - Root layout & metadata
│   └── page.tsx                     # 107 baris - Main Page Orchestrator ringkas
├── components/
│   ├── quiz/
│   │   ├── intro/                   # Dekomposisi sub-fitur QuizIntro
│   │   │   ├── AspectCard.tsx       # 86 baris - Kartu pratinjau aspek
│   │   │   ├── AspectDeck.tsx       # 60 baris - Container swipe carousel
│   │   │   ├── ClassroomModal.tsx   # 118 baris - Modal detail aspek & a11y
│   │   │   └── useAspectCarousel.ts # 48 baris - Custom hook swipe gesture
│   │   ├── result/                  # Dekomposisi sub-fitur QuizResult
│   │   │   ├── RadarChart.tsx       # 139 baris - Visualisasi SVG radar dinamis
│   │   │   ├── ResultDetailCard.tsx # 138 baris - Kartu rekomendasi karir/jurusan
│   │   │   ├── ResultHero.tsx       # 93 baris - Header skor dominan
│   │   │   └── resultThemes.ts      # 97 baris - Token warna & helper formatter DRY
│   │   ├── LeadModal.tsx            # 148 baris - Modal input lead pengguna
│   │   ├── QuizCard.tsx             # 173 baris - Kartu soal skala Likert & safe timer
│   │   ├── QuizIntro.tsx            # 191 baris - Container panduan tes
│   │   ├── QuizResult.tsx           # 143 baris - Container hasil tes
│   │   └── TestSelector.tsx         # 120 baris - Kartu seleksi 3 instrumen tes
│   └── ui/
│       ├── bento/                   # Dekomposisi sub-fitur MagicBento
│       │   ├── bentoConstants.ts    # 50 baris - Tipe & konstanta partikel
│       │   ├── GlobalSpotlight.tsx  # 119 baris - Spotlight tracker kursor
│       │   └── ParticleCard.tsx     # 182 baris - Kartu efek partikel GSAP & 3D tilt
│       ├── Button.tsx               # 39 baris - Komponen tombol reusable & tactile feedback
│       ├── Card.tsx                 # 71 baris - Komponen kontainer card
│       ├── DecayCard.tsx            # 78 baris - Kartu efek displacement SVG terisolasi
│       ├── MagicBento.tsx           # 104 baris - Grid bento orchestrator
│       ├── ProgressBar.tsx          # 30 baris - Shimmer progress bar dinamis
│       ├── RotatingText.tsx         # 192 baris - Animasi teks berputar Motion
│       └── TextType.tsx             # 176 baris - Animasi typewriter React 19 safe
├── data/
│   ├── gaya_belajar.ts              # Data deskripsi & rekomendasi VAK
│   ├── gaya_belajar_questions.ts    # 27 Soal Tes Gaya Belajar
│   ├── intelligences.ts             # Data deskripsi & rekomendasi Kecerdasan Majemuk
│   ├── questions.ts                 # 80 Soal Tes Kecerdasan Majemuk
│   ├── riasec.ts                    # Data deskripsi & rekomendasi Holland RIASEC
│   └── riasec_questions.ts          # 42 Soal Tes Kepribadian RIASEC
├── hooks/
│   └── useQuizFlow.ts               # 125 baris - Custom hook pengelola alur tes & state
├── lib/
│   └── quiz-engine.ts               # 112 baris - Kalkulasi persentase & dominansi adaptif
└── types/
    └── quiz.ts                      # 50 baris - Definisi kontrak tipe TypeScript terpusat
```

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

---

## ⚙️ Teknologi yang Digunakan

* **Core & Framework**: [Next.js 16](https://nextjs.org/) (React 19 & TypeScript 5)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Scoped Vanilla CSS
* **Animasi & Interaksi**: [GSAP](https://greensock.com/gsap/) & [Motion](https://motion.dev/)
* **Validasi Skema**: [Zod](https://zod.dev/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Integrasi Database**: [Google Apps Script API](https://developers.google.com/apps-script)
* **Build & Dev Tool**: Turbopack
* **Deploy**: [Vercel](https://vercel.com/)

---

## 🧪 Status Kualitas Kode (Verifikasi Terminal)

```bash
npm run lint          # 0 errors, 0 warnings (clean)
npx tsc --noEmit      # 0 type errors (100% strictly typed)
npm run build         # Next.js Turbopack production build sukses
```
