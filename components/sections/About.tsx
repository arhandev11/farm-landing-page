"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CoreValue } from "@/lib/queries";
import { motion } from "framer-motion";
import { Eye, Leaf, LucideIcon, Scale, Users } from "lucide-react";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Scale,
  Users,
  Leaf,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface AboutProps {
  coreValues: CoreValue[];
}

export default function About({ coreValues }: AboutProps) {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="outline" className="text-teal border-teal/20 bg-teal/5 mb-4 px-4 py-1 text-sm uppercase tracking-wider">
            Tentang Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Membangun Ekosistem Udang yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-teal">Adil & Transparan</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Teras Farm hadir untuk menjembatani petambak udang Indonesia dengan pasar yang lebih luas,
            menghilangkan rantai distribusi berlebihan, dan memastikan keadilan bagi semua pihak.
          </p>
        </motion.div>

        {/* Story & Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/about-story.png"
                alt="Petambak udang Indonesia"
                width={800}
                height={600}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-bold text-lg mb-2">Dedikasi Untuk Petambak</p>
                <p className="text-white/80 text-sm">Memberdayakan komunitas pesisir sejak 2024</p>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-teal/10 rounded-[2rem]" />
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-navy mb-6">Cerita Kami</h3>
            <div className="space-y-4 text-gray-600 mb-8 text-lg leading-relaxed">
              <p>
                Industri perikanan udang di Indonesia sering kali didominasi oleh rantai tengkulak yang panjang.
                Petambak mendapat harga yang tidak transparan, sementara pembeli tidak tahu asal-usul produk mereka.
              </p>
              <p>
                <strong className="text-ocean-blue">Teras Farm</strong> lahir dari keinginan untuk mengubah situasi ini.
                Kami percaya bahwa dengan teknologi dan komunitas yang kuat, petambak bisa mendapatkan harga yang adil,
                dan pembeli bisa mendapatkan produk berkualitas dengan traceability yang jelas.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-ocean-blue/5 border-ocean-blue/10 hover:border-ocean-blue/30 transition-colors">
                <CardContent className="p-5">
                  <h4 className="font-bold text-ocean-blue mb-2 flex items-center gap-2">
                    <Eye size={18} /> Visi
                  </h4>
                  <p className="text-sm text-gray-600">
                    Menjadi platform B2B udang terpercaya yang memberdayakan petambak Indonesia.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-teal/5 border-teal/10 hover:border-teal/30 transition-colors">
                <CardContent className="p-5">
                  <h4 className="font-bold text-teal mb-2 flex items-center gap-2">
                    <Leaf size={18} /> Misi
                  </h4>
                  <p className="text-sm text-gray-600">
                    Menghubungkan petambak dengan pembeli secara langsung, transparan, dan berkelanjutan.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
             <h3 className="text-2xl font-bold text-navy">Nilai-Nilai Kami</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => {
              const IconComponent = iconMap[value.icon];
              return (
                <motion.div variants={fadeInUp} key={value.id}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        {IconComponent && <IconComponent className="text-ocean-blue group-hover:text-teal transition-colors" size={32} />}
                      </div>
                      <h4 className="font-bold text-navy text-xl mb-3">{value.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
