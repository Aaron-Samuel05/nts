import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { LOADER_PENDING, markLoaderSeen } from './pageReady'

const MIN_MS = 900
const CAP_MS = 3500

const heroSrc = () =>
  window.matchMedia('(max-width: 1100px)').matches
    ? '/banner/east-coast-bottle-lineup-hero-mobile.webp'
    : '/banner/east-coast-bottle-lineup-hero-desktop.webp'

const decodeHero = () => {
  const img = new Image()
  img.src = heroSrc()
  return img.decode().catch(() => {})
}

// First visit of a session, homepage only: a percentage counter driven by the
// real work (fonts + hero image) with a minimum time and a hard cap, then a
// clip-path wipe upward that hands over to the page reveals.
export default function PageLoader() {
  const [visible, setVisible] = useState(LOADER_PENDING)
  const panelRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (!LOADER_PENDING) return undefined
    document.body.style.overflow = 'hidden'

    const state = { value: 0 }
    const paint = () => {
      const rounded = Math.round(state.value)
      if (countRef.current) countRef.current.textContent = String(rounded).padStart(3, '0')
      if (barRef.current) barRef.current.style.transform = `scaleX(${state.value / 100})`
    }

    let cancelled = false
    let exitTween
    const creep = gsap.to(state, { value: 90, duration: 2.4, ease: 'power1.out', onUpdate: paint })

    const work = Promise.all([document.fonts?.ready, decodeHero(), new Promise((resolve) => setTimeout(resolve, MIN_MS))])
    const cap = new Promise((resolve) => setTimeout(resolve, CAP_MS))

    Promise.race([work, cap]).then(() => {
      if (cancelled) return
      creep.kill()
      exitTween = gsap
        .timeline()
        .to(state, { value: 100, duration: 0.35, ease: 'power2.out', onUpdate: paint })
        .to(panelRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'power3.inOut' }, '+=0.15')
        .call(markLoaderSeen, [], '>-0.45')
        .call(() => {
          document.body.style.overflow = ''
          setVisible(false)
        })
    })

    return () => {
      cancelled = true
      creep.kill()
      exitTween?.kill()
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={panelRef}
      role="status"
      aria-label="Loading NTS Distillers"
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#030303] text-white"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <img src="/logo.png" alt="" className="mb-6 h-16 w-16 object-contain sm:h-20 sm:w-20" />
      <p className="font-serif text-lg font-bold uppercase tracking-[0.18em] text-white/90 sm:text-xl">NTS Distillers</p>
      <div className="mt-8 flex items-end gap-1 font-serif font-bold leading-none" aria-hidden="true">
        <span ref={countRef} className="text-[clamp(72px,18vw,220px)] tabular-nums">
          000
        </span>
        <span className="pb-[0.5em] text-[clamp(20px,4vw,48px)] text-[#E9542E]">%</span>
      </div>
      <div className="mt-8 h-px w-[min(72vw,420px)] bg-white/15" aria-hidden="true">
        <div ref={barRef} className="h-full origin-left bg-[#E9542E]" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}
