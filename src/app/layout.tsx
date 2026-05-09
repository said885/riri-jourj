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
  title: "Riri Jour J | Location de Véhicules de Prestige à Metz",
  description: "Location de véhicule avec chauffeur pour vos plus beaux événements en Lorraine. Porsche Cayenne S noire avec chauffeur privé.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable} bg-dark text-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}