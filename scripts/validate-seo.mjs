import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from '../src/lib/seo.js'
import { seoRoutes } from '../src/data/seoRoutes.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8')
const robots = await readFile(path.join(root, 'public', 'robots.txt'), 'utf8')
const llms = await readFile(path.join(root, 'public', 'llms.txt'), 'utf8')
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

assert.match(robots, new RegExp(`Sitemap: ${escapeRegExp(SITE_URL)}/sitemap\\.xml`))

for (const route of seoRoutes) {
  const file = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path.slice(1), 'index.html')
  const cleanUrlFile = route.path === '/' ? null : path.join(dist, `${route.path.slice(1)}.html`)
  const html = await readFile(file, 'utf8')
  const canonical = `${SITE_URL}${route.path}`

  await access(file)
  if (cleanUrlFile) await access(cleanUrlFile)
  assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegExp(canonical)}"`))
  assert.match(html, /<script[^>]+type="module"[^>]+src="\/assets\//)
  assert.match(html, /<link[^>]+rel="stylesheet"[^>]+href="\/assets\//)
  assert.match(html, /<meta name="description" content="[^"]+"/)
  assert.match(html, /<meta property="og:title" content="[^"]+"/)
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/)
  assert.match(html, /<script id="site-structured-data" type="application\/ld\+json">/)
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${route.path} is missing from sitemap.xml`)
}

for (const productRoute of seoRoutes.filter(({ path: routePath }) => routePath.startsWith('/products/'))) {
  assert.ok(llms.includes(`${SITE_URL}${productRoute.path}`), `${productRoute.path} is missing from llms.txt`)
}

console.log(`SEO validation passed for ${seoRoutes.length} routes.`)
