import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { toPng } from "html-to-image"

export default function StepFinish() {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#3e2723', '#8d6e63', '#ffe0b2', '#795548']
    });
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    const element = document.getElementById('game-stage');

    try {
      // Wait for fonts/images to be ready
      await new Promise((r) => setTimeout(r, 250));

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 0.95,
        backgroundColor: '#2d2a2e'
      });

      const link = document.createElement('a');
      link.download = `bed-rot-sim-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      return dataUrl;

    } catch (err) {
      console.error(err);
      alert("Could not create image :(");
      return null;
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    // If not on mobile/share-capable device, just tweet immediately to avoid double download action
    if (!navigator.share || !navigator.canShare) {
      const text = encodeURIComponent("I am fully booked this weekend. 😴\n\nGenerated my setup in the Bed Rot Simulator 👇");
      const url = encodeURIComponent("https://dessert-shop-demo.vercel.app");

      // We trigger download first so they have the image
      const dataUrl = await handleDownload();
      if (dataUrl) {
        setTimeout(() => {
          alert("Image saved! Please attach it to your tweet manually.");
          window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        }, 1000);
      }
      return;
    }

    // Try Native Share API
    const dataUrl = await handleDownload();
    if (!dataUrl) return;

    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "bed-rot-sim.png", { type: "image/png" });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Bed Rot Simulator',
          text: 'My weekend plans are set. #BedRotSimulator',
          files: [file]
        });
      }
    } catch (e) {
      console.log("Share failed or cancelled", e);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-4 overflow-y-auto">
      <h2 className="text-3xl w-full text-center mb-4 text-[#ffe0b2] text-outline font-bold tracking-widest">
        MISSION COMPLETE
      </h2>

      <div className="bg-[#e6dac3] p-4 border-b-4 border-r-4 border-[#3e2723] w-full max-w-sm mx-auto shadow-lg text-[#3e2723] font-[VT323] text-xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#d7ccc8] opacity-50"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-[#d7ccc8] opacity-50"></div>

        <p className="border-b border-[#a1887f] pb-2 mb-2 bg-[#d7ccc8] mx-[-1rem] mt-[-1rem] pt-2 font-bold tracking-wider">STATUS REPORT</p>

        <div className="flex justify-between items-center mb-2">
          <span>COMFORT:</span>
          <div className="w-24 h-4 bg-[#3e2723] p-[2px]">
            <div className="w-full h-full bg-[#4caf50]"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>SOCIAL:</span>
          <div className="w-24 h-4 bg-[#3e2723] p-[2px]">
            <div className="w-[10%] h-full bg-[#f44336]"></div>
          </div>
        </div>

        <p className="mt-4 text-sm animate-pulse text-[#d84315]"> SYSTEM DECOMPOSING...</p>
      </div>

      <div className="w-full flex flex-col gap-3 mt-4 max-w-xs mx-auto">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="rpg-btn w-full py-4 text-xl font-bold flex items-center justify-center gap-2 group"
        >
          {isDownloading ? "SAVING..." : "💾 SAVE TO DISK"}
        </button>

        <button
          onClick={handleShare}
          className="rpg-btn w-full py-4 text-xl font-bold text-[#fafafa] flex items-center justify-center gap-2 group"
          style={{ backgroundColor: '#1da1f2' }}
        >
          🐦 SHARE UPDATE
        </button>
      </div>

      <button
        className="mt-6 text-[#a1887f] text-lg hover:text-[#ffe0b2] hover:underline uppercase tracking-wider transition-colors"
        onClick={() => window.location.reload()}
      >
        [ NEW GAME ]
      </button>
    </div>
  );
}