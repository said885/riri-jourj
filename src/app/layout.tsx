import type { Metadata } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import "./globals.css";

const tenor = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tenor",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riri Jour J | Conciergerie de Prestige à Metz",
  description: "Location de véhicules de prestige avec chauffeur pour vos événements exceptionnels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${tenor.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}