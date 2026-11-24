"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ExternalLink,
  Smartphone,
  AlertCircle,
  Zap,
  ArrowRight,
} from "lucide-react";
import { LinkItem } from "@/lib/db";
import { PLATFORMS } from "@/lib/deeplink";
import { PlatformIcon } from "@/components/PlatformIcon";
import QRCode from "qrcode";

export default function RedirectPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [link, setLink] = useState<LinkItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isIAB, setIsIAB] = useState(false);
  const [iabName, setIabName] = useState<string>("");
  const [os, setOs] = useState<"ios" | "android" | "desktop" | "other">("desktop");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    // Detect Client OS
    const ua = navigator.userAgent || "";
    let detectedOS: "ios" | "android" | "desktop" | "other" = "desktop";
    if (/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream) {
      detectedOS = "ios";
    } else if (/android/i.test(ua)) {
      detectedOS = "android";
    } else if (/windows|macintosh|linux/i.test(ua)) {
      detectedOS = "desktop";
    }
    setOs(detectedOS);

    // Detect In-App Browser (IAB)
    let detectedIAB = false;
    let browserName = "Standard browser";

    if (/Instagram/i.test(ua)) {
      detectedIAB = true;
      browserName = "Instagram";
    } else if (/FBAN|FBAV/i.test(ua)) {
      detectedIAB = true;
      browserName = "Facebook";
    } else if (/musical_ly|ByteLocale|TikTok/i.test(ua)) {
      detectedIAB = true;
      browserName = "TikTok";
    } else if (/Twitter/i.test(ua)) {
      detectedIAB = true;
      browserName = "X (Twitter)";
    } else if (/LinkedInApp/i.test(ua)) {
      detectedIAB = true;
      browserName = "LinkedIn";
    } else if (/MicroMessenger/i.test(ua)) {
      detectedIAB = true;
      browserName = "WeChat";
    }
    setIsIAB(detectedIAB);
    setIabName(browserName);

    // Fetch Link Data (No analytics call!)
    fetch(`/api/links/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.link) {
          setError(data.error || "Link not found or expired.");
          return;
        }

        const linkData: LinkItem = data.link;
        setLink(linkData);

        // Generate QR for desktop
        QRCode.toDataURL(window.location.href, { width: 220, margin: 1 })
          .then((url) => setQrDataUrl(url))
          .catch(() => {});

        // Auto-launch deep link on mobile
        if (detectedOS === "android") {
          try {
            window.location.href = linkData.deepLinks.androidIntent;
          } catch {}
        } else if (detectedOS === "ios") {
          try {
            window.location.href = linkData.deepLinks.iosUrl;
          } catch {}
        }
      })
      .catch(() => {
        setError("Unable to resolve link destination. Check your connection.");
      });
  }, [slug]);

  const handleOpenApp = () => {
    if (!link) return;
    if (os === "android") {
      window.location.href = link.deepLinks.androidIntent;
    } else if (os === "ios") {
      window.location.href = link.deepLinks.iosUrl;
    } else {
      window.location.href = link.originalUrl;
    }
  };

  const handleOpenBrowser = () => {
    if (!link) return;
    window.location.href = link.originalUrl;
  };

  if (error) {
    return (
      <main className="min-h-[100dvh] flex items-center justify-center p-4 bg-slate-50 text-slate-900">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-md">
          <AlertCircle className="mx-auto h-8 w-8 text-red-600 mb-3" aria-hidden="true" />
          <h1 className="text-base font-bold text-slate-900 mb-1">Link unavailable</h1>
          <p className="text-xs text-slate-500 mb-5">{error}</p>
          <a
            href="/"
            className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Go to AppOpener home
          </a>
        </div>
      </main>
    );
  }

  if (!link) {
    return (
      <main className="min-h-[100dvh] flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-900">
        <div className="h-8 w-8 rounded-full border-2 border-blue-600/20 border-t-blue-600 animate-spin mb-3" aria-hidden="true" />
        <p className="text-xs text-slate-500 font-mono tracking-wider">
          Connecting to app...
        </p>
      </main>
    );
  }

  const config = PLATFORMS[link.platform] || PLATFORMS.generic;

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between p-4 sm:p-6 bg-slate-50 text-slate-900">
      {/* Top minimal bar */}
      <header className="flex items-center justify-between max-w-md mx-auto w-full pt-1">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
            <Zap className="h-3 w-3 fill-current" aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-slate-900 tracking-tight">AppOpener</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 uppercase">
          {os} • {isIAB ? iabName : "Direct"}
        </span>
      </header>

      {/* Main Bridge Card */}
      <main className="w-full max-w-md mx-auto my-auto py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-lg">
          {/* App Icon */}
          <div className="inline-flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50 shadow-2xs"
              style={{
                color: config.color === "#000000" ? "#0f172a" : config.color,
              }}
            >
              <PlatformIcon platform={link.platform} size={36} />
            </div>
          </div>

          {/* Title & Destination */}
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight line-clamp-2 mb-1">
            {link.title}
          </h1>
          <p className="text-xs text-slate-500 font-mono truncate max-w-xs mx-auto mb-6">
            {link.originalUrl}
          </p>

          {/* In-App Browser context note */}
          {isIAB && (
            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50/80 p-3 text-left">
              <span className="block text-xs font-semibold text-blue-900 mb-0.5">
                Viewing inside {iabName}
              </span>
              <p className="text-[11px] text-blue-800">
                To sign in, subscribe, or like, open this directly in the official {config.name} app.
              </p>
            </div>
          )}

          {/* Primary CTA: Bright Blue */}
          <button
            onClick={handleOpenApp}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            <span>Open in {config.name}</span>
            <ArrowRight className="h-4 w-4 ml-0.5" aria-hidden="true" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleOpenBrowser}
            className="mt-3 w-full min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Continue in web browser</span>
          </button>

          {/* Desktop QR Code */}
          {os === "desktop" && qrDataUrl && (
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="block text-xs text-slate-500 mb-2">
                Scan with your phone to open in app:
              </span>
              <div className="inline-block rounded-lg bg-white p-2 shadow-xs border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="Scan to open on mobile"
                  className="w-24 h-24 mx-auto"
                />
              </div>
            </div>
          )}

          {/* In-app browser escape tip */}
          {isIAB && (
            <p className="mt-4 text-[11px] text-slate-500">
              If the app does not launch, tap <strong className="text-slate-700">⋮</strong> or <strong className="text-slate-700">⋯</strong> and select <span className="text-slate-800 font-medium">Open in external browser</span>.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] text-slate-400 py-2">
        AppOpener link service
      </footer>
    </div>
  );
}
