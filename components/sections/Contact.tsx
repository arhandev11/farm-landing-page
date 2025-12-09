"use client";

import { siteConfig } from "@/lib/content";
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <section id="kontak" className="py-20 md:py-28 bg-white">
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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-ocean-blue to-teal rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
              <p className="text-white/80 mb-8">
                Jangan ragu untuk menghubungi kami. Tim kami akan merespons secepat mungkin.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Telepon / WhatsApp</p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Alamat</p>
                    <p className="text-white/80">{siteConfig.address}</p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-white text-ocean-blue px-6 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                <MessageCircle size={20} />
                Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8">
              {/* Form Type Toggle */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setFormType("petambak")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    formType === "petambak"
                      ? "bg-ocean-blue text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Saya Petambak
                </button>
                <button
                  onClick={() => setFormType("pembeli")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    formType === "pembeli"
                      ? "bg-ocean-blue text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Saya Pembeli
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                {formType === "petambak" ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                          Lokasi Tambak *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                          placeholder="Kota/Kabupaten, Provinsi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                          Luas Tambak (Ha)
                        </label>
                        <input
                          type="text"
                          name="pondSize"
                          value={formData.pondSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                          placeholder="Contoh: 2 Ha"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                          Nama Perusahaan
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                          placeholder="Nama perusahaan Anda"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                          placeholder="email@perusahaan.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Kebutuhan Produk
                      </label>
                      <select
                        name="needs"
                        value={formData.needs}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all"
                      >
                        <option value="">Pilih kebutuhan</option>
                        <option value="Udang Vaname">Udang Vaname</option>
                        <option value="Udang Windu">Udang Windu</option>
                        <option value="Keduanya">Keduanya</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Pesan Tambahan
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none transition-all resize-none"
                    placeholder="Tuliskan pesan atau pertanyaan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
                >
                  <Send size={20} />
                  Kirim via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
