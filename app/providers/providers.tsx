"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { ReactQueryProvider } from "./react-query-provider";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ReactQueryProvider>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </ReactQueryProvider>
  );
}
