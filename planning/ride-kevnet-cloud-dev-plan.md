# ride.kevnet.cloud — Developer Handoff

A single-page personal brand hub for Kevin, the landing target for a QR code displayed in his Tesla Model Y while driving for Uber/Lyft. Design will be provided separately. This document covers everything the developer agent needs to scope, build, and ship.

## What this site is

A static single-page site at `ride.kevnet.cloud`. Primary audience is rideshare passengers scanning a QR code on their phone, often on cellular, often while the car is moving. Secondary audience is anyone who hears about Kevin from the Twitch show or from word of mouth and wants a place to learn more or get in touch.

The site has four jobs in priority order: introduce Kevin, show off the Tesla and surface the referral, drive Twitch follows, provide a soft contact path for tech work and direct rideshare bookings.

## Stack

- **Framework:** Astro
- **Styling:** Tailwind via the official Astro integration. If the designer's spec is light enough that Tailwind feels like overkill, vanilla CSS with custom properties is acceptable. Developer's call after seeing the design.
- **Hosting:** Cloudflare Pages, deployed from a GitHub repo on push to `main`
- **Domain:** `ride.kevnet.cloud`, already owned, DNS managed in Cloudflare
- **Analytics:** Cloudflare Web Analytics (cookieless, no consent banner needed)
- **Repo:** new public or private GitHub repo under Kevin's account, name TBD with Kevin
- **Node version:** pin to current LTS in `.nvmrc` and `package.json` engines field
- **Package manager:** pnpm preferred, npm acceptable

No CMS. No database. No serverless functions in v1. Content lives in the repo as Astro components or markdown files.

## Performance budget

These are hard targets, not aspirations. The site is being scanned on cellular in a moving car.

- Lighthouse mobile score 95+ in all four categories
- Largest Contentful Paint under 1.5s on simulated 4G
- Total transferred page weight under 500KB excluding the hero image
- Hero image under 200KB after optimization
- Zero render-blocking JavaScript
- No layout shift after initial paint (CLS under 0.05)
- Time to Interactive under 2s on mid-tier mobile

If a design choice would blow the budget, flag it back to Kevin before building it.

## Browser and device support

- Mobile Safari and Chrome on iOS 16+, Android Chrome 110+
- Desktop Chrome, Firefox, Safari, Edge current and one version back
- Mobile-first build. Desktop is the secondary view.
- Test on actual phone, not just devtools emulation, before calling it done.

## Accessibility

- WCAG 2.1 AA minimum
- Semantic HTML, proper heading hierarchy, single h1
- All interactive elements keyboard-reachable with visible focus states
- Alt text on every image
- Color contrast verified against AA
- `prefers-reduced-motion` respected for any animation
- Skip-to-content link if the design has substantial nav

## Page structure

Single page, anchor-linked sections. Order top to bottom:

1. **Hero** — full-bleed photo, name, tagline, three anchor links to Tesla / Show / Work
2. **Meet Kevin** — bio paragraph, interest tags, headshot, LinkedIn link
3. **Meet the Tesla** — exterior and interior photos, civilian-friendly specs, passenger FAQ, referral CTA
4. **The Kevin Show** — what it is, schedule, static "Watch on Twitch" card, recent clip thumbnails
5. **Work With Me** — three service buckets, short background paragraph, email CTA
6. **Direct Booking** — lower-weight section for off-app rides, framed for repeat customers
7. **Contact / Connect** — email, Twitch, LinkedIn, GitHub, other socials
8. **Footer** — copyright, "Built by Kevin" line

Each section gets its own Astro component. Section IDs match anchor links from the hero.

## Component breakdown

- `Layout.astro` — base shell, meta tags, analytics snippet, font loading
- `Hero.astro`
- `MeetKevin.astro`
- `MeetTesla.astro` — includes the FAQ subcomponent
- `TeslaFAQ.astro` — accordion or simple list, designer's call
- `KevinShow.astro`
- `TwitchCard.astro` — static card, no live iframe in v1
- `WorkWithMe.astro`
- `DirectBooking.astro`
- `Contact.astro`
- `Footer.astro`

Content for each section lives either inline in the component or in a `src/content/` markdown file if it's long enough to want markdown editing. Developer's call.

## Assets and content

Kevin will provide the following before build starts. If anything is missing at build time, use a clearly-marked placeholder and flag it.

- Hero photo (Kevin + Tesla, landscape, high res)
- Headshot
- Tesla exterior photo
- Tesla interior photo
- Bio copy
- Tagline
- 4 to 6 Tesla FAQ items with answers
- Current Tesla referral URL
- Twitch channel URL, schedule string, 1 to 2 clip URLs, channel art image
- Three service bucket descriptions
- Background paragraph for Work With Me section
- Contact email
- Social URLs (LinkedIn, GitHub, Twitch, others)

All images optimized to AVIF with WebP fallback using Astro's `<Image />` component. Originals stored in `src/assets/` and not committed at full resolution if they're huge.

## SEO and metadata

- Page title: TBD with Kevin, something like "Kevin Huff — Springfield Tesla driver, tech guy, Twitch streamer"
- Meta description, 150 to 160 characters
- Open Graph tags including `og:image` (use the hero photo or a dedicated OG variant)
- Twitter Card tags
- Favicon set including apple-touch-icon
- `robots.txt` allowing all
- Sitemap auto-generated by Astro's sitemap integration
- Canonical URL set to `https://ride.kevnet.cloud/`
- Structured data: `Person` schema with `jobTitle`, `url`, `sameAs` array of social URLs

## Tracking and analytics

- Cloudflare Web Analytics installed via the lightweight beacon
- The QR code will point at `https://ride.kevnet.cloud/?src=qr` (and possibly `?src=qr-card`, `?src=qr-window` variants later). The site does not need to do anything special with these query strings beyond letting analytics record them. Do not strip them from the URL.
- All outbound links to Twitch, Tesla referral, LinkedIn, GitHub, and email get a data attribute or class that Cloudflare Analytics can pick up as an event, so Kevin can see what's actually getting clicked.

## Functional requirements

- All section anchors smooth-scroll on tap (with reduced-motion fallback to instant)
- Twitch FAQ items expandable if the designer specs an accordion, otherwise rendered open
- Mailto links use the contact email Kevin provides; no contact form in v1
- Tesla referral link, Twitch link, and email link all open in new tabs with `rel="noopener noreferrer"`
- No service worker, no PWA manifest in v1

## Easter eggs and personality (optional, build if time permits)

These are nice-to-haves. Ship the core site first.

- Console greeting on devtools open: a friendly hello with the contact email
- Konami code or similar keyboard sequence that triggers a small visual gag — designer may spec this, otherwise developer's choice. Keep it tasteful and tied to Kevin's brand (Tesla, Twitch, dev culture).
- HTML comment at the top of the rendered page with a hello message for view-source readers
- `/humans.txt` at the root with credits and a hello
- Subtle motion on the Tesla section if the designer specs it; respect `prefers-reduced-motion`

If any of these would compromise the performance budget or the launch timeline, skip them.

## Things explicitly out of scope for v1

- Booking system, calendar integration, or scheduling tool
- Blog, post feed, or any CMS
- Newsletter signup
- Multi-page navigation
- Live Twitch embed (use the static card; live status widget is a possible v2)
- Dark/light mode toggle (pick one and commit, per design)
- Cookie banner (not needed with Cloudflare Web Analytics)
- Internationalization
- Comments, testimonials, or any social proof widgets
- Server-side anything

## Build phases

1. **Repo setup:** init Astro project, configure Tailwind if used, wire up Cloudflare Pages deployment from `main`, get a staging subdomain live with a placeholder page.
2. **Component scaffolding:** stub all sections with placeholder content and the structure from this doc. Confirm anchor links work end to end.
3. **Design implementation:** apply the designer's spec section by section. Mobile first.
4. **Content integration:** drop in real copy and images as Kevin provides them.
5. **Polish pass:** performance audit, accessibility audit, cross-browser check, real-device check on a phone.
6. **SEO and metadata:** finalize titles, descriptions, OG images, structured data.
7. **Easter eggs:** if time allows.
8. **Launch:** point `ride.kevnet.cloud` DNS at the Pages project, verify analytics is firing, smoke test on Kevin's phone in the actual car.
9. **Post-launch:** Kevin runs it for a week or two without the printed QR code. Developer stays available for small fixes.

## Acceptance criteria

The site is ready to launch when all of the following are true:

- Performance budget is met on a real mid-tier Android phone over a throttled connection
- Lighthouse mobile scores 95+ across all four categories
- All eight sections render correctly on iOS Safari and Android Chrome
- All Kevin-provided content is in place with no placeholders
- Anchor links scroll correctly on mobile and desktop
- Cloudflare Web Analytics is firing and recording the `src` query parameter
- Outbound link tracking is recording events
- All images have alt text, all interactive elements are keyboard-reachable
- The page renders without JavaScript enabled (graceful degradation)
- Kevin has reviewed the live staging URL on his phone, sitting in his car, and signed off

## Stylistic notes for any copy the developer writes

If the developer needs to write any UI copy not provided by Kevin (button labels, error states, alt text fallbacks):

- No em dashes or semicolons in body copy
- Casual, tech-literate tone, not corporate
- First person where Kevin is the subject
- Avoid AI-flavored phrasing ("delve," "tapestry," "in the realm of," etc.)

## Handoff dependencies

Developer needs from Kevin:
- GitHub repo access
- Cloudflare account access (or have Kevin add the developer to the relevant zone/Pages project)
- All content assets listed in the Assets section
- Final design spec from the designer

Developer needs from the designer:
- Mobile and desktop mockups for all eight sections
- Color palette and accent color
- Typography choices (and self-hosted font files if not system stack)
- Any motion or interaction specs
- Asset variants if the designer is producing OG images or icons



ride.kevnet.cloud — Addendum: Jean-Luc
A small but meaningful update to both the design and dev specs. The Tesla has a name and a license plate that the rest of the site should quietly acknowledge.
The car is named Jean-Luc. The license plate is PICARD.
The whole point of this addendum is restraint. The reference works because the passenger figures it out. Spelling it out kills it. No Star Trek logos, no LCARS, no Starfleet insignia, no quoting the show. Stay on the personal-affection side of the line, not the merchandise side.

For the designer
Section rename
"Meet the Tesla" becomes "Meet Jean-Luc" as the section header. Secondary line below it can be "the Model Y" or "PICARD" in the existing mono label style. The car has a name; lead with the name.
One spec relabel
The DRIVER MODE cell in the spec grid: change the value from "autopilot" to "engage." That's the whole joke. One reference, not five. The other three spec cells (RANGE, 0—60, THE SCREEN) stay exactly as designed.
Optional visual: the plate
If there's room, a small inline shot of the actual PICARD plate works as a quiet detail somewhere in the Tesla section. Not a hero image, not a full-width feature, just a moment that rewards the passenger who's paying attention. Designer's call on whether and where it fits without bloating the section.
Tone shift in the FAQ copy
The FAQ answers can now refer to the car by name. "Jean-Luc handles highways well" lands better than "the car handles highways well." Kevin will write the actual answers, but the designer should know the voice now treats the car as a named character, not an object.
Where it must NOT appear

Hero. The hero stays "Kevin. And his Model Y." The car's name is a reveal in section 02, not a top-line announcement.
Work With Me, Direct Booking, Contact, Footer. The name is a flavor note in the Tesla section only. It should not bleed into the rest of the site.
Any logo, insignia, font, or visual element from Star Trek. The plate text "PICARD" and the name "Jean-Luc" are the only references. That's the whole budget.

404 page (if one is in scope)
Small touch worth considering: a Picard-flavored 404. Something like "Captain, that page does not exist." Designer's call on whether to spec this or leave it to the dev.

For the developer
Copy changes

Section 02 header: "Meet Jean-Luc" instead of "Meet the Tesla"
Section 02 secondary label: "the Model Y" or "PICARD" per the designer's call
Spec grid: DRIVER MODE value changes from "autopilot" to "engage"
FAQ answer copy will reflect the car-as-character voice; copy comes from Kevin

404 page
Add a custom 404 page to the build. Astro handles this with a src/pages/404.astro file. Cloudflare Pages serves it automatically on missing routes.
Keep it on-brand with the rest of the site: same dark aesthetic, same accent color, same mono label treatment. Suggested copy: "Captain, that page does not exist." with a link back to home. Final copy from Kevin or the designer.
Easter egg expansion
The optional easter eggs from the original spec can lean into the Jean-Luc thread, since the hidden layer is where overt references are appropriate (it rewards the people who already caught the surface-level joke).

Console greeting on devtools open: "Make it so." followed by the contact email
Konami code or similar trigger: developer's choice, something Trek-flavored is now fair game in this context
/humans.txt can include a Jean-Luc nod

These remain optional. Ship the core site first.
What does not change

Performance budget
Stack
Section structure (other than the rename)
Acceptance criteria
Out-of-scope list

This is a copy-and-flavor update, not a structural one. No new sections, no new components, no new assets beyond the optional plate photo.