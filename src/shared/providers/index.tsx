"use client";

import { QueryProviders } from "./query-providers";
import { AppProviders } from "./app-providers";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProviders>
      <AppProviders>{children}</AppProviders>
    </QueryProviders>
  );
}
