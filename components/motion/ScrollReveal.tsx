"use client";
import { motion, useAnimation, useInView, type MotionProps } from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";

type Props = PropsWithChildren<MotionProps & { once?: boolean; delay?: number }>;

export default function ScrollReveal({ children, once = true, delay = 0, ...rest }: Props) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.12, once });

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
