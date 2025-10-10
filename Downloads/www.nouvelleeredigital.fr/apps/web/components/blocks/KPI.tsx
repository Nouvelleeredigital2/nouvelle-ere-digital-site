import React from "react";
import { Grid } from "@/components/ui/Grid";

export type KPIItem = { value: string; unit?: string; label: string };

/** Key figures grid */
export function KPI({ items }: { items: KPIItem[] }) {
  return (
    <Grid className="grid-cols-1 sm:grid-cols-3 text-center gap-8">
      {items.map((k, i) => (
        <div key={i}>
          <div className="text-3xl font-semibold">
            {k.value}
            {k.unit && <span className="text-primary">{k.unit}</span>}
          </div>
          <div className="text-muted mt-1">{k.label}</div>
        </div>
      ))}
    </Grid>
  );
}
