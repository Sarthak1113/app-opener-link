import fs from "fs";
import path from "path";
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

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "links.json");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
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

function readDB(): Record<string, LinkItem> {
  ensureDirectory();
  if (!fs.existsSync(DB_FILE)) {
    const initialList = getInitialSampleData();
    const map: Record<string, LinkItem> = {};
    for (const item of initialList) {
      map[item.id] = item;
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(map, null, 2), "utf8");
    return map;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeDB(data: Record<string, LinkItem>) {
  ensureDirectory();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function getAllLinks(): LinkItem[] {
  const db = readDB();
  return Object.values(db).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getLinkById(id: string): LinkItem | null {
  const db = readDB();
  return db[id.toLowerCase()] || null;
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
