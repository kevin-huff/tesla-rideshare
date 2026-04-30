# ride.kevnet.cloud · Component Catalog

Reference for the developer agent. Every visible piece on the page is one of these. Names match Astro component file names — `src/components/<Name>.astro`.

---

## Layout

### `<Page>`
The shell. Sets `<html lang="en">`, viewport, color-scheme `dark`, the view-source greeting comment, and the inline `console.log`. Loads Cloudflare Web Analytics. No third-party scripts otherwise.

### `<Section>`
Props: `index` (string, e.g. `"01 / WHO"`), `title`, `id`.
Renders the `<hr>` above (except when first), the mono index label, the H2, and `<slot />`. Vertical padding `30 22 32`.

### `<Rule>`
A single hairline at `--line`. Used between sections. Don't add extra margin around it.

---

## Header & Hero

### `<TopNav>`
Left: `kevnet.cloud / ride` in mono. Right: live indicator (`● live` mono label + green pulsing dot) — the dot is rendered by `<LiveDot>`. Sticky? **No.** Scrolls with the page.

### `<Hero>`
Props: `title` (multi-line node), `subtitle`, `photo` (Image).
Renders the kicker (`· hello from the back seat`), the H1 with `Model Y` in accent (italic in serif mode), the lead paragraph, and the hero photo. The photo is preloaded as the LCP element.

### `<JumpTiles>`
3-up grid of anchor tiles (`01 The Tesla`, `02 The Show`, `03 Work`). Each tile: mono index in accent, label in `--fg`, `↓` in `--fg-mute`. Hover lifts to `--bg3`.

---

## Content

### `<MeetKevin>`
Headshot (88px square) + bio paragraph in a 2-col flex. Followed by the "currently into" chip row and the LinkedIn link.

### `<Chip>`
Props: `label`. Pill, `--line2` border, 5/10 padding. **No fill.**

### `<MeetJeanLuc>` *(section 02 — the only place the car has a name)*
Props: `exterior`, `interior`, `screen`, `plate?`.
Renders the section header "Meet Jean-Luc" with mono subhead "the model y", then the photo grid (1 large + 2 small below), the SpecGrid, the Plate detail row, the FAQ, and the ReferralCard.

### `<SpecGrid>`
2×2, 1px borders, no fills. Cells:
| range | 0—60 |
| the screen | driver mode |
The fourth cell value is **`engage`** — that's the whole joke. Don't change it without checking with Kevin.

### `<Plate>`
Props: `text` (default `"PICARD"`), `caption` (default `"missouri · 2023"`).
Cream rectangle (`#f4efe1`), 12px mono 700 with 0.18em tracking, inset double-border to read as a real plate. Inline, with the caption in mono `--fg-mute` next to it. **Do not** make it larger than ~110px wide. **Do not** color it accent.

### `<FAQ>`
Native `<details>` list. Summary: question in 15px medium, `+` icon on the right that rotates to `×`. Open body: 14px `--fg-dim`. Border-top hairline on each item, plus a closing hairline at the bottom.

Default questions:
1. How much was it?
2. Does it really drive itself?
3. What happens if it runs out?
4. Cold weather?
5. Why "Jean-Luc"?  *(can be omitted; soft reveal)*

### `<ReferralCard>`
`--bg2` card, 1px `--line` border, 10px radius. Mono accent kicker, body, accent link.

### `<KevinShow>`
`<ChannelCard>` + clip grid. The channel card is 1px-border, 12px radius, with the channel art image on top, then a flex row (avatar 36, name + status, Follow button), then the schedule.

### `<FollowButton>`
Pill, accent fill, `#000` text, 13px 600. **Not** a link to Twitch's iframe — links straight to `twitch.tv/thekevinshow`. The Twitch iframe is never auto-loaded.

### `<WorkBuckets>`
Three rows separated by hairlines. Each row: mono accent `01`/`02`/`03` in 22px gutter + content (title + body). Followed by the email CTA.

### `<EmailCTA>`
Full-width, accent border, accent text, 10px radius, centered. `padding: 14 16`. Used for the work-section CTA.

### `<DirectBooking>`
Lower visual weight. Mono kicker, "Already know me?" headline at 17px medium, lead, single underlined accent link. **No card chrome.**

### `<Connect>`
2×2 grid (4×1 on desktop) of social tiles. Each tile: mono key (`email`, `twitch`, `linkedin`, `github`) and the value in `--fg`. Hover swaps to `--bg3`. 1px `--line` borders between cells (gap:1 on a `--line` background).

### `<Footer>`
Two mono lines: `© 2026 kevin · springfield mo` and `built by kevin`. Spread to opposite ends.

---

## Atoms

### `<MonoLabel>` — 10.5px, 0.08em tracking, uppercase, `--fg-mute` by default. Pass `accent` for the index numbers.

### `<LiveDot>` — 7px green dot with 8px sky-green glow. **No animation by default**; opt in via `pulse` prop (a 1s-period `box-shadow` ease, off when reduced-motion).

### `<UnderlinedLink>` — 1px underline via `background-image` so descenders aren't clipped. Inline-flex, 4px gap, optional trailing arrow (↗ external, → internal).

### `<Photo>` — wraps Astro `<Image>`. Provides AVIF + WebP, sets explicit width/height, lazy by default except `eager` on the hero. Caption optional, rendered in mono below.

### `<PhotoPlaceholder>` — striped 45° SVG + mono caption. Used during build before real photos arrive. Delete from the codebase before launch — leaving it in is a smell.

---

## Utility hooks (Astro client islands, loaded only when needed)

### `useLiveStatus()`
Fetches a Cloudflare Worker proxy (`/api/live`) that hits Twitch's API and caches at the edge for 60s. Returns `{ live: boolean, title?: string }`. The `<TopNav>` indicator uses this. **Never call Twitch directly from the client.**

### `useKonami(callback)`
Listens for `↑↑↓↓←→←→ B A` and toggles a body-level `data-dev-mode` attribute. CSS reveals the dev overlay when present. No JS for the overlay itself — pure CSS.

---

## Page-level hierarchy (final)

```
<Page>
  <TopNav>
  <Hero>
  <JumpTiles>
  <Section index="01 / WHO" title="Meet Kevin">
    <MeetKevin>
  <Section index="02 / THE CAR · PICARD" title="Meet Jean-Luc" id="tesla">
    <MeetJeanLuc>
      <SpecGrid>
      <Plate>
      <FAQ>
      <ReferralCard>
  <Section index="03 / TWITCH" title="The Kevin Show" id="show">
    <KevinShow>
  <Section index="04 / WORK" title="Work With Me" id="work">
    <WorkBuckets>
  <DirectBooking>
  <Connect>
  <Footer>
</Page>
```

## Off the page

- `404.astro` → renders `<NotFound>`: H1 "Captain, that page does not exist." in the same H1 style as the hero, mono "ERR · 404" kicker, link back to `/`.
- `humans.txt` → static, plain text.
- `.well-known/whoami` → static JSON.
