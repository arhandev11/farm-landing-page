"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Lightbulb, LucideIcon, Newspaper, TrendingUp } from "lucide-react";
import Image from "next/image";

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
          <Badge variant="outline" className="text-teal border-teal/20 bg-teal/5 mb-4 px-4 py-1 text-sm uppercase tracking-wider">
            Blog & Edukasi
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Artikel & <span className="text-ocean-blue">Informasi Terkini</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Dapatkan informasi seputar budidaya udang, tips, harga pasar, dan berita industri.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => {
            const IconComponent = cat.icon as LucideIcon | null;
            return (
              <Button
                key={cat.id}
                variant={cat.id === "all" ? "default" : "outline"}
                className={cn(
                  "rounded-full px-6",
                  cat.id === "all" ? "bg-ocean-blue hover:bg-ocean-blue/90" : "border-gray-200 text-gray-600 hover:text-ocean-blue hover:border-ocean-blue"
                )}
              >
                {IconComponent && <IconComponent size={16} className="mr-2" />}
                {cat.name}
              </Button>
            );
          })}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="mb-16"
          >
            <Card className="overflow-hidden border-0 shadow-lg rounded-[2rem] bg-white group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                   <Image
                      src="/images/blog-featured.png"
                      alt={featuredArticle.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent lg:hidden" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-ocean-blue hover:bg-ocean-blue/90 text-white">Featured</Badge>
                    <span className="flex items-center gap-1 text-ocean-blue text-sm font-semibold">
                      <BookOpen size={16} />
                      Budidaya
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4 leading-tight group-hover:text-ocean-blue transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{featuredArticle.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {featuredArticle.date}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{featuredArticle.readTime} baca</span>
                  </div>
                  
                  <Button variant="link" className="p-0 h-auto text-ocean-blue font-semibold hover:text-teal hover:no-underline flex items-center gap-2 justify-start group/btn">
                    Baca Selengkapnya
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article, index) => {
            const categoryData = categories.find((c) => c.id === article.category);
            const IconComponent = categoryData?.icon as LucideIcon | null;

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-gray-100 hover:border-ocean-blue/20 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col">
                  {/* Image Placeholder - fallback since we only generated 1 blog image */}
                  <div className="aspect-video bg-gradient-to-br from-ocean-blue/5 to-teal/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-ocean-blue/5 group-hover:bg-ocean-blue/10 transition-colors" />
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform duration-300">
                       {IconComponent && <IconComponent className="text-ocean-blue" size={28} />}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1 text-teal text-xs font-bold uppercase tracking-wide">
                        {categoryData?.name}
                      </span>
                      <span className="text-gray-400 text-xs">{article.readTime} baca</span>
                    </div>
                    
                    <h4 className="font-bold text-navy text-xl mb-3 group-hover:text-ocean-blue transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{article.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0 mt-auto border-t border-gray-50 bg-gray-50/50">
                    <div className="flex items-center justify-between w-full text-sm py-4">
                      <span className="text-gray-500 flex items-center gap-1">
                         <Calendar size={14} />
                         {article.date}
                      </span>
                      <span className="text-ocean-blue font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer">
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-full px-8 border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white transition-all">
            Lihat Semua Artikel
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
