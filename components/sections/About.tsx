import { coreValues } from "@/lib/content";
import { Eye, Leaf, LucideIcon, Scale, Users } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Scale,
  Users,
  Leaf,
};

export default function About() {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Membangun Ekosistem Udang yang <span className="text-ocean-blue">Adil & Transparan</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Teras Farm hadir untuk menjembatani petambak udang Indonesia dengan pasar yang lebih luas,
            menghilangkan rantai distribusi berlebihan, dan memastikan keadilan bagi semua pihak.
          </p>
        </div>

        {/* Story & Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-ocean-blue/30">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🌅</span>
                </div>
                <p className="text-gray-500 text-sm">about-story.png</p>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-teal/10 rounded-3xl" />
          </div>

          {/* Story Content */}
          <div>
            <h3 className="text-2xl font-bold text-navy mb-4">Cerita Kami</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Industri perikanan udang di Indonesia sering kali didominasi oleh rantai tengkulak yang panjang.
                Petambak mendapat harga yang tidak transparan, sementara pembeli tidak tahu asal-usul produk mereka.
              </p>
              <p>
                <strong className="text-navy">Teras Farm</strong> lahir dari keinginan untuk mengubah situasi ini.
                Kami percaya bahwa dengan teknologi dan komunitas yang kuat, petambak bisa mendapatkan harga yang adil,
                dan pembeli bisa mendapatkan produk berkualitas dengan traceability yang jelas.
              </p>
              <p>
                Nama &quot;Teras&quot; berasal dari konsep teras rumah Indonesia - tempat berkumpul, berdiskusi, dan membangun
                hubungan. Kami ingin menjadi &quot;teras&quot; bagi komunitas petambak udang Indonesia.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-ocean-blue/5 rounded-xl p-5">
                <h4 className="font-bold text-ocean-blue mb-2">Visi</h4>
                <p className="text-sm text-gray-600">
                  Menjadi platform B2B udang terpercaya yang memberdayakan petambak Indonesia.
                </p>
              </div>
              <div className="bg-teal/5 rounded-xl p-5">
                <h4 className="font-bold text-teal mb-2">Misi</h4>
                <p className="text-sm text-gray-600">
                  Menghubungkan petambak dengan pembeli secara langsung, transparan, dan berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-bold text-navy text-center mb-10">Nilai-Nilai Kami</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => {
              const IconComponent = iconMap[value.icon];
              return (
                <div
                  key={value.id}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-ocean-blue/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-ocean-blue to-teal rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {IconComponent && <IconComponent className="text-white" size={28} />}
                  </div>
                  <h4 className="font-bold text-navy text-lg mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
