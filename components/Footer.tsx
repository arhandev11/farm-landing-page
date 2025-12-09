import { navLinks, siteConfig } from "@/lib/content";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TF</span>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Menu</h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Lainnya</h4>
            <ul className="space-y-2">
              {navLinks.slice(5).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="text-gray-300 hover:text-teal transition-colors text-sm">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal transition-colors text-sm">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-teal mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-teal mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-teal mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">{siteConfig.address}</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
