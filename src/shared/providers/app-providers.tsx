"use client";

import { ThemeProvider } from "@/shared/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </SessionProvider>
  );
}
