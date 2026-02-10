"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function FocusPage() {
  // --- STATE: TIMER ---
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 menit dalam detik
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"FOCUS" | "REST">("FOCUS");

  // --- STATE: TODO LIST ---
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");

  // --- REF: AUDIO (Suara Hujan) ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // 1. LOGIC TIMER (Jantung Aplikasi)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Waktu habis
      setIsActive(false);
      // Mainkan suara notifikasi (opsional)
      if (audioRef.current) {
         audioRef.current.pause(); // Stop hujan kalau waktu habis
         setIsMuted(true);
      }
      alert(mode === "FOCUS" ? "Waktunya istirahat!" : "Ayo kerja lagi!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  // Helper: Format Waktu (Contoh: 25:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Helper: Toggle Timer
  const toggleTimer = () => setIsActive(!isActive);

  // Helper: Reset Timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "FOCUS" ? 25 * 60 : 5 * 60);
  };

  // Helper: Ganti Mode (Kerja / Istirahat)
  const switchMode = (newMode: "FOCUS" | "REST") => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "FOCUS" ? 25 * 60 : 5 * 60);
  };

  // 2. LOGIC TODO
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // 3. LOGIC AUDIO
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play(); // Putar
        audioRef.current.volume = 0.5; // Volume 50%
      } else {
        audioRef.current.pause(); // Stop
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen py-10 space-y-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <Link href="/projects/focus-dashboard" className="text-xs font-mono text-blue-400 hover:underline">
            ← Kembali ke Detail
          </Link>
          <h1 className="text-3xl font-bold text-white mt-1">Focus Dashboard 🧠</h1>
        </div>
        
        {/* Tombol Audio */}
        <button
          onClick={toggleAudio}
          className={`p-3 rounded-full transition-all ${
            !isMuted ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-white/10 text-gray-400 hover:bg-white/20"
          }`}
          title={isMuted ? "Putar Suara Hujan" : "Matikan Suara"}
        >
          {!isMuted ? "🔊 Playing" : "🔇 Muted"}
        </button>
        {/* Hidden Audio Element */}
        <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" />
      </div>

      {/* --- BAGIAN 1: TIMER --- */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
        {/* Background Pulse Effect saat aktif */}
        {isActive && (
            <div className="absolute inset-0 bg-blue-500/5 animate-pulse z-0"></div>
        )}

        <div className="relative z-10">
            {/* Mode Switcher */}
            <div className="flex justify-center gap-2 mb-8">
            <button
                onClick={() => switchMode("FOCUS")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                mode === "FOCUS" ? "bg-blue-600 text-white" : "bg-transparent text-gray-400 border border-white/10 hover:border-white/30"
                }`}
            >
                🔥 Fokus (25m)
            </button>
            <button
                onClick={() => switchMode("REST")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                mode === "REST" ? "bg-green-600 text-white" : "bg-transparent text-gray-400 border border-white/10 hover:border-white/30"
                }`}
            >
                ☕ Istirahat (5m)
            </button>
            </div>

            {/* Jam Digital Raksasa */}
            <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tabular-nums tracking-tight">
            {formatTime(timeLeft)}
            </div>

            {/* Kontrol Timer */}
            <div className="flex justify-center gap-4 mt-8">
            <button
                onClick={toggleTimer}
                className={`px-8 py-4 rounded-xl font-bold text-xl transition transform active:scale-95 ${
                isActive 
                    ? "bg-red-500/20 text-red-200 border border-red-500/50 hover:bg-red-500/30" 
                    : "bg-white text-black hover:bg-gray-200"
                }`}
            >
                {isActive ? "Jeda" : "Mulai"}
            </button>
            <button
                onClick={resetTimer}
                className="px-6 py-4 rounded-xl font-bold text-xl bg-white/10 text-white border border-white/10 hover:bg-white/20 transition"
            >
                ↺
            </button>
            </div>
        </div>
      </div>

      {/* --- BAGIAN 2: TASK LIST --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-300">Target Sesi Ini</h2>
        
        <form onSubmit={addTask} className="flex gap-2">
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Apa yang mau dikerjakan?"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
            />
            <button type="submit" className="px-6 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-700">
                +
            </button>
        </form>

        <ul className="space-y-2">
            {tasks.map((task, index) => (
                <li key={index} className="flex justify-between items-center p-4 bg-black/40 border border-white/5 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-gray-200">{task}</span>
                    <button 
                        onClick={() => removeTask(index)}
                        className="text-gray-500 hover:text-red-400 transition text-sm"
                    >
                        Selesai
                    </button>
                </li>
            ))}
            {tasks.length === 0 && (
                <p className="text-center text-gray-600 text-sm py-4">Belum ada target. Masukkan satu tugas kecil!</p>
            )}
        </ul>
      </div>

    </div>
  );
}