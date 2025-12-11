import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teras Farm - Solusi Bisnis Pertambakan Udang',
  description: 'Platform B2B yang menghubungkan petambak udang Indonesia dengan pembeli secara langsung, transparan, dan berkelanjutan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
