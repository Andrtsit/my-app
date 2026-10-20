"use client";

import { ThemeProvider as NextThemesProvider } from "@wrksz/themes/next";
import type { ComponentProps } from "react";

export default function ThemeProvider(
  props: ComponentProps<typeof NextThemesProvider>
) {
  return <NextThemesProvider {...props} />;
}