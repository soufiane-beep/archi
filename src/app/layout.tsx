import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#080808] text-[#f0ece4]">
        {children}
      </body>
    </html>
  );
}
