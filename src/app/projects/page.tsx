import Link from "next/link";
import { projects } from "@/lib/data"; // Import data yang baru kita buat

export default function ProjectsPage() {
  return (
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Proyek Terpilih
        </h1>
        <p className="text-gray-400 max-w-lg">
          Kumpulan eksperimen kode yang saya kerjakan untuk mengasah pemahaman tentang Web Development modern.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`} // Link ke halaman detail (Langkah 3)
            className="group relative block p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          >
            {/* Badge Status */}
            <div className="absolute top-4 right-4">
              <span className={`text-xs px-2 py-1 rounded-full border ${
                project.status === "Selesai" ? "border-green-500 text-green-400 bg-green-500/10" :
                project.status === "Dalam Proses" ? "border-yellow-500 text-yellow-400 bg-yellow-500/10" :
                "border-gray-500 text-gray-400 bg-gray-500/10"
              }`}>
                {project.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-6 line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 bg-black/30 rounded text-gray-300 border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}