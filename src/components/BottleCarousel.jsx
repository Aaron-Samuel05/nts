import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BottleTrack } from './carousel/BottleTrack'
import { BOTTLE_ITEMS } from './carousel/items'

const COUNT = BOTTLE_ITEMS.length

// Fixed dark atmosphere for the stage — the diagonal rail carries the motion,
// so the background stays still rather than crossfading per bottle.
const STAGE_TONES = {
  '--tone-1': '#0b0b0d',
  '--tone-2': '#17181c',
  '--tone-3': '#242018',
  '--accent': '#E9542E',
}

export default function BottleCarousel({ onSelectProduct }) {
  const [active, setActive] = useState(BOTTLE_ITEMS[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)

  const handleCenterChange = (item, index) => {
    setActive(item)
    setActiveIndex(index)
  }

  const handleViewDetails = () => {
    const product = active?.product
    if (!product) return
    onSelectProduct?.({
      name: product.name,
      category: product.category,
      style: product.productText,
      abv: product.abv,
      description: product.profile || product.tastingNotes,
      image: product.image,
    })
  }

  return (
    <section
      id="flavors"
      data-od-id="bottle-carousel"
      className="relative w-full overflow-hidden select-none border-t border-white/10"
    >
      <div className="spirit-stage relative w-full" style={{ height: '100svh', minHeight: 660, overflow: 'hidden', ...STAGE_TONES }}>
        <div className="spirit-stage-bg" />
        <div className="spirit-stage-vignette" style={{ zIndex: 45 }} />

        {/* Section eyebrow */}
        <div className="absolute top-6 left-4 sm:left-8 z-[60]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/85">
            Proprietary Distillation
          </span>
        </div>

        {/* Giant centered headline */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none font-serif px-4"
          style={{ top: '13%', zIndex: 2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={active?.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="uppercase text-white text-center block"
              style={{
                fontSize: 'clamp(44px, 12vw, 210px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {active?.product?.productText}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Diagonal bottle rail */}
        <div className="absolute inset-0" style={{ zIndex: 20 }}>
          <BottleTrack trackRef={trackRef} onCenterChange={handleCenterChange} />
        </div>

        {/* Bottom-left: active spirit + nav */}
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10" style={{ zIndex: 60, maxWidth: 340 }}>
          <p
            className="font-serif uppercase text-white mb-1 sm:mb-2"
            style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 900, letterSpacing: '0.01em' }}
          >
            {active?.product?.brandName}
          </p>
          <p className="text-white/85 mb-2 sm:mb-3" style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', fontWeight: 700 }}>
            {active?.product?.productText}
          </p>
          <p className="hidden sm:block text-white/80 mb-5" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
            {active?.product?.profile || active?.product?.tastingNotes}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => trackRef.current?.advance(-1)}
              aria-label="Previous spirit"
              className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-150 hover:scale-[1.08] hover:border-accent hover:bg-accent/15"
            >
              <ArrowLeft size={20} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => trackRef.current?.advance(1)}
              aria-label="Next spirit"
              className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-150 hover:scale-[1.08] hover:border-accent hover:bg-accent/15"
            >
              <ArrowRight size={20} strokeWidth={2.25} />
            </button>
            <span className="font-mono text-[11px] text-white/60 ml-1">
              {String(activeIndex + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Bottom-right: view details */}
        <button
          type="button"
          onClick={handleViewDetails}
          className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 flex items-center gap-2 font-serif uppercase text-white group"
          style={{ zIndex: 60, fontSize: 'clamp(15px, 2.4vw, 32px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          <span className="opacity-95 transition-opacity duration-200 group-hover:opacity-100">View details</span>
          <ArrowRight
            className="h-4 w-4 sm:h-7 sm:w-7 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </button>
      </div>
    </section>
  )
}
