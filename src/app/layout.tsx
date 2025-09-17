import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Link from "next/link";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Edumedha – Creative Marketplace for Social Impact",
  description: "A vibrant marketplace by JIMS empowering youth and children through education, skill training, and employment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className="antialiased">
        <CartProvider>
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {/* Global Navbar */}
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg tracking-tight">
              Edumedha
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/marketplace" className="hover:underline underline-offset-4">Marketplace</Link>
              <Link href="/about" className="hover:underline underline-offset-4">About</Link>
              <Link href="/contact" className="hover:underline underline-offset-4">Contact</Link>
              <Link href="/admin" className="rounded-md px-3 py-1.5 bg-foreground text-background hover:opacity-90 transition">Admin</Link>
              <CartDrawer />
            </nav>
          </div>
        </header>
        {children}
        <VisualEditsMessenger />
        </CartProvider>
      </body>
    </html>
  );
}