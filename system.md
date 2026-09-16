# NTS Website Design System

This document explains the design system used across the NTS Blenders and Distillers website. It covers the visual identity, UI color system, typography, layout rules, animation behavior, pseudo-3D product effects, interaction patterns, component styling, and implementation guidance for future changes.

The project is a React + Vite single-page website styled with Tailwind CSS and custom CSS in `src/index.css`. The visual language is built around a premium vintage distillery identity: warm cream paper surfaces, deep maroon brand structure, coral-orange accents, serif-led editorial typography, and product-focused motion.

## 1. Design Direction

The website should feel like a premium alcobev manufacturer and contract bottling portfolio, not a generic SaaS page. The current design mixes:

- Vintage distillery and old bar influence.
- Western saloon-style display typography.
- Warm paper and cream backgrounds.
- Deep maroon, terracotta, gold, and product-flavor accents.
- Large bottle imagery with shadows, hover movement, and scroll-reactive motion.
- Dense B2B manufacturing information presented with polished consumer-brand visuals.

The interface should stay confident, tactile, and product-led. Every major section should either communicate brand heritage, manufacturing capability, product range, or partnership/contact intent.

## 2. Technical Stack

Primary implementation files:

- `src/App.jsx`: main page structure, content data, timeline behavior, kinetic rows, modal state, contact form, and global sections.
- `src/index.css`: global CSS variables, base typography, body styling, scrollbars, utilities, custom animations, age gate styling, and responsive overrides.
- `tailwind.config.js`: Tailwind tokens for colors, font families, marquee keyframes, and animation utilities.
- `src/components/AgeGate.jsx`: age verification modal.
- `src/components/BottleGallery.jsx`: interactive product showcase with mouse-based bottle tilt.
- `src/components/ProductCard.jsx`: product card pattern.
- `src/components/CartDrawer.jsx`: inquiry drawer.
- `src/components/Marquee.jsx`: scrolling announcement bar.

Core libraries:

- React 18.
- Vite.
- Tailwind CSS.
- Anime.js for HUD reveal animation in the bottle gallery.
- Lucide React for icons.

## 3. Color System

### Core Brand Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `cream` | `#F4ECDF` | Main light background, cream text, light cards, buttons |
| `maroon` | `#4A151C` | Primary brand color, headings, buttons, nav, borders |
| `bg-deep` | `#150A09` | Deep dark hero/background color |
| `bg-maroon` | `#2C0F14` | Dark maroon panels and modal depths |
| `gold` | `#C9A15A` | Premium accent, selection highlight, decorative details |
| `gold-soft` | `#E3C98F` | Softer gold accent |
| `muted` | `#A8968A` | Muted copy, subtle border tone, secondary text |
| `coral-orange` | `#E9542E` | Primary CTA accent, hover states, active labels |

### Supporting Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `hot-pink` | `#F4A6C8` | Product/flavor accents, playful premium contrast |
| `deep-navy` | `#1B2E33` | Dark secondary panels and glass-dark utility |
| `tropical-yellow-green` | `#C9C948` | Flavored vodka/product accents |
| `berry-purple` | `#3A2246` | Product gradient accent |
| `copper-brown` | `#7A4A2E` | Whisky, rum, wood, barrel tones |
| `sage-green` | `#8FA66B` | Fresh botanical/product accent |
| `sky-blue` | `#5FB8D9` | Light supporting accent |

### Inline Section Colors

These colors appear directly in components or CSS and should be treated as section-specific tokens:

| Color | Hex | Current Usage |
| --- | --- | --- |
| Light cream background | `#F3EEE3` | Kinetic section, page body in `index.html` |
| Scrollbar dark maroon | `#5A1F1B` | Custom scrollbar thumb |
| Contact pink | `#ff7aa3` | B2B contact section background |
| Footer navy | `#18202d` | Footer background |
| Product amber | `#FDBA74` | Whisky product gradient |
| Product rose | `#FBCFE8` | Brandy product gradient |
| Product dark brown | `#3A2010` | Rum/product gradient depth |
| Product mint | `#A8E6CF` | Sugar rum/product gradient |
| Product deep green | `#1A6B5C` | Sugar rum/product gradient |
| Vodka green | `#8da946` | Kiwi vodka theme |
| Vodka red | `#b0342b` | Apple vodka theme |
| Vodka orange | `#d97706` | Orange vodka theme |

### Color Usage Rules

- Use `cream` and light cream backgrounds for most readable surfaces.
- Use `maroon` as the default identity color for headings, buttons, labels, and borders.
- Use `coral-orange` only for CTAs, highlights, hover states, error accents, active states, and small status labels.
- Use dark backgrounds (`bg-deep`, `bg-maroon`) for immersive, premium, heritage, or modal experiences.
- Use product gradient colors only where the product image, flavor, or portfolio category is the focus.
- Avoid making new sections dominated by a single new color family. New colors should support the existing maroon/cream/coral system.
- Use opacity-based borders such as `border-maroon/10`, `border-white/10`, and `border-cream/15` for subtle separation.

## 4. Typography System

The site uses Google Fonts loaded in `index.html`.

### Font Roles

| Font | Tailwind Token | Role |
| --- | --- | --- |
| Rye | `font-rye` | Hero titles, major section headlines, kinetic text, vintage display moments |
| Playfair Display | `font-serif` | Card titles, product names, section subheadings, elegant headings |
| Lora | `font-lora` / body base | Body copy, narrative descriptions, readable editorial text |
| Work Sans | `font-sans` | Navigation, buttons, labels, forms, utility UI |
| Space Mono | `font-mono` | Technical labels, counters, metadata, compliance text |
| Gasoek One | `font-gasoek` | Heavy display option, currently configured for special use |
| Plus Jakarta Sans | `font-jakarta` | Modern geometric footer wordmark and special modern display use |
| Bebas Neue | direct CSS in age gate | Age gate headline |

### Typography Rules

- Display headings should feel branded and dramatic. Use `Rye` for major site identity moments.
- Do not overuse `Rye` for small UI controls; it becomes hard to read.
- Use `Playfair Display` when a heading needs premium elegance without the full western display style.
- Use `Lora` for paragraphs and narrative copy.
- Use `Work Sans` for anything interactive or operational: buttons, nav, inputs, labels, drawer text, and small utility copy.
- Use uppercase, bold, and wide letter spacing for labels and badges.
- Avoid negative letter spacing. The current system uses normal or positive tracking.
- Keep body text compact and legible, usually `text-xs` to `text-sm` in dense UI areas and larger where the page is editorial.

## 5. Layout System

### Page Width

The main layout repeatedly uses a maximum content width of `1280px`:

```jsx
className="max-w-[1280px] mx-auto ..."
```

Use this as the default page container width for new full-width sections.

### Section Spacing

Common vertical rhythm:

- Compact utility bars: `py-3`.
- Normal sections: `py-16`.
- Large sections: `py-24`.
- Hero or immersive sections: viewport or large minimum height.

Responsive pattern:

```jsx
className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12"
```

### Grid and Responsive Behavior

The site uses Tailwind responsive grids and flex layouts:

- Mobile first.
- Expand to 2 columns at `md` or custom breakpoints.
- Large desktop sections often use `lg:grid-cols-*`.
- Header uses `grid-cols-[auto_1fr_auto]`.
- Product/facility sections use responsive grid cards.

New layouts should keep mobile readable first, then use larger breakpoints for dramatic composition.

## 6. Surface and Border Radius System

The project uses rounded, polished product surfaces:

- Small badges: `rounded-full`.
- Inputs: `rounded-xl`.
- Product cards: `rounded-3xl`.
- Product image wells: `rounded-2xl`.
- Bottle gallery shell: `rounded-2xl sm:rounded-[2rem]`.
- Product modal: `rounded-[1.5rem] sm:rounded-[2rem]`.
- Age gate modal: `border-radius: 14px`, reduced to `10px` on mobile.

Use large radius for premium product cards and modals, but keep dense content panels tidy. Avoid nesting too many cards inside cards unless the nested element is a repeated item or a form control group.

## 7. Texture, Atmosphere, and Visual Treatment

### Grain Overlay

`src/index.css` adds a subtle fixed procedural noise overlay on the body:

```css
body::after {
  opacity: 0.028;
  background-image: url("data:image/svg+xml,...feTurbulence...");
}
```

This gives the whole site a printed, tactile finish. Any new full-screen overlay must account for this `z-index: 9999` grain layer. The grain is pointer-events none and should not block interactions.

### Dashed Industrial Dividers

Utility classes:

- `.divider-dashed-r`
- `.divider-dashed-b`

These use low-opacity cream dashed borders and fit manufacturing, specification, and machinery sections.

### Glass Effects

Utility classes:

- `.glass`: light translucent panel with blur.
- `.glass-dark`: dark translucent panel with blur.

Use these sparingly for overlays, sticky navigation, modal-adjacent panels, or content placed on rich imagery.

## 8. Animation System

The design uses motion to make the product portfolio feel premium and tactile. Motion should be smooth, purposeful, and tied to product focus or navigation state.

### Tailwind Keyframe Animations

Defined in `tailwind.config.js`:

- `animate-marquee`: horizontal movement from `translateX(0%)` to `translateX(-50%)`.
- `animate-marquee-reverse`: horizontal movement from `translateX(-50%)` to `translateX(0%)`.

These are used by `Marquee.jsx`, which duplicates items several times for seamless looping.

### CSS Animations

Defined in `src/index.css`:

- `fadeIn`: opacity reveal for modal backdrops.
- `scaleIn`: modal content entrance using opacity, slight scale, and vertical lift.
- `heroRise`: hero content entrance with rise and scale.
- `softReveal`: general content reveal.
- `backgroundDrift`: slow hero background scale and vertical drift.

Utility classes:

- `.animate-fadeIn`
- `.animate-scaleIn`
- `.animate-heroRise`
- `.hero-bg`
- `.reveal-soft`
- `.delay-100`
- `.delay-200`
- `.delay-300`

Primary easing:

```css
cubic-bezier(0.16, 1, 0.3, 1)
```

This easing gives the site a polished, decelerated finish. Use it for most reveal and UI transitions.

### Card Transition Utility

```css
.transition-card {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

Used in `ProductCard.jsx` for shadow, scale, and hover-state polish.

### Reduced Motion

The project supports `prefers-reduced-motion: reduce` globally and inside the age gate. Reduced motion rules shrink animation duration and stop infinite movement where possible.

When adding animation:

- Check `prefers-reduced-motion` for JavaScript-driven effects.
- Avoid required information being revealed only through animation.
- Keep hover and active feedback intact but subtle.

## 9. Pseudo-3D and Product Effects

The site does not use a full WebGL or Three.js scene. Its 3D feel comes from layered 2D product images, CSS transforms, perspective-like tilt, shadows, and scroll-driven scale/rotation.

### Bottle Gallery 3D Feel

`BottleGallery.jsx` creates product depth with:

- Large transparent-background bottle PNGs.
- `drop-shadow` for physical grounding.
- Mouse-tracked `translate3d` movement.
- `rotateY` tilt based on cursor X position.
- Hover `scale-[1.03]`.
- A white rounded showcase container that isolates the product like a premium catalog display.

Current transform:

```jsx
transform: `translate3d(${tiltX}px, ${tiltY}px, 0) rotateY(${tiltX * 0.8}deg)`
```

Motion limits:

- X tilt offset: `mousePos.x * 10`.
- Y tilt offset: `mousePos.y * -6`.
- Motion disabled when reduced motion is enabled.

### Product Card Image Effects

`ProductCard.jsx` uses:

- Gradient image wells.
- Blurred circular light highlight.
- Bottle image `drop-shadow`.
- Hover scale to `1.10`.
- Hover rotation to `rotate-3`.
- Card hover shadow lift.

This creates a shelf-like product card effect without heavy rendering.

### Kinetic Row Bottle Pop

`KineticRow` in `App.jsx` creates scroll-reactive product display rows:

- Text moves horizontally based on scroll position.
- Text scales and changes opacity as it reaches viewport center.
- Color shifts from maroon to coral orange when the row is in focus.
- Bottle image scales up dramatically as the row centers.
- Bottle rotates and floats vertically based on scroll progress.

Important behavior:

- Progress is smoothed with a lerp loop.
- `centerFocus` controls text opacity, scale, color, bottle scale, and bottle opacity.
- Bottle scale can reach a strong visual pop, so surrounding rows need enough vertical spacing.

### Shadows

Common shadow styles:

- Product images: `drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)]`.
- Kinetic bottles: `drop-shadow-[0_35px_50px_rgba(0,0,0,0.55)]`.
- Cards: `shadow-sm`, `hover:shadow-xl`, `shadow-2xl` for modals.
- Buttons: `shadow-md` or `shadow-lg`.

Use larger, darker shadows only on bottles, modals, and prominent CTAs.

## 10. Component System

### Header

The header is sticky and changes style after scrolling:

- Initial state: cream-transparent or transparent on larger screens.
- Scrolled state: `bg-cream/95`, `backdrop-blur-md`, `shadow-md`, tighter vertical padding.
- Navigation uses maroon text and coral hover states.

Header changes should preserve:

- Sticky positioning.
- Mobile readability.
- Logo visibility against both transparent and cream backgrounds.
- Smooth `duration-300` transitions.

### Marquee

`Marquee.jsx` is used for announcement strips.

Design:

- Full-width.
- `whitespace-nowrap`.
- Uppercase Work Sans.
- Border top and bottom.
- Dot separator between repeated items.
- Animation duration passed through `speed`.

Use marquee strips for brand facts, manufacturing stats, or repeated identity messages, not dense paragraph content.

### Age Gate

`AgeGate.jsx` is a fixed full-screen modal for legal age verification.

Visual structure:

- Cream page backdrop.
- Deep maroon radial-gradient modal.
- Centered logo and age form.
- Cream input boxes with maroon text.
- Coral error and hover states.
- Fixed circular NTS seal at lower left.
- Legal footer with subdued cream text.

Behavior:

- Uses localStorage key `nts_distillers_age_verified`.
- Minimum age is 18.
- Locks body scroll using `body.age-gate-open`.
- Date inputs auto-advance from day to month to year.

Age gate design should remain formal and legible. Do not add decorative motion that makes age verification slower.

### Bottle Gallery

`BottleGallery.jsx` is the primary product showcase.

Visual structure:

- White rounded showcase shell.
- Bottle image on left.
- Product HUD/details on right.
- Circular arrow buttons.
- Pagination dots.
- Loading overlay with spinner and mono uppercase label.

Motion:

- Anime.js animates `.animate-hud` elements when active product changes.
- Mouse movement creates subtle bottle tilt.
- Hover scale on the bottle invites quick view.

New gallery items need:

- Stable `id`.
- `name`.
- `type`.
- `dosage`.
- `description`.
- `image` or `removedBgImage`.

### Product Cards

`ProductCard.jsx` is used for compact product browsing.

Structure:

- White rounded card.
- Badge at top-left.
- Price badge at top-right.
- Gradient product image area.
- Product metadata line.
- Product title.
- Short description.
- Add to inquiry button.
- Icon-only quick view button using Lucide `Search`.

Interaction:

- Whole image/title region can open quick view.
- CTA adds to inquiry.
- Search icon opens details.
- Hover changes card shadow, product scale, and title color.

### Cart Drawer

`CartDrawer.jsx` is a right-side B2B inquiry drawer.

Structure:

- Full-screen overlay with maroon translucent backdrop and blur.
- Right fixed panel.
- Header with title and close button.
- Coral-orange manufacturing strip.
- Selected products list.
- Partnership details form.
- Footer contact strip.

Behavior:

- Opens with opacity transition on overlay.
- Drawer slides in with `translate-x`.
- Form creates a `mailto:` inquiry.

Drawer styling should remain operational and compact. It is a B2B tool, not a marketing panel.

### Product Detail Modal

The modal in `App.jsx` uses:

- Full-screen black translucent backdrop with blur.
- Cream modal shell.
- Product gradient/image panel.
- White details panel.
- Rounded close button.
- Coral primary CTA.
- Maroon secondary button.

Use this pattern for any future detailed object view: strong image left/top, structured specs right/bottom.

## 11. Forms and Inputs

Form fields use:

- White or cream surfaces.
- Maroon text.
- `border-maroon/20`.
- Rounded corners (`rounded-xl`).
- Focus ring or focus border in maroon/coral.
- Work Sans labels with uppercase tracking.
- Mobile-safe font size for inputs.

Mobile input rule in `src/index.css`:

```css
input,
textarea,
select {
  font-size: 16px;
}
```

This avoids iOS zoom behavior and should be preserved.

## 12. Icon System

Icons come from `lucide-react`.

Current icons:

- `Instagram`
- `Phone`
- `Mail`
- `Search`
- `ChevronLeft`
- `ChevronRight`

Rules:

- Use Lucide icons for UI actions when available.
- Keep icon sizes compact: usually `14px` to `20px`.
- Pair icons with text for contact and primary actions.
- Use icon-only buttons only for familiar actions such as search, previous, next, and close. Provide `aria-label`.

## 13. Accessibility and Interaction Rules

Current accessibility patterns:

- Age gate uses `role="dialog"` and `aria-modal="true"`.
- Date inputs have `aria-label`.
- Drawer and modal close buttons have `aria-label`.
- Gallery arrow buttons have `aria-label`.
- Product quick view icon has `aria-label`.
- Reduced motion is respected globally and in key JavaScript effects.

Future UI should preserve:

- Keyboard reachable buttons and links.
- Visible focus states for inputs and buttons.
- Meaningful alt text for product images.
- No required information hidden behind hover-only interactions.
- Sufficient contrast between maroon/cream/coral combinations.

## 14. Responsive Design Rules

The system is mobile-first.

Important responsive patterns:

- Use `px-4` on mobile and increase at `sm` / `lg`.
- Large headings must use responsive sizes.
- Hero section has custom mobile behavior in `src/index.css`.
- Product gallery stacks vertically on mobile and becomes side-by-side from `md`.
- Modal switches from column to row at `md`.
- Footer grid moves from one column to multiple columns at larger breakpoints.

Mobile considerations:

- Avoid fixed-width text blocks that exceed viewport width.
- Use `overflow-wrap: anywhere` for large `h1` and `h2` on mobile.
- Keep CTA buttons full-width where space is tight.
- Preserve `section { scroll-margin-top: 76px; }` for anchor navigation.

## 15. Content Voice

The copy style is:

- Premium but direct.
- Manufacturing capable.
- Heritage-aware.
- B2B credible.
- Product-specific when describing spirits.

Good language:

- "Contract bottling and blending partnership"
- "Manufacturing tie-up proposals"
- "Goa manufacturing facility"
- "Capacity specs"
- "Portfolio"
- "Profile"
- "Tasting notes"
- "Compliance"

Avoid:

- Generic startup language.
- Overly casual jokes.
- Marketing filler that does not describe product, facility, capacity, or partnership value.

## 16. Implementation Guidelines

### Adding a New Section

Use this checklist:

- Start with a full-width semantic `section`.
- Use `max-w-[1280px] mx-auto`.
- Pick a background from the core palette.
- Use Rye only for major display headings.
- Use Work Sans for labels/buttons.
- Use maroon as the default text color on cream backgrounds.
- Use coral orange for the primary CTA or active detail only.
- Include responsive spacing: `py-16 sm:py-24`.
- Respect reduced motion for scroll or mouse effects.

### Adding a New Product Card

Each product should include:

- `id`
- `name`
- `type`
- `dosage` or product category label
- `image` and ideally `removedBgImage`
- `colorGradient`
- `badgeText`
- `description`

Product images should have transparent or clean backgrounds when possible so the pseudo-3D effects work properly.

### Adding New Motion

Use motion only when it supports:

- Product focus.
- Section reveal.
- Navigation state.
- Modal/drawer entry.
- Tactile hover feedback.

Recommended defaults:

- Duration: `180ms` for simple hover.
- Duration: `300ms` for buttons and nav transitions.
- Duration: `420ms` for content reveals.
- Duration: `800ms` to `900ms` for hero or major reveal.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

Always add a reduced-motion fallback for JavaScript-driven motion.

## 17. Design System Source of Truth

Use these files as the source of truth:

- Color and font tokens: `tailwind.config.js`.
- Global variables and base styles: `src/index.css`.
- Color summary: `palette.md`.
- Project context and behavior notes: `context.md`.
- This full design-system reference: `system.md`.

When values conflict, prefer the live implementation in `tailwind.config.js` and `src/index.css`, then update this document so future contributors do not drift from the actual UI.
