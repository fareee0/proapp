import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrickStake | Fractional Real Estate Investment",
  description: "Invest in high-yield properties with as little as ₹500.",
};

import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        <AppProvider>
          <Navbar />
          {children}
          <AIAssistant />
        </AppProvider>
      </body>
    </html>
  );
}
