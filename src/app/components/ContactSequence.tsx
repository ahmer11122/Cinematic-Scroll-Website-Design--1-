import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import imgDesigner from "figma:asset/767f8eb5ad21dcd3059a1544a2e4ba740673cd7b.png";

export function ContactSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Designer Image Fade In & Clip down
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const imageWidth = useTransform(scrollYProgress, [0.4, 0.6], ["100vw", "494px"]);
  const imageHeight = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "561px"]);
  
  // 2. Intro Text "Your Go To Designer."
  const introTextOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const introTextScale = useTransform(scrollYProgress, [0.15, 0.35], [0.9, 1.05]);
  
  // 3. Background Color Transition
  const bgColor = useTransform(scrollYProgress, [0.4, 0.6], ["#0c0c0c", "#ffffff"]);

  // 4. Final Footer Content Fade In
  const finalContentOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const finalContentY = useTransform(scrollYProgress, [0.65, 0.8], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#0c0c0c]">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        
        {/* Full-to-Square Designer Image */}
        <motion.div 
          className="relative overflow-hidden flex items-center justify-center"
          style={{ 
            width: imageWidth, 
            height: imageHeight, 
            opacity: imageOpacity 
          }}
        >
          <img 
            src={imgDesigner} 
            alt="Designer" 
            className="w-full h-full object-cover"
          />
          {/* Black overlay to help text readability when full screen, which fades out when shrinking */}
          <motion.div 
            className="absolute inset-0 bg-black"
            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0.3, 0]) }}
          />
        </motion.div>

        {/* Intro Text Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-between px-[10vw] pointer-events-none"
          style={{ opacity: introTextOpacity, scale: introTextScale }}
        >
          <h2 className="font-['Satoshi',sans-serif] font-black text-[118px] text-[#d6d6d3] tracking-[-2.36px] whitespace-nowrap leading-[1.1]">
            Your Go To
          </h2>
          <h2 className="font-['Satoshi',sans-serif] font-black text-[118px] text-white tracking-[-2.36px] whitespace-nowrap leading-[1.1]">
            Designer.
          </h2>
        </motion.div>

        {/* Final Contact & Footer Content */}
        <motion.div 
          className="absolute inset-0 pointer-events-none flex flex-col"
          style={{ opacity: finalContentOpacity, y: finalContentY }}
        >
          
          {/* Main Contact Section */}
          <div className="flex-1 flex items-center justify-between px-[10vw]">
            
            {/* Left Side: Let's Do Work Together */}
            <div className="flex flex-col items-start max-w-[400px] pointer-events-auto">
              <div className="font-['Satoshi',sans-serif] font-black text-[80px] leading-[0.84] tracking-[-1.6px] mb-[40px]">
                <div className="text-[#8b8b8b]">Lets</div>
                <div className="text-[#8b8b8b]">Do Work</div>
                <div className="text-[#2c2c2c]">Together.</div>
              </div>
              <button className="bg-[#2c2c2c] text-white font-['Satoshi',sans-serif] font-medium text-[20px] py-[20px] px-[40px] hover:bg-black transition-colors duration-300">
                Start a Conversation
              </button>
            </div>

            {/* Right Side: Socials */}
            <div className="flex flex-col items-start pointer-events-auto">
              <div className="font-['Satoshi',sans-serif] font-medium text-[24px] text-[#939393] mb-[15px]">
                Socials
              </div>
              <div className="flex gap-[40px] font-['Satoshi',sans-serif] font-bold text-[92px] text-[#2c2c2c] tracking-[-4.6px] leading-none">
                <a href="#" className="hover:opacity-60 transition-opacity">Ig</a>
                <a href="#" className="hover:opacity-60 transition-opacity">In</a>
                <a href="#" className="hover:opacity-60 transition-opacity">Be</a>
              </div>
            </div>

          </div>

          {/* Bottom Footer Area */}
          <div className="pb-[40px] px-[4vw] flex justify-between items-center pointer-events-auto">
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
  );
}
