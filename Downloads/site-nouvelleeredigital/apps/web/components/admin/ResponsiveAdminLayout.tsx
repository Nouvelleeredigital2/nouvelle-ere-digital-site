'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Menu, 
  X, 
  Home, 
  Edit3, 
  Image, 
  Settings, 
  Users,
  BarChart3,
  Bell,
  Search,
  User,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ResponsiveAdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

export function ResponsiveAdminLayout({ 
  children, 
  currentPage = 'dashboard',
  className = '' 
}: ResponsiveAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      href: '/admin',
      icon: <Home className="w-5 h-5" />,
      isActive: currentPage === 'dashboard',
    },
    {
      id: 'pages',
      label: 'Pages',
      href: '/admin/pages',
      icon: <Edit3 className="w-5 h-5" />,
      badge: 12,
      isActive: currentPage === 'pages',
    },
    {
      id: 'media',
      label: 'Médias',
      href: '/admin/media',
      icon: <Image className="w-5 h-5" />,
      badge: 156,
      isActive: currentPage === 'media',
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      href: '/admin/users',
      icon: <Users className="w-5 h-5" />,
      isActive: currentPage === 'users',
    },
    {
      id: 'analytics',
      label: 'Analytiques',
      href: '/admin/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      isActive: currentPage === 'analytics',
    },
    {
      id: 'settings',
      label: 'Paramètres',
      href: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
      isActive: currentPage === 'settings',
    },
  ];

  // Gestion de la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implémenter la recherche
      toast.info(`Recherche: "${searchQuery}"`);
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        toast.success('Déconnexion réussie');
        router.push('/login');
      }
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  // Fermer la sidebar sur mobile après navigation
  const handleNavigation = (href: string) => {
    router.push(href);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header mobile */}
      <header className="bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="p-2">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Header desktop */}
      <header className="bg-white border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Administration</h1>
              
              {/* Barre de recherche */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </form>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0 md:inset-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b border-gray-200 md:hidden">
              <h2 className="text-lg font-bold text-gray-900">NED Admin</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors
                    ${item.isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>

            {/* Footer sidebar */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                Nouvelle Ère Digital v1.0
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenu principal */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Footer mobile */}
      <footer className="bg-white border-t border-gray-200 md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>© 2024 Nouvelle Ère Digital</span>
            <span>v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Composant pour les notifications
export function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nouvelle page créée',
      message: 'La page "Services" a été créée avec succès',
      time: 'Il y a 2 minutes',
      type: 'success',
      read: false,
    },
    {
      id: 2,
      title: 'Upload terminé',
      message: '5 images ont été uploadées dans la galerie',
      time: 'Il y a 10 minutes',
      type: 'info',
      read: false,
    },
    {
      id: 3,
      title: 'Sauvegarde automatique',
      message: 'Les modifications de la page "Accueil" ont été sauvegardées',
      time: 'Il y a 30 minutes',
      type: 'info',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}

// Hook pour la gestion responsive
export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return { isMobile, isTablet, isDesktop };
}

// Composant pour les actions rapides
export function QuickActions() {
  const quickActions = [
    {
      id: 'new-page',
      label: 'Nouvelle page',
      icon: <Edit3 className="w-4 h-4" />,
      action: () => toast.info('Créer une nouvelle page'),
    },
    {
      id: 'upload-media',
      label: 'Upload média',
      icon: <Image className="w-4 h-4" />,
      action: () => toast.info('Uploader des médias'),
    },
    {
      id: 'view-site',
      label: 'Voir le site',
      icon: <Home className="w-4 h-4" />,
      action: () => window.open('/', '_blank'),
    },
  ];

  return (
    <div className="flex items-center space-x-2">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          onClick={action.action}
          className="flex items-center space-x-2"
        >
          {action.icon}
          <span className="hidden sm:inline">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
