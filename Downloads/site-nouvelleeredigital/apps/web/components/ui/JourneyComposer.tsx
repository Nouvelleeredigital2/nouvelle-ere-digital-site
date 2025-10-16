"use client";

import React, { useState, useCallback } from "react";
import { DragCanvas } from "./DragCanvas";
import { ModuleCard } from "./ModuleCard";
import { CompatibilityIndicator } from "./CompatibilityIndicator";
import { TrajectoireIAOverlay } from "./TrajectoireIAOverlay";
import { GridLayout } from "./GridLayout";

interface Module {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  duration: string;
}

interface CanvasItem {
  id: string;
  x: number;
  y: number;
  content: React.ReactNode;
}

interface JourneyComposerProps {
  modules: Module[];
  onCompose?: (selectedModules: string[]) => void;
  className?: string;
}

export const JourneyComposer: React.FC<JourneyComposerProps> = ({
  modules,
  onCompose,
  className = "",
}) => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [trajectories, setTrajectories] = useState<
    Array<{ id: string; points: Array<{ x: number; y: number }>; color: string }>
  >([]);

  const handleModuleSelect = useCallback(
    (moduleId: string) => {
      if (selectedModules.includes(moduleId)) {
        setSelectedModules((prev) => prev.filter((id) => id !== moduleId));
        setCanvasItems((prev) => prev.filter((item) => item.id !== moduleId));
      } else {
        setSelectedModules((prev) => [...prev, moduleId]);
        const newItem: CanvasItem = {
          id: moduleId,
          x: Math.random() * 400,
          y: Math.random() * 300,
          content: <div>{modules.find((m: Module) => m.id === moduleId)?.name}</div>,
        };
        setCanvasItems((prev) => [...prev, newItem]);
      }
    },
    [selectedModules, modules],
  );

  const handleCanvasDrop = useCallback(
    (moduleId: string, x: number, y: number) => {
      setCanvasItems((prev) =>
        prev.map((item) => (item.id === moduleId ? { ...item, x, y } : item)),
      );
      if (canvasItems.length > 0) {
        const newTrajectory = {
          id: `traj-${Date.now()}`,
          points: canvasItems.map((item) => ({ x: item.x, y: item.y })).concat([{ x, y }]),
          color: "#ffd93d",
        };
        setTrajectories((prev) => [...prev, newTrajectory]);
      }
    },
    [canvasItems],
  );

  const handleExport = () => {
    onCompose?.(selectedModules);
  };

  return (
    <GridLayout columns={3} gap="lg" className={className}>
      {/* Colonne 1: Sélection de Modules */}
      <div>
        <h3 className="text-lg font-bold mb-4">Sélectionnez vos Modules</h3>
        <div className="space-y-2">
          {modules.map((module: Module) => (
            <ModuleCard
              key={module.id}
              module={{
                id: module.id,
                title: module.name,
                description: module.description,
                status: "active" as const,
              }}
              onSelect={() => handleModuleSelect(module.id)}
            />
          ))}
        </div>
      </div>

      {/* Colonne 2: Canvas de Composition */}
      <div>
        <h3 className="text-lg font-bold mb-4">Composez votre Parcours</h3>
        <DragCanvas items={canvasItems} onDrop={handleCanvasDrop} width={400} height={300} />
        <TrajectoireIAOverlay trajectories={trajectories} variant="animated" />
      </div>

      {/* Colonne 3: Récapitulatif et Export */}
      <div>
        <h3 className="text-lg font-bold mb-4">Récapitulatif</h3>
        <div className="mb-4">
          <CompatibilityIndicator
            compatibility={{
              score: selectedModules.length > 2 ? 90 : 60,
              status: selectedModules.length > 2 ? "high" : "medium",
            }}
          />
        </div>
        <div className="mb-4">
          <p className="text-sm">Modules sélectionnés: {selectedModules.length}</p>
          <p className="text-sm">
            Coût estimé:{" "}
            {modules
              .filter((m: Module) => selectedModules.includes(m.id))
              .reduce((sum: number, m: Module) => sum + m.price, 0)}
            €
          </p>
        </div>
        <button
          onClick={handleExport}
          className="bg-primary text-white px-4 py-2 rounded"
          disabled={selectedModules.length === 0}
        >
          Exporter le Parcours
        </button>
      </div>
    </GridLayout>
  );
};
