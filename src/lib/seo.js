export const SITE_URL = 'https://ntsdistillers.com'
export const SITE_NAME = 'NTS Distillers'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/banner/five-bottles-liquor-table-hero-logo-seals.png`
export const DEFAULT_OG_IMAGE_ALT = 'NTS Distillers spirits portfolio bottles'

const defaultDescription =
  'NTS Blenders and Distillers Pvt. Ltd. is a Goa-based spirits manufacturer offering contract bottling and a proprietary IMFL portfolio.'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: 'NTS Blenders and Distillers Pvt. Ltd.',
  alternateName: ['NTS Distillers', 'NTS Blenders and Distillers'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  foundingDate: '1980',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CIN',
    value: 'U15100PY2022PTC008944',
  },
  slogan: 'Goa spirits manufacturing, bottling, and distribution support.',
  founder: {
    '@type': 'Person',
    name: 'Mr. N.T. Sambath',
  },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Canacona Industrial Estate',
      addressLocality: 'Canacona',
      addressRegion: 'Goa',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'No. 211, Chetty Street',
      addressLocality: 'Pondicherry',
      addressRegion: 'Puducherry',
      postalCode: '605002',
      addressCountry: 'IN',
    },
  ],
  email: ['md@ntsdistillers.com', 'plant@ntsdistillers.com', 'sales@ntsdistillers.com'],
  telephone: ['+91-8925523801', '+91-8925523802'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-8925523801',
      email: 'md@ntsdistillers.com',
      contactType: 'business partnerships and trade enquiries',
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-8925523802',
      email: 'plant@ntsdistillers.com',
      contactType: 'manufacturing and plant enquiries',
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/ntsdistillers/',
    'https://in.linkedin.com/in/nts-blenders-and-distillers-pvt-ltd-94aa65353',
  ],
  areaServed: ['Goa', 'Puducherry', 'India'],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 15.0096,
    longitude: 74.0236,
  },
  knowsAbout: [
    'Contract bottling',
    'Spirits manufacturing',
    'IMFL brands',
    'Whisky',
    'Brandy',
    'Rum',
    'Vodka',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'en-IN',
}

function upsertMeta(selector, attributes) {
  if (typeof document === 'undefined') return

  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }

  Object.entries(attributes).forEach(([name, value]) => {
    tag.setAttribute(name, value)
  })
}

function upsertLink(rel, href) {
  if (typeof document === 'undefined') return

  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

function upsertScript(id, json) {
  if (typeof document === 'undefined') return

  let tag = document.head.querySelector(`script#${id}`)
  if (!tag) {
    tag = document.createElement('script')
    tag.id = id
    tag.type = 'application/ld+json'
    document.head.appendChild(tag)
  }

  tag.textContent = JSON.stringify(json)
}

function removeScript(id) {
  if (typeof document === 'undefined') return

  const tag = document.head.querySelector(`script#${id}`)
  if (tag) tag.remove()
}

export function createSeoHead({
  title = SITE_NAME,
  description = defaultDescription,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  schema,
} = {}) {

  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  return {
    canonicalUrl,
    description,
    fullTitle,
    image,
    imageAlt,
    robots,
    schema: [organizationSchema, websiteSchema, ...(schema || [])],
    type,
  }
}

export function setPageSeo(route = {}) {
  if (typeof document === 'undefined') return

  const { canonicalUrl, description, fullTitle, image, imageAlt, robots, schema, type } = createSeoHead(route)

  document.title = fullTitle
  upsertLink('canonical', canonicalUrl)
  upsertMeta('meta[name="description"]', { name: 'description', content: description })
  upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })
  upsertMeta('meta[name="author"]', { name: 'author', content: 'NTS Blenders and Distillers Pvt. Ltd.' })
  upsertMeta('meta[name="publisher"]', { name: 'publisher', content: 'NTS Blenders and Distillers Pvt. Ltd.' })
  upsertMeta('meta[name="geo.region"]', { name: 'geo.region', content: 'IN-GA' })
  upsertMeta('meta[name="geo.placename"]', { name: 'geo.placename', content: 'Canacona, Goa, India' })
  upsertMeta('meta[name="geo.position"]', { name: 'geo.position', content: '15.0096;74.0236' })
  upsertMeta('meta[name="ICBM"]', { name: 'ICBM', content: '15.0096, 74.0236' })
  upsertMeta('meta[name="language"]', { name: 'language', content: 'English' })
  upsertMeta('meta[name="classification"]', { name: 'classification', content: 'Spirits manufacturing, contract bottling, IMFL portfolio' })
  upsertMeta('meta[name="keywords"]', {
    name: 'keywords',
    content: 'NTS Distillers, NTS Blenders and Distillers, Goa distillery, contract bottling India, spirits manufacturer Goa, IMFL brands, whisky, brandy, rum, vodka',
  })
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  upsertMeta('meta[property="og:image:secure_url"]', { property: 'og:image:secure_url', content: image })
  upsertMeta('meta[property="og:image:type"]', { property: 'og:image:type', content: image.endsWith('.png') ? 'image/png' : 'image/jpeg' })
  upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: image === DEFAULT_OG_IMAGE ? '2752' : '1200' })
  upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: image === DEFAULT_OG_IMAGE ? '1536' : '630' })
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: imageAlt })
  upsertMeta('meta[property="business:contact_data:locality"]', { property: 'business:contact_data:locality', content: 'Canacona' })
  upsertMeta('meta[property="business:contact_data:region"]', { property: 'business:contact_data:region', content: 'Goa' })
  upsertMeta('meta[property="business:contact_data:country_name"]', { property: 'business:contact_data:country_name', content: 'India' })
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: imageAlt })
  upsertScript('site-structured-data', schema)
  removeScript('page-structured-data')
}

export function createWebPageSchema({ title, description, path, image = DEFAULT_OG_IMAGE }) {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${canonicalPath}#webpage`,
    url: `${SITE_URL}${canonicalPath}`,
    name: title,
    description,
    image,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-IN',
  }
}

export function createBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function createProductListSchema(products) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/products#itemlist`,
    name: 'NTS Distillers product collection',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/products/${product.slug}`,
      name: product.name,
    })),
  }
}

export function createFaqPageSchema(sections) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faqpage`,
    mainEntity: sections.map((section) => ({
      '@type': 'Question',
      name: section.heading,
      acceptedAnswer: {
        '@type': 'Answer',
        text: section.body,
      },
    })),
  }
}

export function createProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/products/${product.slug}#product`,
    name: product.name,
    description: product.profile,
    category: product.category,
    image: product.image?.startsWith('/') ? `${SITE_URL}${product.image}` : product.image,
    brand: {
      '@type': 'Brand',
      name: product.brandName || product.name,
    },
    manufacturer: {
      '@id': `${SITE_URL}/#organization`,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Specification',
        value: product.abv,
      },
      {
        '@type': 'PropertyValue',
        name: 'Pack',
        value: product.bottleSize,
      },
    ],
  }
}
