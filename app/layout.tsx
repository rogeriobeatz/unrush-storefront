import type { Metadata } from "next";
import "./globals.css";
import "./unrush.css";

export const metadata: Metadata = {
  title: "UNRUSH — Slow Obsession™",
  description: "Streetwear brasileiro para quem vive a rua, a garagem e a obsessão pelos detalhes.",
  metadataBase: new URL("https://unrush.com.br"),
  openGraph: { title: "UNRUSH — Slow Obsession™", description: "Carros nunca foram só carros. Streetwear brasileiro, Curitiba / PR.", images: ["https://unrush.com.br/wp-content/uploads/2026/09/Logotipo-oficial.png"], type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="unrush-react-storefront">{children}</body></html>;
}