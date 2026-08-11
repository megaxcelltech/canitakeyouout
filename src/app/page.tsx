"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function SweetInvite() {
  const [hasEntered, setHasEntered] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rainIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================================
  // EFEK HUJAN PITA PINK TANPA HENTI (INFINITE)
  // ==========================================
  const startInfinitePinkRain = () => {
    // Bersihkan interval sebelumnya jika ada
    if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);

    // Kirim pita pink secara berkala setiap 150ms agar terus melayang halus
    rainIntervalRef.current = setInterval(() => {
      confetti({
        particleCount: 2, // 2-3 partikel per semprotan agar tetap ringan dan tidak lag
        angle: 90, // Jatuh tegak lurus dari atas
        spread: 120,
        origin: { x: Math.random(), y: -0.1 }, // Muncul acak dari atas luar layar
        colors: ['#FF69B4', '#FFB6C1', '#F06292', '#FF8A80', '#FFF9C4', '#E1BEE7'],
        startVelocity: 12,
        gravity: 0.6,
        scalar: 1.2, // Ukuran pita sedikit lebih besar
        drift: Math.random() - 0.5, // Efek melayang tertiup angin
      });
    }, 150);
  };

  // Clean-up saat komponen di-unmount agar tidak ada memori bocor
  useEffect(() => {
    return () => {
      if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    
    // Mulai hujan pita tanpa henti
    startInfinitePinkRain();

    if (audioRef.current) {
      audioRef.current.currentTime = 9; 
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
  // FUNGSI HANDLE SAAT DIA KLIK "AYO GAS!!"
  // ==========================================
  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAccepted(true);

    // EFEK KEMBANG API PASTEL DARI KIRI & KANAN
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      const sweetColors = ['#F06292', '#FF8A80', '#FFCDD2', '#FFF9C4', '#B39DDB']; 
      
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: sweetColors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: sweetColors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // NOTIFIKASI RAHASIA KE TELEGRAM
    const telegramToken = "ISI_TOKEN_BOT_DISINI"; 
    const chatId = "ISI_CHAT_ID_DISINI";
    const textMsg = "🚨 ALARM! Indri udah ngeklik 'AYO GAS!!'. Gas mandi dan siap-siap bro!";
    
    try {
      if (telegramToken !== "ISI_TOKEN_BOT_DISINI") {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(textMsg)}`);
      }
    } catch (error) {
      console.log("Notif gagal", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-800 p-4 overflow-hidden relative font-sans">
      
      {/* 1. Wallpaper Background Cerah - Pola Hati Lembut */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/heart-pattern.png')] bg-repeat opacity-10"></div>

      {/* 2. Overlay Gradient Putih-Pink Lembut */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/95 via-pink-100/80 to-white/95"></div>

      <audio ref={audioRef} src="/lagu.mp3" loop />

      <AnimatePresence>
        {!hasEntered ? (
          // ==============================
          // 1. LAYAR PEMBUKA (SWEET SPLASH SCREEN)
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
              className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_10px_40px_rgba(240,98,146,0.15)] border border-pink-100 flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200"></div>

              <h1 className="text-2xl tracking-[0.1em] font-extrabold mb-8 text-center text-pink-700 uppercase drop-shadow-sm">
                 Coffee and You ? ☕
              </h1>
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-10 py-5 bg-pink-400 text-white tracking-widest font-bold uppercase rounded-xl shadow-md hover:bg-pink-500 transition-all font-sans"
              >
               Click Here..
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // ==============================
          // 2. KONTEN UNDANGAN UTAMA (SWEET VIBES)
          // ==============================
          <motion.div 
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="z-10 flex flex-col items-center justify-center w-full max-w-lg"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_rgba(240,98,146,0.1)] border border-pink-100 p-8 sm:p-12 w-full relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl translate-x-10 translate-y-10"></div>

              {accepted ? (
                // TAMPILAN SETELAH "AYO GAS!!" DIKLIK
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full py-10 relative z-10"
                >
                  <motion.h1 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-extrabold mb-4 tracking-tight text-pink-700 drop-shadow-sm"
                  >
                    MISSION ACCEPTED! ✨
                  </motion.h1>
                  <p className="text-lg text-gray-700 font-medium font-sans mb-10 leading-relaxed px-2">
                    Sampai ketemu hari Selasa, 18 Agustus 2026 ya! Nanti kabarin aja enaknya ngopi di mana ✨
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05, translateY: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const noWA = "62882000090278"; 
                      const pesanWA = "Halo! Mission Accepted nih 🚀😁 Sampai ketemu hari Selasa, 18 Agustus 2026 ya! Nanti kabarin aja enaknya ngopi di mana ✨";
                      window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesanWA)}`, "_blank");
                    }}
                    className="px-10 py-4 bg-pink-500 text-white tracking-widest font-extrabold uppercase rounded-full shadow-lg hover:bg-pink-600 transition-all font-sans"
                  >
                    NEXT {">"} {">"}
                  </motion.button>
                </motion.div>
              ) : (
                // TAMPILAN AWAL UNDANGAN
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* FRAME FOTO INDRI YANG MUTER */}
                  <motion.div 
                    animate={{ rotate: isPlaying ? 360 : 0 }} 
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="w-48 h-48 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(240,98,146,0.2)] mb-8 border-4 border-white ring-4 ring-pink-200/60 relative overflow-hidden"
                  >
                    <img 
                      src="fotoprofil.jpeg" 
                      alt="Indri Khoerunnisa" 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>

                  {/* Teks Undangan */}
                  <div className="text-center mb-10">
                    <h2 className="text-sm font-bold mb-3 tracking-[0.2em] font-sans text-pink-600 drop-shadow-sm uppercase">
                      ♫ FIFTY FIFTY - Cupid ♫
                    </h2>
                    <h1 className="text-3xl font-extrabold text-pink-700 drop-shadow-sm leading-tight">
                      Hallow, Indri Khoerunnisa! 🎧
                    </h1>
                    <span className="inline-block text-lg font-bold text-pink-500 mb-4 bg-pink-100/70 px-4 py-1 rounded-full mt-2">
                      👑 Queendri
                    </span>
                    
                    <p className="text-base text-gray-700 leading-relaxed font-sans px-2 mb-2 font-medium">
                      Panggilan khusus untuk hari <b>Selasa, 18 Agustus 2026!</b> 🗓️
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans px-2">
                      Boleh kali buat ngobrol-ngobrol dan Re-Charge Energy bareng hihi.🤭
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="flex gap-5 justify-center w-full relative z-20 font-sans">
                    <button 
                      onClick={handleAccept}
                      className="px-10 py-4 bg-pink-400 text-white font-bold uppercase rounded-full shadow-md hover:bg-pink-500 transition-all z-20"
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
                      className="px-10 py-4 bg-white/60 backdrop-blur-sm text-pink-500 font-bold uppercase rounded-full border-2 border-pink-200 shadow-inner hover:bg-pink-50 transition-colors z-20"
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