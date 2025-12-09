import { heroStats, siteConfig } from "@/lib/content";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-blue/5 via-white to-teal/5"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ocean-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              Platform B2B Udang Indonesia
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              {siteConfig.tagline.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-ocean-blue">
                {siteConfig.tagline.split(" ").slice(3, 5).join(" ")}
              </span>{" "}
              {siteConfig.tagline.split(" ").slice(5).join(" ")}
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Kami menghilangkan rantai tengkulak yang berlebihan, memberikan harga transparan
              untuk petambak dan kualitas terjamin untuk pembeli.
            </p>

            {/* Value Props */}
            <ul className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              {["Harga Transparan", "Tanpa Tengkulak", "Kualitas Terjamin"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#kontak"
                className="inline-flex items-center justify-center gap-2 bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-ocean-blue/25"
              >
                Gabung Sebagai Mitra
                <ArrowRight size={20} />
              </a>
              <a
                href="#produk"
                className="inline-flex items-center justify-center gap-2 border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Lihat Produk
              </a>
            </div>
          </div>

          {/* Illustration Placeholder */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-ocean-blue/30">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl">🦐</span>
                </div>
                <p className="text-gray-500 text-sm">hero-illustration.png</p>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">500+</p>
                  <p className="text-sm text-gray-500">Petambak Mitra</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">15</p>
                  <p className="text-sm text-gray-500">Provinsi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 lg:mt-24">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    index !== heroStats.length - 1 ? "border-r border-gray-200" : ""
                  }`}
                >
                  <p className="text-2xl md:text-4xl font-bold text-ocean-blue mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <a href="#tentang" className="text-gray-400 hover:text-ocean-blue transition-colors">
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}
