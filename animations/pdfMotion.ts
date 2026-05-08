import { Variants } from "motion/react";

export const pdfModalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const pdfModalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

export const paperSlideVariant: Variants = {
  hidden: { y: 150, opacity: 0, rotateX: 20 },
  visible: { 
    y: 0, 
    opacity: 1, 
    rotateX: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 }
  }
};

export const scannerBeamVariant: Variants = {
  hidden: { top: "0%" },
  scanning: {
    top: ["0%", "100%", "0%"],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};
