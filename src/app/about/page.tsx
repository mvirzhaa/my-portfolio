// src/app/about/page.tsx
import { personalInfo, educationHistory, workExperience, socialMedia } from "@/lib/profile";

export const metadata = {
  title: "Tentang Saya | Portofolio",
  description: "Biodata dan riwayat pendidikan saya.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HEADER & BIODATA SINGKAT */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Tentang Saya
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h2>
          <p className="text-blue-400 font-medium mb-6">{personalInfo.role} • {personalInfo.location}</p>
          <p className="text-gray-300 leading-relaxed text-lg">
            {personalInfo.bio}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              <span>📧</span> Hubungi Saya
            </a>

            {/* Looping Data Sosial Media */}
            {socialMedia.map((socmed) => (
              <a 
                key={socmed.id}
                href={socmed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all hover:scale-110 flex items-center justify-center"
                title={socmed.name}
              >
                {/* Logika memanggil ikon SVG berdasarkan nama */}
                {socmed.icon === "ig" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                )}
                {socmed.icon === "fb" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                )}
                {socmed.icon === "github" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. RIWAYAT PENDIDIKAN (Timeline Design) */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white border-l-4 border-blue-500 pl-4">Pendidikan</h2>
        <div className="space-y-8 border-l border-white/10 ml-2 pl-8">
          {educationHistory.map((edu) => (
            <div key={edu.id} className="relative group">
              {/* Bulatan di garis timeline */}
              <div className="absolute -left-[41px] w-6 h-6 bg-blue-900 rounded-full border-4 border-[#0a0a0a] group-hover:bg-blue-500 transition-colors"></div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
                <span className="text-sm font-mono text-blue-400 mb-2 block">{edu.year}</span>
                <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                <h4 className="text-md font-medium text-gray-400 mb-3">{edu.degree}</h4>
                <p className="text-gray-400 leading-relaxed">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PENGALAMAN (Grid Design) */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white border-l-4 border-purple-500 pl-4">Pengalaman</h2>
        <div className="grid grid-cols-1 gap-6">
          {workExperience.map((work) => (
            <div key={work.id} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{work.role}</h3>
                <span className="text-sm font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{work.year}</span>
              </div>
              <h4 className="text-md font-medium text-gray-400 mb-3">{work.company}</h4>
              <p className="text-gray-400 leading-relaxed">{work.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}