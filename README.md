# 🎬 Netflix Clone

A full-stack, production-grade video streaming platform built with **Next.js 16 (App Router)**, **React 19**, **Prisma + PostgreSQL**, **JWT authentication**, and **Mux** for adaptive HLS video delivery — wrapped in a polished, animated, 3D-enhanced Netflix-style interface.

> A complete streaming experience: browse 50+ real films across 20 genres, watch official trailers, save titles to your list, track watch progress, and manage content through an admin dashboard.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Data Model](#-data-model)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [How Video Upload Works](#-how-video-upload-works)
- [UI / Design System](#-ui--design-system)
- [Deployment](#-deployment)
- [Security Notes](#-security-notes)
- [Roadmap](#-roadmap)
- [License & Attribution](#-license--attribution)

---

## ✨ Features

### Viewer experience
- **50+ real movies** across 20 genres (Sci-Fi, Action, Romance, Thriller, Drama, Horror, Animation, Crime, Fantasy, and more) with real posters, cast, directors, and IMDb ratings
- **Cinematic home page** with a featured hero and horizontally-scrolling genre rows
- **Official trailers** — click-to-play YouTube trailer embeds on every title (studio-provided, licensing-clean)
- **Browse by genre** with interactive filter tabs
- **Live search** across titles, genres, and cast members with genre chips
- **My List** — save and remove titles, persisted per user in the database
- **Watch history / Continue Watching** with progress tracking
- **User profiles** showing real account data and multiple profile support

### Authentication & authorization
- **Custom JWT auth** (no third-party auth library) using `jose` for signing/verification
- **bcrypt** password hashing (cost factor 12)
- **HttpOnly, SameSite cookies** with 7-day expiry
- **Route protection middleware** guarding `/watch`, `/mylist`, `/profile`, and `/admin`
- **Role-based access** (`USER` / `ADMIN`) with an admin-only dashboard

### Admin
- **Video upload** via Mux resumable direct uploads
- **Content library table** listing all videos with live processing status
- **Delete / manage** existing titles
- **Analytics tiles** (total videos, ready, processing)

### Design
- **3D interactive cards** that tilt toward your cursor with depth, glow, and shine sweeps
- **Glassmorphic navbar** that frosts on scroll, animated nav underlines
- **Cinematic layered background** — drifting aurora blobs, film-grain texture, and vignette
- **Scroll-reveal animations** using `IntersectionObserver`
- **Fully responsive** with `prefers-reduced-motion` support for accessibility

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.3 (App Router, Turbopack) |
| **UI** | React 19, Tailwind CSS v4, custom CSS animations |
| **Language** | TypeScript 5.7 |
| **Database** | PostgreSQL |
| **ORM** | Prisma 6.19 |
| **Auth** | `jose` (JWT) + `bcryptjs` |
| **Validation** | Zod |
| **Video** | Mux (`@mux/mux-node`, `@mux/mux-player-react`, `@mux/mux-uploader-react`) |
| **Trailers** | YouTube embeds |
| **Images** | TMDB CDN posters/backdrops |
| **Deployment** | Vercel + managed Postgres (Neon / Supabase) |

---

## 🏗 Architecture

```
Browser
   │
   ├── Next.js App Router (Server + Client Components)
   │      │
   │      ├── Route Handlers  (/api/*)  ──►  Prisma  ──►  PostgreSQL
   │      │
   │      └── Middleware (JWT verification, route guards)
   │
   ├── Mux  ──►  Direct resumable upload  ──►  HLS transcoding
   │      └── Webhook (video.asset.ready) ──► persist playbackId
   │
   └── YouTube (official trailer embeds) + TMDB (poster images)
```

This is a **single deployable Next.js service** — the API (route handlers), server rendering, and static assets all ship together. No separate backend server is needed; Next.js route handlers own the entire API surface.

---

## 📁 Project Structure

```
Netflix_Project/
├── prisma/
│   ├── schema.prisma           # Data models (User, Video, Genre, etc.)
│   └── migrations/             # Versioned SQL migrations
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/          # Login page
│   │   │   └── signup/         # Signup page
│   │   ├── admin/dashboard/    # Admin content management
│   │   ├── api/
│   │   │   ├── auth/           # login, signup, logout, session
│   │   │   ├── admin/          # uploads, videos CRUD
│   │   │   ├── watchlist/      # My List CRUD
│   │   │   ├── history/        # Watch progress
│   │   │   ├── mux/webhook/    # Mux asset-ready webhook
│   │   │   └── health/         # Liveness check
│   │   ├── browse/             # Browse by genre
│   │   ├── search/             # Search page
│   │   ├── title/[id]/         # Title detail page
│   │   ├── watch/[id]/         # Trailer / watch page
│   │   ├── mylist/             # My List page
│   │   ├── profile/            # User profile
│   │   ├── layout.tsx          # Root layout + background
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Full design system
│   ├── components/
│   │   ├── navbar.tsx          # Glassmorphic nav
│   │   ├── video-card.tsx      # 3D tilt card
│   │   ├── video-row.tsx       # Scrollable genre rail
│   │   ├── reveal.tsx          # Scroll-reveal wrapper
│   │   ├── watchlist-button.tsx
│   │   └── video-player/
│   │       ├── trailer-player.tsx     # YouTube embed player
│   │       └── mux-video-player.tsx   # Mux HLS player
│   └── lib/
│       ├── auth.ts             # JWT session helpers
│       ├── prisma.ts           # Prisma singleton
│       └── demo-data.ts        # 50 real movies dataset
├── middleware.ts               # Route protection
├── next.config.ts              # Image domains config
└── .env.example                # Environment template
```

---

## 🗄 Data Model

```prisma
User          # id, email, passwordHash, name, plan, role, timestamps
Profile       # multi-profile per user (name, avatar, isKids)
Video         # title, slug, description, mux IDs, status, cast[], releaseYear
Genre         # name, slug
VideoGenre    # many-to-many join (Video ↔ Genre)
WatchHistory  # userId + videoId, progressSeconds, completed
Watchlist     # userId + videoId (saved titles)
Review        # userId + videoId, rating, comment
```

**Enums:** `SubscriptionPlan` (FREE / BASIC / STANDARD / PREMIUM), `UserRole` (USER / ADMIN), `VideoStatus` (DRAFT / PROCESSING / READY / ERRORED).

---

## 🔌 API Reference

All API routes are Next.js Route Handlers under `src/app/api/`.

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/signup` | Create account, hash password, issue session | Public |
| `POST` | `/api/auth/login` | Validate credentials, issue JWT cookie | Public |
| `POST` | `/api/auth/logout` | Clear session cookie | Public |
| `GET`  | `/api/auth/session` | Return current user from JWT | Public |

### Watchlist & History
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/watchlist` | List saved titles | User |
| `POST` | `/api/watchlist` | Add a title (idempotent upsert) | User |
| `DELETE` | `/api/watchlist` | Remove a title | User |
| `GET` | `/api/history` | Last 30 watched items | User |
| `PUT` | `/api/history` | Upsert watch progress | User |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/admin/uploads` | Create Mux direct-upload URL + DB record | Admin |
| `GET` | `/api/admin/videos` | List all videos with genres | Admin |
| `PATCH` | `/api/admin/videos/[id]` | Update video metadata | Admin |
| `DELETE` | `/api/admin/videos/[id]` | Delete a video | Admin |

### System
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/mux/webhook` | Handle `video.asset.ready`, persist playback ID | Mux |
| `GET` | `/api/health` | Liveness check | Public |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- **PostgreSQL** database (local, or managed via [Neon](https://neon.tech) / [Supabase](https://supabase.com))
- A **Mux** account (optional — only needed to upload real videos)

### 1. Clone & install
```bash
git clone <your-repo-url>
cd Netflix_Project
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Fill in the values (see [Environment Variables](#-environment-variables)).

### 3. Set up the database
```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

### 4. Make yourself an admin
Run this against your database (e.g. via `npm run prisma:studio` or `psql`):
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'you@example.com';
```

### 5. Run the dev server
```bash
npm run dev
```
Open **http://localhost:3000** 🎉

> **Note:** The UI ships with 50 real demo movies (posters, trailers, metadata) so it looks complete out of the box — no database content required to explore it. Uploaded videos flow through Mux and the database.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | Long random string for signing JWTs |
| `NEXT_PUBLIC_APP_URL` | ✅ | App origin (e.g. `http://localhost:3000`) |
| `MUX_TOKEN_ID` | ⬜ | Mux API token ID (for uploads) |
| `MUX_TOKEN_SECRET` | ⬜ | Mux API token secret |
| `MUX_WEBHOOK_SECRET` | ⬜ | Mux webhook signing secret (production) |

Generate a strong `AUTH_SECRET`:
```bash
openssl rand -base64 48
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Regenerate the Prisma client |
| `npm run prisma:migrate` | Create & apply a dev migration |
| `npm run prisma:studio` | Open Prisma Studio (visual DB browser) |

---

## 🎥 How Video Upload Works

1. **Admin submits metadata** (title, genres, cast, year, duration) via the dashboard.
2. **Server** validates with Zod, creates a `Video` record (`status: PROCESSING`), links genres, and requests a **Mux Direct Upload URL**.
3. **Browser uploads the file directly to Mux** in resumable chunks — the file never touches your server.
4. **Mux transcodes** the video into adaptive HLS renditions.
5. **Mux fires a `video.asset.ready` webhook** to `/api/mux/webhook`.
6. **Server persists** the `muxPlaybackId` + thumbnail and flips status to `READY`.
7. **Playback** streams from `https://stream.mux.com/{playbackId}.m3u8`.

---

## 🎨 UI / Design System

Everything lives in `src/app/globals.css` as a token-driven design system:

- **Motion tokens** — custom cubic-bezier easing curves (`--ease-smooth`, `--ease-bounce`, `--ease-out`)
- **Glassmorphism tokens** — `--glass-bg`, `--glass-border`, `--glass-blur`
- **Keyframe library** — `fadeUp`, `heroReveal`, `sheen`, `pulseGlow`, `floaty`, `auroraDrift`
- **3D cards** — mouse-tracked `rotateX`/`rotateY` tilt with cursor-follow glow and shine sweep
- **Layered background** — base gradient + drifting aurora blobs + SVG film grain + vignette
- **Accessibility** — full `prefers-reduced-motion` fallback

---

## ☁️ Deployment

### Recommended: Vercel + Neon/Supabase

1. **Provision Postgres** on Neon or Supabase; copy the connection string.
2. **Import the repo into Vercel.**
3. **Set environment variables** in Vercel: `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL` (production origin), `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`, `MUX_WEBHOOK_SECRET`.
4. **Apply migrations** against production (never use `migrate dev`):
   ```bash
   npx prisma migrate deploy
   ```
5. **Configure Mux:**
   - Set the Direct Upload **CORS origin** to your deployed domain.
   - Add the webhook URL: `https://YOUR_DOMAIN/api/mux/webhook`.
6. **Verify the full loop:** admin creates an upload → Mux emits `video.asset.ready` → DB record becomes `READY` → playback opens.

A single Next.js service handles everything — no separate backend to deploy.

---

## 🔒 Security Notes

- ✅ Passwords hashed with bcrypt (cost 12)
- ✅ JWTs signed with HS256, stored in HttpOnly cookies
- ✅ Zod validation on all API inputs
- ✅ Generic 401s on login (no user enumeration)
- ✅ Role checks on every admin route
- ⚠️ **Before production:** implement **Mux webhook signature verification** at `/api/mux/webhook` using `MUX_WEBHOOK_SECRET`, and use **signed Mux playback IDs** for non-public content.
- ⚠️ Never deploy without setting a real `AUTH_SECRET` (a dev fallback exists only for local use).

---

## 🗺 Roadmap

- [ ] Mux webhook signature verification
- [ ] Wire home/browse pages to live DB content (currently demo data)
- [ ] Reviews & ratings UI (model already exists)
- [ ] Password reset / email verification
- [ ] `callbackUrl` redirect after login
- [ ] TV series / seasons / episodes support
- [ ] Subscription/plan enforcement
- [ ] Automated tests (unit + e2e)

---

## 📄 License & Attribution

This is a **portfolio / educational project** and is **not affiliated with Netflix, Inc.**

- Movie **posters and backdrops** are served from [The Movie Database (TMDB)](https://www.themoviedb.org). This product uses the TMDB API but is not endorsed or certified by TMDB.
- **Trailers** are embedded from official studio YouTube channels for promotional use.
- All film titles, artwork, and trailers remain the property of their respective studios and rights holders.
- The "Netflix" name and branding are trademarks of Netflix, Inc., used here only for educational demonstration.

Built with ❤️ using Next.js, React, Prisma, and Mux.
