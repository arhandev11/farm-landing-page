import { features } from "@/lib/content";
import { Award, BadgePercent, LucideIcon, MapPin, MessageCircle, Wallet } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BadgePercent,
  MessageCircle,
  Award,
  Wallet,
  MapPin,
};

export default function WhyChooseUs() {
  return (
    <section id="keunggulan" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Keunggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Mengapa Memilih <span className="text-ocean-blue">Teras Farm</span>?
          </h2>
          <p className="text-gray-600 text-lg">
            Kami berkomitmen memberikan pengalaman terbaik untuk petambak dan pembeli.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            const isLarge = index === 0 || index === features.length - 1;

            return (
              <div
                key={feature.id}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  isLarge ? "md:col-span-2 lg:col-span-1" : ""
                } ${
                  index === 0
                    ? "bg-gradient-to-br from-ocean-blue to-teal text-white"
                    : "bg-gray-50 hover:bg-white hover:shadow-xl"
                }`}
              >
                {/* Background Decoration */}
                <div
                  className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 ${
                    index === 0 ? "bg-white" : "bg-ocean-blue"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                    index === 0
                      ? "bg-white/20"
                      : "bg-gradient-to-br from-ocean-blue/10 to-teal/10"
                  }`}
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
                  className={`font-bold text-xl mb-3 ${
                    index === 0 ? "text-white" : "text-navy"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    index === 0 ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-ocean-blue/5 via-teal/5 to-ocean-blue/5 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Siap Bergabung dengan Kami?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Baik Anda petambak yang ingin mendapatkan harga lebih baik, atau pembeli yang mencari
            udang berkualitas dengan traceability - Teras Farm adalah solusinya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kontak"
              className="inline-flex items-center justify-center bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              Daftar Sebagai Petambak
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center justify-center border-2 border-teal text-teal hover:bg-teal hover:text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Saya Pembeli
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
