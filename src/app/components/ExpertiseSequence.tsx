import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import imgProduct from "figma:asset/c314dff86913a468ac7cecdb702b315300774c94.png";
import imgUx from "figma:asset/1f3e386a526d23fc84625a112358fd435c6e91b4.png";
import imgBrand from "figma:asset/ebf77fc580b09f4bb0a5b434aea87438d7e208b3.png";
import imgGrow from "figma:asset/08fc2c4c6e1503541f2242105753c9f936ba26d4.png";

export function ExpertiseSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. White Background Reveal
  const whiteClipPath = useTransform(scrollYProgress, [0, 0.1], ["inset(50% 0 50% 0)", "inset(0% 0 0% 0)"]);

  // 2. Intro Text Split
  const leftTextX = useTransform(scrollYProgress, [0.02, 0.15], ["-50vw", "0vw"]);
  const rightTextX = useTransform(scrollYProgress, [0.02, 0.15], ["50vw", "0vw"]);
  
  // 3. Center Title fades out
  const centerTitleOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]);
  const centerTitleScale = useTransform(scrollYProgress, [0.2, 0.3], [1, 1.05]);

  // 4. Dark Wipe
  const darkClipPath = useTransform(scrollYProgress, [0.15, 0.25], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  // 5. Content Reveal
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.35], [40, 0]);

  // Opacities for the 4 skills
  // Skill 1: Product Design
  const skill1Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  // Skill 2: UX Strategy
  const skill2Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
  // Skill 3: Brand & Visual Identity
  const skill3Opacity = useTransform(scrollYProgress, [0.65, 0.7, 0.85, 0.9], [0, 1, 1, 0]);
  // Skill 4: Growth-Focused Design
  const skill4Opacity = useTransform(scrollYProgress, [0.85, 0.9, 1, 1], [0, 1, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#030301]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* White Background Reveal */}
        <motion.div 
          className="absolute inset-0 bg-[#f9f9f9] z-10"
          style={{ clipPath: whiteClipPath }}
        />

        {/* Center Title */}
        <motion.div 
          className="absolute z-20 inset-0 flex justify-center items-center gap-[10px] md:gap-[20px] mix-blend-difference text-[#d9d9d9] pointer-events-none"
          style={{ opacity: centerTitleOpacity, scale: centerTitleScale }}
        >
          <motion.div style={{ x: leftTextX }} className="font-['Satoshi',sans-serif] font-black text-[6vw] md:text-[8vw] leading-[1] tracking-tighter capitalize whitespace-nowrap">
            The Stuff I'm
          </motion.div>
          <motion.div style={{ x: rightTextX }} className="font-['Satoshi',sans-serif] font-black text-[6vw] md:text-[8vw] leading-[1] tracking-tighter capitalize whitespace-nowrap opacity-60">
            Good At.
          </motion.div>
        </motion.div>

        {/* Dark Wipe Layer */}
        <motion.div 
          className="absolute inset-0 bg-[#0c0c0c] z-30 pointer-events-none"
          style={{ clipPath: darkClipPath }}
        />

        {/* Final Content Layer */}
        <motion.div 
          className="absolute inset-0 z-40 pointer-events-none flex flex-col md:flex-row max-w-[1920px] mx-auto px-[30px] lg:px-[60px]"
          style={{ opacity: contentOpacity, y: contentY }}
        >
            {/* Left side: Images and Text */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start md:pl-[5%] lg:pl-[187px]">
                
                {/* Images Container */}
                <div className="w-full max-w-[593px] aspect-[593/417] relative overflow-hidden mb-[40px] pointer-events-auto">
                    <motion.img style={{ opacity: skill1Opacity }} src={imgProduct} alt="Product Design" className="absolute inset-0 w-full h-full object-cover" />
                    <motion.img style={{ opacity: skill2Opacity }} src={imgUx} alt="UX Strategy" className="absolute inset-0 w-full h-full object-cover" />
                    <motion.img style={{ opacity: skill3Opacity }} src={imgBrand} alt="Brand Identity" className="absolute inset-0 w-full h-full object-cover" />
                    <motion.img style={{ opacity: skill4Opacity }} src={imgGrow} alt="Growth Design" className="absolute inset-0 w-full h-full object-cover" />
                </div>

                {/* Texts Container */}
                <div className="w-full max-w-[593px] relative h-[200px]">
                    {/* Skill 1 Text */}
                    <motion.div style={{ opacity: skill1Opacity }} className="absolute inset-0 flex flex-col gap-[16px] md:gap-[24px]">
                        <p className="font-['Satoshi',sans-serif] text-white text-[20px] md:text-[32px] leading-[1.2] md:leading-[1.1] tracking-[-0.64px]">
                            Making products feel intuitive before they need explaining.
                        </p>
                        <p className="font-['Satoshi',sans-serif] text-[#808080] text-[18px] md:text-[24px] leading-[1.3] tracking-[-0.48px]">
                            Fixing friction, confusion, and “what the hell am I supposed to click?”
                        </p>
                    </motion.div>

                    {/* Skill 2 Text */}
                    <motion.div style={{ opacity: skill2Opacity }} className="absolute inset-0 flex flex-col gap-[16px] md:gap-[24px]">
                        <p className="font-['Satoshi',sans-serif] text-white text-[20px] md:text-[32px] leading-[1.2] md:leading-[1.1] tracking-[-0.64px]">
                            Creating seamless journeys that guide users effortlessly.
                        </p>
                        <p className="font-['Satoshi',sans-serif] text-[#808080] text-[18px] md:text-[24px] leading-[1.3] tracking-[-0.48px]">
                            Structuring information so people always know where they are.
                        </p>
                    </motion.div>

                    {/* Skill 3 Text */}
                    <motion.div style={{ opacity: skill3Opacity }} className="absolute inset-0 flex flex-col gap-[16px] md:gap-[24px]">
                        <p className="font-['Satoshi',sans-serif] text-white text-[20px] md:text-[32px] leading-[1.2] md:leading-[1.1] tracking-[-0.64px]">
                            Visual systems with personality, presence, and something worth remembering.
                        </p>
                        <p className="font-['Satoshi',sans-serif] text-[#808080] text-[18px] md:text-[24px] leading-[1.3] tracking-[-0.48px]">
                            Design decisions built to grab attention, shape behavior, and move things forward.
                        </p>
                    </motion.div>

                    {/* Skill 4 Text */}
                    <motion.div style={{ opacity: skill4Opacity }} className="absolute inset-0 flex flex-col gap-[16px] md:gap-[24px]">
                        <p className="font-['Satoshi',sans-serif] text-white text-[20px] md:text-[32px] leading-[1.2] md:leading-[1.1] tracking-[-0.64px]">
                            Optimizing experiences to convert, retain, and scale.
                        </p>
                        <p className="font-['Satoshi',sans-serif] text-[#808080] text-[18px] md:text-[24px] leading-[1.3] tracking-[-0.48px]">
                            Turning casual users into loyal advocates through smart design.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right side: List */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start md:pl-[50px] lg:pl-[100px] mt-[40px] md:mt-0 pointer-events-auto">
                <div className="flex flex-col w-full max-w-[600px]">
                    <div className="font-['Satoshi',sans-serif] font-black text-[24px] md:text-[48px] text-[#aeaeae] tracking-[-0.96px] mb-[20px] md:mb-[40px]">
                        The Stuff I'm Good At.
                    </div>
                    <div className="flex flex-col gap-[16px] md:gap-[26px]">
                      <motion.p style={{ opacity: useTransform(skill1Opacity, [0, 1], [0.3, 1]), color: useTransform(skill1Opacity, [0, 1], ["#aeaeae", "#ffffff"]) }} className="font-['Satoshi',sans-serif] font-bold text-[32px] md:text-[64px] tracking-[-1.28px] leading-[1.1]">Product Design</motion.p>
                      <motion.p style={{ opacity: useTransform(skill2Opacity, [0, 1], [0.3, 1]), color: useTransform(skill2Opacity, [0, 1], ["#aeaeae", "#ffffff"]) }} className="font-['Satoshi',sans-serif] font-bold text-[32px] md:text-[64px] tracking-[-1.28px] leading-[1.1]">UX Strategy</motion.p>
                      <motion.p style={{ opacity: useTransform(skill3Opacity, [0, 1], [0.3, 1]), color: useTransform(skill3Opacity, [0, 1], ["#aeaeae", "#ffffff"]) }} className="font-['Satoshi',sans-serif] font-bold text-[32px] md:text-[64px] tracking-[-1.28px] leading-[1.1]">Brand & Visual Identity</motion.p>
                      <motion.p style={{ opacity: useTransform(skill4Opacity, [0, 1], [0.3, 1]), color: useTransform(skill4Opacity, [0, 1], ["#aeaeae", "#ffffff"]) }} className="font-['Satoshi',sans-serif] font-bold text-[32px] md:text-[64px] tracking-[-1.28px] leading-[1.1]">Growth-Focused Design</motion.p>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}
