import { motion } from "motion/react";
import { Infinity } from "lucide-react";
import { cn, figmaEase } from "../../lib/utils";
import { useState, useEffect } from "react";

export function NavBar() {
  const [activeSection, setActiveSection] = useState<"index" | "about" | "work" | "contact">("index");

  useEffect(() => {
    const handleScroll = () => {
      if (!(window as any).__getSectionOffsets) return;
      const offsets = (window as any).__getSectionOffsets();
      const scrollY = window.scrollY;
      const threshold = 100; // offset tolerance

      if (scrollY < offsets.about - threshold) {
        setActiveSection("index");
      } else if (scrollY >= offsets.about - threshold && scrollY < offsets.work - threshold) {
        setActiveSection("about");
      } else if (scrollY >= offsets.work - threshold && scrollY < offsets.contact - threshold) {
        setActiveSection("work");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (target: "index" | "about" | "work" | "contact") => {
    if (!(window as any).__scrollToSection || !(window as any).__getSectionOffsets) return;
    const offsets = (window as any).__getSectionOffsets();

    if (target === "index") {
      (window as any).__scrollToSection(offsets.hero, 1000, figmaEase);
      if (window.scrollY > 100 && typeof (window as any).__onReturnToHero === "function") {
        (window as any).__onReturnToHero();
      }
    } else if (target === "about") {
      const f146 = offsets.about + 1.5 * window.innerHeight;
      const f147 = offsets.about + 2.7 * window.innerHeight;
      (window as any).__scrollToSection(offsets.about, 1500, figmaEase, () => {
        setTimeout(() => {
          (window as any).__scrollToSection(f146, 1500, figmaEase, () => {
            setTimeout(() => {
              (window as any).__scrollToSection(f147, 2000, figmaEase);
            }, 1);
          });
        }, 1);
      });
    } else if (target === "work") {
      (window as any).__scrollToSection(offsets.work); // default Lenis smooth scroll
    } else if (target === "contact") {
      (window as any).__scrollToSection(offsets.contact); // default Lenis smooth scroll
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 3.8 }}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none"
    >
      <div className="flex flex-row items-center justify-between px-[60px] py-[48px] w-full max-w-[1920px] mx-auto">
        <div 
          onClick={() => navigateTo("index")}
          className="shrink-0 pointer-events-auto cursor-pointer flex items-center justify-center w-[88px] h-[45px] text-[#fffff9] hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <Infinity size={48} strokeWidth={1.5} />
        </div>

        <div className="flex font-['Satoshi',sans-serif] font-black gap-[80px] items-center justify-end text-[16px] uppercase tracking-wider text-[#fffff9] pointer-events-auto">
          <p 
            onClick={() => navigateTo("index")}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:opacity-100",
              activeSection === "index" ? "opacity-100 scale-110" : "opacity-60"
            )}
          >
            Index
          </p>
          <p 
            onClick={() => navigateTo("about")}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:opacity-100",
              activeSection === "about" ? "opacity-100 scale-110" : "opacity-60"
            )}
          >
            About
          </p>
          <p 
            onClick={() => navigateTo("work")}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:opacity-100",
              activeSection === "work" ? "opacity-100 scale-110" : "opacity-60"
            )}
          >
            Work
          </p>
          <p 
            onClick={() => navigateTo("contact")}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:opacity-100",
              activeSection === "contact" ? "opacity-100 scale-110" : "opacity-60"
            )}
          >
            Contact
          </p>
        </div>
      </div>
    </motion.nav>
  );
}
