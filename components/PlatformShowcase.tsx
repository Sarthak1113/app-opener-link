"use client";

import React from "react";
import { PLATFORMS, SupportedPlatform } from "@/lib/deeplink";
import { PlatformIcon } from "./PlatformIcon";

export function PlatformShowcase() {
  const platformList = Object.keys(PLATFORMS) as SupportedPlatform[];

  return (
    <section id="platforms" aria-label="Supported applications" className="pt-2 pb-10 overflow-hidden">
      {/* Infinite Horizontal Transition Marquee with rounded corner rectangles */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Soft edge fade masks for seamless horizontal transition */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="animate-marquee flex items-center gap-3.5">
          {/* Double the list to create a seamless infinite loop */}
          {[...platformList, ...platformList].map((key, index) => {
            const config = PLATFORMS[key];
            return (
              <div
                key={`${key}-${index}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-2xs hover:border-blue-500 hover:shadow-xs transition-all shrink-0 cursor-default select-none"
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 shrink-0"
                  style={{
                    color: config.color === "#000000" ? "#0f172a" : config.color,
                  }}
                >
                  <PlatformIcon platform={key} size={20} />
                </div>
                <span className="text-sm font-semibold text-slate-900 whitespace-nowrap pr-1">
                  {config.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
