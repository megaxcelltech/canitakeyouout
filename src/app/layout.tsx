import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ==========================================
// UBAH METADATA (JUDUL, DESKRIPSI & ICON)
// ==========================================
export const metadata: Metadata = {
  title: "Coffee and You? ☕",
  description: "Panggilan khusus untuk Indri Khoerunnisa!",
  icons: {
    icon: "/fotoprofil.jpeg",
    shortcut: "/fotoprofil.jpeg",
    apple: "/fotoprofil.jpeg",
  },
  openGraph: {
    title: "Coffee and You? ☕",
    description: "Panggilan khusus untuk Indri Khoerunnisa! 👑",
    images: [
      {
        url: "/fotoprofil.jpeg", // Preview gambar saat link dikirim di WhatsApp
        width: 800,
        height: 800,
        alt: "Coffee and You",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}