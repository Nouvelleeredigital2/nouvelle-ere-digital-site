"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { FadeIn } from "@/components/animations";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: `${-currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-8"
                  >
                    <Quote className="w-12 h-12 text-blue-500 mx-auto opacity-50" />
                  </motion.div>

                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic"
                  >
                    &quot;{testimonial.content}&quot;
                  </motion.blockquote>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex items-center justify-center space-x-4"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 active:scale-95 ${
              index === currentIndex
                ? "bg-blue-500 w-8"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevTestimonial}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 hover:-translate-x-0.5"
        aria-label="Témoignage précédent"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 hover:translate-x-0.5"
        aria-label="Témoignage suivant"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({
  title = "Témoignages Clients",
  subtitle = "Ce que disent nos clients",
  testimonials,
}: TestimonialsSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            {subtitle}
          </motion.p>
        </FadeIn>

        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
};
