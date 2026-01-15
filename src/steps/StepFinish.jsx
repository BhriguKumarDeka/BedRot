import { useEffect, useState, useMemo } from "react"
import confetti from "canvas-confetti"
import { toPng } from "html-to-image"
import { useStepStore } from "../store/stepStore"
import useSound from "../utils/useSound"

export default function StepFinish() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { selectedBase, selectedFlavors, selectedToppings, selectedDecoration, selectedScene } = useStepStore();

  const [playFinal] = useSound('/sounds/final.wav', { volume: 0.5 });

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
    playFinal();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#3e2723', '#8d6e63', '#ffe0b2', '#795548']
    });
  }, [playFinal]);

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

  const handleSharePlatform = async (platform) => {
    setIsDownloading(true);
    // 1. Generate the image first (Always needed for embedding/fallback)
    const dataUrl = await handleDownload();
    if (!dataUrl) {
      setIsDownloading(false);
      return;
    }

    const shareText = `I reached rank "${stats.title}" with ${stats.rot}% Bed Rot Level. 😴\n\nBuild your cozy setup at Bed Rot Simulator 👇 #BedRotSimulator`;

    // 2. Try Native Web Share (Best for Mobile, embeds image directly)
    try {
      const resp = await fetch(dataUrl);
      const blob = await resp.blob();
      const file = new File([blob], 'bed-rot-report.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Bed Rot Simulator',
          text: shareText,
        });
        setIsDownloading(false);
        return;
      }
    } catch (err) {
      console.log("Native share skip:", err);
    }

    // 3. Desktop Fallback (Direct Intents)
    // Note: Desktop browsers cannot "inject" images into X/WA intents via URL.
    // We've already downloaded the image for them as fallback.
    const url = "https://dessert-shop-demo.vercel.app";

    if (platform === 'x') {
      const xText = encodeURIComponent(shareText);
      const xUrl = encodeURIComponent(url);
      window.open(`https://twitter.com/intent/tweet?text=${xText}&url=${xUrl}`, '_blank');
    } else {
      const waText = encodeURIComponent(`${shareText}\n${url}`);
      window.open(`https://wa.me/?text=${waText}`, '_blank');
    }
    setIsDownloading(false);
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
          className="rpg-btn w-full py-4 text-xl font-bold flex items-center justify-center gap-2 group bg-[#3e2723] text-[#ffe0b2]"
        >
          {isDownloading ? "SAVING..." : "💾 SAVE IMAGE"}
        </button>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={() => handleSharePlatform('x')}
            disabled={isDownloading}
            className="rpg-btn py-3 text-lg font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: '#000000' }}
          >
            <span className="text-xl">𝕏</span> {isDownloading ? "..." : "SHARE"}
          </button>

          <button
            onClick={() => handleSharePlatform('whatsapp')}
            disabled={isDownloading}
            className="rpg-btn py-3 text-lg font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: '#25D366' }}
          >
            <span className="text-xl">💬</span> {isDownloading ? "..." : "WA"}
          </button>
        </div>
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