import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers/providers";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Noto",
  description: "Connect your workspaces, work and distribute faster with Noto",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "./favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <body>
        <Toaster richColors />
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
