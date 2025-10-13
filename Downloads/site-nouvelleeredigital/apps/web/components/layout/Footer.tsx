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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br from-primary to-secondary">
                N
              </div>
              <div>
                <h3 className="text-lg font-bold">Nouvelle Ère Digital</h3>
                <p className="text-sm text-muted-foreground">Agence créative & technologique</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              De l'idée à l'impact : expériences de marque engageantes, mesurables et humaines.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Stratégie digitale</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Design & UX</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Développement web</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Marketing digital</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@nouvelleeredigital.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Suivez-nous</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {year} Nouvelle Ère Digital. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mentions légales</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Politique de confidentialité</a>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Retour en haut"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

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

  const getFooterStyles = () => {
    return {
      background: `linear-gradient(135deg, ${config.mode === 'dark' ? '#18181b' : '#27272a'}, ${config.mode === 'dark' ? '#0f172a' : '#1e293b'})`,
      borderRadius: config.borderRadius === 'none' ? '0' :
                   config.borderRadius === 'small' ? '0.25rem' :
                   config.borderRadius === 'medium' ? '0.5rem' :
                   config.borderRadius === 'large' ? '0.75rem' : '1rem',
    };
  };

  return (
    <footer className="relative text-white overflow-hidden" style={getFooterStyles()}>
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
            backgroundImage: `radial-gradient(circle at 1px 1px, ${config.primaryColor}30 1px, transparent 0)`,
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
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
                <div>
                  <h3
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{
                      background: `linear-gradient(90deg, ${config.primaryColor}, ${config.secondaryColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Nouvelle Ère Digital
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: config.mode === 'dark' ? '#a1a1aa' : '#d1d5db',
                    }}
                  >
                    Agence créative & technologique
                  </p>
                </div>
              </div>

              <p
                className="leading-relaxed max-w-md"
                style={{
                  color: config.mode === 'dark' ? '#d1d5db' : '#a1a1aa',
                }}
              >
                De l'idée à l'impact : nous créons des expériences de marque engageantes,
                mesurables et humaines. Simplifier, innover et valoriser l'humain dans chaque projet numérique.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3" style={{ color: config.mode === 'dark' ? '#d1d5db' : '#a1a1aa' }}>
                  <Mail size={16} style={{ color: config.primaryColor }} />
                  <span className="text-sm">contact@nouvelleeredigital.fr</span>
                </div>
                <div className="flex items-center space-x-3" style={{ color: config.mode === 'dark' ? '#d1d5db' : '#a1a1aa' }}>
                  <Phone size={16} style={{ color: config.primaryColor }} />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-3" style={{ color: config.mode === 'dark' ? '#d1d5db' : '#a1a1aa' }}>
                  <MapPin size={16} style={{ color: config.primaryColor }} />
                  <span className="text-sm">Paris, France</span>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <h4
                className="text-lg font-semibold"
                style={{ color: config.primaryColor }}
              >
                Navigation
              </h4>
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
                      className="transition-colors duration-300 text-sm flex items-center group"
                      style={{
                        color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = config.primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = config.mode === 'dark' ? '#a1a1aa' : '#6b7280';
                      }}
                    >
                      <span className="w-0 group-hover:w-2 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ backgroundColor: config.primaryColor }} />
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
              <h4
                className="text-lg font-semibold"
                style={{ color: config.primaryColor }}
              >
                Expertises
              </h4>
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
                      className="transition-colors duration-300 text-sm flex items-center group"
                      style={{
                        color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = config.secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = config.mode === 'dark' ? '#a1a1aa' : '#6b7280';
                      }}
                    >
                      <span className="w-0 group-hover:w-2 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ backgroundColor: config.secondaryColor }} />
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
            className="rounded-2xl p-8"
            style={{
              background: `linear-gradient(135deg, ${config.primaryColor}15, ${config.secondaryColor}15)`,
              border: `1px solid ${config.primaryColor}30`,
              borderRadius: config.borderRadius === 'none' ? '0' :
                           config.borderRadius === 'small' ? '0.25rem' :
                           config.borderRadius === 'medium' ? '0.5rem' :
                           config.borderRadius === 'large' ? '0.75rem' : '1rem',
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4
                className="text-2xl font-bold mb-4"
                style={{ color: config.primaryColor }}
              >
                Restons en contact
              </h4>
              <p
                className="mb-6"
                style={{
                  color: config.mode === 'dark' ? '#d1d5db' : '#6b7280',
                }}
              >
                Recevez nos dernières actualités, tendances et insights du numérique
              </p>
              <div className="text-center">
                <p
                  className="mb-4"
                  style={{
                    color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280',
                  }}
                >
                  📧 contact@nouvelleeredigital.fr
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: config.primaryColor,
                    color: '#ffffff',
                    borderRadius: config.borderRadius === 'none' ? '0' :
                                 config.borderRadius === 'small' ? '0.25rem' :
                                 config.borderRadius === 'medium' ? '0.5rem' :
                                 config.borderRadius === 'large' ? '0.75rem' : '1rem',
                  }}
                  onClick={() => window.location.href = 'mailto:contact@nouvelleeredigital.fr'}
                >
                  Nous contacter
                </motion.button>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Social Links & Legal */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8" style={{ borderTop: `1px solid ${config.mode === 'dark' ? '#3f3f46' : '#e4e4e7'}` }}>
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${config.mode === 'dark' ? '#ffffff' : '#000000'}15`,
                    color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280',
                    borderRadius: config.borderRadius === 'none' ? '0' :
                                 config.borderRadius === 'small' ? '0.25rem' :
                                 config.borderRadius === 'medium' ? '0.5rem' :
                                 config.borderRadius === 'large' ? '0.75rem' : '1rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${config.primaryColor}30`;
                    e.currentTarget.style.color = config.primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${config.mode === 'dark' ? '#ffffff' : '#000000'}15`;
                    e.currentTarget.style.color = config.mode === 'dark' ? '#a1a1aa' : '#6b7280';
                  }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <nav className="flex gap-6 text-sm" style={{ color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280' }}>
                <a href="#" className="hover:text-white transition-colors" style={{ color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280' }}>Mentions légales</a>
                <a href="#" className="hover:text-white transition-colors" style={{ color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280' }}>Confidentialité</a>
                <a href="#" className="hover:text-white transition-colors" style={{ color: config.mode === 'dark' ? '#a1a1aa' : '#6b7280' }}>CGV</a>
              </nav>
              <p className="text-sm" style={{ color: config.mode === 'dark' ? '#6b7280' : '#9ca3af' }}>© {year} Nouvelle Ère Digital. Tous droits réservés.</p>
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
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-40 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: config.primaryColor,
          borderRadius: config.borderRadius === 'none' ? '0' :
                       config.borderRadius === 'small' ? '0.25rem' :
                       config.borderRadius === 'medium' ? '0.5rem' :
                       config.borderRadius === 'large' ? '0.75rem' : '1rem',
        }}
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
