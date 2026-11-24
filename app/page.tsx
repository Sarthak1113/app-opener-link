"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { LinkCreator } from "@/components/LinkCreator";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { HowItWorksSteps } from "@/components/HowItWorksSteps";
import { UseCasesSection } from "@/components/UseCasesSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollRevealObserver } from "@/components/ScrollRevealObserver";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans">
      <ScrollRevealObserver />
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section: Centered main tagline & requested subtitle */}
        <section className="pt-14 sm:pt-20 pb-4 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            One link. The right app. <span className="text-blue-600">Every time.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Smart app-opening links, branded redirects,<br className="hidden sm:inline" /> &amp; QR codes.
          </p>
        </section>

        {/* Link Generator Form */}
        <div className="px-4 sm:px-6">
          <LinkCreator />
        </div>

        {/* Horizontal Moving Logos Marquee (Logo + Name only, with card hover) */}
        <PlatformShowcase />

        {/* 4. How It Works (3 Boxes) */}
        <HowItWorksSteps />

        {/* 8. Use Cases Section (5 Boxes) */}
        <UseCasesSection />

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
