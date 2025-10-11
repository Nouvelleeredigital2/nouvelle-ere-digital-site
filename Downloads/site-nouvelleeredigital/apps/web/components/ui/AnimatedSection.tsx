"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FadeIn, Parallax, FloatingAnimation } from "@/components/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "dark" | "light" | "animated";
  backgroundImage?: string;
  parallaxSpeed?: number;
  showFloatingElements?: boolean;
}

export const AnimatedSection = ({
  children,
  className = "",
  variant = "default",
  backgroundImage,
  parallaxSpeed = 0.3,
  showFloatingElements = false
}: AnimatedSectionProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900";
      case "dark":
        return "bg-zinc-900 text-white";
      case "light":
        return "bg-gray-50 dark:bg-zinc-800";
      case "animated":
        return "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden";
      default:
        return "bg-white dark:bg-zinc-900";
    }
  };

  return (
    <section className={`relative py-20 ${getVariantClasses()} ${className}`}>
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <Parallax speed={parallaxSpeed}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </Parallax>
      )}

      {/* Animated Background for 'animated' variant */}
      {variant === "animated" && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <FloatingAnimation className="absolute top-10 left-10 opacity-20" intensity={20} speed={4}>
            <div className="w-32 h-32 bg-blue-400/30 rounded-full blur-3xl" />
          </FloatingAnimation>
          <FloatingAnimation className="absolute top-20 right-20 opacity-15" intensity={25} speed={5}>
            <div className="w-40 h-40 bg-purple-400/25 rounded-full blur-2xl" />
          </FloatingAnimation>
          <FloatingAnimation className="absolute bottom-10 left-1/4 opacity-10" intensity={30} speed={6}>
            <div className="w-24 h-24 bg-pink-400/20 rounded-full blur-xl" />
          </FloatingAnimation>

          {/* Animated grid pattern */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      )}

      {/* Floating Elements */}
      {showFloatingElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingAnimation className="absolute top-1/4 left-1/4 opacity-10">
            <div className="w-2 h-2 bg-white rounded-full" />
          </FloatingAnimation>
          <FloatingAnimation className="absolute top-1/3 right-1/3 opacity-8" intensity={15}>
            <div className="w-3 h-3 bg-blue-400 rounded-full" />
          </FloatingAnimation>
          <FloatingAnimation className="absolute bottom-1/3 left-1/2 opacity-12" intensity={10}>
            <div className="w-1 h-1 bg-purple-400 rounded-full" />
          </FloatingAnimation>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
}

export const SectionHeader = ({
  title,
  subtitle,
  description,
  align = "center",
  size = "md"
}: SectionHeaderProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  const sizeClasses = {
    sm: {
      title: "text-2xl md:text-3xl",
      subtitle: "text-lg",
      description: "text-base"
    },
    md: {
      title: "text-3xl md:text-4xl lg:text-5xl",
      subtitle: "text-xl md:text-2xl",
      description: "text-lg"
    },
    lg: {
      title: "text-4xl md:text-5xl lg:text-6xl",
      subtitle: "text-2xl md:text-3xl",
      description: "text-xl"
    }
  };

  return (
    <FadeIn className={`mb-16 ${alignClasses[align]}`}>
      <div className={`max-w-4xl ${align === "center" ? "mx-auto" : ""}`}>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4 font-medium`}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`font-bold text-gray-900 dark:text-white mb-6 ${sizeClasses[size].title}`}
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl ${align === "center" ? "mx-auto" : ""} ${sizeClasses[size].description}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </FadeIn>
  );
};
