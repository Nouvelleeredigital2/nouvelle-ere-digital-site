"use client";

import React from 'react';
import { useCreativePersona } from '@/components/context/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { Heart, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

interface AdaptiveFooterProps {
  className?: string;
}

export function AdaptiveFooter({ className }: AdaptiveFooterProps) {
  const { persona } = useCreativePersona();

  // Adapter le footer selon le style du persona
  const footerStyle = persona.settings.styles.borderRadius;
  const layoutStyle = persona.settings.layouts.sections;

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Communication Digitale", href: "/services/communication" },
        { label: "Audiovisuel", href: "/services/audiovisuel" },
        { label: "Événementiel", href: "/services/evenementiel" },
        { label: "Design & UX", href: "/services/design" },
        { label: "Développement Web", href: "/services/developpement" },
        { label: "Intelligence Artificielle", href: "/services/ia" },
      ]
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Équipe", href: "/equipe" },
        { label: "Carrières", href: "/carrieres" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
        { label: "Presse", href: "/presse" },
      ]
    },
    {
      title: "Ressources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Support", href: "/support" },
        { label: "Formation", href: "/formation" },
        { label: "Études de cas", href: "/cas" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "API", href: "/api" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@nouvelle-ere.digital" },
    { icon: Phone, text: "+33 1 23 45 67 89" },
    { icon: MapPin, text: "Paris, France" },
  ];

  const getFooterClasses = () => {
    const baseClasses = 'bg-card border-t border-border';

    switch (layoutStyle) {
      case 'symmetrical-grid':
        return cn(baseClasses, 'py-12');
      case 'asymmetrical-masonry':
        return cn(baseClasses, 'py-16 bg-gradient-to-br from-background to-muted/20');
      case 'single-column':
        return cn(baseClasses, 'py-8');
      case 'magazine-layout':
        return cn(baseClasses, 'py-20');
      case 'card-grid':
        return cn(baseClasses, 'py-12');
      default:
        return cn(baseClasses, 'py-12');
    }
  };

  const getSectionClasses = () => {
    switch (layoutStyle) {
      case 'symmetrical-grid':
        return 'grid grid-cols-1 md:grid-cols-3 gap-8';
      case 'asymmetrical-masonry':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr';
      case 'single-column':
        return 'space-y-8';
      case 'magazine-layout':
        return 'grid grid-cols-1 md:grid-cols-2 gap-12';
      case 'card-grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-3 gap-8';
    }
  };

  return (
    <footer className={cn(getFooterClasses(), className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section principale */}
        <div className={getSectionClasses()}>
          {footerSections.map((section, index) => (
            <Card
              key={section.title}
              className={cn(
                'p-6',
                layoutStyle === 'asymmetrical-masonry' && index === 0 && 'row-span-2',
                layoutStyle === 'magazine-layout' && index === 0 && 'md:col-span-2'
              )}
            >
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="justify-start h-auto p-0 text-muted-foreground hover:text-foreground"
                    >
                      <a href={link.href}>{link.label}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          {/* Section contact et réseaux sociaux */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Nous contacter
            </h3>

            <div className="space-y-3 mb-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <info.icon className="w-4 h-4" />
                  <span>{info.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.href}
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Section finale avec copyright et informations légales */}
        <div className={cn(
          'mt-12 pt-8 border-t border-border',
          layoutStyle === 'single-column' ? 'text-center' : 'flex flex-col sm:flex-row justify-between items-center gap-4'
        )}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 Nouvelle Ère Digital.</span>
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>pour l'innovation</span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" asChild>
              <a href="/mentions-legales">Mentions légales</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/politique-confidentialite">Confidentialité</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/cookies">Cookies</a>
            </Button>
          </div>

          {/* Indicateur du style de footer */}
          <div className="text-xs text-muted-foreground/50">
            Layout: {layoutStyle} • Persona: {persona.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
