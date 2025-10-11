"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from "lucide-react";

/** Site footer with legal and socials placeholders */
export function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { label: "À propos", href: "/vision" },
    { label: "Nos expertises", href: "/expertises" },
    { label: "Réalisations", href: "/references" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const services = [
    { label: "Communication digitale", href: "/communication" },
    { label: "Audiovisuel", href: "/audiovisuel" },
    { label: "Événementiel", href: "/evenementiel" },
    { label: "Développement web", href: "/developpement" },
    { label: "Intelligence artificielle", href: "/intelligence-artificielle" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
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
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <Container className="relative py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
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
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                >
                  N
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Nouvelle Ère Digital
                  </h3>
                  <p className="text-gray-400 text-sm">Agence créative & technologique</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-md">
                De l'idée à l'impact : nous créons des expériences de marque engageantes,
                mesurables et humaines. Simplifier, innover et valoriser l'humain dans chaque projet numérique.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-sm">contact@nouvelleeredigital.fr</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone size={16} className="text-blue-400" />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={16} className="text-blue-400" />
                  <span className="text-sm">Paris, France</span>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Services */}
          <FadeIn delay={0.3}>
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Expertises</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                      {service.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Newsletter Signup */}
        <FadeIn delay={0.4} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/20"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold text-white mb-4">
                Restons en contact
              </h4>
              <p className="text-gray-300 mb-6">
                Recevez nos dernières actualités, tendances et insights du numérique
              </p>
              <div className="text-center">
                <p className="text-gray-400 mb-4">📧 contact@nouvelleeredigital.fr</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg"
                  onClick={() => window.location.href = 'mailto:contact@nouvelleeredigital.fr'}
                >
                  Nous contacter
                </motion.button>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Social Links & Legal */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-zinc-700">
          <FadeIn delay={0.5}>
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <nav className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">CGV</a>
              </nav>
              <p className="text-sm text-gray-500">© {year} Nouvelle Ère Digital. Tous droits réservés.</p>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-brand-600 hover:bg-brand-700 rounded-full flex items-center justify-center text-white shadow-lg z-40 hover:scale-110 active:scale-95"
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
