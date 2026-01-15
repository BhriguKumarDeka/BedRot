import { useRef } from "react";
import { useStepStore } from "../store/stepStore";
import { motion } from "framer-motion";

export default function Preview({ id, isFullScreen = false }) {
  const constraintsRef = useRef(null);
  const {
    selectedBase,
    selectedFlavors,
    selectedToppings,
    selectedDecoration,
    selectedScene,
    userMessage,
  } = useStepStore();

  const IMAGE_MAP = {

    "White Messy": "white_messy",
    "Green Plaid": "plaid_green",
    "Pink Ruffles": "pink_ruffles",
    "Dark Grey": "dark_grey",
    "Hogwarts": "hogwarts",
    "Gryffindor": "gryffindor_bed",
    "Summoning Bed": "summoning_bed",


    "MacBook": "macbook",
    "Switch": "switch",
    "Kindle": "kindle",
    "Sleeping Cat": "cat_sleeping",
    "Key Chain": "keychain",
    "Mischief Map": "mischief_map",
    "Crystal Ball": "crystal_ball",


    "Iced Coffee": "iced_coffee",
    "Cup Noodles": "cup_noodles",
    "Chips": "chips_bag",
    "Diet Coke": "diet_coke",
    "Pizza": "pizza_box",
    "Energy Drink": "energy_drink",
    "Chocolate Frog": "chocolate_frog",


    "Squishmallow": "squishmallow",
    "Tissues": "tissues",
    "Headphones": "headphones",
    "Eye Mask": "eye_mask",
    "Mandrake Toy": "mandrake_toy",
    "Voodoo Doll": "voodoo_doll",
    "Skull": "skull",
  };

  const SCENE_MAP = {
    "Daylight": "day",
    "Rainy Mood": "rain",
    "3 AM Night": "night",
    "Golden Hour": "golden",
    "Dusk Vibes": "dusk",
    "Gryffindor": "gryffindor",
    "Void" : "void",
  };

  const renderImage = (folder, name) => {
    if (!name) return null;
    const filename = IMAGE_MAP[name] || name.toLowerCase().replace(/ /g, "_");
    return `/ingredients/${folder}/${filename}.png`;
  };

  const getItemSize = (name, type) => {
    if (type === 'tech') {
      if (name === 'Switch' || name === 'Kindle') return 'w-24 md:w-32';
      if (name === 'Sleeping Cat') return 'w-28 md:w-44';
      if( name === 'Key Chain') return 'w-12 md:w-16';
      if( name === 'Blood Dagger') return 'w-16 md:w-24';
      if( name === 'Mischief Map') return 'w-20 md:w-28'; 
      if( name === 'Crystal Ball') return 'w-24 md:w-30';

      return 'w-40 md:w-60';
    }
    if (type === 'snack') {
      if (name === 'Pizza') return 'w-24 md:w-36';
      return 'w-16 md:w-24';
    }


    if (name === 'Squishmallow') return 'w-36 md:w-56';
    if (name === 'Voodoo Doll') return 'w-36 md:w-56';


    return 'w-20 md:w-28';
  };





  const techSlots = [
    "top-[15%] left-[12%] -rotate-6",
    "top-[18%] right-[12%] rotate-6",
    "top-[45%] left-[10%] -rotate-12",
  ];


  const snackSlots = [
    "bottom-[20%] right-[15%] rotate-12",
    "bottom-[25%] left-[20%] -rotate-12",
    "bottom-[10%] left-[45%] rotate-3",
    "top-[50%] right-[10%] -rotate-6",
    "top-[65%] left-[40%] rotate-45",
  ];

  const scene = SCENE_MAP[selectedScene] ? `/backgrounds/${SCENE_MAP[selectedScene].toLowerCase()}.png` : "/backgrounds/day.png";
  const harshShadow = "drop-shadow-[3px_1px_0px_rgba(0,0,0,0.25)]";

  return (
    <div
      id={id}
      className={`relative overflow-hidden transition-all duration-700 ${isFullScreen ? "w-full h-full" : "w-72 h-72 rounded-xl"
        }`}
    >
      <img
        src={scene}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
      />

      <div className={`absolute inset-0 m-auto flex items-center justify-center transition-transform duration-500 ${isFullScreen ? "scale-[0.75] md:scale-[1.15] translate-y-2" : "scale-95"}`}>

        <div ref={constraintsRef} className="relative w-[360px] h-[480px] md:w-[650px] md:h-[820px]">

          {selectedBase ? (
            <img
              src={renderImage("base", selectedBase)}
              alt="Bed"
              className={`w-full h-full object-contain z-10 ${harshShadow}`}
            />
          ) : (
            <div className="w-1/2 h-1/2 mt-30 md:mt-50  mx-auto bg-[#f0f0f0]/50 border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-200 font-bold z-10 tracking-widest text-xl">
              [INSERT BED]
            </div>
          )}

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

        {userMessage && (
          <div className="absolute top-[10%] z-50 bg-white px-4 py-2 border-4 border-black transform -rotate-2 animate-bounce-slow">
            <span className="text-xl md:text-2xl text-black font-semibold font-[VT323]">
              {userMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}