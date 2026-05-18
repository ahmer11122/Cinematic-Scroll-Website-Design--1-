import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import imgProject1 from "figma:asset/a87e59cc7ec05396f0f1079d3c1da3a62bdbedd0.png";
import imgProject2 from "figma:asset/12cf10e45690a6830056c6ac9bc0307186b6c1b3.png";
import imgProject3 from "figma:asset/d55c1d4457396a957770c2d5963a4b4046ca9521.png";
import imgProject4 from "figma:asset/ebf77fc580b09f4bb0a5b434aea87438d7e208b3.png";

type ProjectCardProps = {
  width: MotionValue<string>;
  opacity: MotionValue<number>;
  image: string;
  number: string;
  title: string;
  category: string;
  type: string;
  extra: string;
};

function ProjectCard({ width, opacity, image, number, title, category, type, extra }: ProjectCardProps) {
  return (
    <motion.div 
      style={{ width, opacity }}
      className="@container relative shrink-0 aspect-[1.89] origin-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-[3.2cqw] flex flex-col justify-end">
        <div className="border-t border-b border-[#8b8b8b] py-[1.8cqw] relative">
          <div className="absolute left-[1cqw] top-[1.8cqw] text-white font-['Satoshi',sans-serif] text-[1.28cqw]">({number})</div>
          <h3 className="font-['Satoshi',sans-serif] font-bold text-[6.6cqw] text-white tracking-[-0.037em] ml-[3.67cqw] leading-none">{title}</h3>
        </div>
        <div className="border-b border-[#8b8b8b] py-[1.4cqw] flex items-center gap-[1.8cqw] ml-[3.67cqw] font-['Satoshi',sans-serif] font-medium text-[1.47cqw] text-white">
          <span>{category}</span>
          <div className="w-[1px] h-[1.4cqw] bg-white opacity-50" />
          <span>{type}</span>
          <div className="w-[1px] h-[1.4cqw] bg-white opacity-50" />
          <span>{extra}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. Initial White Wipe from Bottom
  const whiteWipeY = useTransform(scrollYProgress, [0, 0.1], ["100vh", "0vh"]);
  
  // 2. Center "Selected Work" fades and scales to top
  const titleColor = useTransform(scrollYProgress, [0.15, 0.2], ["#2c2c2c", "#aeaeae"]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.25], ["50vh", "15vh"]);
  const titleScale = useTransform(scrollYProgress, [0.15, 0.25], [1, 0.7]);
  const titleOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);
  
  // 3. Dark wipe for background (turns screen black after white reveal)
  const bgOpacity = useTransform(scrollYProgress, [0.15, 0.2], [1, 0]);

  // 4. Projects horizontal layout animation
  const projectsX = useTransform(scrollYProgress, [0.25, 0.85], ["17.5vw", "-132.5vw"]);
  const projectsOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);

  // Card Width & Opacity Mappings
  const card1W = useTransform(scrollYProgress, [0.25, 0.45], ["65vw", "45vw"]);
  const card1Op = useTransform(scrollYProgress, [0.25, 0.45], [1, 0.3]);

  const card2W = useTransform(scrollYProgress, [0.25, 0.45, 0.65], ["45vw", "65vw", "45vw"]);
  const card2Op = useTransform(scrollYProgress, [0.25, 0.45, 0.65], [0.3, 1, 0.3]);

  const card3W = useTransform(scrollYProgress, [0.45, 0.65, 0.85], ["45vw", "65vw", "45vw"]);
  const card3Op = useTransform(scrollYProgress, [0.45, 0.65, 0.85], [0.3, 1, 0.3]);

  const card4W = useTransform(scrollYProgress, [0.65, 0.85], ["45vw", "65vw"]);
  const card4Op = useTransform(scrollYProgress, [0.65, 0.85], [0.3, 1]);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#0c0c0c]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0c0c0c]">
        
        {/* White Background Layer */}
        <motion.div 
          className="absolute inset-0 bg-[#f9f9f9] z-10"
          style={{ y: whiteWipeY, opacity: bgOpacity }}
        />

        {/* Selected Work Title */}
        <motion.div 
          className="absolute z-20 top-0 left-0 w-full h-full flex justify-center pointer-events-none"
          style={{ y: titleY, scale: titleScale, color: titleColor, opacity: titleOpacity }}
        >
          <div className="flex gap-[20px] font-['Satoshi',sans-serif] font-black text-[8vw] leading-[1.1] tracking-[-2.64px] whitespace-nowrap mt-[-10vh]">
            <span>Selected</span>
            <span className="opacity-50">Work</span>
          </div>
        </motion.div>

        {/* Projects Horizontal Flex Track */}
        <motion.div 
          className="absolute inset-y-0 left-0 z-30 flex items-center"
          style={{ x: projectsX, opacity: projectsOpacity }}
        >
          <div className="flex gap-[5vw]">
            <ProjectCard 
              width={card1W} opacity={card1Op} image={imgProject1} number="01" 
              title="Bytkey" category="UX Design" type="Finance Mobile App" extra="NotionCase Study" 
            />
            <ProjectCard 
              width={card2W} opacity={card2Op} image={imgProject2} number="02" 
              title="Voxworks" category="UX Design" type="Real Estate Ai Powered Calling Agent" extra="NotionCase Study" 
            />
            <ProjectCard 
              width={card3W} opacity={card3Op} image={imgProject3} number="03" 
              title="Citea" category="UX Design" type="Small Business Management Dashboard" extra="Case Study" 
            />
            <ProjectCard 
              width={card4W} opacity={card4Op} image={imgProject4} number="04" 
              title="Mineral Mama" category="Brand Identity" type="Behance" extra="Case Study" 
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
