# Panduan Integrasi Google Sheets

Dokumen ini berisi kode dan langkah-langkah untuk mengintegrasikan hasil kuis kecerdasan majemuk Anda langsung ke Google Spreadsheet berikut:
👉 [Google Spreadsheet Anda](https://docs.google.com/spreadsheets/d/1ZP-tuy-4i-oRai1iWriOF612XWYZR-gz5TDm60a1qLE/edit?usp=sharing)

---

## Langkah 1: Pasang Google Apps Script di Spreadsheet

1. Buka spreadsheet Anda melalui tautan di atas.
2. Pada menu atas, klik **Extensions** (Ekstensi) > **Apps Script**.
3. Hapus semua kode default yang ada di dalam editor `Code.gs`.
4. Salin dan tempel kode JavaScript di bawah ini:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Inisialisasi header kolom jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tanggal & Waktu",
        "Nama Lengkap",
        "Alamat Email",
        "Linguistik",
        "Matematis",
        "Spasial",
        "Kinestetik",
        "Musikal",
        "Interpersonal",
        "Intrapersonal",
        "Naturalis",
        "Kecerdasan Dominan"
      ]);
    }
    
    // Masukkan data jawaban & skoring ke baris baru
    sheet.appendRow([
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      data.name,
      data.email,
      data.linguistik,
      data.matematis,
      data.spasial,
      data.kinestetik,
      data.musikal,
      data.interpersonal,
      data.intrapersonal,
      data.naturalis,
      data.dominant
    ]);
    
    // Mengembalikan respons JSON sukses
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Klik tombol **Save** (ikon disket) di bagian atas editor.

---

## Langkah 2: Terapkan Sebagai Web App

1. Klik tombol **Deploy** (Terapkan) di bagian kanan atas > pilih **New deployment** (Penerapan baru).
2. Klik ikon gir (pilih jenis penerapan) > pilih **Web app** (Aplikasi web).
3. Isi konfigurasi sebagai berikut:
   * **Description**: `Konektor Formulir Kuis Kecerdasan` (atau bebas).
   * **Execute as** (Jalankan sebagai): **Me** (Email Anda).
   * **Who has access** (Siapa yang memiliki akses): **Anyone** (Siapa saja). *Ini wajib diatur ke 'Anyone' agar website Anda bisa mengirimkan data.*
4. Klik tombol **Deploy**.
5. Google akan meminta otorisasi keamanan. Klik **Authorize Access** (Izinkan Akses), pilih akun Google Anda, klik **Advanced** di bagian kiri bawah, lalu klik **Go to Untitled project (unsafe)**, dan terakhir klik **Allow**.
6. Salin **Web app URL** yang muncul (bentuk URL-nya berakhiran `/exec`).

---

## Langkah 3: Konfigurasi di Website Anda

1. Buka file [`.env.local`](file:///c:/xampp/htdocs/personality-test/.env.local) di folder root proyek Anda.
2. Tempel URL Web App yang sudah Anda salin ke variabel `SHEET_WEBAPP_URL`:

```env
SHEET_WEBAPP_URL=https://script.google.com/macros/s/XXXXXX/exec
```

3. Simpan file `.env.local` lalu restart server Next.js Anda jika sedang berjalan (`npm run dev`).

Selesai! Sekarang setiap kali pengguna menyelesaikan kuis (atau Anda mengeklik tombol "Demo Instan (Acak)"), nama, email, dan seluruh skor 8 dimensi kecerdasan akan otomatis tercatat rapi di Google Sheets Anda.
