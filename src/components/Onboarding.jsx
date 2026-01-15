import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);

  const guide = [
    {
      title: "WELCOME TO THE ROT",
      text: "You are about to engineer the ultimate cozy decomposition station. Your goal: maximize comfort, minimize movement.",
      icon: "🛌"
    },
    {
      title: "HOW TO BUILD",
      text: "Select items from the right panel to add them to your room. Drag and drop items in the preview area to arrange your nest.",
      icon: "🖱️"
    },
    {
      title: "STATS MATTER",
      text: "Keep an eye on Comfort vs. Social Battery. Too much tech kills the social vibe, but boosts comfort. Find your balance.",
      icon: "📊"
    },
    {
      title: "SHARE YOUR SHAME",
      text: "Once finished, share your setup to prove you have zero weekend plans. Let's rot together.",
      icon: "📸"
    }
  ];

  const handleNext = () => {
    if (step < guide.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      {/* 1. PERSISTENT PANEL (Stable) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="rpg-panel bg-[#e6dac3] border-4 border-[#5d4037] p-1 shadow-2xl max-w-md w-full relative overflow-hidden"
      >
        {/* Decorative CRT Scanline styling on the box */}
        <div className="border-2 border-[#5d4037] p-6 h-full flex flex-col items-center text-center relative z-10">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center w-full"
            >
              <div className="text-6xl mb-4 drop-shadow-md">
                {guide[step].icon}
              </div>

              <h2 className="text-3xl font-bold text-[#3e2723] mb-4 border-b-2 border-[#3e2723] w-full pb-2 uppercase tracking-tight">
                {guide[step].title}
              </h2>

              <p className="text-xl text-[#5d4037] mb-8 font-medium leading-relaxed min-h-[140px] md:min-h-[120px]">
                {guide[step].text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 w-full mt-auto pt-4 border-t border-[#5d4037]/20">
            <div className="flex-1 flex gap-2 justify-center items-center">
              {guide.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === step ? 1.2 : 1,
                    backgroundColor: i === step ? '#3e2723' : '#bcaaa4'
                  }}
                  className="h-3 w-3 rounded-sm rotate-45"
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="rpg-btn px-6 py-2 text-xl font-bold transition-all active:scale-95"
            >
              {step === guide.length - 1 ? "START ROTTING" : "NEXT >"}
            </button>
          </div>
        </div>

        {/* Subtle scanline overlay to match the vibe */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </motion.div>
    </motion.div>
  );
}