import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CinéFIL",
  description: "Site de votre cinéma CinéFIL à IMT Atlantique",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
