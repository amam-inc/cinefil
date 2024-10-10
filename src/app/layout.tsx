import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "cinéfil",
    description: "application officielle"
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr" className={ `${ GeistSans.variable } bg-stone-950` }>
        <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar/>
                { children }
            </ThemeProvider>
            <Toaster/>
        </body>
        </html>
    );
}
