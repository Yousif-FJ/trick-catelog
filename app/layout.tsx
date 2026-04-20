import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TricksProvider } from "./components/TricksProvider";

export const metadata: Metadata = {
  title: "TaTSi bank",
  description: "TaTSi catalog of tricks",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <TricksProvider>
          {children}
        </TricksProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(e => console.error('SW registration failed:', e));
          }
        `}} />
      </body>
    </html>
  );
}
