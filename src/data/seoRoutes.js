import { productCollectionHeroImage, productCollectionItems } from './siteData.js'
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  createBreadcrumbSchema,
  createFaqPageSchema,
  createProductListSchema,
  createProductSchema,
  createWebPageSchema,
} from '../lib/seo.js'

const homeImage = DEFAULT_OG_IMAGE
const defaultRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

const breadcrumb = (name, path) =>
  createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name, path },
  ])

function route({ path, title, description, image = DEFAULT_OG_IMAGE, imageAlt, type = 'website', robots = defaultRobots, schema = [] }) {
  return {
    path,
    title,
    description,
    image,
    imageAlt: imageAlt || 'NTS Distillers spirits portfolio bottles',
    type,
    robots,
    schema: [createWebPageSchema({ title, description, path, image }), ...schema],
  }
}

const faqSections = [
  {
    heading: 'What does NTS Distillers manufacture?',
    body: 'NTS Blenders and Distillers produces and supports proprietary Indian-made foreign liquor labels across whisky, brandy, rum, vodka, and flavored vodka categories.',
  },
  {
    heading: 'Where is the NTS manufacturing facility?',
    body: 'NTS operates from Canacona Industrial Estate in Goa, with production planning, bottling support, bonded warehousing, and highway access through the state route and NH 66.',
  },
  {
    heading: 'Does NTS offer contract bottling?',
    body: 'NTS welcomes legitimate trade, partnership, and contract bottling enquiries through its contact channels.',
  },
]

export const seoRoutes = [
  route({
    path: '/',
    title: 'NTS Distillers | Goa Spirits Manufacturer & Contract Bottling Partner',
    description: 'Explore NTS Blenders and Distillers: Goa-based contract bottling, Goa production, and proprietary whisky, brandy, rum, and vodka labels.',
    image: homeImage,
    imageAlt: 'Five NTS Distillers portfolio bottles on a wooden table in front of a blue sky',
  }),
  route({
    path: '/products',
    title: 'Products | NTS Distillers Portfolio',
    description: 'Browse the NTS Distillers portfolio of whisky, rum, brandy, vodka, flavored vodka, and upcoming Canacona releases.',
    image: `${SITE_URL}${productCollectionHeroImage}`,
    imageAlt: 'NTS Distillers product collection',
    schema: [
      breadcrumb('Products', '/products'),
      createProductListSchema(productCollectionItems),
    ],
  }),
  route({
    path: '/about',
    title: 'About NTS Distillers | NTS Blenders and Distillers',
    description: 'Learn about NTS Blenders and Distillers, founded in 1980 in Pondicherry with a Goa manufacturing facility and decades of Indian spirits distribution experience.',
    image: `${SITE_URL}/images/WhatsApp_Image_2026-07-23_at_12.21.05_202607231329.jpeg`,
    schema: [breadcrumb('About', '/about')],
  }),
  route({
    path: '/distillery',
    title: 'Goa Distillery Facility | NTS Blenders and Distillers',
    description: 'Explore the NTS Goa facility in Canacona with bottling capacity, bonded warehousing, quality checks, and production machinery.',
    image: `${SITE_URL}/images/WhatsApp_Image_2026-07-23_at_12.21.13_202607231440.jpeg`,
    schema: [breadcrumb('Distillery', '/distillery')],
  }),
  route({
    path: '/contact',
    title: 'Contact NTS Distillers | Trade and Manufacturing Inquiries',
    description: 'Contact NTS Blenders and Distillers for distribution, contract bottling, manufacturing, and product portfolio inquiries.',
    schema: [breadcrumb('Contact', '/contact')],
  }),
  route({
    path: '/achievements',
    title: 'Achievements | NTS Distillers',
    description: 'Distribution achievements and operating milestones from NTS Distillers.',
    schema: [breadcrumb('Achievements', '/achievements')],
  }),
  route({
    path: '/faq',
    title: 'FAQ | NTS Distillers',
    description: 'Frequently asked questions about NTS Distillers products, manufacturing, distribution, and partnership inquiries.',
    schema: [breadcrumb('FAQ', '/faq'), createFaqPageSchema(faqSections)],
  }),
  route({
    path: '/responsible-drinking',
    title: 'Responsible Drinking | NTS Distillers',
    description: 'Responsible drinking guidance and alcohol-age reminder from NTS Blenders and Distillers.',
    schema: [breadcrumb('Responsible Drinking', '/responsible-drinking')],
  }),
  route({
    path: '/cookie-policy',
    title: 'Cookie Policy | NTS Distillers',
    description: 'Cookie and browser storage policy for the NTS Distillers website.',
    schema: [breadcrumb('Cookie Policy', '/cookie-policy')],
  }),
  route({
    path: '/terms',
    title: 'Terms & Conditions | NTS Distillers',
    description: 'Terms governing access to and use of the NTS Distillers website.',
    schema: [breadcrumb('Terms & Conditions', '/terms')],
  }),
  route({
    path: '/privacy',
    title: 'Privacy Policy | NTS Distillers',
    description: 'How NTS Distillers handles information submitted through its website.',
    schema: [breadcrumb('Privacy Policy', '/privacy')],
  }),
  ...productCollectionItems.map((product) =>
    route({
      path: `/products/${product.slug}`,
      title: `${product.name} | NTS Distillers`,
      description: `${product.profile} Specification and pack details are available through the NTS team.`,
      image: product.image?.startsWith('/') ? `${SITE_URL}${product.image}` : product.image,
      imageAlt: `${product.name} bottle by NTS Distillers`,
      type: 'product',
      schema: [
        createProductSchema(product),
        createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ]),
      ],
    }),
  ),
]

const routesByPath = new Map(seoRoutes.map((item) => [item.path, item]))

export function getSeoRoute(path) {
  return routesByPath.get(path)
}

export function getProductSeoRoute(slug) {
  return getSeoRoute(`/products/${slug}`)
}
