import Link from 'next/link';

export default function Navbar() {
  return (
    // Tambahkan backdrop-blur dan border bottom tipis
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tighter text-white hover:text-blue-400 transition">
          dev.bosen
        </Link>
        <div className="space-x-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/projects" className="hover:text-white transition">Projects</Link>
        </div>
      </div>
    </nav>
  );
}