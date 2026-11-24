"use client";

import React from "react";
import { Link2, Sparkles, Share2 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Paste Your Link",
    description:
      "Add any supported social media URL, video link, profile or content destination.",
    icon: Link2,
  },
  {
    step: "02",
    title: "Generate Your Smart Link",
    description:
      "Create a shareable URL with intelligent redirection and a customised interstitial experience.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Share Everywhere",
    description:
      "Share your new link through messages, social media, websites, emails or printed QR codes.",
    icon: Share2,
  },
];

export function HowItWorksSteps() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-16 border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title and subtitle aligned in middle */}
        <div className="max-w-2xl mx-auto text-center mb-12 reveal-on-scroll">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            Simple 3-Step Process
          </span>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
          >
            How It Works
          </h2>
          <p className="mt-2 text-base font-medium text-slate-700">
            From ordinary URL to smart link in three steps.
          </p>
        </div>

        {/* 3 Steps in 3 boxes with card hover and staggered scroll reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const staggerClass = `stagger-${index + 1}`;
            return (
              <div
                key={index}
                className={`reveal-on-scroll ${staggerClass} group relative rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:bg-white hover:border-blue-400 hover:shadow-md transition-[transform,border-color,box-shadow,opacity,filter] duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 font-mono text-sm font-bold text-blue-600 border border-blue-600/20">
                      {item.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors shadow-2xs">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Step {item.step}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
