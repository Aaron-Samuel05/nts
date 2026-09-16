import React, { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AgeGate from './AgeGate'
import FooterRedesign from './FooterRedesign'
import SiteHeader from './SiteHeader'
import { productCategoryFilters, productCollectionHeroImage, productCollectionItems } from '../data/siteData'
import { setPageSeo } from '../lib/seo'
import { getSeoRoute } from '../data/seoRoutes'

function ProductPageHeader() {
  return <SiteHeader current="/products" />
}

function ComingSoonCard({ item }) {
  return (
    <div className="collection-product-card__coming-card" aria-label={`${item.name} coming soon`}>
      Coming Soon
    </div>
  )
}

function ProductCard({ item, index }) {
  const isComingSoon = item.comingSoon

  return (
    <article
      className={`collection-product-card ${item.fit ? `collection-product-card--${item.fit}` : ''} ${isComingSoon ? 'collection-product-card--coming-soon' : ''}`}
      style={{
        '--collection-bottle-scale': item.collectionScale || 1,
        '--collection-bottle-y': item.collectionY || '0px',
      }}
    >
      <div className="collection-product-card__image">
        <img src={item.image} alt={`${item.name} bottle`} loading={index < 6 ? 'eager' : 'lazy'} />
      </div>
      <div className="collection-product-card__copy">
        <h2>{item.brandName || item.name}</h2>
        <p>{item.productText || item.detail}</p>
        {isComingSoon ? (
          <ComingSoonCard item={item} />
        ) : (
          <a href={`/products/${item.slug}`}>
            Learn More
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

function ComingSoonMarquee() {
  const line = 'COMING SOON • NEW RELEASES • NTS DISTILLERS •'

  return (
    <section className="collection-coming-marquee" aria-label="Coming soon releases">
      <div className="collection-coming-marquee__track" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
      <span className="sr-only">Coming soon, new releases, NTS Distillers.</span>
    </section>
  )
}

function getProductGridClass(products) {
  return `collection-product-grid collection-product-grid--balanced collection-product-grid--remainder-${products.length % 3}`
}

export default function ProductCollectionPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    setPageSeo(getSeoRoute('/products'))
  }, [])

  const availableProducts = useMemo(() => productCollectionItems.filter((item) => !item.comingSoon), [])
  const comingSoonProducts = useMemo(() => productCollectionItems.filter((item) => item.comingSoon), [])

  const filteredAvailableProducts = useMemo(() => {
    if (activeCategory === 'All') return availableProducts
    return availableProducts.filter((item) => item.category === activeCategory)
  }, [activeCategory, availableProducts])

  return (
    <div className="product-collection-page">
      <AgeGate />
      <ProductPageHeader />

      <main id="main">
        <section className="collection-hero" aria-labelledby="collection-title">
          <div className="collection-hero__media" data-parallax-speed="-0.1" data-parallax-scale="1.05" aria-hidden="true">
            <figure>
              <img src={productCollectionHeroImage} alt="" loading="eager" decoding="async" />
            </figure>
          </div>

          <div className="collection-hero__copy">
            <p>Proprietary Collection</p>
            <h1 id="collection-title">NTS Product Collection</h1>
          </div>
        </section>

        <section className="collection-grid-section" aria-label="All NTS bottles">
          <div className="collection-grid-section__intro">
            <p>All bottles</p>
            <h2>Browse every label as a clear shelf-ready collection.</h2>
            <div className="collection-filter" aria-label="Filter products by category">
              {productCategoryFilters.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? 'is-active' : ''}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredAvailableProducts.length > 0 ? (
            <div className={getProductGridClass(filteredAvailableProducts)} aria-label="Available products">
              {filteredAvailableProducts.map((item, index) => (
                <ProductCard key={item.slug} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="collection-empty-state">
              <p>No available {activeCategory.toLowerCase()} labels in the current collection.</p>
            </div>
          )}
        </section>

        <ComingSoonMarquee />

        {comingSoonProducts.length > 0 && (
          <section className="collection-upcoming-section" aria-labelledby="coming-soon-title">
            <div className="collection-upcoming-section__intro">
              <p>Coming Soon</p>
              <span aria-hidden="true" />
              <h2 id="coming-soon-title">The Next Releases From NTS.</h2>
            </div>

            <figure className="collection-upcoming-section__mobile-art">
              <img src="/images/canacona-vodka-mobile.png" alt="Canacona vodka collection" loading="lazy" />
            </figure>

            <p className="collection-upcoming-section__mobile-status">Coming Soon</p>

            <div className="collection-product-grid collection-product-grid--upcoming" aria-label="Coming soon products">
              {comingSoonProducts.map((item, index) => (
                <ProductCard key={item.slug} item={item} index={availableProducts.length + index} />
              ))}
            </div>
          </section>
        )}

        <section className="collection-visit-section">
          <div className="collection-visit-section__copy">
            <p>Goa distillery</p>
            <h2>Built for bottling, warehousing, and export scale.</h2>
            <a href="/distillery">View Facility</a>
          </div>
        </section>
      </main>

      <FooterRedesign />
    </div>
  )
}
