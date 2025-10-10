export type AppRoute = {
  id: string;
  path: string;
  title: string;
  description?: string;
};

// Central route registry
export const routes: AppRoute[] = [
  { id: "home", path: "/", title: "Accueil", description: "Page d'accueil" },
  { id: "sandbox", path: "/sandbox", title: "Sandbox", description: "Catalogue UI" },
];
