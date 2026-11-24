import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/80 pt-12 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          {/* Brand Info */}
          <div className="space-y-1.5">
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <Zap className="h-4 w-4 fill-current stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 font-heading">
                AppOpener
              </span>
            </Link>

            {/* Main Tagline after logo */}
            <p className="text-sm font-semibold text-slate-700">
              One link. The right app. Every time.
            </p>
          </div>

          {/* Clean Navigation Links */}
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <a href="/#how-it-works" className="hover:text-blue-600 transition-colors">
              How it works
            </a>
            <a href="/#use-cases" className="hover:text-blue-600 transition-colors">
              Use cases
            </a>
            <Link href="/guides" className="hover:text-blue-600 transition-colors">
              Guides
            </Link>
            <a href="/#faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </a>
            <a
              href="/#generator"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create link
            </a>
          </nav>
        </div>

        {/* Bottom Bar: Center aligned 2026 AppOpener */}
        <div className="pt-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AppOpener. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
