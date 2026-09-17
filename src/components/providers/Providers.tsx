"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { MouseFollower } from "@/components/providers/MouseFollower";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MouseFollower />
      {children}
    </ThemeProvider>
  );
}
