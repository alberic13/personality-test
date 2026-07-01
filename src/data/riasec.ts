import { IntelligenceType } from "../types/quiz";

export const riasecTypes: Record<string, IntelligenceType> = {
  realistic: {
    key: "realistic",
    name: "Realistic (Realistik)",
    description: "Menyukai aktivitas luar ruangan, bekerja menggunakan tangan, mesin, alat-alat, hewan, atau tanaman. Orang dengan tipe ini cenderung praktis, mekanis, fisik, terstruktur, dan lebih suka memecahkan masalah konkret dibandingkan teoritis.",
    majors: [
      "Teknik Mesin",
      "Teknik Elektro",
      "Teknik Sipil",
      "Pertanian & Agronomi",
      "Kehutanan",
      "Peternakan",
      "Teknik Otomotif"
    ],
    careers: [
      "Teknisi",
      "Insinyur Mekanik/Elektro/Sipil",
      "Ahli Listrik (Electrician)",
      "Petani/Peternak Profesional",
      "Operator Alat Berat/Mesin",
      "Pilot",
      "Dokter Hewan",
      "Montir Otomotif"
    ]
  },
  investigative: {
    key: "investigative",
    name: "Investigative (Investigatif)",
    description: "Menyukai aktivitas analitis, observasi, penelitian, dan pemecahan masalah ilmiah atau matematis. Orang dengan tipe ini cenderung teoritis, intelektual, mandiri, penasaran (curious), dan senang mengeksplorasi ide-ide rumit.",
    majors: [
      "Fisika / Kimia / Matematika",
      "Biologi & Bioteknologi",
      "Kedokteran & Farmasi",
      "Ilmu Komputer & Informatika",
      "Astronomi",
      "Statistika / Data Science"
    ],
    careers: [
      "Peneliti/Ilmuwan",
      "Dokter/Spesialis Medis",
      "Ahli Matematika & Statistika",
      "Analyst Data",
      "Software Engineer / Programmer",
      "Apoteker/Farmakolog",
      "Laboran/Ahli Patologi"
    ]
  },
  artistic: {
    key: "artistic",
    name: "Artistic (Artistik)",
    description: "Menyukai aktivitas kreatif, ekspresif, tidak terstruktur, dan orisinal. Sangat menghargai seni, musik, sastra, drama, atau desain. Orang dengan tipe ini cenderung imajinatif, mandiri, intuitif, dan tidak menyukai rutinitas yang kaku.",
    majors: [
      "Desain Komunikasi Visual (DKV)",
      "Seni Rupa & Kriya",
      "Seni Musik & Vokal",
      "Sastra & Bahasa",
      "Teater, Film, & Penyiaran",
      "Arsitektur & Desain Interior"
    ],
    careers: [
      "Seniman/Pelukis/Pematung",
      "Desainer Grafis / UX Designer",
      "Penulis/Sastrawan/Copywriter",
      "Musisi/Pencipta Lagu",
      "Aktor/Aktris/Sutradara",
      "Arsitek",
      "Fotografer/Videografer"
    ]
  },
  social: {
    key: "social",
    name: "Social (Sosial)",
    description: "Menyukai aktivitas membantu, mendidik, mengajar, menyembuhkan, merawat, atau melayani orang lain. Cenderung ramah, kooperatif, berempati tinggi, komunikatif, dan senang bekerja sama dalam kelompok/komunitas.",
    majors: [
      "Bimbingan Konseling / Psikologi",
      "Pendidikan & Keguruan",
      "Keperawatan & Kebidanan",
      "Ilmu Kesejahteraan Sosial",
      "Ilmu Hubungan Internasional",
      "Ilmu Komunikasi (Humas)"
    ],
    careers: [
      "Guru / Dosen",
      "Psikolog / Konselor",
      "Perawat/Terapis",
      "Pekerja Sosial",
      "Hubungan Masyarakat (PR)",
      "Customer Service Specialist",
      "Rohaniwan / Pemuka Agama"
    ]
  },
  enterprising: {
    key: "enterprising",
    name: "Enterprising (Giat / Enterprising)",
    description: "Menyukai aktivitas memimpin, memengaruhi, membujuk, mengarahkan, atau menjual produk untuk mencapai tujuan bisnis atau organisasi. Cenderung ambisius, persuasif, berenergi tinggi, berani mengambil risiko, dan berjiwa kepemimpinan.",
    majors: [
      "Manajemen & Bisnis",
      "Kewirausahaan (Entrepreneurship)",
      "Pemasaran (Marketing)",
      "Ilmu Hukum",
      "Ilmu Politik / Administrasi Publik",
      "Hubungan Masyarakat"
    ],
    careers: [
      "Wirausahawan / Pebisnis",
      "Manajer Pemasaran / Penjualan",
      "Pengacara / Konsultan Hukum",
      "Politikus / Pemimpin Organisasi",
      "Sales Executive / Broker",
      "Eksekutif Perusahaan",
      "Project Manager"
    ]
  },
  conventional: {
    key: "conventional",
    name: "Conventional (Konvensional)",
    description: "Menyukai aktivitas teratur, terstruktur, mengelola data, administrasi, pembukuan, dan pencatatan secara sistematis dan detail. Cenderung rapi, teliti, efisien, menyukai keteraturan, dan sangat baik dalam menjalankan instruksi tertulis secara presisi.",
    majors: [
      "Akuntansi & Keuangan",
      "Administrasi Perkantoran/Bisnis",
      "Ilmu Perpustakaan & Kearsipan",
      "Statistika / Manajemen Data",
      "Teknologi Informasi (Database Admin)"
    ],
    careers: [
      "Akuntan / Auditor",
      "Staf Administrasi / Sekretaris",
      "Pengarsip (Archivist)",
      "Pustakawan",
      "Database Administrator",
      "Data Entry Operator",
      "Pegawai Bank / Teller"
    ]
  }
};
