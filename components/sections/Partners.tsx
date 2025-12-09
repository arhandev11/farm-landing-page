"use client";

import { testimonials } from "@/lib/content";
import { ChevronLeft, ChevronRight, MapPin, Package, Quote, Users } from "lucide-react";
import { useState } from "react";

const stats = [
  { icon: Users, value: "500+", label: "Petambak Mitra" },
  { icon: MapPin, value: "15", label: "Provinsi" },
  { icon: Package, value: "1000+", label: "Ton/Bulan" },
];

export default function Partners() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="mitra" className="py-20 md:py-28 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Jaringan Mitra
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
            Petambak <span className="text-teal">Mitra Kami</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Bergabung dengan ratusan petambak udang dari berbagai provinsi di Indonesia.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                  <IconComponent className="text-teal" size={32} />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Map Placeholder */}
        <div className="relative mb-16">
          <div className="aspect-[2/1] bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <MapPin className="text-teal" size={48} />
              </div>
              <p className="text-gray-400 text-sm">map-indonesia.png</p>
              <p className="text-gray-500 text-xs mt-2">Peta interaktif lokasi mitra petambak</p>
            </div>
          </div>

          {/* Floating Location Cards */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal rounded-full animate-pulse" />
              <span className="text-sm">Jawa Timur - 120 Mitra</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal rounded-full animate-pulse" />
              <span className="text-sm">Sulawesi Selatan - 85 Mitra</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative">
          <h3 className="text-2xl font-bold text-center mb-10">Kata Mereka</h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <Quote className="text-teal/30 mb-6" size={48} />

              <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                &quot;{testimonials[currentTestimonial].quote}&quot;
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar Placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-teal rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <div>
                  <p className="font-bold text-white">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-400 flex items-center gap-1">
                    <MapPin size={14} />
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-teal w-6" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">Ingin bergabung menjadi mitra petambak kami?</p>
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
          >
            Daftar Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
