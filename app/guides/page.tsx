import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, Clock, Calendar, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile Deep Linking & Smart Redirect Guides — AppOpener",
  description:
    "Explore in-depth technical guides, tutorials, and best practices for mobile deep linking, bypassing in-app browsers, and creating high-converting smart URLs.",
  alternates: {
    canonical: "https://app-opener-link.vercel.app/guides",
  },
  openGraph: {
    title: "Mobile Deep Linking & Smart Redirect Guides — AppOpener",
    description:
      "Explore in-depth technical guides, tutorials, and best practices for mobile deep linking, bypassing in-app browsers, and creating high-converting smart URLs.",
    url: "https://app-opener-link.vercel.app/guides",
    type: "website",
  },
};

interface GuideItem {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
}

const GUIDES: GuideItem[] = [
  {
    slug: "deep-linking-explained",
    title: "Deep Linking Explained: How to Open Website Links Directly in Mobile Apps",
    description:
      "A complete guide to mobile deep linking: custom URL schemes, iOS Universal Links, Android App Links, and how to create a smooth browser fallback experience.",
    publishedAt: "November 24, 2026",
    readingTime: "5 min read",
    tags: ["Deep Linking", "Mobile Apps", "Smart Links", "Tutorial"],
  },
  {
    slug: "why-social-media-links-open-in-app-browser",
    title: "Why Instagram, TikTok and Facebook Links Open Inside an In-App Browser",
    description:
      "Understand why Instagram, TikTok, Facebook and other apps open links in embedded browsers, and learn practical ways to improve the mobile app handoff.",
    publishedAt: "November 24, 2026",
    readingTime: "4 min read",
    tags: ["In-App Browser", "Social Media", "Deep Linking", "Mobile Web"],
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main id="main-content" className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Guides" }]} />
          </div>

          {/* Section Header: Centered */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Knowledge Base &amp; Tutorials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
              Mobile Deep Linking &amp; Smart Link Guides
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              In-depth technical guides to help creators, marketers, and developers bypass in-app browser login walls, master mobile URL schemes, and deliver seamless native mobile experiences.
            </p>
          </div>

          {/* Featured Guide List */}
          <div className="space-y-6 mb-16">
            {GUIDES.map((guide) => (
              <article
                key={guide.slug}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                    <time dateTime="2026-11-24">{guide.publishedAt}</time>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                    <span>{guide.readingTime}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors font-heading">
                  <Link href={`/guides/${guide.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {guide.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
                  {guide.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Read complete guide</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>

          {/* High-Intent Conversion Funnel Box */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
      </main>

      <Footer />
    </div>
  );
}
