import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { NavBar } from "./components/NavBar";
import { HeroSequence } from "./components/HeroSequence";
import { WhoSequence } from "./components/WhoSequence";
import { ExpertiseSequence } from "./components/ExpertiseSequence";
import { WorkSequence } from "./components/WorkSequence";
import { ContactSequence } from "./components/ContactSequence";
import { SplashScreen } from "./components/SplashScreen";
import { figmaEase } from "../lib/utils";

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isSplashFinished) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential default ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    // Run raf loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose programmatic section scroll transitions
    (window as any).__scrollToSection = (targetY: number, customDuration?: number, customEase?: (t: number) => number) => {
      if (!lenisRef.current) return;
      lenisRef.current.scrollTo(targetY, {
        duration: customDuration !== undefined ? customDuration / 1000 : 1.2, // convert to seconds
        easing: customEase,
        immediate: false,
      });
    };

    // Calculate offsets based on current viewport
    (window as any).__getSectionOffsets = () => {
      const vh = window.innerHeight;
      return {
        hero: 0,
        about: 2.5 * vh,
        expertise: 8.5 * vh,
        work: 14.5 * vh,
        contact: 22.5 * vh,
      };
    };

    // Keypress interceptors for transitions between Hero and Who I Am
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const boundary = 2.5 * vh;

      // Downwards key triggers: ArrowDown, Spacebar (without shift), PageDown
      const isDownKey = e.key === "ArrowDown" || (e.key === " " && !e.shiftKey) || e.key === "PageDown";
      // Upwards key triggers: ArrowUp, Spacebar (with shift), PageUp
      const isUpKey = e.key === "ArrowUp" || (e.key === " " && e.shiftKey) || e.key === "PageUp";

      if (isDownKey) {
        if (scrollY < boundary - 20) {
          e.preventDefault();
          (window as any).__scrollToSection(boundary, 1500, figmaEase);
        }
      } else if (isUpKey) {
        // If viewing the top of Who I Am section, snap back to Hero
        if (scrollY >= boundary - 10 && scrollY <= boundary + 150) {
          e.preventDefault();
          (window as any).__scrollToSection(0, 1000, figmaEase);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSplashFinished]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSplashFinished && (
          <SplashScreen key="splash" onFinish={() => setIsSplashFinished(true)} />
        )}
      </AnimatePresence>

      {isSplashFinished && (
        <main className="relative min-h-screen bg-[#030301] selection:bg-white selection:text-black">
          <NavBar />
          <HeroSequence />
          <WhoSequence />
          <ExpertiseSequence />
          <WorkSequence />
          <ContactSequence />
        </main>
      )}
    </>
  );
}
