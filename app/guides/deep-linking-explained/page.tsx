import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideFAQ } from "@/components/GuideFAQ";
import {
  Calendar,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  Share2,
  ExternalLink,
  Smartphone,
  ShieldAlert,
} from "lucide-react";

const pageUrl = "https://app-opener-link.vercel.app/guides/deep-linking-explained";

export const metadata: Metadata = {
  title: "What Is Deep Linking? A Complete Guide to Opening Links in Apps",
  description:
    "Learn how mobile deep linking works, how app links route users to specific app content, and how to create a smooth browser fallback experience.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "What Is Deep Linking? A Complete Guide to Opening Links in Apps",
    description:
      "Learn how mobile deep linking works, how app links route users to specific app content, and how to create a smooth browser fallback experience.",
    url: pageUrl,
    type: "article",
    publishedTime: "2026-11-24T00:00:00.000Z",
    modifiedTime: "2026-11-24T00:00:00.000Z",
    section: "Mobile Technology",
    tags: ["Deep Linking", "Mobile Apps", "Smart Links", "AppOpener"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Deep Linking? A Complete Guide to Opening Links in Apps",
    description:
      "Learn how mobile deep linking works, how app links route users to specific app content, and how to create a smooth browser fallback experience.",
  },
};

const guideFaqs = [
  {
    id: "guide-faq-installed",
    question: "Does deep linking require an installed app?",
    answer:
      "The app needs to be installed for the link to open it. If not, a good link should still take you to a useful web page.",
  },
  {
    id: "guide-faq-force",
    question: "Can a normal website force an app to open?",
    answer:
      "No. Browsers and devices have security rules and respect user choices. A smart link can try to open the app, but it can’t get around every restriction.",
  },
  {
    id: "guide-faq-same",
    question: "Are deep links the same as app links?",
    answer:
      "Deep linking is the bigger idea. Universal Links and Android App Links are just specific ways to connect web addresses to apps.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "What Is Deep Linking? A Complete Guide to Opening Links in Apps",
  description:
    "Learn how mobile deep linking works, how app links route users to specific app content, and how to create a smooth browser fallback experience.",
  datePublished: "2026-11-24T00:00:00.000Z",
  dateModified: "2026-11-24T00:00:00.000Z",
  author: {
    "@type": "Organization",
    name: "AppOpener",
    url: "https://app-opener-link.vercel.app",
  },
  publisher: {
    "@type": "Organization",
    name: "AppOpener",
    url: "https://app-opener-link.vercel.app",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": pageUrl,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: guideFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function DeepLinkingExplainedPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main id="main-content" className="flex-1 py-10 sm:py-16">
        <article className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Guides", href: "/guides" },
                { label: "Deep Linking Explained" },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                <time dateTime="2026-11-24">November 24, 2026</time>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                <span>5 min read</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-md bg-blue-100 text-blue-700 px-2 py-0.5 text-[11px] font-semibold">
                  Deep Linking
                </span>
                <span className="rounded-md bg-slate-100 text-slate-600 px-2 py-0.5 text-[11px] font-semibold">
                  Mobile Apps
                </span>
                <span className="rounded-md bg-slate-100 text-slate-600 px-2 py-0.5 text-[11px] font-semibold">
                  Smart Links
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight mb-4">
              Deep Linking Explained: How to Open Website Links Directly in Mobile Apps
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              A comprehensive guide to mobile deep linking, custom URL schemes, universal app links, and creating reliable web fallbacks for iOS and Android.
            </p>
          </header>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            {/* Introduction Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Introduction
              </h2>
              <p>
                A regular web link opens a page in your browser. A deep link does something extra. It takes you straight to a specific screen or piece of content inside a mobile app. Instead of making you open an app and search for what you want, like a video or product, deep linking gets you there in fewer steps. Deep linking helps you reach your destination faster.
              </p>
              <p>
                Deep links help creators share videos, businesses promote products, support teams send help pages, and developers build better mobile experiences.
              </p>
            </section>

            {/* What is a deep link */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                What is a deep link?
              </h2>
              <p>
                A deep link is a special link or address that points to something inside an app. Depending on your device, it might use a custom link, an Android App Link, or an iOS Universal Link.
              </p>
              <p>
                For example, if you share a music link, it can open a specific song in the music app instead of just the homepage.
              </p>
            </section>

            {/* How does deep linking work */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                How does deep linking work?
              </h2>
              <p>
                A typical deep link works in three steps:
              </p>

              <ol className="space-y-2.5 pl-5 list-decimal text-slate-800 font-medium">
                <li>
                  <strong className="text-slate-900">First, the destination:</strong> a link points to the content you want to see.
                </li>
                <li>
                  <strong className="text-slate-900">Next, the handoff:</strong> your browser and device check if the installed app can handle that destination.
                </li>
                <li>
                  <strong className="text-slate-900">Finally, the fallback:</strong> if the app can’t open, you’ll stay on the website instead.
                </li>
              </ol>

              <p>
                How this works depends on the app, your device, browser, link setup, and your settings. No website can promise that every device will always open the app automatically.
              </p>
            </section>

            {/* Common types of mobile deep links */}
            <section className="space-y-6 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Common types of mobile deep links
              </h2>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Custom URL schemes
                </h3>
                <p>
                  Some apps use a custom link format, like <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-800">exampleapp://content/123</code>. If your device supports it, the system sends the link to the app.
                </p>
                <p>
                  But custom schemes can be tricky. Another app might use the same scheme, or if the app isn’t installed, you could get an error.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  iOS Universal Links
                </h3>
                <p>
                  Universal Links use regular HTTPS links that are connected to an iOS app. This connection is checked with a special file on the website called <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-800">apple-app-site-association</code>.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Android App Links
                </h3>
                <p>
                  Android App Links connect a website’s domain to an Android app. This connection is set up using a Digital Asset Links file, usually found at <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-800">/.well-known/assetlinks.json</code>.
                </p>
              </div>
            </section>

            {/* Deep links vs. normal links Table */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Deep links vs. normal links
              </h2>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs not-prose my-6">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-semibold">
                      <th scope="col" className="p-3.5 sm:p-4 w-1/2">
                        Normal web link
                      </th>
                      <th scope="col" className="p-3.5 sm:p-4 w-1/2 text-blue-600">
                        Deep link
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 sm:p-4">Usually opens a web page</td>
                      <td className="p-3.5 sm:p-4 font-medium text-slate-900">Can open a specific place in an app</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 sm:p-4">Browser-first experience</td>
                      <td className="p-3.5 sm:p-4 font-medium text-slate-900">May try to open the app</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 sm:p-4">Works in most browsers</td>
                      <td className="p-3.5 sm:p-4 font-medium text-slate-900">Depends on app and device support</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3.5 sm:p-4">May need extra clicks</td>
                      <td className="p-3.5 sm:p-4 font-medium text-slate-900">Can reduce steps to content</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* When should you use deep links */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                When should you use deep links?
              </h2>

              <ul className="space-y-2 pl-5 list-disc text-slate-700">
                <li>Share a YouTube video or Instagram profile.</li>
                <li>Send customers to a product page inside a shopping app.</li>
                <li>Link to a song, album, or playlist.</li>
                <li>Share a saved place or directions in a maps app.</li>
                <li>Connect emails, social campaigns, QR codes, and mobile experiences.</li>
              </ul>
            </section>

            {/* In-Content Funnel / Action Box */}
            <div className="not-prose my-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
                <span>Instant Link Generator</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading">
                Want to create a smart app-opening link right now?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-4 leading-relaxed">
                AppOpener creates smart universal links with automatic iOS Universal Link and Android Intent fallbacks, plus downloadable QR codes.
              </p>
              <Link
                href="/#generator"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-all active:scale-[0.96]"
              >
                <span>Generate smart link</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* How to make a link open in an app */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                How to make a link open in an app
              </h2>

              <ol className="space-y-2.5 pl-5 list-decimal text-slate-800 font-medium">
                <li>Copy the original public HTTPS link from the service you want to share.</li>
                <li>Use an app-link generator or the app’s sharing feature.</li>
                <li>Generate the smart app link.</li>
                <li>Test the link on a phone with the app installed.</li>
                <li>Test again without the app to make sure the web fallback works.</li>
                <li>Share the tested link in your bio, a message, on your website, in a campaign, or as a QR code.</li>
              </ol>
            </section>

            {/* Best practices */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Best practices
              </h2>

              <ul className="space-y-2 pl-5 list-disc text-slate-700">
                <li>Always keep the original HTTPS link as a backup.</li>
                <li>Test your links on real iOS and Android devices.</li>
                <li>Keep any useful query parameters and campaign tags in your links.</li>
                <li>Use public, shareable links for your destinations.</li>
                <li>Let people know what will happen when they tap your link.</li>
                <li>Don’t promise that an app will open on every device.</li>
              </ul>
            </section>

            {/* Frequently asked questions */}
            <section className="space-y-5 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Frequently asked questions
              </h2>

              <GuideFAQ items={guideFaqs} />
            </section>

            {/* Conclusion */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Conclusion
              </h2>
              <p>
                Deep linking brings together web browsing and app experiences. If you use the right link format, test on real devices, and keep a good web backup, your shared links will be easier for everyone to use.
              </p>
            </section>

            {/* High-Intent Conversion Funnel Box */}
            <div className="mt-12 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 not-prose">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>Try AppOpener Free</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-heading">
                  Ready to create your first smart app-opening link?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Paste any YouTube, Instagram, Spotify, or TikTok URL to generate a universal deep link that routes visitors directly into native mobile apps.
                </p>
              </div>

              <Link
                href="/#generator"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-all shrink-0 active:scale-[0.96]"
              >
                <span>Generate smart link</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
