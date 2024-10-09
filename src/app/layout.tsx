import "@/styles/globals.css";

import {GeistSans} from "geist/font/sans";
import {type Metadata} from "next";
import React from "react";
import {ThemeProvider} from "@/components/themeProvider";
import {Toaster} from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "CinéFIL",
    description: "Site de votre cinéma CinéFIL à IMT Atlantique",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr" className={`${GeistSans.variable}`}>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        <Toaster/>
        </body>
        </html>
    );
}