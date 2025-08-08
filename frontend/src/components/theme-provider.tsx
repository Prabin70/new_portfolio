"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useTheme } from "next-themes";

interface ThemeProviderComponentProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  themes?: string[];
}

export const ThemeProvider = ({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = false,
  storageKey = "theme",
  themes = ["dark", "light"],
  ...props
}: ThemeProviderComponentProps) => {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey={storageKey}
      themes={themes}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

export { useTheme };
