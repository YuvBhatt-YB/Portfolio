

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import PreLoader from "@/components/preLoader";
import { bebas, striper, switzer } from "./fonts";
import ClientLayout from "@/components/ClientLayout";
import { Suspense } from "react";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuv Bhatt | Portfolio",
  description: "Full-stack developer & quant enthusiast building performant digital experiences.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${switzer.variable} ${bebas.variable} ${striper.variable} antialiased relative no-scroll`}
      >
        <Suspense><ClientLayout>{children}</ClientLayout></Suspense>
      </body>
    </html>
  );
}
