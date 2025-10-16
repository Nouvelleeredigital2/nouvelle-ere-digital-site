"use client";

import React, { useState, useEffect } from "react";
import { usePersonaAnalytics } from "@/hooks/usePersonaAnalytics";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { BarChart3, TrendingUp, Users, Clock, Activity, Download, AlertCircle } from "lucide-react";

interface AnalyticsData {
  totalSessions: number;
  totalUsers: number;
  averageSessionTime: number;
  mostUsedPersona: string;
  personaStats: Array<{
    personaId: string;
    personaName: string;
    totalSessions: number;
    totalTimeSpent: number;
    switchCount: number;
    lastUsed: string;
  }>;
}

export function PersonaAnalyticsDashboard() {
  const { getStats, isEnabled } = usePersonaAnalytics();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    setIsLoading(true);

    // Récupérer les statistiques depuis le hook
    const stats = getStats();

    // Calculer les métriques globales
    const totalSessions = stats.reduce((sum, stat) => sum + stat.totalSessions, 0);
    const totalTimeSpent = stats.reduce((sum, stat) => sum + stat.totalTimeSpent, 0);
    const averageSessionTime = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;

    // Trouver le persona le plus utilisé
    const mostUsedPersona =
      stats.length > 0
        ? stats.reduce((prev, current) =>
            prev.totalSessions > current.totalSessions ? prev : current,
          )
        : { personaName: "Aucun", totalSessions: 0 };

    const data: AnalyticsData = {
      totalSessions,
      totalUsers: new Set(stats.map((s) => s.personaId)).size,
      averageSessionTime: Math.round(averageSessionTime * 100) / 100,
      mostUsedPersona: mostUsedPersona.personaName,
      personaStats: stats,
    };

    setAnalyticsData(data);
    setIsLoading(false);
  };

  const exportData = () => {
    if (!analyticsData) return;

    const exportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalSessions: analyticsData.totalSessions,
        totalUsers: analyticsData.totalUsers,
        averageSessionTime: analyticsData.averageSessionTime,
        mostUsedPersona: analyticsData.mostUsedPersona,
      },
      personaStats: analyticsData.personaStats,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `persona-analytics-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des données analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Aucune donnée disponible</h2>
          <p className="text-muted-foreground">
            Utilisez l'application avec différents personas pour générer des statistiques.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics - Creative Personas</h1>
              <p className="text-muted-foreground">
                Analyse de l'utilisation et des performances du système de personas
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadAnalyticsData}>
                <Activity className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Métriques globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalSessions}</p>
                <p className="text-sm text-muted-foreground">Sessions totales</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Personas utilisés</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.averageSessionTime}min</p>
                <p className="text-sm text-muted-foreground">Temps moyen</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-lg font-bold">{analyticsData.mostUsedPersona}</p>
                <p className="text-sm text-muted-foreground">Persona favori</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Statistiques par persona */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Utilisation par Persona
            </h3>
            <div className="space-y-4">
              {analyticsData.personaStats.map((stat) => (
                <div key={stat.personaId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{stat.personaName}</span>
                    <Badge tone="secondary">{stat.totalSessions} sessions</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${analyticsData.totalSessions > 0 ? (stat.totalSessions / analyticsData.totalSessions) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{Math.round(stat.totalTimeSpent)}min total</span>
                    <span>{stat.switchCount} changements</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Insights Clés</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Engagement Utilisateur</h4>
                <p className="text-sm text-muted-foreground">
                  {analyticsData.averageSessionTime > 5
                    ? "Les utilisateurs passent en moyenne plus de 5 minutes par session, indiquant un bon engagement."
                    : "Le temps de session pourrait être amélioré pour augmenter l'engagement."}
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Persona le Plus Populaire</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>{analyticsData.mostUsedPersona}</strong> est le persona préféré des
                  utilisateurs, représentant{" "}
                  {analyticsData.totalSessions > 0
                    ? Math.round(
                        ((analyticsData.personaStats.find(
                          (p) => p.personaName === analyticsData.mostUsedPersona,
                        )?.totalSessions || 0) /
                          analyticsData.totalSessions) *
                          100,
                      )
                    : 0}
                  % de l'utilisation.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Recommandations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Considérer l'ajout de fonctionnalités spécifiques au persona le plus populaire
                  </li>
                  <li>
                    • Analyser les personas moins utilisés pour identifier des axes d'amélioration
                  </li>
                  <li>
                    • Explorer les corrélations entre durée de session et satisfaction utilisateur
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" onClick={() => (window.location.href = "/demo")}>
            Tester les Personas
          </Button>
          <Button onClick={() => (window.location.href = "/tests")}>Donner votre Avis</Button>
        </div>
      </div>
    </div>
  );
}
