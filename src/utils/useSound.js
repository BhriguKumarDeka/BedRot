import { useEffect, useRef, useCallback } from "react";

export default function useSound(url, { volume = 1 } = {}) {
  const audioRef = useRef(null);


  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.volume = volume;
  }, [url]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {


        console.warn("Sound play prevented:", err);
      });
    }
  }, []);

  return [play];
}
