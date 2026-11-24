"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg py-1 focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
            <Zap className="h-4 w-4 fill-current stroke-[2.5]" aria-hidden="true" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 font-heading">
            AppOpener
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            How it works
          </a>
          <a
            href="#use-cases"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Use cases
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Primary Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#generator"
            className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-[transform,background-color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white enabled:active:scale-[0.96]"
          >
            Create link
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 enabled:active:scale-[0.96] transition-transform"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 transition-transform duration-200 rotate-90" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 transition-transform duration-200" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Smooth Mobile navigation drawer using CSS Grid row transition */}
      <div
        className={`md:hidden grid transition-all duration-250 ease-[cubic-bezier(0,0,0.2,1)] ${
          mobileMenuOpen
            ? "grid-rows-[1fr] opacity-100 border-b border-slate-200"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="bg-white px-4 py-3 space-y-1"
          >
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              How it works
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              Use cases
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              FAQ
            </a>
            <div className="pt-2 pb-1 sm:hidden">
              <a
                href="#generator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[42px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 enabled:active:scale-[0.96] transition-all"
              >
                Create link
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
