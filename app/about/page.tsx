import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollRevealObserver } from "@/components/ScrollRevealObserver";
import {
  Zap,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Globe,
  Linkedin,
} from "lucide-react";

const pageUrl = "https://app-opener-link.vercel.app/about";

export const metadata: Metadata = {
  title: "About AppOpen: Making Link Sharing Easy Again",
  description:
    "Learn why AppOpen was built: a fast, clean, distraction-free smart link generator that bypasses in-app browser login walls and opens native apps directly.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "About AppOpen: Making Link Sharing Easy Again",
    description:
      "Learn why AppOpen was built: a fast, clean, distraction-free smart link generator that bypasses in-app browser login walls and opens native apps directly.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About AppOpen: Making Link Sharing Easy Again",
    description:
      "Learn why AppOpen was built: a fast, clean, distraction-free smart link generator that bypasses in-app browser login walls and opens native apps directly.",
  },
};

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AppOpen: Making Link Sharing Easy Again",
    description:
      "AppOpen is a free and simple smart link generator that transforms regular web URLs into direct links that open your favorite apps.",
    url: pageUrl,
    mainEntity: {
      "@type": "Person",
      name: "Sarthak Ranjan Hota",
      jobTitle: "UI/UX Designer, Visual Designer",
      url: "https://sarthakranjanhota.site",
      sameAs: [
        "https://sarthakranjanhota.site",
        "https://linkedin.com/in/sarthak-ranjan-hota",
      ],
    },
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Schema.org AboutPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <ScrollRevealObserver />
      <Navbar />

      <main id="main-content" className="flex-1 py-10 sm:py-16">
        <article className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "About" }]} />
          </div>

          {/* Page Header */}
          <header className="mb-10 pb-8 border-b border-slate-200 reveal-on-scroll">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>About AppOpen</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight mb-4">
              About AppOpen: Making Link Sharing Easy Again
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              AppOpen is a free and simple smart link generator that transforms regular web URLs into direct links that open your favorite apps. So when someone clicks your link on Instagram, Facebook, X, or WhatsApp, they’ll go straight to the app instead of getting stuck in an awkward in-app browser.
            </p>
          </header>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">
            {/* Why I Created AppOpen */}
            <section className="space-y-4 reveal-on-scroll">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Why I Created AppOpen
              </h2>
              <p>
                Every time I wanted to share a YouTube video, a profile, or a product link on social media, I faced the same frustrating issue: those apps tend to trap links in their own browsers. This meant viewers were often logged out and had to go through the hassle of signing in again just to like, subscribe, or make a purchase.
              </p>
              <p>
                To solve this, I started using other app-opener tools, but I was constantly disappointed. Most of them were cluttered, filled with annoying ads, slow redirects, and created more frustration than they solved.
              </p>
              <p>
                As a designer and creator, I believed there had to be a better way a tool that truly respects both the person sharing the link and the person clicking it. That’s how I came up with AppOpen: a fast, clean, and distraction-free link generator that gets the job done without unnecessary complications.
              </p>
            </section>

            {/* What AppOpen Represents */}
            <section className="space-y-5 pt-4 border-t border-slate-200 reveal-on-scroll">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                What AppOpen Represents
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm font-heading">
                      Clean and Simple Design
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    No overwhelming dashboards, confusing instructions, or pop-ups getting in your way.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Smartphone className="h-4 w-4" aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm font-heading">
                      Instant App Opening
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Automatically detects whether the user is on iOS, Android, or desktop and opens links in the right app like YouTube, Instagram, Amazon, Spotify, Telegram, or X. If the app isn’t installed, it seamlessly falls back to the browser.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm font-heading">
                      No Sign-up Required
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Just paste your link, create your smart URL, and share it in a matter of seconds without the need to create an account.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm font-heading">
                      Safe Redirects
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Keeps your original query strings, UTM tags, and affiliate tracking IDs intact.
                  </p>
                </div>
              </div>
            </section>

            {/* About Me */}
            <section className="space-y-4 pt-4 border-t border-slate-200 reveal-on-scroll">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
                About Me
              </h2>
              <p>
                Hi there! I’m Sarthak Ranjan Hota, a UI/UX Designer, Visual Designer. I’m passionate about creating minimalist, user-centric digital products and handy web tools that address everyday challenges.
              </p>
              <p>
                If you’d like to see more of my design work or connect with me, here’s where you can find me:
              </p>

              <div className="flex flex-wrap gap-3 not-prose my-4">
                <a
                  href="https://sarthakranjanhota.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
                >
                  <Globe className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span>Portfolio: sarthakranjanhota.site</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" aria-hidden="true" />
                </a>

                <a
                  href="https://linkedin.com/in/sarthak-ranjan-hota"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span>LinkedIn: linkedin.com/in/sarthak-ranjan-hota</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" aria-hidden="true" />
                </a>
              </div>

              <p>
                Got feedback, a bug to report, or a platform you’d like to see supported? Don’t hesitate to reach out—I’m always looking to improve AppOpen based on your thoughts.
              </p>
            </section>

            {/* Try AppOpen Now */}
            <div className="reveal-on-scroll mt-12 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 not-prose">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>Try AppOpen Now</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-heading">
                  Try AppOpen Now
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Paste any supported URL and generate a clean, direct link to open your app in seconds.
                </p>
              </div>

              <Link
                href="/#generator"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-all shrink-0 active:scale-[0.96]"
              >
                <span>Create Your Free App Opener Link →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
