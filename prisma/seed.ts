import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");

const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Site Config
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Teras Farm",
      tagline: "Menghubungkan Petambak Udang dengan Pasar yang Adil",
      description:
        "Platform B2B yang menghubungkan petambak udang Indonesia dengan pembeli secara langsung, transparan, dan berkelanjutan.",
      email: "info@terasfarm.com",
      whatsapp: "6281234567890",
      address: "Jakarta, Indonesia",
      instagram: "https://instagram.com/terasfarm",
      facebook: "https://facebook.com/terasfarm",
    },
  });
  console.log("✅ Site Config seeded");

  // Seed Nav Links
  const navLinks = [
    { name: "Beranda", href: "#hero", order: 1 },
    { name: "Tentang", href: "#tentang", order: 2 },
    { name: "Cara Kerja", href: "#cara-kerja", order: 3 },
    { name: "Keunggulan", href: "#keunggulan", order: 4 },
    { name: "Produk", href: "#produk", order: 5 },
    { name: "Mitra", href: "#mitra", order: 6 },
    { name: "Komunitas", href: "#komunitas", order: 7 },
    { name: "Blog", href: "#blog", order: 8 },
    { name: "FAQ", href: "#faq", order: 9 },
    { name: "Kontak", href: "#kontak", order: 10 },
  ];
  await prisma.navLink.deleteMany();
  await prisma.navLink.createMany({ data: navLinks });
  console.log("✅ Nav Links seeded");

  // Seed Hero Stats
  const heroStats = [
    { value: "500+", label: "Petambak Mitra", order: 1 },
    { value: "15", label: "Provinsi", order: 2 },
    { value: "1000+", label: "Ton/Bulan", order: 3 },
  ];
  await prisma.heroStat.deleteMany();
  await prisma.heroStat.createMany({ data: heroStats });
  console.log("✅ Hero Stats seeded");

  // Seed Core Values
  const coreValues = [
    {
      icon: "Eye",
      title: "Transparansi",
      description: "Harga terbuka dan jelas untuk semua pihak.",
      order: 1,
    },
    {
      icon: "Scale",
      title: "Keadilan",
      description: "Harga yang adil untuk petambak dan pembeli.",
      order: 2,
    },
    {
      icon: "Users",
      title: "Komunitas",
      description: "Membangun komunitas petambak yang kuat.",
      order: 3,
    },
    {
      icon: "Leaf",
      title: "Keberlanjutan",
      description: "Praktik budidaya yang ramah lingkungan.",
      order: 4,
    },
  ];
  await prisma.coreValue.deleteMany();
  await prisma.coreValue.createMany({ data: coreValues });
  console.log("✅ Core Values seeded");

  // Seed How It Works - Petambak
  const howItWorksPetambak = [
    {
      type: "petambak",
      step: 1,
      icon: "ClipboardList",
      title: "Daftar",
      description: "Isi formulir pendaftaran dan verifikasi data tambak Anda.",
      order: 1,
    },
    {
      type: "petambak",
      step: 2,
      icon: "CheckCircle",
      title: "Verifikasi",
      description: "Tim kami akan memverifikasi lokasi dan kualitas tambak.",
      order: 2,
    },
    {
      type: "petambak",
      step: 3,
      icon: "Search",
      title: "Listing",
      description: "Produk Anda akan ditampilkan di platform kami.",
      order: 3,
    },
    {
      type: "petambak",
      step: 4,
      icon: "Handshake",
      title: "Transaksi",
      description: "Terima pesanan dan pembayaran langsung dengan aman.",
      order: 4,
    },
  ];

  // Seed How It Works - Pembeli
  const howItWorksPembeli = [
    {
      type: "pembeli",
      step: 1,
      icon: "Package",
      title: "Pilih Produk",
      description: "Jelajahi katalog udang berkualitas dari berbagai daerah.",
      order: 1,
    },
    {
      type: "pembeli",
      step: 2,
      icon: "ListChecks",
      title: "Request Quote",
      description: "Ajukan permintaan harga sesuai kebutuhan Anda.",
      order: 2,
    },
    {
      type: "pembeli",
      step: 3,
      icon: "ShoppingCart",
      title: "Konfirmasi",
      description: "Konfirmasi pesanan dan lakukan pembayaran.",
      order: 3,
    },
    {
      type: "pembeli",
      step: 4,
      icon: "Truck",
      title: "Pengiriman",
      description: "Produk dikirim langsung dari petambak ke lokasi Anda.",
      order: 4,
    },
  ];
  await prisma.howItWorksStep.deleteMany();
  await prisma.howItWorksStep.createMany({
    data: [...howItWorksPetambak, ...howItWorksPembeli],
  });
  console.log("✅ How It Works seeded");

  // Seed Features
  const features = [
    {
      icon: "BadgePercent",
      title: "Harga Transparan",
      description:
        "Lihat harga pasar real-time dan dapatkan penawaran terbaik tanpa markup tengkulak.",
      order: 1,
    },
    {
      icon: "MessageCircle",
      title: "Komunikasi Langsung",
      description:
        "Hubungi petambak atau pembeli secara langsung melalui platform kami.",
      order: 2,
    },
    {
      icon: "Award",
      title: "Kualitas Terjamin",
      description:
        "Setiap produk melalui proses verifikasi kualitas sebelum listing.",
      order: 3,
    },
    {
      icon: "Wallet",
      title: "Pembayaran Aman",
      description: "Sistem pembayaran yang aman dengan escrow protection.",
      order: 4,
    },
    {
      icon: "MapPin",
      title: "Traceability",
      description: "Lacak asal-usul produk dari tambak hingga ke tangan Anda.",
      order: 5,
    },
  ];
  await prisma.feature.deleteMany();
  await prisma.feature.createMany({ data: features });
  console.log("✅ Features seeded");

  // Seed Products
  const products = [
    {
      slug: "vaname",
      name: "Udang Vaname",
      description:
        "Udang vaname segar berkualitas tinggi dari petambak terpercaya. Cocok untuk restoran, hotel, dan industri pengolahan.",
      season: "Sepanjang tahun",
      sizes: JSON.stringify([
        "20-30",
        "30-40",
        "40-50",
        "50-60",
        "60-70",
        "70-80",
        "80-100",
      ]),
      order: 1,
    },
    {
      slug: "windu",
      name: "Udang Windu",
      description:
        "Udang windu premium dengan cita rasa khas. Ideal untuk hidangan seafood mewah dan ekspor.",
      season: "Musim kemarau (Mei - Oktober)",
      sizes: JSON.stringify(["10-15", "15-20", "20-25", "25-30", "30-40"]),
      order: 2,
    },
  ];
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });
  console.log("✅ Products seeded");

  // Seed Testimonials
  const testimonials = [
    {
      name: "Pak Hendra",
      location: "Sidoarjo, Jawa Timur",
      quote:
        "Sejak bergabung dengan Teras Farm, pendapatan saya meningkat 30%. Tidak perlu lagi berurusan dengan tengkulak.",
      order: 1,
    },
    {
      name: "Bu Siti",
      location: "Jeneponto, Sulawesi Selatan",
      quote:
        "Platform ini sangat membantu. Saya bisa langsung terhubung dengan pembeli dari Jakarta dan Surabaya.",
      order: 2,
    },
    {
      name: "Pak Ahmad",
      location: "Lampung",
      quote:
        "Harga yang ditawarkan jauh lebih baik daripada menjual ke tengkulak lokal. Terima kasih Teras Farm!",
      order: 3,
    },
  ];
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });
  console.log("✅ Testimonials seeded");

  // Seed Community Programs
  const communityPrograms = [
    {
      icon: "GraduationCap",
      title: "Pelatihan Budidaya",
      description:
        "Workshop dan pelatihan teknik budidaya udang modern untuk meningkatkan produktivitas.",
      order: 1,
    },
    {
      icon: "Users",
      title: "Grup Diskusi",
      description:
        "Bergabung dengan grup WhatsApp khusus untuk berbagi pengalaman dan tips budidaya.",
      order: 2,
    },
    {
      icon: "MessageSquare",
      title: "Konsultasi Ahli",
      description:
        "Akses konsultasi gratis dengan ahli budidaya udang untuk mengatasi masalah tambak.",
      order: 3,
    },
  ];
  await prisma.communityProgram.deleteMany();
  await prisma.communityProgram.createMany({ data: communityPrograms });
  console.log("✅ Community Programs seeded");

  // Seed Blog Articles
  const blogArticles = [
    {
      title: "Panduan Lengkap Budidaya Udang Vaname untuk Pemula",
      excerpt:
        "Pelajari langkah-langkah dasar memulai budidaya udang vaname dari persiapan tambak hingga panen.",
      category: "budidaya",
      date: "20 Nov 2024",
      readTime: "8 min",
      featured: true,
      order: 1,
    },
    {
      title: "5 Tips Menjaga Kualitas Air Tambak di Musim Hujan",
      excerpt:
        "Musim hujan bisa menjadi tantangan bagi petambak. Simak tips menjaga kualitas air tambak Anda.",
      category: "tips",
      date: "18 Nov 2024",
      readTime: "5 min",
      featured: false,
      order: 2,
    },
    {
      title: "Update Harga Udang Vaname November 2024",
      excerpt:
        "Pantau perkembangan harga udang vaname di berbagai daerah Indonesia bulan ini.",
      category: "harga",
      date: "15 Nov 2024",
      readTime: "3 min",
      featured: false,
      order: 3,
    },
    {
      title: "Teras Farm Ekspansi ke 5 Provinsi Baru",
      excerpt:
        "Kabar gembira! Teras Farm kini hadir di Kalimantan dan Sulawesi untuk menjangkau lebih banyak petambak.",
      category: "berita",
      date: "10 Nov 2024",
      readTime: "4 min",
      featured: false,
      order: 4,
    },
  ];
  await prisma.blogArticle.deleteMany();
  await prisma.blogArticle.createMany({ data: blogArticles });
  console.log("✅ Blog Articles seeded");

  // Seed FAQs - Petambak
  const faqPetambak = [
    {
      type: "petambak",
      question: "Bagaimana cara mendaftar sebagai mitra petambak?",
      answer:
        "Anda cukup mengisi formulir pendaftaran di website kami atau menghubungi tim sales. Setelah itu, tim kami akan melakukan verifikasi lokasi tambak dan memandu proses onboarding.",
      order: 1,
    },
    {
      type: "petambak",
      question: "Apakah ada biaya pendaftaran?",
      answer:
        "Tidak ada biaya pendaftaran. Kami hanya mengambil komisi kecil dari setiap transaksi yang berhasil.",
      order: 2,
    },
    {
      type: "petambak",
      question: "Bagaimana sistem pembayarannya?",
      answer:
        "Pembayaran dilakukan melalui sistem escrow. Pembeli membayar ke rekening bersama, dan dana akan direlease ke petambak setelah barang diterima dengan baik.",
      order: 3,
    },
    {
      type: "petambak",
      question: "Berapa minimal order yang bisa saya terima?",
      answer:
        "Minimal order tergantung kesepakatan dengan pembeli. Umumnya mulai dari 100 kg per transaksi.",
      order: 4,
    },
  ];

  // Seed FAQs - Pembeli
  const faqPembeli = [
    {
      type: "pembeli",
      question: "Bagaimana cara memesan udang di Teras Farm?",
      answer:
        "Anda bisa melihat katalog produk, memilih ukuran dan jumlah yang diinginkan, lalu mengajukan request quotation. Tim kami akan menghubungi Anda untuk konfirmasi.",
      order: 1,
    },
    {
      type: "pembeli",
      question: "Apakah ada jaminan kualitas produk?",
      answer:
        "Ya, setiap produk yang dijual melalui platform kami sudah melalui proses verifikasi. Jika ada masalah kualitas, kami memiliki kebijakan refund.",
      order: 2,
    },
    {
      type: "pembeli",
      question: "Bagaimana proses pengiriman?",
      answer:
        "Pengiriman dilakukan langsung dari lokasi petambak dengan menggunakan box styrofoam dan es untuk menjaga kesegaran. Kami bekerja sama dengan ekspedisi terpercaya.",
      order: 3,
    },
    {
      type: "pembeli",
      question: "Apakah bisa nego harga untuk order besar?",
      answer:
        "Tentu, untuk order dalam jumlah besar (di atas 1 ton), Anda bisa mendapatkan harga khusus. Hubungi tim sales kami untuk negosiasi.",
      order: 4,
    },
  ];
  await prisma.fAQ.deleteMany();
  await prisma.fAQ.createMany({ data: [...faqPetambak, ...faqPembeli] });
  console.log("✅ FAQs seeded");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
