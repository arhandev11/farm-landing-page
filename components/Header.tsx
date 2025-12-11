"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLink, SiteConfig } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  siteConfig: SiteConfig;
  navLinks: NavLink[];
}

export default function Header({ siteConfig, navLinks }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-teal rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">TF</span>
            </div>
            <span className={cn("text-xl font-bold transition-colors", isScrolled ? "text-navy" : "text-navy")}>
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-ocean-blue",
                  isScrolled ? "text-gray-600" : "text-gray-700"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-ocean-blue hover:bg-ocean-blue/90 text-white rounded-full px-6"
            >
              <a href="#kontak">Gabung Sekarang</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="text-left">
                   <SheetTitle className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-ocean-blue to-teal rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">TF</span>
                    </div>
                    <span className="text-lg font-bold text-navy">{siteConfig.name}</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        className="text-lg font-medium text-gray-700 hover:text-ocean-blue transition-colors py-2 border-b border-gray-100"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild className="mt-4 bg-ocean-blue hover:bg-ocean-blue/90 w-full rounded-full">
                      <a href="#kontak">Gabung Sekarang</a>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
