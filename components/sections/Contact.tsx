"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/content";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Contact() {
  const [formType, setFormType] = useState<"petambak" | "pembeli">("petambak");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    pondSize: "",
    company: "",
    needs: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, needs: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const message = formType === "petambak"
      ? `Halo Teras Farm, saya ${formData.name} dari ${formData.location}. Saya ingin mendaftar sebagai mitra petambak. Luas tambak: ${formData.pondSize}. ${formData.message}`
      : `Halo Teras Farm, saya ${formData.name} dari ${formData.company}. Saya ingin menanyakan tentang produk udang. Kebutuhan: ${formData.needs}. ${formData.message}`;

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="kontak" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider">Kontak</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            Hubungi <span className="text-ocean-blue">Kami</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Siap bergabung atau punya pertanyaan? Tim kami siap membantu Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-ocean-blue to-teal rounded-[2rem] p-8 md:p-10 text-white h-full shadow-2xl relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-navy/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                <p className="text-white/90 mb-10 leading-relaxed font-medium">
                  Jangan ragu untuk menghubungi kami. Tim kami akan merespons secepat mungkin.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-sm">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-sm uppercase tracking-wide opacity-80">Telepon / WhatsApp</p>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}`}
                        className="text-xl font-bold hover:text-navy transition-colors"
                      >
                        +62 812-3456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-sm">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-sm uppercase tracking-wide opacity-80">Email</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-lg font-bold hover:text-navy transition-colors break-all"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-sm">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-sm uppercase tracking-wide opacity-80">Alamat</p>
                      <p className="text-lg font-bold">{siteConfig.address}</p>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp CTA */}
                <Button asChild className="mt-12 w-full bg-white text-ocean-blue hover:bg-white/90 font-bold h-12 rounded-xl text-md shadow-lg">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Chat via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="lg:col-span-3"
          >
            <Card className="rounded-[2rem] shadow-xl border-gray-100 overflow-hidden h-full">
              <CardContent className="p-8 md:p-10">
                {/* Form Type Toggle */}
                <div className="flex gap-4 mb-8 bg-gray-50 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setFormType("petambak")}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                      formType === "petambak"
                        ? "bg-white text-ocean-blue shadow-md"
                        : "text-gray-500 hover:text-ocean-blue hover:bg-white/50"
                    }`}
                  >
                    Saya Petambak
                  </button>
                  <button
                    onClick={() => setFormType("pembeli")}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                      formType === "pembeli"
                        ? "bg-white text-ocean-blue shadow-md"
                        : "text-gray-500 hover:text-ocean-blue hover:bg-white/50"
                    }`}
                  >
                    Saya Pembeli
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-navy ml-1">Nama Lengkap *</label>
                       <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-navy ml-1">Nomor WhatsApp *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                  </div>

                  {formType === "petambak" ? (
                    <>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy ml-1">Lokasi Tambak *</label>
                          <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="h-12 rounded-xl"
                            placeholder="Kota/Kabupaten, Provinsi"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy ml-1">Luas Tambak (Ha)</label>
                          <Input
                            type="text"
                            name="pondSize"
                            value={formData.pondSize}
                            onChange={handleChange}
                            className="h-12 rounded-xl"
                            placeholder="Contoh: 2 Ha"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy ml-1">Nama Perusahaan</label>
                          <Input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="h-12 rounded-xl"
                            placeholder="Nama perusahaan Anda"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy ml-1">Email</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12 rounded-xl"
                            placeholder="email@perusahaan.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy ml-1">Kebutuhan Produk</label>
                        <Select onValueChange={handleSelectChange} value={formData.needs}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Pilih kebutuhan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Udang Vaname">Udang Vaname</SelectItem>
                            <SelectItem value="Udang Windu">Udang Windu</SelectItem>
                            <SelectItem value="Keduanya">Keduanya</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-navy ml-1">Pesan Tambahan</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="rounded-xl resize-none"
                      placeholder="Tuliskan pesan atau pertanyaan Anda..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 rounded-full bg-ocean-blue hover:bg-ocean-blue/90 font-bold text-lg shadow-lg hover:shadow-ocean-blue/20">
                    <Send size={20} className="mr-2" />
                    Kirim via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
