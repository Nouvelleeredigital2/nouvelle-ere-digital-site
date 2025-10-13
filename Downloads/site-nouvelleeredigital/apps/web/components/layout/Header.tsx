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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br from-primary to-secondary">
              N
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nouvelle Ère
              </span>
              <span className="block text-sm font-medium text-muted-foreground">Digital</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <SiteNav />
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Découvrir Nos Services
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm"
            >
              <div className="py-4 space-y-4">
                <SiteNav />
                <div className="px-4">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Découvrir Nos Services
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
      boxShadow: scrolled ? `0 4px 6px -1px ${config.primaryColor}20` : 'none',
      borderBottom: `1px solid ${config.mode === 'dark' ? '#3f3f46' : '#e4e4e7'}80`,
      borderRadius: scrolled ? '0' : config.borderRadius === 'none' ? '0' :
                   config.borderRadius === 'small' ? '0.25rem' :
                   config.borderRadius === 'medium' ? '0.5rem' :
                   config.borderRadius === 'large' ? '0.75rem' : '1rem',
      transition: 'all 0.5s ease',
    };
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
        className="fixed top-0 left-0 w-full z-50"
        style={getHeaderStyles()}
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
              backgroundImage: `radial-gradient(circle at 1px 1px, ${config.primaryColor}30 1px, transparent 0)`,
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`,
                    borderRadius: config.borderRadius === 'none' ? '0' :
                                 config.borderRadius === 'small' ? '0.25rem' :
                                 config.borderRadius === 'medium' ? '0.5rem' :
                                 config.borderRadius === 'large' ? '0.75rem' : '1rem',
                  }}
                >
                  N
                </motion.div>
                <div className="hidden sm:block">
                  <span
                    className="text-xl font-bold bg-clip-text text-transparent"
                    style={{
                      background: `linear-gradient(90deg, ${config.primaryColor}, ${config.secondaryColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: config.bodyFont === 'inter' ? 'Inter, sans-serif' :
                                 config.bodyFont === 'roboto' ? 'Roboto, sans-serif' :
                                 config.bodyFont === 'playfair' ? 'Playfair Display, serif' : 'JetBrains Mono, monospace',
                    }}
                  >
                    Nouvelle Ère
                  </span>
                  <span
                    className="block text-sm font-medium"
                    style={{
                      color: config.mode === 'dark' ? '#a1a1aa' : '#52525b',
                      fontFamily: config.bodyFont === 'inter' ? 'Inter, sans-serif' :
                                 config.bodyFont === 'roboto' ? 'Roboto, sans-serif' :
                                 config.bodyFont === 'playfair' ? 'Playfair Display, serif' : 'JetBrains Mono, monospace',
                    }}
                  >
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
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 active:scale-95 transition-transform"
                style={{
                  color: config.mode === 'dark' ? '#a1a1aa' : '#52525b',
                  borderColor: config.primaryColor,
                }}
              >
                Nous rejoindre
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="hover:scale-105 active:scale-95 transition-transform"
              >
                Démarrer un projet
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:scale-105 active:scale-95"
              style={{
                backgroundColor: config.mode === 'dark' ? '#27272a' : '#f4f4f5',
                color: config.mode === 'dark' ? '#a1a1aa' : '#52525b',
                borderRadius: config.borderRadius === 'none' ? '0' :
                             config.borderRadius === 'small' ? '0.25rem' :
                             config.borderRadius === 'medium' ? '0.5rem' :
                             config.borderRadius === 'large' ? '0.75rem' : '1rem',
              }}
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
              className="lg:hidden overflow-hidden"
              style={{
                backgroundColor: config.mode === 'dark' ? '#18181b' : '#ffffff',
                borderTop: `1px solid ${config.mode === 'dark' ? '#3f3f46' : '#e4e4e7'}`,
              }}
            >
              <div className="px-4 py-6 space-y-4">
                <SiteNav mobile />
                <div className="flex flex-col gap-3 pt-4 border-t" style={{ borderColor: config.mode === 'dark' ? '#3f3f46' : '#e4e4e7' }}>
                  <Button variant="ghost" size="sm" className="justify-start">
                    Nous rejoindre
                  </Button>
                  <Button variant="primary" size="sm">
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
