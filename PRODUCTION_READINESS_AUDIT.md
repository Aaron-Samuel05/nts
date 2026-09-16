# Production Readiness Audit - NTS Website

Audit date: 2026-08-22  
Codebase: Vite/React static site, with an unused standalone `google-apps-script.js` example.

Commands run:
- `[x]` `npm.cmd run build` - passed after running outside the sandbox. Output bundle: JS 364.47 kB, CSS 121.04 kB.
- `[ ]` `npm.cmd audit --audit-level=high` - failed readiness: 3 advisories, including 2 high severity `nanoid` advisories and 1 moderate `esbuild` advisory through Vite.
- `[x]` Local preview smoke: `/`, `/products`, and unknown SPA routes returned HTML.
- `[ ]` Lighthouse/PageSpeed - not run; Lighthouse is not installed in this project and no browser test dependency is present.

## 1. Security

- [x] No API keys, secrets, DB credentials, or tokens hardcoded in source - verified by source search. Only public contact emails/phone numbers appear in `src/data/siteData.js:241`.
- [x] `.env` files are in `.gitignore` and not committed - `.gitignore:8` through `.gitignore:10`; `git ls-files .env*` returned no tracked env files.
- [ ] All user input is sanitized/validated server-side - no production backend exists for the React newsletter; the unused Apps Script accepts raw `name`, `email`, and `message` and appends them directly at `google-apps-script.js:38` through `google-apps-script.js:55`. Fix: validate length/format, reject bad payloads, and sanitize before writing/deploying.
- [x] HTTPS enforced everywhere; no mixed content - no `http://` asset references were found in app source. Hosting-level HTTPS still needs live verification.
- [N/A] CORS policy scoped to known origins - no app API endpoint is used. If `google-apps-script.js` is deployed publicly, origin/rate controls need a separate design; deployment instructions currently say "Anyone" at `google-apps-script.js:15`.
- [N/A] Auth tokens/cookies are `HttpOnly`, `Secure`, and `SameSite` - no auth cookies/tokens. Age gate uses local/session storage only at `src/components/AgeGate.jsx:65`.
- [ ] Rate limiting or abuse protection on login/signup/public write endpoints - no real write endpoint in the React app, but `google-apps-script.js:23` would be a public write endpoint if deployed. Fix: add abuse controls before deployment.
- [N/A] Passwords stored hashed - no password storage found.
- [N/A] Admin/internal routes protected - no admin/internal routes found in `src/App.jsx:343` through `src/App.jsx:389`.
- [ ] Dependency check run and high/critical issues resolved - `npm audit --audit-level=high` reports high severity `nanoid <3.3.18`. Fix: run `npm audit fix`, then retest build.
- [N/A] File uploads validate type/size - no upload endpoint found.

## 2. Performance

- [ ] Images compressed and modern formats - many production assets are PNG/JPEG, with large files up to 3.08 MB in `public/banner/...` and 2.16 MB `public/hero-bg.jpg`. Fix: generate WebP/AVIF responsive versions.
- [ ] Lazy loading used below the fold - product collection cards lazy-load after the first 6 at `src/components/ProductCollectionPage.jsx:16`, but several below-the-fold/content images lack `loading="lazy"` such as `src/components/ContentPage.jsx:297` and `src/components/ContentPage.jsx:425`.
- [x] No unused/duplicate JS or CSS bundles obvious in build - production build code-splits `ProductCollectionPage` and `LegalPage`; main JS is 364.47 kB gzip 111.77 kB.
- [ ] Critical render-blocking resources minimized - CSS bundle is 121.04 kB and all CSS ships as a single blocking stylesheet in `dist/index.html`. Fix: review unused CSS and route-specific styles.
- [N/A] Caching headers set for static assets - Vite emits hashed assets, but cache headers are hosting configuration, not present in `vite.config.js:6` through `vite.config.js:13`.
- [N/A] Database queries checked - no database layer found.
- [N/A] API responses paginated - no API/list endpoint found.
- [ ] Lighthouse/PageSpeed run - not available in this repo. Fix: run Lighthouse against the deployed preview URL.

## 3. SEO & Metadata

- [x] Every app page has a title/meta description path - base tags in `index.html:10` through `index.html:11`; route components update metadata at `src/components/ContentPage.jsx:270`, `src/components/ProductCollectionPage.jsx:33`, and `src/components/LegalPage.jsx:142`.
- [ ] Open Graph and Twitter card tags present - none found in `index.html` or `src`. Fix: add OG/Twitter tags for the home/product pages.
- [ ] `robots.txt` exists and is not blocking - `public/robots.txt` is missing; preview `/robots.txt` falls back to SPA HTML.
- [ ] `sitemap.xml` present - `public/sitemap.xml` is missing.
- [ ] Canonical tags set - none found. Fix: add canonical link tags, especially for SPA routes.
- [x] Semantic HTML used - main routes use `main`, `section`, `article`, headings, and native controls, e.g. `src/components/ProductCollectionPage.jsx:54` through `src/components/ProductCollectionPage.jsx:91`.
- [x] Favicon and app icons present - `index.html:5` through `index.html:7` plus public icon files.

## 4. Accessibility

- [x] Images have meaningful or decorative alt text - verified representative images in `src/components/BannerSection.jsx:14`, `src/components/ProductCollectionPage.jsx:16`, and decorative hero images with `alt=""` in `src/components/ContentPage.jsx:297`.
- [ ] Forms have labels - age gate fields are labeled at `src/components/AgeGate.jsx:269`, `src/components/AgeGate.jsx:295`, and `src/components/AgeGate.jsx:321`; newsletter email input is placeholder-only at `src/components/Newsletter.jsx:204` through `src/components/Newsletter.jsx:210`. Fix: add a visible or sr-only label.
- [ ] Color contrast meets WCAG AA - not fully verified with tooling; low-opacity text such as `text-white/45` in `src/components/Newsletter.jsx:210` should be checked. Fix: run axe/Lighthouse and adjust low-contrast text.
- [x] Keyboard navigation/focus states - global visible focus style exists at `src/index.css:147` through `src/index.css:149`, skip link at `src/App.jsx:129`, and native buttons/links are used.
- [ ] Interactive elements are real buttons/links - most are native, but product cards are clickable `article` elements at `src/App.jsx:241` through `src/App.jsx:245`. Fix: use a button/link or add full keyboard role/handlers.
- [x] No content conveyed by color alone - age-gate errors include text and an alert icon at `src/components/AgeGate.jsx:355` through `src/components/AgeGate.jsx:360`.

## 5. Responsive & Cross-Browser

- [ ] Layout verified at mobile/tablet/desktop - responsive CSS exists, e.g. `src/index.css:624` and `src/index.css:2653`, but no Playwright/browser dependency exists and manual screenshots were not completed in this audit.
- [x] Touch targets large enough - key carousel buttons are 44px at `src/index.css:604`; mobile menu close button is 48px at `src/App.jsx:196` through `src/App.jsx:200`.
- [ ] Chrome/Safari/Firefox sanity checked - not verified in this code audit.
- [x] Forms/modals usable on small screens - age gate uses `overflow-y-auto` at `src/components/AgeGate.jsx:181` and responsive padding/widths.

## 6. Error Handling & Edge Cases

- [ ] Custom 404 page exists and is styled, but server status is wrong - React `NotFoundPage` exists at `src/components/ContentPage.jsx:438`, routed from `src/App.jsx:387`; preview returned HTTP 200 for unknown URLs. Fix: configure host rewrites/404 handling.
- [N/A] 500/server error page - static React site has no server error route. Add an Error Boundary if desired.
- [x] Empty states handled - product filter always has categories/products from static data; no async empty-list screen is needed.
- [x] Loading states shown for async chunks - Suspense fallbacks exist for lazy product/legal routes at `src/App.jsx:347` and `src/App.jsx:359`.
- [N/A] Network failure handled gracefully - app has no live network requests.
- [ ] Form submission errors specific/useful - age gate errors are specific at `src/components/AgeGate.jsx:146` through `src/components/AgeGate.jsx:163`; newsletter has no real submission/error state at `src/components/Newsletter.jsx:34` through `src/components/Newsletter.jsx:39`.

## 7. Environment & Configuration

- [N/A] Production build uses production env vars - no env vars referenced.
- [x] Debug/dev tools disabled - only debug logging found is gated by `import.meta.env.DEV` at `src/components/BottleStage3D.jsx:146`.
- [x] Console clean - production bundle should omit the gated `console.info`; source occurrence is dev-only.
- [N/A] Feature flags default correctly - no feature flags found.
- [ ] Domain/redirect/webhook URLs production - no domain config exists; Apps Script instructions still reference a placeholder copied URL at `google-apps-script.js:19` through `google-apps-script.js:20`.

## 8. Forms, Validation & User Input

- [ ] Client validation mirrored server-side - age gate is client-only by design; newsletter has no server. Apps Script lacks server validation.
- [ ] Required fields enforced - age gate enforces DOB at `src/components/AgeGate.jsx:146`; newsletter only relies on browser `required` at `src/components/Newsletter.jsx:205` through `src/components/Newsletter.jsx:206` and local non-empty check at `src/components/Newsletter.jsx:36`.
- [ ] Email/phone/number fields validate format - newsletter uses `type="email"` at `src/components/Newsletter.jsx:205`; no server-side validation.
- [ ] Submit buttons disabled/debounced during submission - no async submit state; newsletter submit is not disabled at `src/components/Newsletter.jsx:212`.
- [x] Success/confirmation feedback shown - newsletter shows a success confirmation at `src/components/Newsletter.jsx:194` through `src/components/Newsletter.jsx:199`; age gate hides after verification.

## 9. API & Backend

- [N/A] Endpoints return appropriate status codes - no app backend endpoints.
- [N/A] Sensitive endpoints require auth - none found.
- [N/A] Payload size limits set - no app backend. If Apps Script is deployed, add payload length limits.
- [N/A] Third-party production keys - no third-party keys found.
- [N/A] Webhooks signature checks - no webhooks found.

## 10. Database

- [N/A] Backups configured/tested - no database in repo.
- [N/A] Migrations applied - no migrations.
- [N/A] No seed/dummy production data - static content only; final business/product copy still needs owner review.
- [N/A] Sensitive fields not stored plain text - no sensitive data store found.

## 11. Testing & QA

- [ ] Core flows manually walked end-to-end - local route smoke only; age gate/newsletter/product modal/contact links were not fully browser-tested.
- [x] Automated tests that exist pass - no automated test script exists in `package.json`; production build passed.
- [N/A] Payment flow tested - no payment flow.

## 12. Code Quality & Maintainability

- [ ] No dead code/commented/TODO launch blockers - `google-apps-script.js` appears stale and references an `App.jsx` constant that no longer exists at `google-apps-script.js:19` through `google-apps-script.js:20`. Fix: remove or update before launch.
- [ ] Linter/formatter run cleanly - no lint/format scripts in `package.json`.
- [x] Environment-specific config isolated - no scattered production/dev config found; Vite alias only at `vite.config.js:6` through `vite.config.js:13`.

## 13. Analytics & Monitoring

- [ ] Analytics installed/firing - no GA/Plausible/etc. tags found.
- [ ] Error monitoring wired - no Sentry/equivalent found.
- [ ] Uptime monitoring/health check - no health endpoint or uptime config found.

## 14. Legal & Compliance

- [x] Privacy policy and terms pages exist and are linked - routes in `src/App.jsx:357` through `src/App.jsx:370`; footer links include legal pages.
- [ ] Cookie consent banner present if required - cookie policy exists, but age gate copy only says cookies are used at `src/components/AgeGate.jsx:408`; no explicit consent/preferences banner.
- [x] Contact/support information available - company contacts in `src/data/siteData.js:241` through `src/data/siteData.js:258`, rendered by contact/footer components.

## 15. Assets & Media

- [x] No placeholder/lorem-ipsum/"Company Name" text in app source - source search did not find launch placeholder text in `src`.
- [ ] Images/logos final assets, not low-res drafts - many generated/WhatsApp filenames remain in `public/banner` and `public/images`. Fix: rename/curate final production assets and compress them.
- [ ] Broken links checked - basic route smoke done, but no full crawler/link checker was run.

## 16. Deployment & Infra

- [ ] Custom domain and SSL certificate valid - external hosting verification required.
- [ ] Redirects set up - no host redirect config in repo.
- [ ] Rollback plan exists - not documented in repo.
- [ ] Hosting environment variables set correctly - no env vars used; hosting config still requires external verification.

## Final Sign-off

- [ ] All Critical items above are resolved.
- [ ] Owner has done one full manual pass of live/staging on desktop and mobile.
- [ ] Someone other than the builder has clicked through the core flow at least once.

## Critical Issues Found

1. Dependency audit is not clean: high severity `nanoid` advisories remain. Fix: run `npm audit fix`, rebuild, and re-run audit.
2. SEO crawl basics are missing: no `robots.txt`, no `sitemap.xml`, no canonical tags, and unknown routes return HTTP 200 in preview. Fix: add public SEO files/tags and configure hosting 404 behavior.
3. Any deployed version of `google-apps-script.js` would be a public unauthenticated write endpoint with no validation/rate limiting. Fix: do not deploy as-is; validate, limit, and protect it or remove it.

## Nice-to-Have / Post-Launch Items

1. Convert large PNG/JPEG assets to responsive WebP/AVIF and lazy-load below-the-fold imagery.
2. Add analytics, error monitoring, and uptime monitoring.
3. Add lint/format/test scripts plus a Lighthouse/axe/browser QA pass for desktop and mobile.
