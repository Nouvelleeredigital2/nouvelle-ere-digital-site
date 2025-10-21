'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Settings, 
  Globe, 
  Database, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    siteName: 'Nouvelle Ère Digital',
    siteDescription: 'Votre partenaire digital pour la transformation numérique',
    siteUrl: 'https://nouvelleeredigital.com',
    adminEmail: 'admin@nouvelleeredigital.com',
    timezone: 'Europe/Paris',
    language: 'fr',
    maintenanceMode: false,
    autoSave: true,
    backupFrequency: 'daily',
    maxUploadSize: '10',
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
    seoOptimization: true,
    analyticsEnabled: true,
    commentsEnabled: true,
    registrationEnabled: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      // Recharger les paramètres par défaut
      window.location.reload();
    }
  };

  const settingSections = [
    {
      title: 'Informations générales',
      icon: Globe,
      description: 'Configuration de base du site',
      fields: [
        { key: 'siteName', label: 'Nom du site', type: 'text' },
        { key: 'siteDescription', label: 'Description', type: 'textarea' },
        { key: 'siteUrl', label: 'URL du site', type: 'url' },
        { key: 'adminEmail', label: 'Email administrateur', type: 'email' },
      ]
    },
    {
      title: 'Localisation',
      icon: Globe,
      description: 'Paramètres de langue et de fuseau horaire',
      fields: [
        { key: 'timezone', label: 'Fuseau horaire', type: 'select', options: [
          { value: 'Europe/Paris', label: 'Europe/Paris' },
          { value: 'Europe/London', label: 'Europe/London' },
          { value: 'America/New_York', label: 'America/New_York' },
          { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
        ]},
        { key: 'language', label: 'Langue', type: 'select', options: [
          { value: 'fr', label: 'Français' },
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Español' },
        ]},
      ]
    },
    {
      title: 'Fonctionnalités',
      icon: Settings,
      description: 'Activation/désactivation des fonctionnalités',
      fields: [
        { key: 'maintenanceMode', label: 'Mode maintenance', type: 'checkbox' },
        { key: 'autoSave', label: 'Sauvegarde automatique', type: 'checkbox' },
        { key: 'seoOptimization', label: 'Optimisation SEO', type: 'checkbox' },
        { key: 'analyticsEnabled', label: 'Analytics activées', type: 'checkbox' },
        { key: 'commentsEnabled', label: 'Commentaires activés', type: 'checkbox' },
        { key: 'registrationEnabled', label: 'Inscription activée', type: 'checkbox' },
      ]
    },
    {
      title: 'Médias et uploads',
      icon: Database,
      description: 'Configuration des téléchargements',
      fields: [
        { key: 'maxUploadSize', label: 'Taille max (MB)', type: 'number' },
        { key: 'allowedFileTypes', label: 'Types de fichiers autorisés', type: 'text' },
        { key: 'backupFrequency', label: 'Fréquence des sauvegardes', type: 'select', options: [
          { value: 'hourly', label: 'Horaire' },
          { value: 'daily', label: 'Quotidienne' },
          { value: 'weekly', label: 'Hebdomadaire' },
          { value: 'monthly', label: 'Mensuelle' },
        ]},
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600 mt-1">
              Configurez les paramètres généraux de votre site
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {lastSaved && (
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Sauvegardé à {lastSaved.toLocaleTimeString('fr-FR')}
              </div>
            )}
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="text-gray-600 hover:text-gray-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sections de paramètres */}
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <Card key={sectionIndex}>
                <CardHeader>
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                        
                        {field.type === 'text' && (
                          <input
                            type="text"
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {field.type === 'textarea' && (
                          <textarea
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {field.type === 'email' && (
                          <input
                            type="email"
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {field.type === 'url' && (
                          <input
                            type="url"
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {field.type === 'number' && (
                          <input
                            type="number"
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                        
                        {field.type === 'checkbox' && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings[field.key as keyof typeof settings] as boolean}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                [field.key]: e.target.checked
                              }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              {field.label}
                            </label>
                          </div>
                        )}
                        
                        {field.type === 'select' && field.options && (
                          <select
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alertes importantes */}
        <div className="mt-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-orange-800 mb-2">
                    Paramètres sensibles
                  </h3>
                  <p className="text-orange-700 mb-4">
                    Les modifications de ces paramètres peuvent affecter le fonctionnement de votre site. 
                    Assurez-vous de bien comprendre les conséquences avant de sauvegarder.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-orange-100 text-orange-800">
                      Mode maintenance
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800">
                      Sauvegardes
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800">
                      Uploads
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
