"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  Check,
  Copy,
  ExternalLink,
  Download,
  X,
} from "lucide-react";
import { LinkItem } from "@/lib/db";
import { PlatformBadge } from "./PlatformBadge";
import { PLATFORMS } from "@/lib/deeplink";

interface LinkSuccessModalProps {
  link: LinkItem;
  onClose: () => void;
}

export function LinkSuccessModal({ link, onClose }: LinkSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const fullShortUrl = `${origin}/go/${link.id}`;
  const config = PLATFORMS[link.platform] || PLATFORMS.generic;

  useEffect(() => {
    if (fullShortUrl) {
      QRCode.toDataURL(fullShortUrl, {
        width: 240,
        margin: 1,
        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [fullShortUrl]);

  useEffect(() => {
    copyButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `appopener-${link.id}-qr.png`;
    a.click();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl my-auto transition-all duration-200 ease-out">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 enabled:active:scale-[0.96]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-8">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <PlatformBadge platform={link.platform} size="sm" />
            <span className="text-xs font-mono text-slate-500 truncate max-w-[200px]">/go/{link.id}</span>
          </div>
          <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-heading">
            App opener link ready
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Share this URL. Mobile visitors will launch {config.name} directly.
          </p>
        </div>

        {/* URL Copy Bar (responsive for mobile) */}
        <div className="mb-5">
          <label htmlFor="modal-short-url" className="sr-only">
            Opener URL
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 p-1.5 focus-within:border-blue-600 focus-within:bg-white">
            <input
              id="modal-short-url"
              type="text"
              readOnly
              value={fullShortUrl}
              className="w-full bg-transparent px-2.5 py-1.5 text-xs sm:text-sm font-mono text-blue-700 focus:outline-none select-all"
            />
            <button
              ref={copyButtonRef}
              onClick={handleCopy}
              className={`inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all shrink-0 enabled:active:scale-[0.96] ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* QR Code and Target Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 mb-5">
          {/* QR Code */}
          <div className="flex flex-col items-center justify-center text-center">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`QR code for ${fullShortUrl}`}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg bg-white p-1.5 shadow-2xs border border-slate-200"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg bg-slate-200 animate-pulse" />
            )}
            <button
              onClick={handleDownloadQR}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 rounded focus-visible:ring-2 focus-visible:ring-blue-600 enabled:active:scale-[0.96]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download QR</span>
            </button>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between space-y-3 pt-2 sm:pt-0">
            <div>
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Destination
              </span>
              <p className="text-xs text-slate-700 font-mono break-all line-clamp-3">
                {link.originalUrl}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={fullShortUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-all enabled:active:scale-[0.96]"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Test redirect in new tab</span>
              </a>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full min-h-[42px] rounded-lg border border-slate-300 bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all enabled:active:scale-[0.96]"
        >
          Done
        </button>
      </div>
    </div>
  );
}
