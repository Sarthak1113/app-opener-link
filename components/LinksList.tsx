"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  QrCode,
  Trash2,
  FolderOpen,
} from "lucide-react";
import { LinkItem } from "@/lib/db";
import { PlatformBadge } from "./PlatformBadge";
import { LinkSuccessModal } from "./LinkSuccessModal";

interface LinksListProps {
  links: LinkItem[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function LinksList({ links, isLoading, onDelete }: LinksListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrLink, setActiveQrLink] = useState<LinkItem | null>(null);

  const handleCopy = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const full = `${origin}/go/${slug}`;
    navigator.clipboard.writeText(full);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="links" aria-labelledby="links-heading" className="py-16 border-t border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Title and subtitle aligned in middle */}
        <div className="max-w-2xl mx-auto text-center mb-10 reveal-on-scroll">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            Your Links
          </span>
          <div className="flex items-center justify-center gap-2.5">
            <h2 id="links-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Recent links
            </h2>
            <span className="rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5 text-xs font-bold font-mono">
              {links.length}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Manage your created opener links and QR codes.
          </p>
        </div>

        {/* Content View */}
        {links.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <FolderOpen className="mx-auto h-9 w-9 text-slate-400 mb-3" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-slate-800">
              No links created yet
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Paste a destination URL above to generate your first opener link.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th scope="col" className="py-3 px-4">Link &amp; Target</th>
                    <th scope="col" className="py-3 px-4">Platform</th>
                    <th scope="col" className="py-3 px-4 text-right">Created</th>
                    <th scope="col" className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {links.map((item) => {
                    const isCopied = copiedId === item.id;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Title & Slug */}
                        <td className="py-3 px-4 min-w-[200px] max-w-[320px]">
                          <div className="font-semibold text-slate-900 truncate mb-0.5">
                            {item.title}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-medium text-blue-600">
                              /go/{item.id}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500 text-[11px] font-mono truncate max-w-[180px]">
                              {item.originalUrl}
                            </span>
                          </div>
                        </td>

                        {/* Platform Badge */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <PlatformBadge platform={item.platform} size="sm" />
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4 text-right text-slate-500 whitespace-nowrap font-mono text-[11px]">
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        {/* Actions (Copy, QR code, Delete) */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {/* Copy button */}
                            <button
                              onClick={() => handleCopy(item.id)}
                              aria-label={isCopied ? "Link copied" : `Copy link for ${item.title}`}
                              className={`flex h-7 px-2.5 items-center gap-1.5 rounded-md text-xs font-semibold transition-colors enabled:active:scale-[0.96] ${
                                isCopied
                                  ? "bg-emerald-600 text-white"
                                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="h-3 w-3" aria-hidden="true" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 text-slate-500" aria-hidden="true" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            {/* QR Code button */}
                            <button
                              onClick={() => setActiveQrLink(item)}
                              aria-label={`View QR code for ${item.title}`}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs enabled:active:scale-[0.96]"
                            >
                              <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>

                            {/* Delete button */}
                            <button
                              onClick={() => onDelete(item.id)}
                              aria-label={`Delete link ${item.title}`}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors enabled:active:scale-[0.96]"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* QR Modal */}
      {activeQrLink && (
        <LinkSuccessModal
          link={activeQrLink}
          onClose={() => setActiveQrLink(null)}
        />
      )}
    </section>
  );
}
