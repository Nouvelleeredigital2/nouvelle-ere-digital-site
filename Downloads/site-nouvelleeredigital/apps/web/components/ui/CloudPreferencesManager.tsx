"use client";

import React, { useState, useEffect } from 'react';
import { useCloudSync } from '@/services/cloud-sync';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Cloud, CloudOff, Download, Upload, Wifi, WifiOff, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CloudPreferencesManager() {
  const { savePreferences, loadPreferences, getStatus, exportData, importData } = useCloudSync();
  const [syncStatus, setSyncStatus] = useState(getStatus());
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Mettre à jour le statut de connexion périodiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(getStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSyncNow = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Simuler une synchronisation avec les préférences actuelles
      const result = await savePreferences({
        personaId: localStorage.getItem('creative-persona') || 'default',
        preferences: {
          timestamp: new Date().toISOString()
        }
      });

      if (result.success) {
        setLastSync(new Date().toISOString());
        setMessage({ type: 'success', text: 'Préférences synchronisées avec succès !' });
      } else {
        setMessage({ type: 'error', text: `Erreur de synchronisation: ${result.error}` });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur inconnue lors de la synchronisation'
      });
    }

    setIsLoading(false);
  };

  const handleExport = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `preferences-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Sauvegarde exportée avec succès !' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de l\'export'
      });
    }

    setIsLoading(false);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const result = await importData(text);

      if (result.success) {
        setMessage({ type: 'success', text: 'Préférences importées avec succès !' });
      } else {
        setMessage({ type: 'error', text: `Erreur d'import: ${result.error}` });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de l\'import'
      });
    }

    setIsLoading(false);
    event.target.value = ''; // Reset l'input
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Gestion des Préférences Cloud</h1>
        <p className="text-muted-foreground">
          Synchronisez vos préférences de personas entre vos appareils
        </p>
      </div>

      {/* Statut de connexion */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {syncStatus.online ? (
              <Wifi className="w-6 h-6 text-green-500" />
            ) : (
              <WifiOff className="w-6 h-6 text-red-500" />
            )}
            <div>
              <h3 className="font-semibold">Statut de Connexion</h3>
              <p className="text-sm text-muted-foreground">
                {syncStatus.online ? 'Connecté' : 'Hors ligne'} •
                {syncStatus.hasApi ? ' Service Cloud Actif' : ' Mode Local Seulement'}
              </p>
            </div>
          </div>

          <Badge variant={syncStatus.online ? "default" : "destructive"}>
            {syncStatus.online ? "En ligne" : "Hors ligne"}
          </Badge>
        </div>
      </Card>

      {/* Actions principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <Cloud className="w-8 h-8 mx-auto mb-3 text-blue-500" />
          <h3 className="font-semibold mb-2">Synchronisation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sauvegardez vos préférences dans le cloud
          </p>
          <Button
            onClick={handleSyncNow}
            disabled={isLoading || !syncStatus.online}
            className="w-full"
          >
            {isLoading ? 'Synchronisation...' : 'Synchroniser Maintenant'}
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <Download className="w-8 h-8 mx-auto mb-3 text-green-500" />
          <h3 className="font-semibold mb-2">Exporter</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Téléchargez vos préférences en fichier
          </p>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isLoading}
            className="w-full"
          >
            Exporter les Données
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <Upload className="w-8 h-8 mx-auto mb-3 text-purple-500" />
          <h3 className="font-semibold mb-2">Importer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Chargez des préférences depuis un fichier
          </p>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            <Button variant="outline" className="w-full" disabled={isLoading}>
              {isLoading ? 'Importation...' : 'Importer un Fichier'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Messages de statut */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={cn(
              "p-4 flex items-center gap-3",
              message.type === 'success' && "bg-green-50 border-green-200 text-green-800",
              message.type === 'error' && "bg-red-50 border-red-200 text-red-800",
              message.type === 'info' && "bg-blue-50 border-blue-200 text-blue-800"
            )}>
              {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {message.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {message.type === 'info' && <AlertCircle className="w-5 h-5" />}
              <span className="flex-1">{message.text}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessage(null)}
              >
                ✕
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Informations de synchronisation */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Informations de Synchronisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Dernière synchronisation:</p>
            <p className="font-medium">
              {lastSync ? new Date(lastSync).toLocaleString() : 'Jamais'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Mode de fonctionnement:</p>
            <p className="font-medium">
              {syncStatus.online
                ? (syncStatus.hasApi ? 'Cloud + Local' : 'Local uniquement')
                : 'Hors ligne (Local)'
              }
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 En mode hors ligne, vos préférences sont sauvegardées localement et seront synchronisées
            automatiquement lorsque la connexion sera rétablie.
          </p>
        </div>
      </Card>

      {/* Fonctionnalités avancées */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Fonctionnalités Avancées</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
            <div>
              <p className="font-medium">Synchronisation automatique</p>
              <p className="text-sm text-muted-foreground">
                Vos préférences sont sauvegardées automatiquement à chaque changement
              </p>
            </div>
            <Badge variant="outline">Activé</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
            <div>
              <p className="font-medium">Sauvegarde multi-appareils</p>
              <p className="text-sm text-muted-foreground">
                Accédez à vos préférences depuis tous vos appareils connectés
              </p>
            </div>
            <Badge variant={syncStatus.hasApi ? "default" : "outline"}>
              {syncStatus.hasApi ? "Activé" : "Local uniquement"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
            <div>
              <p className="font-medium">Historique des modifications</p>
              <p className="text-sm text-muted-foreground">
                Consultez l'historique de vos changements de préférences
              </p>
            </div>
            <Button variant="outline" size="sm">
              Voir l'historique
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
