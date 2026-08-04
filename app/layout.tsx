import type { Metadata } from "next";
import { Inter, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rtbnetworkbd.com"),
  title: {
    default: "RTB Network",
    template: "%s | RTB Network",
  },

  description:
    "RTB Network is a community-driven organization specializing in esports, event management, tournaments, content creation, brand collaborations, and creative marketing.",

  keywords: [
    "RTB Network",
    "RTB Esports",
    "Esports",
    "Esports Bangladesh",
    "Gaming Community",
    "Tournament Organizer",
    "Event Management",
    "Content Creation",
    "Brand Collaborations",
    "Marketing",
  ],

  authors: [{ name: "RTB Network" }],
  creator: "RTB Network",
  publisher: "RTB Network",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "RTB Network",
    description:
      "Community-driven organization specializing in esports, event management, content creation, brand collaborations, and marketing.",
    url: "https://www.rtbnetworkbd.com",
    siteName: "RTB Network",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RTB Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RTB Network",
    description:
      "Community-driven organization specializing in esports, event management, content creation, brand collaborations, and marketing.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}