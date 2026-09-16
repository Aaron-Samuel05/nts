# Project Context: NTS Blenders & Distillers

This document provides a comprehensive technical overview of the NTS Blenders & Distillers web application codebase, design system, interactive gallery, and typography mapping.

---

## 1. Aesthetic Identity & Styling

The site is built with a premium **"Old Bar / Vintage Distillery"** saloon theme using Tailwind CSS and custom style overrides.

### Color Palette
*   **Backgrounds:** Premium warm creams (`#F4ECDF` / `#F3EEE3`) for a parchment-like feel.
*   **Primary Text & Accents:** Rich, deep maroon (`#4A151C`) for headers, border details, and dark background containers.
*   **Secondary/Highlight Color:** Vibrant warm coral orange (`#E9542E`) for active buttons, status labels, hover states, and details badges.

### Typography Pairing
*   **Display & Hero Headlines:** `'Rye', cursive` (Western/saloon-style slab-serif font)
    *   *Elements:* Main Hero Title (`h1`), Section Titles (`h2`), Marquees, and Kinetic Row elements.
*   **Subheadings & Card Titles:** `'Playfair Display', serif` (High-contrast, premium serif)
    *   *Elements:* Product card titles, timeline titles, and intermediate descriptions.
*   **Body Copy:** `'Lora', serif` (Warm, highly-legible body serif)
    *   *Elements:* All paragraphs (`p`), blockquotes, and narrative stories.
*   **UI Components:** `'Work Sans', sans-serif` (Clean sans-serif)
    *   *Elements:* Navigation links, buttons, counter badges, and small technical metadata.

---

## 2. Technical Stack & Dependencies

*   **Framework:** React (Vite-based SPA)
*   **Styling:** Tailwind CSS + custom CSS variables and overrides in [index.css](file:///c:/Users/mohan/Downloads/NTS/src/index.css)
*   **Animation Tools:** Anime.js (`animejs` for HUD elastic slide-up transitions)
*   **Custom Animations:** Native `requestAnimationFrame` hooks for smooth momentum-based animations.

---

## 3. Core Components & Implementations

### A. Main App Layout ([App.jsx](file:///c:/Users/mohan/Downloads/NTS/src/App.jsx))
*   **Sticky Header:** Translucent navigation bar with backdrop blur (`backdrop-blur-sm`).
*   **Hero Section:** Dark atmospheric section (`h-[95vh]`) with a background image, a giant hero title in Rye, and CTA buttons.
*   **Historical Legacy & Vodka Range Section:**
    *   Features a background image of Canacona Vodka bottles aligned to the left (`backgroundPosition: '0% center'`).
    *   Left side has absolute transparent click zones (`lg:col-span-4 lg:-translate-x-20`) to select products.
    *   Right side has a rounded white info card (`#FFFFFF`, `border-radius: 2.5rem`) pushed towards the right margin using `lg:col-start-7 lg:col-span-6`.
*   **Timeline Section:** Decades of brand-building milestone slider.
*   **Capacity Metric Section:** High-performance distillery metrics counter dashboard styled in deep maroon with `'Rye'` headers.

### B. Interactive 3D Bottle Showcase ([BottleGallery.jsx](file:///c:/Users/mohan/Downloads/NTS/src/components/BottleGallery.jsx))
*   **Description:** A viewport-sticky product showcase featuring giant bottles sliding horizontally on scroll, paired with a right-aligned typographic HUD.
*   **Scrolling & Carousel Animation:**
    *   Calculates scroll progression through the section wrapper.
    *   Uses a **linear interpolation (lerp) loop** via `requestAnimationFrame` (`currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08`) to animate the sliding bottles with a smooth, fluid deceleration.
    *   **Equal Height Constraint:** The Z-depth translation parameter (`z`) is locked at `0px` across all scroll states. This prevents perspective-based scaling, ensuring every bottle maintains an identical size and height.
*   **Mouse Parallax Physics:**
    *   Tracks client mouse movements.
    *   Interpolates target position to tilt the active bottle (`rotateY`, `translateX`, and `translateY`) with a smooth lag effect.

### C. Kinetic Marquee Text Rows (`KineticRow` inside [App.jsx](file:///c:/Users/mohan/Downloads/NTS/src/App.jsx))
*   **Description:** Horizontal typography banners displaying product names (e.g., "OLD TOWN", "WANTED 999") with bottles popping up from behind when scrolled into focus.
*   **Scrolling Mechanics:**
    *   Tracks element center relative to the viewport.
    *   Uses a lerp momentum loop (`0.08` speed) to slide the text horizontally (`translateX`) and adjust scale and opacity dynamically.
    *   Bottle pop overlay scales (`popScale` up to `2.0x`) and floats vertically (`translateY`) in the opposite direction of the scroll.
