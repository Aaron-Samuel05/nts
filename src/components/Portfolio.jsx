import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const portfolioModels = [
  {
    tag: 'WHISKY',
    brandName: 'OLD TOWN',
    productText: 'Indian Blended Malt Whisky',
    name: 'OLD TOWN Indian Blended Malt Whisky',
    desc: 'Indian blended malt whisky in the NTS owned semi-premium portfolio.',
    image: '/portfolio-images/old-town.png',
  },
  {
    tag: 'WHISKY',
    brandName: 'EAST COAST',
    productText: 'Premium Malt Whisky',
    name: 'EAST COAST Premium Malt Whisky',
    desc: 'Premium malt whisky expression in the East Coast range.',
    image: '/portfolio-images/east-coast-premium-malt-whisky.png',
  },
  {
    tag: 'RUM',
    brandName: 'EAST COAST',
    productText: 'xxx Rum',
    name: 'EAST COAST xxx Rum',
    desc: 'Bold rum expression with a clear East Coast identity.',
    image: '/portfolio-images/east-coast-xxx-rum.png',
  },
  {
    tag: 'BRANDY',
    brandName: 'EAST COAST',
    productText: 'Indian Blended Brandy',
    name: 'EAST COAST Indian Blended Brandy',
    desc: 'Indian blended brandy expression in the East Coast range.',
    image: '/portfolio-images/east-coast-indian-blended-brandy.png',
  },
  {
    tag: 'BRANDY',
    brandName: 'WANTED 999',
    productText: 'Vsop Brandy',
    name: 'WANTED 999 Vsop Brandy',
    desc: 'VSOP brandy with strong shelf recognition.',
    image: '/portfolio-images/wanted.png',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function Badge({ children }) {
  return (
    <span className="inline-flex self-start rounded-full border border-[#E9542E]/30 bg-[#E9542E]/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#E9542E] transition-transform duration-300 hover:-translate-y-0.5">
      {children}
    </span>
  )
}

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimer = useRef(null)
  const wheelLock = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const total = portfolioModels.length
  const spring = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 220, damping: 24 }

  const normalizeIndex = useCallback((index) => ((index % total) + total) % total, [total])

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true)
    if (pauseTimer.current) {
      window.clearTimeout(pauseTimer.current)
    }
    pauseTimer.current = window.setTimeout(() => setIsPaused(false), 3000)
  }, [])

  const moveCarousel = useCallback((direction, userInitiated = true) => {
    if (userInitiated) pauseAutoplay()
    setActiveIndex((current) => normalizeIndex(current + direction))
  }, [normalizeIndex, pauseAutoplay])

  useEffect(() => {
    if (isPaused || activeIndex === 0) return undefined
    const timer = window.setInterval(() => moveCarousel(1, false), 4000)
    return () => window.clearInterval(timer)
  }, [activeIndex, isPaused, moveCarousel])

  useEffect(() => () => {
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
  }, [])

  const visibleCards = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((offset) => {
      const modelIndex = normalizeIndex(activeIndex + offset)
      return { model: portfolioModels[modelIndex], modelIndex, offset }
    })
  }, [activeIndex, normalizeIndex])

  const handleWheel = (event) => {
    if (wheelLock.current) return
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (Math.abs(delta) < 18) return
    wheelLock.current = true
    moveCarousel(delta > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 650)
  }

  const handleDragEnd = (_, info) => {
    const intent = info.offset.x + info.velocity.x * 0.18
    if (intent < -70) moveCarousel(1)
    if (intent > 70) moveCarousel(-1)
  }

  return (
    <section
      id="portfolio-carousel"
      className="relative overflow-hidden bg-[#050505] px-4 py-[88px] text-cream md:px-8 md:py-[120px] select-none"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="NTS spirits portfolio carousel"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') moveCarousel(1)
        if (event.key === 'ArrowLeft') moveCarousel(-1)
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(0,0,0,0))]" />
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="relative mx-auto max-w-[1280px] text-center flex flex-col items-center">
        <Badge>Portfolio</Badge>
        <h2 className="mx-auto mt-5 max-w-2xl text-[34px] md:text-[48px] font-bold leading-tight tracking-normal text-cream font-serif uppercase">
          Proprietary labels with a house standard.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/68 font-sans">
          A focused look at NTS-owned spirits, from flagship malt whisky to brandy and rum expressions.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="relative mx-auto mt-14 h-[620px] max-w-[1280px] outline-none md:h-[660px]"
        onWheel={handleWheel}
        onMouseEnter={pauseAutoplay}
        onTouchStart={pauseAutoplay}
      >
        <motion.div
          className="absolute inset-0 touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={pauseAutoplay}
          onDragEnd={handleDragEnd}
        >
          {visibleCards.map(({ model, modelIndex, offset }) => {
            const isActive = offset === 0
            const distance = Math.abs(offset)
            const x = `calc(-50% + ${offset * 444}px)`
            return (
              <motion.article
                key={modelIndex}
                aria-hidden={!isActive}
                aria-label={`${model.name}, ${model.tag}. ${model.desc}`}
                className={`group absolute left-1/2 top-0 flex h-[540px] w-[min(420px,calc(100vw-40px))] select-none flex-col rounded-2xl border border-[#FFFFFF]/25 bg-[#FFFFFF] p-5 text-maroon will-change-transform md:h-[580px] ${
                  isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                }`}
                initial={false}
                animate={{
                  x,
                  scale: isActive ? 1 : distance === 1 ? 0.9 : 0.82,
                  opacity: isActive ? 1 : distance === 1 ? 0.75 : 0,
                  filter: isActive ? 'blur(0px)' : distance === 1 ? 'blur(1.2px)' : 'blur(3px)',
                  zIndex: isActive ? 30 : distance === 1 ? 20 : 10,
                  boxShadow: isActive
                    ? '0 34px 90px rgba(0,0,0,0.46)'
                    : '0 18px 44px rgba(0,0,0,0.26)',
                }}
                whileHover={isActive ? { y: -6, scale: 1.03 } : { y: -3 }}
                transition={spring}
              >
                <span className="inline-flex w-fit rounded-full bg-maroon px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream font-mono">
                  {model.tag}
                </span>
                <div className="mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-maroon/10 bg-[linear-gradient(145deg,#ffffff,#f2f2f2)]">
                  <img
                    src={model.image}
                    alt={`${model.name} bottle`}
                    loading={isActive ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-full scale-[1.22] object-contain drop-shadow-[0_28px_32px_rgba(0,0,0,0.22)] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.28]"
                  />
                </div>
                <div className="pt-6 text-left">
                  <h3 className="text-2xl font-serif font-bold uppercase tracking-normal text-maroon">{model.brandName || model.name}</h3>
                  {model.productText && <p className="mt-1 text-sm font-sans font-black leading-tight text-maroon">{model.productText}</p>}
                  <p className="mt-3 max-w-sm text-sm font-sans leading-[1.7] text-maroon/72">{model.desc}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          className="absolute left-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cream/40 hover:bg-cream/20 focus:outline-none focus:ring-2 focus:ring-[#E9542E] md:left-6"
          aria-label="Previous portfolio item"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          className="absolute right-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cream/40 hover:bg-cream/20 focus:outline-none focus:ring-2 focus:ring-[#E9542E] md:right-6"
          aria-label="Next portfolio item"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      <div className="mx-auto mt-2 flex max-w-[1280px] items-center justify-center gap-2" aria-label={`Portfolio item ${activeIndex + 1} of ${total}`}>
        {portfolioModels.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              pauseAutoplay()
              setActiveIndex(index)
            }}
            className="group h-5 rounded-full px-0.5 focus:outline-none focus:ring-2 focus:ring-[#E9542E]"
            aria-label={`Show ${item.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-10 bg-[#E9542E]' : 'w-5 bg-cream/25 group-hover:bg-cream/50'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}
