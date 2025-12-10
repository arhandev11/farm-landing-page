"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, siteConfig } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, MessageCircle, Ruler } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(products[0].id);

  const currentProduct = products.find((p) => p.id === activeProduct)!;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=Halo%20Teras%20Farm,%20saya%20ingin%20menanyakan%20harga%20${currentProduct.name}`;
  
  // Choose image based on product ID
  const productImage = activeProduct === "vaname" ? "/images/product-vaname.png" : "/images/product-windu.png";

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
        <div className="flex justify-center mb-12">
           <Tabs value={activeProduct} onValueChange={setActiveProduct} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2 p-1 rounded-full bg-gray-100 h-auto">
              {products.map((product) => (
                <TabsTrigger
                  key={product.id}
                  value={product.id}
                  className="rounded-full py-3 text-base font-medium data-[state=active]:bg-ocean-blue data-[state=active]:text-white transition-all"
                >
                  {product.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Product Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white rounded-[2rem] shadow-xl overflow-hidden border-0">
              <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative bg-gradient-to-br from-ocean-blue/5 to-teal/5 p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent opacity-60 pointer-events-none" />
                   
                   <motion.div
                     initial={{ scale: 0.9, rotate: -2 }}
                     animate={{ scale: 1, rotate: 0 }}
                     transition={{ duration: 0.6 }}
                     className="relative z-10 w-full max-w-md"
                   >
                     <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <Image
                          src={productImage}
                          alt={currentProduct.name}
                          width={600}
                          height={600}
                          className="object-cover w-full h-full"
                          priority
                        />
                     </div>
                   </motion.div>

                  {/* Quality Badge */}
                  <div className="absolute top-8 left-8 z-20">
                    <Badge className="bg-white/90 text-ocean-blue hover:bg-white backdrop-blur px-4 py-2 text-sm font-bold shadow-sm border-ocean-blue/10">
                      <Check className="w-4 h-4 mr-1 stroke-[3]" />
                      Premium Quality
                    </Badge>
                  </div>
                </div>

                {/* Details Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="text-teal font-bold tracking-wide uppercase text-sm">Fresh from Farm</span>
                  </div>
                  <h3 className="text-4xl font-bold text-navy mb-4">{currentProduct.name}</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">{currentProduct.description}</p>

                  {/* Info Cards */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-ocean-blue/10 flex items-center justify-center text-ocean-blue">
                          <Calendar size={20} />
                        </div>
                        <span className="font-semibold text-navy">Musim Panen</span>
                      </div>
                      <p className="text-gray-600 text-sm pl-[3.25rem]">{currentProduct.season}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-10 h-10 rounded-full bg-ocean-blue/10 flex items-center justify-center text-ocean-blue">
                          <Ruler size={20} />
                        </div>
                        <span className="font-semibold text-navy">Ukuran Tersedia</span>
                      </div>
                      <p className="text-gray-600 text-sm pl-[3.25rem]">Size {currentProduct.sizes.join(", ")}</p>
                    </div>
                  </div>

                  {/* Size Guide Chips */}
                  <div className="mb-10">
                    <h4 className="font-semibold text-navy mb-4">Pilih Ukuran (ekor/kg)</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProduct.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm"
                        >
                          Size {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Button asChild size="lg" className="flex-1 bg-green-600 hover:bg-green-700 rounded-full h-14 text-base shadow-lg hover:shadow-green-200">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        Tanya Harga via WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1 border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5 rounded-full h-14 text-base">
                      <a href="#kontak">Request Quotation</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Size Guide Info */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            *Ukuran udang dipengaruhi oleh musim dan kondisi panen. Silakan hubungi kami untuk ketersediaan stok terkini.
          </p>
        </div>
      </div>
    </section>
  );
}
