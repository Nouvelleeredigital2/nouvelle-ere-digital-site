// apps/web/personas/index.ts
import { artistePersona } from "./artiste";
import { architectePersona } from "./architecte";
import { strategePersona } from "./stratege";
import { innovateurPersona } from "./innovateur";
import { connecteurPersona } from "./connecteur";
import { minimalistePersona } from "./minimaliste";
import { naturelPersona } from "./naturel";
// Temporairement commenté pour se concentrer sur les 7 personas de base
// import {
//   colorePersona,
//   professionnelPersona,
//   gamerPersona,
//   artisanPersona,
// } from "./nouveaux-personas";

export const personas = [
  artistePersona,
  architectePersona,
  strategePersona,
  innovateurPersona,
  connecteurPersona,
  minimalistePersona,
  naturelPersona,
  // Temporairement commenté pour se concentrer sur les 7 personas de base
  // colorePersona,
  // professionnelPersona,
  // gamerPersona,
  // artisanPersona,
] as const;

export type PersonaId = (typeof personas)[number]["id"];
