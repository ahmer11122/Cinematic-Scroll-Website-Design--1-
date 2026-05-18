import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import imgHero from "figma:asset/f86da7fd626a01ceb96b847d0ceddf1eb065f3fd.png";

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations (kick in after load)
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scrollOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const textScrollOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const textScrollY = useTransform(scrollYProgress, [0.4, 0.7], [0, -50]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#030301]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Intro Blueprint Logo Animation */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        >
          <svg width="389" height="201" viewBox="0 0 24 24" fill="none">
            {/* Construction Lines (Dashed) */}
            <motion.g 
              stroke="rgba(255, 255, 249, 0.15)" 
              strokeWidth="0.1" 
              strokeDasharray="0.5 0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Circle */}
              <circle cx="7" cy="12" r="5" />
              {/* Right Circle */}
              <circle cx="17" cy="12" r="5" />
              {/* Horizontal Line */}
              <line x1="0" y1="12" x2="24" y2="12" />
              {/* Vertical Line */}
              <line x1="12" y1="2" x2="12" y2="22" />
              {/* Diagonals */}
              <line x1="2" y1="2" x2="22" y2="22" />
              <line x1="2" y1="22" x2="22" y2="2" />
              {/* Bounding Box inner vertical lines */}
              <line x1="7" y1="7" x2="7" y2="17" />
              <line x1="17" y1="7" x2="17" y2="17" />
            </motion.g>

            {/* Solid Infinity Path Animation */}
            <motion.path 
              d="M18 12c0 2-2 4-4 4s-4-2-4-4-2-4-4-4-4 2-4 4 2 4 4 4c2 0 4-2 4-4s2-4 4-4 4 2 4 4z"
              stroke="#fffff9"
              strokeWidth="0.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* Background Image Container */}
        <motion.div 
          className="absolute z-20 flex items-center justify-center overflow-hidden w-full h-full"
          style={{ scale: scrollScale, opacity: scrollOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, width: "529px", height: "274px" }}
            animate={{ opacity: 1, width: "100vw", height: "100vh" }}
            transition={{ 
              opacity: { delay: 1.4, duration: 0.5 },
              width: { delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              height: { delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            }}
            className="relative flex items-center justify-center"
          >
            <img 
              src={imgHero} 
              alt="Hero Portrait" 
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Subtle overlay to ensure text readability */}
            <motion.div 
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Text Layer */}
        <div className="relative z-30 w-full max-w-[1920px] h-full mx-auto px-[60px] pointer-events-none">
          
          {/* Text 1 Container for Scroll transform */}
          <motion.div 
            className="absolute top-[30%] lg:top-[calc(50%+32px)] left-[30px] lg:left-[60px] -translate-y-1/2 w-[90%] lg:w-[645px]"
            style={{ opacity: textScrollOpacity, y: textScrollY }}
          >
            {/* Text 1 Inner for Mount animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
            >
              <div className="capitalize font-['Satoshi',sans-serif] font-black leading-[1.1] text-[#fffff9] text-[64px] md:text-[80px] lg:text-[104px] tracking-tight lg:tracking-[-2.08px] whitespace-nowrap">
                <p className="mb-0">
                  <span className="text-[#fffff9]">Less </span>
                  <span className="text-[#2c2c2c] mix-blend-screen">noise.</span>
                </p>
                <p>
                  <span className="text-[#fffff9]">More </span>
                  <span className="text-[#2c2c2c] mix-blend-screen">impact.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text 2 Container for Scroll transform */}
          <motion.div 
            className="absolute top-[60%] lg:top-[calc(50%+32px)] left-[30px] lg:left-[auto] right-[auto] lg:right-[60px] xl:right-[100px] 2xl:right-[150px] -translate-y-1/2 w-[90%] lg:max-w-[569px]"
            style={{ opacity: textScrollOpacity, y: textScrollY }}
          >
            {/* Text 2 Inner for Mount animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.8, ease: "easeOut" }}
            >
              <div className="font-['Satoshi',sans-serif] text-[#fffff9] text-[24px] md:text-[32px] lg:text-[44px] leading-tight lg:leading-[44px] tracking-tight">
                <p className="font-normal inline">I Design products and brands that feel clear, human, and </p>
                <p className="font-bold inline">hard to forget.</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
