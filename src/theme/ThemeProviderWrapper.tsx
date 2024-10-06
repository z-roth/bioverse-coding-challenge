"use client";

import { theme } from "@/theme/theme";
import { PropsWithChildren } from "react";
import { ThemeUIProvider } from "theme-ui";

const ThemeProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>;
};

export default ThemeProviderWrapper;
