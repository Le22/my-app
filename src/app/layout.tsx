import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/generic/Footer";
import { Toaster } from "sonner";
import MyClientQueryClientProvider from "@/provider/MyClientQueryClientProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <SessionProvider>
          <MyClientQueryClientProvider>
            {children}
            <Footer />
            <Toaster />
          </MyClientQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
