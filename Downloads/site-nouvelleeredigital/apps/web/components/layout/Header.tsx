"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SiteNav } from "./SiteNav";
import { Button } from "../ui/Button";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-lg"
            : "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md"
        } border-b border-gray-200/50 dark:border-zinc-700/50`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
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
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="group flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  N
                </motion.div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Nouvelle Ère
                  </span>
                  <span className="block text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Digital
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hidden lg:block"
            >
              <SiteNav />
            </motion.nav>

            {/* Desktop CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:flex items-center gap-4"
            >
              <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-105 active:scale-95 transition-transform">
                Nous rejoindre
              </Button>
              <Button variant="primary" size="sm" className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform">
                Démarrer un projet
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors hover:scale-105 active:scale-95"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="lg:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <SiteNav mobile />
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
                  <Button variant="ghost" size="sm" className="justify-start">
                    Nous rejoindre
                  </Button>
                  <Button variant="primary" size="sm" className="bg-brand-600 hover:bg-brand-700 text-white">
                    Démarrer un projet
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};
