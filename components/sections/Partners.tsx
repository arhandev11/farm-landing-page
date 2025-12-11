"use client";

import { Button } from "@/components/ui/button";
import { Testimonial } from "@/lib/queries";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Package, Quote, Users } from "lucide-react";
import { useState } from "react";

const stats = [
  { icon: Users, value: "500+", label: "Petambak Mitra" },
  { icon: MapPin, value: "15", label: "Provinsi" },
  { icon: Package, value: "1000+", label: "Ton/Bulan" },
];

interface PartnersProps {
  testimonials: Testimonial[];
}

export default function Partners({ testimonials }: PartnersProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="mitra" className="py-20 md:py-28 bg-navy text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ocean-blue rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
        <div className="grid grid-cols-3 gap-6 md:gap-12 mb-20">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <IconComponent className="text-teal" size={32} />
                </div>
                <p className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-400 text-sm md:text-base font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Map Placeholder */}
        <div className="relative mb-24 hidden md:block">
          <div className="aspect-[2.5/1] bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-sm relative overflow-hidden">
             {/* Simple Map Visualization (Abstract) */}
             <div className="absolute inset-0 opacity-20">
                {/* Dots representing islands/locations */}
             </div>
             
            <div className="text-center p-8 z-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                <MapPin className="text-teal" size={40} />
              </div>
              <p className="text-gray-400 text-sm">Peta Sebaran Mitra</p>
            </div>
          </div>

          {/* Floating Location Cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-20 glass-dark rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-teal rounded-full animate-pulse shadow-[0_0_10px_#00B4D8]" />
              <span className="text-sm font-medium">Jawa Timur - 120 Mitra</span>
            </div>
          </motion.div>
          
           <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-20 glass-dark rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-teal rounded-full animate-pulse shadow-[0_0_10px_#00B4D8]" />
              <span className="text-sm font-medium">Sulawesi Selatan - 85 Mitra</span>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="relative">
          <div className="text-center mb-10">
             <h3 className="text-2xl font-bold">Kata Mereka</h3>
          </div>

          <div className="relative max-w-4xl mx-auto h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 h-full flex flex-col justify-center">
                  <div className="absolute top-8 left-8 text-teal/30">
                     <Quote size={64} />
                  </div>
                  
                  <div className="relative z-10 text-center px-4">
                    <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
                      &quot;{testimonials[currentTestimonial].quote}&quot;
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-teal rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                        <span className="text-xl">👨‍🌾</span>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</p>
                        <p className="text-teal flex items-center gap-1 text-sm">
                          <MapPin size={12} />
                          {testimonials[currentTestimonial].location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
           {/* Navigation */}
            <div className="flex justify-center gap-6 mt-8">
              <Button
                size="icon"
                variant="outline"
                onClick={prevTestimonial}
                className="rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-12 w-12"
              >
                <ChevronLeft size={24} />
              </Button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-teal w-8" : "bg-white/20 w-2 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <Button
                 size="icon"
                 variant="outline"
                 onClick={nextTestimonial}
                 className="rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-12 w-12"
              >
                <ChevronRight size={24} />
              </Button>
            </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-300 mb-6 text-lg">Ingin bergabung menjadi mitra petambak kami?</p>
          <Button asChild size="lg" className="rounded-full px-10 h-14 bg-teal hover:bg-teal/90 text-white text-lg font-semibold shadow-[0_0_20px_rgba(0,180,216,0.5)] hover:shadow-[0_0_30px_rgba(0,180,216,0.6)]">
            <a href="#kontak">Daftar Sekarang</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
