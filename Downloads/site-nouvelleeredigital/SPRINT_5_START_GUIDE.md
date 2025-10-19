# 🚀 Guide de Démarrage - Sprint 5

## 🎯 Vue d'ensemble du Sprint 5

Le **Sprint 5** transforme votre éditeur visuel en une plateforme professionnelle complète avec des fonctionnalités avancées de gestion de contenu, d'IA et de collaboration.

---

## 📋 Préparation de l'Environnement

### **1. Mise à jour des Dépendances**
```bash
# Frontend avancées
npm install @tanstack/react-query framer-motion @monaco-editor/react chart.js react-chartjs-2

# Backend et base de données
npm install @prisma/client prisma @next-auth/prisma-adapter next-auth bcryptjs jsonwebtoken

# IA et automatisation
npm install openai @ai-sdk/provider @ai-sdk/react

# Sécurité et performance
npm install @next/bundle-analyzer compression helmet rate-limiter-flexible

# Tests et qualité
npm install jest @testing-library/react cypress storybook
```

### **2. Configuration de la Base de Données**
```typescript
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(EDITOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  pages     Page[]
  comments  Comment[]
  sessions  Session[]
}

model Page {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     Json     // Structure des blocs
  status      Status   @default(DRAFT)
  publishedAt DateTime?
  authorId    String

  // SEO et métadonnées
  metaTitle       String?
  metaDescription String?
  tags           Tag[]

  // Relations
  author    User     @relation(fields: [authorId], references: [id])
  comments  Comment[]
  versions  Version[]

  @@map("pages")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  color String?

  // Relations
  pages Page[]
}

model Comment {
  id      String   @id @default(cuid())
  content String
  authorId String
  pageId   String
  parentId String? // Pour les commentaires imbriqués

  // Relations
  author User @relation(fields: [authorId], references: [id])
  page   Page @relation(fields: [pageId], references: [id])
}

model Version {
  id      String   @id @default(cuid())
  content Json
  pageId   String
  authorId String
  message  String?
  createdAt DateTime @default(now())

  // Relations
  page   Page @relation(fields: [pageId], references: [id])
  author User @relation(fields: [authorId], references: [id])
}

enum Role {
  ADMIN
  EDITOR
  CONTRIBUTOR
  VIEWER
}

enum Status {
  DRAFT
  REVIEW
  PUBLISHED
  ARCHIVED
}
```

### **3. Configuration NextAuth.js**
```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from '@/lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});
```

---

## 🛠️ Implémentation des Fonctionnalités

### **1. Système de Gestion de Contenu (CMS)**

#### **Gestion des Pages Avancée**
```typescript
// lib/cms/page-manager.ts
export class PageManager {
  static async createPage(data: CreatePageData) {
    return await prisma.page.create({
      data: {
        ...data,
        content: JSON.stringify(data.content),
        tags: {
          connectOrCreate: data.tags?.map(tag => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  static async publishPage(pageId: string, publishDate?: Date) {
    return await prisma.page.update({
      where: { id: pageId },
      data: {
        status: 'PUBLISHED',
        publishedAt: publishDate || new Date(),
      },
    });
  }

  static async searchPages(query: string, filters?: PageFilters) {
    return await prisma.page.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
        status: filters?.status,
        tags: filters?.tags ? { some: { name: { in: filters.tags } } } : undefined,
      },
      include: {
        author: true,
        tags: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
```

#### **Système de Recherche**
```typescript
// components/cms/SearchPanel.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchPanelProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export function SearchPanel({ onSearch }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const debouncedQuery = useMemo(() => {
    const timer = setTimeout(() => {
      onSearch(query, {
        tags: selectedTags,
        status: statusFilter !== 'all' ? statusFilter as Status : undefined,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedTags, statusFilter]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans le contenu..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="DRAFT">Brouillons</option>
          <option value="PUBLISHED">Publiés</option>
          <option value="REVIEW">En révision</option>
        </select>
      </div>

      {/* Filtres par tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-600">Tags:</span>
        {selectedTags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            {tag}
            <button onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
```

### **2. Intelligence Artificielle**

#### **Génération de Contenu**
```typescript
// lib/ai/content-generator.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ContentGenerator {
  static async generateTitle(content: string, tone: 'professional' | 'casual' | 'creative' = 'professional') {
    const prompt = `Génère un titre accrocheur et SEO-friendly pour le contenu suivant. Ton: ${tone}.

Contenu: ${content.substring(0, 500)}...`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
    });

    return response.choices[0]?.message?.content?.trim();
  }

  static async generateDescription(title: string, keywords: string[]) {
    const prompt = `Rédige une meta description optimisée SEO (150-160 caractères) pour cette page.

Titre: ${title}
Mots-clés: ${keywords.join(', ')}

La description doit être accrocheuse et contenir les mots-clés principaux.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content?.trim();
  }

  static async suggestImages(title: string, content: string) {
    const prompt = `Suggère 3 idées d'images pour illustrer ce contenu. Réponds uniquement avec les suggestions.

Titre: ${title}
Contenu: ${content.substring(0, 300)}...`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content?.split('\n').filter(Boolean);
  }
}
```

#### **SEO Automatique**
```typescript
// lib/seo/analyzer.ts
export class SEOAnalyzer {
  static analyzeContent(content: string, title: string) {
    const issues = [];
    const suggestions = [];

    // Analyse de la longueur du titre
    if (title.length < 30) {
      issues.push('Titre trop court (< 30 caractères)');
      suggestions.push('Augmentez la longueur du titre pour un meilleur SEO');
    } else if (title.length > 60) {
      issues.push('Titre trop long (> 60 caractères)');
      suggestions.push('Raccourcissez le titre pour éviter la troncature');
    }

    // Analyse de la densité des mots-clés
    const words = content.toLowerCase().split(/\s+/);
    const titleWords = title.toLowerCase().split(/\s+/);

    const keywordDensity = titleWords.reduce((acc, word) => {
      const count = words.filter(w => w.includes(word)).length;
      return acc + count;
    }, 0) / words.length;

    if (keywordDensity < 0.01) {
      issues.push('Densité de mots-clés faible');
      suggestions.push('Intégrez plus naturellement les mots-clés principaux');
    }

    // Analyse des balises de structure
    const hasH1 = content.includes('<h1') || content.includes('# ');
    const hasH2 = content.includes('<h2') || content.includes('## ');

    if (!hasH1) {
      issues.push('Aucun titre H1 détecté');
      suggestions.push('Ajoutez un titre principal (H1) pour structurer le contenu');
    }

    if (!hasH2) {
      suggestions.push('Ajoutez des sous-titres (H2) pour améliorer la lisibilité');
    }

    return { issues, suggestions, score: this.calculateSEOScore(issues, suggestions) };
  }

  static calculateSEOScore(issues: string[], suggestions: string[]) {
    const maxScore = 100;
    const issuePenalty = issues.length * 10;
    const suggestionPenalty = suggestions.length * 2;

    return Math.max(0, maxScore - issuePenalty - suggestionPenalty);
  }
}
```

### **3. Système de Collaboration**

#### **Gestion des Commentaires**
```typescript
// components/cms/CommentSystem.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, Reply, Heart } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author: { name: string; avatar?: string };
  createdAt: Date;
  parentId?: string;
  likes: number;
  replies?: Comment[];
}

interface CommentSystemProps {
  pageId: string;
  comments: Comment[];
}

export function CommentSystem({ pageId, comments }: CommentSystemProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    await fetch(`/api/pages/${pageId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: newComment,
        parentId: replyingTo,
      }),
    });

    setNewComment('');
    setReplyingTo(null);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="flex gap-3">
        <img
          src={comment.author.avatar || '/default-avatar.png'}
          alt={comment.author.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <button className="flex items-center gap-1 hover:text-indigo-600">
              <Heart className="w-3 h-3" />
              {comment.likes}
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 hover:text-indigo-600"
              >
                <Reply className="w-3 h-3" />
                Répondre
              </button>
            )}
          </div>

          {comment.replies?.map(reply => renderComment(reply, true))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">
          Commentaires ({comments.length})
        </h3>
      </div>

      {/* Nouveau commentaire */}
      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Écrivez un commentaire..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmitComment}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Publier
          </button>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-6">
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
}
```

---

## 🚀 Démarrage du Sprint 5

### **Commandes de Développement**
```bash
# Installation des dépendances avancées
npm install

# Configuration de la base de données
npx prisma generate
npx prisma db push

# Démarrage en mode développement
npm run dev

# Tests
npm run test
npm run cypress:open
```

### **Première Fonctionnalité à Implémenter**
1. ✅ **Système de gestion des pages** avec métadonnées
2. 🔄 **Recherche avancée** dans le contenu
3. 🎯 **Génération de contenu IA** pour les suggestions

---

## 🎯 Prochaines Étapes

Vous êtes maintenant prêt à développer les fonctionnalités avancées de votre plateforme ! 

**Le Sprint 5 va transformer votre éditeur en une solution professionnelle complète.**

**Que souhaitez-vous implémenter en premier ?**
1. **📄 Gestion avancée des pages** (recommandé)
2. **🤖 Génération de contenu IA**
3. **👥 Système de collaboration**

**Tapez votre choix pour commencer !** 🚀
