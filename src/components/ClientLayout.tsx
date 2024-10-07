'use client';

import React from "react";
import { AppProvider } from "@/context/AppContext";

export default function ClientLayout({
    children,
}:Readonly<{
    children: React.ReactNode;
}>){
    return <AppProvider>{children}</AppProvider>
}
// This could be a layout component specifically for client-side rendered parts of your app.
// It might include components that require client-side interactivity.