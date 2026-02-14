"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { use } from "react";

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      
      {/* --- SECTION 1: HERO (Intro Singkat) --- */}
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 pt-10">
        {/* Glow Effects */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

        <div className="inline-block px-4 py-1.5 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-800 rounded-full mb-4">
          👋 Open for Freelance / Collaboration
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-white leading-tight">
          Halo, saya <span className="text-blue-500">Muhamad Virzha</span>. <br />
          <span className="text-gray-500 text-4xl sm:text-6xl">Developer Jadi-jadian.</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Berawal dari rasa bosan, berakhir jatuh cinta pada baris kode. 
          Spesialis dalam membangun aplikasi web modern yang cepat, aman, dan *scalable*.
        </p>

        <div className="flex gap-4 pt-4">
          <Link 
            href="/projects" 
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition transform hover:-translate-y-1"
          >
            Lihat Karya Saya
          </Link>
          <a 
            href="mailto:emailmu@contoh.com" // Ganti email kamu
            className="px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition"
          >
            Hubungi Saya
          </a>
        </div>
      </motion.section>


      {/* --- SECTION 2: BENTO GRID (Personal Info) --- */}
      <motion.section id="about" className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Tentang Saya</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Foto Profil & Bio Singkat */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-white/10">
               {/* Ganti src dengan foto aslimu nanti. Taruh foto di folder public/me.jpg */}
               <Image 
                 src="/me.jpg" 
                 alt="Foto Profil"
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
            </div>
            <div className="text-center md:text-left space-y-4 relative z-10">
              <h3 className="text-2xl font-bold text-white">Bukan Sekadar Koding</h3>
              <p className="text-gray-400 leading-relaxed">
                Saya percaya bahwa kode yang baik bukan hanya yang "jalan", tapi yang bisa memecahkan masalah nyata. 
                Saat ini saya fokus mendalami ekosistem <b>Next.js</b> dan <b>Cloud Database</b> untuk membangun aplikasi masa depan.
              </p>
              <div className="flex gap-2 justify-center md:justify-start">
                 <span className="text-2xl">🇮🇩</span>
                 <span className="text-2xl">☕</span>
                 <span className="text-2xl">💻</span>
              </div>
            </div>
          </div>

          {/* Box 2: Tech Stack (Skill) */}
          <div className="p-8 rounded-3xl bg-blue-900/10 border border-blue-500/20 flex flex-col justify-center space-y-6">
            <h3 className="text-xl font-bold text-blue-200 mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Git"].map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Box 3: Statistik / Fokus */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Fokus Saat Ini</p>
              <h3 className="text-xl font-bold text-white">Fullstack Development</h3>
            </div>
            <div className="mt-8">
               <div className="text-4xl font-black text-white">100%</div>
               <p className="text-gray-500">Semangat Belajar</p>
            </div>
          </div>

          {/* Box 4: Quote / Filosofi */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10 flex items-center">
            <blockquote className="text-lg md:text-xl text-gray-300 italic font-medium">
              "Programming isn't about what you know; it's about what you can figure out." 
              <span className="block mt-2 text-sm text-gray-500 not-italic">— Chris Pine</span>
            </blockquote>
          </div>

        </div>
      </motion.section>

       {/* --- SECTION 3: TIMELINE (Perjalanan) --- */}
       <section className="max-w-3xl mx-auto pt-10">
          <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
            Jejak Digital
          </h2>
          <div className="space-y-8 border-l border-white/10 ml-2 pl-8 relative">
             
             {/* Timeline Item 1 */}
             <div className="relative">
                <div className="absolute -left-[41px] w-6 h-6 bg-blue-500 rounded-full border-4 border-[#0a0a0a]"></div>
                <h3 className="text-lg font-bold text-white">Fullstack - Smart Bookmark</h3>
                <span className="text-xs text-blue-400">Hari Ini</span>
                <p className="text-gray-400 mt-2">
                  Berhasil mengintegrasikan Next.js dengan Supabase (SQL) untuk menyimpan data secara persisten di cloud.
                </p>
             </div>

             {/* Timeline Item 2 */}
             <div className="relative">
                <div className="absolute -left-[41px] w-6 h-6 bg-gray-700 rounded-full border-4 border-[#0a0a0a]"></div>
                <h3 className="text-lg font-bold text-white">Explorasi API - Weather App</h3>
                <span className="text-xs text-gray-500">Minggu Lalu</span>
                <p className="text-gray-400 mt-2">
                   Belajar mengambil data pihak ketiga (OpenWeather) dan menampilkannya dengan Server Actions.
                </p>
             </div>

             {/* Timeline Item 3 */}
             <div className="relative">
                <div className="absolute -left-[41px] w-6 h-6 bg-gray-800 rounded-full border-4 border-[#0a0a0a]"></div>
                <h3 className="text-lg font-bold text-white">Hello World</h3>
                <span className="text-xs text-gray-500">Awal 2026</span>
                <p className="text-gray-400 mt-2">
                   Memutuskan untuk mengubah rasa bosan menjadi produktivitas dengan belajar Next.js.
                </p>
             </div>

          </div>
       </section>
    </div>
  );
}