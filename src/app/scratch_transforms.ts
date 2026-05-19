import { useTransform, MotionValue } from "framer-motion";

export const createTransforms = (scrollYProgress: MotionValue<number>) => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  // Frame 163 (0.0), Frame 164 (0.15), Frame 165 (0.25), Frame 166 (0.35)
  // Frame 171 (0.45), Frame 171-1 (0.55), Frame 174 (0.65), Frame 175 (0.75)

  // 1. Background Black Wipe
  // My original code uses Solid background color changes. But in Figma, Frame 164 is #f9f9f9, Frame 165 is #0c0c0c.
  // So bg color changes from 0.15 to 0.25.
  
  // 2. Title Text
  const titleFontSize = useTransform(scrollYProgress, [0.25, 0.35], ["132px", "48px"]);
  
  // Left Text: The stuff I'm
  // Frame 163: right edge at -153px -> left: -153px with -translate-x-full means right edge is at -153px? Wait!
  // In Frame 163: `left-[-153px] -translate-x-full` -> right edge is at -153px. So left is -153px - width.
  // In Frame 164/165: `left-[1067px] -translate-x-full` -> right edge is at 1067px.
  // In Frame 166: `left-[1278px] -translate-x-full` -> right edge is at 1278px.
  
  // Right Text: Good at.
  // Frame 163: `left-[2071px]` -> left edge is at 2071px.
  // Frame 164/165: `left-[1090px]` -> left edge is at 1090px.
  // Frame 166: `left-[1295px]` -> left edge is at 1295px.
  
  // Title Top:
  // Frame 164/165: top-[462px] (Left), top-[467px] (Right)
  // Frame 166: top-[378px] (Left), top-[383px] (Right)

  // Title Colors:
  // Left: #2c2c2c in Frame 164 -> #aeaeae in Frame 165
  // Right: #aeaeae in Frame 164 -> #aeaeae in Frame 165
  
  // 3. Skills List
  // Frame 165: top-[1191px]
  // Frame 166: top-[466px]
  // Since it slides up as a block, we can just apply a single `y` transform to a container!
  // 1191px - 466px = 725px.
  // Container starts at Y = 725px (or something) and ends at Y = 0.
  // Actually, absolute `top` from `1191px` to `466px` based on 1080px screen height is `110.27vh` to `43.14vh`.
  // Wait, `466 / 1080 = 43.14vh`.
  
  // 4. Skills Highlight
  // 0.35: all #aeaeae
  // 0.45: Skill 1 white
  // 0.55: Skill 2 white
  // 0.65: Skill 3 white
  // 0.75: Skill 4 white
  
  // 5. Images
  // 0.35 -> 0.45: imgProduct fades in.
  // 0.45 -> 0.55: imgProduct fades out, imgUx fades in.
  // etc.
  
  // 6. Paragraph Text Carousel
  // Top values:
  // 0.45 (Skill 1): Paragraph container at 0px.
  // 0.55 (Skill 2): Paragraph container at -98px.
  // 0.65 (Skill 3): Paragraph container at -194px. (Wait, 0px, -98px, -194px? Actually, the diff is 98px, then 96px?)
  // Let's use precise values from Figma: 0, -96, -192, -288.
}
