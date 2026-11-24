import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Server } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — AppOpener",
  description: "Learn how AppOpener respects and protects your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Breadcrumb / Back button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Legal &amp; Privacy
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Last updated: November 24, 2026
            </p>
          </div>

          {/* Privacy Commitment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <EyeOff className="h-5 w-5 text-blue-600 mb-2.5" aria-hidden="true" />
              <h2 className="text-sm font-bold text-slate-900 mb-1">No Tracking Cookies</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We do not track your browsing history or sell your personal data.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <Lock className="h-5 w-5 text-emerald-600 mb-2.5" aria-hidden="true" />
              <h2 className="text-sm font-bold text-slate-900 mb-1">Direct Routing</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Links resolve instantly to destination apps with zero credential capture.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <Server className="h-5 w-5 text-indigo-600 mb-2.5" aria-hidden="true" />
              <h2 className="text-sm font-bold text-slate-900 mb-1">Creator Control</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Creators can delete generated links and QR codes at any time.
              </p>
            </div>
          </div>

          {/* Main Policy Body */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                1. Overview
              </h2>
              <p>
                AppOpener (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides a smart URL redirection and app-opening bridge service. This Privacy Policy describes how we handle information when you create or visit an AppOpener link.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                2. Information We Process
              </h2>
              <p>
                When you use AppOpener, we collect and process only the minimal technical data required to deliver deep linking:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>
                  <strong className="text-slate-800">Submitted Destination URLs:</strong> The web addresses you submit to generate app opener links.
                </li>
                <li>
                  <strong className="text-slate-800">Device Platform Header:</strong> When an opener link is visited, our servers read standard User-Agent headers solely to detect whether the visitor is on Android, iOS, or desktop, ensuring the correct native app scheme is invoked.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                3. What We Do Not Collect
              </h2>
              <p>
                AppOpener does not collect names, passwords, payment info, GPS location, or personal social media profiles. We do not inspect the contents of your communications and do not use cross-site advertising trackers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                4. Third-Party Destinations
              </h2>
              <p>
                AppOpener bridges visitors to third-party applications (such as YouTube, Instagram, Spotify, and TikTok). Once you open a third-party application, their respective terms of service and privacy policies apply. We encourage you to review their policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                5. Data Retention &amp; Deletion
              </h2>
              <p>
                Created link records are retained until deleted by the user. If you wish to remove a created link, you can delete it using the action controls on the homepage or reach out to us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                6. Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy, you can reach us at{" "}
                <span className="font-semibold text-blue-600">support@appopener.local</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
