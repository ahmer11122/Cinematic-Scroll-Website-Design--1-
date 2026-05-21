import { motion, useTransform, MotionValue, useMotionValue, useSpring, cubicBezier } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef, useState, useEffect } from "react";
import imgProject1 from "figma:asset/a87e59cc7ec05396f0f1079d3c1da3a62bdbedd0.png";
import imgProject2 from "figma:asset/12cf10e45690a6830056c6ac9bc0307186b6c1b3.png";
import imgProject3 from "figma:asset/d55c1d4457396a957770c2d5963a4b4046ca9521.png";
import imgProject4 from "figma:asset/ebf77fc580b09f4bb0a5b434aea87438d7e208b3.png";

/* ────────────────────────────────────────────
 * PROJECT DATA — matches Figma specs exactly
 * ──────────────────────────────────────────── */
const projects = [
  {
    number: "01",
    title: "Bytkey",
    tags: ["UX Design", "Finance Mobile App", "Notion Case Study"],
    image: imgProject1,
    overlay: "rgba(0,0,0,0.2)",
  },
  {
    number: "02",
    title: "Voxworks",
    tags: ["UX Design", "Real Estate Ai Powered Calling Agent", "Notion Case Study"],
    image: imgProject2,
    overlay: "rgba(0,0,0,0.3)",
  },
  {
    number: "03",
    title: "Citea",
    tags: ["UX Design", "Small Business Management Dashboard", "Case Study"],
    image: imgProject3,
    overlay: "rgba(0,0,0,0.25)",
  },
  {
    number: "04",
    title: "Mineral Mama",
    tags: ["Brand Identity", "Behance"],
    image: imgProject4,
    overlay: "rgba(0,0,0,0.33)",
  },
];

/* ────────────────────────────────────────────
 * DESIGN TOKENS — from Figma spec MD files
 * ──────────────────────────────────────────── */

// Active/centered card dimensions (Frame 189-190 spec)
const CARD_ACTIVE_W = 1087.955;
const CARD_ACTIVE_H = 575;
const CARD_ACTIVE_Y = 368; // from top of 1080 canvas

// Previous/small card dimensions (Frame 191 spec)
const CARD_SMALL_W = 762.514;
const CARD_SMALL_H = 403;
const CARD_SMALL_Y = 454;
const CARD_SMALL_OPACITY = 0.69;

// Card positions within 1920px canvas
const CARD_CENTER_X = 416; // centers the 1088px card in 1920
const CARD_LEFT_X = -451.28; // partially visible left (Frame 191)
const CARD_FAR_LEFT_X = -1614.02; // off-screen left (Frame 194+)
const CARD_OFFSCREEN_RIGHT = 1920; // off-screen right entry point

// Gap between cards when scrolling

/* ────────────────────────────────────────────
 * PROJECT CARD COMPONENT
 * Renders a single project card with all Figma-spec styling.
 * Accepts motion values for animated properties.
 * ──────────────────────────────────────────── */
type ProjectCardProps = {
  project: typeof projects[0];
  x: MotionValue<number>;
  cardWidth: MotionValue<number>;
  cardHeight: MotionValue<number>;
  cardOpacity: MotionValue<number>;
  cardY: MotionValue<number>;
  textOpacity: MotionValue<number>;
  // Typography scales with card size
  titleSize: MotionValue<number>;
  titleTracking: MotionValue<number>;
  numberSize: MotionValue<number>;
  tagSize: MotionValue<number>;
  borderWidth: MotionValue<number>;
  titleSectionH: MotionValue<number>;
  metaPadX: MotionValue<number>;
  metaPadY: MotionValue<number>;
  metaGap: MotionValue<number>;
  dividerH: MotionValue<number>;
  cardPad: MotionValue<number>;
};

function ProjectCard({
  project,
  x,
  cardWidth,
  cardHeight,
  cardOpacity,
  cardY,
  textOpacity,
  titleSize,
  titleTracking,
  numberSize,
  tagSize,
  borderWidth,
  titleSectionH,
  metaPadX,
  metaPadY,
  metaGap,
  dividerH,
  cardPad,
}: ProjectCardProps) {
  const FE = cubicBezier(0.65, 0.03, 0.33, 0.97);
  const imgX = useTransform(x, [1920, 416, -1614.02, -2400], [-100, 0, 100, 150], { ease: FE });

  return (
    <motion.div
      className="absolute overflow-clip"
      style={{
        x,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
        opacity: cardOpacity,
      }}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute top-0 w-[116%] h-full object-cover max-w-none left-[-8%]"
          style={{ x: imgX }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: project.overlay }}
        />
      </div>

      {/* Card content — bottom-aligned */}
      <motion.div
        className="absolute bottom-0 left-0 w-full flex flex-col justify-end"
        style={{ padding: cardPad }}
      >
        {/* Title section: border-top + border-bottom */}
        <motion.div
          className="relative flex items-center"
          style={{
            borderTopWidth: borderWidth,
            borderBottomWidth: borderWidth,
            borderTopStyle: "solid" as any,
            borderBottomStyle: "solid" as any,
            borderColor: "#8b8b8b",
            height: titleSectionH,
          }}
        >
          {/* Number badge */}
          <motion.span
            className="absolute font-['Satoshi',sans-serif] font-normal text-white"
            style={{
              fontSize: numberSize,
              left: 15,
              opacity: textOpacity,
            }}
          >
            ({project.number})
          </motion.span>

          {/* Project title */}
          <motion.h3
            className="font-['Satoshi',sans-serif] font-bold text-white leading-[1] whitespace-nowrap"
            style={{
              fontSize: titleSize,
              letterSpacing: titleTracking,
              marginLeft: 45,
              opacity: textOpacity,
            }}
          >
            {project.title}
          </motion.h3>
        </motion.div>

        {/* Tags section: border-bottom */}
        <motion.div
          className="flex items-center font-['Satoshi',sans-serif] font-medium text-white"
          style={{
            borderBottomWidth: borderWidth,
            borderBottomStyle: "solid" as any,
            borderColor: "#8b8b8b",
            paddingLeft: metaPadX,
            paddingRight: metaPadX,
            paddingTop: metaPadY,
            paddingBottom: metaPadY,
            gap: metaGap,
            fontSize: tagSize,
            opacity: textOpacity,
          }}
        >
          {project.tags.map((tag, i) => (
            <span key={tag} className="flex items-center" style={{ gap: metaGap as any }}>
              {i > 0 && (
                <motion.div
                  className="bg-white/50"
                  style={{ width: 1, height: dividerH }}
                />
              )}
              <span>{tag}</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
 * MAIN WORK SEQUENCE COMPONENT
 * ──────────────────────────────────────────── */
export function WorkSequence() {
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

  /* ══════════════════════════════════════════
   * SCROLL PROGRESS MAP (total: 0.00 → 1.00)
   *
   * 0.00–0.04  Section enters, white bg fades in
   * 0.04–0.08  Frame 187→193: bg white→black, title color (1000ms)
   * 0.08–0.12  Frame 193→188: title center→top, scale down (1000ms)
   * 0.12–0.15  Hold (800ms delay)
   * 0.15–0.21  Frame 188→189: Card 1 slides in from right (1500ms)
   * 0.21–0.27  Frame 189→190: Card 1 text fades in
   * 0.27–0.37  Frame 190→191: Card 1 shrinks left, Card 2 slides in
   * 0.37–0.42  Frame 191→192: Card 2 text fades in
   * 0.42–0.52  Frame 192→194: Card 2 shrinks left, Card 3 slides in
   * 0.52–0.57  Frame 194→195: Card 3 text fades in
   * 0.57–0.67  Frame 195→196: Card 3 shrinks left, Card 4 slides in
   * 0.67–0.72  Frame 196→197: Card 4 text fades in
   * 0.72–0.82  Frame 197→exit: Cards slide off left
   * 0.82–0.88  Return to title-only state (Frame 194-like)
   * 0.88–0.95  Frame 209: title fades, section exits
   * 0.95–1.00  Hold / buffer
   * ══════════════════════════════════════════ */

  const FE = cubicBezier(0.65, 0.03, 0.33, 0.97); // Figma cubic-bezier ease

  // ── BACKGROUND ──
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.10],
    ["#F9F9F9", "#0C0C0C", "#030301"],
    { ease: [FE, FE] }
  );

  // ── TITLE: "Selected Work" ──
  // Color: "Selected" goes from dark to light, "Work" stays light
  const selectedColor = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["#2C2C2C", "#AEAEAE"],
    { ease: FE }
  );

  // Position & fontSize (Frame 187: 132px at y:486 → Frame 188: 96px at y:142.7)
  const titleY = useTransform(
    scrollYProgress,
    [0.05, 0.10],
    [486, 142.7],
    { ease: FE }
  );
  const titleFontSize = useTransform(
    scrollYProgress,
    [0.05, 0.10],
    [132, 96],
    { ease: FE }
  );
  const titleLetterSpacing = useTransform(
    scrollYProgress,
    [0.05, 0.10],
    [-2.64, -1.92],
    { ease: FE }
  );

  // Title opacity: visible throughout, fades out at the very end of scroll
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.98, 1.000],
    [1, 0],
    { ease: FE }
  );

  // ── CARD 1 (Bytkey) ──
  const c1X = useTransform(
    scrollYProgress,
    [0.14, 0.22, 0.30, 0.38, 0.46, 0.54, 0.78, 0.86],
    [CARD_OFFSCREEN_RIGHT, CARD_CENTER_X, CARD_CENTER_X, CARD_LEFT_X, CARD_LEFT_X, CARD_FAR_LEFT_X, CARD_FAR_LEFT_X, -2400],
    { ease: [FE, FE, FE, FE, FE, FE, FE] }
  );
  const c1W = useTransform(
    scrollYProgress,
    [0.14, 0.30, 0.38, 0.86],
    [CARD_ACTIVE_W, CARD_ACTIVE_W, CARD_SMALL_W, CARD_SMALL_W],
    { ease: [FE, FE, FE] }
  );
  const c1H = useTransform(
    scrollYProgress,
    [0.14, 0.30, 0.38, 0.86],
    [CARD_ACTIVE_H, CARD_ACTIVE_H, CARD_SMALL_H, CARD_SMALL_H],
    { ease: [FE, FE, FE] }
  );
  const c1Y = useTransform(
    scrollYProgress,
    [0.14, 0.30, 0.38],
    [CARD_ACTIVE_Y, CARD_ACTIVE_Y, CARD_SMALL_Y],
    { ease: [FE, FE] }
  );
  const c1Opacity = useTransform(
    scrollYProgress,
    [0.14, 0.22, 0.30, 0.38, 0.78, 0.86],
    [0, 1, 1, CARD_SMALL_OPACITY, CARD_SMALL_OPACITY, 0],
    { ease: [FE, FE, FE, FE, FE] }
  );
  const c1TextOpacity = useTransform(
    scrollYProgress,
    [0.14, 0.22],
    [0, 1],
    { ease: FE }
  );

  // Card 1 typography interpolation (active → small)
  const c1TitleSize = useTransform(scrollYProgress, [0.30, 0.38], [72, 50.463], { ease: FE });
  const c1TitleTracking = useTransform(scrollYProgress, [0.30, 0.38], [-2.691, -1.8861], { ease: FE });
  const c1NumberSize = useTransform(scrollYProgress, [0.30, 0.38], [14, 9.812], { ease: FE });
  const c1TagSize = useTransform(scrollYProgress, [0.30, 0.38], [16, 11.214], { ease: FE });
  const c1BorderW = useTransform(scrollYProgress, [0.30, 0.38], [0.721, 0.506], { ease: FE });
  const c1TitleH = useTransform(scrollYProgress, [0.30, 0.38], [120.087, 84.165], { ease: FE });
  const c1MetaPadX = useTransform(scrollYProgress, [0.30, 0.38], [62.045, 43.486], { ease: FE });
  const c1MetaPadY = useTransform(scrollYProgress, [0.30, 0.38], [11.543, 8.09], { ease: FE });
  const c1MetaGap = useTransform(scrollYProgress, [0.30, 0.38], [20.922, 14.664], { ease: FE });
  const c1DividerH = useTransform(scrollYProgress, [0.30, 0.38], [18.758, 13.147], { ease: FE });
  const c1CardPad = useTransform(scrollYProgress, [0.30, 0.38], [35.351, 24.777], { ease: FE });

  // ── CARD 2 (Voxworks) ──
  const c2X = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.46, 0.54, 0.62, 0.70, 0.78, 0.86],
    [CARD_OFFSCREEN_RIGHT, CARD_CENTER_X, CARD_CENTER_X, CARD_LEFT_X, CARD_LEFT_X, CARD_FAR_LEFT_X, CARD_FAR_LEFT_X, -2400],
    { ease: [FE, FE, FE, FE, FE, FE, FE] }
  );
  const c2W = useTransform(
    scrollYProgress,
    [0.30, 0.46, 0.54, 0.86],
    [CARD_ACTIVE_W, CARD_ACTIVE_W, CARD_SMALL_W, CARD_SMALL_W],
    { ease: [FE, FE, FE] }
  );
  const c2H = useTransform(
    scrollYProgress,
    [0.30, 0.46, 0.54, 0.86],
    [CARD_ACTIVE_H, CARD_ACTIVE_H, CARD_SMALL_H, CARD_SMALL_H],
    { ease: [FE, FE, FE] }
  );
  const c2Y = useTransform(
    scrollYProgress,
    [0.30, 0.46, 0.54],
    [CARD_ACTIVE_Y, CARD_ACTIVE_Y, CARD_SMALL_Y],
    { ease: [FE, FE] }
  );
  const c2Opacity = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.46, 0.54, 0.78, 0.86],
    [0, 1, 1, CARD_SMALL_OPACITY, CARD_SMALL_OPACITY, 0],
    { ease: [FE, FE, FE, FE, FE] }
  );
  const c2TextOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.38],
    [0, 1],
    { ease: FE }
  );

  const c2TitleSize = useTransform(scrollYProgress, [0.46, 0.54], [72, 50.463], { ease: FE });
  const c2TitleTracking = useTransform(scrollYProgress, [0.46, 0.54], [-2.691, -1.8861], { ease: FE });
  const c2NumberSize = useTransform(scrollYProgress, [0.46, 0.54], [14, 9.812], { ease: FE });
  const c2TagSize = useTransform(scrollYProgress, [0.46, 0.54], [16, 11.214], { ease: FE });
  const c2BorderW = useTransform(scrollYProgress, [0.46, 0.54], [0.721, 0.506], { ease: FE });
  const c2TitleH = useTransform(scrollYProgress, [0.46, 0.54], [120.087, 84.165], { ease: FE });
  const c2MetaPadX = useTransform(scrollYProgress, [0.46, 0.54], [62.045, 43.486], { ease: FE });
  const c2MetaPadY = useTransform(scrollYProgress, [0.46, 0.54], [11.543, 8.09], { ease: FE });
  const c2MetaGap = useTransform(scrollYProgress, [0.46, 0.54], [20.922, 14.664], { ease: FE });
  const c2DividerH = useTransform(scrollYProgress, [0.46, 0.54], [18.758, 13.147], { ease: FE });
  const c2CardPad = useTransform(scrollYProgress, [0.46, 0.54], [35.351, 24.777], { ease: FE });

  // ── CARD 3 (Citea) ──
  const c3X = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.62, 0.70, 0.78, 0.86, 0.94],
    [CARD_OFFSCREEN_RIGHT, CARD_CENTER_X, CARD_CENTER_X, CARD_LEFT_X, CARD_LEFT_X, CARD_FAR_LEFT_X, -2400],
    { ease: [FE, FE, FE, FE, FE, FE] }
  );
  const c3W = useTransform(
    scrollYProgress,
    [0.46, 0.62, 0.70, 0.94],
    [CARD_ACTIVE_W, CARD_ACTIVE_W, CARD_SMALL_W, CARD_SMALL_W],
    { ease: [FE, FE, FE] }
  );
  const c3H = useTransform(
    scrollYProgress,
    [0.46, 0.62, 0.70, 0.94],
    [CARD_ACTIVE_H, CARD_ACTIVE_H, CARD_SMALL_H, CARD_SMALL_H],
    { ease: [FE, FE, FE] }
  );
  const c3Y = useTransform(
    scrollYProgress,
    [0.46, 0.62, 0.70],
    [CARD_ACTIVE_Y, CARD_ACTIVE_Y, CARD_SMALL_Y],
    { ease: [FE, FE] }
  );
  const c3Opacity = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.62, 0.70, 0.86, 0.94],
    [0, 1, 1, CARD_SMALL_OPACITY, CARD_SMALL_OPACITY, 0],
    { ease: [FE, FE, FE, FE, FE] }
  );
  const c3TextOpacity = useTransform(
    scrollYProgress,
    [0.46, 0.54],
    [0, 1],
    { ease: FE }
  );

  const c3TitleSize = useTransform(scrollYProgress, [0.62, 0.70], [72, 50.463], { ease: FE });
  const c3TitleTracking = useTransform(scrollYProgress, [0.62, 0.70], [-2.691, -1.8861], { ease: FE });
  const c3NumberSize = useTransform(scrollYProgress, [0.62, 0.70], [14, 9.812], { ease: FE });
  const c3TagSize = useTransform(scrollYProgress, [0.62, 0.70], [16, 11.214], { ease: FE });
  const c3BorderW = useTransform(scrollYProgress, [0.62, 0.70], [0.721, 0.506], { ease: FE });
  const c3TitleH = useTransform(scrollYProgress, [0.62, 0.70], [120.087, 84.165], { ease: FE });
  const c3MetaPadX = useTransform(scrollYProgress, [0.62, 0.70], [62.045, 43.486], { ease: FE });
  const c3MetaPadY = useTransform(scrollYProgress, [0.62, 0.70], [11.543, 8.09], { ease: FE });
  const c3MetaGap = useTransform(scrollYProgress, [0.62, 0.70], [20.922, 14.664], { ease: FE });
  const c3DividerH = useTransform(scrollYProgress, [0.62, 0.70], [18.758, 13.147], { ease: FE });
  const c3CardPad = useTransform(scrollYProgress, [0.62, 0.70], [35.351, 24.777], { ease: FE });

  // ── CARD 4 (Mineral Mama) ──
  const c4X = useTransform(
    scrollYProgress,
    [0.62, 0.70, 0.78, 0.86, 0.94],
    [CARD_OFFSCREEN_RIGHT, CARD_CENTER_X, CARD_CENTER_X, CARD_LEFT_X, CARD_FAR_LEFT_X],
    { ease: [FE, FE, FE, FE] }
  );
  const c4W = useTransform(
    scrollYProgress,
    [0.62, 0.78, 0.86, 0.94],
    [CARD_ACTIVE_W, CARD_ACTIVE_W, CARD_SMALL_W, CARD_SMALL_W],
    { ease: [FE, FE, FE] }
  );
  const c4H = useTransform(
    scrollYProgress,
    [0.62, 0.78, 0.86, 0.94],
    [CARD_ACTIVE_H, CARD_ACTIVE_H, CARD_SMALL_H, CARD_SMALL_H],
    { ease: [FE, FE, FE] }
  );
  const c4Y = useTransform(
    scrollYProgress,
    [0.62, 0.78, 0.86],
    [CARD_ACTIVE_Y, CARD_ACTIVE_Y, CARD_SMALL_Y],
    { ease: [FE, FE] }
  );
  const c4Opacity = useTransform(
    scrollYProgress,
    [0.62, 0.70, 0.78, 0.86, 0.94],
    [0, 1, 1, CARD_SMALL_OPACITY, 0],
    { ease: [FE, FE, FE, FE] }
  );
  const c4TextOpacity = useTransform(
    scrollYProgress,
    [0.62, 0.70],
    [0, 1],
    { ease: FE }
  );

  // Card 4 shrinks and scales typography in unison with the other cards
  const c4TitleSize = useTransform(scrollYProgress, [0.78, 0.86], [72, 50.463], { ease: FE });
  const c4TitleTracking = useTransform(scrollYProgress, [0.78, 0.86], [-2.691, -1.8861], { ease: FE });
  const c4NumberSize = useTransform(scrollYProgress, [0.78, 0.86], [14, 9.812], { ease: FE });
  const c4TagSize = useTransform(scrollYProgress, [0.78, 0.86], [16, 11.214], { ease: FE });
  const c4BorderW = useTransform(scrollYProgress, [0.78, 0.86], [0.721, 0.506], { ease: FE });
  const c4TitleH = useTransform(scrollYProgress, [0.78, 0.86], [120.087, 84.165], { ease: FE });
  const c4MetaPadX = useTransform(scrollYProgress, [0.78, 0.86], [62.045, 43.486], { ease: FE });
  const c4MetaPadY = useTransform(scrollYProgress, [0.78, 0.86], [11.543, 8.09], { ease: FE });
  const c4MetaGap = useTransform(scrollYProgress, [0.78, 0.86], [20.922, 14.664], { ease: FE });
  const c4DividerH = useTransform(scrollYProgress, [0.78, 0.86], [18.758, 13.147], { ease: FE });
  const c4CardPad = useTransform(scrollYProgress, [0.78, 0.86], [35.351, 24.777], { ease: FE });

  return (
    <div ref={containerRef} className="relative h-[1200vh] bg-[#f9f9f9]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Pixel-perfect scaled 1920×1080 Figma canvas */}
        <div
          className="relative w-[1920px] h-[1080px] shrink-0 select-none"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          {/* ── BACKGROUND LAYERS ── */}
          {/* Unified background layer */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: bgColor,
            }}
          />

          {/* ── TITLE: "Selected Work" ── */}
          <motion.div
            className="absolute z-20 left-0 w-full flex justify-center pointer-events-none"
            style={{
              top: 0,
              y: titleY,
              opacity: titleOpacity,
            }}
          >
            <motion.div 
              className="flex gap-[46px] font-['Satoshi',sans-serif] font-black leading-[1.1] whitespace-nowrap capitalize"
              style={{ fontSize: titleFontSize, letterSpacing: titleLetterSpacing }}
            >
              <motion.span style={{ color: selectedColor }}>
                Selected
              </motion.span>
              <span className="text-[#aeaeae]">Work</span>
            </motion.div>
          </motion.div>

          {/* ── PROJECT CARDS ── */}
          <div className="absolute inset-0 z-30">
            {/* Card 1 — Bytkey */}
            <ProjectCard
              project={projects[0]}
              x={c1X}
              cardWidth={c1W}
              cardHeight={c1H}
              cardOpacity={c1Opacity}
              cardY={c1Y}
              textOpacity={c1TextOpacity}
              titleSize={c1TitleSize}
              titleTracking={c1TitleTracking}
              numberSize={c1NumberSize}
              tagSize={c1TagSize}
              borderWidth={c1BorderW}
              titleSectionH={c1TitleH}
              metaPadX={c1MetaPadX}
              metaPadY={c1MetaPadY}
              metaGap={c1MetaGap}
              dividerH={c1DividerH}
              cardPad={c1CardPad}
            />

            {/* Card 2 — Voxworks */}
            <ProjectCard
              project={projects[1]}
              x={c2X}
              cardWidth={c2W}
              cardHeight={c2H}
              cardOpacity={c2Opacity}
              cardY={c2Y}
              textOpacity={c2TextOpacity}
              titleSize={c2TitleSize}
              titleTracking={c2TitleTracking}
              numberSize={c2NumberSize}
              tagSize={c2TagSize}
              borderWidth={c2BorderW}
              titleSectionH={c2TitleH}
              metaPadX={c2MetaPadX}
              metaPadY={c2MetaPadY}
              metaGap={c2MetaGap}
              dividerH={c2DividerH}
              cardPad={c2CardPad}
            />

            {/* Card 3 — Citea */}
            <ProjectCard
              project={projects[2]}
              x={c3X}
              cardWidth={c3W}
              cardHeight={c3H}
              cardOpacity={c3Opacity}
              cardY={c3Y}
              textOpacity={c3TextOpacity}
              titleSize={c3TitleSize}
              titleTracking={c3TitleTracking}
              numberSize={c3NumberSize}
              tagSize={c3TagSize}
              borderWidth={c3BorderW}
              titleSectionH={c3TitleH}
              metaPadX={c3MetaPadX}
              metaPadY={c3MetaPadY}
              metaGap={c3MetaGap}
              dividerH={c3DividerH}
              cardPad={c3CardPad}
            />

            {/* Card 4 — Mineral Mama */}
            <ProjectCard
              project={projects[3]}
              x={c4X}
              cardWidth={c4W}
              cardHeight={c4H}
              cardOpacity={c4Opacity}
              cardY={c4Y}
              textOpacity={c4TextOpacity}
              titleSize={c4TitleSize}
              titleTracking={c4TitleTracking}
              numberSize={c4NumberSize}
              tagSize={c4TagSize}
              borderWidth={c4BorderW}
              titleSectionH={c4TitleH}
              metaPadX={c4MetaPadX}
              metaPadY={c4MetaPadY}
              metaGap={c4MetaGap}
              dividerH={c4DividerH}
              cardPad={c4CardPad}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
