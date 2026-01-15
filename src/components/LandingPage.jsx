import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingPage({ onEnter }) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#20152a] text-[#f0f0f0] relative overflow-hidden font-[VT323]">

      <motion.div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2137] to-[#4a3b59]"></div>

        <motion.img
          initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          src="/ingredients/base/white_messy.png"
          className="absolute z-0 w-[80%] max-w-[500px] opacity-20 drop-shadow-2xl grayscale brightness-50"
        />

        <motion.img
          initial={{ x: -100, y: -50, rotate: -15 }}
          animate={{ x: [-100, -120, -100], y: [-50, -70, -50], rotate: [-15, -10, -15] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          src="/ingredients/flavors/switch.png" className="absolute top-[20%] left-[10%] w-32 md:w-48 opacity-40 drop-shadow-xl"
        />
        <motion.img
          initial={{ x: 100, y: 50, rotate: 12 }}
          animate={{ x: [100, 120, 100], y: [50, 70, 50], rotate: [12, 18, 12] }}
          transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
          src="/ingredients/toppings/pizza_box.png" className="absolute bottom-[20%] right-[10%] w-40 md:w-56 opacity-40 drop-shadow-xl"
        />
        <motion.img
          initial={{ x: -80, y: 80, rotate: -5 }}
          animate={{ x: [-80, -60, -80], y: [80, 100, 80], rotate: [-5, 0, -5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          src="/ingredients/flavors/cat_sleeping.png" className="absolute bottom-[25%] left-[15%] w-36 md:w-48 opacity-40 drop-shadow-xl"
        />
        <motion.img
          initial={{ x: 80, y: -80, rotate: 20 }}
          animate={{ x: [80, 60, 80], y: [-80, -100, -80], rotate: [20, 25, 20] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
          src="/ingredients/toppings/iced_coffee.png" className="absolute top-[25%] right-[15%] w-24 md:w-32 opacity-40 drop-shadow-xl"
        />

        <div className="absolute top-[10%] left-[50%] w-4 h-4 bg-[#ffb74d] opacity-20 animate-ping"></div>
        <div className="absolute bottom-[10%] left-[20%] w-3 h-3 bg-[#ffb74d] opacity-20 animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-[#ffb74d] opacity-30 animate-bounce"></div>

        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffb74d] rounded-full blur-[150px] opacity-10"></div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center relative p-8 border-4 border-[#5d4037] bg-[#e6dac3] shadow-[0_0_0_4px_#3e2723,0_0_50px_rgba(0,0,0,0.5)] max-w-xl w-[90%]"
      >
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

          <div className="mt-8 flex gap-6 z-20">
            <a href="https://github.com/BhriguKumarDeka" target="_blank" rel="noopener noreferrer" className="text-[#5d4037] hover:text-[#3e2723] hover:underline flex items-center gap-2 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              <span>GITHUB</span>
            </a>
            <a href="https://bhrigu.live" target="_blank" rel="noopener noreferrer" className="text-[#5d4037] hover:text-[#3e2723] hover:underline flex items-center gap-2 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>PORTFOLIO</span>
            </a>
          </div>

          <p className="text-[#8d6e63] mt-8 text-sm uppercase tracking-widest">
            v1.0.2
          </p>

          <div className="mt-4 opacity-80 hover:opacity-100 transition-opacity">
            <img
              src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fbed-rot-sim. vercel.app&label=VISITORS&labelColor=%235d4037&countColor=%233e2723&style=flat-square"
              alt="Visitor Count"
              className="h-6"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
