"use client";

import { motion } from "framer-motion";
import { useScrollAnimationStagger } from "@/lib/useScrollAnimation";

interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function StaggerReveal({
  children,
  staggerDelay = 0.1,
  direction = "up",
  className = "",
}: StaggerRevealProps) {
  const { ref, isInView } = useScrollAnimationStagger();

  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
