import { motion, useScroll, useTransform, useAnimation } from "motion/react";
import { useRef, useEffect } from "react";
import imgHero from "figma:asset/f86da7fd626a01ceb96b847d0ceddf1eb065f3fd.png";

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations (kick in after load)
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scrollOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const textScrollOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const textScrollY = useTransform(scrollYProgress, [0.4, 0.7], [0, -50]);

  useEffect(() => {
    const runSequence = async () => {
      // Frame 0: w: 529px, h: 274px (Initial state loaded automatically on mount)
      
      // Navigate to: "Frame 1"
      // Smart animate, cubic-bezier(0.65, 0.03, 0.33, 0.97), duration: 1000ms, delay: 1ms
      await controls.start({
        width: "762px",
        height: "1080px",
        transition: {
          duration: 1.0,
          ease: [0.65, 0.03, 0.33, 0.97],
          delay: 0.001,
        }
      });

      // Navigate to: "Frame 2"
      // Smart animate, cubic-bezier(0.65, 0.03, 0.33, 0.97), duration: 1000ms, delay: 1ms
      await controls.start({
        width: "1920px",
        height: "1080px",
        transition: {
          duration: 1.0,
          ease: [0.65, 0.03, 0.33, 0.97],
          delay: 0.001,
        }
      });

      // Navigate to: "Frame 3"
      // Smart animate, cubic-bezier(0.65, 0.03, 0.33, 0.97), duration: 1500ms, delay: 1ms
      await controls.start({
        width: "100vw",
        height: "100vh",
        transition: {
          duration: 1.5,
          ease: [0.65, 0.03, 0.33, 0.97],
          delay: 0.001,
        }
      });
    };

    runSequence();
  }, [controls]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#030301]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background Image Container */}
        <motion.div 
          className="absolute z-20 flex items-center justify-center overflow-hidden w-full h-full"
          style={{ scale: scrollScale, opacity: scrollOpacity }}
        >
          <motion.div
            initial={{ opacity: 1, width: "529px", height: "274px" }}
            animate={controls}
            className="relative flex items-center justify-center overflow-hidden"
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
              transition={{ delay: 2.2, duration: 1 }}
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
              transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
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
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
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

