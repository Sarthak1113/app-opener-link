"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Link as LinkIcon,
  ArrowRight,
  AlertCircle,
  Clipboard,
  X,
} from "lucide-react";
import { detectPlatform, PLATFORMS } from "@/lib/deeplink";
import { PlatformBadge } from "./PlatformBadge";
import { LinkItem } from "@/lib/db";
import { LinkSuccessModal } from "./LinkSuccessModal";

interface LinkCreatorProps {
  onLinkCreated?: (newLink: LinkItem) => void;
}

export function LinkCreator({ onLinkCreated }: LinkCreatorProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [createdLink, setCreatedLink] = useState<LinkItem | null>(null);

  const detectedPlatform = detectPlatform(url);
  const platformConfig = PLATFORMS[detectedPlatform];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setErrorMessage("");
        setStatusMessage("Pasted URL from clipboard");
      }
    } catch {
      // Clipboard read not permitted
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setErrorMessage("Enter a destination web URL to generate an opener link.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmedUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Unable to create opener link. Check the input and try again.");
        setIsLoading(false);
        return;
      }

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.65 },
        });
      }

      setStatusMessage("Link created successfully");
      setCreatedLink(data.link);
      if (onLinkCreated) {
        onLinkCreated(data.link);
      }

      setUrl("");
    } catch {
      setErrorMessage("Unable to connect to the server. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="generator" aria-labelledby="generator-heading" className="py-6">
      <div role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs">
          <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="url-input"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Destination URL
              </label>

              {/* Responsive Layout: Stacks on mobile (input then button below), inline on desktop */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                {/* Input with Icon and Paste/Clear Action */}
                <div className="relative flex-1 flex items-center rounded-xl border border-slate-300 bg-slate-50/70 p-1.5 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/20 transition-colors">
                  <div className="pl-3 pr-2 text-slate-400 pointer-events-none" aria-hidden="true">
                    <LinkIcon className="h-5 w-5" />
                  </div>

                  <input
                    id="url-input"
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    aria-invalid={Boolean(errorMessage)}
                    aria-describedby={errorMessage ? "url-error" : undefined}
                    className="w-full bg-transparent px-2 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    autoComplete="off"
                    spellCheck="false"
                  />

                  <div className="flex items-center gap-1.5 pr-1 shrink-0">
                    {url ? (
                      <button
                        type="button"
                        onClick={() => setUrl("")}
                        aria-label="Clear destination URL"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePaste}
                        aria-label="Paste URL from clipboard"
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors"
                      >
                        <Clipboard className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        <span>Paste</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Create Link Button: Full width on mobile directly AFTER input, inline on desktop */}
                <button
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                  className="w-full sm:w-auto inline-flex min-h-[46px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-[transform,background-color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white enabled:active:scale-[0.96] disabled:opacity-50 shrink-0"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" aria-hidden="true" />
                      <span>Creating...</span>
                    </span>
                  ) : (
                    <>
                      <span>Create link</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

              {/* Detected Platform Indicator */}
              {url.trim() && (
                <div className="mt-2.5 flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Target platform:</span>
                    <PlatformBadge platform={detectedPlatform} size="sm" />
                  </div>
                  <span className="text-slate-500 text-xs hidden sm:inline">
                    {platformConfig.description}
                  </span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                id="url-error"
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700"
              >
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Result Modal */}
      {createdLink && (
        <LinkSuccessModal
          link={createdLink}
          onClose={() => setCreatedLink(null)}
        />
      )}
    </section>
  );
}
