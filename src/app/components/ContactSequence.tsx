import { motion, useTransform, useMotionValue, useSpring, cubicBezier } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef, useState, useEffect } from "react";
import imgDesigner from "../../assets/767f8eb5ad21dcd3059a1544a2e4ba740673cd7b.png";

export function ContactSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / 1920;
      const heightScale = window.innerHeight / 1080;
      setScale(Math.max(widthScale, heightScale));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const rawProgress = useMotionValue(0);

  useLenis(({ scroll }) => {
    const el = containerRef.current;
    if (!el) return;
    const containerTop = el.offsetTop;
    const scrollRange = el.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, (scroll - containerTop) / scrollRange));
    rawProgress.set(p);
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 45, // Majestic, controlled speed
    damping: 25,   // Luxurious catch-up, zero bounce
    restDelta: 0.0001
  });

  const FE = cubicBezier(0.65, 0.03, 0.33, 0.97); // Figma ease

  // 1. Image fade in (Frame 209) - starts fully visible at 0 to prevent a dead black screen when sliding up
  const imageOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 1], { ease: FE });

  // 2. Image shrink / scale from full-screen (1938x1082) to centered box (494x561) over Frame 202
  const imageW = useTransform(scrollYProgress, [0.25, 0.55], [1938, 494], { ease: FE });
  const imageH = useTransform(scrollYProgress, [0.25, 0.55], [1082, 561], { ease: FE });
  const imageLeft = useTransform(scrollYProgress, [0.25, 0.55], [-9, 713], { ease: FE });
  const imageTop = useTransform(scrollYProgress, [0.25, 0.55], [-1, 259.5], { ease: FE });

  // 3. Intro text "your go to designer" (Frame 200)
  const introTextOpacity = useTransform(scrollYProgress, [0.02, 0.25, 0.40], [0, 1, 0], { ease: FE });

  // 4. Background color shift from dark to white (Frame 202)
  const bgColor = useTransform(scrollYProgress, [0.25, 0.55], ["#0c0c0c", "#ffffff"], { ease: FE });

  // 5. Final footer content (Frame 203)
  const finalContentOpacity = useTransform(scrollYProgress, [0.55, 0.88], [0, 1], { ease: FE });
  const finalContentY = useTransform(scrollYProgress, [0.55, 0.88], [40, 0], { ease: FE });

  return (
    <motion.div ref={containerRef} className="relative h-[400vh]" style={{ backgroundColor: bgColor }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Pixel-perfect scaled 1920×1080 Figma canvas */}
        <motion.div
          className="relative w-[1920px] h-[1080px] shrink-0 select-none overflow-hidden"
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: "center center",
            backgroundColor: bgColor 
          }}
        >
          {/* ── DESIGNER IMAGE ── */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              width: imageW,
              height: imageH,
              left: imageLeft,
              top: imageTop,
              opacity: imageOpacity
            }}
          >
            <img
              src={imgDesigner}
              alt="Designer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle overlay to enhance text readability when full screen, fading to 0 as image shrinks */}
            <motion.div
              className="absolute inset-0 bg-black"
              style={{ opacity: useTransform(scrollYProgress, [0.45, 0.60], [0.15, 0], { ease: FE }) }}
            />
          </motion.div>

          {/* ── INTRO TEXT (Frame 200) ── */}
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-[96px] pointer-events-none z-10"
            style={{ opacity: introTextOpacity }}
          >
            {/* Left side text */}
            <div
              style={{
                flex: "1 0 0",
                color: "#D6D6D3",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "118.172px",
                fontStyle: "normal",
                fontWeight: 900,
                lineHeight: "110%",
                letterSpacing: "-2.363px",
                textTransform: "capitalize"
              }}
            >
              your go to
            </div>
            {/* Right side text */}
            <div
              style={{
                flex: "1 0 0",
                color: "#D6D6D3",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "118.172px",
                fontStyle: "normal",
                fontWeight: 900,
                lineHeight: "110%",
                letterSpacing: "-2.363px",
                textTransform: "capitalize",
                textAlign: "right"
              }}
            >
              designer
            </div>
          </motion.div>

          {/* ── FINAL CONTENT & FOOTER (Frame 203) ── */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none"
            style={{ opacity: finalContentOpacity, y: finalContentY }}
          >
            {/* Symmetrical Left Side Block: Let's Do Work Together */}
            <div 
              className="absolute pointer-events-auto"
              style={{
                left: "330px",
                top: "420px",
                width: "351px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start"
              }}
            >
              <div 
                className="font-['Satoshi',sans-serif] font-black text-[80px] leading-[84%] tracking-[-1.6px] mb-[40px] capitalize"
              >
                <div style={{ color: "#8B8B8B" }}>Lets</div>
                <div style={{ color: "#8B8B8B" }}>Do Work</div>
                <div style={{ color: "#2C2C2C" }}>Together.</div>
              </div>
              
              <button
                style={{
                  display: "flex",
                  width: "351px",
                  padding: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#2C2C2C",
                  color: "#FCFCFC",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                start a conversation
              </button>
            </div>

            {/* Symmetrical Right Side Block: Socials */}
            <div 
              className="absolute pointer-events-auto"
              style={{
                left: "1239px",
                top: "460px",
                width: "351px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start"
              }}
            >
              <div
                style={{
                  color: "#939393",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  letterSpacing: "-0.461px",
                  textTransform: "capitalize",
                  marginBottom: "24px"
                }}
              >
                socials
              </div>
              
              <div style={{ display: "flex", flexDirection: "row", gap: "17.57px" }}>
                {["Ig", "In", "Be"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      color: "#2C2C2C",
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: "92.144px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "92.144px",
                      letterSpacing: "-4.607px",
                      textDecoration: "none",
                      display: "block"
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Footer Area */}
            <div className="absolute bottom-0 left-0 w-full pb-[40px] px-[96px] flex justify-between items-center pointer-events-auto">
              <div className="font-['Satoshi',sans-serif] font-medium text-[20px] text-[#2c2c2c]">
                © 2026 AWESOMAA1. Design that moves brands forward.
              </div>
              
              <div className="flex gap-[80px] font-['Satoshi',sans-serif] font-medium text-[20px]">
                <a href="#" className="text-[#2c2c2c] hover:opacity-60 transition-opacity">Index</a>
                <a href="#" className="text-[#2c2c2c] hover:opacity-60 transition-opacity">About</a>
                <a href="#" className="text-[#2c2c2c] hover:opacity-60 transition-opacity">Work</a>
                <a href="#" className="text-[#2c2c2c] hover:opacity-60 transition-opacity">Contact</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
