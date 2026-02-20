# Swelly Web Dashboard — Full Implementation Guide

> **Generated:** February 20, 2026  
> **Project:** swelly-website2025  
> **Stack:** Next.js 14 · React 18 · NextAuth.js 4 · Tailwind CSS 3 · TypeScript 5  
> **Bot Backend:** Separate codebase (communicates via REST API / WebSocket)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Codebase Audit](#2-current-codebase-audit)
3. [Architecture Overview](#3-architecture-overview)
4. [Pre-Requisites & Environment Setup](#4-pre-requisites--environment-setup)
5. [Phase 1 — Foundation & Infrastructure](#5-phase-1--foundation--infrastructure)
6. [Phase 2 — Authentication & Authorization](#6-phase-2--authentication--authorization)
7. [Phase 3 — Bot API Integration Layer](#7-phase-3--bot-api-integration-layer)
8. [Phase 4 — Server Selection & Guild Management](#8-phase-4--server-selection--guild-management)
9. [Phase 5 — Per-Server Dashboard Pages](#9-phase-5--per-server-dashboard-pages)
10. [Phase 6 — Real-Time Features](#10-phase-6--real-time-features)
11. [Phase 7 — Premium & Billing Integration](#11-phase-7--premium--billing-integration)
12. [Phase 8 — Admin Panel](#12-phase-8--admin-panel)
13. [Phase 9 — Analytics & Metrics](#13-phase-9--analytics--metrics)
14. [Phase 10 — Performance Optimization](#14-phase-10--performance-optimization)
15. [Phase 11 — Testing & QA](#15-phase-11--testing--qa)
16. [Phase 12 — Deployment & CI/CD](#16-phase-12--deployment--cicd)
17. [Bot Backend API Contract](#17-bot-backend-api-contract)
18. [Database Schema Design](#18-database-schema-design)
19. [Security Checklist](#19-security-checklist)
20. [File & Folder Structure (Target)](#20-file--folder-structure-target)
21. [Environment Variables Reference](#21-environment-variables-reference)
22. [Team Task Breakdown & Sprint Plan](#22-team-task-breakdown--sprint-plan)
23. [Common Pitfalls & Edge Cases](#23-common-pitfalls--edge-cases)
24. [Appendix — Code Snippets & Examples](#24-appendix--code-snippets--examples)

---

## 1. Executive Summary

The Swelly website already has a working marketing site, auth flow, status page, ticket system, premium page, and placeholder dashboard. The goal is to build a **fully functional web dashboard** that lets Discord server administrators:

- View and manage their servers where Swelly is installed
- Configure bot settings per-server (prefix, DJ role, autoplay, volume, filters, etc.)
- Control music playback in real-time (now playing, queue, skip, pause, volume)
- View server-level analytics (command usage, listening stats, top songs)
- Manage premium subscriptions and billing
- Access a moderation log and audit trail

The bot's backend runs in a **separate codebase**. The dashboard communicates with it via a **REST API** (and optionally WebSocket for real-time features). This guide covers every step from architecture to deployment.

---

## 2. Current Codebase Audit

### 2.1 What Already Exists

| Area | Status | Files |
|------|--------|-------|
| **Authentication** | ✅ Working | `lib/authOptions.ts` — Discord OAuth2 with `identify email guilds` scopes |
| **Session Management** | ✅ Working | NextAuth.js JWT strategy, `accessToken` stored in session |
| **User Guild Fetching** | ✅ Working | `app/api/me/guilds/route.ts` — fetches user's guilds, filters by `MANAGE_SERVER` |
| **Discord Profile** | ✅ Working | `app/api/discord-profile/route.ts` — fetches `/users/@me` |
| **Discord User Lookup** | ✅ Working | `app/api/discord-user/[id]/route.ts` — bot-token based user lookup |
| **Status Page** | ✅ Working | `app/status/page.tsx` — shard grid, stats cards, charts (mock data) |
| **Dashboard Layout** | ⚠️ Placeholder | `app/dashboard/page.tsx` — "Under Construction" message |
| **Guild Settings** | ⚠️ Local-only | `components/dashboard/GuildSettingsClient.tsx` — saves to `localStorage` only |
| **Server List** | ✅ Working | `app/servers/page.tsx` — shows user's guilds with manage permission |
| **Profile Page** | ✅ Basic | `app/profile/page.tsx` — shows avatar, name, ID |
| **Admin Panel** | ✅ Working | `app/admin/tickets/page.tsx` — ticket management |
| **Ticket System** | ⚠️ In-memory | `lib/ticketStorage.ts` — Map-based, lost on restart |
| **Charts** | ✅ Mock data | `Activity24hChart`, `BotStatsCards`, `PopularCommandsChart`, `UptimeChart` |
| **Premium Page** | ✅ Working | 6 tiers, Patreon links, comparison |
| **Email Service** | ✅ Working | Resend SDK integration |
| **i18n** | ✅ Working | `next-intl`, 4 locales (en, en-GB, de, ru) |
| **Middleware** | ✅ Working | Admin route protection, security headers |

### 2.2 What's Missing (To Be Built)

| Area | Priority | Description |
|------|----------|-------------|
| **Bot API Client** | 🔴 Critical | HTTP client to communicate with bot backend |
| **Real Guild Settings** | 🔴 Critical | Persist settings via bot API instead of localStorage |
| **Music Playback Controls** | 🔴 Critical | Now playing, queue, skip, pause, volume, seek |
| **Per-Server Dashboard** | 🔴 Critical | Full guild management page with tabs/sections |
| **Database** | 🟡 High | Replace in-memory storage with persistent DB |
| **WebSocket/SSE** | 🟡 High | Real-time updates (now playing, queue changes) |
| **Stripe Billing** | 🟡 High | Replace Patreon links with Stripe integration |
| **Audit Logging** | 🟡 High | Track all config changes with user attribution |
| **Role-Based Access** | 🟢 Medium | Guild-level permissions beyond owner check |
| **Embed Builder** | 🟢 Medium | Custom welcome/leave/now-playing embeds |
| **Webhooks Config** | 🟢 Medium | Configure Discord logging webhooks |
| **Moderation Dashboard** | 🟢 Medium | View warnings, bans, timeouts |
| **Leaderboard Integration** | 🔵 Low | Real data from bot for listening leaderboard |
| **Mobile Optimization** | 🔵 Low | Touch-friendly controls, responsive queue |

### 2.3 Current Tech Stack

```
Framework:    Next.js 14.2.32 (App Router)
React:        18.x
Auth:         next-auth 4.24 (Discord OAuth2, JWT strategy)
Styling:      Tailwind CSS 3.4 + custom glassmorphism cards
Animations:   framer-motion 12.x + custom IntersectionObserver reveal
Charts:       recharts 3.6
Search:       fuse.js 7.1
Notifications: sonner 1.5 (toast)
Email:        resend 6.1
Icons:        react-icons 5.5
i18n:         next-intl 3.26
TypeScript:   5.x
```

---

## 3. Architecture Overview

### 3.1 High-Level System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│  Next.js App (Dashboard UI)                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  Auth    │ │  Server  │ │  Guild   │ │  Premium  │  │
│  │  Flow   │ │  Select  │ │  Dash    │ │  Billing  │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └─────┬─────┘  │
└───────┼────────────┼────────────┼──────────────┼────────┘
        │            │            │              │
        ▼            ▼            ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              NEXT.JS API ROUTES (BFF Layer)             │
│  /api/auth/*  /api/guilds/*  /api/bot/*  /api/billing/* │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Bot API Client (lib/botApi.ts)                  │   │
│  │  - HTTP requests to bot backend                  │   │
│  │  - Auth header injection (API key / JWT)         │   │
│  │  - Response caching (Redis or in-memory)         │   │
│  │  - Error handling & circuit breaker              │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │  HTTPS (API Key Auth)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              BOT BACKEND (Separate Codebase)            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  REST    │ │  WebSocket│ │  Discord │ │  Database │  │
│  │  API     │ │  Gateway │ │  Gateway │ │  (Postgres)│  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Communication Pattern

```
Dashboard (Next.js)  ──HTTP──▶  Next.js API Routes (BFF)  ──HTTP──▶  Bot Backend API
                                       │
                                       ├── Validates user session (NextAuth)
                                       ├── Checks guild permissions
                                       ├── Adds API key / service auth
                                       ├── Caches responses where safe
                                       └── Returns sanitized data to client
```

**Why a BFF (Backend-for-Frontend)?**
- The bot API key never leaves the server — the client never sees it
- Session validation happens server-side
- Guild permission checks are centralized
- Response shaping/aggregation for the frontend
- Rate limiting and caching at the BFF layer

### 3.3 Real-Time Communication (for music controls)

```
Client  ◀──SSE/WebSocket──▶  Next.js API Route  ◀──WebSocket──▶  Bot Backend
                              (proxy/relay)
```

**Options (pick one):**
1. **Server-Sent Events (SSE):** Simpler, one-directional (server → client). Good for now-playing updates.
2. **WebSocket:** Bi-directional. Needed for interactive queue management.
3. **Polling:** Simplest. Poll `/api/bot/guilds/{id}/player` every 3-5 seconds. Good enough for MVP.

**Recommendation:** Start with **polling** for MVP, then upgrade to **SSE** for now-playing, then **WebSocket** for full interactivity.

---

## 4. Pre-Requisites & Environment Setup

### 4.1 Required Services

| Service | Purpose | Provider Options |
|---------|---------|-----------------|
| **PostgreSQL** | Persistent storage for settings, tickets, audit logs | Supabase, Neon, PlanetScale (MySQL), Railway |
| **Redis** | Caching, session store, rate limiting | Upstash (serverless), Railway, Redis Cloud |
| **Stripe** | Payment processing | Stripe |
| **Bot Backend API** | Bot data and controls | Your own (separate codebase) |
| **Resend** | Transactional email (already set up) | Resend (already integrated) |
| **Vercel** | Hosting & deployment (recommended) | Vercel, Railway, self-hosted |

### 4.2 New Dependencies to Install

```bash
# Database ORM
npm install prisma @prisma/client

# Redis client (optional for caching)
npm install ioredis
# OR serverless Redis
npm install @upstash/redis

# Stripe (billing)
npm install stripe @stripe/stripe-js

# Real-time (when ready)
npm install socket.io socket.io-client
# OR for SSE, no extra dep needed

# Form validation
npm install zod

# Rate limiting
npm install @upstash/ratelimit
# OR
npm install express-rate-limit

# Date handling
npm install date-fns

# Dev dependencies
npm install -D prisma
```

### 4.3 New Environment Variables Needed

```env
# Bot Backend API
BOT_API_BASE_URL=https://api.swelly.bot       # Bot backend base URL
BOT_API_KEY=secret-api-key                     # Shared secret for bot ↔ dashboard auth

# Database
DATABASE_URL=postgresql://user:pass@host:5432/swelly

# Redis (optional)
REDIS_URL=redis://default:pass@host:6379

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Existing (already configured)
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://swelly.bot
BOT_TOKEN=...
OWNER_DISCORD_UID=...
NEXT_PUBLIC_OWNER_DISCORD_UID=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
ADMIN_EMAIL=...
DISCORD_SUPPORT_WEBHOOK_URL=...
NEXT_PUBLIC_SITE_URL=https://swelly.bot
NEXT_PUBLIC_DISCORD_SUPPORT_URL=...
```

---

## 5. Phase 1 — Foundation & Infrastructure

> **Goal:** Set up database, create the bot API client, establish the project structure for the dashboard.  
> **Team:** 1-2 backend devs  
> **Duration:** 1 week

### Step 1.1 — Initialize Prisma

```bash
npx prisma init
```

This creates `prisma/schema.prisma`. Configure it:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// See Phase 18 for full schema
```

### Step 1.2 — Create the Bot API Client

Create `lib/botApi.ts` — the central module for all bot backend communication:

```typescript
// lib/botApi.ts
import { z } from "zod";

const BOT_API_BASE = process.env.BOT_API_BASE_URL!;
const BOT_API_KEY = process.env.BOT_API_KEY!;

class BotApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = "BotApiError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number;
  timeout?: number;
}

async function botFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, cache, revalidate, timeout = 10000 } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${BOT_API_BASE}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BOT_API_KEY}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      cache,
      next: revalidate !== undefined ? { revalidate } : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new BotApiError(res.status, `Bot API ${method} ${endpoint} failed: ${res.status}`, text);
    }

    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

// ─── Guild Settings ───────────────────────────────
export async function getGuildSettings(guildId: string) {
  return botFetch<GuildSettings>(`/guilds/${guildId}/settings`);
}

export async function updateGuildSettings(guildId: string, settings: Partial<GuildSettings>) {
  return botFetch<GuildSettings>(`/guilds/${guildId}/settings`, {
    method: "PATCH",
    body: settings,
  });
}

// ─── Player / Music Controls ──────────────────────
export async function getPlayerState(guildId: string) {
  return botFetch<PlayerState>(`/guilds/${guildId}/player`);
}

export async function playerAction(guildId: string, action: PlayerAction) {
  return botFetch<PlayerState>(`/guilds/${guildId}/player`, {
    method: "POST",
    body: action,
  });
}

export async function getQueue(guildId: string) {
  return botFetch<QueueState>(`/guilds/${guildId}/queue`);
}

// ─── Analytics ────────────────────────────────────
export async function getGuildAnalytics(guildId: string, period: string = "7d") {
  return botFetch<GuildAnalytics>(`/guilds/${guildId}/analytics?period=${period}`);
}

// ─── Bot Status ───────────────────────────────────
export async function getBotStatus() {
  return botFetch<BotStatus>("/status", { revalidate: 10 });
}

// ─── Types ────────────────────────────────────────
export interface GuildSettings {
  guildId: string;
  prefix: string;
  djRoleId: string | null;
  autoplay: boolean;
  defaultVolume: number;
  maxQueueSize: number;
  allowFilters: boolean;
  announceNowPlaying: boolean;
  nowPlayingChannelId: string | null;
  restrictToVoiceChannel: boolean;
  voteSkipEnabled: boolean;
  voteSkipThreshold: number; // percentage
  maxSongDuration: number; // seconds, 0 = unlimited
  bannedUsers: string[];
  allowedTextChannels: string[];
  language: string;
  premium: PremiumInfo;
}

export interface PremiumInfo {
  tier: "free" | "bronze" | "plus" | "pro" | "gold" | "diamond" | "ultimate";
  expiresAt: string | null;
  features: string[];
}

export interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTrack: Track | null;
  position: number; // ms
  volume: number;
  repeatMode: "off" | "track" | "queue";
  filters: ActiveFilter[];
  voiceChannelId: string | null;
  textChannelId: string | null;
}

export interface Track {
  title: string;
  author: string;
  url: string;
  thumbnail: string;
  duration: number; // ms
  requestedBy: { id: string; username: string; avatar: string };
  source: "youtube" | "spotify" | "soundcloud" | "apple_music" | "deezer" | "other";
}

export interface QueueState {
  tracks: Track[];
  totalDuration: number;
  size: number;
  currentIndex: number;
}

export interface PlayerAction {
  action: "play" | "pause" | "resume" | "skip" | "stop" | "seek" | "volume" | "shuffle" | "repeat" | "remove" | "move" | "clear";
  value?: number | string;
  from?: number;
  to?: number;
}

export interface ActiveFilter {
  name: string;
  enabled: boolean;
  value?: number;
}

export interface GuildAnalytics {
  commandsUsed: number;
  songsPlayed: number;
  totalListenTime: number; // minutes
  topCommands: { name: string; count: number }[];
  topSongs: { title: string; artist: string; count: number }[];
  activeUsers: { id: string; username: string; minutes: number }[];
  dailyActivity: { date: string; commands: number; songs: number }[];
}

export interface BotStatus {
  online: boolean;
  uptime: number;
  shards: ShardInfo[];
  totals: { guilds: number; users: number; ramMB: number };
}

export interface ShardInfo {
  id: number;
  status: "online" | "partial" | "offline";
  guilds: number;
  users: number;
  ping: number;
}
```

### Step 1.3 — Create API Route Helpers

Create `lib/apiHelpers.ts`:

```typescript
// lib/apiHelpers.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { NextResponse } from "next/server";
import { isAdmin } from "./adminConfig";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }
  return { error: null, session };
}

export async function requireAdmin() {
  const { error, session } = await requireAuth();
  if (error) return { error, session: null };
  if (!isAdmin(session!.user!.id!)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), session: null };
  }
  return { error: null, session: session! };
}

export async function requireGuildAccess(guildId: string) {
  const { error, session } = await requireAuth();
  if (error) return { error, session: null, hasAccess: false };
  
  // Verify user has MANAGE_SERVER on this guild
  const accessToken = (session as any).accessToken;
  if (!accessToken) {
    return { error: NextResponse.json({ error: "No access token" }, { status: 401 }), session: null, hasAccess: false };
  }

  try {
    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      return { error: NextResponse.json({ error: "Failed to fetch guilds" }, { status: 502 }), session: null, hasAccess: false };
    }
    const guilds = await res.json();
    const guild = guilds.find((g: any) => g.id === guildId);
    const hasAccess = guild && (guild.owner || (Number(guild.permissions) & 0x20) !== 0);
    
    if (!hasAccess) {
      return { error: NextResponse.json({ error: "No access to this guild" }, { status: 403 }), session: null, hasAccess: false };
    }
    return { error: null, session: session!, hasAccess: true };
  } catch {
    return { error: NextResponse.json({ error: "Guild check failed" }, { status: 500 }), session: null, hasAccess: false };
  }
}

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
```

### Step 1.4 — Set Up Zod Validation Schemas

Create `lib/validations/`:

```typescript
// lib/validations/guildSettings.ts
import { z } from "zod";

export const guildSettingsSchema = z.object({
  prefix: z.string().min(1).max(5).optional(),
  djRoleId: z.string().nullable().optional(),
  autoplay: z.boolean().optional(),
  defaultVolume: z.number().min(0).max(100).optional(),
  maxQueueSize: z.number().min(1).max(10000).optional(),
  allowFilters: z.boolean().optional(),
  announceNowPlaying: z.boolean().optional(),
  nowPlayingChannelId: z.string().nullable().optional(),
  restrictToVoiceChannel: z.boolean().optional(),
  voteSkipEnabled: z.boolean().optional(),
  voteSkipThreshold: z.number().min(1).max(100).optional(),
  maxSongDuration: z.number().min(0).optional(),
  language: z.string().min(2).max(5).optional(),
});

export const playerActionSchema = z.object({
  action: z.enum(["play", "pause", "resume", "skip", "stop", "seek", "volume", "shuffle", "repeat", "remove", "move", "clear"]),
  value: z.union([z.number(), z.string()]).optional(),
  from: z.number().optional(),
  to: z.number().optional(),
});
```

### Step 1.5 — Project Structure Conventions

Establish these conventions across the team:

```
Feature-based organization:
  app/dashboard/[guildId]/         → Guild-specific pages
  app/api/bot/guilds/[guildId]/    → BFF routes proxying to bot API
  components/dashboard/            → Dashboard-specific components
  lib/botApi.ts                    → Bot API client (server-side only)
  lib/validations/                 → Zod schemas
  lib/apiHelpers.ts                → Auth/permission utilities
  types/                           → Shared TypeScript types

Naming conventions:
  Components:    PascalCase (GuildSettingsPanel.tsx)
  API routes:    route.ts inside [...path] directories
  Hooks:         use*.ts (useGuildSettings.ts)
  Utilities:     camelCase (botApi.ts, apiHelpers.ts)
  Types:         PascalCase interfaces, camelCase type aliases
```

---

## 6. Phase 2 — Authentication & Authorization

> **Goal:** Upgrade the auth system for dashboard-grade security.  
> **Team:** 1 backend dev  
> **Duration:** 3-5 days

### Step 2.1 — Extend the NextAuth Session

Currently working — but needs improvements:

**Update `lib/authOptions.ts`:**

```typescript
// Add guild caching to reduce Discord API calls
import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
        token.expiresAt = account.expires_at;
        token.refreshToken = account.refresh_token;
      }
      // Auto-refresh expired tokens
      if (token.expiresAt && Date.now() / 1000 > (token.expiresAt as number)) {
        return refreshDiscordToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",    // Custom sign-in page (optional)
    error: "/auth/error",       // Custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

async function refreshDiscordToken(token: any) {
  try {
    const res = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
    };
  } catch {
    return { ...token, error: "RefreshTokenError" };
  }
}
```

### Step 2.2 — Guild Permission Middleware

Create a reusable permission check for guild routes:

```typescript
// middleware.ts — Add guild permission check
// Extend existing middleware to also protect /dashboard/[guildId] routes
```

### Step 2.3 — Role-Based Access Control (RBAC)

Define roles for guild-level access:

```typescript
// lib/permissions.ts
export type GuildRole = "owner" | "admin" | "moderator" | "dj" | "member";

export const PERMISSIONS = {
  MANAGE_SETTINGS: ["owner", "admin"],
  MANAGE_QUEUE: ["owner", "admin", "moderator", "dj"],
  VIEW_ANALYTICS: ["owner", "admin", "moderator"],
  MANAGE_PREMIUM: ["owner"],
  VIEW_LOGS: ["owner", "admin"],
  CONTROL_PLAYBACK: ["owner", "admin", "moderator", "dj"],
} as const;

export function hasPermission(role: GuildRole, permission: keyof typeof PERMISSIONS): boolean {
  return (PERMISSIONS[permission] as readonly string[]).includes(role);
}
```

---

## 7. Phase 3 — Bot API Integration Layer

> **Goal:** Build the BFF API routes that proxy requests between the dashboard and the bot backend.  
> **Team:** 1-2 backend devs  
> **Duration:** 1-2 weeks

### Step 3.1 — Create BFF API Routes

#### Guild Settings Routes

```
app/api/bot/guilds/[guildId]/settings/route.ts     → GET, PATCH
app/api/bot/guilds/[guildId]/player/route.ts       → GET, POST
app/api/bot/guilds/[guildId]/queue/route.ts        → GET, POST, DELETE
app/api/bot/guilds/[guildId]/analytics/route.ts    → GET
app/api/bot/guilds/[guildId]/roles/route.ts        → GET
app/api/bot/guilds/[guildId]/channels/route.ts     → GET
app/api/bot/guilds/[guildId]/audit-log/route.ts    → GET
app/api/bot/status/route.ts                         → GET (replace mock)
app/api/billing/checkout/route.ts                   → POST
app/api/billing/portal/route.ts                     → POST
app/api/billing/webhook/route.ts                    → POST
```

#### Example: Guild Settings BFF Route

```typescript
// app/api/bot/guilds/[guildId]/settings/route.ts
import { NextRequest } from "next/server";
import { requireGuildAccess, jsonResponse, errorResponse } from "@/lib/apiHelpers";
import { getGuildSettings, updateGuildSettings } from "@/lib/botApi";
import { guildSettingsSchema } from "@/lib/validations/guildSettings";

export async function GET(req: NextRequest, { params }: { params: { guildId: string } }) {
  const { error } = await requireGuildAccess(params.guildId);
  if (error) return error;

  try {
    const settings = await getGuildSettings(params.guildId);
    return jsonResponse(settings);
  } catch (err: any) {
    return errorResponse(err.message, err.status || 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { guildId: string } }) {
  const { error, session } = await requireGuildAccess(params.guildId);
  if (error) return error;

  const body = await req.json();
  const parsed = guildSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.message, 400);
  }

  try {
    const updated = await updateGuildSettings(params.guildId, parsed.data);
    // TODO: Write to audit log (Phase 8)
    return jsonResponse(updated);
  } catch (err: any) {
    return errorResponse(err.message, err.status || 500);
  }
}
```

#### Example: Player Controls BFF Route

```typescript
// app/api/bot/guilds/[guildId]/player/route.ts
import { NextRequest } from "next/server";
import { requireGuildAccess, jsonResponse, errorResponse } from "@/lib/apiHelpers";
import { getPlayerState, playerAction } from "@/lib/botApi";
import { playerActionSchema } from "@/lib/validations/guildSettings";

export async function GET(req: NextRequest, { params }: { params: { guildId: string } }) {
  const { error } = await requireGuildAccess(params.guildId);
  if (error) return error;

  try {
    const state = await getPlayerState(params.guildId);
    return jsonResponse(state);
  } catch (err: any) {
    return errorResponse(err.message, err.status || 500);
  }
}

export async function POST(req: NextRequest, { params }: { params: { guildId: string } }) {
  const { error } = await requireGuildAccess(params.guildId);
  if (error) return error;

  const body = await req.json();
  const parsed = playerActionSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.message, 400);
  }

  try {
    const state = await playerAction(params.guildId, parsed.data);
    return jsonResponse(state);
  } catch (err: any) {
    return errorResponse(err.message, err.status || 500);
  }
}
```

### Step 3.2 — Error Handling & Retry Logic

Add to `lib/botApi.ts`:

```typescript
// Retry wrapper with exponential backoff
async function withRetry<T>(fn: () => Promise<T>, retries = 3, baseDelay = 500): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (attempt === retries) throw err;
      // Don't retry 4xx errors (client errors)
      if (err instanceof BotApiError && err.status >= 400 && err.status < 500) throw err;
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 200;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Unreachable");
}
```

### Step 3.3 — Response Caching

```typescript
// lib/cache.ts
const cache = new Map<string, { data: unknown; expiresAt: number }>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache(key: string, data: unknown, ttlSeconds: number) {
  cache.set(key, { data, expiresAt: Date.now() + ttlSeconds * 1000 });
}

// Cleanup stale entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of cache) {
    if (now > val.expiresAt) cache.delete(key);
  }
}, 60_000);
```

---

## 8. Phase 4 — Server Selection & Guild Management

> **Goal:** Upgrade the existing server selection page to show bot status per guild.  
> **Team:** 1 frontend dev  
> **Duration:** 3-5 days

### Step 4.1 — Enhance the Servers Page

Update `app/servers/page.tsx` to show:
- Which guilds have Swelly installed (cross-reference with bot API)
- Guild icon, name, member count
- Premium tier badge per guild
- "Configure" button → `/dashboard/{guildId}`
- "Invite" button for guilds without Swelly
- Search/filter guilds

```typescript
// New API route to check bot presence
// app/api/bot/guilds/check/route.ts
// POST { guildIds: string[] } → { installed: string[], notInstalled: string[] }
```

### Step 4.2 — Guild Card Component

```typescript
// components/dashboard/GuildCard.tsx
interface GuildCardProps {
  guild: {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    memberCount?: number;
  };
  botInstalled: boolean;
  premiumTier?: string;
}
```

Features:
- Glassmorphism card matching existing site design
- Guild icon with fallback (first letter of name)
- Owner/Admin badge
- Premium tier badge (color-coded)
- Animated hover effects (existing `data-reveal-card` system)
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

---

## 9. Phase 5 — Per-Server Dashboard Pages

> **Goal:** Build the full guild management interface.  
> **Team:** 2-3 devs (1 backend, 1-2 frontend)  
> **Duration:** 2-3 weeks

### Step 5.1 — Dashboard Layout with Sidebar Navigation

Create `app/dashboard/[guildId]/layout.tsx`:

```
Dashboard Layout Structure:
┌──────────────────────────────────────────────────┐
│  Top Bar: Guild Name + Icon | Back to Servers    │
├────────────┬─────────────────────────────────────┤
│            │                                     │
│  Sidebar   │      Main Content Area              │
│            │                                     │
│  Overview  │   (Rendered by nested routes)        │
│  Settings  │                                     │
│  Player    │                                     │
│  Queue     │                                     │
│  Analytics │                                     │
│  Logs      │                                     │
│  Premium   │                                     │
│            │                                     │
└────────────┴─────────────────────────────────────┘
```

### Step 5.2 — Dashboard Sub-Pages

```
app/dashboard/[guildId]/
  ├── page.tsx              → Overview (stats summary, quick actions)
  ├── layout.tsx            → Sidebar + top bar layout
  ├── settings/
  │   └── page.tsx          → General settings (prefix, DJ role, autoplay, etc.)
  ├── player/
  │   └── page.tsx          → Now playing, playback controls
  ├── queue/
  │   └── page.tsx          → Queue management (list, reorder, remove)
  ├── analytics/
  │   └── page.tsx          → Charts, top songs, top users
  ├── filters/
  │   └── page.tsx          → Audio filters configuration
  ├── permissions/
  │   └── page.tsx          → Role permissions, DJ mode settings
  ├── embeds/
  │   └── page.tsx          → Custom embed builder (now playing, welcome)
  ├── logs/
  │   └── page.tsx          → Audit log of settings changes
  └── premium/
      └── page.tsx          → Server's premium status, upgrade options
```

### Step 5.3 — Overview Page (`app/dashboard/[guildId]/page.tsx`)

Display:
- Quick stats cards (members, songs played today, active listeners, uptime)
- Now playing mini-card (current track + basic controls)
- Recent activity feed (last 10 events)
- Quick actions (buttons for common settings)
- Premium status banner

### Step 5.4 — Settings Page

Replace the current `GuildSettingsClient.tsx` (localStorage based) with a real API-backed version:

```typescript
// components/dashboard/settings/GeneralSettings.tsx
"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function GeneralSettings({ guildId }: { guildId: string }) {
  const [settings, setSettings] = useState<GuildSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/bot/guilds/${guildId}/settings`)
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, [guildId]);

  const save = async (patch: Partial<GuildSettings>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/bot/guilds/${guildId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Save failed");
      const updated = await res.json();
      setSettings(updated);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  // Render settings form...
}
```

**Settings sections:**

| Section | Controls |
|---------|----------|
| **General** | Prefix, language, bot nickname |
| **Music** | Default volume, autoplay, max queue size, max song duration |
| **DJ Mode** | Enable/disable, DJ role selector (dropdown of server roles) |
| **Permissions** | Vote skip toggle, vote skip threshold, banned users |
| **Channels** | Now playing channel, allowed text channels, voice channel restriction |
| **Filters** | Default filters preset, allowed filters list |
| **Notifications** | Now playing announcements, join/leave messages |

### Step 5.5 — Music Player Page

```typescript
// components/dashboard/player/NowPlaying.tsx
// Shows: album art, title, artist, source icon, progress bar, requester
// Controls: play/pause, skip, previous, stop, volume slider, repeat mode, shuffle

// components/dashboard/player/ProgressBar.tsx
// Real-time progress bar (updates every second via local timer + periodic API sync)

// components/dashboard/player/VolumeSlider.tsx
// Range slider 0-100 with debounced API calls
```

### Step 5.6 — Queue Management Page

```typescript
// components/dashboard/queue/QueueList.tsx
// Features:
// - Drag-and-drop reordering (use @dnd-kit/core or react-beautiful-dnd)
// - Remove individual tracks
// - Clear entire queue
// - Search within queue
// - Auto-scroll to current track
// - Song duration, requester info, source icon per track
// - Total queue duration display
```

### Step 5.7 — Custom React Hooks for Dashboard Data

```typescript
// hooks/useGuildSettings.ts
export function useGuildSettings(guildId: string) {
  // SWR or React Query pattern
  // Returns: { settings, isLoading, error, mutate }
}

// hooks/usePlayerState.ts
export function usePlayerState(guildId: string, pollInterval = 5000) {
  // Polls player state at interval
  // Returns: { player, isLoading, error, refetch }
}

// hooks/useQueue.ts
export function useQueue(guildId: string) {
  // Returns: { queue, isLoading, error, refetch }
}

// hooks/useGuildAnalytics.ts
export function useGuildAnalytics(guildId: string, period: string) {
  // Returns: { analytics, isLoading, error }
}
```

---

## 10. Phase 6 — Real-Time Features

> **Goal:** Add live updates for player state and queue changes.  
> **Team:** 1 backend dev + 1 frontend dev  
> **Duration:** 1-2 weeks

### Step 6.1 — MVP: Smart Polling

Start with optimized polling before investing in WebSockets:

```typescript
// hooks/usePlayerState.ts
export function usePlayerState(guildId: string) {
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    let active = true;
    
    const poll = async () => {
      try {
        const res = await fetch(`/api/bot/guilds/${guildId}/player`);
        if (res.ok && active) {
          const data = await res.json();
          setPlayer(data);
          setIsPlaying(data.isPlaying && !data.isPaused);
        }
      } catch { /* silent */ }
    };
    
    poll(); // Initial fetch
    
    // Adaptive polling: faster when playing, slower when idle
    const getInterval = () => isPlaying ? 3000 : 15000;
    
    let timer: NodeJS.Timeout;
    const schedulePoll = () => {
      timer = setTimeout(async () => {
        await poll();
        if (active) schedulePoll();
      }, getInterval());
    };
    schedulePoll();
    
    return () => { active = false; clearTimeout(timer); };
  }, [guildId, isPlaying]);
  
  return { player };
}
```

### Step 6.2 — SSE for Now Playing (Upgrade Path)

```typescript
// app/api/bot/guilds/[guildId]/player/stream/route.ts
export async function GET(req: NextRequest, { params }: { params: { guildId: string } }) {
  // Verify auth
  // Connect to bot backend's SSE/WebSocket endpoint
  // Proxy events to the client
  
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Subscribe to bot events for this guild
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      // ... event subscription logic
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### Step 6.3 — WebSocket for Full Interactivity (Future)

When ready for full real-time:

```typescript
// Use Socket.io or native WebSocket
// Events to handle:
// - player:update (track change, pause, resume, seek)
// - queue:update (add, remove, move, clear)
// - guild:settingsUpdate (settings changed from Discord commands)
// - guild:memberJoinVoice / guild:memberLeaveVoice
```

---

## 11. Phase 7 — Premium & Billing Integration

> **Goal:** Replace Patreon links with Stripe for in-app billing.  
> **Team:** 1 backend dev  
> **Duration:** 1-2 weeks

### Step 7.1 — Stripe Setup

```typescript
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Define price IDs for each tier
export const TIER_PRICES = {
  bronze:   { monthly: "price_bronze_monthly",   yearly: "price_bronze_yearly" },
  plus:     { monthly: "price_plus_monthly",     yearly: "price_plus_yearly" },
  pro:      { monthly: "price_pro_monthly",      yearly: "price_pro_yearly" },
  gold:     { monthly: "price_gold_monthly",     yearly: "price_gold_yearly" },
  diamond:  { monthly: "price_diamond_monthly",  yearly: "price_diamond_yearly" },
  ultimate: { monthly: "price_ultimate_monthly", yearly: "price_ultimate_yearly" },
} as const;
```

### Step 7.2 — Billing API Routes

```
app/api/billing/checkout/route.ts      → POST (create Stripe Checkout session)
app/api/billing/portal/route.ts        → POST (create Stripe Customer Portal link)
app/api/billing/webhook/route.ts       → POST (handle Stripe webhook events)
app/api/billing/subscription/route.ts  → GET (fetch user's active subscriptions)
```

### Step 7.3 — Webhook Events to Handle

```typescript
// Stripe webhook events to process:
// checkout.session.completed    → Activate premium for guild
// customer.subscription.updated → Update tier
// customer.subscription.deleted → Deactivate premium
// invoice.payment_failed        → Notify user, grace period
// invoice.paid                  → Renew premium
```

### Step 7.4 — Premium UI Updates

- Update `app/premium/page.tsx` to use Stripe Checkout instead of Patreon links
- Add premium status badge in dashboard sidebar
- Show upgrade prompts for premium-only features (filters, higher queue limits, etc.)
- Create `app/dashboard/[guildId]/premium/page.tsx` for per-server premium management

---

## 12. Phase 8 — Admin Panel

> **Goal:** Expand the existing admin panel beyond tickets.  
> **Team:** 1 full-stack dev  
> **Duration:** 1-2 weeks

### Step 8.1 — Admin Dashboard Sub-Pages

```
app/admin/
  ├── page.tsx              → Admin overview (stats, quick actions)
  ├── tickets/
  │   └── page.tsx          → ✅ Already exists
  ├── guilds/
  │   └── page.tsx          → Browse/manage all guilds using bot
  ├── users/
  │   └── page.tsx          → User lookup, ban management
  ├── subscriptions/
  │   └── page.tsx          → Revenue dashboard, subscription management
  ├── announcements/
  │   └── page.tsx          → Push announcements to all guilds
  └── system/
      └── page.tsx          → System health, shard management, restart controls
```

### Step 8.2 — Admin-Only BFF Routes

```
app/api/admin/guilds/route.ts           → GET (list all guilds, paginated)
app/api/admin/users/[id]/route.ts       → GET, PATCH (lookup, ban user)
app/api/admin/subscriptions/route.ts    → GET (revenue metrics)
app/api/admin/system/route.ts           → GET (system health), POST (restart shard)
app/api/admin/announcements/route.ts    → POST (broadcast message)
```

All admin routes use the existing `requireAdmin()` helper (checks `OWNER_DISCORD_UID`).

---

## 13. Phase 9 — Analytics & Metrics

> **Goal:** Replace mock chart data with real analytics.  
> **Team:** 1 frontend dev + 1 backend dev  
> **Duration:** 1-2 weeks

### Step 9.1 — Analytics Data Sources

The bot backend should expose these analytics endpoints:

```
GET /guilds/{id}/analytics?period=24h|7d|30d|90d
GET /guilds/{id}/analytics/top-songs?limit=10
GET /guilds/{id}/analytics/top-users?limit=10
GET /guilds/{id}/analytics/commands?limit=10
GET /analytics/global              (admin only)
```

### Step 9.2 — Chart Components to Update

| Component | Current State | Target |
|-----------|--------------|--------|
| `Activity24hChart` | Mock `generateActivity24h()` | Real data from bot API |
| `BotStatsCards` | Props-based (needs real data source) | Fetch from bot API |
| `PopularCommandsChart` | Mock `defaultTopCommands` | Real data from bot API |
| `UptimeChart` | Mock `generateUptimeHistory()` | Real data from bot API |

### Step 9.3 — New Analytics Components to Build

```
components/dashboard/analytics/
  ├── ListeningTimeChart.tsx       → Area chart of total listening hours
  ├── TopSongsTable.tsx            → Table with album art, play count, duration
  ├── TopUsersTable.tsx            → Leaderboard of most active listeners
  ├── CommandUsageBreakdown.tsx    → Pie/donut chart of command categories
  ├── PeakHoursHeatmap.tsx         → Heatmap of activity by hour/day
  ├── GrowthChart.tsx              → Guild member growth over time
  └── AnalyticsPeriodSelector.tsx  → 24h / 7d / 30d / 90d toggle
```

---

## 14. Phase 10 — Performance Optimization

> **Goal:** Ensure the dashboard is fast, responsive, and efficient.  
> **Team:** 1 senior dev  
> **Duration:** Ongoing

### 10.1 — Code Splitting & Lazy Loading

```typescript
// Lazy-load heavy dashboard components
const QueueList = dynamic(() => import("@/components/dashboard/queue/QueueList"), {
  loading: () => <SkeletonCard />,
});

const AnalyticsCharts = dynamic(() => import("@/components/dashboard/analytics/Charts"), {
  ssr: false, // Charts don't need SSR
  loading: () => <div className="h-80 animate-pulse bg-white/5 rounded-xl" />,
});
```

### 10.2 — Data Fetching Optimization

```typescript
// Use SWR for client-side data fetching with built-in caching
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useGuildSettings(guildId: string) {
  return useSWR(`/api/bot/guilds/${guildId}/settings`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });
}
```

### 10.3 — Image Optimization

- Guild icons: Use Next.js `<Image>` with Discord CDN (already configured in `next.config.mjs`)
- Album art: Proxy through Next.js image optimization
- Lazy-load images below the fold

### 10.4 — Bundle Size Monitoring

```bash
# Add to package.json scripts
"analyze": "ANALYZE=true next build"

# Install bundle analyzer
npm install -D @next/bundle-analyzer
```

### 10.5 — Caching Strategy

| Data | Cache Strategy | TTL |
|------|---------------|-----|
| Guild settings | SWR with `dedupingInterval: 30s` | 30s |
| Player state | Polling, no cache | 0 (real-time) |
| Queue | SWR with `revalidateOnFocus` | 5s |
| Analytics | SWR with long TTL | 5min |
| Bot status | `next: { revalidate: 10 }` | 10s |
| User guilds | SWR, cache on login | 60s |
| Guild roles/channels | SWR, long cache | 5min |

### 10.6 — Rendering Strategy per Route

| Route | Strategy | Reason |
|-------|----------|--------|
| `/dashboard` | Client-side | Auth-gated, dynamic |
| `/dashboard/[guildId]` | Client-side | Real-time data |
| `/dashboard/[guildId]/settings` | Client-side | Interactive forms |
| `/dashboard/[guildId]/player` | Client-side | Real-time playback |
| `/dashboard/[guildId]/analytics` | Client-side | Charts, period selectors |
| `/servers` | Client-side | Auth-gated guild list |
| `/status` | ISR (10s) + client hydration | Semi-real-time, public |
| `/commands` | SSG | Static content |
| `/premium` | SSG | Static content |

---

## 15. Phase 11 — Testing & QA

> **Goal:** Ensure reliability.  
> **Team:** All devs  
> **Duration:** Ongoing (parallel with development)

### 11.1 — Testing Setup

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test        # E2E
npm install -D msw                     # API mocking
```

### 11.2 — Test Categories

| Category | Tools | Coverage Target |
|----------|-------|-----------------|
| **Unit Tests** | Vitest | `lib/`, `utils/`, validation schemas |
| **Component Tests** | Vitest + Testing Library | Dashboard components, forms |
| **Integration Tests** | Vitest + MSW | API routes, bot API client |
| **E2E Tests** | Playwright | Critical flows (login → server → settings) |
| **Visual Regression** | Playwright screenshots | Key dashboard pages |

### 11.3 — Critical Test Scenarios

```
1. Auth Flow:
   - Login with Discord → session created → guilds fetched
   - Token refresh when expired
   - Unauthorized access to guild → redirect

2. Guild Settings:
   - Load settings → display correctly
   - Change setting → API call → optimistic update → confirm
   - Failed save → rollback → error toast

3. Player Controls:
   - Display current track info
   - Skip → new track displayed
   - Pause/resume → state updates
   - Volume change → debounced API call

4. Queue Management:
   - Display queue with track info
   - Drag reorder → API call → confirm
   - Remove track → confirm → update list

5. Error States:
   - Bot offline → graceful error message
   - Network error → retry prompt
   - Rate limited → queue request and retry
```

### 11.4 — Mock Service Worker (MSW) for Development

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/bot/guilds/:guildId/settings", ({ params }) => {
    return HttpResponse.json({
      guildId: params.guildId,
      prefix: "/",
      djRoleId: null,
      autoplay: true,
      defaultVolume: 70,
      // ... mock data
    });
  }),
  
  http.get("/api/bot/guilds/:guildId/player", () => {
    return HttpResponse.json({
      isPlaying: true,
      isPaused: false,
      currentTrack: {
        title: "Never Gonna Give You Up",
        author: "Rick Astley",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        duration: 213000,
        requestedBy: { id: "123", username: "TestUser", avatar: null },
        source: "youtube",
      },
      position: 45000,
      volume: 70,
      repeatMode: "off",
      filters: [],
    });
  }),
];
```

---

## 16. Phase 12 — Deployment & CI/CD

> **Goal:** Automated, safe deployments.  
> **Team:** 1 DevOps  
> **Duration:** 3-5 days

### 12.1 — Vercel Deployment (Recommended)

```bash
# Already Next.js — works out of the box
# Set all environment variables in Vercel dashboard
# Enable preview deployments for PRs
```

### 12.2 — GitHub Actions CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npx prisma generate
      - run: npm run build

  e2e:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

### 12.3 — Database Migrations

```bash
# Development
npx prisma migrate dev --name add_guild_settings

# Production (automated in CI)
npx prisma migrate deploy
```

### 12.4 — Environment Separation

```
Environments:
  development  → Local dev, mock bot API (MSW)
  staging      → Staging DB, staging bot backend, preview URL
  production   → Production DB, production bot, swelly.bot domain
```

---

## 17. Bot Backend API Contract

> **This section defines what endpoints the bot backend must expose.** Share this with the bot backend team.

### 17.1 — Authentication

All requests from the dashboard BFF include:
```
Authorization: Bearer <BOT_API_KEY>
X-Dashboard-User: <discord-user-id>      (for audit logging)
X-Request-Id: <uuid>                      (for tracing)
```

### 17.2 — Required Endpoints

#### Status & Health

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/status` | Bot health + shard info | `BotStatus` |
| GET | `/status/shards` | Detailed shard list | `ShardInfo[]` |

#### Guild Settings

| Method | Endpoint | Description | Body/Params | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/guilds/{id}/settings` | Get guild config | — | `GuildSettings` |
| PATCH | `/guilds/{id}/settings` | Update guild config | `Partial<GuildSettings>` | `GuildSettings` |
| GET | `/guilds/{id}/roles` | Get guild roles | — | `Role[]` |
| GET | `/guilds/{id}/channels` | Get guild channels | `?type=text\|voice` | `Channel[]` |

#### Player Controls

| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| GET | `/guilds/{id}/player` | Get player state | — | `PlayerState` |
| POST | `/guilds/{id}/player` | Execute action | `PlayerAction` | `PlayerState` |
| GET | `/guilds/{id}/queue` | Get queue | — | `QueueState` |
| POST | `/guilds/{id}/queue` | Add to queue | `{ url: string }` | `QueueState` |
| DELETE | `/guilds/{id}/queue` | Clear queue | — | `{ ok: true }` |
| PATCH | `/guilds/{id}/queue` | Reorder/remove | `{ action, from, to }` | `QueueState` |

#### Analytics

| Method | Endpoint | Description | Params | Response |
|--------|----------|-------------|--------|----------|
| GET | `/guilds/{id}/analytics` | Guild analytics | `?period=24h\|7d\|30d` | `GuildAnalytics` |
| GET | `/guilds/{id}/analytics/top-songs` | Top songs | `?limit=10` | `TopSong[]` |
| GET | `/guilds/{id}/analytics/top-users` | Top listeners | `?limit=10` | `TopUser[]` |

#### Admin

| Method | Endpoint | Description | Params | Response |
|--------|----------|-------------|--------|----------|
| GET | `/admin/guilds` | All guilds (paginated) | `?page&limit&search` | `{ guilds, total }` |
| GET | `/admin/stats` | Global statistics | — | `GlobalStats` |
| POST | `/admin/shards/{id}/restart` | Restart shard | — | `{ ok: true }` |
| POST | `/admin/announcements` | Broadcast | `{ message, guilds? }` | `{ sent: number }` |

#### Premium / Subscriptions

| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| GET | `/guilds/{id}/premium` | Premium status | — | `PremiumInfo` |
| POST | `/guilds/{id}/premium/activate` | Activate premium | `{ tier, expiresAt }` | `PremiumInfo` |
| POST | `/guilds/{id}/premium/deactivate` | Deactivate | — | `{ ok: true }` |

### 17.3 — Error Response Format

```json
{
  "error": {
    "code": "GUILD_NOT_FOUND",
    "message": "Guild 123456789 not found or bot not in guild",
    "status": 404
  }
}
```

Standard error codes:
```
UNAUTHORIZED          401
FORBIDDEN             403
GUILD_NOT_FOUND       404
PLAYER_NOT_ACTIVE     404
RATE_LIMITED           429
INTERNAL_ERROR        500
BOT_UNAVAILABLE       503
```

### 17.4 — Rate Limits

```
Bot API should enforce:
  - Per-guild: 60 requests/minute
  - Player actions: 10 requests/10 seconds per guild
  - Analytics: 10 requests/minute per guild
  - Admin: 30 requests/minute

Dashboard BFF should:
  - Pass through rate limit headers (X-RateLimit-*)
  - Show "slow down" toast to user on 429
  - Queue and retry player actions automatically
```

---

## 18. Database Schema Design

### 18.1 — Prisma Schema

```prisma
// prisma/schema.prisma

model User {
  id              String   @id @default(cuid())
  discordId       String   @unique
  email           String?
  username        String
  avatar          String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  subscriptions   Subscription[]
  auditLogs       AuditLog[]       @relation("actor")
  tickets         Ticket[]
}

model GuildConfig {
  id              String   @id @default(cuid())
  guildId         String   @unique
  guildName       String
  guildIcon       String?
  ownerId         String
  settings        Json     @default("{}")  // Cached copy of bot settings
  premiumTier     String   @default("free")
  premiumExpires  DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  subscription    Subscription?
  auditLogs       AuditLog[]
}

model Subscription {
  id                  String   @id @default(cuid())
  userId              String
  guildConfigId       String   @unique
  stripeCustomerId    String
  stripeSubscriptionId String  @unique
  tier                String   // bronze, plus, pro, gold, diamond, ultimate
  status              String   // active, past_due, canceled, trialing
  currentPeriodStart  DateTime
  currentPeriodEnd    DateTime
  cancelAtPeriodEnd   Boolean  @default(false)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  user                User         @relation(fields: [userId], references: [id])
  guildConfig         GuildConfig  @relation(fields: [guildConfigId], references: [id])
}

model AuditLog {
  id          String   @id @default(cuid())
  guildId     String
  actorId     String
  action      String   // settings.update, player.skip, queue.clear, premium.activate
  target      String?  // what was changed
  changes     Json?    // { before: {...}, after: {...} }
  ip          String?
  userAgent   String?
  createdAt   DateTime @default(now())

  guild       GuildConfig @relation(fields: [guildId], references: [guildId])
  actor       User        @relation("actor", fields: [actorId], references: [discordId])

  @@index([guildId, createdAt])
  @@index([actorId])
}

model Ticket {
  id              String   @id // SWL-{timestamp}-{random}
  subject         String
  category        String
  priority        String   @default("medium")
  status          String   @default("open")
  description     String
  contactEmail    String
  discordUsername String?
  serverInfo      String?
  assignedTo      String?
  tags            String[] @default([])
  responses       Json     @default("[]")
  submittedBy     String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user            User?    @relation(fields: [submittedBy], references: [discordId])

  @@index([status])
  @@index([priority])
  @@index([contactEmail])
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### 18.2 — Migration from In-Memory to Database

Current `ticketStorage.ts` uses an in-memory `Map`. Migration steps:

1. Create Prisma schema (above)
2. Run `npx prisma migrate dev --name initial`
3. Create `lib/db.ts` with Prisma client singleton
4. Update `app/api/tickets/route.ts` to use Prisma instead of `ticketStorage`
5. Update `app/api/subscribe/route.ts` to use Prisma instead of JSON files
6. Remove `data/subscribers.json` and `lib/ticketStorage.ts`

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 19. Security Checklist

### 19.1 — Authentication & Sessions

- [x] Discord OAuth2 with `identify email guilds` scopes (already done)
- [ ] Token refresh on expiry (implement in Phase 2)
- [ ] Rate limit login attempts
- [ ] CSRF protection on all POST routes
- [ ] HTTP-only, secure, SameSite cookies for sessions

### 19.2 — Authorization

- [x] Admin route check via `OWNER_DISCORD_UID` (already done)
- [ ] Per-guild permission check on all guild API routes
- [ ] RBAC for guild-level roles (owner, admin, moderator, DJ)
- [ ] Verify bot is in guild before allowing configuration

### 19.3 — API Security

- [x] Security headers in middleware (already done)
- [ ] Rate limiting on all API routes (especially player actions)
- [ ] Input validation with Zod on all POST/PATCH routes
- [ ] Bot API key never exposed to client
- [ ] CORS configuration for API routes
- [ ] Request size limits

### 19.4 — Data Security

- [ ] Database connection over SSL
- [ ] Encrypt sensitive data at rest (API keys, tokens)
- [ ] PII data handling (email, Discord usernames) — GDPR compliant
- [ ] Audit log all administrative actions
- [ ] Data retention policy (auto-delete old logs)

### 19.5 — Infrastructure

- [x] HTTPS everywhere (enforced by Vercel)
- [x] HSTS header (already in middleware)
- [ ] Content Security Policy (currently removed — re-add)
- [ ] Dependency vulnerability scanning (Dependabot / Snyk)
- [ ] Secret rotation policy
- [ ] Regular security audits

---

## 20. File & Folder Structure (Target)

```
swelly-website2025/
├── app/
│   ├── layout.tsx                          # Root layout (existing)
│   ├── page.tsx                            # Home page (existing)
│   ├── globals.css                         # Global styles (existing)
│   │
│   ├── dashboard/
│   │   ├── layout.tsx                      # Dashboard metadata
│   │   ├── page.tsx                        # Server selection (upgrade)
│   │   └── [guildId]/
│   │       ├── layout.tsx                  # Sidebar + top bar ⭐ NEW
│   │       ├── page.tsx                    # Guild overview ⭐ NEW
│   │       ├── settings/
│   │       │   └── page.tsx               # General settings ⭐ NEW
│   │       ├── player/
│   │       │   └── page.tsx               # Now playing + controls ⭐ NEW
│   │       ├── queue/
│   │       │   └── page.tsx               # Queue management ⭐ NEW
│   │       ├── analytics/
│   │       │   └── page.tsx               # Charts & metrics ⭐ NEW
│   │       ├── filters/
│   │       │   └── page.tsx               # Audio filters ⭐ NEW
│   │       ├── permissions/
│   │       │   └── page.tsx               # Role permissions ⭐ NEW
│   │       ├── embeds/
│   │       │   └── page.tsx               # Custom embed builder ⭐ NEW
│   │       ├── logs/
│   │       │   └── page.tsx               # Audit log ⭐ NEW
│   │       └── premium/
│   │           └── page.tsx               # Server premium status ⭐ NEW
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # (existing)
│   │   ├── bot/                           # ⭐ NEW — BFF routes
│   │   │   ├── status/route.ts
│   │   │   └── guilds/
│   │   │       ├── check/route.ts
│   │   │       └── [guildId]/
│   │   │           ├── settings/route.ts
│   │   │           ├── player/route.ts
│   │   │           ├── queue/route.ts
│   │   │           ├── analytics/route.ts
│   │   │           ├── roles/route.ts
│   │   │           ├── channels/route.ts
│   │   │           └── audit-log/route.ts
│   │   ├── billing/                       # ⭐ NEW — Stripe
│   │   │   ├── checkout/route.ts
│   │   │   ├── portal/route.ts
│   │   │   ├── webhook/route.ts
│   │   │   └── subscription/route.ts
│   │   ├── admin/                         # ⭐ NEW — Admin API
│   │   │   ├── guilds/route.ts
│   │   │   ├── users/[id]/route.ts
│   │   │   ├── subscriptions/route.ts
│   │   │   ├── system/route.ts
│   │   │   └── announcements/route.ts
│   │   ├── tickets/route.ts               # (existing — upgrade to DB)
│   │   ├── subscribe/route.ts             # (existing — upgrade to DB)
│   │   ├── status/route.ts                # (existing — replace mock)
│   │   ├── me/guilds/route.ts             # (existing)
│   │   ├── discord-profile/route.ts       # (existing)
│   │   └── discord-user/[id]/route.ts     # (existing)
│   │
│   ├── admin/                             # (existing — expand)
│   │   ├── page.tsx                       # Admin overview ⭐ NEW
│   │   ├── tickets/page.tsx               # (existing)
│   │   ├── guilds/page.tsx                # ⭐ NEW
│   │   ├── users/page.tsx                 # ⭐ NEW
│   │   ├── subscriptions/page.tsx         # ⭐ NEW
│   │   └── system/page.tsx                # ⭐ NEW
│   │
│   └── ... (other existing pages)
│
├── components/
│   ├── dashboard/
│   │   ├── GuildCard.tsx                  # ⭐ NEW
│   │   ├── DashboardSidebar.tsx           # ⭐ NEW
│   │   ├── DashboardTopBar.tsx            # ⭐ NEW
│   │   ├── settings/
│   │   │   ├── GeneralSettings.tsx        # ⭐ NEW
│   │   │   ├── MusicSettings.tsx          # ⭐ NEW
│   │   │   ├── DJModeSettings.tsx         # ⭐ NEW
│   │   │   ├── ChannelSettings.tsx        # ⭐ NEW
│   │   │   └── SettingsField.tsx          # ⭐ NEW (reusable form field)
│   │   ├── player/
│   │   │   ├── NowPlaying.tsx             # ⭐ NEW
│   │   │   ├── PlayerControls.tsx         # ⭐ NEW
│   │   │   ├── ProgressBar.tsx            # ⭐ NEW
│   │   │   ├── VolumeSlider.tsx           # ⭐ NEW
│   │   │   └── TrackCard.tsx              # ⭐ NEW
│   │   ├── queue/
│   │   │   ├── QueueList.tsx              # ⭐ NEW
│   │   │   ├── QueueItem.tsx              # ⭐ NEW
│   │   │   └── AddToQueue.tsx             # ⭐ NEW
│   │   ├── analytics/
│   │   │   ├── ListeningTimeChart.tsx     # ⭐ NEW
│   │   │   ├── TopSongsTable.tsx          # ⭐ NEW
│   │   │   ├── TopUsersTable.tsx          # ⭐ NEW
│   │   │   ├── PeakHoursHeatmap.tsx       # ⭐ NEW
│   │   │   └── PeriodSelector.tsx         # ⭐ NEW
│   │   ├── Activity24hChart.tsx           # (existing — update data source)
│   │   ├── BotStatsCards.tsx              # (existing — update data source)
│   │   ├── PopularCommandsChart.tsx       # (existing — update data source)
│   │   ├── UptimeChart.tsx                # (existing — update data source)
│   │   └── GuildSettingsClient.tsx        # (existing — deprecate/replace)
│   │
│   └── ... (other existing components)
│
├── hooks/                                 # ⭐ NEW
│   ├── useGuildSettings.ts
│   ├── usePlayerState.ts
│   ├── useQueue.ts
│   ├── useGuildAnalytics.ts
│   ├── useGuildRoles.ts
│   └── useGuildChannels.ts
│
├── lib/
│   ├── botApi.ts                          # ⭐ NEW — Bot backend client
│   ├── apiHelpers.ts                      # ⭐ NEW — Auth/permission helpers
│   ├── cache.ts                           # ⭐ NEW — In-memory cache
│   ├── stripe.ts                          # ⭐ NEW — Stripe client
│   ├── db.ts                              # ⭐ NEW — Prisma client singleton
│   ├── authOptions.ts                     # (existing — upgrade)
│   ├── adminConfig.ts                     # (existing)
│   ├── commands.ts                        # (existing)
│   ├── emailService.ts                    # (existing)
│   ├── config.ts                          # (existing)
│   └── validations/                       # ⭐ NEW
│       ├── guildSettings.ts
│       ├── playerAction.ts
│       └── billing.ts
│
├── prisma/                                # ⭐ NEW
│   ├── schema.prisma
│   └── migrations/
│
├── mocks/                                 # ⭐ NEW (dev only)
│   ├── handlers.ts
│   └── browser.ts
│
├── tests/                                 # ⭐ NEW
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── types/
│   ├── next-auth.d.ts                     # (existing)
│   ├── bot.ts                             # ⭐ NEW — Bot API types
│   ├── dashboard.ts                       # ⭐ NEW — Dashboard types
│   └── billing.ts                         # ⭐ NEW — Billing types
│
└── DOCS/
    ├── DASHBOARD_ARCHITECTURE_AND_IMPLEMENTATION.md  # (existing)
    └── DASHBOARD_IMPLEMENTATION_GUIDE.md             # This file
```

---

## 21. Environment Variables Reference

### 21.1 — Complete Variable List

```env
# ═══════════════════════════════════════════
# EXISTING (already configured)
# ═══════════════════════════════════════════

# Discord OAuth2 (NextAuth)
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# NextAuth.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://swelly.bot

# Discord Bot Token (for user lookups)
BOT_TOKEN=

# Admin
OWNER_DISCORD_UID=
NEXT_PUBLIC_OWNER_DISCORD_UID=

# Email (Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ADMIN_EMAIL=

# Discord Webhooks
DISCORD_SUPPORT_WEBHOOK_URL=

# Site
NEXT_PUBLIC_SITE_URL=https://swelly.bot
NEXT_PUBLIC_DISCORD_SUPPORT_URL=

# ═══════════════════════════════════════════
# NEW (to be added)
# ═══════════════════════════════════════════

# Bot Backend API
BOT_API_BASE_URL=https://api.swelly.bot
BOT_API_KEY=                               # Shared secret for dashboard ↔ bot auth

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/swelly

# Redis (optional, for caching)
REDIS_URL=redis://...
# OR Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Stripe Billing
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Feature Flags (optional)
ENABLE_REALTIME=false                      # Enable WebSocket/SSE
ENABLE_BILLING=false                       # Enable Stripe billing
ENABLE_ANALYTICS=true                      # Enable analytics

# Sentry (optional)
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## 22. Team Task Breakdown & Sprint Plan

### 22.1 — Sprint 1 (Week 1-2): Foundation

| Task | Assignee | Priority | Est. |
|------|----------|----------|------|
| Set up PostgreSQL + Prisma schema | Backend Dev 1 | 🔴 | 2d |
| Create `lib/botApi.ts` client | Backend Dev 1 | 🔴 | 2d |
| Create `lib/apiHelpers.ts` | Backend Dev 1 | 🔴 | 1d |
| Create Zod validation schemas | Backend Dev 1 | 🔴 | 1d |
| Set up SWR/data fetching hooks | Frontend Dev 1 | 🟡 | 2d |
| Create `DashboardSidebar` component | Frontend Dev 1 | 🟡 | 2d |
| Create `DashboardTopBar` component | Frontend Dev 1 | 🟡 | 1d |
| Create `[guildId]/layout.tsx` | Frontend Dev 1 | 🔴 | 1d |
| Migrate tickets to Prisma | Backend Dev 2 | 🟡 | 2d |
| Migrate newsletter to Prisma | Backend Dev 2 | 🟡 | 1d |

### 22.2 — Sprint 2 (Week 3-4): Core Dashboard

| Task | Assignee | Priority | Est. |
|------|----------|----------|------|
| Guild Settings BFF routes | Backend Dev 1 | 🔴 | 2d |
| Player Controls BFF routes | Backend Dev 1 | 🔴 | 2d |
| Queue BFF routes | Backend Dev 1 | 🔴 | 1d |
| Guild Overview page | Frontend Dev 1 | 🔴 | 2d |
| General Settings page | Frontend Dev 1 | 🔴 | 3d |
| `NowPlaying` + `PlayerControls` | Frontend Dev 2 | 🔴 | 3d |
| `ProgressBar` + `VolumeSlider` | Frontend Dev 2 | 🔴 | 2d |
| `QueueList` + drag/drop | Frontend Dev 2 | 🔴 | 3d |
| Enhance `servers/page.tsx` | Frontend Dev 1 | 🟡 | 2d |
| Upgrade auth (token refresh) | Backend Dev 2 | 🟡 | 2d |

### 22.3 — Sprint 3 (Week 5-6): Analytics & Premium

| Task | Assignee | Priority | Est. |
|------|----------|----------|------|
| Analytics BFF routes | Backend Dev 1 | 🟡 | 2d |
| Replace mock chart data | Frontend Dev 1 | 🟡 | 3d |
| New analytics components | Frontend Dev 2 | 🟡 | 3d |
| Stripe setup + billing routes | Backend Dev 2 | 🟡 | 3d |
| Premium page → Stripe Checkout | Frontend Dev 1 | 🟡 | 2d |
| Stripe webhook handler | Backend Dev 2 | 🟡 | 2d |
| Audit logging system | Backend Dev 1 | 🟡 | 2d |
| Logs page | Frontend Dev 2 | 🟡 | 2d |
| Permissions page | Frontend Dev 1 | 🟢 | 2d |
| Filters page | Frontend Dev 2 | 🟢 | 2d |

### 22.4 — Sprint 4 (Week 7-8): Polish & Testing

| Task | Assignee | Priority | Est. |
|------|----------|----------|------|
| Real-time polling optimization | Backend Dev 1 | 🟡 | 2d |
| SSE for now playing | Backend Dev 1 | 🟢 | 2d |
| Admin panel expansion | Backend Dev 2 | 🟡 | 3d |
| MSW development mocks | Frontend Dev 1 | 🟡 | 2d |
| Unit + integration tests | All Devs | 🔴 | 3d |
| E2E tests (Playwright) | QA/Frontend Dev 2 | 🔴 | 3d |
| Performance optimization | Frontend Dev 1 | 🟡 | 2d |
| Mobile responsive QA | Frontend Dev 2 | 🟡 | 2d |
| CI/CD pipeline | DevOps | 🔴 | 2d |
| Security audit checklist | Backend Dev 2 | 🔴 | 1d |

### 22.5 — Post-Launch (Week 9+)

| Task | Priority |
|------|----------|
| WebSocket for full real-time | 🟢 |
| Custom embed builder | 🟢 |
| Moderation dashboard | 🟢 |
| i18n for dashboard pages | 🟢 |
| Leaderboard with real data | 🔵 |
| Mobile app (React Native) | 🔵 |
| Public API for bot developers | 🔵 |

---

## 23. Common Pitfalls & Edge Cases

### 23.1 — Discord API Limitations

| Issue | Solution |
|-------|----------|
| OAuth token expires (7 days) | Implement token refresh in NextAuth callbacks |
| Guild list is cached by Discord | Accept 1-2 min delay when bot is added/removed |
| Rate limits on `/users/@me/guilds` | Cache guild list for 60s, use SWR `dedupingInterval` |
| User revokes Discord auth | Handle 401 gracefully, redirect to login |
| Bot not in guild when user clicks Configure | Show "Invite Bot" prompt instead of error |

### 23.2 — Bot API Edge Cases

| Issue | Solution |
|-------|----------|
| Bot is offline/unreachable | Show cached data + "Bot offline" banner |
| Bot restart during config save | Retry with idempotency key |
| Player state changes between poll intervals | Use optimistic updates, reconcile on next poll |
| Queue reorder fails (concurrent modification) | Use version/ETag conflict resolution |
| User in dashboard but not in voice channel | Show "Not in voice" state, disable playback controls |
| Multiple users editing settings simultaneously | Optimistic concurrency with version numbers |
| Bot is in guild but no permission | Show "Missing Permissions" with invite link (with correct permissions) |

### 23.3 — Frontend Edge Cases

| Issue | Solution |
|-------|----------|
| Slow network / high latency | Optimistic UI updates, loading skeletons |
| Tab becomes inactive | Reduce/stop polling, resume on focus |
| User navigates between guilds quickly | Cancel in-flight requests, debounce |
| Session expires during use | Show re-login prompt, preserve form state |
| Large queue (1000+ tracks) | Virtualized list (react-window or @tanstack/virtual) |
| Mobile keyboard pushing layout | Fixed bottom controls, proper viewport meta |

### 23.4 — Billing Edge Cases

| Issue | Solution |
|-------|----------|
| Payment fails | Grace period (3 days), downgrade to free |
| User cancels mid-cycle | Keep premium until period end |
| Stripe webhook delayed | Idempotent handler, periodic status check |
| User changes guild for subscription | Clear old guild's premium, activate new |
| Dispute/chargeback | Auto-revoke premium, log incident |
| Price change for existing subscribers | Grandfather existing, new price for new only |

---

## 24. Appendix — Code Snippets & Examples

### 24.1 — Dashboard Sidebar Component

```typescript
// components/dashboard/DashboardSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome, FaCog, FaMusic, FaListOl, FaChartBar,
  FaSlidersH, FaUserShield, FaCode, FaScroll, FaCrown
} from "react-icons/fa";

const navItems = [
  { href: "", label: "Overview", icon: FaHome },
  { href: "/settings", label: "Settings", icon: FaCog },
  { href: "/player", label: "Player", icon: FaMusic },
  { href: "/queue", label: "Queue", icon: FaListOl },
  { href: "/analytics", label: "Analytics", icon: FaChartBar },
  { href: "/filters", label: "Filters", icon: FaSlidersH },
  { href: "/permissions", label: "Permissions", icon: FaUserShield },
  { href: "/embeds", label: "Embeds", icon: FaCode },
  { href: "/logs", label: "Audit Logs", icon: FaScroll },
  { href: "/premium", label: "Premium", icon: FaCrown },
];

export default function DashboardSidebar({ guildId }: { guildId: string }) {
  const pathname = usePathname();
  const basePath = `/dashboard/${guildId}`;

  return (
    <aside className="w-64 bg-white/[0.03] border-r border-white/10 min-h-screen p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const href = `${basePath}${item.href}`;
          const isActive = pathname === href || (item.href !== "" && pathname.startsWith(href));
          return (
            <Link
              key={item.href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-primary/20 text-white border border-primary/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

### 24.2 — Guild Dashboard Layout

```typescript
// app/dashboard/[guildId]/layout.tsx
"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import LoginInline from "@/components/auth/LoginInline";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GuildDashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const params = useParams();
  const guildId = params.guildId as string;

  if (status === "loading") return <LoadingSpinner />;
  if (status !== "authenticated") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
        <LoginInline />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardTopBar guildId={guildId} />
      <div className="flex">
        <DashboardSidebar guildId={guildId} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
```

### 24.3 — Now Playing Component

```typescript
// components/dashboard/player/NowPlaying.tsx
"use client";
import Image from "next/image";
import { FaPlay, FaPause, FaForward, FaStop, FaRedo, FaRandom } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";
import type { PlayerState } from "@/lib/botApi";

interface NowPlayingProps {
  player: PlayerState | null;
  onAction: (action: string, value?: any) => void;
  loading?: boolean;
}

export default function NowPlaying({ player, onAction, loading }: NowPlayingProps) {
  if (loading) {
    return <div className="card animate-pulse h-48" />;
  }

  if (!player?.currentTrack) {
    return (
      <div className="card text-center py-12">
        <FaMusic className="w-12 h-12 mx-auto text-white/20 mb-3" />
        <p className="text-white/50">Nothing is playing right now</p>
        <p className="text-white/30 text-sm mt-1">
          Use /play in your Discord server to start listening
        </p>
      </div>
    );
  }

  const { currentTrack, isPlaying, isPaused, position, volume, repeatMode } = player;

  return (
    <div className="card" data-reveal-card>
      <div className="flex gap-6">
        {/* Album Art */}
        <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Track Info + Controls */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate">{currentTrack.title}</h3>
          <p className="text-white/60 text-sm truncate">{currentTrack.author}</p>
          <p className="text-white/40 text-xs mt-1">
            Requested by {currentTrack.requestedBy.username}
          </p>

          {/* Progress Bar */}
          <ProgressBar
            position={position}
            duration={currentTrack.duration}
            isPlaying={isPlaying && !isPaused}
            onSeek={(pos) => onAction("seek", pos)}
          />

          {/* Controls */}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => onAction(isPaused ? "resume" : "pause")}
              className="p-2 rounded-full bg-primary hover:bg-primary/80 transition"
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>
            <button onClick={() => onAction("skip")} className="p-2 text-white/60 hover:text-white">
              <FaForward />
            </button>
            <button onClick={() => onAction("stop")} className="p-2 text-white/60 hover:text-white">
              <FaStop />
            </button>
            <button
              onClick={() => onAction("shuffle")}
              className="p-2 text-white/60 hover:text-white"
            >
              <FaRandom />
            </button>
            <button
              onClick={() => {
                const modes = ["off", "track", "queue"];
                const next = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
                onAction("repeat", next);
              }}
              className={`p-2 ${repeatMode !== "off" ? "text-primary" : "text-white/60"} hover:text-white`}
            >
              <FaRedo />
            </button>

            <div className="ml-auto w-32">
              <VolumeSlider
                value={volume}
                onChange={(v) => onAction("volume", v)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 24.4 — Bot Backend Required Middleware (for bot team)

```typescript
// Example middleware for the bot backend API
// This goes in the BOT codebase, not this project

// Auth middleware — validates dashboard API key
function dashboardAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.DASHBOARD_API_KEY}`) {
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid API key" } });
  }
  // Extract dashboard user ID for audit logging
  req.dashboardUserId = req.headers["x-dashboard-user"];
  req.requestId = req.headers["x-request-id"];
  next();
}

// Guild existence check
function requireGuild(req, res, next) {
  const guild = client.guilds.cache.get(req.params.guildId);
  if (!guild) {
    return res.status(404).json({
      error: { code: "GUILD_NOT_FOUND", message: "Bot is not in this guild" }
    });
  }
  req.guild = guild;
  next();
}
```

### 24.5 — Recommended VS Code Extensions for Team

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-playwright.playwright",
    "burkeholland.simple-react-snippets",
    "mikestead.dotenv"
  ]
}
```

### 24.6 — Recommended ESLint & Prettier Config

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true
}
```

---

## Quick-Start Checklist

When your team is ready to begin, follow this order:

- [ ] **Day 1:** Clone repo, install deps, read this guide
- [ ] **Day 1:** Set up PostgreSQL database (Supabase/Neon recommended for speed)
- [ ] **Day 1:** Run `npx prisma init` and add schema from Section 18
- [ ] **Day 2:** Create `lib/db.ts`, `lib/botApi.ts`, `lib/apiHelpers.ts`
- [ ] **Day 2:** Create Zod validation schemas in `lib/validations/`
- [ ] **Day 3:** Run `npx prisma migrate dev --name initial`
- [ ] **Day 3:** Create first BFF route: `app/api/bot/guilds/[guildId]/settings/route.ts`
- [ ] **Day 3:** Create `hooks/useGuildSettings.ts` with SWR
- [ ] **Day 4:** Build `DashboardSidebar` and `DashboardTopBar` components
- [ ] **Day 4:** Create `app/dashboard/[guildId]/layout.tsx`
- [ ] **Day 5:** Build overview page `app/dashboard/[guildId]/page.tsx`
- [ ] **Day 5:** Build settings page `app/dashboard/[guildId]/settings/page.tsx`
- [ ] **Week 2:** Player controls, queue management, analytics
- [ ] **Week 3:** Premium/billing, admin panel expansion
- [ ] **Week 4:** Testing, polish, performance, deploy

---

## Summary of Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **BFF Pattern** | Next.js API routes proxy to bot | Keeps API keys server-side, centralizes auth |
| **Database ORM** | Prisma | Type-safe, great DX, migrations built-in |
| **Client Data Fetching** | SWR | Lightweight, built-in caching, React-native |
| **Validation** | Zod | Runtime + compile-time safety, great with TypeScript |
| **Real-time (MVP)** | Polling | Simplest to implement, upgrade path to SSE/WS |
| **Charts** | Recharts (already installed) | Already in use, feature-rich, responsive |
| **Payments** | Stripe | Industry standard, great DX, webhook support |
| **Drag & Drop** | @dnd-kit/core | Modern, accessible, performant |
| **Testing** | Vitest + Playwright + MSW | Fast unit tests, reliable E2E, API mocking |
| **Deployment** | Vercel | Best Next.js hosting, preview deployments |

---

*This guide should be treated as a living document. Update it as architectural decisions are made and implementation progresses.*
