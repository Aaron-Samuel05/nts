# NTS Website Design System

This file is the designer and developer handoff for the NTS Blenders and Distillers website. It documents the live visual system in this React + Vite + Tailwind project, based on `src/App.jsx`, `src/index.css`, `tailwind.config.js`, and the component files under `src/components`.

## 1. Brand Positioning

NTS should feel like a premium Indian alcobev manufacturer with heritage, scale, and product confidence. The design language should communicate four things clearly:

- Established distillery heritage since 1980.
- Goa-based manufacturing and contract bottling capability.
- Proprietary spirits portfolio across brandy, rum, whisky, vodka, gin, and beer.
- Premium product presence through bottle imagery, warm textures, and cinematic motion.

The interface should not feel like a generic corporate website or SaaS dashboard. It should feel tactile, editorial, product-led, and commercially credible for distributors, private-label partners, and trade collaborators.

## 2. Visual Direction

The core design direction is premium heritage distillery.

- Warm cream paper surfaces.
- Deep maroon and near-black structural fields.
- Coral-orange action accents.
- Gold premium detailing.
- Large serif editorial typography.
- Compact uppercase utility labels.
- Product bottles treated as hero objects.
- Full-bleed banners, carousels, overlays, and motion-led sections.

Use decoration carefully. Atmosphere should come from product photography, bottle renders, radial light, soft grain, shadows, and typography rather than generic ornamental graphics.

## 3. Source Files

Primary source of truth:

| Area | File |
| --- | --- |
| Page structure and core sections | `src/App.jsx` |
| Global tokens, CSS utilities, nav, hero, sections, animation | `src/index.css` |
| Tailwind color and font tokens | `tailwind.config.js` |
| Age verification | `src/components/AgeGate.jsx` |
| Full-bleed banner carousel | `src/components/BannerSection.jsx` |
| Trust/stat strip | `src/components/TrustStrip.jsx` |
| Category ticker | `src/components/CategoryMarquee.jsx` |
| Newsletter and bottle composition | `src/components/Newsletter.jsx` |
| Optional 3D bottle stage | `src/components/BottleStage3D.jsx` |
| Portfolio carousel pattern | `src/components/Portfolio.jsx` |

When documentation and code conflict, use the live implementation in `tailwind.config.js` and `src/index.css` first.

## 4. Color System

### Core Palette

| Token | Value | Role |
| --- | --- | --- |
| `cream` | `#F4ECDF` | Primary warm surface, cream text on dark fields, cards, inputs |
| `maroon` | `#4A151C` | Main brand color for headings, navigation, borders, dark buttons |
| `bg-deep` | `#150A09` | Deep cinematic hero and dark background |
| `bg-maroon` | `#2C0F14` | Modal depth, dark panels, trust strip |
| `coral-orange` | `#E9542E` | Primary CTA, hover, active state, alerts, ticker |
| `gold` | `#C9A15A` | Premium accent, age-gate border, highlights |
| `gold-soft` | `#E3C98F` | Softer premium border and highlight |
| `muted` | `#A8968A` | Secondary text and subdued metadata |

### CSS Variable Palette

```css
--bg: oklch(0.9369 0.0124 91.5);
--surface: oklch(0.9942 0.0069 88.6);
--fg: oklch(0.2170 0.0038 106.7);
--muted: oklch(0.5226 0.0152 82.4);
--border: oklch(0.8130 0.0196 83.1);
--accent: oklch(0.7389 0.1348 59.6);
--brick: oklch(0.405 0.13 32);
--terracotta: oklch(0.65 0.11 47);
--mustard: oklch(0.82 0.14 87);
--blue: oklch(0.53 0.13 247);
--strawberry: oklch(0.48 0.15 20);
--ink: oklch(0.16 0.01 95);
```

### Supporting Product Colors

| Token | Value | Usage |
| --- | --- | --- |
| `hot-pink` | `#F4A6C8` | Brandy/flavor accents |
| `deep-navy` | `#1B2E33` | Dark supporting panel/product tone |
| `tropical-yellow-green` | `#C9C948` | Flavored vodka/product accent |
| `berry-purple` | `#3A2246` | Product gradient accent |
| `copper-brown` | `#7A4A2E` | Whisky, rum, barrel, wood tones |
| `sage-green` | `#8FA66B` | Botanical/fresh product accent |
| `sky-blue` | `#5FB8D9` | Light supporting accent |

### Color Usage Ratio

Use a 60 / 30 / 10 model:

- 60 percent: cream and warm light surfaces.
- 30 percent: maroon, ink, bg-deep, bg-maroon.
- 10 percent: coral-orange, gold, product accents.

Do not let coral or gold dominate full sections unless the section is intentionally a ticker, highlight, or campaign moment.

## 5. Typography

The current Tailwind font roles are:

| Token | Stack | Role |
| --- | --- | --- |
| `font-serif` | `"Playfair Display", Georgia, serif` | Display headings, product names, hero typography |
| `font-sans` | `"Work Sans", system-ui, sans-serif` | Navigation, buttons, labels, body UI |
| `font-mono` | `"Space Mono", monospace` | Eyebrows, counters, technical labels, metadata |

### Typography Rules

- Use `Playfair Display` for major identity and product-led headlines.
- Use uppercase display type for hero, section, product, and modal titles.
- Use `Work Sans` for readable body text, controls, navigation, and forms.
- Use `Space Mono` sparingly for small uppercase labels, counters, and manufacturing details.
- Keep letter spacing positive or neutral in utility labels.
- Avoid negative tracking except where it already exists in the global `.display` style.
- Use short, declarative headings rather than long marketing paragraphs.

### Recommended Type Scale

| Role | Suggested Class Pattern |
| --- | --- |
| Hero H1 | `font-serif text-[clamp(2.2rem,4.8vw,4.4rem)] font-black uppercase leading-[0.96]` |
| Large display heading | `display` or `text-[clamp(48px,7vw,106px)]` |
| Section title | `font-serif text-3xl sm:text-4xl lg:text-[42px] font-black uppercase leading-[0.98]` |
| Card title | `font-serif text-2xl font-bold uppercase` |
| Body copy | `font-sans text-sm leading-relaxed` |
| Label / eyebrow | `font-mono text-[10px-12px] font-bold uppercase tracking-[0.18em-0.28em]` |
| CTA | `font-sans text-xs font-black uppercase tracking-widest` |

## 6. Layout System

### Containers

Use these container widths:

```jsx
className="container"
className="mx-auto max-w-[1280px]"
className="mx-auto max-w-[1400px]"
className="mx-auto max-w-[1440px]"
```

The custom `.container` utility is:

```css
.container {
  width: min(100% - 40px, 1400px);
  margin-inline: auto;
}
```

On small screens, the width tightens to `100% - 28px`.

### Spacing

Use mobile-first spacing:

| Section Type | Suggested Spacing |
| --- | --- |
| Utility strip | `py-2` to `py-6` |
| Normal content section | `py-16 sm:py-24` |
| Immersive section | `min-h-[660px]`, `min-h-screen`, or viewport-based |
| Footer | `py-20` or `pt-20 pb-8` |
| Section padding X | `px-4 sm:px-8 lg:px-12` |

### Grid Behavior

- Start single-column on mobile.
- Move to two-column layout at `lg` for story, facility, and content/image sections.
- Use stat grids as `grid-cols-2` on mobile and `md:grid-cols-4` or more on desktop.
- Avoid dense nested card grids unless showing repeated products or specs.

## 7. Surface System

### Primary Surfaces

| Surface | Treatment |
| --- | --- |
| Main page | `bg-bg` or cream-like warm background |
| Product cards | cream/white surfaces with maroon text |
| Dark hero | `#150A09`, image-backed, or deep maroon |
| Modal shell | `bg-surface`, rounded, shadowed |
| Age gate | deep maroon gradient with gold/coral accents |
| Footer | brick/ink gradient |

### Radius

The site uses polished rounded surfaces rather than sharp industrial boxes:

- Buttons: `rounded-full`.
- Inputs: `rounded-xl` or `rounded-md` in the age gate.
- Small panels: `rounded-xl`.
- Cards: `rounded-2xl` to `rounded-[28px]`.
- Premium image panels: `rounded-[2.5rem]`.
- Modals: `rounded-[28px]`.

Use large radius for premium product and content panels. Keep repeated small UI controls simpler.

### Borders

Use low-opacity brand borders:

```jsx
border-maroon/10
border-maroon/20
border-white/10
border-gold/25
border-gold/35
border-ink/10
```

Borders should support structure, not become decorative outlines everywhere.

## 8. Shadow and Depth

Depth is part of the product language.

### Global Shadow Tokens

```css
--premium-shadow: 0 28px 90px rgba(74, 21, 28, 0.16);
--premium-shadow-strong: 0 36px 110px rgba(0, 0, 0, 0.32);
```

### Usage

- Use strong shadows for modals, product cards, and bottle imagery.
- Use subtle shadows for nav and cream panels.
- Use drop shadows on bottle PNGs to ground them physically.
- Avoid generic heavy shadows on every section.

## 9. Texture and Atmosphere

The global page uses a fixed subtle grain overlay:

```css
body::after {
  opacity: 0.028;
  z-index: 9999;
  pointer-events: none;
}
```

This gives the UI a printed, premium texture. Any new full-screen overlay, modal, or canvas should be checked against this overlay so it remains readable.

Recommended atmospheric treatments:

- Radial gradients behind products.
- Warm cream overlays over photography.
- Dark image scrims for white text.
- Product bottle shadows.
- Gentle blur only for overlays and navigation.

Avoid:

- Neon gradients unrelated to bottle labels.
- Generic decorative blobs.
- Overly glassy UI everywhere.
- Stock-like atmospheric imagery that hides the actual product.

## 10. Components

### Announcement Marquee

Purpose: communicate manufacturing credibility and brand facts.

Style:

- Cream background.
- Maroon text.
- Small uppercase `font-sans`.
- Dot separators.
- Infinite horizontal marquee.

Use for short facts only, not paragraph content.

### Header and Menu

The header is a floating pill nav.

Style:

- Fixed position with left/right inset.
- Rounded-full pill.
- Backdrop blur.
- Cream translucent background on light sections.
- Ink translucent background in `.dark-zone`.
- Compact state after scroll.

Key classes:

```css
.site-nav
.site-nav.dark
.site-nav.compact
.menu-trigger
.menu-panel
.wordmark
```

Mobile behavior:

- Keep menu trigger visible.
- Hide the store/proposal CTA.
- Full-screen menu overlay with very large serif links.

### Hero

Purpose: first-viewport brand impact.

Style:

- Full-bleed product/facility image.
- Deep maroon/black scrim.
- Left-aligned copy.
- Large uppercase serif heading.
- Coral CTA.

Hero copy should be short and declarative. Use the product or brand image as the dominant signal.

### Trust Strip

Purpose: quick proof points.

Style:

- Dark maroon background.
- Cream text.
- Coral uppercase labels.
- Serif value text.
- Two-column mobile, four-column desktop.

Use for facts like establishment year, facility, certification, capacity.

### Category Marquee

Purpose: product and service category energy.

Style:

- Coral-orange full-width band.
- White uppercase text.
- Dot separators.
- Pauses on hover.
- Reduced motion disables animation.

### Banner Carousel

Purpose: full-bleed brand/product campaign display.

Style:

- Dark full-bleed section.
- Image slideshow with subtle scale.
- Top/bottom black scrim.
- Circular chevron controls with lucide icons.
- Bottom pill indicator with slide counter.

Images must be high-quality, product-visible, and readable under the controls.

### Product / Spirits Cards

Purpose: product lineup discovery.

Style:

- Large rounded cards.
- Product bottle centered.
- Category color backgrounds.
- Product name as large serif uppercase.
- Mono label at top.
- Hover lift, bottle scale, and "View profile" affordance.

Product cards should feel tactile and collectible, not like flat catalog rows.

### Product Modal

Purpose: quick product profile.

Style:

- Black translucent backdrop with blur.
- Rounded cream shell.
- Left/top product media panel with dark gradient.
- Right/bottom product details.
- Rounded close button.
- ABV/style spec boxes.
- Dark CTA that turns accent on hover.

Keep modal content concise: category, style, description, key specs, inquiry action.

### Newsletter Section

Purpose: B2B updates and partner notes.

Style:

- Cream background.
- Radial gold/coral background glow.
- Bottle PNGs framing left and right.
- Centered serif title.
- White translucent form shell.
- Maroon input text and button.

On mobile, bottle positions should not obscure the form or headline.

### Footer

Purpose: contact, proposal conversion, navigation.

Style:

- Dark brick/ink gradient.
- Cream text.
- Large display heading.
- Underlined email signup in current footer.
- Small link groups.
- Legal row separated by subtle cream border.

Footer links should be short, direct, and trade-oriented.

### Age Gate

Purpose: legal entry requirement.

Style:

- Full-screen deep maroon gradient.
- Centered rounded modal.
- Gold border and coral/gold top strip.
- NTS logo in cream circular badge.
- Serif age title.
- Date selects in cream fields.
- Coral error message.
- Rounded coral primary button.

Behavior:

- Uses localStorage key `nts_distillers_age_verified`.
- Minimum age is 18.
- Adds `body.age-gate-open` while active.
- Must remain accessible with `role="dialog"` and `aria-modal="true"`.

## 11. Buttons and Links

### Primary CTA

Use coral-orange or ink depending on section contrast:

```jsx
className="rounded-full bg-coral-orange px-8 py-3.5 font-sans text-xs font-black uppercase tracking-widest text-white"
```

or:

```jsx
className="rounded-full bg-ink px-8 py-3.5 font-sans text-xs font-black uppercase tracking-widest text-surface"
```

### Hover Behavior

- Lift by `translateY(-2px)` or `translateY(-3px)`.
- Swap to accent or cream when appropriate.
- Keep transition around `200ms` to `350ms`.
- Use the shared `--ease` where possible.

### Icon Buttons

Use lucide-react icons for common UI controls:

- Menu.
- Chevron previous/next.
- Close.
- Search.
- Contact icons.

Always include `aria-label` for icon-only controls.

## 12. Forms

Forms should feel simple, premium, and readable.

Recommended field style:

```jsx
className="rounded-xl border border-maroon/12 bg-white/88 px-4 text-maroon outline-none focus:border-maroon"
```

Rules:

- Use `font-sans` for inputs and buttons.
- Use `font-mono` uppercase labels for compact fields.
- Keep mobile inputs at 16px to avoid iOS zoom.
- Use coral for validation errors and active highlights.
- Keep newsletter and inquiry forms compact.

## 13. Motion System

### Easing

Primary easing:

```css
--ease: cubic-bezier(.16,1,.3,1);
```

Framer Motion sections often use:

```js
[0.22, 1, 0.36, 1]
```

### Durations

| Motion | Duration |
| --- | --- |
| Button hover | `200ms` to `300ms` |
| Nav transition | `300ms` to `350ms` |
| Card hover | `350ms` to `500ms` |
| Modal entrance | `420ms` to `450ms` |
| Reveal animation | `700ms` to `900ms` |
| Banner crossfade | `1000ms` |
| Banner image scale | `4000ms` |

### Motion Patterns

- Reveal on scroll with opacity and translateY.
- Horizontal sticky product scroll on desktop.
- Swipe/drag carousel for product portfolio.
- Auto-playing carousel with pause on hover.
- Bottle float and parallax framing in newsletter.
- Hover lift and product scale on product cards.

### Reduced Motion

The global CSS includes a reduced-motion block. Continue to support it for:

- Infinite marquees.
- Carousel autoplay.
- JavaScript-driven bottle movement.
- Hover transforms that are not necessary for comprehension.

## 14. 3D and Product Imagery

The design uses two product depth systems:

1. PNG bottle compositions with CSS transforms, drop shadows, and radial highlights.
2. Optional Three.js bottle stage in `BottleStage3D.jsx`.

### Bottle Image Rules

- Use transparent-background bottle PNGs when possible.
- Keep bottles large enough to be the focus.
- Add realistic drop shadows.
- Avoid cropping bottle labels unless intentionally creating a close-up.
- Make sure the label is legible on desktop and mobile.

### Three.js Stage Rules

The 3D stage uses:

- `@react-three/fiber`.
- `@react-three/drei`.
- OBJ/MTL loaders.
- `OrbitControls`.
- Studio environment.
- WebGL fallback image.

When adding models:

- Provide both `.obj` and `.mtl` paths.
- Provide a fallback image.
- Test model orientation and scale.
- Keep zoom disabled for controlled framing.

## 15. Responsive Rules

### Breakpoints

Follow Tailwind defaults and current custom CSS behavior:

| Width | Behavior |
| --- | --- |
| `< 520px` | Tighter containers, single-column stats, smaller carousel cards |
| `< 820px` | Mobile nav layout, horizontal scroll cards, stacked lifestyle layout |
| `md` | Better card/form layout, larger media |
| `lg` | Two-column editorial layouts and fuller product staging |

### Mobile Priorities

- Hero copy must fit without overlapping the product image.
- Header should not crowd the top marquee.
- Product cards should be scrollable and stable.
- Large display text should wrap cleanly.
- CTA buttons should be easy to tap.
- Bottle decorations must not block forms or labels.

## 16. Accessibility

Current accessibility patterns to preserve:

- Skip link to `#main`.
- Age gate uses `role="dialog"` and `aria-modal`.
- Product modal uses `role="dialog"` and `aria-modal`.
- Icon buttons have `aria-label`.
- Carousel controls have `aria-label`.
- Form inputs have labels or `aria-label`.
- Reduced motion support exists in CSS and some components.

Required rules for new UI:

- Keep interactive elements keyboard reachable.
- Use visible focus states.
- Do not hide essential information behind hover only.
- Maintain contrast on maroon, cream, coral, and image-backed sections.
- Use meaningful alt text for product and facility images.
- Decorative bottle images should use empty alt text plus `aria-hidden="true"`.

## 17. Content Voice

The voice is premium, direct, and trade-aware.

Use:

- "Contract bottling and blending"
- "Goa manufacturing facility"
- "Distribution legacy"
- "Proprietary labels"
- "Partner proposals"
- "Portfolio profile"
- "Quality standard"
- "Industrial scale"

Avoid:

- Generic startup language.
- Overly playful copy.
- Long unstructured paragraphs.
- Claims without proof or context.
- Consumer-only party language when the section is B2B.

## 18. Do and Do Not

### Do

- Use cream, maroon, coral, and gold as the main system.
- Make product bottles prominent.
- Use large serif headings for emotional impact.
- Use mono labels for credibility and structure.
- Add motion where it supports product discovery.
- Use real product/facility imagery.
- Keep sections full-width and editorial.

### Do Not

- Do not replace the system with black-and-white whiskey styling from the old `DESIGN.md` reference.
- Do not introduce unrelated neon palettes.
- Do not make every section a floating card.
- Do not use generic SaaS layouts for brand storytelling.
- Do not rely on hover-only behavior for key content.
- Do not add decorative gradients that compete with product labels.
- Do not let large type overlap controls or images on mobile.

## 19. Implementation Checklist

Before shipping a new section:

- Uses the core palette and correct font roles.
- Has a clear product, facility, heritage, or B2B purpose.
- Uses `max-w-[1280px]`, `max-w-[1400px]`, or `.container` consistently.
- Works at mobile, tablet, and desktop widths.
- Has accessible labels for buttons and form controls.
- Respects reduced motion.
- Uses real imagery or product assets where visual impact matters.
- Keeps text short enough to scan.
- Avoids conflicting one-off colors and untracked styles.

## 20. Quick Prompt for Future Design Work

Design in the NTS Blenders and Distillers language: warm cream paper surfaces, deep maroon structure, coral-orange CTAs, gold premium accents, large uppercase Playfair Display headings, compact Work Sans and Space Mono labels, product bottle imagery as the hero object, rounded premium cards, cinematic dark sections, subtle grain texture, responsive mobile-first layouts, and purposeful motion for carousels, reveals, and bottle focus.
