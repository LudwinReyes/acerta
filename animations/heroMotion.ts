import { Variants } from "motion/react";

export const floatingBackgroundVariants: Variants = {
  animate: {
    y: [0, 30, -20, 0],
    x: [0, -20, 20, 0],
    rotate: [0, 10, -10, 0],
    scale: [1, 1.05, 0.95, 1],
    transition: {
      duration: 15,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

export const floatingBackgroundVariants2: Variants = {
  animate: {
    y: [0, -30, 20, 0],
    x: [0, 20, -20, 0],
    rotate: [0, -10, 10, 0],
    scale: [1, 0.95, 1.05, 1],
    transition: {
      duration: 18,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    } 
  }
};

export const springUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 150
    }
  }
};

export const imageSlideIn: Variants = {
  hidden: { opacity: 0, x: 100, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 80,
      delay: 0.4
    } 
  }
};
