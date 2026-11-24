"use client";

import React from "react";
import {
  Video,
  Building2,
  Megaphone,
  UserCheck,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="py-16 border-t border-slate-200 bg-slate-50/60"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title and subtitle aligned in middle */}
        <div className="max-w-2xl mx-auto text-center mb-12 reveal-on-scroll">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            BUILT FOR THE WAY YOU SHARE.
          </span>
          <h2
            id="use-cases-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
          >
            One smart link. Countless possibilities.
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Whether you&apos;re building a personal brand or promoting a business, make every shared link work harder.
          </p>
        </div>

        {/* better-layout: Balanced 2-Row Layout (2 Primary + 3 Secondary) */}
        <div className="space-y-6">
          {/* Row 1: Two Prominent Hero Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Content Creators */}
            <div className="reveal-on-scroll stagger-1 group rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:border-blue-400 hover:shadow-md transition-[transform,border-color,box-shadow] duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Video className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    YouTube, Reels, TikTok
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>Content Creators</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" aria-hidden="true" />
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Share videos, reels, channels and social profiles without making your audience search for you.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Eliminates sign-in walls for instant likes, comments &amp; subscriptions.
              </div>
            </div>

            {/* 2. Businesses & Brands */}
            <div className="reveal-on-scroll stagger-2 group rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:border-blue-400 hover:shadow-md transition-[transform,border-color,box-shadow] duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Building2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    Commerce &amp; Social
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>Businesses &amp; Brands</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" aria-hidden="true" />
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Connect customers to your social pages, products, promotions and digital experiences.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Boosts mobile checkout conversion with direct native app routing.
              </div>
            </div>
          </div>

          {/* Row 2: Three Balanced Specialized Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 3. Marketing Teams */}
            <div className="reveal-on-scroll stagger-3 group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-[transform,border-color,box-shadow] duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Megaphone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Campaigns
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Marketing Teams
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Create branded campaign links and QR codes for online and offline promotions.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Print &amp; digital attribution
              </div>
            </div>

            {/* 4. Influencers & Professionals */}
            <div className="reveal-on-scroll stagger-4 group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-[transform,border-color,box-shadow] duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <UserCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Bio &amp; Identity
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Influencers &amp; Professionals
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bring your social profiles together and make it easier for people to connect with you.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                1-tap profile discovery
              </div>
            </div>

            {/* 5. Events & Communities */}
            <div className="reveal-on-scroll stagger-5 group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-[transform,border-color,box-shadow] duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Offline to App
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Events &amp; Communities
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Put QR codes on promotional materials and direct attendees to the right digital destination.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Conferences &amp; flyer scans
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
