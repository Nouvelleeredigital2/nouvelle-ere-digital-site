"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 20,
  className = ""
}: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getDirectionVariants = () => {
    const directions = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance }
    };

    return {
      hidden: {
        opacity: 0,
        ...directions[direction]
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.25, 0.25, 0.75]
        }
      }
    };
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getDirectionVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const SlideUp = ({ children, delay = 0, duration = 0.5, className = "" }: SlideUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScaleIn = ({ children, delay = 0, duration = 0.4, className = "" }: ScaleInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = ""
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.25, 0.25, 0.75] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = "" }: ParallaxProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset * speed);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  );
};

interface FloatingAnimationProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
  className?: string;
}

export const FloatingAnimation = ({
  children,
  intensity = 10,
  speed = 2,
  className = ""
}: FloatingAnimationProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -intensity, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
