import useSound from "../utils/useSound";

export default function OptionCard({ image, label, isSelected, onClick, imageClass = "" }) {
  const [playSelect] = useSound('/sounds/select.wav', { volume: 0.4 });

  const handleClick = (e) => {
    playSelect();
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`relative flex flex-col items-center justify-center p-2 transition-all duration-100 rpg-btn min-h-[100px] w-full ${isSelected
        ? "rpg-btn-selected transform translate-y-[1px]"
        : ""
        }`}
      onClick={handleClick}
    >
      <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 shrink-0 flex items-center justify-center">
        <img
          src={image}
          alt={label}
          className={`w-full h-full object-contain filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)] transition-transform ${imageClass} ${isSelected ? "scale-105" : "group-hover:scale-105"
            }`}
        />
      </div>
      <span
        className={`text-sm md:text-lg font-bold uppercase tracking-widest text-[#ffe0b2] text-outline leading-tight`}
      >
        {label}
      </span>

      {/* Selected Indicator (Pixel Hand or icon) */}
      {isSelected && (
        <div className="absolute top-1 right-1 text-[#3e2723] text-lg md:text-xl font-bold leading-none animate-bounce">
          ▼
        </div>
      )}
    </button>
  );
}
