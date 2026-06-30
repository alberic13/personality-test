import { Question } from "../types/quiz";

export const questions: Question[] = [
  // 1-10: Kecerdasan Verbal / Linguistik
  { id: 1, text: "Saya suka bercerita, termasuk cerita dongeng dan cerita yang lucu.", dimension: "linguistik" },
  { id: 2, text: "Saya memiliki ingatan yang baik untuk hal-hal yang sepele.", dimension: "linguistik" },
  { id: 3, text: "Saya menyukai permainan kata-kata (seperti scrabble dan puzzle).", dimension: "linguistik" },
  { id: 4, text: "Saya membaca buku hanya sebagai hobi.", dimension: "linguistik" },
  { id: 5, text: "Saya seorang pembicara yang baik (hampir setiap waktu).", dimension: "linguistik" },
  { id: 6, text: "Dalam berargumentasi, saya cenderung menggunakan kata-kata sindiran.", dimension: "linguistik" },
  { id: 7, text: "Saya senang membicarakan dan menulis ide-ide saya.", dimension: "linguistik" },
  { id: 8, text: "Jika saya harus mengingat sesuatu, saya menciptakan irama-irama atau kata-kata yang membantu saya untuk mengingatnya.", dimension: "linguistik" },
  { id: 9, text: "Jika sesuatu rusak dan tidak berfungsi, saya akan membaca buku panduannya terlebih dahulu.", dimension: "linguistik" },
  { id: 10, text: "Dalam kerja kelompok (untuk menyiapkan sebuah presentasi), saya lebih memilih untuk menulis dan melakukan riset pustaka.", dimension: "linguistik" },

  // 11-20: Kecerdasan Logis / Matematis
  { id: 11, text: "Saya sangat menikmati pelajaran matematika.", dimension: "matematis" },
  { id: 12, text: "Saya menyukai permainan yang menggunakan logika, seperti teka-teki angka.", dimension: "matematis" },
  { id: 13, text: "Dapat memecahkan soal-soal hitungan adalah hal yang menyenangkan bagi saya.", dimension: "matematis" },
  { id: 14, text: "Jika saya harus mengingat sesuatu, saya cenderung menempatkan setiap kejadian dalam urutan yang logis.", dimension: "matematis" },
  { id: 15, text: "Saya senang mencari tahu bagaimana cara kerja setiap benda.", dimension: "matematis" },
  { id: 16, text: "Saya menyukai komputer dan berbagai permainan angka-angka.", dimension: "matematis" },
  { id: 17, text: "Saya suka bermain catur, checkers, atau monopoli.", dimension: "matematis" },
  { id: 18, text: "Dalam berargumentasi, saya mencoba mencari solusi yang adil dan logis.", dimension: "matematis" },
  { id: 19, text: "Jika sesuatu rusak dan tidak berfungsi, saya melihat bagian-bagiannya (atau komponen-komponennya) dan mencari tahu bagaimana cara kerjanya.", dimension: "matematis" },
  { id: 20, text: "Dalam kerja kelompok, saya lebih memilih membuat diagram dan grafik.", dimension: "matematis" },

  // 21-30: Kecerdasan Visual / Spasial
  { id: 21, text: "Saya lebih memilih peta daripada petunjuk tertulis dalam mencari sebuah alamat.", dimension: "spasial" },
  { id: 22, text: "Saya sering melamun.", dimension: "spasial" },
  { id: 23, text: "Saya menikmati hobi saya dalam bidang fotografi.", dimension: "spasial" },
  { id: 24, text: "Saya senang menggambar dan menciptakan sesuatu.", dimension: "spasial" },
  { id: 25, text: "Jika saya harus mengingat sesuatu, saya menggambar diagram untuk membantu saya mengingatnya.", dimension: "spasial" },
  { id: 26, text: "Saya senang membuat coretan-coretan di kertas kapan pun saya bisa.", dimension: "spasial" },
  { id: 27, text: "Ketika membaca majalah, saya lebih suka melihat gambar-gambarnya daripada membaca teksnya.", dimension: "spasial" },
  { id: 28, text: "Dalam berargumentasi, saya mencoba menjaga jarak, tetap berdiam diri, atau memvisualisasikan beberapa solusi.", dimension: "spasial" },
  { id: 29, text: "Jika sesuatu rusak dan tidak berfungsi, saya cenderung mempelajari diagram mengenai cara kerjanya.", dimension: "spasial" },
  { id: 30, text: "Dalam kerja kelompok, saya lebih memilih menggambar hal-hal yang penting.", dimension: "spasial" },

  // 31-40: Kecerdasan Kinestetik
  { id: 31, text: "Saya sangat suka berolahraga, senam menjadi olahraga favorit saya.", dimension: "kinestetik" },
  { id: 32, text: "Saya menyukai kegiatan-kegiatan seperti pertukangan, menjahit, dan membuat bentuk-bentuk.", dimension: "kinestetik" },
  { id: 33, text: "Ketika melihat benda-benda, saya senang menyentuhnya.", dimension: "kinestetik" },
  { id: 34, text: "Saya tidak dapat duduk diam dalam waktu yang lama.", dimension: "kinestetik" },
  { id: 35, text: "Saya menggunakan banyak gerakan tubuh ketika berbicara.", dimension: "kinestetik" },
  { id: 36, text: "Jika saya harus mengingat sesuatu, saya menuliskannya berkali-kali sampai saya memahaminya.", dimension: "kinestetik" },
  { id: 37, text: "Saya cenderung mengetuk-ngetuk jari saya atau memainkan pena/pensil selama jam pelajaran.", dimension: "kinestetik" },
  { id: 38, text: "Dalam berargumentasi, saya cenderung menyerang atau menghindarinya.", dimension: "kinestetik" },
  { id: 39, text: "Jika sesuatu rusak dan tidak berfungsi, saya cenderung memisahkan setiap bagian lalu menggabungkannya kembali.", dimension: "kinestetik" },
  { id: 40, text: "Dalam kerja kelompok, saya lebih memilih memindahkan barang atau membuat suatu bentuk.", dimension: "kinestetik" },

  // 41-50: Kecerdasan Musikal
  { id: 41, text: "Saya senang mendengarkan musik dan radio.", dimension: "musikal" },
  { id: 42, text: "Saya cenderung bersenandung ketika sedang bekerja.", dimension: "musikal" },
  { id: 43, text: "Saya suka bernyanyi.", dimension: "musikal" },
  { id: 44, text: "Saya bisa memainkan salah satu alat musik dengan baik.", dimension: "musikal" },
  { id: 45, text: "Saya suka mendengarkan musik sambil belajar atau sambil membaca buku.", dimension: "musikal" },
  { id: 46, text: "Jika saya harus mengingat sesuatu, saya mencoba untuk membuat irama tentang hal tersebut.", dimension: "musikal" },
  { id: 47, text: "Dalam berargumentasi, saya cenderung berteriak atau memukul (meja/benda) atau bergerak dalam suatu irama.", dimension: "musikal" },
  { id: 48, text: "Saya bisa menghafal nada-nada dari banyak lagu.", dimension: "musikal" },
  { id: 49, text: "Jika sesuatu rusak dan tidak berfungsi, saya cenderung mengetuk-ngetuk jari saya membentuk suatu irama sambil mencari jalan keluar.", dimension: "musikal" },
  { id: 50, text: "Dalam kerja kelompok, saya lebih suka menggunakan kata-kata baru pada nada atau musik yang sudah dikenal.", dimension: "musikal" },

  // 51-60: Kecerdasan Interpersonal
  { id: 51, text: "Saya mampu bergaul baik dengan orang lain.", dimension: "interpersonal" },
  { id: 52, text: "Saya senang berkumpul dan berorganisasi.", dimension: "interpersonal" },
  { id: 53, text: "Saya mempunyai beberapa teman dekat.", dimension: "interpersonal" },
  { id: 54, text: "Saya suka membantu mengajar murid-murid lain.", dimension: "interpersonal" },
  { id: 55, text: "Saya senang bekerja sama dalam kelompok.", dimension: "interpersonal" },
  { id: 56, text: "Teman-teman sering meminta saran dari saya karena saya terlihat sebagai pemimpin alamiah.", dimension: "interpersonal" },
  { id: 57, text: "Jika saya harus mengingat sesuatu, saya meminta seseorang untuk menguji saya apakah saya sudah memahaminya.", dimension: "interpersonal" },
  { id: 58, text: "Dalam berargumentasi, saya cenderung meminta bantuan teman atau pihak-pihak yang memiliki otoritas (ahli) dalam bidang tersebut.", dimension: "interpersonal" },
  { id: 59, text: "Jika sesuatu rusak dan tidak berfungsi, saya mencari seseorang yang dapat menolong saya.", dimension: "interpersonal" },
  { id: 60, text: "Dalam kerja kelompok, saya lebih memilih mengatur tugas dalam kelompok.", dimension: "interpersonal" },

  // 61-70: Kecerdasan Intrapersonal
  { id: 61, text: "Saya suka bekerja sendirian tanpa ada gangguan orang lain.", dimension: "intrapersonal" },
  { id: 62, text: "Saya suka menulis buku harian.", dimension: "intrapersonal" },
  { id: 63, text: "Saya menyukai diri saya (hampir setiap waktu).", dimension: "intrapersonal" },
  { id: 64, text: "Saya tidak suka keramaian.", dimension: "intrapersonal" },
  { id: 65, text: "Saya tahu kelebihan dan kekurangan diri saya.", dimension: "intrapersonal" },
  { id: 66, text: "Saya memiliki tekad yang kuat, mandiri, dan berpendirian kuat (tidak mudah ikut-ikutan orang lain).", dimension: "intrapersonal" },
  { id: 67, text: "Jika saya harus mengingat sesuatu saya cenderung menutup mata saya dan mendalami (merasakan) situasi yang sedang terjadi.", dimension: "intrapersonal" },
  { id: 68, text: "Dalam berargumentasi, saya biasanya menghindar (keluar ruangan) hingga saya dapat menenangkan diri.", dimension: "intrapersonal" },
  { id: 69, text: "Jika sesuatu rusak dan tidak berfungsi, saya mempertimbangkan apakah benda tersebut layak untuk diperbaiki.", dimension: "intrapersonal" },
  { id: 70, text: "Dalam kerja kelompok, saya senang mengkontribusikan sesuatu yang unik berdasarkan apa yang saya miliki dan rasakan.", dimension: "intrapersonal" },

  // 71-80: Kecerdasan Naturalis
  { id: 71, text: "Saya sangat memperhatikan sekeliling dan apa yang sedang terjadi di sekitar saya.", dimension: "naturalis" },
  { id: 72, text: "Saya senang berjalan-jalan di hutan (atau taman) dan melihat-lihat pohon serta bunga.", dimension: "naturalis" },
  { id: 73, text: "Saya senang berkebun.", dimension: "naturalis" },
  { id: 74, text: "Saya suka mengoleksi barang-barang seperti batu-batuan, kartu olahraga, perangko, dsb.", dimension: "naturalis" },
  { id: 75, text: "Ketika dewasa, saya ingin pergi dari kota yang ramai ke tempat yang masih alamiah untuk menikmati alam.", dimension: "naturalis" },
  { id: 76, text: "Jika saya harus mengingat sesuatu, saya cenderung mengkategorikannya dalam kelompok-kelompok.", dimension: "naturalis" },
  { id: 77, text: "Saya senang mempelajari nama-nama makhluk hidup di lingkungan tempat saya berada, seperti bunga dan pohon.", dimension: "naturalis" },
  { id: 78, text: "Dalam berargumentasi, saya cenderung membandingkan lawan saya dengan seseorang atau sesuatu yang pernah saya baca atau dengar lalu bereaksi.", dimension: "naturalis" },
  { id: 79, text: "Jika sesuatu rusak dan tidak berfungsi, saya memperhatikan sekeliling saya untuk melihat apa yang bisa saya temukan untuk memperbaikinya.", dimension: "naturalis" },
  { id: 80, text: "Dalam kerja kelompok, saya lebih memilih mengatur dan mengelompokkan informasi dalam kategori-kategori sehingga mudah dimengerti.", dimension: "naturalis" },
];
