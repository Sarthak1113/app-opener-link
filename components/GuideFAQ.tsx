"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface GuideFAQProps {
  items: FAQItem[];
}

export function GuideFAQ({ items }: GuideFAQProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-3 not-prose">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        const contentId = `${faq.id}-content`;

        return (
          <div
            key={faq.id}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all duration-200"
          >
            <button
              type="button"
              id={faq.id}
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset"
            >
              <span className="text-sm sm:text-base">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-blue-600" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={faq.id}
              hidden={!isOpen}
              className={`px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
