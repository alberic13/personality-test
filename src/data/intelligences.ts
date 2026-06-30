import { IntelligenceType } from "../types/quiz";

export const intelligences: Record<string, IntelligenceType> = {
  linguistik: {
    key: "linguistik",
    name: "Kecerdasan Verbal / Linguistik",
    description: "Kemampuan untuk menggunakan bahasa atau kata-kata secara efektif baik secara lisan maupun tulisan.",
    majors: ["Sastra", "Linguistik", "Jurnalistik", "Ilmu Komunikasi", "Ilmu Hukum"],
    careers: ["Pengajar/Guru", "Pengacara", "Politikus", "Wartawan/Jurnalis", "Presenter", "Penyiar", "Tour Guide", "Sales/Marketing"],
  },
  matematis: {
    key: "matematis",
    name: "Kecerdasan Logis / Matematis",
    description: "Kemampuan menggunakan angka-angka dan penalaran logika dengan baik, memiliki minat besar untuk bereksplorasi, menganalisis pola, serta memecahkan masalah matematika yang kompleks.",
    majors: ["Teknik", "Ilmu Ekonomi", "Ilmu Administrasi", "Ilmu Komputer", "Kedokteran", "Sains (Fisika, Kimia, Matematika)"],
    careers: ["Insinyur/Engineer", "Dokter", "Peneliti/Ilmuwan", "Pengacara/Analis Hukum", "Akuntan", "Programmer/Developer", "Analis Sistem", "Analis Keuangan", "Banker"],
  },
  spasial: {
    key: "spasial",
    name: "Kecerdasan Visual / Spasial",
    description: "Kemampuan berpikir dalam bentuk dua atau tiga dimensi, termasuk pemahaman visual akan bentuk, ruang, arah, lokasi, serta hubungan antar benda dalam ruangan.",
    majors: ["Arsitektur", "Fotografi", "Seni Rupa/Desain", "Teknik Dirgantara", "Planologi (Tata Kota)"],
    careers: ["Arsitek", "Desainer (Grafis/Fashion/Interior)", "Perencana Tata Kota", "Seniman", "Fotografer", "Animator", "Pelaut", "Pilot"],
  },
  kinestetik: {
    key: "kinestetik",
    name: "Kecerdasan Kinestetik",
    description: "Kemampuan untuk menggunakan seluruh atau sebagian anggota gerak tubuh untuk mengekspresikan ide dan perasaan dengan ketepatan (presisi) tinggi.",
    majors: ["Ilmu Keolahragaan", "Seni Kriya", "Seni Tari/Teater", "Tata Busana", "Pendidikan Bedah (Kedokteran)"],
    careers: ["Atlet/Olahragawan", "Penari", "Koreografer", "Pemeran Pantomim", "Aktor/Aktris", "Model", "Pramugara/Pramugari", "Ahli Arloji/Jam", "Pengrajin/Perakit", "Dokter Bedah", "Trainer Atraktif"],
  },
  musikal: {
    key: "musikal",
    name: "Kecerdasan Musikal",
    description: "Kemampuan untuk memahami, mengapresiasi, memainkan, dan menciptakan musik serta memiliki kepekaan tinggi terhadap ritme, melodi, pitch, dan nada suara.",
    majors: ["Seni Musik", "Pendidikan Musik", "Komposisi Musik"],
    careers: ["Penyanyi/Vokalis", "Pencipta Lagu/Komposer", "Pemusik/Instrumentalis", "Guru Musik", "Dirigen", "Music Director", "Video/Disc Jockey (VJ/DJ)", "Music Arranger"],
  },
  interpersonal: {
    key: "interpersonal",
    name: "Kecerdasan Interpersonal",
    description: "Kemampuan memahami, menganalisis, berinteraksi, dan bekerja sama dengan orang lain secara efektif, peka terhadap perasaan, kebutuhan, dan motivasi orang lain, serta mampu berempati.",
    majors: ["Psikologi", "Keguruan & Pendidikan", "Humas/Ilmu Komunikasi", "Manajemen Pelayanan Jasa"],
    careers: ["Pengajar/Edukator", "Politikus", "Pebisnis/Entrepreneur", "Marketing Communication", "Public Relations", "Konsultan", "Pekerja Sosial", "Aktor/Aktris", "Rohaniwan/Pemuka Agama", "Perawat", "Terapis"],
  },
  intrapersonal: {
    key: "intrapersonal",
    name: "Kecerdasan Intrapersonal",
    description: "Kemampuan untuk memahami, menganalisis, dan merefleksikan diri sendiri, mengenali kekuatan serta keterbatasan diri, serta menyadari emosi, keinginan, harapan, dan tujuan hidup.",
    majors: ["Filsafat/Teologi", "Bimbingan Konseling", "Psikologi Klinis"],
    careers: ["Pelatih/Coach", "Pengajar/Dosen", "Penulis/Sastrawan", "Peneliti", "Konselor/Terapis", "Psikolog", "Rohaniwan", "Wirausahawan (Self-Employed)"],
  },
  naturalis: {
    key: "naturalis",
    name: "Kecerdasan Naturalis",
    description: "Kemampuan untuk mengenali, mengklasifikasi, dan memahami flora, fauna, serta fenomena alam di lingkungan sekitar, serta berinteraksi secara efektif dengan alam bebas.",
    majors: ["Pertanian", "Peternakan", "Kedokteran Hewan", "Biologi/Kehutanan", "Manajemen Pariwisata Alam"],
    careers: ["Aktivis Lingkungan", "Ahli Pertanian/Peternakan", "Spesialis Budi Daya", "Pemandu Wisata Alam", "Polisi Hutan/Ranger", "Dokter Hewan", "Pengelola Kebun Binatang/Cagar Alam", "Pengusaha Hewan Peliharaan"],
  },
};
