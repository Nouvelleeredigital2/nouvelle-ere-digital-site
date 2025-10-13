// apps/web/personas/index.ts
import { artistePersona } from './artiste';
import { architectePersona } from './architecte';
import { strategePersona } from './stratege';
import { innovateurPersona } from './innovateur';
import { connecteurPersona } from './connecteur';

export const personas = [
  artistePersona,
  architectePersona,
  strategePersona,
  innovateurPersona,
  connecteurPersona,
] as const;

export type PersonaId = typeof personas[number]['id'];
