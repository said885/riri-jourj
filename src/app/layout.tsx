import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat", 
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
      <body className={`${playfair.variable} ${montserrat.variable} bg-dark text-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}