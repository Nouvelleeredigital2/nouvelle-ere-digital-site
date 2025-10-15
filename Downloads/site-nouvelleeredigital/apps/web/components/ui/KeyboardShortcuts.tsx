// apps/web/components/ui/KeyboardShortcuts.tsx
"use client";

import { useState } from 'react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);
  const { shortcuts } = useKeyboardShortcuts();

  return (
    <>
      {/* Bouton pour afficher les raccourcis */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-card border border-border rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Afficher les raccourcis clavier"
      >
        <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm font-mono">
          ⌨️
        </kbd>
      </button>

      {/* Modal des raccourcis */}
      {isVisible && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Raccourcis Clavier
                </h3>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  💡 Utilisez ces raccourcis pour naviguer rapidement entre les thèmes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
