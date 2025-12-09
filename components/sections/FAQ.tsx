"use client";

import { faqData } from "@/lib/content";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-navy group-hover:text-ocean-blue transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 text-ocean-blue transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<"petambak" | "pembeli">("petambak");
  const [openIndex, setOpenIndex] = useState(0);

  const currentFaqs = faqData[activeTab];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

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

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => {
                setActiveTab("petambak");
                setOpenIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "petambak"
                  ? "bg-ocean-blue text-white shadow-lg"
                  : "text-gray-600 hover:text-ocean-blue"
              }`}
            >
              Untuk Petambak
            </button>
            <button
              onClick={() => {
                setActiveTab("pembeli");
                setOpenIndex(0);
              }}
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

        {/* FAQ List */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          {currentFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-ocean-blue/5 to-teal/5 rounded-3xl p-8">
          <div className="w-16 h-16 mx-auto bg-ocean-blue/10 rounded-full flex items-center justify-center mb-4">
            <HelpCircle className="text-ocean-blue" size={32} />
          </div>
          <h3 className="text-xl font-bold text-navy mb-2">Masih punya pertanyaan?</h3>
          <p className="text-gray-600 mb-6">
            Tim kami siap membantu menjawab pertanyaan Anda.
          </p>
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 bg-ocean-blue hover:bg-ocean-blue/90 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
