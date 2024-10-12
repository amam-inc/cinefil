import "@/styles/globals.css";
import { createClient } from "@/utils/supabase/server";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export const metadata: Metadata = {
    title: "cinéfil",
    description: "application officielle"
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const {error} = await createClient().auth.getUser();
    
    if (error) {
        redirect("/login");
    }
    
    return <Suspense>{ children }</Suspense>;
}
