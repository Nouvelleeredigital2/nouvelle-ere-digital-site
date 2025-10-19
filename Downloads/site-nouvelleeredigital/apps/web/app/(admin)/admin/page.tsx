'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminNav } from '@/components/layout/AdminNav';
import { Button } from '@/components/ui/Button';
import { 
  Edit3, 
  Image, 
  FileText, 
  Settings, 
  Eye,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

interface PageStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalMedia: number;
  totalServices: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<PageStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalMedia: 0,
    totalServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Charger les statistiques depuis l'API
        const [pagesResponse, mediaResponse, servicesResponse] = await Promise.all([
          fetch('/api/pages'),
          fetch('/api/media?limit=1'),
          fetch('/api/services'),
        ]);

        const pagesData = pagesResponse.ok ? await pagesResponse.json() : [];
        const mediaData = mediaResponse.ok ? await mediaResponse.json() : { pagination: { total: 0 } };
        const servicesData = servicesResponse.ok ? await servicesResponse.json() : [];

        setStats({
          totalPages: pagesData.length || 0,
          publishedPages: pagesData.filter((p: any) => p.status === 'PUBLISHED').length || 0,
          draftPages: pagesData.filter((p: any) => p.status === 'DRAFT').length || 0,
          totalMedia: mediaData.pagination?.total || 0,
          totalServices: servicesData.length || 0,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const quickActions = [
    {
      title: 'Créer une nouvelle page',
      description: 'Commencer à éditer une nouvelle page',
      href: '/admin/studio',
      icon: Edit3,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Gérer les médias',
      description: 'Uploader et organiser vos fichiers',
      href: '/admin/media',
      icon: Image,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Gérer le blog',
      description: 'Créer et publier des articles',
      href: '/admin/blog',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'Gérer les services',
      description: 'Configurer vos services',
      href: '/admin/services',
      icon: Settings,
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  const statCards = [
    {
      title: 'Pages totales',
      value: stats.totalPages,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pages publiées',
      value: stats.publishedPages,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Brouillons',
      value: stats.draftPages,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Médias',
      value: stats.totalMedia,
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav currentPath="/admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Gérez votre site web depuis cette interface d'administration
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.href}>
                  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${action.color} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Informations système */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations système</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Version</h3>
              <p className="text-gray-900">1.0.0</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Environnement</h3>
              <p className="text-gray-900">{process.env.NODE_ENV || 'development'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Dernière mise à jour</h3>
              <p className="text-gray-900">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}