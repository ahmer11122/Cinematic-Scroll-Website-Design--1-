import { motion } from "motion/react";
import { cn, figmaEase } from "../../lib/utils";
import { useState, useEffect } from "react";

export function NavBar() {
  const [activeSection, setActiveSection] = useState<"index" | "about" | "work" | "contact">("index");
  const [shouldHide, setShouldHide] = useState(false);

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

      // Hide in Frame 202 and 203 (past 50% of contact section range)
      const vh = window.innerHeight;
      const contactHideThreshold = offsets.contact + 0.50 * 3 * vh;
      if (scrollY >= contactHideThreshold) {
        setShouldHide(true);
      } else {
        setShouldHide(false);
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
      animate={{ 
        opacity: shouldHide ? 0 : 1, 
        y: shouldHide ? -50 : 0,
        pointerEvents: shouldHide ? "none" as any : "auto" as any
      }}
      transition={shouldHide ? { duration: 0.8, ease: figmaEase } : { duration: 1, ease: [0.16, 1, 0.3, 1], delay: window.scrollY > 100 ? 0 : 3.8 }}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none"
    >
      <div className="flex flex-row items-center justify-between px-[60px] py-[48px] w-full max-w-[1920px] mx-auto">
        <div 
          onClick={() => navigateTo("index")}
          className="shrink-0 pointer-events-auto cursor-pointer flex items-center justify-center w-[88px] h-[45px] text-[#fffff9] hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <svg width="89" height="45" viewBox="0 0 89 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g clipPath="url(#clip0_1_20)">
              <path d="M88.5325 21.2003C88.65 32.9876 79.0757 42.7432 67.2884 42.8372C58.0634 42.9111 50.175 37.1517 47.0888 29.0282L55.6287 20.3641C55.6086 20.6462 55.5952 20.9383 55.5952 21.2271C55.5952 27.7689 61.0489 33.0379 67.6578 32.7323C73.5582 32.4603 78.347 27.6715 78.619 21.7712C78.9246 15.1622 73.6556 9.70846 67.1138 9.70846C65.4448 9.70846 63.8597 10.0611 62.4258 10.7025C60.2429 11.6764 58.8828 13.473 57.4019 15.3267C56.6396 16.2771 56.4515 16.66 55.1922 17.9864L46.3869 26.8521L42.3772 30.8887L37.8168 35.4794H37.8134C36.4299 37.1517 34.7944 38.6059 32.9642 39.7913C29.616 41.9573 25.6164 43.2167 21.3213 43.2167C9.54739 43.22 0 33.7566 0 22.0868C0 10.417 9.54739 0.950254 21.3246 0.950254C30.459 0.950254 38.25 6.64242 41.2858 14.6383L32.7493 23.5544L32.7325 22.4831V22.473C32.7425 22.2816 32.7493 22.0868 32.7493 21.892C32.7493 21.5932 32.7392 21.2976 32.7157 21.0055C32.2522 14.917 27.0571 10.1551 20.8041 10.3801C14.5511 10.6051 10.0007 15.4006 9.72537 21.3447C9.41978 27.9536 14.6888 33.4107 21.2306 33.4107C24.1556 33.4107 26.8287 32.3193 28.8605 30.5226C29.334 30.1029 29.7739 29.6461 30.1735 29.1525L32.7862 26.429L41.9843 16.8413C42.0649 17.1503 42.1388 17.4592 42.2026 17.7715L41.981 16.8447L50.1549 8.32824H50.1582L53.3351 5.01705L53.3418 5.01033C57.066 1.87712 61.8716 -0.00683594 67.1138 -0.00683594C78.8709 -0.00683594 88.4149 9.46667 88.5325 21.1935V21.2003Z" fill="currentColor"/>
              <path d="M43.0081 45H33.4741L33.4473 43.2638L42.8536 34.1462L43.0081 45Z" fill="currentColor"/>
              <path d="M44.7148 45H54.2522L54.2757 43.2638L44.8693 34.1462L44.7148 45Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_1_20">
                <rect width="88.5325" height="45" fill="white"/>
              </clipPath>
            </defs>
          </svg>
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
