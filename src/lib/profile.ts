// src/lib/profile.ts

export const personalInfo = {
  name: "Muhamad Virzha Andriansyah",
  role: "Bismillah Insyaaallah Fullstack Web Developer",
  bio: "Halo! Saya seorang developer yang bersemangat membangun aplikasi web modern. Berawal dari rasa penasaran saat bosan, kini coding menjadi jalan ninja saya untuk memecahkan masalah sehari-hari melalui teknologi.",
  email: "muhamadvirzhaa@gmail.com",
  location: "Bogor, Jawa Barat, Indonesia",
};

export const educationHistory = [
  {
    id: 1,
    institution: "Universitas Ibn Khaldun Bogor",
    degree: "S1 Teknik Informatika",
    year: "2022 - Sekarang",
    description: "Fokus pada pengembangan perangkat lunak dan sistem informasi.",
  },
  {
    id: 2,
    institution: "SMK Negeri 1 Cariu",
    degree: "Multimedia",
    year: "2018 - 2021",
    description: "Belajar dasar-dasar desain grafis, animasi, dan pengembangan web.",
  }
];

export const workExperience = [
  {
    id: 1,
    company: "Freelance",
    role: "All Role Halal",
    year: "2024 - Sekarang",
    description: "Mengerjakan apa saja yang bisa saya bantu dan kerjakan.",
  }
  
];

// Tambahkan ini di bagian bawah src/lib/profile.ts

export const socialMedia = [
  {
    id: 1,
    name: "Instagram",
    url: "https://instagram.com/mvirzhaa_",
    // Kita pakai inisial untuk menentukan ikon nanti di tampilan
    icon: "ig", 
  },
  {
    id: 2,
    name: "Facebook",
    url: "https://facebook.com/muhamadvirzhaa",
    icon: "fb",
  },
  {
    id: 3,
    name: "GitHub",
    url: "https://github.com/mvirzhaa",
    icon: "github",
  }
];