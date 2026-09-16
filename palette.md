# NTS Website Color Palette & Design Usage

Source inspected: `tailwind.config.js`, `src/index.css`, `index.html`, and authored files under `src/`. Build output, `node_modules`, `.git`, caches, logs, and generated files were excluded.

## Executive Summary

The site uses a warm premium distillery palette. The visual direction is not a generic black-and-white whiskey site; it is closer to a heritage liquor brand with cream paper surfaces, deep maroon structure, coral-orange CTAs, and gold premium detailing.

### 60 / 30 / 10 Usage

| Ratio | Role | Main Colors | Practical Usage |
|---:|---|---|---|
| 60% | Primary canvas / base | `#F4ECDF`, `oklch(0.9369 0.0124 91.5)`, `oklch(0.9942 0.0069 88.6)` | Page background, light sections, cards, form fields, text on dark panels |
| 30% | Brand structure / contrast | `#4A151C`, `#150A09`, `#2C0F14`, `oklch(0.16 0.01 95)` | Headings, navigation, overlays, footer, modal depth, dark hero areas |
| 10% | Accent / action / premium detail | `#E9542E`, `#C9A15A`, `#E3C98F`, `oklch(0.7389 0.1348 59.6)` | CTA buttons, active states, labels, timeline markers, decorative highlights |

Note: code-reference counts are not the same as visual area. In implementation references, maroon and accent colors appear frequently because text, borders, hover states, and CTAs are repeated across many components. Visually, cream/dark surfaces still dominate the page.

## Primary, Secondary, Tertiary Palette

### Primary Colors

| Token | Hex / Value | Role |
|---|---:|---|
| `cream` | `#F4ECDF` | Main warm light surface, cards, inputs, cream text on dark backgrounds |
| `maroon` | `#4A151C` | Main brand color for headings, text, buttons, borders |
| `bg-deep` | `#150A09` | Deep dark hero/background color |
| `bg-maroon` | `#2C0F14` | Dark maroon panels, age gate, modal depth |

### Secondary Colors

| Token | Hex / Value | Role |
|---|---:|---|
| `coral-orange` | `#E9542E` | CTA color, active labels, hover states, important UI emphasis |
| `gold` | `#C9A15A` | Premium accent, decorative borders, highlights |
| `gold-soft` | `#E3C98F` | Softer premium detail and subtle borders |
| `muted` | `#A8968A` | Secondary text and subdued metadata |

### Tertiary / Product Accent Colors

| Token | Hex | Role |
|---|---:|---|
| `hot-pink` | `#F4A6C8` | Product/flavor accent |
| `deep-navy` | `#1B2E33` | Dark supporting panel/product tone |
| `tropical-yellow-green` | `#C9C948` | Flavored product accent |
| `berry-purple` | `#3A2246` | Product gradient accent |
| `copper-brown` | `#7A4A2E` | Whisky, rum, barrel, wood tone |
| `sage-green` | `#8FA66B` | Botanical/fresh product accent |
| `sky-blue` | `#5FB8D9` | Light supporting accent |

## Implementation Frequency

Approximate authored-source references after excluding dependencies and build output:

| Color / Token | Value | References |
|---|---:|---:|
| `cream` | `#F4ECDF` | 102 |
| `maroon` | `#4A151C` | 91 |
| `coral-orange` | `#E9542E` | 64 |
| `surface` CSS var | `oklch(0.9942 0.0069 88.6)` | 35 |
| `ink` CSS var | `oklch(0.16 0.01 95)` | 27 |
| `bg-maroon` | `#2C0F14` | 16 |
| `gold` | `#C9A15A` | 16 |
| `bg-deep` | `#150A09` | 10 |
| `gold-soft` | `#E3C98F` | 8 |
| `accent` CSS var | `oklch(0.7389 0.1348 59.6)` | 8 |
| `muted` | `#A8968A` / `oklch(0.5226 0.0152 82.4)` | 7 |
| Product/support accents | Multiple | 20 combined |

Grouped implementation references:

| Group | Approx. Reference Share | Notes |
|---|---:|---|
| Primary canvas / surfaces | 33.3% | Cream and light-surface variables |
| Brand structure / typography | 35.7% | Maroon, dark backgrounds, ink, foreground |
| Accent / CTA / decorative | 24.3% | Coral, gold, soft gold, accent variables |
| Muted and borders | 1.9% | Subtle supporting text and separators |
| Product/support accents | 4.7% | Mostly used in product/flavor contexts |

## Design Direction Used

### Primary Design Style

Premium heritage distillery branding.

- Warm cream backgrounds.
- Deep maroon typography and UI structure.
- Large editorial spacing.
- Uppercase brand labels.
- Product-led visual hierarchy.
- Dark, cinematic hero and modal surfaces.

### Secondary Design Style

Modern ecommerce / portfolio interaction layer.

- Product inquiry cart drawer.
- CTAs and hover states in coral-orange.
- Cards, forms, modals, and sticky/overlay UI.
- Structured product sections and reusable components.

### Tertiary Design Style

Cinematic 3D product showcase.

- Bottle-focused visuals.
- Drop shadows and radial lighting.
- Gold/coral highlight glows.
- Product-specific color accents for spirit categories.

## Core Tailwind Tokens

```js
colors: {
  cream: '#F4ECDF',
  maroon: '#4A151C',
  'bg-deep': '#150A09',
  'bg-maroon': '#2C0F14',
  gold: '#C9A15A',
  'gold-soft': '#E3C98F',
  muted: '#A8968A',
  'coral-orange': '#E9542E',
  'hot-pink': '#F4A6C8',
  'deep-navy': '#1B2E33',
  'tropical-yellow-green': '#C9C948',
  'berry-purple': '#3A2246',
  'copper-brown': '#7A4A2E',
  'sage-green': '#8FA66B',
  'sky-blue': '#5FB8D9',
}
```

## CSS Variable Palette

Defined in `src/index.css`:

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

--bg-deep: #150a09;
--bg-maroon: #2c0f14;
--maroon: #4a151c;
--gold: #c9a15a;
--gold-soft: #e3c98f;
--cream: #f4ecdf;
```

## Color Usage Rules

### Use `cream` / light surfaces for:

- Main page backgrounds.
- Form fields and drawer surfaces.
- Product cards.
- Text placed over dark maroon/deep backgrounds.

### Use `maroon` for:

- Main headings on cream sections.
- Body text on light backgrounds.
- Primary dark buttons where coral is not needed.
- Borders and dividers at low opacity.

### Use `coral-orange` for:

- Primary CTA buttons.
- Active labels.
- Timeline markers.
- Error or alert emphasis.
- Hover states that need stronger action feedback.

### Use `gold` / `gold-soft` for:

- Premium details.
- Decorative lines.
- Age-gate border accents.
- Subtle highlights in dark sections.

### Use product accent colors only for:

- Flavor/product distinction.
- Decorative gradients.
- Category-specific supporting visuals.

They should not replace the main brand palette.

## Recommended Future Cleanup

- Keep `cream`, `maroon`, `bg-deep`, `bg-maroon`, `coral-orange`, `gold`, and `gold-soft` as the core system.
- Reduce one-off raw hex values where possible and convert them into named Tailwind tokens.
- Avoid introducing unrelated neon colors unless they are tied to a specific product label.
- Keep the 60/30/10 visual rule: cream/light surfaces first, maroon/dark structure second, coral/gold accents last.
