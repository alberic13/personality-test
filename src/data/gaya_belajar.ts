import { IntelligenceType } from "../types/quiz";

export const gayaBelajarTypes: Record<string, IntelligenceType> = {
  gaya_visual: {
    key: "gaya_visual",
    name: "Visual (Gaya Belajar Visual)",
    description: "Gaya belajar yang cenderung menyerap informasi baru secara optimal melalui pengamatan visual (gambar, diagram, peta pikiran, teks tertulis, video, dan demonstrasi). Orang dengan tipe ini biasanya memiliki ingatan visual yang kuat dan lebih mudah belajar dengan membaca atau melihat.",
    majors: ["Desain Grafis / DKV", "Arsitektur", "Seni Rupa & Kriya", "Fotografi & Videografi", "Ilmu Perpustakaan", "Pendidikan Seni Visual"],
    careers: ["Desainer Grafis", "Arsitek", "Fotografer", "Editor Video", "Ilustrator / Animator", "Web Designer", "Pustakawan", "Pelukis"]
  },
  gaya_auditori: {
    key: "gaya_auditori",
    name: "Auditori (Gaya Belajar Auditori)",
    description: "Gaya belajar yang mengandalkan pendengaran untuk memahami dan mengingat informasi. Orang tipe ini lebih mudah menyerap penjelasan lisan, diskusi kelompok, rekaman audio, dan penjelasan verbal, serta sangat peka terhadap intonasi, ritme, dan bunyi.",
    majors: ["Ilmu Komunikasi", "Hubungan Internasional", "Sastra & Bahasa", "Seni Musik & Vokal", "Ilmu Hukum", "Pendidikan Bimbingan Konseling"],
    careers: ["Penyiar Radio / Podcaster", "Jurnalis / Reporter", "Guru / Dosen / Tentor", "Humas / Public Relations", "Penerjemah / Interpreter", "Musisi / Penyanyi", "Konselor / Terapis Lisan"]
  },
  gaya_kinestetik: {
    key: "gaya_kinestetik",
    name: "Kinestetik (Gaya Belajar Kinestetik)",
    description: "Gaya belajar yang memproses informasi secara optimal melalui gerakan fisik, aktivitas langsung (hands-on), eksperimen, praktik lapangan, dan keterlibatan fisik dengan objek belajar. Orang tipe ini tidak suka duduk diam terlalu lama dan lebih suka belajar sambil melakukan.",
    majors: ["Teknik Mesin", "Pendidikan Jasmani & Olahraga", "Kedokteran Bedah", "Seni Tari & Teater", "Arkeologi / Geologi", "Pariwisata & Perhotelan"],
    careers: ["Atlet / Pelatih Olahraga", "Aktor / Penari", "Dokter Bedah", "Teknisi / Insinyur Lapangan", "Chef / Ahli Kuliner", "Arkeolog", "Pemandu Wisata", "Pengrajin / Pembuat Kriya"]
  }
};
