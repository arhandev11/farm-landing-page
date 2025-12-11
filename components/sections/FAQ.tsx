"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ as FAQType } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface FAQProps {
  faqData: {
    petambak: FAQType[];
    pembeli: FAQType[];
  };
}

export default function FAQ({ faqData }: FAQProps) {
  const [activeTab, setActiveTab] = useState<"petambak" | "pembeli">("petambak");

  const currentFaqs = faqData[activeTab];

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Pertanyaan yang <span className="text-ocean-blue">Sering Ditanyakan</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan jawaban untuk pertanyaan umum seputar Teras Farm.
          </p>
        </div>

        {/* Tabs - Simple custom tabs for clarity */}
        <div className="flex justify-center mb-12">
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

        {/* FAQ List using Shadcn Accordion */}
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
           className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-100/50"
        >
          <Accordion type="single" collapsible className="w-full">
            {currentFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-gray-100 last:border-0 px-2">
                <AccordionTrigger className="text-navy font-semibold hover:text-ocean-blue hover:no-underline text-left py-5 text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="mt-16 text-center bg-gradient-to-r from-ocean-blue to-teal rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
              <HelpCircle className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Masih punya pertanyaan?</h3>
            <p className="text-white/90 mb-8 max-w-lg">
              Tim support kami siap membantu menjawab pertanyaan Anda melalui WhatsApp atau email.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 bg-white text-ocean-blue hover:bg-white/90 font-bold h-12">
              <a href="#kontak">Hubungi Kami</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
