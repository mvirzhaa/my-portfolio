// src/lib/data.ts

export type Project = {
  slug: string; // URL unik (misal: weather-planner)
  title: string;
  description: string;
  techStack: string[];
  link: string; // Link ke aplikasi (internal/external)
  status: "Selesai" | "Dalam Proses" | "Ide";
  details: string; // Cerita lengkap tentang proyek ini
};

export const projects: Project[] = [
  {
    slug: "weather-planner",
    title: "Weather Planner",
    description: "Aplikasi cuaca cerdas yang memberikan saran aktivitas.",
    techStack: ["Next.js 15", "Server Actions", "OpenWeather API", "Tailwind"],
    link: "/projects/weather", // Ini link ke aplikasi yang nanti kita buat
    status: "Dalam Proses",
    details:
      "Aplikasi ini menyelesaikan masalah kebingungan saat melihat angka suhu. Tidak hanya menampilkan derajat celcius, tapi juga memberikan rekomendasi konkret: apakah enak ngopi, lari pagi, atau tidur lagi. Menggunakan Server Actions untuk fetching data super cepat tanpa loading state berlebih.",
  },
  {
    slug: "bookmark-manager",
    title: "Smart Bookmark",
    description: "Manajemen link dengan preview gambar otomatis.",
    techStack: ["Next.js", "Supabase", "Open Graph Protocol"],
    link: "/projects/bookmark",
    status: "Ide",
    details:
      "Sering lupa simpan link di mana? Aplikasi ini menyimpan URL dan otomatis mengambil metadata (judul, gambar, deskripsi) dari website tersebut, sehingga tampilan bookmark jadi visual dan rapi.",
  },

  // ... di dalam array projects
{
  slug: "focus-dashboard",
  title: "Focus Dashboard",
  description: "Timer produktivitas dengan manajemen tugas dan suara latar.",
  techStack: ["React Hooks", "Audio API", "Intervals"],
  link: "/projects/focus",
  status: "Selesai", // Kita anggap akan selesai hari ini!
  details: "Aplikasi produktivitas all-in-one. Menggabungkan teknik Pomodoro dengan to-do list sederhana. Dibangun menggunakan React useEffect untuk menangani interval waktu secara presisi.",
},
];