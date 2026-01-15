import { useRef } from "react";
import { useStepStore } from "../store/stepStore";
import { motion } from "framer-motion";

export default function Preview({ id, isFullScreen = false }) {
  const constraintsRef = useRef(null);
  const {
    selectedBase,
    selectedFlavors, // Tech
    selectedToppings, // Snacks
    selectedDecoration, // Comfort (Plushie)
    selectedScene, // Light
    userMessage,
  } = useStepStore();

  const IMAGE_MAP = {
    // Base
    "White Messy": "white_messy",
    "Green Plaid": "plaid_green",
    "Pink Ruffles": "pink_ruffles",
    "Dark Grey": "dark_grey",

    // Flavors (Tech)
    "MacBook": "macbook",
    "Switch": "switch",
    "Kindle": "kindle",
    "Sleeping Cat": "cat_sleeping",

    // Toppings (Snacks)
    "Iced Coffee": "iced_coffee",
    "Cup Noodles": "cup_noodles",
    "Chips": "chips_bag",
    "Diet Coke": "diet_coke",
    "Pizza": "pizza_box",
    "Energy Drink": "energy_drink",

    // Decorations (Comfort)
    "Squishmallow": "squishmallow",
    "Tissues": "tissues",
    "Headphones": "headphones",
    "Eye Mask": "eye_mask",
  };

  const SCENE_MAP = {
    "Daylight": "day",
    "Rainy Mood": "rain",
    "3 AM Night": "night",
    "Golden Hour": "golden",
  };

  const renderImage = (folder, name) => {
    if (!name) return null;
    const filename = IMAGE_MAP[name] || name.toLowerCase().replace(/ /g, "_");
    return `/ingredients/${folder}/${filename}.png`;
  };

  const getItemSize = (name, type) => {
    if (type === 'tech') {
      if (name === 'Switch' || name === 'Kindle') return 'w-24 md:w-32';
      return 'w-40 md:w-60'; // Laptops/Cats bigger
    }
    if (type === 'snack') {
      if (name === 'Pizza') return 'w-24 md:w-36';
      return 'w-16 md:w-24';
    }

    // Decorations (Comfort)
    if (name === 'Squishmallow') return 'w-36 md:w-56'; // Default large size for plushie
    // Smaller items (Tissues, Headphones, Mask)
    return 'w-20 md:w-28';
  };

  // 📍 FIXED SLOTS (No overlapping)
  // These positions are percentages strictly INSIDE the bed area.

  // Tech Slots (Top half of bed)
  const techSlots = [
    "top-[15%] left-[12%] -rotate-6",  // 1. Top Left Pillow
    "top-[18%] right-[12%] rotate-6",  // 2. Top Right Pillow
    "top-[45%] left-[10%] -rotate-12", // 3. Middle Left
  ];

  // Snack Slots (Bottom half & Edges)
  const snackSlots = [
    "bottom-[20%] right-[15%] rotate-12",   // 1. Bottom Right Corner
    "bottom-[25%] left-[20%] -rotate-12",   // 2. Bottom Left Corner
    "bottom-[10%] left-[45%] rotate-3",     // 3. Very Bottom Center
    "top-[50%] right-[10%] -rotate-6",      // 4. Middle Right Edge
    "top-[65%] left-[40%] rotate-45",       // 5. Lower Middle
  ];

  const scene = SCENE_MAP[selectedScene] ? `/backgrounds/${SCENE_MAP[selectedScene].toLowerCase()}.png` : "/backgrounds/day.png";
  const harshShadow = "drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)]";

  return (
    <div
      id={id}
      className={`relative overflow-hidden transition-all duration-700 ${isFullScreen ? "w-full h-full" : "w-72 h-72 rounded-xl"
        }`}
    >
      {/* 1. BACKGROUND LAYER */}
      <img
        src={scene}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
      />

      {/* 2. THE BED CONTAINER - Centered & Large */}
      <div className={`absolute inset-0 m-auto flex items-center justify-center transition-transform duration-500 ${isFullScreen ? "scale-[0.55] md:scale-100 translate-y-0" : "scale-90"}`}>

        {/* WRAPPER: Limits items to strictly stay within the Bed's box */}
        <div ref={constraintsRef} className="relative w-[340px] h-[450px] md:w-[600px] md:h-[750px]">

          {/* BED IMAGE (Base) */}
          {selectedBase ? (
            <img
              src={renderImage("base", selectedBase)}
              alt="Bed"
              className={`w-full h-full object-contain z-10 ${harshShadow}`}
            />
          ) : (
            <div className="w-full h-full bg-[#f0f0f0] border-4 border-dashed border-slate-500 flex items-center justify-center text-slate-500 font-bold z-10 tracking-widest text-xl">
              [INSERT BED]
            </div>
          )}

          {/* 3. TECH ITEMS (Flavors) */}
          {selectedFlavors.map((flavor, index) => (
            <motion.img
              key={index}
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              src={renderImage("flavors", flavor)}
              className={`absolute cursor-grab z-20 ${harshShadow} ${getItemSize(flavor, 'tech')} ${techSlots[index % techSlots.length]}`}
            />
          ))}

          {/* 4. PLUSHIE (Decor) - Dead Center */}
          {selectedDecoration && (
            <motion.img
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              src={renderImage("decorations", selectedDecoration)}
              className={`absolute cursor-grab z-30 ${getItemSize(selectedDecoration, 'decor')} top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 ${harshShadow}`}
            />
          )}

          {/* 5. SNACKS (Toppings) */}
          {selectedToppings.map((topping, index) => (
            <motion.img
              key={index}
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              src={renderImage("toppings", topping)}
              className={`absolute cursor-grab z-40 ${harshShadow} ${getItemSize(topping, 'snack')} ${snackSlots[index % snackSlots.length]}`}
            />
          ))}
        </div>

        {/* 6. STATUS TEXT (Floating above) */}
        {userMessage && (
          <div className="absolute top-[5%] z-50 bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_#000] transform -rotate-2 animate-bounce-slow">
            <span className="text-xl md:text-2xl text-black font-bold font-[VT323]">
              {userMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}