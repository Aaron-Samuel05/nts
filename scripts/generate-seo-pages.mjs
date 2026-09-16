import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSeoHead, SITE_URL } from '../src/lib/seo.js'
import { seoRoutes } from '../src/data/seoRoutes.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const publicDirectory = path.join(root, 'public')
const dateParts = Object.fromEntries(
  new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date()).map(({ type, value }) => [type, value]),
)
const today = `${dateParts.year}-${dateParts.month}-${dateParts.day}`

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function jsonForHtml(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function extractBuiltAssetTags(html) {
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
  return [...head.matchAll(/^\s*<(?:script|link)\b(?=[^>]*(?:\/assets\/|type="module"))[\s\S]*?(?:<\/script>|\/?>)\s*$/gm)]
    .map(([tag]) => tag.trim())
    .join('\n    ')
}

function createHead(route, builtAssetTags) {
  const { canonicalUrl, description, fullTitle, image, imageAlt, robots, schema, type } = createSeoHead(route)
  const imageType = image.endsWith('.png') ? 'image/png' : 'image/jpeg'

  return `  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="alternate" type="text/plain" href="/llms.txt" title="NTS Distillers information for AI assistants" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#030303" />
    <meta name="application-name" content="NTS Distillers" />
    <meta name="apple-mobile-web-app-title" content="NTS Distillers" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <meta name="author" content="NTS Blenders and Distillers Pvt. Ltd." />
    <meta name="publisher" content="NTS Blenders and Distillers Pvt. Ltd." />
    <meta name="language" content="English" />
    <meta name="geo.region" content="IN-GA" />
    <meta name="geo.placename" content="Canacona, Goa, India" />
    <meta name="geo.position" content="15.0096;74.0236" />
    <meta name="ICBM" content="15.0096, 74.0236" />
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:site_name" content="NTS Distillers" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
    <meta property="og:image:type" content="${imageType}" />
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
    <script id="site-structured-data" type="application/ld+json">${jsonForHtml(schema)}</script>
    ${builtAssetTags}
  </head>`
}

function createSitemap() {
  const entries = seoRoutes
    .map(({ path: routePath }) => `  <url>\n    <loc>${SITE_URL}${routePath}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

const baseHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
const sitemap = createSitemap()
const builtAssetTags = extractBuiltAssetTags(baseHtml)

for (const route of seoRoutes) {
  const target = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path.slice(1), 'index.html')
  const cleanUrlTarget = route.path === '/' ? null : path.join(dist, `${route.path.slice(1)}.html`)
  const html = baseHtml.replace(/<head>[\s\S]*?<\/head>/, createHead(route, builtAssetTags))

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html)

  if (cleanUrlTarget) {
    await mkdir(path.dirname(cleanUrlTarget), { recursive: true })
    await writeFile(cleanUrlTarget, html)
  }
}

await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await cp(path.join(publicDirectory, 'llms.txt'), path.join(dist, 'llms.txt'))

console.log(`Generated ${seoRoutes.length} route HTML files and sitemap.xml.`)
