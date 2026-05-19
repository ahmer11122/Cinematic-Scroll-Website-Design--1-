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
        contact: 24.5 * vh,
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
      const f172 = expStart + (6 * vh * 1.0);  // Frame 172: All skills revealed

      // Downwards key triggers: ArrowDown, Spacebar (without shift), PageDown
      const isDownKey = e.key === "ArrowDown" || (e.key === " " && !e.shiftKey) || e.key === "PageDown";
      // Upwards key triggers: ArrowUp, Spacebar (with shift), PageUp
      const isUpKey = e.key === "ArrowUp" || (e.key === " " && e.shiftKey) || e.key === "PageUp";

      const threshold = 100; // Tolerance threshold to detect snap positions

      if (isDownKey) {
        if (scrollY < f145 - threshold) {
          // 1. From Hero, scroll to f145 -> f146 automatically (smart animate 1000ms / 1500ms)
          e.preventDefault();
          (window as any).__scrollToSection(f145, 1000, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(f146, 1000, figmaEase);
            }, 1);
          });
        } else if (scrollY >= f145 - threshold && scrollY < f146 - threshold) {
          // 2. From f145 snap to f146
          e.preventDefault();
          (window as any).__scrollToSection(f146, 1000, figmaEase);
        } else if (scrollY >= f146 - threshold && scrollY < f149 - threshold) {
          // 3. From f146 snap to f149 -> f147 (smart animate with 2000ms delay curve)
          e.preventDefault();
          (window as any).__scrollToSection(f149, 1000, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(f147, 2000, figmaEase);
            }, 1);
          });
        } else if (scrollY >= f149 - threshold && scrollY < f147 - threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f147, 2000, figmaEase);
        } else if (scrollY >= f147 - threshold && scrollY < f151 - threshold) {
          // 4. From f147 snap to f151
          e.preventDefault();
          (window as any).__scrollToSection(f151, 1000, figmaEase);
        } else if (scrollY >= f151 - threshold && scrollY < f152 - threshold) {
          // 5. From f151 snap to f152
          e.preventDefault();
          (window as any).__scrollToSection(f152, 1000, figmaEase);
        } else if (scrollY >= f152 - threshold && scrollY < f160 - threshold) {
          // 6. From f152 snap to f160
          e.preventDefault();
          (window as any).__scrollToSection(f160, 1000, figmaEase);
        } else if (scrollY >= f160 - threshold && scrollY < f161 - threshold) {
          // 7. From f160 snap to f161
          e.preventDefault();
          (window as any).__scrollToSection(f161, 1000, figmaEase);
        } else if (scrollY >= f161 - threshold && scrollY < f162 - threshold) {
          // 8. From f161 snap to f162, then chain f163 -> f164 -> f165 -> f166
          e.preventDefault();
          (window as any).__scrollToSection(f162, 1000, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(endWho, 1000, figmaEase, () => {
                setTimeout(() => {
                  (window as any).__scrollToSection(f164, 1000, figmaEase, () => {
                    setTimeout(() => {
                      (window as any).__scrollToSection(f165, 1000, figmaEase, () => {
                        setTimeout(() => {
                          (window as any).__scrollToSection(f166, 1000, figmaEase);
                        }, 200);
                      });
                    }, 1);
                  });
                }, 1);
              });
            }, 1);
          });
        } else if (scrollY >= f162 - threshold && scrollY < endWho - threshold) {
          // 9. If paused at f162, chain down
          e.preventDefault();
          (window as any).__scrollToSection(endWho, 1000, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(f164, 1000, figmaEase, () => {
                setTimeout(() => {
                  (window as any).__scrollToSection(f165, 1000, figmaEase, () => {
                    setTimeout(() => {
                      (window as any).__scrollToSection(f166, 1000, figmaEase);
                    }, 200);
                  });
                }, 1);
              });
            }, 1);
          });
        } else if (scrollY >= endWho - threshold && scrollY < f164 - threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f164, 1000, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(f165, 1000, figmaEase, () => {
                setTimeout(() => {
                  (window as any).__scrollToSection(f166, 1000, figmaEase);
                }, 200);
              });
            }, 1);
          });
        } else if (scrollY >= f164 - threshold && scrollY < f165 - threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f165, 1000, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(f166, 1000, figmaEase);
            }, 200);
          });
        } else if (scrollY >= f165 - threshold && scrollY < f166 - threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f166, 1000, figmaEase);
        } else if (scrollY >= f166 - threshold && scrollY < f172 - threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f172, 1000, figmaEase);
        }
      } else if (isUpKey) {
        if (scrollY >= f166 - threshold && scrollY < f166 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f165, 1000, figmaEase);
        } else if (scrollY >= f165 - threshold && scrollY < f165 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f160, 1000, figmaEase);
        } else if (scrollY >= f164 - threshold && scrollY < f164 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f160, 1000, figmaEase);
        } else if (scrollY >= endWho - threshold && scrollY < endWho + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f160, 1000, figmaEase);
        } else if (scrollY >= f162 - threshold && scrollY < f162 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f160, 1000, figmaEase);
        } else if (scrollY >= f161 - threshold && scrollY < f161 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f160, 1000, figmaEase);
        } else if (scrollY >= f160 - threshold && scrollY < f160 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f152, 1000, figmaEase);
        } else if (scrollY >= f152 - threshold && scrollY < f152 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f151, 1000, figmaEase);
        } else if (scrollY >= f151 - threshold && scrollY < f151 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f146, 1000, figmaEase);
        } else if (scrollY >= f147 - threshold && scrollY < f147 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f146, 2000, figmaEase);
        } else if (scrollY >= f146 - threshold && scrollY < f146 + threshold) {
          e.preventDefault();
          (window as any).__scrollToSection(f145, 1000, figmaEase);
        } else if (scrollY >= f145 - threshold && scrollY <= f145 + 150) {
          // snap back to Hero
          e.preventDefault();
          (window as any).__scrollToSection(0, 1000, figmaEase);
          if (typeof (window as any).__onReturnToHero === "function") {
            (window as any).__onReturnToHero();
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
