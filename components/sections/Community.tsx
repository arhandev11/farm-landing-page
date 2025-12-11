"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommunityProgram } from "@/lib/queries";
import { motion } from "framer-motion";
import { GraduationCap, Handshake, Heart, LucideIcon, MessageSquare, Shield, Users } from "lucide-react";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  MessageSquare,
};

const communityValues = [
  {
    icon: Heart,
    title: "Saling Mendukung",
    description: "Membantu sesama petambak untuk berkembang bersama",
  },
  {
    icon: Shield,
    title: "Anti Toxic",
    description: "Lingkungan diskusi yang positif dan konstruktif",
  },
  {
    icon: Handshake,
    title: "Berbagi Ilmu",
    description: "Sharing pengalaman dan best practices budidaya",
  },
];

interface CommunityProps {
  communityPrograms: CommunityProgram[];
}

export default function Community({ communityPrograms }: CommunityProps) {
  const whatsappGroupUrl = `https://wa.me/6281234567890?text=Halo%20Teras%20Farm,%20saya%20ingin%20bergabung%20dengan%20komunitas%20petambak`;

  return (
    <section id="komunitas" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Komunitas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Bergabung dengan <span className="text-ocean-blue">Komunitas Petambak</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Lebih dari sekadar platform jual-beli, Teras Farm adalah komunitas petambak udang
            yang saling mendukung dan berbagi ilmu.
          </p>
        </div>

        {/* Main Content */}
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
                src="/images/community-hero.png"
                alt="Komunitas Petambak Indonesia"
                width={800}
                height={600}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-8 right-8 text-white">
                 <p className="font-bold text-xl">Grow Together</p>
                 <p className="text-sm opacity-90">Tumbuh bersama komunitas</p>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-teal/10 rounded-[2rem] border border-teal/20" />
            <div className="absolute -z-20 top-10 right-10 w-32 h-32 bg-ocean-blue/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-navy mb-6">Program Komunitas</h3>
            <div className="space-y-4">
              {communityPrograms.map((program, index) => {
                const IconComponent = iconMap[program.icon];
                return (
                  <Card key={program.id} className="border-gray-100 card-hover">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-xl flex items-center justify-center shrink-0">
                        {IconComponent && <IconComponent className="text-ocean-blue" size={24} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-navy mb-1 text-lg">{program.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8">
               <Button asChild size="lg" className="rounded-full bg-ocean-blue hover:bg-ocean-blue/90 shadow-lg px-8">
                <a
                  href={whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare size={18} />
                  Gabung Komunitas (WhatsApp)
                </a>
               </Button>
            </div>
          </motion.div>
        </div>

        {/* Community Values */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-gradient-to-r from-ocean-blue to-teal rounded-[2.5rem] p-8 md:p-16 text-white text-center shadow-xl relative overflow-hidden"
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          
          <h3 className="text-2xl md:text-3xl font-bold mb-12 relative z-10">Nilai-Nilai Komunitas Kami</h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {communityValues.map((value, i) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="group">
                  <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                    <IconComponent size={36} />
                  </div>
                  <h4 className="font-bold text-xl mb-3">{value.title}</h4>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
