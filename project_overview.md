# NTS Blenders & Distillers - Project Overview

This document provides a comprehensive technical and design overview of the NTS Blenders & Distillers web application.

---

## 1. Project Conception & Theme
The NTS Blenders & Distillers website is a highly immersive, premium Single Page Application (SPA) designed to serve as a B2B portfolio for contract bottling and spirits distribution. 

### Visual Identity
The visual theme is inspired by an **"Old Bar / Vintage Distillery"** saloon aesthetic, blended with modern, premium presentation patterns:
*   **Tactile Textures:** A global procedural SVG noise overlay mimics vintage, organic parchment paper.
*   **Warm Backgrounds:** Solid and radial gradients of warm cream paper colors (`#F4ECDF` / `#F3EEE3`) form the primary canvas.
*   **Rich Structural Accents:** Deep maroon (`#4A151C`) acts as the anchor color for brand boundaries, typography, and card headers.
*   **Vibrant Highlights:** A warm coral orange (`#E9542E`) is used to denote interactive states, primary action buttons, active pagination elements, and labels.

### Typography Hierarchy
*   **Display & Hero Headlines:** `'Rye', cursive` (a custom slab-serif typeface invoking a rustic, old-world saloon feel) for first-viewport impact.
*   **Subheadings & Product Titles:** `'Playfair Display', serif` for premium editorial card layouts.
*   **Body Copy:** `'Lora', serif` for highly legible narrative sections.
*   **Interactive Elements & Labels:** `'Work Sans', sans-serif` for clean, responsive buttons, form controls, and navigation links.

---

## 2. Core Interactive Features

### 3D Spirit Carousel
The centerpiece of the homepage is a 3D spirit carousel showcasing proprietary brands (e.g., *Wanted 999 VSOP Brandy*, *East Coast Indian Blended Grape Brandy*, *East Coast XXX Rum*, and *East Coast Sugar New Rum*).
*   **Interactive 3D Renders:** Powered by WebGL to load `.obj` meshes and `.mtl` materials directly in the browser.
*   **Tilted Realism:** To present the bottles dynamically (matching premium physical advertising look), the 3D models are rotated around the world Z-axis (`-0.65` rad) and slightly tipped forward around the X-axis (`0.25` rad).
*   **Self-Spinning & Mouse Control:** Bottles auto-rotate around their tilted local longitudinal axis and allow users to click-drag to spin them around.
*   **Responsive Atmosphere:** Dynamic ambient lights (`#FFF5E8` and `#C8D8F0`) and studio environment reflection maps react as the bottle rotates.

### B2B Inquiry Cart Drawer
A built-in inquiry cart system allows distributors to build a list of products they are interested in:
*   Users can click **"View Profile Specs"** or quick view on any product card, read tasting notes, and click **"Add to inquiry"**.
*   A slide-out drawer collects selected spirits and features a partner details form.
*   Upon submission, it generates a pre-formatted email to simplify B2B lead generation.

### Age Gate Verification
Due to legal regulations regarding alcobev websites, a strict, full-screen age verification modal block protects the site:
*   Uses `localStorage` to check if a user is verified (`nts_distillers_age_verified`).
*   Requires inputs of Day, Month, and Year (enforces 18+ limit).
*   Locks page scroll (`body.age-gate-open`) until verification succeeds.

---

## 3. Component Architecture

*   **[App.jsx](file:///c:/Users/mohan/Downloads/Nts-hosted/NTS-Website/src/App.jsx):** The root page orchestrating global layouts, contact forms, active inquiry states, and the details popup system.
*   **[SpiritCarousel.jsx](file:///c:/Users/mohan/Downloads/Nts-hosted/NTS-Website/src/components/SpiritCarousel.jsx):** Controls active product selection, slide spring transitions, text content layout, and carousel controls.
*   **[BottleStage3D.jsx](file:///c:/Users/mohan/Downloads/Nts-hosted/NTS-Website/src/components/BottleStage3D.jsx):** Initializes the Three.js canvas, loads 3D OBJ models with materials, configures lighting, and implements the tilted parent group.
*   **[CartDrawer.jsx](file:///c:/Users/mohan/Downloads/Nts-hosted/NTS-Website/src/components/CartDrawer.jsx):** Implements the inquiry cart list, slide animations, and partnership form submission.
*   **[AgeGate.jsx](file:///c:/Users/mohan/Downloads/Nts-hosted/NTS-Website/src/components/AgeGate.jsx):** Handles birthdate validation, validation error triggers, and session storage.

---

## 4. Technical Stack

*   **React 18 & Vite:** For fast HMR development and optimized production building.
*   **Tailwind CSS:** For styling, responsive structures, and color configuration.
*   **React Three Fiber & Drei:** Provides the React-centric wrappers for Three.js 3D loading and scene composition.
*   **Framer Motion / Motion:** Manages page layout transitions and sliding panels smoothly.
*   **Anime.js:** Drives fluid micro-interactions and HUD layouts.
*   **Lucide React:** Icon library for interactive actions.
