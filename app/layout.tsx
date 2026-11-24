import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://app-opener-link.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AppOpener - One link. The right app. Every time.",
    template: "%s | AppOpener",
  },
  description:
    "Generate smart universal links that bypass restrictive in-app browsers and open directly in YouTube, Instagram, Spotify, and TikTok. Free QR code generator.",
  keywords: [
    "app opener",
    "open in app",
    "deep link generator",
    "smart links",
    "instagram bio link",
    "bypass in-app browser",
    "open youtube in app",
    "open instagram in app",
    "open spotify in app",
    "open tiktok in app",
    "universal links",
    "android intent link",
    "qr code generator",
    "social media links",
  ],
  authors: [{ name: "AppOpener" }],
  creator: "AppOpener",
  publisher: "AppOpener",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AppOpener - One link. The right app. Every time.",
    description:
      "Generate smart universal links and QR codes that bypass in-app browsers and launch native mobile apps directly.",
    url: siteUrl,
    siteName: "AppOpener",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppOpener - One link. The right app. Every time.",
    description:
      "Generate smart universal links and QR codes that bypass in-app browsers and launch native mobile apps directly.",
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
    google: "ncvgqEM7hwFy5jREhPge7TW5uDF8QbAGl0UksAsU9zA",
  },
  category: "utilities",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2563eb",
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AppOpener",
    url: siteUrl,
    description:
      "Smart universal link generator that detects visitors' mobile platforms and routes them directly into native apps like YouTube, Instagram, and Spotify, avoiding login walls.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, Android, Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Bypass in-app browser login walls",
      "Chrome Android Intent URL generation",
      "iOS custom URI scheme routing",
      "Automatic QR code generator",
      "Standard web fallback for desktop",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AppOpener",
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an app opener link?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When links are shared on Instagram, TikTok, or X, clicking them opens inside the social network's embedded webview where visitors are logged out of external services. An app opener detects the user's mobile device and opens the destination directly inside the installed native mobile app.",
        },
      },
      {
        "@type": "Question",
        name: "How does AppOpener launch apps on Android and iOS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On Android, the service generates Chrome Android Intent URLs that instruct the operating system package manager to launch the official native app. On iOS, it triggers registered custom URL schemes with tactile touch triggers that iOS Safari security permits.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if a visitor does not have the app installed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If the mobile app is not installed, or if the link is clicked on a desktop computer, the redirect falls back smoothly to the standard web page in their default browser.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any limit on link generation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You can paste any destination URL and generate instant app opener links with QR codes at any time for free.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth bg-slate-50 text-slate-900"
    >
      <head>
        <meta name="google-site-verification" content="ncvgqEM7hwFy5jREhPge7TW5uDF8QbAGl0UksAsU9zA" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Structured Data for SEO / AEO (AI Overviews, Perplexity, Google Rich Results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-[100dvh] bg-slate-50 text-slate-900 antialiased selection:bg-blue-500/20 selection:text-blue-900 font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
