import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "opdine - The Restaurant Operating System",
  description: "Orders, tables, kitchen, billing and growth — all connected in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/videos/opdine-hero.webm" as="video" type="video/webm" />
        <link rel="preload" href="/images/opdine-hero-poster-start.jpg" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
