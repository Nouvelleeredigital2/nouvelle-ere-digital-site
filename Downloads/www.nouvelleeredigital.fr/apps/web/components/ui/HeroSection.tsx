"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeIn, FloatingAnimation } from "@/components/animations";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export const HeroSection = ({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingAnimation className="absolute top-20 left-10 opacity-20">
          <div className="w-32 h-32 bg-white/10 rounded-full blur-xl" />
        </FloatingAnimation>
        <FloatingAnimation className="absolute top-40 right-20 opacity-15" intensity={15} speed={3}>
          <div className="w-24 h-24 bg-blue-400/20 rounded-full blur-lg" />
        </FloatingAnimation>
        <FloatingAnimation className="absolute bottom-20 left-1/4 opacity-10" intensity={20} speed={4}>
          <div className="w-40 h-40 bg-purple-400/15 rounded-full blur-2xl" />
        </FloatingAnimation>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <FadeIn delay={0.2} className="mb-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm uppercase tracking-wide text-white/80 mb-4 font-medium"
          >
            {subtitle}
          </motion.p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            {title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.8,
                  ease: [0.25, 0.25, 0.25, 0.75]
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          >
            {primaryButton && (
              <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4">
                <a href={primaryButton.href}>{primaryButton.text}</a>
              </Button>
            )}
            {secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4"
              >
                <a href={secondaryButton.href}>{secondaryButton.text}</a>
              </Button>
            )}
          </motion.div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
