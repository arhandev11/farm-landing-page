"use client";

import { howItWorks } from "@/lib/content";
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

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"petambak" | "pembeli">("petambak");

  const steps = howItWorks[activeTab];

  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
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
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("petambak")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "petambak"
                  ? "bg-ocean-blue text-white shadow-lg"
                  : "text-gray-600 hover:text-ocean-blue"
              }`}
            >
              Untuk Petambak
            </button>
            <button
              onClick={() => setActiveTab("pembeli")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "pembeli"
                  ? "bg-ocean-blue text-white shadow-lg"
                  : "text-gray-600 hover:text-ocean-blue"
              }`}
            >
              Untuk Pembeli
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-blue via-teal to-ocean-blue" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={step.step} className="relative">
                  {/* Arrow between steps (mobile/tablet) */}
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 text-ocean-blue/30">
                      <ArrowRight size={24} />
                    </div>
                  )}

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-6 w-8 h-8 bg-ocean-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-2xl flex items-center justify-center mb-4 mt-2">
                      {IconComponent && <IconComponent className="text-ocean-blue" size={32} />}
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-navy text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
          >
            {activeTab === "petambak" ? "Daftar Sebagai Mitra" : "Hubungi Tim Sales"}
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
