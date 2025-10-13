// apps/web/personas/index.ts
import { artistePersona } from './artiste';
import { architectePersona } from './architecte';
import { strategePersona } from './stratege';
import { innovateurPersona } from './innovateur';
import { connecteurPersona } from './connecteur';
import { minimalistePersona, colorePersona, professionnelPersona, gamerPersona, artisanPersona } from './nouveaux-personas';

export const personas = [
  artistePersona,
  architectePersona,
  strategePersona,
  innovateurPersona,
  connecteurPersona,
  minimalistePersona,
  colorePersona,
  professionnelPersona,
  gamerPersona,
  artisanPersona,
] as const;

export type PersonaId = typeof personas[number]['id'];
