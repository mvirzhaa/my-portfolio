"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import koneksi database
import { scrapeMetaData } from "./actions";

// Definisikan tipe data sesuai kolom database Supabase
type Bookmark = {
  id: number;
  title: string;
  url: string;
  image: string;
  hostname: string;
  created_at: string;
};

export default function BookmarkPage() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // --- 1. READ: Ambil data dari Supabase saat aplikasi dibuka ---
  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    // Query SQL: SELECT * FROM bookmarks ORDER BY created_at DESC
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching:", error);
    } else {
      setBookmarks(data || []);
    }
  }

  // --- 2. CREATE: Simpan data ke Supabase ---
  async function handleAddBookmark(e: React.FormEvent) {
    e.preventDefault();
    if (!urlInput) return;
    setLoading(true);

    // Langkah A: Scrape data dulu (Server Action)
    const meta = await scrapeMetaData(urlInput);

    if (meta) {
      // Langkah B: Insert ke Database
      // Query SQL: INSERT INTO bookmarks (title, url...) VALUES (...)
      const { error } = await supabase.from("bookmarks").insert([
        {
          title: meta.title,
          url: meta.url,
          image: meta.image,
          hostname: meta.hostname,
        },
      ]);

      if (error) {
        alert("Gagal menyimpan ke database!");
        console.error(error);
      } else {
        // Jika sukses, refresh list agar data baru muncul
        fetchBookmarks();
        setUrlInput("");
      }
    } else {
      alert("Gagal mengambil data URL.");
    }
    setLoading(false);
  }

  // --- 3. DELETE: Hapus data dari Supabase ---
  async function handleDelete(id: number) {
    const confirmDelete = confirm("Yakin mau hapus bookmark ini?");
    if (!confirmDelete) return;

    // Query SQL: DELETE FROM bookmarks WHERE id = ...
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus!");
    } else {
      // Refresh list setelah menghapus
      fetchBookmarks();
    }
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 border-b border-white/10 pb-8">
        <Link href="/projects/bookmark-manager" className="text-xs font-mono text-blue-400 hover:underline">
          ← Kembali ke Detail
        </Link>
        <h1 className="text-4xl font-bold text-white">Smart Bookmark (SQL Edition) 🗄️</h1>
        <p className="text-gray-400">Data tersimpan aman di Database Cloud (Supabase).</p>
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
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Simpan Cloud"}
          </button>
        </form>
      </div>

      {/* Grid Result */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {bookmarks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            {loading ? "Sedang memuat data..." : "Database kosong. Coba tambahkan sesuatu!"}
          </div>
        ) : (
          bookmarks.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-1"
            >
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 z-20 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Hapus dari Database"
              >
                ✕
              </button>

              <a href={item.url} target="_blank" className="h-40 overflow-hidden bg-gray-800 relative block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-white border border-white/10">
                  {item.hostname}
                </div>
              </a>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <a href={item.url} target="_blank" className="font-semibold text-gray-100 line-clamp-2 leading-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}