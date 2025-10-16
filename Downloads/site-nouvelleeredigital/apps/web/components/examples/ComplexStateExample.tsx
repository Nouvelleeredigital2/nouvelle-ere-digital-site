// apps/web/components/examples/ComplexStateExample.tsx
"use client";

import { useReducer } from "react";
import { Button } from "@/components/ui/Button";

// Types pour l'état complexe
interface ComplexState {
  data: Array<{ id: number; name: string; status: "loading" | "loaded" | "error" }>;
  isLoading: boolean;
  error: string | null;
  selectedItems: number[];
}

// Actions possibles
type ComplexAction =
  | { type: "START_LOADING" }
  | { type: "LOAD_SUCCESS"; payload: Array<{ id: number; name: string }> }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "SELECT_ITEM"; payload: number }
  | { type: "DESELECT_ITEM"; payload: number }
  | { type: "CLEAR_SELECTION" };

// Réducteur pour gérer l'état complexe
function complexReducer(state: ComplexState, action: ComplexAction): ComplexState {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload.map((item) => ({
          ...item,
          status: "loaded" as const,
        })),
      };

    case "LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "SELECT_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.includes(action.payload)
          ? state.selectedItems
          : [...state.selectedItems, action.payload],
      };

    case "DESELECT_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.filter((id) => id !== action.payload),
      };

    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedItems: [],
      };

    default:
      return state;
  }
}

// État initial
const initialState: ComplexState = {
  data: [],
  isLoading: false,
  error: null,
  selectedItems: [],
};

// Composant d'exemple
export function ComplexStateExample() {
  const [state, dispatch] = useReducer(complexReducer, initialState);

  const handleLoadData = async () => {
    dispatch({ type: "START_LOADING" });

    try {
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockData = [
        { id: 1, name: "Élément 1" },
        { id: 2, name: "Élément 2" },
        { id: 3, name: "Élément 3" },
      ];

      dispatch({ type: "LOAD_SUCCESS", payload: mockData });
    } catch (error) {
      dispatch({ type: "LOAD_ERROR", payload: "Erreur lors du chargement" });
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-bold mb-4 text-foreground">
        Exemple de Gestion d'État Complexe avec useReducer
      </h3>

      {/* Bouton de chargement */}
      <Button onClick={handleLoadData} disabled={state.isLoading} className="mb-4">
        {state.isLoading ? "Chargement..." : "Charger les Données"}
      </Button>

      {/* États de chargement et d'erreur */}
      {state.isLoading && (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">🔄 Données en cours de chargement...</p>
        </div>
      )}

      {state.error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">❌ Erreur : {state.error}</p>
        </div>
      )}

      {/* Liste des données */}
      {state.data.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground">
            Données chargées ({state.data.length} éléments) :
          </h4>

          {state.data.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                state.selectedItems.includes(item.id)
                  ? "bg-primary/10 border-primary"
                  : "bg-muted/30 border-border hover:bg-muted/50"
              }`}
              onClick={() => {
                if (state.selectedItems.includes(item.id)) {
                  dispatch({ type: "DESELECT_ITEM", payload: item.id });
                } else {
                  dispatch({ type: "SELECT_ITEM", payload: item.id });
                }
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    state.selectedItems.includes(item.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {state.selectedItems.includes(item.id) ? "Sélectionné" : "Non sélectionné"}
                </span>
              </div>
            </div>
          ))}

          {state.selectedItems.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "CLEAR_SELECTION" })}
              className="mt-4"
            >
              Désélectionner tout ({state.selectedItems.length} éléments)
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
