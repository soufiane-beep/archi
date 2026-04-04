import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="fr" className={`${cormorant.variable} ${raleway.variable}`}>
      <body className="bg-[#f7f5f0] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
