"use client";

import { products, siteConfig } from "@/lib/content";
import { Calendar, MessageCircle, Ruler } from "lucide-react";
import { useState } from "react";

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(products[0].id);

  const currentProduct = products.find((p) => p.id === activeProduct)!;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=Halo%20Teras%20Farm,%20saya%20ingin%20menanyakan%20harga%20${currentProduct.name}`;

  return (
    <section id="produk" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">
            Produk Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Katalog <span className="text-ocean-blue">Udang Segar</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Udang berkualitas langsung dari petambak mitra kami di seluruh Indonesia.
          </p>
        </div>

        {/* Product Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeProduct === product.id
                  ? "bg-ocean-blue text-white shadow-lg"
                  : "bg-white text-gray-600 hover:text-ocean-blue border border-gray-200"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative bg-gradient-to-br from-ocean-blue/5 to-teal/5 p-8 lg:p-12 flex items-center justify-center">
              <div className="aspect-square w-full max-w-md bg-white/50 rounded-3xl flex items-center justify-center border-2 border-dashed border-ocean-blue/30">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-6xl">🦐</span>
                  </div>
                  <p className="text-gray-500 text-sm">product-{activeProduct}.png</p>
                </div>
              </div>

              {/* Quality Badge */}
              <div className="absolute top-4 right-4 bg-teal text-white px-4 py-2 rounded-full text-sm font-semibold">
                Premium Quality
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-navy mb-4">{currentProduct.name}</h3>
              <p className="text-gray-600 text-lg mb-8">{currentProduct.description}</p>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="text-ocean-blue" size={20} />
                    <span className="font-semibold text-navy">Musim Panen</span>
                  </div>
                  <p className="text-gray-600 text-sm">{currentProduct.season}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Ruler className="text-ocean-blue" size={20} />
                    <span className="font-semibold text-navy">Ukuran Tersedia</span>
                  </div>
                  <p className="text-gray-600 text-sm">Size {currentProduct.sizes.join(", ")}</p>
                </div>
              </div>

              {/* Size Guide */}
              <div className="mb-8">
                <h4 className="font-semibold text-navy mb-4">Pilih Ukuran (ekor/kg)</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-ocean-blue hover:text-ocean-blue transition-colors font-medium"
                    >
                      Size {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full font-semibold transition-all"
                >
                  <MessageCircle size={20} />
                  Tanya Harga via WhatsApp
                </a>
                <a
                  href="#kontak"
                  className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-6 py-4 rounded-full font-semibold transition-all"
                >
                  Request Quotation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Info */}
        <div className="mt-12 bg-ocean-blue/5 rounded-2xl p-6 md:p-8">
          <h4 className="font-bold text-navy mb-4">Panduan Ukuran Udang</h4>
          <p className="text-gray-600 mb-4">
            Ukuran udang dinyatakan dalam jumlah ekor per kilogram. Semakin kecil angkanya,
            semakin besar ukuran udangnya.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-2xl font-bold text-ocean-blue">20-30</p>
              <p className="text-sm text-gray-600">Jumbo</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-2xl font-bold text-ocean-blue">40-50</p>
              <p className="text-sm text-gray-600">Large</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-2xl font-bold text-ocean-blue">60-70</p>
              <p className="text-sm text-gray-600">Medium</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-2xl font-bold text-ocean-blue">80-100</p>
              <p className="text-sm text-gray-600">Small</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
