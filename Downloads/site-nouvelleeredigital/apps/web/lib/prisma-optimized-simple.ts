// Requêtes Prisma optimisées simplifiées

export async function optimizedPageQueries() {
  // Fonction simplifiée pour les requêtes de pages
  return {
    findMany: async (prisma: any) => {
      return await prisma.page.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    },
    
    findBySlug: async (prisma: any, slug: string) => {
      return await prisma.page.findUnique({
        where: { slug },
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
  };
}

export async function optimizedServiceQueries() {
  // Fonction simplifiée pour les requêtes de services
  return {
    findMany: async (prisma: any) => {
      return await prisma.service.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    
    findById: async (prisma: any, id: string) => {
      return await prisma.service.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
  };
}

export async function optimizedMediaQueries() {
  // Fonction simplifiée pour les requêtes de médias
  return {
    findMany: async (prisma: any) => {
      return await prisma.media.findMany({
        select: {
          id: true,
          filename: true,
          originalName: true,
          mimeType: true,
          size: true,
          url: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
  };
}

export async function optimizedUserQueries() {
  // Fonction simplifiée pour les requêtes d'utilisateurs
  return {
    findMany: async (prisma: any) => {
      return await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
  };
}
