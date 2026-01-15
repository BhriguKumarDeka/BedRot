import { useEffect, useState, useMemo } from "react"
import confetti from "canvas-confetti"
import { toPng } from "html-to-image"
import { useStepStore } from "../store/stepStore"
import useSound from "../utils/useSound"

export default function StepFinish() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { selectedBase, selectedFlavors, selectedToppings, selectedDecoration, selectedScene } = useStepStore();

  const [playFinal] = useSound('/sounds/final.wav', { volume: 0.5 });


  const stats = useMemo(() => {
    let comfort = 0;
    let social = 0;
    let rotLevel = 0;

    if (selectedBase) comfort += 20;
    if (selectedScene) comfort += 10;
    if (selectedDecoration) comfort += 15;


    comfort += selectedFlavors.length * 10;
    social -= selectedFlavors.length * 10;


    rotLevel += selectedToppings.length * 15;


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
    const element = document.getElementById('capture-zone');
    if (!element) return;
    setIsDownloading(true);

    try {
      await new Promise((r) => setTimeout(r, 250));

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 1.0,
        backgroundColor: '#20152a'
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

  const handleSharePlatform = async (platform) => {
    setIsDownloading(true);
    const dataUrl = await handleDownload();
    if (!dataUrl) {
      setIsDownloading(false);
      return;
    }

    const shareText = `I reached rank "${stats.title}" with ${stats.rot}% Bed Rot Level. 😴\n\nBuild your cozy setup at Bed Rot Simulator 👇 #BedRotSimulator`;

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
    <div className="flex flex-col items-center justify-start h-full text-center gap-2 px-2 md:px-4 overflow-y-auto w-full">
      <h2 className="hidden md:block text-3xl w-full text-center mb-0 mt-4 text-[#b66d00] text-outline font-bold tracking-widest uppercase">
        Mission Complete
      </h2>

      <div className="flex flex-col gap-2 text-[#b66d00] mb-2">
        <p className="text-xl opacity-90">Sleep well, decomposition expert.</p>
      </div>

      <div className="w-full flex flex-col gap-2 md:gap-3 mt-2 md:mt-4 max-w-xs mx-auto shrink-0 pb-6">
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

        <button
          className="mt-2 text-[#a1887f] text-sm md:text-lg hover:text-[#ffe0b2] hover:underline uppercase tracking-wider transition-colors"
          onClick={() => window.location.reload()}
        >
          [ New Bed ]
        </button>
      </div>
    </div>
  );
}