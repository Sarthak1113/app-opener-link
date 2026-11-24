export type SupportedPlatform =
  | "youtube"
  | "instagram"
  | "spotify"
  | "twitter"
  | "telegram"
  | "linkedin"
  | "tiktok"
  | "whatsapp"
  | "twitch"
  | "amazon"
  | "generic";

export interface PlatformConfig {
  id: SupportedPlatform;
  name: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  placeholder: string;
  packageNameAndroid?: string;
  description: string;
}

export const PLATFORMS: Record<SupportedPlatform, PlatformConfig> = {
  youtube: {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    badgeBg: "bg-red-500/10 text-red-500 border-red-500/20",
    badgeText: "text-red-500",
    icon: "youtube",
    placeholder: "https://www.youtube.com/watch?v=... or shorts / channel",
    packageNameAndroid: "com.google.android.youtube",
    description: "Opens directly in YouTube app for 1-tap subscribe, likes, and watch history.",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    badgeBg: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    badgeText: "text-pink-500",
    icon: "instagram",
    placeholder: "https://www.instagram.com/p/... or reels / profile",
    packageNameAndroid: "com.instagram.android",
    description: "Opens user profile, reel, or post inside native Instagram app with logged-in account.",
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    color: "#1DB954",
    badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    badgeText: "text-emerald-500",
    icon: "music",
    placeholder: "https://open.spotify.com/track/... or album / playlist",
    packageNameAndroid: "com.spotify.music",
    description: "Launches song, artist, or playlist in native Spotify with immediate playback.",
  },
  twitter: {
    id: "twitter",
    name: "X (Twitter)",
    color: "#000000",
    badgeBg: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
    badgeText: "text-neutral-300",
    icon: "twitter",
    placeholder: "https://x.com/username/status/... or profile",
    packageNameAndroid: "com.twitter.android",
    description: "Opens post or profile inside X app so followers can retweet, like, and follow.",
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    color: "#229ED9",
    badgeBg: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    badgeText: "text-sky-500",
    icon: "send",
    placeholder: "https://t.me/channel_name or joinchat",
    packageNameAndroid: "org.telegram.messenger",
    description: "Opens Telegram channels, chats, and bots directly without webview delay.",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    badgeBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    badgeText: "text-blue-500",
    icon: "linkedin",
    placeholder: "https://www.linkedin.com/in/... or posts",
    packageNameAndroid: "com.linkedin.android",
    description: "Direct connection to profile and company pages inside LinkedIn app.",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    color: "#FE2C55",
    badgeBg: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    badgeText: "text-rose-500",
    icon: "video",
    placeholder: "https://www.tiktok.com/@user/video/...",
    packageNameAndroid: "com.zhiliaoapp.musically",
    description: "Jumps directly to video in TikTok app for full audio and engagement features.",
  },
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    color: "#25D366",
    badgeBg: "bg-green-500/10 text-green-500 border-green-500/20",
    badgeText: "text-green-500",
    icon: "message-circle",
    placeholder: "https://wa.me/1234567890 or chat.whatsapp.com/...",
    packageNameAndroid: "com.whatsapp",
    description: "Starts direct WhatsApp chat or opens group invite instantly.",
  },
  twitch: {
    id: "twitch",
    name: "Twitch",
    color: "#9146FF",
    badgeBg: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    badgeText: "text-purple-500",
    icon: "tv",
    placeholder: "https://www.twitch.tv/streamer",
    packageNameAndroid: "tv.twitch.android.app",
    description: "Opens live stream directly in the Twitch mobile player.",
  },
  amazon: {
    id: "amazon",
    name: "Amazon",
    color: "#FF9900",
    badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    badgeText: "text-amber-500",
    icon: "shopping-bag",
    placeholder: "https://www.amazon.com/dp/... or product link",
    packageNameAndroid: "com.amazon.mShop.android.shopping",
    description: "Takes shoppers directly into Amazon app with 1-click checkout primed.",
  },
  generic: {
    id: "generic",
    name: "External Browser Escape",
    color: "#6366F1",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    badgeText: "text-indigo-400",
    icon: "globe",
    placeholder: "https://anywebsite.com",
    description: "Escapes restricted in-app browsers into user's default Chrome/Safari browser.",
  },
};

export interface DeepLinkResult {
  platform: SupportedPlatform;
  iosUrl: string;
  androidIntent: string;
  webFallback: string;
  titleSuggestion: string;
}

/**
 * Detect platform from raw URL
 */
export function detectPlatform(rawUrl: string): SupportedPlatform {
  try {
    const url = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");

    if (host.includes("youtube.com") || host === "youtu.be") return "youtube";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("spotify.com")) return "spotify";
    if (host === "twitter.com" || host === "x.com") return "twitter";
    if (host === "t.me" || host.includes("telegram.me") || host.includes("telegram.org")) return "telegram";
    if (host.includes("linkedin.com")) return "linkedin";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host === "wa.me" || host.includes("whatsapp.com")) return "whatsapp";
    if (host.includes("twitch.tv")) return "twitch";
    if (host.includes("amazon.") || host.includes("amzn.to")) return "amazon";

    return "generic";
  } catch {
    return "generic";
  }
}

/**
 * Generate platform-specific deep links (iOS custom scheme, Android Intent, and Web Fallback)
 */
export function generateDeepLinks(rawUrl: string): DeepLinkResult {
  let normalized = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    return {
      platform: "generic",
      iosUrl: normalized,
      androidIntent: normalized,
      webFallback: normalized,
      titleSuggestion: "Smart Link",
    };
  }

  const platform = detectPlatform(normalized);
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  const pathname = parsed.pathname;
  const search = parsed.search;

  switch (platform) {
    case "youtube": {
      // YouTube video or channel or short
      let videoId = "";
      if (host === "youtu.be") {
        videoId = pathname.slice(1).split("/")[0];
      } else if (pathname.includes("/watch")) {
        videoId = parsed.searchParams.get("v") || "";
      } else if (pathname.startsWith("/shorts/")) {
        videoId = pathname.replace("/shorts/", "").split("/")[0];
      }

      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.google.android.youtube;scheme=https;end`;
      const iosUrl = videoId
        ? `vnd.youtube://${videoId}`
        : `youtube://${host}${pathname}${search}`;

      return {
        platform: "youtube",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: videoId ? `YouTube Video (${videoId})` : "YouTube Link",
      };
    }

    case "instagram": {
      // Instagram profile, reel, or post
      const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
      const segments = cleanPath.split("/");

      let iosUrl = `instagram://app`;
      let titleSuggestion = "Instagram";

      if (segments[0] === "p" && segments[1]) {
        // Post
        iosUrl = `instagram://media?id=${segments[1]}`;
        titleSuggestion = `Instagram Post (${segments[1]})`;
      } else if (segments[0] === "reel" && segments[1]) {
        // Reel
        iosUrl = `instagram://media?id=${segments[1]}`;
        titleSuggestion = `Instagram Reel (${segments[1]})`;
      } else if (segments[0] && !["explore", "direct", "accounts", "stories"].includes(segments[0])) {
        // Profile
        const username = segments[0];
        iosUrl = `instagram://user?username=${username}`;
        titleSuggestion = `@${username} on Instagram`;
      }

      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.instagram.android;scheme=https;end`;

      return {
        platform: "instagram",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion,
      };
    }

    case "spotify": {
      // open.spotify.com/track/id, /album/id, /playlist/id, /artist/id
      const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
      const [type, id] = cleanPath.split("/");

      let iosUrl = normalized;
      let titleSuggestion = "Spotify Music";
      if (type && id) {
        iosUrl = `spotify:${type}:${id}`;
        titleSuggestion = `Spotify ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      }

      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.spotify.music;scheme=https;end`;

      return {
        platform: "spotify",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion,
      };
    }

    case "twitter": {
      // x.com/user/status/id or x.com/user
      const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
      const segments = cleanPath.split("/");

      let iosUrl = `twitter://timeline`;
      let titleSuggestion = "X / Twitter";

      if (segments.length >= 3 && segments[1] === "status") {
        const tweetId = segments[2];
        iosUrl = `twitter://status?id=${tweetId}`;
        titleSuggestion = `Post by @${segments[0]}`;
      } else if (segments.length === 1 && segments[0]) {
        iosUrl = `twitter://user?screen_name=${segments[0]}`;
        titleSuggestion = `@${segments[0]} on X`;
      }

      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.twitter.android;scheme=https;end`;

      return {
        platform: "twitter",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion,
      };
    }

    case "telegram": {
      // t.me/channel or t.me/channel/123
      const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
      const segments = cleanPath.split("/");
      const domain = segments[0] || "";
      const post = segments[1] || "";

      let iosUrl = `tg://resolve?domain=${domain}`;
      if (post) {
        iosUrl += `&post=${post}`;
      }

      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=org.telegram.messenger;scheme=https;end`;

      return {
        platform: "telegram",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: domain ? `Telegram @${domain}` : "Telegram Link",
      };
    }

    case "linkedin": {
      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.linkedin.android;scheme=https;end`;
      const iosUrl = `linkedin://${pathname.replace(/^\//, "")}`;

      return {
        platform: "linkedin",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: "LinkedIn Profile / Post",
      };
    }

    case "tiktok": {
      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.zhiliaoapp.musically;scheme=https;end`;
      const iosUrl = `snssdk1233://${pathname.replace(/^\//, "")}`;

      return {
        platform: "tiktok",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: "TikTok Video / Profile",
      };
    }

    case "whatsapp": {
      let phone = "";
      let text = parsed.searchParams.get("text") || "";
      if (host === "wa.me") {
        phone = pathname.replace(/^\/+/, "");
      } else if (parsed.searchParams.has("phone")) {
        phone = parsed.searchParams.get("phone") || "";
      }

      const iosUrl = phone
        ? `whatsapp://send?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ""}`
        : `whatsapp://chat`;
      const androidIntent = `intent://send?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ""}#Intent;package=com.whatsapp;scheme=whatsapp;end`;

      return {
        platform: "whatsapp",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: phone ? `WhatsApp Chat (${phone})` : "WhatsApp Link",
      };
    }

    case "twitch": {
      const channel = pathname.replace(/^\/+|\/+$/g, "").split("/")[0] || "";
      const iosUrl = channel ? `twitch://stream/${channel}` : `twitch://`;
      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=tv.twitch.android.app;scheme=https;end`;

      return {
        platform: "twitch",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: channel ? `Twitch Stream (${channel})` : "Twitch Link",
      };
    }

    case "amazon": {
      const androidIntent = `intent://${host}${pathname}${search}#Intent;package=com.amazon.mShop.android.shopping;scheme=https;end`;
      const iosUrl = `com.amazon.mobile.shopping.web://${host}${pathname}${search}`;

      return {
        platform: "amazon",
        iosUrl,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: "Amazon Product",
      };
    }

    case "generic":
    default: {
      // Escape Android in-app browsers into default Chrome or system browser!
      const androidIntent = `intent://${host}${pathname}${search}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
      return {
        platform: "generic",
        iosUrl: normalized,
        androidIntent,
        webFallback: normalized,
        titleSuggestion: host,
      };
    }
  }
}
