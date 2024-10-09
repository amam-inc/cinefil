import "@/styles/globals.css";
import Navbar from "@/components/navbar";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "cinéfil",
  description: "application officielle",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} bg-stone-950 text-white`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
