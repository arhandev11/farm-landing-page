import { siteConfig } from "@/lib/content";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=Halo%20Teras%20Farm,%20saya%20ingin%20bertanya%20tentang...`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
