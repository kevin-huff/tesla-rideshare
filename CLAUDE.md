# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build commands

Astro 6, static output, vanilla CSS. Node LTS via `.nvmrc`. pnpm.

- `pnpm install` — install deps
- `pnpm dev` — local dev server at `http://localhost:4321/`
- `pnpm build` — produce `dist/`
- `pnpm preview` — serve the built site locally
- `pnpm check` — `astro check` (TypeScript + Astro diagnostics)
- `pnpm format` — Prettier with the Astro plugin

The foundation step has shipped: tokens, base shell (`Page`, `Section`, `Rule`), atoms (`MonoLabel`, `UnderlinedLink`, `Chip`, `Photo`, `PhotoPlaceholder`), and a smoke-test `index.astro`. Real sections (TopNav, Hero, JumpTiles, etc.) come next.

## The planning bundle (read order)

`planning/` is a Claude Design (claude.ai/design) handoff. Read it in this order before making non-trivial decisions:

1. `planning/README.md` — meta-instructions for coding agents (this file repeats the most important rule below).
2. `planning/project/developer-handoff.html` — the primary artifact. Open it as **source code, not a rendered page** (see below).
3. `planning/project/DESIGN_GUIDELINES.md` — design tokens, type ramp, voice, motion, the Don'ts list, the easter-egg budget.
4. `planning/project/COMPONENTS.md` — the final component catalog and page hierarchy. Astro file names match component names exactly.
5. `planning/ride-kevnet-cloud-dev-plan.md` — the original developer handoff. Older than the design bundle; defer to the bundle when they conflict (see "Conflicts" below).

The other JSX files (`variant-refined.jsx`, `variant-garage.jsx`, `variant-terminal.jsx`, `tweaks-panel.jsx`, `design-canvas.jsx`, `phone-frame.jsx`, `photo-placeholder.jsx`) are exploratory variants and the design canvas chrome around them. **The chosen direction is `variant-refined.jsx`** ("Refined Dark, Jean-Luc addendum applied"). Don't reference the garage/terminal variants when implementing.

### Do not render the prototype

`planning/README.md` is explicit on this point: do not open `developer-handoff.html` in a browser, and do not screenshot it. Read the HTML, JSX, and CSS source directly. Tokens, dimensions, and layout rules are spelled out — a screenshot adds nothing the source doesn't already give you. The prototype's React/Babel structure should not be copied; recreate the visuals in Astro.

## Stack (authoritative)

Where the planning bundle and the older dev plan disagree, the bundle wins.

- **Framework:** Astro, static output, near-zero runtime JS
- **Styling:** **vanilla CSS with `:root` custom properties**, in a single `src/styles/tokens.css`. The planning bundle explicitly notes Tailwind is not needed at this size. The older dev plan suggested Tailwind — ignore that; the bundle is newer.
- **Hosting:** Cloudflare Pages, deploy from `main`. Apex CNAME `ride.kevnet.cloud`.
- **Analytics:** Cloudflare Web Analytics (cookieless — no consent banner)
- **Fonts:** system stack only. **No Google Fonts.**
- **Images:** Astro's `<Image />` for AVIF + WebP
- **Package manager:** pnpm preferred, npm acceptable
- **Node:** current LTS, pinned via `.nvmrc` and `package.json` engines

### Serverless: one worker, on purpose

The older dev plan said "no serverless functions in v1." The design bundle adds exactly one: a Cloudflare Worker at `/api/live` that proxies Twitch's `streams` endpoint, caches 60s at the edge, and returns `{ live: bool, title?: string }`. The Twitch token lives in Worker secrets — **the client never hits Twitch directly**. The `<TopNav>` live indicator is the only consumer.

This is the only server-side piece. Don't add others without checking with Kevin.

## Target file tree (mirror this)

Per the bundle, `src/` should look like this when scaffolded:

```
src/
├── components/
│   ├── Page.astro            · shell, view-source comment, console.log greeting
│   ├── TopNav.astro          · LiveDot, not sticky
│   ├── Hero.astro            · uses <Photo eager> for LCP
│   ├── JumpTiles.astro       · 3-up, never 2 or 4
│   ├── Section.astro         · index/title/id slot wrapper
│   ├── MeetKevin.astro
│   ├── MeetJeanLuc.astro     · section 02 only — the only place the car has a name
│   │   ├── SpecGrid.astro    · driver mode = "engage" (the whole joke)
│   │   ├── Plate.astro       · cream rect, mono 700, ≤110px wide
│   │   ├── FAQ.astro         · native <details>, never custom JS
│   │   └── ReferralCard.astro
│   ├── KevinShow.astro
│   │   ├── ChannelCard.astro
│   │   └── FollowButton.astro · links to twitch.tv/thekevinshow, NEVER iframes Twitch
│   ├── WorkBuckets.astro
│   ├── EmailCTA.astro
│   ├── DirectBooking.astro
│   ├── Connect.astro
│   ├── Footer.astro
│   └── atoms/
│       ├── MonoLabel.astro
│       ├── UnderlinedLink.astro
│       ├── Chip.astro
│       └── Photo.astro
├── styles/
│   └── tokens.css            · the only :root vars
├── pages/
│   ├── index.astro
│   └── 404.astro             · "Captain, that page does not exist."
└── public/
    ├── humans.txt
    └── .well-known/whoami    · tiny JSON
```

Note: COMPONENTS.md and the file tree both call the not-found page `404.astro`; DESIGN_GUIDELINES.md mentions it as `not-found.astro`. Use **`404.astro`** — Astro and Cloudflare Pages serve that filename automatically.

## Hard constraints (acceptance criteria)

- Lighthouse mobile 95+ in all four categories
- LCP under 1.5s on simulated 4G; hero photo is the LCP element — preload it
- Total page weight under 500KB excluding the hero (hero under 200KB after optimization)
- Zero render-blocking JavaScript
- CLS under 0.05; TTI under 2s on mid-tier mobile
- Twitch embed is **never** loaded on initial render
- Page must render with JavaScript disabled (graceful degradation)
- WCAG 2.1 AA: semantic HTML, single h1, keyboard reachability, visible focus, alt text everywhere, `prefers-reduced-motion` respected
- Every tap target ≥ 44px high
- Mobile-first; iOS Safari 16+ and Android Chrome 110+ are primary targets

If a change would violate any of these, flag it before shipping.

## Out of scope for v1

Booking system, blog/CMS, newsletter, multi-page nav, live Twitch iframe, dark/light toggle, cookie banner, i18n, comments/testimonials, loading spinner, popups, exit-intent modals, chat bubbles, available-for-hire badge, skill bars, anything else server-side beyond the `/api/live` worker. Don't add these even if they look like obvious wins — they were explicitly cut.

## The Jean-Luc rule (important — read this)

The Tesla is named Jean-Luc; the plate is PICARD. The reference is *deliberately restrained* — the whole point is that the passenger figures it out.

Visible UI references, in their entirety:
- Section 02 header: "Meet Jean-Luc" (mono subhead "the model y" or "PICARD")
- SpecGrid's DRIVER MODE value: `engage`
- The PICARD plate component (≤110px wide, cream `#f4efe1`, never colored accent)
- 404 page: "Captain, that page does not exist."

That's the budget. Do not add a fifth visible reference — adding one breaks the joke. **Anywhere outside section 02 and the 404, the car is "the Tesla" or just doesn't appear.** No Star Trek logos, insignia, fonts, LCARS styling, or quotes from the show. Anywhere.

Hidden layers (HTML view-source comment, `console.log` greeting, Konami code dev overlay, `humans.txt`, `.well-known/whoami`) can lean into the reference more openly — that's where it's appropriate. But the easter-egg budget is six items total, listed in DESIGN_GUIDELINES.md §11. **If you add a seventh, remove one.** Restraint is the joke.

## Tracking and URL handling

QR codes will append `?src=qr` (and variants like `?src=qr-card`, `?src=qr-window`). Do not strip these query params — analytics relies on them. Outbound links (Twitch, Tesla referral, LinkedIn, GitHub, mailto) need a data attribute or class so Cloudflare Analytics can record them as events.

External links open in new tabs with `rel="noopener noreferrer"`.

## Copy style for any UI text Claude writes

Most copy comes from Kevin. For the rest (button labels, error states, alt text fallbacks):

- **No em dashes (—). No semicolons.** En dashes (–) and periods are fine.
- Casual, tech-literate, lightly nerdy. Not corporate, not a pitch deck.
- First person where Kevin is the subject.
- Short sentences.
- `text-wrap: pretty` on every paragraph.
- Avoid AI-flavored phrasing ("delve," "tapestry," "in the realm of," etc.).
- Don't write "Hi, I'm Kevin 👋" or anything with a waving hand.
