# AppOpener — Smart App Opener & Deep Link Bridge

AppOpener is a high-converting, privacy-respecting link bridge and URL opener web service designed for content creators, marketers, and developers.

It eliminates the "trapped in-app browser" barrier on Instagram, TikTok, Twitter/X, Facebook, and LinkedIn by automatically opening destination links (YouTube, Spotify, Instagram, Telegram, etc.) inside the user's native mobile app where they are already logged in.

---

## ⚡ Key Features

1. **Smart Universal App Opener Engine**:
   - **Android Intent Support**: Uses `intent://...#Intent;package=...;end` schemes to launch the target app directly via Android OS or break out to the user's default browser (Chrome/Brave).
   - **iOS Custom Scheme & Universal Fallback**: Generates `vnd.youtube://`, `instagram://`, `spotify:`, `tg://`, etc., with responsive user-touch triggers that iOS Safari permits.
   - **In-App Browser (IAB) Detection**: Automatically detects if the visitor is trapped inside Instagram, TikTok, Facebook, or Twitter webviews and presents an instant "Open in App" button with instructions.

2. **Supported Apps & Platforms**:
   - **YouTube**: Videos, Shorts, Channels, Playlists (`com.google.android.youtube` / `vnd.youtube://`)
   - **Instagram**: Profiles, Reels, Posts (`com.instagram.android` / `instagram://`)
   - **Spotify**: Tracks, Albums, Playlists, Artists (`com.spotify.music` / `spotify:`)
   - **X / Twitter**: Tweets, Profiles (`com.twitter.android` / `twitter://`)
   - **Telegram**: Channels, Messages, Bots (`org.telegram.messenger` / `tg://resolve`)
   - **LinkedIn**: Profiles, Articles, Posts (`com.linkedin.android` / `linkedin://`)
   - **TikTok**: Videos, User Profiles (`com.zhiliaoapp.musically` / `snssdk1233://`)
   - **WhatsApp**: Direct Chats (`wa.me`) & Group Invites (`whatsapp://`)
   - **Twitch**: Live Streams & Channels (`tv.twitch.android.app` / `twitch://`)
   - **Amazon**: Product links with 1-click checkout (`com.amazon.mShop.android.shopping`)
   - **Generic Web Link**: Escapes restricted in-app browsers into standard Chrome / Safari.

3. **Creator Link Management & Real-Time Analytics**:
   - Custom aliases (e.g., `/go/my-hit-video` or auto-generated nanoid slugs).
   - 1-Click Copy with feedback.
   - High-resolution **QR Code Generator** with PNG download for Instagram stories, YouTube cards, and physical flyers.
   - Real-time click counters with Device OS breakdown (iOS vs. Android vs. Desktop) and In-App Browser bypass percentage.
   - Activity timeline showing the last 20 click events.

4. **Modern UI & Aesthetic**:
   - Built with Next.js 14 App Router, React 18, Tailwind CSS, Lucide icons, and Canvas Confetti.
   - Dark theme with glassmorphism, responsive across mobile phones, tablets, and desktop.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 20/22/26)
- npm or pnpm

### Running in Development
```bash
# Navigate to the project directory
cd C:\Users\sarth\.gemini\antigravity\scratch\app-opener

# Start Next.js development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Building for Production
```bash
# Build optimized production bundle
npm run build

# Start production server on port 3000
npm start
```

---

## 📁 Project Architecture

```
app-opener/
├── app/
│   ├── api/
│   │   └── links/
│   │       ├── route.ts              # GET all links, POST create link
│   │       └── [slug]/
│   │           ├── route.ts          # GET link details, DELETE link
│   │           └── click/route.ts    # POST record click analytics
│   ├── go/[slug]/page.tsx            # Smart redirect interstitial page
│   ├── open/[slug]/page.tsx          # Alias route for /open/:slug
│   ├── stats/[slug]/page.tsx         # Detailed link analytics dashboard
│   ├── layout.tsx                    # Root layout & SEO meta tags
│   ├── page.tsx                      # Homepage with Hero, Creator & Links list
│   └── globals.css                   # Tailwind CSS styling & glassmorphism
├── components/
│   ├── Navbar.tsx                    # Navigation bar with branding
│   ├── LinkCreator.tsx               # Main link generator input card
│   ├── LinksList.tsx                 # Link manager with analytics preview
│   ├── LinkSuccessModal.tsx          # Success modal with QR code & share tools
│   ├── InAppBrowserDemo.tsx          # Before/After interactive demonstration
│   ├── PlatformBadge.tsx             # Colored brand badge
│   ├── PlatformIcon.tsx              # SVG brand icons (YouTube, Insta, etc.)
│   ├── PlatformShowcase.tsx          # Grid of supported platforms & deep links
│   ├── FAQ.tsx                       # Frequently asked questions accordion
│   └── Footer.tsx                    # Footer with operational status
├── lib/
│   ├── deeplink.ts                   # Core deep link parser & scheme generator
│   └── db.ts                         # File-based JSON database with click logging
├── data/
│   └── links.json                    # Persistent link storage & stats
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔒 In-App Browser (IAB) Escape Logic

When an app opener link is loaded:
1. **User Agent Inspection**: Detects whether the visitor is on Android, iOS, or Desktop, and flags if they are inside Instagram, TikTok, Facebook, or Twitter webviews.
2. **Android Execution**: Constructs a Chrome Intent URL:
   ```
   intent://www.youtube.com/watch?v=...#Intent;package=com.google.android.youtube;scheme=https;end
   ```
   This prompts the Android package manager to open the official app directly.
3. **iOS Execution**: Loads a bridge page with an immediate custom URI trigger (`vnd.youtube://...`) and provides a tactile, prominent CTA button for Apple's strict user-gesture security policies.
4. **Analytics Log**: Silently records the click with OS, detected webview, and timestamp in the background.
