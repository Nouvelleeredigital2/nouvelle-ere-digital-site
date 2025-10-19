import { Block } from './blocks'

// Types avancés pour la hiérarchie des pages
export interface PageNode {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  parentId?: string | null
  children?: PageNode[]
  level: number
  path: string
  order: number
}

// Types pour la gestion des menus
export interface MenuItem {
  id: string
  label: string
  url: string
  target?: '_blank' | '_self'
  children?: MenuItem[]
  pageId?: string
  customUrl?: string
  isActive?: boolean
}

export interface Menu {
  id: string
  name: string
  location: 'header' | 'footer' | 'sidebar'
  items: MenuItem[]
  isActive: boolean
}

// Types pour la gestion des utilisateurs avancés
export interface UserRole {
  id: string
  name: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR' | 'CONTRIBUTOR'
  permissions: Permission[]
  description: string
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: 'pages' | 'users' | 'media' | 'analytics' | 'settings'
  actions: ('create' | 'read' | 'update' | 'delete' | 'publish')[]
}

// Types pour les analytics de base
export interface PageView {
  id: string
  pageId: string
  pageSlug: string
  pageTitle: string
  userAgent?: string
  ipAddress?: string
  referrer?: string
  country?: string
  city?: string
  timestamp: Date
  sessionId?: string
  userId?: string
}

export interface AnalyticsSummary {
  totalViews: number
  uniqueVisitors: number
  averageTimeOnPage: number
  topPages: Array<{
    pageId: string
    pageTitle: string
    views: number
    percentage: number
  }>
  recentViews: PageView[]
  viewsByDay: Array<{
    date: string
    views: number
  }>
}

// Types pour la médiathèque
export interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  alt?: string
  caption?: string
  uploadedBy: string
  uploadedAt: Date
  folder?: string
  tags?: string[]
  isPublic: boolean
}

export interface MediaFolder {
  id: string
  name: string
  parentId?: string
  children?: MediaFolder[]
  fileCount: number
}

// Types pour le versioning des pages
export interface PageVersion {
  id: string
  pageId: string
  version: number
  title: string
  slug: string
  content: Block[]
  seoMetadata?: {
    metaTitle?: string
    metaDescription?: string
    canonicalUrl?: string
    ogImage?: string
    ogTitle?: string
    ogDescription?: string
    twitterCard?: string
    twitterImage?: string
    twitterTitle?: string
    twitterDescription?: string
  }
  createdBy: string
  createdAt: Date
  message?: string
  isCurrent: boolean
  isPublished: boolean
}

// Types pour les templates de page
export interface PageTemplate {
  id: string
  name: string
  description: string
  thumbnail?: string
  category: 'landing' | 'blog' | 'portfolio' | 'corporate' | 'ecommerce' | 'custom'
  blocks: Block[]
  settings?: {
    headerStyle?: 'default' | 'centered' | 'split'
    footerStyle?: 'default' | 'minimal' | 'extended'
    sidebarEnabled?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  }
}

// Utilitaires pour la hiérarchie
export class PageHierarchy {
  static buildTree(pages: PageNode[]): PageNode[] {
    const map = new Map<string, PageNode>()
    const roots: PageNode[] = []

    // Créer une map de tous les nœuds
    pages.forEach(page => {
      map.set(page.id, { ...page, children: [] })
    })

    // Construire la hiérarchie
    pages.forEach(page => {
      const node = map.get(page.id)!
      if (page.parentId) {
        const parent = map.get(page.parentId)
        if (parent) {
          parent.children!.push(node)
          node.level = parent.level + 1
          node.path = `${parent.path}/${page.slug}`
        }
      } else {
        roots.push(node)
        node.level = 0
        node.path = `/${page.slug}`
      }
    })

    // Trier par ordre
    const sortChildren = (nodes: PageNode[]) => {
      nodes.sort((a, b) => a.order - b.order)
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          sortChildren(node.children)
        }
      })
    }

    sortChildren(roots)
    return roots
  }

  static flattenTree(nodes: PageNode[], level = 0): PageNode[] {
    const result: PageNode[] = []
    nodes.forEach(node => {
      result.push({ ...node, level })
      if (node.children && node.children.length > 0) {
        result.push(...this.flattenTree(node.children, level + 1))
      }
    })
    return result
  }
}

// Utilitaires pour les menus
export class MenuBuilder {
  static buildFromPages(pages: PageNode[], maxDepth = 3): MenuItem[] {
    const tree = PageHierarchy.buildTree(pages)
    return this.pagesToMenuItems(tree, maxDepth)
  }

  private static pagesToMenuItems(pages: PageNode[], maxDepth: number, currentDepth = 0): MenuItem[] {
    if (currentDepth >= maxDepth) return []

    return pages
      .filter(page => page.status === 'published')
      .map(page => ({
        id: page.id,
        label: page.title,
        url: page.path,
        pageId: page.id,
        children: page.children ?
          this.pagesToMenuItems(page.children, maxDepth, currentDepth + 1) :
          undefined
      }))
  }
}
