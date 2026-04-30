# ride.kevnet.cloud · Design Guidelines

> One-page personal hub. Mobile-first. The QR code in the Tesla points here.
> Confident but not slick. The site should read like Kevin made it on a Saturday and it just happened to come out polished.

---

## 1. Voice

- First person, warm, lightly nerdy. Not a pitch deck.
- Short sentences. Use them.
- **No em dashes. No semicolons.** En dashes (–) and periods only in body copy.
- Treat **Jean-Luc** as a named character in section 02 only. Everywhere else the car is "the Tesla" or just doesn't appear.
- The PICARD plate and the name "Jean-Luc" are the **whole** Star Trek budget. No quotes, no insignia, no logos, no LCARS. If a passenger figures it out, the joke worked. If they don't, nothing was lost.

## 2. Color tokens

```
--bg          #0b0b0d   page background
--bg2         #111114   raised surface (cards, tiles)
--bg3         #16161a   hover surface
--fg          #ecebe6   primary text
--fg-dim      rgba(236,235,230,0.62)   body copy
--fg-mute     rgba(236,235,230,0.40)   metadata, mono labels
--line        rgba(255,255,255,0.08)   default rule
--line2       rgba(255,255,255,0.14)   stronger rule, chip border
--accent      #7dd3fc   sky · default. swap freely (see Tweaks)
--live        #34d399   "● live" indicator only
```

**Accent rules.** Used for: link emphasis, section index numbers (01, 02…), the FAQ `+`, the streaming dot, the "Follow" button, selection highlight. **Not** used as a fill on any surface larger than ~120px on a side. Body text is never the accent.

**Selection highlight.** `background: var(--accent); color: #000;` — small touch, surprises devtools-curious passengers.

## 3. Type

```
sans (default)   -apple-system, BlinkMacSystemFont, "Inter", system-ui
mono             ui-monospace, "SF Mono", Menlo, Monaco
serif (option)   "Iowan Old Style", Charter, Georgia
```

System stack. **No Google Fonts.** If a self-hosted display face is added later, swap only the H1.

| Role             | Size | Weight | Tracking | Notes |
|------------------|-----:|-------:|---------:|-------|
| Hero H1          | 46 / 0.96 | 600 | -0.038em | accent on the last word, optional italic in serif mode |
| Section H2       | 28 / 1.1  | 600 | -0.025em | ALL section headers |
| Lead body        | 15.5 | 400 | 0 | hero subhead, lead paragraphs, max-width ~320px |
| Body             | 14–15 | 400 | 0 | section copy, FAQ answers |
| Card title       | 16 | 600 | 0 | service buckets, work items |
| Mono label       | 10.5 | 400 | 0.08em, UPPER | section index, metadata, captions |
| Plate (PICARD)   | 12 | 700 | 0.18em | mono, on cream `#f4efe1` |

`text-wrap: pretty` on every paragraph.

## 4. Spacing

8-pt base. Section vertical padding `30px 22px 32px`. 22px is the global gutter. Card interior padding 14–16px. Between cards 8px. Between sections, a 1px `--line` rule, no extra whitespace — the section padding does the work.

## 5. Motion

- **prefers-reduced-motion: respect it.** Wrap all transitions in `@media (prefers-reduced-motion: no-preference)`.
- No autoplaying anything. Twitch embed is a static card by default.
- Allowed: `<details>` open/close (180ms), tile hover border/background (150ms), the FAQ `+` rotating to `×`.
- No animated gradient text. No floating particles. No marquee.
- Optional: a half-second headlight "wake" on the Tesla exterior photo on first scroll into view. **Off** by default — wire it as a feature flag.

## 6. Imagery

- Real photos only. No AI generation. No stock.
- Hero is `Kevin + Jean-Luc`, landscape, shot at golden hour if at all possible. Aspect 4:5 mobile, 16:9 desktop.
- Headshot is square, 88px on mobile.
- Tesla section: one exterior 3/4-front, one interior, one screen close-up. Plus optional inline shot of the PICARD plate as a 80–120px detail — nothing larger.
- AVIF with WebP fallback. Astro's `<Image>` handles this.
- Placeholders before real photos arrive: 45° striped SVG with mono caption. Never colored blocks alone.

## 7. Layout primitives

- Single column on mobile. 22px gutter. Max content width 720px on desktop, kept centered.
- Anchor jump tiles directly under the hero — 3-up grid, never 2 or 4.
- Spec grid for the car: 2×2, 1px borders only, no fills.
- FAQ uses native `<details>`. The summary is full-width; the marker is a `+` that rotates to `×`. Body copy fades in below at `--fg-dim`.
- Connect grid is 2×2 on mobile, 4×1 on desktop.

## 8. Don'ts

- ✗ "Hi, I'm Kevin 👋" or any waving hand
- ✗ Animated gradient hero text
- ✗ Testimonials, logo strip of past clients (unless Kevin opts in)
- ✗ Skill bars or percentage proficiency
- ✗ Available-for-hire badge / status dot in the work section
- ✗ Popups, exit-intent modals, newsletter signup, chat bubbles
- ✗ Dark/light theme toggle. Commit to dark.
- ✗ Loading spinner. It's a static page.
- ✗ Vercel / Apple / Tesla.com pastiche. Linear is the closest reference and even that's a vibe, not a copy.

## 9. Accessibility

- Every tap target ≥ 44px high. The connect grid cells should be that tall on mobile already.
- Color contrast: body text `--fg-dim` on `--bg` is 7.4:1. The accent on dark passes AA at 14px+.
- All `<details>` are keyboard-accessible by default. Don't replace them with custom JS accordions.
- The plate has `aria-label="License plate: PICARD"` so a screen reader doesn't read it as letters.

## 10. Performance budget

- Lighthouse mobile 95+ on every category.
- LCP < 1.5s on 4G. Hero photo is the LCP element — preload it.
- Total weight < 500KB excluding hero.
- Zero render-blocking JS.
- Twitch embed is **never** loaded on initial render.

## 11. Easter eggs (the budget for delight)

1. **HTML view-source comment** at the top — direct line to Kevin's email.
2. **`console.log` greeting** with styled output, same line: `kevin@kevnet.cloud`.
3. **Konami code** (↑↑↓↓←→←→ B A) flips a "dev mode" overlay that exposes Astro component names. Useful internally too.
4. **`/humans.txt`** at deploy time. Plain text, signed.
5. **`/.well-known/whoami`** returns a tiny JSON blob of who Kevin is.
6. **404 page** is named `not-found.astro`, says "Captain, that page does not exist." One reference, that's the budget.

If you add a seventh, remove one. Restraint is the joke.
