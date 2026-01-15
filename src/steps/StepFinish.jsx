import { useEffect, useState, useMemo } from "react"
import confetti from "canvas-confetti"
import { toPng } from "html-to-image"
import { useStepStore } from "../store/stepStore"

export default function StepFinish() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { selectedBase, selectedFlavors, selectedToppings, selectedDecoration, selectedScene } = useStepStore();

  // Dynamic Score Calculation
  const stats = useMemo(() => {
    let comfort = 0;
    let social = 0;
    let rotLevel = 0;

    if (selectedBase) comfort += 20;
    if (selectedScene) comfort += 10;
    if (selectedDecoration) comfort += 15;

    // Tech increases comfort but kills social
    comfort += selectedFlavors.length * 10;
    social -= selectedFlavors.length * 10;

    // Snacks increase rot level
    rotLevel += selectedToppings.length * 15;

    // Base Calculations
    const finalComfort = Math.min(100, Math.max(0, 50 + comfort));
    const finalSocial = Math.min(100, Math.max(0, 50 + social));
    const finalRot = Math.min(100, Math.max(0, 20 + rotLevel + (selectedBase ? 10 : 0)));

    let title = "NOVICE NAPPER";
    if (finalRot > 40) title = "WEEKEND WARRIOR";
    if (finalRot > 70) title = "DECOMPOSITION EXPERT";
    if (finalRot > 90) title = "ONE WITH THE OOZE";

    return { comfort: finalComfort, social: finalSocial, rot: finalRot, title };
  }, [selectedBase, selectedFlavors, selectedToppings, selectedDecoration, selectedScene]);

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

    // Create a stat overlay for the screenshot
    const statOverlay = document.createElement('div');
    statOverlay.innerHTML = `
      <div style="position:absolute; bottom:10px; right:10px; background:#e6dac3; border:4px solid #3e2723; padding:10px; font-family:'VT323', monospace; color:#3e2723; z-index:9999; text-align:left; box-shadow:4px 4px 0 rgba(0,0,0,0.5);">
         <div style="border-bottom:2px solid #3e2723; margin-bottom:4px; font-weight:bold; font-size: 20px;">${stats.title}</div>
         <div style="font-size: 16px;">ROT LEVEL: ${stats.rot}%</div>
         <div style="font-size: 16px;">COMFORT: ${stats.comfort}%</div>
      </div>
    `;
    element.appendChild(statOverlay);

    try {
      // Wait for fonts/images to be ready
      await new Promise((r) => setTimeout(r, 250));

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 0.95,
        backgroundColor: '#2d2a2e'
      });

      element.removeChild(statOverlay);

      const link = document.createElement('a');
      link.download = `bed-rot-sim-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      return dataUrl;

    } catch (err) {
      console.error(err);
      if (element.contains(statOverlay)) element.removeChild(statOverlay);
      alert("Could not create image :(");
      return null;
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `I reached rank "${stats.title}" with ${stats.rot}% Bed Rot Level. 😴\n\nBuild your cozy setup 👇 #BedRotSimulator`;

    // If not on mobile/share-capable device, just tweet immediately to avoid double download action
    if (!navigator.share || !navigator.canShare) {
      const text = encodeURIComponent(shareText);
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
          text: shareText,
          files: [file]
        });
      }
    } catch (e) {
      console.log("Share failed or cancelled", e);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-4 overflow-y-auto w-full">
      <h2 className="text-3xl w-full text-center mb-4 text-[#ffe0b2] text-outline font-bold tracking-widest">
        MISSION COMPLETE
      </h2>

      <div className="bg-[#e6dac3] p-4 border-b-4 border-r-4 border-[#3e2723] w-full max-w-sm mx-auto shadow-lg text-[#3e2723] font-[VT323] text-xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#d7ccc8] opacity-50"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-[#d7ccc8] opacity-50"></div>

        <p className="border-b border-[#a1887f] pb-2 mb-2 bg-[#d7ccc8] mx-[-1rem] mt-[-1rem] pt-2 font-bold tracking-wider">STATUS REPORT</p>

        <div className="mb-4 text-center">
          <span className="block text-sm opacity-70">RANK ACHIEVED</span>
          <span className="text-2xl font-bold text-[#d84315] drop-shadow-sm">{stats.title}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span>ROT LEVEL:</span>
          <div className="w-24 h-4 bg-[#3e2723] p-[2px] relative">
            <div className="h-full bg-[#8e24aa]" style={{ width: `${stats.rot}%` }}></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span>COMFORT:</span>
          <div className="w-24 h-4 bg-[#3e2723] p-[2px]">
            <div className="h-full bg-[#4caf50]" style={{ width: `${stats.comfort}%` }}></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>SOCIAL:</span>
          <div className="w-24 h-4 bg-[#3e2723] p-[2px]">
            <div className="h-full bg-[#f44336]" style={{ width: `${stats.social}%` }}></div>
          </div>
        </div>
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