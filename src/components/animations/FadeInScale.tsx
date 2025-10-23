"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface FadeInScaleProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
}

export default function FadeInScale({
  children,
  delay = 0,
  duration = 0.8,
  scale = 0.8,
  className = "",
}: FadeInScaleProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: scale,
        y: 30,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
            }
          : {
              opacity: 0,
              scale: scale,
              y: 30,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
