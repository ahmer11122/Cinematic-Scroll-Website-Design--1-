import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Artificial timeout of 6.0 seconds (6000ms) to trigger splash screen fade out and completion
    const timer = setTimeout(() => {
      onFinish();
    }, 6000);

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
        {/* Watermark Mask (covers bottom-right watermark seamlessly) */}
        <div className="absolute bottom-0 right-0 w-[15%] h-[8%] bg-black pointer-events-none z-20" />
      </div>
    </motion.div>
  );
}
