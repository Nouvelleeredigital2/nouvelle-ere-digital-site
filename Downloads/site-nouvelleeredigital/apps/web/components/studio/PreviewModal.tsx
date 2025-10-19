'use client';

import React, { useState } from 'react';
import { Eye, Copy, ExternalLink, Clock, AlertCircle } from 'lucide-react';

interface PreviewModalProps {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ slug, isOpen, onClose }: PreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<{
    url: string;
    expiresAt: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePreview = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/preview/${slug}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData({
          url: data.previewUrl,
          expiresAt: data.expiresAt ? new Date(data.expiresAt).toLocaleString('fr-FR') : 'Non disponible',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erreur lors de la génération');
      }
    } catch (error) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Feedback visuel temporaire
      const button = document.activeElement as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = 'Copié !';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  const openPreview = () => {
    if (previewData?.url) {
      window.open(previewData.url, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              Prévisualisation
            </h3>
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

        {/* Content */}
        <div className="p-6 space-y-4">
          {!previewData ? (
            <>
              <div className="text-center py-4">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h4 className="text-lg font-medium text-muted-foreground mb-2">
                  Générer une prévisualisation
                </h4>
                <p className="text-sm text-muted-foreground">
                  Créez un lien de prévisualisation temporaire pour partager votre brouillon.
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-error/10 border border-error/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              <button
                onClick={generatePreview}
                disabled={loading}
                className="w-full py-3 bg-indigo-600 text-card-foreground rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Génération...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Générer la prévisualisation
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-success" />
                </div>
                <h4 className="text-lg font-medium text-muted-foreground mb-2">
                  Prévisualisation créée !
                </h4>
                <p className="text-sm text-muted-foreground">
                  Partagez ce lien temporaire avec vos collaborateurs.
                </p>
              </div>

              {/* Lien de prévisualisation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-muted border border-border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono text-muted-foreground truncate">
                      {previewData.url}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(previewData.url)}
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                    title="Copier le lien"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground0">
                  <Clock className="w-3 h-3" />
                  <span>Expire le {previewData.expiresAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={openPreview}
                  className="flex-1 py-2 bg-indigo-600 text-card-foreground rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ouvrir
                </button>
                <button
                  onClick={() => copyToClipboard(previewData.url)}
                  className="px-4 py-2 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 Astuce : La prévisualisation n'est accessible qu'avec le lien de partage
          </p>
        </div>
      </div>
    </div>
  );
}
