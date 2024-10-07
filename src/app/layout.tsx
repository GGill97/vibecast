import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import ClientLayout from "@/components/ClientLayout";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "VibeCast",
  description: "Weather-based music recommendation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

// This is the root layout component for Next.js 13+ using the App Router.
// It wraps all pages and can include common elements like headers, footers, and global styles.
