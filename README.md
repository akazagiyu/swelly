# Swelly — Discord Music Bot Website

Modern marketing site for the Swelly Discord music bot. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, NextAuth (Discord), and framer-motion. The UI is themed to Swelly’s red logo with glassmorphism, subtle motion, and animated orbs.

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom theme, glass cards, utilities)
- NextAuth (Discord OAuth2) with JWT session
- framer-motion (client-only wrappers)
- React Icons

## Features
- Landing page with animated parallax orbs and gradient accents
- Commands directory with search/filter
- Premium pages (tiers + comparison)
- Invite, Status (mock API), FAQ, Top Songs, Blog, Support
- Auth: Login with Discord, Profile
- Servers list (managed/owned guilds via Discord API)
- Dashboard shell, Leaderboard, Referral

## Project structure (high level)
- `app/` — App Router pages and API routes
	- `api/auth/[...nextauth]` — NextAuth handler
	- `api/status` — mock status JSON
	- `api/me/guilds` — Discord guilds for the signed-in user
- `components/` — UI, motion, auth, providers
- `lib/authOptions.ts` — NextAuth configuration (Discord provider, JWT/session callbacks)
- `app/globals.css` — global styles, utilities, glass & button effects
- `tailwind.config.ts` — theme tokens (primary red palette)

## Getting started
1) Install Node.js 18+.
2) Copy the example env file and fill values:
```
cp .env.example .env.local
```
3) Install dependencies:
```
npm ci
```
4) Run the dev server:
```
npm run dev
```
Open http://localhost:3000.

## Environment variables
Create `.env.local` (or use the provided `.env.example`):

```
DISCORD_CLIENT_ID=your_discord_app_client_id
DISCORD_CLIENT_SECRET=your_discord_oauth_client_secret # not the bot token

NEXTAUTH_SECRET=generate_a_strong_random_string
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.com/oauth2/authorize?client_id=YOUR_ID&scope=bot%20applications.commands&permissions=36700160
NEXT_PUBLIC_DISCORD_SUPPORT_URL=https://discord.gg/yourserver
NEXT_PUBLIC_TOPGG_URL=https://top.gg/bot/YOUR_ID
```

Discord Developer Portal setup:
- Add Redirect URL: `http://localhost:3000/api/auth/callback/discord`
- If your local server runs on a different port (e.g. 3001), update both the Redirect URL and `NEXTAUTH_URL` accordingly.

## Auth behavior
- On sign-in, the Discord `access_token` is persisted in the JWT.
- The session object includes `user.id` and exposes the `accessToken` for server-side API fetches.
- The route `app/api/me/guilds` fetches the user’s guilds and filters those they own or can manage.

## Styling & motion
- Tailwind theme primary is red (`primary.DEFAULT: #ef4444` / `primary.light: #f87171`) with warm orange/rose accents.
- Glass cards and button gradients live in `app/globals.css`.
- Motion: `components/motion/FadeIn` (entrances) and `components/motion/ParallaxOrbs` (ambient backdrop). framer-motion is used only in `"use client"` components.

## Available scripts
- `npm run dev` — start Next.js in dev
- `npm run build` — production build
- `npm run start` — run the built app
- `npm run lint` — lint with eslint

## API routes
- `GET /api/status` — mock status (uptime, latency, shards)
- `GET /api/auth/providers` — NextAuth providers
- `GET /api/me/guilds` — requires session; returns managed/owned guilds

## Image domains
`next.config.mjs` allows Discord CDN:
- cdn.discordapp.com
- media.discordapp.net

## Troubleshooting
- NextAuth `NO_SECRET` or hkdf error: set `NEXTAUTH_SECRET` to a non-empty strong string.
- `invalid_client` or `client_id is required`: check your `.env.local` and Discord app Client ID/Secret; confirm the Redirect URL matches exactly.
- Windows EPERM on `.next/trace`: stop dev server and delete the `.next` folder; exclude the project from antivirus real-time scanning.
- Port changed to 3001: update `NEXTAUTH_URL` and Discord Redirect URL to `http://localhost:3001/...`.

## Deployment
- Vercel: set all env variables in the project settings. Build with `npm run build`. `NEXTAUTH_URL` should be your production URL, and the Discord Redirect URL should match that domain.

---
Swelly © 2025. Logo and brand elements belong to their respective owner.
