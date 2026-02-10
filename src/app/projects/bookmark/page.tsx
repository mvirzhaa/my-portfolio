"use client"; // Wajib karena ada useState

import Link from "next/link";
import { useState } from "react";
import { scrapeMetaData, type BookmarkData } from "./actions"; // Import logic tadi

export default function BookmarkPage() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State untuk menyimpan daftar bookmark sementara
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([
    {
        title: "Contoh: Next.js Website",
        image: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
        url: "https://nextjs.org",
        hostname: "nextjs.org"
    }
  ]);

  async function handleAddBookmark(e: React.FormEvent) {
    e.preventDefault();
    if (!urlInput) return;

    setLoading(true);
    
    // Panggil Server Action
    const data = await scrapeMetaData(urlInput);

    if (data) {
      // Tambahkan ke daftar paling atas
      setBookmarks((prev) => [data, ...prev]);
      setUrlInput(""); // Reset input
    } else {
      alert("Gagal mengambil data URL. Pastikan link benar!");
    }
    
    setLoading(false);
  }

  function handleDelete(indexToDelete: number) {
    setBookmarks((prev) => prev.filter((_, i) => i !== indexToDelete));
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 border-b border-white/10 pb-8">
        <Link href="/projects/bookmark-manager" className="text-xs font-mono text-blue-400 hover:underline">
          ← Kembali ke Detail
        </Link>
        <h1 className="text-4xl font-bold text-white">Smart Bookmark 🔖</h1>
        <p className="text-gray-400">Paste link, biar sistem yang cari gambar & judulnya.</p>
      </div>

      {/* Input Section */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleAddBookmark} className="relative flex gap-2 p-2 bg-white/5 rounded-xl border border-white/10 focus-within:border-blue-500 transition-colors">
            <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Loading..." : "Simpan"}
            </button>
        </form>
      </div>

      {/* Grid Result */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {bookmarks.map((item, index) => (
          <div
            key={index} // Sebaiknya pakai ID unik, tapi index cukup utk belajar
            className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-1"
          >
            {/* Delete Button (Muncul saat hover) */}
            <button 
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 z-20 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Hapus"
            >
                ✕
            </button>

            {/* Image Preview */}
            <a href={item.url} target="_blank" className="h-40 overflow-hidden bg-gray-800 relative block">
              {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                  />
              ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
              )}
              
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-white border border-white/10">
                {item.hostname}
              </div>
            </a>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <a href={item.url} target="_blank" className="font-semibold text-gray-100 line-clamp-2 leading-tight mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </a>
            </div>
          </div>
        ))}

        {bookmarks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
                Belum ada bookmark. Coba paste link YouTube atau GitHub di atas!
            </div>
        )}
      </div>
    </div>
  );
}