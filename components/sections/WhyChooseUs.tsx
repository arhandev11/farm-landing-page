"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, BadgePercent, LucideIcon, MapPin, MessageCircle, Wallet } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BadgePercent,
  MessageCircle,
  Award,
  Wallet,
  MapPin,
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section id="keunggulan" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Keunggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Mengapa Memilih <span className="text-ocean-blue">Teras Farm</span>?
          </h2>
          <p className="text-gray-600 text-lg">
            Kami berkomitmen memberikan pengalaman terbaik untuk petambak dan pembeli.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            const isLarge = index === 0 || index === features.length - 1;

            return (
              <motion.div
                key={feature.id}
                variants={item}
                className={cn(isLarge ? "md:col-span-2 lg:col-span-1" : "")}
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden border-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                    index === 0
                      ? "bg-gradient-to-br from-ocean-blue to-teal text-white shadow-lg"
                      : "bg-gray-50 hover:bg-white"
                  )}
                >
                  <CardContent className="p-8 relative h-full flex flex-col justify-between">
                    {/* Background Decoration */}
                    <div
                      className={cn(
                        "absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-10 pointer-events-none",
                        index === 0 ? "bg-white" : "bg-ocean-blue"
                      )}
                    />

                    <div>
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-110",
                          index === 0
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-ocean-blue/10 to-teal/10"
                        )}
                      >
                        {IconComponent && (
                          <IconComponent
                            className={index === 0 ? "text-white" : "text-ocean-blue"}
                            size={28}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <h3
                        className={cn(
                          "font-bold text-xl mb-3",
                          index === 0 ? "text-white" : "text-navy"
                        )}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={cn(
                          "leading-relaxed",
                          index === 0 ? "text-white/90" : "text-gray-600"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="mt-16 bg-gradient-to-r from-ocean-blue/5 via-teal/5 to-ocean-blue/5 rounded-3xl p-8 md:p-12 text-center border border-ocean-blue/10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Siap Bergabung dengan Kami?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Baik Anda petambak yang ingin mendapatkan harga lebih baik, atau pembeli yang mencari
            udang berkualitas dengan traceability - Teras Farm adalah solusinya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ocean-blue hover:bg-ocean-blue/90 rounded-full px-8 shadow-md">
              <a href="#kontak">Daftar Sebagai Petambak</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-teal text-teal hover:bg-teal hover:text-white rounded-full px-8">
              <a href="#kontak">Saya Pembeli</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
