'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye, 
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: Array<{
    page: string;
    views: number;
    percentage: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  deviceTypes: Array<{
    device: string;
    visitors: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'page_view' | 'user_registration' | 'comment';
    description: string;
    timestamp: string;
    user?: string;
  }>;
}

export default function AnalyticsAdmin() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Remplacer par un vrai appel API
      const mockData: AnalyticsData = {
        totalViews: 12450,
        uniqueVisitors: 8930,
        bounceRate: 42.3,
        avgSessionDuration: '2m 34s',
        topPages: [
          { page: '/accueil', views: 3450, percentage: 27.7 },
          { page: '/services', views: 2100, percentage: 16.9 },
          { page: '/a-propos', views: 1800, percentage: 14.5 },
          { page: '/blog', views: 1650, percentage: 13.2 },
          { page: '/contact', views: 1200, percentage: 9.6 },
        ],
        trafficSources: [
          { source: 'Recherche organique', visitors: 4200, percentage: 47.1 },
          { source: 'Direct', visitors: 2800, percentage: 31.4 },
          { source: 'Réseaux sociaux', visitors: 1200, percentage: 13.4 },
          { source: 'Email', visitors: 480, percentage: 5.4 },
          { source: 'Autres', visitors: 250, percentage: 2.8 },
        ],
        deviceTypes: [
          { device: 'Desktop', visitors: 5200, percentage: 58.2 },
          { device: 'Mobile', visitors: 3200, percentage: 35.8 },
          { device: 'Tablet', visitors: 530, percentage: 5.9 },
        ],
        recentActivity: [
          {
            id: '1',
            type: 'page_view',
            description: 'Page d\'accueil visitée',
            timestamp: '2024-01-20T14:30:00Z',
          },
          {
            id: '2',
            type: 'user_registration',
            description: 'Nouvel utilisateur inscrit',
            timestamp: '2024-01-20T14:25:00Z',
            user: 'john.doe@example.com',
          },
          {
            id: '3',
            type: 'comment',
            description: 'Nouveau commentaire sur "Nos services"',
            timestamp: '2024-01-20T14:20:00Z',
            user: 'marie.martin@example.com',
          },
        ],
      };
      
      setAnalytics(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'page_view':
        return <Eye className="w-4 h-4" />;
      case 'user_registration':
        return <Users className="w-4 h-4" />;
      case 'comment':
        return <MousePointer className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune donnée disponible
          </h3>
          <p className="text-gray-600">
            Les données d'analytics ne sont pas encore disponibles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">
              Analysez les performances et le trafic de votre site
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Dernière mise à jour : {lastUpdated.toLocaleTimeString('fr-FR')}
              </p>
            )}
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Dernière 24h</option>
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">90 derniers jours</option>
            </select>
            
            <Button
              onClick={loadAnalytics}
              variant="outline"
              className="text-gray-600 hover:text-gray-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Vues totales</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Visiteurs uniques</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.uniqueVisitors.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.3%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <MousePointer className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Taux de rebond</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.bounceRate}%</p>
                  <div className="flex items-center text-sm text-red-600">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    +2.1%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Durée moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.avgSessionDuration}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15.2%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques et données détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pages les plus visitées */}
          <Card>
            <CardHeader>
              <CardTitle>Pages les plus visitées</CardTitle>
              <CardDescription>Classement des pages par nombre de vues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-6">
                        #{index + 1}
                      </span>
                      <span className="ml-3 text-sm text-gray-900">
                        {page.page}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${page.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-16 text-right">
                        {page.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sources de trafic */}
          <Card>
            <CardHeader>
              <CardTitle>Sources de trafic</CardTitle>
              <CardDescription>D'où viennent vos visiteurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-900">
                        {source.source}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-16 text-right">
                        {source.visitors.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Types d'appareils et activité récente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Types d'appareils */}
          <Card>
            <CardHeader>
              <CardTitle>Types d'appareils</CardTitle>
              <CardDescription>Répartition par appareil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.deviceTypes.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getDeviceIcon(device.device)}
                      <span className="ml-3 text-sm text-gray-900">
                        {device.device}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-16 text-right">
                        {device.visitors.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur le site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-1 bg-gray-100 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {activity.description}
                      </p>
                      {activity.user && (
                        <p className="text-xs text-gray-500">
                          {activity.user}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(activity.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
