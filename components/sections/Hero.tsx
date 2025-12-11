"use client";

import { Button } from "@/components/ui/button";
import { HeroStat, SiteConfig } from "@/lib/queries";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface HeroProps {
  siteConfig: SiteConfig;
  heroStats: HeroStat[];
}

export default function Hero({ siteConfig, heroStats }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-blue/5 via-white to-teal/5"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px] animate-pulse duration-[4s]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-ocean-blue/20 rounded-full blur-[120px] animate-pulse duration-[7s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-teal/20 text-teal px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                Platform B2B Udang Indonesia
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-[1.15] mb-6"
            >
              {siteConfig.tagline.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-teal">
                {siteConfig.tagline.split(" ").slice(3, 5).join(" ")}
              </span>{" "}
              {siteConfig.tagline.split(" ").slice(5).join(" ")}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Kami menghilangkan rantai tengkulak yang berlebihan, memberikan harga transparan
              untuk petambak dan kualitas terjamin untuk pembeli.
            </motion.p>

            {/* Value Props */}
            <motion.ul variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              {["Harga Transparan", "Tanpa Tengkulak", "Kualitas Terjamin"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-ocean-blue hover:bg-ocean-blue/90 text-white rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-ocean-blue/25 hover:-translate-y-1 transition-all"
              >
                <a href="#kontak">
                  Gabung Sebagai Mitra
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5 rounded-full px-8 h-14 text-lg hover:-translate-y-1 transition-all"
              >
                <a href="#produk">Lihat Produk</a>
              </Button>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div variants={itemVariants} className="relative order-1 lg:order-2">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/20 to-teal/20 rounded-[2.5rem] rotate-3 blur-sm transform scale-95" />
              <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 p-2">
                <Image
                  src="/images/hero-illustration.png"
                  alt="Modern Shrimp Farm Ecosystem"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-[1.8rem] hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/20 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center text-2xl">
                    👨‍🌾
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">500+</p>
                    <p className="text-sm text-gray-500 font-medium">Petambak Mitra</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/20 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">15</p>
                    <p className="text-sm text-gray-500 font-medium">Provinsi</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 lg:mt-24"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-8 md:p-10">
            <div className="grid grid-cols-3 gap-4 md:gap-8 divide-x divide-gray-100">
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="text-center px-2">
                  <p className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-ocean-blue to-teal mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block"
        >
          <a href="#tentang" className="text-gray-400 hover:text-ocean-blue transition-colors p-2">
            <ChevronDown size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
