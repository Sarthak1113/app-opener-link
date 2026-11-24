"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-what",
    question: "What is an app opener link?",
    answer:
      "When links are shared on Instagram, TikTok, or Twitter, clicking them opens inside the social network's embedded webview. In this webview, visitors are logged out of external services like YouTube or Spotify. An app opener detects the user's mobile device and opens the destination directly inside the installed native mobile app.",
  },
  {
    id: "faq-mechanism",
    question: "How does AppOpener launch apps on Android and iOS?",
    answer:
      "On Android, the service generates Chrome Android Intent URLs (intent://...#Intent;package=...;end) that tell the operating system package manager to launch the official native app. On iOS, it triggers registered custom URL schemes (such as vnd.youtube://, instagram://, and spotify:) with a tactile touch trigger that iOS Safari security permits.",
  },
  {
    id: "faq-missing-app",
    question: "What happens if a visitor does not have the app installed?",
    answer:
      "If the mobile app is not installed, or if the link is clicked on a desktop computer, the redirect falls back smoothly to the standard web page in their default browser.",
  },
  {
    id: "faq-free",
    question: "Is there any limit on link generation?",
    answer:
      "No. You can paste any destination URL and generate instant app opener links with QR codes at any time.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-what");

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 border-t border-slate-200">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 reveal-on-scroll">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            Answers &amp; Help
          </span>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `${faq.id}-content`;

            return (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  id={faq.id}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex min-h-[46px] items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 ml-3 transition-transform duration-150 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={faq.id}
                    className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
