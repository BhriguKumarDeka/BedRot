import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingPage({ onEnter }) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#20152a] text-[#f0f0f0] relative overflow-hidden font-[VT323]">

      {/* 1. LAYERED SCENE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Simple gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2137] to-[#4a3b59]"></div>

        {/* Floating Elements (Game Sprites) */}
        <motion.img
          initial={{ y: 0 }} animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          src="/ingredients/flavors/switch.png" className="absolute top-[20%] left-[10%] w-32 md:w-48 opacity-50 drop-shadow-xl"
        />
        <motion.img
          initial={{ y: 0 }} animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          src="/ingredients/toppings/pizza_box.png" className="absolute bottom-[20%] right-[10%] w-40 md:w-56 opacity-50 drop-shadow-xl rotate-12"
        />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffb74d] rounded-full blur-[150px] opacity-10"></div>
      </div>

      {/* 2. TITLE SCREEN UI */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center relative p-8 border-4 border-[#5d4037] bg-[#e6dac3] shadow-[0_0_0_4px_#3e2723,0_0_50px_rgba(0,0,0,0.5)] max-w-2xl w-[90%]"
      >
        {/* Decorative Corner Pixel Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-[#3e2723] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-[#3e2723] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#3e2723] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#3e2723] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)]"></div>

        <div className="mb-6 border-b-4 border-[#3e2723] pb-4 border-double">
          <h1 className="text-6xl md:text-8xl mb-2 text-[#3e2723] tracking-widest uppercase drop-shadow-[2px_2px_0_#fff]">
            BED ROT
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#5d4037] bg-[#d7ccc8] inline-block px-4 py-1 border-2 border-[#3e2723]">
            SIMULATOR 2026
          </h2>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <p className="text-[#4e342e] text-xl mb-4 italic">
            "It's not laziness, it's a lifestyle."
          </p>

          <button
            onClick={onEnter}
            className="group relative px-12 py-4 bg-[#3e2723] text-[#ffecb3] border-4 border-[#ffb74d] text-3xl hover:bg-[#4e342e] transition-all hover:scale-105 active:scale-95 shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              {blink && <span className="text-[#ffb74d]">▶</span>} PRESS START
            </span>
          </button>

          <p className="text-[#8d6e63] mt-8 text-sm uppercase tracking-widest">
            v1.0.2 // COZY EDITION
          </p>
        </div>
      </motion.div>
    </div>
  );
}
