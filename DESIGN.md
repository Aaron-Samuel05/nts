# Design System: Jack Daniel's Website

## 1. Visual Theme & Atmosphere

Jack Daniel's presents itself with a heritage-first, high-contrast editorial system: black fields, white typography, oversized whiskey-label lettering, product photography, distillery imagery, and blunt uppercase calls to action. The site feels more like a premium brand magazine than a conventional ecommerce homepage. It relies on scale, contrast, and recognizable brand marks instead of decorative UI chrome.

- Overall feeling: Historic, confident, Americana, product-led, and deliberately bold.
- Visual density: High-impact hero areas with very large type, followed by content bands, carousels, and footer link groups.
- Brand posture: Established and iconic; copy is short, declarative, and self-assured.
- Signature motifs: Black-and-white label contrast, giant serif headlines, uppercase navigation, bottle cutouts, distillery photography, and carousel-driven product discovery.

### Key Characteristics

- Extreme black/white contrast is the core visual system.
- Custom Jack Daniel's serif headlines are used at very large scale.
- Condensed uppercase navigation and labels create the whiskey-label tone.
- Layouts favor full-width image bands, fixed navigation, and large vertical spacing.
- Radius and shadows are mostly absent; the brand language is flat, graphic, and print-like.

## 2. Color Palette & Roles

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Primary background | Charcoal Black | `#000000` | Dominant site background, header field, hero backdrop, footer, image overlays. |
| Primary text | Label White | `#FFFFFF` | Headings, nav, CTA text, footer links, high-contrast copy. |
| Muted utility text | Ash Gray | `#A7A7A7` | Secondary/legal footer copy and less prominent metadata. |
| Pale divider | Bottle Label Border | `#E5E7EB` | Default computed border color; mostly appears as utility/reset border color rather than visible structure. |
| Utility blue | Browser/Swiper Blue | `#007AFF` | Observed Swiper token; not a brand accent and should be avoided for core brand CTAs. |
| Focus ring fallback | Tailwind Ring Blue | `rgb(59 130 246 / 0.5)` | Framework focus-ring token; not visually central to the brand. |

### Primary

- Black and white carry almost all visual identity.
- White content on black backgrounds should feel like printed bottle-label typography.

### Interactive

- Links and buttons are usually uppercase text treatments rather than rounded button surfaces.
- Primary CTAs read as white uppercase text, often with a trailing arrow or direct imperative label.
- Carousel controls are functional, minimal, and not heavily decorated.

### Neutral Scale

- `#000000` for immersive dark surfaces.
- `#FFFFFF` for primary foreground.
- `#A7A7A7` for restrained legal and secondary text.
- `#E5E7EB` appears as a reset/default border color, not as a prominent rule.

### Surface & Overlay

- Main surface: black.
- Secondary surfaces: image-backed sections and product photography zones.
- Overlay behavior: text sits directly on dark/image areas; avoid translucent cards unless required for legibility.

### Theme Modes

The observed public homepage does not expose a light/dark theme toggle. Treat the dark brand mode as the canonical mode.

#### Light Mode

- Background: Not observed as a user-selectable mode.
- Surface: Use only for utility pages or legal content if needed.
- Text: Black on white for legal or form-heavy contexts.
- Accent: Preserve black/white brand contrast.
- Notes: Do not redesign the marketing system into a pale theme.

#### Dark Mode

- Background: `#000000`.
- Surface: Black, image-backed, or product-photo fields.
- Text: `#FFFFFF`.
- Accent: Brand marks, bottle imagery, and product color provide accents.
- Notes: This is the default visual identity.

### Shadows & Depth

- Depth is mostly avoided.
- Separation comes from scale, contrast, full-width bands, and imagery.
- Components should not use soft SaaS-style shadows.

## 3. Typography Rules

The typography system is the brand. It mixes a monumental custom serif for headlines, a condensed custom sans for label-like display text, and Amiko for readable body/UI copy.

### Font Family

- Primary body: `Amiko, "Amiko Fallback"`.
- Display serif: `jdSerif, "jdSerif Fallback"`.
- Display condensed: `jdSansCondensed, "jdSansCondensed Fallback"`.
- Additional observed variable: `kozuka-mincho-pr6n`.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop hero headline | `jdSerif` | `232px` observed | `700` | `191.2px` | `-4px` | Huge uppercase label-style display. Use only for first-viewport impact. |
| Mobile headline | `jdSerif` | `70.2px` observed | `700` | `63.18px` | `normal` | Compresses dramatically while staying bold and uppercase. |
| Section heading | `jdSerif` or `jdSansCondensed` | `48px-96px` inferred | `700` | Tight, about `0.85-0.95` | Tight/normal | Short uppercase phrases like "LET'S TALK COCKTAILS". |
| Navigation | `jdSansCondensed` or `Amiko` | `14px-16px` | `600-700` inferred | `24px` | Slight uppercase feel | All-caps labels with simple hover/click behavior. |
| Body | `Amiko` | `16px` observed | `400` | `24px` observed | `normal` | Used for paragraphs, legal copy, and utility text. |
| CTA / Label | `Amiko` or condensed display | `14px-18px` | `600-700` inferred | Tight | Uppercase | Short imperatives: "LEARN MORE", "BOOK A TOUR", "JOIN NOW". |

### Principles

- Use uppercase generously; lowercase should mainly appear in paragraph copy.
- Keep headlines short enough to become graphic objects.
- Let typography carry the brand instead of adding decorative panels.
- Use tight headline line-height and very large type on desktop.

## 4. Component Stylings

### Buttons and Links

- Primary CTA: Uppercase white text on black or image-backed sections, usually direct and compact.
- Secondary CTA: Text-link treatment with the same uppercase rhythm; may include `>` as a directional cue.
- Text links: White on dark fields, black on light/legal fields, minimal underline by default.
- Hover and active feel: Keep transitions crisp; observed header uses `0.3s cubic-bezier(0, 0, 0.2, 1)`.

### Cards and Containers

- Surface style: Avoid conventional cards for marketing sections.
- Radius: `0px` observed across body/header/button defaults.
- Border: Mostly absent; computed reset border color is `#E5E7EB` but visual borders are not a signature.
- Shadow or elevation: None observed as a core language.
- Internal spacing: Large editorial spacing rather than boxed padding.

### Inputs and Interactive Controls

- Input treatment: Age gate uses plain date fields and an `ENTER` button inside a centered modal.
- Focus behavior: Framework focus ring token exists, but visible brand focus styling was not central in the inspected pass.
- Selection states: Locale selectors use expandable button controls.

### Navigation

- Structure: Desktop has a fixed full-width banner with centered logo, locale selector, and uppercase nav items: shop, whiskeys, cocktail recipes, story, tours, news/events, subscribe.
- Background treatment: Fixed over the page, black/transparent-feeling with white content.
- Link style: Uppercase text, compact spacing, direct labels.
- Sticky or scroll behavior: Header is fixed. Desktop observed at `256px` height; mobile observed at `88px` height.
- Mobile behavior: Collapses to an icon menu on the left, centered logo, and shop icon on the right.

### Image Treatment

- Product imagery: Bottle cutouts are central and should appear clean, frontal, and high contrast.
- Photography: Distillery, barrelhouse, statue, tour, and history images create authenticity.
- Video: The homepage includes an embedded YouTube hero/player region.
- Border and radius treatment: Images should stay square/rectangular or cutout-based; avoid rounded stock-card treatment.

### Distinctive Components

- Age verification gate: Brand logo, country selector, large uppercase copy, three date inputs, legal agreement copy, and responsible drinking message.
- Product carousel: Multiple whiskey bottle images with product name, short descriptor, and "LEARN MORE" link.
- Cocktail carousel: Repeated recipe entries with whiskey type, recipe name, taste tags, and "VIEW RECIPE" CTAs.
- Distillery/story bands: Full-width photography with large heading and single CTA.

## 5. Layout Principles

### Spacing System

- Base unit: `8px` on mobile, scaling through named tokens.
- Repeated desktop spacing values: `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `120px`.
- Repeated mobile spacing values: `8px`, `16px`, `24px`, `32px`, `48px`, `56px`, `64px`.
- Observed tokens: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`, `--spacing-2xl`, `--spacing-3xl`, `--spacing-margin`, `--spacing-component-gap`.

### Grid & Container

- Grid logic: Full-width vertical bands with centered brand content.
- Max content width: Desktop content can span nearly the full viewport; observed hero headline width was `1376px` in a `1440px` viewport.
- Section spacing: Large vertical breaks; desktop component gaps reach `120px`.

### Whitespace Philosophy

- Whitespace is bold and theatrical, not delicate.
- Content is usually centered or strongly aligned around a hero/product image.
- Avoid dense dashboards, complex nested cards, or multi-column business UI patterns.

### Border Radius Scale

- Micro: `0px`.
- Standard: `0px`.
- Large: `0px`.
- Pill: Not a signature treatment.

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | Black/white contrast, no shadow | Primary page sections and nav. |
| Ring | Minimal or absent | Utility focus states only. |
| Card | Avoid or keep fully flat | Product/recipe items should feel like carousel slides, not cards. |
| Focus | Use clear white/black or framework ring when required | Accessibility states. |

### Depth Principles

- Surface hierarchy comes from image scale and typographic contrast.
- Shadow language is intentionally suppressed.
- Blur/glass effects are not part of the observed brand language.
- Use depth only for modal overlays like age verification or cookie preferences.

## 7. Do's and Don'ts

### Do

- Use black as the dominant canvas and white as the dominant foreground.
- Use huge uppercase serif headlines for hero and major section identity.
- Use real product and distillery imagery.
- Keep CTAs short, uppercase, and direct.
- Use large spacing tokens and full-width bands.

### Don't

- Do not add colorful gradients or decorative backgrounds.
- Do not turn the system into rounded SaaS cards.
- Do not use soft shadows as a primary separator.
- Do not write long marketing paragraphs where a short bold line works.
- Do not use generic stock imagery when product/distillery imagery can carry the page.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | `390px` observed | Header collapses to menu icon, logo, shop icon; spacing margin becomes `16px`; headline becomes about `70px`. |
| Tablet | `768px` inferred | Likely preserves stacked/mobile navigation until enough width for full nav. |
| Desktop | `1440px` observed | Fixed full navigation; header height around `256px`; hero headline can reach `232px`; component gap around `120px`. |

### Touch Targets

- Mobile top bar uses icon buttons rather than text-heavy navigation.
- Keep primary tap targets at least `44px` high.

### Collapsing Strategy

- Desktop behavior: Full nav with locale selector and multiple text links.
- Tablet behavior: Favor simplified navigation and stacked content.
- Mobile behavior: Icon menu, centered logo, shop icon; product/cocktail content remains carousel-driven.
- Breakpoint-driven component changes: Spacing tokens compress strongly, especially `--spacing-margin` from `64px` desktop to `16px` mobile.
- Touch target and spacing adjustments: Mobile header height is `88px`, enough for comfortable icon tapping.

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: White text on black or image-backed dark surfaces.
- Background: `#000000`.
- Heading text: `#FFFFFF`.
- Body text: `#FFFFFF` on dark, `#000000` on light/legal surfaces.
- Border or ring: Minimal; fallback `#E5E7EB` only when needed.
- Accent: Product photography and Jack Daniel's brand marks, not bright UI colors.

### Quick Summary

Build in a Jack Daniel's-inspired heritage whiskey style: black canvas, white uppercase typography, huge custom-serif display headlines, flat editorial sections, real bottle/distillery imagery, direct CTAs, and minimal UI decoration. Use spacing as drama. Avoid rounded cards, colorful gradients, and SaaS-style shadows.

### Example Component Prompts

- Hero: "Create a full-width black hero with a centered Jack Daniel's-style product bottle, a massive uppercase serif headline in white, and one compact uppercase CTA below."
- Card: "Create a flat carousel slide for a whiskey product with bottle imagery, uppercase product name, one short descriptor line, and a white uppercase learn-more link."
- Navigation: "Create a fixed black header with centered logo, uppercase condensed nav links, locale selector, and direct shop/subscribe actions; collapse to menu-logo-shop icons on mobile."
- Button or badge: "Use a text-first uppercase CTA with no rounded filled container, crisp hover transition, and strong white-on-black contrast."

### Ready-to-Use Prompt

Design this page in the Jack Daniel's website language: black-and-white heritage whiskey branding, oversized uppercase custom-serif headlines, condensed uppercase navigation, real bottle and distillery photography, flat full-width sections, short imperative CTAs, large editorial spacing, no soft shadows, no rounded SaaS cards, and mobile navigation reduced to simple icon actions.

### Iteration Guide

1. Increase contrast before adding color.
2. Make headlines shorter and larger before adding explanatory copy.
3. Replace decorative UI surfaces with product or distillery imagery.
4. Keep corners square and shadows absent unless building a modal.

## Optional Appendix: Interaction Patterns

- Scroll behavior: Fixed header remains at top; carousels and embedded video create dynamic sections.
- Hover behavior: Use crisp `0.3s cubic-bezier(0, 0, 0.2, 1)` transitions for nav/CTA changes.
- Click behavior: Locale selector, product/cocktail carousel arrows, age gate, cookie preferences, and nav menu are click-driven.
- Animation tone: Restrained and functional, not playful; motion should support discovery without distracting from the brand.

## Optional Appendix: Content & Messaging Patterns

- Headline pattern: Short uppercase phrases, often declarative: "LET'S TALK COCKTAILS", "VISIT OUR DISTILLERY".
- CTA language: Direct imperatives: "EXPLORE OUR PRODUCTS", "BOOK A TOUR", "JOIN NOW", "LEARN MORE", "VIEW RECIPE".
- Trust signal pattern: Heritage date, Lynchburg Tennessee location, responsible drinking/legal copy.
- Voice and tone: Confident, historic, simple, and product-proud.

## Optional Appendix: Observed Pages

- `https://www.jackdaniels.com/`: Homepage after age verification and cookie handling; contributed global nav, hero/video, product and cocktail carousel patterns, distillery/story bands, footer, age gate, and responsive behavior.

## Optional Appendix: Evidence Notes

- Observed desktop viewport: `1440px` wide.
- Observed mobile viewport: `390px` wide.
- Observed fonts: `Amiko`, `jdSansCondensed`, `jdSerif`, and `kozuka-mincho-pr6n`.
- Observed desktop hero heading: `jdSerif`, `232px`, `700`, `191.2px` line-height, `-4px` letter-spacing.
- Observed mobile heading: `jdSerif`, `70.2px`, `700`, `63.18px` line-height.
- Observed spacing tokens switch between desktop and mobile values.
- Evidence gap: direct stylesheet-rule extraction was limited by CLI quoting, but computed styles, DOM snapshots, visible text, and responsive snapshots were inspected with `agent-browser`.
