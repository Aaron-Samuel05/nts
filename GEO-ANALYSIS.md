# NTS Distillers SEO and GEO Analysis

Audit date: 2026-08-28
Site: https://ntsdistillers.com

## GEO Readiness Score: 76/100

NTS Distillers has a clear entity, real-world business details, product pages, contact details, and external public references. The main technical limitation is that the site is a client-rendered Vite React app, so route-specific content and metadata are produced after JavaScript runs instead of being delivered as static HTML per route.

## Platform Breakdown

- Google AI Overviews: 78/100. Strongest path is normal SEO: crawlable pages, correct sitemap, valid metadata, structured data, helpful content, and external authority signals.
- ChatGPT Search: 72/100. Entity clarity is improved through Organization, LocalBusiness, Product, BreadcrumbList, FAQPage, and llms.txt, but broader brand mentions are still thin.
- Perplexity: 70/100. The site has clear facts, product pages, and contact data; off-site mentions and independent citations need work.

## AI Crawler Access Status

`robots.txt` allows the site and important assets. It explicitly allows:

- OAI-SearchBot
- GPTBot
- ChatGPT-User
- PerplexityBot
- ClaudeBot
- Google-Extended
- CCBot

`/404.html` is disallowed, and the sitemap is declared at `https://ntsdistillers.com/sitemap.xml`.

## llms.txt Status

`/llms.txt` is present and now matches the real product routes. It is useful as low-cost structured guidance for non-Google AI agents. Per Google's published AI search guidance, `llms.txt` should not be treated as a Google ranking factor.

## Brand Mention Analysis

- Government of Goa Excise lists NTS Blenders and Distillers Private Limited under Canacona: https://excise.goa.gov.in/contact_us.aspx
- ZaubaCorp lists NTS Blenders and Distillers Private Limited with CIN `U15100PY2022PTC008944`, incorporation date `2022-10-10`, ROC Pondicherry, and active status: https://www.zaubacorp.com/NTS-BLENDERS-AND-DISTILLERS-PRIVATE-LIMITED-U15100PY2022PTC008944
- IndiaFilings also lists the company as active with the same CIN and registered address: https://www.indiafilings.com/search/nts-blenders-and-distillers-private-limited-cin-U15100PY2022PTC008944
- LinkedIn has an NTS Blenders and Distillers profile: https://in.linkedin.com/in/nts-blenders-and-distillers-pvt-ltd-94aa65353
- Reddit, YouTube, and Wikipedia presence were not found in the quick search results and should be treated as off-site growth opportunities.

## Passage-Level Citability

Best existing citable blocks:

- About page intro: origin, founder, incorporation record, and Goa manufacturing facility.
- Distillery page intro: Canacona Industrial Estate, three-acre unit, NH 66 connectivity, bottling, quality checks, and bonded warehousing.
- FAQ page sections: contract bottling, facility location, owned brands, and trade contact flow.
- Product detail pages: product name, category, product profile, pack/spec availability, and related category links.

## Server-Side Rendering Check

The website uses Vite and React with client-side routing. Search engines can render JavaScript, but route-specific titles, meta descriptions, canonical URLs, and JSON-LD are inserted client-side. For maximum SEO strength, future work should move the site to SSR or static prerendering so each route returns its final HTML metadata and body content without JavaScript execution.

## Top 5 Highest-Impact Changes

1. Add static prerendering or migrate to an SSR/static framework such as Next.js or Astro.
2. Build deeper service pages for contract bottling, bonded warehousing, private label manufacturing, and Goa distillery capabilities.
3. Add source-backed trust content using public records and compliance references already visible online.
4. Publish authoritative off-site profiles and citations, especially LinkedIn updates, YouTube videos, trade directory listings, and industry event pages.
5. Expand FAQ content into direct question-and-answer blocks for buyer, distributor, and contract manufacturing search intent.

## Schema Recommendations

Implemented or improved:

- Organization
- LocalBusiness
- WebSite
- WebPage
- BreadcrumbList
- Product
- ItemList
- FAQPage

Future schema only if the visible content supports it:

- Service schema for dedicated contract bottling and manufacturing pages.
- Article schema only for dated news or resource pages with authorship.
- Event schema only for confirmed public trade events.

## Content Reformatting Suggestions

- Add a dedicated contract bottling page with direct answers to "Does NTS provide contract bottling in Goa?" and "What production capacity does NTS offer?"
- Add a dedicated Goa distillery page section summarizing machinery, capacity, bonded warehouse capacity, and contact route in 140-160 words.
- Add product-category intro blocks for whisky, brandy, rum, and vodka so search systems can understand the full portfolio without relying on cards alone.
- Add a public records/trust section linking to official or reputable external references already found online.
