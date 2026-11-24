"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LinkCreator } from "@/components/LinkCreator";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { HowItWorksSteps } from "@/components/HowItWorksSteps";
import { UseCasesSection } from "@/components/UseCasesSection";
import { LinksList } from "@/components/LinksList";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollRevealObserver } from "@/components/ScrollRevealObserver";
import { LinkItem } from "@/lib/db";

export default function HomePage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      if (data.success && Array.isArray(data.links)) {
        setLinks(data.links);
      }
    } catch (err) {
      console.error("Failed to fetch links:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleLinkCreated = (newLink: LinkItem) => {
    setLinks((prev) => [newLink, ...prev]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete link /go/${id}? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLinks((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete link:", err);
    }
  };

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
          <LinkCreator onLinkCreated={handleLinkCreated} />
        </div>

        {/* Horizontal Moving Logos Marquee (Logo + Name only, with card hover) */}
        <PlatformShowcase />

        {/* 4. How It Works (3 Boxes) */}
        <HowItWorksSteps />

        {/* 8. Use Cases Section (5 Boxes) */}
        <UseCasesSection />

        {/* Recent Links Table */}
        <LinksList
          links={links}
          isLoading={isLoading}
          onDelete={handleDelete}
        />

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
