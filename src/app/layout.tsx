import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premier Art — Architecture d'Élite",
  description:
    "Cabinet d'architecture belge spécialisé dans la création d'espaces d'exception. Résidences privées, projets commerciaux et intérieurs de prestige.",
  keywords: "architecture, architecte, Belgique, luxe, design, intérieur, résidence",
  openGraph: {
    title: "Premier Art — Architecture d'Élite",
    description: "Chaque espace est une œuvre. Chaque ligne, une intention.",
    type: "website",
    locale: "fr_BE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
