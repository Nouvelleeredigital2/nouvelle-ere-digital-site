# Dockerfile pour Nouvelle Ère Digital
FROM node:18-alpine AS base

# Installer les dépendances système nécessaires
RUN apk add --no-cache libc6-compat
RUN apk update

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (nécessaire pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM node:18-alpine AS runner

WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis l'étape de build
COPY --from=base /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT 3001
ENV NODE_ENV production

# Démarrer l'application
CMD ["node", "server.js"]
