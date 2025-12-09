import { ArrowRight, BookOpen, Calendar, Lightbulb, LucideIcon, Newspaper, TrendingUp } from "lucide-react";

const categories = [
  { id: "all", name: "Semua", icon: null },
  { id: "budidaya", name: "Budidaya", icon: BookOpen },
  { id: "tips", name: "Tips", icon: Lightbulb },
  { id: "harga", name: "Harga Pasar", icon: TrendingUp },
  { id: "berita", name: "Berita", icon: Newspaper },
];

const articles = [
  {
    id: 1,
    title: "Panduan Lengkap Budidaya Udang Vaname untuk Pemula",
    excerpt: "Pelajari langkah-langkah dasar memulai budidaya udang vaname dari persiapan tambak hingga panen.",
    category: "budidaya",
    date: "20 Nov 2024",
    readTime: "8 min",
    featured: true,
  },
  {
    id: 2,
    title: "5 Tips Menjaga Kualitas Air Tambak di Musim Hujan",
    excerpt: "Musim hujan bisa menjadi tantangan bagi petambak. Simak tips menjaga kualitas air tambak Anda.",
    category: "tips",
    date: "18 Nov 2024",
    readTime: "5 min",
    featured: false,
  },
  {
    id: 3,
    title: "Update Harga Udang Vaname November 2024",
    excerpt: "Pantau perkembangan harga udang vaname di berbagai daerah Indonesia bulan ini.",
    category: "harga",
    date: "15 Nov 2024",
    readTime: "3 min",
    featured: false,
  },
  {
    id: 4,
    title: "Teras Farm Ekspansi ke 5 Provinsi Baru",
    excerpt: "Kabar gembira! Teras Farm kini hadir di Kalimantan dan Sulawesi untuk menjangkau lebih banyak petambak.",
    category: "berita",
    date: "10 Nov 2024",
    readTime: "4 min",
    featured: false,
  },
];

export default function Blog() {
  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

  return (
    <section id="blog" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Blog & Edukasi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Artikel & <span className="text-ocean-blue">Informasi Terkini</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Dapatkan informasi seputar budidaya udang, tips, harga pasar, dan berita industri.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const IconComponent = cat.icon as LucideIcon | null;
            return (
              <button
                key={cat.id}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  cat.id === "all"
                    ? "bg-ocean-blue text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {IconComponent && <IconComponent size={16} />}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-r from-ocean-blue/5 to-teal/5 rounded-3xl overflow-hidden">
              {/* Image Placeholder */}
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-ocean-blue/10 to-teal/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                    <BookOpen className="text-ocean-blue" size={40} />
                  </div>
                  <p className="text-gray-500 text-sm">blog-featured.png</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1 text-ocean-blue text-sm font-semibold mb-4">
                  <BookOpen size={16} />
                  Budidaya
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {featuredArticle.date}
                  </span>
                  <span>{featuredArticle.readTime} baca</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-ocean-blue font-semibold hover:gap-3 transition-all"
                >
                  Baca Selengkapnya
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => {
            const categoryData = categories.find((c) => c.id === article.category);
            const IconComponent = categoryData?.icon as LucideIcon | null;

            return (
              <article
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-ocean-blue/5 to-teal/5 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-2 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                      {IconComponent && <IconComponent className="text-ocean-blue" size={24} />}
                    </div>
                    <p className="text-gray-400 text-xs">blog-thumbnail.png</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-flex items-center gap-1 text-ocean-blue text-xs font-semibold mb-3">
                    {IconComponent && <IconComponent size={12} />}
                    {categoryData?.name}
                  </span>
                  <h4 className="font-bold text-navy mb-2 group-hover:text-ocean-blue transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <span>{article.readTime} baca</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-3 rounded-full font-semibold transition-all"
          >
            Lihat Semua Artikel
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
