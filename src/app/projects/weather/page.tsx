import { redirect } from "next/navigation";
import Link from "next/link";

// --- 1. Logic Fetching Data (Server) ---
async function getWeather(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // Kalau API Key belum terbaca, kembalikan null
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// --- 2. Server Action untuk Search ---
async function searchCity(formData: FormData) {
  "use server";
  const city = formData.get("city");
  if (city) {
    // Redirect akan me-refresh halaman dengan parameter baru
    redirect(`/projects/weather?city=${city}`);
  }
}

// --- 3. Komponen Utama (Page) ---

// Definisikan Tipe Props sebagai Promise (Aturan Next.js 15)
type Props = {
  searchParams: Promise<{ city?: string }>;
};

export default async function WeatherPage({ searchParams }: Props) {
  // PERBAIKAN: Await searchParams dulu!
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Jakarta";
  
  // Fetch data berdasarkan kota
  const weather = await getWeather(city);

  return (
    <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col justify-center">
      
      {/* Header Kecil */}
      <div className="mb-8 text-center space-y-2">
        <Link href="/projects/weather-planner" className="text-xs font-mono text-blue-400 hover:underline">
          ← Kembali ke Detail Proyek
        </Link>
        <h1 className="text-3xl font-bold text-white">Weather Planner</h1>
        <p className="text-gray-400">Cek cuaca real-time dengan API.</p>
      </div>

      {/* Card Utama */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        
        {/* Background Glow Effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-600/20 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-600/20 blur-[80px]"></div>

        <div className="relative z-10 space-y-8">
          {/* Search Bar */}
          <form action={searchCity} className="relative group">
            <input
              name="city"
              type="text"
              placeholder="Cari kota (cth: Bandung)..."
              defaultValue={city} // Agar input tetap terisi nama kota terakhir
              className="w-full pl-4 pr-12 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 aspect-square bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              🔍
            </button>
          </form>

          {/* Result Display */}
          {weather ? (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Icon & Location */}
              <div className="flex flex-col items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-blue-200 border border-white/5">
                  {weather.sys.country}
                </span>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  {weather.name}
                </h2>
                <p className="text-lg text-blue-200 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>

              {/* Temperature Big Text */}
              <div className="relative inline-block my-4">
                <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter">
                  {Math.round(weather.main.temp)}°
                </span>
              </div>

              {/* Grid Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Kelembapan</p>
                  <p className="text-xl font-bold text-white">{weather.main.humidity}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Angin</p>
                  <p className="text-xl font-bold text-white">{weather.wind.speed} m/s</p>
                </div>
              </div>

              {/* Logic Saran Aktivitas */}
              <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30">
                <p className="text-xs text-blue-300 font-bold mb-2 uppercase tracking-wider">Rekomendasi</p>
                <p className="text-base text-gray-200 italic">
                  "{weather.weather[0].main.includes("Rain") 
                    ? "Hujan turun! Waktu yang sempurna untuk menyeduh kopi dan fix bug." 
                    : weather.main.temp > 30 
                    ? "Panas banget! Jangan lupa minum air putih kalau mau coding lama." 
                    : "Cuaca cerah. Enak nih buat cari inspirasi di luar atau lanjut proyek."}"
                </p>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-red-500/20">
              <p className="text-red-300 font-medium">Kota tidak ditemukan / API Key Error</p>
              <p className="text-xs mt-2 text-gray-400">Coba cek ejaan kota atau restart server jika baru pasang API Key.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}