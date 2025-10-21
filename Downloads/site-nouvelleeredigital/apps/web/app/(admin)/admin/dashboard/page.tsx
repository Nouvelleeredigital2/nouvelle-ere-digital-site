'use client';

import { useState, useEffect } from 'react';
import { ResponsiveAdminLayout } from '@/components/admin/ResponsiveAdminLayout';
import { PersonaSelector } from '@/components/admin/PersonaSelector';
import { AdvancedMediaManager } from '@/components/admin/AdvancedMediaManager';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Image, 
  Eye, 
  Edit3,
  BarChart3,
  Settings,
  Palette,
  Upload,
  Activity,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalMedia: number;
  totalUsers: number;
  siteViews: number;
  recentActivity: Array<{
    id: string;
    type: 'page_created' | 'page_updated' | 'media_uploaded' | 'user_registered';
    title: string;
    timestamp: string;
    user: string;
  }>;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'personas' | 'media'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalMedia: 0,
    totalUsers: 0,
    siteViews: 0,
    recentActivity: [],
  });

  // Charger les statistiques
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Charger les statistiques des pages
        const pagesResponse = await fetch('/api/pages');
        const pagesData = await pagesResponse.json();
        
        // Charger les statistiques des médias
        const mediaResponse = await fetch('/api/media');
        const mediaData = await mediaResponse.json();
        
        // Charger les statistiques des utilisateurs
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();

        setStats({
          totalPages: pagesData.length || 0,
          publishedPages: pagesData.filter((p: any) => p.status === 'PUBLISHED').length || 0,
          draftPages: pagesData.filter((p: any) => p.status === 'DRAFT').length || 0,
          totalMedia: mediaData.media?.length || mediaData.length || 0,
          totalUsers: usersData.length || 0,
          siteViews: 0, // À implémenter avec analytics
          recentActivity: [
            {
              id: '1',
              type: 'page_created',
              title: 'Page "Services" créée',
              timestamp: 'Il y a 2 heures',
              user: 'Admin',
            },
            {
              id: '2',
              type: 'media_uploaded',
              title: '5 images uploadées',
              timestamp: 'Il y a 4 heures',
              user: 'Admin',
            },
            {
              id: '3',
              type: 'page_updated',
              title: 'Page "Accueil" mise à jour',
              timestamp: 'Il y a 6 heures',
              user: 'Admin',
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        toast.error('Erreur lors du chargement des statistiques');
      }
    };

    loadStats();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'personas', label: 'Personas & Thèmes', icon: <Palette className="w-4 h-4" /> },
    { id: 'media', label: 'Gestion des Médias', icon: <Image className="w-4 h-4" /> },
  ];

  const quickActions = [
    {
      id: 'new-page',
      title: 'Nouvelle page',
      description: 'Créer une nouvelle page',
      icon: <Edit3 className="w-6 h-6" />,
      color: 'bg-blue-500',
      href: '/admin/studio/new',
    },
    {
      id: 'upload-media',
      title: 'Upload média',
      description: 'Ajouter des images ou vidéos',
      icon: <Upload className="w-6 h-6" />,
      color: 'bg-green-500',
      href: '/admin/media',
    },
    {
      id: 'view-site',
      title: 'Voir le site',
      description: 'Prévisualiser le site public',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-purple-500',
      href: '/',
      external: true,
    },
    {
      id: 'settings',
      title: 'Paramètres',
      description: 'Configurer le site',
      icon: <Settings className="w-6 h-6" />,
      color: 'bg-gray-500',
      href: '/admin/settings',
    },
  ];

  return (
    <ResponsiveAdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">
              Gérez votre site et surveillez les performances
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-green-500" />
              <span>En ligne</span>
            </Badge>
          </div>
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Actions rapides */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Card key={action.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`${action.color} p-3 rounded-lg text-white`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Statistiques */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pages totales</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalPages}</p>
                        <p className="text-xs text-gray-500">
                          {stats.publishedPages} publiées, {stats.draftPages} brouillons
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Médias</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalMedia}</p>
                        <p className="text-xs text-gray-500">Images et vidéos</p>
                      </div>
                      <Image className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                        <p className="text-xs text-gray-500">Comptes créés</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Vues du site</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.siteViews}</p>
                        <p className="text-xs text-gray-500">Ce mois</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Activité récente */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activité récente</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">
                            {activity.user} • {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'personas' && (
          <div>
            <PersonaSelector 
              showPreview={true}
              className="max-w-none"
            />
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <AdvancedMediaManager />
          </div>
        )}
      </div>
    </ResponsiveAdminLayout>
  );
}
