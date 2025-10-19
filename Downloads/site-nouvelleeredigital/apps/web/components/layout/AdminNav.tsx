'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  Edit3, 
  Image, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Users,
  BarChart3,
  Palette,
  Database,
  Shield,
  Globe,
  Plus,
  List,
  Eye,
  Trash2,
  Archive
} from 'lucide-react';

interface AdminNavProps {
  currentPath?: string;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: any;
  children?: NavigationItem[];
  badge?: string;
}

export function AdminNav({ currentPath = '' }: AdminNavProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  const navigation: NavigationItem[] = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Studio', 
      href: '/admin/studio', 
      icon: Edit3,
      badge: 'Nouveau'
    },
    { 
      name: 'Contenu', 
      icon: FileText,
      children: [
        { name: 'Pages', href: '/admin/pages', icon: List },
        { name: 'Blog', href: '/admin/blog', icon: FileText },
        { name: 'Nouvel article', href: '/admin/blog/new', icon: Plus },
        { name: 'Services', href: '/admin/services', icon: Settings },
        { name: 'Nouveau service', href: '/admin/services/new', icon: Plus },
      ]
    },
    { 
      name: 'Médias', 
      href: '/admin/media', 
      icon: Image 
    },
    { 
      name: 'Analytics', 
      icon: BarChart3,
      children: [
        { name: 'Tableau de bord', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Pages vues', href: '/admin/analytics/pages', icon: Eye },
        { name: 'Utilisateurs', href: '/admin/analytics/users', icon: Users },
      ]
    },
    { 
      name: 'Système', 
      icon: Database,
      children: [
        { name: 'Utilisateurs', href: '/admin/users', icon: Users },
        { name: 'Rôles', href: '/admin/roles', icon: Shield },
        { name: 'Paramètres', href: '/admin/settings', icon: Settings },
        { name: 'Sauvegardes', href: '/admin/backups', icon: Archive },
        { name: 'Logs', href: '/admin/logs', icon: FileText },
      ]
    },
    { 
      name: 'Apparence', 
      icon: Palette,
      children: [
        { name: 'Thèmes', href: '/admin/themes', icon: Palette },
        { name: 'Personnalisation', href: '/admin/customization', icon: Globe },
        { name: 'Templates', href: '/admin/templates', icon: LayoutDashboard },
      ]
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erreur de déconnexion');
      }

      toast.success('Déconnexion réussie');
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const toggleDropdown = (itemName: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(itemName)) {
      newOpenDropdowns.delete(itemName);
    } else {
      // Fermer tous les autres dropdowns avant d'ouvrir celui-ci
      newOpenDropdowns.clear();
      newOpenDropdowns.add(itemName);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const handleDropdownHover = (itemName: string) => {
    setHoveredDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    setHoveredDropdown(null);
  };

  // Fermer les dropdowns quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdowns(new Set());
        setHoveredDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(href);
  };

  const isParentActive = (item: NavigationItem) => {
    if (item.href) {
      return isActive(item.href);
    }
    if (item.children) {
      return item.children.some(child => child.href && isActive(child.href));
    }
    return false;
  };

  const renderNavigationItem = (item: NavigationItem, isMobile = false) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = isMobile ? openDropdowns.has(item.name) : (openDropdowns.has(item.name) || hoveredDropdown === item.name);
    const active = isParentActive(item);

    if (hasChildren) {
      return (
        <div 
          key={item.name} 
          className={`relative dropdown-container ${!isMobile ? 'group' : ''}`}
          onMouseEnter={() => !isMobile && handleDropdownHover(item.name)}
          onMouseLeave={() => !isMobile && handleDropdownLeave()}
        >
          <button
            onClick={() => isMobile && toggleDropdown(item.name)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              active
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-muted-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center">
              <Icon className="w-4 h-4 mr-2" />
              {item.name}
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className={`${
              isMobile 
                ? 'ml-4 mt-1' 
                : 'absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-xl z-[100] opacity-0 group-hover:opacity-100 transition-opacity duration-200'
            } ${isMobile ? '' : 'pointer-events-none group-hover:pointer-events-auto'}`}>
              <div className="py-1">
                {item.children!.map((child) => {
                  const ChildIcon = child.icon;
                  return (
                    <Link
                      key={child.name}
                      href={child.href!}
                      onClick={() => {
                        if (isMobile) {
                          setMobileMenuOpen(false);
                        } else {
                          setOpenDropdowns(new Set());
                          setHoveredDropdown(null);
                        }
                      }}
                      className={`flex items-center px-4 py-2 text-sm transition-colors ${
                        isActive(child.href!)
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ChildIcon className="w-4 h-4 mr-3" />
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href!}
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive(item.href!)
            ? 'bg-primary/20 text-primary'
            : 'text-muted-foreground hover:text-muted-foreground hover:bg-muted'
        }`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {item.name}
        {item.badge && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <LayoutDashboard className="w-5 h-5 text-card-foreground" />
              </div>
              <span className="text-xl font-bold text-muted-foreground">Administration</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => renderNavigationItem(item))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="hidden md:flex"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>

            {/* Menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-muted-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => renderNavigationItem(item, true))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-muted-foreground hover:bg-muted"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
