import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect } from "react";
import imgPortrait from "/frame76.webp";

function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function handleResize() {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return scale;
}

/** Linearly interpolate a value through keyframe pairs */
function interpolate(
  input: number,
  inputRange: number[],
  outputRange: number[]
): number {
  const len = inputRange.length;
  if (input <= inputRange[0]) return outputRange[0];
  if (input >= inputRange[len - 1]) return outputRange[len - 1];
  for (let i = 0; i < len - 1; i++) {
    if (input >= inputRange[i] && input <= inputRange[i + 1]) {
      const t = (input - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      return outputRange[i] + t * (outputRange[i + 1] - outputRange[i]);
    }
  }
  return outputRange[len - 1];
}

export function WhoSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useScale();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Sticky Background color transition from White to Black and back to White
  const bg = useTransform(scrollYProgress, [0.38, 0.48, 0.94, 1.0], ["#f9f9f9", "#030301", "#030301", "#f9f9f9"]);

  // --- Title Text Coordinates ("Who I AM?") ---
  const whoLeft = useTransform(scrollYProgress, [0.0, 0.24, 0.34], [611.98, 611.98, -528]);
  const whoTop = useTransform(scrollYProgress, [0.08, 0.18], [462, 262]);
  
  const iamLeft = useTransform(scrollYProgress, [0.0, 0.24, 0.34], [940.12, 940.12, 2080]);
  const iamTop = useTransform(scrollYProgress, [0.08, 0.18], [462, 262]);

  // --- Portrait Image Dimensions & Coordinates ---
  // Frame 162: massive (2158x2639) around 0.88 to 0.94
  // Frame 163: shrinks down to 576x709 at 1.0
  const portraitWidth = useTransform(scrollYProgress, [0.0, 0.24, 0.34, 0.38, 0.48, 0.94, 1.0], [342, 342, 508, 508, 2158, 2158, 576]);
  const portraitHeight = useTransform(scrollYProgress, [0.0, 0.24, 0.34, 0.38, 0.48, 0.94, 1.0], [421, 421, 626, 626, 2639, 2639, 709]);
  
  // --- Final Text Elements Opacity (Frame 163) ---
  const finalTextOpacity = useTransform(scrollYProgress, [0.88, 1.0], [0, 1]);
  
  const portraitTop = useTransform(
    scrollYProgress, 
    [0.0, 0.08, 0.18, 0.24, 0.34, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 0.94, 1.0], 
    [1080, 1080, 528, 528, 185, 185, -233, -233, -721, -1126, -1541, -1541, 186]
  );
  const portraitLeft = useTransform(scrollYProgress, [0.0, 0.24, 0.34, 0.38, 0.48, 0.94, 1.0], [789, 789, 706, 706, -118, -118, 792]);

  // --- Paragraph Positions (Parallax offsets mapped to scrollYProgress) ---
  const p1Top = useTransform(scrollYProgress, [0.48, 0.58, 0.68, 0.78], [327, 207, -563, -563]);
  const p2Top = useTransform(scrollYProgress, [0.48, 0.58, 0.68, 0.78, 0.88], [736, 676, -344, -444, -444]);
  const p3Top = useTransform(scrollYProgress, [0.48, 0.58, 0.68, 0.78, 0.88], [1067, 1067, 297, 197, 197]);
  const p4Top = useTransform(scrollYProgress, [0.48, 0.58, 0.68, 0.78, 0.88], [1476, 1476, 706, 606, 606]);

  // --- Paragraph Colors ---
  const p1Color = useTransform(scrollYProgress, [0.38, 0.48, 0.58, 0.62, 0.66], ["rgba(255,255,249,0)", "#fffff9", "#fffff9", "#808080", "rgba(255,255,249,0)"]);
  const p2Color = useTransform(scrollYProgress, [0.48, 0.54, 0.58, 0.68, 0.72, 0.76], ["rgba(255,255,249,0)", "#808080", "#fffff9", "#fffff9", "#808080", "rgba(255,255,249,0)"]);
  const p3Color = useTransform(scrollYProgress, [0.58, 0.64, 0.68, 0.78, 0.82, 0.86], ["rgba(255,255,249,0)", "#808080", "#fffff9", "#fffff9", "#808080", "rgba(255,255,249,0)"]);
  const p4Color = useTransform(scrollYProgress, [0.68, 0.74, 0.78, 0.88, 0.92, 0.96], ["rgba(255,255,249,0)", "#808080", "#fffff9", "#fffff9", "#808080", "rgba(255,255,249,0)"]);

  // --- Opacity values (manual via useMotionValue to bypass Framer v12 opacity bug) ---
  const titleOpacity = useMotionValue(1);
  const portraitOpacity = useMotionValue(0);
  const detailsOpacity = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    titleOpacity.set(interpolate(latest, [0.34, 0.38], [1, 0]));
    portraitOpacity.set(interpolate(latest, [0.08, 0.14, 1.0], [0, 1, 1]));
    detailsOpacity.set(interpolate(latest, [0.0, 0.38, 0.48, 0.82, 0.88], [0, 0, 1, 1, 0]));
  });

  return (
    <div ref={containerRef} className="relative h-[800vh]">
      {/* Sticky Frame viewport container */}
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        
        {/* Pixel-perfect scaled Figma canvas */}
        <div 
          className="relative w-[1920px] h-[1080px] shrink-0 select-none"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          {/* Centered / Sliding Title Text Layer */}
          <motion.div 
            className="absolute z-20 w-[1920px] h-[1080px] pointer-events-none"
            style={{ 
              opacity: titleOpacity
            }}
          >
            <motion.div 
              className="absolute text-[#2c2c2c] font-['Satoshi',sans-serif] font-black text-[142.01px] leading-[1.1] tracking-[-0.02em] capitalize whitespace-nowrap"
              style={{
                width: "320px",
                height: "156px",
                left: whoLeft,
                top: whoTop
              }}
            >
              Who
            </motion.div>
            <motion.div 
              className="absolute text-[#aeaeae] font-['Satoshi',sans-serif] font-black text-[142.01px] leading-[1.1] tracking-[-0.02em] capitalize whitespace-nowrap"
              style={{
                width: "383px",
                height: "156px",
                left: iamLeft,
                top: iamTop
              }}
            >
              I AM?
            </motion.div>
          </motion.div>

          {/* Portrait Image Layer (GPU-accelerated and crisp-rendered) */}
          <motion.div 
            className="absolute z-10 flex items-center justify-center overflow-hidden"
            style={{ 
              width: portraitWidth,
              height: portraitHeight,
              top: portraitTop,
              left: portraitLeft,
              opacity: portraitOpacity,
              willChange: "transform",
              transformStyle: "preserve-3d"
            }}
          >
            <img 
              src={imgPortrait} 
              alt="Portrait" 
              className="w-full h-full object-cover"
              style={{
                imageRendering: "auto",
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
            />
          </motion.div>

          {/* Final Details & Layout Layer — paragraphs for frames 161-163 */}
          <motion.div 
            className="absolute inset-0 z-30 pointer-events-none w-[1920px] h-[1080px]"
            style={{ 
              opacity: detailsOpacity
            }}
          >

            {/* Paragraph sets absolute positioned and parallax offset driven */}
            <div className="relative w-full h-[1080px]">
              
              {/* Paragraph 1: Top-Right (Active set 1) */}
              <motion.div 
                className="absolute" 
                style={{ 
                  color: p1Color,
                  left: "1159px",
                  top: p1Top,
                  width: "691px"
                }}
              >
                <p className="font-['Satoshi',sans-serif] text-[40px] leading-[56px] tracking-tight whitespace-pre-wrap">
                  I'm Muhammad Usama a Google-Certified UX Designer with 4+ years of experience designing products, brands, and digital experiences that feel clear, useful, and actually human.
                </p>
              </motion.div>

              {/* Paragraph 2: Middle-Left (Active set 2) */}
              <motion.div 
                className="absolute"
                style={{
                  color: p2Color,
                  left: "114px",
                  top: p2Top,
                  width: "813.05px"
                }}
              >
                <p className="font-['Satoshi',sans-serif] text-[40px] leading-[56px] tracking-tight">
                  Making complicated things feel ridiculously simple through thoughtful UX, product strategy, and visual systems built to reduce friction and create real impact.
                </p>
              </motion.div>

              {/* Paragraph 3: Bottom-Right (Active set 3) */}
              <motion.div 
                className="absolute" 
                style={{ 
                  color: p3Color,
                  left: "1159px",
                  top: p3Top,
                  width: "597px"
                }}
              >
                <p className="font-['Satoshi',sans-serif] text-[40px] leading-[56px] tracking-tight whitespace-pre-wrap">
                  Blending UX, product thinking, visual identity, and growth-focused design into experiences people instantly understand and actually remember.
                </p>
              </motion.div>

              {/* Paragraph 4: Bottom-Left (Active set 4) */}
              <motion.div 
                className="absolute" 
                style={{ 
                  color: p4Color,
                  left: "114px",
                  top: p4Top,
                  width: "813.05px"
                }}
              >
                <p className="font-['Satoshi',sans-serif] text-[40px] leading-[56px] tracking-tight">
                  Good design isn't decoration — it's direction, shaping how people feel, interact, trust, and connect with a product from the very first click.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Final Text Elements (Frame 163) */}
          <motion.div 
            className="absolute inset-0 z-40 pointer-events-none"
            style={{ opacity: finalTextOpacity }}
          >
            {/* "Less noise. More impact." */}
            <div className="absolute z-20 left-[60px] top-[368px] w-[628px] h-[154px]">
              <div className="absolute capitalize font-['Satoshi',sans-serif] font-black text-[104px] leading-[0] left-0 top-0 tracking-[-2.08px] whitespace-nowrap">
                <p className="mb-0">
                  <span className="leading-[1.1] text-[#fffff9]">{"Less "}</span>
                  <span className="leading-[1.1] text-[#2c2c2c]">noise.</span>
                </p>
                <p>
                  <span className="leading-[1.1] text-[#fffff9]">{"More "}</span>
                  <span className="leading-[1.1] text-[#2c2c2c]">impact.</span>
                </p>
              </div>
            </div>

            {/* "I Design products and brands..." */}
            <div className="absolute z-20 left-[1353px] top-[218px] w-[505px] h-[120px]">
              <div className="absolute font-['Satoshi',sans-serif] h-[127px] leading-[0] left-0 top-0 w-[569px] whitespace-pre-wrap">
                <p className="leading-[44px] mb-0 text-[44px] text-[#fffff9]">
                  {"I Design products and brands that feel clear, human, and "}
                </p>
                <p className="font-bold leading-[44px] text-[44px] text-[#fffff9]">
                  hard to forget.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
