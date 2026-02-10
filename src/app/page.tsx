import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      
      {/* --- Efek Background (Glow Biru) --- */}
      <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-blue-500/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] -z-10" />

      {/* --- Main Content --- */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-800 rounded-full">
          🚀 Bismillah Bisa Next.js
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-white">
          Hello, Welcome<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 animate-gradient-x">
            To My World.
          </span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Website ini adalah Laboratorium Digital saya. Dibangun dengan <span className="text-white font-semibold">Niat</span>, <span className="text-white font-semibold">Kerja Cerdas</span>, dan<span className="text-white font-semibold"> Kopi Susu</span>.
        </p>
      </div>

      {/* --- Buttons --- */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link 
          href="/projects" 
          className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Lihat Karya Saya
        </Link>
        
        <Link 
          href="https://github.com" 
          target="_blank"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-300 transition-all duration-200 border border-gray-700 rounded-full hover:bg-gray-800 hover:text-white"
        >
          Github Saya
        </Link>
      </div>
    </section>
  );
}