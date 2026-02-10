import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Pastikan file ini ada di src/app/
import Navbar from "@/components/layout/Navbar"; // Pastikan file Navbar.tsx ada
import Footer from "@/components/layout/Footer"; // Pastikan file Footer.tsx ada

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio Saya",
  description: "Web developer yang sedang belajar Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white flex flex-col`}
      >
        <Navbar />
        
        {/* Main Content dengan Flex Grow agar Footer terdorong ke bawah */}
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 w-full flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}