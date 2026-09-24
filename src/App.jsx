import React, { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import AgeGate from './components/AgeGate'
import Newsletter from './components/Newsletter'
import CategoryMarquee from './components/CategoryMarquee'
import FooterRedesign from './components/FooterRedesign'
import RibbonShowcase from './components/RibbonShowcase'
import AboutUs from './components/AboutUs'
import HomeProofSection from './components/HomeProofSection'
import BannerSection from './components/BannerSection'
import AnnouncementMarquee from './components/layout/AnnouncementMarquee'
import ProductModal from './components/product/ProductModal'
import SpiritCarousel from './components/SpiritCarousel'
import ClipReveal from './components/motion/ClipReveal'
import PageLoader from './components/motion/PageLoader'
import Reveal from './components/motion/Reveal'
import { ContentPage, NotFoundPage, ProductDetailPage } from './components/ContentPage'
import { setPageSeo } from './lib/seo'
import { getSeoRoute } from './data/seoRoutes'

const ProductCollectionPage = lazy(() => import('./components/ProductCollectionPage'))
const LegalPage = lazy(() => import('./components/LegalPage'))

function useSmoothParallax() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    let frame = 0

    const update = () => {
      frame = 0
      const viewportHeight = window.innerHeight || 1
      const layers = document.querySelectorAll('[data-parallax-speed]')

      layers.forEach((layer) => {
        const rect = layer.getBoundingClientRect()
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return

        const speed = Number(layer.getAttribute('data-parallax-speed') || 0)
        const scale = layer.getAttribute('data-parallax-scale') || '1'
        const midpointOffset = rect.top + rect.height / 2 - viewportHeight / 2
        const y = midpointOffset * speed

        layer.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale})`
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])
}

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Menu toggle helper
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    setPageSeo(getSeoRoute('/'))
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  // Reveal observer
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
  }, [])

  return (
    <div className="bg-bg text-fg antialiased selection:bg-accent selection:text-ink">
      <PageLoader />
      <AgeGate />

      <a className="skip-link" href="#main">Skip to content</a>

      {/* Top Announcement Marquee Ticker & Navbar Header */}
      <div className="home-header-shell sticky top-0 z-50 shadow-md">
        <AnnouncementMarquee />
        
        {/* Full-width Navbar Header */}
        <header className="site-nav px-4 py-3 sm:px-8 sm:py-3.5 lg:px-12" id="site-nav" data-od-id="site-navigation">
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
            {/* Logo Seal & Serif Title */}
            <a className="group flex items-center gap-3 text-decoration-none" href="#top" aria-label="NTS Distillers home" data-od-id="wordmark">
              <div className="nav-logo-seal nav-logo-seal--home transition-transform duration-300 group-hover:scale-105">
                <img src="/logo.png" alt="NTS Seal" />
              </div>
              <span className="brand-wordmark text-lg text-white transition-colors group-hover:text-[#E9542E] sm:text-xl md:text-2xl">
                NTS DISTILLERS
              </span>
            </a>

            <nav className="home-reference-nav" aria-label="Hero quick links">
              <a href="/distillery">Goa manufacturing facility</a>
              <a href="/contact">Contract bottling</a>
              <a href="/products">Private label spirits</a>
            </nav>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-5 xl:flex 2xl:gap-8" aria-label="Main Navigation">
              <a href="#flavors" className="nav-link text-[11px] text-white/85 transition-colors hover:text-[#E9542E]">
                BRANDS
              </a>
              <a href="/products" className="nav-link text-[11px] text-white/85 transition-colors hover:text-[#E9542E]">
                PRODUCTS
              </a>
              <a href="/distillery" className="nav-link text-[11px] text-white/85 transition-colors hover:text-[#E9542E]">
                DISTILLERY
              </a>
              <a href="/about" className="nav-link text-[11px] text-white/85 transition-colors hover:text-[#E9542E]">
                ABOUT US
              </a>
              <a href="/achievements" className="nav-link text-[11px] text-white/85 transition-colors hover:text-[#E9542E]">
                ACHIEVEMENTS
              </a>
              <a href="/contact" className="nav-link rounded-full bg-[#E9542E] px-4 py-2 text-[11px] text-white transition-all hover:bg-white hover:text-[#030303]">
                CONTACT
              </a>
            </nav>

            {/* Mobile Navigation Trigger Button */}
            <button
              className="menu-trigger xl:hidden text-white"
              id="menu-trigger"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="menu-panel"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
              data-od-id="menu-control"
            >
              <span className="menu-lines" aria-hidden="true"></span>
            </button>
          </div>
        </header>
      </div>

      {/* Fullscreen Mobile Navigation Menu Overlay */}
      <div 
        className={`menu-panel fixed inset-0 z-50 flex items-center justify-center bg-[#030303]/98 backdrop-blur-xl transition-all duration-300 ${
          isMenuOpen ? 'open opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`} 
        id="menu-panel" 
        aria-hidden={!isMenuOpen} 
        data-od-id="menu-panel"
      >
        <button
          type="button"
          onClick={closeMenu}
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#E9542E]"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
        <nav className="flex flex-col items-center gap-6 text-center" aria-label="Mobile menu">
          <a href="/" onClick={closeMenu} className="font-serif text-3xl font-black uppercase text-white hover:text-[#E9542E]">HOME</a>
          <a href="/products" onClick={closeMenu} className="font-serif text-3xl font-black uppercase text-white hover:text-[#E9542E]">PRODUCTS</a>
          <a href="/about" onClick={closeMenu} className="font-serif text-3xl font-black uppercase text-white hover:text-[#E9542E]">ABOUT US</a>
          <a href="/distillery" onClick={closeMenu} className="font-serif text-3xl font-black uppercase text-white hover:text-[#E9542E]">DISTILLERY</a>
          <a href="/achievements" onClick={closeMenu} className="font-serif text-3xl font-black uppercase text-white hover:text-[#E9542E]">ACHIEVEMENTS</a>
          <a href="/contact" onClick={closeMenu} className="font-serif text-3xl font-black uppercase text-white hover:text-[#E9542E]">CONTACT</a>
          <a href="/contact" onClick={closeMenu} className="nav-link mt-4 rounded-full bg-[#E9542E] px-8 py-3 text-sm text-white hover:bg-white hover:text-[#030303]">CONTACT NTS</a>
        </nav>
      </div>

      <main id="main">
        {/* Section 1: Hero Section Banner Carousel */}
        <BannerSection />

        {/* Category Orange Marquee Ticker */}
        <CategoryMarquee />

        {/* Section 3: Spirits Lineup Showcase (Character-carousel style spirit picker) */}
        <SpiritCarousel />

        {/* Section 4: Unified About Us (Our Story + 40-Year Timeline) */}
        <AboutUs />

        {/* Section 5: Goa Distillery Facility & Manufacturing Scale */}
        <section
          id="legacy"
          className="legacy-facility-section relative flex min-h-[720px] items-center overflow-hidden bg-cover bg-[position:left_center] bg-no-repeat py-16 sm:py-24 lg:min-h-[780px]"
          style={{
            '--legacy-facility-bg-desktop': "url('/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg')",
            '--legacy-facility-bg-mobile': "url('/images/canacona-vodka-mobile.png')",
          }}
          data-od-id="distillery-facility-section"
        >
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />

          <div className="container relative z-10 mx-auto w-full max-w-[1540px] px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
              {/* Left Column Spacer (Ample width so Kiwi, Apple, and Orange bottles with fruit garnishes are 100% visible) */}
              <div className="hidden min-h-[500px] lg:block lg:col-span-7 xl:col-span-7 2xl:col-span-7" />

              {/* Right Column: Goa Facility Card */}
              <ClipReveal className="legacy-facility-card premium-panel space-y-4 rounded-[2.5rem] bg-white p-7 text-[#050505] shadow-2xl sm:p-9 lg:col-span-5 xl:col-span-5 2xl:col-span-5 lg:p-10">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E9542E]">
                    CANACONA, GOA • MANUFACTURING FACILITY
                  </span>
                  <Reveal as="h2" delay={0.25} className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-black uppercase leading-[1.05] tracking-tight text-[#050505]">
                    Built for Clean, Controlled Production
                  </Reveal>
                </div>

                <div className="space-y-2.5 font-sans text-xs sm:text-[12.5px] font-medium leading-relaxed text-[#050505]/85">
                  <Reveal as="p" delay={0.35}>
                    NTS operates from a three-acre unit in Canacona Industrial Estate, Goa, with green surroundings and road access through a state highway connected to NH 66.
                  </Reveal>
                  <Reveal as="p" delay={0.45}>
                    The facility is planned around disciplined throughput: 75,000 cases of monthly production capacity and a bonded warehouse built for 25,000 cases.
                  </Reveal>
                  <Reveal as="p" delay={0.55}>
                    Rotary washers, 8-head vacuum fillers, ROPP and Guala cap systems, inspection units, labelling, printing, conveyors, rejection tanks, packing support, and an R&D lab keep the line practical, traceable, and quality-focused.
                  </Reveal>
                  <Reveal as="p" delay={0.65} className="border-l-2 border-[#E9542E] pl-3 text-[#050505] font-semibold text-[11.5px] sm:text-xs">
                    The next phase raises the ceiling further toward 2,50,000 cases of monthly production capacity.
                  </Reveal>
                </div>

              </ClipReveal>
            </div>
          </div>
        </section>

        {/* Section 7: Capabilities & Heritage Ribbons */}
        <section className="relative overflow-hidden bg-[#030303] text-white py-16 sm:py-20 border-t border-white/10" id="advantages" data-od-id="advantages">
          <div className="relative z-10 w-full">
            <RibbonShowcase />
          </div>
        </section>

        {/* Structured operating proof before Partner Notes */}
        <HomeProofSection />

        {/* Section 8: Partner notes and contact capture */}
        <Newsletter />
      </main>

      {/* Section 10: Footer Component */}
      <FooterRedesign />

      {/* Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  useSmoothParallax()

  const path = window.location.pathname

  if (path === '/products') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#030303]" />}>
        <ProductCollectionPage />
      </Suspense>
    )
  }

  if (path.startsWith('/products/')) {
    return <ProductDetailPage slug={decodeURIComponent(path.replace('/products/', ''))} />
  }

  if (path === '/terms') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#030303]" />}>
        <LegalPage page="terms" />
      </Suspense>
    )
  }

  if (path === '/privacy') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#030303]" />}>
        <LegalPage page="privacy" />
      </Suspense>
    )
  }

  const contentRoutes = {
    '/about': 'about',
    '/contact': 'contact',
    '/distillery': 'distillery',
    '/responsible-drinking': 'responsible',
    '/cookie-policy': 'cookies',
    '/faq': 'faq',
    '/achievements': 'achievements',
  }

  if (contentRoutes[path]) {
    return <ContentPage page={contentRoutes[path]} />
  }

  if (path !== '/') {
    return <NotFoundPage />
  }

  return <HomePage />
}
