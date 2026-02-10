import { projects } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fungsi ini tidak perlu diubah, tetap sama
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// --- PERBAIKAN DI SINI ---
// 1. Definisikan tipe params sebagai Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. Tambahkan 'async' di fungsi komponen
export default async function ProjectDetailPage({ params }: Props) {
  
  // 3. Lakukan 'await' untuk membuka isi params
  const { slug } = await params;

  // Baru cari datanya menggunakan slug yang sudah di-await
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <section className="max-w-3xl mx-auto space-y-8 py-10 animate-in fade-in zoom-in duration-500">
      {/* Tombol Back */}
      <Link 
        href="/projects" 
        className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke daftar
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tight">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm font-medium text-blue-300 bg-blue-900/20 border border-blue-800 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Konten Detail */}
      <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed border-t border-white/10 pt-8">
        <p>{project.details}</p>
        
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 my-8">
          <h3 className="text-xl font-bold text-white mb-2">💡 Tantangan Utama</h3>
          <p className="text-sm text-gray-400">
            Bagaimana mengelola state tanpa useEffect? Di proyek ini saya belajar memanfaatkan URL Search Params dan Server Actions sebagai solusi modern.
          </p>
        </div>
      </div>

      {/* Call to Action buttons */}
      <div className="flex gap-4 pt-4">
        <Link
          href={project.link}
          className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition transform hover:-translate-y-1 shadow-lg shadow-white/10 flex items-center gap-2"
        >
          🚀 Coba Aplikasi Live
        </Link>
        <Link
          href="#"
          className="px-8 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition flex items-center gap-2"
        >
          💻 Lihat Source Code
        </Link>
      </div>
    </section>
  );
}