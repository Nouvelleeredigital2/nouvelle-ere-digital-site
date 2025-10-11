"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn, ScaleIn } from "@/components/animations";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  features?: string[];
  index?: number;
}

export const ServiceCard = ({
  title,
  description,
  icon,
  image,
  features = [],
  index = 0
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.1} direction="up" distance={30}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-zinc-800"
      >
        {/* Background Image */}
        {image && (
          <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
               style={{ backgroundImage: `url(${image})` }} />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />

        <div className="relative p-8">
          {/* Icon */}
          {icon && (
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-gradient-to-br from-brand-800 to-brand-900 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg"
            >
              {icon}
            </motion.div>
          )}

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>

            {/* Features */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 pt-4"
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-brand-500 rounded-full" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Hover Effect Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 to-brand-800 origin-left"
          />
        </div>
      </motion.div>
    </FadeIn>
  );
};

interface ServiceGridProps {
  services: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
    image?: string;
    features?: string[];
  }>;
  columns?: 2 | 3;
}

export const ServiceGrid = ({ services, columns = 3 }: ServiceGridProps) => {
  return (
    <div className={`grid gap-8 ${columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} index={index} />
      ))}
    </div>
  );
};
