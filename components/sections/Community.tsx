import { communityPrograms, siteConfig } from "@/lib/content";
import { GraduationCap, Handshake, Heart, LucideIcon, MessageSquare, Shield, Users } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  MessageSquare,
};

const communityValues = [
  {
    icon: Heart,
    title: "Saling Mendukung",
    description: "Membantu sesama petambak untuk berkembang bersama",
  },
  {
    icon: Shield,
    title: "Anti Toxic",
    description: "Lingkungan diskusi yang positif dan konstruktif",
  },
  {
    icon: Handshake,
    title: "Berbagi Ilmu",
    description: "Sharing pengalaman dan best practices budidaya",
  },
];

export default function Community() {
  const whatsappGroupUrl = `https://wa.me/${siteConfig.whatsapp}?text=Halo%20Teras%20Farm,%20saya%20ingin%20bergabung%20dengan%20komunitas%20petambak`;

  return (
    <section id="komunitas" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Komunitas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Bergabung dengan <span className="text-ocean-blue">Komunitas Petambak</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Lebih dari sekadar platform jual-beli, Teras Farm adalah komunitas petambak udang
            yang saling mendukung dan berbagi ilmu.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-ocean-blue/30">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                  <Users className="text-ocean-blue" size={48} />
                </div>
                <p className="text-gray-500 text-sm">community-hero.png</p>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full bg-teal/10 rounded-3xl" />
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-2xl font-bold text-navy mb-6">Program Komunitas</h3>
            <div className="space-y-4">
              {communityPrograms.map((program) => {
                const IconComponent = iconMap[program.icon];
                return (
                  <div
                    key={program.id}
                    className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-ocean-blue to-teal rounded-xl flex items-center justify-center shrink-0">
                      {IconComponent && <IconComponent className="text-white" size={28} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1">{program.title}</h4>
                      <p className="text-gray-600 text-sm">{program.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-ocean-blue hover:bg-ocean-blue/90 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              Gabung Komunitas
            </a>
          </div>
        </div>

        {/* Community Values */}
        <div className="bg-gradient-to-r from-ocean-blue to-teal rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold text-center mb-10">Nilai-Nilai Komunitas Kami</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {communityValues.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <IconComponent size={32} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{value.title}</h4>
                  <p className="text-white/80 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Gallery Placeholder */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-navy text-center mb-8">Kegiatan Komunitas</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {["Training Session", "Sharing Session", "Field Visit"].map((activity, index) => (
              <div
                key={activity}
                className="aspect-video bg-gradient-to-br from-ocean-blue/5 to-teal/5 rounded-2xl flex items-center justify-center border border-gray-200"
              >
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-2 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{["📚", "💬", "🌾"][index]}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
