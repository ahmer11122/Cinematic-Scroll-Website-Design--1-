import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import imgProduct from "figma:asset/c314dff86913a468ac7cecdb702b315300774c94.png";
import imgUx from "figma:asset/1f3e386a526d23fc84625a112358fd435c6e91b4.png";
import imgBrand from "figma:asset/ebf77fc580b09f4bb0a5b434aea87438d7e208b3.png";
import imgGrow from "figma:asset/08fc2c4c6e1503541f2242105753c9f936ba26d4.png";

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

export function ExpertiseSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useScale();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. Background Black Wipe (0.15 to 0.25)
  const bg = useTransform(scrollYProgress, [0.15, 0.25], ["#f9f9f9", "#0c0c0c"]);

  // 2. Title Text Animation
  // 0.0 -> 0.15: Slide in from offscreen (Frame 164)
  // 0.25 -> 0.35: Shrink to 48px, move to top right (Frame 165 → 166)
  const leftTextLeft = useTransform(
    scrollYProgress, 
    [0.0, 0.15, 0.25, 0.35], 
    ["-153px", "1067px", "1067px", "1278px"]
  );
  const rightTextLeft = useTransform(
    scrollYProgress, 
    [0.0, 0.15, 0.25, 0.35], 
    ["2071px", "1090px", "1090px", "1295px"]
  );
  const leftTextTop = useTransform(
    scrollYProgress, 
    [0.15, 0.25, 0.35], 
    ["462px", "462px", "378px"]
  );
  const rightTextTop = useTransform(
    scrollYProgress, 
    [0.15, 0.25, 0.35], 
    ["467px", "467px", "383px"]
  );
  const titleFontSize = useTransform(
    scrollYProgress, 
    [0.25, 0.35], 
    ["132px", "48px"]
  );
  const titleTracking = useTransform(
    scrollYProgress, 
    [0.25, 0.35], 
    ["-2.64px", "-0.96px"]
  );
  // Title font-weight transition: Black (900) → Bold (700)
  const titleFontWeight = useTransform(
    scrollYProgress,
    [0.25, 0.35],
    ["900", "700"]
  );
  // Color transitions for the title
  const leftTextColor = useTransform(
    scrollYProgress, 
    [0.15, 0.25], 
    ["#2c2c2c", "#aeaeae"]
  );

  // 3. Skills List Slide Up (Frame 165 → 166)
  // Starts offscreen bottom (1191px) and slides to (466px)
  const skillsTop = useTransform(
    scrollYProgress, 
    [0.25, 0.35], 
    ["1191px", "466px"]
  );

  // 4. Skill Text Color Highlights — active skill turns white
  const skill1Color = useTransform(
    scrollYProgress, 
    [0.35, 0.4, 0.45, 0.5], 
    ["#aeaeae", "#ffffff", "#ffffff", "#aeaeae"]
  );
  const skill2Color = useTransform(
    scrollYProgress, 
    [0.45, 0.5, 0.55, 0.6], 
    ["#aeaeae", "#ffffff", "#ffffff", "#aeaeae"]
  );
  const skill3Color = useTransform(
    scrollYProgress, 
    [0.55, 0.6, 0.65, 0.7], 
    ["#aeaeae", "#ffffff", "#ffffff", "#aeaeae"]
  );
  const skill4Color = useTransform(
    scrollYProgress, 
    [0.65, 0.7, 1], 
    ["#aeaeae", "#ffffff", "#ffffff"]
  );

  // 5. Image heights — grow from 1px to 425px when skill activates, STAY at 425px after
  const img1Height = useTransform(
    scrollYProgress,
    [0.35, 0.4, 1.0],
    ["1px", "425px", "425px"]
  );
  const img2Height = useTransform(
    scrollYProgress,
    [0.45, 0.5, 1.0],
    ["1px", "425px", "425px"]
  );
  const img3Height = useTransform(
    scrollYProgress,
    [0.55, 0.6, 1.0],
    ["1px", "425px", "425px"]
  );
  const img4Height = useTransform(
    scrollYProgress,
    [0.65, 0.7, 1.0],
    ["1px", "425px", "425px"]
  );

  // 6. Image opacities — active=1, one step after=0.2, two steps after=0
  const img1Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.45, 0.5, 0.55],
    [0, 1, 1, 0.2, 0]
  );
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.55, 0.6, 0.65],
    [0, 1, 1, 0.2, 0]
  );
  const img3Opacity = useTransform(
    scrollYProgress,
    [0.55, 0.6, 0.65, 0.7, 0.75],
    [0, 1, 1, 0.2, 0]
  );
  const img4Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.7, 1],
    [0, 1, 1]
  );

  // 7. Paragraph carousel Y translation (96px spacing between paragraphs)
  // Starts at 72px (below 70px clip = hidden), slides up as each skill activates
  const paragraphsTop = useTransform(
    scrollYProgress, 
    [0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7], 
    ["72px", "0px", "0px", "-96px", "-96px", "-192px", "-192px", "-288px"]
  );

  // 8. Pics & paragraphs container fade-in (appears when content is revealed)
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#f9f9f9]">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        {/* Pixel-perfect scaled Figma canvas */}
        <div 
          className="relative w-[1920px] h-[1080px] shrink-0 select-none"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >

        {/* Dynamic Title — "The stuff I'm" / "good at." */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <motion.p 
            className="absolute capitalize font-['Satoshi',sans-serif] leading-[1.1] text-right whitespace-nowrap -translate-x-full"
            style={{ 
              left: leftTextLeft, 
              top: leftTextTop, 
              fontSize: titleFontSize, 
              letterSpacing: titleTracking,
              fontWeight: titleFontWeight,
              color: leftTextColor
            }}
          >
            The stuff I'm
          </motion.p>
          <motion.p 
            className="absolute capitalize font-['Satoshi',sans-serif] leading-[1.1] text-[#aeaeae] whitespace-nowrap"
            style={{ 
              left: rightTextLeft, 
              top: rightTextTop, 
              fontSize: titleFontSize, 
              letterSpacing: titleTracking,
              fontWeight: titleFontWeight,
            }}
          >
            good at.
          </motion.p>
        </div>

        {/* Skills List container — slides up from 1191px to 466px */}
        <motion.div 
          className="absolute z-20 left-[1005.98px] pointer-events-auto"
          style={{ top: skillsTop }}
        >
          {/* Gap of ~20px between 64px text at 1.1 leading = 90px spacing per Figma */}
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <motion.p 
              className="capitalize font-['Satoshi',sans-serif] font-bold text-[64px] tracking-[-1.28px] leading-[1.1] whitespace-nowrap"
              style={{ color: skill1Color }}
            >
              Product design
            </motion.p>
            <motion.p 
              className="capitalize font-['Satoshi',sans-serif] font-bold text-[64px] tracking-[-1.28px] leading-[1.1] whitespace-nowrap"
              style={{ color: skill2Color }}
            >
              UX Strategy
            </motion.p>
            <motion.p 
              className="capitalize font-['Satoshi',sans-serif] font-bold text-[64px] tracking-[-1.28px] leading-[1.1] whitespace-nowrap"
              style={{ color: skill3Color }}
            >
              Brand & Visual Identity
            </motion.p>
            <motion.p 
              className="capitalize font-['Satoshi',sans-serif] font-bold text-[64px] tracking-[-1.28px] leading-[1.1] whitespace-nowrap"
              style={{ color: skill4Color }}
            >
              Growth-Focused Design
            </motion.p>
          </div>
        </motion.div>

        {/* Pics & Paragraphs Container — fades in at 0.35 */}
        <motion.div 
          className="absolute left-[247px] top-[407px] w-[593px] z-20"
          style={{ opacity: contentOpacity }}
        >
          {/* Images — stacked, each grows from bottom, stays grown, fades when superseded */}
          <div className="relative w-[593px] h-[417px] overflow-hidden">
            {/* Product Design image (Skill 1) */}
            <motion.div 
              className="absolute bottom-[-8px] left-0 w-[593px]" 
              style={{ height: img1Height, opacity: img1Opacity }}
            >
              <div className="absolute inset-0 bg-[#d9d9d9]" />
              <img src={imgProduct} alt="Product Design" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            
            {/* UX Strategy image (Skill 2) */}
            <motion.div 
              className="absolute bottom-[-8px] left-0 w-[593px]" 
              style={{ height: img2Height, opacity: img2Opacity }}
            >
              <div className="absolute inset-0 bg-[#d9d9d9]" />
              <img src={imgUx} alt="UX Strategy" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            
            {/* Brand & Visual Identity image (Skill 3) */}
            <motion.div 
              className="absolute bottom-[-8px] left-0 w-[593px]" 
              style={{ height: img3Height, opacity: img3Opacity }}
            >
              <img src={imgBrand} alt="Brand & Visual Identity" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            
            {/* Growth-Focused Design image (Skill 4) */}
            <motion.div 
              className="absolute bottom-[-3px] left-0 w-[593px]" 
              style={{ height: img4Height, opacity: img4Opacity }}
            >
              <div className="absolute inset-0 bg-white" />
              <img src={imgGrow} alt="Growth-Focused Design" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Paragraph Carousel — 70px window, 96px spacing, slides up */}
          <div 
            className="relative w-[593px] h-[70px] overflow-hidden capitalize font-['Satoshi',sans-serif] text-[32px] leading-[1.1] text-white tracking-[-0.64px]"
            style={{ marginTop: "28px" }}
          >
            <motion.div className="absolute left-0 w-[593px]" style={{ top: paragraphsTop }}>
              <p className="absolute left-0 top-[0px] w-[593px]">
                Making products feel intuitive before they need explaining.
              </p>
              <p className="absolute left-0 top-[96px] w-[593px]">
                Fixing friction, confusion, and &ldquo;what the hell am I supposed to click?&rdquo;
              </p>
              <p className="absolute left-0 top-[192px] w-[593px]">
                Visual systems with personality, presence, and something worth remembering.
              </p>
              <p className="absolute left-0 top-[288px] w-[593px]">
                Design decisions built to grab attention, shape behavior, and actually move things forward.
              </p>
            </motion.div>
          </div>
        </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
