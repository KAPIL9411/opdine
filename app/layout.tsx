import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "opdine - The Restaurant Operating System | Orders, Tables, Kitchen & Billing Software",
  description: "opdine is the complete restaurant operating system. Manage orders, tables, kitchen, billing and growth — all connected in one place. Streamline your restaurant operations today.",
  keywords: [
    "opdine",
    "restaurant operating system",
    "restaurant management software",
    "restaurant POS",
    "table management system",
    "kitchen management software",
    "restaurant billing software",
    "food ordering system",
    "restaurant tech",
    "opdine app",
    "opdine software",
    "restaurant automation"
  ],
  authors: [{ name: "opdine" }],
  creator: "opdine",
  publisher: "opdine",
  metadataBase: new URL("https://opdine.vercel.app"),
  alternates: {
    canonical: "https://opdine.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opdine.vercel.app",
    title: "opdine - The Restaurant Operating System",
    description: "Orders, tables, kitchen, billing and growth — all connected in one place. The complete restaurant management solution.",
    siteName: "opdine",
    images: [
      {
        url: "/images/opdine-hero-poster-start.jpg",
        width: 1200,
        height: 630,
        alt: "opdine - Restaurant Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "opdine - The Restaurant Operating System",
    description: "Orders, tables, kitchen, billing and growth — all connected in one place.",
    images: ["/images/opdine-hero-poster-start.jpg"],
    creator: "@opdine",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification",
    // bing: "your-bing-verification",
  },
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
        
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="opdine" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="opdine" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#DC2626" />
        
        {/* JSON-LD Schema for Restaurant Software */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "opdine",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              operatingSystem: "Web, iOS, Android",
              description: "The Restaurant Operating System - Orders, tables, kitchen, billing and growth — all connected in one place.",
              url: "https://opdine.vercel.app",
              logo: "https://opdine.vercel.app/images/logo.png",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1000",
              },
            }),
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "opdine",
              url: "https://opdine.vercel.app",
              logo: "https://opdine.vercel.app/images/logo.png",
              description: "The Restaurant Operating System",
              sameAs: [
                // Add your social media links here
                // "https://twitter.com/opdine",
                // "https://linkedin.com/company/opdine",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
