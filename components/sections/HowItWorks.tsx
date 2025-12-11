"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HowItWorksStep } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle,
    ClipboardList,
    Handshake,
    ListChecks,
    LucideIcon,
    Package,
    Search,
    ShoppingCart,
    Truck,
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  ClipboardList,
  CheckCircle,
  Search,
  Handshake,
  Package,
  ListChecks,
  ShoppingCart,
  Truck,
};

interface HowItWorksProps {
  howItWorks: {
    petambak: HowItWorksStep[];
    pembeli: HowItWorksStep[];
  };
}

export default function HowItWorks({ howItWorks }: HowItWorksProps) {
  const [activeTab, setActiveTab] = useState<"petambak" | "pembeli">("petambak");

  const steps = howItWorks[activeTab];

  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Cara Kerja
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Bagaimana <span className="text-ocean-blue">Teras Farm</span> Bekerja?
          </h2>
          <p className="text-gray-600 text-lg">
            Proses sederhana untuk menghubungkan petambak dengan pembeli secara langsung.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab("petambak")}
              className={cn(
                "px-8 py-3 rounded-full font-semibold transition-all duration-300",
                activeTab === "petambak"
                  ? "bg-ocean-blue text-white shadow-md"
                  : "text-gray-600 hover:text-ocean-blue"
              )}
            >
              Untuk Petambak
            </button>
            <button
              onClick={() => setActiveTab("pembeli")}
              className={cn(
                "px-8 py-3 rounded-full font-semibold transition-all duration-300",
                activeTab === "pembeli"
                  ? "bg-ocean-blue text-white shadow-md"
                  : "text-gray-600 hover:text-ocean-blue"
              )}
            >
              Untuk Pembeli
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-ocean-blue/20 via-teal/20 to-ocean-blue/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => {
                const IconComponent = iconMap[step.icon];
                return (
                  <motion.div
                    key={step.step + activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Arrow between steps (mobile/tablet) */}
                    {index < steps.length - 1 && (
                      <div className="hidden sm:block lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 text-ocean-blue/30 z-0">
                        <ArrowRight size={24} />
                      </div>
                    )}

                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-100 relative z-10 group overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-0 right-0 p-4">
                        <span className="text-6xl font-black text-gray-50/80 group-hover:text-ocean-blue/5 transition-colors select-none">
                          {step.step}
                        </span>
                      </div>

                      <CardContent className="p-8 pt-10 text-center relative">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-ocean-blue/5 to-teal/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-ocean-blue/10">
                          {IconComponent && <IconComponent className="text-ocean-blue group-hover:text-teal transition-colors" size={32} />}
                        </div>

                        {/* Content */}
                        <h3 className="font-bold text-navy text-lg mb-3">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                      </CardContent>
                      
                      {/* Bottom Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-blue to-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 h-12 text-lg bg-ocean-blue hover:bg-ocean-blue/90 shadow-lg hover:shadow-ocean-blue/25"
          >
            <a href="#kontak" className="flex items-center gap-2">
              {activeTab === "petambak" ? "Daftar Sebagai Mitra" : "Hubungi Tim Sales"}
              <ArrowRight size={20} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
