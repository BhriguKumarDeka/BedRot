export default function OptionCard({ image, label, isSelected, onClick }) {
  return (
    <button
      className={`relative flex flex-col items-center justify-center p-2 transition-all duration-100 rpg-btn ${isSelected
          ? "rpg-btn-selected transform translate-y-[1px]"
          : ""
        }`}
      onClick={onClick}
    >
      <div className="relative w-16 h-16 mb-2">
        <img
          src={image}
          alt={label}
          className={`w-full h-full object-contain filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.4)] ${isSelected ? "scale-105" : "group-hover:scale-105"
            }`}
        />
      </div>
      <span
        className={`text-lg font-bold uppercase tracking-widest text-[#ffe0b2] text-outline`}
      >
        {label}
      </span>

      {/* Selected Indicator (Pixel Hand or icon) */}
      {isSelected && (
        <div className="absolute top-1 right-1 text-[#3e2723] text-xl font-bold leading-none animate-bounce">
          ▼
        </div>
      )}
    </button>
  );
}
