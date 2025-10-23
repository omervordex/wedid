"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: threshold,
  });

  return { ref, isInView };
};

export const useScrollAnimationStagger = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    amount: threshold,
  });

  return { ref, isInView };
};
