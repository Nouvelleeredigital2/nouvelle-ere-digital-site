"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  features?: string[];
  index?: number;
}

export const ServiceCard = ({
  title,
  description,
  icon,
  features = [],
  index = 0
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-border"
    >
      <div className="relative p-6">
        {/* Icon */}
        {icon && (
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
          >
            <span className="text-xl">{icon}</span>
          </motion.div>
        )}

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">
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
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Hover Effect Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 w-full h-1 bg-primary origin-left"
        />
      </div>
    </motion.div>
  );
};

interface ServiceGridProps {
  services: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
    features?: string[];
  }>;
  columns?: 2 | 3;
}

export const ServiceGrid = ({ services, columns = 3 }: ServiceGridProps) => {
  return (
    <div className={`grid gap-6 ${columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} index={index} />
      ))}
    </div>
  );
};
