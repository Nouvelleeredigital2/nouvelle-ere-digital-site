"use client";

import Link, { LinkProps } from "next/link";
import { useState } from "react";
import clsx from "clsx";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "À propos",
    children: [
      { label: "Vision & Philosophie", href: "/vision" },
      { label: "Mission & Promesse", href: "/mission" },
      { label: "L'équipe & Les valeurs", href: "/equipe-valeurs" },
      { label: "Engagements & RSE", href: "/engagements-rse" },
      { label: "Chiffres clés", href: "/chiffres-cles" }
    ]
  },
  {
    label: "Nos expertises",
    children: [
      { label: "Communication & Marketing Digital", href: "/communication" },
      { label: "Audiovisuel & Création Multimédia", href: "/audiovisuel" },
      { label: "Événementiel & Technologie Scénique", href: "/evenementiel" },
      { label: "Création Graphique & Design", href: "/design" },
      { label: "Développement Web & Expériences Numériques", href: "/developpement" },
      { label: "Intelligence Artificielle & Innovation", href: "/intelligence-artificielle" },
      { label: "Formations & Accompagnement", href: "/formations" },
      { label: "Méthode & Expérience Client", href: "/methode" }
    ]
  },
  {
    label: "Réalisations",
    children: [
      { label: "Références & Projets", href: "/references" },
      { label: "Études de cas", href: "/etudes-de-cas" },
      { label: "Témoignages clients", href: "/conclusion" },
      { label: "Solutions IA (Showroom IA)", href: "/solutions-ia" }
    ]
  },
  { label: "Blog/Actualités", href: "/blog" },
  {
    label: "Contact",
    children: [
      { label: "Formulaire de contact", href: "/contact" },
      { label: "Demande de démo IA", href: "/sandbox" },
      { label: "Téléchargement de la plaquette", href: "/contact?download=plaquette" }
    ]
  }
];

const NavDropdown = ({ item, mobile = false }: { item: NavItem; mobile?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.href) {
    return (
      <li>
        <Link
          href={item.href}
          className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors font-medium block py-2"
          style={{ textDecoration: 'none' }}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors font-medium flex items-center gap-1 py-2"
      >
        {item.label}
        <svg
          className={clsx("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className={clsx(
          "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg mt-1",
          mobile ? "relative" : "absolute top-full left-0 min-w-48 z-50"
        )}>
          {item.children?.map((child) => (
            <li key={child.href || child.label}>
              {child.href ? (
                <Link
                  href={child.href}
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors font-medium block px-4 py-3 first:rounded-t-lg last:rounded-b-lg hover:bg-zinc-50 dark:hover:bg-zinc-700"
                  style={{ textDecoration: 'none' }}
                >
                  {child.label}
                </Link>
              ) : (
                <span className="text-zinc-600 dark:text-zinc-400 font-medium block px-4 py-3">
                  {child.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const SiteNav = ({ mobile = false }: { mobile?: boolean }) => {
  return (
    <ul
      className={clsx(
        "flex",
        mobile ? "flex-col items-stretch gap-2" : "flex-row gap-6 items-center"
      )}
    >
      {navItems.map((item) => (
        <NavDropdown key={item.label} item={item} mobile={mobile} />
      ))}
    </ul>
  );
};
