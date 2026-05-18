import { motion } from "motion/react";
import { Infinity } from "lucide-react";
import { cn } from "../../lib/utils";

export function NavBar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none"
    >
      <div className="flex flex-row items-center justify-between px-[60px] py-[48px] w-full max-w-[1920px] mx-auto">
        <div className="shrink-0 pointer-events-auto cursor-pointer flex items-center justify-center w-[88px] h-[45px] text-[#fffff9]">
          <Infinity size={48} strokeWidth={1.5} />
        </div>

        <div className="flex font-['Satoshi',sans-serif] font-black gap-[80px] items-center justify-end text-[16px] uppercase tracking-wider text-[#fffff9] pointer-events-auto">
          <p className="cursor-pointer hover:opacity-70 transition-opacity">Index</p>
          <p className="cursor-pointer hover:opacity-70 transition-opacity opacity-60">About</p>
          <p className="cursor-pointer hover:opacity-70 transition-opacity opacity-60">Work</p>
          <p className="cursor-pointer hover:opacity-70 transition-opacity opacity-60">Contact</p>
        </div>
      </div>
    </motion.nav>
  );
}
