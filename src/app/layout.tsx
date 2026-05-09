import type { Metadata } from "next";
import { Cormorant_Display, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Display({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riri Jour J | Porsche Cayenne S - Conciergerie de Prestige",
  description: "Location de Porsche Cayenne S avec chauffeur pour vos événements exceptionnels à Metz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}