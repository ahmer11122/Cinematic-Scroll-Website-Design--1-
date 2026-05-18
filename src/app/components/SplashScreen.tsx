import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set playback speed to 1.8x (8-second video finishes in ~4.44s)
      video.playbackRate = 1.8;

      // Safe-guard event listener to re-apply 1.8x speed when video starts playing
      const handlePlay = () => {
        video.playbackRate = 1.8;
      };
      video.addEventListener("play", handlePlay);
      
      return () => {
        video.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  useEffect(() => {
    // Artificial timeout of 4.5 seconds (4500ms) to trigger splash screen fade out and completion
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030301] overflow-hidden select-none pointer-events-auto"
    >
      {/* Decorative premium ambient glow behind the logo */}
      <div className="absolute w-[600px] h-[300px] bg-white/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Logo Video Player */}
      <div className="relative z-10 w-[90%] max-w-[640px] aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src="/usama.webm"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
