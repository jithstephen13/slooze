import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Commodities Management System",
  description: "Advanced management system for product inventory and insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <AuthProvider>
          <StoreProvider>
            <QueryProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </QueryProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
