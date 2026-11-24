import fs from "fs";
import path from "path";
import os from "os";
import { customAlphabet } from "nanoid";
import { detectPlatform, generateDeepLinks, SupportedPlatform } from "./deeplink";

const nanoid = customAlphabet("23456789abcdefghijkmnopqrstuvwxyz", 6);

export interface LinkItem {
  id: string;
  originalUrl: string;
  platform: SupportedPlatform;
  title: string;
  createdAt: string;
  deepLinks: {
    iosUrl: string;
    androidIntent: string;
    webFallback: string;
  };
}

// In-memory global store to survive warm serverless invocations
declare global {
  // eslint-disable-next-line no-var
  var __APP_OPENER_DB__: Record<string, LinkItem> | undefined;
}

function getInitialSampleData(): LinkItem[] {
  const sample1Url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const dl1 = generateDeepLinks(sample1Url);

  const sample2Url = "https://www.instagram.com/natgeo";
  const dl2 = generateDeepLinks(sample2Url);

  const sample3Url = "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT";
  const dl3 = generateDeepLinks(sample3Url);

  return [
    {
      id: "yt-sample",
      originalUrl: sample1Url,
      platform: "youtube",
      title: "YouTube Video",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      deepLinks: {
        iosUrl: dl1.iosUrl,
        androidIntent: dl1.androidIntent,
        webFallback: dl1.webFallback,
      },
    },
    {
      id: "insta-sample",
      originalUrl: sample2Url,
      platform: "instagram",
      title: "National Geographic on Instagram",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      deepLinks: {
        iosUrl: dl2.iosUrl,
        androidIntent: dl2.androidIntent,
        webFallback: dl2.webFallback,
      },
    },
    {
      id: "spotify-sample",
      originalUrl: sample3Url,
      platform: "spotify",
      title: "Track on Spotify",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      deepLinks: {
        iosUrl: dl3.iosUrl,
        androidIntent: dl3.androidIntent,
        webFallback: dl3.webFallback,
      },
    },
  ];
}

function getDbFilePath(): { readPaths: string[]; writePath: string } {
  const localFile = path.join(process.cwd(), "data", "links.json");
  const tmpFile = path.join(os.tmpdir(), "app_opener_links.json");

  // On Vercel / AWS Lambda, process.cwd() is strictly read-only.
  // os.tmpdir() (/tmp) is the only writable filesystem location.
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT
  );

  return {
    readPaths: [localFile, tmpFile],
    writePath: isServerless ? tmpFile : localFile,
  };
}

function readDB(): Record<string, LinkItem> {
  if (globalThis.__APP_OPENER_DB__) {
    return globalThis.__APP_OPENER_DB__;
  }

  const { readPaths } = getDbFilePath();
  const merged: Record<string, LinkItem> = {};

  // Read existing data from bundled file and /tmp
  for (const filePath of readPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          Object.assign(merged, parsed);
        }
      }
    } catch {
      // Ignore read errors
    }
  }

  // Load sample links if nothing is stored yet
  if (Object.keys(merged).length === 0) {
    const samples = getInitialSampleData();
    for (const item of samples) {
      merged[item.id] = item;
    }
  }

  globalThis.__APP_OPENER_DB__ = merged;
  return merged;
}

function writeDB(data: Record<string, LinkItem>) {
  // Always update in-memory store first
  globalThis.__APP_OPENER_DB__ = data;

  // Persist to disk with safe fallbacks (never throw uncaught exception)
  const { writePath } = getDbFilePath();
  try {
    const dir = path.dirname(writePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(writePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    // If writing to the primary path failed (e.g. read-only filesystem), try /tmp
    const tmpFile = path.join(os.tmpdir(), "app_opener_links.json");
    if (writePath !== tmpFile) {
      try {
        fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), "utf8");
        return;
      } catch {
        // Fallback to in-memory only
      }
    }
    console.warn("Storage warning: Could not persist to disk, using in-memory store:", err);
  }
}

export function getAllLinks(): LinkItem[] {
  const db = readDB();
  return Object.values(db).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getLinkById(id: string): LinkItem | null {
  if (!id) return null;
  const db = readDB();
  const slug = id.toLowerCase();

  // 1. Check in-memory / disk database
  if (db[slug]) {
    return db[slug];
  }

  // 2. Stateless base64url fallback: decode URL if slug is an encoded target
  try {
    const decodedUrl = Buffer.from(id, "base64url").toString("utf8");
    if (/^https?:\/\//i.test(decodedUrl)) {
      const platform = detectPlatform(decodedUrl);
      const deepLinks = generateDeepLinks(decodedUrl);
      return {
        id,
        originalUrl: decodedUrl,
        platform,
        title: deepLinks.titleSuggestion || "App Opener Link",
        createdAt: new Date().toISOString(),
        deepLinks: {
          iosUrl: deepLinks.iosUrl,
          androidIntent: deepLinks.androidIntent,
          webFallback: deepLinks.webFallback,
        },
      };
    }
  } catch {
    // Not a base64url encoded URL
  }

  return null;
}

export function createLink(params: {
  url: string;
}): { success: boolean; link?: LinkItem; error?: string } {
  let { url } = params;

  url = url.trim();
  if (!url) {
    return { success: false, error: "URL is required." };
  }

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    return { success: false, error: "Enter a valid web URL." };
  }

  const db = readDB();

  let slug: string;
  do {
    slug = nanoid();
  } while (db[slug]);

  const platform = detectPlatform(url);
  const deepLinks = generateDeepLinks(url);

  const newLink: LinkItem = {
    id: slug,
    originalUrl: url,
    platform,
    title: deepLinks.titleSuggestion || "App Opener Link",
    createdAt: new Date().toISOString(),
    deepLinks: {
      iosUrl: deepLinks.iosUrl,
      androidIntent: deepLinks.androidIntent,
      webFallback: deepLinks.webFallback,
    },
  };

  db[slug] = newLink;
  writeDB(db);

  return { success: true, link: newLink };
}

export function deleteLink(id: string): boolean {
  const db = readDB();
  const slug = id.toLowerCase();
  if (!db[slug]) return false;

  delete db[slug];
  writeDB(db);
  return true;
}
