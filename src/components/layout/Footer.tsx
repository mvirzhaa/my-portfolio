import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm mt-20">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-white tracking-tight">dev.bosen</h3>
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} Dibangun saat bosan.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/projects" className="hover:text-blue-400 transition">Projects</Link>
          <a href="https://github.com" target="_blank" className="hover:text-white transition">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}