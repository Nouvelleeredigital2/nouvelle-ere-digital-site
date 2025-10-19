'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  Clock,
  User,
  GitCompare,
  RotateCcw,
  Eye,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { formatVersionDate, compareVersions, type VersionData } from '@/lib/version-utils';

interface VersionHistoryProps {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VersionHistory({ slug, isOpen, onClose }: VersionHistoryProps) {
  const [versions, setVersions] = useState<VersionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparingVersions, setComparingVersions] = useState<[VersionData, VersionData] | null>(null);

  // Charger l'historique des versions
  useEffect(() => {
    if (isOpen && slug) {
      loadVersions();
    }
  }, [isOpen, slug]);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pages/${slug}/versions`);
      if (response.ok) {
        const data = await response.json();
        setVersions(data.versions || []);
      }
    } catch (error) {
      console.error('Erreur chargement versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVersionSelect = (versionNumber: number) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionNumber)) {
        return prev.filter(v => v !== versionNumber);
      } else if (prev.length < 2) {
        return [...prev, versionNumber];
      } else {
        return [prev[1], versionNumber];
      }
    });
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      const [v1, v2] = selectedVersions;
      const version1 = versions.find(v => v.version === v1);
      const version2 = versions.find(v => v.version === v2);

      if (version1 && version2) {
        setComparingVersions([version1, version2]);
        setShowComparison(true);
      }
    }
  };

  const handleRestore = async (versionNumber: number) => {
    if (!confirm(`Êtes-vous sûr de vouloir restaurer la version ${versionNumber} ? Cette action créera une nouvelle version avec l'état actuel.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/pages/${slug}/versions/${versionNumber}/restore`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restoredBy: 'current-user', // À remplacer par l'utilisateur connecté
        }),
      });

      if (response.ok) {
        // Recharger les versions et fermer le modal
        await loadVersions();
        alert('Version restaurée avec succès !');
      } else {
        alert('Erreur lors de la restauration');
      }
    } catch (error) {
      console.error('Erreur restauration:', error);
      alert('Erreur lors de la restauration');
    }
  };

  const handleCleanup = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer les anciennes versions ? Seules les 10 dernières seront conservées.')) {
      return;
    }

    try {
      const response = await fetch(`/api/pages/${slug}/versions/cleanup`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        await loadVersions();
        alert(`${data.deletedCount} anciennes versions supprimées.`);
      } else {
        alert('Erreur lors du nettoyage');
      }
    } catch (error) {
      console.error('Erreur nettoyage:', error);
      alert('Erreur lors du nettoyage');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              Historique des versions
            </h3>
            <span className="text-sm text-muted-foreground0">
              ({versions.length} versions)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-muted-foreground0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            {selectedVersions.length > 0 && (
              <>
                <span className="text-sm text-muted-foreground">
                  {selectedVersions.length} version(s) sélectionnée(s)
                </span>
                {selectedVersions.length === 2 && (
                  <button
                    onClick={handleCompare}
                    className="px-3 py-1.5 bg-indigo-600 text-card-foreground text-sm rounded hover:bg-indigo-700 transition-colors flex items-center gap-1"
                  >
                    <GitCompare className="w-4 h-4" />
                    Comparer
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCleanup}
              className="px-3 py-1.5 text-muted-foreground text-sm rounded hover:bg-muted transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Nettoyer
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {showComparison && comparingVersions ? (
            <VersionComparison
              version1={comparingVersions[0]}
              version2={comparingVersions[1]}
              onClose={() => {
                setShowComparison(false);
                setComparingVersions(null);
                setSelectedVersions([]);
              }}
            />
          ) : (
            <VersionList
              versions={versions}
              loading={loading}
              selectedVersions={selectedVersions}
              onVersionSelect={handleVersionSelect}
              onVersionRestore={handleRestore}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 Astuce : Sélectionnez 2 versions pour les comparer, ou cliquez sur une version pour la restaurer
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant pour la liste des versions
function VersionList({
  versions,
  loading,
  selectedVersions,
  onVersionSelect,
  onVersionRestore
}: {
  versions: VersionData[];
  loading: boolean;
  selectedVersions: number[];
  onVersionSelect: (version: number) => void;
  onVersionRestore: (version: number) => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground0">
        <History className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">Aucune version trouvée</p>
        <p className="text-sm">Les modifications seront sauvegardées automatiquement.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
      {versions.map((version) => (
        <div
          key={version.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedVersions.includes(version.version)
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-border hover:bg-muted'
          }`}
          onClick={() => onVersionSelect(version.version)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                  v{version.version}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatVersionDate(version.createdAt)}
                </span>
                {version.message && (
                  <span className="text-sm text-muted-foreground0 italic">
                    "{version.message}"
                  </span>
                )}
              </div>

              <h4 className="font-medium text-muted-foreground mb-1">
                {version.title}
              </h4>

              <div className="flex items-center gap-4 text-xs text-muted-foreground0">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {version.createdAt.toLocaleDateString('fr-FR')}
                </span>
                {version.createdBy && (
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {version.createdBy}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVersionRestore(version.version);
                }}
                className="p-1.5 text-muted-foreground hover:text-indigo-600 transition-colors"
                title="Restaurer cette version"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Composant pour la comparaison des versions
function VersionComparison({
  version1,
  version2,
  onClose
}: {
  version1: VersionData;
  version2: VersionData;
  onClose: () => void;
}) {
  const differences = compareVersions(version1, version2);

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header de comparaison */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Comparaison des versions</h4>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded transition-colors"
        >
          Fermer
        </button>
      </div>

      {/* Versions comparées */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-3">
          <div className="font-mono text-sm bg-error/20 text-error px-2 py-1 rounded mb-2">
            v{version1.version}
          </div>
          <h5 className="font-medium">{version1.title}</h5>
          <p className="text-xs text-muted-foreground0 mt-1">
            {formatVersionDate(version1.createdAt)}
          </p>
        </div>
        <div className="border rounded-lg p-3">
          <div className="font-mono text-sm bg-success/20 text-success px-2 py-1 rounded mb-2">
            v{version2.version}
          </div>
          <h5 className="font-medium">{version2.title}</h5>
          <p className="text-xs text-muted-foreground0 mt-1">
            {formatVersionDate(version2.createdAt)}
          </p>
        </div>
      </div>

      {/* Différences */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Titre */}
        {differences.title.changed && (
          <div className="border rounded-lg p-4">
            <h6 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-error rounded-full"></span>
              Titre modifié
            </h6>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-error/10 p-2 rounded">
                <span className="text-error">{differences.title.from}</span>
              </div>
              <div className="bg-success/10 p-2 rounded">
                <span className="text-success">{differences.title.to}</span>
              </div>
            </div>
          </div>
        )}

        {/* Layout */}
        {differences.layout.changed && (
          <div className="border rounded-lg p-4">
            <h6 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Structure modifiée
            </h6>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-primary/10 p-2 rounded">
                <span className="text-primary">
                  {differences.layout.from.blocks?.length || 0} blocs
                </span>
              </div>
              <div className="bg-primary/10 p-2 rounded">
                <span className="text-primary">
                  {differences.layout.to.blocks?.length || 0} blocs
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SEO */}
        {differences.seo?.changed && (
          <div className="border rounded-lg p-4">
            <h6 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              SEO modifié
            </h6>
            <div className="text-sm text-muted-foreground">
              Les meta-données SEO ont été modifiées entre ces versions.
            </div>
          </div>
        )}

        {/* Pas de différences */}
        {!differences.title.changed && !differences.layout.changed && !differences.seo?.changed && (
          <div className="text-center py-8 text-muted-foreground0">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Aucune différence détectée entre ces versions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
