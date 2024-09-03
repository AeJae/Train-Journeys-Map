import { Inter } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  title: "Train Travel Visualizer",
  description: "By AJSF",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={"bg-slate-100 " + inter.className}>
        {children}
      </body>
    </html>
  );
}
