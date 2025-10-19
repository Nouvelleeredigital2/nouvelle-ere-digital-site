'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  FileText,
  Folder,
  FolderOpen,
  MoreVertical
} from 'lucide-react';

interface PageNode {
  id: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email: string;
  };
  children?: PageNode[];
  level: number;
  parentId?: string;
}

interface PageHierarchyProps {
  onPageSelect?: (page: PageNode) => void;
  selectedPageId?: string;
  showActions?: boolean;
}

export default function PageHierarchy({ 
  onPageSelect, 
  selectedPageId, 
  showActions = true 
}: PageHierarchyProps) {
  const [pages, setPages] = useState<PageNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par un vrai appel API
      const mockPages: PageNode[] = [
        {
          id: '1',
          slug: 'accueil',
          title: 'Page d\'accueil',
          status: 'PUBLISHED',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z',
          author: { name: 'Admin', email: 'admin@example.com' },
          level: 0,
          children: [
            {
              id: '1-1',
              slug: 'accueil/hero',
              title: 'Section Hero',
              status: 'PUBLISHED',
              createdAt: '2024-01-15T10:00:00Z',
              updatedAt: '2024-01-20T14:30:00Z',
              author: { name: 'Admin', email: 'admin@example.com' },
              level: 1,
              parentId: '1'
            }
          ]
        },
        {
          id: '2',
          slug: 'a-propos',
          title: 'À propos',
          status: 'DRAFT',
          createdAt: '2024-01-16T09:00:00Z',
          updatedAt: '2024-01-18T16:45:00Z',
          author: { name: 'Admin', email: 'admin@example.com' },
          level: 0,
          children: [
            {
              id: '2-1',
              slug: 'a-propos/equipe',
              title: 'Notre équipe',
              status: 'PUBLISHED',
              createdAt: '2024-01-16T09:00:00Z',
              updatedAt: '2024-01-18T16:45:00Z',
              author: { name: 'Admin', email: 'admin@example.com' },
              level: 1,
              parentId: '2'
            },
            {
              id: '2-2',
              slug: 'a-propos/histoire',
              title: 'Notre histoire',
              status: 'DRAFT',
              createdAt: '2024-01-16T09:00:00Z',
              updatedAt: '2024-01-18T16:45:00Z',
              author: { name: 'Admin', email: 'admin@example.com' },
              level: 1,
              parentId: '2'
            }
          ]
        },
        {
          id: '3',
          slug: 'services',
          title: 'Nos services',
          status: 'PUBLISHED',
          createdAt: '2024-01-17T11:00:00Z',
          updatedAt: '2024-01-19T13:20:00Z',
          author: { name: 'Admin', email: 'admin@example.com' },
          level: 0,
          children: [
            {
              id: '3-1',
              slug: 'services/web',
              title: 'Développement Web',
              status: 'PUBLISHED',
              createdAt: '2024-01-17T11:00:00Z',
              updatedAt: '2024-01-19T13:20:00Z',
              author: { name: 'Admin', email: 'admin@example.com' },
              level: 1,
              parentId: '3'
            },
            {
              id: '3-2',
              slug: 'services/mobile',
              title: 'Applications Mobile',
              status: 'PUBLISHED',
              createdAt: '2024-01-17T11:00:00Z',
              updatedAt: '2024-01-19T13:20:00Z',
              author: { name: 'Admin', email: 'admin@example.com' },
              level: 1,
              parentId: '3'
            }
          ]
        },
        {
          id: '4',
          slug: 'blog',
          title: 'Blog',
          status: 'PUBLISHED',
          createdAt: '2024-01-18T08:00:00Z',
          updatedAt: '2024-01-19T10:30:00Z',
          author: { name: 'Admin', email: 'admin@example.com' },
          level: 0
        }
      ];
      
      setPages(mockPages);
    } catch (error) {
      console.error('Erreur lors du chargement des pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      DRAFT: { label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
      REVIEW: { label: 'En révision', color: 'bg-yellow-100 text-yellow-800' },
      SCHEDULED: { label: 'Programmé', color: 'bg-blue-100 text-blue-800' },
      PUBLISHED: { label: 'Publié', color: 'bg-green-100 text-green-800' },
      ARCHIVED: { label: 'Archivé', color: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const renderNode = (node: PageNode) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedPageId === node.id;
    const indentLevel = node.level * 20;

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer group ${
            isSelected 
              ? 'bg-primary/20 text-primary' 
              : 'hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${indentLevel + 12}px` }}
          onClick={() => onPageSelect?.(node)}
        >
          {/* Indentation et icônes */}
          <div className="flex items-center mr-2">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}
            
            <div className="mr-2">
              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-blue-600" />
                ) : (
                  <Folder className="w-4 h-4 text-blue-600" />
                )
              ) : (
                <FileText className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>

          {/* Contenu de la page */}
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{node.title}</span>
                {getStatusBadge(node.status)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                /{node.slug}
              </div>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/studio/${node.slug}`}>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Edit3 className="w-3 h-3" />
                  </Button>
                </Link>
                
                <Link href={`/${node.slug}`} target="_blank">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                </Link>
                
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Rendu récursif des enfants */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Chargement de l'arborescence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Arborescence des pages</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle page
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg p-2 max-h-96 overflow-y-auto">
        {pages.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune page créée</p>
          </div>
        ) : (
          pages.map(page => renderNode(page))
        )}
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {pages.reduce((acc, page) => acc + (page.children?.length || 0) + 1, 0)}
          </div>
          <div className="text-xs text-gray-600">Total pages</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {pages.reduce((acc, page) => {
              let count = page.status === 'PUBLISHED' ? 1 : 0;
              if (page.children) {
                count += page.children.filter(child => child.status === 'PUBLISHED').length;
              }
              return acc + count;
            }, 0)}
          </div>
          <div className="text-xs text-gray-600">Publiées</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {pages.reduce((acc, page) => {
              let count = page.status === 'DRAFT' ? 1 : 0;
              if (page.children) {
                count += page.children.filter(child => child.status === 'DRAFT').length;
              }
              return acc + count;
            }, 0)}
          </div>
          <div className="text-xs text-gray-600">Brouillons</div>
        </div>
      </div>
    </div>
  );
}
