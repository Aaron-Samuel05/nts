# NTS Website: Sections, Animations & Effects Documentation

This document provides a detailed breakdown of all the sections of the NTS website, the elements they contain, and the specific interactive animations, transitions, and parallax effects implemented.

---

## 1. Age Verification Gate (`AgeGate.jsx`)
* **Layout Elements:**
  * Background gradient overlay styled to represent premium wood/leather finishes.
  * Central modal containing the official NTS logo mark, serif header ("NTS DISTILLERS"), and clean descriptive copy.
  * Interactive Date of Birth verification dropdowns (Day, Month, Year).
  * Direct "Enter" submit button and a fallback warning alert message.
* **Animations & Effects:**
  * **Entrance Scale:** The verification box uses a scale-in transition (`scale-95` to `scale-100`) coupled with a backdrop fade-in.
  * **Scroll Lock:** Implements body-level scroll lock (`body.age-gate-open`) which disables page interaction until age confirmation.
  * **Interactive Validation:** Fields light up with smooth border color changes upon focus.

---

## 2. Header Announcement Ticker (`Marquee.jsx`)
* **Layout Elements:**
  * Horizontal bar spanning the full width of the screen.
  * Continuous text highlights (e.g., "NTS BLENDERS AND DISTILLERS PVT. LTD.", "ESTABLISHED 1980", "GOA MANUFACTURING FACILITY").
* **Animations & Effects:**
  * **Infinite Horizontal Loop:** Utilizes a pure CSS keyframe marquee animation that translates text content along the X-axis infinitely.
  * **Dynamic Speed Control:** The scrolling speed is configurable (configured at `20s` and `22s` for standard and secondary bands).

---

## 3. Sticky Navigation Header (`App.jsx` Header)
* **Layout Elements:**
  * Circular NTS logo emblem.
  * Uppercase sans-serif layout navigation links (Brands, Track Record, Distillery, Machinery, B2B Proposals).
  * Responsive Mobile navigation drawer toggled by a "Menu" button.
* **Animations & Effects:**
  * **Scroll-Responsive Header Shrink:** Automatically monitors scroll position (`window.scrollY > 50`). Changes padding from `py-6` down to `py-4` and adds a blurred glassmorphic background layer (`bg-cream/95 backdrop-blur-md shadow-md`) for high contrast readability.
  * **Mobile Menu Slide Down:** The mobile menu drawer smoothly transitions opacity and transforms down into view when toggled.

---

## 4. Main Hero Section (`App.jsx`)
* **Layout Elements:**
  * Background image (`/hero-bg.jpg`) representing raw heritage distillery settings.
  * Heavy visual scrim overlay (radial gradient starting dark at the bottom left and fading out).
  * Oversized Rye-serif heading text ("Four Decades. One Legacy. Infinite Spirit.").
  * Centered Call-To-Action button ("Explore Our Journey") linking down to the milestones.
* **Animations & Effects:**
  * **Slow-Motion Ken Burns Hover:** The background image uses a slow, cinematic zoom (`group-hover:scale-105`) with a `1400ms` ease-out transition.
  * **Content Rise-Up:** The text container and CTA button trigger a smooth fade-in and slide-up transition (`animate-heroRise`) on load.
  * **CTA Button Hover:** The button scales, shifts slightly upward (`hover:-translate-y-1`), transitions its background color from coral-orange to cream, and responds to click presses with a scale reduction (`active:scale-[0.98]`).

---

## 5. B2B Credibility Trust Strip (`App.jsx`)
* **Layout Elements:**
  * High-contrast dark maroon horizontal band directly beneath the Hero.
  * Four grid items showing key operational indicators (Heritage Legacy, Distillery Location, Quality Standard, Industrial Scale).
* **Animations & Effects:**
  * **Staggered Scroll Reveal:** Uses a soft slide-up class (`reveal-soft`) with step-wise animation delays (`delay-100`, `delay-200`, `delay-300`) to reveal elements sequentially as the user scrolls.

---

## 6. Kinetic Scroll-Driven Tickers (`App.jsx` - `KineticRow`)
* **Layout Elements:**
  * Giant Rye-serif typeface texts representing product types (e.g., brand names).
  * Centered overlay images of spirits bottles layered on top of the text.
* **Animations & Effects:**
  * **Liquid-Smooth Lerping:** Uses `requestAnimationFrame` with a Linear Interpolation (lerp) factor of `0.08` to calculate scroll momentum. This ensures that the elements drift with a physical sense of weight.
  * **Dual-Direction Horizontal Parallax:** The giant text moves left or right depending on the direction parameter (`translateX(${xOffset}px)`).
  * **Scale-to-Focus Popping:** As the text elements align with the viewport center, they scale up from `0.9` to `1.05` and fade in opacity from `0.3` to `1.0`.
  * **Elastic Bottle Float:** The bottle images scale up to `2x`, rotate smoothly (`rotateDeg` based on scroll momentum), and translate vertically in reverse (`translateY`) to float above the moving text background.

---

## 7. 3D interactive Spirit Carousel (`SpiritCarousel.jsx` & `BottleCarousel3D.jsx`)
* **Layout Elements:**
  * Interactive 3D Canvas rendering product models (e.g., Wanted 999 VSOP Brandy, East Coast Grape Brandy).
  * Info details panel displaying price, ABV, category, and taste profiles.
  * Navigation arrows (Chevron Left/Right).
* **Animations & Effects:**
  * **Three.js Orbiting Render:** Uses React Three Fiber and Drei OrbitControls to load, orient, rotate, and let the user drag/spin detailed 3D models.
  * **Framer Motion Scene Transitions:** Smooth transitions (`AnimatePresence`) for text panels and layout backgrounds when the active item shifts.
  * **Loader Spinner:** Custom spinner element with a continuous infinite rotation during 3D asset parsing.

---

## 8. Brand History / Info Section (`App.jsx`)
* **Layout Elements:**
  * Grid container with a background illustration.
  * Left column: Large lineup product image (`tt.png`) with deep drop shadows.
  * Right column: "OUR STORY" introduction paragraphs and 5.0-star certified badge indicator.
* **Animations & Effects:**
  * **Shadow Hover Pop:** The main image features subtle scaling and interactive shadow shifting.

---

## 9. Vodka Range Hotspot Experience (`App.jsx`)
* **Layout Elements:**
  * Panoramic photo background depicting the Canacona Kiwi, Apple, and Orange vodka bottles on display.
  * Circular overlay click-zones precisely aligned over each bottle.
  * Historical distribution list outlining historical portfolios (UB Group, McDowell's, Shaw Wallace).
* **Animations & Effects:**
  * **Interactive Hotspots:** Hovering over a bottle hotspot reveals a detailed label tag ("Kiwi Details", "Apple Details", etc.) that fades in and scales slightly. Clicking a hotspot opens the respective flavor detail modal.

---

## 10. Interactive Milestones Timeline (`BrandTimeline.jsx`)
* **Layout Elements:**
  * Central vertical axis timeline marking years from 1980 to the present.
  * Description cards for each era.
  * Giant faded background milestone numbers (e.g., "01", "02").
* **Animations & Effects:**
  * **Intersection Observer Reveals:** Cards monitor viewport entrance and trigger slide-in reveals.
  * **Active Track Highlight:** Uses Framer Motion's `useScroll` to compute timeline scroll percentages and draw an active gold track indicator line down the center.

---

## 11. Curved Portfolio Carousel (`Portfolio.jsx`)
* **Layout Elements:**
  * Large selection of NTS spirits brands (Old Town, Wanted 999, East Coast XXX, Coastal Dry Gin, Clear House Vodka).
  * Navigation control panels.
* **Animations & Effects:**
  * **Curved Circular Layout Offsets:** Bottles are arranged along a virtual circular path with scaling and opacity metrics mapped to their offset index.
  * **Framer Motion Springs:** Drags, swipes, and transition jumps are smoothed out using spring physics (`stiffness: 220`, `damping: 24`).

---

## 12. B2B Partnership Proposals & Contact Forms (`App.jsx`)
* **Layout Elements:**
  * Deep maroon background wrapper with light radial accent gradients.
  * Direct contact button tags (phone, mail).
  * Form inputs for name, email, and detailed message text.
* **Animations & Effects:**
  * **Submit State Transitions:** The submit button turns into a "Sending..." loader state. Success and error feedback banners slide down into view.

---

## 13. Product Details Popup Modal (`App.jsx`)
* **Layout Elements:**
  * Fullscreen semi-transparent backdrop.
  * Split container: Left side shows the color-themed bottle image; right side details the ABV, tasting notes, profiles, and includes an "Add to Inquiry" action button.
* **Animations & Effects:**
  * **Backdrop Fade-In:** Backdrop uses `animate-fadeIn` to dim the viewport.
  * **Scale-In Dialog Box:** The modal content pops in from the center (`animate-scaleIn`).
  * **Inquiry Addition animation:** Smooth button state changes when adding products to the inquiry basket.
