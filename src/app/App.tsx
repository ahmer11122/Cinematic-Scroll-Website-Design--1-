import { useState, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
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
    (window as any).__scrollToSection = (
      targetY: number, 
      customDuration?: number, 
      customEase?: (t: number) => number,
      onComplete?: () => void
    ) => {
      if (!lenisRef.current) return;
      lenisRef.current.scrollTo(targetY, {
        duration: customDuration !== undefined ? customDuration / 1000 : 1.2, // convert to seconds
        easing: customEase,
        immediate: false,
        onComplete,
      });
    };

    // Calculate offsets based on current viewport
    (window as any).__getSectionOffsets = () => {
      const vh = window.innerHeight;
      return {
        hero: 0,
        about: 2.5 * vh,
        expertise: 10.5 * vh,
        work: 16.5 * vh,
        contact: 28.5 * vh,
      };
    };

    // Keypress interceptors for transitions between Hero, Who I Am, and individual About frames
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Frame heights/scroll positions mapped exactly to WhoSequence's scroll progress
      const f145 = 2.5 * vh;                 // progress 0.0
      const f146 = (2.5 + 1.92) * vh;        // progress 0.24 (Who I AM? and Small Image revealed)
      const f149 = (2.5 + 2.72) * vh;        // progress 0.34 (Split text, centered image)
      const f147 = (2.5 + 3.84) * vh;        // progress 0.48 (Fades to black, massive image background)
      const f151 = (2.5 + 4.64) * vh;        // progress 0.58 (Paragraph 1 active)
      const f152 = (2.5 + 5.44) * vh;        // progress 0.68 (Paragraph 2 active, parallax shift 1)
      const f160 = (2.5 + 6.24) * vh;        // progress 0.78 (Paragraph 3 active, parallax shift 2)
      const f161 = (2.5 + 7.04) * vh;        // progress 0.88 (Paragraph 4 active, parallax shift 3)
      const f162 = (2.5 + 7.52) * vh;        // progress 0.94 (Massive image)
      const endWho = 10.5 * vh;              // f163 (End of WhoSequence)
      
      const expStart = 10.5 * vh;
      const f164 = expStart + (6 * vh * 0.15); // Frame 164: White bg, text centered, image 1px
      const f165 = expStart + (6 * vh * 0.25); // Frame 165: Black wipe complete
      const f166 = expStart + (6 * vh * 0.35); // Frame 166: Content revealed, skill 1
      const f171 = expStart + (6 * vh * 0.50); // Frame 171: Skill 2 active
      const f172 = expStart + (6 * vh * 0.60); // Frame 172: Skill 3 active
      const f174 = expStart + (6 * vh * 0.70); // Frame 174: Skill 4 active
      const f175 = expStart + (6 * vh * 0.85); // Frame 175: Skill 4 fully read, transition pre-start
      
      const workStart = 16.5 * vh;
      const wTitle = workStart + 0.10 * 11 * vh;   // Work title enters / bg goes black (p = 0.10)
      const wCard1 = workStart + 0.26 * 11 * vh;   // Card 1 active / centered (p = 0.26)
      const wCard2 = workStart + 0.42 * 11 * vh;   // Card 2 active / centered (p = 0.42)
      const wCard3 = workStart + 0.58 * 11 * vh;   // Card 3 active / centered (p = 0.58)
      const wCard4 = workStart + 0.74 * 11 * vh;   // Card 4 active / centered (p = 0.74)
      const wExit = workStart + 1.00 * 11 * vh;    // Work Exit / transition out (p = 1.00)
      const contactStart = 28.5 * vh;

      // Contact snap points mapping to each Figma frame transition
      const c209 = contactStart + 0.02 * 3 * vh;   // Frame 209: Image full screen (p = 0.02)
      const c200 = contactStart + 0.25 * 3 * vh;   // Frame 200: Image + "your go to designer" text (p = 0.25)
      const c202 = contactStart + 0.55 * 3 * vh;   // Frame 202: Image shrunken, white bg (p = 0.55)
      const c203 = contactStart + 0.88 * 3 * vh;   // Frame 203: Contact final details (p = 0.88)

      // Downwards key triggers: ArrowDown, Spacebar (without shift), PageDown
      const isDownKey = e.key === "ArrowDown" || (e.key === " " && !e.shiftKey) || e.key === "PageDown";
      // Upwards key triggers: ArrowUp, Spacebar (with shift), PageUp
      const isUpKey = e.key === "ArrowUp" || (e.key === " " && e.shiftKey) || e.key === "PageUp";

      if (isDownKey || isUpKey) {
        // Collect all logical snaps across the entire page layout
        const snaps = [
          0,                                                    // Hero
          f145, f146, f149, f147, f151, f152, f160, f161, f162, // Who I Am
          expStart, f164, f165, f166, f171, f172, f174, f175,   // Expertise
          wTitle, wCard1, wCard2, wCard3, wCard4, wExit,        // Work
          c209, c200, c202, c203                                // Contact
        ];

        // Sort and filter out duplicate or extremely close snap points (within 50px)
        const sortedSnaps = [...snaps].sort((a, b) => a - b);
        const uniqueSnaps = sortedSnaps.reduce((acc: number[], val) => {
          if (acc.length === 0 || val - acc[acc.length - 1] > 50) {
            acc.push(val);
          }
          return acc;
        }, []);

        const getCustomDuration = (to: number) => {
          if (Math.abs(to - c209) < 10) return 1500;
          if (Math.abs(to - c200) < 10) return 1000;
          if (Math.abs(to - c202) < 10) return 1500;
          if (Math.abs(to - c203) < 10) return 1500;
          if (Math.abs(to - f146) < 10) return 1500;
          return 1200;
        };

        if (isDownKey) {
          // Find the next snap point strictly ahead of our current scroll position
          const nextSnap = uniqueSnaps.find(s => s > scrollY + 20);
          if (nextSnap !== undefined) {
            e.preventDefault();
            const duration = getCustomDuration(nextSnap);
            (window as any).__scrollToSection(nextSnap, duration, figmaEase);
          }
        } else {
          // Find the previous snap point strictly behind our current scroll position
          const prevSnap = [...uniqueSnaps].reverse().find(s => s < scrollY - 20);
          if (prevSnap !== undefined) {
            e.preventDefault();
            const duration = getCustomDuration(prevSnap);
            (window as any).__scrollToSection(prevSnap, duration, figmaEase);
            // If we are returning to Hero, call the return-to-hero callback
            if (prevSnap === 0 && typeof (window as any).__onReturnToHero === "function") {
              (window as any).__onReturnToHero();
            }
          }
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
        <ReactLenis root>
          <main className="relative min-h-screen bg-[#030301] selection:bg-white selection:text-black">
            <NavBar />
            <HeroSequence />
            <WhoSequence />
            <ExpertiseSequence />
            <WorkSequence />
            <ContactSequence />
          </main>
        </ReactLenis>
      )}
    </>
  );
}
