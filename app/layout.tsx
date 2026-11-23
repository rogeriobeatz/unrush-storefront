import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNRUSH — Slow Obsession™",
  description: "Automotive culture. Streetwear. Slow Obsession™",
  metadataBase: new URL("https://unrush.com.br"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}