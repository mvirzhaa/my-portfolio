import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider"; // Import Provider-nya

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio Saya",
  description: "Web developer yang sedang belajar Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Tambahkan suppressHydrationWarning agar tidak error saat switch tema
    <html lang="en" suppressHydrationWarning> 
      <body className={`${inter.className} antialiased min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Defaultnya gelap
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 w-full flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}