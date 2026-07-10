"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti"; // <-- Import Efek Kembang Api

export default function RetroInvite() {
  const [hasEntered, setHasEntered] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 37;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const kaburDong = () => {
    setNoPosition({
      x: Math.random() * 250 - 125, 
      y: Math.random() * 150 - 75, 
    });
  };

  // ==========================================
  // FUNGSI HANDLE SAAT DIA KLIK "AYO GAS"
  // ==========================================
  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAccepted(true); // Ubah layar jadi MISSION ACCEPTED

    // 1. EFEK KEMBANG API CYBERPUNK
    const duration = 3 * 1000; // 3 detik
    const end = Date.now() + duration;

    const frame = () => {
      const cyberpunkColors = ['#00F0FF', '#FF007F', '#FCEE0A']; 
      
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: cyberpunkColors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: cyberpunkColors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame(); // Jalankan kembang api

    // 2. NOTIFIKASI RAHASIA KE TELEGRAM KAMU
    const telegramToken = "ISI_TOKEN_BOT_DISINI"; 
    const chatId = "ISI_CHAT_ID_DISINI";
    const textMsg = "🚨 ALARM! NazwaFivanka udah ngeklik 'AYO GAS!!'. Gas mandi dan siap-siap bro!";
    
    try {
      if (telegramToken !== "ISI_TOKEN_BOT_DISINI") {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(textMsg)}`);
      }
    } catch (error) {
      console.log("Notif gagal", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050511] text-gray-200 p-4 overflow-hidden relative font-sans">
      
      {/* ============================== */}
      {/* LAYER BACKGROUND & EFEK UI/UX  */}
      {/* ============================== */}

      {/* 1. Wallpaper Gambar Dasar */}
      <div className="absolute inset-0 z-0 bg-[url('/Wallpaper.jpg')] bg-cover bg-center bg-no-repeat"></div>

      {/* 2. Overlay Gradient Gelap (Agar gambar meredup dan UI tetap terbaca jelas) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#050511]/90 via-[#120428]/80 to-[#000000]/95"></div>

      {/* 3. Synthwave Grid Lines (Efek kotak-kotak di atas gambar) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,240,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 4. Efek CSS Grain/Noise Gelap */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.25] mix-blend-screen">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <audio ref={audioRef} src="/lagu.mp3" loop />

      <AnimatePresence>
        {!hasEntered ? (
          // ==============================
          // 1. LAYAR PEMBUKA (CYBERPUNK SPLASH SCREEN)
          // ==============================
          <motion.div 
            key="welcome-screen"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-md p-10 rounded-2xl shadow-[0_0_30px_rgba(255,0,127,0.2)] border border-[#FF007F]/40 flex flex-col items-center relative overflow-hidden"
            >
              {/* Glitch Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF] via-[#FF007F] to-[#FCEE0A]"></div>

              <h1 className="text-xl tracking-[0.2em] font-mono font-bold mb-8 text-center text-[#00F0FF] uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                 Coffee and You ? ☕
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-8 py-4 bg-[#FCEE0A] text-black tracking-widest font-black uppercase rounded shadow-[0_0_15px_rgba(252,238,10,0.5)] hover:shadow-[0_0_25px_rgba(252,238,10,0.8)] transition-all font-mono"
              >
               Click Here..
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // ==============================
          // 2. KONTEN UNDANGAN UTAMA (NIGHT CITY VIBES)
          // ==============================
          <motion.div 
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="z-10 flex flex-col items-center justify-center w-full max-w-lg"
          >
            {/* Dark Glass Card Container */}
            <div className="bg-[#050511]/70 backdrop-blur-xl rounded-[2rem] shadow-[0_0_40px_rgba(0,240,255,0.1)] border border-[#00F0FF]/30 p-8 sm:p-12 w-full relative overflow-hidden">
              
              {/* Highlight Neon di sudut Card */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF007F]/20 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00F0FF]/20 rounded-full blur-3xl translate-x-10 translate-y-10"></div>

              {accepted ? (
                // ===============================================
                // TAMPILAN KALAU DIA KLIK "AYO GAS" (MISSION ACCEPTED)
                // ===============================================
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full py-10 relative z-10"
                >
                  <motion.h1 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-black mb-4 tracking-tight text-[#FCEE0A] drop-shadow-[0_0_10px_rgba(252,238,10,0.6)]"
                  >
                    MISSION ACCEPTED! ✨
                  </motion.h1>
                  <p className="text-lg text-gray-300 font-medium font-mono mb-8">
                      Pesan Telah Terkirim... 100% <br/>
                      Koordinat titik temu segera dikirim.
                  </p>

                  {/* TOMBOL NEXT KE WHATSAPP */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // GANTI NOMOR WA DI BAWAH INI DENGAN NOMORMU (AWALAN 62)
                      const noWA = "62882000090278"; 
                      const pesanWA = "Halo! ayo gas 🚀😁";
                      window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesanWA)}`, "_blank");
                    }}
                    className="px-8 py-3 bg-[#00F0FF] text-black tracking-widest font-black uppercase rounded shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all font-mono"
                  >
                    NEXT {">"} {">"}
                  </motion.button>
                </motion.div>
              ) : (
                // ===============================================
                // TAMPILAN AWAL (UNDANGAN)
                // ===============================================
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Piringan Hitam (Vinyl) dengan aksen Neon */}
                  <motion.div 
                    animate={{ rotate: isPlaying ? 360 : 0 }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-48 h-48 bg-gradient-to-tr from-[#0a0a0a] via-gray-900 to-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,0,127,0.3)] mb-8 border-4 border-gray-950 ring-1 ring-[#FF007F]/40 relative"
                  >
                    {/* Alur piringan hitam */}
                    <div className="absolute w-36 h-36 rounded-full border border-gray-800/80"></div>
                    <div className="absolute w-28 h-28 rounded-full border border-gray-800/80"></div>
                    
                    {/* Label Tengah Vinyl (Holographic Pink/Cyan) */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF007F] to-[#7000FF] rounded-full flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] border-2 border-[#00F0FF]/50">
                      <div className="w-4 h-4 bg-black rounded-full shadow-inner border border-[#00F0FF]"></div>
                    </div>
                  </motion.div>

                  {/* Teks Undangan */}
                  <div className="text-center mb-10">
                    <h2 className="text-xs font-bold mb-3 tracking-[0.3em] font-mono text-[#00F0FF] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                      ♫ Temper City - Self Aware ♫
                    </h2>
                    <h1 className="text-2xl font-black mb-4 text-[#FCEE0A] drop-shadow-[0_0_8px_rgba(252,238,10,0.4)]">
                      Halo, NazwaFivanka! 🎧
                    </h1>
                    <p className="text-sm text-gray-300 leading-relaxed font-mono">
                      Aku tahu kamu lagi sibuk sibuknya dengan tugas kuliah , Alangkah baiknya , Jika ada waktu , mari kita me Re-Charge Energy bersama sama hehehe 😁
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="flex gap-4 justify-center w-full relative z-20 font-mono">
                    <button 
                      onClick={handleAccept}
                      className="px-8 py-3 bg-[#FCEE0A] text-black font-bold uppercase rounded shadow-[0_0_15px_rgba(252,238,10,0.4)] hover:bg-[#e6d900] hover:shadow-[0_0_25px_rgba(252,238,10,0.7)] hover:-translate-y-1 transition-all z-20"
                    >
                      AYO GAS!!
                    </button>

                    <motion.button
                      animate={{ x: noPosition.x, y: noPosition.y }}
                      onMouseEnter={kaburDong}
                      onClick={(e) => {
                        e.stopPropagation();
                        kaburDong();
                      }}
                      className="px-8 py-3 bg-black/50 backdrop-blur-sm text-[#FF007F] font-bold uppercase rounded border border-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.3)] hover:bg-[#FF007F]/10 transition-colors z-20"
                    >
                      🚫😡
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}