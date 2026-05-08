import { Variants } from "motion/react";

export const menuClipPath: Variants = {
  closed: {
    clipPath: "circle(0% at 90% 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    }
  },
  open: {
    clipPath: "circle(150% at 90% 40px)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    }
  }
};

export const menuStagger: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const menuItemReveal: Variants = {
  closed: { 
    y: 100, 
    opacity: 0, 
    rotate: 5,
    transition: {
      y: { stiffness: 1000 }
    }
  },
  open: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      type: "spring",
      bounce: 0.3
    }
  }
};

export const secondaryStagger: Variants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.5 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const secondaryReveal: Variants = {
  closed: { 
    y: 20, 
    opacity: 0 
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0
    }
  }
};
