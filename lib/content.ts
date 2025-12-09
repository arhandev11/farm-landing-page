// Site configuration and content data

export const siteConfig = {
  name: "Teras Farm",
  tagline: "Menghubungkan Petambak Udang dengan Pasar yang Adil",
  description:
    "Platform B2B yang menghubungkan petambak udang Indonesia dengan pembeli secara langsung, transparan, dan berkelanjutan.",
  email: "info@terasfarm.com",
  whatsapp: "6281234567890",
  address: "Jakarta, Indonesia",
  social: {
    instagram: "https://instagram.com/terasfarm",
    facebook: "https://facebook.com/terasfarm",
  },
};

export const navLinks = [
  { name: "Beranda", href: "#hero" },
  { name: "Tentang", href: "#tentang" },
  { name: "Cara Kerja", href: "#cara-kerja" },
  { name: "Keunggulan", href: "#keunggulan" },
  { name: "Produk", href: "#produk" },
  { name: "Mitra", href: "#mitra" },
  { name: "Komunitas", href: "#komunitas" },
  { name: "Blog", href: "#blog" },
  { name: "FAQ", href: "#faq" },
  { name: "Kontak", href: "#kontak" },
];

export const heroStats = [
  { value: "500+", label: "Petambak Mitra" },
  { value: "15", label: "Provinsi" },
  { value: "1000+", label: "Ton/Bulan" },
];

export const coreValues = [
  {
    id: 1,
    icon: "Eye",
    title: "Transparansi",
    description: "Harga terbuka dan jelas untuk semua pihak.",
  },
  {
    id: 2,
    icon: "Scale",
    title: "Keadilan",
    description: "Harga yang adil untuk petambak dan pembeli.",
  },
  {
    id: 3,
    icon: "Users",
    title: "Komunitas",
    description: "Membangun komunitas petambak yang kuat.",
  },
  {
    id: 4,
    icon: "Leaf",
    title: "Keberlanjutan",
    description: "Praktik budidaya yang ramah lingkungan.",
  },
];

export const howItWorks = {
  petambak: [
    {
      step: 1,
      icon: "ClipboardList",
      title: "Daftar",
      description: "Isi formulir pendaftaran dan verifikasi data tambak Anda.",
    },
    {
      step: 2,
      icon: "CheckCircle",
      title: "Verifikasi",
      description: "Tim kami akan memverifikasi lokasi dan kualitas tambak.",
    },
    {
      step: 3,
      icon: "Search",
      title: "Listing",
      description: "Produk Anda akan ditampilkan di platform kami.",
    },
    {
      step: 4,
      icon: "Handshake",
      title: "Transaksi",
      description: "Terima pesanan dan pembayaran langsung dengan aman.",
    },
  ],
  pembeli: [
    {
      step: 1,
      icon: "Package",
      title: "Pilih Produk",
      description: "Jelajahi katalog udang berkualitas dari berbagai daerah.",
    },
    {
      step: 2,
      icon: "ListChecks",
      title: "Request Quote",
      description: "Ajukan permintaan harga sesuai kebutuhan Anda.",
    },
    {
      step: 3,
      icon: "ShoppingCart",
      title: "Konfirmasi",
      description: "Konfirmasi pesanan dan lakukan pembayaran.",
    },
    {
      step: 4,
      icon: "Truck",
      title: "Pengiriman",
      description: "Produk dikirim langsung dari petambak ke lokasi Anda.",
    },
  ],
};

export const features = [
  {
    id: 1,
    icon: "BadgePercent",
    title: "Harga Transparan",
    description:
      "Lihat harga pasar real-time dan dapatkan penawaran terbaik tanpa markup tengkulak.",
  },
  {
    id: 2,
    icon: "MessageCircle",
    title: "Komunikasi Langsung",
    description:
      "Hubungi petambak atau pembeli secara langsung melalui platform kami.",
  },
  {
    id: 3,
    icon: "Award",
    title: "Kualitas Terjamin",
    description:
      "Setiap produk melalui proses verifikasi kualitas sebelum listing.",
  },
  {
    id: 4,
    icon: "Wallet",
    title: "Pembayaran Aman",
    description: "Sistem pembayaran yang aman dengan escrow protection.",
  },
  {
    id: 5,
    icon: "MapPin",
    title: "Traceability",
    description: "Lacak asal-usul produk dari tambak hingga ke tangan Anda.",
  },
];

export const products = [
  {
    id: "vaname",
    name: "Udang Vaname",
    description:
      "Udang vaname segar berkualitas tinggi dari petambak terpercaya. Cocok untuk restoran, hotel, dan industri pengolahan.",
    season: "Sepanjang tahun",
    sizes: ["20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-100"],
  },
  {
    id: "windu",
    name: "Udang Windu",
    description:
      "Udang windu premium dengan cita rasa khas. Ideal untuk hidangan seafood mewah dan ekspor.",
    season: "Musim kemarau (Mei - Oktober)",
    sizes: ["10-15", "15-20", "20-25", "25-30", "30-40"],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Pak Hendra",
    location: "Sidoarjo, Jawa Timur",
    quote:
      "Sejak bergabung dengan Teras Farm, pendapatan saya meningkat 30%. Tidak perlu lagi berurusan dengan tengkulak.",
  },
  {
    id: 2,
    name: "Bu Siti",
    location: "Jeneponto, Sulawesi Selatan",
    quote:
      "Platform ini sangat membantu. Saya bisa langsung terhubung dengan pembeli dari Jakarta dan Surabaya.",
  },
  {
    id: 3,
    name: "Pak Ahmad",
    location: "Lampung",
    quote:
      "Harga yang ditawarkan jauh lebih baik daripada menjual ke tengkulak lokal. Terima kasih Teras Farm!",
  },
];

export const communityPrograms = [
  {
    id: 1,
    icon: "GraduationCap",
    title: "Pelatihan Budidaya",
    description:
      "Workshop dan pelatihan teknik budidaya udang modern untuk meningkatkan produktivitas.",
  },
  {
    id: 2,
    icon: "Users",
    title: "Grup Diskusi",
    description:
      "Bergabung dengan grup WhatsApp khusus untuk berbagi pengalaman dan tips budidaya.",
  },
  {
    id: 3,
    icon: "MessageSquare",
    title: "Konsultasi Ahli",
    description:
      "Akses konsultasi gratis dengan ahli budidaya udang untuk mengatasi masalah tambak.",
  },
];

export const faqData = {
  petambak: [
    {
      question: "Bagaimana cara mendaftar sebagai mitra petambak?",
      answer:
        "Anda cukup mengisi formulir pendaftaran di website kami atau menghubungi tim sales. Setelah itu, tim kami akan melakukan verifikasi lokasi tambak dan memandu proses onboarding.",
    },
    {
      question: "Apakah ada biaya pendaftaran?",
      answer:
        "Tidak ada biaya pendaftaran. Kami hanya mengambil komisi kecil dari setiap transaksi yang berhasil.",
    },
    {
      question: "Bagaimana sistem pembayarannya?",
      answer:
        "Pembayaran dilakukan melalui sistem escrow. Pembeli membayar ke rekening bersama, dan dana akan direlease ke petambak setelah barang diterima dengan baik.",
    },
    {
      question: "Berapa minimal order yang bisa saya terima?",
      answer:
        "Minimal order tergantung kesepakatan dengan pembeli. Umumnya mulai dari 100 kg per transaksi.",
    },
  ],
  pembeli: [
    {
      question: "Bagaimana cara memesan udang di Teras Farm?",
      answer:
        "Anda bisa melihat katalog produk, memilih ukuran dan jumlah yang diinginkan, lalu mengajukan request quotation. Tim kami akan menghubungi Anda untuk konfirmasi.",
    },
    {
      question: "Apakah ada jaminan kualitas produk?",
      answer:
        "Ya, setiap produk yang dijual melalui platform kami sudah melalui proses verifikasi. Jika ada masalah kualitas, kami memiliki kebijakan refund.",
    },
    {
      question: "Bagaimana proses pengiriman?",
      answer:
        "Pengiriman dilakukan langsung dari lokasi petambak dengan menggunakan box styrofoam dan es untuk menjaga kesegaran. Kami bekerja sama dengan ekspedisi terpercaya.",
    },
    {
      question: "Apakah bisa nego harga untuk order besar?",
      answer:
        "Tentu, untuk order dalam jumlah besar (di atas 1 ton), Anda bisa mendapatkan harga khusus. Hubungi tim sales kami untuk negosiasi.",
    },
  ],
};
