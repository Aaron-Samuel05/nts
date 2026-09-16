import React, { useEffect } from 'react'
import { ArrowUpRight, Mail, Phone, ShieldCheck } from 'lucide-react'
import AgeGate from './AgeGate'
import FooterRedesign from './FooterRedesign'
import SiteHeader from './SiteHeader'
import { companyFacts, facilityStats, productCollectionItems } from '../data/siteData'
import { setPageSeo } from '../lib/seo'
import { getProductSeoRoute, getSeoRoute } from '../data/seoRoutes'

const expansionData = {
  about: {
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.05_202607231329.jpeg',
    label: 'Market-building history',
    title: 'From Pondicherry distribution to Goa-based manufacturing.',
    body:
      'NTS grew from a Pondicherry trade operation into a Goa manufacturing house, moving through IMFL, beer, imported labels, owned economy brands, and a sharper semi-premium portfolio.',
    timeline: [
      { year: '1980', text: 'NTS Wines begins in Pondicherry under Mr. N.T. Sambath.' },
      { year: 'UB Group', text: 'Distribution expands through the CDL and Carew Phipson portfolios, covering rum, gin, vodka, beer, and brandy labels.' },
      { year: 'McDowell’s', text: 'The portfolio grows with Traveller and Old Cask labels spanning brandy, whisky, gin, and rum.' },
      { year: 'Goa', text: 'NTS establishes its Canacona facility and launches owned semi-premium brands across whisky, brandy, and rum.' },
      { year: '2022', text: 'Public company listings show NTS Blenders and Distillers Private Limited incorporated on 10 October 2022 and active with ROC Pondicherry.' },
    ],
  },
  distillery: {
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.13_202607231440.jpeg',
    label: 'Production floor',
    title: 'Three bottling lines supported by washing, filling, sealing, inspection, and label systems.',
    body:
      'The production floor is planned for clean movement: washing, vacuum filling, cap sealing, inspection, labelling, printing, conveying, rejection handling, packing support, and lab-led checks.',
    timeline: [
      { year: '3', text: 'Rotary washing machines and 24-foot belt conveyors.' },
      { year: '6', text: '8-head vacuum filling machines with auto-cut system.' },
      { year: '5', text: 'ROPP and Guala cap sealing systems across manual and automatic operations.' },
      { year: 'R&D', text: 'A dedicated lab and inspection workflow supports batch control.' },
    ],
  },
  achievements: {
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.05_202607231329.jpeg',
    label: 'Recorded achievements',
    title: 'Distribution milestones from the NTS growth story.',
    body:
      'NTS has built its reputation through market development, partner support, and category-level distribution work across South Indian beverage channels.',
    timeline: [
      { year: 'Traveller', text: 'Built distribution momentum for the Traveller brand portfolio through strong route-to-market execution.' },
      { year: 'Old Cask', text: 'Supported Old Cask Rum through focused market coverage and disciplined partner coordination.' },
      { year: 'Haywards', text: 'Developed beer distribution strength across long-running regional trade channels.' },
      { year: '1997', text: 'Handled high-volume seasonal distribution programs with coordinated logistics and field execution.' },
    ],
  },
  faq: {
    image: '/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg',
    label: 'Quick answers',
    title: 'Built for trade teams who need the facts fast.',
    body:
      'The FAQ page focuses on manufacturing, facility location, owned brands, and how to start a practical discussion with NTS.',
    timeline: [
      { year: 'Brands', text: 'The current NTS portfolio includes Old Town, East Coast, and Wanted 999 product families.' },
      { year: 'Facility', text: 'The Goa plant is in Canacona Industrial Estate with NH 66 connectivity through the state highway.' },
      { year: 'Capacity', text: 'Current production capacity is listed at 75,000 cases per month.' },
      { year: 'Contact', text: 'Contact details are available for both management and plant-level discussions.' },
    ],
  },
  responsible: {
    image: '/images/bottle-sides.jpeg',
    label: 'Legal-age access',
    title: 'Alcohol content belongs behind age checks and responsible-use messaging.',
    body:
      'The website already uses an age gate. This page gives visitors a permanent responsible-drinking reference beyond the initial entry screen.',
    timeline: [
      { year: 'Age', text: 'Only visitors of legal drinking age should use the website.' },
      { year: 'Safety', text: 'Do not drink and drive or operate machinery after consuming alcohol.' },
      { year: 'Health', text: 'Avoid alcohol when pregnant, on medication, or advised not to drink.' },
      { year: 'Respect', text: 'Never pressure anyone to consume alcohol.' },
    ],
  },
  cookies: {
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.09_202607231334.jpeg',
    label: 'Browser storage',
    title: 'The age gate uses local browser storage to remember access.',
    body:
      'The policy is intentionally specific to how this React site behaves: age-gate confirmation can be stored in localStorage or sessionStorage depending on the visitor’s selection.',
    timeline: [
      { year: 'localStorage', text: 'Used when a visitor asks the site to remember age verification on the device.' },
      { year: 'sessionStorage', text: 'Used when verification should last only for the current browser session.' },
      { year: 'Control', text: 'Visitors can clear browser storage from their own browser settings.' },
      { year: 'No sale', text: 'The privacy page states that personal information is not sold.' },
    ],
  },
}

const pages = {
  about: {
    path: '/about',
    eyebrow: 'About NTS',
    title: 'Four decades in spirits.',
    intro:
      'From Pondicherry in 1980 to a Goa manufacturing base today, built on four decades of beverage trade experience.',
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.05_202607231329.jpeg',
    metaTitle: 'About NTS Distillers | NTS Blenders and Distillers',
    metaDescription: 'Learn about NTS Blenders and Distillers, founded in 1980 in Pondicherry with a Goa manufacturing facility and decades of Indian spirits distribution experience.',
    sections: [
      {
        heading: 'Founded in Pondicherry',
        body:
          'NTS began in Pondicherry in 1980 under Mr. N.T. Sambath, building its early strength through beverage trade relationships and local distribution.',
      },
      {
        heading: 'Built through distribution',
        body:
          'The business matured by handling major beverage portfolios across IMFL, beer, and imported labels, giving the team deep trade-route experience before expanding its own brands.',
      },
      {
        heading: 'Now manufacturing from Goa',
        body:
          'Today the operation is anchored by a Canacona Industrial Estate unit in Goa, built around controlled bottling, warehousing, and partner-ready production scale.',
      },
      {
        heading: 'Registered company record',
        body:
          'NTS Blenders and Distillers Private Limited is listed as an active company incorporated on 10 October 2022, with its registered address in Pondicherry.',
      },
    ],
    stats: [
      { value: '1980', label: 'Started as NTS Wines' },
      { value: '40+', label: 'Years in the beverage trade' },
      { value: 'Goa', label: 'Manufacturing base' },
      { value: 'Pondicherry', label: 'Origin market' },
    ],
  },
  contact: {
    path: '/contact',
    eyebrow: 'Contact',
    title: 'Let’s start a conversation.',
    intro:
      'Reach the NTS team for bottling, distribution, and product inquiries.',
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.16_202607231440.jpeg',
    metaTitle: 'Contact NTS Distillers | Trade and Manufacturing Inquiries',
    metaDescription: 'Contact NTS Blenders and Distillers for distribution, contract bottling, manufacturing, and product portfolio inquiries.',
    sections: [
      { heading: 'Managing director', body: `${companyFacts.email}` },
      { heading: 'Plant office', body: `${companyFacts.plantEmail}` },
      { heading: 'Public company email', body: `${companyFacts.publicEmail}` },
      { heading: 'Phone', body: `${companyFacts.phone} / ${companyFacts.alternatePhone}` },
      { heading: 'Facility', body: `${companyFacts.facility}` },
      { heading: 'Registered address', body: `${companyFacts.registeredAddress}` },
    ],
    actions: [
      { label: 'Email NTS', href: `mailto:${companyFacts.email}` },
      { label: 'Call now', href: 'tel:8925523801' },
    ],
  },
  distillery: {
    path: '/distillery',
    eyebrow: 'Goa Distillery',
    title: 'Built for precision at scale.',
    intro:
      'A three-acre facility in Canacona, Goa, built for bottling, quality checks, and bonded warehousing.',
    image: '/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg',
    metaTitle: 'Goa Distillery Facility | NTS Blenders and Distillers',
    metaDescription: 'Explore the NTS Goa facility in Canacona with bottling capacity, bonded warehousing, quality checks, and production machinery.',
    sections: [
      {
        heading: 'Current capacity',
        body:
          'The current setup supports 75,000 cases of monthly production capacity and a 25,000-case bonded warehouse.',
      },
      {
        heading: 'Expansion plan',
        body:
          'The planned expansion increases monthly production capacity to 2,50,000 cases and warehouse capacity to 60,000 cases.',
      },
      {
        heading: 'Machinery base',
        body: 'The line covers rotary washing, 8-head vacuum filling, ROPP and Guala cap sealing, inspection, labelling, printing, conveying, and packing.',
      },
    ],
    stats: facilityStats,
  },
  responsible: {
    path: '/responsible-drinking',
    eyebrow: 'Responsible Drinking',
    title: 'Please drink responsibly.',
    intro:
      'This website and its product information are intended only for visitors of legal drinking age.',
    image: '/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg',
    metaTitle: 'Responsible Drinking | NTS Distillers',
    metaDescription: 'Responsible drinking guidance and alcohol-age reminder from NTS Blenders and Distillers.',
    sections: [
      { heading: 'Legal age only', body: 'Do not enter or use this website if you are below the legal drinking age in your country, state, or region.' },
      { heading: 'Moderation matters', body: 'Alcohol should be consumed moderately. Never drink and drive, and never pressure others to consume alcohol.' },
      { heading: 'Health and safety', body: 'Avoid alcohol if pregnant, on medication, operating machinery, or advised by a health professional not to drink.' },
    ],
  },
  cookies: {
    path: '/cookie-policy',
    eyebrow: 'Cookie Policy',
    title: 'Our cookie policy.',
    intro:
      'How the NTS website uses browser storage for age verification and performance.',
    image: '/images/bottle-sides.jpeg',
    metaTitle: 'Cookie Policy | NTS Distillers',
    metaDescription: 'Cookie and browser storage policy for the NTS Distillers website.',
    sections: [
      { heading: 'Age-gate storage', body: 'When you verify your age, the site may save your confirmation in local storage or session storage so you do not need to repeat the check during the same visit or device session.' },
      { heading: 'Preferences and performance', body: 'The site may use browser-side information to support preferences, page behavior, form state, and performance improvements.' },
      { heading: 'Your control', body: 'You can clear cookies, local storage, and session storage from your browser settings at any time.' },
    ],
  },
  faq: {
    path: '/faq',
    eyebrow: 'FAQ',
    title: 'Quick answers for trade teams.',
    intro:
      'Common questions on our portfolio, facility, and how to start a conversation.',
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.13_202607231334.jpeg',
    metaTitle: 'FAQ | NTS Distillers',
    metaDescription: 'Frequently asked questions about NTS Distillers products, manufacturing, distribution, and partnership inquiries.',
    sections: [
      { heading: 'Does NTS manufacture its own brands?', body: 'Yes. The NTS portfolio includes Old Town, East Coast, and Wanted 999 labels across whisky, brandy, and rum categories.' },
      { heading: 'Does NTS support contract bottling?', body: 'Yes. The contact flow is intended for manufacturing tie-ups, private label discussions, distribution, and trade collaboration.' },
      { heading: 'Where is the facility located?', body: 'The Goa unit is located in Canacona Industrial Estate with road connectivity for production and distribution movement.' },
      { heading: 'How do I request product or trade details?', body: `Use the contact page or email ${companyFacts.email}. For plant-specific queries, use ${companyFacts.plantEmail}.` },
    ],
  },
  achievements: {
    path: '/achievements',
    eyebrow: 'Achievements',
    title: 'Milestones that built our name.',
    intro:
      'A long operating history shaped by distribution relationships and disciplined trade execution.',
    image: '/banner/ChatGPT Image Aug 17, 2026, 12_50_01 PM.png',
    metaTitle: 'Achievements | NTS Distillers',
    metaDescription: 'Distribution achievements and operating milestones from NTS Distillers.',
    sections: [
      {
        heading: 'Market building',
        body:
          'NTS has supported spirits and beer portfolios through regional distribution, trade coordination, and route-to-market development.',
      },
      {
        heading: 'Portfolio support',
        body:
          'The company experience spans multiple beverage categories, helping brands move from portfolio planning to practical market coverage.',
      },
      {
        heading: 'Operating standard',
        body:
          'The same operating discipline now supports NTS-owned labels, contract bottling conversations, and facility-led production planning.',
      },
    ],
    actions: [
      { label: 'Discuss partnership', href: '/contact' },
      { label: 'View products', href: '/products' },
    ],
  },
}

function PageLayout({ page, fallback }) {
  const content = pages[page] || fallback
  const expansion = expansionData[page]

  useEffect(() => {
    setPageSeo(getSeoRoute(content.path) || {
      title: content.metaTitle,
      description: content.metaDescription,
      path: content.path,
      robots: 'noindex, follow',
    })
  }, [content, page])

  return (
    <div className={`content-page ${page ? `content-page--${page}` : 'content-page--fallback'}`}>
      <AgeGate />
      <SiteHeader current={content.path} />
      <main id="main">
        <section className="content-page__hero">
          <div className="content-page__hero-media" data-parallax-speed="-0.1" data-parallax-scale="1.06" aria-hidden="true">
            <img src={content.image} alt="" loading="eager" decoding="async" />
          </div>
          <div className="content-page__hero-copy">
            <p>{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <span>{content.intro}</span>
          </div>
        </section>

        {content.stats && (
          <section className="content-page__stats" aria-label={`${content.eyebrow} facts`}>
            {content.stats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </section>
        )}

        {expansion && (
          <section className={`content-page__expansion content-page__expansion--${page}`}>
            <div className="content-page__expansion-copy">
              <p>{expansion.label}</p>
              <h2>{expansion.title}</h2>
              <span>{expansion.body}</span>
            </div>
            <div className="content-page__timeline">
              {expansion.timeline.map((item) => (
                <article key={`${item.year}-${item.text}`}>
                  <strong className={page === 'achievements' ? 'bebas-neue-regular' : undefined}>{item.year}</strong>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={`content-page__body content-page__body--${page}`}>
          {content.sections.map((section) => (
            <article key={section.heading} className="content-page__panel">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        {content.actions && (
          <section className="content-page__actions" aria-label="Page actions">
            {content.actions.map((action) => (
              <a key={action.href} href={action.href}>
                {action.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </section>
        )}
      </main>
      <FooterRedesign />
    </div>
  )
}

export function ContentPage({ page }) {
  return <PageLayout page={page} />
}

export function ProductDetailPage({ slug }) {
  const product = productCollectionItems.find((item) => item.slug === slug)
  const relatedProducts = product
    ? productCollectionItems.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3)
    : []

  useEffect(() => {
    if (product) {
      setPageSeo(getProductSeoRoute(product.slug))
    }
  }, [product])

  if (!product) {
    return <NotFoundPage />
  }

  return (
    <div className="content-page product-detail-page">
      <AgeGate />
      <SiteHeader current="/products" />
      <main id="main">
        <section className="product-detail-hero">
          <div className={`product-detail-hero__image ${product.fit ? `product-detail-hero__image--${product.fit}` : ''}`}>
            <img src={product.image} alt={`${product.name} bottle`} loading="eager" decoding="async" />
          </div>
          <div className="product-detail-hero__copy">
            <p>{product.category}</p>
            <h1>{product.name}</h1>
            <span>{product.profile}</span>
            <div className="product-detail-hero__facts">
              <article><strong>{product.abv}</strong><span>Specification</span></article>
              <article><strong>{product.bottleSize}</strong><span>Pack</span></article>
              <article><strong>{product.category}</strong><span>Category</span></article>
            </div>
            <div className="product-detail-hero__notes">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p>{product.tastingNotes}</p>
            </div>
            <div className="product-detail-hero__actions">
              <a href="/contact">
                Request trade details
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="tel:8925523801">
                Call NTS
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="product-related" aria-label={`More ${product.category} products`}>
            <div className="product-related__header">
              <p>Same category</p>
              <h2>Continue through the {product.category} range.</h2>
            </div>
            <div className="product-related__grid">
              {relatedProducts.map((item) => (
                <a key={item.slug} href={`/products/${item.slug}`} className={`product-related__card ${item.fit ? `product-related__card--${item.fit}` : ''}`}>
                  <span>{item.category}</span>
                  <img src={item.image} alt={`${item.name} bottle`} loading="lazy" decoding="async" />
                  <strong>{item.name}</strong>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <FooterRedesign />
    </div>
  )
}

export function NotFoundPage() {
  const content = {
    path: '/404',
    eyebrow: '404',
    title: 'This page has not been bottled yet.',
    intro: 'The address may be wrong or the page may have moved. Head back to the product collection or start from the home page.',
    image: '/images/WhatsApp_Image_2026-07-23_at_12.21.16_202607231334.jpeg',
    metaTitle: 'Page Not Found | NTS Distillers',
    metaDescription: 'The requested NTS Distillers page could not be found.',
    sections: [
      { heading: 'Try products', body: 'Browse the current NTS house portfolio across whisky, brandy, and rum.' },
      { heading: 'Need help?', body: `Contact ${companyFacts.email} or call ${companyFacts.phone} for trade and website assistance.` },
    ],
    actions: [
      { label: 'Go home', href: '/' },
      { label: 'View products', href: '/products' },
    ],
  }

  return <PageLayout fallback={content} />
}

export default pages
