"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

export type ServiceModalState = {
  openedServiceId: string | null;
  open: (serviceId: string) => void;
  close: () => void;
  setOpenedServiceId: React.Dispatch<React.SetStateAction<string | null>>;
};

const ServiceModalCtx = createContext<ServiceModalState | undefined>(undefined);

export function ServiceModalProvider({ children }: { children: React.ReactNode }) {
  const [openedServiceId, setOpenedServiceId] = useState<string | null>(null);

  const open = useCallback((id: string) => setOpenedServiceId(id), []);
  const close = useCallback(() => setOpenedServiceId(null), []);

  const value = useMemo(
    () => ({ openedServiceId, open, close, setOpenedServiceId }),
    [openedServiceId, open, close],
  );

  return <ServiceModalCtx.Provider value={value}>{children}</ServiceModalCtx.Provider>;
}

export function useServiceModal(): ServiceModalState {
  const ctx = useContext(ServiceModalCtx);
  if (!ctx) throw new Error("useServiceModal must be used within ServiceModalProvider");
  return ctx;
}
