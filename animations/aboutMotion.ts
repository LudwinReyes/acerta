import { Variants } from "motion/react";
import { useScroll, useTransform, MotionValue } from "motion/react";

export const aboutHeaderStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const aboutWordReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export const textSlideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 20, duration: 1.2 }
  }
};

export const imageSlideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 20, duration: 1.2 }
  }
};

export const pillStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const pillReveal: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export function useAboutParallax(scrollYProgress: MotionValue<number>, distance: number) {
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}
