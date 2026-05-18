import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Highly precise Newton-Raphson cubic-bezier curve solver.
 * Maps an input progress t (0 to 1) to an eased output progress (0 to 1)
 * based on control points (p1x, p1y) and (p2x, p2y).
 */
export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function(t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    // Newton-Raphson iteration to solve for x(t)
    let x = t;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * Math.pow(1 - x, 2) * x * p1x + 3 * (1 - x) * Math.pow(x, 2) * p2x + Math.pow(x, 3) - t;
      const derivative = 3 * Math.pow(1 - x, 2) * p1x + 6 * (1 - x) * x * (p2x - p1x) + 3 * Math.pow(x, 2) * (1 - p2x);
      
      if (Math.abs(currentX) < 1e-6) break;
      x -= currentX / derivative;
    }

    return 3 * Math.pow(1 - x, 2) * x * p1y + 3 * (1 - x) * Math.pow(x, 2) * p2y + Math.pow(x, 3);
  };
}

// Pre-defined Figma bezier ease: cubic-bezier(0.65, 0.03, 0.33, 0.97)
export const figmaEase = cubicBezier(0.65, 0.03, 0.33, 0.97);
