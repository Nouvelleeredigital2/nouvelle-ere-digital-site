import React from "react";
import { Grid } from "@/components/ui/Grid";

/** Disposition deux colonnes responsive pour n'importe quels enfants */
export function Split({ children }: { children: React.ReactNode }) {
  return <Grid className="grid-cols-1 md:grid-cols-2 items-start gap-10">{children}</Grid>;
}
