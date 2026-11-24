import React from "react";
import { SupportedPlatform, PLATFORMS } from "@/lib/deeplink";
import { PlatformIcon } from "./PlatformIcon";

interface PlatformBadgeProps {
  platform: SupportedPlatform;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function PlatformBadge({
  platform,
  showIcon = true,
  className = "",
  size = "md",
}: PlatformBadgeProps) {
  const config = PLATFORMS[platform] || PLATFORMS.generic;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-2.5 py-1 text-xs gap-2",
  }[size];

  const iconSizes = {
    sm: 13,
    md: 15,
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border border-slate-200 bg-slate-100 text-slate-800 ${sizeClasses} ${className}`}
    >
      {showIcon && (
        <span
          className="inline-flex shrink-0 items-center justify-center"
          style={{ color: config.color === "#000000" ? "#0f172a" : config.color }}
          aria-hidden="true"
        >
          <PlatformIcon platform={platform} size={iconSizes} />
        </span>
      )}
      <span>{config.name}</span>
    </span>
  );
}
