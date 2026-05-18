import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import imgPortrait from "figma:asset/9270ea80d2a1f498092763a3047549844326b091.png";

export function WhoSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Text Split
  const whoX = useTransform(scrollYProgress, [0.05, 0.2], ["0%", "-50vw"]);
  const iAmX = useTransform(scrollYProgress, [0.05, 0.2], ["0%", "50vw"]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);

  // Portrait Reveal and Scale
  const portraitY = useTransform(scrollYProgress, [0.1, 0.25], ["100vh", "0vh"]);
  const portraitScale = useTransform(scrollYProgress, [0.3, 0.45], [1, 15]);
  
  // Entire Text Scroll Container
  const detailsOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  // As the user scrolls from 0.45 to 0.95, the text container scrolls up
  const detailsY = useTransform(scrollYProgress, [0.45, 1], ["20vh", "-100vh"]);

  // Color highlights for the text blocks based on scroll progress
  const set1RightColor = useTransform(scrollYProgress, [0.55, 0.65], ["#fffff9", "#808080"]);
  const set2RightColor = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], ["#808080", "#fffff9", "#fffff9", "#808080"]);
  const set2LeftColor = useTransform(scrollYProgress, [0.75, 0.8], ["#808080", "#fffff9"]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#f9f9f9]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Splitting Text Layer */}
        <motion.div 
          className="absolute z-0 w-full flex justify-center items-center gap-[40px] pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <motion.div style={{ x: whoX }} className="text-[#2c2c2c] font-['Satoshi',sans-serif] font-black text-[14vw] leading-[1] tracking-tighter">
            Who
          </motion.div>
          <motion.div style={{ x: iAmX }} className="text-[#aeaeae] font-['Satoshi',sans-serif] font-black text-[14vw] leading-[1] tracking-tighter">
            I AM?
          </motion.div>
        </motion.div>

        {/* Portrait Image Layer */}
        <motion.div 
          className="relative z-10 w-full max-w-[342px] aspect-[342/480] flex items-center justify-center"
          style={{ y: portraitY, scale: portraitScale }}
        >
          <div className="w-full h-full relative overflow-hidden bg-black">
            <img 
              src={imgPortrait} 
              alt="Portrait" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
          </div>
        </motion.div>

        {/* Final Detail Text Layer (Over dark scaled image) */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none w-full max-w-[1920px] mx-auto px-[60px] flex flex-col justify-start"
          style={{ opacity: detailsOpacity, y: detailsY }}
        >
          {/* Scrollable track for text sets */}
          <div className="relative w-full h-[150vh]">
            
            {/* Set 1: Right (Top) */}
            <motion.div className="w-[90%] lg:w-[691px] absolute right-[5%] lg:right-[114px] top-[15vh]" style={{ color: set1RightColor }}>
              <p className="font-['Satoshi',sans-serif] text-[20px] md:text-[32px] lg:text-[40px] leading-snug lg:leading-[56px] tracking-tight whitespace-pre-wrap">
                I'm Muhammad Usama a Google-Certified UX Designer with 4+ years of experience designing products, brands, and digital experiences that feel clear, useful, and actually human.
              </p>
            </motion.div>

            {/* Set 1: Left (Bottom) */}
            <motion.div className="w-[90%] lg:w-[813px] absolute left-[5%] lg:left-[114px] top-[50vh] text-[#808080]">
              <p className="font-['Satoshi',sans-serif] text-[20px] md:text-[32px] lg:text-[40px] leading-snug lg:leading-[56px] tracking-tight">
                Making complicated things feel ridiculously simple through thoughtful UX, product strategy, and visual systems built to reduce friction and create real impact.
              </p>
            </motion.div>

            {/* Set 2: Right (Further down) */}
            <motion.div className="w-[90%] lg:w-[597px] absolute right-[5%] lg:right-[114px] top-[85vh]" style={{ color: set2RightColor }}>
              <p className="font-['Satoshi',sans-serif] text-[20px] md:text-[32px] lg:text-[40px] leading-snug lg:leading-[56px] tracking-tight whitespace-pre-wrap">
                Blending UX, product thinking, visual identity, and growth-focused design into experiences people instantly understand and actually remember.
              </p>
            </motion.div>

            {/* Set 2: Left (Even further down) */}
            <motion.div className="w-[90%] lg:w-[813px] absolute left-[5%] lg:left-[114px] top-[120vh]" style={{ color: set2LeftColor }}>
              <p className="font-['Satoshi',sans-serif] text-[20px] md:text-[32px] lg:text-[40px] leading-snug lg:leading-[56px] tracking-tight">
                Good design isn’t decoration — it’s direction, shaping how people feel, interact, trust, and connect with a product from the very first click.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
