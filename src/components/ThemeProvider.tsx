"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Kita gunakan cara bawaan React untuk mengambil tipe data, tidak perlu import manual lagi
export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}