# Dockerfile pour Nouvelle Ère Digital
# Multi-stage build pour optimiser la taille de l'image

# Stage 1: Base image avec Node.js
FROM node:18-alpine AS base

# Installer les dépendances système nécessaires
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 2: Dépendances
FROM base AS deps

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer toutes les dépendances (dev + prod pour le build)
RUN npm ci

# Stage 3: Build
FROM base AS builder

WORKDIR /app

# Copier les dépendances
COPY --from=deps /app/node_modules ./node_modules

# Copier le code source
COPY . ./

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Générer le client Prisma
RUN npx prisma generate

# Build de l'application
RUN npm run build

# Stage 4: Runner
FROM base AS runner

WORKDIR /app

# Variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers publics
COPY --from=builder /app/public ./public

# Copier les fichiers de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copier les fichiers Prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Copier le package.json pour les scripts
COPY --from=builder /app/package.json ./package.json

# Créer le dossier pour la base de données
RUN mkdir -p /app/prisma && chown nextjs:nodejs /app/prisma

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Changer vers l'utilisateur non-root
USER nextjs

# Commande de démarrage
CMD ["node", "server.js"]