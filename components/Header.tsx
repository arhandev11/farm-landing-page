"use client";

import { navLinks, siteConfig } from "@/lib/content";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TF</span>
            </div>
            <span className="text-xl font-bold text-navy">{siteConfig.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-ocean-blue transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#kontak"
              className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
            >
              Gabung Sekarang
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-ocean-blue py-3 border-b border-gray-100 font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 bg-ocean-blue text-white text-center px-6 py-3 rounded-full font-semibold"
            >
              Gabung Sekarang
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
