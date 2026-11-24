import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Build Schema.org BreadcrumbList for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://app-opener-link.vercel.app",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://app-opener-link.vercel.app${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs text-slate-500 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              title="Home"
            >
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight
                  className="h-3 w-3 text-slate-400 shrink-0"
                  aria-hidden="true"
                />
                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="font-medium text-slate-900 truncate max-w-[240px] sm:max-w-md"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
