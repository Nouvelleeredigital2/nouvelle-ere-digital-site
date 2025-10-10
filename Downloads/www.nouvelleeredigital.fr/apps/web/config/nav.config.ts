export type NavLink = {
  label: string;
  href: string;
  group?: string;
  external?: boolean;
};

// Navigation registry consumed by `SiteNav`
export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Sandbox", href: "/sandbox", group: "Marketing" },
  { label: "GitHub", href: "https://github.com", external: true },
];
