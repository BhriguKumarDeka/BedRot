import { useState, useEffect, useRef } from 'react'
import { useStepStore } from './store/stepStore'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from './utils/useSound'
import Preview from './components/Preview'
import LandingPage from './components/LandingPage'
import Onboarding from './components/Onboarding'

import StepBase from './steps/StepBase'
import StepFlavors from './steps/StepFlavors'
import StepToppings from './steps/StepToppings'
import StepDecorate from './steps/StepDecorate'
import StepScene from './steps/StepScene'
import StepText from './steps/StepText'
import StepFinish from './steps/StepFinish'

const steps = [
  { component: <StepBase />, label: "Bedding", icon: "🛏️" },
  { component: <StepFlavors />, label: "Tech", icon: "💻" },
  { component: <StepToppings />, label: "Snacks", icon: "🍟" },
  { component: <StepDecorate />, label: "Comfort", icon: "🧸" },
  { component: <StepScene />, label: "Time", icon: "🌙" },
  { component: <StepText />, label: "Status", icon: "💭" },
  { component: <StepFinish />, label: "Share", icon: "🚀" },
]

export default function App() {
  const { stepIndex, goToStep } = useStepStore()
  const [hasEntered, setHasEntered] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const activeStep = steps[stepIndex]

  // Music & Sound effects
  const musicRef = useRef(null);
  const [playClick] = useSound('/sounds/click.wav', { volume: 0.5 });
  const [playPage] = useSound('/sounds/page.wav', { volume: 0.4 });

  useEffect(() => {
    // Initialize Music
    musicRef.current = new Audio('/sounds/music.mp3');
    musicRef.current.loop = true;
    musicRef.current.volume = 0.3;

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    }
  }, []);

  // Sync mute state with audio element
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleEnter = () => {
    playClick();
    setHasEntered(true);
    setShowOnboarding(true);

    // Start background music loop
    if (musicRef.current) {
      musicRef.current.play().catch(err => console.log("Music blocked:", err));
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }

  const handleNav = (index) => {
    playPage();
    goToStep(index);
  }

  if (!hasEntered) {
    return <LandingPage onEnter={handleEnter} />
  }

  return (
    <main className="w-full h-[100dvh] overflow-hidden flex flex-col md:flex-row text-[#3e2723] font-[VT323]">

      <AnimatePresence>
        {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}
      </AnimatePresence>

      {/* SECTION 1: PREVIEW (Top 40% Mobile, Left 60% Desktop) */}
      <div className="relative order-1 md:order-1 h-[40%] md:h-full md:flex-1 flex items-center justify-center p-4 overflow-hidden border-r-4 border-[#20152a] bg-[#20152a] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">

        {/* CRT Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Preview id="game-stage" isFullScreen={true} />
        </div>

        <div className="absolute top-4 left-4 text-[#ffecb3] text-xl opacity-80 text-outline tracking-widest hidden md:block">
          LOCATION: BEDROOM <br />
          TIME: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Music Toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-[60] bg-[#3e2723] border-2 border-[#ffb74d] text-[#ffb74d] px-3 py-1 text-xl hover:scale-110 transition-transform shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          {isMuted ? "🔈 OFF" : "🔊 ON"}
        </button>
      </div>

      {/* SECTION 2: CONTROLS (Bottom 60% Mobile, Right 40% Desktop) */}
      <div className="order-2 md:order-2 h-[60%] md:h-full md:w-[450px] flex flex-col p-2 md:p-4 z-40 bg-[#2c2137]">

        {/* RPG WINDOW PANEL */}
        <div className="flex-1 flex flex-col shadow-2xl relative overflow-hidden">

          {/* Header */}
          <div className="rpg-header flex justify-between items-center rounded-t-sm px-4 py-2 shrink-0">
            <span className="flex items-center gap-2 text-xl">
              {activeStep.icon} {activeStep.label}
            </span>
            <span className="text-sm opacity-70">LVL 99 ROTTER</span>
          </div>

          {/* Body */}
          <div className="rpg-panel flex-1 flex flex-col rounded-b-sm overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="h-full pb-2"
                >
                  {activeStep.component}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Tabs (RPG Style) - Fixed at bottom of panel */}
            <div className="bg-[#5d4037] p-2 overflow-x-auto hide-scrollbar border-t-4 border-[#3e2723] shrink-0">
              <div className="flex gap-2 justify-start md:justify-center min-w-max px-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => handleNav(index)}
                    className={`min-w-[48px] h-12 flex items-center justify-center text-2xl transition-all border-2 rounded ${stepIndex === index
                      ? "bg-[#ffb74d] border-[#ffe0b2] text-[#3e2723] translate-y-1 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]"
                      : "bg-[#8d6e63] border-[#d7ccc8] text-[#efebe9] shadow-[2px_2px_0px_rgba(0,0,0,0.4)] hover:bg-[#a1887f] hover:-translate-y-1"
                      }`}
                  >
                    {step.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
